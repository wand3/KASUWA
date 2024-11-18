import datetime
from re import Match
from app import db
from .base_model import BaseModel
from typing import Optional, List, Dict
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, Float, Enum, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Product(BaseModel):
    __tablename__ = 'products'
    product_name: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    description: Mapped[str] = mapped_column(String(500), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    category_id: Mapped[int] = mapped_column(Integer, ForeignKey('categories.id'), nullable=False)
    quantity: Mapped[Optional[int]] = mapped_column(Integer)
    sold: Mapped[int] = mapped_column(Integer, default=0)
    product_image: Mapped[Optional[str]] = mapped_column(String(64), nullable=True)
    colors: Mapped[List[str]] = mapped_column(JSON, default=[])
    specifications: Mapped[Dict[str, str]] = mapped_column(JSON)
    category: Mapped['Category'] = relationship("Category", back_populates="products")
    product_images: Mapped[List['ProductImage']] = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    reviews: Mapped[List['Review']]= relationship("Review", back_populates="product", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'description': self.description,
            'price': self.price,
            'category_id': self.category_id,
            'quantity': self.quantity,
            'sold': self.sold,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'product_image': self.product_image,
            'product_images': [image.image_path for image in self.product_images],
            'reviews': [review.to_dict() for review in self.reviews],
            'specifications': self.specifications,
            'colors': self.colors
        }

    def to_summary_dict(self):
        return {
            'id': self.id,
            'product_name': self.product_name,
            'price': self.price,
            'quantity': self.quantity,
            'sold': self.sold,
            'product_image': self.product_image
        }

    def __repr__(self):
            return f"<Product(product_name={self.product_name}, product_image={self.product_image}, price={self.price}, quantity={self.quantity}, sold={self.sold})>"


class ProductImage(BaseModel):
    __tablename__ = 'product_images'
    product_id = db.Column(Integer, ForeignKey('products.id'), nullable=False)
    image_path: Mapped[str] = mapped_column(String(255), nullable=False)

    product: Mapped[Product] = relationship("Product", back_populates="product_images")

    def __repr__(self):
            return f"Product Image ('{self.image_path}', '{self.product_id}')"

class Cart(BaseModel):
    __tablename__ = 'carts'

    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id'))
    quantity: Mapped[int] = Column(Integer, default=1)
    shipping_id: Mapped[int] = mapped_column(Integer, ForeignKey('shippings.id'), nullable=False, default=3)
    user_id = mapped_column(Integer, ForeignKey('users.id'), index=True)
    product: Mapped['Product'] = relationship("Product")
    user: Mapped['User'] = relationship("User", back_populates="cart")
    shipping: Mapped['ShippingMethod'] = relationship("ShippingMethod")
    coupon_code = Column(String(50), ForeignKey('coupons.code'), nullable=True)
    coupon = relationship("Coupon", backref="carts")


    def to_dict(self):
        return {
            'id': self.id,
            'product': {
                'id': self.product.id,
                'product_name': self.product.product_name,
                'price': self.product.price,
                'product_image': self.product.product_image
            },
            'quantity': self.quantity,
            'shipping': {
                'id': self.shipping.id,
                'shipping_price': self.shipping.shipping_price,
                'shipping_method_name': self.shipping.shipping_method_name
            }
        }


    def from_dict(self, data):
        for field in ['product_id', 'quantity', 'shipping_id', 'user_id']:
            if field in data:
                setattr(self, field, data[field])


    def total_price(self):
        product_price = self.quantity * self.product.price if self.product and self.product.price is not None else 0
        shipping_price = self.shipping.shipping_price if self.shipping else 0
        subtotal = product_price + shipping_price

        if self.coupon and self.coupon.is_valid():
            # Apply the coupon discount to the product total price
            subtotal = self.coupon.apply_discount(subtotal)

            if self.coupon.discount_type == 'free':
                # Set shipping price to 0 if the coupon is for free shipping
                shipping_price = 0

        return subtotal + shipping_price

    def apply_coupon(self, coupon_code):
        coupon = db.session.query(Coupon).filter_by(code=coupon_code).first()
        if coupon and coupon.is_valid():
            self.coupon_code = coupon_code
            db.session.commit()
            return True, f"Coupon {coupon_code} applied successfully!"
        return False, "Invalid or expired coupon."

    def remove_coupon(self):
        self.coupon_code = None
        db.session.commit()

    def __repr__(self):
        return f"<Cart(id={self.id}, user_id={self.user_id}, quantity={self.quantity})>"


class Review(BaseModel):
    __tablename__ = 'reviews'

    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'), nullable=False)
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id'), nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    message: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    images: Mapped[List['ReviewImage']] = relationship("ReviewImage", back_populates="review", cascade="all, delete-orphan")

    user: Mapped['User'] = relationship("User", back_populates="reviews")
    product: Mapped['Product'] = relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_email': self.user.email,
            'product_id': self.product_id,
            'rating': self.rating,
            'message': self.message,
            'images': [image.image_path for image in self.images]
        }

    def __repr__(self):
        return f"<Review(user_id={self.user_id}, product_id={self.product_id}, rating={self.rating})>"

class ReviewImage(BaseModel):
    __tablename__ = 'review_images'

    review_id: Mapped[int] = mapped_column(Integer, ForeignKey('reviews.id'), nullable=False)
    image_path: Mapped[str] = mapped_column(String(255), nullable=False)

    review: Mapped[Review] = relationship("Review", back_populates="images")

    def __repr__(self):
        return f"<ReviewImage(image_path={self.image_path}, review_id={self.review_id})>"

class ShippingMethod(BaseModel):
    __tablename__ = 'shippings'

    shipping_method_name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    shipping_price: Mapped[float] = mapped_column(Float, nullable=False)
    delivery_time: Mapped[str] = mapped_column(String, nullable=False)

    def from_dict(self, data):
        for field in ['shipping_method_name', 'shipping_price', 'delivery_time']:
            if field in data:
                setattr(self, field, data[field])

    def to_dict(self):
        return {
            'id': self.id,
            'shipping_method_name': self.shipping_method_name,
            'shipping_price': self.shipping_price,
            'delivery_time': self.delivery_time
        }

    def __repr__(self):
        return f"ShippingMethod(id={self.id}, shipping_method_name='{self.shipping_method_name}', shipping_price={self.shipping_price}, delivery_time='{self.delivery_time}')"

class Coupon(BaseModel):
    __tablename__ = 'coupons'

    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    discount_type: Mapped[str] = mapped_column(Enum('percentage', 'fixed', 'free', name='discount_type'), nullable=False)
    discount_value: Mapped[int] = mapped_column(Integer, nullable=False)
    end_date: Mapped[datetime] = mapped_column(DateTime)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    min_order_value: Mapped[int] = mapped_column(Integer, default=0)

    def is_valid(self):
        return self.is_active and (self.end_date >= datetime.utcnow())

    def apply_discount(self, total_price, shipping_price=0):
        if self.discount_type == 'percentage':
            return total_price * (1 - self.discount_value / 100)
        elif self.discount_type == 'fixed':
            return max(0, total_price - self.discount_value)
        elif self.discount_type == 'free':
            return total_price
        return total_price
