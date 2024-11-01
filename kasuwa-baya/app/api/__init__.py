from flask import Blueprint

bp = Blueprint('api', __name__)

from app.api import order, product, user, category, errors, tokens, payment
