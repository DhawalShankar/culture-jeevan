"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type Skill =
  | "Photographer"
  | "Videographer"
  | "Video Editor"
  | "Makeup Artist"
  | "Hair Stylist"
  | "Set Designer"
  | "Lighting Tech"
  | "Sound Engineer"
  | "Art Director";

type ExperienceLevel = "0–1 yrs" | "2–3 yrs" | "4–6 yrs" | "7+ yrs";
type City = "Delhi" | "Mumbai" | "Bangalore" | "Pune" | "Hyderabad" | "Chennai";

interface CrewMember {
  id: string;
  name: string;
  skill: Skill;
  city: City;
  rating: number;
  reviewCount: number;
  rate: number;
  experience: ExperienceLevel;
  image: string;
  portfolio?: string;
  instagram?: string;
  tags: string[];
  available: boolean;
  sessionsDone: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const CREW: CrewMember[] = [
  {
    id: "c1",
    name: "Priya Sharma",
    skill: "Photographer",
    city: "Mumbai",
    rating: 4.9,
    reviewCount: 87,
    rate: 2500,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    instagram: "@priyaframes",
    tags: ["Portrait", "Editorial", "Product"],
    available: true,
    sessionsDone: 142,
  },
  {
    id: "c2",
    name: "Arjun Mehta",
    skill: "Videographer",
    city: "Delhi",
    rating: 4.8,
    reviewCount: 63,
    rate: 3500,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    instagram: "@arjunlens",
    tags: ["Short Films", "Brand Videos", "Reels"],
    available: true,
    sessionsDone: 98,
  },
  {
    id: "c3",
    name: "Sneha Kulkarni",
    skill: "Makeup Artist",
    city: "Pune",
    rating: 4.9,
    reviewCount: 112,
    rate: 1800,
    experience: "7+ yrs",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    instagram: "@snehaglam",
    tags: ["Bridal", "Editorial", "SFX"],
    available: false,
    sessionsDone: 231,
  },
  {
    id: "c4",
    name: "Rohan Verma",
    skill: "Video Editor",
    city: "Bangalore",
    rating: 4.7,
    reviewCount: 44,
    rate: 1500,
    experience: "2–3 yrs",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    instagram: "@rohancuts",
    tags: ["Color Grading", "Motion Graphics", "Reels"],
    available: true,
    sessionsDone: 67,
  },
  {
    id: "c5",
    name: "Kavya Nair",
    skill: "Set Designer",
    city: "Mumbai",
    rating: 4.8,
    reviewCount: 38,
    rate: 2200,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    instagram: "@kavyasets",
    tags: ["Conceptual", "Product Shoots", "Portraits"],
    available: true,
    sessionsDone: 55,
  },
  {
    id: "c6",
    name: "Amit Tiwari",
    skill: "Lighting Tech",
    city: "Delhi",
    rating: 4.9,
    reviewCount: 71,
    rate: 2000,
    experience: "7+ yrs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    tags: ["Studio Lighting", "Natural Light", "Film Sets"],
    available: true,
    sessionsDone: 189,
  },
  {
    id: "c7",
    name: "Isha Patel",
    skill: "Hair Stylist",
    city: "Bangalore",
    rating: 4.7,
    reviewCount: 55,
    rate: 1600,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    instagram: "@ishahairstudio",
    tags: ["Editorial", "Bridal", "Avant-Garde"],
    available: true,
    sessionsDone: 88,
  },
  {
    id: "c8",
    name: "Dev Krishnamurthy",
    skill: "Sound Engineer",
    city: "Chennai",
    rating: 4.8,
    reviewCount: 29,
    rate: 2800,
    experience: "7+ yrs",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    tags: ["Podcast", "Film Audio", "Music Videos"],
    available: false,
    sessionsDone: 74,
  },
  {
    id: "c9",
    name: "Meera Joshi",
    skill: "Art Director",
    city: "Mumbai",
    rating: 4.9,
    reviewCount: 48,
    rate: 4000,
    experience: "7+ yrs",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    instagram: "@meeracreates",
    tags: ["Campaign", "Brand Identity", "Editorial"],
    available: true,
    sessionsDone: 62,
  },
  {
    id: "c10",
    name: "Rahul Desai",
    skill: "Photographer",
    city: "Hyderabad",
    rating: 4.6,
    reviewCount: 33,
    rate: 1800,
    experience: "2–3 yrs",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    instagram: "@rahulshots",
    tags: ["Street", "Fashion", "Events"],
    available: true,
    sessionsDone: 41,
  },
  {
    id: "c11",
    name: "Anjali Singh",
    skill: "Makeup Artist",
    city: "Delhi",
    rating: 4.8,
    reviewCount: 76,
    rate: 2200,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    instagram: "@anjalibeauty",
    tags: ["Fashion", "Commercial", "Bridal"],
    available: true,
    sessionsDone: 154,
  },
  {
    id: "c12",
    name: "Kiran Bhat",
    skill: "Videographer",
    city: "Bangalore",
    rating: 4.7,
    reviewCount: 41,
    rate: 3000,
    experience: "4–6 yrs",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80",
    instagram: "@kiranvisuals",
    tags: ["Documentaries", "Weddings", "Lifestyle"],
    available: false,
    sessionsDone: 77,
  },
];

const SKILL_CATEGORIES: { skill: Skill | "All"; emoji: string }[] = [
  { skill: "All", emoji: "✦" },
  { skill: "Photographer", emoji: "📸" },
  { skill: "Videographer", emoji: "🎥" },
  { skill: "Video Editor", emoji: "✂️" },
  { skill: "Makeup Artist", emoji: "💄" },
  { skill: "Hair Stylist", emoji: "💇" },
  { skill: "Set Designer", emoji: "🎨" },
  { skill: "Lighting Tech", emoji: "💡" },
  { skill: "Sound Engineer", emoji: "🎙️" },
  { skill: "Art Director", emoji: "🖼️" },
];

const CITIES: (City | "All")[] = ["All", "Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Chennai"];
const EXPERIENCE_LEVELS: (ExperienceLevel | "All")[] = ["All", "0–1 yrs", "2–3 yrs", "4–6 yrs", "7+ yrs"];

const SKILL_ACCENT = "#7C5CBF";
const SKILL_BG = "rgba(124,92,191,0.08)";

// ── Crew Card ─────────────────────────────────────────────────────────────────
function CrewCard({ member }: { member: CrewMember }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        border: `1.5px solid ${hovered ? "rgba(124,92,191,0.3)" : "#E8DED0"}`,
        borderRadius: "18px",
        overflow: "hidden",
        transition: "all 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 48px rgba(124,92,191,0.12)"
          : "0 2px 8px rgba(28,20,16,0.04)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image + availability */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src={member.image}
          alt={member.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(28,20,16,0.55) 0%, transparent 55%)",
          }}
        />
        <span
          style={{
            position: "absolute", top: "0.75rem", right: "0.75rem",
            display: "flex", alignItems: "center", gap: "0.3rem",
            backgroundColor: "rgba(28,20,16,0.65)",
            backdropFilter: "blur(6px)",
            color: member.available ? "#6EE7B7" : "#FCA5A5",
            fontSize: "0.63rem", fontWeight: 700,
            padding: "0.22rem 0.6rem", borderRadius: "100px",
          }}
        >
          <span
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              backgroundColor: member.available ? "#10B981" : "#EF4444",
              flexShrink: 0,
            }}
          />
          {member.available ? "Available" : "Booked"}
        </span>
        <span
          style={{
            position: "absolute", top: "0.75rem", left: "0.75rem",
            backgroundColor: SKILL_ACCENT,
            color: "#FAF7F2",
            fontSize: "0.62rem", fontWeight: 700,
            padding: "0.22rem 0.6rem", borderRadius: "100px",
            letterSpacing: "0.04em",
          }}
        >
          {SKILL_CATEGORIES.find((s) => s.skill === member.skill)?.emoji} {member.skill}
        </span>
        <div style={{ position: "absolute", bottom: "0.75rem", left: "0.875rem" }}>
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem", fontWeight: 900,
              color: "#FAF7F2", letterSpacing: "-0.01em",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {member.name}
          </p>
          <p style={{ fontSize: "0.7rem", color: "rgba(250,247,242,0.75)", fontWeight: 500 }}>
            📍 {member.city}
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1C1410" }}>
            ⭐ {member.rating}{" "}
            <span style={{ color: "#9B8070", fontWeight: 400 }}>({member.reviewCount} reviews)</span>
          </span>
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: SKILL_ACCENT }}>
            ₹{member.rate.toLocaleString()}
            <span style={{ fontSize: "0.65rem", color: "#9B8070", fontWeight: 400 }}>/hr</span>
          </span>
        </div>

        <div
          style={{
            display: "flex", gap: "0.5rem",
            backgroundColor: "#FAF7F2",
            borderRadius: "10px",
            padding: "0.5rem 0.75rem",
          }}
        >
          <div style={{ flex: 1, textAlign: "center" }}>
            <p style={{ fontSize: "0.62rem", color: "#9B8070", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>Sessions</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1C1410" }}>{member.sessionsDone}</p>
          </div>
          <div style={{ width: "1px", backgroundColor: "#E8DED0" }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <p style={{ fontSize: "0.62rem", color: "#9B8070", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>Experience</p>
            <p style={{ fontSize: "0.9rem", fontWeight: 800, color: "#1C1410" }}>{member.experience}</p>
          </div>
          {member.instagram && (
            <>
              <div style={{ width: "1px", backgroundColor: "#E8DED0" }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <p style={{ fontSize: "0.62rem", color: "#9B8070", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.1rem" }}>Instagram</p>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: SKILL_ACCENT }}>{member.instagram}</p>
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
          {member.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: SKILL_BG,
                color: "#5C3FA0",
                fontSize: "0.65rem", fontWeight: 600,
                padding: "0.2rem 0.55rem", borderRadius: "6px",
                border: "1px solid rgba(124,92,191,0.15)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/creators-crew/${member.id}`}
          style={{
            display: "block", textAlign: "center",
            padding: "0.65rem",
            backgroundColor: member.available ? SKILL_ACCENT : "#E8DED0",
            color: member.available ? "#FAF7F2" : "#9B8070",
            borderRadius: "10px",
            fontSize: "0.85rem", fontWeight: 700,
            textDecoration: "none",
            transition: "background-color 0.18s",
            marginTop: "auto",
            cursor: member.available ? "pointer" : "default",
            pointerEvents: member.available ? "auto" : "none",
          }}
        >
          {member.available ? "Add to Booking →" : "Currently Booked"}
        </Link>
      </div>
    </div>
  );
}

// ── MAIN SECTION COMPONENT ────────────────────────────────────────────────────
export default function CreatorsCrew() {
  const [activeSkill, setActiveSkill] = useState<Skill | "All">("All");
  const [activeCity, setActiveCity] = useState<City | "All">("All");
  const [activeExp, setActiveExp] = useState<ExperienceLevel | "All">("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "rate_asc" | "rate_desc" | "sessions">("rating");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let list = [...CREW];
    if (activeSkill !== "All") list = list.filter((c) => c.skill === activeSkill);
    if (activeCity !== "All") list = list.filter((c) => c.city === activeCity);
    if (activeExp !== "All") list = list.filter((c) => c.experience === activeExp);
    if (showAvailableOnly) list = list.filter((c) => c.available);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.skill.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "rate_asc": list.sort((a, b) => a.rate - b.rate); break;
      case "rate_desc": list.sort((a, b) => b.rate - a.rate); break;
      case "sessions": list.sort((a, b) => b.sessionsDone - a.sessionsDone); break;
    }
    return list;
  }, [activeSkill, activeCity, activeExp, showAvailableOnly, sortBy, searchQuery]);

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #1C1410 0%, #2D1F14 60%, #1C1410 100%)",
          padding: "5rem 2rem 4rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", border: "1px solid rgba(124,92,191,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "240px", height: "240px", borderRadius: "50%", border: "1px solid rgba(124,92,191,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "8%", width: "300px", height: "300px", borderRadius: "50%", border: "1px solid rgba(196,112,58,0.08)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "700px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  backgroundColor: "rgba(124,92,191,0.15)",
                  border: "1px solid rgba(124,92,191,0.3)",
                  color: "#C4A8FF",
                  fontSize: "0.72rem", fontWeight: 700,
                  padding: "0.35rem 1rem", borderRadius: "100px",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                }}
              >
                🎨 Creator&apos;s Crew
              </span>
              <span style={{ fontSize: "0.68rem", color: "#7A6050", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10B981", display: "inline-block" }} />
                {CREW.filter((c) => c.available).length} available now
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 900, color: "#FAF7F2",
                letterSpacing: "-0.03em", lineHeight: 1.1,
                marginBottom: "1rem",
              }}
            >
              Add a Pro to
              <br />
              <span style={{ color: "#C4703A", fontStyle: "italic" }}>Your Session.</span>
            </h1>
            <p style={{ fontSize: "1rem", color: "#9B7B60", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "520px" }}>
              Browse vetted photographers, videographers, makeup artists, editors, and more.
              Add them directly at checkout — no DMs, no negotiation, no hassle.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {[
                { val: `${CREW.length}+`, label: "Verified Crew" },
                { val: "9", label: "Skill Types" },
                { val: "₹1,500+", label: "Starting Rate" },
                { val: "100%", label: "Platform Protected" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                    padding: "0.6rem 1rem",
                    display: "flex", flexDirection: "column",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: SKILL_ACCENT }}>{val}</span>
                  <span style={{ fontSize: "0.68rem", color: "#7A6050", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILL CATEGORY STRIP ── */}
      <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E8DED0", padding: "0 2rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "0", overflowX: "auto", scrollbarWidth: "none" }}>
          {SKILL_CATEGORIES.map(({ skill, emoji }) => {
            const active = activeSkill === skill;
            return (
              <button
                key={skill}
                onClick={() => setActiveSkill(skill)}
                style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "0.2rem",
                  padding: "1rem 1.25rem",
                  fontSize: "0.75rem", fontWeight: active ? 800 : 600,
                  color: active ? SKILL_ACCENT : "#7A6050",
                  background: "none",
                  border: "none",
                  borderBottom: `2.5px solid ${active ? SKILL_ACCENT : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                  transition: "all 0.18s",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>{emoji}</span>
                {skill}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── FILTERS + GRID ── */}
      <section style={{ padding: "2.5rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* Filter bar */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "2rem" }}>
            <input
              type="search"
              placeholder="Search by name, skill, specialty…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: "1 1 220px",
                padding: "0.6rem 1rem",
                fontSize: "0.875rem",
                color: "#1C1410",
                backgroundColor: "#FFFFFF",
                border: "1.5px solid #E8DED0",
                borderRadius: "10px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />

            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value as City | "All")}
              style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#5C4A3A", backgroundColor: "#FFFFFF", border: "1.5px solid #E8DED0", borderRadius: "10px", outline: "none", fontFamily: "inherit", cursor: "pointer", appearance: "none" }}
            >
              {CITIES.map((c) => <option key={c}>{c === "All" ? "All Cities" : c}</option>)}
            </select>

            <select
              value={activeExp}
              onChange={(e) => setActiveExp(e.target.value as ExperienceLevel | "All")}
              style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#5C4A3A", backgroundColor: "#FFFFFF", border: "1.5px solid #E8DED0", borderRadius: "10px", outline: "none", fontFamily: "inherit", cursor: "pointer", appearance: "none" }}
            >
              {EXPERIENCE_LEVELS.map((e) => <option key={e}>{e === "All" ? "All Experience" : e}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", color: "#5C4A3A", backgroundColor: "#FFFFFF", border: "1.5px solid #E8DED0", borderRadius: "10px", outline: "none", fontFamily: "inherit", cursor: "pointer", appearance: "none" }}
            >
              <option value="rating">Top Rated</option>
              <option value="sessions">Most Sessions</option>
              <option value="rate_asc">Rate: Low → High</option>
              <option value="rate_desc">Rate: High → Low</option>
            </select>

            <label
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                fontSize: "0.82rem", fontWeight: 600, color: "#5C4A3A",
                cursor: "pointer",
                backgroundColor: showAvailableOnly ? "rgba(16,185,129,0.08)" : "#FFFFFF",
                border: `1.5px solid ${showAvailableOnly ? "#10B981" : "#E8DED0"}`,
                padding: "0.55rem 0.875rem",
                borderRadius: "10px",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
              }}
            >
              <input
                type="checkbox"
                checked={showAvailableOnly}
                onChange={(e) => setShowAvailableOnly(e.target.checked)}
                style={{ accentColor: "#10B981" }}
              />
              Available Only
            </label>

            <span style={{ fontSize: "0.8rem", color: "#9B8070", marginLeft: "auto", whiteSpace: "nowrap" }}>
              {filtered.length} crew member{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" }}>
              {filtered.map((member) => (
                <CrewCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "5rem 2rem", backgroundColor: "#FFFFFF", borderRadius: "20px", border: "1px solid #E8DED0" }}>
              <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</p>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.3rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>
                No crew members found
              </p>
              <p style={{ fontSize: "0.875rem", color: "#9B8070" }}>Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── JOIN CTA BANNER ── */}
      <section style={{ backgroundColor: "#1C1410", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(124,92,191,0.15)",
              border: "1px solid rgba(124,92,191,0.3)",
              color: "#C4A8FF",
              fontSize: "0.72rem", fontWeight: 700,
              padding: "0.35rem 1rem", borderRadius: "100px",
              letterSpacing: "0.08em", textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            For Creative Professionals
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              fontWeight: 900, color: "#FAF7F2",
              letterSpacing: "-0.02em", lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Get Booked at Checkout.
            <br />
            <span style={{ color: SKILL_ACCENT, fontStyle: "italic" }}>Zero cold DMs.</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#7A6050", lineHeight: 1.75, marginBottom: "2rem", maxWidth: "520px", margin: "0 auto 2rem" }}>
            Register as Crew and appear as an add-on option when creators book studios and cafés.
            Your rate, your availability, your rules.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/login?portal=crew&mode=register"
              style={{
                backgroundColor: SKILL_ACCENT,
                color: "#FAF7F2",
                padding: "0.875rem 2rem",
                borderRadius: "10px",
                fontSize: "0.95rem", fontWeight: 700,
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#6348A0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = SKILL_ACCENT)}
            >
              Join as Crew →
            </Link>
            <Link
              href="/login?portal=crew&mode=login"
              style={{
                backgroundColor: "transparent",
                color: "#C4A8FF",
                padding: "0.875rem 2rem",
                borderRadius: "10px",
                fontSize: "0.95rem", fontWeight: 700,
                textDecoration: "none",
                border: "1.5px solid rgba(124,92,191,0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(124,92,191,0.1)";
                e.currentTarget.style.borderColor = SKILL_ACCENT;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "rgba(124,92,191,0.4)";
              }}
            >
              Already a member? Sign in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}