from backend import db, login, Anonymous
from flask import current_app
from flask_login import UserMixin, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from backend.values import *
from time import time
import jwt
from datetime import datetime
from functools import wraps
from passlib.hash import sha512_crypt
from backend.util import datetime_browser_format


def requires_access_level(access_levels):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if current_user.access not in access_levels:
                return UNAUTHORIZED
            return f(*args, **kwargs)
        return decorated_function
    return decorator


class TrackModifications(object):
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


@login.request_loader
def load_user(request):
    try:
        token = request.headers.get("Authorization").replace("Bearer ", "")
        data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        user_id = data["id"]
        reset_index = data["reset_index"]
    except (jwt.exceptions.InvalidTokenError, AttributeError, KeyError):
        return None
    user = User.query.filter(User.user_id == user_id, User.reset_index == reset_index).first()
    return user if user is not None else None


class User(UserMixin, Anonymous, db.Model, TrackModifications):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key=True)
    reset_index = db.Column(db.Integer, nullable=False, default=0)
    email = db.Column(db.String(128), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    access = db.Column(db.Integer, index=True, nullable=False)
    is_active = db.Column(db.Boolean, index=True, nullable=False, default=False)
    last_seen = db.Column(db.DateTime, default=datetime.utcnow)
    first_name = db.Column(db.String(128))
    last_name = db.Column(db.String(128))
    auth_code = db.Column(db.String(128), nullable=True)
    email_notifications = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self):
        return f"{self.email}"

    def get_id(self):
        return f"{self.user_id}-{self.reset_index}"

    def is_admin(self):
        return self.access == AL_ADMIN

    def allowed(self, access_levels):
        return self.access in access_levels

    def set_password(self, password, increment=True):
        self.password_hash = generate_password_hash(password)
        if self.reset_index is not None and increment:
            self.reset_index += 1
        db.session.commit()

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_reset_password_token(self, expires_in=SECONDS_QUARTER):
        return jwt.encode({"reset_password": self.user_id, "exp": time() + expires_in},
                          current_app.config["SECRET_KEY"], algorithm="HS256").decode("utf-8")

    @staticmethod
    def verify_reset_password_token(token):
        try:
            user_id = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])["reset_password"]
        except jwt.exceptions.InvalidTokenError:
            return False
        return User.query.get(user_id)

    def get_auth_token(self, expires_in=SECONDS_DAY):
        return jwt.encode({
            "id": self.user_id,
            "reset_index": self.reset_index,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "iat": time(),
            "exp": time() + expires_in,
            }, current_app.config["SECRET_KEY"],  algorithm="HS256").decode("utf-8")

    def profile(self):
        if current_user == self:
            return {
                "id": self.user_id,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "email": self.email,
                "is_active": self.is_active
            }
        return None


class VirtualDomains(db.Model, TrackModifications):
    __tablename__ = "virtual_domains"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(128), unique=True)
    users = db.relationship("VirtualUsers", back_populates="domain", cascade="all, delete-orphan")
    aliases = db.relationship("VirtualAliases", back_populates="domain", cascade="all, delete-orphan")

    def __repr__(self):
        return f"{self.name}"

    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": datetime_browser_format(self.created_at),
            "updated_at": datetime_browser_format(self.updated_at)
        }


class VirtualUsers(db.Model, TrackModifications):
    __tablename__ = "virtual_users"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    domain_id = db.Column(db.Integer, db.ForeignKey('virtual_domains.id', ondelete="CASCADE"))
    domain = db.relationship("VirtualDomains", back_populates="users")
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"{self.email}"

    def set_password(self, password):
        self.password = sha512_crypt.hash(password, rounds=5000)
        db.session.commit()

    def check_password(self, password):
        return sha512_crypt.verify(password, self.password)

    def username(self):
        try:
            return self.email.split("@")[0]
        except IndexError:
            return ""

    def set_email(self, email, domain):
        self.email = f"{email}@{domain}"

    def update_email(self, domain):
        self.email = f"{self.username()}@{domain}"

    def json(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username(),
            "domain": self.domain.name,
            "domain_id": self.domain_id,
            "created_at": datetime_browser_format(self.created_at),
            "updated_at": datetime_browser_format(self.updated_at)
        }


class VirtualAliases(db.Model, TrackModifications):
    __tablename__ = "virtual_aliases"
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    domain_id = db.Column(db.Integer, db.ForeignKey('virtual_domains.id', ondelete="CASCADE"))
    domain = db.relationship("VirtualDomains", back_populates="aliases")
    source = db.Column(db.String(128), nullable=False)
    destination = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f"Forwarding: {self.source} => {self.destination}"

    def source_name(self):
        try:
            return self.source.split("@")[0]
        except IndexError:
            return ""

    def set_source(self, source, domain):
        self.source = f'{source}@{domain}'

    def update_source(self, domain):
        self.source = f"{self.source_name()}@{domain}"

    def json(self):
        return {
            "id": self.id,
            "source": self.source,
            "destination": self.destination,
            "source_name": self.source_name(),
            "domain": self.domain.name,
            "domain_id": self.domain_id,
            "created_at": datetime_browser_format(self.created_at),
            "updated_at": datetime_browser_format(self.updated_at)
        }
