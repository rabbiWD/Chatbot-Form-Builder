import { notFound } from "next/navigation";
import Link from "next/link";
import { getFormById, getSubmissionsByFormId } from "@/lib/data-store";
import SubmissionsTable from "@/components/dashboard/SubmissionsTable";
import { ArrowLeft, MessageSquare, Edit3, Globe } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);
  return {
    title: form ? `${form.title} — Submissions | Chatbot Form Builder` : "Submissions",
  };
}

export default async function FormSubmissionsPage({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);

  if (!form) {
    notFound();
  }

  const submissions = await getSubmissionsByFormId(params.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/forms/${form.id}/edit`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Form Studio
            </Link>
            {form.isPublished && (
              <Link
                href={`/f/${form.id}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                Live Form URL
              </Link>
            )}
          </div>
        </div>

        {/* Header Title & Metric Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {form.title}
              </h1>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${
                  form.isPublished
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                }`}
              >
                {form.isPublished ? "Active" : "Draft"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {form.description || "Conversational responses collected for this form."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-center">
              <span className="block text-xl font-bold text-indigo-400">
                {submissions.length}
              </span>
              <span className="text-[11px] text-slate-400">
                Total Submissions
              </span>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-center">
              <span className="block text-xl font-bold text-slate-200">
                {form.questions.length}
              </span>
              <span className="text-[11px] text-slate-400">
                Form Questions
              </span>
            </div>
          </div>
        </div>

        {/* Submissions Table Component */}
        <SubmissionsTable form={form} submissions={submissions} />
      </div>
    </div>
  );
}
