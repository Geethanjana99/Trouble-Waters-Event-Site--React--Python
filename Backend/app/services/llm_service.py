"""
services/llm_service.py
------------------------
LLM Prompt Engineering & Email Generation Layer.

Responsibility:
  Given a visitor profile and a matched conference session (from RAG),
  call the Google Gemini API to generate a personalised, professional
  B2B invitation email.

SDK:
  Uses the current `google-genai` SDK (google.genai),
  replacing the deprecated `google-generativeai` package.

Prompt Design Principles:
  1. GROUNDED  — The model is given only the exact session data from the
                 agenda. It cannot reference any other session.
  2. STRICT    — Hard rules forbid hallucinating speakers, times, or topics.
  3. FALLBACK  — If the API key is missing, a high-quality template-based
                 email is returned so the system still works end-to-end.

Anti-Hallucination Strategy:
  - System instruction explicitly enumerates what is allowed vs forbidden.
  - All variable content (names, times, speakers) is injected as literal
    strings inside the prompt — the model has no room to "invent" them.
  - Temperature is set to 0.4 (balanced: creative tone, factual content).
"""

import logging

from app.core.config import settings
from app.services.rag_service import Session

logger = logging.getLogger(__name__)


# ── Prompt Templates ──────────────────────────────────────────────────────────

SYSTEM_INSTRUCTION = """You are a professional B2B event copywriter for Accelalpha, \
a leading Oracle implementation partner. Your task is to write personalised executive \
invitation emails for the "Troubled Waters: Sailing with AI in Supply Chain" summit.

STRICT RULES — You MUST follow ALL of these without exception:
1. You may ONLY reference the session details provided in the [SESSION CONTEXT] section below.
2. You MUST NOT invent, assume, or mention any speaker name, session title, time slot, \
   or topic that is not explicitly stated in the [SESSION CONTEXT].
3. You MUST NOT mention any other sessions or speakers from the conference beyond \
   the one in [SESSION CONTEXT].
4. If a piece of information is not provided, omit it entirely — do not guess or fill gaps.
5. The email must be professional, warm, and executive in tone — as if written by \
   a senior partner.
6. Keep the email under 300 words.
7. Always end with a clear call-to-action encouraging the recipient to register \
   or confirm attendance.
8. Do not use generic filler phrases like "I hope this email finds you well." \
   Start strong and be direct.
"""

USER_PROMPT_TEMPLATE = """Write a personalised B2B executive invitation email using \
the information below.

[VISITOR CONTEXT]
Full Name          : {name}
Job Title          : {job_title}
Company            : {company}
Professional Focus : {professional_focus}

[SESSION CONTEXT — USE ONLY THIS INFORMATION]
Session Title  : {session_title}
Time Slot      : {session_time}
Speaker        : {session_speaker}
Description    : {session_description}

[OUTPUT FORMAT]
- Subject line first (prefix with "Subject: ")
- Then the email body
- Sign off on behalf of the Accelalpha team
- Do NOT add any commentary outside the email itself
"""


# ── Fallback Template (when no API key is configured) ────────────────────────

def _build_fallback_email(
    name: str,
    job_title: str,
    company: str,
    professional_focus: str,
    session: Session,
) -> str:
    """
    Returns a high-quality template email when the Gemini API is unavailable.
    Uses only real data from the agenda — zero hallucination by construction.
    """
    return f"""Subject: A Session We Think You Shouldn't Miss -- {session.title}

Dear {name},

Given your focus on {professional_focus[:80].rstrip()}..., we believe the upcoming \
Accelalpha-Oracle summit holds a session specifically relevant to your work.

We'd like to draw your attention to:

  "{session.title}"
  Presented by {session.speaker}
  Time: {session.time}

{session.description}

This executive-level summit -- Troubled Waters: Sailing with AI in Supply Chain -- \
brings together logistics leaders, CIOs, and technology partners to tackle the most \
pressing challenges facing Gulf-region supply chains today.

We'd be honoured to have you join us. Seats are limited to senior delegates and \
strategic partners.

To confirm your attendance, please register via the event portal or reply directly \
to this email.

Warm regards,
The Accelalpha Events Team
Accelalpha | Oracle Platinum Partner
"""


# ── Main Generation Function ──────────────────────────────────────────────────

def generate_invitation_email(
    name: str,
    email: str,
    job_title: str | None,
    company: str | None,
    professional_focus: str,
    matched_session: Session,
) -> str:
    """
    Generate a personalised B2B invitation email using Google Gemini.

    Args:
        name:               Visitor's full name.
        email:              Visitor's email (kept for logging).
        job_title:          Optional job title.
        company:            Optional company name.
        professional_focus: Visitor's professional focus / career challenges.
        matched_session:    The RAG-matched session object.

    Returns:
        String containing the generated email (subject + body).
    """
    resolved_title = job_title or "Supply Chain Professional"
    resolved_company = company or "your organisation"

    if not settings.GOOGLE_API_KEY:
        logger.warning("GOOGLE_API_KEY not configured. Using template fallback email.")
        return _build_fallback_email(
            name, resolved_title, resolved_company,
            professional_focus, matched_session
        )

    try:
        from google import genai  # noqa: PLC0415
        from google.genai import types  # noqa: PLC0415

        client = genai.Client(api_key=settings.GOOGLE_API_KEY)

        prompt = USER_PROMPT_TEMPLATE.format(
            name=name,
            job_title=resolved_title,
            company=resolved_company,
            professional_focus=professional_focus,
            session_title=matched_session.title,
            session_time=matched_session.time,
            session_speaker=matched_session.speaker,
            session_description=matched_session.description,
        )

        response = client.models.generate_content(
            model=settings.GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.4,
                max_output_tokens=settings.MAX_EMAIL_TOKENS,
            ),
        )

        email_text: str = response.text.strip()
        logger.info(
            "Gemini generated email | recipient=%s | session=%s | words=%d",
            email,
            matched_session.session_id,
            len(email_text.split()),
        )
        return email_text

    except Exception as exc:  # noqa: BLE001
        logger.error("Gemini API call failed: %s. Falling back to template.", exc)
        return _build_fallback_email(
            name, resolved_title, resolved_company,
            professional_focus, matched_session
        )
