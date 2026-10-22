"use client";

import React, { useState } from "react";
import Link from "next/link";
import CreateFormModal from "@/components/modals/CreateFormModal";
import { Plus, Bot, ExternalLink, Home, Layers } from "lucide-react";

export default function DashboardHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 px-4 sm:px-8 py-3.5 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-tight text-slate-100 flex items-center gap-1.5">
                  Chatbot Form Studio
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Workspace Dashboard
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>

            <Link
              href="/embed-test.html"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              Widget Embed Demo
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
            </Link>

            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 hover:bg-indigo-500 transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              Create Form
            </button>
          </div>
        </div>
      </header>

      {/* Create Form Modal */}
      <CreateFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}
