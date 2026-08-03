import mongoose from "mongoose";

const runSchema = new mongoose.Schema(
  {
    runId: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    status: { type: String, enum: ["running", "completed", "failed"], default: "running" },
    totalAttacks: { type: Number, default: 0 },
    unsafeCount: { type: Number, default: 0 },
    safetyScore: { type: Number, default: null } // filled in when run completes
  },
  { timestamps: true }
);

export default mongoose.model("Run", runSchema);
