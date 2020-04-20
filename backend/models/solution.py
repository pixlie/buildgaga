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
    Column("url", String(100), nullable=True)
)


objective_solution = Table(
    "objective_solution",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("objective_fk", Integer, nullable=False),
    Column("solution_fk", Integer, nullable=False),

    UniqueConstraint("objective_fk", "solution_fk", name="objective_solution_unique")
)
