import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    MAX_CONTENT_LENGTH = 6144 * 6144
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.img', '.jpeg']
    REVIEW_IMAGE_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'review_images')
    PRODUCT_IMAGES_UPLOAD_PATH = os.path.join(basedir, 'app', 'static', 'images', 'product_images')
