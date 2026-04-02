"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const initialForm = {
  brandName: "",
  productType: "",
  boxSize: "",
  quantity: "",
  city: "",
  phone: "",
  email: "",
  message: "",
};

export function InquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          quantity: form.quantity ? Number(form.quantity) : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.errors?.join(" ") || result?.error || "Submission failed.");
      }

      setStatus({ type: "success", text: "Thanks! We will contact you within 24 hours." });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        text: error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "peer w-full rounded-2xl border border-zinc-200/80 bg-white/90 px-4 pb-2 pt-6 text-sm text-zinc-900 outline-none ring-[var(--primary)] transition duration-300 placeholder:text-transparent focus:border-[var(--accent)] focus:ring-2";

  return (
    <form onSubmit={onSubmit} className="soft-card space-y-5">
      <h3 className="text-xl font-semibold text-zinc-900">Get Quote in 24 Hours</h3>
      <p className="text-sm text-zinc-600">
        Share your requirement and receive a free digital mockup.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="relative">
          <input
            required
            placeholder="Brand Name*"
            className={inputClass}
            value={form.brandName}
            onChange={(event) => setForm({ ...form, brandName: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Brand Name*
          </span>
        </label>
        <label className="relative">
          <input
            required
            placeholder="Phone*"
            className={inputClass}
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Phone*
          </span>
        </label>
        <label className="relative">
          <input
            placeholder="Email"
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Email
          </span>
        </label>
        <label className="relative">
          <input
            placeholder="City"
            className={inputClass}
            value={form.city}
            onChange={(event) => setForm({ ...form, city: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            City
          </span>
        </label>
        <label className="relative md:col-span-2">
          <input
            placeholder="Product Type"
            className={inputClass}
            value={form.productType}
            onChange={(event) => setForm({ ...form, productType: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Product Type
          </span>
        </label>
        <label className="relative">
          <input
            placeholder="Box Size"
            className={inputClass}
            value={form.boxSize}
            onChange={(event) => setForm({ ...form, boxSize: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Box Size
          </span>
        </label>
        <label className="relative">
          <input
            placeholder="Quantity"
            type="number"
            min={1}
            className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
            value={form.quantity}
            onChange={(event) => setForm({ ...form, quantity: event.target.value })}
          />
          <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
            Quantity
          </span>
        </label>
      </div>

      <label className="relative block">
        <textarea
          placeholder="Message"
          className="peer min-h-28 w-full rounded-2xl border border-zinc-200/80 bg-white/90 px-4 pb-3 pt-7 text-sm text-zinc-900 outline-none ring-[var(--primary)] transition duration-300 placeholder:text-transparent focus:border-[var(--accent)] focus:ring-2"
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
        />
        <span className="pointer-events-none absolute left-4 top-2 text-xs text-zinc-500 transition peer-focus:text-[var(--primary)]">
          Message
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-5 py-3 font-medium text-white shadow-[0_10px_24px_rgba(77,106,86,0.25)] transition duration-300 hover:scale-[1.01] hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting...
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>

      {status && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={status.type === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}
        >
          {status.type === "success" ? "✓ " : ""}
          {status.text}
        </motion.p>
      )}
    </form>
  );
}
