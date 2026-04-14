import Link from "next/link";

const HELP_SECTIONS = [
  {
    icon: "🔍",
    title: "Browsing & Listings",
    items: [
      {
        q: "What can I do on CultureJeevan right now?",
        a: "Listings are live — browse Creators, Cafés, Studios, and Equipment across Lucknow, Kanpur, and NCR. Check rates, visit their Instagram and YouTube, and know exactly who you want. Booking opens very soon.",
      },
      {
        q: "Are listings verified?",
        a: "Every listing on CultureJeevan is manually reviewed before going live. Rates, advance percentages, cancellation policies, and social links are pulled directly from the Creator or Space — no middlemen, no fluff.",
      },
      {
        q: "How do I shortlist a Creator or Space?",
        a: "Browse by category, city, price range, and rating. The listing page shows you everything — rate, advance percentage, slot types, and cancellation policy. Save your picks and compare before booking opens.",
      },
    ],
  },
  {
    icon: "📅",
    title: "Booking & Payment",
    items: [
      {
        q: "How does Creator booking work vs Space booking?",
        a: "Creator bookings are negotiation-based — you submit a proposal, the Creator calls you, you agree on details, they finalise the price, and you pay the advance. Space bookings are instant — pick a date, pick a slot, pay the advance. The slot locks in 5 minutes.",
      },
      {
        q: "What is the advance percentage?",
        a: "Each Creator and Space sets their own advance between 50% and 80%. It is clearly visible on their listing before you book. 100% upfront is never allowed on the platform.",
      },
      {
        q: "Can I pay the full amount on the app?",
        a: "No. The advance (50–80%) is paid through the platform to secure your slot. The remaining balance is settled directly with the Creator or Space via cash or UPI after the work is done. CultureJeevan never touches the balance.",
      },
      {
        q: "What is CultureJeevan's commission?",
        a: "10% on every advance payment. That is the only money the platform touches. The balance between you and the Creator or Space is entirely off-platform and unrecorded.",
      },
    ],
  },
  {
    icon: "🔢",
    title: "OTP & Arrival",
    items: [
      {
        q: "How does the OTP work on the day?",
        a: "When your booking is confirmed, the platform generates a 6-digit OTP for that booking. On the day, share it with the Creator or Space. They enter it on their dashboard — the advance releases to their account instantly.",
      },
      {
        q: "What if I forget my OTP?",
        a: "Log in to your CultureJeevan account and go to My Bookings. Your OTP is always visible there until it is used. If you face issues, contact us at cosmoindiaprakashan@gmail.com.",
      },
    ],
  },
  {
    icon: "🛡️",
    title: "Disputes & Protection",
    items: [
      {
        q: "What if a Creator or Space asks me to bypass the platform?",
        a: "That is their choice and yours — CultureJeevan is a connector. But understand: bookings made outside the platform are not covered by any of our policies. No OTP protection, no refunds, no dispute process.",
      },
      {
        q: "What about Equipment listings?",
        a: "Equipment is a directory only — no platform payment, no advance, no OTP, no commission. Contact the Equipment Owner directly. CultureJeevan has zero liability for Equipment transactions.",
      },
      {
        q: "How do I report a problem?",
        a: "Email us at cosmoindiaprakashan@gmail.com with your booking reference and a description of the issue. We respond within 48 business hours. For urgent matters, mention URGENT in the subject line.",
      },
    ],
  },
];

export default function HelpCenter() {
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
            Help Center
          </span>
          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1rem",
          }}>
            How Can We Help?
          </h1>
          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.8, marginBottom: "2rem" }}>
            Answers to everything — browsing, booking, payments, OTPs, and disputes.
            If you can&apos;t find what you need, email us directly.
          </p>
          <a
            href="mailto:cosmoindiaprakashan@gmail.com"
            style={{
              display: "inline-block",
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
            }}
          >
            Email Support →
          </a>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "780px", margin: "0 auto", padding: "4rem 2rem 5rem" }}>
        {HELP_SECTIONS.map((section, si) => (
          <div key={si} style={{ marginBottom: "3.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{section.icon}</span>
              <h2 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.1rem", fontWeight: 800, color: "#1C1410",
              }}>
                {section.title}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {section.items.map((item, ii) => (
                <div key={ii} style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E8DED0",
                  borderRadius: "14px", padding: "1.25rem 1.5rem",
                }}>
                  <p style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "0.95rem", fontWeight: 800, color: "#1C1410",
                    marginBottom: "0.5rem", lineHeight: 1.4,
                  }}>
                    {item.q}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.75 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still need help */}
        <div style={{
          backgroundColor: "#1C1410",
          borderRadius: "20px", padding: "2.5rem",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.2rem", fontWeight: 800, color: "#FAF7F2",
            marginBottom: "0.75rem",
          }}>
            Still need help?
          </p>
          <p style={{ fontSize: "0.875rem", color: "#9B7B60", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Write to us at{" "}
            <a href="mailto:cosmoindiaprakashan@gmail.com" style={{ color: "#C4703A", textDecoration: "none" }}>
              cosmoindiaprakashan@gmail.com
            </a>
            . We typically respond within 48 business hours.
          </p>
          <Link href="/how-it-works" style={{
            display: "inline-block",
            border: "1px solid #3D2918", color: "#FAF7F2",
            padding: "0.7rem 1.5rem", borderRadius: "10px",
            fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
          }}>
            Read How It Works →
          </Link>
        </div>
      </div>
    </div>
  );
}