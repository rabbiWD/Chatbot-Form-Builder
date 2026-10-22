import { notFound } from "next/navigation";
import { getFormById } from "@/lib/data-store";
import ChatWidgetRunner from "@/components/widget/ChatWidgetRunner";
import { AlertCircle, Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);
  return {
    title: form ? `${form.title} | Chatbot Form` : "Form Not Found",
    description: form?.description || "Conversational form powered by Chatbot Form Builder",
  };
}

export default async function PublicFormPage({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);

  if (!form) {
    notFound();
  }

  // Unpublished state
  if (!form.isPublished) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Form Currently Offline
          </h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            This conversational form is currently in draft mode and not accepting responses at this time. Please check back later or contact the form creator.
          </p>
          <div className="text-xs text-slate-600 font-mono">
            Form ID: {form.id}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ backgroundColor: form.themeColor || "#4F46E5" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: form.themeColor || "#4F46E5" }}
      />

      <div className="relative z-10 w-full max-w-lg">
        <ChatWidgetRunner form={form} isStandalone={true} />
      </div>
    </main>
  );
}
