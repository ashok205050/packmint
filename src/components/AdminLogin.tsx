"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Authentication failed.");
      }

      window.location.reload();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="container-px py-20">
      <div className="mx-auto max-w-md soft-card">
        <div className="mb-8 flex flex-col items-center">
          <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white p-2 shadow-sm">
            <Image src="/logo.svg" alt="Packmint Logo" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900">Admin Login</h1>
          <p className="mt-2 text-sm text-zinc-600">Enter the admin password to view inquiries.</p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            type="password"
            required
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none ring-[var(--primary)] transition focus:ring-2"
            placeholder="Admin Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-5 py-3 font-medium text-white transition hover:bg-[var(--primary-dark)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Authenticating..." : "Unlock Admin"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  );
}
