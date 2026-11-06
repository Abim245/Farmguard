import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema({
  crop: { type: String, required: true, lowercase: true, trim: true },
  topic: { type: String, required: true },
  text: { type: String, required: true },
  tags: [String],
  source: { type: String, default: "" },
});

knowledgeSchema.index(
  { crop: "text", topic: "text", text: "text", tags: "text" },
  { weights: { crop: 5, topic: 4, tags: 3, text: 1 }, name: "knowledge_text" }
);

export default mongoose.model("Knowledge", knowledgeSchema);