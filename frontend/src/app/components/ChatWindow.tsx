"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

// ---------------------------------------------------------
// Types
// ---------------------------------------------------------
interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

// ---------------------------------------------------------
// API URL — points to our FastAPI backend
// ---------------------------------------------------------
const API_URL = "http://localhost:8000";

// ---------------------------------------------------------
// Suggested prompts for the empty state
// ---------------------------------------------------------
const SUGGESTIONS = [
  { icon: "fa-lightbulb", text: "Explain quantum computing in simple terms" },
  { icon: "fa-code", text: "Write a Python function to reverse a string" },
  { icon: "fa-globe", text: "What are the wonders of the world?" },
  { icon: "fa-rocket", text: "How does a rocket engine work?" },
];

// ---------------------------------------------------------
// ChatWindow Component — ChatGPT-style main area
// ---------------------------------------------------------
export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ---------------------------------------------------------
  // Send a message to the backend
  // ---------------------------------------------------------
  async function sendMessage(text?: string) {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Add user message to chat
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          thread_id: threadId,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();

      // Save the thread_id so future messages go to the same conversation
      if (data.thread_id) {
        setThreadId(data.thread_id);
      }

      // Add AI message to chat
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text: data.reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      // Show error message in chat
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "ai",
        text: "Sorry, I couldn't connect to the server. Make sure the backend is running on port 8000.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  }

  // ---------------------------------------------------------
  // Handle Enter key (Enter sends, Shift+Enter adds newline)
  // ---------------------------------------------------------
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <div className="flex-1 flex flex-col h-full bg-bg-primary relative">
      {/* ===== TOP BAR ===== */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold text-text-primary">
            MA ChatBot
          </h1>
          <span className="text-xs text-text-muted font-normal px-2 py-0.5 rounded-full bg-bg-hover">
            Gemini
          </span>
        </div>
      </header>

      {/* ===== MESSAGES AREA ===== */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Empty state */}
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
              {/* Logo / Icon */}
              <div className="w-14 h-14 rounded-full bg-bg-hover border border-border-subtle flex items-center justify-center mb-6">
                <i className="fa-solid fa-robot text-2xl text-text-secondary"></i>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                How can I help you today?
              </h2>
              <p className="text-sm text-text-muted mb-10">
                Ask me anything — I&apos;m powered by Google Gemini.
              </p>

              {/* Suggestion cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.text)}
                    className="border border-border-subtle rounded-xl px-4 py-3.5 text-left
                               hover:bg-bg-hover
                               transition-all duration-200 group cursor-pointer"
                  >
                    <i
                      className={`fa-solid ${s.icon} text-text-muted text-xs mb-2.5 block
                                 group-hover:text-text-secondary transition-colors duration-200`}
                    ></i>
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors duration-200 leading-snug">
                      {s.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          <div className="space-y-6">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* ===== INPUT BAR ===== */}
      <div className="border-t border-border-subtle bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div
            className="flex items-end gap-3 bg-bg-input border border-border-input rounded-2xl px-4 py-3
                        focus-within:border-white/20 focus-within:bg-bg-input-focus
                        transition-all duration-200"
          >
            {/* Attach button */}
            <button
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                         text-text-muted hover:text-text-secondary
                         transition-colors duration-150 cursor-pointer mb-0.5"
              title="Attach file"
            >
              <i className="fa-solid fa-paperclip text-sm"></i>
            </button>

            {/* Textarea input */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message MA ChatBot..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-placeholder
                         outline-none disabled:opacity-50 leading-6 max-h-[200px] overflow-y-auto"
            />

            {/* Send button */}
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                         bg-send-bg text-send-text
                         disabled:bg-send-disabled disabled:text-text-muted disabled:cursor-not-allowed
                         hover:opacity-90 active:scale-95
                         transition-all duration-150 cursor-pointer mb-0.5"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin text-xs"></i>
              ) : (
                <i className="fa-solid fa-arrow-up text-xs font-bold"></i>
              )}
            </button>
          </div>

          <p className="text-[11px] text-text-muted text-center mt-2.5">
            MA ChatBot can make mistakes. Verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
