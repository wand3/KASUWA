from sqlalchemy import Column, Integer, String, Table, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone
from app import db


class BaseModel(db.Model):
    __abstract__ = True

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, index=True, default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    discriminator: Mapped[str] = mapped_column('type', String(50))

    __mapper_args__ = {
        'polymorphic_identity': 'base_model',
        'polymorphic_on': discriminator
    }

    def __repr__(self):
        return f"<{self.__class__.__name__} created at: {self.created_at}, updated at: {self.updated_at}>"
