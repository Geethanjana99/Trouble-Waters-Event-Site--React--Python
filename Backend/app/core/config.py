"""
core/config.py
--------------
Centralised application configuration.
Loads environment variables from .env using python-dotenv.
All other modules import settings from here — never directly from os.environ.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Resolve the Backend root directory (two levels up from this file)
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load .env file from the Backend root
load_dotenv(BASE_DIR / ".env")


class Settings:
    """
    Application-wide settings.
    Add new config values here as class attributes.
    """

    # ── LLM ───────────────────────────────────────────────────────────────────
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")

    # ── Agenda ────────────────────────────────────────────────────────────────
    AGENDA_FILE_PATH: Path = BASE_DIR / "agenda.txt"

    # ── Server ────────────────────────────────────────────────────────────────
    ALLOWED_ORIGINS: list[str] = [
        origin.strip() for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,https://trouble-waters.vercel.app"
        ).split(",")
        if origin.strip()
    ]

    # ── LLM Behaviour ─────────────────────────────────────────────────────────
    GEMINI_MODEL: str = "gemini-2.0-flash"
    MAX_EMAIL_TOKENS: int = 600


# Single shared instance — import this everywhere
settings = Settings()
