import Link from "next/link";
import Image from "next/image";
import { AnimateInView } from "@/components/AnimateInView";
import { StaggerGrid } from "@/components/StaggerGrid";
import { InquiryForm } from "@/components/InquiryForm";

export default function Home() {
  const reasons = [
    "Low MOQ (25 units)",
    "Free Technical Mockups",
    "On-Site Design Support",
    "Guaranteed Deadlines",
    "Nationwide Wholesale Shipping",
  ];

  const packagingTypes = [
    { name: "Custom Skincare Boxes (Low MOQ)", desc: "Premium folding cartons tailored to your product size — perfect for serums, creams, oils, and face washes. Designed to elevate shelf presence even in small batches.", image: "/images/hero-box.png" },
    { name: "Box Structure & Sizing Guidance", desc: "Not sure what size or structure fits your product? We help you choose the right box style — tuck-end, sleeve, drawer, or rigid — based on your product and budget.", image: "/images/supplier-process.png" },
    { name: "Luxury Print Finishes", desc: "Matte lamination, soft-touch coating, foil stamping, embossing, UV highlights — we help you choose finishes that match your brand identity.", image: "/images/supplier-finishes.png" },
    { name: "Packaging for Launch Kits & Gift Sets", desc: "Custom packaging solutions for skincare launch kits, PR boxes, and combo sets — built for Instagram-worthy unboxing experiences.", image: "/images/supplier-lifestyle.png" },
  ];
  const caseStudies = [
    { 
      brand: "Launch-Ready Packaging for First-Time Skincare Founders", 
      desc: "We helped emerging skincare brands move from product formulation to shelf-ready packaging with the right box size, premium finishes, and low MOQ production.", 
      image: "/images/hero-premium.png",
      includes: ["Box structure consultation", "Print-ready design setup", "Small-batch production support"]
    },
    { 
      brand: "From Concept to Courier", 
      desc: "End-to-end packaging guidance — from dieline setup and mockup creation to final production and delivery. Ideal for founders who don’t have in-house design or packaging knowledge.", 
      image: "/images/supplier-variety.png",
      includes: ["Free digital mockup", "Design adjustments", "Production coordination", "Delivery tracking"]
    },
    { 
      brand: "Luxury Packaging Upgrades", 
      desc: "For brands ready to elevate their packaging with foil stamping, embossing, soft-touch matte, or UV highlights — without large factory MOQs.", 
      image: "/images/supplier-finishes.png",
      includes: ["Finish recommendation", "Budget planning", "Small-batch luxury production"]
    },
  ];

  const process = [
    "Share product size",
    "Receive free mockup",
    "Approve design",
    "Print & delivery (7-10 days)",
  ];

  const faqs = [
    {
      question: "What is your minimum order quantity?",
      answer: "We start from just 25 boxes, ideal for early-stage skincare brands.",
    },
    {
      question: "Do you provide packaging design support?",
      answer: "Yes, design support and a free digital mockup are included in every project.",
    },
    {
      question: "How soon can I receive my packaging?",
      answer: "Typical turnaround is 7-10 days after final design approval.",
    },
  ];

  return (
    <div className="flex-1">
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-[var(--background)]/85 backdrop-blur">
        <div className="container-px flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-zinc-200/50 bg-white p-1 shadow-sm">
              <Image src="/logo.svg" alt="Packmint Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Packmint
            </span>
          </Link>
          <a
            href="#inquiry"
            className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-white shadow-sm transition duration-300 hover:scale-[1.03] hover:bg-[var(--primary-dark)] hover:shadow-md"
          >
            Get Free Digital Mockup
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f2] via-[#f8f5ef] to-transparent">
          <div className="container-px grid min-h-[70vh] items-center gap-10 py-12 lg:grid-cols-2 lg:min-h-[85vh] lg:py-24">
            <AnimateInView className="text-center lg:text-left">
              <p className="mb-5 inline-flex rounded-full border border-zinc-200 bg-white/90 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-600 md:text-xs">
                Packaging Partner for Skincare Startups
              </p>
              <h1 className="mx-auto max-w-xl text-3xl font-semibold leading-tight tracking-tight text-zinc-900 md:text-5xl lg:mx-0 lg:text-6xl">
                Launch Your Skincare Brand with Packaging That Feels Premium
              </h1>
              <p className="mt-6 mx-auto max-w-lg text-base text-zinc-700 md:text-lg lg:mx-0 lg:text-xl">
                We help small and growing skincare brands design, develop, and deliver custom packaging — starting from just 25 boxes.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start lg:gap-4">
                <a
                  href="#inquiry"
                  className="flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3.5 text-center font-medium text-white shadow-[0_10px_24px_rgba(77,106,86,0.25)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--primary-dark)] sm:w-auto"
                >
                  Get Free Digital Mockup
                </a>
                <a
                  href="#inquiry"
                  className="flex w-full items-center justify-center rounded-full border border-zinc-300 bg-white/90 px-7 py-3 font-medium text-zinc-800 transition duration-300 hover:scale-[1.03] hover:shadow-md sm:w-auto"
                >
                  Get Quote in 24 Hours
                </a>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.15}>
              <div className="relative h-[320px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-md md:h-[420px] lg:h-[500px]">
                <Image 
                  src="/images/hero-premium.png" 
                  alt="Premium skincare packaging mockup featuring luxury boxes and bottles" 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover transition duration-700 hover:scale-105"
                  priority
                  loading="eager"
                />
                <div className="absolute -z-10 left-10 top-10 h-52 w-52 rounded-full bg-[var(--accent)]/65 blur-3xl" />
                <div className="absolute -z-10 bottom-4 right-10 h-52 w-52 rounded-full bg-[#d8e4d3] blur-3xl" />
              </div>
            </AnimateInView>
          </div>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">Why Choose Us</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-3 grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-5">
            {reasons.map((item) => (
              <div key={item} className="soft-card flex items-center justify-center p-4 text-center text-xs font-medium text-zinc-800 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:text-sm lg:p-6">
                {item}
              </div>
            ))}
          </StaggerGrid>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">Packaging Types</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {packagingTypes.map((item) => (
              <article key={item.name} className="group overflow-hidden rounded-2xl border border-zinc-200/70 bg-[var(--surface)] shadow-[0_12px_40px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative h-44 overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                    className="object-cover transition duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-semibold text-zinc-900">{item.name}</h3>
                  <p className="text-sm text-zinc-600">{item.desc}</p>
                </div>
              </article>
            ))}
          </StaggerGrid>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">How It Works</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-4 lg:mt-12">
            {process.map((step, index) => (
              <div key={step} className="soft-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
                  Step {index + 1}
                </p>
                <p className="font-medium text-zinc-800">{step}</p>
              </div>
            ))}
          </StaggerGrid>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">Timeline</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-3 grid-cols-1 sm:grid-cols-3 lg:mt-12 lg:gap-4">
            <div className="soft-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"><p className="font-medium text-zinc-800 text-sm md:text-base">Design: 24-48 hrs</p></div>
            <div className="soft-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"><p className="font-medium text-zinc-800 text-sm md:text-base">Production: 5-7 working days</p></div>
            <div className="soft-card transition duration-300 hover:-translate-y-1 hover:shadow-xl"><p className="font-medium text-zinc-800 text-sm md:text-base">Shipping: 3-5 days</p></div>
          </StaggerGrid>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">Our Work</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <article key={item.brand} className="group overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-[0_12px_34px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative h-48 md:h-56">
                  <Image 
                    src={item.image} 
                    alt={`${item.brand} case study mockup`} 
                    fill 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover transition duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="space-y-4 p-5">
                  <h3 className="text-xl font-semibold leading-tight text-zinc-900">{item.brand}</h3>
                  <p className="text-sm text-zinc-600">{item.desc}</p>
                  {item.includes && (
                    <ul className="mt-4 space-y-2">
                      {item.includes.map((include) => (
                        <li key={include} className="flex items-center text-xs text-zinc-500">
                          <span className="mr-2 h-1 w-1 rounded-full bg-[var(--primary)]" />
                          {include}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </StaggerGrid>
        </section>

        <section className="container-px py-16 lg:py-24 bg-[#f9f9f7]/50">
          <AnimateInView>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="section-title px-4">Built for First-Time Skincare Founders</h2>
              <p className="mt-4 px-4 text-sm text-zinc-600 md:text-lg">Many small skincare brands struggle with:</p>
              
              <StaggerGrid className="mt-10 grid gap-4 grid-cols-1 px-4 sm:grid-cols-2 lg:gap-6">
                {[
                  "High minimum order quantities",
                  "Confusing box sizes",
                  "Expensive design revisions",
                  "Slow supplier communication"
                ].map((struggle) => (
                  <div key={struggle} className="flex items-center rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
                    <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <span className="font-medium text-zinc-800">{struggle}</span>
                  </div>
                ))}
              </StaggerGrid>
              
              <div className="mt-12 lg:mt-16">
                <p className="px-4 text-xl font-semibold text-zinc-900 italic md:text-2xl">&ldquo;We exist to simplify that.&rdquo;</p>
                <div className="mt-6 h-1 w-20 mx-auto rounded-full bg-[var(--primary)] md:mt-8 md:w-24" />
              </div>
            </div>
          </AnimateInView>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/70 bg-gradient-to-br from-[#fbf8f2] to-[#f8f5ef] p-10 md:p-20 text-center">
              <div className="relative z-10 mx-auto max-w-3xl">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-5xl">
                  Packaging Support Built for Growing Skincare Brands
                </h2>
                <p className="mt-4 text-base text-zinc-700 md:mt-6 md:text-xl">
                  We help small and emerging skincare brands design, plan, and produce premium packaging — without factory-level minimums.
                </p>
                <div className="mt-8 md:mt-10">
                  <a
                    href="#inquiry"
                    className="inline-flex w-full items-center justify-center rounded-full bg-[var(--primary)] px-8 py-4 font-medium text-white shadow-[0_10px_24px_rgba(77,106,86,0.2)] transition duration-300 hover:scale-[1.02] hover:bg-[var(--primary-dark)] sm:w-auto"
                  >
                    Start Your Project
                  </a>
                </div>
              </div>
              <div className="absolute inset-0 -z-0 opacity-[0.03] mix-blend-multiply">
                <Image 
                  src="/images/supplier-lifestyle.png" 
                  alt="Premium skincare packaging backdrop" 
                  fill 
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover" 
                />
              </div>
            </div>
          </AnimateInView>
        </section>

        <section className="container-px py-16 lg:py-24">
          <AnimateInView>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </AnimateInView>
          <StaggerGrid className="mt-8 grid gap-4 lg:mt-12">
            {faqs.map((faq) => (
              <article key={faq.question} className="soft-card transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <h3 className="text-lg font-medium text-zinc-900">{faq.question}</h3>
                <p className="mt-2 text-zinc-700">{faq.answer}</p>
              </article>
            ))}
          </StaggerGrid>
        </section>

        <section id="inquiry" className="container-px py-20 pb-24">
          <AnimateInView className="mb-8 max-w-2xl">
            <h2 className="section-title">Let&apos;s Build Your Packaging</h2>
            <p className="mt-2 text-zinc-700">
              Share your packaging requirement and our team will get back within 24 hours.
            </p>
          </AnimateInView>
          <InquiryForm />
        </section>
      </main>

      <footer className="border-t border-zinc-200/70 py-16">
        <div className="container-px">
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white p-1.5 shadow-sm">
              <Image src="/logo.svg" alt="Packmint Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">
              Packmint
            </span>
            <p className="max-w-xs text-center text-sm text-zinc-500">
              Your low MOQ custom packaging partner for skincare and luxury brands.
            </p>
          </div>
          <div className="text-center text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} Packmint India — All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
