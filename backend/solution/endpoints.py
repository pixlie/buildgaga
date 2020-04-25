from starlette.endpoints import HTTPEndpoint

from utils import RapidJSONResponse, db
from solution.models import solution, category_solution


class SolutionEndpoint(HTTPEndpoint):
    async def get(self, request):
        await db.connect()
        rows = await db.fetch_all(solution.select())
        data = [[v for v in row.values()] for row in rows]
        await db.disconnect()
        return RapidJSONResponse({
            "columns": [
                k for k in rows[0].keys()
            ],
            "rows": data
        })


class CategorySolutionEndpoint(HTTPEndpoint):
    async def get(self, request):
        await db.connect()
        rows = await db.fetch_all(category_solution.select())
        data = [[v for v in row.values()] for row in rows]
        await db.disconnect()
        return RapidJSONResponse({
            "columns": [
                k for k in rows[0].keys()
            ],
            "rows": data
        })
