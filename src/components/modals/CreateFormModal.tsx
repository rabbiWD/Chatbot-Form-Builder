"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Sparkles, Plus, Loader2 } from "lucide-react";

interface CreateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates = [
  {
    id: "blank",
    title: "Blank Canvas",
    desc: "Start with an empty form and custom questions.",
    welcome: "Hello! Welcome to our form.",
  },
  {
    id: "lead",
    title: "Lead Generation",
    desc: "Capture name, work email, and company details.",
    welcome: "Hey there! 👋 Interested in leveling up? Let's connect.",
  },
  {
    id: "feedback",
    title: "Customer Feedback",
    desc: "Collect user feedback and satisfaction ratings.",
    welcome: "Hi! ✨ We'd love your feedback on your recent experience.",
  },
];

export default function CreateFormModal({
  isOpen,
  onClose,
}: CreateFormModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");
  const [themeColor, setThemeColor] = useState("#4F46E5");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title for your form.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const template = templates.find((t) => t.id === selectedTemplate);

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          welcomeMessage: template?.welcome,
          themeColor,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create form");
      }

      const data = await res.json();
      onClose();
      router.push(`/dashboard/forms/${data.form.id}/edit`);
    } catch (err: any) {
      setError(err.message || "Failed to create form");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Create New Chatbot Form
              </h3>
              <p className="text-xs text-slate-400">
                Build an interactive conversational form in seconds.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Form Title */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Form Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Website Demo Request"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Form Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief internal note about this form"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Starter Template */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Choose Starter Template
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                    selectedTemplate === tpl.id
                      ? "border-indigo-500 bg-indigo-500/15 shadow-sm"
                      : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-200">
                    {tpl.title}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                    {tpl.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color Picker */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Bot Accent Color
            </label>
            <div className="flex items-center gap-3">
              {["#4F46E5", "#059669", "#0891B2", "#E11D48", "#7C3AED"].map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setThemeColor(c)}
                    className={`h-7 w-7 rounded-full transition-transform ${
                      themeColor === c ? "scale-115 ring-2 ring-white" : ""
                    }`}
                    style={{ backgroundColor: c }}
                  />
                )
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 disabled:opacity-50 transition-all"
            >
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Create & Open Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
