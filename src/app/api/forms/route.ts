import { NextRequest, NextResponse } from "next/server";
import { getForms, createForm } from "@/lib/data-store";

export async function GET() {
  try {
    const forms = await getForms();
    return NextResponse.json({ forms });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, welcomeMessage, completionMessage, themeColor } = body;

    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: "Form title is required." },
        { status: 400 }
      );
    }

    const created = await createForm({
      title: title.trim(),
      description,
      welcomeMessage,
      completionMessage,
      themeColor,
    });

    return NextResponse.json({ success: true, form: created });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
