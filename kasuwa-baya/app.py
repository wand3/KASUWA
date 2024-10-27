from app import create_app, db
import os
import sqlalchemy as sa
import sqlalchemy.orm as so
from app.models.base_model import BaseModel
from app.models.order import Order
from app.models.product import Product
from app.models.category import Category
from app.models.user import User

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'User': User, 'Product': Product, 'Category': Category, 'BaseModel': BaseModel}

@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'User': User, 'Product': Product, 'Category': Category, 'BaseModel': BaseModel}
