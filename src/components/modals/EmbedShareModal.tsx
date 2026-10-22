"use client";

import React, { useState, useEffect } from "react";
import { Form } from "@/types/form";
import {
  X,
  Copy,
  Check,
  Globe,
  Code2,
  Layers,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface EmbedShareModalProps {
  form: Form;
  isOpen: boolean;
  onClose: () => void;
}

export default function EmbedShareModal({
  form,
  isOpen,
  onClose,
}: EmbedShareModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  if (!isOpen) return null;

  const publicUrl = `${origin}/f/${form.id}`;
  const iframeSnippet = `<iframe src="${origin}/embed/${form.id}" width="100%" height="650" frameborder="0" style="border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);"></iframe>`;
  const scriptSnippet = `<script src="${origin}/widget.js" data-form-id="${form.id}" data-theme="${form.themeColor || "#4F46E5"}" async></script>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShareIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                Share & Embed Form
              </h3>
              <p className="text-xs text-slate-400">
                Distribute {form.title} on your website or share directly.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Status Notice */}
        {!form.isPublished && (
          <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Note: This form is currently in <strong>Draft</strong> mode. Publish it to allow visitors to submit responses.</span>
          </div>
        )}

        {/* Content Options */}
        <div className="mt-5 space-y-5">
          {/* 1. Direct Public Link */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                Direct Shareable Link
              </span>
              <a
                href={publicUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline"
              >
                Open Form <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-3.5 py-2 text-xs font-mono text-slate-300 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleCopy(publicUrl, "url")}
                className="flex items-center gap-1.5 rounded-xl bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-all shrink-0"
              >
                {copiedType === "url" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copiedType === "url" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* 2. Floating Widget Script */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                Floating Chatbot Launcher (JavaScript Snippet)
              </span>
              <a
                href="/embed-test.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
              >
                Test on Demo Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500">
              Paste this tag into your website's HTML before the closing <code>&lt;/body&gt;</code> tag:
            </p>
            <div className="relative">
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {scriptSnippet}
              </pre>
              <button
                type="button"
                onClick={() => handleCopy(scriptSnippet, "script")}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-slate-800/90 border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700"
              >
                {copiedType === "script" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedType === "script" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* 3. Inline Iframe */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                Embedded Iframe (For blog posts or Notion/Webflow)
              </span>
            </div>
            <div className="relative">
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-3 text-[11px] font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {iframeSnippet}
              </pre>
              <button
                type="button"
                onClick={() => handleCopy(iframeSnippet, "iframe")}
                className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-slate-800/90 border border-slate-700 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700"
              >
                {copiedType === "iframe" ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedType === "iframe" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
