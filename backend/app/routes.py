"""
backend/app/routes.py
API route handlers — thin wrapper around model_core.predict_email
DO NOT add any ML logic here. Only call predict_email().
"""
import logging
from fastapi import APIRouter, HTTPException
from app.schemas import PredictRequest, PredictResponse, HealthResponse

# Import ONLY the public interface from model_core (user's IP)
try:
    from model_core import predict_email  # type: ignore[import]
    MODEL_LOADED = True
except ImportError:
    MODEL_LOADED = False
    predict_email = None  # type: ignore

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["System"])
async def health_check():
    """Liveness probe — used by Render and load balancers."""
    return HealthResponse(
        status="ok" if MODEL_LOADED else "model_unavailable",
        version="1.0.0",
    )


@router.post("/predict", response_model=PredictResponse, tags=["Inference"])
async def predict(payload: PredictRequest):
    """
    Classify a raw email string as spam or ham.

    - **email_text**: Raw email body (1 – 10 000 chars)
    - Returns **label** ('spam' | 'ham') and **confidence** [0.0, 1.0]
    """
    if not MODEL_LOADED or predict_email is None:
        raise HTTPException(
            status_code=503,
            detail="ML model is not available. Ensure model_core.py is present.",
        )

    try:
        # ──────────────────────────────────────────────────────────
        # THE ONLY ALLOWED CALL INTO USER'S ML INTELLECTUAL PROPERTY
        result = predict_email(payload.email_text)
        # ──────────────────────────────────────────────────────────

        # Normalise whatever dict-like object model_core returns
        label: str = str(result.get("label", "unknown")).lower()
        confidence: float = float(result.get("confidence", 0.0))

        return PredictResponse(label=label, confidence=confidence)

    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Prediction failed: %s", exc, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="Inference failed. Please try again.",
        )
