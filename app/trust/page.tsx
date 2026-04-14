import Link from "next/link";

const TRUST_PILLARS = [
  {
    icon: "🔒",
    title: "Advance Escrow — Not Ghosted",
    color: "#C4703A",
    bg: "#FDF0E6",
    border: "#F0DCC8",
    body: "When you pay the advance, it is held by CultureJeevan — not released to the Creator or Space until you confirm arrival with your OTP. No one can take your money and disappear. Your slot is locked and your payment is protected until you show up.",
  },
  {
    icon: "🔢",
    title: "OTP Release System",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    body: "Every confirmed booking gets a unique 6-digit OTP. The advance only releases when you share this OTP on-site with the Creator or Space and they enter it on their dashboard. Until then, the money sits with the platform.",
  },
  {
    icon: "⭐",
    title: "Public, Permanent Reviews",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    body: "After every booking, both sides leave a public, permanent rating and written review. No editing, no deletion. This is how trust is built — one real booking at a time. Creators and Spaces with consistent low ratings are flagged for review.",
  },
  {
    icon: "✅",
    title: "Manual Listing Verification",
    color: "#C4703A",
    bg: "#FDF0E6",
    border: "#F0DCC8",
    body: "Every Creator, Studio, Café, and Equipment listing is manually reviewed before going live. We verify rates, advance percentages, social links, and cancellation policies. No fake listings, no inflated rates, no misleading information.",
  },
  {
    icon: "📋",
    title: "Pre-Agreed Terms",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    body: "Rate, slot, scope, advance percentage, and cancellation policy are all agreed and locked before any money moves. No last-minute renegotiations. No surprise charges. Everything is visible on the listing page before you book.",
  },
  {
    icon: "🚨",
    title: "Penalisation for Bad Actors",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    body: "Creators or Spaces who cancel on short notice, fail to show up, or consistently receive low reviews are flagged and may be suspended. Protecting the trust of genuine buyers is our top priority.",
  },
];

const NOT_COVERED = [
  "Content disputes between you and a Creator or Space",
  "On-site disagreements or verbal commitments made outside the platform",
  "Equipment or property damage during a booking",
  "Bookings or payments made outside of CultureJeevan",
  "Equipment listings — these are directory-only, no platform liability applies",
  "Work quality or creative output disputes",
];

export default function TrustAndSafety() {
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
            Trust &amp; Safety
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            Built on Transparency.
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.8 }}>
            Every feature on CultureJeevan exists to make creative bookings in India safer,
            fairer, and completely ghost-proof. Here&apos;s exactly how we protect you.
          </p>
        </div>
      </div>

      {/* Pillars */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#F5EFE7", color: "#C4703A",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.3rem 1rem",
            borderRadius: "100px", marginBottom: "1rem", border: "1px solid #E8DED0",
          }}>
            How We Protect You
          </span>
          <h2 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 900, color: "#1C1410",
            letterSpacing: "-0.02em",
          }}>
            Six Safety Pillars
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.25rem",
        }}>
          {TRUST_PILLARS.map((p, i) => (
            <div key={i} style={{
              backgroundColor: "#FFFFFF",
              border: `1px solid ${p.border}`,
              borderRadius: "18px", padding: "1.5rem",
              position: "relative", overflow: "hidden",
            }}>
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: "0.75rem" }}>{p.icon}</span>
              <p style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1rem", fontWeight: 800, color: "#1C1410",
                marginBottom: "0.5rem", lineHeight: 1.3,
              }}>
                {p.title}
              </p>
              <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.75 }}>
                {p.body}
              </p>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "3px", backgroundColor: p.color, opacity: 0.4,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* What Is NOT Covered */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{
          backgroundColor: "#1C1410",
          borderRadius: "20px", padding: "2rem 2.5rem",
        }}>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.1rem", fontWeight: 800, color: "#FAF7F2",
            marginBottom: "0.5rem",
          }}>
            What CultureJeevan Does NOT Cover
          </p>
          <p style={{ fontSize: "0.82rem", color: "#9B7B60", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            CultureJeevan is a connector platform, like a telecom operator. We are not responsible for what happens between two parties once a booking is made.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {NOT_COVERED.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: "0.75rem", alignItems: "flex-start",
                borderBottom: i < NOT_COVERED.length - 1 ? "1px solid #2C1F18" : "none",
                paddingBottom: i < NOT_COVERED.length - 1 ? "0.625rem" : "0",
              }}>
                <span style={{ color: "#5C3D26", fontSize: "0.9rem", flexShrink: 0, marginTop: "2px" }}>—</span>
                <p style={{ fontSize: "0.845rem", color: "#9B7B60", lineHeight: 1.7 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 2rem 5rem" }}>
        <div style={{
          backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8",
          borderRadius: "20px", padding: "2rem 2.5rem",
          textAlign: "center",
        }}>
          <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>🚩</span>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.1rem", fontWeight: 800, color: "#1C1410",
            marginBottom: "0.5rem",
          }}>
            Report a Safety Issue
          </p>
          <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            If a Creator or Space has behaved inappropriately, asked you to bypass the platform, or made you feel unsafe, email us immediately. All reports are reviewed within 24 hours.
          </p>
          <a href="mailto:cosmoindiaprakashan@gmail.com?subject=Safety Report — CultureJeevan" style={{
            display: "inline-block",
            backgroundColor: "#C4703A", color: "#FAF7F2",
            padding: "0.75rem 1.75rem", borderRadius: "10px",
            fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
          }}>
            Report an Issue →
          </a>
        </div>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/how-it-works" style={{
            fontSize: "0.875rem", color: "#9B7B60", textDecoration: "none",
          }}>
            ← Back to How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}