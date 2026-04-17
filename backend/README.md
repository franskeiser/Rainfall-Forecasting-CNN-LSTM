# Backend — FastAPI Service

## Run Locally

```bash
# From the backend/ directory
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Make sure PostgreSQL and Redis are running on your machine
# (see docs/setup-guide.md)

# Start the dev server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API docs are auto-generated at http://localhost:8000/docs.

## Run Tests

```bash
pytest tests/ -v
```

## Project Layout

```
app/
├── api/v1/       REST endpoints (forecast, flood_risk, gis)
├── core/         Config and shared utilities
├── db/           Database models and sessions (to be added)
├── services/     Business logic (to be added)
└── main.py       FastAPI entrypoint
tests/            Pytest test suite
```
