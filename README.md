# Manila Flood Forecast

> Rainfall Forecasting and Flood Risk Assessment in Manila using Multi-Stream CNN-LSTM with GIS-Based Integration

A dissertation project by Andrade, Calumpit, Hubilla, and Saladino — Polytechnic University of the Philippines, Graduate School, Computer Science.

## Overview

This system forecasts short-term rainfall (24–72 hrs) in the City of Manila using a multi-stream CNN-LSTM architecture and translates predictions into dynamic flood risk maps through GIS integration.

## Architecture

- **Frontend** — React + Vite + Axios + Leaflet dashboard for interactive flood risk visualization
- **Backend** — FastAPI service serving forecasts and GIS overlays
- **ML** — Multi-stream CNN-LSTM (separate spatial and temporal encoders) + baseline for comparison
- **GIS** — PostGIS + GeoPandas for spatial overlay analysis
- **Database** — PostgreSQL + PostGIS, Redis for caching

## Quick Start

Full step-by-step instructions are in [`docs/setup-guide.md`](docs/setup-guide.md). Short version:

```bash
# 1. Clone
git clone https://github.com/<org>/manila-flood-forecast.git
cd manila-flood-forecast

# 2. Copy root env file
cp .env.example .env
# Edit .env with your local database password

# 3. Install PostgreSQL + PostGIS and Redis locally (see setup-guide.md)

# 4. Backend
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 5. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev

# 6. ML (new terminal, for experiments)
cd ml
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
jupyter lab
```

Once running:
- Frontend → http://localhost:3000
- Backend API docs → http://localhost:8000/docs
- MLflow → http://localhost:5000 (run `mlflow ui` in ml/ folder)

## Project Structure

```
frontend/   React + Vite + Axios dashboard
backend/    FastAPI service
ml/         CNN-LSTM training & inference
gis/        Geospatial layers and scripts
docs/       Architecture, API, model card
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branching, commit, and PR conventions.

## License

Academic use — Polytechnic University of the Philippines, 2027.
