from app import db
from .base_model import BaseModel
from typing import Optional
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Category(BaseModel):
    __tablename__ = 'categories'

    category_name: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    products: Mapped[list['Product']] = relationship("Product", back_populates="category")

    def __repr__(self):
        return f"<Category(category_name={self.category_name}, id={self.id})>"
