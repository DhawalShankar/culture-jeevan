"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Creator {
  id: string;
  profile_id: string;
  category: string;
  sub_category: string | null;
  starting_price: number;
  advance_percentage: number; // 50–80 as per blueprint
  experience: string | null;
  languages: string | null;
  bio: string | null;
  creator_description: string | null;
  skills: string[] | null;
  occasion_types: string[] | null; // Wedding, Corporate, College Fest, etc.
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

interface CreatorSlot {
  id: string;
  creator_id: string;
  slot_date: string;       // ISO date string "YYYY-MM-DD"
  slot_type: "hourly" | "half_day" | "full_day" | "multi_day";
  start_time: string | null;
  end_time: string | null;
  half_day_period: "morning" | "afternoon" | "evening" | null;
  end_date: string | null; // for multi-day
  is_booked: boolean;
}

interface BadgeTier {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  minReviews: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BADGE_TIERS: BadgeTier[] = [
  { label: "Platinum", color: "#1A1A2E", bg: "#E8E8F5", border: "#9090C8", icon: "💎", minReviews: 1000 },
  { label: "Gold",     color: "#7A5200", bg: "#FFF3CC", border: "#D4A017", icon: "🥇", minReviews: 500  },
  { label: "Silver",   color: "#4A4A4A", bg: "#F0F0F0", border: "#A0A0A0", icon: "🥈", minReviews: 200  },
  { label: "CJ Verified", color: "#1C6B5A", bg: "#E8F5F2", border: "#4CAF90", icon: "✓", minReviews: 50 },
];

const CREATOR_CATEGORY_ICON: Record<string, string> = {
  "Photographer":        "📸",
  "Videographer":        "🎬",
  "Cinematographer":     "🎥",
  "Drone Pilot":         "🚁",
  "Video Editor":        "🎨",
  "Motion Designer":     "✨",
  "Colorist":            "🎞️",
  "Sound Engineer":      "🎙️",
  "Lighting Professional": "💡",
  "Singer":              "🎤",
  "Musician":            "🎵",
  "Tabla Player":        "🥁",
  "Dancer":              "💃",
  "Stand-Up Comedian":   "🎭",
  "Poet":                "✍️",
  "Mehendi Artist":      "🌿",
  "Makeup Artist":       "💄",
  "default":             "🎯",
};

const OCCASION_ICONS: Record<string, string> = {
  "Wedding":       "💍",
  "Corporate":     "🏢",
  "College Fest":  "🎓",
  "Birthday":      "🎂",
  "Concert":       "🎸",
  "Brand Campaign":"📣",
  "Short Film":    "🎬",
  "Product Shoot": "📦",
  "Reel / Content":"📱",
  "Open Mic":      "🎤",
  "default":       "🎪",
};

const HALF_DAY_PERIODS = [
  { key: "morning",   label: "Morning",   time: "10:00 AM – 2:00 PM"  },
  { key: "afternoon", label: "Afternoon", time: "4:00 PM – 8:00 PM"   },
  { key: "evening",   label: "Evening",   time: "6:00 PM – 10:00 PM"  },
] as const;

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=85",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85",
];

function getBadge(reviewCount: number, avgRating: number): BadgeTier | null {
  if (avgRating < 4) return null;
  return BADGE_TIERS.find((b) => reviewCount >= b.minReviews) ?? null;
}

function getImages(creator: Creator): string[] {
  if (creator.images && creator.images.length > 0) return creator.images;
  return FALLBACK_IMAGES;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem" }}>
          <div>
            <div style={{ height: "420px", borderRadius: "20px", background: "linear-gradient(90deg,#F0E8DC 25%,#E8DED0 50%,#F0E8DC 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: "1.5rem" }} />
            {[240, 180, 120].map((w, i) => (
              <div key={i} style={{ height: "18px", width: `${w}px`, borderRadius: "6px", background: "#E8DED0", marginBottom: "0.75rem" }} />
            ))}
          </div>
          <div style={{ height: "520px", borderRadius: "20px", background: "#E8DED0" }} />
        </div>
      </div>
      <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎭</span>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: "#1C1410", marginBottom: "0.5rem" }}>Creator Not Found</h2>
        <p style={{ color: "#9B7B60", marginBottom: "1.5rem" }}>This profile may have been removed or the link is incorrect.</p>
        <Link href="/creators" style={{ backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Browse All Creators →
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410", marginBottom: "1rem", paddingBottom: "0.625rem", borderBottom: "1.5px solid #E8DED0" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreatorDetail({ id }: { id: string }) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [slots, setSlots] = useState<CreatorSlot[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Gallery
  const [activeImage, setActiveImage] = useState(0);

  // Slot selection state
  const [selectedDate, setSelectedDate] = useState("");
  const [slotType, setSlotType] = useState<"hourly" | "half_day" | "full_day" | "multi_day">("hourly");
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [endDate, setEndDate] = useState("");

  // Request form state
  const [requestStep, setRequestStep] = useState<"slot" | "details" | "custom">("slot");
  const [requestType, setRequestType] = useState<"standard" | "custom">("standard");
  const [occasionType, setOccasionType] = useState("");
  const [locationText, setLocationText] = useState("");
  const [eventNote, setEventNote] = useState("");
  const [requesterName, setRequesterName] = useState("");
  const [requesterPhone, setRequesterPhone] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [customScope, setCustomScope] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ── Fetch ──
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const supabase = createClient();

      const { data: creatorData, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !creatorData) { setNotFound(true); setLoading(false); return; }
      setCreator(creatorData);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, phone, city, bio, instagram_handle, portfolio_url")
        .eq("id", creatorData.profile_id)
        .single();
      setProfile(profileData ?? null);

      const { data: slotData } = await supabase
        .from("creator_slots")
        .select("*")
        .eq("creator_id", id)
        .eq("is_booked", false)
        .gte("slot_date", new Date().toISOString().split("T")[0])
        .order("slot_date", { ascending: true });
      setSlots(slotData ?? []);

      const { count, data: reviewData } = await supabase
        .from("reviews")
        .select("rating", { count: "exact" })
        .eq("creator_id", id);
      const total = count ?? 0;
      setReviewCount(total);
      if (total > 0 && reviewData) {
        const avg = reviewData.reduce((s, r) => s + (r.rating ?? 0), 0) / total;
        setAvgRating(Math.round(avg * 10) / 10);
      }

      setLoading(false);
    }
    fetchAll();
  }, [id]);

  if (loading) return <Skeleton />;
  if (notFound || !creator) return <NotFound />;

  const images = getImages(creator);
  const badge = getBadge(reviewCount, avgRating);
  const icon = CREATOR_CATEGORY_ICON[creator.category] ?? CREATOR_CATEGORY_ICON["default"];

  // Slots for chosen date + type
  const slotsForDate = slots.filter(
    (s) => s.slot_date === selectedDate && s.slot_type === slotType
  );
  const selectedSlot = slots.find((s) => s.id === selectedSlotId) ?? null;

  // Compute price
  const advancePct = creator.advance_percentage ?? 50;
  const basePrice = creator.starting_price;
  const advanceAmount = Math.round(basePrice * (advancePct / 100));
  const balanceAmount = basePrice - advanceAmount;

  // Unique available dates for chosen slot type
  const availableDates = [
    ...new Set(
      slots.filter((s) => s.slot_type === slotType).map((s) => s.slot_date)
    ),
  ].sort();

  const canProceedToDetails =
    selectedDate &&
    selectedSlotId &&
    (slotType !== "multi_day" || endDate);

  const canSubmit =
    requesterName.trim() &&
    requesterPhone.trim().length >= 10 &&
    occasionType &&
    locationText.trim();

  // ── Handlers ──
  async function handleSubmitRequest() {
    if (!canSubmit || !creator) return;
    setSubmitting(true);
    const supabase = createClient();
    const payload = {
      creator_id: creator.id,
      slot_id: selectedSlotId,
      requester_name: requesterName.trim(),
      requester_phone: requesterPhone.trim(),
      occasion_type: occasionType,
      location: locationText.trim(),
      note: eventNote.trim() || null,
      request_type: requestType,
      custom_budget: requestType === "custom" ? customBudget : null,
      custom_scope: requestType === "custom" ? customScope.trim() : null,
      status: "pending",
    };
    await supabase.from("booking_requests").insert(payload);
    setSubmitting(false);
    setSubmitted(true);
  }

  const skills = creator.skills ?? [];
  const occasions = creator.occasion_types ?? [];

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 0", display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#9B7B60", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Home</Link>
        <span>›</span>
        <Link href="/creators" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Book a Creator</Link>
        <span>›</span>
        <span style={{ color: "#1C1410", fontWeight: 500 }}>{profile?.full_name ?? creator.category}</span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 5rem" }}>
        <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Image Gallery */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", height: "420px", backgroundColor: "#D4B896", marginBottom: "0.75rem", position: "relative" }}>
                <img src={images[activeImage]} alt={profile?.full_name ?? creator.category}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                {/* Badge overlay */}
                {badge && (
                  <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", alignItems: "center", gap: "0.35rem", backgroundColor: badge.bg, border: `1.5px solid ${badge.border}`, borderRadius: "100px", padding: "0.3rem 0.75rem", backdropFilter: "blur(4px)" }}>
                    <span style={{ fontSize: "0.9rem" }}>{badge.icon}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 800, color: badge.color, letterSpacing: "0.04em" }}>
                      {badge.label === "CJ Verified" ? "CJ Verified" : `CJ ${badge.label}`}
                    </span>
                  </div>
                )}
                {/* Premium tag */}
                <div style={{ position: "absolute", top: "1rem", right: "1rem", backgroundColor: "rgba(28,20,16,0.75)", backdropFilter: "blur(4px)", borderRadius: "100px", padding: "0.28rem 0.65rem" }}>
                  <span style={{ fontSize: "0.67rem", fontWeight: 700, color: "#FAD97A", letterSpacing: "0.08em", textTransform: "uppercase" }}>⭐ Premium</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {images.slice(0, 4).map((img, i) => (
                  <div key={i} onClick={() => setActiveImage(i)}
                    style={{ borderRadius: "10px", overflow: "hidden", height: "80px", cursor: "pointer", border: `2px solid ${activeImage === i ? "#C4703A" : "transparent"}`, transition: "border-color 0.2s", opacity: activeImage === i ? 1 : 0.7 }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Title + Meta */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ backgroundColor: "#F0DCC8", color: "#8B4513", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>
                    {icon} {creator.category}{creator.sub_category ? ` · ${creator.sub_category}` : ""}
                  </span>
                  <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {profile?.full_name ?? "Creator"}
                  </h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 800, color: "#C4703A" }}>
                    ₹{creator.starting_price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#9B7B60" }}>starting price</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                {profile?.city && <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>📍 {profile.city}</span>}
                {creator.experience && <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>🎯 {creator.experience} experience</span>}
                {creator.languages && <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>🗣️ {creator.languages}</span>}
                {reviewCount > 0 && (
                  <span style={{ fontSize: "0.875rem", color: "#7A5C42", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ color: "#F5A623" }}>{"★".repeat(Math.round(avgRating))}</span>
                    {avgRating} ({reviewCount} reviews)
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.875rem", flexWrap: "wrap" }}>
                {(creator.instagram_handle ?? profile?.instagram_handle) && (
                  <a href={`https://instagram.com/${(creator.instagram_handle ?? profile?.instagram_handle ?? "").replace("@", "")}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 600, color: "#C4703A", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.3rem 0.75rem", borderRadius: "100px", textDecoration: "none" }}>
                    📷 Instagram
                  </a>
                )}
                {creator.youtube_url && (
                  <a href={creator.youtube_url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 600, color: "#C4703A", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.3rem 0.75rem", borderRadius: "100px", textDecoration: "none" }}>
                    ▶️ YouTube
                  </a>
                )}
                {(creator.portfolio_url ?? profile?.portfolio_url) && (
                  <a href={creator.portfolio_url ?? profile?.portfolio_url ?? "#"} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", fontWeight: 600, color: "#7A5C42", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", padding: "0.3rem 0.75rem", borderRadius: "100px", textDecoration: "none" }}>
                    🔗 Portfolio
                  </a>
                )}
              </div>
            </div>

            {/* How Booking Works */}
            <Section title="How Booking Works">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }} className="how-grid">
                {[
                  { step: "01", icon: "📋", title: "Send a Request", desc: "Share your event details — occasion, date, location, and what you need. The creator reviews before accepting." },
                  { step: "02", icon: "✅", title: "Creator Accepts", desc: "If they're comfortable with the brief, they accept. For custom scope, they reply with a quote. You get 24 hours to confirm." },
                  { step: "03", icon: "💳", title: "Pay the Advance", desc: `Pay ${advancePct}% advance on the platform to confirm. Balance paid directly to creator after the work is done.` },
                ].map((s) => (
                  <div key={s.step} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.125rem", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: "0.5rem", right: "0.75rem", fontSize: "2.5rem", fontFamily: "var(--font-playfair)", fontWeight: 900, color: "#F5EFE7", lineHeight: 1, userSelect: "none" }}>{s.step}</span>
                    <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "0.5rem" }}>{s.icon}</span>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.875rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.375rem" }}>{s.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "#6B5240", lineHeight: 1.65 }}>{s.desc}</p>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", backgroundColor: "#C4703A", opacity: 0.35 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.875rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>ℹ️</span>
                <p style={{ fontSize: "0.78rem", color: "#8B4513", lineHeight: 1.65 }}>
                  <strong>Important:</strong> Creators review every booking request and can accept or decline. Sending a request is not a confirmed booking — confirmation happens only after creator acceptance and advance payment. No open slot = no booking possible.
                </p>
              </div>
            </Section>

            {/* About */}
            {(creator.creator_description ?? profile?.bio) && (
              <Section title="About This Creator">
                <p style={{ fontSize: "0.95rem", color: "#5C4A3A", lineHeight: 1.8 }}>
                  {creator.creator_description ?? profile?.bio}
                </p>
              </Section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <Section title="Skills & Specialisations">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {skills.map((skill) => (
                    <span key={skill} style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "100px", padding: "0.4rem 0.875rem", fontSize: "0.82rem", fontWeight: 500, color: "#5C4A3A" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            {/* Occasions */}
            {occasions.length > 0 && (
              <Section title="Available For">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.625rem" }}>
                  {occasions.map((occ) => (
                    <div key={occ} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.55rem 0.875rem" }}>
                      <span style={{ fontSize: "1rem" }}>{OCCASION_ICONS[occ] ?? OCCASION_ICONS["default"]}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#5C4A3A" }}>{occ}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Pricing & Advance */}
            <Section title="Pricing & Advance">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Starting Price</p>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 900, color: "#C4703A" }}>₹{creator.starting_price.toLocaleString()}</p>
                  <p style={{ fontSize: "0.75rem", color: "#9B7B60", marginTop: "0.25rem" }}>Custom pricing via request for complex briefs</p>
                </div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Advance Required</p>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 900, color: "#1C1410" }}>{advancePct}%</p>
                  <p style={{ fontSize: "0.75rem", color: "#9B7B60", marginTop: "0.25rem" }}>Paid on platform to confirm. Balance to creator directly.</p>
                </div>
              </div>
              <div style={{ marginTop: "0.75rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.75rem 1rem", fontSize: "0.78rem", color: "#6B5240", lineHeight: 1.7 }}>
                💡 <strong>How payment works:</strong> Pay the advance ({advancePct}%) through CultureJeevan when the request is confirmed. On the day of the event, scan the QR code to release the advance to the creator. Pay the remaining {100 - advancePct}% directly — cash or UPI — after the work is done. CultureJeevan takes a 10% commission on the advance only.
              </div>
            </Section>
          </div>

          {/* ── RIGHT COLUMN — Booking Request Card ── */}
          <div style={{
            position: "sticky",
            top: "80px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#E8DED0 transparent",
          }}>

            {submitted ? (
              /* ── Success State ── */
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "20px", padding: "2rem 1.5rem", boxShadow: "0 8px 40px rgba(196,112,58,0.10)", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>🎉</div>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>Request Sent!</h3>
                <p style={{ fontSize: "0.85rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  <strong>{profile?.full_name ?? "The creator"}</strong> will review your request and respond. If they accept, you'll get 24 hours to pay the advance and confirm.
                </p>
                <div style={{ backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.875rem", marginBottom: "1.25rem", textAlign: "left" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.5rem" }}>What Happens Next</p>
                  {[
                    "Creator reviews your event details",
                    "Accepts or sends a custom quote",
                    "You confirm and pay advance within 24 hours",
                    "Booking confirmed — see it in My Bookings",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.3rem", fontSize: "0.78rem", color: "#5C4A3A" }}>
                      <span style={{ color: "#C4703A", fontWeight: 700, flexShrink: 0 }}>→</span> {step}
                    </div>
                  ))}
                </div>
                <Link href="/my-bookings"
                  style={{ display: "block", width: "100%", padding: "0.75rem", backgroundColor: "#C4703A", color: "#FAF7F2", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", boxSizing: "border-box", textAlign: "center" }}>
                  View My Bookings →
                </Link>
                <button onClick={() => { setSubmitted(false); setRequestStep("slot"); setSelectedSlotId(null); setSelectedDate(""); }}
                  style={{ width: "100%", marginTop: "0.5rem", padding: "0.6rem", backgroundColor: "transparent", border: "1.5px solid #E8DED0", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 600, color: "#7A5C42", cursor: "pointer" }}>
                  Send Another Request
                </button>
              </div>
            ) : (
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 8px 40px rgba(196,112,58,0.10)" }}>

                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Send Booking Request
                  </p>
                  {/* Step indicator */}
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
                    {["slot", "details"].map((step, i) => (
                      <div key={step} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: requestStep === step ? "#C4703A" : (requestStep === "details" && step === "slot") ? "#C4703A" : "#E8DED0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "0.6rem", fontWeight: 800, color: (requestStep === step || (requestStep === "details" && step === "slot")) ? "#FAF7F2" : "#B8A090" }}>
                            {(requestStep === "details" && step === "slot") ? "✓" : i + 1}
                          </span>
                        </div>
                        {i === 0 && <div style={{ width: "20px", height: "2px", backgroundColor: requestStep === "details" ? "#C4703A" : "#E8DED0" }} />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Type Toggle */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "3px", marginBottom: "0.875rem", gap: "2px" }}>
                  {(["standard", "custom"] as const).map((t) => (
                    <button key={t} onClick={() => setRequestType(t)}
                      style={{ padding: "0.4rem", borderRadius: "6px", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", backgroundColor: requestType === t ? "#C4703A" : "transparent", color: requestType === t ? "#FAF7F2" : "#7A5C42" }}>
                      {t === "standard" ? "📋 Standard" : "✨ Custom Brief"}
                    </button>
                  ))}
                </div>
                {requestType === "custom" && (
                  <div style={{ backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "8px", padding: "0.6rem 0.875rem", marginBottom: "0.875rem", fontSize: "0.75rem", color: "#8B4513", lineHeight: 1.6 }}>
                    Describe your scope. The creator will reply with a custom price. You'll have 24 hours to pay and confirm.
                  </div>
                )}

                {/* ── STEP 1: Slot Selection ── */}
                {requestStep === "slot" && (
                  <>
                    {/* Slot Type Tabs */}
                    <div style={{ marginBottom: "0.75rem" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Slot Type</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem" }}>
                        {(["hourly", "half_day", "full_day", "multi_day"] as const).map((t) => (
                          <button key={t} onClick={() => { setSlotType(t); setSelectedSlotId(null); setSelectedDate(""); }}
                            style={{ padding: "0.45rem", borderRadius: "8px", border: `1.5px solid ${slotType === t ? "#C4703A" : "#E8DED0"}`, fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", backgroundColor: slotType === t ? "#FDF0E6" : "#FAF7F2", color: slotType === t ? "#C4703A" : "#7A5C42", transition: "all 0.2s" }}>
                            {t === "hourly" ? "⏱ Hourly" : t === "half_day" ? "🌤 Half Day" : t === "full_day" ? "☀️ Full Day" : "📅 Multi-Day"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date picker */}
                    <div style={{ marginBottom: "0.75rem" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Select Date</label>
                      {availableDates.length > 0 ? (
                        <div style={{ maxHeight: "100px", overflowY: "auto", display: "flex", flexWrap: "wrap", gap: "0.3rem", scrollbarWidth: "thin" }}>
                          {availableDates.map((d) => {
                            const dateObj = new Date(d + "T00:00:00");
                            const label = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short", weekday: "short" });
                            return (
                              <button key={d} onClick={() => { setSelectedDate(d); setSelectedSlotId(null); }}
                                style={{ padding: "0.3rem 0.6rem", borderRadius: "8px", border: `1.5px solid ${selectedDate === d ? "#C4703A" : "#E8DED0"}`, fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", backgroundColor: selectedDate === d ? "#FDF0E6" : "#FAF7F2", color: selectedDate === d ? "#C4703A" : "#7A5C42", transition: "all 0.15s", whiteSpace: "nowrap" }}>
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "0.75rem", textAlign: "center", fontSize: "0.78rem", color: "#9B7B60" }}>
                          No open slots for this type yet.<br />Try a different slot type or send a Custom Brief.
                        </div>
                      )}
                    </div>

                    {/* Slots for chosen date */}
                    {selectedDate && slotsForDate.length > 0 && (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                          Available Slots
                        </label>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                          {slotsForDate.map((slot) => {
                            const isSelected = selectedSlotId === slot.id;
                            let slotLabel = "";
                            if (slot.slot_type === "hourly") {
                              slotLabel = `${slot.start_time} – ${slot.end_time}`;
                            } else if (slot.slot_type === "half_day" && slot.half_day_period) {
                              const period = HALF_DAY_PERIODS.find((p) => p.key === slot.half_day_period);
                              slotLabel = period ? `${period.label} · ${period.time}` : slot.half_day_period;
                            } else if (slot.slot_type === "full_day") {
                              slotLabel = "Full Day";
                            } else if (slot.slot_type === "multi_day") {
                              slotLabel = `${slot.slot_date} → ${slot.end_date ?? "…"}`;
                            }

                            return (
                              <button key={slot.id} onClick={() => setSelectedSlotId(isSelected ? null : slot.id)}
                                style={{ padding: "0.55rem 0.875rem", borderRadius: "8px", border: `1.5px solid ${isSelected ? "#C4703A" : "#E8DED0"}`, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: isSelected ? "#FDF0E6" : "#FAF7F2", color: isSelected ? "#C4703A" : "#5C4A3A", transition: "all 0.15s", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>{slotLabel}</span>
                                {isSelected && <span style={{ fontSize: "0.7rem", backgroundColor: "#C4703A", color: "#FAF7F2", borderRadius: "100px", padding: "0.1rem 0.45rem" }}>Selected ✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Multi-day end date */}
                    {slotType === "multi_day" && selectedSlotId && (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>End Date</label>
                        <input type="date" min={selectedDate || new Date().toISOString().split("T")[0]}
                          value={endDate} onChange={(e) => setEndDate(e.target.value)}
                          style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.85rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", boxSizing: "border-box" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                      </div>
                    )}

                    {/* Custom brief scope (shown on step 1 for custom type) */}
                    {requestType === "custom" && (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Describe Your Brief</label>
                        <textarea value={customScope} onChange={(e) => setCustomScope(e.target.value)} rows={3}
                          placeholder="E.g. 2-day destination wedding, 4 functions, drone coverage needed, final deliverables — 300 edited photos + 10-min film"
                          style={{ width: "100%", padding: "0.625rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.8rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                        <div style={{ marginTop: "0.35rem" }}>
                          <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Your Budget (Optional)</label>
                          <input type="text" value={customBudget} onChange={(e) => setCustomBudget(e.target.value)}
                            placeholder="₹ your budget or range"
                            style={{ width: "100%", padding: "0.5rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.8rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", boxSizing: "border-box" }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                            onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setRequestStep("details")}
                      disabled={!canProceedToDetails && availableDates.length > 0}
                      style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, cursor: (canProceedToDetails || availableDates.length === 0) ? "pointer" : "not-allowed", backgroundColor: (canProceedToDetails || (requestType === "custom" && customScope.trim())) ? "#C4703A" : "#E8DED0", color: (canProceedToDetails || (requestType === "custom" && customScope.trim())) ? "#FAF7F2" : "#B8A090", transition: "background-color 0.2s" }}
                      onMouseEnter={(e) => { if (canProceedToDetails) e.currentTarget.style.backgroundColor = "#A85C2E"; }}
                      onMouseLeave={(e) => { if (canProceedToDetails) e.currentTarget.style.backgroundColor = "#C4703A"; }}>
                      {!selectedDate && availableDates.length > 0 ? "Select a Date First"
                        : !selectedSlotId && availableDates.length > 0 ? "Pick a Slot to Continue"
                        : "Continue → Add Event Details"}
                    </button>
                  </>
                )}

                {/* ── STEP 2: Event Details ── */}
                {requestStep === "details" && (
                  <>
                    {/* Slot summary */}
                    <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.625rem 0.875rem", marginBottom: "0.875rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Selected Slot</p>
                        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#1C1410" }}>
                          {selectedDate
                            ? new Date(selectedDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "long" })
                            : "Custom Brief"}
                          {" · "}
                          {slotType === "hourly" ? "Hourly"
                            : slotType === "half_day" ? HALF_DAY_PERIODS.find((p) => p.key === selectedSlot?.half_day_period)?.label ?? "Half Day"
                            : slotType === "full_day" ? "Full Day"
                            : `Multi-Day → ${endDate}`}
                        </p>
                      </div>
                      <button onClick={() => setRequestStep("slot")}
                        style={{ fontSize: "0.67rem", fontWeight: 600, color: "#C4703A", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.2rem 0.5rem", borderRadius: "100px", cursor: "pointer" }}>
                        Change
                      </button>
                    </div>

                    {/* Form fields */}
                    {[
                      { label: "Your Name", value: requesterName, setter: setRequesterName, placeholder: "Full name", type: "text" },
                      { label: "Your Phone", value: requesterPhone, setter: setRequesterPhone, placeholder: "10-digit number", type: "tel" },
                      { label: "Event Location", value: locationText, setter: setLocationText, placeholder: "Venue name, area, city", type: "text" },
                    ].map((field) => (
                      <div key={field.label} style={{ marginBottom: "0.625rem" }}>
                        <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>{field.label}</label>
                        <input type={field.type} value={field.value} onChange={(e) => field.setter(e.target.value)}
                          placeholder={field.placeholder}
                          style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.85rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", boxSizing: "border-box" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                      </div>
                    ))}

                    {/* Occasion type */}
                    <div style={{ marginBottom: "0.625rem" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Occasion Type</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                        {(occasions.length > 0 ? occasions : Object.keys(OCCASION_ICONS).filter((k) => k !== "default")).map((occ) => (
                          <button key={occ} onClick={() => setOccasionType(occ)}
                            style={{ padding: "0.3rem 0.6rem", borderRadius: "100px", border: `1.5px solid ${occasionType === occ ? "#C4703A" : "#E8DED0"}`, fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", backgroundColor: occasionType === occ ? "#FDF0E6" : "#FAF7F2", color: occasionType === occ ? "#C4703A" : "#7A5C42", transition: "all 0.15s" }}>
                            {OCCASION_ICONS[occ] ?? "🎪"} {occ}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note */}
                    <div style={{ marginBottom: "0.875rem" }}>
                      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Additional Note (Optional)</label>
                      <textarea value={eventNote} onChange={(e) => setEventNote(e.target.value)} rows={2}
                        placeholder="Any specific requirements, references, or context for the creator..."
                        style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.8rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", resize: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: 1.6 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>

                    {/* Price preview */}
                    <div style={{ backgroundColor: "#F5EFE7", borderRadius: "10px", padding: "0.75rem 0.875rem", marginBottom: "0.875rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>
                          {requestType === "custom" ? "Price (set by creator)" : "Starting Price"}
                        </span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5C4A3A" }}>
                          {requestType === "custom" ? "TBD" : `₹${creator.starting_price.toLocaleString()}`}
                        </span>
                      </div>
                      <div style={{ borderTop: "1px dashed #E8DED0", paddingTop: "0.35rem", display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>Advance ({advancePct}%)</span>
                        <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: "#C4703A" }}>
                          {requestType === "custom" ? "After quote" : `₹${advanceAmount.toLocaleString()}`}
                        </span>
                      </div>
                      {requestType !== "custom" && (
                        <p style={{ fontSize: "0.67rem", color: "#B8A090", marginTop: "0.25rem" }}>
                          Balance ₹{balanceAmount.toLocaleString()} paid directly to creator after work.
                        </p>
                      )}
                    </div>

                    <button onClick={handleSubmitRequest} disabled={!canSubmit || submitting}
                      style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: (canSubmit && !submitting) ? "pointer" : "not-allowed", backgroundColor: (canSubmit && !submitting) ? "#C4703A" : "#E8DED0", color: (canSubmit && !submitting) ? "#FAF7F2" : "#B8A090", transition: "background-color 0.2s" }}
                      onMouseEnter={(e) => { if (canSubmit && !submitting) e.currentTarget.style.backgroundColor = "#A85C2E"; }}
                      onMouseLeave={(e) => { if (canSubmit && !submitting) e.currentTarget.style.backgroundColor = "#C4703A"; }}>
                      {submitting ? "Sending Request…" : requestType === "custom" ? "Send Custom Brief →" : "Send Booking Request →"}
                    </button>

                    <p style={{ fontSize: "0.67rem", color: "#B8A090", textAlign: "center", marginTop: "0.5rem", lineHeight: 1.5 }}>
                      📋 No payment yet · Creator reviews first<br />
                      Advance paid only after acceptance
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Refund / Cancellation */}
            <div style={{ marginTop: "0.625rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "12px", padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Cancellation Policy</p>
              {[
                { dot: "🟢", text: "Full refund if cancelled 5+ days before event" },
                { dot: "🔴", text: "No refund if cancelled less than 5 days before" },
                { dot: "🟠", text: "Creator no-show → advance returned in T+2 days" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.4rem", fontSize: "0.73rem", color: "#6B5240", alignItems: "flex-start", marginBottom: i < 2 ? "0.2rem" : 0 }}>
                  <span style={{ flexShrink: 0 }}>{item.dot}</span>{item.text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #E8DED0; border-radius: 4px; }
      `}</style>
    </div>
  );
}