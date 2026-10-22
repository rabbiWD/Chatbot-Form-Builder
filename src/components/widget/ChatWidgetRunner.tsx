"use client";

import React, { useState, useEffect, useRef } from "react";
import { Form, Question } from "@/types/form";
import ChatBubble from "./ChatBubble";
import QuestionInput from "./QuestionInput";
import { Bot, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

interface ChatWidgetRunnerProps {
  form: Form;
  isStandalone?: boolean;
  onFinish?: () => void;
}

export default function ChatWidgetRunner({
  form,
  isStandalone = false,
  onFinish,
}: ChatWidgetRunnerProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{ questionId: string; value: string }[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = form.questions || [];
  const currentQuestion = questions[currentStep];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentStep, answers, isTyping, isCompleted]);

  // Initial typing effect on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswerSubmit = async (value: string) => {
    if (!currentQuestion) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestion.id, value },
    ];
    setAnswers(newAnswers);

    // If there are more questions
    if (currentStep + 1 < questions.length) {
      setIsTyping(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsTyping(false);
      }, 500);
    } else {
      // All questions completed: Submit payload
      setIsSubmitting(true);
      setErrorMsg(null);

      try {
        const metadata = {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "Web",
          referrer: typeof document !== "undefined" ? document.referrer : "",
          timestamp: new Date().toISOString(),
        };

        const res = await fetch(`/api/forms/${form.id}/submit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answers: newAnswers,
            metadata,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to submit response");
        }

        setIsCompleted(true);
        if (onFinish) onFinish();
      } catch (err: any) {
        console.error("Submission error:", err);
        setErrorMsg(err.message || "Failed to submit answers. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const restartChat = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsTyping(true);
    setIsCompleted(false);
    setErrorMsg(null);
    setTimeout(() => setIsTyping(false), 500);
  };

  return (
    <div
      className={`flex flex-col bg-slate-950 text-slate-100 overflow-hidden ${
        isStandalone
          ? "w-full max-w-lg mx-auto h-[90vh] max-h-[720px] rounded-2xl border border-slate-800 shadow-2xl"
          : "w-full h-full"
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 text-white shadow-md z-10 shrink-0"
        style={{ backgroundColor: form.themeColor || "#4F46E5" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold truncate leading-tight">
              {form.title}
            </h3>
            <p className="text-[11px] text-white/80 flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Conversational Assistant
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={restartChat}
          title="Restart Conversation"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-sm bg-gradient-to-b from-slate-950 to-slate-900/90">
        {/* Welcome Message */}
        <ChatBubble
          sender="bot"
          message={form.welcomeMessage || "Hello! Welcome to our form."}
          themeColor={form.themeColor}
        />

        {/* Answered Questions & Responses */}
        {questions.slice(0, currentStep).map((q, idx) => {
          const ans = answers.find((a) => a.questionId === q.id);
          return (
            <React.Fragment key={q.id}>
              <ChatBubble
                sender="bot"
                message={q.label}
                themeColor={form.themeColor}
              />
              {ans && (
                <ChatBubble
                  sender="user"
                  message={ans.value}
                  themeColor={form.themeColor}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* Current Active Question */}
        {!isCompleted && currentQuestion && !isTyping && (
          <div className="space-y-1">
            <ChatBubble
              sender="bot"
              message={
                currentQuestion.label +
                (currentQuestion.isRequired ? " *" : "")
              }
              themeColor={form.themeColor}
            />
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 max-w-[85%]">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-white text-xs"
              style={{ backgroundColor: form.themeColor || "#4F46E5" }}
            >
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl rounded-tl-xs bg-slate-900 border border-slate-800 px-4 py-3 flex items-center gap-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        {/* Completion Message */}
        {isCompleted && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3 animate-fadeIn">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
              style={{ backgroundColor: form.themeColor || "#4F46E5" }}
            >
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-100">
              Response Submitted!
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed px-4">
              {form.completionMessage ||
                "Thank you! Your response has been recorded."}
            </p>
            <button
              type="button"
              onClick={restartChat}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-all mt-2"
            >
              <RotateCcw className="w-3 h-3" />
              Submit another response
            </button>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center">
            {errorMsg}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Action Bar */}
      {!isCompleted && currentQuestion && !isTyping && (
        <div className="p-3 sm:p-4 border-t border-slate-800/90 bg-slate-950/90 backdrop-blur shrink-0">
          <QuestionInput
            question={currentQuestion}
            themeColor={form.themeColor}
            onSubmit={handleAnswerSubmit}
            isSubmitting={isSubmitting}
          />
          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="flex items-center gap-1">
              Powered by <span className="font-semibold text-slate-400">Chatbot Forms</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
