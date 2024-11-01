from app import db
from .base_model import BaseModel
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship

class Order(BaseModel):
    __tablename__ = 'orders'

    transaction_id: Mapped[str] = mapped_column(String(256), unique=True)
    amount: Mapped[float] = mapped_column(Float)
    address: Mapped[str] = mapped_column(String(256))
    status: Mapped[str] = mapped_column(String(20), default="Not processed")
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user: Mapped['User'] = relationship("User", back_populates="orders")
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey('products.id'))
    reference: Mapped[str] = mapped_column(String(256))

    def __repr__(self):
        return f"<Order(transaction_id={self.transaction_id}, amount={self.amount}, status={self.status})>"
