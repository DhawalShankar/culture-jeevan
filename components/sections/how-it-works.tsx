"use client";

import Link from "next/link";
import { useState } from "react";

const PHASES = [
  {
    phase: "Phase 1",
    label: "Discover",
    color: "#C4703A",
    bg: "#FDF0E6",
    border: "#F0DCC8",
    status: "live",
    steps: [
      {
        number: "01",
        icon: "🔍",
        title: "Browse Listings",
        desc: "Find verified Creators, Studios, and Cafés across Lucknow, Kanpur, and NCR. Every listing shows real rates, advance percentages, and direct links to their work — Instagram, YouTube, website. No fluff, no guesswork.",
      },
      {
        number: "02",
        icon: "📋",
        title: "Shortlist Your Pick",
        desc: "Compare Creators and Spaces by category, price, and rating. Know exactly who you want before booking opens. The listing page tells you everything — rate, advance percentage, slot types, and cancellation policy.",
      },
      {
        number: "03",
        icon: "✉️",
        title: "Send a Request",
        desc: "For Creators: submit a proposal with event date, time, venue, and your budget. The Creator reviews and calls you to finalise. For Spaces: select a date, pick a slot — hourly, half-day, or full day — and pay the advance. Slots confirm instantly.",
      },
    ],
  },
  {
    phase: "Phase 2",
    label: "Secure",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    status: "soon",
    steps: [
      {
        number: "04",
        icon: "💳",
        title: "Pay the Advance",
        desc: "Once a Creator finalises your booking — or you pick a Space slot — pay 50–80% upfront via Razorpay. The money is held by CultureJeevan and not released until you confirm arrival. Your slot is locked. No one can ghost you now.",
      },
      {
        number: "05",
        icon: "📍",
        title: "Show Up",
        desc: "Arrive at the confirmed time. Everything is pre-agreed — rate, slot, scope. No last-minute calls, no renegotiation. Just walk in.",
      },
      {
        number: "06",
        icon: "🔢",
        title: "Share Your OTP",
        desc: "Each confirmed booking gets a unique 6-digit OTP. On the day, share it with the Creator or Space. They enter it on their dashboard — the advance releases to their account instantly. Simple, works on any device.",
      },
    ],
  },
  {
    phase: "Phase 3",
    label: "Close",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    status: "soon",
    steps: [
      {
        number: "07",
        icon: "🎬",
        title: "Work Happens",
        desc: "The shoot, session, event, or performance is between you and the Creator or Space. CultureJeevan is a connector — like a telecom operator. What happens between the two parties is entirely theirs.",
      },
      {
        number: "08",
        icon: "🤝",
        title: "Pay the Balance",
        desc: "After the work, pay the remaining 20–50% directly — cash or UPI. This goes straight to the Creator or Space. CultureJeevan takes only a 10% commission on the advance. The balance is never touched by the platform.",
      },
      {
        number: "09",
        icon: "⭐",
        title: "Review & Close",
        desc: "Both sides leave a public, permanent rating and written review. No manager, no certificate needed. This is how trust is built — one real booking at a time.",
      },
    ],
  },
];

const BOOKING_TYPES = [
  {
    icon: "🎤",
    title: "Creator Booking",
    subtitle: "Negotiation-based",
    color: "#C4703A",
    bg: "#FDF0E6",
    border: "#F0DCC8",
    flow: [
      { label: "PROPOSED", desc: "You submit request with date, time, venue, budget" },
      { label: "DIRECT CALL", desc: "Creator calls you to discuss and agree on scope" },
      { label: "FINALIZED", desc: "Creator locks the price — you get notified to pay" },
      { label: "PAID", desc: "Pay advance within 48 hrs or booking auto-expires" },
    ],
  },
  {
    icon: "🏛️",
    title: "Space Booking",
    subtitle: "Instant confirmation",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    flow: [
      { label: "SELECT DATE", desc: "Pick a date from the Space's availability calendar" },
      { label: "PICK SLOT", desc: "Choose hourly, half-day, full day, or multi-day" },
      { label: "5-MIN HOLD", desc: "Slot is held while you complete payment" },
      { label: "CONFIRMED", desc: "Pay advance — slot locks instantly for everyone else" },
    ],
  },
];

const REVENUE_EXAMPLE = [
  { label: "Total Booking Value", value: "₹2,000", highlight: false },
  { label: "Advance Paid on App (50%)", value: "₹1,000", highlight: false },
  { label: "Platform Commission (10% of advance)", value: "₹100", highlight: false },
  { label: "Creator Payout via Bank Transfer", value: "₹900", highlight: false },
  { label: "Balance Paid Directly — Cash or UPI", value: "₹1,000", highlight: false },
  { label: "Creator Earns Total", value: "₹1,900", highlight: true },
];

const CONFLICT_SCENARIOS = [
  {
    icon: "🚫",
    scenario: "Creator No-Show",
    action: "OTP is never entered. Advance is returned to you within T+2 business days. Platform retains its 10% commission.",
  },
  {
    icon: "🏚️",
    scenario: "Space No-Show",
    action: "Full refund to you. Platform waives its commission entirely — no questions asked.",
  },
  {
    icon: "📅",
    scenario: "5+ Days Before Event",
    action: "Either side cancels: full refund to you, no penalty on either side.",
  },
  {
    icon: "⏰",
    scenario: "Less Than 5 Days",
    action: "You no-show: advance goes to Creator or Space. They cancel on you: full refund, they are penalised.",
  },
  {
    icon: "🔧",
    scenario: "Gear Damage at Space",
    action: "Zero liability for CultureJeevan. Any damage is a direct matter between you and the Space.",
  },
  {
    icon: "🔄",
    scenario: "Rescheduling",
    action: "No rescheduling on the platform. Cancellation only. Any rearrangement is between you and the Creator or Space directly.",
  },
];

const FAQS = [
  {
    q: "What can I do on CultureJeevan right now?",
    a: "Listings are live — browse Creators, Cafés, Studios, and Equipment across Lucknow, Kanpur, and NCR. Check rates, visit their Instagram and YouTube, and know exactly who you want. Booking opens very soon.",
  },
  {
    q: "How does Creator booking work vs Space booking?",
    a: "Creator bookings are negotiation-based — you submit a proposal, the Creator calls you, you agree on details, they finalise the price, and you pay the advance. Space bookings are instant — pick a date, pick a slot, pay the advance. The slot locks in 5 minutes.",
  },
  {
    q: "What is the advance percentage?",
    a: "Each Creator and Space sets their own advance between 50% and 80%. It is clearly visible on their listing before you book. 100% upfront is never allowed on the platform.",
  },
  {
    q: "How does the OTP work on the day?",
    a: "When your booking is confirmed, the platform generates a 6-digit OTP for that booking. On the day, share it with the Creator or Space. They enter it on their dashboard — the advance releases to their account instantly.",
  },
  {
    q: "Can I pay the full amount on the app?",
    a: "No. The advance (50–80%) is paid through the platform to secure your slot. The remaining balance is settled directly with the Creator or Space via cash or UPI after the work is done. CultureJeevan never touches the balance.",
  },
  {
    q: "What if a Creator or Space asks me to bypass the platform?",
    a: "That is their choice and yours — CultureJeevan is a connector. But understand: bookings made outside the platform are not covered by any of our policies. No OTP protection, no refunds, no dispute process.",
  },
  {
    q: "What is CultureJeevan's commission?",
    a: "10% on every advance payment. That is the only money the platform touches. The balance between you and the Creator or Space is entirely off-platform and unrecorded.",
  },
  {
    q: "What about Equipment listings?",
    a: "Equipment is a directory only — no platform payment, no advance, no OTP, no commission. Contact the Equipment Owner directly. CultureJeevan has zero liability for Equipment transactions.",
  },
];

const OCCASIONS = [
  { icon: "💍", text: "Wedding Functions" },
  { icon: "🏢", text: "Corporate Events" },
  { icon: "🎓", text: "College Fests" },
  { icon: "📹", text: "Reel & Film Shoots" },
  { icon: "🎉", text: "Birthday Parties" },
  { icon: "☕", text: "Café Evenings" },
  { icon: "🎪", text: "Open Mics" },
  { icon: "📣", text: "Brand Campaigns" },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{
        backgroundColor: "#1C1410",
        padding: "5rem 2rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "#C4703A", opacity: 0.06, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "240px", height: "240px", borderRadius: "50%", backgroundColor: "#C4703A", opacity: 0.04, pointerEvents: "none" }} />

        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#C4703A", color: "#FAF7F2",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.35rem 1rem",
            borderRadius: "100px", marginBottom: "1.25rem",
          }}>
            Listings Live — Booking Coming Soon
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            How CultureJeevan Works
          </h1>
          <p style={{ fontSize: "1rem", color: "#9B7B60", lineHeight: 1.8, marginBottom: "0.75rem" }}>
            A transparent 3-phase system — discover, secure, close.
            Find the right Creator or Space, lock your slot with an advance,
            confirm arrival with a 6-digit OTP, and settle the rest directly.
            No grey areas. No surprises.
          </p>
          <p style={{ fontSize: "0.875rem", color: "#5C3D26", lineHeight: 1.7, marginBottom: "2rem", fontStyle: "italic" }}>
            Phasna Nahi, Udna Hai.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/creators" style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
            }}>
              Browse Creators →
            </Link>
            <Link href="/spaces" style={{
              backgroundColor: "transparent", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", border: "1.5px solid #3D2918",
            }}>
              Explore Spaces
            </Link>
          </div>
        </div>
      </div>

      {/* ── Live Now Banner ── */}
      <div style={{
        backgroundColor: "#E8F5F2",
        borderTop: "1px solid #C0E0DA",
        borderBottom: "1px solid #C0E0DA",
        padding: "1.1rem 2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.875rem", color: "#2E8B7A", fontWeight: 600, lineHeight: 1.6 }}>
          ✓ &nbsp;Creators, Spaces &amp; Equipment listings are live across Lucknow, Kanpur &amp; NCR — browse and shortlist today. Booking opens very soon.
        </p>
      </div>

      {/* ── Phase Overview Pills ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem 0" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}
          className="phase-label-grid"
        >
          {PHASES.map((p) => (
            <div key={p.phase} style={{
              backgroundColor: p.bg, border: `1.5px solid ${p.border}`,
              borderRadius: "14px", padding: "1rem 1.25rem",
              display: "flex", alignItems: "center", gap: "0.75rem",
            }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: p.color, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: p.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.phase}</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1410" }}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Steps per phase */}
        {PHASES.map((phase, pi) => (
          <div key={phase.phase} style={{ marginBottom: pi < PHASES.length - 1 ? "4rem" : "5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <div style={{
                backgroundColor: phase.color, color: "#FAF7F2",
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "0.3rem 0.875rem", borderRadius: "100px", flexShrink: 0,
              }}>
                {phase.phase}: {phase.label}
              </div>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
              {phase.status === "live" ? (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#2E8B7A",
                  backgroundColor: "#E8F5F2", border: "1px solid #C0E0DA",
                  padding: "0.2rem 0.65rem", borderRadius: "100px", flexShrink: 0,
                }}>Live Now</span>
              ) : (
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#C4703A",
                  backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8",
                  padding: "0.2rem 0.65rem", borderRadius: "100px", flexShrink: 0,
                }}>Coming Soon</span>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }} className="steps-grid">
              {phase.steps.map((step) => (
                <div key={step.number} style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${phase.border}`,
                  borderRadius: "18px", padding: "1.5rem",
                  position: "relative", overflow: "hidden",
                }}>
                  <span style={{
                    position: "absolute", top: "0.75rem", right: "1rem",
                    fontSize: "3.5rem", fontFamily: "var(--font-playfair)",
                    fontWeight: 900, color: phase.bg,
                    lineHeight: 1, userSelect: "none",
                  }}>
                    {step.number}
                  </span>
                  <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>
                    {step.icon}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1rem", fontWeight: 800,
                    color: "#1C1410", marginBottom: "0.5rem", lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.75 }}>
                    {step.desc}
                  </p>
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: "3px", backgroundColor: phase.color, opacity: 0.4,
                  }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Creator vs Space Booking Flow ── */}
      <div style={{ backgroundColor: "#F5EFE7", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{
              display: "inline-block", backgroundColor: "#FAF7F2", color: "#C4703A",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "0.35rem 1rem",
              borderRadius: "100px", marginBottom: "1rem", border: "1px solid #E8DED0",
            }}>
              Two Booking Types
            </span>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900, color: "#1C1410",
              letterSpacing: "-0.02em", marginBottom: "0.75rem",
            }}>
              Creators vs Spaces — Different Flows
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6B5240", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
              Creators are negotiation-based. Spaces are instant. Both use the same advance + OTP payment system.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="booking-type-grid">
            {BOOKING_TYPES.map((type) => (
              <div key={type.title} style={{
                backgroundColor: "#FFFFFF",
                border: `1.5px solid ${type.border}`,
                borderRadius: "20px", padding: "2rem",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{type.icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#1C1410" }}>{type.title}</p>
                    <p style={{ fontSize: "0.75rem", fontWeight: 700, color: type.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{type.subtitle}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {type.flow.map((step, si) => (
                    <div key={si} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <div style={{
                        backgroundColor: type.bg, border: `1px solid ${type.border}`,
                        borderRadius: "6px", padding: "0.2rem 0.5rem",
                        fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.06em",
                        color: type.color, flexShrink: 0, marginTop: "2px",
                        whiteSpace: "nowrap",
                      }}>
                        {step.label}
                      </div>
                      <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.6 }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Occasions ── */}
      <div style={{ padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#F5EFE7", color: "#C4703A",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.35rem 1rem",
            borderRadius: "100px", marginBottom: "1rem", border: "1px solid #E8DED0",
          }}>
            Every Occasion
          </span>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 900, color: "#1C1410",
            letterSpacing: "-0.02em", marginBottom: "2rem",
          }}>
            One Platform. Any Creative Need.
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", justifyContent: "center" }}>
            {OCCASIONS.map((o, i) => (
              <div key={i} style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "100px", padding: "0.575rem 1.25rem",
                display: "flex", alignItems: "center", gap: "0.5rem",
              }}>
                <span style={{ fontSize: "1rem" }}>{o.icon}</span>
                <span style={{ fontSize: "0.875rem", color: "#1C1410", fontWeight: 600 }}>{o.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Revenue Breakdown ── */}
      <div style={{ backgroundColor: "#1C1410", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{
              display: "inline-block", backgroundColor: "#2C1F18", color: "#C4703A",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "0.35rem 1rem",
              borderRadius: "100px", marginBottom: "1rem", border: "1px solid #3D2918",
            }}>
              Example Calculation
            </span>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900, color: "#FAF7F2", letterSpacing: "-0.02em",
            }}>
              Where Does the Money Go?
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Full transparency on how a ₹2,000 booking is split.
            </p>
          </div>

          <div style={{ backgroundColor: "#241810", border: "1px solid #3D2918", borderRadius: "20px", overflow: "hidden" }}>
            {REVENUE_EXAMPLE.map((row, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1rem 1.5rem",
                borderBottom: i < REVENUE_EXAMPLE.length - 1 ? "1px solid #2C1F18" : "none",
                backgroundColor: row.highlight ? "#C4703A" : "transparent",
              }}>
                <span style={{ fontSize: "0.875rem", color: row.highlight ? "#FAF7F2" : "#9B7B60", fontWeight: row.highlight ? 700 : 400 }}>
                  {row.label}
                </span>
                <span style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: row.highlight ? "1.25rem" : "1rem",
                  fontWeight: 800,
                  color: row.highlight ? "#FAF7F2" : "#C4703A",
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.78rem", color: "#5C4030", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
            * 10% commission on advance only. Balance is paid directly — the platform never sees it.
          </p>
        </div>
      </div>

      {/* ── Conflict Resolution ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#F5EFE7", color: "#C4703A",
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.35rem 1rem",
            borderRadius: "100px", marginBottom: "1rem", border: "1px solid #E8DED0",
          }}>
            Conflict Resolution
          </span>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 900, color: "#1C1410",
            letterSpacing: "-0.02em", marginBottom: "0.75rem",
          }}>
            Every Edge Case, Documented.
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6B5240", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            No grey areas. No disputes left to chance — but only for bookings made on the platform.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {CONFLICT_SCENARIOS.map((s, i) => (
            <div key={i} style={{
              backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
              borderRadius: "16px", padding: "1.5rem",
            }}>
              <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>{s.icon}</span>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>
                {s.scenario}
              </p>
              <p style={{ fontSize: "0.825rem", color: "#6B5240", lineHeight: 1.7 }}>{s.action}</p>
            </div>
          ))}
        </div>

        {/* Connector disclaimer */}
        <div style={{
          marginTop: "2.5rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8",
          borderRadius: "14px", padding: "1.25rem 1.5rem",
          display: "flex", gap: "1rem", alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>⚡</span>
          <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.75 }}>
            <strong style={{ color: "#1C1410" }}>CultureJeevan is a connector platform.</strong>{" "}
            Like a telecom operator that connects two callers — the platform is not responsible for what is agreed, said, or done between you and the Creator or Space. Price disputes, delivery disputes, and on-site matters are entirely between the two parties. Platform protection applies only to bookings and payments made through the app.
          </p>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ backgroundColor: "#F5EFE7", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900, color: "#1C1410",
              letterSpacing: "-0.02em", marginBottom: "0.75rem",
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6B5240", lineHeight: 1.7 }}>
              Everything you need to know before your first booking.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${openFaq === i ? "#C4703A" : "#E8DED0"}`,
                  borderRadius: "14px", overflow: "hidden", cursor: "pointer",
                }}
              >
                <div style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
                }}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 800, color: "#1C1410", lineHeight: 1.4 }}>
                    {faq.q}
                  </p>
                  <span style={{
                    color: "#C4703A", fontSize: "1.2rem", flexShrink: 0, fontWeight: 700,
                    display: "inline-block",
                    transform: openFaq === i ? "rotate(45deg)" : "none",
                    transition: "transform 0.2s",
                  }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px solid #F5EFE7" }}>
                    <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ backgroundColor: "#1C1410", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{
            fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.15em",
            textTransform: "uppercase", color: "#5C3D26", marginBottom: "1rem",
          }}>
            Lucknow · Kanpur · NCR
          </p>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Start Exploring Today.
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.8, marginBottom: "0.5rem" }}>
            Listings are live. Browse Creators and Spaces now — know exactly
            who you want the moment booking opens.
          </p>
          <p style={{ fontSize: "0.85rem", color: "#5C3D26", lineHeight: 1.7, marginBottom: "2rem", fontStyle: "italic" }}>
            Phasna Nahi, Udna Hai.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/creators" style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.875rem 2rem", borderRadius: "10px",
              fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
            }}>
              Browse Creators →
            </Link>
            <Link href="/spaces" style={{
              backgroundColor: "transparent", color: "#FAF7F2",
              padding: "0.875rem 2rem", borderRadius: "10px",
              fontSize: "0.95rem", fontWeight: 600,
              textDecoration: "none", border: "1.5px solid #3D2918",
            }}>
              Explore Spaces
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .phase-label-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .booking-type-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}