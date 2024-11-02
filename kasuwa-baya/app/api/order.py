from flask import request, jsonify, current_app
import requests
from app import db
import os
from app.api.auth import token_auth
from app.models.order import Order, OrderItem
from app.models.product import Cart
from app.api import bp
import logging


@bp.route('/checkout', methods=['POST'])
def create_order():
    user = token_auth.current_user()
    user_id = user.id
    user_email = user.email

    try:
        # Create the order
        order = Order(user_id=user_id, address=request.json.get('address'))
        cart_items = Cart.query.filter_by(user_id=user_id).all()

        # Add items to the order
        for item in cart_items:
            order_item = OrderItem(
                product_id=item.product_id,
                quantity=item.quantity
            )
            order.items.append(order_item)

        # Calculate total amount
        order.amount = sum(item.product.price * item.quantity for item in cart_items)

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
        access_code = data['data']['access_code']
        order.reference = data['data']['reference']
        db.session.commit()  # Save reference to order

        return jsonify({'order_id': order.id, 'total_cost': order.amount, 'access_code': access_code})

    except requests.exceptions.RequestException as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to initialize transaction with Paystack', 'details': str(e)}), 500
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@bp.route('/payment-success', methods=['POST'])
def payment_success():
    data = request.get_json()

    # Extract the transaction_id and reference from the payment success response
    transaction_id = data.get('transaction_id')  # "trans" from client
    reference = data.get('reference')            # "reference" from client

    if not transaction_id or not reference:
        return jsonify({'error': 'Transaction ID or reference missing'}), 400

    # Find the order with the matching reference
    order = Order.query.filter_by(reference=reference).first()

    if order:
        # Update the order with the transaction ID and mark as processed
        order.transaction_id = transaction_id
        order.status = 'Processed'
        db.session.commit()
        return jsonify({'message': 'Order updated successfully', 'order_id': order.id})
    else:
        return jsonify({'error': 'Order not found'}), 404
