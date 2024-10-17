from flask import Flask, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

bp = Blueprint('api', __name__)
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    from app.api import auth, order, product, user
    app.register_blueprint(auth.bp)
    app.register_blueprint(order.bp)
    app.register_blueprint(product.bp)
    app.register_blueprint(user.bp)

    #if not app.debug and not app.testing:

    return app

from app.models import base_model, user, product, category, order
