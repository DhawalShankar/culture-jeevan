"use client";

import { useState } from "react";
import StudioCard from "./studio-card";

const STUDIOS = [
  {
    name: "Lumina Studio Delhi",
    type: "Photography",
    city: "Connaught Place, Delhi",
    price: 1200,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80",
    tags: ["Cyclorama Wall", "Natural Light", "Prop Room"],
  },
  {
    name: "FilmBox Mumbai",
    type: "Film & Video",
    city: "Andheri West, Mumbai",
    price: 2500,
    rating: 4.8,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    tags: ["Green Screen", "Pro Lighting", "Editing Suite"],
  },
  {
    name: "Echo Booth Bangalore",
    type: "Podcast",
    city: "Koramangala, Bangalore",
    price: 800,
    rating: 4.7,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    tags: ["Soundproofed", "4K Camera", "Live Streaming"],
  },
  {
    name: "Skyline Rooftop Pune",
    type: "Rooftop Studio",
    city: "Koregaon Park, Pune",
    price: 1800,
    rating: 4.9,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    tags: ["360° View", "Golden Hour", "Outdoor Setup"],
  },
];

const CATEGORIES = ["All", "Photography", "Film & Video", "Podcast", "Rooftop", "Dance"];

// ── Why Platform Section Data (from blueprint point #13) ──
const WHY_CARDS = [
  {
    icon: "🔍",
    title: "Discovery & Variety",
    desc: "Multiple studios across 5 categories and multiple cities. Find the right space every time — not just the one you already know.",
  },
  {
    icon: "🛡️",
    title: "Platform-Protected Booking",
    desc: "Studio no-show? 100% refund. Bypass attempt? Studio gets suspended. Your money and your session are backed by CultureJeevan.",
  },
  {
    icon: "⚡",
    title: "No Negotiation Hassle",
    desc: "Verified pricing, instant confirmation, and a clear payment flow. Pay 50% now, settle the rest at the studio. Always.",
  },
  {
    icon: "📸",
    title: "Skill Workers on Demand",
    desc: "Add a vetted photographer, videographer, or editor to your session while booking — all in one place.",
  },
];

export default function FeaturedStudios() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      {/* ── Featured Studios ── */}
      <section style={{ backgroundColor: "#FAF7F2", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span style={{ display: "inline-block", backgroundColor: "#F0DCC8", color: "#8B4513", fontSize: "0.78rem", fontWeight: 700, padding: "0.35rem 0.9rem", borderRadius: "100px", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Featured Studios
              </span>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Top-Rated Spaces
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>Loved by Creators</span>
              </h2>
            </div>

            <a
              href="#"
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", border: "1.5px solid #C4703A", padding: "0.5rem 1.25rem", borderRadius: "8px", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C4703A"; e.currentTarget.style.color = "#FAF7F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C4703A"; }}
            >
              View All Studios →
            </a>
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.45rem 1rem",
                  borderRadius: "100px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  border: "1.5px solid",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  ...(activeCategory === cat
                    ? { backgroundColor: "#C4703A", color: "#FAF7F2", borderColor: "#C4703A" }
                    : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {STUDIOS.map((studio) => (
              <StudioCard key={studio.name} {...studio} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Book on Platform (blueprint point #12, #13) ── */}
      <section style={{ backgroundColor: "#F5EFE7", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
            className="why-grid"
          >
            {/* Left: Messaging */}
            <div>
              <span style={{ display: "inline-block", backgroundColor: "#F5EFE7", color: "#C4703A", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.35rem 1rem", borderRadius: "100px", marginBottom: "1rem", border: "1px solid #E8DED0" }}>
                Why Book on Platform?
              </span>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1rem" }}>
                Every New Creative Need
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>= A New Booking.</span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Creators don&apos;t stay loyal to one studio — they experiment, explore, and grow.
                CultureJeevan is built to be your default for discovery. Photoshoot today.
                Podcast tomorrow. Dance floor next week.
              </p>

              {/* Key callout from blueprint */}
              <div
                style={{
                  backgroundColor: "#1C1410",
                  color: "#FAF7F2",
                  borderRadius: "14px",
                  padding: "1.25rem 1.5rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  lineHeight: 1.6,
                  borderLeft: "4px solid #C4703A",
                }}
              >
                <span style={{ color: "#C4703A" }}>
                  &ldquo;Bookings outside CultureJeevan are not protected.&rdquo;
                </span>
                <br />
                <span style={{ color: "#9B7B60", fontWeight: 400, fontSize: "0.85rem" }}>
                  Direct deals offer no refunds, no complaint system, no accountability.
                  The platform exists to protect you.
                </span>
              </div>
            </div>

            {/* Right: Why cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {WHY_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{card.icon}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1C1410", marginBottom: "0.25rem" }}>
                      {card.title}
                    </p>
                    <p style={{ fontSize: "0.825rem", color: "#6B5240", lineHeight: 1.65 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .why-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
}