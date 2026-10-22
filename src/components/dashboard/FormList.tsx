"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Form } from "@/types/form";
import EmbedShareModal from "@/components/modals/EmbedShareModal";
import {
  Edit3,
  MessageSquare,
  Globe,
  Share2,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  HelpCircle,
  MoreVertical,
} from "lucide-react";

interface FormListProps {
  initialForms: Form[];
}

export default function FormList({ initialForms }: FormListProps) {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>(initialForms);
  const [selectedShareForm, setSelectedShareForm] = useState<Form | null>(null);
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  // Toggle publish / unpublish
  const handleTogglePublish = async (form: Form) => {
    const newStatus = !form.isPublished;
    setIsUpdatingId(form.id);

    // Optimistic update
    setForms((prev) =>
      prev.map((f) => (f.id === form.id ? { ...f, isPublished: newStatus } : f))
    );

    try {
      const res = await fetch(`/api/forms/${form.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");
      router.refresh();
    } catch (err: any) {
      alert("Failed to update status: " + err.message);
      // Revert on failure
      setForms((prev) =>
        prev.map((f) => (f.id === form.id ? { ...f, isPublished: form.isPublished } : f))
      );
    } finally {
      setIsUpdatingId(null);
    }
  };

  // Delete form
  const handleDelete = async (form: Form) => {
    if (
      !confirm(
        `Are you sure you want to delete "${form.title}"? All submitted responses will be permanently removed.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/forms/${form.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete form");

      setForms((prev) => prev.filter((f) => f.id !== form.id));
      router.refresh();
    } catch (err: any) {
      alert("Failed to delete form: " + err.message);
    }
  };

  if (forms.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">
        <Sparkles className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
        <h4 className="text-base font-semibold text-slate-200">
          No forms created yet
        </h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Get started by creating your first interactive chatbot form to embed or share.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {forms.map((form) => {
          const submissionCount = form._count?.submissions || 0;
          const questionCount = form.questions?.length || 0;

          return (
            <div
              key={form.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl backdrop-blur transition-all duration-200 hover:border-slate-700 hover:shadow-indigo-500/5"
            >
              {/* Color Stripe Top Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                style={{ backgroundColor: form.themeColor || "#4F46E5" }}
              />

              {/* Form Info */}
              <div>
                <div className="flex items-center justify-between gap-2 mt-1 mb-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      form.isPublished
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {form.isPublished ? "Published" : "Draft"}
                  </span>

                  {/* Publish Switch */}
                  <label
                    title={form.isPublished ? "Unpublish Form" : "Publish Form"}
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <input
                      type="checkbox"
                      checked={form.isPublished}
                      disabled={isUpdatingId === form.id}
                      onChange={() => handleTogglePublish(form)}
                      className="peer sr-only"
                    />
                    <div className="h-4 w-8 rounded-full bg-slate-800 after:absolute after:top-[2px] after:left-[2px] after:h-3 after:w-3 after:rounded-full after:bg-slate-400 after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-4 peer-checked:after:bg-white"></div>
                  </label>
                </div>

                <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {form.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 h-8">
                  {form.description || "No description provided."}
                </p>

                {/* Badges Info */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-slate-400">
                  <Link
                    href={`/dashboard/forms/${form.id}/submissions`}
                    className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 hover:border-indigo-500/50 hover:text-indigo-300 transition-all font-medium"
                  >
                    <MessageSquare className="w-3 h-3 text-emerald-400" />
                    <span>{submissionCount} Responses</span>
                  </Link>

                  <span className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1">
                    <HelpCircle className="w-3 h-3 text-indigo-400" />
                    <span>{questionCount} Questions</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3">
                <div className="flex items-center gap-1.5">
                  <Link
                    href={`/dashboard/forms/${form.id}/edit`}
                    className="inline-flex items-center gap-1 rounded-lg bg-indigo-600/15 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSelectedShareForm(form)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                    title="Get embed code or direct link"
                  >
                    <Share2 className="w-3 h-3 text-cyan-400" />
                    Share
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  {form.isPublished && (
                    <Link
                      href={`/f/${form.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-indigo-400 transition-all"
                      title="Open Live Public Form"
                    >
                      <Globe className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(form)}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                    title="Delete Form"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Share & Embed Modal */}
      {selectedShareForm && (
        <EmbedShareModal
          form={selectedShareForm}
          isOpen={Boolean(selectedShareForm)}
          onClose={() => setSelectedShareForm(null)}
        />
      )}
    </div>
  );
}
