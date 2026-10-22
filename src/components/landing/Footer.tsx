"use client";

import React from "react";
import Link from "next/link";
import { Bot, Github, Mail, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-slate-100">
              Form<span className="text-indigo-400">Bot</span> Studio
            </span>
          </Link>
          <p className="text-xs text-slate-500 max-w-xs">
            A modern, conversational form builder platform with zero-code website embedding.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-200 transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-slate-200 transition-colors">
            Dashboard
          </Link>
          <a href="#features" className="hover:text-slate-200 transition-colors">
            Features
          </a>
          <a href="#demo" className="hover:text-slate-200 transition-colors">
            Live Demo
          </a>
          <Link
            href="/embed-test.html"
            target="_blank"
            className="hover:text-indigo-400 transition-colors"
          >
            Widget Embed Test
          </Link>
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rabbiWD/Chatbot-Form-Builder"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="mailto:contact@chatbotforms.dev"
            aria-label="Email Support"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2">
        <span>&copy; {new Date().getFullYear()} Chatbot Form Builder. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Designed with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for seamless conversions.
        </span>
      </div>
    </footer>
  );
}
