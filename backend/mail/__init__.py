from flask import Blueprint

bp = Blueprint('mail', __name__)

from backend.mail import routes
