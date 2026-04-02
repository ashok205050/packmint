import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://packmint.in";

export const metadata: Metadata = {
  title: "Packmint | B2B Custom Packaging Partner (Low MOQ 25 Units)",
  description:
    "India's leading custom packaging manufacturer for skincare and luxury brands. Get high-quality printed boxes, rigid boxes, and tubes with low MOQ of 25 units. Free mockup and 7-day delivery.",
  keywords: ["custom packaging india", "skincare packaging manufacturer", "low moq boxes", "luxury box printing", "wholesale packaging suppliers"],
  openGraph: {
    title: "Packmint | Premium B2B Custom Packaging (India)",
    description:
      "Scale your brand with premium custom packaging. We offer low MOQ (25 units), free technical mockups, and fast nationwide delivery for skincare and luxury brands.",
    url: siteUrl,
    siteName: "Packmint India",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Packmint Custom Packaging Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packmint | B2B Custom Packaging Partner",
    description: "Premium custom packaging with low MOQ of 25 units for skincare brands.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
