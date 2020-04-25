import sys
from collections import namedtuple
from sqlalchemy import create_engine, select
from sqlalchemy.exc import IntegrityError
import pyexcel

from settings import DATABASE_URL
from category.models import category


def read_category():
    engine = create_engine(DATABASE_URL)
    conn = engine.connect()

    book = pyexcel.get_book(file_name=sys.argv[1])
    sheet = book.sheet_by_name("Category")
    i = 0
    CategoryNT = namedtuple("Category", ["label", "parent", "one_liner"])

    for record in map(CategoryNT._make, sheet.rows()):
        if i == 0 or record.label == "":
            i += 1
            continue
        row = record._asdict()
        parent = row.pop("parent", None)

        if parent != "":
            parent_fk = conn.execute(select([category.c.id]).where(category.c.label == parent)).scalar()
            row["parent_fk"] = parent_fk

        try:
            conn.execute(category.insert().values(**row))
            print("Inserted: ", row)
        except IntegrityError:
            pass
        i += 1


if __name__ == "__main__":
    read_category()
