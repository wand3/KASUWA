from app import db
from .base_model import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, Float
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
    category: Mapped['Category'] = relationship("Category", back_populates="products")
    product_images: Mapped[List['ProductImage']] = relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")

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
            'product_images': [image.image_path for image in self.product_images]
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
    shipping: Mapped[int] = mapped_column(Integer, default=1)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user: Mapped['User'] = relationship("User", back_populates="cart")

    def to_dict(self):
        product = Product.query.get(self.product_id)
        return {
            'id': self.id,
            'product': product.to_dict(),
            'quantity': self.quantity,
            'shipping': self.shipping
        }

    def from_dict(self, data):
        for field in ['product_id', 'quantity', 'shipping', 'user_id']:
            if field in data:
                setattr(self, field, data[field])

    def __repr__(self):
            return f"<Cart(id={self.id}, user_id={self.user_id}, quantity={self.quantity})>"
