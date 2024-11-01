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
