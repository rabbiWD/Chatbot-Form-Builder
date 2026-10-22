"use client";

import React from "react";
import { Form, Submission } from "@/types/form";
import { X, Calendar, Monitor, CheckCircle, MessageSquare } from "lucide-react";

interface SubmissionDetailModalProps {
  form: Form;
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmissionDetailModal({
  form,
  submission,
  isOpen,
  onClose,
}: SubmissionDetailModalProps) {
  if (!isOpen || !submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div>
            <span className="text-[11px] font-mono text-indigo-400 font-semibold uppercase tracking-wider">
              Submission Details
            </span>
            <h3 className="text-base font-bold text-slate-100">
              {form.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Banner */}
        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{new Date(submission.submittedAt).toLocaleString()}</span>
          </div>
          {submission.metadata && (
            <div className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate max-w-[240px] font-mono text-[11px]">
                {submission.metadata}
              </span>
            </div>
          )}
        </div>

        {/* Answers List */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-1">
          {form.questions.map((q, idx) => {
            const answerMatch = submission.answers.find(
              (a) => a.questionId === q.id
            );
            const val = answerMatch ? answerMatch.value : "—";

            return (
              <div
                key={q.id}
                className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-400">
                    Question {idx + 1}:
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase px-1.5 py-0.5 rounded bg-slate-800">
                    {q.type}
                  </span>
                </div>
                <h5 className="text-xs font-medium text-slate-300 mt-1 mb-2">
                  {q.label}
                </h5>
                <div className="rounded-lg bg-slate-900 border border-slate-800/80 px-3 py-2 text-sm font-medium text-slate-100">
                  {val || <span className="text-slate-600 italic">No answer provided</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end border-t border-slate-800 pt-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
