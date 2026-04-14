"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "I",
    title: "Verified Identity. Protected Payments.",
    body: "Every booking on CultureJeevan is phone-verified and advance-secured. The platform holds the advance until the Creator arrives — then releases it the moment you share your 6-digit OTP. No more vanishing creators. No more broken promises.",
    tag: "Payment Security",
  },
  {
    number: "II",
    title: "Their Rate. Their Terms. Your Clarity.",
    body: "Every Creator sets their own price, their own advance percentage (50–80%), and their own available slots. You see it all before you send a single request. No hidden charges. No negotiation in the dark. No surprises.",
    tag: "Full Transparency",
  },
  {
    number: "III",
    title: "One Cart. Every Creative Need.",
    body: "A wedding family books a photographer, a singer, and a studio — one session, one payment flow, automatically routed to each professional. The complexity disappears. The experience remains.",
    tag: "Unified Booking",
  },
  {
    number: "IV",
    title: "Reputation That Cannot Be Manufactured.",
    body: "Badges are earned through completed bookings and genuine reviews. CJ Verified at 50. Silver at 200. Gold at 500. Platinum at 1000. No application. No fee. No shortcut. Only real work earns them — so you can trust them.",
    tag: "Trust Architecture",
  },
];

const METRICS = [
  { value: "99%", label: "of India's creative professionals operate without a manager or booking infrastructure" },
  { value: "₹0", label: "in advance protection exists for creative professionals in the informal market today" },
  { value: "3", label: "cities at launch — Lucknow, Kanpur, NCR — where the talent gap is widest" },
];

const CATEGORIES = [
  "Photographer", "Videographer", "Cinematographer",
  "Tabla Player", "Singer", "Musician",
  "Stand-up Comedian", "Poet", "Spoken Word",
  "Sound Engineer", "Lighting Pro", "Colorist",
  "Studio Space", "Café Venue", "Podcast Booth",
  "Drone Pilot", "Video Editor", "Voice Artist",
];

const TIMELINE = [
  {
    phase: "Phase 01",
    title: "Listings Live Now",
    detail: "Browse verified Creators, Spaces, and Equipment across Lucknow, Kanpur, and NCR. Check rates, portfolios, and reviews today.",
    live: true,
  },
  {
    phase: "Phase 02",
    title: "Booking & Payments",
    detail: "Full advance-secured booking flow with 6-digit OTP arrival confirmation. Razorpay-powered. Coming very soon.",
    live: false,
  },
  {
    phase: "Phase 03",
    title: "WhatsApp Notifications",
    detail: "Booking confirmations, request alerts, and advance release — in Hinglish, feeling local.",
    live: false,
  },
  {
    phase: "Phase 04",
    title: "Mobile App",
    detail: "React Native iOS & Android — built after real traction, not before.",
    live: false,
  },
];

// ─── Hook: Intersection Observer ─────────────────────────────────────────────

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} style={{
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em",
      textTransform: "uppercase", color: "#C4703A",
      margin: "0 0 1.5rem",
      display: "flex", alignItems: "center", gap: "0.75rem",
    }}>
      <span style={{ display: "inline-block", width: "32px", height: "1px", background: "#C4703A", opacity: 0.5 }} />
      {children}
    </p>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #E8DED0, transparent)", margin: "6rem 0" }} />;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function WhyCultureJeevan() {
  const [activePillar, setActivePillar] = useState(0);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCatIndex(p => (p + 1) % CATEGORIES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "#FAF7F2", fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif", color: "#1C1410" }}>
      <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "7rem 2rem 0" }}>

        {/* ── 01 The Problem ── */}
        <Reveal><Label>The Problem We Solve</Label></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", marginBottom: "0" }}>
          <Reveal delay={100}>
            <h2 style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 900,
              lineHeight: 1.12, color: "#1C1410", margin: 0, letterSpacing: "-0.01em",
            }}>
              Creative India runs on talent. It should not run on{" "}
              <em style={{ color: "#C4703A", fontStyle: "italic" }}>broken promises.</em>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ paddingTop: "0.5rem" }}>
              <p style={{ fontSize: "1.05rem", color: "#5C4A3A", lineHeight: 1.85, margin: "0 0 1.5rem" }}>
                Every day, thousands of bookings are negotiated over WhatsApp, confirmed with a handshake, and lost to a last-minute cancellation with no recourse. The photographer who never got paid. The comedian whose show fell through. The studio that got ghosted.
              </p>
              <p style={{ fontSize: "1.05rem", color: "#5C4A3A", lineHeight: 1.85, margin: 0 }}>
                CultureJeevan exists to fix the infrastructure — not the people, not the culture, not the art. Only the system that lets it happen reliably.
              </p>
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 02 Metrics ── */}
        <Reveal><Label>The Scale of the Gap</Label></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0", background: "#E8DED0", border: "1px solid #E8DED0", borderRadius: "16px", overflow: "hidden", marginBottom: "0" }}>
          {METRICS.map((m, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{
                background: "#FAF7F2", padding: "3rem 2.5rem",
                borderRight: i < 2 ? "1px solid #E8DED0" : "none",
              }}>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2.5rem, 5vw, 3.8rem)", fontWeight: 900,
                  color: "#C4703A", margin: "0 0 1rem", lineHeight: 1,
                }}>{m.value}</p>
                <p style={{ fontSize: "0.875rem", color: "#7A5C42", lineHeight: 1.65, margin: 0 }}>{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Divider />

        {/* ── 03 Four Pillars ── */}
        <Reveal><Label>Why CultureJeevan</Label></Reveal>
        <Reveal delay={100}>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            color: "#1C1410", margin: "0 0 3.5rem", letterSpacing: "-0.01em", maxWidth: "640px",
          }}>
            Four commitments. One platform.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "0", background: "#E8DED0", border: "1px solid #E8DED0", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ background: "#1C1410", padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {PILLARS.map((p, i) => (
              <button key={i} onClick={() => setActivePillar(i)} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1rem 1.25rem", borderRadius: "12px", border: "none",
                background: activePillar === i ? "rgba(196,112,58,0.15)" : "transparent",
                cursor: "pointer", textAlign: "left", transition: "background 0.2s",
                outline: activePillar === i ? "1px solid rgba(196,112,58,0.35)" : "none",
              }}>
                <span style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "0.75rem", fontWeight: 700,
                  color: activePillar === i ? "#C4703A" : "rgba(250,247,242,0.3)",
                  minWidth: "20px", transition: "color 0.2s",
                }}>{p.number}</span>
                <p style={{
                  fontSize: "0.75rem", fontWeight: 700, margin: 0,
                  color: activePillar === i ? "#FAF7F2" : "rgba(250,247,242,0.45)",
                  lineHeight: 1.3, transition: "color 0.2s",
                }}>{p.tag}</p>
              </button>
            ))}
          </div>

          <div style={{ background: "#fff", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "280px" }}>
            <span style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4703A", marginBottom: "1.25rem", display: "block" }}>
              {PILLARS[activePillar].tag}
            </span>
            <h3 style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 900,
              color: "#1C1410", margin: "0 0 1.25rem", lineHeight: 1.25, letterSpacing: "-0.01em",
            }}>
              {PILLARS[activePillar].title}
            </h3>
            <p style={{ fontSize: "1rem", color: "#5C4A3A", lineHeight: 1.8, margin: 0, maxWidth: "480px" }}>
              {PILLARS[activePillar].body}
            </p>
          </div>
        </div>

        <Divider />

        {/* ── 04 Category Cloud ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <Reveal>
            <div>
              <Label>Every Creative Discipline</Label>
              <h2 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
                color: "#1C1410", margin: "0 0 1.5rem", lineHeight: 1.2,
              }}>
                One platform for every creative service imaginable.
              </h2>
              <p style={{ fontSize: "1rem", color: "#7A5C42", lineHeight: 1.8, margin: "0 0 2rem" }}>
                From a tabla player at a corporate event to a cinematographer on a feature shoot — if it requires creative skill, it belongs on CultureJeevan. Browse them all today.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "#1C1410", padding: "0.6rem 1.1rem", borderRadius: "100px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C4703A", display: "inline-block" }} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#FAF7F2", letterSpacing: "0.06em" }}>
                  {CATEGORIES[catIndex]}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {CATEGORIES.map((cat, i) => (
                <span key={i} style={{
                  padding: "0.4rem 0.9rem", borderRadius: "100px",
                  fontSize: "0.78rem", fontWeight: 600, border: "1.5px solid",
                  borderColor: catIndex === i ? "#C4703A" : "#E8DED0",
                  color: catIndex === i ? "#C4703A" : "#7A5C42",
                  background: catIndex === i ? "rgba(196,112,58,0.06)" : "#fff",
                  transition: "all 0.4s", cursor: "default",
                }}>
                  {cat}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 05 Payment Flow ── */}
        <Reveal><Label>How Booking Works</Label></Reveal>
        <Reveal delay={100}>
          <h2 style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 900,
            color: "#1C1410", margin: "0 0 0.75rem", letterSpacing: "-0.01em", maxWidth: "600px",
          }}>
            Simple. Secure. Nothing left to chance.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "#E8F5F2", border: "1px solid #C0E0DA",
            borderRadius: "100px", padding: "0.4rem 1rem",
            marginBottom: "3rem",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2E8B7A", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2E8B7A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Booking opens very soon — listings are live today
            </span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", background: "#E8DED0", border: "1px solid #E8DED0", borderRadius: "16px", overflow: "hidden", marginBottom: "1.5rem" }}>
          {[
            { n: "1", t: "Browse & Request", d: "Find your Creator or Space. Send a booking request with your event details — date, occasion, location. Spaces confirm instantly." },
            { n: "2", t: "Advance Secured", d: "Pay 50–80% advance through the platform. CultureJeevan holds it safely — not released until you confirm arrival on the day." },
            { n: "3", t: "Share Your OTP", d: "On the day, your booking has a 6-digit OTP. Share it with the Creator or Space on arrival. They enter it — advance releases to their account." },
            { n: "4", t: "Balance Settled", d: "Pay the remaining amount directly — Cash or UPI — straight to the Creator or Space. CultureJeevan takes only its 10% on the advance." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                background: "#fff", padding: "2rem 1.75rem",
                borderRight: i < 3 ? "1px solid #E8DED0" : "none", minHeight: "200px",
              }}>
                <p style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "2.5rem", fontWeight: 900,
                  color: "rgba(196,112,58,0.15)", margin: "0 0 1.25rem", lineHeight: 1,
                }}>{s.n}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.6rem" }}>{s.t}</p>
                <p style={{ fontSize: "0.82rem", color: "#7A5C42", lineHeight: 1.65, margin: 0 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <p style={{ fontSize: "0.78rem", color: "#9B7B60", textAlign: "center", fontStyle: "italic", marginBottom: "0" }}>
            10% platform commission on the advance only. That is the only money CultureJeevan touches.
          </p>
        </Reveal>

        <Divider />

        {/* ── 06 Roadmap ── */}
        <Reveal><Label>Where We Are</Label></Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", marginBottom: "0" }}>
          {TIMELINE.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0,
                    background: t.live ? "#2E8B7A" : "#C4703A",
                    boxShadow: t.live ? "0 0 0 3px rgba(46,139,122,0.2)" : "none",
                  }} />
                  <div style={{ flex: 1, height: "1px", background: i < 3 ? "#E8DED0" : "transparent" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, color: t.live ? "#2E8B7A" : "#C4703A", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>{t.phase}</p>
                  <span style={{
                    fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: t.live ? "#2E8B7A" : "#9B7B60",
                    background: t.live ? "#E8F5F2" : "#F5EFE7",
                    border: `1px solid ${t.live ? "#C0E0DA" : "#E8DED0"}`,
                    padding: "0.15rem 0.5rem", borderRadius: "100px",
                  }}>
                    {t.live ? "Live" : "Soon"}
                  </span>
                </div>
                <p style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.5rem" }}>{t.title}</p>
                <p style={{ fontSize: "0.82rem", color: "#7A5C42", lineHeight: 1.6, margin: 0 }}>{t.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Divider />

        {/* ── 07 Closing CTA ── */}
        <Reveal>
          <div style={{
            background: "#1C1410", borderRadius: "24px",
            padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: "3rem", alignItems: "center", marginBottom: "7rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 80% 50%, rgba(196,112,58,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />

            <div style={{ position: "relative" }}>
              <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C4703A", margin: "0 0 1.25rem" }}>
                Lucknow · Kanpur · NCR
              </p>
              <h2 style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900,
                color: "#FAF7F2", margin: "0 0 1rem", lineHeight: 1.15, letterSpacing: "-0.01em",
              }}>
                The infrastructure India's<br />creative class deserves.
              </h2>
              <p style={{ fontSize: "1rem", color: "rgba(250,247,242,0.5)", margin: 0, lineHeight: 1.7, maxWidth: "480px" }}>
                Listings are live. Browse the talent in your city now — and be ready to book the moment it opens.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0, position: "relative" }}>
              <a href="/creators"
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                style={{ display: "block", padding: "0.95rem 2rem", background: "#C4703A", color: "#FAF7F2", borderRadius: "10px", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", textAlign: "center", whiteSpace: "nowrap", letterSpacing: "0.02em", transition: "opacity 0.2s" }}>
                Browse Creators →
              </a>
              <a href="/spaces"
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(250,247,242,0.4)"; (e.currentTarget as HTMLAnchorElement).style.color = "#FAF7F2"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(250,247,242,0.15)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(250,247,242,0.6)"; }}
                style={{ display: "block", padding: "0.95rem 2rem", background: "transparent", color: "rgba(250,247,242,0.6)", border: "1px solid rgba(250,247,242,0.15)", borderRadius: "10px", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", textAlign: "center", whiteSpace: "nowrap", transition: "border-color 0.2s, color 0.2s" }}>
                Explore Spaces
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          div[style*="grid-template-columns: 300px 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          div[style*="grid-template-columns: 1fr auto"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}