from app import create_app, db
import os
from app.models.base_model import BaseModel
from app.models.order import Order
from app.models.product import Product, Category
from app.models.user import User

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'Product': Product, 'Category': Category, 'BaseModel': BaseModel}
