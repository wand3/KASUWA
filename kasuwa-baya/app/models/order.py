from app import db
from .base_model import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

class OrderItem(BaseModel):
    __tablename__ = 'order_items'

    order_id: Mapped[int] = mapped_column(Integer, ForeignKey('orders.id'))
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id'))
    quantity: Mapped[int] = Column(Integer, default=1)

    order: Mapped['Order'] = relationship("Order", back_populates="items")
    product: Mapped['Product'] = relationship("Product")

class Order(BaseModel):
    __tablename__ = 'orders'

    transaction_id: Mapped[str] = mapped_column(String(256), unique=True)
    amount: Mapped[float] = mapped_column(Float)
    address: Mapped[str] = mapped_column(String(256))
    status: Mapped[str] = mapped_column(String(20), default="Not processed")
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user: Mapped['User'] = relationship("User", back_populates="orders")
    reference: Mapped[str] = mapped_column(String(256))
    items: Mapped[List['OrderItem']] = relationship("OrderItem", back_populates="order")

    def __repr__(self):
        return f"<Order(transaction_id={self.transaction_id}, amount={self.amount}, status={self.status})>"
