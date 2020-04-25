from sqlalchemy import Table, Column, Integer, String, ForeignKey, UniqueConstraint

from utils import metadata


solution = Table(
    "solution",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("organization_fk", Integer, ForeignKey("organization.id"), nullable=True),

    Column("label", String(60), unique=True, nullable=False),
    Column("one_liner", String(length=140), nullable=True),
    Column("description", String(length=500), nullable=True),
    Column("twitter", String(40), nullable=True),
    Column("url", String(100), nullable=True)
)


category_solution = Table(
    "category_solution",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("category_fk", Integer, nullable=False),
    Column("solution_fk", Integer, nullable=False),

    UniqueConstraint("category_fk", "solution_fk", name="category_solution_unique")
)
