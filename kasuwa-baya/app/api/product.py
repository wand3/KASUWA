from flask import request, jsonify, current_app
from app import db
import os
from app.api.auth import token_auth
from app.models.product import Product, ProductImage, Cart
from app.api import bp
from werkzeug.utils import secure_filename
import logging

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

@bp.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return {'error': 'Product not found'}, 404
    try:
        return product.to_dict()
    except Exception as e:
        return {'error': 'Failed to retrieve product'}, 500

@bp.route('/products', methods=['DELETE'])
def delete_products():
    Product.query.delete()
    db.session.commit()
    return jsonify({"message": "All products deleted successfully"}), 200

@bp.route('/cart', methods=['POST'])
@token_auth.login_required
def add_to_cart():
    data = request.json

    user_id = token_auth.current_user().id
    data['user_id'] = user_id

    cart_item = Cart()
    cart_item.from_dict(data)
    db.session.add(cart_item)
    db.session.commit()

    return jsonify({"message": "Product added to cart successfully"}), 201

@bp.route('/cart', methods=['GET'])
@token_auth.login_required
def get_cart():
    user_id = token_auth.current_user().id
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    if not cart_items:
        return jsonify({"message": "Cart is empty"}), 200
    return jsonify([cart_item.to_dict() for cart_item in cart_items]), 200


# ADMIN ROUTES
@bp.route('/product', methods=['POST'])
@token_auth.login_required(role=1)
def create_product():
    data = request.form

    # Create a new product instance
    new_product = Product(
        product_name=data['product_name'],
        description=data['description'],
        price=data['price'],
        category_id=data['category_id'],
        quantity=data['quantity']
    )

    # Get the uploaded images
    product_images = request.files.getlist('photos')
    image_paths = []

    # Add the new product to the session
    db.session.add(new_product)

    try:
        db.session.commit()  # Commit the session to save the product and get its ID

        # Now that the product is committed, we can get its ID
        product_id = new_product.id

        # Save the images as ProductImage instances
        for index, image in enumerate(product_images):
            name = secure_filename(image.filename)
            image.save(os.path.join(current_app.config['PRODUCT_IMAGES_UPLOAD_PATH'], name))
            image_paths.append(name)

            if index == 0:
                new_product.product_image = name  # Set the first image as the default image

            new_image = ProductImage(
                product_id=product_id,  # Use the committed product's ID
                image_path=name
            )
            db.session.add(new_image)

        # Commit the session again to save the images
        db.session.commit()

        return jsonify({
            "message": "Product added successfully",
            "id": product_id,
            "image_paths": image_paths  # Return the list of image paths
        }), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'error': f'Failed to add product: {str(e)}'}), 500

    return jsonify({'error': 'Invalid image file'}), 400

@bp.route('/products/<int:product_id>/default-image/<int:image_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def update_default_product_image(product_id, image_id):
    # Fetch the product
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    # Fetch the product image
    product_image = ProductImage.query.get(image_id)
    if not product_image:
        return jsonify({'error': 'Product image not found'}), 404

    # Update the product's default image
    product.product_image = product_image.image_path

    try:
        db.session.commit()
        return jsonify({
            'message': 'Default product image updated successfully',
            'product_image': product.product_image
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Failed to update product image: {str(e)}'}), 500


@bp.route('/product/<int:product_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return {'error': 'Product not found'}, 404

    data = request.get_json()
    if 'product_name' not in data or not data['product_name']:
        return {'error': 'Product name is required'}, 400
    if 'description' not in data or not data['description']:
        return {'error': 'Description is required'}, 400
    if 'price' not in data or not data['price']:
        return {'error': 'Price is required'}, 400
    if 'category_id' not in data or not data['category_id']:
        return {'error': 'Category ID is required'}, 400

    product.product_name = data['product_name']
    product.description = data['description']
    product.price = data['price']
    product.category_id = data['category_id']
    if 'quantity' in data:
        product.quantity = data['quantity']
    if 'product_image' in data:
        product.product_image = data['product_image']

    try:
        db.session.commit()  # Commit the session to save the product and get its ID

        # Now that the product is committed, we can get its ID
        product_id = product.id

        # Save the new images as ProductImage instances
        product_images = request.files.getlist('product_images')
        for image in product_images:
            name = secure_filename(image.filename)
            image.save(os.path.join(current_app.config['PRODUCT_IMAGES_UPLOAD_PATH'], name))
            new_image = ProductImage(
                product_id=product_id,  # Use the committed product's ID
                image_path=name
            )
            db.session.add(new_image)

        # Commit the session again to save the images
        db.session.commit()
        return product.to_dict()
    except Exception as e:
        db.session.rollback()
        return {'error': 'Failed to update product'}, 500



@bp.route('/product/<int:product_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return {'error': 'Product not found'}, 404

    try:
        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted successfully'}, 200
    except Exception as e:
        db.session.rollback()
        # Log the actual exception message for debugging purposes
        print(f"Error deleting product: {str(e)}")
        return {'error': 'Failed to delete product'}, 500
