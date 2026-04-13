"use client";

import Link from "next/link";

const PHASES = [
  {
    phase: "Phase 1",
    label: "Booking",
    color: "#C4703A",
    bg: "#FDF0E6",
    border: "#F0DCC8",
    steps: [
      {
        number: "01",
        icon: "🔍",
        title: "Find What You Need",
        desc: "Browse verified Creators, Studios, and Cafés across India. Filter by city, category, price, and rating.",
      },
      {
        number: "02",
        icon: "📅",
        title: "Pick Your Slot",
        desc: "Select your date and time from available slots — hourly, half-day, full-day, or multi-day. The rate and advance percentage are visible upfront. No surprises.",
      },
      {
        number: "03",
        icon: "💳",
        title: "Pay 50–80% Advance",
        desc: "Secure your booking by paying the advance on the platform. Each Creator and Space sets their own advance percentage (50–80%). Non-refundable if you no-show.",
      },
    ],
  },
  {
    phase: "Phase 2",
    label: "Arrival",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    steps: [
      {
        number: "04",
        icon: "📍",
        title: "Show Up",
        desc: "Arrive at the booked Creator or Space at the confirmed time. Everything is pre-confirmed — no calls, no follow-up needed.",
      },
      {
        number: "05",
        icon: "📲",
        title: "Scan the QR Code",
        desc: "Scan the static QR code on arrival. This marks your booking as Active instantly — no paperwork, no check-in hassle.",
      },
      {
        number: "06",
        icon: "💸",
        title: "Creator Gets Paid",
        desc: "The moment you scan, the Creator or Space's share of the advance is released. Bank transfer arrives within T+2 business days.",
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
  { label: "Creator Payout via T+2 Transfer", value: "₹900", highlight: false },
  { label: "Balance Paid Directly (Cash/UPI)", value: "₹1,000", highlight: false },
  { label: "Creator Earns Total", value: "₹1,900", highlight: true },
];

const CONFLICT_SCENARIOS = [
  {
    icon: "🚫",
    scenario: "Creator No-Show",
    action: "Advance is NOT refunded. CultureJeevan takes its 10% commission. The QR is never scanned, booking auto-closes.",
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
    q: "Is the advance always non-refundable?",
    a: "Only if you (the customer) are a no-show. If the Creator or Space fails to show up, you get a 100% refund — no questions asked. Cancellations 5+ days before the event are also fully refunded.",
  },
  {
    q: "How does the advance percentage work?",
    a: "Each Creator and Space sets their own advance percentage between 50% and 80%. This is clearly visible on their listing before you book. 100% upfront is never allowed.",
  },
  {
    q: "How does the Creator or Space get paid?",
    a: "Once you scan the QR code on arrival, their share of the advance is released immediately. Bank transfer arrives within T+2 business days.",
  },
  {
    q: "Can I pay the full amount on the app?",
    a: "No — the advance (50–80%) is paid on the platform to secure your slot. The remaining balance is settled directly with the Creator or Space via Cash or UPI after the work is done.",
  },
  {
    q: "What if a Creator or Space tries to make me bypass the platform?",
    a: "Report it immediately. 30-day suspension on first offense, permanent ban on the second. Bookings outside CultureJeevan are not protected.",
  },
  {
    q: "What is CultureJeevan's commission?",
    a: "10% on every advance payment made through the app. This is the only money the platform touches. The balance payment between you and the Creator or Space is entirely off-platform.",
  },
];

export default function HowItWorks() {
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
            Scan-to-Book Flow
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            How CultureJeevan Works
          </h1>
          <p style={{ fontSize: "1rem", color: "#9B7B60", lineHeight: 1.8, marginBottom: "2rem" }}>
            A transparent 3-phase system — from discovery to completion.
            Pay 50–80% to book, scan a QR when you arrive, settle
            the rest directly. No grey areas. No surprises.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/creators" style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
            }}>
              Book a Creator →
            </Link>
            <Link href="/spaces" style={{
              backgroundColor: "transparent", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", border: "1.5px solid #3D2918",
            }}>
              Browse Spaces
            </Link>
          </div>
        </div>
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
              <div key={i} style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "14px", padding: "1.25rem 1.5rem",
              }}>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>
                  {faq.q}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ backgroundColor: "#1C1410", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Ready to Book?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.8, marginBottom: "2rem" }}>
            Find your Creator or Space, pay the advance to lock it in,
            and walk in with confidence. Every creative need — one platform.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/creators" style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.875rem 2rem", borderRadius: "10px",
              fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
            }}>
              Book a Creator →
            </Link>
            <Link href="/spaces" style={{
              backgroundColor: "transparent", color: "#FAF7F2",
              padding: "0.875rem 2rem", borderRadius: "10px",
              fontSize: "0.95rem", fontWeight: 600,
              textDecoration: "none", border: "1.5px solid #3D2918",
            }}>
              Browse Spaces
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