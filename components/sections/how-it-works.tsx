"use client";

import Link from "next/link";

// ─── Phase Data ───────────────────────────────────────────────────────────────

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
        title: "Find Your Studio",
        desc: "Browse verified photography, film, podcast, rooftop, and dance studios across India. Filter by city, type, price, and rating.",
      },
      {
        number: "02",
        icon: "🎨",
        title: "Customise Your Booking",
        desc: "Pick your date, time slots, and booking type. Optionally add a Skill Worker — a vetted photographer or editor — to your session.",
      },
      {
        number: "03",
        icon: "💳",
        title: "Pay 50% Advance",
        desc: "Secure your slot by paying 50% of the total rent on the platform. This advance is non-refundable in case of a no-show.",
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
        title: "Reach the Studio",
        desc: "Head to your booked studio at the confirmed time. The studio manager will be ready for your session.",
      },
      {
        number: "05",
        icon: "📲",
        title: "Scan the QR Code",
        desc: "Scan the static QR code at the studio desk. This instantly marks your booking as Active in our system — no check-in hassle.",
      },
      {
        number: "06",
        icon: "💸",
        title: "Studio Gets Paid",
        desc: "The moment you scan, the studio's share of the 50% advance is released. They receive their bank transfer within T+2 days.",
      },
    ],
  },
  {
    phase: "Phase 3",
    label: "Shoot & Close",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    steps: [
      {
        number: "07",
        icon: "🎬",
        title: "Shoot Happens",
        desc: "The studio is yours. Create freely. CultureJeevan is not liable for gear damage or on-site disputes — handled directly between you and the studio.",
      },
      {
        number: "08",
        icon: "🤝",
        title: "Pay the Remaining 50%",
        desc: "After your shoot, pay the remaining 50% balance directly to the Studio Manager via Cash or UPI. Simple, transparent, no surprises.",
      },
      {
        number: "09",
        icon: "✅",
        title: "Session Closed",
        desc: "After your shoot, the Studio Manager clicks Shoot Complete on their dashboard to close the session. Your booking is marked done and a receipt is generated.",
      },
    ],
  },
];

const REVENUE_EXAMPLE = [
  { label: "Total Studio Rent", value: "₹2,000", highlight: false },
  { label: "You Pay on App (50% Advance)", value: "₹1,000", highlight: false },
  { label: "CultureJeevan Commission (15%)", value: "₹300", highlight: false },
  { label: "Studio Payout via T+2 Transfer", value: "₹700", highlight: false },
  { label: "You Pay at Studio (Balance)", value: "₹1,000", highlight: false },
  { label: "Studio Earns Total", value: "₹1,700", highlight: true },
];

const CONFLICT_SCENARIOS = [
  {
    icon: "🚫",
    scenario: "Creator No-Show",
    action: "50% advance is NOT refunded. CultureJeevan takes its commission; studio receives a Kill Fee share.",
  },
  {
    icon: "🏚️",
    scenario: "Studio No-Show",
    action: "100% refund to the creator. CultureJeevan waives its commission to protect your trust.",
  },
  {
    icon: "⚠️",
    scenario: "Bypass Attempt",
    action: "If a studio asks you to cancel and pay 100% cash directly: 30-day suspension. 2nd offense = permanent ban.",
  },
  {
    icon: "🔧",
    scenario: "Gear Damage",
    action: "Zero liability for CultureJeevan. This is a direct legal matter between the creator and the studio.",
  },
];

const FAQS = [
  {
    q: "Is the 50% advance always non-refundable?",
    a: "Only if you (the creator) are a no-show. If the studio fails to show up, you get a 100% refund — no questions asked.",
  },
  {
    q: "How does the studio get paid?",
    a: "Once you scan the QR code at the studio, their share of the advance is released. Bank transfer arrives within T+2 business days.",
  },
  {
    q: "What if I want to add a photographer to my session?",
    a: "You can add a vetted Skill Worker (photographer or editor) while booking. Their fee is included in your platform payment.",
  },
  {
    q: "Can I pay the full amount on the app?",
    a: "Currently no — 50% is paid on the platform to secure your slot, and the remaining 50% is settled directly with the studio manager (Cash or UPI) after your shoot.",
  },
  {
    q: "What happens if a studio tries to make me bypass the platform?",
    a: "Report it immediately. The studio faces a 30-day suspension on first offense and a permanent ban on the second. The platform exists to protect you.",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        style={{
          backgroundColor: "#1C1410",
          padding: "5rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative circles */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          backgroundColor: "#C4703A", opacity: 0.06,
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", left: "-40px",
          width: "240px", height: "240px", borderRadius: "50%",
          backgroundColor: "#C4703A", opacity: 0.04,
        }} />

        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
          <span style={{
            display: "inline-block",
            backgroundColor: "#C4703A",
            color: "#FAF7F2",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.35rem 1rem",
            borderRadius: "100px",
            marginBottom: "1.25rem",
          }}>
            Scan-to-Shoot Flow
          </span>

          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900,
            color: "#FAF7F2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}>
            How CultureJeevan Works
          </h1>

          <p style={{
            fontSize: "1rem",
            color: "#9B7B60",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            A transparent 3-phase system — from discovery to shoot completion.
            You pay 50% to book, scan a QR when you arrive, and settle the rest directly at the studio.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/studios"
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                padding: "0.75rem 1.75rem",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Studios →
            </Link>
            <Link
              href="/list-your-studio"
              style={{
                backgroundColor: "transparent",
                color: "#FAF7F2",
                padding: "0.75rem 1.75rem",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid #3D2918",
              }}
            >
              List Your Studio
            </Link>
          </div>
        </div>
      </div>

      {/* ── Phase Timeline ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>

        {/* Phase labels row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "4rem",
        }}
          className="phase-label-grid"
        >
          {PHASES.map((p) => (
            <div
              key={p.phase}
              style={{
                backgroundColor: p.bg,
                border: `1.5px solid ${p.border}`,
                borderRadius: "14px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div style={{
                width: "10px", height: "10px", borderRadius: "50%",
                backgroundColor: p.color, flexShrink: 0,
              }} />
              <div>
                <p style={{ fontSize: "0.68rem", fontWeight: 700, color: p.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{p.phase}</p>
                <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1C1410" }}>{p.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Steps */}
        {PHASES.map((phase, pi) => (
          <div key={phase.phase} style={{ marginBottom: pi < PHASES.length - 1 ? "4rem" : 0 }}>
            {/* Phase divider */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}>
              <div style={{
                backgroundColor: phase.color,
                color: "#FAF7F2",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.3rem 0.875rem",
                borderRadius: "100px",
                flexShrink: 0,
              }}>
                {phase.phase}: {phase.label}
              </div>
              <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.25rem",
            }}
              className="steps-grid"
            >
              {phase.steps.map((step) => (
                <div
                  key={step.number}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${phase.border}`,
                    borderRadius: "18px",
                    padding: "1.5rem",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Big step number watermark */}
                  <span style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "1rem",
                    fontSize: "3.5rem",
                    fontFamily: "var(--font-playfair)",
                    fontWeight: 900,
                    color: phase.bg,
                    lineHeight: 1,
                    userSelect: "none",
                  }}>
                    {step.number}
                  </span>

                  <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>
                    {step.icon}
                  </span>

                  <h3 style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "#1C1410",
                    marginBottom: "0.5rem",
                    lineHeight: 1.3,
                  }}>
                    {step.title}
                  </h3>

                  <p style={{
                    fontSize: "0.845rem",
                    color: "#6B5240",
                    lineHeight: 1.75,
                  }}>
                    {step.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    height: "3px",
                    backgroundColor: phase.color,
                    opacity: 0.35,
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
              display: "inline-block",
              backgroundColor: "#2C1F18",
              color: "#C4703A",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.35rem 1rem",
              borderRadius: "100px",
              marginBottom: "1rem",
              border: "1px solid #3D2918",
            }}>
              Example Calculation
            </span>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900,
              color: "#FAF7F2",
              letterSpacing: "-0.02em",
            }}>
              Where Does the Money Go?
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginTop: "0.75rem", lineHeight: 1.7 }}>
              Full transparency on how a ₹2,000 booking is split between you, the studio, and the platform.
            </p>
          </div>

          <div style={{
            backgroundColor: "#241810",
            border: "1px solid #3D2918",
            borderRadius: "20px",
            overflow: "hidden",
          }}>
            {REVENUE_EXAMPLE.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "1rem 1.5rem",
                  borderBottom: i < REVENUE_EXAMPLE.length - 1 ? "1px solid #2C1F18" : "none",
                  backgroundColor: row.highlight ? "#C4703A" : "transparent",
                }}
              >
                <span style={{
                  fontSize: "0.875rem",
                  color: row.highlight ? "#FAF7F2" : "#9B7B60",
                  fontWeight: row.highlight ? 700 : 400,
                }}>
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

          <p style={{
            fontSize: "0.78rem",
            color: "#5C4030",
            textAlign: "center",
            marginTop: "1rem",
            lineHeight: 1.6,
          }}>
            * 15% platform commission applied on total booking value. Studio earns ₹700 via T+2 bank transfer + ₹1,000 cash/UPI at studio.
          </p>
        </div>
      </div>

      {/* ── Conflict Resolution ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block",
            backgroundColor: "#F5EFE7",
            color: "#C4703A",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "0.35rem 1rem",
            borderRadius: "100px",
            marginBottom: "1rem",
            border: "1px solid #E8DED0",
          }}>
            Conflict Resolution
          </span>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 900,
            color: "#1C1410",
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem",
          }}>
            We've Got You Covered
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#6B5240", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Every edge case has a clear, documented resolution. No grey areas.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
        }}>
          {CONFLICT_SCENARIOS.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DED0",
                borderRadius: "16px",
                padding: "1.5rem",
              }}
            >
              <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>
                {s.icon}
              </span>
              <p style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.95rem",
                fontWeight: 800,
                color: "#1C1410",
                marginBottom: "0.5rem",
              }}>
                {s.scenario}
              </p>
              <p style={{ fontSize: "0.825rem", color: "#6B5240", lineHeight: 1.7 }}>
                {s.action}
              </p>
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
              fontWeight: 900,
              color: "#1C1410",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#6B5240", lineHeight: 1.7 }}>
              Everything creators and studios need to know before booking.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8DED0",
                  borderRadius: "14px",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "0.95rem",
                  fontWeight: 800,
                  color: "#1C1410",
                  marginBottom: "0.5rem",
                }}>
                  {faq.q}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        backgroundColor: "#1C1410",
        padding: "5rem 2rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900,
            color: "#FAF7F2",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            Ready to Scan & Shoot?
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "#9B7B60",
            lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            Find your perfect studio, pay 50% to lock it in, and walk in with confidence.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/studios"
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                padding: "0.875rem 2rem",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Find a Studio →
            </Link>
            <Link
              href="/list-your-studio"
              style={{
                backgroundColor: "transparent",
                color: "#FAF7F2",
                padding: "0.875rem 2rem",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid #3D2918",
              }}
            >
              List Your Studio
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