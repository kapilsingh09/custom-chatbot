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
      <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
        {/* AI Avatar — only shown for AI messages */}
        {!isUser && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-bg-hover border border-border-subtle">
            <i className="fa-solid fa-robot text-xs text-text-secondary"></i>
          </div>
        )}

        {/* Content */}
        <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
          {/* Role label */}
          <span className="text-xs font-semibold text-text-secondary mb-1.5">
            {isUser ? "You" : "MA ChatBot"}
          </span>

          {/* Message text */}
          <div className="text-sm leading-7 text-text-primary whitespace-pre-wrap break-words">
            {message.text}
          </div>
        </div>

        {/* User Avatar — only shown for user messages */}
        {isUser && (
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-white/10">
            <i className="fa-solid fa-user text-xs text-text-secondary"></i>
          </div>
        )}
      </div>
    </div>
  );
}
