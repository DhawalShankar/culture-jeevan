"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Creator {
  id: string;
  profile_id: string;
  category: string;
  sub_category: string | null;
  experience: string | null;
  languages: string | null;
  bio: string | null;
  creator_description: string | null;
  skills: string[] | null;
  occasion_types: string[] | null;
  instagram_handle: string | null;
  youtube_url: string | null;
  portfolio_url: string | null;
  images: string[] | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
  bio: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CREATOR_CATEGORY_ICON: Record<string, string> = {
  Photographer: "📸", Videographer: "🎬", Cinematographer: "🎥",
  "Drone Pilot": "🚁", "Video Editor": "🎨", "Motion Designer": "✨",
  Colorist: "🎞️", "Sound Engineer": "🎙️", "Lighting Professional": "💡",
  Singer: "🎤", Musician: "🎵", "Tabla Player": "🥁",
  Dancer: "💃", "Stand-Up Comedian": "🎭", Poet: "✍️",
  "Mehendi Artist": "🌿", "Makeup Artist": "💄", default: "🎯",
};

const OCCASION_ICONS: Record<string, string> = {
  Wedding: "💍", Corporate: "🏢", "College Fest": "🎓",
  Birthday: "🎂", Concert: "🎸", "Brand Campaign": "📣",
  "Short Film": "🎬", "Product Shoot": "📦", "Reel / Content": "📱",
  "Open Mic": "🎤", Other: "✏️",
};

const ALL_OCCASIONS = [
  "Wedding", "Birthday", "College Fest", "Corporate",
  "Concert", "Open Mic", "Brand Campaign", "Short Film",
  "Product Shoot", "Reel / Content", "Other",
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=85",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85",
];

function getImages(creator: Creator): string[] {
  return creator.images && creator.images.length > 0 ? creator.images : FALLBACK_IMAGES;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="cd-bg cd-min-h">
      <div className="cd-container cd-py-xl">
        <div className="cd-skeleton-hero" />
        <div className="cd-skeleton-body" />
      </div>
      <style>{`
        .cd-bg { background: #FAF8F5; }
        .cd-min-h { min-height: 100vh; }
        .cd-container { max-width: 860px; margin: 0 auto; padding: 0 1.5rem; }
        .cd-py-xl { padding-top: 2.5rem; padding-bottom: 2.5rem; }
        .cd-skeleton-hero {
          height: 340px; border-radius: 20px;
          background: linear-gradient(90deg,#EDE8E0 25%,#E4DED6 50%,#EDE8E0 75%);
          background-size: 200% 100%; animation: shimmer 1.4s infinite; margin-bottom: 1.5rem;
        }
        .cd-skeleton-body {
          height: 220px; border-radius: 16px;
          background: linear-gradient(90deg,#EDE8E0 25%,#E4DED6 50%,#EDE8E0 75%);
          background-size: 200% 100%; animation: shimmer 1.4s infinite 0.2s;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🎭</span>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 900, color: "#1C1410", marginBottom: "0.5rem" }}>Creator Not Found</h2>
        <p style={{ color: "#7A6655", marginBottom: "1.5rem", fontSize: "0.875rem" }}>This profile may have been removed.</p>
        <Link href="/creators" style={{ background: "#C4703A", color: "#FAF8F5", padding: "0.7rem 1.5rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Browse All Creators →
        </Link>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", background: "#EDE8E0", margin: "2rem 0" }} />;
}

function StepIndicator({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Event Details", "Your Info", "Confirm"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
      {steps.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: i < 2 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", flexShrink: 0 }}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: done ? "#C4703A" : active ? "#C4703A" : "#EDE8E0",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.25s",
              }}>
                <span style={{ fontSize: "0.62rem", fontWeight: 800, color: done || active ? "#FAF8F5" : "#A08070" }}>
                  {done ? "✓" : n}
                </span>
              </div>
              <span style={{ fontSize: "0.55rem", fontWeight: 700, color: active ? "#C4703A" : "#A08070", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < 2 && (
              <div style={{ flex: 1, height: "1.5px", background: step > n ? "#C4703A" : "#EDE8E0", transition: "background 0.3s", marginBottom: "14px" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Input styles ─────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.65rem 0.85rem",
  border: "1.5px solid #E2DAD0", borderRadius: "10px",
  fontSize: "0.875rem", color: "#1C1410", background: "#FAF8F5",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.65rem", fontWeight: 700, color: "#9B8070",
  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem",
};

const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "#C4703A");
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderColor = "#E2DAD0");

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreatorDetail({ id }: { id: string }) {
  const { user } = useUser();

  const [creator,     setCreator]     = useState<Creator | null>(null);
  const [profile,     setProfile]     = useState<Profile | null>(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating,   setAvgRating]   = useState(0);
  const [loading,     setLoading]     = useState(true);
  const [notFound,    setNotFound]    = useState(false);

  const [activeImage,    setActiveImage]    = useState(0);
  const [step,           setStep]           = useState<1 | 2 | 3>(1);
  const [eventDate,      setEventDate]      = useState("");
  const [occasionType,   setOccasionType]   = useState("");
  const [locationText,   setLocationText]   = useState("");
  const [budget,         setBudget]         = useState("");
  const [eventNote,      setEventNote]      = useState("");
  const [requesterName,  setRequesterName]  = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  const [requesterCity,  setRequesterCity]  = useState("");
  const [submitting,     setSubmitting]     = useState(false);
  const [submitted,      setSubmitted]      = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const supabase = createClient();
      const { data: creatorData, error } = await supabase.from("creators").select("*").eq("id", id).single();
      if (error || !creatorData) { setNotFound(true); setLoading(false); return; }
      setCreator(creatorData);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, phone, city, bio, instagram_handle, portfolio_url")
        .eq("id", creatorData.profile_id).single();
      setProfile(profileData ?? null);

      const { count, data: reviewData } = await supabase
        .from("reviews").select("rating", { count: "exact" }).eq("creator_id", id);
      const total = count ?? 0;
      setReviewCount(total);
      if (total > 0 && reviewData) {
        setAvgRating(Math.round(reviewData.reduce((s, r) => s + (r.rating ?? 0), 0) / total * 10) / 10);
      }
      setLoading(false);
    }
    fetchAll();
  }, [id]);

  useEffect(() => {
    if (!user) return;
    async function fetchClient() {
      const supabase = createClient();
      const { data } = await supabase.from("profiles").select("full_name, phone, city").eq("clerk_id", user!.id).single();
      setRequesterName(data?.full_name  ?? user!.fullName ?? "");
      setRequesterPhone(data?.phone     ?? "");
      setRequesterCity(data?.city       ?? "");
    }
    fetchClient();
  }, [user]);

  if (loading)              return <Skeleton />;
  if (notFound || !creator) return <NotFound />;

  const images     = getImages(creator);
  const icon       = CREATOR_CATEGORY_ICON[creator.category] ?? CREATOR_CATEGORY_ICON["default"];
  const skills     = creator.skills ?? [];
  const rawOcc     = creator.occasion_types?.length ? creator.occasion_types : ALL_OCCASIONS;
  const occasions  = rawOcc.includes("Other") ? rawOcc : [...rawOcc, "Other"];
  const today      = new Date().toISOString().split("T")[0];

  const step1Valid = eventDate && occasionType && locationText.trim().length > 1 &&
    (occasionType !== "Other" || eventNote.trim().length > 1);
  const step2Valid = requesterName.trim().length > 1 && requesterPhone.trim().length >= 10;

  async function handleSubmit() {
    if (!creator) return;
    setSubmitting(true);
    const supabase = createClient();
    await supabase.from("booking_requests").insert({
      creator_id:      creator.id,
      requester_name:  requesterName.trim(),
      requester_phone: requesterPhone.trim(),
      requester_city:  requesterCity.trim() || null,
      occasion_type:   occasionType,
      event_date:      eventDate,
      location:        locationText.trim(),
      budget:          budget.trim() || null,
      note:            eventNote.trim() || null,
      request_type:    "standard",
      status:          "pending",
    });
    setSubmitting(false);
    setSubmitted(true);
  }

  function resetForm() {
    setSubmitted(false); setStep(1);
    setEventDate(""); setOccasionType(""); setLocationText(""); setBudget(""); setEventNote("");
  }

  const C = {
    bg:      "#FAF8F5",
    dark:    "#1C1410",
    primary: "#C4703A",
    pdark:   "#A85C2E",
    muted:   "#7A6655",
    subtle:  "#9B8070",
    border:  "#E2DAD0",
    surface: "#F3EDE6",
    cream:   "#FDF2E9",
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.25rem 1.5rem 0", display: "flex", gap: "0.4rem", fontSize: "0.78rem", color: C.subtle, alignItems: "center" }}>
        <Link href="/" style={{ color: C.subtle, textDecoration: "none" }}>Home</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <Link href="/creators" style={{ color: C.subtle, textDecoration: "none" }}>Creators</Link>
        <span style={{ opacity: 0.4 }}>›</span>
        <span style={{ color: C.dark, fontWeight: 600 }}>{profile?.full_name ?? creator.category}</span>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.75rem 1.5rem 5rem" }}>

        {/* ══════════ HERO — Name + Category ══════════ */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: C.cream, border: `1px solid #F0DCC8`, borderRadius: "100px", padding: "0.2rem 0.7rem", fontSize: "0.72rem", fontWeight: 700, color: C.primary, marginBottom: "0.6rem" }}>
                <span>{icon}</span>
                <span>{creator.category}{creator.sub_category ? ` · ${creator.sub_category}` : ""}</span>
              </div>
              <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 900, color: C.dark, margin: "0 0 0.5rem", lineHeight: 1.15 }}>
                {profile?.full_name ?? "Creator"}
              </h1>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                {profile?.city && (
                  <span style={{ fontSize: "0.8rem", color: C.muted, display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    📍 {profile.city}
                  </span>
                )}
                {creator.experience && (
                  <span style={{ fontSize: "0.8rem", color: C.muted }}>· {creator.experience} experience</span>
                )}
                {creator.languages && (
                  <span style={{ fontSize: "0.8rem", color: C.muted }}>· {creator.languages}</span>
                )}
                {reviewCount > 0 && (
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#B5860A", background: "#FFFBEF", border: "1px solid #F5E0A0", borderRadius: "100px", padding: "0.15rem 0.6rem" }}>
                    ★ {avgRating} <span style={{ fontWeight: 400, color: C.muted }}>({reviewCount} reviews)</span>
                  </span>
                )}
                {reviewCount >= 50 && (
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#3C3489", background: "#EEEDFE", border: "1px solid #AFA9EC", borderRadius: "100px", padding: "0.15rem 0.6rem" }}>
                    ✓ CJ Verified
                  </span>
                )}
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignSelf: "flex-start" }}>
              {(creator.instagram_handle ?? profile?.instagram_handle) && (
                <a href={`https://instagram.com/${(creator.instagram_handle ?? profile?.instagram_handle ?? "").replace("@", "")}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.75rem", fontWeight: 700, color: C.primary, background: C.cream, border: `1px solid #F0DCC8`, padding: "0.3rem 0.8rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>
                  📷 Instagram
                </a>
              )}
              {creator.youtube_url && (
                <a href={creator.youtube_url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.75rem", fontWeight: 700, color: C.primary, background: C.cream, border: `1px solid #F0DCC8`, padding: "0.3rem 0.8rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>
                  ▶️ YouTube
                </a>
              )}
              {(creator.portfolio_url ?? profile?.portfolio_url) && (
                <a href={creator.portfolio_url ?? profile?.portfolio_url ?? "#"} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.75rem", fontWeight: 600, color: C.muted, background: C.surface, border: `1px solid ${C.border}`, padding: "0.3rem 0.8rem", borderRadius: "100px", textDecoration: "none", whiteSpace: "nowrap" }}>
                  🔗 Portfolio
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ══════════ GALLERY — Slim strip ══════════ */}
        <div style={{ marginBottom: "2.5rem" }}>
          {/* Main image */}
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "380px", position: "relative", background: "#D4B896", marginBottom: "0.5rem" }}>
            <img src={images[activeImage]} alt={profile?.full_name ?? creator.category}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }} />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)`, gap: "0.4rem" }}>
              {images.slice(0, 4).map((img, i) => (
                <div key={i} onClick={() => setActiveImage(i)}
                  style={{ borderRadius: "10px", overflow: "hidden", height: "64px", cursor: "pointer", border: `2px solid ${activeImage === i ? C.primary : "transparent"}`, opacity: activeImage === i ? 1 : 0.55, transition: "all 0.18s" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══════════ ABOUT ══════════ */}
        {(creator.creator_description ?? creator.bio ?? profile?.bio) && (
          <>
            <div>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>About</p>
              <p style={{ fontSize: "1rem", color: "#5C4A3A", lineHeight: 1.9, margin: 0 }}>
                {creator.creator_description ?? creator.bio ?? profile?.bio}
              </p>
            </div>
            <Divider />
          </>
        )}

        {/* ══════════ SKILLS ══════════ */}
        {skills.length > 0 && (
          <>
            <div>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Skills & Specialisations</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {skills.map(skill => (
                  <span key={skill} style={{ background: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "0.35rem 0.85rem", fontSize: "0.82rem", fontWeight: 600, color: "#5C4A3A" }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* ══════════ AVAILABLE FOR ══════════ */}
        {creator.occasion_types && creator.occasion_types.length > 0 && (
          <>
            <div>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Available For</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {creator.occasion_types.map(occ => (
                  <div key={occ} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: "10px", padding: "0.45rem 0.9rem" }}>
                    <span style={{ fontSize: "0.95rem" }}>{OCCASION_ICONS[occ] ?? "🎪"}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#5C4A3A" }}>{occ}</span>
                  </div>
                ))}
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* ══════════ HOW BOOKING WORKS ══════════ */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How Booking Works</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem", marginBottom: "0.75rem" }} className="how-grid">
            {[
              { n: "01", icon: "📋", title: "Send a Request",   desc: "Fill your event details — date, occasion, location, budget." },
              { n: "02", icon: "✅", title: "Creator Responds", desc: "Creator accepts or declines within 24 hours and sets a payment amount." },
              { n: "03", icon: "💳", title: "Pay & Confirm",    desc: "Pay on the platform. Booking is confirmed instantly." },
            ].map(s => (
              <div key={s.n} style={{ background: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.1rem 1.1rem 1rem", position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", top: "0.1rem", right: "0.6rem", fontFamily: "var(--font-playfair)", fontSize: "2.2rem", fontWeight: 900, color: C.surface, lineHeight: 1, userSelect: "none" }}>{s.n}</span>
                <span style={{ fontSize: "1.1rem", display: "block", marginBottom: "0.45rem" }}>{s.icon}</span>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontWeight: 800, color: C.dark, marginBottom: "0.3rem" }}>{s.title}</p>
                <p style={{ fontSize: "0.75rem", color: "#6B5240", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ background: C.cream, border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.7rem 1rem", display: "flex", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", flexShrink: 0 }}>ℹ️</span>
            <p style={{ fontSize: "0.75rem", color: "#8B4513", lineHeight: 1.65, margin: 0 }}>
              Request bhejne se booking confirm <strong>nahi</strong> hoti. Creator accept kare aur payment ho — tab confirm hoti hai.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* ══════════ BOOKING FORM (full-width) ══════════ */}
        {/* ══════════════════════════════════════════ */}
        <div style={{ background: "#FFFFFF", border: `1px solid ${C.border}`, borderRadius: "20px", padding: "2rem", boxShadow: "0 4px 24px rgba(196,112,58,0.06)" }}>

          {submitted ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center", maxWidth: "440px", margin: "0 auto", padding: "1rem 0" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#EFF6EE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 1.25rem" }}>🎉</div>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 900, color: C.dark, marginBottom: "0.5rem" }}>Request Sent!</h3>
              <p style={{ fontSize: "0.88rem", color: "#6B5240", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                <strong>{profile?.full_name ?? "The creator"}</strong> will review your request within 24 hours. If accepted, they'll set a payment amount to confirm the booking.
              </p>
              <div style={{ background: C.cream, border: "1px solid #F0DCC8", borderRadius: "12px", padding: "1rem 1.25rem", marginBottom: "1.5rem", textAlign: "left" }}>
                <p style={{ ...labelStyle, marginBottom: "0.6rem" }}>Next Steps</p>
                {["Creator reviews your event brief", "Accepts or declines within 24 hrs", "If accepted — sets payment amount", "You pay → booking confirmed"].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.8rem", color: "#5C4A3A", marginBottom: "0.3rem" }}>
                    <span style={{ color: C.primary, fontWeight: 700, flexShrink: 0 }}>→</span>{s}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/my-bookings" style={{ flex: 1, display: "block", padding: "0.8rem", background: C.primary, color: C.bg, borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
                  View My Bookings →
                </Link>
                <button onClick={resetForm} style={{ flex: 1, padding: "0.8rem", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontSize: "0.8rem", fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
                  Send Another Request
                </button>
              </div>
            </div>

          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Book this Creator</p>
                <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 900, color: C.dark, margin: 0 }}>
                  {profile?.full_name ?? creator.category}
                </h2>
              </div>

              <StepIndicator step={step} />

              {/* Two-column layout for form fields */}
              <div style={{ maxWidth: "640px" }}>

                {/* ── STEP 1 ── */}
                {step === 1 && (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                      <div>
                        <label style={labelStyle}>Event Date *</label>
                        <input type="date" min={today} value={eventDate}
                          onChange={e => setEventDate(e.target.value)}
                          style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                      </div>
                      <div>
                        <label style={labelStyle}>Event Location *</label>
                        <input type="text" value={locationText} onChange={e => setLocationText(e.target.value)}
                          placeholder="Venue, area, city" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                      </div>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={labelStyle}>Occasion Type *</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                        {occasions.map(occ => (
                          <button key={occ} onClick={() => setOccasionType(occ)}
                            style={{ padding: "0.3rem 0.7rem", borderRadius: "100px", border: `1.5px solid ${occasionType === occ ? C.primary : C.border}`, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", background: occasionType === occ ? C.cream : C.bg, color: occasionType === occ ? C.primary : C.muted, transition: "all 0.15s", fontFamily: "inherit" }}>
                            {OCCASION_ICONS[occ] ?? "🎪"} {occ}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="form-2col">
                      <div>
                        <label style={labelStyle}>Your Budget (Optional)</label>
                        <input type="text" value={budget} onChange={e => setBudget(e.target.value)}
                          placeholder="e.g. ₹5,000 – ₹10,000" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={labelStyle}>
                          {occasionType === "Other" ? "Describe Your Occasion *" : "Additional Note (Optional)"}
                        </label>
                        <textarea value={eventNote} onChange={e => setEventNote(e.target.value)} rows={3}
                          placeholder={occasionType === "Other" ? "Kya occasion hai? Briefly batao..." : "Specific requirements, references, mood..."}
                          style={{ ...inputStyle, resize: "none", lineHeight: 1.65 }}
                          onFocus={focusIn} onBlur={focusOut} />
                        {occasionType === "Other" && !eventNote.trim() && (
                          <p style={{ fontSize: "0.68rem", color: "#C0392B", marginTop: "0.25rem" }}>Please describe your occasion.</p>
                        )}
                      </div>
                    </div>

                    <button onClick={() => setStep(2)} disabled={!step1Valid}
                      style={{ padding: "0.82rem 2rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: step1Valid ? "pointer" : "not-allowed", background: step1Valid ? C.primary : "#E2DAD0", color: step1Valid ? "#FAF8F5" : C.subtle, transition: "background 0.2s", fontFamily: "inherit" }}>
                      Continue → Your Info
                    </button>
                  </>
                )}

                {/* ── STEP 2 ── */}
                {step === 2 && (
                  <>
                    {/* Event summary pill */}
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "0.65rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                      <div>
                        <p style={{ fontSize: "0.82rem", fontWeight: 700, color: C.dark, margin: "0 0 0.1rem" }}>
                          {new Date(eventDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <p style={{ fontSize: "0.74rem", color: C.muted, margin: 0 }}>{occasionType} · {locationText}</p>
                      </div>
                      <button onClick={() => setStep(1)} style={{ fontSize: "0.7rem", fontWeight: 700, color: C.primary, background: C.cream, border: "1px solid #F0DCC8", padding: "0.2rem 0.6rem", borderRadius: "100px", cursor: "pointer", fontFamily: "inherit" }}>
                        Edit
                      </button>
                    </div>

                    {(requesterName || requesterPhone) && (
                      <div style={{ background: "#EFF6EE", border: "1px solid #C3E0BF", borderRadius: "8px", padding: "0.5rem 0.85rem", marginBottom: "1rem", display: "flex", gap: "0.4rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.9rem" }}>✅</span>
                        <p style={{ fontSize: "0.72rem", color: "#2E6B28", margin: 0 }}>Profile se auto-fill kiya gaya hai. Edit karo agar zaroorat ho.</p>
                      </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }} className="form-2col">
                      <div>
                        <label style={labelStyle}>Your Name *</label>
                        <input type="text" value={requesterName} onChange={e => setRequesterName(e.target.value)}
                          placeholder="Full name" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                      </div>
                      <div>
                        <label style={labelStyle}>Your Phone *</label>
                        <input type="tel" value={requesterPhone} onChange={e => setRequesterPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit number" maxLength={10} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                        {requesterPhone && requesterPhone.length < 10 && (
                          <p style={{ fontSize: "0.68rem", color: "#C0392B", marginTop: "0.25rem" }}>10-digit number daalo</p>
                        )}
                      </div>
                      <div>
                        <label style={labelStyle}>Your City</label>
                        <input type="text" value={requesterCity} onChange={e => setRequesterCity(e.target.value)}
                          placeholder="e.g. Lucknow" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button onClick={() => setStep(1)} style={{ padding: "0.78rem 1.5rem", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontSize: "0.85rem", fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
                        ← Back
                      </button>
                      <button onClick={() => setStep(3)} disabled={!step2Valid}
                        style={{ padding: "0.78rem 2rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: step2Valid ? "pointer" : "not-allowed", background: step2Valid ? C.primary : "#E2DAD0", color: step2Valid ? "#FAF8F5" : C.subtle, transition: "background 0.2s", fontFamily: "inherit" }}>
                        Review & Confirm →
                      </button>
                    </div>
                  </>
                )}

                {/* ── STEP 3 ── */}
                {step === 3 && (
                  <>
                    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.1rem 1.25rem", marginBottom: "1.25rem" }}>
                      <p style={{ ...labelStyle, marginBottom: "0.75rem" }}>Request Summary</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.5rem" }}>
                        {[
                          { label: "Creator",  value: profile?.full_name ?? creator.category },
                          { label: "Date",     value: new Date(eventDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }) },
                          { label: "Occasion", value: occasionType },
                          { label: "Location", value: locationText },
                          ...(budget ? [{ label: "Budget", value: budget }] : []),
                          { label: "Name",     value: requesterName },
                          { label: "Phone",    value: requesterPhone },
                          ...(requesterCity ? [{ label: "City", value: requesterCity }] : []),
                        ].map(({ label, value }) => (
                          <div key={label} style={{ padding: "0.4rem 0", borderBottom: `1px solid ${C.border}` }}>
                            <p style={{ fontSize: "0.65rem", fontWeight: 700, color: C.subtle, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 0.1rem" }}>{label}</p>
                            <p style={{ fontSize: "0.82rem", fontWeight: 700, color: C.dark, margin: 0, wordBreak: "break-word" }}>{value}</p>
                          </div>
                        ))}
                      </div>
                      {eventNote && (
                        <div style={{ marginTop: "0.75rem", padding: "0.55rem 0.75rem", background: C.cream, borderRadius: "8px", fontSize: "0.75rem", color: "#6B5240", lineHeight: 1.65 }}>
                          <strong>Note: </strong>{eventNote}
                        </div>
                      )}
                    </div>

                    <div style={{ background: C.cream, border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
                      <p style={{ fontSize: "0.78rem", color: "#8B4513", lineHeight: 1.65, margin: 0 }}>
                        💳 <strong>Abhi koi payment nahi.</strong> Creator accept karega toh payment amount set karega. Tab confirm hogi booking.
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                      <button onClick={() => setStep(2)} disabled={submitting}
                        style={{ padding: "0.78rem 1.5rem", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontSize: "0.85rem", fontWeight: 600, color: C.muted, cursor: "pointer", fontFamily: "inherit" }}>
                        ← Edit
                      </button>
                      <button onClick={handleSubmit} disabled={submitting}
                        style={{ flex: 1, padding: "0.88rem", border: "none", borderRadius: "10px", fontSize: "0.95rem", fontWeight: 700, cursor: submitting ? "not-allowed" : "pointer", background: submitting ? "#E2DAD0" : C.primary, color: submitting ? C.subtle : "#FAF8F5", transition: "background 0.2s", fontFamily: "inherit", boxShadow: submitting ? "none" : "0 4px 14px rgba(196,112,58,0.25)" }}>
                        {submitting ? "Sending…" : "Send Booking Request →"}
                      </button>
                    </div>
                    <p style={{ fontSize: "0.65rem", color: C.subtle, textAlign: "center", marginTop: "0.75rem", lineHeight: 1.5 }}>
                      No payment yet · Creator reviews within 24 hrs
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* ══════════ CANCELLATION POLICY ══════════ */}
        <div style={{ marginTop: "1.5rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.1rem 1.25rem" }}>
          <p style={{ ...labelStyle, marginBottom: "0.6rem" }}>Cancellation Policy</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {[
              { dot: "🟢", text: "Full refund if cancelled 5+ days before event" },
              { dot: "🔴", text: "No refund if cancelled less than 5 days before" },
              { dot: "🟠", text: "Creator no-show → payment returned in T+2 days" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.45rem", fontSize: "0.8rem", color: "#6B5240", alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>{item.dot}</span>{item.text}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .how-grid    { grid-template-columns: 1fr !important; }
          .form-2col   { grid-template-columns: 1fr !important; }
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}