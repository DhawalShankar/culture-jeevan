"use client";

import { useState } from "react";
import Link from "next/link";

const STATS = [
  { value: "Multiple", label: "Verified Creators" },
  { value: "Multiple", label: "Bookings Done" },
  { value: "Good", label: "Avg Rating" },
  { value: "Multiple", label: "Cities" },
];

const CITIES = ["Lucknow", "Kanpur", "NCR"];

const MARQUEE_ITEMS = [
  "Photography Studios", "Podcast Booths", "Aesthetic Cafés", "Rooftop Studios",
  "Dance Studios", "Film Studios", "Reel Spaces", "Recording Studios",
  "Photographers", "Videographers", "Drone Pilots", "Cinematographers",
  "Lighting Professionals", "Gaffers", "Grip Crew", "Set Designers",
  "Singers", "Musicians", "Tabla Players", "Flautists", "Pianists",
  "Guitarists", "Percussionists", "Sound Engineers", "Podcast Hosts",
  "Stand-up Comedians", "Poets", "Storytellers", "Spoken Word Artists",
  "Sketch Writers", "Anchors & Emcees", "Voice-over Artists",
  "Video Editors", "Motion Designers", "Colorists", "Production Assistants",
  "Art Directors", "Prop Stylists", "Costume Designers", "Makeup Artists",
];

const CARDS = [
  {
    id: "creator",
    label: "Book a Creator",
    sub: "Photographers · Singers · Comedians · Poets",
    href: "/creators",
    tag: "Request Based",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=85",
  },
  {
    id: "space",
    label: "Book a Space",
    sub: "Studios · Cafés",
    href: "/spaces",
    tag: "Instant Book",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&q=85",
  },
  {
    id: "equipment",
    label: "Rent Equipment",
    sub: "Cameras · Lenses · Lighting · Sound",
    href: "/equipment",
    tag: "Free Listing",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=85",
  },
];

export default function Hero() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: "#0D0C0A" }}>

      {/* Protection Banner */}
      <div style={{
        background: "#fff1cc",
        borderBottom: "1px solid rgba(45,36,30,0.08)",
        padding: "0.45rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            stroke="#A65D2E"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-bold" style={{ fontSize: "0.7rem", color: "#5C544E", letterSpacing: "0.03em" }}>
          All bookings are platform-protected. For your security,
        </span>
        <span style={{ fontSize: "0.7rem", color: "#A65D2E", fontWeight: 700, letterSpacing: "0.03em" }}>
          always transact on CultureJeevan.
        </span>
      </div>

      {/* Hero */}
      <section style={{ background: "#0D0C0A", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-120px", left: "50%", transform: "translateX(-50%)",
          width: "700px", height: "400px",
          background: "radial-gradient(ellipse, rgba(196,112,58,0.1) 0%, transparent 65%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "3.5rem 3rem 2.5rem", position: "relative", zIndex: 1 }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.75rem", flexWrap: "wrap" }}>
            <div style={{
              display: "inline-flex", alignItems: "center",
              border: "1px solid rgba(196,112,58,0.2)", borderRadius: "100px", padding: "0.18rem",
            }}>
              {CITIES.map((city, i) => (
                <span key={city} style={{
                  fontSize: "0.62rem", fontWeight: 700,
                  color: i === 0 ? "#C4703A" : "rgba(250,247,242,0.45)",
                  padding: "0.15rem 0.65rem",
                  borderRight: i < CITIES.length - 1 ? "1px solid rgba(196,112,58,0.15)" : "none",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}>{city}</span>
              ))}
            </div>
            <div style={{ width: "20px", height: "1px", background: "rgba(196,112,58,0.25)" }} />
            <span style={{ fontSize: "0.62rem", color: "rgba(250,247,242,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>
              India's Creative Booking Platform
            </span>
          </div>

          {/* Headline + Body — two col */}
          <div className="cj-hero-top" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "end", marginBottom: "2.5rem" }}>

            <div>
              <div style={{
                fontSize: "0.58rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.14em",
                textTransform: "uppercase", fontWeight: 600, marginBottom: "0.9rem",
                display: "flex", alignItems: "center", gap: "0.6rem",
              }}>
                <span style={{ display: "inline-block", width: "22px", height: "1px", background: "rgba(196,112,58,0.4)" }} />
                Est. 2026 · culturejeevan.co.in
              </div>
              <h1 style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 0.95, margin: 0, letterSpacing: "-0.04em" }}>
                <span style={{ color: "#FAF7F2", display: "block" }}>The Standard</span>
                <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(250,247,242,0.22)", display: "block" }}>for Creative</span>
                <span style={{ color: "#C4703A", fontStyle: "italic", fontWeight: 900, display: "block" }}>Bookings.</span>
              </h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {/* ↓ KEY FIX: opacity bumped from 0.4 → 0.72 for body copy */}
              <p style={{ fontSize: "0.9rem", color: "rgba(250,247,242,0.72)", lineHeight: 1.75, margin: 0 }}>
                Book verified creative professionals, studios, and cafés across India.
                Secure your slot — scan QR on arrival — settle the rest directly.{" "}
                <span style={{ color: "#FAF7F2", fontWeight: 600 }}>Transparent. Protected. Professional.</span>
              </p>

              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
                <Link href="/explore" style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#C4703A", color: "#FAF7F2",
                  padding: "0.7rem 1.4rem", borderRadius: "100px",
                  textDecoration: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.02em",
                }}>
                  Start Booking
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                {/* ↓ bumped from 0.35 → 0.6 */}
                <Link href="/login" style={{
                  fontSize: "0.78rem", color: "rgba(250,247,242,0.6)", textDecoration: "none",
                  borderBottom: "1px solid rgba(250,247,242,0.25)", paddingBottom: "1px", fontWeight: 500,
                }}>
                  List your profile — free
                </Link>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", paddingTop: "0.4rem", borderTop: "1px solid rgba(250,247,242,0.06)" }}>
                {/* ↓ bumped from 0.3 → 0.45 */}
                <span style={{ fontSize: "0.58rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Our promise</span>
                {/* ↓ bumped from 0.12 → 0.28 */}
                <span style={{ fontStyle: "italic", fontSize: "0.82rem", color: "rgba(250,247,242,0.28)" }}>Phasna Nahi, Udna Hai.</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="cj-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem", marginBottom: "1.75rem" }}>
            {CARDS.map((card, idx) => (
              <Link
                key={card.id}
                href={card.href}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "relative", borderRadius: "14px", overflow: "hidden",
                  textDecoration: "none", display: "block", height: "200px",
                  border: hovered === card.id ? "1px solid rgba(196,112,58,0.32)" : "1px solid rgba(250,247,242,0.05)",
                  transition: "all 0.35s cubic-bezier(0.23,1,0.32,1)",
                  transform: hovered === card.id ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  <img src={card.image} alt={card.label} style={{
                    width: "100%", height: "115%", objectFit: "cover",
                    transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                    transform: hovered === card.id ? "scale(1.07)" : "scale(1)",
                    marginTop: "-8%",
                  }} />
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  background: hovered === card.id
                    ? "linear-gradient(165deg, rgba(13,12,10,0.1) 0%, rgba(13,12,10,0.88) 62%)"
                    : "linear-gradient(165deg, rgba(13,12,10,0.28) 0%, rgba(13,12,10,0.92) 68%)",
                  transition: "background 0.35s",
                }} />
                <div style={{ position: "absolute", top: "0.9rem", left: "0.9rem", fontSize: "0.52rem", color: "rgba(250,247,242,0.28)", fontWeight: 700, letterSpacing: "0.1em" }}>
                  0{idx + 1}
                </div>
                <div style={{
                  position: "absolute", top: "0.9rem", right: "0.9rem",
                  background: "rgba(196,112,58,0.12)", border: "1px solid rgba(196,112,58,0.28)",
                  borderRadius: "100px", padding: "0.12rem 0.5rem",
                  fontSize: "0.52rem", color: "#C4703A", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {card.tag}
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.1rem" }}>
                  <div style={{
                    width: hovered === card.id ? "36px" : "14px", height: "1.5px",
                    background: "#C4703A", marginBottom: "0.5rem", transition: "width 0.3s ease",
                  }} />
                  <p style={{ fontSize: "0.95rem", fontWeight: 800, color: "#FAF7F2", margin: "0 0 0.2rem", letterSpacing: "-0.02em" }}>{card.label}</p>
                  {/* ↓ bumped from 0.38 → 0.6 */}
                  <p style={{ fontSize: "0.62rem", color: "rgba(250,247,242,0.6)", margin: 0, fontWeight: 500 }}>{card.sub}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div className="cj-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: "1px solid rgba(250,247,242,0.08)", borderRadius: "12px",
            overflow: "hidden", background: "rgba(250,247,242,0.02)",
          }}>
            {STATS.map((s, i) => (
              <div key={s.label} style={{
                padding: "1rem", borderRight: i < STATS.length - 1 ? "1px solid rgba(250,247,242,0.08)" : "none",
                display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.2rem",
              }}>
                <p style={{ fontSize: "1.35rem", fontWeight: 800, color: "#C4703A", margin: 0, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.value}</p>
                {/* ↓ bumped from 0.22 → 0.45 */}
                <p style={{ fontSize: "0.56rem", color: "rgba(250,247,242,0.45)", margin: 0, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee — hardware accelerated, mobile-safe */}
        <div style={{
          borderTop: "1px solid rgba(196,112,58,0.1)",
          padding: "0.7rem 0",
          overflow: "hidden",
          background: "rgba(196,112,58,0.025)",
          marginTop: "1.75rem",
          /* Prevent iOS Safari from pausing the animation on scroll */
          WebkitTransform: "translateZ(0)",
        }}>
          <div
            className="cj-marquee"
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              willChange: "transform",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: "1rem",
                fontSize: "0.58rem", fontWeight: 700,
                color: i % 4 === 0 ? "#C4703A" : "rgba(250,247,242,0.28)",
                letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 1.5rem",
              }}>
                {item}
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(196,112,58,0.35)", display: "inline-block" }} />
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');

        .cj-marquee {
          animation: cj-scroll 8s linear infinite;
          -webkit-animation: cj-scroll 8s linear infinite;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
        }

        @keyframes cj-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @-webkit-keyframes cj-scroll {
          0%   { -webkit-transform: translate3d(0, 0, 0); }
          100% { -webkit-transform: translate3d(-50%, 0, 0); }
        }

        @media (max-width: 900px) {
          .cj-hero-top { grid-template-columns: 1fr !important; }
          .cj-cards    { grid-template-columns: 1fr !important; }
          .cj-cards a  { height: 170px !important; }
          .cj-stats    { grid-template-columns: 1fr 1fr !important; }
          .cj-marquee  {
            animation: cj-scroll 8s linear infinite !important;
            -webkit-animation: cj-scroll 8s linear infinite !important;
          }
        }
      `}</style>
    </div>
  );
}