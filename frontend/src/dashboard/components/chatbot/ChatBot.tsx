import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Bot, User, Sparkles, Train } from "lucide-react";

const imgurl = "https://i0.wp.com/urbanacres.in/wp-content/uploads/2025/07/Summer-Special-Train.jpg";

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
- What's the punctuality improvement rate?
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
   - "But we already have manual scheduling, how is AI better?"
   - "What if the AI makes a wrong decision?"
   - "Can this system really handle peak traffic?"
   
   - *Demanding more proof*
   - "Show me real numbers — how much delay reduction can you guarantee?"
   - "What report supports your claim about freight savings?"
   - "Which corridor shows maximum improvement?"
   
   - *Challenging priority decisions*
   - "Why should an Express always get priority over a Local?"
   - "What if delaying a Freight hurts supply chain commitments?"
   - "How does the system balance passenger vs. freight needs?"
   
   - *Operational practicality*
   - "What happens if the internet goes down?"
   - "Can the system integrate with existing signalling?"
   - "How fast does the AI respond in real-time?"
   
   - *Safety assurance*
   - "What if two trains are already on a collision course?"
   - "How does the system ensure passenger safety above all?"
   - "What's the backup if the AI fails?"
   
   ---
   
   ### Answering Style
   - Always be *confident, professional, and supportive*.  
   - Use *numbers, facts, and reports* (CAG 2022, NITI Aayog 2021, IEA data) to strengthen responses.  
   - When cross-questioned, *reaffirm safety, reliability, and proven benefits* with data.  
   - Always link answers back to the *four impact areas* (Efficiency, Passenger, Economic, Environmental).  
   - Never get defensive — explain calmly and convincingly.  
   - Offer *examples or scenarios* (e.g., Delhi–Howrah corridor, Mumbai Suburban, freight speed improvement).`;

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "नमस्ते! मैं RailMate हूँ। आपकी किस प्रकार सहायता कर सकता हूँ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessages = [...messages, { role: "user", content: input, timestamp }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const history = [
        { role: "user", parts: [{ text: RAIL_CONTEXT }] },
        ...newMessages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
      ];

      const result = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: history,
      });

      const response = result.text;
      const assistantTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response ?? "", timestamp: assistantTimestamp },
      ]);
    } catch (err) {
      console.error(err);
      const errorTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "माफ़ कीजिए, RailMate अभी उत्तर नहीं दे सका। कृपया थोड़ी देर बाद प्रयास करें।",
          timestamp: errorTimestamp
        },
      ]);
    }
    setLoading(false);
  };

  const quickQuestions = [
    "Train status check",
    "Conflict resolution", 
    "Delay analysis",
    "Safety protocols"
  ];

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            <Sparkles className="h-3 w-3" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="relative">
            <div 
              className="h-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden"
              style={{
                backgroundImage: `url(${imgurl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-purple-900/90 backdrop-blur-sm"></div>
              <div className="relative z-10 flex items-center justify-between p-4 h-full">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Train className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">RailMate</h3>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-xs text-white/80">Online • त्रिवेणी Path</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === "user" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600" 
                    : "bg-gradient-to-r from-indigo-500 to-purple-600"
                }`}>
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col max-w-[75%] ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}>
                  <div
                    className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1 px-2">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(question)}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs rounded-full transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="Type your railway query..."
                  className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm"
                  disabled={loading}
                  maxLength={500}
                />
                <span className="absolute bottom-3 right-12 text-xs text-gray-400">
                  {input.length}/500
                </span>
              </div>
              <button
                onClick={sendMessage}
                className={`p-3 rounded-2xl transition-all duration-200 ${
                  loading || !input.trim()
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
                disabled={loading || !input.trim()}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by AI • त्रिवेणी Path Railway System
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;