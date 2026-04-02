import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { hasAdminSessionRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await hasAdminSessionRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectToDatabase();
    const deleted = await Inquiry.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry deleted." }, { status: 200 });
  } catch (error) {
    console.error("Inquiry delete error:", error);
    return NextResponse.json({ error: "Unable to delete inquiry." }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await hasAdminSessionRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, adminNotes } = body;

    await connectToDatabase();
    const updated = await Inquiry.findByIdAndUpdate(
      id,
      { $set: { status, adminNotes } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry updated.", inquiry: updated }, { status: 200 });
  } catch (error) {
    console.error("Inquiry update error:", error);
    return NextResponse.json({ error: "Unable to update inquiry." }, { status: 500 });
  }
}
