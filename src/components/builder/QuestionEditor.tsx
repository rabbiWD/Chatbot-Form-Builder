"use client";

import React from "react";
import { Question, QuestionType } from "@/types/form";
import {
  Type,
  Mail,
  ListOrdered,
  CheckCircle2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
  X,
  AlertCircle,
} from "lucide-react";

interface QuestionEditorProps {
  question: Question;
  index: number;
  totalQuestions: number;
  onUpdate: (updated: Question) => void;
  onDelete: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

const typeConfigs: Record<
  QuestionType,
  { label: string; icon: React.ReactNode; color: string; desc: string }
> = {
  TEXT: {
    label: "Short Text",
    icon: <Type className="w-4 h-4" />,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    desc: "Single line text response",
  },
  EMAIL: {
    label: "Email Address",
    icon: <Mail className="w-4 h-4" />,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    desc: "Validated email input format",
  },
  MULTIPLE_CHOICE: {
    label: "Multiple Choice",
    icon: <ListOrdered className="w-4 h-4" />,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    desc: "Clickable option buttons",
  },
  YES_NO: {
    label: "Yes / No",
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    desc: "Quick binary decision chips",
  },
};

export default function QuestionEditor({
  question,
  index,
  totalQuestions,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
}: QuestionEditorProps) {
  const currentConfig = typeConfigs[question.type];

  const handleTypeChange = (newType: QuestionType) => {
    let newOptions = question.options;
    if (newType === "MULTIPLE_CHOICE" && (!newOptions || newOptions.length === 0)) {
      newOptions = ["Option 1", "Option 2", "Option 3"];
    }
    onUpdate({
      ...question,
      type: newType,
      options: newOptions,
    });
  };

  const handleOptionChange = (optIdx: number, value: string) => {
    const opts = [...(question.options || [])];
    opts[optIdx] = value;
    onUpdate({ ...question, options: opts });
  };

  const handleAddOption = () => {
    const opts = [...(question.options || [])];
    opts.push(`Option ${opts.length + 1}`);
    onUpdate({ ...question, options: opts });
  };

  const handleRemoveOption = (optIdx: number) => {
    const opts = [...(question.options || [])];
    opts.splice(optIdx, 1);
    onUpdate({ ...question, options: opts });
  };

  return (
    <div className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg backdrop-blur transition-all duration-200 hover:border-slate-700 hover:shadow-indigo-500/5">
      {/* Question Header & Order Controls */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-xs font-semibold text-slate-300">
            {index + 1}
          </span>
          <div
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium ${currentConfig.color}`}
          >
            {currentConfig.icon}
            {currentConfig.label}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMoveUp(index)}
            title="Move Question Up"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={index === totalQuestions - 1}
            onClick={() => onMoveDown(index)}
            title="Move Question Down"
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <div className="mx-1 h-4 w-px bg-slate-800" />
          <button
            type="button"
            onClick={() => onDelete(question.id)}
            title="Delete Question"
            className="flex h-7 w-7 items-center justify-center rounded-md text-rose-400 hover:bg-rose-500/10 hover:text-rose-300"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Question Body */}
      <div className="mt-4 space-y-4">
        {/* Question Type Selector */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Question Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(typeConfigs) as QuestionType[]).map((t) => {
              const cfg = typeConfigs[t];
              const isSelected = question.type === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-all ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 shadow-sm shadow-indigo-500/20"
                      : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  {cfg.icon}
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Label / Prompt */}
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Question Title / Bot Prompt <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={question.label}
            onChange={(e) => onUpdate({ ...question, label: e.target.value })}
            placeholder="e.g. What is your company name?"
            className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Placeholder (for TEXT and EMAIL) */}
        {(question.type === "TEXT" || question.type === "EMAIL") && (
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Input Placeholder (Optional)
            </label>
            <input
              type="text"
              value={question.placeholder || ""}
              onChange={(e) =>
                onUpdate({ ...question, placeholder: e.target.value })
              }
              placeholder={
                question.type === "EMAIL"
                  ? "e.g. you@example.com"
                  : "e.g. Type your response here..."
              }
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Multiple Choice Options List */}
        {question.type === "MULTIPLE_CHOICE" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-400">
                Answer Options
              </label>
              <button
                type="button"
                onClick={handleAddOption}
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300"
              >
                <Plus className="w-3 h-3" />
                Add Choice
              </button>
            </div>
            <div className="space-y-2">
              {(question.options || []).map((opt, optIdx) => (
                <div key={optIdx} className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500 w-4 text-center">
                    {optIdx + 1}.
                  </span>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(optIdx, e.target.value)}
                    placeholder={`Option ${optIdx + 1}`}
                    className="flex-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  {(question.options || []).length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(optIdx)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Yes/No Preview Notice */}
        {question.type === "YES_NO" && (
          <div className="flex items-center gap-2 rounded-lg border border-slate-800/80 bg-slate-950/40 px-3 py-2 text-xs text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Chatbot will render two quick-tap cards: &quot;Yes&quot; and &quot;No&quot;.</span>
          </div>
        )}

        {/* Required Field Toggle */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-300">
              Required Question
            </span>
            <span className="text-[11px] text-slate-500">
              Visitor cannot proceed without answering
            </span>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={question.isRequired}
              onChange={(e) =>
                onUpdate({ ...question, isRequired: e.target.checked })
              }
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full bg-slate-800 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:bg-slate-400 after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:bg-white"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
