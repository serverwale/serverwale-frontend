import React, { useState, useEffect, useRef } from "react";
import emma from "../../assets/images/aichatbot.png";

const SUPPORT_NUMBER = "+91-9999656064";
const COMPANY_NAME   = "Serverwale";
const KIARA_INTRO    = "Hi! 👋 I'm **Kiara**, the 24/7 Sales & Help Desk Expert at Serverwale!\n\nI'm here to help you find the perfect IT infrastructure solution. May I know your name?";

type Message = {
  role: "ai" | "user";
  text: string;
  buttons?: string[];
};

type Lead = {
  name: string;
  phone: string;
  email: string;
  purpose?: string;
  topic?: string;
};

interface AiChatProps {
  isAutoOpen?: boolean;   // if true, show typing indicator before greeting
}

const GREETINGS = ["hi", "hii", "hello", "hey", "namaste", "good morning", "good evening"];

const AiChat: React.FC<AiChatProps> = ({ isAutoOpen }) => {
  const [sessionId,  setSessionId]  = useState<string | null>(null);
  const [messages,   setMessages]   = useState<Message[]>(
    isAutoOpen ? [] : [{ role: "ai", text: KIARA_INTRO }]
  );
  const [input,      setInput]      = useState("");
  const [step,       setStep]       = useState<"name"|"phone"|"email"|"purpose"|"topic"|"chat">("name");
  const [lead,       setLead]       = useState<Lead>({ name: "", phone: "", email: "" });
  const [isTyping,   setIsTyping]   = useState(!!isAutoOpen);
  const leadRef  = useRef<Lead>({ name: "", phone: "", email: "" });
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { leadRef.current = lead; }, [lead]);

  /* ── auto greeting on first open ── */
  useEffect(() => {
    if (!isAutoOpen) return;
    const t = setTimeout(() => {
      setIsTyping(false);
      setMessages([{ role: "ai", text: KIARA_INTRO }]);
    }, 1800);
    return () => clearTimeout(t);
  }, [isAutoOpen]);

  /* ── auto-scroll ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (msg: Message) => setMessages(prev => [...prev, msg]);

  const isGreeting   = (t: string) => GREETINGS.some(g => t.toLowerCase().includes(g));
  const isValidPhone = (t: string) => /^[6-9]\d{9}$/.test(t.replace(/\D/g, ""));
  const isValidEmail = (t: string) => /\S+@\S+\.\S+/.test(t);

  const saveLeadToDatabase = async (leadData: Lead) => {
    try {
      const payload = {
        name:    leadData.name.trim(),
        phone:   leadData.phone.replace(/\D/g, ""),
        email:   leadData.email.trim(),
        message: `${leadData.purpose || "N/A"} → ${leadData.topic || "N/A"}`,
        source:  "Kiara AI",
      };
      if (!payload.name || !payload.phone || !payload.email) return;
      await fetch("http://localhost:5000/api/ai-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Save lead error:", e);
    }
  };

  const handleUserInput = (text: string) => {
    addMessage({ role: "user", text });

    if (isGreeting(text) && step !== "chat") {
      addMessage({ role: "ai", text: "Hello! 😊 I'm Kiara, here to help. May I know your name?" });
      return;
    }

    if (step === "name") {
      const updated = { ...leadRef.current, name: text.trim() };
      setLead(updated);
      addMessage({ role: "ai", text: `Nice to meet you, **${text.trim()}**! 😊\n\nWhat's your phone number?` });
      setStep("phone");
      return;
    }

    if (step === "phone") {
      if (!isValidPhone(text)) {
        addMessage({ role: "ai", text: "Please enter a valid 10-digit Indian mobile number 😊" });
        return;
      }
      const updated = { ...leadRef.current, phone: text.replace(/\D/g, "") };
      setLead(updated);
      addMessage({ role: "ai", text: "Perfect! 😊 And your email address?" });
      setStep("email");
      return;
    }

    if (step === "email") {
      if (!isValidEmail(text)) {
        addMessage({ role: "ai", text: "Hmm, that doesn't look right. Please enter a valid email 😊" });
        return;
      }
      const updated = { ...leadRef.current, email: text.trim() };
      setLead(updated);
      addMessage({
        role: "ai",
        text: "Great! How can Serverwale help you today?",
        buttons: ["Need Help", "Need Advice", "Need Consultation", "General Inquiry"],
      });
      setStep("purpose");
      return;
    }

    if (step === "chat") sendMessageToBackend(text);
  };

  const handleButtonClick = (value: string) => {
    addMessage({ role: "user", text: value });

    if (step === "purpose") {
      const updated = { ...leadRef.current, purpose: value };
      setLead(updated);
      addMessage({
        role: "ai",
        text: "What are you most interested in?",
        buttons: ["Products / Hardware", "Services", "About Serverwale", "Careers / Jobs"],
      });
      setStep("topic");
      return;
    }

    if (step === "topic") {
      const finalLead = { ...leadRef.current, topic: value };
      setLead(finalLead);
      saveLeadToDatabase(finalLead);
      addMessage({
        role: "ai",
        text: `Thanks, **${finalLead.name}**! 😊\n\nOur team will reach out to you shortly.\n\nFor urgent queries, call us at **${SUPPORT_NUMBER}** or WhatsApp us directly!`,
      });
      setStep("chat");
    }
  };

  const sendMessageToBackend = async (userText: string) => {
    setIsTyping(true);
    try {
      const res  = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, sessionId, lead: leadRef.current }),
      });
      const data = await res.json();
      if (!sessionId && data?.sessionId) setSessionId(data.sessionId);
      if (data?.reply) addMessage({ role: "ai", text: data.reply });
    } catch {
      addMessage({ role: "ai", text: "⚠️ Server not responding right now. Please try again shortly." });
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const t = input.trim();
    setInput("");
    handleUserInput(t);
  };

  const resetChat = () => {
    setMessages([{ role: "ai", text: KIARA_INTRO }]);
    setStep("name");
    setLead({ name: "", phone: "", email: "" });
    setIsTyping(false);
  };

  /* ── Render bold (**text**) ── */
  const renderText = (text: string) =>
    text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );

  return (
    <div className="h-full flex flex-col rounded-2xl overflow-hidden shadow-lg border font-sans bg-white">

      {/* Header */}
      <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={emma} alt="Kiara" className="w-10 h-10 rounded-full object-cover border-2 border-blue-400" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#08152E] rounded-full" />
          </div>
          <div>
            <h3 className="font-black text-sm">Kiara AI</h3>
            <p className="text-[11px] text-blue-200">{COMPANY_NAME} · 24/7 Sales Expert</p>
          </div>
        </div>
        <button onClick={resetChat} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition">
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} gap-2`}>
            {m.role === "ai" && (
              <img src={emma} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-1" />
            )}
            <div className="max-w-[80%]">
              <div className={`px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                m.role === "user"
                  ? "bg-[#0F172A] text-white rounded-tr-sm"
                  : "bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-sm"
              }`}>
                {renderText(m.text)}
              </div>
              {m.buttons && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {m.buttons.map((btn, idx) => (
                    <button key={idx} onClick={() => handleButtonClick(btn)}
                      className="border border-blue-200 bg-white hover:bg-blue-50 text-[#0055E5] text-xs font-semibold px-3 py-1.5 rounded-full transition">
                      {btn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <img src={emma} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
            <div className="bg-white border border-slate-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map(i => (
                  <span key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t bg-white flex gap-2 shrink-0">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder={step === "chat" ? "Ask Kiara anything..." : "Type here..."}
          className="flex-1 border border-slate-200 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
        />
        <button onClick={sendMessage}
          className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-5 rounded-full text-sm font-bold transition">
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChat;
