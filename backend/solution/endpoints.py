from starlette.endpoints import HTTPEndpoint

from utils import RapidJSONResponse, DataMixin
from solution.models import solution, category_solution


class SolutionEndpoint(HTTPEndpoint, DataMixin):
    async def get(self, request):
        async with self.database as db:
            rows = await db.fetch_all(solution.select())
            data = [[v for v in row.values()] for row in rows]
            # await db.disconnect()
            return RapidJSONResponse({
                "columns": [
                    k for k in rows[0].keys()
                ],
                "rows": data
            })


class CategorySolutionEndpoint(HTTPEndpoint, DataMixin):
    async def get(self, request):
        async with self.database as db:
            rows = await db.fetch_all(category_solution.select())
            data = [[v for v in row.values()] for row in rows]
            return RapidJSONResponse({
                "columns": [
                    k for k in rows[0].keys()
                ],
                "rows": data
            })
