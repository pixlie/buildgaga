"""Category init

Revision ID: b8d724e2555b
Revises:
Create Date: 2020-04-25 15:26:49.999594

"""
from alembic import op
from sqlalchemy import Column, Integer, String, ForeignKey


# revision identifiers, used by Alembic.
revision = "b8d724e2555b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "category",

        Column("id", Integer, primary_key=True),
        Column("parent_fk", Integer, ForeignKey("category.id"), nullable=True),

        Column("label", String(length=60), unique=True, nullable=False),
        Column("one_liner", String(length=140), nullable=True),
        Column("description", String(length=500), nullable=True),
        Column("url", String(100), nullable=True)
    )


def downgrade():
    op.drop_table("category")
