import uvicorn
from starlette.applications import Starlette
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route

from category.endpoints import CategoryEndpoint
from solution.endpoints import SolutionEndpoint, CategorySolutionEndpoint


handlers = [
    Route(r"/api/category/", CategoryEndpoint),
    Route(r"/api/solution/", SolutionEndpoint),
    Route(r"/api/category_solution/", CategorySolutionEndpoint),
]


middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:45678"],
        allow_methods=["OPTIONS", "GET"],
        allow_headers="Authorization,Access-Control-Allow-Headers,Origin,Accept,X-Requested-With"
                      ",Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers"
    )
]


# app = Starlette(debug=True, routes=handlers, exception_handlers=exception_handlers)
app = Starlette(debug=True, routes=handlers, middleware=middleware)


if __name__ == "__main__":
    uvicorn.run(app=app, host="localhost", port=8000)
