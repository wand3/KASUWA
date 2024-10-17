from flask import Blueprint, request
from app import db
from app.models.order import Order

bp = Blueprint('order', __name__)

# @bp.route('/orders', methods=['GET'])
# def get_orders():
