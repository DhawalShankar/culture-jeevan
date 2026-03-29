"use client";

import { useState } from "react";

// ── Café Data ─────────────────────────────────────────────────────────────────
const CAFES = [
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
    food: "₹200 min order",
    instruments: "Acoustic Only",
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
    food: "Included (1 drink)",
    instruments: "Not Allowed",
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
    food: "Optional",
    instruments: "Acoustic Only",
    tags: ["Bookshelves", "Reading Corners", "Fairy Lights"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
  {
    name: "Grid & Grind",
    city: "Indiranagar, Bangalore",
    ambience: "Minimalist",
    price: 600,
    rating: 4.6,
    reviewCount: 49,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    light: "Morning Light",
    access: "Open-Hour Slot",
    food: "₹150 min order",
    instruments: "Not Allowed",
    tags: ["White Walls", "Clean Lines", "Natural Light"],
    slotLabel: "Off-Peak",
    slotColor: "#2E8B7A",
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
    food: "Included (chai + snack)",
    instruments: "All Allowed",
    tags: ["Brass Fixtures", "Wooden Floors", "Stage Corner"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
  {
    name: "Courtyard 14",
    city: "Jubilee Hills, Hyderabad",
    ambience: "Outdoor",
    price: 800,
    rating: 4.8,
    reviewCount: 38,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80",
    light: "Golden Hour",
    access: "Exclusive",
    food: "Optional",
    instruments: "All Allowed",
    tags: ["Open Courtyard", "String Lights", "Garden Seating"],
    slotLabel: "Before-Hours",
    slotColor: "#7C5CBF",
  },
];

const AMBIENCE_FILTERS = ["All", "Cosy", "Industrial", "Vintage", "Minimalist", "Outdoor"];

const SLOT_FILTERS = ["All Slots", "Before-Hours", "Off-Peak"];

// ── Use Cases ─────────────────────────────────────────────────────────────────
const USE_CASES = [
  {
    icon: "🎵",
    title: "Music Performances",
    desc: "Acoustic sets, unplugged covers, ambient sessions. Real café atmosphere, no green screen needed.",
    color: "#C4703A",
    bg: "#FDF0E6",
  },
  {
    icon: "📱",
    title: "Instagram Reels",
    desc: "Aesthetic backgrounds that stop the scroll. Book the vibe, not just the space.",
    color: "#2E8B7A",
    bg: "#E8F5F2",
  },
  {
    icon: "📚",
    title: "Reading & Bookstagram",
    desc: "Cosy corners, warm light, bookshelves. The perfect backdrop for your reading content.",
    color: "#7C5CBF",
    bg: "#F0EBF8",
  },
  {
    icon: "📦",
    title: "Brand & Product Shoots",
    desc: "Lifestyle product photography in real, lived-in spaces. Far more authentic than a studio backdrop.",
    color: "#8B4513",
    bg: "#F5EFE7",
  },
];

// ── How Slots Work ─────────────────────────────────────────────────────────────
const SLOT_TYPES = [
  {
    type: "Off-Peak Slot",
    time: "10am – 12pm  |  3pm – 5pm",
    icon: "🕙",
    color: "#2E8B7A",
    bg: "#E8F5F2",
    border: "#C0E0DA",
    desc: "Café is open to public but traffic is minimal. You get a designated space. Great for reels, brand shoots, and bookstagram content.",
    price: "Most affordable",
  },
  {
    type: "Before-Hours Slot",
    time: "8am – 10am (before café opens)",
    icon: "🌅",
    color: "#7C5CBF",
    bg: "#F0EBF8",
    border: "#D9CCF0",
    desc: "Exclusive access before café opens to the public. Clean, empty space. Best for music sessions, brand shoots, and cinematic reels.",
    price: "Premium — worth it",
  },
];

export default function CafeVenues() {
  const [ambienceFilter, setAmbienceFilter] = useState("All");
  const [slotFilter, setSlotFilter] = useState("All Slots");

  const filtered = CAFES.filter((c) => {
    const ambienceMatch = ambienceFilter === "All" || c.ambience === ambienceFilter;
    const slotMatch = slotFilter === "All Slots" || c.slotLabel === slotFilter;
    return ambienceMatch && slotMatch;
  });

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(160deg, #0F0A06 0%, #1C1008 50%, #2A1A0A 100%)",
          padding: "6rem 2rem 5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,112,58,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Floating aesthetic tags */}
        <div
          style={{
            position: "absolute", top: "2.5rem", right: "8%",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "100px", padding: "0.4rem 1rem",
            fontSize: "0.75rem", color: "rgba(255,255,255,0.35)",
            fontWeight: 600, letterSpacing: "0.06em",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C4703A", display: "inline-block" }} />
          AMBIENT LIGHT
        </div>
        <div
          style={{
            position: "absolute", top: "5rem", right: "12%",
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "100px", padding: "0.4rem 1rem",
            fontSize: "0.75rem", color: "rgba(255,255,255,0.25)",
            fontWeight: 600, letterSpacing: "0.06em",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#7C5CBF", display: "inline-block" }} />
          REAL ATMOSPHERE
        </div>

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
          <div style={{ maxWidth: "680px" }}>

            {/* Category pill */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  backgroundColor: "rgba(196,112,58,0.15)",
                  color: "#F0A060", fontSize: "0.75rem", fontWeight: 700,
                  padding: "0.35rem 0.9rem", borderRadius: "100px",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  border: "1px solid rgba(196,112,58,0.2)",
                }}
              >
                ☕ Café Venues
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
                A new way to book real spaces
              </span>
            </div>

            {/* Main heading */}
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
                fontWeight: 900,
                color: "#FAF7F2",
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
                marginBottom: "1.25rem",
              }}
            >
              Shoot Where
              <br />
              <span style={{ color: "#C4703A", fontStyle: "italic" }}>
                the Vibe
              </span>
              <br />
              is Real.
            </h1>

            <p
              style={{
                fontSize: "1.05rem",
                color: "rgba(250,247,242,0.6)",
                lineHeight: 1.75,
                maxWidth: "520px",
                marginBottom: "2.5rem",
              }}
            >
              Stop recreating café aesthetics in a studio. Book the actual café —
              before it opens, or during its quietest hours. Real ambience.
              Real light. Verified by CultureJeevan.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              {[
                { num: "200+", label: "Verified Cafés" },
                { num: "15+", label: "Indian Cities" },
                { num: "₹400", label: "Starting at /hr" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.75rem",
                      fontWeight: 900,
                      color: "#C4703A",
                      lineHeight: 1,
                      marginBottom: "0.2rem",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(250,247,242,0.4)", fontWeight: 500, letterSpacing: "0.04em" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                style={{
                  backgroundColor: "#C4703A", color: "#FAF7F2",
                  padding: "0.875rem 2rem", borderRadius: "10px",
                  fontSize: "0.95rem", fontWeight: 700, border: "none",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85C2E")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
              >
                Explore Cafés →
              </button>
              <button
                style={{
                  backgroundColor: "transparent", color: "rgba(250,247,242,0.7)",
                  padding: "0.875rem 2rem", borderRadius: "10px",
                  fontSize: "0.95rem", fontWeight: 600,
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              >
                List Your Café
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Use Cases ── */}
      <div style={{ backgroundColor: "#FFFFFF", padding: "4rem 2rem", borderBottom: "1px solid #E8DED0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60",
              letterSpacing: "0.1em", textTransform: "uppercase",
              textAlign: "center", marginBottom: "0.5rem",
            }}
          >
            What Creators Shoot Here
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 800, color: "#1C1410",
              textAlign: "center", letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
            }}
          >
            Every Vibe. Every Creator.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                style={{
                  backgroundColor: uc.bg,
                  borderRadius: "16px",
                  padding: "1.5rem",
                  border: "1px solid rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>
                  {uc.icon}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1rem", fontWeight: 800,
                    color: "#1C1410", marginBottom: "0.4rem",
                  }}
                >
                  {uc.title}
                </h3>
                <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.7 }}>
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slot Types Explained ── */}
      <div style={{ backgroundColor: "#FAF7F2", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60",
              letterSpacing: "0.1em", textTransform: "uppercase",
              textAlign: "center", marginBottom: "0.5rem",
            }}
          >
            Booking Slots
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 800, color: "#1C1410",
              textAlign: "center", letterSpacing: "-0.02em",
              marginBottom: "2rem",
            }}
          >
            Two Ways to Book a Café
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="slot-grid">
            {SLOT_TYPES.map((slot) => (
              <div
                key={slot.type}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `1.5px solid ${slot.border}`,
                  borderRadius: "18px",
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "3px", backgroundColor: slot.color,
                  }}
                />
                <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.75rem" }}>
                  {slot.icon}
                </span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.05rem", fontWeight: 800, color: "#1C1410",
                    }}
                  >
                    {slot.type}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.68rem", fontWeight: 700, color: slot.color,
                      backgroundColor: slot.bg,
                      padding: "0.2rem 0.6rem", borderRadius: "100px",
                      whiteSpace: "nowrap", marginLeft: "0.5rem",
                    }}
                  >
                    {slot.price}
                  </span>
                </div>
                <p style={{ fontSize: "0.78rem", color: "#C4703A", fontWeight: 600, marginBottom: "0.75rem" }}>
                  🕐 {slot.time}
                </p>
                <p style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.7 }}>
                  {slot.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Browse Cafés ── */}
      <div style={{ padding: "2rem 2rem 6rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Section header */}
          <div
            style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", marginBottom: "1.75rem",
              flexWrap: "wrap", gap: "1rem",
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-block", backgroundColor: "#F0DCC8",
                  color: "#8B4513", fontSize: "0.75rem", fontWeight: 700,
                  padding: "0.3rem 0.875rem", borderRadius: "100px",
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  marginBottom: "0.6rem",
                }}
              >
                ☕ Browse Cafés
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 800, color: "#1C1410",
                  letterSpacing: "-0.02em", lineHeight: 1.15,
                }}
              >
                Find Your Aesthetic
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>
                  Space.
                </span>
              </h2>
            </div>
            <a
              href="#"
              style={{
                fontSize: "0.9rem", fontWeight: 600, color: "#C4703A",
                textDecoration: "none", border: "1.5px solid #C4703A",
                padding: "0.5rem 1.25rem", borderRadius: "8px",
                whiteSpace: "nowrap", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#C4703A"; e.currentTarget.style.color = "#FAF7F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#C4703A"; }}
            >
              View All Cafés →
            </a>
          </div>

          {/* Filters */}
          <div
            style={{
              display: "flex", gap: "0.75rem", flexWrap: "wrap",
              marginBottom: "2rem", alignItems: "center",
            }}
          >
            {/* Ambience filters */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {AMBIENCE_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setAmbienceFilter(f)}
                  style={{
                    padding: "0.4rem 0.875rem", borderRadius: "100px",
                    fontSize: "0.8rem", fontWeight: 600,
                    border: "1.5px solid", cursor: "pointer",
                    transition: "all 0.2s", fontFamily: "inherit",
                    ...(ambienceFilter === f
                      ? { backgroundColor: "#C4703A", color: "#FAF7F2", borderColor: "#C4703A" }
                      : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: "1px", height: "24px", backgroundColor: "#E8DED0", margin: "0 0.25rem" }} />

            {/* Slot filters */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {SLOT_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setSlotFilter(f)}
                  style={{
                    padding: "0.4rem 0.875rem", borderRadius: "100px",
                    fontSize: "0.8rem", fontWeight: 600,
                    border: "1.5px solid", cursor: "pointer",
                    transition: "all 0.2s", fontFamily: "inherit",
                    ...(slotFilter === f
                      ? { backgroundColor: "#1C1410", color: "#FAF7F2", borderColor: "#1C1410" }
                      : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
                  }}
                >
                  {f === "Before-Hours" ? "🌅 " : f === "Off-Peak" ? "🕙 " : ""}{f}
                </button>
              ))}
            </div>
          </div>

          {/* Café Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filtered.map((cafe) => (
              <div
                key={cafe.name}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #E8DED0",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(28,20,16,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(28,20,16,0.5) 0%, transparent 50%)",
                    }}
                  />
                  {/* Ambience badge */}
                  <span
                    style={{
                      position: "absolute", top: "0.875rem", left: "0.875rem",
                      backgroundColor: "rgba(28,20,16,0.75)",
                      color: "#FAF7F2", fontSize: "0.68rem", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      padding: "0.3rem 0.75rem", borderRadius: "100px",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {cafe.ambience}
                  </span>
                  {/* Slot badge */}
                  <span
                    style={{
                      position: "absolute", top: "0.875rem", right: "0.875rem",
                      backgroundColor: cafe.slotColor,
                      color: "#FAF7F2", fontSize: "0.65rem", fontWeight: 700,
                      padding: "0.3rem 0.6rem", borderRadius: "100px",
                    }}
                  >
                    {cafe.slotLabel === "Before-Hours" ? "🌅" : "🕙"} {cafe.slotLabel}
                  </span>
                  {/* Light badge bottom-left */}
                  <span
                    style={{
                      position: "absolute", bottom: "0.875rem", left: "0.875rem",
                      backgroundColor: "rgba(250,247,242,0.15)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(250,247,242,0.2)",
                      color: "#FAF7F2", fontSize: "0.68rem", fontWeight: 600,
                      padding: "0.25rem 0.6rem", borderRadius: "100px",
                    }}
                  >
                    ☀️ {cafe.light}
                  </span>
                </div>

                {/* Body */}
                <div style={{ padding: "1.25rem" }}>
                  <div
                    style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "flex-start", marginBottom: "0.25rem",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1.05rem", fontWeight: 800, color: "#1C1410",
                      }}
                    >
                      {cafe.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "1rem", fontWeight: 800, color: "#C4703A",
                      }}
                    >
                      ₹{cafe.price}
                      <span style={{ fontSize: "0.7rem", color: "#9B7B60", fontWeight: 400 }}>/hr</span>
                    </p>
                  </div>

                  <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "0.875rem" }}>
                    📍 {cafe.city}
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.875rem" }}>
                    {cafe.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          backgroundColor: "#FAF7F2", color: "#6B5240",
                          fontSize: "0.68rem", fontWeight: 600,
                          padding: "0.25rem 0.6rem", borderRadius: "6px",
                          border: "1px solid #E8DED0",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info row — all 4 key data points */}
                  <div
                    style={{
                      display: "grid", gridTemplateColumns: "1fr 1fr",
                      gap: "0.5rem", marginBottom: "1rem",
                      padding: "0.75rem", backgroundColor: "#FAF7F2",
                      borderRadius: "10px", border: "1px solid #F0E8DC",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#9B7B60", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Access</p>
                      <p style={{ fontSize: "0.75rem", color: cafe.access === "Exclusive" ? "#2E8B7A" : "#6B5240", fontWeight: 700 }}>
                        {cafe.access === "Exclusive" ? "🔒 " : "👥 "}{cafe.access}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#9B7B60", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Food</p>
                      <p style={{ fontSize: "0.75rem", color: "#6B5240", fontWeight: 600 }}>🍵 {cafe.food}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#9B7B60", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Instruments</p>
                      <p style={{ fontSize: "0.75rem", color: "#6B5240", fontWeight: 600 }}>🎸 {cafe.instruments}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.62rem", color: "#9B7B60", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Rating</p>
                      <p style={{ fontSize: "0.75rem", color: "#1C1410", fontWeight: 700 }}>⭐ {cafe.rating} <span style={{ color: "#9B7B60", fontWeight: 400 }}>({cafe.reviewCount})</span></p>
                    </div>
                  </div>

                  {/* Book CTA */}
                  <button
                    style={{
                      width: "100%", padding: "0.7rem",
                      backgroundColor: "#C4703A", color: "#FAF7F2",
                      border: "none", borderRadius: "10px",
                      fontSize: "0.85rem", fontWeight: 700,
                      cursor: "pointer", fontFamily: "inherit",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85C2E")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
                  >
                    Book This Café →
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1", textAlign: "center",
                  padding: "4rem 2rem", color: "#9B7B60",
                }}
              >
                <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>☕</span>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>
                  No cafés match this filter yet.
                </p>
                <p style={{ fontSize: "0.875rem" }}>Try a different ambience or slot type.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Platform Protection Banner ── */}
      <div
        style={{
          backgroundColor: "#1C1410",
          padding: "2rem",
          textAlign: "center",
          borderTop: "1px solid #2C1F18",
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "#9B7B60", fontWeight: 500 }}>
          🛡️{" "}
          <span style={{ color: "#FAF7F2", fontWeight: 600 }}>
            All café bookings are platform protected.
          </span>{" "}
          Café no-show = 100% refund.{" "}
          <span style={{ color: "#C4703A" }}>
            Bookings outside CultureJeevan are not protected.
          </span>
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .slot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}