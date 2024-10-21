from flask import request, jsonify, current_app
from app import db
import os
from app.models.user import User
from app.api import bp
import logging

@bp.route('/user', methods=['GET'])
def get_user(id):
    return db.get_or_404(User, id).to_dict()

@bp.route('/signup' methods=['POST'])
def create_user():
    data = request.json()
    name = data.get['name']
    email = data.get['email']
    username = data.get['username']
    password = data.get['password']
    new_user = User(name, email, username, password)

    db.session.add(new_user)
    db.session.commit()

    return {'message': 'User Created Successfully'}
