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

    amount: Mapped[float] = mapped_column(Float, nullable=False)
    transaction_id: Mapped[str] = mapped_column(String(64))
    address_id: Mapped[int] = mapped_column(Integer, ForeignKey('addresses.id'), nullable=False)
    address: Mapped['UserAddress'] = relationship("UserAddress")
    status: Mapped[str] = mapped_column(String(20), default="Pending")
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user: Mapped['User'] = relationship("User", back_populates="orders")
    reference: Mapped[str] = mapped_column(String(64), unique=True)
    items: Mapped[List['OrderItem']] = relationship("OrderItem", back_populates="order")

    def to_dict(self):
            return {
                'id': self.id,
                'amount': self.amount,
                'status': self.status,
                'user_id': self.user_id,
                'reference': self.reference,
                'created_at': self.created_at,
                'updated_at': self.updated_at,
                'transaction_id': self.transaction_id,
                'address': self.address.formatted_address() if self.address else None,
            }

    def __repr__(self):
        return f"<Order(amount={self.amount}, status={self.status})>"
