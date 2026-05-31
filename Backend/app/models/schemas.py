"""
models/schemas.py
-----------------
Pydantic data models for request validation and response serialisation.

Using Pydantic v2 (ships with FastAPI).
All I/O data for the API is typed and validated here.
"""

from pydantic import BaseModel, EmailStr, Field


# ── Inbound ───────────────────────────────────────────────────────────────────

class InvitationRequest(BaseModel):
    """
    Data submitted by the visitor through the registration form.
    """
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full name of the visitor",
        examples=["Dr. Raman Kumar"],
    )
    email: EmailStr = Field(
        ...,
        description="Corporate email address of the visitor",
        examples=["raman.kumar@alfuttaim.com"],
    )
    professional_focus: str = Field(
        ...,
        min_length=10,
        max_length=1000,
        description="Visitor's professional role, focus area, or career challenges",
        examples=["I lead warehouse automation for a large logistics firm in Dubai and I'm struggling with supply chain visibility and rising operational costs."],
    )
    # Optional enrichment fields passed from the existing form steps
    job_title: str | None = Field(default=None, description="Job title (optional)")
    company: str | None = Field(default=None, description="Company name (optional)")


# ── Internal ──────────────────────────────────────────────────────────────────

class MatchedSession(BaseModel):
    """
    Represents a single conference session retrieved by the RAG service.
    """
    session_id: str = Field(description="Session identifier, e.g. SESSION_5")
    title: str
    time: str
    speaker: str
    description: str
    focus_keywords: str
    similarity_score: float = Field(
        description="Cosine similarity score between visitor input and session content"
    )


# ── Outbound ──────────────────────────────────────────────────────────────────

class InvitationResponse(BaseModel):
    """
    Full response returned to the frontend after processing.
    """
    success: bool = True
    matched_session: MatchedSession = Field(
        description="The conference session best matched to the visitor's profile"
    )
    email_body: str = Field(
        description="AI-generated personalised B2B invitation email body"
    )
    message: str = Field(
        default="Your personalised invitation has been prepared and dispatched.",
        description="Human-readable status message for the frontend",
    )


class ErrorResponse(BaseModel):
    """
    Standardised error envelope.
    """
    success: bool = False
    error: str
    detail: str | None = None
