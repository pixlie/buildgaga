"""Organization init

Revision ID: a240cc945c0b
Revises: 52f868dab2a0
Create Date: 2020-04-25 15:27:31.271583

"""
from alembic import op
from sqlalchemy import Column, Integer, String


# revision identifiers, used by Alembic.
revision = "a240cc945c0b"
down_revision = "b8d724e2555b"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "organization",

        Column("id", Integer, primary_key=True),

        Column("label", String(60), unique=True, nullable=False),
        Column("description", String(160), nullable=True),
        Column("url", String(100), nullable=True)
    )


def downgrade():
    op.drop_table("organization")
