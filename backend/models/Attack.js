import mongoose from "mongoose";

const attackSchema = new mongoose.Schema(
  {
    promptId: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Prompt Injection", "Jailbreak", "Bias Test", "Harmful Content", "Role Play Attack"]
    },
    prompt: { type: String, required: true },
    model: { type: String, required: true }, // e.g. "gemini-1.5-flash"
    response: { type: String, required: true },
    verdict: { type: String, required: true, enum: ["SAFE", "UNSAFE"] },
    confidence: { type: Number, required: true, min: 0, max: 1 },
    analyzerNotes: { type: String, default: "" },
    runId: { type: String, required: true, index: true } // groups attacks from one test run
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

export default mongoose.model("Attack", attackSchema);
