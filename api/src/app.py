from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import AsyncIterator

from fastapi import FastAPI, Form, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from typing_extensions import TypedDict

from services.database import JSONDatabase


class Quote(TypedDict):
    name: str
    message: str
    time: str


database: JSONDatabase[list[Quote]] = JSONDatabase("data/database.json")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Handle database management when running app."""
    if "quotes" not in database:
        print("Adding quotes entry to database")
        database["quotes"] = []

    yield

    database.close()


app = FastAPI(lifespan=lifespan)

# allow requests from the frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/quote")
def post_message(name: str = Form(), message: str = Form()) -> RedirectResponse:
    """
    Process a user submitting a new quote.
    You should not modify this function except for the return value.
    """
    now = datetime.now()
    quote = Quote(name=name, message=message, time=now.isoformat(timespec="seconds"))
    database["quotes"].append(quote)

    # You may modify the return value as needed to support other functionality
    return RedirectResponse("/", status.HTTP_303_SEE_OTHER)


@app.get("/quotes")
async def get_quotes(time_range: str = "all") -> list[Quote]:
    print(f"Database quotes count: {len(database['quotes'])}")  # <-- add this
    print(f"First quote: {database['quotes'][0] if database['quotes'] else 'None'}")  # <-- add this
    
    now = datetime.now()
    cutoff = datetime.min

    if time_range == "week":
        cutoff = now - timedelta(weeks=1)
    elif time_range == "month":
        cutoff = now - timedelta(days=30)
    elif time_range == "year":
        cutoff = now - timedelta(days=365)
    elif time_range != "all":
        return []  # Error catch

    filtered_quotes = [quote for quote in database["quotes"] if datetime.fromisoformat(quote["time"]) > cutoff]
    return filtered_quotes
