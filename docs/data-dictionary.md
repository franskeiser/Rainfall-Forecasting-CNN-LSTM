# Data Dictionary

## Meteorological Inputs

| Field              | Type      | Unit     | Description                          | Source  |
|--------------------|-----------|----------|--------------------------------------|---------|
| timestamp          | datetime  | UTC      | Observation time                     | PAGASA  |
| station_id         | string    | —        | PAGASA station identifier            | PAGASA  |
| rainfall           | float     | mm/hr    | Hourly rainfall intensity            | PAGASA  |
| temperature        | float     | °C       | Air temperature                      | PAGASA  |
| humidity           | float     | %        | Relative humidity                    | PAGASA  |
| wind_speed         | float     | m/s      | Wind speed                           | PAGASA  |
| pressure           | float     | hPa      | Atmospheric pressure                 | PAGASA  |

## Spatial / Hydrological Inputs

| Layer               | Format    | Resolution | Description                          | Source    |
|---------------------|-----------|------------|--------------------------------------|-----------|
| elevation_dem       | GeoTIFF   | 30m        | Digital elevation model              | USGS SRTM |
| land_use            | GeoJSON   | parcel     | Land cover classification            | OSM       |
| drainage_network    | GeoJSON   | vector     | Drainage / canal network             | OSM       |
| manila_boundary     | GeoJSON   | polygon    | City boundary                        | PhilGIS   |
| barangay_boundaries | GeoJSON   | polygon    | Barangay polygons (897 in Manila)    | PhilGIS   |

## Urban / Flood-Related Inputs

| Field              | Type      | Description                               | Source   |
|--------------------|-----------|-------------------------------------------|----------|
| flood_event_id     | string    | Unique ID per historical flood event      | NDRRMC   |
| event_date         | date      | Date of flooding                          | NDRRMC   |
| affected_barangays | string[]  | List of affected barangays                | NDRRMC   |
| peak_depth         | float     | Peak water depth (m)                      | NDRRMC   |
| duration_hours     | int       | Duration of flooding                      | NDRRMC   |

## Model Outputs

| Field                 | Type      | Unit    | Description                              |
|-----------------------|-----------|---------|------------------------------------------|
| forecast_id           | string    | —       | Unique forecast ID                       |
| generated_at          | datetime  | UTC     | When forecast was produced               |
| horizon_hours         | int       | hours   | Prediction horizon (24, 48, or 72)       |
| predicted_rainfall    | float[]   | mm/hr   | Hourly predictions                       |
| confidence_interval   | tuple     | mm/hr   | (lower, upper) bounds                    |
| model_version         | string    | —       | e.g., "v0.1.0"                           |

## Risk Output

| Field              | Type      | Description                                  |
|--------------------|-----------|----------------------------------------------|
| barangay_id        | string    | Barangay PSGC code                           |
| risk_level         | string    | "low", "moderate", "high", "very_high"       |
| risk_score         | float     | Normalized 0–1                               |
| contributing_factors | object  | {rainfall: 0.6, elevation: 0.2, ...}         |
