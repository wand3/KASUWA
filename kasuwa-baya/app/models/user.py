from datetime import datetime, timedelta, timezone
from app import db
from .base_model import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, select
from sqlalchemy.orm import Mapped, mapped_column, relationship, WriteOnlyMapped
from werkzeug.security import generate_password_hash, check_password_hash
import secrets

class User(BaseModel):
    __tablename__ = 'users'

    full_name: Mapped[Optional[str]] = mapped_column(String(64))
    email: Mapped[str] = mapped_column(String(64), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(256))
    role: Mapped[int] = mapped_column(default=0)
    phone: Mapped[Optional[str]] = mapped_column(String(20))
    token: Mapped[Optional[str]] = mapped_column(String(32), index=True, unique=True)
    token_expiration: Mapped[Optional[datetime]]
    shipping_addresses: Mapped[List['UserAddress']] = relationship('UserAddress', back_populates="user", cascade="all, delete-orphan")

    cart: Mapped[List['Cart']] = relationship('Cart', back_populates="user", cascade="all, delete-orphan")
    reviews: Mapped[List['Review']] = relationship('Review', back_populates='user')
    orders: Mapped[List['Order']] = relationship('Order', back_populates="user", cascade="all, delete-orphan")

    def to_dict(self, include_email=False):
        data = {
            'id': self.id,
            'full_name': self.full_name,
            'role': self.role,
            'email': self.email,
            'shipping_address': [shipping.to_dict() for shipping in self.shipping_addresses]
        }

        if include_email:
            data['email'] = self.email

        return data

    def from_dict(self, data, new_user=False):
        if 'email' in data:
            setattr(self, 'email', data['email'])
        if new_user and 'password' in data:
            self.set_password(data['password'])

    def set_password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.hashed_password, password)

    def get_token(self, expires_in=3600):
        now = datetime.now(timezone.utc)
        if self.token and self.token_expiration.replace(
            tzinfo=timezone.utc) > now + timedelta(seconds=60):
            return self.token
        self.token = secrets.token_hex(16)
        self.token_expiration = now + timedelta(seconds=expires_in)
        db.session.add(self)
        return self.token

    def revoke_token(self):
        self.token_expiration = datetime.now(timezone.utc) - timedelta(seconds=1)

    @staticmethod
    def check_token(token):
        user = db.session.scalar(select(User).where(User.token == token))
        if user is None or user.token_expiration.replace(
            tzinfo=timezone.utc) < datetime.now(timezone.utc):
            return None
        return user

    def get_role(self):
        return self.role

    def __repr__(self):
        return f"<User(full_name={self.full_name}, email={self.email}, id={self.id} role={self.role})>"

class UserAddress(BaseModel):
    __tablename__ = 'addresses'

    # Fields for storing address details
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user: Mapped['User'] = relationship("User", back_populates="shipping_addresses")

    street: Mapped[str] = mapped_column(String(50), nullable=False)
    city: Mapped[str] = mapped_column(String(50), nullable=False)
    state: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(String(50), nullable=False)
    zipcode: Mapped[str] = mapped_column(String(50), nullable=False)
    is_default: Mapped[bool] = mapped_column(Boolean, default=False)

    # Convert to dictionary format (useful for JSON responses)
    def to_dict(self):
        return {
            'id': self.id,
            'street': self.street,
            'city': self.city,
            'state': self.state,
            'country': self.country,
            'zipcode': self.zipcode,
            'is_default': self.is_default
        }

    def from_dict(self, data):
            for field in ['street', 'city', 'state', 'country', 'zipcode', 'user_id']:
                if field in data:
                    setattr(self, field, data[field])

    # Format address as a single string
    def formatted_address(self):
        return f"{self.street}, {self.city}, {self.state}, {self.country}, {self.zipcode}"

    def __repr__(self):
        return (f"<UserAddress(id={self.id}, user_id={self.user_id}, street='{self.street}', "
                f"city='{self.city}', state='{self.state}', country='{self.country}', "
                f"zipcode='{self.zipcode}', is_default={self.is_default})>")
