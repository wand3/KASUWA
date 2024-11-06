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

    # Check if category already exists
    if Category.query.filter_by(category_name=data['category_name']).first():
        return {"error": "Category already exists"}, 409

    new_category = Category(category_name=data['category_name'])

    db.session.add(new_category)
    db.session.commit()

    return {"message": "Category created", "category_id": new_category.id}, 201


@bp.route('/admin/category/<int:category_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return {'error': 'category not found'}, 404

    db.session.delete(category)
    db.session.commit()

    return {'message': 'category deleted successfully'}, 200


@bp.route('/admin/category/<int:category_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_category(category_id):
    # Get the JSON data from the request
    data = request.get_json()

    # Validate that data contains 'category_name'
    if not data or 'category_name' not in data:
        return {"error": "Category name is required"}, 400

    # Query the category by ID
    category = db.session.query(Category).filter_by(id=category_id).first()

    # Check if category exists
    if category is None:
        return {"error": "Category not found"}, 404

    # Update the category name
    category.category_name = data['category_name']

    # Commit the changes to the database
    db.session.commit()

    return {"message": "Category updated successfully", "category": category.to_dict()}, 200


@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    category_list = [category.to_dict() for category in categories]
    return {'categories': category_list}


@bp.route('/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    # Query the category by ID
    category = db.session.query(Category).filter_by(id=category_id).first()

    # If the category is not found, return a 404 error
    if category is None:
        return {"error": "Category not found"}, 404

    # Get the products associated with the category and convert them to a dictionary
    products_list = [product.to_dict() for product in category.products]

    # Return the category and its products as JSON
    return {
        'category': category.to_dict(),
        'products': products_list
    }, 200
