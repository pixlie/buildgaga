import uvicorn
from starlette.applications import Starlette
from starlette.routing import Route

from category.endpoints import CategoryEndpoint


handlers = [
    Route(r"/api/category/", CategoryEndpoint),
    # Route(r"/api/solution/", get_valid_edge, methods=["GET"])
]


# app = Starlette(debug=True, routes=handlers, exception_handlers=exception_handlers)
app = Starlette(debug=True, routes=handlers)


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
