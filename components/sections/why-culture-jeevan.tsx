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

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`cj-reveal ${inView ? "cj-reveal--visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="cj-label">
      <span className="cj-label__line" />
      {children}
    </p>
  );
}

function Divider() {
  return <div className="cj-divider" />;
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
    <section className="cj-section">
      <style>{`
        /* ── Reset / Base ── */
        .cj-section {
          background: #FAF7F2;
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          color: #1C1410;
        }
        .cj-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 7rem 2rem 0;
        }

        /* ── Reveal animation ── */
        .cj-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .cj-reveal--visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Label ── */
        .cj-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C4703A;
          margin: 0 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .cj-label__line {
          display: inline-block;
          width: 32px;
          height: 1px;
          background: #C4703A;
          opacity: 0.5;
          flex-shrink: 0;
        }

        /* ── Divider ── */
        .cj-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #E8DED0, transparent);
          margin: 6rem 0;
        }

        /* ── 01 Problem grid ── */
        .cj-grid-two {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* ── 02 Metrics grid ── */
        .cj-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          background: #E8DED0;
          border: 1px solid #E8DED0;
          border-radius: 16px;
          overflow: hidden;
        }
        .cj-metric-cell {
          background: #FAF7F2;
          padding: 3rem 2.5rem;
          border-right: 1px solid #E8DED0;
        }
        .cj-metric-cell:last-child {
          border-right: none;
        }
        .cj-metric-value {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2.5rem, 5vw, 3.8rem);
          font-weight: 900;
          color: #C4703A;
          margin: 0 0 1rem;
          line-height: 1;
        }
        .cj-metric-label {
          font-size: 0.875rem;
          color: #7A5C42;
          line-height: 1.65;
          margin: 0;
        }

        /* ── 03 Pillars ── */
        .cj-pillars {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 0;
          background: #E8DED0;
          border: 1px solid #E8DED0;
          border-radius: 20px;
          overflow: hidden;
        }
        .cj-pillars__nav {
          background: #1C1410;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .cj-pillar-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          border-radius: 12px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s, outline 0.2s;
          outline: 1px solid transparent;
        }
        .cj-pillar-btn--active {
          background: rgba(196, 112, 58, 0.15);
          outline: 1px solid rgba(196, 112, 58, 0.35);
        }
        .cj-pillar-btn__num {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(250, 247, 242, 0.3);
          min-width: 20px;
          transition: color 0.2s;
        }
        .cj-pillar-btn--active .cj-pillar-btn__num {
          color: #C4703A;
        }
        .cj-pillar-btn__tag {
          font-size: 0.75rem;
          font-weight: 700;
          margin: 0;
          color: rgba(250, 247, 242, 0.45);
          line-height: 1.3;
          transition: color 0.2s;
        }
        .cj-pillar-btn--active .cj-pillar-btn__tag {
          color: #FAF7F2;
        }
        .cj-pillars__content {
          background: #fff;
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 280px;
        }
        .cj-pillar-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C4703A;
          margin-bottom: 1.25rem;
          display: block;
        }
        .cj-pillar-title {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 900;
          color: #1C1410;
          margin: 0 0 1.25rem;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }
        .cj-pillar-body {
          font-size: 1rem;
          color: #5C4A3A;
          line-height: 1.8;
          margin: 0;
          max-width: 480px;
        }

        /* ── 04 Category ── */
        .cj-cat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .cj-cat-chip-active {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #1C1410;
          padding: 0.6rem 1.1rem;
          border-radius: 100px;
        }
        .cj-cat-chip-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C4703A;
          display: inline-block;
          flex-shrink: 0;
        }
        .cj-cat-chip-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #FAF7F2;
          letter-spacing: 0.06em;
        }
        .cj-cat-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .cj-cat-tag {
          padding: 0.4rem 0.9rem;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          border: 1.5px solid #E8DED0;
          color: #7A5C42;
          background: #fff;
          transition: all 0.4s;
          cursor: default;
        }
        .cj-cat-tag--active {
          border-color: #C4703A;
          color: #C4703A;
          background: rgba(196, 112, 58, 0.06);
        }

        /* ── 05 Steps ── */
        .cj-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          background: #E8DED0;
          border: 1px solid #E8DED0;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }
        .cj-step {
          background: #fff;
          padding: 2rem 1.75rem;
          border-right: 1px solid #E8DED0;
          min-height: 200px;
        }
        .cj-step:last-child {
          border-right: none;
        }
        .cj-step__num {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: rgba(196, 112, 58, 0.15);
          margin: 0 0 1.25rem;
          line-height: 1;
        }
        .cj-step__title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #1C1410;
          margin: 0 0 0.6rem;
        }
        .cj-step__body {
          font-size: 0.82rem;
          color: #7A5C42;
          line-height: 1.65;
          margin: 0;
        }

        /* ── 06 Timeline ── */
        .cj-timeline {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }
        .cj-timeline-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .cj-timeline-dot--live {
          background: #2E8B7A;
          box-shadow: 0 0 0 3px rgba(46, 139, 122, 0.2);
        }
        .cj-timeline-dot--soon {
          background: #C4703A;
        }
        .cj-timeline-line {
          flex: 1;
          height: 1px;
          background: #E8DED0;
        }
        .cj-phase-badge {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 100px;
        }
        .cj-phase-badge--live {
          color: #2E8B7A;
          background: #E8F5F2;
          border: 1px solid #C0E0DA;
        }
        .cj-phase-badge--soon {
          color: #9B7B60;
          background: #F5EFE7;
          border: 1px solid #E8DED0;
        }

        /* ── 07 CTA ── */
        .cj-cta {
          background: #1C1410;
          border-radius: 24px;
          padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
          margin-bottom: 7rem;
          position: relative;
          overflow: hidden;
        }
        .cj-cta__glow {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at 80% 50%, rgba(196,112,58,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .cj-cta__eyebrow {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #C4703A;
          margin: 0 0 1.25rem;
        }
        .cj-cta__heading {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          color: #FAF7F2;
          margin: 0 0 1rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .cj-cta__sub {
          font-size: 1rem;
          color: rgba(250, 247, 242, 0.5);
          margin: 0;
          line-height: 1.7;
          max-width: 480px;
        }
        .cj-cta__actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          flex-shrink: 0;
          position: relative;
        }
        .cj-btn-primary {
          display: block;
          padding: 0.95rem 2rem;
          background: #C4703A;
          color: #FAF7F2;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          letter-spacing: 0.02em;
          transition: opacity 0.2s;
        }
        .cj-btn-primary:hover { opacity: 0.85; }
        .cj-btn-secondary {
          display: block;
          padding: 0.95rem 2rem;
          background: transparent;
          color: rgba(250, 247, 242, 0.6);
          border: 1px solid rgba(250, 247, 242, 0.15);
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          transition: border-color 0.2s, color 0.2s;
        }
        .cj-btn-secondary:hover {
          border-color: rgba(250, 247, 242, 0.4);
          color: #FAF7F2;
        }

        /* ── Headings (shared) ── */
        .cj-h2 {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 900;
          line-height: 1.12;
          color: #1C1410;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .cj-h2--sm {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
        }
        .cj-body {
          font-size: 1.05rem;
          color: #5C4A3A;
          line-height: 1.85;
          margin: 0 0 1.5rem;
        }
        .cj-body:last-child { margin: 0; }

        /* ── Status badge ── */
        .cj-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #E8F5F2;
          border: 1px solid #C0E0DA;
          border-radius: 100px;
          padding: 0.4rem 1rem;
          margin-bottom: 3rem;
        }
        .cj-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2E8B7A;
          display: inline-block;
          flex-shrink: 0;
        }
        .cj-status-text {
          font-size: 0.72rem;
          font-weight: 700;
          color: #2E8B7A;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .cj-grid-two,
          .cj-cat-grid,
          .cj-cta {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .cj-pillars {
            grid-template-columns: 1fr;
          }
          .cj-steps,
          .cj-timeline {
            grid-template-columns: 1fr 1fr;
          }
          .cj-step {
            border-right: none;
            border-bottom: 1px solid #E8DED0;
          }
          .cj-step:nth-child(odd) {
            border-right: 1px solid #E8DED0;
          }
          .cj-step:nth-last-child(-n+2) {
            border-bottom: none;
          }
        }
        @media (max-width: 600px) {
          .cj-metrics {
            grid-template-columns: 1fr;
          }
          .cj-metric-cell {
            border-right: none;
            border-bottom: 1px solid #E8DED0;
          }
          .cj-metric-cell:last-child {
            border-bottom: none;
          }
          .cj-steps,
          .cj-timeline {
            grid-template-columns: 1fr;
          }
          .cj-step {
            border-right: none;
            border-bottom: 1px solid #E8DED0;
          }
          .cj-step:last-child {
            border-bottom: none;
          }
          .cj-cta__actions {
            width: 100%;
          }
        }
      `}</style>

      <div className="cj-wrap">
        {/* ── 01 The Problem ── */}
        <Reveal><Label>The Problem We Solve</Label></Reveal>
        <div className="cj-grid-two" style={{ marginBottom: 0 }}>
          <Reveal delay={100}>
            <h2 className="cj-h2">
              Creative India runs on talent. It should not run on{" "}
              <em style={{ color: "#C4703A", fontStyle: "italic" }}>broken promises.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ paddingTop: "0.5rem" }}>
              <p className="cj-body">
                Every day, thousands of bookings are negotiated over WhatsApp, confirmed with a handshake, and lost to a last-minute cancellation with no recourse. The photographer who never got paid. The comedian whose show fell through. The studio that got ghosted.
              </p>
              <p className="cj-body">
                CultureJeevan exists to fix the infrastructure — not the people, not the culture, not the art. Only the system that lets it happen reliably.
              </p>
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 02 Metrics ── */}
        <Reveal><Label>The Scale of the Gap</Label></Reveal>
        <div className="cj-metrics" style={{ marginBottom: 0 }}>
          {METRICS.map((m, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="cj-metric-cell">
                <p className="cj-metric-value">{m.value}</p>
                <p className="cj-metric-label">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Divider />

        {/* ── 03 Four Pillars ── */}
        <Reveal><Label>Why CultureJeevan</Label></Reveal>
        <Reveal delay={100}>
          <h2 className="cj-h2 cj-h2--sm" style={{ margin: "0 0 3.5rem", maxWidth: "640px" }}>
            Four commitments. One platform.
          </h2>
        </Reveal>
        <div className="cj-pillars">
          <div className="cj-pillars__nav">
            {PILLARS.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePillar(i)}
                className={`cj-pillar-btn${activePillar === i ? " cj-pillar-btn--active" : ""}`}
              >
                <span className="cj-pillar-btn__num">{p.number}</span>
                <p className="cj-pillar-btn__tag">{p.tag}</p>
              </button>
            ))}
          </div>
          <div className="cj-pillars__content">
            <span className="cj-pillar-tag">{PILLARS[activePillar].tag}</span>
            <h3 className="cj-pillar-title">{PILLARS[activePillar].title}</h3>
            <p className="cj-pillar-body">{PILLARS[activePillar].body}</p>
          </div>
        </div>

        <Divider />

        {/* ── 04 Category Cloud ── */}
        <div className="cj-cat-grid">
          <Reveal>
            <div>
              <Label>Every Creative Discipline</Label>
              <h2 className="cj-h2 cj-h2--sm" style={{ margin: "0 0 1.5rem" }}>
                One platform for every creative service imaginable.
              </h2>
              <p style={{ fontSize: "1rem", color: "#7A5C42", lineHeight: 1.8, margin: "0 0 2rem" }}>
                From a tabla player at a corporate event to a cinematographer on a feature shoot — if it requires creative skill, it belongs on CultureJeevan. Browse them all today.
              </p>
              <div className="cj-cat-chip-active">
                <span className="cj-cat-chip-dot" />
                <span className="cj-cat-chip-label">{CATEGORIES[catIndex]}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="cj-cat-cloud">
              {CATEGORIES.map((cat, i) => (
                <span key={i} className={`cj-cat-tag${catIndex === i ? " cj-cat-tag--active" : ""}`}>
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
          <h2 className="cj-h2 cj-h2--sm" style={{ margin: "0 0 0.75rem", maxWidth: "600px" }}>
            Simple. Secure. Nothing left to chance.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="cj-status-badge">
            <span className="cj-status-dot" />
            <span className="cj-status-text">Booking opens very soon — listings are live today</span>
          </div>
        </Reveal>
        <div className="cj-steps">
          {[
            { n: "1", t: "Browse & Request", d: "Find your Creator or Space. Send a booking request with your event details — date, occasion, location. Spaces confirm instantly." },
            { n: "2", t: "Advance Secured", d: "Pay 50–80% advance through the platform. CultureJeevan holds it safely — not released until you confirm arrival on the day." },
            { n: "3", t: "Share Your OTP", d: "On the day, your booking has a 6-digit OTP. Share it with the Creator or Space on arrival. They enter it — advance releases to their account." },
            { n: "4", t: "Balance Settled", d: "Pay the remaining amount directly — Cash or UPI — straight to the Creator or Space. CultureJeevan takes only its 10% on the advance." },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="cj-step">
                <p className="cj-step__num">{s.n}</p>
                <p className="cj-step__title">{s.t}</p>
                <p className="cj-step__body">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <p style={{ fontSize: "0.78rem", color: "#9B7B60", textAlign: "center", fontStyle: "italic", marginBottom: 0 }}>
            10% platform commission on the advance only. That is the only money CultureJeevan touches.
          </p>
        </Reveal>

        <Divider />

        {/* ── 06 Roadmap ── */}
        <Reveal><Label>Where We Are</Label></Reveal>
        <div className="cj-timeline" style={{ marginBottom: 0 }}>
          {TIMELINE.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div className={`cj-timeline-dot ${t.live ? "cj-timeline-dot--live" : "cj-timeline-dot--soon"}`} />
                  {i < 3 && <div className="cj-timeline-line" />}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, color: t.live ? "#2E8B7A" : "#C4703A", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
                    {t.phase}
                  </p>
                  <span className={`cj-phase-badge ${t.live ? "cj-phase-badge--live" : "cj-phase-badge--soon"}`}>
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
          <div className="cj-cta">
            <div className="cj-cta__glow" />
            <div style={{ position: "relative" }}>
              <p className="cj-cta__eyebrow">Lucknow · Kanpur · NCR</p>
              <h2 className="cj-cta__heading">
                The infrastructure India's<br />creative class deserves.
              </h2>
              <p className="cj-cta__sub">
                Listings are live. Browse the talent in your city now — and be ready to book the moment it opens.
              </p>
            </div>
            <div className="cj-cta__actions">
              <a href="/creators" className="cj-btn-primary">Browse Creators →</a>
              <a href="/spaces" className="cj-btn-secondary">Explore Spaces</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}