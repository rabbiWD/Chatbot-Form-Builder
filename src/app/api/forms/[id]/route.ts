import { NextRequest, NextResponse } from "next/server";
import { getFormById, updateForm, deleteForm } from "@/lib/data-store";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const form = await getFormById(params.id);
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json({ form });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await updateForm(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json({ form: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await deleteForm(params.id);
    if (!success) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
