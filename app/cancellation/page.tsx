import Link from "next/link";

const SCENARIOS = [
  {
    icon: "🚫",
    title: "Creator No-Show",
    tag: "Full Refund",
    tagColor: "#2E8B7A",
    tagBg: "#E8F5F2",
    tagBorder: "#C0E0DA",
    detail:
      "The OTP is never entered. Your advance is returned to you within T+2 business days. The platform retains its 10% commission since the booking was confirmed.",
  },
  {
    icon: "🏚️",
    title: "Space No-Show",
    tag: "Full Refund + Commission Waived",
    tagColor: "#2E8B7A",
    tagBg: "#E8F5F2",
    tagBorder: "#C0E0DA",
    detail:
      "Full advance refund to you. The platform waives its commission entirely — no questions asked. This is the only scenario where the platform absorbs its own commission.",
  },
  {
    icon: "📅",
    title: "Cancellation 5+ Days Before Event",
    tag: "Full Refund — No Penalty",
    tagColor: "#2E8B7A",
    tagBg: "#E8F5F2",
    tagBorder: "#C0E0DA",
    detail:
      "Either side cancels with 5 or more days to go: full advance refund to you, no penalty on either party. The platform commission is refunded as well.",
  },
  {
    icon: "⏰",
    title: "Cancellation Under 5 Days — You Cancel",
    tag: "Advance Forfeited",
    tagColor: "#9B3A2A",
    tagBg: "#FDF0E6",
    tagBorder: "#F0DCC8",
    detail:
      "If you cancel within 5 days of the event, the full advance goes to the Creator or Space. The platform commission is not returned either. Short-notice cancellations hurt Creators and Spaces who turned away other work.",
  },
  {
    icon: "❌",
    title: "Cancellation Under 5 Days — They Cancel on You",
    tag: "Full Refund + They Are Penalised",
    tagColor: "#2E8B7A",
    tagBg: "#E8F5F2",
    tagBorder: "#C0E0DA",
    detail:
      "If a Creator or Space cancels on you within 5 days, you receive a full refund of your advance including the platform commission. The Creator or Space is flagged and may be suspended from the platform.",
  },
  {
    icon: "🔧",
    title: "Gear Damage at a Space",
    tag: "Platform Not Liable",
    tagColor: "#7C5CBF",
    tagBg: "#F0EBF8",
    tagBorder: "#D9CCF0",
    detail:
      "Any equipment or property damage during a Space booking is a direct matter between you and the Space owner. CultureJeevan has zero liability. Always inspect the Space before beginning your session.",
  },
  {
    icon: "🔄",
    title: "Rescheduling",
    tag: "Not Available on Platform",
    tagColor: "#7C5CBF",
    tagBg: "#F0EBF8",
    tagBorder: "#D9CCF0",
    detail:
      "There is no rescheduling feature on the platform. Cancellation only. Any rearrangement of dates must be handled directly between you and the Creator or Space — it will not be tracked or protected by CultureJeevan.",
  },
  {
    icon: "💳",
    title: "Payment Expiry — Creator Bookings",
    tag: "Auto-Cancelled",
    tagColor: "#9B3A2A",
    tagBg: "#FDF0E6",
    tagBorder: "#F0DCC8",
    detail:
      "Once a Creator finalises your booking, you have 48 hours to pay the advance. If payment is not received within this window, the booking is automatically cancelled and the slot reopens. No penalty — but you must re-submit your proposal.",
  },
];

export default function CancellationPolicy() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{
        backgroundColor: "#1C1410",
        padding: "5rem 2rem 4rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#C4703A", color: "#FAF7F2",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.3rem 1rem",
            borderRadius: "100px", marginBottom: "1.25rem",
          }}>
            Cancellation Policy
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Every Edge Case, Documented.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.8 }}>
            No grey areas. No disputes left to chance.
            This policy applies only to bookings and payments made through the CultureJeevan platform.
          </p>
        </div>
      </div>

      {/* Live Now Notice */}
      <div style={{
        backgroundColor: "#E8F5F2",
        borderBottom: "1px solid #C0E0DA",
        padding: "1rem 2rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "0.84rem", color: "#2E8B7A", fontWeight: 600 }}>
          ✓ &nbsp;This policy is effective from the day booking goes live on CultureJeevan.
        </p>
      </div>

      {/* Scenarios */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {SCENARIOS.map((s, i) => (
            <div key={i} style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E8DED0",
              borderRadius: "16px", padding: "1.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "2px" }}>{s.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                    <p style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1rem", fontWeight: 800, color: "#1C1410",
                    }}>
                      {s.title}
                    </p>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.07em",
                      textTransform: "uppercase", color: s.tagColor,
                      backgroundColor: s.tagBg, border: `1px solid ${s.tagBorder}`,
                      padding: "0.2rem 0.65rem", borderRadius: "100px",
                    }}>
                      {s.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75 }}>
                    {s.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connector disclaimer */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 2rem 2rem" }}>
        <div style={{
          backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8",
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

      {/* Refund Timeline */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{
          backgroundColor: "#1C1410",
          borderRadius: "20px", padding: "2rem 2.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.1rem", fontWeight: 800, color: "#FAF7F2",
            marginBottom: "1.25rem",
          }}>
            Refund Timeline
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            {[
              { label: "Razorpay to Bank Account", time: "T+2 business days" },
              { label: "Razorpay to UPI", time: "T+1 business day" },
              { label: "Razorpay to Wallet", time: "Instant to 24 hours" },
            ].map((r, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderBottom: i < 2 ? "1px solid #2C1F18" : "none",
                paddingBottom: i < 2 ? "0.875rem" : "0",
              }}>
                <span style={{ fontSize: "0.875rem", color: "#9B7B60" }}>{r.label}</span>
                <span style={{ fontSize: "0.875rem", color: "#C4703A", fontWeight: 700 }}>{r.time}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#5C4030", marginTop: "1rem", lineHeight: 1.6 }}>
            * Timelines are from the date of refund initiation by CultureJeevan, subject to Razorpay processing.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <p style={{ fontSize: "0.85rem", color: "#9B7B60", marginBottom: "1rem" }}>
            Have a dispute or a question about a refund?
          </p>
          <a href="mailto:cosmoindiaprakashan@gmail.com" style={{
            display: "inline-block",
            backgroundColor: "#C4703A", color: "#FAF7F2",
            padding: "0.75rem 1.75rem", borderRadius: "10px",
            fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
          }}>
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}