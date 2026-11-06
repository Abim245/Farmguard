import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Knowledge from "../models/Knowledge.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const entries = JSON.parse(
  fs.readFileSync(path.join(__dirname, "knowledge.json"), "utf-8")
);

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Knowledge.deleteMany({});
  await Knowledge.insertMany(entries);
  await Knowledge.syncIndexes();
  console.log(`Seeded ${entries.length} knowledge entries`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});