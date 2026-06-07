"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

// ── Types ─────────────────────────────────────────────────────
interface CreatorData {
  id: string;
  profile_id: string;
  category: string;
  starting_price: number;
  experience: string | null;
  languages: string | null;
  avg_rating: number | null;
  review_count: number;
  full_name: string | null;
  city: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  bio: string | null;
  phone: string | null;
}

interface Booking {
  id: string;
  event_name: string | null;
  event_date: string;
  slot_type: string | null;
  hours: number;
  total_amount: number;
  advance_amount: number;
  status: string;
  contact_phone: string;
  created_at: string;
  client_name: string;
  client_city: string | null;
}

interface BookingRequest {
  id: string;
  occasion_type: string | null;
  event_date: string;
  location: string | null;
  budget: string | null;
  note: string | null;
  requester_phone: string;
  status: "pending" | "accepted" | "declined" | "paid" | "confirmed";
  agreed_price: number | null;
  advance_percent: number | null;
  created_at: string;
  requester_name?: string | null;
  requester_city?: string | null;
}

// ── Constants ─────────────────────────────────────────────────
const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "#E8F5E9", color: "#2E7D32", label: "Confirmed" },
  pending:   { bg: "#FFF8E1", color: "#F57F17", label: "Pending" },
  cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled" },
  completed: { bg: "#E3F2FD", color: "#1565C0", label: "Completed" },
  quoted:    { bg: "#F3E5F5", color: "#6A1B9A", label: "Quoted" },
  arrived:   { bg: "#E0F2F1", color: "#00695C", label: "Arrived" },
  expired:   { bg: "#F5F5F5", color: "#757575", label: "Expired" },
  accepted:  { bg: "#FFF3E0", color: "#E65100", label: "Accepted" },
  declined:  { bg: "#FFEBEE", color: "#C62828", label: "Declined" },
  paid:      { bg: "#E8F5E9", color: "#2E7D32", label: "Paid" },
};

const NAV_ITEMS = [
  { icon: "🏠", label: "Overview",   id: "overview" },
  { icon: "📅", label: "Bookings",   id: "bookings" },
  { icon: "🎨", label: "My Profile", id: "profile" },
  { icon: "💰", label: "Earnings",   id: "earnings" },
];

const CATEGORY_ICON: Record<string, string> = {
  "Photographer": "📸", "Videographer": "🎬", "Cinematographer": "🎥",
  "Drone Pilot": "🚁", "Singer": "🎤", "Musician": "🎵",
  "Tabla Player": "🥁", "Flautist": "🎶", "Pianist": "🎹",
  "Guitarist": "🎸", "Sound Engineer": "🎙️", "Podcast Host": "🎙️",
  "Stand-up Comedian": "🎭", "Poet": "✍️", "Storyteller": "📖",
  "Spoken Word Artist": "🗣️", "Anchor / Emcee": "🎤",
  "Voice-over Artist": "🔊", "Video Editor": "🎨",
  "Motion Designer": "✨", "Colorist": "🎨", "Art Director": "🖼️",
  "Set Designer": "🏗️", "Prop Stylist": "🪆", "Costume Designer": "👗",
  "Makeup Artist": "💄", "Lighting Professional": "💡",
  "Gaffer": "🔦", "Grip Crew": "🎬",
  "Production Assistant": "📋", "Other": "🎯",
};

const OCCASION_ICONS: Record<string, string> = {
  Wedding: "💍", Corporate: "🏢", "College Fest": "🎓",
  Birthday: "🎂", Concert: "🎸", "Brand Campaign": "📣",
  "Short Film": "🎬", "Product Shoot": "📦", "Reel / Content": "📱",
  "Open Mic": "🎤", Other: "✏️",
};

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ── Price Modal ───────────────────────────────────────────────
function PriceModal({
  request,
  onClose,
  onSubmit,
}: {
  request: BookingRequest;
  onClose: () => void;
  onSubmit: (id: string, price: number, advancePct: number) => void;
}) {
  const [price,      setPrice]      = useState("");
  const [advancePct, setAdvancePct] = useState("50");
  const [saving,     setSaving]     = useState(false);

  const parsed    = parseFloat(price.replace(/,/g, ""));
  const advance   = !isNaN(parsed) ? Math.round((parsed * Number(advancePct)) / 100) : 0;
  const remaining = !isNaN(parsed) ? parsed - advance : 0;
  const valid     = !isNaN(parsed) && parsed > 0;

  async function submit() {
    if (!valid) return;
    setSaving(true);
    // TODO: replace with Django API call
    // await fetch(`/api/booking-requests/${request.id}/accept/`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ agreed_price: parsed, advance_percent: Number(advancePct) }),
    // });
    onSubmit(request.id, parsed, Number(advancePct));
    setSaving(false);
    onClose();
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(28,20,16,0.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
    }}>
      <div style={{
        background: "#fff", borderRadius: "18px", width: "100%", maxWidth: "400px",
        padding: "1.75rem", boxShadow: "0 20px 60px rgba(28,20,16,0.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
          <div>
            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Set Your Price</p>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: 800, color: "#1C1410", margin: 0 }}>
              {request.occasion_type ?? "Event"} · {fmtDate(request.event_date)}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.1rem", cursor: "pointer", color: "#9B7B60" }}>✕</button>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>
            Total Price (₹) *
          </label>
          <input
            type="number" min="0" placeholder="e.g. 15000"
            value={price} onChange={e => setPrice(e.target.value)}
            style={{
              width: "100%", padding: "0.65rem 0.9rem", border: "1.5px solid #E8DED0",
              borderRadius: "9px", fontSize: "1rem", fontWeight: 700, color: "#1C1410",
              fontFamily: "var(--font-playfair)", outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "#C4703A")}
            onBlur={e  => (e.currentTarget.style.borderColor = "#E8DED0")}
          />
          {price && !valid && <p style={{ fontSize: "0.65rem", color: "#C62828", marginTop: "0.2rem" }}>Enter a valid amount</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>
            Advance % client pays now
          </label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["30", "40", "50", "60"].map(p => (
              <button key={p} onClick={() => setAdvancePct(p)} style={{
                flex: 1, padding: "0.5rem",
                border: `1.5px solid ${advancePct === p ? "#C4703A" : "#E8DED0"}`,
                borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700,
                background: advancePct === p ? "#FDF2E9" : "transparent",
                color: advancePct === p ? "#C4703A" : "#9B7B60",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              }}>{p}%</button>
            ))}
          </div>
        </div>

        {valid && (
          <div style={{ background: "#F5EFE7", borderRadius: "10px", padding: "0.875rem 1rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#9B7B60" }}>Client pays now</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#C4703A" }}>{fmt(advance)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
              <span style={{ fontSize: "0.78rem", color: "#9B7B60" }}>Remaining on day</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1C1410" }}>{fmt(remaining)}</span>
            </div>
            <div style={{ height: "1px", background: "#E8DED0", margin: "0.5rem 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1C1410" }}>Total</span>
              <span style={{ fontSize: "0.875rem", fontWeight: 800, fontFamily: "var(--font-playfair)", color: "#1C1410" }}>{fmt(parsed)}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "0.7rem", border: "1.5px solid #E8DED0", borderRadius: "9px",
            background: "transparent", color: "#9B7B60", fontSize: "0.875rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button onClick={submit} disabled={!valid || saving} style={{
            flex: 2, padding: "0.7rem", border: "none", borderRadius: "9px",
            background: valid && !saving ? "#C4703A" : "#E8DED0",
            color: valid && !saving ? "#FAF7F2" : "#9B7B60",
            fontSize: "0.875rem", fontWeight: 700,
            cursor: valid && !saving ? "pointer" : "not-allowed",
            fontFamily: "inherit",
            boxShadow: valid ? "0 4px 14px rgba(196,112,58,0.25)" : "none",
            transition: "all 0.2s",
          }}>
            {saving ? "Saving…" : "Confirm & Accept →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Request Card ──────────────────────────────────────────────
function RequestCard({
  req,
  onAccept,
  onDecline,
}: {
  req: BookingRequest;
  onAccept: (req: BookingRequest) => void;
  onDecline: (id: string) => void;
}) {
  const icon = OCCASION_ICONS[req.occasion_type ?? "Other"] ?? "🎪";

  return (
    <div style={{
      background: "#fff", border: "1px solid #E8DED0", borderRadius: "14px",
      padding: "1.1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "10px", background: "#FDF2E9",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.25rem", flexShrink: 0,
          }}>{icon}</div>
          <div>
            <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.15rem" }}>
              {req.requester_name ?? req.requester_phone}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#9B7B60", margin: 0 }}>
              {req.occasion_type ?? "Event"}{req.requester_city ? ` · 📍 ${req.requester_city}` : ""}
            </p>
          </div>
        </div>
        <span style={{
          fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
          padding: "0.2rem 0.6rem", borderRadius: "100px", background: "#FFF8E1", color: "#F57F17",
        }}>New</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {[
          { icon: "📅", text: fmtDate(req.event_date) },
          { icon: "📍", text: req.location ?? "—" },
          ...(req.budget ? [{ icon: "💰", text: req.budget }] : []),
        ].map((chip, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: "0.25rem",
            background: "#F5EFE7", borderRadius: "100px",
            padding: "0.2rem 0.65rem", fontSize: "0.72rem", color: "#5C4A3A", fontWeight: 500,
          }}>{chip.icon} {chip.text}</span>
        ))}
      </div>

      {req.note && (
        <p style={{
          fontSize: "0.78rem", color: "#7A5C42", lineHeight: 1.6, margin: 0,
          background: "#FDF2E9", borderRadius: "8px", padding: "0.5rem 0.75rem",
          borderLeft: "3px solid #C4703A",
        }}>"{req.note}"</p>
      )}

      <p style={{ fontSize: "0.65rem", color: "#9B7B60", margin: 0 }}>Received {fmtDate(req.created_at)}</p>

      <div style={{ display: "flex", gap: "0.6rem", paddingTop: "0.25rem", borderTop: "1px solid #E8DED0" }}>
        <button
          onClick={() => onDecline(req.id)}
          style={{
            flex: 1, padding: "0.6rem", border: "1.5px solid #E8DED0", borderRadius: "8px",
            background: "transparent", color: "#9B7B60", fontSize: "0.8rem", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#C62828"; e.currentTarget.style.color = "#C62828"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#E8DED0"; e.currentTarget.style.color = "#9B7B60"; }}
        >✕ Decline</button>
        <button
          onClick={() => onAccept(req)}
          style={{
            flex: 2, padding: "0.6rem", border: "none", borderRadius: "8px",
            background: "#C4703A", color: "#FAF7F2", fontSize: "0.8rem", fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 3px 10px rgba(196,112,58,0.25)", transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >✓ Accept &amp; Set Price</button>
      </div>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────
function BookingsTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0)
    return <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#9B7B60", fontSize: "0.875rem" }}>No bookings yet.</div>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #E8DED0" }}>
            {["Client", "Event", "Date", "Hours", "Amount", "Status"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "0.5rem 0.875rem", fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => {
            const sc = STATUS_COLORS[b.status] ?? STATUS_COLORS.pending;
            return (
              <tr key={b.id} style={{ borderBottom: "1px solid #F5EFE7" }}>
                <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#1C1410", fontWeight: 600 }}>
                  <div>{b.client_name}</div>
                  {b.client_city && <div style={{ fontSize: "0.72rem", color: "#9B7B60", marginTop: "1px" }}>📍 {b.client_city}</div>}
                </td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A" }}>{b.event_name || "—"}</td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A", whiteSpace: "nowrap" }}>{fmtDate(b.event_date)}</td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#7A5C42" }}>{b.hours}h</td>
                <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#C4703A", fontWeight: 700, fontFamily: "var(--font-playfair)" }}>{fmt(b.total_amount)}</td>
                <td style={{ padding: "0.875rem" }}>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: "0.72rem", fontWeight: 700, padding: "0.25rem 0.625rem", borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{sc.label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ label, value, sub, icon, positive = true }: { label: string; value: string; sub: string; icon: string; positive?: boolean }) {
  return (
    <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <span style={{ fontSize: "1.3rem" }}>{icon}</span>
      </div>
      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: "#1C1410", marginBottom: "0.25rem" }}>{value}</p>
      <p style={{ fontSize: "0.78rem", color: positive ? "#2E7D32" : "#C62828", fontWeight: 500 }}>{sub}</p>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────
export default function CreatorDashboard() {
  const { user } = useUser();
  const [activeNav,     setActiveNav]     = useState("overview");
  const [sidebarOpen,   setSidebarOpen]   = useState(true);
  const [creator,       setCreator]       = useState<CreatorData | null>(null);
  const [bookings,      setBookings]      = useState<Booking[]>([]);
  const [bookingFilter, setBookingFilter] = useState("All");
  const [loading,       setLoading]       = useState(true);

  // Booking requests state
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([]);
  const [pricingReq,      setPricingReq]      = useState<BookingRequest | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    async function load() {
      setLoading(true);
      const supabase = createClient();

      const { data: creatorRow, error: creatorError } = await supabase
        .from("creators")
        .select("id, profile_id, category, starting_price, experience, languages, avg_rating, review_count")
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (creatorError) { console.error("creators fetch error:", creatorError); setLoading(false); return; }

      if (creatorRow) {
        const { data: profileRow } = await supabase
          .from("profiles")
          .select("full_name, city, instagram_handle, portfolio_url, bio, phone")
          .eq("id", user!.id)
          .maybeSingle();

        const p = (profileRow ?? {}) as any;
        setCreator({
          id: creatorRow.id,
          profile_id: creatorRow.profile_id,
          category: creatorRow.category,
          starting_price: creatorRow.starting_price ?? 0,
          experience: creatorRow.experience ?? null,
          languages: creatorRow.languages ?? null,
          avg_rating: creatorRow.avg_rating ?? null,
          review_count: creatorRow.review_count ?? 0,
          full_name: p.full_name ?? null,
          city: p.city ?? null,
          instagram_handle: p.instagram_handle ?? null,
          portfolio_url: p.portfolio_url ?? null,
          bio: p.bio ?? null,
          phone: p.phone ?? null,
        });

        // Confirmed bookings
        const { data: bookingRows } = await supabase
          .from("bookings")
          .select("id, event_name, event_date, slot_type, hours, total_amount, advance_amount, status, contact_phone, created_at, profiles(full_name, email, city)")
          .eq("target_id", creatorRow.id)
          .eq("target_type", "creator")
          .order("event_date", { ascending: false });

        setBookings(
          (bookingRows ?? []).map((b: any) => ({
            ...b,
            client_name: b.profiles?.full_name?.trim() || b.profiles?.email?.split("@")[0] || b.contact_phone || "Client",
            client_city: b.profiles?.city ?? null,
          }))
        );

        // TODO: replace with Django API call when ready
        // GET /api/booking-requests/?creator_id=creatorRow.id
        const { data: requestRows } = await supabase
          .from("booking_requests")
          .select("id, occasion_type, event_date, location, budget, note, requester_phone, status, agreed_price, advance_percent, created_at")
          .eq("creator_id", creatorRow.id)
          .order("created_at", { ascending: false });

        setBookingRequests(requestRows ?? []);
      }
      setLoading(false);
    }
    load();
  }, [user?.id]);

  // Poll for request status changes every 20s
  useEffect(() => {
    if (!creator?.id) return;
    const interval = setInterval(async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("booking_requests")
        .select("id, occasion_type, event_date, location, budget, note, requester_phone, status, agreed_price, advance_percent, created_at")
        .eq("creator_id", creator.id)
        .order("created_at", { ascending: false });
      if (data) setBookingRequests(data);
    }, 20000);
    return () => clearInterval(interval);
  }, [creator?.id]);

  function handleDecline(id: string) {
    // TODO: replace with Django API call
    // await fetch(`/api/booking-requests/${id}/decline/`, { method: "POST" });
    setBookingRequests(prev => prev.map(r => r.id === id ? { ...r, status: "declined" } : r));
  }

  function handlePriceSubmit(id: string, price: number, advancePct: number) {
    // TODO: replace with Django API call
    // await fetch(`/api/booking-requests/${id}/accept/`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ agreed_price: price, advance_percent: advancePct }),
    // });
    setBookingRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: "accepted", agreed_price: price, advance_percent: advancePct } : r
    ));
  }

  // Derived stats
  const confirmedBookings = bookings.filter(b => b.status === "confirmed" || b.status === "completed");
  const totalRevenue      = confirmedBookings.reduce((s, b) => s + b.total_amount, 0);
  const thisMonth         = new Date().getMonth();
  const thisYear          = new Date().getFullYear();
  const monthBookings     = confirmedBookings.filter(b => {
    const d = new Date(b.event_date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const monthRevenue      = monthBookings.reduce((s, b) => s + b.total_amount, 0);
  const pendingPayout     = bookings.filter(b => b.status === "confirmed").reduce((s, b) => s + (b.total_amount - b.advance_amount), 0);
  const filteredBookings  = bookingFilter === "All" ? bookings : bookings.filter(b => STATUS_COLORS[b.status]?.label === bookingFilter);

  const pendingRequests   = bookingRequests.filter(r => r.status === "pending");
  const handledRequests   = bookingRequests.filter(r => r.status !== "pending");

  const displayUser   = user?.firstName ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}` : "You";
  const categoryIcon  = creator ? (CATEGORY_ICON[creator.category] ?? "🎯") : "🎨";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAF7F2" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? "240px" : "68px", backgroundColor: "#1C1410", flexShrink: 0,
        display: "flex", flexDirection: "column", transition: "width 0.25s",
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
      }}>
        <div style={{ padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "68px" }}>
          {sidebarOpen && <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 800, color: "#FAF7F2", whiteSpace: "nowrap" }}>Culture<span style={{ color: "#C4703A" }}>Jeevan</span></span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9B7B60", fontSize: "1rem", padding: "0.25rem", flexShrink: 0 }}>
            {sidebarOpen ? "◂" : "▸"}
          </button>
        </div>
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.875rem",
              borderRadius: "10px", border: "none", cursor: "pointer", width: "100%", textAlign: "left",
              transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
              backgroundColor: activeNav === item.id ? "rgba(196,112,58,0.18)" : "transparent",
              color: activeNav === item.id ? "#C4703A" : "#9B7B60",
            }}
              onMouseEnter={e => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0, position: "relative" }}>
                {item.icon}
                {/* Badge for pending requests on Bookings tab */}
                {item.id === "bookings" && pendingRequests.length > 0 && (
                  <span style={{
                    position: "absolute", top: "-4px", right: "-6px",
                    background: "#C4703A", color: "#FAF7F2", fontSize: "0.5rem",
                    fontWeight: 800, width: "14px", height: "14px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{pendingRequests.length}</span>
                )}
              </span>
              {sidebarOpen && <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.875rem", borderRadius: "10px", color: "#9B7B60", textDecoration: "none", fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#FAF7F2")} onMouseLeave={e => (e.currentTarget.style.color = "#9B7B60")}>
            <span style={{ flexShrink: 0 }}>⚙️</span>{sidebarOpen && "Edit Profile"}
          </Link>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 0.875rem", borderRadius: "10px", color: "#9B7B60", textDecoration: "none", fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#FAF7F2")} onMouseLeave={e => (e.currentTarget.style.color = "#9B7B60")}>
            <span style={{ flexShrink: 0 }}>←</span>{sidebarOpen && "Back to Site"}
          </Link>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Topbar */}
        <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8DED0", padding: "0 2rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
          <div>
            <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Creator Dashboard</p>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410" }}>{NAV_ITEMS.find(n => n.id === activeNav)?.label}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {creator && <span style={{ backgroundColor: "rgba(196,112,58,0.1)", color: "#C4703A", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "100px" }}>{categoryIcon} {creator.category}</span>}
            <div style={{ width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#C4703A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF7F2", fontWeight: 700, fontSize: "0.9rem" }}>
              {user?.firstName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410" }}>{displayUser}</p>
              <p style={{ fontSize: "0.75rem", color: "#9B7B60" }}>Creative Professional</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "2rem" }}>

          {/* Loading shimmer */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ height: "120px", borderRadius: "16px", background: "linear-gradient(90deg,#F0E8DC 25%,#FAF7F2 50%,#F0E8DC 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite" }} />
              ))}
            </div>
          )}

          {/* Not a creator yet */}
          {!loading && !creator && (
            <div style={{ backgroundColor: "#FFFFFF", border: "1.5px dashed #E8DED0", borderRadius: "16px", padding: "3rem", textAlign: "center", maxWidth: "480px", margin: "0 auto" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>🎨</span>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>Not listed as a creator yet</p>
              <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginBottom: "1.5rem", lineHeight: 1.6 }}>Go to your profile and toggle on "Creative Professional" to list yourself and start receiving bookings.</p>
              <Link href="/profile" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, textDecoration: "none" }}>
                Go to Profile →
              </Link>
            </div>
          )}

          {/* ── OVERVIEW ── */}
          {!loading && creator && activeNav === "overview" && (
            <div>
              <div style={{ backgroundColor: "#1C1410", borderRadius: "16px", padding: "1.5rem 2rem", marginBottom: "1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "rgba(250,247,242,0.5)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Welcome back</p>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 800, color: "#FAF7F2", margin: 0 }}>{creator.full_name ?? displayUser} {categoryIcon}</h2>
                  <p style={{ fontSize: "0.82rem", color: "rgba(250,247,242,0.45)", marginTop: "0.3rem" }}>{creator.category}{creator.city ? ` · ${creator.city}` : ""}{creator.experience ? ` · ${creator.experience}` : ""}</p>
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {creator.instagram_handle && <a href={`https://instagram.com/${creator.instagram_handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#C4703A", backgroundColor: "rgba(196,112,58,0.15)", padding: "0.4rem 0.875rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>{creator.instagram_handle}</a>}
                  {creator.portfolio_url && <a href={creator.portfolio_url.startsWith("http") ? creator.portfolio_url : `https://${creator.portfolio_url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(250,247,242,0.6)", backgroundColor: "rgba(255,255,255,0.08)", padding: "0.4rem 0.875rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>Portfolio →</a>}
                </div>
              </div>

              {/* Pending requests alert on overview */}
              {pendingRequests.length > 0 && (
                <div style={{
                  background: "#FFF8E1", border: "1.5px solid #FFE082", borderRadius: "12px",
                  padding: "0.875rem 1.25rem", marginBottom: "1.5rem",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>🔔</span>
                    <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#7B4F00", margin: 0 }}>
                      You have <strong>{pendingRequests.length}</strong> new booking {pendingRequests.length === 1 ? "request" : "requests"} waiting
                    </p>
                  </div>
                  <button onClick={() => setActiveNav("bookings")} style={{
                    padding: "0.4rem 0.875rem", border: "none", borderRadius: "8px",
                    background: "#F57F17", color: "#fff", fontSize: "0.78rem", fontWeight: 700,
                    cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                  }}>Review Now →</button>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                <StatCard label="Total Bookings" value={confirmedBookings.length.toString()} sub={`${monthBookings.length} this month`} icon="📅" />
                <StatCard label="Total Earned" value={fmt(totalRevenue)} sub={`${fmt(monthRevenue)} this month`} icon="💰" />
                <StatCard label="Avg. Rating" value={creator.avg_rating ? creator.avg_rating.toFixed(1) : "New"} sub={`${creator.review_count} reviews`} icon="⭐" />
                <StatCard label="Pending Payout" value={fmt(pendingPayout)} sub="balance to release" icon="⏳" positive={pendingPayout === 0} />
              </div>

              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410" }}>Recent Bookings</h2>
                  <button onClick={() => setActiveNav("bookings")} style={{ background: "none", border: "none", color: "#C4703A", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>View All →</button>
                </div>
                <BookingsTable bookings={bookings.slice(0, 5)} />
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {!loading && creator && activeNav === "bookings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

              {/* Pending requests section */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <div>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.15rem" }}>Booking Requests</h2>
                    <p style={{ fontSize: "0.75rem", color: "#9B7B60", margin: 0 }}>Accept &amp; set your price — client pays advance to confirm</p>
                  </div>
                  {pendingRequests.length > 0 && (
                    <span style={{ background: "#FFF8E1", color: "#F57F17", fontSize: "0.72rem", fontWeight: 800, padding: "0.25rem 0.7rem", borderRadius: "100px" }}>
                      {pendingRequests.length} new
                    </span>
                  )}
                </div>

                {pendingRequests.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "2rem", color: "#9B7B60", fontSize: "0.875rem" }}>
                    <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.5rem" }}>📭</span>
                    No pending requests right now.
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
                    {pendingRequests.map(req => (
                      <RequestCard
                        key={req.id}
                        req={req}
                        onAccept={r => setPricingReq(r)}
                        onDecline={handleDecline}
                      />
                    ))}
                  </div>
                )}

                {/* Recently handled */}
                {handledRequests.length > 0 && (
                  <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid #E8DED0" }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Recently Handled</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {handledRequests.slice(0, 6).map(r => {
                        const sc = STATUS_COLORS[r.status] ?? STATUS_COLORS.pending;
                        return (
                          <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.75rem", background: "#F5EFE7", borderRadius: "9px" }}>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                              <span style={{ fontSize: "1rem" }}>{OCCASION_ICONS[r.occasion_type ?? "Other"] ?? "🎪"}</span>
                              <div>
                                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1410", margin: 0 }}>{r.requester_name ?? r.requester_phone}</p>
                                <p style={{ fontSize: "0.68rem", color: "#9B7B60", margin: 0 }}>{fmtDate(r.event_date)}</p>
                              </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                              {r.agreed_price && <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#C4703A", fontFamily: "var(--font-playfair)" }}>{fmt(r.agreed_price)}</span>}
                              <span style={{ background: sc.bg, color: sc.color, fontSize: "0.62rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: "100px", textTransform: "uppercase" }}>{sc.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmed bookings */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", margin: 0 }}>
                    Confirmed Bookings <span style={{ fontSize: "0.78rem", color: "#9B7B60", fontWeight: 500 }}>({bookings.length} total)</span>
                  </h2>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map(f => (
                      <button key={f} onClick={() => setBookingFilter(f)} style={{
                        padding: "0.35rem 0.875rem", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 600,
                        border: `1.5px solid ${bookingFilter === f ? "#C4703A" : "#E8DED0"}`,
                        backgroundColor: bookingFilter === f ? "#C4703A" : "transparent",
                        color: bookingFilter === f ? "#FAF7F2" : "#7A5C42",
                        cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit",
                      }}>{f}</button>
                    ))}
                  </div>
                </div>
                <BookingsTable bookings={filteredBookings} />
              </div>
            </div>
          )}

          {/* ── MY PROFILE ── */}
          {!loading && creator && activeNav === "profile" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", flex: 1, minWidth: "240px" }}>
                  <div style={{ width: "60px", height: "60px", borderRadius: "50%", flexShrink: 0, backgroundColor: "#C4703A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{categoryIcon}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#1C1410" }}>{creator.full_name ?? displayUser}</h3>
                      <span style={{ backgroundColor: "#E8F5E9", color: "#2E7D32", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.625rem", borderRadius: "100px", textTransform: "uppercase" }}>● Live</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#7A5C42", margin: "0 0 0.35rem" }}>{creator.category}{creator.city ? ` · 📍 ${creator.city}` : ""}</p>
                    {creator.experience && <p style={{ fontSize: "0.78rem", color: "#9B7B60", margin: "0 0 0.35rem" }}>🕐 {creator.experience} experience</p>}
                    {creator.languages && <p style={{ fontSize: "0.78rem", color: "#9B7B60", margin: 0 }}>🗣️ {creator.languages}</p>}
                    {creator.bio && <p style={{ fontSize: "0.82rem", color: "#5C4A3A", lineHeight: 1.65, marginTop: "0.75rem", maxWidth: "420px" }}>{creator.bio}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end" }}>
                  <Link href="/profile" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.55rem 1.1rem", border: "1.5px solid #C4703A", borderRadius: "8px", backgroundColor: "transparent", color: "#C4703A", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}>Edit in Profile →</Link>
                  {creator.instagram_handle && <a href={`https://instagram.com/${creator.instagram_handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "#9B7B60", textDecoration: "none" }}>{creator.instagram_handle}</a>}
                  {creator.portfolio_url && <a href={creator.portfolio_url.startsWith("http") ? creator.portfolio_url : `https://${creator.portfolio_url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.78rem", color: "#9B7B60", textDecoration: "none" }}>Portfolio ↗</a>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
                {[
                  { label: "Starting Price", value: fmt(creator.starting_price) },
                  { label: "Bookings",       value: confirmedBookings.length.toString() },
                  { label: "Total Earned",   value: fmt(totalRevenue) },
                  { label: "Rating",         value: creator.avg_rating ? `⭐ ${creator.avg_rating.toFixed(1)}` : "New" },
                ].map(m => (
                  <div key={m.label} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1.1rem 1.25rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.35rem" }}>{m.label}</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 800, color: "#C4703A" }}>{m.value}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: "rgba(196,112,58,0.04)", border: "1px solid rgba(196,112,58,0.2)", borderRadius: "12px", padding: "1rem 1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
                <p style={{ fontSize: "0.82rem", color: "#7A5C42", lineHeight: 1.65 }}>Your public profile is live. Clients can find you on the Creators page and book you directly. Keep your bio, Instagram, and portfolio updated to increase discoverability.</p>
              </div>
            </div>
          )}

          {/* ── EARNINGS ── */}
          {!loading && creator && activeNav === "earnings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.25rem" }}>
                {[
                  { label: "This Month",      value: fmt(monthRevenue),  sub: `${monthBookings.length} bookings` },
                  { label: "Total Earned",    value: fmt(totalRevenue),  sub: `${confirmedBookings.length} bookings` },
                  { label: "Pending Payout",  value: fmt(pendingPayout), sub: "awaiting release" },
                  { label: "Avg per Booking", value: confirmedBookings.length > 0 ? fmt(Math.round(totalRevenue / confirmedBookings.length)) : "—", sub: "per confirmed booking" },
                ].map(e => (
                  <div key={e.label} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{e.label}</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: "#C4703A" }}>{e.value}</p>
                    <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginTop: "0.25rem" }}>{e.sub}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "1.25rem" }}>Booking Breakdown</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
                  {Object.entries(STATUS_COLORS).map(([status, sc]) => {
                    const count = bookings.filter(b => b.status === status).length;
                    return (
                      <div key={status} style={{ backgroundColor: sc.bg, borderRadius: "10px", padding: "0.875rem 1rem" }}>
                        <p style={{ fontSize: "0.72rem", fontWeight: 700, color: sc.color, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.35rem" }}>{sc.label}</p>
                        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 900, color: sc.color }}>{count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>📈</span>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>Earnings Chart</p>
                <p style={{ fontSize: "0.875rem", color: "#9B7B60" }}>Detailed revenue charts and payout history coming soon.</p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Price modal */}
      {pricingReq && (
        <PriceModal
          request={pricingReq}
          onClose={() => setPricingReq(null)}
          onSubmit={handlePriceSubmit}
        />
      )}

      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}