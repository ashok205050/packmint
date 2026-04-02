import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Packmint India",
  description: "Terms and conditions for using Packmint packaging services.",
};

export default function TermsConditions() {
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
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Terms & Conditions</h1>
          <p className="mt-4 text-zinc-600">Last Updated: April 2, 2026</p>

          <div className="mt-12 space-y-10 text-zinc-800 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">1. Service Overview</h2>
              <p className="mt-4">
                Packmint provides custom packaging design and manufacturing services. By submitting an inquiry, you agree to provide accurate details regarding your brand and requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">2. Mockups and Approvals</h2>
              <p className="mt-4">
                Digital mockups are provided for visualization purposes. Final production begins only after your explicit approval of the design and specifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">3. Minimum Order Quantity (MOQ)</h2>
              <p className="mt-4">
                Our standard MOQ starts at 25 units. Prices may vary significantly depending on the quantity ordered and the complexity of the design.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">4. Delivery Timelines</h2>
              <p className="mt-4">
                Typical production time is 7-10 working days after design approval. Shipping times vary by location. Packmint is not responsible for delays caused by third-party logistics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900">5. Limitation of Liability</h2>
              <p className="mt-4">
                Packmint shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services or products.
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
