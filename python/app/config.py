from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    mistral_api_key: str = ""
    mistral_model: str = "mistral-small-latest"

    client_url: str = "http://localhost:5173"

    database_url: str = "postgresql://postgres:postgres@localhost:5432/leads-ai"
    better_auth_secret: str = "development-secret-change-me"
    better_auth_url: str = "http://localhost:3200"


@lru_cache
def get_settings() -> Settings:
    return Settings()
