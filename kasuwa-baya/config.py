import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SECRET_KEY = 'LADABIBAPBAP'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    MAX_CONTENT_LENGTH = 6144 * 6144
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.img', '.jpeg']
    SPEC_UPLOAD_EXTENSIONS = ['.jpg', '.png', '.img', '.jpeg', '.gif', '.pdf']
    SPEC_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'product_images', 'product_specifications')
    REVIEW_IMAGE_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'review_images')
    PRODUCT_IMAGES_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'product_images')
    AVATAR_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'avatars')
