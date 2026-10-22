"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bot, ArrowRight, Menu, X, Layers } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-indigo-400 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <Bot className="w-5 h-5" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-slate-100">
            Form<span className="text-indigo-400">Bot</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#features" className="hover:text-slate-200 transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-slate-200 transition-colors">
            How It Works
          </a>
          <a href="#demo" className="hover:text-slate-200 transition-colors">
            Live Chatbot Demo
          </a>
          <Link
            href="/embed-test.html"
            target="_blank"
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            Website Embed Test
          </Link>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-all hover:scale-102 active:scale-98"
          >
            Go to Dashboard
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 px-4 py-4 space-y-3 text-sm">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-indigo-400 py-1"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-indigo-400 py-1"
          >
            How It Works
          </a>
          <a
            href="#demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-indigo-400 py-1"
          >
            Live Demo
          </a>
          <Link
            href="/embed-test.html"
            target="_blank"
            className="block text-slate-300 hover:text-indigo-400 py-1"
          >
            Website Embed Test Page
          </Link>
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white"
            >
              Open Dashboard
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
