import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { JsonLd } from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://packmint.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Packmint | Premium Custom Packaging & Box Manufacturer (Low MOQ 25)",
    template: "%s | Packmint India",
  },
  description:
    "Order custom printed boxes, rigid boxes, and luxury packaging in India. Low MCQ of 25 units, 7-day fast delivery, and free digital mockups for skincare and beauty brands.",
  keywords: [
    "custom packaging boxes india",
    "skincare packaging manufacturer",
    "low moq custom boxes",
    "luxury rigid box printing delhi",
    "custom cosmetic packaging wholesale",
    "printed corrugated boxes",
    "premium product boxes",
  ],
  authors: [{ name: "Packmint Team" }],
  creator: "Packmint India",
  publisher: "Packmint Packaging",
  openGraph: {
    title: "Packmint | Custom Packaging & Box Manufacturer (Low MOQ 25)",
    description:
      "Scale your skincare brand with premium custom packaging. Low MCQ (25 units), free digital mockups, and fast 7-day delivery nationwide.",
    url: siteUrl,
    siteName: "Packmint India",
    images: [
      {
        url: "/images/hero-premium.png",
        width: 1200,
        height: 630,
        alt: "Packmint Premium Custom Packaging Mockup",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Packmint | Premium Custom Packaging Partner",
    description: "High-quality custom boxes with low MOQ of 25 units for skincare brands in India.",
    images: ["/images/hero-premium.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: "google92f45fb3cda47413",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2407696172070218"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
