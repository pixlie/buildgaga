"""Solution init

Revision ID: cb023cff5fc8
Revises: a240cc945c0b
Create Date: 2020-04-25 15:27:37.805075

"""
from alembic import op
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint


# revision identifiers, used by Alembic.
revision = "cb023cff5fc8"
down_revision = "a240cc945c0b"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "solution",

        Column("id", Integer, primary_key=True),
        Column("organization_fk", Integer, ForeignKey("organization.id"), nullable=True),

        Column("label", String(60), unique=True, nullable=False),
        Column("one_liner", String(length=160), nullable=True),
        Column("description", String(length=500), nullable=True),
        Column("twitter", String(40), nullable=True),
        Column("url", String(100), nullable=True)
    )
    op.create_table(
        "category_solution",

        Column("id", Integer, primary_key=True),
        Column("category_fk", Integer, nullable=False),
        Column("solution_fk", Integer, nullable=False),

        UniqueConstraint("category_fk", "solution_fk", name="category_solution_unique")
    )


def downgrade():
    op.drop_table("category_solution")
    op.drop_table("solution")
