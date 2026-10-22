"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form, Question, QuestionType } from "@/types/form";
import QuestionEditor from "./QuestionEditor";
import GeneralSettings from "./GeneralSettings";
import LivePreviewPanel from "./LivePreviewPanel";
import {
  ArrowLeft,
  Save,
  Globe,
  Share2,
  Plus,
  Sliders,
  HelpCircle,
  Eye,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

interface FormBuilderProps {
  initialForm: Form;
}

export default function FormBuilder({ initialForm }: FormBuilderProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"questions" | "settings">("questions");
  const [title, setTitle] = useState(initialForm.title);
  const [description, setDescription] = useState(initialForm.description || "");
  const [welcomeMessage, setWelcomeMessage] = useState(initialForm.welcomeMessage);
  const [completionMessage, setCompletionMessage] = useState(initialForm.completionMessage);
  const [themeColor, setThemeColor] = useState(initialForm.themeColor);
  const [isPublished, setIsPublished] = useState(initialForm.isPublished);
  const [questions, setQuestions] = useState<Question[]>(initialForm.questions || []);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add a new question
  const handleAddQuestion = (type: QuestionType = "TEXT") => {
    const newQ: Question = {
      id: "q_" + Math.random().toString(36).substring(2, 9),
      formId: initialForm.id,
      label:
        type === "MULTIPLE_CHOICE"
          ? "Which of the following describes you?"
          : type === "YES_NO"
          ? "Are you currently interested?"
          : type === "EMAIL"
          ? "What is your email address?"
          : "What is your answer?",
      type,
      placeholder: type === "EMAIL" ? "you@example.com" : "Type your answer...",
      options: type === "MULTIPLE_CHOICE" ? ["Option A", "Option B", "Option C"] : undefined,
      isRequired: true,
      orderIndex: questions.length,
    };
    setQuestions((prev) => [...prev, newQ]);
  };

  // Update existing question
  const handleUpdateQuestion = (updated: Question) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    if (questions.length <= 1) {
      alert("A form must have at least one question.");
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Reorder questions
  const handleMoveUp = (idx: number) => {
    if (idx === 0) return;
    setQuestions((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx - 1];
      copy[idx - 1] = temp;
      return copy.map((q, i) => ({ ...q, orderIndex: i }));
    });
  };

  const handleMoveDown = (idx: number) => {
    if (idx >= questions.length - 1) return;
    setQuestions((prev) => {
      const copy = [...prev];
      const temp = copy[idx];
      copy[idx] = copy[idx + 1];
      copy[idx + 1] = temp;
      return copy.map((q, i) => ({ ...q, orderIndex: i }));
    });
  };

  // Save changes to server
  const handleSave = async (publishOverride?: boolean) => {
    setIsSaving(true);
    setSaveSuccess(false);

    const publishState = publishOverride !== undefined ? publishOverride : isPublished;

    try {
      const res = await fetch(`/api/forms/${initialForm.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          welcomeMessage,
          completionMessage,
          themeColor,
          isPublished: publishState,
          questions,
        }),
      });

      if (!res.ok) throw new Error("Failed to save form");

      if (publishOverride !== undefined) {
        setIsPublished(publishOverride);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to save form");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-3 backdrop-blur lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-slate-100 truncate max-w-[200px] sm:max-w-xs">
              {title || "Untitled Form"}
            </h1>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                isPublished
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Share / Public URL Link */}
          {isPublished && (
            <Link
              href={`/f/${initialForm.id}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Public URL
            </Link>
          )}

          {/* Publish / Unpublish Toggle */}
          <button
            type="button"
            onClick={() => handleSave(!isPublished)}
            disabled={isSaving}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              isPublished
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isPublished ? "Unpublish" : "Publish Form"}
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 transition-all"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saveSuccess ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {saveSuccess ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </header>

      {/* Main Builder Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-6 max-w-[1600px] w-full mx-auto">
        {/* Left Column: Form Builder Studio */}
        <div className="lg:col-span-7 flex flex-col space-y-5">
          {/* Studio Tab Switcher */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("questions")}
              className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
                activeTab === "questions"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              Questions & Steps ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "border-indigo-500 text-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Design & Messages
            </button>
          </div>

          {/* Tab 1: Questions Editor */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              {/* Question Cards List */}
              {questions.map((q, idx) => (
                <QuestionEditor
                  key={q.id}
                  question={q}
                  index={idx}
                  totalQuestions={questions.length}
                  onUpdate={handleUpdateQuestion}
                  onDelete={handleDeleteQuestion}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                />
              ))}

              {/* Add Question Button & Type Selector */}
              <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-5 text-center">
                <span className="block text-xs font-medium text-slate-400 mb-3">
                  Add another question step to your chatbot
                </span>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddQuestion("TEXT")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-indigo-500 hover:text-indigo-300 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Short Text
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddQuestion("EMAIL")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-500 hover:text-emerald-300 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Email
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddQuestion("MULTIPLE_CHOICE")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-purple-500 hover:text-purple-300 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Multiple Choice
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddQuestion("YES_NO")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-amber-500 hover:text-amber-300 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Yes / No
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: General & Design Settings */}
          {activeTab === "settings" && (
            <GeneralSettings
              title={title}
              description={description}
              welcomeMessage={welcomeMessage}
              completionMessage={completionMessage}
              themeColor={themeColor}
              onChange={(f) => {
                if (f.title !== undefined) setTitle(f.title);
                if (f.description !== undefined) setDescription(f.description);
                if (f.welcomeMessage !== undefined) setWelcomeMessage(f.welcomeMessage);
                if (f.completionMessage !== undefined)
                  setCompletionMessage(f.completionMessage);
                if (f.themeColor !== undefined) setThemeColor(f.themeColor);
              }}
            />
          )}
        </div>

        {/* Right Column: Sticky Live Preview Panel */}
        <div className="lg:col-span-5 flex flex-col lg:sticky lg:top-20 h-auto lg:h-[calc(100vh-6rem)]">
          <LivePreviewPanel
            title={title}
            welcomeMessage={welcomeMessage}
            completionMessage={completionMessage}
            themeColor={themeColor}
            questions={questions}
          />
        </div>
      </div>
    </div>
  );
}
