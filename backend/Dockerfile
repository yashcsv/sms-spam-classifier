# ── SpamShield API — Dockerfile ────────────────────────────────────────────
# Targets: Render free tier, any OCI-compliant registry
# Image: python:3.11-slim (no ML artifacts shipped — model loads from model_core.py)
# ──────────────────────────────────────────────────────────────────────────

FROM python:3.11-slim AS base

# Security: drop root early
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

# Create non-root user
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup appuser

# Install dependencies first (layer cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ./app/
COPY model_core.py .

# Drop to non-root
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')"

# Production server: uvicorn with 2 workers (Render free = 0.5 vCPU)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
