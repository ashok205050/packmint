import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Packmint India",
  description: "Learn how Packmint collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex-1 bg-[#fbf8f2]">
      <header className="border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div className="container-px flex h-16 items-center">
          <Link href="/" className="text-lg font-bold text-zinc-900 transition hover:text-[var(--primary)]">
            Packmint
          </Link>
        </div>
      </header>

      <main className="container-px py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Privacy Policy</h1>
          <p className="mt-4 text-zinc-600">Last Updated: April 2, 2026</p>

          <div className="mt-12 space-y-10 text-zinc-800 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">1. Information We Collect</h2>
              <p className="mt-4">
                When you use our inquiry form, we collect the following information:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2">
                <li>Brand Name</li>
                <li>Product Type and Packaging Requirements</li>
                <li>Contact Information (Phone Number and Email)</li>
                <li>City</li>
                <li>Any messages or attachments you provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">2. How We Use Your Information</h2>
              <p className="mt-4">
                We use the collected information primarily to:
              </p>
              <ul className="mt-4 list-inside list-disc space-y-2">
                <li>Provide you with accurate price quotes and mockups.</li>
                <li>Communicate with you regarding your inquiry.</li>
                <li>Improve our services and internal business operations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">3. Cookies and Tracking</h2>
              <p className="mt-4">
                We use cookies to enhance your experience. Furthermore, we use third-party services such as <strong>Google AdSense</strong> and <strong>Google Search Console</strong>. These services may use cookies to serve ads based on your previous visits to our website or other websites on the Internet.
              </p>
              <p className="mt-4">
                You can opt out of personalized advertising by visiting Google&apos;s <a href="https://www.google.com/settings/ads" className="text-blue-600 underline">Ads Settings</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">4. Data Security</h2>
              <p className="mt-4">
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">5. Contact Us</h2>
              <p className="mt-4">
                If you have any questions regarding this Privacy Policy, you may contact us using the information on our homepage.
              </p>
            </section>
          </div>
          
          <div className="mt-16">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-[var(--primary)] hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
