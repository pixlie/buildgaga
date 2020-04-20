from sqlalchemy import Table, Column, Integer, String, ForeignKey

from utils import metadata


objective = Table(
    "objective",
    metadata,

    Column("id", Integer, primary_key=True),
    Column("parent_fk", Integer, ForeignKey("objective.id"), nullable=True),

    Column("label", String(length=60), unique=True, nullable=False),
    Column("one_liner", String(length=140), nullable=True),
    Column("description", String(length=500), nullable=True),
    Column("url", String(100), nullable=True)
)
