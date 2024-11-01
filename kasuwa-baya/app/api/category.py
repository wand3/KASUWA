from flask import request
from app import db
from app.api.auth import token_auth
from app.api import bp
from app.models.category import Category
from sqlalchemy import select
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/admin/category', methods=['POST'])
@token_auth.login_required(role=1)
def create_category():
    data = request.get_json()

    if not data or 'category_name' not in data:
        return {"error": "Category name is required"}, 400

    new_category = Category(category_name=data['category_name'])

    db.session.add(new_category)
    db.session.commit()

    return {"message": "Category created", "category_id": new_category.id}, 201

@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    category_list = [category.to_dict() for category in categories]
    return {'categories': category_list}

@bp.route('/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = db.session.query(Category).filter_by(id=category_id).first()

    # if category is None:
    #     abort(404, description="Category not found")

       # Get the products associated with the category
    products = category.products

       # Convert products to a list of dictionaries
    products_list = [product.to_dict() for product in products]

       # Return the category and its products as JSON
    return ({
        'category': category.to_dict(),
        'products': products_list
    })
