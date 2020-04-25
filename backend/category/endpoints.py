from starlette.endpoints import HTTPEndpoint

from utils import RapidJSONResponse, db
from category.models import category


class CategoryEndpoint(HTTPEndpoint):
    async def get(self, request):
        await db.connect()
        rows = await db.fetch_all(category.select())
        data = [[v for v in row.values()] for row in rows]
        await db.disconnect()
        return RapidJSONResponse({
            "columns": [
                k for k in rows[0].keys()
            ],
            "rows": data
        })
