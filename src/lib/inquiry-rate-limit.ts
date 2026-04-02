import mongoose, { Model, Schema } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 3;

interface IInquiryRateLimit {
  key: string;
  count: number;
  windowStart: Date;
  updatedAt: Date;
}

const inquiryRateLimitSchema = new Schema<IInquiryRateLimit>(
  {
    key: { type: String, required: true, unique: true, index: true },
    count: { type: Number, required: true, default: 0 },
    windowStart: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

inquiryRateLimitSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });

const InquiryRateLimit: Model<IInquiryRateLimit> =
  mongoose.models.InquiryRateLimit ||
  mongoose.model<IInquiryRateLimit>("InquiryRateLimit", inquiryRateLimitSchema);

export function getInquiryClientKey(ip: string) {
  return `inquiry-limit:${ip || "unknown"}`;
}

export async function isRateLimited(key: string) {
  await connectToDatabase();
  const now = Date.now();
  const record = await InquiryRateLimit.findOne({ key });

  if (!record) return false;

  const windowStartMs = new Date(record.windowStart).getTime();
  if (now - windowStartMs > WINDOW_MS) {
    // Reset window
    record.count = 0;
    record.windowStart = new Date(now);
    await record.save();
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

export async function incrementInquiryCount(key: string) {
  await connectToDatabase();
  const now = new Date();
  const record = await InquiryRateLimit.findOne({ key });

  if (!record) {
    await InquiryRateLimit.create({
      key,
      count: 1,
      windowStart: now,
      updatedAt: now,
    });
    return;
  }

  const windowStartMs = new Date(record.windowStart).getTime();
  const inWindow = Date.now() - windowStartMs <= WINDOW_MS;

  if (inWindow) {
    record.count += 1;
  } else {
    record.count = 1;
    record.windowStart = now;
  }

  record.updatedAt = now;
  await record.save();
}
