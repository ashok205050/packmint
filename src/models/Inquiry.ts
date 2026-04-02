import mongoose, { Model, Schema } from "mongoose";

export interface IInquiry {
  brandName: string;
  productType?: string;
  boxSize?: string;
  quantity?: number;
  city?: string;
  phone: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "resolved";
  adminNotes?: string;
  createdAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    brandName: { type: String, required: true, trim: true },
    productType: { type: String, trim: true },
    boxSize: { type: String, trim: true },
    quantity: { type: Number, min: 1 },
    city: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ["new", "contacted", "resolved"], default: "new" },
    adminNotes: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", inquirySchema);
