"use client";

import { useState } from "react";
import Link from "next/link";
import StudioCard from "./studio-card";

// ── Studio Data ───────────────────────────────────────────────────────────────
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

const STUDIO_CATEGORIES = ["All", "Photography", "Film & Video", "Podcast", "Rooftop", "Dance"];

// ── Café Preview Data (teaser on landing page) ────────────────────────────────
const CAFES_PREVIEW = [
  {
    name: "The Amber Nook",
    city: "Hauz Khas, Delhi",
    ambience: "Vintage",
    price: 650,
    rating: 4.9,
    reviewCount: 84,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
    light: "Morning Light",
    access: "Exclusive",
    tags: ["Brick Walls", "Warm Lighting", "Corner Nooks"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
  {
    name: "Pebble & Brew",
    city: "Bandra West, Mumbai",
    ambience: "Industrial",
    price: 750,
    rating: 4.8,
    reviewCount: 61,
    image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80",
    light: "Afternoon Light",
    access: "Open-Hour Slot",
    tags: ["Exposed Concrete", "Large Windows", "Open Space"],
    slotLabel: "Off-Peak",
    slotColor: "#2E8B7A",
  },
  {
    name: "The Shelf Room",
    city: "Koramangala, Bangalore",
    ambience: "Cosy",
    price: 500,
    rating: 4.7,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80",
    light: "Soft All-Day",
    access: "Exclusive",
    tags: ["Bookshelves", "Reading Corners", "Fairy Lights"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
  {
    name: "Dhuan Chai Co.",
    city: "Sadashiv Peth, Pune",
    ambience: "Vintage",
    price: 450,
    rating: 4.9,
    reviewCount: 93,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80",
    light: "Evening Light",
    access: "Exclusive",
    tags: ["Brass Fixtures", "Wooden Floors", "Stage Corner"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
];

// ── Why Platform Cards ────────────────────────────────────────────────────────
const WHY_CARDS = [
  {
    icon: "🔍",
    title: "Discovery & Variety",
    desc: "Studios across 5 categories + Café Venues across multiple cities. Find the right space every time — not just the one you already know.",
  },
  {
    icon: "🛡️",
    title: "Platform-Protected Booking",
    desc: "Studio no-show? 100% refund. Bypass attempt? Space gets suspended. Your money and your session are backed by CultureJeevan.",
  },
  {
    icon: "⚡",
    title: "No Negotiation Hassle",
    desc: "Verified pricing, instant confirmation, and a clear payment flow. Pay 50% now, settle the rest at the space. Always.",
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
      {/* ══════════════════════════════════════════════
          SECTION 1 — FEATURED STUDIOS
      ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FAF7F2", padding: "6rem 2rem 4rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Header */}
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", marginBottom: "2rem",
              flexWrap: "wrap", gap: "1rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block", backgroundColor: "#F0DCC8",
                  color: "#8B4513", fontSize: "0.78rem", fontWeight: 700,
                  padding: "0.35rem 0.9rem", borderRadius: "100px",
                  letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem",
                }}
              >
                🎬 Featured Studios
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800, color: "#1C1410",
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                }}
              >
                Top-Rated Spaces
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>Loved by Creators</span>
              </h2>
            </div>
            <Link
              href="/studios"
              style={{
                fontSize: "0.9rem", fontWeight: 600, color: "#C4703A",
                textDecoration: "none", border: "1.5px solid #C4703A",
                padding: "0.5rem 1.25rem", borderRadius: "8px", whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#C4703A";
                e.currentTarget.style.color = "#FAF7F2";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#C4703A";
              }}
            >
              View All Studios →
            </Link>
          </div>

          {/* Category Filter */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {STUDIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.45rem 1rem", borderRadius: "100px",
                  fontSize: "0.82rem", fontWeight: 600,
                  border: "1.5px solid", cursor: "pointer",
                  transition: "all 0.2s", fontFamily: "inherit",
                  ...(activeCategory === cat
                    ? { backgroundColor: "#C4703A", color: "#FAF7F2", borderColor: "#C4703A" }
                    : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Studio Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {STUDIOS.map((studio) => (
              <StudioCard key={studio.name} {...studio} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — CAFÉ VENUES TEASER
      ══════════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(180deg, #FAF7F2 0%, #0F0A06 120px)",
          padding: "0 2rem 5rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Divider with label */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              marginBottom: "2.5rem", paddingTop: "1rem",
            }}
          >
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
            <span
              style={{
                fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60",
                letterSpacing: "0.1em", textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Also on CultureJeevan
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
          </div>

          {/* Café section header */}
          <div
            style={{
              backgroundColor: "#1C1410",
              borderRadius: "20px",
              padding: "2.5rem",
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    backgroundColor: "rgba(196,112,58,0.15)", color: "#F0A060",
                    fontSize: "0.72rem", fontWeight: 700,
                    padding: "0.3rem 0.875rem", borderRadius: "100px",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    border: "1px solid rgba(196,112,58,0.2)",
                  }}
                >
                  ☕ Café Venues
                </span>
                <span
                  style={{
                    backgroundColor: "#C4703A", color: "#FAF7F2",
                    fontSize: "0.6rem", fontWeight: 800,
                    padding: "0.15rem 0.5rem", borderRadius: "100px",
                    letterSpacing: "0.05em", textTransform: "uppercase",
                  }}
                >
                  NEW
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  fontWeight: 900, color: "#FAF7F2",
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                  marginBottom: "0.5rem",
                }}
              >
                Shoot Where the Vibe is Real.
              </h2>
              <p style={{ fontSize: "0.9rem", color: "#9B7B60", lineHeight: 1.7, maxWidth: "500px" }}>
                Book actual cafés — before they open or during dead hours.
                Real ambience. Real light. Same platform, same payment protection.
              </p>
            </div>
            <Link
              href="/cafe-venues"
              style={{
                backgroundColor: "#C4703A", color: "#FAF7F2",
                padding: "0.75rem 1.75rem", borderRadius: "10px",
                fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
                whiteSpace: "nowrap", flexShrink: 0,
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85C2E")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
            >
              Explore Cafés →
            </Link>
          </div>

          {/* Café cards preview */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CAFES_PREVIEW.map((cafe) => (
              <Link
                key={cafe.name}
                href="/cafe-venues"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid #E8DED0",
                  textDecoration: "none",
                  display: "block",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 48px rgba(28,20,16,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(28,20,16,0.5) 0%, transparent 50%)",
                    }}
                  />
                  {/* Ambience badge */}
                  <span
                    style={{
                      position: "absolute", top: "0.75rem", left: "0.75rem",
                      backgroundColor: "rgba(28,20,16,0.75)",
                      color: "#FAF7F2", fontSize: "0.65rem", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      padding: "0.25rem 0.625rem", borderRadius: "100px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {cafe.ambience}
                  </span>
                  {/* Slot badge */}
                  <span
                    style={{
                      position: "absolute", top: "0.75rem", right: "0.75rem",
                      backgroundColor: cafe.slotColor,
                      color: "#FAF7F2", fontSize: "0.62rem", fontWeight: 700,
                      padding: "0.25rem 0.5rem", borderRadius: "100px",
                    }}
                  >
                    {cafe.slotLabel === "Before-Hours" ? "🌅" : "🕙"} {cafe.slotLabel}
                  </span>
                  {/* Light */}
                  <span
                    style={{
                      position: "absolute", bottom: "0.75rem", left: "0.75rem",
                      backgroundColor: "rgba(250,247,242,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(250,247,242,0.2)",
                      color: "#FAF7F2", fontSize: "0.65rem", fontWeight: 600,
                      padding: "0.2rem 0.5rem", borderRadius: "100px",
                    }}
                  >
                    ☀️ {cafe.light}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.1rem" }}>
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: "0.2rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1rem", fontWeight: 800, color: "#1C1410",
                      }}
                    >
                      {cafe.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "0.95rem", fontWeight: 800, color: "#C4703A",
                      }}
                    >
                      ₹{cafe.price}
                      <span style={{ fontSize: "0.68rem", color: "#9B7B60", fontWeight: 400 }}>/hr</span>
                    </p>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#9B7B60", marginBottom: "0.75rem" }}>
                    📍 {cafe.city}
                  </p>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
                    {cafe.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: "#FAF7F2", color: "#6B5240",
                          fontSize: "0.65rem", fontWeight: 600,
                          padding: "0.2rem 0.5rem", borderRadius: "6px",
                          border: "1px solid #E8DED0",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1C1410" }}>
                      ⭐ {cafe.rating}{" "}
                      <span style={{ color: "#9B7B60", fontWeight: 400 }}>({cafe.reviewCount})</span>
                    </span>
                    <span
                      style={{
                        fontSize: "0.72rem", fontWeight: 700, color: "#C4703A",
                        display: "flex", alignItems: "center", gap: "0.25rem",
                      }}
                    >
                      {cafe.access === "Exclusive" ? "🔒" : "👥"} {cafe.access}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* See all cafés CTA */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link
              href="/cafe-venues"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                color: "#C4703A", textDecoration: "none",
                fontSize: "0.9rem", fontWeight: 700,
                border: "1.5px solid rgba(196,112,58,0.3)",
                padding: "0.625rem 1.5rem", borderRadius: "100px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.08)";
                e.currentTarget.style.borderColor = "#C4703A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(196,112,58,0.3)";
              }}
            >
              ☕ See All Café Venues →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — WHY BOOK ON PLATFORM
      ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5EFE7", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
            className="why-grid"
          >
            {/* Left */}
            <div>
              <span
                style={{
                  display: "inline-block", backgroundColor: "#F5EFE7",
                  color: "#C4703A", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.35rem 1rem", borderRadius: "100px",
                  marginBottom: "1rem", border: "1px solid #E8DED0",
                }}
              >
                Why Book on Platform?
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  fontWeight: 900, color: "#1C1410",
                  letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1rem",
                }}
              >
                Every New Creative Need
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>= A New Booking.</span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Creators don&apos;t stay loyal to one space — they experiment, explore, and grow.
                Photoshoot today. Podcast tomorrow. Café session next week. CultureJeevan is built
                to be your default for discovery.
              </p>
              <div
                style={{
                  backgroundColor: "#1C1410", color: "#FAF7F2",
                  borderRadius: "14px", padding: "1.25rem 1.5rem",
                  fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.6,
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

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {WHY_CARDS.map((card) => (
                <div
                  key={card.title}
                  style={{
                    backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                    borderRadius: "14px", padding: "1.25rem",
                    display: "flex", alignItems: "flex-start", gap: "1rem",
                  }}
                >
                  <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>
                    {card.icon}
                  </span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1C1410", marginBottom: "0.25rem" }}>
                      {card.title}
                    </p>
                    <p style={{ fontSize: "0.825rem", color: "#6B5240", lineHeight: 1.65 }}>
                      {card.desc}
                    </p>
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