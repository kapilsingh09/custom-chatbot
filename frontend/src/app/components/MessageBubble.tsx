"use client";

// ---------------------------------------------------------
// MessageBubble — displays a single chat message
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

  // Format time as HH:MM
  const time = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-end gap-2.5 animate-message-in ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUser
            ? "bg-gradient-to-br from-user-bubble-from to-user-bubble-to"
            : "bg-accent-glow"
        }`}
      >
        <i
          className={`fa-solid ${isUser ? "fa-user" : "fa-robot"} text-[11px] ${
            isUser ? "text-white" : "text-accent"
          }`}
        ></i>
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-gradient-to-r from-user-bubble-from to-user-bubble-to text-white rounded-br-sm"
              : "glass-light text-text-primary rounded-bl-sm"
          }`}
        >
          {/* Render text with line breaks */}
          {message.text.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < message.text.split("\n").length - 1 && <br />}
            </span>
          ))}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-text-muted mt-1 px-1">{time}</span>
      </div>
    </div>
  );
}
