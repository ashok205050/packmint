import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";
import { sendInquiryNotification } from "@/lib/email";
import { validateInquiry } from "@/lib/validation";
import { hasAdminSessionRequest } from "@/lib/admin-auth";

import { getInquiryClientKey, incrementInquiryCount, isRateLimited } from "@/lib/inquiry-rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
    const clientKey = getInquiryClientKey(ip);

    if (await isRateLimited(clientKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { errors, data } = validateInquiry(body);

    if (errors.length) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await connectToDatabase();
    const inquiry = await Inquiry.create(data);

    await incrementInquiryCount(clientKey);

    try {
      await sendInquiryNotification(inquiry);
    } catch (emailError) {
      console.error("Failed to send inquiry email:", emailError);
    }

    return NextResponse.json({ message: "Inquiry submitted successfully." }, { status: 201 });
  } catch (error) {
    console.error("Inquiry create error:", error);
    return NextResponse.json({ error: "Unable to submit inquiry." }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!(await hasAdminSessionRequest(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    console.error("Inquiry list error:", error);
    return NextResponse.json({ error: "Unable to load inquiries." }, { status: 500 });
  }
}
