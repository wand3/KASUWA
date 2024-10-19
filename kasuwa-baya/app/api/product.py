from flask import request, jsonify, current_app
from app import db
import os
from app.models.product import Product, ProductImage
from app.api import bp
from werkzeug.utils import secure_filename
import logging

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/product', methods=['POST'])
def create_product():
    data = request.form

    # Create a new product instance
    new_product = Product(
        product_name=data['product_name'],
        description=data['description'],
        price=data['price'],
        category_id=data['category_id'],
        quantity=data['quantity'],
        sold=data['sold'],
    )

    # Get the uploaded images
    product_images = request.files.getlist('photos')
    image_paths = []

    if product_images:
        # Set the product_image to the first image's filename
        first_image = product_images[0]
        first_image_name = secure_filename(first_image.filename)
        new_product.product_image = first_image_name  # Set the product_image field

        # Save the first image
        first_image.save(os.path.join(current_app.config['PRODUCT_IMAGE_UPLOAD_PATH'], first_image_name))
        image_paths.append(first_image_name)

        # Save the other images as ProductImage instances
        for image in product_images:
            name = secure_filename(image.filename)
            logging.info(f"storage: {name}")

            image.save(os.path.join(current_app.config['PRODUCT_IMAGES_UPLOAD_PATH'], name))
            image_paths.append(name)

            new_image = ProductImage(
                product_id=new_product.id,
                image_path=name
            )
            db.session.add(new_image)

    # Add the new product to the session
    db.session.add(new_product)
    logging.info(f"new product: {new_product}")

    try:
        db.session.commit()  # Commit the session to save the product and images
        return jsonify({
            "message": "Product added successfully",
            "id": new_product.id,
            "image_paths": image_paths  # Return the list of image paths
        }), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({'error': f'Failed to add product: {str(e)}'}), 500

    return jsonify({'error': 'Invalid image file'}), 400


# return first image or route to set default image and update default product image
@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()

    product_list = []
    for product in products:
        logging.info(f"each product: {product}")
        product_data = {
            'id': product.id,
            'product_name': product.product_name,
            'description': product.description,
            'price': product.price,
            'category_id': product.category_id,
            'quantity': product.quantity,
            'sold': product.sold,
            'created_at': product.created_at,
            'updated_at': product.updated_at,
            'product_image': product.product_image
        }
        product_list.append(product_data)
    return jsonify(product_list), 200


@bp.route('/products/<int:product_id>/default-image/<int:image_id>', methods=['PUT'])
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
