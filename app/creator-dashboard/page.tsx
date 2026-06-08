"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

interface CreatorData {
  id: string;
  profile_id: string;
  category: string;
  starting_price: number;
  avg_rating: number | null;
  review_count: number;
  full_name: string | null;
  city: string | null;
}

interface BookingRequest {
  id: string;
  occasion_type: string | null;
  event_date: string;
  location: string | null;
  budget: string | null;
  note: string | null;
  requester_phone: string;
  status: "pending" | "accepted" | "declined" | "paid" | "expired";
  agreed_price: number | null;
  advance_percent: number | null;
  created_at: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  pending:  { bg: "#FFF8E1", color: "#F57F17", label: "Pending" },
  accepted: { bg: "#FFF3E0", color: "#E65100", label: "Accepted – Awaiting Payment" },
  paid:     { bg: "#E8F5E9", color: "#2E7D32", label: "Confirmed" },
  declined: { bg: "#FFEBEE", color: "#C62828", label: "Declined" },
  expired:  { bg: "#F5F5F5", color: "#757575", label: "Expired" },
};

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Price Modal ───────────────────────────────────────────────
function PriceModal({ request, onClose, onSubmit }: {
  request: BookingRequest;
  onClose: () => void;
  onSubmit: (id: string, price: number, advancePct: number) => void;
}) {
  const [price, setPrice] = useState("");
  const [advancePct, setAdvancePct] = useState("50");
  const [saving, setSaving] = useState(false);

  const parsed    = parseFloat(price);
  const valid     = !isNaN(parsed) && parsed > 0;
  const advance   = valid ? Math.round((parsed * Number(advancePct)) / 100) : 0;
  const remaining = valid ? parsed - advance : 0;

  async function submit() {
    if (!valid) return;
    setSaving(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking-requests/${request.id}/accept/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agreed_price: parsed, advance_percent: Number(advancePct) }),
      });
      onSubmit(request.id, parsed, Number(advancePct));
      onClose();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(28,20,16,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ background: "#fff", borderRadius: "18px", width: "100%", maxWidth: "380px", padding: "1.75rem", boxShadow: "0 20px 60px rgba(28,20,16,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 800, color: "#1C1410", margin: 0 }}>
            {request.occasion_type ?? "Event"} · {fmtDate(request.event_date)}
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#9B7B60" }}>✕</button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", marginBottom: "0.3rem" }}>Total Price (₹)</label>
          <input
            type="number" min="0" placeholder="e.g. 15000" value={price}
            onChange={e => setPrice(e.target.value)}
            style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid #E8DED0", borderRadius: "9px", fontSize: "1rem", fontWeight: 700, color: "#1C1410", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", marginBottom: "0.3rem" }}>Advance %</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["30", "40", "50", "60"].map(p => (
              <button key={p} onClick={() => setAdvancePct(p)} style={{ flex: 1, padding: "0.5rem", border: `1.5px solid ${advancePct === p ? "#C4703A" : "#E8DED0"}`, borderRadius: "8px", fontSize: "0.82rem", fontWeight: 700, background: advancePct === p ? "#FDF2E9" : "transparent", color: advancePct === p ? "#C4703A" : "#9B7B60", cursor: "pointer" }}>{p}%</button>
            ))}
          </div>
        </div>

        {valid && (
          <div style={{ background: "#F5EFE7", borderRadius: "10px", padding: "0.875rem 1rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#9B7B60" }}>Client pays now</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#C4703A" }}>{fmt(advance)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", color: "#9B7B60" }}>Remaining on day</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1C1410" }}>{fmt(remaining)}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "0.7rem", border: "1.5px solid #E8DED0", borderRadius: "9px", background: "transparent", color: "#9B7B60", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={submit} disabled={!valid || saving} style={{ flex: 2, padding: "0.7rem", border: "none", borderRadius: "9px", background: valid ? "#C4703A" : "#E8DED0", color: valid ? "#FAF7F2" : "#9B7B60", fontSize: "0.875rem", fontWeight: 700, cursor: valid ? "pointer" : "not-allowed" }}>
            {saving ? "Saving…" : "Confirm & Accept →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────
export default function CreatorDashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab]             = useState("overview");
  const [creator, setCreator]                 = useState<CreatorData | null>(null);
  const [requests, setRequests]               = useState<BookingRequest[]>([]);
  const [loading, setLoading]                 = useState(true);
  const [pricingReq, setPricingReq]           = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      setLoading(true);
      const supabase = createClient();

      const { data: creatorRow } = await supabase
        .from("creators")
        .select("id, profile_id, category, starting_price, avg_rating, review_count")
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (creatorRow) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, city")
          .eq("id", user!.id)
          .maybeSingle();

        setCreator({ ...creatorRow, full_name: profile?.full_name ?? null, city: profile?.city ?? null });

        const { data: reqRows } = await supabase
          .from("booking_requests")
          .select("id, occasion_type, event_date, location, budget, note, requester_phone, status, agreed_price, advance_percent, created_at")
          .eq("creator_id", creatorRow.id)
          .order("created_at", { ascending: false });

        setRequests(reqRows ?? []);
      }
      setLoading(false);
    }
    load();
  }, [user?.id]);

  // Poll every 20s
  useEffect(() => {
    if (!creator?.id) return;
    const iv = setInterval(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("booking_requests")
        .select("id, occasion_type, event_date, location, budget, note, requester_phone, status, agreed_price, advance_percent, created_at")
        .eq("creator_id", creator.id)
        .order("created_at", { ascending: false });
      if (data) setRequests(data);
    }, 20000);
    return () => clearInterval(iv);
  }, [creator?.id]);

  async function handleDecline(id: string) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/booking-requests/${id}/decline/`, { method: "POST" });
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "declined" } : r));
  }

  function handlePriceSubmit(id: string, price: number, advancePct: number) {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "accepted", agreed_price: price, advance_percent: advancePct } : r));
  }

  const pending  = requests.filter(r => r.status === "pending");
  const accepted = requests.filter(r => r.status === "accepted");
  const paid     = requests.filter(r => r.status === "paid");
  const declined = requests.filter(r => r.status === "declined");
  const expired  = requests.filter(r => r.status === "expired");

  const totalEarned    = paid.reduce((s, r) => s + (r.agreed_price ?? 0), 0);
  const pendingRevenue = accepted.reduce((s, r) => s + (r.agreed_price ?? 0), 0);

  const TABS = [
    { id: "overview",  label: "Overview" },
    { id: "requests",  label: `Requests${pending.length > 0 ? ` (${pending.length})` : ""}` },
    { id: "earnings",  label: "Earnings" },
  ];

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#FAF7F2", color: "#9B7B60", fontSize: "0.9rem" }}>
      Loading…
    </div>
  );

  if (!creator) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#FAF7F2" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>Not listed as a creator yet</p>
        <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginBottom: "1.5rem" }}>Go to your profile and enable "Creative Professional".</p>
        <Link href="/profile" style={{ backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>Go to Profile →</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF7F2" }}>

      {/* Header */}
      <div style={{ background: "#1C1410", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.7rem", color: "rgba(250,247,242,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.2rem" }}>Creator Dashboard</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", fontWeight: 800, color: "#FAF7F2", margin: 0 }}>
            {creator.full_name ?? user?.firstName ?? "You"} · {creator.category}
          </h1>
        </div>
        <Link href="/" style={{ fontSize: "0.78rem", color: "rgba(250,247,242,0.5)", textDecoration: "none" }}>← Site</Link>
      </div>

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E8DED0", padding: "0 2rem", display: "flex", gap: "0" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "0.875rem 1.25rem", border: "none", borderBottom: `2.5px solid ${activeTab === tab.id ? "#C4703A" : "transparent"}`, background: "transparent", color: activeTab === tab.id ? "#C4703A" : "#9B7B60", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {pending.length > 0 && (
              <div style={{ background: "#FFF8E1", border: "1.5px solid #FFE082", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#7B4F00", margin: 0 }}>
                  🔔 {pending.length} new booking {pending.length === 1 ? "request" : "requests"} waiting
                </p>
                <button onClick={() => setActiveTab("requests")} style={{ padding: "0.4rem 0.875rem", border: "none", borderRadius: "8px", background: "#F57F17", color: "#fff", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
                  Review →
                </button>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
              {[
                { label: "Confirmed Jobs", value: paid.length.toString(), icon: "✅" },
                { label: "Awaiting Payment", value: accepted.length.toString(), icon: "⏳" },
                { label: "Pending Requests", value: pending.length.toString(), icon: "📬" },
                { label: "Total Earned", value: `₹${(totalEarned / 1000).toFixed(0)}k`, icon: "💰" },
              ].map(s => (
                <div key={s.label} style={{ background: "#fff", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{s.icon} {s.label}</p>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 900, color: "#1C1410", margin: 0 }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Recent requests quick view */}
            <div style={{ background: "#fff", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Recent Requests</p>
              {requests.length === 0 ? (
                <p style={{ fontSize: "0.875rem", color: "#9B7B60", textAlign: "center", padding: "1rem" }}>No requests yet.</p>
              ) : (
                requests.slice(0, 5).map(r => {
                  const sc = STATUS_COLORS[r.status] ?? STATUS_COLORS.pending;
                  return (
                    <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0", borderBottom: "1px solid #F5EFE7" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410", margin: "0 0 0.15rem" }}>{r.occasion_type ?? "Event"} · {fmtDate(r.event_date)}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9B7B60", margin: 0 }}>{r.location ?? "—"}</p>
                      </div>
                      <span style={{ background: sc.bg, color: sc.color, fontSize: "0.65rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: "100px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{sc.label}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === "requests" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Pending */}
            <div>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>
                Pending ({pending.length})
              </p>
              {pending.length === 0 ? (
                <div style={{ background: "#fff", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1.5rem", textAlign: "center", color: "#9B7B60", fontSize: "0.875rem" }}>No pending requests.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {pending.map(r => (
                    <div key={r.id} style={{ background: "#fff", border: "1.5px solid #FFE082", borderRadius: "12px", padding: "1.1rem 1.25rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <div>
                          <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.2rem" }}>{r.occasion_type ?? "Event"}</p>
                          <p style={{ fontSize: "0.78rem", color: "#9B7B60", margin: 0 }}>📅 {fmtDate(r.event_date)} · 📍 {r.location ?? "—"}{r.budget ? ` · 💰 ${r.budget}` : ""}</p>
                        </div>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#FFF8E1", color: "#F57F17", padding: "0.2rem 0.6rem", borderRadius: "100px", textTransform: "uppercase" }}>New</span>
                      </div>
                      {r.note && <p style={{ fontSize: "0.8rem", color: "#7A5C42", background: "#FDF2E9", borderRadius: "8px", padding: "0.5rem 0.75rem", margin: "0 0 0.75rem", borderLeft: "3px solid #C4703A" }}>"{r.note}"</p>}
                      <div style={{ display: "flex", gap: "0.6rem" }}>
                        <button onClick={() => handleDecline(r.id)} style={{ flex: 1, padding: "0.6rem", border: "1.5px solid #E8DED0", borderRadius: "8px", background: "transparent", color: "#9B7B60", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>✕ Decline</button>
                        <button onClick={() => setPricingReq(r)} style={{ flex: 2, padding: "0.6rem", border: "none", borderRadius: "8px", background: "#C4703A", color: "#FAF7F2", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}>✓ Accept & Set Price</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Accepted – waiting for client to pay */}
            {accepted.length > 0 && (
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Accepted – Awaiting Payment ({accepted.length})</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {accepted.map(r => (
                    <div key={r.id} style={{ background: "#FFF3E0", border: "1px solid #FFE0B2", borderRadius: "10px", padding: "0.875rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410", margin: "0 0 0.15rem" }}>{r.occasion_type ?? "Event"} · {fmtDate(r.event_date)}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9B7B60", margin: 0 }}>Quoted {r.agreed_price ? fmt(r.agreed_price) : "—"} · {r.advance_percent}% advance</p>
                      </div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#FFF3E0", color: "#E65100", padding: "0.2rem 0.6rem", borderRadius: "100px", textTransform: "uppercase" }}>Awaiting Payment</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Confirmed / Paid */}
            {paid.length > 0 && (
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Confirmed ({paid.length})</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {paid.map(r => (
                    <div key={r.id} style={{ background: "#E8F5E9", border: "1px solid #C8E6C9", borderRadius: "10px", padding: "0.875rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410", margin: "0 0 0.15rem" }}>{r.occasion_type ?? "Event"} · {fmtDate(r.event_date)}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9B7B60", margin: 0 }}>{r.agreed_price ? fmt(r.agreed_price) : "—"} · {r.location ?? "—"}</p>
                      </div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, background: "#E8F5E9", color: "#2E7D32", padding: "0.2rem 0.6rem", borderRadius: "100px", textTransform: "uppercase" }}>Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Declined / Expired */}
            {(declined.length > 0 || expired.length > 0) && (
              <div>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Declined / Expired</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {[...declined, ...expired].map(r => {
                    const sc = STATUS_COLORS[r.status];
                    return (
                      <div key={r.id} style={{ background: sc.bg, border: "1px solid #eee", borderRadius: "10px", padding: "0.75rem 1.1rem", display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.75 }}>
                        <p style={{ fontSize: "0.82rem", color: "#5C4A3A", margin: 0 }}>{r.occasion_type ?? "Event"} · {fmtDate(r.event_date)}</p>
                        <span style={{ fontSize: "0.65rem", fontWeight: 700, color: sc.color, textTransform: "uppercase" }}>{sc.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === "earnings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
              {[
                { label: "Total Earned", value: fmt(totalEarned), sub: `${paid.length} confirmed jobs` },
                { label: "Pending Revenue", value: fmt(pendingRevenue), sub: `${accepted.length} accepted, not paid yet` },
                { label: "Avg per Job", value: paid.length > 0 ? fmt(Math.round(totalEarned / paid.length)) : "—", sub: "per confirmed booking" },
                { label: "Rating", value: creator.avg_rating ? `⭐ ${creator.avg_rating.toFixed(1)}` : "New", sub: `${creator.review_count} reviews` },
              ].map(e => (
                <div key={e.label} style={{ background: "#fff", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{e.label}</p>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 900, color: "#C4703A", margin: "0 0 0.25rem" }}>{e.value}</p>
                  <p style={{ fontSize: "0.72rem", color: "#9B7B60", margin: 0 }}>{e.sub}</p>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Breakdown</p>
              {[
                { label: "Confirmed (Paid)", count: paid.length, color: "#2E7D32" },
                { label: "Accepted – Awaiting Payment", count: accepted.length, color: "#E65100" },
                { label: "Pending", count: pending.length, color: "#F57F17" },
                { label: "Declined", count: declined.length, color: "#C62828" },
                { label: "Expired", count: expired.length, color: "#757575" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: "1px solid #F5EFE7" }}>
                  <span style={{ fontSize: "0.875rem", color: "#5C4A3A" }}>{row.label}</span>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700, color: row.color }}>{row.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {pricingReq && (
        <PriceModal request={pricingReq} onClose={() => setPricingReq(null)} onSubmit={handlePriceSubmit} />
      )}
    </div>
  );
}