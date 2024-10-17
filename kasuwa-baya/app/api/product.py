from flask import Blueprint, request, current_app
from app import db
import os
from app.models.product import Product, ProductImage
from werkzeug.utils import secure_filename

bp = Blueprint('product', __name__)

@bp.route('/product', methods=['POST'])
def create_product():
    data = request.form
    files = request.files.getlist('photos')

    new_product = Product(
            product_name=data['product_name'],
            description=data['description'],
            price=data['price'],
            category_id=data['category_id'],
            quantity=data.get('quantity'),
            sold=data.get('sold', 0),
            shipping=data.get('shipping', False)
    )

    db.session.add(new_product)

    for file in files:
            if file and secure_filename(file.filename):
                name = secure_filename(file.filename)
                filename = new_product.product_name + '_' + name
                file.save(os.path.join(current_app.config['PRODUCT_IMAGE_UPLOAD_PATH'], filename))

                new_image = ProductImage(
                    product_id=new_product.id,
                    image_path=f'images/product_images/{filename}'
                )
                db.session.add(new_image)

    try:
        db.session.commit()  # Commit the session
        return {"message": "Product created", "product_id": new_product.id}, 201
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return {"error": str(e)}, 500
