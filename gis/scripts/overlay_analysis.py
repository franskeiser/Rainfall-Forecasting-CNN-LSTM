"""
GIS Overlay Analysis
====================
Combines predicted rainfall with static spatial layers (terrain, land use,
drainage) to produce a per-barangay flood risk score.

Implements the GIS-based flood risk assessment step of the dissertation's
conceptual framework.
"""
from __future__ import annotations

from pathlib import Path

import geopandas as gpd
import numpy as np
import pandas as pd
import rasterio
from rasterio.mask import mask

LAYERS_DIR = Path(__file__).parent.parent / "layers"


def load_barangays() -> gpd.GeoDataFrame:
    """Load Manila barangay boundaries."""
    return gpd.read_file(LAYERS_DIR / "barangay_boundaries.geojson")


def load_drainage() -> gpd.GeoDataFrame:
    """Load drainage network."""
    return gpd.read_file(LAYERS_DIR / "drainage_network.geojson")


def mean_elevation_per_barangay(
    barangays: gpd.GeoDataFrame, dem_path: Path
) -> gpd.GeoDataFrame:
    """Compute mean elevation inside each barangay polygon."""
    with rasterio.open(dem_path) as src:
        elevations = []
        for geom in barangays.geometry:
            try:
                out_image, _ = mask(src, [geom], crop=True, nodata=np.nan)
                arr = out_image[0].astype(float)
                arr[arr == src.nodata] = np.nan
                elevations.append(float(np.nanmean(arr)))
            except Exception:
                elevations.append(np.nan)
    barangays = barangays.copy()
    barangays["mean_elevation"] = elevations
    return barangays


def compute_risk_score(
    barangays: gpd.GeoDataFrame,
    rainfall_mm: dict[str, float],
    weights: dict[str, float] | None = None,
) -> gpd.GeoDataFrame:
    """
    Compute flood risk score per barangay.

    Args:
        barangays: GeoDataFrame with 'mean_elevation' and 'barangay_id'
        rainfall_mm: dict mapping barangay_id -> predicted rainfall (mm)
        weights: factor weights (rainfall, elevation, drainage_density)
    """
    weights = weights or {"rainfall": 0.5, "elevation": 0.3, "drainage": 0.2}

    barangays = barangays.copy()
    barangays["rainfall_mm"] = barangays["barangay_id"].map(rainfall_mm).fillna(0)

    # Normalize factors to 0-1
    rain = _minmax(barangays["rainfall_mm"])
    # Lower elevation = higher risk, so invert
    elev = 1 - _minmax(
        barangays["mean_elevation"].fillna(barangays["mean_elevation"].mean())
    )
    drain = _minmax(barangays.get("drainage_density", pd.Series([0] * len(barangays))))

    barangays["risk_score"] = (
        weights["rainfall"] * rain
        + weights["elevation"] * elev
        + weights["drainage"] * drain
    )

    bins = [-0.01, 0.25, 0.5, 0.75, 1.01]
    labels = ["low", "moderate", "high", "very_high"]
    barangays["risk_level"] = pd.cut(
        barangays["risk_score"], bins=bins, labels=labels
    )
    return barangays


def _minmax(series: pd.Series) -> pd.Series:
    s = series.astype(float)
    rng = s.max() - s.min()
    if rng == 0 or np.isnan(rng):
        return s * 0
    return (s - s.min()) / rng


if __name__ == "__main__":
    print("GIS overlay module — import and call compute_risk_score()")
