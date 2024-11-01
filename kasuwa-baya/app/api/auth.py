from flask import request, jsonify, current_app
from flask_httpauth import HTTPBasicAuth, HTTPTokenAuth
from app import db
from app.models.user import User
from app.api.errors import error_response
from sqlalchemy import select
import logging

basic_auth = HTTPBasicAuth()
token_auth = HTTPTokenAuth()

@basic_auth.verify_password
def verify_password(email, password):
    user = db.session.scalar(select(User).where(User.email == email))
    if user and user.check_password(password):
        return user

@token_auth.verify_token
def verify_token(token):
    return User.check_token(token) if token else None

@token_auth.get_user_roles
def get_user_roles(user):
    logging.info(f'user::',user)
    return User.get_role(user) if user else None

@token_auth.error_handler
def token_auth_error(status):
    return error_response(status)
