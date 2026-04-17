# GIS Data & Scripts

## Layers Directory

Place GIS files here (most are `.gitignored` due to size):

| File                           | Type    | Source                                       |
|--------------------------------|---------|----------------------------------------------|
| `manila_boundary.geojson`      | vector  | PhilGIS                                      |
| `barangay_boundaries.geojson`  | vector  | PhilGIS / PSA                                |
| `elevation_dem.tif`            | raster  | USGS SRTM 30m or PhilGIS LiDAR if available  |
| `drainage_network.geojson`     | vector  | OpenStreetMap                                |
| `land_use.geojson`             | vector  | OpenStreetMap / NAMRIA                       |

## Coordinate Reference System

All layers should be reprojected to **EPSG:4326** (WGS84) for web display and **EPSG:32651** (UTM Zone 51N) for accurate area/distance calculations in Manila.

## Scripts

- `overlay_analysis.py` — computes per-barangay flood risk from rainfall + terrain + drainage

## Running Scripts

```bash
# From the project root, activate the ml virtual env
cd ml
source venv/bin/activate       # Windows: venv\Scripts\activate
cd ../gis
python scripts/overlay_analysis.py
```

## Download Instructions

```bash
# SRTM DEM (requires EarthExplorer account)
# Area of interest: 14.55-14.65 N, 120.95-121.05 E

# OSM extract (using osmium-tool)
osmium extract -b 120.94,14.55,121.05,14.65 philippines.osm.pbf -o manila.osm.pbf

# Convert OSM to GeoJSON
osmium export manila.osm.pbf -o manila.geojson
```
