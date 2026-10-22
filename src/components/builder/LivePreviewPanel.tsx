"use client";

import React, { useState } from "react";
import { Question } from "@/types/form";
import {
  Send,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Monitor,
} from "lucide-react";

interface LivePreviewPanelProps {
  title: string;
  welcomeMessage: string;
  completionMessage: string;
  themeColor: string;
  questions: Question[];
}

export default function LivePreviewPanel({
  title,
  welcomeMessage,
  completionMessage,
  themeColor,
  questions,
}: LivePreviewPanelProps) {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "mobile">("desktop");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const resetChat = () => {
    setCurrentStep(0);
    setAnswers({});
    setCurrentInput("");
    setErrorMessage("");
    setIsCompleted(false);
  };

  const handleNextQuestion = (value: string) => {
    const activeQuestion = questions[currentStep];
    if (!activeQuestion) return;

    // Validation
    if (activeQuestion.isRequired && !value.trim()) {
      setErrorMessage("This question requires an answer.");
      return;
    }

    if (activeQuestion.type === "EMAIL" && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }
    }

    setErrorMessage("");
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: value }));
    setCurrentInput("");

    if (currentStep + 1 < questions.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const activeQuestion = questions[currentStep];

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-2xl backdrop-blur">
      {/* Preview Header & Device Toggle */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Interactive Live Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5">
            <button
              type="button"
              onClick={() => setDeviceMode("desktop")}
              className={`p-1.5 rounded-md text-xs transition-all ${
                deviceMode === "desktop"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode("mobile")}
              className={`p-1.5 rounded-md text-xs transition-all ${
                deviceMode === "mobile"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
              title="Mobile Device View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={resetChat}
            className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            title="Restart Chat Conversation"
          >
            <RotateCcw className="w-3 h-3" />
            Restart
          </button>
        </div>
      </div>

      {/* Simulator Wrapper */}
      <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
        <div
          className={`flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl transition-all duration-300 overflow-hidden ${
            deviceMode === "mobile"
              ? "w-[360px] h-[580px] max-w-full"
              : "w-full max-w-[480px] h-[580px]"
          }`}
        >
          {/* Widget Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 text-white shadow-md"
            style={{ backgroundColor: themeColor }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold truncate">
                {title || "Conversational Assistant"}
              </h4>
              <p className="text-[11px] text-white/80 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Online &bull; Ready to help
              </p>
            </div>
          </div>

          {/* Conversation Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm scroll-smooth">
            {/* Welcome Message Bubble */}
            <div className="flex items-start gap-2.5 max-w-[85%]">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs"
                style={{ backgroundColor: themeColor }}
              >
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-slate-800 px-3.5 py-2.5 text-slate-200 text-xs shadow-sm leading-relaxed">
                {welcomeMessage || "Hello! Welcome to our form."}
              </div>
            </div>

            {/* Answered Questions History */}
            {questions.slice(0, currentStep).map((q) => (
              <React.Fragment key={q.id}>
                {/* Bot Question */}
                <div className="flex items-start gap-2.5 max-w-[85%]">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs"
                    style={{ backgroundColor: themeColor }}
                  >
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-slate-800 px-3.5 py-2.5 text-slate-200 text-xs shadow-sm leading-relaxed">
                    {q.label}
                  </div>
                </div>

                {/* Visitor Answer */}
                {answers[q.id] && (
                  <div className="flex items-end justify-end gap-2.5 ml-auto max-w-[85%]">
                    <div
                      className="rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-white text-xs shadow-sm leading-relaxed font-medium"
                      style={{ backgroundColor: themeColor }}
                    >
                      {answers[q.id]}
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 text-xs">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Active Current Question */}
            {!isCompleted && activeQuestion && (
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs"
                  style={{ backgroundColor: themeColor }}
                >
                  <Bot className="w-4 h-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-slate-800 px-3.5 py-2.5 text-slate-200 text-xs shadow-sm leading-relaxed border border-indigo-500/30">
                  {activeQuestion.label}
                  {activeQuestion.isRequired && (
                    <span className="ml-1 text-rose-400 font-bold">*</span>
                  )}
                </div>
              </div>
            )}

            {/* Completed Thank You Screen */}
            {isCompleted && (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg shadow-indigo-500/20"
                  style={{ backgroundColor: themeColor }}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-semibold text-slate-100">
                  Form Completed!
                </h5>
                <p className="text-xs text-slate-400 max-w-xs">
                  {completionMessage || "Thank you! Your response has been recorded."}
                </p>
                <button
                  type="button"
                  onClick={resetChat}
                  className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 underline"
                >
                  Fill out again
                </button>
              </div>
            )}
          </div>

          {/* Interactive Input Area */}
          {!isCompleted && activeQuestion && (
            <div className="border-t border-slate-800 bg-slate-950/70 p-3 space-y-2">
              {errorMessage && (
                <div className="text-[11px] text-rose-400 px-1 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Multiple Choice Buttons */}
              {activeQuestion.type === "MULTIPLE_CHOICE" && (
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {(activeQuestion.options || ["Option 1", "Option 2"]).map(
                    (opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleNextQuestion(opt)}
                        className="rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 hover:border-indigo-400 hover:bg-slate-700 transition-all font-medium"
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              )}

              {/* Yes / No Quick Chips */}
              {activeQuestion.type === "YES_NO" && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleNextQuestion("Yes")}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextQuestion("No")}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 hover:border-rose-500 transition-all"
                  >
                    No
                  </button>
                </div>
              )}

              {/* Text & Email Input Field */}
              {(activeQuestion.type === "TEXT" ||
                activeQuestion.type === "EMAIL") && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNextQuestion(currentInput);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type={activeQuestion.type === "EMAIL" ? "email" : "text"}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder={
                      activeQuestion.placeholder || "Type your answer..."
                    }
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-md transition-all hover:opacity-90 shrink-0"
                    style={{ backgroundColor: themeColor }}
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
