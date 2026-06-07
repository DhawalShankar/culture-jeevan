// ─────────────────────────────────────────────────────────────
// /app/my-bookings/page.tsx  (or wherever you route it)
// Shows ONLY confirmed / paid bookings — pure history.
// In-progress requests never appear here.
// ─────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

interface MyBooking {
  id: string;
  event_date: string;
  occasion_type: string | null;
  location: string | null;
  agreed_price: number;
  advance_percent: number | null;
  status: "paid" | "confirmed" | "completed" | "arrived";
  created_at: string;
  // joined
  creator_name: string | null;
  creator_category: string | null;
  creator_city: string | null;
}

const C = {
  bg:      "#FAF7F2",
  dark:    "#1C1410",
  primary: "#C4703A",
  muted:   "#9B7B60",
  border:  "#E8DED0",
  surface: "#F5EFE7",
  cream:   "#FDF2E9",
  white:   "#FFFFFF",
};

const STATUS_META: Record<string, { bg: string; color: string; label: string; icon: string }> = {
  paid:      { bg: "#FFF8E1", color: "#F57F17", label: "Advance Paid",   icon: "💳" },
  confirmed: { bg: "#E8F5E9", color: "#2E7D32", label: "Confirmed",      icon: "✅" },
  completed: { bg: "#E3F2FD", color: "#1565C0", label: "Completed",      icon: "🎉" },
  arrived:   { bg: "#E0F2F1", color: "#00695C", label: "Creator Arrived", icon: "📍" },
};

const OCCASION_ICONS: Record<string, string> = {
  Wedding: "💍", Corporate: "🏢", "College Fest": "🎓",
  Birthday: "🎂", Concert: "🎸", "Brand Campaign": "📣",
  "Short Film": "🎬", "Product Shoot": "📦", "Reel / Content": "📱",
  "Open Mic": "🎤", Other: "✏️",
};

const CATEGORY_ICON: Record<string, string> = {
  "Photographer": "📸", "Videographer": "🎬", "Cinematographer": "🎥",
  "Drone Pilot": "🚁", "Singer": "🎤", "Musician": "🎵",
  "Makeup Artist": "💄", "Anchor / Emcee": "🎙️", "Other": "🎯",
};

function fmt(n: number) { return "₹" + n.toLocaleString("en-IN"); }
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function isPast(dateStr: string) { return new Date(dateStr) < new Date(); }

function Skeleton() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          height: "120px", borderRadius: "16px", marginBottom: "1rem",
          background: "linear-gradient(90deg,#EDE8E0 25%,#E4DED6 50%,#EDE8E0 75%)",
          backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
      <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>
    </div>
  );
}

function BookingCard({ booking }: { booking: MyBooking }) {
  const meta       = STATUS_META[booking.status] ?? STATUS_META.confirmed;
  const advPct     = booking.advance_percent ?? 50;
  const advAmt     = Math.round((booking.agreed_price * advPct) / 100);
  const remaining  = booking.agreed_price - advAmt;
  const past       = isPast(booking.event_date);
  const occasionIcon = OCCASION_ICONS[booking.occasion_type ?? "Other"] ?? "🎪";
  const creatorIcon  = CATEGORY_ICON[booking.creator_category ?? "Other"] ?? "🎯";

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`, borderRadius: "16px",
      padding: "1.25rem 1.5rem", transition: "box-shadow 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,112,58,0.1)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>

        {/* Left */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", flex: 1, minWidth: "200px" }}>
          {/* Creator avatar */}
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0,
            background: C.cream, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
          }}>
            {creatorIcon}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.2rem" }}>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: C.dark, margin: 0 }}>
                {booking.creator_name ?? "Creator"}
              </h3>
              {booking.creator_category && (
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: C.primary, background: C.cream, padding: "0.15rem 0.5rem", borderRadius: "100px" }}>
                  {booking.creator_category}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.75rem", color: C.muted }}>
              <span>{occasionIcon} {booking.occasion_type ?? "Event"}</span>
              <span>· 📅 {fmtDate(booking.event_date)}</span>
              {booking.location && <span>· 📍 {booking.location}</span>}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem" }}>
          <span style={{
            background: meta.bg, color: meta.color, fontSize: "0.65rem",
            fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "100px",
            textTransform: "uppercase", letterSpacing: "0.05em",
          }}>
            {meta.icon} {meta.label}
          </span>
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: C.primary, margin: 0 }}>
            {fmt(booking.agreed_price)}
          </p>
        </div>
      </div>

      {/* Payment breakdown */}
      <div style={{
        marginTop: "1rem", paddingTop: "0.875rem", borderTop: `1px solid ${C.surface}`,
        display: "flex", gap: "1.5rem", flexWrap: "wrap",
      }}>
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.15rem" }}>Advance Paid</p>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#2E7D32", margin: 0 }}>{fmt(advAmt)} ✓</p>
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.15rem" }}>
            {past ? "Paid on Day" : "Due on Day"}
          </p>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: past ? C.muted : C.dark, margin: 0 }}>{fmt(remaining)}</p>
        </div>
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.15rem" }}>Booked On</p>
          <p style={{ fontSize: "0.875rem", color: C.muted, margin: 0 }}>{fmtDate(booking.created_at)}</p>
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const { user, isLoaded } = useUser();
  const [bookings, setBookings] = useState<MyBooking[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState<"upcoming" | "past" | "all">("upcoming");

  useEffect(() => {
    if (!isLoaded || !user) return;
    async function load() {
      setLoading(true);
      const sb = createClient();

      // TODO: swap with Django API when ready
      // GET /api/my-bookings/ — returns confirmed/paid requests for this user
      const { data } = await sb
        .from("booking_requests")
        .select(`
          id, event_date, occasion_type, location, agreed_price,
          advance_percent, status, created_at,
          creators ( id, category, profiles ( full_name, city ) )
        `)
        .in("status", ["paid", "confirmed", "completed", "arrived"])
        // Filter by requester — adjust column name to match your schema
        // .eq("requester_profile_id", user.id)   // if you store profile_id
        .order("event_date", { ascending: false });

      setBookings(
        (data ?? []).map((r: any) => ({
          id:               r.id,
          event_date:       r.event_date,
          occasion_type:    r.occasion_type,
          location:         r.location,
          agreed_price:     r.agreed_price ?? 0,
          advance_percent:  r.advance_percent,
          status:           r.status,
          created_at:       r.created_at,
          creator_name:     r.creators?.profiles?.full_name ?? null,
          creator_category: r.creators?.category ?? null,
          creator_city:     r.creators?.profiles?.city ?? null,
        }))
      );
      setLoading(false);
    }
    load();
  }, [user, isLoaded]);

  const now      = new Date();
  const upcoming = bookings.filter(b => new Date(b.event_date) >= now);
  const past     = bookings.filter(b => new Date(b.event_date) <  now);
  const displayed = filter === "upcoming" ? upcoming : filter === "past" ? past : bookings;

  if (!isLoaded || loading) return <Skeleton />;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.25rem 0" }}>
          <Link href="/" style={{ fontSize: "0.75rem", color: C.muted, textDecoration: "none" }}>← Home</Link>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "0.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <div>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Your Account</p>
              <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: C.dark, margin: 0 }}>My Bookings</h1>
            </div>
            {/* Quick stats */}
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { label: "Upcoming", value: upcoming.length },
                { label: "Completed", value: past.length },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 900, color: C.primary, margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: "0.68rem", color: C.muted, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "0.4rem", marginTop: "1rem" }}>
            {(["upcoming", "past", "all"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "0.35rem 0.9rem", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 600,
                border: `1.5px solid ${filter === f ? C.primary : C.border}`,
                background: filter === f ? C.primary : "transparent",
                color: filter === f ? "#FAF7F2" : "#7A5C42",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", textTransform: "capitalize",
              }}>
                {f === "all" ? "All" : f === "upcoming" ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem" }}>
        {displayed.length === 0 ? (
          <div style={{
            background: C.white, border: `1.5px dashed ${C.border}`, borderRadius: "16px",
            padding: "3rem", textAlign: "center", marginTop: "1rem",
          }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>
              {filter === "upcoming" ? "📅" : "📂"}
            </span>
            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: C.dark, marginBottom: "0.4rem" }}>
              {filter === "upcoming" ? "No upcoming bookings" : "No past bookings yet"}
            </p>
            <p style={{ fontSize: "0.82rem", color: C.muted, marginBottom: "1.5rem" }}>
              {filter === "upcoming"
                ? "Find a creator and send a booking request to get started."
                : "Your completed bookings will appear here."}
            </p>
            <Link href="/creators" style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              background: C.primary, color: "#FAF7F2",
              padding: "0.7rem 1.5rem", borderRadius: "10px",
              fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
            }}>
              Browse Creators →
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {/* Section label for upcoming */}
            {filter === "all" && upcoming.length > 0 && (
              <p style={{ fontSize: "0.68rem", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0.5rem 0 0" }}>
                Upcoming
              </p>
            )}
            {displayed.map(b => <BookingCard key={b.id} booking={b} />)}
          </div>
        )}
      </div>

      <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>
    </div>
  );
}