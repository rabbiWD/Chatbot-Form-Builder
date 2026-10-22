"use client";

import React from "react";
import { FileText, MessageSquare, CheckCircle, TrendingUp } from "lucide-react";

interface MetricCardsProps {
  stats: {
    totalForms: number;
    activeForms: number;
    totalSubmissions: number;
    avgCompletionRate: string;
  };
}

export default function MetricCards({ stats }: MetricCardsProps) {
  const cards = [
    {
      title: "Total Forms",
      value: stats.totalForms,
      subtitle: "Created across workspace",
      icon: <FileText className="w-5 h-5 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-500/5",
    },
    {
      title: "Responses Collected",
      value: stats.totalSubmissions,
      subtitle: "Conversational submissions",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "Active Forms",
      value: stats.activeForms,
      subtitle: "Accepting live responses",
      icon: <CheckCircle className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/20 bg-cyan-500/5",
    },
    {
      title: "Avg. Completion Rate",
      value: stats.avgCompletionRate,
      subtitle: "Conversational engagement",
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => (
        <div
          key={i}
          className={`rounded-2xl border p-5 shadow-lg backdrop-blur bg-slate-900/60 ${c.color} transition-all duration-200 hover:border-slate-700`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {c.title}
            </span>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              {c.icon}
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              {c.value}
            </span>
            <p className="text-[11px] text-slate-500 mt-1">{c.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
