import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const RAIL_CONTEXT = `
You are RailMate, an AI assistant for the Rail Optimization System.
Here is the project documentation you must always remember and use when answering:

System Overview:
- The Rail Optimization System helps manage train scheduling, conflict detection, delay handling, and real-time monitoring.
- Architecture includes frontend (React, Tailwind), backend (Node.js, Express, Socket.io), AI/ML for conflict prediction, and APIs for analytics.
- Features: Add train, monitor delays, analytics dashboard, chatbot support, station master tools.

Key Flows:
- Train Data -> Backend -> Conflict Detection + Delay Estimation -> Analytics Dashboard
- AI/ML engine trained on 10,000+ conflict cases, ~94% accuracy.
- Interactive dashboard + chatbot for station masters.

Setup Notes:
- Frontend: React + Tailwind + shadcn/ui
- Backend: Node.js, Express, WebSocket (Socket.io)
- ML Model: Python/FastAPI service for predictions
- API Endpoints: /trains, /conflicts, /analytics, /chatbot
`;

function ChatBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "नमस्ते! मैं RailMate हूँ। आपकी किस प्रकार सहायता कर सकता हूँ?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: [
          { role: "system", parts: [{ text: RAIL_CONTEXT }] },
          ...newMessages.map(m => ({
            role: m.role,
            parts: [{ text: m.content }]
          }))
        ],
      });

      const result = await chat.sendMessage(input);
      const response = await result.response.text();

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: "माफ़ कीजिए, RailMate अभी उत्तर नहीं दे सका।" }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-lg ${
              msg.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-slate-800 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg max-w-lg bg-slate-800 self-start animate-pulse">
            RailMate is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 flex gap-2 border-t border-slate-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ask RailMate..."
          className="flex-1 p-2 rounded bg-slate-800 border border-slate-600 focus:outline-none"
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;