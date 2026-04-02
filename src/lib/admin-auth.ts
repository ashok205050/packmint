import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export const ADMIN_COOKIE_NAME = "packmint_admin";
const ADMIN_SESSION_ISSUER = "packmint-admin";
const ADMIN_SESSION_AUDIENCE = "packmint-dashboard";
const ADMIN_SESSION_TTL = "8h";

export function isValidAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

function getJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("Please define ADMIN_JWT_SECRET in environment variables.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAdminSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(ADMIN_SESSION_ISSUER)
    .setAudience(ADMIN_SESSION_AUDIENCE)
    .setExpirationTime(ADMIN_SESSION_TTL)
    .sign(getJwtSecret());
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, getJwtSecret(), {
      issuer: ADMIN_SESSION_ISSUER,
      audience: ADMIN_SESSION_AUDIENCE,
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function hasAdminSessionRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function hasAdminSessionServer() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}
