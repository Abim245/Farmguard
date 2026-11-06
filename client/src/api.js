export async function getStates() {
  const r = await fetch("/api/feedback/states");
  return r.json();
}

export async function askQuestion(body) {
  const r = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || "Request failed");
  return data;
}

export async function sendFeedback(chatId, feedback) {
  await fetch("/api/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, feedback }),
  });
}