"""GIS layer endpoints (elevation, drainage, land use)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/layers")
async def list_layers():
    """Return available GIS layers."""
    return {
        "layers": [
            {"id": "manila_boundary", "type": "vector"},
            {"id": "elevation_dem", "type": "raster"},
            {"id": "drainage_network", "type": "vector"},
            {"id": "land_use", "type": "vector"},
        ]
    }


@router.get("/layers/{layer_id}")
async def get_layer(layer_id: str):
    """Return a specific GIS layer as GeoJSON."""
    return {"layer_id": layer_id, "data": None}
