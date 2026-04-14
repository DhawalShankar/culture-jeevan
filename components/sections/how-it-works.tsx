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
    steps: [
      {
        number: "01",
        icon: "🔍",
        title: "Find What You Need",
        desc: "Browse verified Creators, Studios, and Cafés in your city. Filter by category, price, and rating. Every listing shows the Creator's real rate, their advance percentage, and links to their actual work — Instagram, YouTube, website.",
      },
      {
        number: "02",
        icon: "📅",
        title: "Pick Your Slot",
        desc: "Select your date and time from available slots — hourly, half-day, full-day, or multi-day. The rate and advance percentage are visible upfront. No DMs, no negotiations, no surprises.",
      },
      {
        number: "03",
        icon: "✉️",
        title: "Send a Request",
        desc: "Send your booking request with full event details. The Creator reviews and accepts, rejects, or sends a custom quote. Spaces like Cafés and Studios confirm instantly — no waiting required.",
      },
    ],
  },
  {
    phase: "Phase 2",
    label: "Secure",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    steps: [
      {
        number: "04",
        icon: "💳",
        title: "Pay the Advance",
        desc: "Once accepted, pay 50–80% advance through the app. The money is held safely by CultureJeevan — not released until you confirm arrival on the day. Your slot is locked. Nobody can ghost you now.",
      },
      {
        number: "05",
        icon: "📍",
        title: "Show Up",
        desc: "Arrive at the confirmed time. Everything is pre-agreed — rate, slot, expectations. No last-minute calls, no follow-up needed. Just walk in.",
      },
      {
        number: "06",
        icon: "🔢",
        title: "Share Your OTP",
        desc: "On the day, your booking has a 6-digit OTP. Share it with the Creator or Space on arrival. They enter it into their dashboard — the advance releases to their account instantly.",
      },
    ],
  },
  {
    phase: "Phase 3",
    label: "Close",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    steps: [
      {
        number: "07",
        icon: "🎬",
        title: "Work Happens",
        desc: "The shoot, session, or performance is yours. CultureJeevan is not liable for on-site disputes — those are handled directly between you and the Creator or Space.",
      },
      {
        number: "08",
        icon: "🤝",
        title: "Pay the Balance",
        desc: "After the work is done, pay the remaining amount directly — Cash or UPI. This goes straight to the Creator or Space. CultureJeevan does not touch it.",
      },
      {
        number: "09",
        icon: "⭐",
        title: "Review & Close",
        desc: "Both sides leave a rating and written review. Public and permanent. This is how trust is built on the platform — no manager, no certificate needed.",
      },
    ],
  },
];

const REVENUE_EXAMPLE = [
  { label: "Total Booking Value", value: "₹2,000", highlight: false },
  { label: "Advance Paid on App (50%)", value: "₹1,000", highlight: false },
  { label: "CultureJeevan Commission (10%)", value: "₹100", highlight: false },
  { label: "Creator Payout via Bank Transfer", value: "₹900", highlight: false },
  { label: "Balance Paid Directly (Cash/UPI)", value: "₹1,000", highlight: false },
  { label: "Creator Earns Total", value: "₹1,900", highlight: true },
];

const CONFLICT_SCENARIOS = [
  {
    icon: "🚫",
    scenario: "Creator No-Show",
    action: "OTP is never entered. Advance is returned to the customer within T+2 business days. CultureJeevan retains its 10% commission.",
  },
  {
    icon: "🏚️",
    scenario: "Space No-Show",
    action: "100% refund to the customer. CultureJeevan waives its commission entirely to protect trust — no questions asked.",
  },
  {
    icon: "🔧",
    scenario: "Gear Damage at Space",
    action: "Zero liability for CultureJeevan. Any damage is a direct legal matter between the customer and the Space.",
  },
];

const FAQS = [
  {
    q: "What can I do on CultureJeevan right now?",
    a: "Listings are live — browse Creators, Cafés, Studios, and Equipment across Lucknow, Kanpur, and NCR. Check rates, visit their Instagram and YouTube, and know exactly who you want before booking goes live.",
  },
  {
    q: "Is the advance always non-refundable?",
    a: "Only if you (the customer) are a no-show. If the Creator or Space fails to show up, you get a 100% refund — no questions asked. Cancellations 5+ days before the event are also fully refunded.",
  },
  {
    q: "How does the advance percentage work?",
    a: "Each Creator and Space sets their own advance percentage between 50% and 80%. This is clearly visible on their listing before you book. 100% upfront is never allowed on the platform.",
  },
  {
    q: "How does the OTP arrival confirmation work?",
    a: "When your booking is confirmed, the platform generates a 6-digit OTP for that booking. On the day, you share this OTP with the Creator or Space. They enter it — the advance releases to their account. Simple, no scanning, works on any device.",
  },
  {
    q: "Can I pay the full amount on the app?",
    a: "No — the advance (50–80%) is paid on the platform to secure your slot. The remaining balance is settled directly with the Creator or Space via Cash or UPI after the work is done.",
  },
  {
    q: "What if a Creator or Space tries to make me bypass the platform?",
    a: "Report it immediately. 30-day suspension on first offense, permanent ban on the second. Bookings outside CultureJeevan are not protected by any of our policies.",
  },
  {
    q: "What is CultureJeevan's commission?",
    a: "10% on every advance payment made through the app. This is the only money the platform touches. The balance payment between you and the Creator or Space is entirely off-platform.",
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
            Listings Are Live — Booking Coming Soon
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
            A transparent 3-phase system — from discovery to completion.
            Find the right Creator or Space, secure your slot with an advance,
            confirm arrival with a 6-digit OTP, and settle the rest directly.
            No grey areas. No surprises. No middlemen.
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

      {/* ── Phase Timeline ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>

        {/* Phase overview pills */}
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
          <div key={phase.phase} style={{ marginBottom: pi < PHASES.length - 1 ? "4rem" : 0 }}>
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
              {pi === 0 ? (
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

      {/* ── Occasions ── */}
      <div style={{ backgroundColor: "#F5EFE7", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#FAF7F2", color: "#C4703A",
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
            * 10% commission on advance payment only. Balance paid directly — CultureJeevan does not touch it.
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
            No grey areas. No disputes left to chance.
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
        }
      `}</style>
    </div>
  );
}