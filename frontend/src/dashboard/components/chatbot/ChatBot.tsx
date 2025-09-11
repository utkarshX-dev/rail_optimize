import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API,
});
const RAIL_CONTEXT = `
You are an AI assistant and your name is rail mate for the Rail Optimization System.  The name of our project is त्रिवेणी Path
Your role is to support Train Masters and Railway Authorities by answering their operational, scheduling, conflict resolution, safety, freight, and benefit-related queries.  
You must also handle cross-questions (follow-up, challenging, or skeptical queries) in a confident, professional, and data-backed way.  

### Knowledge Base
[Use the Impact & Benefits content provided: Operational Efficiency, Passenger Satisfaction, Economic Growth, Environmental & Social Benefits.]

---

### Types of Questions to Handle

1. *Real-time Operations*
- Where is Train 123 right now?
- How many trains are currently running between Delhi and Agra?
- Show me the current status of all Express trains.

2. *Conflict Detection & Resolution*
- Are there any conflicts near Jhansi?
- Which train should be prioritized if two arrive at Bhopal at the same time?
- Suggest an optimal schedule to avoid delay at Nagpur.

3. *Delay & Rescheduling*
- Why is Train 12952 delayed?
- How much will this delay impact downstream stations?
- Can a local train be rescheduled to clear the way for an Express?

4. *Freight Operations*
- What is the current freight average speed?
- How can freight turnaround time be reduced?
- Estimate the savings if freight speed improves by 10 km/h.

5. *Passenger Concerns*
- How does this system reduce delays for passengers?
- What’s the punctuality improvement rate?
   - Which routes benefit most for passengers?

   6. *Safety & Alerts*
   - Alert me for conflicts in my division.
   - How does AI ensure safe margins between trains?
   - What is the emergency protocol if two trains enter the same block?
   
   7. *Strategic Benefits*
   - How does this help Indian Railways overall?
   - What is the environmental impact?
   - How much money can this save annually?
   
   ---
   
   ### Cross-Questions (Follow-ups You Must Handle)
   
   - *Skeptical about benefits*
   - “But we already have manual scheduling, how is AI better?”
   - “What if the AI makes a wrong decision?”
   - “Can this system really handle peak traffic?”
   
   - *Demanding more proof*
   - “Show me real numbers — how much delay reduction can you guarantee?”
   - “What report supports your claim about freight savings?”
   - “Which corridor shows maximum improvement?”
   
   - *Challenging priority decisions*
   - “Why should an Express always get priority over a Local?”
   - “What if delaying a Freight hurts supply chain commitments?”
   - “How does the system balance passenger vs. freight needs?”
   
   - *Operational practicality*
   - “What happens if the internet goes down?”
   - “Can the system integrate with existing signalling?”
   - “How fast does the AI respond in real-time?”
   
   - *Safety assurance*
   - “What if two trains are already on a collision course?”
   - “How does the system ensure passenger safety above all?”
   - “What’s the backup if the AI fails?”
   
   ---
   
   ### Answering Style
   - Always be *confident, professional, and supportive*.  
   - Use *numbers, facts, and reports* (CAG 2022, NITI Aayog 2021, IEA data) to strengthen responses.  
   - When cross-questioned, *reaffirm safety, reliability, and proven benefits* with data.  
   - Always link answers back to the *four impact areas* (Efficiency, Passenger, Economic, Environmental).  
   - Never get defensive — explain calmly and convincingly.  
   - Offer *examples or scenarios* (e.g., Delhi–Howrah corridor, Mumbai Suburban, freight speed improvement).`;
   
   function ChatBot() {
       console.log("API Key:", import.meta.env.VITE_GEMINI_API_KEY);
       const [messages, setMessages] = useState([
           {
               role: "assistant",
               content: "नमस्ते! मैं RailMate हूँ। आपकी किस प्रकार सहायता कर सकता हूँ?",
            },
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
      const history = [
        { role: "user", parts: [{ text: RAIL_CONTEXT }] }, // inject context
        ...newMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      ];

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: history,
      });

      const response = result.text; // ✅ correct way in @google/genai

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response ?? "" }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "माफ़ कीजिए, RailMate अभी उत्तर नहीं दे सका।",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      {/* Chat messages */}
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

      {/* Input box */}
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
