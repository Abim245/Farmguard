import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { QUESTIONS } from "./questions.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API = process.env.API_URL || "http://localhost:5000/api/chat";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const csv = (v) => `"${String(v ?? "").replace(/"/g, '""').replace(/\n/g, " ")}"`;

const header = [
  "id", "category", "expect", "state", "crop", "question", "answer", "sources",
  "relevance", "accuracy", "practicality", "safety", "uncertainty", "notes",
];


const rows = [header.map(csv).join(",")];

for (let i = 0; i < QUESTIONS.length; i++) {
 const { category, expect, state, crop, q } = QUESTIONS[i];
  let answer = "", sources = "";
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: q, state, crop }),
    });
    const data = await res.json();
    answer = res.ok ? data.answer : `ERROR: ${data.error}`;
    sources = (data.sources || []).join(" | ");
  } catch (err) {
    answer = `ERROR: ${err.message}`;
  }
  console.log(`${i + 1}/${QUESTIONS.length} ${category}`);
  rows.push(
    [i + 1, category, expect, state, crop, q, answer, sources, "", "", "", "", "", ""].map(csv).join(",")
  );
  await sleep(1500); // avoid rate limits
}

const out = path.join(__dirname, `results-${Date.now()}.csv`);
fs.writeFileSync(out, rows.join("\n"));
console.log(`Saved ${out}`);