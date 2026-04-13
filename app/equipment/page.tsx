"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = ["All", "Cameras", "Lenses", "Lighting", "Audio", "Props", "Accessories"];
const CITIES = ["All", "Lucknow", "Kanpur", "NCR"];

const EQUIPMENT = [
  {
    id: 1,
    name: "Sony A7 III",
    category: "Cameras",
    owner: "Arjun Mehta",
    city: "Lucknow",
    rate: 800,
    deposit: 5000,
    condition: "Excellent",
    available: true,
    pickup: "Hazratganj, Lucknow",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    tags: ["Full Frame", "4K", "Mirrorless"],
    listed: "2 days ago",
  },
  {
    id: 2,
    name: "Aputure 300D Mark II",
    category: "Lighting",
    owner: "Priya Sharma",
    city: "Kanpur",
    rate: 600,
    deposit: 3000,
    condition: "Good",
    available: true,
    pickup: "Kidwai Nagar, Kanpur",
    phone: "+91 91234 56789",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    tags: ["300W", "Daylight", "Bowens"],
    listed: "5 days ago",
  },
  {
    id: 3,
    name: "Canon 24-70mm f/2.8L",
    category: "Lenses",
    owner: "Vikram Singh",
    city: "NCR",
    rate: 500,
    deposit: 4000,
    condition: "Excellent",
    available: false,
    pickup: "Noida Sector 18",
    phone: "+91 99887 76655",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=600&q=80",
    tags: ["L Series", "Zoom", "Canon EF"],
    listed: "1 week ago",
  },
  {
    id: 4,
    name: "Rode NTG5 Shotgun Mic",
    category: "Audio",
    owner: "Sneha Gupta",
    city: "Lucknow",
    rate: 350,
    deposit: 2000,
    condition: "Like New",
    available: true,
    pickup: "Gomti Nagar, Lucknow",
    phone: "+91 98112 34567",
    image: "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=600&q=80",
    tags: ["Shotgun", "Broadcast", "Low Noise"],
    listed: "3 days ago",
  },
  {
    id: 5,
    name: "DJI RS 3 Pro Gimbal",
    category: "Accessories",
    owner: "Rahul Tiwari",
    city: "NCR",
    rate: 700,
    deposit: 4500,
    condition: "Good",
    available: true,
    pickup: "Gurgaon Sector 29",
    phone: "+91 97654 32109",
    image: "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?w=600&q=80",
    tags: ["3-Axis", "DSLR/Mirrorless", "Bluetooth"],
    listed: "1 day ago",
  },
  {
    id: 6,
    name: "Sigma 85mm f/1.4 Art",
    category: "Lenses",
    owner: "Ananya Verma",
    city: "Kanpur",
    rate: 450,
    deposit: 3500,
    condition: "Excellent",
    available: true,
    pickup: "Civil Lines, Kanpur",
    phone: "+91 93456 78901",
    image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600&q=80",
    tags: ["Prime", "Portrait", "Canon EF"],
    listed: "4 days ago",
  },
];

const C = {
  bg: "#0D0C0A",
  surface: "rgba(255,255,255,0.03)",
  surfaceHover: "rgba(255,255,255,0.055)",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(196,112,58,0.3)",
  amber: "#C4703A",
  amberDim: "rgba(196,112,58,0.55)",
  amberSubtle: "rgba(196,112,58,0.08)",
  amberBorder: "rgba(196,112,58,0.2)",
  text: "#FAF7F2",
  textMuted: "rgba(250,247,242,0.45)",
  textDim: "rgba(250,247,242,0.22)",
  textFaint: "rgba(250,247,242,0.1)",
};

function conditionBadge(condition: string) {
  if (condition === "Like New")
    return { bg: "rgba(6,78,59,0.5)", color: "#6ee7b7", border: "rgba(52,211,153,0.25)" };
  if (condition === "Excellent")
    return { bg: "rgba(92,57,18,0.6)", color: "#fbbf24", border: "rgba(251,191,36,0.25)" };
  return { bg: "rgba(40,40,40,0.8)", color: "rgba(250,247,242,0.45)", border: "rgba(255,255,255,0.1)" };
}

function availBadge(available: boolean) {
  return available
    ? { bg: "rgba(6,78,59,0.7)", color: "#34d399", border: "rgba(52,211,153,0.3)" }
    : { bg: "rgba(69,10,10,0.7)", color: "#f87171", border: "rgba(248,113,113,0.3)" };
}

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCity, setActiveCity] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [contactOpen, setContactOpen] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filtered = EQUIPMENT.filter((e) => {
    if (activeCategory !== "All" && e.category !== activeCategory) return false;
    if (activeCity !== "All" && e.city !== activeCity) return false;
    if (availableOnly && !e.available) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{
        position:"sticky", top: 65, zIndex: 50,
        backgroundColor: "rgba(13,12,10,0.88)",
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: "blur(14px)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ textDecoration: "none", fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: C.text }}>
            Culture<span style={{ color: C.amber }}>Jeevan</span>
          </Link>
          <Link href="/profile" style={{ textDecoration: "none" }}>
            <button style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", padding: "0.45rem 1.1rem",
              borderRadius: 100, border: `1px solid ${C.amberBorder}`,
              color: C.amber, background: "transparent", cursor: "pointer",
              transition: "all 0.2s",
            }}>
              List Your Gear
            </button>
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>

        {/* ── PAGE HEADER ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          <div style={{ width: 20, height: 1, background: C.amberDim }} />
          <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.amberDim }}>
            Directory · No Platform Payment
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2.5rem" }}>
          <div>
            <h1 style={{ fontSize: "clamp(2.8rem, 5vw, 4.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", margin: 0 }}>
              <span style={{ color: C.text }}>Rent </span>
              <span style={{ color: C.amber, fontStyle: "italic" }}>Equipment.</span>
            </h1>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: C.textMuted, lineHeight: 1.75, maxWidth: 400 }}>
              Browse gear listed by owners across Lucknow, Kanpur, and NCR.
              Contact directly — all transactions are between you and the owner.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem", flexShrink: 0 }}>
            {[
              { v: String(EQUIPMENT.length), l: "Listed" },
              { v: String(EQUIPMENT.filter(e => e.available).length), l: "Available" },
              { v: "3", l: "Cities" },
            ].map(s => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 900, color: C.amber, lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.textDim, marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FILTERS ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>

          {/* Category pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.35rem 1rem",
                  borderRadius: 100,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.18s",
                  border: `1px solid ${activeCategory === cat ? C.amber : C.border}`,
                  background: activeCategory === cat ? C.amber : "transparent",
                  color: activeCategory === cat ? "#FAF7F2" : C.textMuted,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* City + Toggle */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.25rem" }}>
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: 8,
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  transition: "all 0.15s",
                  background: activeCity === city ? "rgba(255,255,255,0.09)" : "transparent",
                  color: activeCity === city ? C.text : C.textDim,
                }}
              >
                {city}
              </button>
            ))}

            {/* Available toggle */}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 500, color: C.textDim }}>Available only</span>
              <button
                onClick={() => setAvailableOnly(!availableOnly)}
                style={{
                  width: 40, height: 22, borderRadius: 11,
                  background: availableOnly ? C.amber : "rgba(255,255,255,0.1)",
                  border: "none", cursor: "pointer", position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <span style={{
                  position: "absolute", top: 3,
                  left: availableOnly ? 20 : 3,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                }} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: "1.25rem" }} />

        {/* Count */}
        <p style={{ fontSize: "0.7rem", fontWeight: 500, color: C.textFaint, marginBottom: "1.5rem", letterSpacing: "0.04em" }}>
          {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* ── GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }} className="eq-grid">
          {filtered.map(item => {
            const avail = availBadge(item.available);
            const cond = conditionBadge(item.condition);
            const isHovered = hoveredCard === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  borderRadius: 16,
                  border: `1px solid ${isHovered ? C.borderHover : C.border}`,
                  background: isHovered ? C.surfaceHover : C.surface,
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%", height: "115%",
                      objectFit: "cover",
                      marginTop: "-8%",
                      transition: "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                      transform: isHovered ? "scale(1.06)" : "scale(1)",
                    }}
                  />
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, #0D0C0A 0%, rgba(13,12,10,0.15) 55%, transparent 100%)",
                  }} />

                  {/* Top badges */}
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    padding: "0.18rem 0.6rem", borderRadius: 100,
                    fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    background: "rgba(0,0,0,0.6)", color: "rgba(250,247,242,0.6)",
                    border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
                  }}>
                    {item.category}
                  </div>

                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    padding: "0.18rem 0.6rem", borderRadius: 100,
                    fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                    background: avail.bg, color: avail.color,
                    border: `1px solid ${avail.border}`, backdropFilter: "blur(4px)",
                  }}>
                    {item.available ? "Available" : "Booked"}
                  </div>

                  {/* Listed */}
                  <p style={{
                    position: "absolute", bottom: 12, left: 12,
                    fontSize: "0.6rem", color: "rgba(250,247,242,0.28)", fontWeight: 500, margin: 0,
                  }}>
                    Listed {item.listed}
                  </p>
                </div>

                {/* Content */}
                <div style={{ padding: "1rem 1.1rem 1.1rem" }}>

                  {/* Name + condition */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em", color: C.text, margin: 0, lineHeight: 1.2 }}>
                        {item.name}
                      </h3>
                      <p style={{ fontSize: "0.7rem", color: C.textDim, fontWeight: 500, margin: "3px 0 0" }}>
                        by {item.owner} · {item.city}
                      </p>
                    </div>
                    <span style={{
                      padding: "0.18rem 0.55rem", borderRadius: 6,
                      fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.04em",
                      background: cond.bg, color: cond.color,
                      border: `1px solid ${cond.border}`,
                      whiteSpace: "nowrap", flexShrink: 0,
                    }}>
                      {item.condition}
                    </span>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                    {item.tags.map(tag => (
                      <span key={tag} style={{
                        padding: "0.15rem 0.55rem", borderRadius: 5,
                        fontSize: "0.6rem", fontWeight: 600,
                        background: "rgba(255,255,255,0.04)",
                        color: "rgba(250,247,242,0.35)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rate + deposit */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    paddingBottom: 12, marginBottom: 12,
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <div>
                      <span style={{ fontSize: "1.35rem", fontWeight: 900, color: C.amber, letterSpacing: "-0.03em" }}>₹{item.rate}</span>
                      <span style={{ fontSize: "0.7rem", color: C.textDim, fontWeight: 500, marginLeft: 2 }}>/hr</span>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: C.textDim, fontWeight: 500 }}>
                      ₹{item.deposit.toLocaleString("en-IN")} deposit
                    </span>
                  </div>

                  {/* Pickup */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill={C.amberDim} style={{ flexShrink: 0 }}>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span style={{ fontSize: "0.7rem", color: C.textDim, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.pickup}
                    </span>
                  </div>

                  {/* CTA */}
                  {contactOpen === item.id ? (
                    <div style={{
                      borderRadius: 12, padding: "0.85rem 1rem",
                      background: C.amberSubtle,
                      border: `1px solid ${C.amberBorder}`,
                      textAlign: "center",
                    }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.amberDim, margin: "0 0 4px" }}>
                        Contact Owner
                      </p>
                      <a href={`tel:${item.phone}`} style={{
                        fontSize: "1.05rem", fontWeight: 900, color: C.amber,
                        textDecoration: "none", letterSpacing: "-0.02em", display: "block",
                      }}>
                        {item.phone}
                      </a>
                      <p style={{ fontSize: "0.62rem", color: C.textDim, margin: "5px 0 0", lineHeight: 1.5 }}>
                        Payment & deposit directly with owner
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => item.available && setContactOpen(item.id)}
                      disabled={!item.available}
                      style={{
                        width: "100%", height: 40, borderRadius: 12,
                        fontSize: "0.65rem", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase",
                        cursor: item.available ? "pointer" : "not-allowed",
                        transition: "all 0.2s",
                        border: item.available ? `1px solid rgba(196,112,58,0.32)` : `1px solid ${C.border}`,
                        background: item.available ? C.amberSubtle : "rgba(255,255,255,0.02)",
                        color: item.available ? C.amber : C.textDim,
                      }}
                    >
                      {item.available ? "Show Contact" : "Currently Unavailable"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0" }}>
            <p style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(250,247,242,0.04)", letterSpacing: "-0.03em" }}>No gear found</p>
            <p style={{ fontSize: "0.85rem", color: C.textDim, marginTop: 8 }}>Try changing your filters</p>
          </div>
        )}

        {/* Disclaimer */}
        <div style={{
          marginTop: "2.5rem", borderRadius: 16, padding: "1.1rem 1.25rem",
          background: "rgba(255,255,255,0.015)",
          border: `1px solid ${C.border}`,
          display: "flex", gap: "0.875rem", alignItems: "flex-start",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={C.amberDim} strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(250,247,242,0.38)", margin: "0 0 3px" }}>
              Equipment rentals are off-platform
            </p>
            <p style={{ fontSize: "0.72rem", color: C.textDim, lineHeight: 1.65, margin: 0 }}>
              CultureJeevan is a discovery directory for equipment. All payments, deposits, and agreements are directly between you and the owner. CultureJeevan has zero liability for any damage, loss, or dispute.
            </p>
          </div>
        </div>

        {/* List CTA */}
        <div style={{
          marginTop: "1rem", borderRadius: 16, padding: "1.5rem 1.75rem",
          background: "rgba(196,112,58,0.05)",
          border: "1px solid rgba(196,112,58,0.14)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 900, letterSpacing: "-0.02em", color: C.text, margin: "0 0 4px" }}>
              Have gear sitting idle?
            </h3>
            <p style={{ fontSize: "0.8rem", color: C.textMuted, margin: 0 }}>
              List it free. Earn when you're not shooting.
            </p>
          </div>
          <Link href="/profile" style={{ textDecoration: "none", flexShrink: 0 }}>
            <button style={{
              padding: "0.65rem 1.5rem", borderRadius: 100,
              fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em",
              textTransform: "uppercase", cursor: "pointer",
              background: C.amber, color: "#FAF7F2", border: "none",
              transition: "opacity 0.2s",
            }}>
              List Your Equipment →
            </button>
          </Link>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @media (max-width: 900px) {
          .eq-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .eq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}