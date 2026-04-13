"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpaceData {
  id: string;
  space_name: string;
  space_type: string;
  address_area: string | null;
  address_city: string | null;
  hourly_rate: number | null;
  half_day_rate: number | null;
  full_day_rate: number | null;
  capacity: number | null;
  amenities: string[];
  avg_rating: number | null;
  review_count: number;
  is_premium: boolean;
  is_cj_certified: boolean;
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
  // joined from profiles via host_id
  client_name: string;
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  confirmed:  { bg: "#E8F5E9",  color: "#2E7D32", label: "Confirmed" },
  pending:    { bg: "#FFF8E1",  color: "#F57F17", label: "Pending" },
  cancelled:  { bg: "#FFEBEE",  color: "#C62828", label: "Cancelled" },
  completed:  { bg: "#E3F2FD",  color: "#1565C0", label: "Completed" },
  quoted:     { bg: "#F3E5F5",  color: "#6A1B9A", label: "Quoted" },
  arrived:    { bg: "#E0F2F1",  color: "#00695C", label: "Arrived" },
  expired:    { bg: "#F5F5F5",  color: "#757575", label: "Expired" },
};

const NAV_ITEMS = [
  { icon: "🏠", label: "Overview",  id: "overview" },
  { icon: "📅", label: "Bookings",  id: "bookings" },
  { icon: "🏢", label: "My Studio", id: "studio" },
  { icon: "💰", label: "Earnings",  id: "earnings" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── BookingsTable ────────────────────────────────────────────────────────────

function BookingsTable({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "#9B7B60", fontSize: "0.875rem" }}>
        No bookings yet.
      </div>
    );
  }
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #E8DED0" }}>
            {["Client", "Event", "Date", "Hours", "Amount", "Status"].map((h) => (
              <th key={h} style={{
                textAlign: "left", padding: "0.5rem 0.875rem",
                fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60",
                textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const sc = STATUS_COLORS[b.status] ?? STATUS_COLORS.pending;
            return (
              <tr key={b.id} style={{ borderBottom: "1px solid #F5EFE7" }}>
                <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#1C1410", fontWeight: 600 }}>{b.client_name}</td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A" }}>{b.event_name || "—"}</td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A", whiteSpace: "nowrap" }}>{fmtDate(b.event_date)}</td>
                <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#7A5C42" }}>{b.hours}h</td>
                <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#C4703A", fontWeight: 700, fontFamily: "var(--font-playfair)" }}>{fmt(b.total_amount)}</td>
                <td style={{ padding: "0.875rem" }}>
                  <span style={{
                    background: sc.bg, color: sc.color,
                    fontSize: "0.72rem", fontWeight: 700,
                    padding: "0.25rem 0.625rem", borderRadius: "100px",
                    textTransform: "uppercase", letterSpacing: "0.04em",
                  }}>{sc.label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function SpacesDashboard() {
  const { user } = useUser();
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [space, setSpace] = useState<SpaceData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingFilter, setBookingFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // ── Load space + bookings ──
  useEffect(() => {
    if (!user?.id) return;

    async function load() {
      setLoading(true);
      const supabase = createClient();

      // 1. Load this user's space
      const { data: spaceData } = await supabase
        .from("spaces")
        .select("*")
        .eq("profile_id", user!.id)
        .maybeSingle();

      setSpace(spaceData ?? null);

      if (!spaceData) {
        setLoading(false);
        return;
      }

      // 2. Load bookings for this space
      const { data: bookingRows } = await supabase
        .from("bookings")
        .select(`
          id, event_name, event_date, slot_type, hours,
          total_amount, advance_amount, status, contact_phone, created_at,
          profiles(full_name, email)
        `)
        .eq("target_id", spaceData.id)
        .eq("target_type", "space")
        .order("event_date", { ascending: false });

      setBookings(
        (bookingRows ?? []).map((b: any) => ({
          ...b,
          client_name:
            b.profiles?.full_name?.trim() ||
            b.profiles?.email?.split("@")[0] ||
            b.contact_phone ||
            "Client",
        }))
      );

      setLoading(false);
    }

    load();
  }, [user?.id]);

  // ── Derived stats ──
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed" || b.status === "completed");
  const totalRevenue = confirmedBookings.reduce((s, b) => s + b.total_amount, 0);
  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthBookings = confirmedBookings.filter((b) => {
    const d = new Date(b.event_date);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  });
  const monthRevenue = monthBookings.reduce((s, b) => s + b.total_amount, 0);
  const pendingPayout = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((s, b) => s + (b.total_amount - b.advance_amount), 0);

  const filteredBookings =
    bookingFilter === "All"
      ? bookings
      : bookings.filter((b) => STATUS_COLORS[b.status]?.label === bookingFilter);

  const displayUser = user?.firstName
    ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
    : "You";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAF7F2" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? "240px" : "68px",
        backgroundColor: "#1C1410", flexShrink: 0,
        display: "flex", flexDirection: "column",
        transition: "width 0.25s",
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
      }}>
        <div style={{
          padding: "1.5rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "68px",
        }}>
          {sidebarOpen && (
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 800, color: "#FAF7F2", whiteSpace: "nowrap" }}>
              Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9B7B60", fontSize: "1rem", padding: "0.25rem", flexShrink: 0 }}>
            {sidebarOpen ? "◂" : "▸"}
          </button>
        </div>

        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              padding: "0.7rem 0.875rem", borderRadius: "10px", border: "none",
              cursor: "pointer", width: "100%", textAlign: "left",
              transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
              backgroundColor: activeNav === item.id ? "rgba(196,112,58,0.18)" : "transparent",
              color: activeNav === item.id ? "#C4703A" : "#9B7B60",
            }}
              onMouseEnter={(e) => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          <Link href="/profile" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.7rem 0.875rem", borderRadius: "10px",
            color: "#9B7B60", textDecoration: "none", fontSize: "0.875rem",
            whiteSpace: "nowrap", overflow: "hidden",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            <span style={{ flexShrink: 0 }}>⚙️</span>
            {sidebarOpen && "Edit Profile"}
          </Link>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.7rem 0.875rem", borderRadius: "10px",
            color: "#9B7B60", textDecoration: "none", fontSize: "0.875rem",
            whiteSpace: "nowrap", overflow: "hidden",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            <span style={{ flexShrink: 0 }}>←</span>
            {sidebarOpen && "Back to Site"}
          </Link>
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Topbar */}
        <div style={{
          backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8DED0",
          padding: "0 2rem", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 30,
        }}>
          <div>
            <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              Space Owner Dashboard
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410" }}>
              {NAV_ITEMS.find((n) => n.id === activeNav)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "50%",
              backgroundColor: "#C4703A", display: "flex", alignItems: "center",
              justifyContent: "center", color: "#FAF7F2", fontWeight: 700, fontSize: "0.9rem",
            }}>
              {user?.firstName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410" }}>{displayUser}</p>
              <p style={{ fontSize: "0.75rem", color: "#9B7B60" }}>Space Owner</p>
            </div>
          </div>
        </div>

        <div style={{ padding: "2rem" }}>

          {/* ── No space state ── */}
          {!loading && !space && (
            <div style={{
              backgroundColor: "#FFFFFF", border: "1.5px dashed #E8DED0",
              borderRadius: "16px", padding: "3rem",
              textAlign: "center", maxWidth: "480px", margin: "0 auto",
            }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>🏛️</span>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>
                No space listed yet
              </p>
              <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                Go to your profile and toggle on "Space Owner" to list your studio or venue.
              </p>
              <Link href="/profile" style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                backgroundColor: "#C4703A", color: "#FAF7F2",
                padding: "0.7rem 1.5rem", borderRadius: "10px",
                fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
              }}>
                Go to Profile →
              </Link>
            </div>
          )}

          {/* ── Loading ── */}
          {loading && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  height: "120px", borderRadius: "16px",
                  background: "linear-gradient(90deg, #F0E8DC 25%, #FAF7F2 50%, #F0E8DC 75%)",
                  backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
                }} />
              ))}
            </div>
          )}

          {/* ── OVERVIEW ── */}
          {!loading && space && activeNav === "overview" && (
            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {[
                  { label: "Total Bookings",  value: confirmedBookings.length.toString(), sub: `${monthBookings.length} this month`, icon: "📅", positive: true },
                  { label: "Total Revenue",   value: fmt(totalRevenue),                   sub: `${fmt(monthRevenue)} this month`,    icon: "💰", positive: true },
                  { label: "Avg. Rating",     value: space.avg_rating ? space.avg_rating.toFixed(1) : "New", sub: `${space.review_count} reviews`, icon: "⭐", positive: true },
                  { label: "Pending Payout",  value: fmt(pendingPayout),                 sub: "balance to release", icon: "⏳", positive: pendingPayout === 0 },
                ].map((stat) => (
                  <div key={stat.label} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</p>
                      <span style={{ fontSize: "1.3rem" }}>{stat.icon}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: "#1C1410", marginBottom: "0.25rem" }}>{stat.value}</p>
                    <p style={{ fontSize: "0.78rem", color: stat.positive ? "#2E7D32" : "#C62828", fontWeight: 500 }}>{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Recent Bookings */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410" }}>Recent Bookings</h2>
                  <button onClick={() => setActiveNav("bookings")} style={{ background: "none", border: "none", color: "#C4703A", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}>
                    View All →
                  </button>
                </div>
                <BookingsTable bookings={bookings.slice(0, 5)} />
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {!loading && space && activeNav === "bookings" && (
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#1C1410" }}>
                  All Bookings
                  <span style={{ fontSize: "0.78rem", color: "#9B7B60", fontWeight: 500, marginLeft: "0.5rem", fontFamily: "inherit" }}>
                    ({bookings.length} total)
                  </span>
                </h2>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["All", "Confirmed", "Pending", "Completed", "Cancelled"].map((f) => (
                    <button key={f} onClick={() => setBookingFilter(f)} style={{
                      padding: "0.35rem 0.875rem", borderRadius: "100px",
                      fontSize: "0.78rem", fontWeight: 600, border: "1.5px solid",
                      borderColor: bookingFilter === f ? "#C4703A" : "#E8DED0",
                      backgroundColor: bookingFilter === f ? "#C4703A" : "transparent",
                      color: bookingFilter === f ? "#FAF7F2" : "#7A5C42",
                      cursor: "pointer", transition: "all 0.15s",
                    }}>{f}</button>
                  ))}
                </div>
              </div>
              <BookingsTable bookings={filteredBookings} />
            </div>
          )}

          {/* ── MY STUDIO ── */}
          {!loading && space && activeNav === "studio" && (
            <div>
              <div style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "16px", padding: "1.5rem",
                display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem",
              }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#1C1410" }}>
                      {space.space_name}
                    </h3>
                    <span style={{
                      backgroundColor: "#E8F5E9", color: "#2E7D32",
                      fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.625rem",
                      borderRadius: "100px", textTransform: "uppercase",
                    }}>● Live</span>
                    {space.is_cj_certified && (
                      <span style={{
                        backgroundColor: "rgba(196,112,58,0.1)", color: "#C4703A",
                        fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.625rem",
                        borderRadius: "100px",
                      }}>✓ CJ Certified</span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "#7A5C42", margin: "0 0 0.5rem" }}>
                    📍 {[space.address_area, space.address_city].filter(Boolean).join(", ") || "—"}
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "#7A5C42", margin: 0 }}>
                    {space.space_type}{space.capacity ? ` · Up to ${space.capacity} people` : ""}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                  {[
                    { label: "Bookings",  value: confirmedBookings.length },
                    { label: "Revenue",   value: fmt(totalRevenue) },
                    { label: "Rating",    value: space.avg_rating ? `⭐ ${space.avg_rating.toFixed(1)}` : "New" },
                  ].map((m) => (
                    <div key={m.label} style={{ textAlign: "center" }}>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410" }}>{m.value}</p>
                      <p style={{ fontSize: "0.72rem", color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{m.label}</p>
                    </div>
                  ))}
                </div>

                <Link href="/profile" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.55rem 1.1rem", border: "1.5px solid #C4703A",
                  borderRadius: "8px", backgroundColor: "transparent", color: "#C4703A",
                  fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
                }}>
                  Edit in Profile →
                </Link>
              </div>

              {/* Pricing summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginTop: "1.25rem" }}>
                {[
                  { label: "Per Hour",     value: space.hourly_rate   ? fmt(space.hourly_rate)   : "—" },
                  { label: "Half Day",     value: space.half_day_rate ? fmt(space.half_day_rate) : "—" },
                  { label: "Full Day",     value: space.full_day_rate ? fmt(space.full_day_rate) : "—" },
                  { label: "Amenities",    value: `${space.amenities.length} listed` },
                ].map((p) => (
                  <div key={p.label} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1.1rem 1.25rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.35rem" }}>{p.label}</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 800, color: "#C4703A" }}>{p.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EARNINGS ── */}
          {!loading && space && activeNav === "earnings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.25rem" }}>
                {[
                  { label: "This Month",    value: fmt(monthRevenue),   sub: `${monthBookings.length} bookings` },
                  { label: "Total Earned",  value: fmt(totalRevenue),   sub: `${confirmedBookings.length} bookings` },
                  { label: "Pending Payout", value: fmt(pendingPayout), sub: "awaiting release" },
                  { label: "Avg per Booking", value: confirmedBookings.length > 0 ? fmt(Math.round(totalRevenue / confirmedBookings.length)) : "—", sub: "per confirmed booking" },
                ].map((e) => (
                  <div key={e.label} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{e.label}</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: "#C4703A" }}>{e.value}</p>
                    <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginTop: "0.25rem" }}>{e.sub}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "2rem", textAlign: "center" }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>📈</span>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>
                  Earnings Chart
                </p>
                <p style={{ fontSize: "0.875rem", color: "#9B7B60" }}>
                  Detailed revenue charts and payout history coming soon.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}