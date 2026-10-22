"use client";

import React from "react";
import { Sliders, Code2, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Design Your Form",
      desc: "Add your questions using our visual builder. Choose between text, email, multiple-choice buttons, and yes/no chips with live real-time preview.",
      icon: <Sliders className="w-6 h-6 text-indigo-400" />,
    },
    {
      num: "02",
      title: "Embed or Share",
      desc: "Copy your unique share link or grab our lightweight JavaScript embed snippet to mount a floating chat bubble on any website.",
      icon: <Code2 className="w-6 h-6 text-emerald-400" />,
    },
    {
      num: "03",
      title: "Collect & Analyze",
      desc: "Review submitted answers with timestamps in your dashboard, inspect individual respondent transcripts, and export responses to CSV.",
      icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center space-y-3 mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          Simple 3-Step Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          How Chatbot Form Builder Works
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          From concept to live website embedding in less than 3 minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur transition-all duration-200 hover:border-slate-700"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 shadow-md">
                {s.icon}
              </div>
              <span className="text-3xl font-black text-slate-800 select-none">
                {s.num}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {s.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
