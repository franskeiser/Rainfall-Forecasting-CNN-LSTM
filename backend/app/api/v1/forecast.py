"""Rainfall forecast endpoints."""
from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ForecastRequest(BaseModel):
    horizon_hours: int = 24  # 24, 48, or 72
    location: str = "manila"


class ForecastResponse(BaseModel):
    horizon_hours: int
    generated_at: datetime
    predictions: list[dict]
    model_version: str


@router.post("/", response_model=ForecastResponse)
async def create_forecast(request: ForecastRequest) -> ForecastResponse:
    """Generate a rainfall forecast for the requested horizon."""
    # TODO: Load multi-stream CNN-LSTM and run inference
    return ForecastResponse(
        horizon_hours=request.horizon_hours,
        generated_at=datetime.utcnow(),
        predictions=[],
        model_version="v0.1.0",
    )


@router.get("/latest")
async def get_latest_forecast():
    """Return the most recent cached forecast."""
    return {"status": "not_implemented"}
