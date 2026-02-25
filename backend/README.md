# ── SpamShield AI — Complete Setup & Deployment Guide ──────────────────────

## Project Structure

```
project/
├── backend/               ← FastAPI inference wrapper
│   ├── app/
│   │   ├── main.py        ← App factory, CORS, middleware
│   │   ├── routes.py      ← /predict + /health endpoints
│   │   ├── schemas.py     ← Pydantic v2 I/O models
│   │   └── config.py      ← Environment config
│   ├── model_core.py      ← YOUR ML IP — replace stub with real impl
│   ├── requirements.txt
│   └── Dockerfile
└── src/                   ← React/Vite frontend (this repo)
```

---

## ⚙️ Local Development

### 1. Backend

```bash
cd backend

# Create venv
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate

# Install deps
pip install -r requirements.txt

# Set env vars
export DEBUG=true

# Start server
uvicorn app.main:app --reload --port 8000
```

> API available at http://localhost:8000
> Swagger UI at http://localhost:8000/docs (debug mode only)

### 2. Frontend

```bash
# In project root
cp .env.example .env.local
# Set: VITE_API_URL=http://localhost:8000

npm install
npm run dev
```

---

## 🐳 Docker (Local)

```bash
cd backend
docker build -t spamshield-api .
docker run -p 8000:8000 -e DEBUG=false spamshield-api
```

---

## 🚀 Render Deployment (Backend)

1. Push `backend/` to a GitHub repo (or monorepo)
2. Create a new **Web Service** on [render.com](https://render.com)
3. Settings:
   - **Runtime**: Docker
   - **Dockerfile path**: `backend/Dockerfile`
   - **Port**: `8000`
4. Environment Variables:
   - `DEBUG` = `false`
   - `ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`
5. Deploy → copy your Render URL

---

## ▲ Vercel Deployment (Frontend)

1. Push this repo to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Environment Variables:
   - `VITE_API_URL` = `https://your-render-service.onrender.com`
4. Deploy

---

## 🔐 Environment Variables Reference

| Variable | Where | Description |
|----------|-------|-------------|
| `VITE_API_URL` | Frontend (Vercel) | Full URL of your Render backend |
| `DEBUG` | Backend (Render) | `true` enables /docs; `false` in production |
| `ALLOWED_ORIGINS` | Backend (Render) | Comma-separated CORS origins |

---

## 🛡 Production Hardening Notes

- `/docs` and `/openapi.json` are disabled when `DEBUG=false`
- Global exception handler strips stack traces from responses
- Input capped at 10,000 characters server-side (Pydantic validator)
- Non-root Docker user (`appuser`) reduces container attack surface
- No model artifacts (.pkl / .joblib) are shipped — model loads from `model_core.py`
- All secrets via environment variables, never hard-coded

---

## 📋 model_core.py Contract

Your `predict_email` must return:

```python
{
    "label": "spam",      # or "ham"
    "confidence": 0.97    # float in [0.0, 1.0]
}
```

The FastAPI wrapper will call NOTHING else from your file.
