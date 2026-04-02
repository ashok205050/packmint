import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  isValidAdminPassword,
} from "@/lib/admin-auth";
import {
  clearFailedAttempts,
  getClientKey,
  isBlockedByRateLimit,
  registerFailedAttempt,
} from "@/lib/admin-rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for") || "";
    const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
    const clientKey = getClientKey(ip);

    const blockedStatus = await isBlockedByRateLimit(clientKey);
    if (blockedStatus.blocked) {
      return NextResponse.json(
        {
          error: "Too many failed attempts. Please try again later.",
          retryAfterSeconds: blockedStatus.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { "Retry-After": String(blockedStatus.retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();
    const password = String(body?.password ?? "");

    if (!isValidAdminPassword(password)) {
      await registerFailedAttempt(clientKey);
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    await clearFailedAttempts(clientKey);

    const token = await createAdminSessionToken();
    const response = NextResponse.json({ message: "Authenticated." }, { status: 200 });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Unable to login." }, { status: 500 });
  }
}
