"""names

Revision ID: 9f1b6e69363e
Revises: 275d4fd3e062
Create Date: 2024-10-17 17:10:50.581490

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f1b6e69363e'
down_revision = '275d4fd3e062'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('images',
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('image_path', sa.String(length=255), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.Column('type', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_images_created_at'), ['created_at'], unique=False)

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_column('photo_data')
        batch_op.drop_column('photo_content_type')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.add_column(sa.Column('photo_content_type', sa.VARCHAR(), nullable=True))
        batch_op.add_column(sa.Column('photo_data', sa.BLOB(), nullable=True))

    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_images_created_at'))

    op.drop_table('images')
    # ### end Alembic commands ###