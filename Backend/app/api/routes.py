"""
api/routes.py
-------------
FastAPI route handlers — the HTTP interface layer.

Responsibility:
  This layer is intentionally thin. Each route handler:
    1. Receives and validates the incoming request (via Pydantic schemas)
    2. Delegates all business logic to the service layer
    3. Returns a typed, validated response

  No business logic lives here. Routes are just orchestrators.

Pipeline for POST /api/invite:
  InvitationRequest → RAG Service → LLM Service → MCP Service → InvitationResponse
"""

import logging

from fastapi import APIRouter, HTTPException, status

from app.models.schemas import (
    ErrorResponse,
    InvitationRequest,
    InvitationResponse,
    MatchedSession,
)
from app.services import llm_service, mcp_service, rag_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["Invitation"])


# ── Health Check ──────────────────────────────────────────────────────────────

@router.get(
    "/health",
    summary="Health Check",
    description="Returns 200 OK when the server is ready to accept requests.",
)
async def health_check() -> dict:
    return {"status": "ok", "service": "Cogent Solutions Invitation API"}


# ── Main Invitation Endpoint ──────────────────────────────────────────────────

@router.post(
    "/invite",
    response_model=InvitationResponse,
    responses={500: {"model": ErrorResponse}},
    summary="Generate Personalised Invitation",
    description=(
        "Accepts a visitor's profile, runs RAG to find the best matching "
        "conference session, generates an AI-crafted B2B invitation email, "
        "and triggers the MCP dispatch simulation. Returns the matched session "
        "and the email body."
    ),
    status_code=status.HTTP_200_OK,
)
async def generate_invitation(request: InvitationRequest) -> InvitationResponse:
    """
    Full AI invitation pipeline:
      1. RAG  — Find the best matching session from agenda.txt
      2. LLM  — Generate a personalised email using Gemini
      3. MCP  — Trigger send_draft_via_mcp() with the email draft
    """
    logger.info(
        "Invitation request received | name=%s | email=%s",
        request.name,
        request.email,
    )

    # ── Step 1: RAG — Session Matching ────────────────────────────────────────
    try:
        session, similarity_score = rag_service.find_best_session(
            request.professional_focus
        )
    except FileNotFoundError as exc:
        logger.error("Agenda file missing: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Server configuration error: agenda file not found.",
        ) from exc
    except Exception as exc:
        logger.error("RAG service error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to match session. Please try again.",
        ) from exc

    # ── Step 2: LLM — Email Generation ───────────────────────────────────────
    try:
        email_body: str = llm_service.generate_invitation_email(
            name=request.name,
            email=request.email,
            job_title=request.job_title,
            company=request.company,
            professional_focus=request.professional_focus,
            matched_session=session,
        )
    except Exception as exc:
        logger.error("LLM service error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate invitation email. Please try again.",
        ) from exc

    # ── Step 3: MCP — Dispatch Simulation ────────────────────────────────────
    # This is called automatically as soon as the email draft is ready.
    mcp_service.send_draft_via_mcp(
        email_address=request.email,
        email_body=email_body,
    )

    # ── Return Response ───────────────────────────────────────────────────────
    return InvitationResponse(
        success=True,
        matched_session=MatchedSession(
            session_id=session.session_id,
            title=session.title,
            time=session.time,
            speaker=session.speaker,
            description=session.description,
            focus_keywords=session.focus_keywords,
            similarity_score=round(similarity_score, 4),
        ),
        email_body=email_body,
        message=(
            f"Your invitation has been personalised around the session "
            f'"{session.title}" and dispatched successfully.'
        ),
    )
