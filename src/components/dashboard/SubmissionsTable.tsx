"use client";

import React, { useState } from "react";
import { Form, Submission } from "@/types/form";
import { exportSubmissionsToCsv } from "@/lib/export-csv";
import SubmissionDetailModal from "./SubmissionDetailModal";
import {
  Download,
  Eye,
  Calendar,
  Search,
  MessageSquareOff,
  Inbox,
} from "lucide-react";

interface SubmissionsTableProps {
  form: Form;
  submissions: Submission[];
}

export default function SubmissionsTable({
  form,
  submissions,
}: SubmissionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  // Filter submissions by search query
  const filteredSubmissions = submissions.filter((sub) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const hasMatchInAnswers = sub.answers.some((a) =>
      a.value.toLowerCase().includes(term)
    );
    const hasMatchInDate = new Date(sub.submittedAt)
      .toLocaleString()
      .toLowerCase()
      .includes(term);
    return hasMatchInAnswers || hasMatchInDate;
  });

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search answers or timestamps..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          type="button"
          onClick={() => exportSubmissionsToCsv(form, submissions)}
          disabled={submissions.length === 0}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 hover:text-white transition-all disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" />
          Export to CSV
        </button>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl backdrop-blur">
        {filteredSubmissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-500 mb-3">
              <Inbox className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-semibold text-slate-200">
              No submissions recorded yet
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm">
              Publish your form and share the link or embed the widget to begin collecting visitor responses.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="border-b border-slate-800 bg-slate-950/40 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="py-3.5 px-4">Date & Time</th>
                  {form.questions.slice(0, 2).map((q) => (
                    <th key={q.id} className="py-3.5 px-4 truncate max-w-[200px]">
                      {q.label}
                    </th>
                  ))}
                  <th className="py-3.5 px-4">Device</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredSubmissions.map((sub) => {
                  const firstAnswers = form.questions.slice(0, 2).map((q) => {
                    const match = sub.answers.find((a) => a.questionId === q.id);
                    return match ? match.value : "—";
                  });

                  return (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                        {new Date(sub.submittedAt).toLocaleString()}
                      </td>

                      {firstAnswers.map((ans, idx) => (
                        <td
                          key={idx}
                          className="py-3 px-4 font-medium text-slate-200 truncate max-w-[220px]"
                        >
                          {ans}
                        </td>
                      ))}

                      <td className="py-3 px-4 text-slate-500 truncate max-w-[150px] font-mono text-[11px]">
                        {sub.metadata || "Web Visitor"}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedSubmission(sub)}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-medium text-slate-300 hover:border-indigo-500 hover:text-indigo-300 transition-all"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <SubmissionDetailModal
        form={form}
        submission={selectedSubmission}
        isOpen={Boolean(selectedSubmission)}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}
