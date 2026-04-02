import nodemailer from "nodemailer";
import type { IInquiry } from "@/models/Inquiry";

export async function sendInquiryNotification(inquiry: IInquiry) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!host || !port || !user || !pass || !adminEmail) {
    console.warn("Email configuration missing. Skipping notification.", { host, port, user, adminEmail });
    return;
  }

  console.log(`Sending inquiry notification for brand: ${inquiry.brandName} to ${adminEmail}`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Packmint Website" <${user}>`,
    to: adminEmail,
    subject: `New Inquiry from ${inquiry.brandName}`,
    text: [
      `Brand: ${inquiry.brandName}`,
      `Phone: ${inquiry.phone}`,
      `Email: ${inquiry.email ?? "-"}`,
      `Product Type: ${inquiry.productType ?? "-"}`,
      `Box Size: ${inquiry.boxSize ?? "-"}`,
      `Quantity: ${inquiry.quantity ?? "-"}`,
      `City: ${inquiry.city ?? "-"}`,
      "",
      `Message: ${inquiry.message ?? "-"}`,
    ].join("\n"),
  });
}
