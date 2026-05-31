# Cogent Solutions — Backend API

AI-powered personalised invitation system for the  
**"Troubled Waters: Sailing with AI in Supply Chain"** executive summit.

---

## Architecture

```
Backend/
├── app/
│   ├── main.py              ← FastAPI entry point, CORS, startup hook
│   ├── api/
│   │   └── routes.py        ← HTTP route handlers (thin orchestration layer)
│   ├── services/
│   │   ├── rag_service.py   ← TF-IDF session matching (RAG layer)
│   │   ├── llm_service.py   ← Gemini LLM + anti-hallucination prompt
│   │   └── mcp_service.py   ← send_draft_via_mcp() MCP simulation
│   ├── models/
│   │   └── schemas.py       ← Pydantic request/response models
│   └── core/
│       └── config.py        ← Centralised environment config
├── agenda.txt               ← Conference schedule (source of truth for RAG)
├── requirements.txt
├── .env.example             ← Copy to .env and add your API key
└── README.md
```

**Request Pipeline:**
```
POST /api/invite
    │
    ├─► RAG Service   → Reads agenda.txt, TF-IDF cosine similarity → best session
    ├─► LLM Service   → Gemini generates personalised email using matched session
    └─► MCP Service   → send_draft_via_mcp() logs email + UTC timestamp to console
```

---

## Setup

### 1. Prerequisites
- Python 3.11+
- A free Google Gemini API key → [Get one here](https://aistudio.google.com/app/apikey)

### 2. Create a virtual environment
```bash
cd "b:\Assesments\New folder\Backend"
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure your API key
```bash
copy .env.example .env
# Open .env and replace "your_gemini_api_key_here" with your real key
```

### 5. Run the server

venv\Scripts\activate
uvicorn app.main:app --reload --port 8000

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **API Base**: http://localhost:8000
- **Swagger UI**: http://localhost:8000/docs  ← Interactive API explorer
- **Health Check**: http://localhost:8000/api/health

---

## API Reference

### `POST /api/invite`

**Request Body:**
```json
{
  "name": "Dr. Raman Kumar",
  "email": "raman.kumar@alfuttaim.com",
  "professional_focus": "I lead warehouse automation for a large logistics firm and I'm struggling with supply chain visibility and rising operational costs.",
  "job_title": "CEO",
  "company": "Al-Futtaim Logistics"
}
```

**Response:**
```json
{
  "success": true,
  "matched_session": {
    "session_id": "SESSION_7",
    "title": "Insights from Digital Evolution",
    "time": "11:50 AM - 12:10 PM",
    "speaker": "Dr. Raman Kumar (CEO, Al-Futtaim Logistics)",
    "description": "...",
    "similarity_score": 0.7821
  },
  "email_body": "Subject: ...\n\nDear Dr. Raman Kumar, ...",
  "message": "Your invitation has been personalised..."
}
```

---

## Key Design Decisions

| Concern | Decision | Rationale |
|---|---|---|
| Framework | FastAPI | Async, typed, auto-docs, industry standard |
| Architecture | Layered (routes → services → models) | Clean separation of concerns |
| RAG Matching | TF-IDF cosine similarity | No external DB, fully explainable, zero cost |
| LLM | Google Gemini 1.5 Flash | Free tier, fast, capable |
| Anti-hallucination | Hard system prompt rules | Model can only use injected session data |
| MCP Simulation | `send_draft_via_mcp()` function | Prints recipient, body, UTC timestamp to logs |

---

## MCP Trigger Output Example

When a request is processed, the server console will print:

```
[MCP TRIGGER] ============================================================
[MCP TRIGGER]  STATUS     : DRAFT DISPATCHED SUCCESSFULLY
[MCP TRIGGER]  RECIPIENT  : raman.kumar@alfuttaim.com
[MCP TRIGGER]  TIMESTAMP  : 2024-11-15T08:34:21.123456 UTC
[MCP TRIGGER] ============================================================
[MCP TRIGGER]  EMAIL BODY :
[MCP TRIGGER] ============================================================
[MCP TRIGGER]  Subject: A Session Crafted for Supply Chain Leaders Like You
[MCP TRIGGER]  
[MCP TRIGGER]  Dear Dr. Raman Kumar,
[MCP TRIGGER]  ...
[MCP TRIGGER] ============================================================
```
