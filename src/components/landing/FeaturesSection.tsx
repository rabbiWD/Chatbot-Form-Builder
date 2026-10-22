"use client";

import React from "react";
import {
  Palette,
  MessageSquare,
  Code2,
  TableProperties,
  Smartphone,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Interactive Form Studio",
      desc: "Drag, reorder, and configure questions across 4 supported types: Text, Email, Multiple Choice, and Yes/No.",
      icon: <Palette className="w-5 h-5 text-indigo-400" />,
      color: "border-indigo-500/20 bg-indigo-500/5",
    },
    {
      title: "Conversational Chatbot Flow",
      desc: "Display questions one at a time like an authentic conversation. Supports smart input, quick option chips, and animated typing indicators.",
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "1-Line Website Embed",
      desc: "Embed a sleek floating chat bubble on any external website with a single asynchronous JavaScript snippet or responsive iframe.",
      icon: <Code2 className="w-5 h-5 text-cyan-400" />,
      color: "border-cyan-500/20 bg-cyan-500/5",
    },
    {
      title: "Response Management & Export",
      desc: "View submissions in real-time, inspect individual answer transcripts, and export responses to clean CSV files with 1 click.",
      icon: <TableProperties className="w-5 h-5 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/5",
    },
    {
      title: "Mobile & Desktop Optimized",
      desc: "Automatically adapts between desktop popovers and responsive full-screen mobile layouts for flawless user experience.",
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      color: "border-amber-500/20 bg-amber-500/5",
    },
    {
      title: "Robust Validation & Publishing",
      desc: "Built-in required question enforcement, email format regex validation, and instant publish/unpublish toggling.",
      icon: <ShieldCheck className="w-5 h-5 text-rose-400" />,
      color: "border-rose-500/20 bg-rose-500/5",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Core Capabilities
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Everything You Need to Capture High-Quality Leads
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Built from the ground up for modern marketing teams, developers, and founders who care about user experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className={`rounded-2xl border p-6 shadow-lg backdrop-blur bg-slate-900/50 ${f.color} transition-all duration-200 hover:border-slate-700 hover:-translate-y-1`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 shadow-md mb-4">
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-slate-100 mb-2">
              {f.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
