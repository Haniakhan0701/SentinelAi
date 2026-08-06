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
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// ------------------------------------------------------------------
// 2. Middleware
// ------------------------------------------------------------------
app.use(express.json());

// ------------------------------------------------------------------
// 3. Routes
// ------------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "Backend is alive!"
  });
});

app.use("/api", attackRoutes);

// ------------------------------------------------------------------
// 4. Server & Database (WILL NOT CRASH IF DB FAILS)
// ------------------------------------------------------------------
const PORT = process.env.PORT || 5000;

console.log("[server] Attempting to connect to MongoDB...");

connectDB()
  .then(() => {
    console.log("[server] ✅ MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("[server] ❌ MongoDB connection error:", err.message);
    console.warn("[server] ⚠️ Starting WITHOUT database connection (degraded mode).");
    console.warn("[server] ⚠️ API routes that query DB will fail, but health check works.");
  })
  .finally(() => {
    // Start server regardless of DB status
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`[server] ✅ SentinelAI backend running on port ${PORT}`);
      console.log(`[server] 🌐 Health check: https://site--sentinelaI--xwtqlx8qskwx.code.run/api/health`);
    });
  });
