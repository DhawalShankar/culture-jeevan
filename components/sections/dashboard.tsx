"use client";

import { useState } from "react";
import Link from "next/link";

const STATS = [
  { label: "Total Bookings", value: "142", change: "+12 this month", icon: "📅", positive: true },
  { label: "Revenue Earned", value: "₹1,84,600", change: "+₹22,400 this month", icon: "💰", positive: true },
  { label: "Avg. Rating", value: "4.9", change: "from 128 reviews", icon: "⭐", positive: true },
  { label: "Occupancy Rate", value: "78%", change: "-3% vs last month", icon: "📊", positive: false },
];

const BOOKINGS = [
  { id: "BK001", studio: "Lumina Photography Studio", client: "Aryan Mehta", date: "28 Mar 2025", time: "10AM – 1PM", amount: 3600, status: "confirmed" },
  { id: "BK002", studio: "Lumina Photography Studio", client: "Priya Sharma", date: "29 Mar 2025", time: "2PM – 5PM", amount: 3600, status: "confirmed" },
  { id: "BK003", studio: "Lumina Photography Studio", client: "Vikram Nair", date: "30 Mar 2025", time: "9AM – 6PM", amount: 8000, status: "pending" },
  { id: "BK004", studio: "Lumina Photography Studio", client: "Neha Kapoor", date: "1 Apr 2025", time: "11AM – 2PM", amount: 3600, status: "confirmed" },
  { id: "BK005", studio: "Lumina Photography Studio", client: "Rohit Verma", date: "2 Apr 2025", time: "3PM – 5PM", amount: 2400, status: "cancelled" },
];

const STUDIOS = [
  { name: "Lumina Photography Studio", city: "Connaught Place, Delhi", status: "live", bookings: 142, revenue: "₹1,84,600", rating: 4.9 },
];

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  confirmed: { bg: "#E8F5E9", color: "#2E7D32", label: "Confirmed" },
  pending:   { bg: "#FFF8E1", color: "#F57F17", label: "Pending" },
  cancelled: { bg: "#FFEBEE", color: "#C62828", label: "Cancelled" },
};

const NAV_ITEMS = [
  { icon: "🏠", label: "Overview", id: "overview" },
  { icon: "📅", label: "Bookings", id: "bookings" },
  { icon: "🏢", label: "My Studios", id: "studios" },
  { icon: "💰", label: "Earnings", id: "earnings" },
  { icon: "⚙️", label: "Settings", id: "settings" },
];

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#FAF7F2" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: sidebarOpen ? "240px" : "68px",
        backgroundColor: "#1C1410",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: "68px",
        }}>
          {sidebarOpen && (
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 800, color: "#FAF7F2", whiteSpace: "nowrap" }}>
              Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "#9B7B60", fontSize: "1rem", padding: "0.25rem", flexShrink: 0,
          }}>
            {sidebarOpen ? "◂" : "▸"}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: "1rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveNav(item.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.7rem 0.875rem", borderRadius: "10px", border: "none",
                cursor: "pointer", width: "100%", textAlign: "left",
                transition: "all 0.15s", whiteSpace: "nowrap", overflow: "hidden",
                backgroundColor: activeNav === item.id ? "rgba(196,112,58,0.18)" : "transparent",
                color: activeNav === item.id ? "#C4703A" : "#9B7B60",
              }}
              onMouseEnter={(e) => {
                if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (activeNav !== item.id) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Back to site */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <Link href="/" style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.7rem 0.875rem", borderRadius: "10px",
            color: "#9B7B60", textDecoration: "none", fontSize: "0.875rem",
            transition: "color 0.2s", whiteSpace: "nowrap", overflow: "hidden",
          }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            <span style={{ flexShrink: 0 }}>←</span>
            {sidebarOpen && "Back to Site"}
          </Link>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, overflow: "auto" }}>

        {/* Top Bar */}
        <div style={{
          backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8DED0",
          padding: "0 2rem", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 30,
        }}>
          <div>
            <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
              Studio Owner Dashboard
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
            }}>R</div>
            <div>
              <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1C1410" }}>Rahul Sharma</p>
              <p style={{ fontSize: "0.75rem", color: "#9B7B60" }}>Studio Owner</p>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: "2rem" }}>

          {/* ── OVERVIEW ── */}
          {activeNav === "overview" && (
            <div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                {STATS.map((stat) => (
                  <div key={stat.label} style={{
                    backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                    borderRadius: "16px", padding: "1.5rem",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em" }}>{stat.label}</p>
                      <span style={{ fontSize: "1.3rem" }}>{stat.icon}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 900, color: "#1C1410", marginBottom: "0.25rem" }}>{stat.value}</p>
                    <p style={{ fontSize: "0.78rem", color: stat.positive ? "#2E7D32" : "#C62828", fontWeight: 500 }}>{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Recent Bookings preview */}
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410" }}>Recent Bookings</h2>
                  <button onClick={() => setActiveNav("bookings")} style={{
                    background: "none", border: "none", color: "#C4703A",
                    fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                  }}>View All →</button>
                </div>
                <BookingsTable bookings={BOOKINGS.slice(0, 3)} />
              </div>
            </div>
          )}

          {/* ── BOOKINGS ── */}
          {activeNav === "bookings" && (
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 700, color: "#1C1410" }}>All Bookings</h2>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {["All", "Confirmed", "Pending", "Cancelled"].map((f) => (
                    <button key={f} style={{
                      padding: "0.35rem 0.875rem", borderRadius: "100px",
                      fontSize: "0.78rem", fontWeight: 600, border: "1.5px solid #E8DED0",
                      backgroundColor: f === "All" ? "#C4703A" : "transparent",
                      color: f === "All" ? "#FAF7F2" : "#7A5C42", cursor: "pointer",
                    }}>{f}</button>
                  ))}
                </div>
              </div>
              <BookingsTable bookings={BOOKINGS} />
            </div>
          )}

          {/* ── MY STUDIOS ── */}
          {activeNav === "studios" && (
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.25rem" }}>
                <Link href="/list-your-studio" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  backgroundColor: "#C4703A", color: "#FAF7F2",
                  padding: "0.625rem 1.25rem", borderRadius: "10px",
                  fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                }}>+ Add New Studio</Link>
              </div>
              {STUDIOS.map((studio) => (
                <div key={studio.name} style={{
                  backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                  borderRadius: "16px", padding: "1.5rem",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", flexWrap: "wrap", gap: "1rem",
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410" }}>{studio.name}</h3>
                      <span style={{
                        backgroundColor: "#E8F5E9", color: "#2E7D32",
                        fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.625rem",
                        borderRadius: "100px", textTransform: "uppercase", letterSpacing: "0.05em",
                      }}>● Live</span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: "#7A5C42" }}>📍 {studio.city}</p>
                  </div>
                  <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
                    {[
                      { label: "Bookings", value: studio.bookings },
                      { label: "Revenue", value: studio.revenue },
                      { label: "Rating", value: `⭐ ${studio.rating}` },
                    ].map((m) => (
                      <div key={m.label} style={{ textAlign: "center" }}>
                        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontWeight: 800, color: "#1C1410" }}>{m.value}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    padding: "0.55rem 1.1rem", border: "1.5px solid #C4703A",
                    borderRadius: "8px", backgroundColor: "transparent", color: "#C4703A",
                    fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                  }}>Edit Studio</button>
                </div>
              ))}
            </div>
          )}

          {/* ── EARNINGS ── */}
          {activeNav === "earnings" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}>
                {[
                  { label: "This Month", value: "₹22,400", sub: "8 bookings" },
                  { label: "Last Month", value: "₹38,400", sub: "14 bookings" },
                  { label: "Total Earned", value: "₹1,84,600", sub: "142 bookings" },
                  { label: "Pending Payout", value: "₹7,200", sub: "2 bookings" },
                ].map((e) => (
                  <div key={e.label} style={{
                    backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                    borderRadius: "16px", padding: "1.5rem",
                  }}>
                    <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>{e.label}</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.6rem", fontWeight: 900, color: "#C4703A" }}>{e.value}</p>
                    <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginTop: "0.25rem" }}>{e.sub}</p>
                  </div>
                ))}
              </div>
              <div style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "16px", padding: "2rem", textAlign: "center",
              }}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>📈</span>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>Detailed Earnings Chart</p>
                <p style={{ fontSize: "0.875rem", color: "#9B7B60" }}>Revenue charts and payout history coming soon.</p>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeNav === "settings" && (
            <div style={{ maxWidth: "560px" }}>
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "16px", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { label: "Full Name", value: "Rahul Sharma", type: "text" },
                  { label: "Email", value: "rahul@luminastudio.com", type: "email" },
                  { label: "Phone", value: "+91 98765 43210", type: "tel" },
                  { label: "Bank Account (for payouts)", value: "XXXX XXXX 4321", type: "text" },
                ].map((field) => (
                  <div key={field.label}>
                    <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{field.label}</label>
                    <input defaultValue={field.value} type={field.type} style={{
                      width: "100%", padding: "0.75rem 1rem",
                      border: "1.5px solid #E8DED0", borderRadius: "10px",
                      fontSize: "0.9rem", color: "#1C1410", backgroundColor: "#FAF7F2",
                      outline: "none", boxSizing: "border-box",
                    }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                  </div>
                ))}
                <button style={{
                  padding: "0.8rem", backgroundColor: "#C4703A", color: "#FAF7F2",
                  border: "none", borderRadius: "10px", fontSize: "0.9rem",
                  fontWeight: 700, cursor: "pointer", marginTop: "0.5rem",
                }}>Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BookingsTable({ bookings }: { bookings: typeof BOOKINGS }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #E8DED0" }}>
            {["Booking ID", "Client", "Date", "Time", "Amount", "Status"].map((h) => (
              <th key={h} style={{
                textAlign: "left", padding: "0.5rem 0.875rem",
                fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60",
                textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} style={{ borderBottom: "1px solid #F5EFE7" }}>
              <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#9B7B60", fontWeight: 600 }}>{b.id}</td>
              <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#1C1410", fontWeight: 600 }}>{b.client}</td>
              <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A", whiteSpace: "nowrap" }}>{b.date}</td>
              <td style={{ padding: "0.875rem", fontSize: "0.82rem", color: "#5C4A3A", whiteSpace: "nowrap" }}>{b.time}</td>
              <td style={{ padding: "0.875rem", fontSize: "0.875rem", color: "#C4703A", fontWeight: 700, fontFamily: "var(--font-playfair)" }}>₹{b.amount.toLocaleString()}</td>
              <td style={{ padding: "0.875rem" }}>
                <span style={{
                  backgroundColor: STATUS_COLORS[b.status].bg,
                  color: STATUS_COLORS[b.status].color,
                  fontSize: "0.72rem", fontWeight: 700,
                  padding: "0.25rem 0.625rem", borderRadius: "100px",
                  textTransform: "uppercase", letterSpacing: "0.04em",
                }}>{STATUS_COLORS[b.status].label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}