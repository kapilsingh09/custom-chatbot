"use client";

// ---------------------------------------------------------
// TypingIndicator — 3 bouncing dots shown while AI is thinking
// ---------------------------------------------------------

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5 animate-message-in">
      {/* AI Avatar */}
      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-accent-glow">
        <i className="fa-solid fa-robot text-[11px] text-accent"></i>
      </div>

      {/* Dots bubble */}
      <div className="glass-light px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex items-center gap-1">
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
          <span className="typing-dot w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
        </div>
      </div>
    </div>
  );
}
