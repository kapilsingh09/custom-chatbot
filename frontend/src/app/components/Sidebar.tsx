"use client";

import { useState } from "react";

// ---------------------------------------------------------
// Sidebar — ChatGPT-style left navigation panel
// ---------------------------------------------------------

interface ChatHistory {
  id: string;
  title: string;
  date: string;
}

const MOCK_HISTORY: ChatHistory[] = [
  { id: "1", title: "Welcome to MA ChatBot", date: "Today" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? "w-0 overflow-hidden" : "w-[260px]"
      } bg-bg-sidebar h-full flex flex-col border-r border-border-subtle transition-all duration-300 flex-shrink-0`}
    >
      {/* Top section */}
      <div className="flex items-center justify-between p-3">
        {/* Toggle sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center
                     text-text-muted hover:text-text-primary hover:bg-bg-hover
                     transition-all duration-200 cursor-pointer"
          title="Close sidebar"
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>

        {/* New Chat */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center
                     text-text-muted hover:text-text-primary hover:bg-bg-hover
                     transition-all duration-200 cursor-pointer"
          title="New chat"
        >
          <i className="fa-regular fa-pen-to-square text-sm"></i>
        </button>
      </div>

      {/* Chat history list */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        <p className="px-3 py-2 text-xs font-medium text-text-muted">Today</p>
        {MOCK_HISTORY.map((chat) => (
          <button
            key={chat.id}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-text-secondary
                       hover:bg-bg-hover hover:text-text-primary
                       transition-all duration-150 cursor-pointer truncate"
          >
            {chat.title}
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-border-subtle p-3">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-secondary
                     hover:bg-bg-hover hover:text-text-primary
                     transition-all duration-150 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-bg-hover flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-user text-xs text-text-muted"></i>
          </div>
          <span className="truncate">User</span>
        </button>
      </div>
    </aside>
  );
}
