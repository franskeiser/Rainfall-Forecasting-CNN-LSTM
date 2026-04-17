"""
Manila Flood Forecast - FastAPI Backend
Entry point for the API service.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import flood_risk, forecast, gis
from app.core.config import settings

app = FastAPI(
    title="Manila Flood Forecast API",
    description="Rainfall forecasting and flood risk assessment for the City of Manila",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(forecast.router, prefix="/api/v1/forecast", tags=["forecast"])
app.include_router(flood_risk.router, prefix="/api/v1/flood-risk", tags=["flood-risk"])
app.include_router(gis.router, prefix="/api/v1/gis", tags=["gis"])


@app.get("/")
async def root():
    return {
        "service": "Manila Flood Forecast API",
        "version": "0.1.0",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    return {"status": "ok"}
