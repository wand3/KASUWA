from flask import request, jsonify, current_app
from app import db
import os
from app.models.user import User
from app.api import bp
from app.api.errors import bad_request
from sqlalchemy import select
import logging

@bp.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    return db.get_or_404(User, id).to_dict()

@bp.route('/user', methods=['POST'])
def create_user():
    data = request.json()
    if 'name' not in data or 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('Must include name, username, email and password')

    if db.session.scalar(select(User).where(User.username == data['username'])):
        return bad_request('Username Already taken, Pick another')

    if db.session.scalar(select(User).where(User.email == data['email'])):
        return bad_request('Use a Different Email')

    user = User()
    user.from_dict(data, new_user=True)
    db.session.add('user')
    db.session.commit()

    return {'message': 'User Created Successfully', 'id': user.id}

@bp.route('/edit_user/<int:id>', methods=['PUT'])
def update_user(id):
    user = db.get_or_404(User, id)
    data = request.get_json()
    if 'username' in data and data['username'] != user.username and \
        db.session.scalar(select(User).where(
            User.username == data['username'])):
        return bad_request('please use a different username')
    if 'email' in data and data['email'] != user.email and \
        db.session.scalar(select(User).where(
            User.email == data['email'])):
        return bad_request('please use a different email address')

    user.from_dict(data, new_user=False)
    db.session.commit()
    return user.to_dict()
