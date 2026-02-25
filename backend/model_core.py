# backend/model_core.py

import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")

# Load once at startup
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)


def predict_email(email_text: str) -> dict:
    """
    Returns:
    {
        "label": "spam" or "ham",
        "confidence": float between 0 and 1
    }
    """

    # Vectorize
    transformed = vectorizer.transform([email_text])

    # Predict label
    prediction = model.predict(transformed)[0]

    # Predict probability
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(transformed)[0]
        confidence = float(np.max(probabilities))
    else:
        # fallback if model has no probability
        confidence = 1.0

    label = "spam" if prediction == 1 else "ham"

    return {
        "label": label,
        "confidence": confidence
    }
