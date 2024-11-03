from flask import request, jsonify, current_app
from app import db
import os
from app.models.user import User, UserAddress
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import bad_request
from sqlalchemy import select
import logging

@bp.route('/user', methods=['GET'])
@token_auth.login_required
def get_user():
    current_user = token_auth.current_user()
    data = current_user.to_dict(include_email=True)
    return jsonify(data)

@bp.route('/address', methods=['GET'])
@token_auth.login_required
def get_addresses():
    addresses = token_auth.current_user().shipping_addresses
    formatted_addresses = [address.to_dict() for address in addresses]
    return jsonify(formatted_addresses), 200

@bp.route('/address', methods=['POST'])
@token_auth.login_required
def add_address():
    data = request.json
    user_id = token_auth.current_user().id
    data['user_id'] = user_id

    # Check if the user already has addresses
    existing_addresses = UserAddress.query.filter_by(user_id=user_id).all()

    # Create a new address
    address = UserAddress()
    address.from_dict(data)

    # If the user has no addresses, set the new one as default
    if not existing_addresses:
        address.is_default = True  # Set this address as default

    db.session.add(address)
    db.session.commit()

    return {'message': 'Address Added Successfully', 'id': address.id}


@bp.route('/address/<int:address_id>/set-default', methods=['PATCH'])
@token_auth.login_required
def set_default_address(address_id):
    user = token_auth.current_user()
    address = UserAddress.query.filter_by(id=address_id, user_id=user.id).first()

    if not address:
        return jsonify({"error": "Address not found"}), 404

    # Reset all addresses for this user to `is_default=False`
    UserAddress.query.filter_by(user_id=user.id).update({"is_default": False})

    # Set the selected address to `is_default=True`
    address.is_default = True
    db.session.commit()

    return jsonify({"message": "Default address set successfully"}), 200


@bp.route('/users', methods=['GET'])
def all_users():
    users = User.query.all()
    logging.info(f'tk_auth:', token_auth)
    users_list = [user.to_dict() for user in users]
    return jsonify({'users': users_list})

@bp.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return bad_request('Must include email and password')

    if db.session.scalar(select(User).where(User.email == data['email'])):
        return bad_request('Use a Different Email')

    user = User()
    user.from_dict(data, new_user=True)
    db.session.add(user)
    db.session.commit()

    return {'message': 'User Created Successfully', 'id': user.id}

@bp.route('/edit_user/<int:id>', methods=['PUT'])
def update_user(id):
    user = db.get_or_404(User, id)
    data = request.get_json()
    if 'email' in data and data['email'] != user.email and \
        db.session.scalar(select(User).where(
            User.email == data['email'])):
        return bad_request('please use a different email address')

    user.from_dict(data, new_user=False)
    db.session.commit()
    return user.to_dict()
