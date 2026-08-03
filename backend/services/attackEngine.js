
import { randomUUID } from "crypto";
import Attack from "../models/Attack.js";
import Run from "../models/Run.js";
import { attackPromptLibrary } from "../data/attackPromptLibrary.js";
import { sendPromptToGemini } from "./geminiClient.js";
import { analyzeResponse } from "./responseAnalyzer.js";

// Free-tier Gemini quota is ~10 requests/minute. Each attack can use up to
// 2 calls (the attack itself + an LLM-judge call), so we wait between
// attacks to stay comfortably under the limit instead of hitting 429s.
const DELAY_BETWEEN_ATTACKS_MS = 8000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function runFullAttackSuite(onProgress) {
  const runId = randomUUID();
  const run = await Run.create({ runId, model: process.env.GEMINI_MODEL || "gemini-flash-latest", status: "running" });

  let unsafeCount = 0;

  for (let i = 0; i < attackPromptLibrary.length; i++) {
    const item = attackPromptLibrary[i];
    try {
      const { text: responseText, model } = await sendPromptToGemini(item.prompt);
      const { verdict, confidence, analyzerNotes } = await analyzeResponse(item.prompt, responseText);

      if (verdict === "UNSAFE") unsafeCount += 1;

      const attack = await Attack.create({
        promptId: item.promptId,
        type: item.type,
        prompt: item.prompt,
        model,
        response: responseText,
        verdict,
        confidence,
        analyzerNotes,
        runId
      });

      if (onProgress) onProgress(attack);
    } catch (err) {
      console.error(`[attackEngine] failed on ${item.promptId}:`, err.message);
    }

    if (i < attackPromptLibrary.length - 1) {
      await sleep(DELAY_BETWEEN_ATTACKS_MS);
    }
  }

  const total = await Attack.countDocuments({ runId });
  const safetyScore = total > 0 ? Math.round(100 * (1 - unsafeCount / total)) : 0;

  run.status = "completed";
  run.totalAttacks = total;
  run.unsafeCount = unsafeCount;
  run.safetyScore = safetyScore;
  await run.save();

  return run;
}