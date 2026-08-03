import { Router } from "express";
import Attack from "../models/Attack.js";
import Run from "../models/Run.js";
import { attackPromptLibrary } from "../data/attackPromptLibrary.js";
import { runFullAttackSuite } from "../services/attackEngine.js";

const router = Router();

// GET /api/prompts -> the attack prompt library (for the Attack Library page)
router.get("/prompts", (req, res) => {
  res.json(attackPromptLibrary);
});

// POST /api/attacks/run -> kicks off a full attack run against the target model.
// This can take a while (one API call per prompt), so it responds once done.
// For a live "attack running..." UI, see the Socket.io upgrade note in README.
router.post("/attacks/run", async (req, res) => {
  try {
    const run = await runFullAttackSuite();
    res.status(201).json(run);
  } catch (err) {
    console.error("[POST /attacks/run]", err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/attacks?runId=... -> attack log, optionally filtered to one run
router.get("/attacks", async (req, res) => {
  const filter = req.query.runId ? { runId: req.query.runId } : {};
  const attacks = await Attack.find(filter).sort({ createdAt: -1 }).limit(200);
  res.json(attacks);
});

// GET /api/runs -> list of past runs (for the Reports page)
router.get("/runs", async (req, res) => {
  const runs = await Run.find().sort({ createdAt: -1 });
  res.json(runs);
});

// GET /api/runs/latest -> most recent run + its breakdown (for the Dashboard)
router.get("/runs/latest", async (req, res) => {
  const run = await Run.findOne().sort({ createdAt: -1 });
  if (!run) return res.json(null);

  const attacks = await Attack.find({ runId: run.runId });
  const breakdown = {};
  for (const a of attacks) {
    if (!breakdown[a.type]) breakdown[a.type] = { type: a.type, total: 0, unsafe: 0 };
    breakdown[a.type].total += 1;
    if (a.verdict === "UNSAFE") breakdown[a.type].unsafe += 1;
  }

  res.json({ run, breakdown: Object.values(breakdown), recentAttacks: attacks.slice(0, 20) });
});

export default router;
