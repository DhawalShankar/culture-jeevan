"use client";

import { useEffect, useRef, useState } from "react";

// ─── Hook ─────────────────────────────────────────────────────────────────────

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

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "#C4703A",
        margin: "0 0 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "32px",
          height: "1px",
          background: "#C4703A",
          opacity: 0.5,
        }}
      />
      {children}
    </p>
  );
}

function Divider() {
  return (
    <div
      style={{
        height: "1px",
        background:
          "linear-gradient(to right, transparent, #E8DED0, transparent)",
        margin: "6rem 0",
      }}
    />
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "Solo", label: "Every line of code. Every decision. One person." },
  { value: "3+", label: "Cities at launch — Lucknow, Kanpur, NCR" },
  { value: "₹0", label: "Raised from investors. Bootstrapped by conviction." },
];

const VENTURES = [
  {
    number: "I",
    name: "CultureJeevan",
    tag: "Building Now",
    desc: "India's creative booking platform. Verified professionals, advance-secured payments, OTP-confirmed arrivals. The infrastructure creative India deserves — starting Lucknow, Kanpur & NCR.",
  },
  {
    number: "II",
    name: "Cosmo India Prakashan",
    tag: "Est. 1980s · Running",
    desc: "A publishing house born from the belief that civilisations survive through ideas — and ideas survive through the written word. Rooted in Bharatiya thought, astrology, philosophy, and culture since the 1980s.",
  },
];

const VALUES = [
  {
    title: "Build in the open.",
    body: "No pretence of a team that doesn't exist. One founder, one mission, honest about where things stand.",
  },
  {
    title: "Fix infrastructure, not people.",
    body: "The creative class isn't broken. The system they operate in is. CultureJeevan fixes the system.",
  },
  {
    title: "Earn trust through work.",
    body: "No manufactured credibility. Every badge, every review, every feature — earned through real action.",
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  const [activeVenture, setActiveVenture] = useState(0);

  return (
    <section
      style={{
        background: "#FAF7F2",
        fontFamily: "var(--font-dm-sans), 'DM Sans', sans-serif",
        color: "#1C1410",
      }}
    >
      <div
        style={{
          maxWidth: "1160px",
          margin: "0 auto",
          padding: "7rem 2rem 0",
        }}
      >

        {/* ── 01 Hero ── */}
        <Reveal>
          <Label>The Person Behind It</Label>
        </Reveal>

        <div
          className="about-two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <Reveal delay={100}>
            <h2
              style={{
                fontFamily:
                  "var(--font-playfair), 'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
                fontWeight: 900,
                lineHeight: 1.12,
                color: "#1C1410",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              One person.{" "}
              <em style={{ color: "#C4703A", fontStyle: "italic" }}>
                One very big
              </em>{" "}
              idea.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ paddingTop: "0.5rem" }}>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#5C4A3A",
                  lineHeight: 1.85,
                  margin: "0 0 1.5rem",
                }}
              >
                CultureJeevan is built by a single founder who understands
                creative professionals from the inside — because he is one. No
                VC funding. No team of 20. Just a clear problem, a working
                solution, and the conviction to build it.
              </p>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#5C4A3A",
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                Alongside CultureJeevan, he runs Cosmo India Prakashan — a
                publishing house with 40+ years of legacy. Two very different
                worlds. One consistent belief: good infrastructure changes
                everything.
              </p>
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 02 Stats ── */}
        <Reveal>
          <Label>By the Numbers</Label>
        </Reveal>

        <div
          className="about-three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            background: "#E8DED0",
            border: "1px solid #E8DED0",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{
                  background: "#FAF7F2",
                  padding: "3rem 2.5rem",
                  borderRight: i < 2 ? "1px solid #E8DED0" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                    fontWeight: 900,
                    color: "#C4703A",
                    margin: "0 0 1rem",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#7A5C42",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Divider />

        {/* ── 03 Founder ── */}
        <Reveal>
          <Label>The Founder</Label>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              color: "#1C1410",
              margin: "0 0 3.5rem",
              letterSpacing: "-0.01em",
              maxWidth: "640px",
            }}
          >
            Engineer. Writer. Builder.
          </h2>
        </Reveal>

        <div
          className="about-sidebar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "0",
            background: "#E8DED0",
            border: "1px solid #E8DED0",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Dark left panel */}
          <div
            style={{
              background: "#1C1410",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "320px",
            }}
          >
            <div>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "rgba(196,112,58,0.15)",
                  border: "1px solid rgba(196,112,58,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color: "#C4703A",
                  }}
                >
                  DS
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 900,
                  color: "#FAF7F2",
                  margin: "0 0 0.4rem",
                  lineHeight: 1.2,
                }}
              >
                Dhawal Shukla
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(250,247,242,0.4)",
                  margin: "0 0 2rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                Founder & CEO
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Kanpur, UP", "Electronics Engineer", "Poet & Author", "Public Speaker"].map(
                (tag, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.72rem",
                      color:
                        i === 0 ? "#C4703A" : "rgba(250,247,242,0.35)",
                      fontWeight: i === 0 ? 700 : 400,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {i === 0 ? "↳ " : "· "}
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* White right panel */}
          <div
            style={{
              background: "#fff",
              padding: "3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4703A",
                marginBottom: "1.25rem",
                display: "block",
              }}
            >
              Background
            </span>
            <h3
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 900,
                color: "#1C1410",
                margin: "0 0 1.25rem",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              At the crossroads of technology and literature.
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#5C4A3A",
                lineHeight: 1.8,
                margin: "0 0 1.25rem",
                maxWidth: "480px",
              }}
            >
              Born in Kanpur, Dhawal is an electronics engineer by discipline
              and a writer by instinct — with essays and poetry published in{" "}
              <em>Amar Ujala</em> and a book on Amazon.
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "#5C4A3A",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: "480px",
              }}
            >
              He runs Cosmo India Prakashan alongside CultureJeevan — not as a
              distraction, but as proof that he has lived inside the creative
              economy long enough to know exactly what it needs.
            </p>
          </div>
        </div>

        <Divider />

        {/* ── 04 Two Ventures ── */}
        <Reveal>
          <Label>Two Worlds. One Vision.</Label>
        </Reveal>
        <Reveal delay={100}>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              color: "#1C1410",
              margin: "0 0 3.5rem",
              letterSpacing: "-0.01em",
              maxWidth: "640px",
            }}
          >
            A publisher. A platform. Both built to last.
          </h2>
        </Reveal>

        <div
          className="about-sidebar-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "0",
            background: "#E8DED0",
            border: "1px solid #E8DED0",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Venture selector */}
          <div
            style={{
              background: "#1C1410",
              padding: "2rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {VENTURES.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveVenture(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    activeVenture === i
                      ? "rgba(196,112,58,0.15)"
                      : "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.2s",
                  outline:
                    activeVenture === i
                      ? "1px solid rgba(196,112,58,0.35)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color:
                      activeVenture === i
                        ? "#C4703A"
                        : "rgba(250,247,242,0.3)",
                    minWidth: "20px",
                    transition: "color 0.2s",
                  }}
                >
                  {v.number}
                </span>
                <p
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    margin: 0,
                    color:
                      activeVenture === i
                        ? "#FAF7F2"
                        : "rgba(250,247,242,0.45)",
                    lineHeight: 1.3,
                    transition: "color 0.2s",
                  }}
                >
                  {v.name}
                </p>
              </button>
            ))}
          </div>

          {/* Venture detail */}
          <div
            style={{
              background: "#fff",
              padding: "3rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "240px",
            }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C4703A",
                marginBottom: "1.25rem",
                display: "block",
              }}
            >
              {VENTURES[activeVenture].tag}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontWeight: 900,
                color: "#1C1410",
                margin: "0 0 1.25rem",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              {VENTURES[activeVenture].name}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#5C4A3A",
                lineHeight: 1.8,
                margin: 0,
                maxWidth: "480px",
              }}
            >
              {VENTURES[activeVenture].desc}
            </p>
          </div>
        </div>

        <Divider />

        {/* ── 05 Values ── */}
        <Reveal>
          <Label>What We Stand For</Label>
        </Reveal>

        <div
          className="about-three-col"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            background: "#E8DED0",
            border: "1px solid #E8DED0",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {VALUES.map((v, i) => (
            <Reveal key={i} delay={i * 120}>
              <div
                style={{
                  background: "#FAF7F2",
                  padding: "2.5rem 2rem",
                  borderRight: i < 2 ? "1px solid #E8DED0" : "none",
                  minHeight: "200px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "2.5rem",
                    fontWeight: 900,
                    color: "rgba(196,112,58,0.12)",
                    margin: "0 0 1.25rem",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#1C1410",
                    margin: "0 0 0.6rem",
                  }}
                >
                  {v.title}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#7A5C42",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {v.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Divider />

        {/* ── 06 Closing CTA ── */}
        <Reveal>
          <div
            style={{
              background: "#1C1410",
              borderRadius: "24px",
              padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 5rem)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
              marginBottom: "7rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle at 80% 50%, rgba(196,112,58,0.08) 0%, transparent 60%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative" }}>
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#C4703A",
                  margin: "0 0 1.25rem",
                }}
              >
                Lucknow · Kanpur · NCR
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#FAF7F2",
                  margin: "0 0 1rem",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                Phasna Nahi,
                <br />
                <em style={{ color: "#C4703A" }}>Udna Hai.</em>
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "rgba(250,247,242,0.5)",
                  margin: 0,
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                Listings are live. Browse the talent in your city now — and be
                ready the moment booking opens.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <a
                href="/creators"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.opacity = "0.85")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.opacity = "1")
                }
                style={{
                  display: "block",
                  padding: "0.95rem 2rem",
                  background: "#C4703A",
                  color: "#FAF7F2",
                  borderRadius: "10px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s",
                }}
              >
                Browse Creators →
              </a>
              <a
                href="/why-culturejeevan"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(250,247,242,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "#FAF7F2";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(250,247,242,0.15)";
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "rgba(250,247,242,0.6)";
                }}
                style={{
                  display: "block",
                  padding: "0.95rem 2rem",
                  background: "transparent",
                  color: "rgba(250,247,242,0.6)",
                  border: "1px solid rgba(250,247,242,0.15)",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                Why CultureJeevan
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-two-col    { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .about-sidebar-grid { grid-template-columns: 1fr !important; }
          .about-three-col  { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr auto"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}