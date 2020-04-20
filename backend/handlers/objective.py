from starlette.endpoints import HTTPEndpoint
from databases.backends.postgres import Record

from utils import RapidJSONResponse, db
from models.objective import objective


class Objective(HTTPEndpoint):
    async def get(self, request):
        await db.connect()
        rows = await db.fetch_all(objective.select())
        data = [[v for v in row.values()] for row in rows]
        await db.disconnect()
        return RapidJSONResponse({
            "columns": [
                k for k in rows[0].keys()
            ],
            "rows": data
        })
