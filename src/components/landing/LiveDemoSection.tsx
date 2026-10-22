"use client";

import React, { useState } from "react";
import { Form } from "@/types/form";
import ChatWidgetRunner from "@/components/widget/ChatWidgetRunner";
import { Bot, Sparkles, Smartphone, Monitor, ArrowRight } from "lucide-react";
import Link from "next/link";

const sampleForms: Form[] = [
  {
    id: "demo-lead-gen",
    title: "Lead Qualification Assistant",
    description: "Capture visitor leads and project scopes interactively.",
    isPublished: true,
    welcomeMessage: "Hey there! 👋 Looking for a tailored solution? Let's take 60 seconds to understand what you need.",
    completionMessage: "Fantastic! Thanks for your answers. We will prepare your custom proposal right away.",
    themeColor: "#4F46E5",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: "demo-q1",
        formId: "demo-lead-gen",
        label: "What is your full name?",
        type: "TEXT",
        placeholder: "e.g. Alex Morgan",
        isRequired: true,
        orderIndex: 0,
      },
      {
        id: "demo-q2",
        formId: "demo-lead-gen",
        label: "What is your work email?",
        type: "EMAIL",
        placeholder: "alex@company.com",
        isRequired: true,
        orderIndex: 1,
      },
      {
        id: "demo-q3",
        formId: "demo-lead-gen",
        label: "What type of project are you building?",
        type: "MULTIPLE_CHOICE",
        options: ["SaaS Platform", "E-commerce Website", "Custom Mobile App"],
        isRequired: true,
        orderIndex: 2,
      },
      {
        id: "demo-q4",
        formId: "demo-lead-gen",
        label: "Do you have an existing design ready?",
        type: "YES_NO",
        isRequired: false,
        orderIndex: 3,
      },
    ],
  },
  {
    id: "demo-feedback",
    title: "Customer Delight Survey",
    description: "CSAT score and instant user feedback.",
    isPublished: true,
    welcomeMessage: "Hi friend! ✨ How was your experience with us today?",
    completionMessage: "Thank you for the candid feedback! You help us improve every day.",
    themeColor: "#059669",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    questions: [
      {
        id: "demo-fb1",
        formId: "demo-feedback",
        label: "How would you rate our platform overall?",
        type: "MULTIPLE_CHOICE",
        options: ["⭐⭐⭐⭐⭐ Outstanding", "⭐⭐⭐⭐ Good", "⭐⭐⭐ Fair"],
        isRequired: true,
        orderIndex: 0,
      },
      {
        id: "demo-fb2",
        formId: "demo-feedback",
        label: "Would you recommend us to colleagues?",
        type: "YES_NO",
        isRequired: true,
        orderIndex: 1,
      },
      {
        id: "demo-fb3",
        formId: "demo-feedback",
        label: "Any additional suggestion for our engineering team?",
        type: "TEXT",
        placeholder: "Type your ideas here...",
        isRequired: false,
        orderIndex: 2,
      },
    ],
  },
];

export default function LiveDemoSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeForm = sampleForms[selectedIdx];

  return (
    <section id="demo" className="relative py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300">
          <Bot className="w-3.5 h-3.5" />
          Interactive Live Demo
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
          Experience the Chatbot in Action
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Test responding below just like your website visitors would. Notice the natural typing cadence and instant validation.
        </p>

        {/* Demo Form Switcher */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {sampleForms.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedIdx === i
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>
      </div>

      {/* Embedded Demo Container */}
      <div className="relative mx-auto max-w-lg rounded-3xl border border-slate-800 bg-slate-900/50 p-2 sm:p-4 shadow-2xl backdrop-blur">
        <div className="h-[620px] rounded-2xl overflow-hidden shadow-inner">
          <ChatWidgetRunner key={activeForm.id} form={activeForm} isStandalone={false} />
        </div>
      </div>

      {/* Floating CTA Callout */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">
          Want this on your website? It takes less than 2 minutes to create.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Build your custom form now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
