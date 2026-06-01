# Full-Stack Intern Assessment

## 1. Live Gateways
- **Frontend Live URL**: "https://trouble-waters.vercel.app/"
- **Backend API Endpoint**: "https://trouble-waters-event-site-react-python.onrender.com/"
- **Public GitHub Repository**: "https://github.com/Geethanjana99/Trouble-Waters-Event-Site--React--Python.git"

*(Note: Please ensure the frontend fetch URL in `Cogent Solutions/src/components/RegisterForm/RegisterForm.jsx` is updated to point to your live backend URL before final deployment!)*

## 2. Local Setup Guide

### Prerequisites
- Node.js (for frontend)
- Python 3.11+ (for backend)

### Steps to Run Locally
1. **Clone the repository**:
   ```bash
   git clone [Your-GitHub-Repo-URL]
   cd [Your-Repository-Name]
   ```

2. **Start the Backend (FastAPI)**:
   ```bash
   cd Backend
   python -m venv venv
   # Activate venv: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
   pip install -r requirements.txt
   
   # Add your Google Gemini API Key
   copy .env.example .env 
   # Edit .env and insert: GOOGLE_API_KEY=your_key_here
   
   # Run the server
   uvicorn app.main:app --reload --port 8000
   ```

3. **Start the Frontend (React/Vite)**:
   Open a new terminal window:
   ```bash
   cd "Cogent Solutions"
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## 3. Content Creation Check (LinkedIn Promo)
Are you struggling to bridge the gap between AI hype and practical supply chain execution? Discover how leading logistics professionals are solving real-world visibility and cost challenges at our upcoming summit, *Troubled Waters: Sailing with AI in Supply Chain*. Register through our new AI-powered gateway to receive a highly personalized event agenda, dynamically matched to your exact career focus and organizational pain points.

## 4. Prompt Strategy
To completely prevent the LLM from hallucinating fake topics, times, or speakers, the architecture strictly limits the model's knowledge base. The system prompt is engineered with explicit negative constraints (e.g., "You MUST NOT invent, assume, or mention any speaker name, session title, or time slot not explicitly stated"). Furthermore, we use a Retrieval-Augmented Generation (RAG) approach: the python backend parses the local `agenda.txt` file, identifies the single most relevant session using TF-IDF cosine similarity, and actively injects only that specific session's literal data into the prompt template. The LLM is forced to act merely as a stylist, phrasing the exact provided variables into a professional B2B invitation without generating any factual data of its own.
