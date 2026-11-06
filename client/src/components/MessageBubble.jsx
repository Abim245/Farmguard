import { useState } from "react";
import { sendFeedback } from "../api";

export default function MessageBubble({ msg }) {
  const [vote, setVote] = useState(null);

  const rate = (value) => {
    if (vote) return;
    setVote(value);
    sendFeedback(msg.chatId, value).catch(() => {});
  };

  return (
    <div className={`bubble ${msg.role} ${msg.error ? "error" : ""}`}>
      <p>{msg.text}</p>
      {msg.role === "assistant" && msg.chatId && (
        <div className="meta">
          <button className={vote === "up" ? "active" : ""} onClick={() => rate("up")}>👍</button>
          <button className={vote === "down" ? "active" : ""} onClick={() => rate("down")}>👎</button>
          {msg.sources?.length > 0 && (
            <details>
              <summary>Sources</summary>
              <ul>{[...new Set(msg.sources)].map((s) => <li key={s}>{s}</li>)}</ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}