"""Application configuration loaded from environment variables."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    APP_ENV: str = "development"
    APP_DEBUG: bool = True
    APP_SECRET_KEY: str = "change-me"

    DATABASE_URL: str = (
        "postgresql://flood_user:change-me@localhost:5432/manila_flood"
    )
    REDIS_URL: str = "redis://localhost:6379/0"

    MODEL_PATH: str = "../ml/artifacts/multi_stream_cnn_lstm.keras"
    MODEL_VERSION: str = "v0.1.0"

    CORS_ORIGINS: list[str] = ["http://localhost:3000"]


settings = Settings()
