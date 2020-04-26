import sys
from collections import namedtuple
from sqlalchemy import create_engine, select
from sqlalchemy.exc import IntegrityError
import pyexcel

from settings import DATABASE_URL
from category.models import category
from solution.models import solution, category_solution


class ImportFromODS(object):
    _ods_file_path = None
    _engine = None
    _db_conn = None
    _table_config = {
        # "category": {
        #     "table": category,
        #     "ods_columns": ["label", "parent", "one_liner"],
        #     "ods_sheet_name": "Category",
        # },
        # "solution": {
        #     "table": solution,
        #     "ods_columns": ["label", "one_liner", "twitter", "url"],
        #     "ods_sheet_name": "Solution",
        # },
        "category_solution": {
            "table": category_solution,
            "ods_columns": ["solution", "category", "category1", "category2"],
            "ods_sheet_name": "CategorySolution",
        }
    }

    def __init__(self, ods_file_path):
        self._ods_file_path = ods_file_path
        self._engine = create_engine(DATABASE_URL)
        self._db_conn = self._engine.connect()

    def insert_from_sheet(self, name, model_namedtuple, sheet, table):
        i = 0
        for record in map(model_namedtuple._make, sheet.rows()):
            if i == 0:
                i += 1
                continue
            row = record._asdict()
            if hasattr(self, "pre_insert_{}".format(name)):
                row = getattr(self, "pre_insert_{}".format(name))(row)
            if row is None:
                continue

            pk = None
            try:
                result = self._db_conn.execute(table.insert().values(**row))
                pk = result.inserted_primary_key[0]
                print("Inserted: ", result.inserted_primary_key[0], row)
            except IntegrityError as e:
                pass
            finally:
                if hasattr(self, "post_insert_{}".format(name)):
                    getattr(self, "post_insert_{}".format(name))(pk, row)
            i += 1

    def pre_insert_category(self, row):
        if row["label"] == "":
            return None
        row["label"] = row["label"].strip()
        parent = row.pop("parent", None)
        if parent != "":
            parent_fk = self._db_conn.execute(select([category.c.id]).where(category.c.label == parent)).scalar()
            row["parent_fk"] = parent_fk
        return row

    def pre_insert_solution(self, row):
        if row["label"] == "":
            return None
        row["label"] = row["label"].strip()
        return row

    def pre_insert_category_solution(self, row):
        if row["solution"] == "":
            return None
        _solution = row.pop("solution").strip()
        row.pop("category").strip()
        _category = row.pop("category1")
        row.pop("category2")

        row["category_fk"] = self._db_conn.execute(select([category.c.id]).
                                                   where(category.c.label == _category)).scalar()
        row["solution_fk"] = self._db_conn.execute(select([solution.c.id]).
                                                   where(solution.c.label == _solution)).scalar()
        return row

    def import_from_ods(self):
        book = pyexcel.get_book(file_name=sys.argv[1])
        for key, config in self._table_config.items():
            sheet = book.sheet_by_name(config["ods_sheet_name"])
            model_namedtuple = namedtuple(key, config["ods_columns"])
            self.insert_from_sheet(name=key, model_namedtuple=model_namedtuple, sheet=sheet, table=config["table"])


if __name__ == "__main__":
    importer = ImportFromODS(ods_file_path=sys.argv[1])
    importer.import_from_ods()
    # read_category()
