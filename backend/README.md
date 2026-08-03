# SentinelAI Backend — Real Attack Engine

This replaces `mockData.js`. It actually sends prompts to Gemini, analyzes
the responses for safety, and stores everything in MongoDB.

## What this does

```
Attack Prompt Library (data/attackPromptLibrary.js)
        │
        ▼
Attack Engine (services/attackEngine.js)
        │  sends each prompt to
        ▼
Gemini API (services/geminiClient.js)
        │  response goes to
        ▼
Response Analyzer (services/responseAnalyzer.js)
   Layer 1: rule-based refusal detection (instant, free)
   Layer 2: LLM-as-judge (a second Gemini call rates SAFE/UNSAFE)
        │
        ▼
MongoDB (models/Attack.js, models/Run.js)
        │
        ▼
API routes (routes/attacks.js) → your React dashboard fetches from here
```

## Setup

### 1. Get a MongoDB Atlas connection string
- Go to your Atlas dashboard → Database → Connect → Drivers → copy the URI
- It looks like: `mongodb+srv://user:pass@cluster.mongodb.net/...`

### 2. Get a Gemini API key
- https://aistudio.google.com/app/apikey → Create API key (free tier)

### 3. Configure environment
```
copy .env.example .env
```
Open `.env` and paste in your real `MONGODB_URI` and `GEMINI_API_KEY`.
**Never commit `.env` to GitHub** — it's already in `.gitignore`.

### 4. Install and run
```
npm install
npm run dev
```
You should see:
```
[db] connected to MongoDB Atlas
[server] SentinelAI backend running on http://localhost:5000
```

## API endpoints

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/api/health` | Quick check the server is alive |
| GET | `/api/prompts` | Returns the attack prompt library |
| POST | `/api/attacks/run` | **Runs a real attack suite** against Gemini — this is the button that actually does the work. Takes ~30-60s since it's 10 prompts × up to 2 API calls each. |
| GET | `/api/attacks?runId=...` | Attack log, optionally filtered to one run |
| GET | `/api/runs` | List of past runs (for the Reports page) |
| GET | `/api/runs/latest` | Most recent run + category breakdown (for the Dashboard) |

## Try it without the frontend first

Once the server is running, test it directly:
```
curl -X POST http://localhost:5000/api/attacks/run
curl http://localhost:5000/api/runs/latest
```
If the first command returns a JSON object with `safetyScore`, it worked —
check your MongoDB Atlas collection browser and you'll see real documents
in the `attacks` and `runs` collections.

## Connecting the frontend

In your React dashboard, replace the mock data imports with real fetches,
e.g. in `Dashboard.jsx`:
```jsx
const [data, setData] = useState(null);
useEffect(() => {
  fetch("http://localhost:5000/api/runs/latest")
    .then(res => res.json())
    .then(setData);
}, []);
```
Nothing else in the component tree needs to change — they already expect
this exact shape (`run`, `breakdown`, `recentAttacks`).

## Known limitations / good "Future Work" talking points for your defense
- Attack runs are synchronous right now (you wait ~30-60s for the response).
  Upgrading to Socket.io for a live "Prompt #3 of 10... UNSAFE detected"
  feed is the natural next step (mentioned in your project plan's Future Scope).
- Only Gemini is wired up. Adding OpenAI/Claude/Llama clients alongside
  `geminiClient.js` and letting a run target multiple models is what turns
  this into the "compare models side by side" feature.
- No authentication yet — anyone who can reach the API can trigger a run.
  Fine for a local FYP demo; add JWT + role-based access before making
  this public.
