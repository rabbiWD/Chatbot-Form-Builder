"use client";

import React from "react";
import { Bot, User } from "lucide-react";

interface ChatBubbleProps {
  sender: "bot" | "user";
  message: string;
  themeColor?: string;
  timestamp?: string;
}

export default function ChatBubble({
  sender,
  message,
  themeColor = "#4F46E5",
  timestamp,
}: ChatBubbleProps) {
  const isBot = sender === "bot";

  return (
    <div
      className={`flex items-start gap-2.5 transition-all duration-300 animate-fadeIn ${
        isBot ? "max-w-[85%]" : "ml-auto max-w-[85%] flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs shadow-sm ${
          isBot ? "text-white" : "bg-slate-800 text-slate-200"
        }`}
        style={isBot ? { backgroundColor: themeColor } : {}}
      >
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble Message */}
      <div className="flex flex-col space-y-1">
        <div
          className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
            isBot
              ? "rounded-tl-xs bg-slate-900 border border-slate-800/80 text-slate-100"
              : "rounded-tr-xs text-white font-medium"
          }`}
          style={!isBot ? { backgroundColor: themeColor } : {}}
        >
          {message}
        </div>
        {timestamp && (
          <span
            className={`text-[10px] text-slate-500 px-1 ${
              !isBot ? "text-right" : "text-left"
            }`}
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
