import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
    state: String,
    crop: String,
    sources: [String],
    feedback: { type: String, enum: ["up", "down", null], default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);