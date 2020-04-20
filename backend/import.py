import os
from sqlalchemy import create_engine, select
from sqlalchemy.exc import IntegrityError
from csv import DictReader

from settings import DATABASE_URL
from models.objective import objective


def read_objective():
    engine = create_engine(DATABASE_URL)
    conn = engine.connect()

    with open(os.path.abspath(os.path.join(".", "fixtures", "objective.csv")), "r") as file:
        csvrd = DictReader(file, delimiter=",", quotechar='"')
        i = 0
        for row in csvrd:
            row.pop("id", None)
            parent = row.pop("parent", None)

            if parent != "":
                parent_fk = conn.execute(select([objective.c.id]).where(objective.c.label == parent)).scalar()
                row["parent_fk"] = parent_fk

            try:
                conn.execute(objective.insert().values(**row))
                print("Inserted: ", row)
            except IntegrityError:
                pass


if __name__ == "__main__":
    read_objective()
