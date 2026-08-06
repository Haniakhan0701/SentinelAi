import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import attackRoutes from "./routes/attacks.js";

const app = express();

// ------------------------------------------------------------------
// 1. CORS Configuration (allows both local dev & Netlify frontend)
// ------------------------------------------------------------------
const allowedOrigins = [
  'http://localhost:5173',                    // Local development (Vite)
  'https://sentinelaI-bzu.netlify.app'        // Your deployed frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,                         // Allow cookies/auth headers if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle preflight (OPTIONS) requests for all routes
app.options('*', cors());

// ------------------------------------------------------------------
// 2. Middleware
// ------------------------------------------------------------------
app.use(express.json());

// ------------------------------------------------------------------
// 3. Routes
// ------------------------------------------------------------------
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api", attackRoutes);

// ------------------------------------------------------------------
// 4. Server & Database
// ------------------------------------------------------------------
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] SentinelAI backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("[server] Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
