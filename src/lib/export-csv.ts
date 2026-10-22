import { Form, Submission } from "@/types/form";

export function exportSubmissionsToCsv(form: Form, submissions: Submission[]) {
  if (!submissions || submissions.length === 0) {
    alert("No submissions available to export.");
    return;
  }

  // Header row: Submission ID, Submitted At, Metadata, [Question 1 Label], [Question 2 Label]...
  const headers = [
    "Submission ID",
    "Submitted At",
    "Device / Metadata",
    ...form.questions.map((q) => `"${q.label.replace(/"/g, '""')}"`),
  ];

  const rows = submissions.map((sub) => {
    const questionValues = form.questions.map((q) => {
      const match = sub.answers.find((a) => a.questionId === q.id);
      const val = match ? String(match.value).replace(/"/g, '""') : "";
      return `"${val}"`;
    });

    const metaVal = sub.metadata ? `"${String(sub.metadata).replace(/"/g, '""')}"` : '""';

    return [
      `"${sub.id}"`,
      `"${new Date(sub.submittedAt).toLocaleString()}"`,
      metaVal,
      ...questionValues,
    ].join(",");
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `${form.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-submissions.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
