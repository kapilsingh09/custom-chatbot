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
        isCollapsed ? "w-[52px]" : "w-[260px]"
      } flex-shrink-0 bg-bg-sidebar flex flex-col border-r border-border-subtle transition-all duration-300 overflow-hidden`}
    >
      {/* Top section */}
      <div className={`flex items-center ${isCollapsed ? "flex-col gap-1 p-2 pt-3" : "justify-between p-3"} flex-shrink-0`}>
        {/* Toggle sidebar */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                     text-text-muted hover:text-text-primary hover:bg-bg-hover
                     transition-all duration-200 cursor-pointer"
          title={isCollapsed ? "Open sidebar" : "Close sidebar"}
        >
          <i className="fa-solid fa-bars text-sm"></i>
        </button>

        {/* New Chat */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                     text-text-muted hover:text-text-primary hover:bg-bg-hover
                     transition-all duration-200 cursor-pointer"
          title="New chat"
        >
          <i className="fa-regular fa-pen-to-square text-sm"></i>
        </button>
      </div>

      {/* Chat history list */}
      <div className="flex-1 overflow-y-auto px-1.5 py-1 min-h-0">
        {!isCollapsed && (
          <p className="px-3 py-2 text-xs font-medium text-text-muted whitespace-nowrap">Today</p>
        )}
        {MOCK_HISTORY.map((chat) => (
          <button
            key={chat.id}
            className={`w-full rounded-lg text-sm text-text-secondary
                       hover:bg-bg-hover hover:text-text-primary
                       transition-all duration-150 cursor-pointer
                       ${isCollapsed
                         ? "flex items-center justify-center w-9 h-9 mx-auto"
                         : "text-left px-3 py-2.5 truncate block"
                       }`}
            title={chat.title}
          >
            {isCollapsed ? (
              <i className="fa-regular fa-message text-xs"></i>
            ) : (
              chat.title
            )}
          </button>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-border-subtle p-2 flex-shrink-0">
        <button
          className={`w-full flex items-center rounded-lg text-sm text-text-secondary
                     hover:bg-bg-hover hover:text-text-primary
                     transition-all duration-150 cursor-pointer
                     ${isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2.5"}`}
          title="User"
        >
          <div className="w-7 h-7 rounded-full bg-bg-hover flex items-center justify-center flex-shrink-0">
            <i className="fa-solid fa-user text-xs text-text-muted"></i>
          </div>
          {!isCollapsed && <span className="truncate">User</span>}
        </button>
      </div>
    </aside>
  );
}
