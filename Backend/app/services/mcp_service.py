"""
services/mcp_service.py
------------------------
MCP (Model Context Protocol) Simulation Layer.

Responsibility:
  Simulate dispatching a finalized email draft through an MCP-connected
  mail provider. In this assessment context, the function logs the full
  email to stdout (server console) with a clean UTC timestamp.

  In a production system, this function would:
    - Connect to an MCP server (e.g., SendGrid, AWS SES via MCP adapter)
    - Authenticate and submit the email for delivery
    - Return a delivery receipt / message ID

Design note:
  The function signature `send_draft_via_mcp(email_address, email_body)`
  is fixed as per the task specification and must not be changed.
"""

import logging
from datetime import datetime, timezone

# Use Python's standard logging so output appears cleanly in server logs
logger = logging.getLogger(__name__)


def send_draft_via_mcp(email_address: str, email_body: str) -> None:
    """
    MCP Simulation: Log the finalised invitation email draft to server logs.

    This function is automatically executed by the backend as soon as the
    AI-generated email draft is ready — no manual trigger required.

    Args:
        email_address: The recipient's email address.
        email_body:    The full text body of the invitation email.

    Side Effects:
        Prints a structured log block to stdout with:
          - Recipient email address
          - Full email body
          - UTC timestamp of dispatch
    """
    # Capture the exact UTC moment of dispatch
    utc_timestamp: str = datetime.now(timezone.utc).strftime(
        "%Y-%m-%dT%H:%M:%S.%f UTC"
    )

    separator = "=" * 60

    # ── Structured MCP Log Output ─────────────────────────────────────────────
    print(f"\n[MCP TRIGGER] {separator}")
    print(f"[MCP TRIGGER]  STATUS     : DRAFT DISPATCHED SUCCESSFULLY")
    print(f"[MCP TRIGGER]  RECIPIENT  : {email_address}")
    print(f"[MCP TRIGGER]  TIMESTAMP  : {utc_timestamp}")
    print(f"[MCP TRIGGER] {separator}")
    print(f"[MCP TRIGGER]  EMAIL BODY :")
    print(f"[MCP TRIGGER] {separator}")
    # Print the body line by line so each line carries the [MCP TRIGGER] prefix
    for line in email_body.splitlines():
        print(f"[MCP TRIGGER]  {line}")
    print(f"[MCP TRIGGER] {separator}\n")

    # Also log via the standard logging system (captured by uvicorn log handlers)
    logger.info(
        "MCP draft dispatched | recipient=%s | timestamp=%s",
        email_address,
        utc_timestamp,
    )
