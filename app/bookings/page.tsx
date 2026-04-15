"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingType = "creator" | "space";
type BookingStatus = "confirmed" | "pending_payment" | "completed";

interface CartItem {
  id: string;
  type: BookingType;
  title: string;           // creator name or space name
  subtitle: string;        // category or space type
  date: string;
  slot: string;            // e.g. "10:00 AM – 2:00 PM" or "3 hours"
  totalPrice: number;
  advancePct: number;      // 50–80, set by creator/space
  advancePaid: number;     // amount already held on platform
  balanceDue: number;      // to be paid directly at event
  status: BookingStatus;
  qrScanned: boolean;
  image?: string;
  city: string;
  occasion?: string;
  bookingRef: string;      // unique ref per item — blueprint: each item is independent
}

// ─── MOCK DATA — replace with real CartContext / Supabase fetch ───────────────
const MOCK_CART: CartItem[] = [
  {
    id: "1",
    type: "creator",
    title: "Raghav Mehta",
    subtitle: "Photographer",
    date: "2025-02-14",
    slot: "10:00 AM – 2:00 PM (4 hours)",
    totalPrice: 8000,
    advancePct: 60,
    advancePaid: 4800,
    balanceDue: 3200,
    status: "confirmed",
    qrScanned: false,
    city: "Lucknow",
    occasion: "Wedding Pre-shoot",
    bookingRef: "CJ-2502-A1",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&q=80",
  },
  {
    id: "2",
    type: "space",
    title: "The Brown Owl Cafe",
    subtitle: "Cafe · Shooting Space",
    date: "2025-02-14",
    slot: "Morning — 10:00 AM to 2:00 PM",
    totalPrice: 3500,
    advancePct: 50,
    advancePaid: 1750,
    balanceDue: 1750,
    status: "confirmed",
    qrScanned: false,
    city: "Lucknow",
    bookingRef: "CJ-2502-B2",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&q=80",
  },
  {
    id: "3",
    type: "creator",
    title: "Ananya Singh",
    subtitle: "Mehendi Artist",
    date: "2025-02-10",
    slot: "6:00 PM – 10:00 PM (4 hours)",
    totalPrice: 5000,
    advancePct: 70,
    advancePaid: 3500,
    balanceDue: 1500,
    status: "completed",
    qrScanned: true,
    city: "Kanpur",
    occasion: "Wedding",
    bookingRef: "CJ-2502-C3",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&q=80",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_CONFIG = {
  confirmed:       { label: "Confirmed",       color: "#166534", bg: "#F0FDF4", border: "#BBF7D0", dot: "#22C55E" },
  pending_payment: { label: "Awaiting Payment", color: "#92400E", bg: "#FFFBEB", border: "#FDE68A", dot: "#F59E0B" },
  completed:       { label: "Completed",        color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE", dot: "#3B82F6" },
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "short", day: "numeric", month: "long", year: "numeric",
  });
}

function QRPlaceholder({ bookingRef }: { bookingRef: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
      {/* Simple QR mock using CSS grid pattern */}
      <div style={{ width: "80px", height: "80px", padding: "6px", backgroundColor: "#FFFFFF", border: "2px solid #E8DED0", borderRadius: "8px" }}>
        <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(7, 1fr)", gap: "1px" }}>
          {Array.from({ length: 49 }).map((_, i) => {
            // deterministic pattern from bookingRef
            const code = bookingRef.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
            const filled = (i + code * (i % 3 + 1)) % 3 !== 0;
            // corners always filled for QR look
            const corner = [0,1,2,7,8,14,35,41,42,48,47,46,40,43].includes(i);
            return (
              <div key={i} style={{ backgroundColor: (filled || corner) ? "#1C1410" : "transparent", borderRadius: "1px" }} />
            );
          })}
        </div>
      </div>
      <p style={{ fontSize: "0.62rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.08em", fontFamily: "monospace" }}>
        {bookingRef}
      </p>
    </div>
  );
}

export default function CartPage() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [expandedQR, setExpandedQR] = useState<string | null>(null);

  const activeItems = MOCK_CART.filter((i) => i.status === "confirmed" || i.status === "pending_payment");
  const pastItems   = MOCK_CART.filter((i) => i.status === "completed");
  const displayItems = activeTab === "active" ? activeItems : pastItems;

  const totalAdvancePaid = activeItems.reduce((s, i) => s + i.advancePaid, 0);
  const totalBalanceDue  = activeItems.reduce((s, i) => s + i.balanceDue, 0);
  const totalValue       = activeItems.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8DED0", padding: "1.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#9B7B60", alignItems: "center", marginBottom: "1rem" }}>
            <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Home</Link>
            <span>›</span>
            <span style={{ color: "#1C1410", fontWeight: 500 }}>My Bookings</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                My Bookings
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#9B7B60" }}>
                Each booking is independent — its own QR, its own advance, its own confirmation.
              </p>
            </div>
            {activeItems.length > 0 && (
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <div style={{ textAlign: "center", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.625rem 1rem" }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>Advance Paid</p>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: "#C4703A" }}>₹{totalAdvancePaid.toLocaleString()}</p>
                </div>
                <div style={{ textAlign: "center", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.625rem 1rem" }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>Balance Due</p>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: "#5C4A3A" }}>₹{totalBalanceDue.toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.25rem", backgroundColor: "#F0E8DC", borderRadius: "10px", padding: "3px", marginBottom: "1.75rem", width: "fit-content" }}>
          {(["active", "past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.45rem 1.25rem", borderRadius: "7px", border: "none",
                fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: activeTab === tab ? "#C4703A" : "transparent",
                color: activeTab === tab ? "#FAF7F2" : "#7A5C42",
              }}
            >
              {tab === "active"
                ? `Active (${activeItems.length})`
                : `Past (${pastItems.length})`}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {displayItems.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>
              {activeTab === "active" ? "🎟️" : "📋"}
            </span>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", color: "#1C1410", marginBottom: "0.5rem" }}>
              {activeTab === "active" ? "No active bookings" : "No past bookings yet"}
            </h3>
            <p style={{ color: "#9B7B60", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              {activeTab === "active" ? "Book a creator or space to get started." : "Your completed bookings will appear here."}
            </p>
            <Link
              href="/creators"
              style={{ backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}
            >
              Book a Creator →
            </Link>
          </div>
        )}

        {/* Booking Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {displayItems.map((item) => {
            const statusCfg = STATUS_CONFIG[item.status];
            const isQROpen  = expandedQR === item.id;

            return (
              <div
                key={item.id}
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "18px", overflow: "hidden", boxShadow: "0 2px 16px rgba(28,20,16,0.04)" }}
              >
                {/* Card top strip — status color */}
                <div style={{ height: "3px", backgroundColor: statusCfg.dot }} />

                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>

                    {/* Thumbnail */}
                    <div style={{ width: "64px", height: "64px", borderRadius: "12px", flexShrink: 0, overflow: "hidden", backgroundColor: "#F0E8DC" }}>
                      {item.image
                        ? <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                            {item.type === "creator" ? "🧑‍🎨" : "🏛️"}
                          </div>
                      }
                    </div>

                    {/* Main info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                        <div>
                          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.2rem" }}>
                            <span style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                              {item.type === "creator" ? "Creator" : "Space"}
                            </span>
                            <span style={{ color: "#E8DED0" }}>·</span>
                            <span style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60" }}>{item.bookingRef}</span>
                          </div>
                          <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#1C1410", margin: 0 }}>
                            {item.title}
                          </h3>
                          <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginTop: "0.1rem" }}>{item.subtitle}</p>
                        </div>

                        {/* Status badge */}
                        <span style={{ backgroundColor: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.border}`, fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: "100px", whiteSpace: "nowrap", flexShrink: 0 }}>
                          {item.qrScanned ? "✓ QR Scanned" : statusCfg.label}
                        </span>
                      </div>

                      {/* Event details */}
                      <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>📅 {formatDate(item.date)}</span>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>🕐 {item.slot}</span>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>📍 {item.city}</span>
                        {item.occasion && <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>🎉 {item.occasion}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Price breakdown row */}
                  <div style={{ marginTop: "1rem", padding: "0.875rem 1rem", backgroundColor: "#FAF7F2", border: "1px solid #F0E8DC", borderRadius: "10px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                    <div>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Total</p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: "#1C1410" }}>₹{item.totalPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                        Advance Paid ({item.advancePct}%)
                      </p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: "#C4703A" }}>₹{item.advancePaid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                        Balance at Event ({100 - item.advancePct}%)
                      </p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: "#5C4A3A" }}>₹{item.balanceDue.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* QR section — blueprint: scan on arrival releases advance */}
                  {item.status === "confirmed" && (
                    <div style={{ marginTop: "1rem" }}>
                      <button
                        onClick={() => setExpandedQR(isQROpen ? null : item.id)}
                        style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderRadius: "8px", border: "1.5px solid #E8DED0", backgroundColor: isQROpen ? "#FDF0E6" : "#F5EFE7", color: isQROpen ? "#C4703A" : "#5C4A3A", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
                      >
                        <span style={{ fontSize: "1rem" }}>📲</span>
                        {isQROpen ? "Hide QR Code" : "Show QR Code for Venue"}
                        <span style={{ marginLeft: "auto", fontSize: "0.7rem", color: "#9B7B60", fontWeight: 500 }}>
                          Scan on arrival to release advance
                        </span>
                      </button>

                      {isQROpen && (
                        <div style={{ marginTop: "0.75rem", padding: "1.25rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "12px", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                          <QRPlaceholder bookingRef={item.bookingRef} />
                          <div style={{ flex: 1, minWidth: "200px" }}>
                            <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.35rem" }}>
                              Show this to {item.type === "creator" ? "the creator" : "the space"}
                            </p>
                            <p style={{ fontSize: "0.78rem", color: "#5C4A3A", lineHeight: 1.65, marginBottom: "0.75rem" }}>
                              When they scan this QR, your held advance of <strong>₹{item.advancePaid.toLocaleString()}</strong> is released to their account instantly. If they don't show up — don't scan — and you get a full refund within T+2 days.
                            </p>
                            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                              <span style={{ fontSize: "0.7rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", color: "#8B4513", padding: "0.2rem 0.6rem", borderRadius: "100px", fontWeight: 600 }}>
                                Ref: {item.bookingRef}
                              </span>
                              <span style={{ fontSize: "0.7rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", color: "#8B4513", padding: "0.2rem 0.6rem", borderRadius: "100px", fontWeight: 600 }}>
                                📅 {formatDate(item.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Completed state */}
                  {item.status === "completed" && item.qrScanned && (
                    <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "10px", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span style={{ fontSize: "0.9rem" }}>✅</span>
                      <div>
                        <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#166534" }}>QR scanned · Advance released</p>
                        <p style={{ fontSize: "0.72rem", color: "#16A34A" }}>
                          Balance of ₹{item.balanceDue.toLocaleString()} was paid directly to the {item.type === "creator" ? "creator" : "space"} at the event.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Leave a review — completed only */}
                  {item.status === "completed" && (
                    <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                      <Link
                        href={`/review/${item.type}/${item.id}`}
                        style={{ fontSize: "0.78rem", fontWeight: 700, color: "#C4703A", textDecoration: "none", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.4rem 0.875rem", borderRadius: "100px" }}
                      >
                        ⭐ Leave a Review
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Blueprint info footer */}
        {activeTab === "active" && activeItems.length > 0 && (
          <div style={{ marginTop: "2rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1rem 1.25rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.625rem" }}>
              How Your Cart Works
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }} className="info-grid">
              {[
                { icon: "🔐", text: "Each booking's advance is held separately by CultureJeevan until QR scan." },
                { icon: "📲", text: "Scan the QR on arrival. That's the proof. Advance releases instantly to the creator/space." },
                { icon: "💵", text: "Balance is paid directly — cash or UPI — after the session. Platform doesn't touch it." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                  <p style={{ fontSize: "0.75rem", color: "#6B5240", lineHeight: 1.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}