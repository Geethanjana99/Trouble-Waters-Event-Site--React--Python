"""
main.py
-------
FastAPI application entry point.

Responsibility:
  - Create and configure the FastAPI application instance
  - Register middleware (CORS)
  - Mount all routers
  - Provide the uvicorn entry point

Run with:
    uvicorn app.main:app --reload --port 8000
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router
from app.core.config import settings

# ── Logging Configuration ─────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)


# ── FastAPI App ───────────────────────────────────────────────────────────────

app = FastAPI(
    title="Cogent Solutions — Conference Invitation API",
    description=(
        "AI-powered B2B invitation system for the "
        "'Troubled Waters: Sailing with AI in Supply Chain' summit.\n\n"
        "**Pipeline**: Visitor Input → RAG Session Matching → "
        "LLM Email Generation → MCP Dispatch Simulation"
    ),
    version="1.0.0",
    contact={
        "name": "Accelalpha Events Team",
        "url": "https://www.accelalpha.com",
    },
    docs_url="/docs",       # Swagger UI at http://localhost:8000/docs
    redoc_url="/redoc",     # ReDoc at http://localhost:8000/redoc
)


# ── CORS Middleware ───────────────────────────────────────────────────────────
# Allow the Vite dev server (and common alternatives) to call the API.

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


# ── Routers ───────────────────────────────────────────────────────────────────

app.include_router(router)


# ── Startup Event ─────────────────────────────────────────────────────────────

@app.on_event("startup")
async def on_startup() -> None:
    """
    Pre-warm the RAG engine on startup so the first request is fast.
    Imports rag_service which initialises the singleton matcher immediately.
    """
    logger.info("Server starting up...")
    from app.services import rag_service  # noqa: PLC0415
    rag_service.get_matcher()             # Trigger lazy singleton init
    logger.info("RAG engine pre-warmed. Server ready.")


# ── Root Redirect ─────────────────────────────────────────────────────────────

@app.get("/", include_in_schema=False)
async def root() -> dict:
    return {
        "message": "Cogent Solutions Invitation API",
        "docs": "/docs",
        "health": "/api/health",
    }
