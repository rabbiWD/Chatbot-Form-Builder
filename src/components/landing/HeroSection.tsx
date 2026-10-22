"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Bot, CheckCircle2, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background Gradient Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 backdrop-blur shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Chatbot Form Builder</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.12]">
          Turn Boring Forms Into{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Conversational Chats
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
          Create high-converting conversational forms in minutes. Embed a floating chatbot widget on any website, collect responses step-by-step, and manage submissions effortlessly.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-102 active:scale-98 w-full sm:w-auto"
          >
            Create Your First Form
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#demo"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all w-full sm:w-auto"
          >
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400/20" />
            Try Live Demo
          </a>
        </div>

        {/* Value Proposition Bullets */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Zero Code Required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            1-Line JavaScript Embed
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            3x Higher Engagement
          </span>
        </div>
      </div>
    </section>
  );
}
