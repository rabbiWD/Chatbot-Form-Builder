import { NextRequest, NextResponse } from "next/server";
import { getFormById, saveSubmission } from "@/lib/data-store";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await getFormById(params.id);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (!form.isPublished) {
      return NextResponse.json(
        { error: "This form is currently not accepting responses." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { answers, metadata } = body;

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json(
        { error: "Invalid submission: answers array is required." },
        { status: 400 }
      );
    }

    // Validate required questions
    for (const q of form.questions) {
      if (q.isRequired) {
        const found = answers.find((a: any) => a.questionId === q.id);
        if (!found || !String(found.value).trim()) {
          return NextResponse.json(
            { error: `Missing required question answer: "${q.label}"` },
            { status: 400 }
          );
        }
      }
    }

    const saved = await saveSubmission(params.id, {
      answers,
      metadata,
    });

    return NextResponse.json({ success: true, submission: saved });
  } catch (err: any) {
    console.error("Submission API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
