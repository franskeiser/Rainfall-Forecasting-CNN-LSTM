# System Architecture

## Overview

The Manila Flood Forecast system follows a three-tier architecture aligned with the dissertation's conceptual framework (Input → Process → Output):

```
┌─────────────────────────────────────────────────────────────┐
│                        INPUTS                               │
│  PAGASA rainfall │ Radar grids │ DEM │ Land use │ Drainage  │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                     PROCESSING                              │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ Spatial Stream   │  │ Temporal Stream  │                 │
│  │ (CNN on grids)   │  │ (LSTM on series) │                 │
│  └────────┬─────────┘  └────────┬─────────┘                 │
│           └────────┬────────────┘                           │
│               Late Fusion                                   │
│                    │                                        │
│          GIS Overlay Analysis                               │
│     (terrain × land use × drainage)                         │
└─────────────────────────────┬───────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                       OUTPUTS                               │
│  Rainfall forecasts │ Flood risk maps │ Dashboard           │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

### Frontend (React + Vite + Leaflet)
- Interactive flood risk map of Manila with barangay-level overlays
- Rainfall forecast time-series charts
- Historical comparison and model performance views
- Communicates with backend over REST (JSON / GeoJSON)

### Backend (FastAPI)
- `/api/v1/forecast` — serves rainfall predictions from the multi-stream model
- `/api/v1/flood-risk` — runs GIS overlay and returns risk maps
- `/api/v1/gis` — serves GIS layers (elevation, drainage, land use)
- Caches recent forecasts in Redis (forecasts don't change until new observation arrives)
- Reads from PostGIS for persistent spatial data

### ML Pipeline
- **Training:** offline, logged to MLflow
- **Inference:** model loaded at backend startup, invoked per-request
- **Two models maintained:**
  - `multi_stream_cnn_lstm` (the proposed approach)
  - `baseline_cnn_lstm` (single-pipeline, for Problem #2 comparison)

### Database Layer
- **PostgreSQL + PostGIS:** spatial layers, forecast history, barangay boundaries
- **Redis:** forecast cache, session data

## Data Flow (Forecast Request)

```
User clicks "Forecast 24h"
  → Frontend calls POST /api/v1/forecast
  → Backend checks Redis cache
    ├─ Cache hit → return cached result
    └─ Cache miss:
       → Fetch latest observations from DB
       → Preprocess to (spatial_grid, temporal_series)
       → Run multi-stream CNN-LSTM inference
       → Store result in Redis (TTL 1 hour)
       → Return JSON
  → Frontend renders chart + updates map overlay
```

## Deployment Targets

- **Development:** each team member runs locally (see setup-guide.md)
- **Staging:** shared VM (DigitalOcean droplet or PUP server) auto-deployed from `develop`
- **Demo / Thesis Defense:** production-like deploy from `main` tagged releases

## Technology Decisions Log

| Decision                          | Choice             | Rationale                                    |
|-----------------------------------|--------------------|-----------------------------------------------|
| Frontend framework                | React + Vite       | SPA, fast HMR, simple for a thesis project    |
| Backend framework                 | FastAPI            | Async, Python-native (same as ML), auto docs  |
| ML framework                      | TensorFlow 2       | Mature ConvLSTM support, easier serving       |
| Map library                       | Leaflet            | Free, lightweight, sufficient for city-scale  |
| Database                          | PostgreSQL+PostGIS | Industry standard for spatial data            |
| Experiment tracking               | MLflow             | Needed to compare multi-stream vs baseline    |
