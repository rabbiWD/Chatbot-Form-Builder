"use client";

import React, { useState } from "react";
import { Question } from "@/types/form";
import { Send, CheckCircle2, XCircle, AlertCircle, Loader2 } from "lucide-react";

interface QuestionInputProps {
  question: Question;
  themeColor?: string;
  onSubmit: (val: string) => void;
  isSubmitting?: boolean;
}

export default function QuestionInput({
  question,
  themeColor = "#4F46E5",
  onSubmit,
  isSubmitting = false,
}: QuestionInputProps) {
  const [textValue, setTextValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmitValue = (value: string) => {
    const trimmed = value.trim();

    if (question.isRequired && !trimmed) {
      setError("This question requires an answer to proceed.");
      return;
    }

    if (question.type === "EMAIL" && trimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setError("Please enter a valid email address (e.g. name@company.com).");
        return;
      }
    }

    setError(null);
    onSubmit(trimmed);
    setTextValue("");
  };

  return (
    <div className="w-full space-y-2">
      {error && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs animate-shake">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* MULTIPLE CHOICE */}
      {question.type === "MULTIPLE_CHOICE" && (
        <div className="flex flex-wrap gap-2">
          {(question.options || []).map((opt, i) => (
            <button
              key={i}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmitValue(opt)}
              className="rounded-full border border-slate-700 bg-slate-800/90 px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-700/80 transition-all hover:scale-102 active:scale-98 disabled:opacity-50"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* YES / NO */}
      {question.type === "YES_NO" && (
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmitValue("Yes")}
            className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 text-xs sm:text-sm font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all active:scale-98 disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            Yes
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmitValue("No")}
            className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 py-3 text-xs sm:text-sm font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500 transition-all active:scale-98 disabled:opacity-50"
          >
            <XCircle className="w-4 h-4" />
            No
          </button>
        </div>
      )}

      {/* TEXT & EMAIL */}
      {(question.type === "TEXT" || question.type === "EMAIL") && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitValue(textValue);
          }}
          className="flex items-center gap-2"
        >
          <input
            type={question.type === "EMAIL" ? "email" : "text"}
            value={textValue}
            onChange={(e) => {
              setTextValue(e.target.value);
              if (error) setError(null);
            }}
            disabled={isSubmitting}
            placeholder={
              question.placeholder ||
              (question.type === "EMAIL"
                ? "name@example.com"
                : "Type your message...")
            }
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: themeColor }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      )}
    </div>
  );
}
