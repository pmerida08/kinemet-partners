/**
 * ChatWidget - Floating chatbot bubble connected to an n8n webhook
 * Styles match the Kinemet Partners brand (primary: #1a202c, accent: #ff6b00)
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// ─── CONFIGURATION ──────────────────────────────────────────────────────────
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string;
// ────────────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

/** Generates a stable session id that persists for the tab's lifetime */
function getSessionId(): string {
  const key = "kp_chat_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = `kp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "¡Hola! Soy el asistente de Kinemet Partners. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPing, setShowPing] = useState(false);
  const sessionId = useRef(getSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Show attention ping after 4 s if chat hasn't been opened yet
  useEffect(() => {
    const timer = setTimeout(() => setShowPing(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setShowPing(false);
  };

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_input: text,
          session_id: sessionId.current,
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // Parse n8n response — primary field is bot_output
      const data = await response.json().catch(() => null);
      const replyText =
        (typeof data === "object" && data !== null
          ? (data.bot_output ??
            data.output ??
            data.message ??
            data.text ??
            data.reply ??
            JSON.stringify(data))
          : String(data)) || "Respuesta recibida.";

      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          content: replyText,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          content:
            "Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo o contáctanos directamente.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat Window ── */}
      <div
        aria-hidden={!open}
        className={`
          fixed z-[9999] flex flex-col bg-white shadow-2xl border border-slate-200
          transition-all duration-300 ease-out w-full
          bottom-0 left-0 right-0 rounded-t-2xl
          sm:bottom-24 sm:left-auto sm:right-6 sm:w-[370px] sm:rounded-2xl sm:origin-bottom-right
          ${open ? "opacity-100 translate-y-0 sm:scale-100 pointer-events-auto" : "opacity-100 translate-y-[120%] sm:translate-y-0 sm:opacity-0 sm:scale-90 pointer-events-none"}
        `}
        style={{ height: "80vh", maxHeight: "520px" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 rounded-t-2xl text-white"
          style={{
            background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#ff6b00" }}
            >
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">
                Kinemet Partners
              </p>
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
                En línea
              </span>
            </div>
          </div>
          <button
            aria-label="Cerrar chat"
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#ff6b00" }}
                >
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div
                className={`
                  max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                  ${
                    msg.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }
                `}
                style={
                  msg.role === "user" ? { backgroundColor: "#ff6b00" } : {}
                }
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="prose prose-sm prose-slate max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:text-slate-100 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex justify-start gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ff6b00" }}
              >
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 pb-4 pt-2 border-t border-slate-100">
          <div
            className="flex items-end gap-2 bg-slate-50 rounded-xl border border-slate-200 px-3 py-2 focus-within:ring-2 focus-within:border-transparent transition-all"
            style={{ "--tw-ring-color": "#ff6b00" } as React.CSSProperties}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu mensaje..."
              rows={1}
              disabled={loading}
              className="flex-1 bg-transparent resize-none outline-none text-sm text-slate-800 placeholder-slate-400 max-h-24 disabled:opacity-50"
              style={{ lineHeight: "1.5" }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Enviar mensaje"
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#ff6b00" }}
            >
              {loading ? (
                <Loader2 size={15} className="text-white animate-spin" />
              ) : (
                <Send size={15} className="text-white" />
              )}
            </button>
          </div>
          <p className="text-center text-[10px] text-slate-400 mt-2">
            Kinemet Partners · Asistente de IA
          </p>
        </div>
      </div>

      {/* ── Floating Bubble Button ── */}
      <button
        onClick={handleOpen}
        aria-label="Abrir chat"
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          open
            ? "scale-0 opacity-0 pointer-events-none sm:scale-100 sm:opacity-100 sm:pointer-events-auto sm:hover:scale-110 sm:active:scale-95"
            : "scale-100 opacity-100 pointer-events-auto hover:scale-110 active:scale-95"
        }`}
        style={{ backgroundColor: "#ff6b00" }}
      >
        <MessageCircle size={26} className="text-white" />

        {/* Attention ping ring */}
        {showPing && !open && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-60"
            style={{ backgroundColor: "#ff6b00" }}
          />
        )}
      </button>
    </>
  );
}
