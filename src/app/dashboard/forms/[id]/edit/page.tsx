import { notFound } from "next/navigation";
import { getFormById } from "@/lib/data-store";
import FormBuilder from "@/components/builder/FormBuilder";

export const metadata = {
  title: "Edit Form Studio | Chatbot Form Builder",
};

export default async function EditFormPage({
  params,
}: {
  params: { id: string };
}) {
  const form = await getFormById(params.id);

  if (!form) {
    notFound();
  }

  return <FormBuilder initialForm={form} />;
}
