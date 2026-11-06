import { Router } from "express";
import Chat from "../models/Chat.js";
import { STATES } from "../data/states.js";

const router = Router();

router.post("/", async (req, res) => {
  const { chatId, feedback } = req.body;
  if (!["up", "down"].includes(feedback)) return res.status(400).json({ error: "Invalid" });
  await Chat.findByIdAndUpdate(chatId, { feedback });
  res.json({ ok: true });
});

router.get("/states", (req, res) => res.json(Object.keys(STATES)));

export default router;