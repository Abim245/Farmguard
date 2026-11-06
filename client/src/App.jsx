import { useEffect, useRef, useState } from "react";
import { getStates, askQuestion } from "./api";
import Selectors from "./components/Selectors";
import MessageBubble from "./components/MessageBubble";

const SUGGESTIONS = [
  "When is a suitable time to plant maize?",
  "What could cause yellow spots on my crop leaves?",
  "How do I prepare my farm for low rainfall?",
];

export default function App() {
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("any");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! I'm FarmGuard. Choose your state and crop, then ask me a farming question." },
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    getStates().then(setStates).catch(() => {});
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text ?? input).trim();
    if (!question || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: question }]);
    setLoading(true);
    try {
      const data = await askQuestion({ question, state, crop });
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.answer, sources: data.sources, chatId: data.chatId },
      ]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: err.message, error: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🌱 FarmGuard AI</h1>
        <p className="disclaimer">
          General guidance only. For diagnosis or chemicals, contact an agricultural extension worker.
        </p>
      </header>

      <Selectors states={states} state={state} crop={crop} setState={setState} setCrop={setCrop} />

      <main className="chat">
        {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
        {messages.length === 1 && (
          <div className="suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}
        {loading && <div className="bubble assistant typing">Thinking…</div>}
        <div ref={endRef} />
      </main>

      <div className="inputbar">
        <input
          value={input}
          maxLength={500}
          placeholder="Ask a farming question…"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={() => send()} disabled={loading || !input.trim()}>Send</button>
      </div>
    </div>
  );
}