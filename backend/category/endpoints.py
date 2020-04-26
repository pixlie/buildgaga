from starlette.endpoints import HTTPEndpoint

from utils import RapidJSONResponse, DataMixin
from category.models import category


class CategoryEndpoint(HTTPEndpoint, DataMixin):
    async def get(self, request):
        async with self.database as db:
            rows = await db.fetch_all(category.select())
            data = [[v for v in row.values()] for row in rows]
            return RapidJSONResponse({
                "columns": [
                    k for k in rows[0].keys()
                ],
                "rows": data
            })
