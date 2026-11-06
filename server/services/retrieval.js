import Knowledge from "../models/Knowledge.js";

export async function findKnowledge(question, crop) {
  const filter = { $text: { $search: question } };
  if (crop && crop !== "any") filter.crop = { $in: [crop.toLowerCase(), "general"] };

  return Knowledge.find(filter, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } })
    .limit(4)
    .lean();
}