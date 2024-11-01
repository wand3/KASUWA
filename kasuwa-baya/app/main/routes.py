from flask import request, jsonify
import logging
from app.main import bp

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])

@bp.route('/', methods=['GET', 'POST'])
@bp.route('/index', methods=['GET', 'POST'])
def get_index():
    logging.info(f"Working")
    return jsonify({'name': 'api works'})
