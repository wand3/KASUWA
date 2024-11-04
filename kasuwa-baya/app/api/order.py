from flask import request, jsonify, current_app
import requests
from app import db
import os
from app.api.auth import token_auth
from app.models.order import Order, OrderItem
from app.models.product import Cart, Product
from app.api import bp
import uuid
import logging

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/admin/orders', methods=['DELETE'])
def delete_orders():
    Order.query.delete()
    db.session.commit()
    return jsonify({"message": "All Orders deleted successfully"}), 200


@bp.route('/admin/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    return jsonify([order.to_dict() for order in orders])

def verify_transaction(reference):
    secret_key = os.getenv('PAYMENT_KEY')
    url = f'https://api.paystack.co/transaction/verify/{reference}'
    headers = {
        'Authorization': f'Bearer {secret_key}',
        'Content-Type': 'application/json'
    }
    response = requests.get(url, headers=headers)
    # logging.info(f"Verification response: {response.json()}")

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
        # Create the order
        address_id = int(request.json.get('address'))
        unique_reference = str(uuid.uuid4())
        unique_transaction_id = str(uuid.uuid4())

        order = Order(user_id=user_id, address_id=address_id, transaction_id=unique_transaction_id,
                      reference=unique_reference)
        cart_items = Cart.query.filter_by(user_id=user_id).all()

        # Add items to the order
        for item in cart_items:
            order_item = OrderItem(
                product_id=item.product_id,
                quantity=item.quantity
            )
            order.items.append(order_item)

        order.amount = sum(item.quantity * Product.query.get(item.product_id).price for item in cart_items)

        # Save order to the database
        db.session.add(order)
        db.session.commit()

        # Initialize Paystack transaction
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
        response.raise_for_status()  # Raises error for non-200 status codes

        data = response.json()
        logging.info(f'data ord: {data.get("data")}')

        access_code = data['data']['access_code']
        order.reference = data['data']['reference']
        db.session.commit()  # Save reference to order

        # Clear the user's cart after transaction initialization
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
            # Update the order status and transaction ID
            order.status = 'Processing'
            order.transaction_id = verification_response['id']

            # Adjust product quantities
            for item in order.items:
                product = Product.query.get(item.product_id)
                if product:
                    product.sold += item.quantity
                    product.quantity -= item.quantity

            # Save changes to the database
            db.session.commit()
            logging.info(f"Order {order.id} updated successfully with adjusted product quantities")
            return jsonify({'message': 'Order updated successfully', 'order_id': order.id})
        else:
            logging.error(f"Order with reference {reference} not found")
            return jsonify({'error': 'Order not found'}), 404
    else:
        logging.error(f"Transaction verification failed: {verification_response}")
        return jsonify({'error': 'Transaction verification failed'}), 400
