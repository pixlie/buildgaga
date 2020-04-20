"""Initial tables

Revision ID: 52f868dab2a0
Revises: 
Create Date: 2020-04-19 19:13:36.841522

"""
from alembic import op
from sqlalchemy import Column, Integer, String, ForeignKey, UniqueConstraint


# revision identifiers, used by Alembic.
revision = '52f868dab2a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "objective",

        Column("id", Integer, primary_key=True),
        Column("parent_fk", Integer, ForeignKey("objective.id"), nullable=True),

        Column("label", String(length=60), unique=True, nullable=False),
        Column("one_liner", String(length=140), nullable=True),
        Column("description", String(length=500), nullable=True),
        Column("url", String(100), nullable=True)
    )
    op.create_table(
        "organization",

        Column("id", Integer, primary_key=True),

        Column("label", String(60), unique=True, nullable=False),
        Column("description", String(140), nullable=True),
        Column("url", String(100), nullable=True)
    )
    op.create_table(
        "solution",

        Column("id", Integer, primary_key=True),
        Column("organization_fk", Integer, ForeignKey("organization.id"), nullable=True),

        Column("label", String(60), unique=True, nullable=False),
        Column("description", String(140), nullable=True),
        Column("url", String(100), nullable=True)
    )
    op.create_table(
        "objective_solution",

        Column("id", Integer, primary_key=True),
        Column("objective_fk", Integer, nullable=False),
        Column("solution_fk", Integer, nullable=False),

        UniqueConstraint("objective_fk", "solution_fk", name="objective_solution_unique")
    )


def downgrade():
    op.drop_table("category")
