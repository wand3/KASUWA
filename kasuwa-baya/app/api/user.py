from flask import request, jsonify, current_app
from app import db
import os
from app.models.user import User, UserAddress
from app.api import bp
from app.api.auth import token_auth
from app.api.errors import bad_request
from sqlalchemy import select
from werkzeug.utils import secure_filename
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

    existing_addresses = UserAddress.query.filter_by(user_id=user_id).all()

    address = UserAddress()
    address.from_dict(data)

    if not existing_addresses:
        address.is_default = True

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

    UserAddress.query.filter_by(user_id=user.id).update({"is_default": False})

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
@token_auth.login_required
def update_user(id):
    current_user = token_auth.current_user().id

    user = db.get_or_404(User, current_user)
    data = request.form.to_dict()
    file = request.files.get('avatar')

    if 'email' in data and data['email'] != user.email:
        if db.session.scalar(select(User).where(User.email == data['email'])):
            return jsonify({'error': 'Please use a different email address'}), 400

    user.from_dict(data, new_user=False)

    if file:
        filename = secure_filename(file.filename)
        avatar_path = os.path.join(current_app.config['AVATAR_UPLOAD_PATH'], filename)
        file.save(avatar_path)
        user.avatar = filename

    db.session.commit()

    return jsonify(user.to_dict()), 200
