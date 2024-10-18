from flask import request, jsonify, current_app
from app import db
import os
from app.models.product import Product, ProductImage
from app.api import bp
from werkzeug.utils import secure_filename

@bp.route('/product', methods=['POST'])
def create_product():
    # Validate and extract data from the request
    data = request.form
    required_fields = ['product_name', 'description', 'price', 'category_id', 'quantity']

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Convert data types
    try:
        price = float(data['price'])
        category_id = int(data['category_id'])
        quantity = int(data['quantity'])
        sold = int(data.get('sold', 0))
    except ValueError as e:
        return jsonify({"error": "Invalid data type for one of the fields."}), 400

    # Create a new product instance
    new_product = Product(
        product_name=data['product_name'],
        description=data['description'],
        price=price,
        category_id=category_id,
        quantity=quantity,
        sold=sold,
    )

    db.session.add(new_product)

    # Handle file uploads
    files = request.files.getlist('photos')
    for file in files:
        if file and file.filename:
            name = secure_filename(file.filename)
            filename = f"{new_product.product_name}_{name}"
            file_path = os.path.join(current_app.config['PRODUCT_IMAGE_UPLOAD_PATH'], filename)
            file.save(file_path)

            new_image = ProductImage(
                product_id=new_product.id,
                image_path=f'images/product_images/{filename}'
            )
            db.session.add(new_image)

    try:
        db.session.commit()  # Commit the session
        return jsonify({"message": "Product created", "product_id": new_product.id}), 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500

# return first image or route to set default image
@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()

    product_list = []
    for product in products:
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
            'images': [image.image_path for image in product.images]
        }
        product_list.append(product_data)
    return jsonify(product_list), 200
