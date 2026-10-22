import { notFound } from "next/navigation";
import { getFormById } from "@/lib/data-store";
import ChatWidgetRunner from "@/components/widget/ChatWidgetRunner";
import { Lock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);
  return {
    title: form ? `Embed: ${form.title}` : "Embed Form",
  };
}

export default async function EmbedFormPage({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);

  if (!form) {
    notFound();
  }

  if (!form.isPublished) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 p-6 text-center text-slate-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 mb-3">
          <Lock className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-slate-200">
          Form Offline
        </p>
        <p className="text-xs text-slate-400 mt-1 max-w-xs">
          This form is currently not accepting new submissions.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col overflow-hidden">
      <ChatWidgetRunner form={form} isStandalone={false} />
    </div>
  );
}
