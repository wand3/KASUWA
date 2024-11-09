from flask import request, jsonify, current_app, abort
import requests
from app import db
import os
from app.api.auth import token_auth
from app.models.order import Order, OrderItem
from app.models.product import Cart, Product,Review, ReviewImage
from app.api import bp
from werkzeug.utils import secure_filename
import uuid
import logging

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/orders', methods=['GET'])
@token_auth.login_required()
def list_orders():
    user_id = token_auth.current_user().id
    user_orders = db.session.query(Order).filter(Order.user_id == user_id).all()

    orders_data = []
    for order in user_orders:
        order_dict = order.to_dict()
        order_dict['items'] = [
            {
                'product_id': item.product_id,
                'quantity': item.quantity,
                'product_name': item.product.product_name
            }
            for item in order.items
        ]
        orders_data.append(order_dict)

    return jsonify(orders_data), 200


def verify_transaction(reference):
    secret_key = os.getenv('PAYMENT_KEY')
    url = f'https://api.paystack.co/transaction/verify/{reference}'
    headers = {
        'Authorization': f'Bearer {secret_key}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200 and response.json().get('data'):
        return response.json()['data']
    else:
        logging.error(f"Verification failed: {response.json()}")
        return {'status': 'failed', 'message': 'Verification failed'}

@bp.route('/checkout', methods=['POST'])
@token_auth.login_required
def create_order():
    user = token_auth.current_user()
    user_id = user.id
    user_email = user.email

    try:
        address_id = int(request.json.get('address'))
        unique_reference = str(uuid.uuid4())
        unique_transaction_id = str(uuid.uuid4())

        order = Order(user_id=user_id, address_id=address_id, transaction_id=unique_transaction_id,
                      reference=unique_reference)
        cart_items = Cart.query.filter_by(user_id=user_id).all()

        for item in cart_items:
            order_item = OrderItem(
                product_id=item.product_id,
                quantity=item.quantity
            )
            order.items.append(order_item)

        order.amount = sum(item.quantity * Product.query.get(item.product_id).price for item in cart_items)

        db.session.add(order)
        db.session.commit()

        secret_key = os.getenv('PAYMENT_KEY')
        if not secret_key:
            raise ValueError("Payment key is not set.")

        url = 'https://api.paystack.co/transaction/initialize'
        headers = {
            'Authorization': f'Bearer {secret_key}',
            'Content-Type': 'application/json'
        }
        payload = {
            'email': user_email,
            'amount': int(order.amount * 100),
            'callback_url': 'http://127.0.0.1:5000/api/payment-success'
        }

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()

        data = response.json()
        logging.info(f'data ord: {data.get("data")}')

        access_code = data['data']['access_code']
        order.reference = data['data']['reference']
        db.session.commit()

        for item in cart_items:
            db.session.delete(item)
        db.session.commit()

        return jsonify({'order_id': order.id, 'total_cost': order.amount, 'access_code': access_code})

    except requests.exceptions.RequestException as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to initialize transaction with Paystack', 'details': str(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/payment-success', methods=['GET'])
def payment_success():
    reference = request.args.get('reference')
    logging.info(f"Payment success route hit with reference: {reference}")

    if not reference:
        return jsonify({'error': 'reference missing'}), 400

    verification_response = verify_transaction(reference)
    logging.info(f'verificate: {verification_response}')
    if verification_response.get('status') == 'success':
        order = Order.query.filter_by(reference=reference).first()
        if order:
            order.status = 'Processing'
            order.transaction_id = verification_response['id']

            for item in order.items:
                product = Product.query.get(item.product_id)
                if product:
                    product.sold += item.quantity
                    product.quantity -= item.quantity

            db.session.commit()
            logging.info(f"Order {order.id} updated successfully with adjusted product quantities")
            return jsonify({'message': 'Order updated successfully', 'order_id': order.id})
        else:
            logging.error(f"Order with reference {reference} not found")
            return jsonify({'error': 'Order not found'}), 404
    else:
        logging.error(f"Transaction verification failed: {verification_response}")
        return jsonify({'error': 'Transaction verification failed'}), 400


@bp.route('/reviews', methods=['POST'])
@token_auth.login_required
def add_review():
    user = token_auth.current_user()
    user_id = user.id
    product_id = request.form.get('product_id')
    rating = request.form.get('rating')
    message = request.form.get('message')
    files = request.files.getlist('images')

    purchased_item = OrderItem.query.join(Order).filter(
        Order.user_id == user_id,
        Order.status == 'Completed',
        OrderItem.product_id == product_id
    ).first()

    if not purchased_item:
        return jsonify({'error': 'Only users who have purchased this product can leave a review.'}), 403

    review = Review(user_id=user_id, product_id=product_id, rating=rating, message=message)

    image_filenames = []
    for file in files:
        if file:
            filename = secure_filename(file.filename)
            file_ext = os.path.splitext(filename)[1]

            if file_ext not in current_app.config['UPLOAD_EXTENSIONS']:
                abort(400, description="Invalid image format.")

            save_path = os.path.join(current_app.config['REVIEW_IMAGE_UPLOAD_PATH'], filename)
            file.save(save_path)

            image_filenames.append(filename)

    logging.info(f'Saved image filenames: {image_filenames}')

    for filename in image_filenames:
        review_image = ReviewImage(review=review, image_path=filename)  # Store only the filename
        db.session.add(review_image)

    db.session.add(review)
    db.session.commit()

    return jsonify({'message': 'Review added successfully'}), 201


# ADMIN ROUTES
@bp.route('/admin/orders/<int:order_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_order(order_id):
    order = Order.query.get(order_id)

    if not order:
        return jsonify({"error": "Order not found"}), 404

    db.session.delete(order)
    db.session.commit()

    return jsonify({"message": f"Order {order_id} deleted successfully"}), 200


@bp.route('/admin/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])


@bp.route('/admin/reviews', methods=['DELETE'])
def delete_reviews():
    Review.query.delete()
    db.session.commit()
    return jsonify({"message": "All Reviews deleted successfully"}), 200
