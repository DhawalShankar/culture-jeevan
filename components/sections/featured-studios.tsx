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

// ── Café Data ─────────────────────────────────────────────────────────────────
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

// ── Row card: Studio ──────────────────────────────────────────────────────────
function StudioRowCard({ studio }: { studio: typeof STUDIOS[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/studios"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: "0.875rem", alignItems: "center",
        backgroundColor: hovered ? "rgba(196,112,58,0.06)" : "rgba(255,255,255,0.035)",
        border: `1px solid ${hovered ? "rgba(196,112,58,0.22)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px", padding: "0.8rem 0.95rem",
        textDecoration: "none", transition: "all 0.22s",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
      }}
    >
      <div style={{ width: "64px", height: "64px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
        <img src={studio.image} alt={studio.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
          <p style={{
            fontFamily: "var(--font-playfair)", fontSize: "0.92rem", fontWeight: 800,
            color: "#FAF7F2", marginBottom: "0.1rem",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {studio.name}
          </p>
          <p style={{ fontSize: "0.88rem", fontWeight: 800, color: "#C4703A", flexShrink: 0 }}>
            ₹{studio.price.toLocaleString()}
            <span style={{ fontSize: "0.6rem", color: "#7A6050", fontWeight: 400 }}>/hr</span>
          </p>
        </div>
        <p style={{ fontSize: "0.7rem", color: "#7A6050", marginBottom: "0.45rem" }}>📍 {studio.city}</p>
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", alignItems: "center" }}>
          {studio.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{
              backgroundColor: "rgba(255,255,255,0.05)", color: "#9B8070",
              fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.4rem",
              borderRadius: "5px", border: "1px solid rgba(255,255,255,0.08)",
            }}>{tag}</span>
          ))}
          <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#9B8070", marginLeft: "auto" }}>
            ⭐ {studio.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Row card: Café ────────────────────────────────────────────────────────────
function CafeRowCard({ cafe }: { cafe: typeof CAFES_PREVIEW[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href="/cafe-venues"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: "0.875rem", alignItems: "center",
        backgroundColor: hovered ? "rgba(196,112,58,0.06)" : "rgba(255,255,255,0.035)",
        border: `1px solid ${hovered ? "rgba(196,112,58,0.22)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "14px", padding: "0.8rem 0.95rem",
        textDecoration: "none", transition: "all 0.22s",
        transform: hovered ? "translateX(3px)" : "translateX(0)",
      }}
    >
      <div style={{
        width: "64px", height: "64px", borderRadius: "10px",
        overflow: "hidden", flexShrink: 0, position: "relative",
      }}>
        <img src={cafe.image} alt={cafe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <span style={{
          position: "absolute", top: "4px", right: "4px",
          width: "8px", height: "8px", borderRadius: "50%",
          backgroundColor: cafe.slotColor, boxShadow: "0 0 0 1.5px rgba(0,0,0,0.4)",
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
          <p style={{
            fontFamily: "var(--font-playfair)", fontSize: "0.92rem", fontWeight: 800,
            color: "#FAF7F2", marginBottom: "0.1rem",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {cafe.name}
          </p>
          <p style={{ fontSize: "0.88rem", fontWeight: 800, color: "#C4703A", flexShrink: 0 }}>
            ₹{cafe.price.toLocaleString()}
            <span style={{ fontSize: "0.6rem", color: "#7A6050", fontWeight: 400 }}>/hr</span>
          </p>
        </div>
        <p style={{ fontSize: "0.7rem", color: "#7A6050", marginBottom: "0.45rem" }}>📍 {cafe.city}</p>
        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap", alignItems: "center" }}>
          {cafe.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{
              backgroundColor: "rgba(255,255,255,0.05)", color: "#9B8070",
              fontSize: "0.6rem", fontWeight: 600, padding: "0.15rem 0.4rem",
              borderRadius: "5px", border: "1px solid rgba(255,255,255,0.08)",
            }}>{tag}</span>
          ))}
          <span style={{
            fontSize: "0.6rem", fontWeight: 700, color: "#FAF7F2",
            backgroundColor: cafe.slotColor, padding: "0.15rem 0.4rem",
            borderRadius: "5px", opacity: 0.9, marginLeft: "auto",
          }}>
            {cafe.slotLabel === "Before-Hours" ? "🌅" : "🕙"} {cafe.slotLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function FeaturedStudios() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — TOP-RATED SPACES
          Light header → dark split body (Studios LEFT | Cafés RIGHT)
          Everything is ONE logical section
      ══════════════════════════════════════════════════════════ */}

      {/* Light header area */}
      <section style={{ backgroundColor: "#FAF7F2", padding: "6rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Badge + Title + CTAs row */}
          <div style={{ marginBottom: "1.75rem" }}>
            <span style={{
              display: "inline-block", backgroundColor: "#F0DCC8",
              color: "#8B4513", fontSize: "0.78rem", fontWeight: 700,
              padding: "0.35rem 0.9rem", borderRadius: "100px",
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.75rem",
            }}>
              ✦ Top-Rated Spaces
            </span>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", flexWrap: "wrap", gap: "1rem",
            }}>
              <h2 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800, color: "#1C1410",
                letterSpacing: "-0.02em", lineHeight: 1.15,
              }}>
                Studios & Cafés
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>Loved by Creators</span>
              </h2>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                <Link href="/studios" style={{
                  fontSize: "0.85rem", fontWeight: 600, color: "#C4703A",
                  textDecoration: "none", border: "1.5px solid #C4703A",
                  padding: "0.45rem 1.1rem", borderRadius: "8px", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C4703A"; e.currentTarget.style.color = "#FAF7F2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C4703A"; }}
                >
                  All Studios →
                </Link>
                <Link href="/cafe-venues" style={{
                  fontSize: "0.85rem", fontWeight: 600, color: "#C4703A",
                  textDecoration: "none", border: "1.5px solid #C4703A",
                  padding: "0.45rem 1.1rem", borderRadius: "8px", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C4703A"; e.currentTarget.style.color = "#FAF7F2"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C4703A"; }}
                >
                  ☕ All Cafés →
                </Link>
              </div>
            </div>
          </div>

          {/* Studio category filter chips */}
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
            {STUDIO_CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "0.38rem 0.875rem", borderRadius: "100px",
                fontSize: "0.8rem", fontWeight: 600,
                border: "1.5px solid", cursor: "pointer",
                transition: "all 0.18s", fontFamily: "inherit",
                ...(activeCategory === cat
                  ? { backgroundColor: "#C4703A", color: "#FAF7F2", borderColor: "#C4703A" }
                  : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
              }}>
                {cat}
              </button>
            ))}
            {/* Café filter hint chip */}
            <span style={{
              padding: "0.38rem 0.875rem", borderRadius: "100px",
              fontSize: "0.8rem", fontWeight: 600,
              border: "1.5px solid rgba(196,112,58,0.3)",
              color: "#C4703A", backgroundColor: "rgba(196,112,58,0.05)",
              display: "flex", alignItems: "center", gap: "0.3rem",
            }}>
              ☕ Cafés →
            </span>
          </div>
        </div>
      </section>

      {/* Dark split body — Studios LEFT | Cafés RIGHT */}
      <section style={{ backgroundColor: "#1C1410", padding: "2.5rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Sub-column labels */}
          <div className="split-columns" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: "0 2.5rem",
            marginBottom: "1.25rem",
            alignItems: "center",
          }}>
            {/* Left label */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                backgroundColor: "rgba(250,247,242,0.07)", color: "#C4B49A",
                fontSize: "0.7rem", fontWeight: 700,
                padding: "0.28rem 0.8rem", borderRadius: "100px",
                letterSpacing: "0.08em", textTransform: "uppercase",
                border: "1px solid rgba(250,247,242,0.1)",
              }}>
                🎬 Studios
              </span>
              <Link href="/studios" style={{
                fontSize: "0.72rem", fontWeight: 700, color: "#7A6050",
                textDecoration: "none", transition: "color 0.18s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6050")}
              >
                See all →
              </Link>
            </div>
            {/* Divider gap */}
            <div />
            {/* Right label */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "0.35rem",
                  backgroundColor: "rgba(196,112,58,0.12)", color: "#F0A060",
                  fontSize: "0.7rem", fontWeight: 700,
                  padding: "0.28rem 0.8rem", borderRadius: "100px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  border: "1px solid rgba(196,112,58,0.2)",
                }}>
                  ☕ Café Venues
                </span>
                <span style={{
                  backgroundColor: "#C4703A", color: "#FAF7F2",
                  fontSize: "0.52rem", fontWeight: 800,
                  padding: "0.1rem 0.38rem", borderRadius: "100px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  NEW
                </span>
              </div>
              <Link href="/cafe-venues" style={{
                fontSize: "0.72rem", fontWeight: 700, color: "#7A6050",
                textDecoration: "none", transition: "color 0.18s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6050")}
              >
                See all →
              </Link>
            </div>
          </div>

          {/* ── Cards Grid ── */}
          <div className="split-columns" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: "0 2.5rem",
            alignItems: "start",
          }}>

            {/* LEFT — Studios */}
            <div className="split-col" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {STUDIOS.map((studio) => (
                <StudioRowCard key={studio.name} studio={studio} />
              ))}
              <Link href="/studios" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                padding: "0.6rem", borderRadius: "12px", marginTop: "0.2rem",
                border: "1px dashed rgba(196,112,58,0.22)",
                fontSize: "0.78rem", fontWeight: 700, color: "#7A6050",
                textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C4703A";
                  e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)";
                  e.currentTarget.style.borderStyle = "solid";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7A6050";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderStyle = "dashed";
                }}
              >
                Browse all Studios →
              </Link>
            </div>

            {/* Vertical rule */}
            <div style={{ backgroundColor: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />

            {/* RIGHT — Cafés */}
            <div className="split-col" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {CAFES_PREVIEW.map((cafe) => (
                <CafeRowCard key={cafe.name} cafe={cafe} />
              ))}
              <Link href="/cafe-venues" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                padding: "0.6rem", borderRadius: "12px", marginTop: "0.2rem",
                border: "1px dashed rgba(196,112,58,0.22)",
                fontSize: "0.78rem", fontWeight: 700, color: "#7A6050",
                textDecoration: "none", transition: "all 0.2s",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#C4703A";
                  e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)";
                  e.currentTarget.style.borderStyle = "solid";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#7A6050";
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderStyle = "dashed";
                }}
              >
                ☕ Browse all Cafés →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — WHY BOOK ON PLATFORM
      ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#F5EFE7", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}
            className="why-grid"
          >
            <div>
              <span style={{
                display: "inline-block", backgroundColor: "#F5EFE7",
                color: "#C4703A", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "0.35rem 1rem", borderRadius: "100px",
                marginBottom: "1rem", border: "1px solid #E8DED0",
              }}>
                Why Book on Platform?
              </span>
              <h2 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 900, color: "#1C1410",
                letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "1rem",
              }}>
                Every New Creative Need
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>= A New Booking.</span>
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Creators don&apos;t stay loyal to one space — they experiment, explore, and grow.
                Photoshoot today. Podcast tomorrow. Café session next week. CultureJeevan is built
                to be your default for discovery.
              </p>
              <div style={{
                backgroundColor: "#1C1410", color: "#FAF7F2",
                borderRadius: "14px", padding: "1.25rem 1.5rem",
                fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.6,
                borderLeft: "4px solid #C4703A",
              }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {WHY_CARDS.map((card) => (
                <div key={card.title} style={{
                  backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                  borderRadius: "14px", padding: "1.25rem",
                  display: "flex", alignItems: "flex-start", gap: "1rem",
                }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0, marginTop: "0.1rem" }}>{card.icon}</span>
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
          @media (max-width: 900px) {
            .why-grid { grid-template-columns: 1fr !important; }
            .split-columns { grid-template-columns: 1fr !important; }
            .split-col { width: 100%; }
            .split-columns > div:nth-child(2) { display: none !important; }
          }
        `}</style>
      </section>
    </>
  );
}