from flask import request, jsonify, current_app, abort
from app import db
import os
from app.api.auth import token_auth
from app.models.product import Product, ProductImage, Cart, Review, ReviewImage, ShippingMethod, Coupon
from app.api.errors import bad_request, not_found, unauthorized, forbidden
from app.api import bp
from werkzeug.utils import secure_filename
from sqlalchemy import or_
import json
from app.utils.cart_utils import apply_coupon_to_cart
import logging

# Configure logging to display messages to the terminal
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/search', methods=["POST"])
def search():
    data = request.json
    search_input = data.get('query')

    if not search_input:
        return bad_request("No search query provided")

    products = db.session.query(Product).filter(
        or_(Product.product_name.ilike(f"%{search_input}%"),
            Product.description.ilike(f"%{search_input}%"))
    ).all()

    if not products:
        return not_found('Product not found')

    return jsonify([product.to_summary_dict() for product in products]), 200

@bp.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.to_summary_dict() for product in products]), 200

@bp.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return not_found("Product not found")
    try:
        return product.to_dict()
    except Exception:
        return bad_request("Failed to retrieve product")

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
    product_id = data.get("product_id")
    default_quantity = data.get("quantity", 1)
    shipping_id = data.get("shipping", 1)

    if not product_id:
        return bad_request("Product ID is required")

    if not shipping_id:
        return bad_request("Shipping method is required")

    shipping_method = ShippingMethod.query.get(shipping_id)
    if not shipping_method:
        return bad_request("Invalid shipping method")

    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()

    if cart_item:
        cart_item.quantity += default_quantity
        cart_item.shipping_id = shipping_id
    else:
        cart_item = Cart(
            user_id=user_id,
            product_id=product_id,
            quantity=default_quantity,
            shipping_id=shipping_id,
        )
        db.session.add(cart_item)

    db.session.commit()

    return jsonify({"message": "Product added to cart successfully", "cart": cart_item.to_dict()}), 201


@bp.route('/cart', methods=['GET'])
@token_auth.login_required
def get_cart():
    user_id = token_auth.current_user().id
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    if not cart_items:
        return jsonify({"message": "Cart is empty", "total": 0}), 200

    total_price = sum(item.total_price() for item in cart_items)

    return jsonify({
        "items": [cart_item.to_dict() for cart_item in cart_items],
        "total": total_price,
    }), 200

@bp.route('/cart/<int:product_id>', methods=['PUT'])
@token_auth.login_required
def update_quantity(product_id):
    user_id = token_auth.current_user().id
    data = request.get_json()
    new_quantity = data.get("quantity", 1)

    if new_quantity is None or new_quantity <= 0:
        return bad_request("Quantity must be a positive integer")

    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()
    if cart_item is None:
        return not_found("Product not found in cart")

    cart_item.quantity = new_quantity
    db.session.commit()

    return jsonify({'message': 'Quantity updated successfully', 'cart': cart_item.to_dict()}), 200

@bp.route('/cart/<int:product_id>', methods=['DELETE'])
@token_auth.login_required
def delete_cart_item(product_id):
    user_id = token_auth.current_user().id
    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()

    if cart_item is None:
        return not_found("Product not found in cart")

    try:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Product in Cart deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return bad_request(f"Failed to delete product: {str(e)}")

@bp.route('/cart/shipping/<int:product_id>/<int:shipping_id>', methods=['PUT'])
@token_auth.login_required
def change_shipping(product_id, shipping_id):
    user_id = token_auth.current_user().id

    cart_item = Cart.query.filter_by(user_id=user_id, product_id=product_id).first()

    if not cart_item:
        return not_found("Cart item not found")

    cart_item.shipping_id = shipping_id
    db.session.commit()

    return jsonify({'message': 'Shipping method updated successfully.'}), 200

@bp.route('/cart/apply_coupon', methods=["POST"])
@token_auth.login_required
def apply_coupon():
    data = request.json
    coupon_code = data.get('coupon_code')
    user_id = token_auth.current_user().id

    cart_items = Cart.query.filter_by(user_id=user_id).all()

    if not cart_items:
        return bad_request("Cart is empty.")

    # Apply coupon to the cart
    success, message, discounted_price, updated_shipping = apply_coupon_to_cart(cart_items, coupon_code)
    if not success:
        return bad_request(message)

    # Update the cart with the applied coupon
    for item in cart_items:
        item.coupon_code = coupon_code
    db.session.commit()

    return jsonify({
        "message": message,
        "totals": discounted_price + updated_shipping,  # No double shipping addition
        "total": discounted_price,
        "shipping_total": updated_shipping,
    }), 200

@bp.route('/shipping', methods=['GET'])
def get_shipping():
    shipping_methods = ShippingMethod.query.all()
    return jsonify([shipping_method.to_dict() for shipping_method in shipping_methods]), 200

# ADMIN ROUTES
@bp.route('/product', methods=['POST'])
@token_auth.login_required(role=1)
def create_product():
    data = request.form

    try:
        specifications = json.loads(data.get('specifications', '{}'))
        colors = json.loads(data.get('colors', '[]'))

        new_product = Product(
            product_name=data['product_name'],
            description=data['description'],
            price=float(data['price']),
            category_id=int(data['category_id']),
            quantity=int(data['quantity']),
            specifications=specifications,
            colors=colors
        )

        product_images = request.files.getlist('photos')
        image_paths = []

        db.session.add(new_product)
        db.session.commit()

        product_id = new_product.id

        for index, image in enumerate(product_images):
            name = secure_filename(image.filename)
            image.save(os.path.join(current_app.config['PRODUCT_IMAGES_UPLOAD_PATH'], name))
            image_paths.append(name)

            if index == 0:
                new_product.product_image = name

            new_image = ProductImage(
                product_id=product_id,
                image_path=name
            )
            db.session.add(new_image)

        db.session.commit()

        return jsonify({
            "message": "Product added successfully",
            "id": product_id
        }), 201
    except Exception as e:
        db.session.rollback()
        return bad_request(f"Failed to add product: {str(e)}")

@bp.route('/products/<int:product_id>/default-image/<int:image_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def update_default_product_image(product_id, image_id):
    product = Product.query.get(product_id)
    if not product:
        return not_found("Product not found")

    product_image = ProductImage.query.get(image_id)
    if not product_image:
        return not_found("Product image not found")

    product.product_image = product_image.image_path

    try:
        db.session.commit()
        return jsonify({
            'message': 'Default product image updated successfully',
            'product_image': product.product_image
        }), 200
    except Exception as e:
        db.session.rollback()
        return bad_request(f"Failed to update product image: {str(e)}")

@bp.route('/product/<int:product_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return not_found("Product not found")

    data = request.form
    if 'product_name' not in data or not data['product_name']:
        return bad_request("Product name is required")
    if 'description' not in data or not data['description']:
        return bad_request("Description is required")
    if 'price' not in data or not data['price']:
        return bad_request("Price is required")
    if 'category_id' not in data or not data['category_id']:
        return bad_request("Category ID is required")

    product.product_name = data['product_name']
    product.description = data['description']
    product.price = data['price']
    product.category_id = data['category_id']
    if 'quantity' in data:
        product.quantity = data['quantity']
    if 'product_image' in data:
        product.product_image = data['product_image']

    try:

        product_id = product.id
        product_images = request.files.getlist('photos')
        image_paths = []


        for index, image in enumerate(product_images):
            name = secure_filename(image.filename)
            image.save(os.path.join(current_app.config['PRODUCT_IMAGES_UPLOAD_PATH'], name))
            image_paths.append(name)

            if index == 0:
                product.product_image = name

            new_image = ProductImage(
                product_id=product_id,
                image_path=name
            )
            db.session.add(new_image)

        db.session.commit()

        return product.to_dict()
    except Exception as e:
        db.session.rollback()
        return bad_request(f"Failed to update product {e}")

@bp.route('/product/<int:product_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return not_found("Product not found")

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return bad_request(f"Failed to delete product: {str(e)}")

# SHIPPING ROUTES
@bp.route('/admin/shipping', methods=['POST'])
@token_auth.login_required(role=1)
def add_shipping():
    data = request.json
    shipping = ShippingMethod()
    shipping.from_dict(data)
    db.session.add(shipping)
    db.session.commit()
    return jsonify({'message': 'Shipping Method Added Successfully'}), 201


@bp.route('/admin/shipping/<int:shipping_id>', methods=['GET'])
@token_auth.login_required(role=1)
def get_shipping_id(shipping_id):
    shipping_method = ShippingMethod.query.get(shipping_id)

    return jsonify(shipping_method.to_dict()), 200


@bp.route('/admin/shipping/<int:shipping_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_shipping(shipping_id):

    data = request.json
    shipping_method = ShippingMethod.query.get(shipping_id)

    if not shipping_method:
        return not_found("Shipping method not found")

    if 'shipping_method_name' in data:
        shipping_method.shipping_method_name = data['shipping_method_name']
    if 'shipping_price' in data:
        shipping_method.shipping_price = data['shipping_price']
    if 'delivery_time' in data:
        shipping_method.delivery_time = data['delivery_time']

    db.session.commit()

    return jsonify({'message': 'Shipping method updated successfully.', 'shipping_method': shipping_method.to_dict()}), 201


@bp.route('/admin/shipping/<int:shipping_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_shipping(shipping_id):
    shipping_method = ShippingMethod.query.get(shipping_id)

    if not shipping_method:
        return not_found("Shipping method not found.")

    db.session.delete(shipping_method)
    db.session.commit()

    return jsonify({'message': 'Shipping method deleted successfully.'}), 200

@bp.route('/admin/coupon', methods=['POST'])
@token_auth.login_required(role=1)
def create_coupon():
    data = request.json
    coupon = Coupon()
    coupon.from_dict(data)
    db.session.add(coupon)
    db.session.commit()
    return jsonify({'message': 'Coupon Created Successfully'}), 201

@bp.route('/admin/coupons', methods=['GET'])
@token_auth.login_required(role=1)
def get_coupons():
    coupons = Coupon.query.all()
    return jsonify([coupon.to_dict() for coupon in coupons]), 200

@bp.route('/admin/coupon/<int:coupon_id>', methods=['DELETE'])
@token_auth.login_required(role=1)
def delete_coupon(coupon_id):
    coupon = Coupon.query.get(coupon_id)

    if not coupon:
        return not_found("Coupon not Found.")

    db.session.delete(coupon)
    db.session.commit()

    return {'message': 'Coupon deleted successfully'}, 200

@bp.route('/admin/coupon/<int:coupon_id>', methods=['PUT'])
@token_auth.login_required(role=1)
def edit_coupon(coupon_id):
    data = request.json
    coupon = Coupon.query.get(coupon_id)

    if not coupon:
        return not_found("Coupon not found.")

    coupon.from_dict(data)
    db.session.commit()

    return {'message': 'Coupon Updated Successfully'}, 200
