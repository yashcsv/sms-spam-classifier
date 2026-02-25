"""
backend/app/config.py
Environment-based configuration for production safety.
"""
import os
from functools import lru_cache
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "SpamShield API"
    app_version: str = "1.0.0"
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    allowed_origins: list[str] = ["*"]  # Tighten in production via env var
    max_requests_per_minute: int = 60

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
