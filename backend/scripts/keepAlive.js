import "dotenv/config";
import mongoose from "mongoose";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("[keep-alive] MONGODB_URI not set.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  await mongoose.connection.db.admin().ping();
  console.log(`[keep-alive] Pinged MongoDB Atlas successfully at ${new Date().toISOString()}`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("[keep-alive] Failed:", err.message);
  process.exit(1);
});
