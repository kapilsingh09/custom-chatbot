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
// ChatWindow Component
// ---------------------------------------------------------
export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
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
      inputRef.current?.focus();
    }
  }

  // ---------------------------------------------------------
  // Start a new chat
  // ---------------------------------------------------------
  function newChat() {
    setMessages([]);
    setThreadId("");
    setInput("");
    inputRef.current?.focus();
  }

  // ---------------------------------------------------------
  // Handle Enter key
  // ---------------------------------------------------------
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <div className="w-full max-w-3xl h-[90vh] flex flex-col rounded-2xl glass shadow-2xl shadow-black/50 overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          {/* Robot icon with glow */}
          <div className="w-9 h-9 rounded-xl bg-accent-glow flex items-center justify-center">
            <i className="fa-solid fa-robot text-accent text-lg"></i>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary tracking-wide">
              MA Chatbot
            </h1>
            <p className="text-xs text-text-muted">Powered by Gemini</p>
          </div>
        </div>

        {/* New Chat button */}
        <button
          onClick={newChat}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium
                     text-text-secondary hover:text-text-primary
                     glass-light hover:border-border-glass-hover
                     transition-all duration-200 cursor-pointer"
        >
          <i className="fa-solid fa-plus text-[10px]"></i>
          New Chat
        </button>
      </header>

      {/* ===== MESSAGES AREA ===== */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full animate-fade-in">
            {/* Large robot icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent-glow flex items-center justify-center mb-5">
              <i className="fa-solid fa-robot text-accent text-3xl"></i>
            </div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              How can I help you today?
            </h2>
            <p className="text-sm text-text-muted mb-8">
              Ask me anything — I&apos;m here to help.
            </p>

            {/* Suggestion cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.text)}
                  className="glass-light rounded-xl px-4 py-3 text-left
                             hover:border-border-glass-hover hover:bg-white/[0.04]
                             transition-all duration-200 group cursor-pointer"
                >
                  <i
                    className={`fa-solid ${s.icon} text-accent text-xs mb-2 block
                               group-hover:scale-110 transition-transform duration-200`}
                  ></i>
                  <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                    {s.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ===== INPUT BAR ===== */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 glass-light rounded-xl px-4 py-2.5
                        focus-within:border-accent/30 focus-within:shadow-[0_0_12px_rgba(45,212,191,0.1)]
                        transition-all duration-300">
          <i className="fa-regular fa-comment-dots text-text-muted text-sm"></i>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted
                       outline-none disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       bg-gradient-to-r from-user-bubble-from to-user-bubble-to
                       text-white text-xs
                       disabled:opacity-30 disabled:cursor-not-allowed
                       hover:shadow-[0_0_16px_rgba(45,212,191,0.3)]
                       active:scale-95
                       transition-all duration-200 cursor-pointer"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-paper-plane"></i>
            )}
          </button>
        </div>
        <p className="text-[10px] text-text-muted text-center mt-2 opacity-60">
          MA Chatbot can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
