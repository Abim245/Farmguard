import { Router } from "express";
import Chat from "../models/Chat.js";
import { findKnowledge } from "../services/retrieval.js";
import { getWeather } from "../services/weather.js";
import { callLLM } from "../services/llm.js";
import { SYSTEM_PROMPT } from "../prompts/system.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { question, state, crop } = req.body;
    if (!question || question.trim().length < 3 || question.length > 500) {
      return res.status(400).json({ error: "Please enter a valid question." });
    }

    const [docs, weather] = await Promise.all([
      findKnowledge(question, crop),
      getWeather(state),
    ]);

    const knowledge = docs.length
      ? docs.map((d, i) => `[${i + 1}] (${d.topic}) ${d.text}`).join("\n")
      : "No relevant knowledge found.";

    const userPrompt =
      `Farmer location: ${state || "unknown"}\nCrop: ${crop || "not specified"}\n\n` +
      `Knowledge:\n${knowledge}\n\n` +
      `Weather: ${weather ? JSON.stringify(weather) : "unavailable"}\n\n` +
      `Question: ${question}`;

    const answer = await callLLM(SYSTEM_PROMPT, userPrompt);
    const sources = docs.map((d) => d.source).filter(Boolean);

    const chat = await Chat.create({ question, answer, state, crop, sources });
    res.json({ answer, sources, chatId: chat._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;