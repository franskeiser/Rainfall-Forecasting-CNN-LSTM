"""Smoke tests for the forecast API."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "Manila Flood Forecast API"


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_create_forecast():
    response = client.post(
        "/api/v1/forecast/",
        json={"horizon_hours": 24, "location": "manila"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["horizon_hours"] == 24
    assert "generated_at" in data
    assert "model_version" in data


def test_list_gis_layers():
    response = client.get("/api/v1/gis/layers")
    assert response.status_code == 200
    assert "layers" in response.json()
