"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Inquiry = {
  _id: string;
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
  createdAt: string;
};

export function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/inquiry", { cache: "no-store" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Unable to load inquiries.");
      }

      setInquiries(result.inquiries || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const onUpdate = async (id: string, updates: Partial<Inquiry>) => {
    setBusyId(id);
    setError("");
    try {
      const response = await fetch(`/api/inquiry/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Update failed.");
      }
      setInquiries((prev) =>
        prev.map((entry) => (entry._id === id ? { ...entry, ...updates } : entry))
      );
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setBusyId(id);
    setError("");
    try {
      const response = await fetch(`/api/inquiry/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || "Delete failed.");
      }
      setInquiries((prev) => prev.filter((entry) => entry._id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Something went wrong.");
    } finally {
      setBusyId(null);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const getStatusColor = (status: Inquiry["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "contacted":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200";
    }
  };

  return (
    <section className="container-px py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-zinc-200/50 bg-white p-1.5 shadow-sm">
            <Image src="/logo.svg" alt="Packmint Logo" fill className="object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Packmint Inquiries</h1>
            <p className="text-sm text-zinc-600">Sorted by newest first.</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100"
        >
          Logout
        </button>
      </div>

      {error && <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {isLoading ? (
        <p className="text-zinc-600">Loading inquiries...</p>
      ) : inquiries.length === 0 ? (
        <div className="soft-card text-zinc-600">No inquiries yet.</div>
      ) : (
        <div className="grid gap-6">
          {inquiries.map((item) => (
            <article key={item._id} className="soft-card relative overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  item.status === "new"
                    ? "bg-blue-500"
                    : item.status === "contacted"
                    ? "bg-amber-500"
                    : "bg-green-500"
                }`}
              />
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-zinc-900">{item.brandName}</h2>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-zinc-500">
                    {new Date(item.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <button
                    onClick={() => onDelete(item._id)}
                    disabled={busyId === item._id}
                    className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm text-zinc-700">
                    <p>
                      <strong>Phone:</strong> {item.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email || "-"}
                    </p>
                    <p>
                      <strong>Product:</strong> {item.productType || "-"}
                    </p>
                    <p>
                      <strong>Box Size:</strong> {item.boxSize || "-"}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {item.quantity || "-"}
                    </p>
                    <p>
                      <strong>City:</strong> {item.city || "-"}
                    </p>
                  </div>
                  {item.message && (
                    <div className="rounded-xl bg-zinc-50 p-3 text-sm text-zinc-700">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Message
                      </p>
                      {item.message}
                    </div>
                  )}
                </div>

                <div className="space-y-4 border-t border-zinc-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Update Status
                    </label>
                    <select
                      className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--primary)]"
                      value={item.status}
                      disabled={busyId === item._id}
                      onChange={(e) =>
                        onUpdate(item._id, { status: e.target.value as Inquiry["status"] })
                      }
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      Internal Notes
                    </label>
                    <textarea
                      placeholder="Add private notes here..."
                      className="min-h-[80px] w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-[var(--primary)]"
                      defaultValue={item.adminNotes}
                      disabled={busyId === item._id}
                      onBlur={(e) => onUpdate(item._id, { adminNotes: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
