"""
backend/app/schemas.py
Pydantic v2 request/response models.
"""
from pydantic import BaseModel, Field, field_validator


class PredictRequest(BaseModel):
    email_text: str = Field(
        ...,
        min_length=1,
        max_length=10_000,
        description="Raw email text to classify",
    )

    @field_validator("email_text")
    @classmethod
    def strip_whitespace(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("email_text must not be blank")
        return stripped


class PredictResponse(BaseModel):
    label: str = Field(..., description="'spam' or 'ham'")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Model confidence [0, 1]")


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
