import mongoose, { Model, Schema } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 30 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface IAdminLoginAttempt {
  key: string;
  count: number;
  windowStart: Date;
  blockedUntil?: Date;
  updatedAt: Date;
}

const adminLoginAttemptSchema = new Schema<IAdminLoginAttempt>(
  {
    key: { type: String, required: true, unique: true, index: true },
    count: { type: Number, required: true, default: 0 },
    windowStart: { type: Date, required: true, default: Date.now },
    blockedUntil: { type: Date },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

adminLoginAttemptSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

const AdminLoginAttempt: Model<IAdminLoginAttempt> =
  mongoose.models.AdminLoginAttempt ||
  mongoose.model<IAdminLoginAttempt>("AdminLoginAttempt", adminLoginAttemptSchema);

export function getClientKey(ip: string) {
  return `admin-login:${ip || "unknown"}`;
}

export async function isBlockedByRateLimit(key: string) {
  await connectToDatabase();
  const attempt = await AdminLoginAttempt.findOne({ key }).lean();
  if (!attempt?.blockedUntil) {
    return { blocked: false as const, retryAfterSeconds: 0 };
  }

  const retryMs = new Date(attempt.blockedUntil).getTime() - Date.now();
  if (retryMs <= 0) {
    return { blocked: false as const, retryAfterSeconds: 0 };
  }

  return { blocked: true as const, retryAfterSeconds: Math.ceil(retryMs / 1000) };
}

export async function registerFailedAttempt(key: string) {
  await connectToDatabase();
  const now = new Date();
  const current = await AdminLoginAttempt.findOne({ key });

  if (!current) {
    await AdminLoginAttempt.create({
      key,
      count: 1,
      windowStart: now,
      updatedAt: now,
    });
    return;
  }

  const windowStartMs = new Date(current.windowStart).getTime();
  const inCurrentWindow = Date.now() - windowStartMs <= WINDOW_MS;

  const nextCount = inCurrentWindow ? current.count + 1 : 1;
  current.count = nextCount;
  current.windowStart = inCurrentWindow ? current.windowStart : now;
  current.updatedAt = now;

  if (nextCount >= MAX_ATTEMPTS) {
    current.blockedUntil = new Date(Date.now() + BLOCK_MS);
  }

  await current.save();
}

export async function clearFailedAttempts(key: string) {
  await connectToDatabase();
  await AdminLoginAttempt.deleteOne({ key });
}
