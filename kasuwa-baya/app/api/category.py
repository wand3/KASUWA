from flask import request
from app import db
from app.api.auth import token_auth
from app.api import bp
from app.models.category import Category
from app.api.errors import bad_request, not_found, unauthorized, forbidden
from sqlalchemy import select


@bp.route('/admin/category', methods=['POST'])
@token_auth.login_required(role=1)
def create_category():
    data = request.get_json()

    if not data or 'category_name' not in data:
        return bad_request("Category Name is Required")

    if Category.query.filter_by(category_name=data['category_name']).first():
        return bad_request("Category Already Exists! Use a different Name")

    new_category = Category(category_name=data['category_name'])
    db.session.add(new_category)
    db.session.commit()

    return {"message": "Category created", "category_id": new_category.id}, 201


@bp.route('/admin/category/<int:category_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_category(category_id):
    category = Category.query.get(category_id)

    if not category:
        return not_found("Category Not Found")

    db.session.delete(category)
    db.session.commit()

    return {"message": "Category deleted successfully", "category_id": category_id}, 200


@bp.route('/admin/category/<int:category_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_category(category_id):
    data = request.get_json()

    if not data or 'category_name' not in data:
        return bad_request("Category name is required")

    category = db.session.query(Category).filter_by(id=category_id).first()
    if category is None:
        return not_found("Category not found")

    category.category_name = data['category_name']
    db.session.commit()

    return {"message": "Category updated successfully", "category": category.to_dict()}, 200


@bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    category_list = [category.to_dict() for category in categories]
    return {"categories": category_list}, 200


@bp.route('/category/<int:category_id>', methods=['GET'])
def get_category(category_id):
    category = db.session.query(Category).filter_by(id=category_id).first()

    if category is None:
        return not_found("Category not found")

    products_list = [product.to_summary_dict() for product in category.products]

    return {"products": products_list}, 200
