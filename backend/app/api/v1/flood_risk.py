"""Flood risk assessment endpoints."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/map")
async def get_flood_risk_map():
    """Return GeoJSON of current flood risk zones for Manila."""
    # TODO: combine rainfall forecast with DEM, land use, drainage
    return {"type": "FeatureCollection", "features": []}


@router.get("/zones/{barangay}")
async def get_zone_risk(barangay: str):
    """Return flood risk level for a specific barangay."""
    return {"barangay": barangay, "risk_level": "unknown"}
