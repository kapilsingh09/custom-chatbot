"use client";

// ---------------------------------------------------------
// TypingIndicator — 3 bouncing dots shown while AI is thinking
// ---------------------------------------------------------

export default function TypingIndicator() {
  return (
    <div className="animate-message-in">
      <div className="flex gap-4">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-bg-hover border border-border-subtle">
          <i className="fa-solid fa-robot text-xs text-text-secondary"></i>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-text-secondary mb-1.5">
            MA ChatBot
          </span>
          <div className="flex items-center gap-1.5 py-1">
            <span className="typing-dot w-2 h-2 rounded-full bg-text-muted inline-block"></span>
            <span className="typing-dot w-2 h-2 rounded-full bg-text-muted inline-block"></span>
            <span className="typing-dot w-2 h-2 rounded-full bg-text-muted inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
