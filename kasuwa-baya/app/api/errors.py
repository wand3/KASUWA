from flask import jsonify
from werkzeug.http import HTTP_STATUS_CODES
from werkzeug.exceptions import HTTPException
from app.api import bp

def error_response(status_code, message=None):
    payload = {'error': HTTP_STATUS_CODES.get(status_code, 'Unknown error')}
    if message:
        payload['message'] = message
    return jsonify(payload), status_code

def bad_request(message):
    return error_response(400, message)

def unauthorized(message="Unauthorized access"):
    return error_response(401, message)

def forbidden(message="Forbidden access"):
    return error_response(403, message)

def not_found(message="Resource not found"):
    return error_response(404, message)

# @bp.app_errorhandler(HTTPException)
# def handle_http_exception(e):
#     """Handle specific HTTP exceptions raised by Werkzeug."""
#     return error_response(e.code, e.description)

# @bp.app_errorhandler(Exception)
# def handle_exception(e):
#     """Handle generic exceptions and return a 500 error response."""
#     return error_response(500, f"{e} An internal server error occurred")
