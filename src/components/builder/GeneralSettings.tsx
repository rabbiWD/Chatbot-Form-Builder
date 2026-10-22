"use client";

import React from "react";
import { MessageSquare, Sparkles, Palette, FileText } from "lucide-react";

interface GeneralSettingsProps {
  title: string;
  description: string;
  welcomeMessage: string;
  completionMessage: string;
  themeColor: string;
  onChange: (fields: {
    title?: string;
    description?: string;
    welcomeMessage?: string;
    completionMessage?: string;
    themeColor?: string;
  }) => void;
}

const colorPresets = [
  { name: "Indigo", value: "#4F46E5" },
  { name: "Emerald", value: "#059669" },
  { name: "Cyan", value: "#0891B2" },
  { name: "Rose", value: "#E11D48" },
  { name: "Violet", value: "#7C3AED" },
  { name: "Amber", value: "#D97706" },
];

export default function GeneralSettings({
  title,
  description,
  welcomeMessage,
  completionMessage,
  themeColor,
  onChange,
}: GeneralSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-sm font-semibold text-slate-200">
          <FileText className="w-4 h-4 text-indigo-400" />
          General Information
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Form Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => onChange({ title: e.target.value })}
              placeholder="e.g. Website Lead Generation"
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Internal Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => onChange({ description: e.target.value })}
              placeholder="Brief summary for your internal team..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Chatbot Experience & Personality */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-sm font-semibold text-slate-200">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          Conversational Messaging
        </div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Bot Welcome Message
            </label>
            <textarea
              rows={2}
              value={welcomeMessage}
              onChange={(e) => onChange({ welcomeMessage: e.target.value })}
              placeholder="Greeting displayed when visitor opens chatbot..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Completion & Thank You Message
            </label>
            <textarea
              rows={2}
              value={completionMessage}
              onChange={(e) => onChange({ completionMessage: e.target.value })}
              placeholder="Message shown after visitor completes all questions..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Theme & Branding */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-sm font-semibold text-slate-200">
          <Palette className="w-4 h-4 text-indigo-400" />
          Branding & Theme Color
        </div>
        <div className="mt-4 space-y-3">
          <label className="block text-xs font-medium text-slate-400">
            Accent Color
          </label>
          <div className="flex flex-wrap items-center gap-2.5">
            {colorPresets.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ themeColor: c.value })}
                className={`group flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  themeColor.toLowerCase() === c.value.toLowerCase()
                    ? "border-slate-400 bg-slate-800 text-white ring-2 ring-indigo-500/50"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <span
                  className="h-3.5 w-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: c.value }}
                />
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-slate-500">Custom Hex:</span>
            <div className="flex items-center gap-1.5">
              <input
                type="color"
                value={themeColor}
                onChange={(e) => onChange({ themeColor: e.target.value })}
                className="h-7 w-7 cursor-pointer rounded border border-slate-700 bg-transparent"
              />
              <input
                type="text"
                value={themeColor}
                onChange={(e) => onChange({ themeColor: e.target.value })}
                className="w-24 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-xs font-mono text-slate-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
