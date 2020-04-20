from sqlalchemy import Table, Column, Integer, String

from utils import metadata


organization = Table(
    "organization",
    metadata,

    Column("id", Integer, primary_key=True),

    Column("label", String(60), unique=True, nullable=False),
    Column("one_liner", String(length=140), nullable=True),
    Column("url", String(100), nullable=True)
)
