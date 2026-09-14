"use client";

// ---------------------------------------------------------
// MessageBubble — ChatGPT-style message layout
// ---------------------------------------------------------

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className="animate-message-in">
      <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
            isUser
              ? "bg-white/10"
              : "bg-bg-hover border border-border-subtle"
          }`}
        >
          <i
            className={`fa-solid ${isUser ? "fa-user" : "fa-robot"} text-xs ${
              isUser ? "text-text-secondary" : "text-text-secondary"
            }`}
          ></i>
        </div>

        {/* Content */}
        <div className={`flex flex-col max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
          {/* Role label */}
          <span className="text-xs font-semibold text-text-secondary mb-1.5">
            {isUser ? "You" : "MA ChatBot"}
          </span>

          {/* Message text */}
          <div
            className={`text-sm leading-7 ${
              isUser ? "text-text-primary text-right" : "text-text-primary"
            }`}
          >
            {message.text.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < message.text.split("\n").length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
