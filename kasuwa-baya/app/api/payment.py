from flask import request, jsonify, current_app
import requests
from app import db
import os
from app.models.user import User, UserAddress
from app.models.product import Cart
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import bad_request
from sqlalchemy import select
import logging

@bp.route('/initialize-transaction', methods=['POST'])
@token_auth.login_required
def initialize_transaction():
    email = token_auth.current_user().email

    user_id = token_auth.current_user().id
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    total_amount = sum(item.total_price() for item in cart_items)

    # Set your Paystack secret key
    secret_key = os.getenv('PAYMENT_KEY')

    # Initialize the transaction
    url = 'https://api.paystack.co/transaction/initialize'
    headers = {
        'Authorization': f'Bearer {secret_key}',
        'Content-Type': 'application/json'
    }
    payload = {
        'email': email,
        'amount': total_amount
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        access_code = data['data']['access_code']
        return jsonify({'access_code': access_code})
    else:
        return jsonify({'error': 'Failed to initialize transaction'}), 500


@bp.route('/verify-transaction', methods=['POST'])
def verify_transaction():
    data = request.get_json()
    transaction_id = data['transaction_id']

    # Set your Paystack secret key
    secret_key = os.getenv('PAYMENT_KEY')

    # Verify the transaction status
    url = f'https://api.paystack.co/transaction/verify/{transaction_id}'
    headers = {
        'Authorization': f'Bearer {secret_key}',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        status = data['data']['status']
        amount = data['data']['amount']
        return jsonify({'status': status, 'amount': amount})
    else:
        return jsonify({'error': 'Failed to verify transaction'}), 500
