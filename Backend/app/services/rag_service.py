"""
services/rag_service.py
------------------------
Retrieval-Augmented Generation (RAG) — Session Matching Layer.

Responsibility:
  1. Parse agenda.txt into structured Session objects.
  2. Build a TF-IDF vector space over all session content.
  3. Given a visitor's free-text input, return the most relevant session
     using cosine similarity.

Design notes:
  - Pure Python + scikit-learn: no external vector DB needed.
  - Agenda is parsed and vectorised ONCE at startup (module-level singleton).
  - Sessions with purely logistical roles (registration, coffee, lunch) are
    deprioritised so visitors are matched to substantive content sessions.
"""

import re
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.core.config import settings


# ── Session Data Model ────────────────────────────────────────────────────────

@dataclass
class Session:
    """A single parsed conference session."""
    session_id: str
    time: str
    title: str
    speaker: str
    focus_keywords: str
    description: str

    def as_corpus_text(self) -> str:
        """
        Combine all textual fields into one string for TF-IDF vectorisation.
        We weight title and keywords more heavily by repeating them.
        """
        return (
            f"{self.title} {self.title} "
            f"{self.focus_keywords} {self.focus_keywords} "
            f"{self.description}"
        ).lower()


# ── Logistical / Non-Content Session IDs to deprioritise ─────────────────────
_LOGISTICAL_SESSION_IDS = {"SESSION_1", "SESSION_6", "SESSION_10"}


# ── Agenda Parser ─────────────────────────────────────────────────────────────

def _parse_agenda(file_path: Path) -> list[Session]:
    """
    Parse the structured agenda.txt file into a list of Session objects.

    The file format uses blocks like:
        [SESSION_N]
        Time: ...
        Title: ...
        Speaker: ...
        Focus Keywords: ...
        Description: ...
    """
    if not file_path.exists():
        raise FileNotFoundError(f"Agenda file not found at: {file_path}")

    text = file_path.read_text(encoding="utf-8")

    # Split on session block headers e.g. [SESSION_1]
    raw_blocks = re.split(r"\[SESSION_\d+\]", text)
    session_ids = re.findall(r"\[SESSION_(\d+)\]", text)

    sessions: list[Session] = []

    for idx, block in enumerate(raw_blocks[1:], start=0):  # skip preamble
        sid = f"SESSION_{session_ids[idx]}"

        def extract(label: str) -> str:
            """Pull a field value from a block line."""
            pattern = rf"^{label}\s*:\s*(.+)$"
            match = re.search(pattern, block, re.MULTILINE | re.IGNORECASE)
            return match.group(1).strip() if match else ""

        sessions.append(
            Session(
                session_id=sid,
                time=extract("Time"),
                title=extract("Title"),
                speaker=extract("Speaker"),
                focus_keywords=extract("Focus Keywords"),
                description=extract("Description"),
            )
        )

    return sessions


# ── RAG Engine ────────────────────────────────────────────────────────────────

class RAGSessionMatcher:
    """
    Encapsulates the TF-IDF vector space and provides session retrieval.

    Usage:
        matcher = RAGSessionMatcher(agenda_path)
        session, score = matcher.find_best_match(user_text)
    """

    def __init__(self, agenda_path: Path) -> None:
        self.sessions: list[Session] = _parse_agenda(agenda_path)
        self._vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),   # Unigrams + bigrams for richer matching
            max_df=0.95,
            min_df=1,
        )

        # Build corpus — one document per session
        corpus = [s.as_corpus_text() for s in self.sessions]
        self._tfidf_matrix = self._vectorizer.fit_transform(corpus)

        print(
            f"[RAG] Loaded {len(self.sessions)} sessions from agenda. "
            "TF-IDF corpus built."
        )

    def find_best_match(self, user_input: str) -> tuple[Session, float]:
        """
        Find the conference session most relevant to the visitor's text.

        Args:
            user_input: Free-text professional focus / career challenges.

        Returns:
            Tuple of (best matching Session, cosine similarity score).
        """
        # Vectorise the query
        query_vec = self._vectorizer.transform([user_input.lower()])

        # Compute cosine similarities against all sessions
        scores: np.ndarray = cosine_similarity(query_vec, self._tfidf_matrix).flatten()

        # Apply a small penalty to purely logistical sessions
        for i, session in enumerate(self.sessions):
            if session.session_id in _LOGISTICAL_SESSION_IDS:
                scores[i] *= 0.3

        best_idx = int(np.argmax(scores))
        best_session = self.sessions[best_idx]
        best_score = float(scores[best_idx])

        print(
            f"[RAG] Best match -> [{best_session.session_id}] "
            f'"{best_session.title}" (score: {best_score:.4f})'
        )

        return best_session, best_score


# ── Module-Level Singleton ────────────────────────────────────────────────────
# Initialised once when the module is first imported — avoids re-parsing on
# every request.

_matcher_instance: RAGSessionMatcher | None = None


def get_matcher() -> RAGSessionMatcher:
    """Return the shared RAGSessionMatcher instance (lazy singleton)."""
    global _matcher_instance
    if _matcher_instance is None:
        _matcher_instance = RAGSessionMatcher(settings.AGENDA_FILE_PATH)
    return _matcher_instance


def find_best_session(user_input: str) -> tuple[Session, float]:
    """
    Public API for the RAG layer.
    Call this from the route handler or orchestration service.
    """
    return get_matcher().find_best_match(user_input)
