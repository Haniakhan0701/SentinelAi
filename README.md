# 🛡️ SentinelAI

**Autonomous Red-Teaming Platform for Large Language Models**

An automated AI red-teaming platform that continuously tests LLMs for prompt injection, jailbreaking, bias exploitation, and harmful content generation — then scores model safety in real time on a live dashboard, with physical hardware alerts.

---

## Team

| Member | Role |
|---|---|
| **Hania Khan** | Team Lead · Backend (Node.js/Express) · AI API Integration · Attack Engine · Hardware (Arduino) |
| **Bushra Kanooz Khan** | Frontend (React Dashboard) · UI/UX Design · Report Generation · Testing |

**Degree:** BSc Computer Engineering · **Domain:** Artificial Intelligence & Cybersecurity · **Year:** 2027

---

## What it does
Attack Prompt Library
│
▼
Attack Engine (Node.js) ──► sends prompts to ──► Gemini API
│
▼
Response Analyzer (rule-based + LLM-as-judge)
│
▼
MongoDB Atlas ──► React Dashboard (live results, safety score)
│
▼
Arduino Nano ──► Red/Green LED + Buzzer alert
## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| AI API | Google Gemini API |
| Hardware | Arduino Nano + LEDs + Buzzer |

## Project Structure
SentinelAi/
├── frontend/ # React dashboard — see frontend/README.md
├── backend/ # Attack engine + API — see backend/README.md
└── docs/ # Project plan, reports, screenshots
## Getting Started

Clone the repo, then set up each part separately:

```bash
git clone https://github.com/Haniakhan0701/SentinelAi.git
cd SentinelAi
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend** (needs a MongoDB Atlas URI and a Gemini API key — see `backend/README.md` for full setup):
```bash
cd backend
npm install
npm run dev
```

## Features

- 🎯 Automated adversarial prompt testing across 5 attack categories
- 🧠 Two-layer safety analysis (rule-based + LLM-as-judge)
- 📊 Real-time dashboard with safety scoring
- 💡 Hardware alert system (Arduino LEDs + buzzer)
- 📄 Downloadable vulnerability reports

## Future Scope

- Multi-model comparison (Gemini, Claude, Llama side by side)
- Real-time updates via Socket.io
- Authentication with role-based access
- Open-source release + AI security conference submission

---

*SentinelAI — Securing AI, One Prompt at a Time*
*Final Year Project · BZU 2027*
