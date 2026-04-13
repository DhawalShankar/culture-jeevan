"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Space {
  id: string;
  profile_id: string;
  space_name: string;
  space_type: string;
  address_line1: string;
  address_area: string;
  address_city: string;
  pincode: string;
  google_maps_url: string | null;
  hourly_rate: number;
  half_day_rate: number;
  full_day_rate: number;
  advance_percentage: number; // 50–80, set by space owner per blueprint
  capacity: number;
  min_booking_hours: number;
  amenities: string[];
  space_rules: string | null;
  space_description: string | null;
  space_type_category: string; // "Cafe" | "Studio"
  images?: string[];
}

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  bio: string | null;
  city: string | null;
}

interface Creator {
  id: string;
  profile_id: string;
  category: string;
  starting_price: number;
  experience: string | null;
  languages: string | null;
  profile?: Profile;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const AMENITY_ICONS: Record<string, string> = {
  "WiFi": "📶",
  "AC": "❄️",
  "Natural Light": "☀️",
  "Parking": "🅿️",
  "Changing Room": "🪞",
  "Makeup Station": "💄",
  "Green Screen": "🟩",
  "Cyclorama Wall": "🎨",
  "Lounge Area": "🛋️",
  "Projector / Screen": "📽️",
  "Soundproofing": "🔇",
  "Kitchen / Pantry": "☕",
  "Rooftop Access": "🏙️",
  "Backup Power": "🔋",
  "Continuous Power": "🔌",
  "Props Available": "📦",
  "Tripod / Stand": "🎬",
  "Ring Light": "💡",
  "Backdrop Stand": "🎭",
  "Coffee / Tea": "☕",
  "Elevator Access": "🛗",
  "Stage": "🎤",
  "PA System": "🔊",
  "Piano": "🎹",
};

const CREATOR_CATEGORY_ICON: Record<string, string> = {
  "Photographer": "📸",
  "Videographer": "🎬",
  "Cinematographer": "🎥",
  "Drone Pilot": "🚁",
  "Video Editor": "🎨",
  "Motion Designer": "✨",
  "Colorist": "🎞️",
  "Sound Engineer": "🎙️",
  "Makeup Artist": "💄",
  "Lighting Professional": "💡",
  "Singer": "🎤",
  "Musician": "🎵",
  "Dancer": "💃",
  "default": "🎯",
};

const TIME_SLOTS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
  "9:00 PM", "10:00 PM",
];

// Blueprint: half-day periods are fixed
const HALF_DAY_PERIODS = [
  { key: "morning",   label: "Morning",   time: "10:00 AM – 2:00 PM"  },
  { key: "afternoon", label: "Afternoon", time: "4:00 PM – 8:00 PM"   },
  { key: "evening",   label: "Evening",   time: "6:00 PM – 10:00 PM"  },
] as const;

const FALLBACK_IMAGES: Record<string, string[]> = {
  "Photography Studio": [
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=85",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85",
  ],
  "Recording Studio": [
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=85",
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=85",
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=900&q=85",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85",
  ],
  "Dance Studio": [
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=900&q=85",
    "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=900&q=85",
    "https://images.unsplash.com/photo-1547153760-18fc86324498?w=900&q=85",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=85",
  ],
  "Cafe": [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=900&q=85",
    "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=900&q=85",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=900&q=85",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=85",
  ],
  "default": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85",
    "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=900&q=85",
  ],
};

function getImages(space: Space): string[] {
  if (space.images && space.images.length > 0) return space.images;
  return FALLBACK_IMAGES[space.space_type] ?? FALLBACK_IMAGES["default"];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem" }}>
          <div>
            <div style={{ height: "420px", borderRadius: "20px", background: "linear-gradient(90deg,#F0E8DC 25%,#E8DED0 50%,#F0E8DC 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: "1.5rem" }} />
            {[200, 150, 100].map((w, i) => (
              <div key={i} style={{ height: "20px", width: `${w}px`, borderRadius: "6px", background: "#E8DED0", marginBottom: "0.75rem" }} />
            ))}
          </div>
          <div style={{ height: "500px", borderRadius: "20px", background: "#E8DED0" }} />
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
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🏛️</span>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: "#1C1410", marginBottom: "0.5rem" }}>Space Not Found</h2>
        <p style={{ color: "#9B7B60", marginBottom: "1.5rem" }}>This space may have been removed or the link is incorrect.</p>
        <Link href="/studios" style={{ backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Browse All Spaces →
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

export default function StudioDetail({ id }: { id: string }) {
  const [space, setSpace] = useState<Space | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<Profile | null>(null);
  const [nearbyCreators, setNearbyCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Gallery
  const [activeImage, setActiveImage] = useState(0);

  // Booking state
  const [bookingType, setBookingType] = useState<"hourly" | "halfday" | "fullday">("hourly");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]); // hourly: time strings
  const [selectedHalfDay, setSelectedHalfDay] = useState<"morning" | "afternoon" | "evening" | null>(null);

  // Creators add-on
  const [selectedCreators, setSelectedCreators] = useState<string[]>([]);
  const [workerPanelOpen, setWorkerPanelOpen] = useState(false);

  // ── Fetch ──
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const supabase = createClient();

      const { data: spaceData, error: spaceErr } = await supabase
        .from("spaces")
        .select("*")
        .eq("id", id)
        .single();

      if (spaceErr || !spaceData) { setNotFound(true); setLoading(false); return; }
      setSpace(spaceData);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, phone, instagram_handle, portfolio_url, bio, city")
        .eq("id", spaceData.profile_id)
        .single();
      setOwnerProfile(profileData ?? null);

      const { data: creatorsData } = await supabase
        .from("creators")
        .select(`
          id, profile_id, category, starting_price, experience, languages,
          profile:profiles!creators_profile_id_fkey (
            id, full_name, phone, instagram_handle, portfolio_url, bio, city
          )
        `)
        .neq("profile_id", spaceData.profile_id)
        .limit(6);

      type CreatorRow = Omit<Creator, "profile"> & { profile: Profile | Profile[] | null };
      const normalized: Creator[] = ((creatorsData ?? []) as CreatorRow[]).map((c) => ({
        ...c,
        profile: Array.isArray(c.profile) ? (c.profile[0] ?? undefined) : (c.profile ?? undefined),
      }));

      const city = spaceData.address_city;
      const filtered = normalized.filter((c) => c.profile?.city === city);
      setNearbyCreators(filtered.length > 0 ? filtered : normalized.slice(0, 4));
      setLoading(false);
    }
    fetchAll();
  }, [id]);

  // ── Helpers ──
  const toggleTimeSlot = (slot: string) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const toggleCreator = (creatorId: string) => {
    setSelectedCreators((prev) =>
      prev.includes(creatorId) ? prev.filter((c) => c !== creatorId) : [...prev, creatorId]
    );
  };

  if (loading) return <Skeleton />;
  if (notFound || !space) return <NotFound />;

  const images = getImages(space);

  // Blueprint: advance_percentage is set by the space (50–80). Default 50 if not set.
  const advancePct = space.advance_percentage ?? 50;
  // Blueprint: CJ takes 10% commission on the advance only.
  const CJ_COMMISSION_PCT = 10;

  const chosenCreators = nearbyCreators.filter((c) => selectedCreators.includes(c.id));
  const creatorFeeTotal = chosenCreators.reduce((sum, c) => sum + c.starting_price, 0);

  const studioSubtotal =
    bookingType === "hourly"
      ? selectedSlots.length * space.hourly_rate
      : bookingType === "halfday"
      ? space.half_day_rate
      : space.full_day_rate;

  const totalPrice = studioSubtotal + creatorFeeTotal;

  // Blueprint: advance held on platform, released on QR scan. CJ takes 10% of this advance.
  const advanceAmount = Math.round(totalPrice * (advancePct / 100));
  const balanceAmount = totalPrice - advanceAmount;
  const cjCommission = Math.round(advanceAmount * (CJ_COMMISSION_PCT / 100));
  const creatorReceives = advanceAmount - cjCommission; // what space actually receives on QR scan

  const canBook =
    selectedDate &&
    (bookingType === "fullday" ||
      (bookingType === "halfday" && selectedHalfDay !== null) ||
      (bookingType === "hourly" && selectedSlots.length >= space.min_booking_hours));

  const rules = space.space_rules
    ? space.space_rules.split("\n").filter(Boolean)
    : ["No rules specified by the host."];

  const fullAddress = [space.address_line1, space.address_area, space.address_city, space.pincode]
    .filter(Boolean)
    .join(", ");

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 0", display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#9B7B60", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Home</Link>
        <span>›</span>
        <Link href="/studios" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Explore Studios</Link>
        <span>›</span>
        <span style={{ color: "#1C1410", fontWeight: 500 }}>{space.space_name}</span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 5rem" }}>
        <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Image Gallery */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", height: "420px", backgroundColor: "#D4B896", marginBottom: "0.75rem" }}>
                <img src={images[activeImage]} alt={space.space_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                    {space.space_type}
                  </span>
                  <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                    {space.space_name}
                  </h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 800, color: "#C4703A" }}>
                    ₹{space.hourly_rate.toLocaleString()}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#9B7B60" }}>per hour</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>📍 {fullAddress}</span>
                {space.capacity > 0 && (
                  <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>👥 Up to {space.capacity} people</span>
                )}
                {space.google_maps_url && (
                  <a href={space.google_maps_url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "0.875rem", color: "#C4703A", textDecoration: "none", fontWeight: 600 }}>
                    📌 View on Maps →
                  </a>
                )}
              </div>
            </div>

            {/* How Booking Works — corrected per blueprint */}
            <Section title="How Booking Works">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }} className="how-grid">
                {[
                  {
                    step: "01", icon: "💳",
                    title: `Pay ${advancePct}% Advance`,
                    desc: `Lock your slot by paying ${advancePct}% on the platform. CultureJeevan holds it until you arrive.`,
                  },
                  {
                    step: "02", icon: "📲",
                    title: "Scan QR On Arrival",
                    desc: "Scan the space's QR code when you arrive. This confirms your presence and instantly releases the held advance to the space.",
                  },
                  {
                    step: "03", icon: "🤝",
                    title: `Pay ${100 - advancePct}% Balance Directly`,
                    desc: `Pay the remaining ${100 - advancePct}% directly to the space via Cash or UPI after your session. CultureJeevan doesn't touch this.`,
                  },
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
                  {/* Blueprint: 10% commission on advance only. Space no-show = 100% refund, CJ waives commission. No rescheduling. */}
                  <strong>Platform fee:</strong> CultureJeevan takes a 10% commission on the advance amount only — not the total. If the space doesn't show up, you receive a 100% refund and CultureJeevan waives its commission entirely. No rescheduling — cancellations only.
                </p>
              </div>
            </Section>

            {/* About */}
            {space.space_description && (
              <Section title="About This Space">
                <p style={{ fontSize: "0.95rem", color: "#5C4A3A", lineHeight: 1.8 }}>
                  {space.space_description}
                </p>
              </Section>
            )}

            {/* Owner Info */}
            {ownerProfile && (
              <Section title="Hosted By">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0, backgroundColor: "#C4703A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF7F2", fontWeight: 800, fontSize: "1.2rem", fontFamily: "var(--font-playfair)" }}>
                    {ownerProfile.full_name?.[0] ?? "?"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1C1410" }}>{ownerProfile.full_name ?? "Space Owner"}</p>
                    {ownerProfile.city && <p style={{ fontSize: "0.78rem", color: "#9B7B60" }}>📍 {ownerProfile.city}</p>}
                    {ownerProfile.bio && <p style={{ fontSize: "0.82rem", color: "#5C4A3A", lineHeight: 1.6, marginTop: "0.35rem" }}>{ownerProfile.bio}</p>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexShrink: 0 }}>
                    {ownerProfile.instagram_handle && (
                      <a href={`https://instagram.com/${ownerProfile.instagram_handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "0.75rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", backgroundColor: "#FDF0E6", padding: "0.3rem 0.65rem", borderRadius: "100px", whiteSpace: "nowrap" }}>
                        {ownerProfile.instagram_handle}
                      </a>
                    )}
                    {ownerProfile.portfolio_url && (
                      <a href={ownerProfile.portfolio_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7A5C42", textDecoration: "none", backgroundColor: "#F5EFE7", padding: "0.3rem 0.65rem", borderRadius: "100px", whiteSpace: "nowrap" }}>
                        Portfolio →
                      </a>
                    )}
                  </div>
                </div>
              </Section>
            )}

            {/* Amenities */}
            {space.amenities && space.amenities.length > 0 && (
              <Section title="Amenities & Equipment">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
                  {space.amenities.map((a) => (
                    <div key={a} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.625rem 0.875rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{AMENITY_ICONS[a] ?? "✓"}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#5C4A3A" }}>{a}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Add Skill Workers */}
            {nearbyCreators.length > 0 && (
              <Section title="Add Skill Workers (Optional)">
                <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  Book a photographer, videographer, sound engineer, or any other creative professional alongside this space. Their booking request is sent separately — each has its own QR code, its own advance, and its own independent confirmation.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {nearbyCreators.map((c) => {
                    const isSelected = selectedCreators.includes(c.id);
                    const icon = CREATOR_CATEGORY_ICON[c.category] ?? CREATOR_CATEGORY_ICON["default"];
                    return (
                      <div key={c.id} onClick={() => toggleCreator(c.id)}
                        style={{ backgroundColor: isSelected ? "#FDF0E6" : "#FFFFFF", border: `1.5px solid ${isSelected ? "#C4703A" : "#E8DED0"}`, borderRadius: "14px", padding: "1rem 1.25rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, backgroundColor: isSelected ? "#F0DCC8" : "#F5EFE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", border: `1.5px solid ${isSelected ? "#C4703A" : "#E8DED0"}` }}>
                            {icon}
                          </div>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1C1410" }}>{c.profile?.full_name ?? "Creator"}</p>
                            <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "0.35rem" }}>{c.category}</p>
                            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                              {c.experience && (
                                <span style={{ fontSize: "0.67rem", fontWeight: 600, color: "#8B4513", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>{c.experience}</span>
                              )}
                              {c.languages && (
                                <span style={{ fontSize: "0.67rem", fontWeight: 600, color: "#8B4513", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>{c.languages}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#C4703A" }}>₹{c.starting_price.toLocaleString()}</p>
                          <p style={{ fontSize: "0.72rem", color: "#9B7B60" }}>starting price</p>
                          <div style={{ marginTop: "0.45rem", width: "22px", height: "22px", borderRadius: "50%", border: `2px solid ${isSelected ? "#C4703A" : "#E8DED0"}`, backgroundColor: isSelected ? "#C4703A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}>
                            {isSelected && <span style={{ color: "#FAF7F2", fontSize: "0.7rem", lineHeight: 1 }}>✓</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {chosenCreators.length > 0 && (
                  <div style={{ marginTop: "0.875rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>📋</span>
                    {/* Blueprint: each creator booking is independent — their own QR, advance, confirmation */}
                    <p style={{ fontSize: "0.78rem", color: "#8B4513", lineHeight: 1.65 }}>
                      <strong>{chosenCreators.map((c) => c.profile?.full_name ?? c.category).join(", ")}</strong> will receive separate booking requests. Each creator has their own QR code, their own advance payment, and their own independent confirmation.
                    </p>
                  </div>
                )}
              </Section>
            )}

            {/* Space Rules */}
            <Section title="Space Rules">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {rules.map((rule, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.875rem", color: "#5C4A3A" }}>
                    <span style={{ color: "#C4703A", fontWeight: 700, flexShrink: 0 }}>—</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* ── RIGHT COLUMN — Booking Card ── */}
          <div style={{
            position: "sticky",
            top: "80px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#E8DED0 transparent",
          }}>
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 8px 40px rgba(196,112,58,0.10)" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                Book This Space
              </p>

              {/* Booking Type Tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "3px", marginBottom: "0.75rem", gap: "2px" }}>
                {(["hourly", "halfday", "fullday"] as const).map((t) => (
                  <button key={t} onClick={() => { setBookingType(t); setSelectedSlots([]); setSelectedHalfDay(null); }}
                    style={{ padding: "0.4rem", borderRadius: "6px", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", backgroundColor: bookingType === t ? "#C4703A" : "transparent", color: bookingType === t ? "#FAF7F2" : "#7A5C42" }}>
                    {t === "hourly" ? "Hourly" : t === "halfday" ? "Half Day" : "Full Day"}
                  </button>
                ))}
              </div>

              {/* Rate display */}
              <div style={{ backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "8px", padding: "0.5rem 0.875rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", color: "#8B4513", fontWeight: 500 }}>
                  {bookingType === "hourly"
                    ? `₹${space.hourly_rate.toLocaleString()} / hour · min ${space.min_booking_hours}h`
                    : bookingType === "halfday"
                    ? "4 hours · fixed rate"
                    : "Full day · 8 hours"}
                </span>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#C4703A" }}>
                  ₹{(bookingType === "hourly"
                    ? space.hourly_rate
                    : bookingType === "halfday"
                    ? space.half_day_rate
                    : space.full_day_rate
                  ).toLocaleString()}
                </span>
              </div>

              {/* Date */}
              <div style={{ marginBottom: "0.75rem" }}>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Select Date</label>
                <input type="date" min={new Date().toISOString().split("T")[0]}
                  value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.85rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
              </div>

              {/* Hourly: Time Slot Grid */}
              {bookingType === "hourly" && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>Time Slots</label>
                    {selectedSlots.length > 0 && (
                      <span style={{ fontSize: "0.67rem", color: "#C4703A", fontWeight: 600, backgroundColor: "#FDF0E6", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>
                        {selectedSlots.length}h selected
                      </span>
                    )}
                  </div>
                  <div style={{ height: "112px", overflowY: "auto", borderRadius: "8px", border: "1.5px solid #E8DED0", padding: "0.4rem", backgroundColor: "#FAF7F2", scrollbarWidth: "thin", scrollbarColor: "#E8DED0 transparent" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.3rem" }}>
                      {TIME_SLOTS.map((slot) => {
                        const selected = selectedSlots.includes(slot);
                        return (
                          <button key={slot} onClick={() => toggleTimeSlot(slot)}
                            style={{ padding: "0.32rem 0.2rem", borderRadius: "6px", fontSize: "0.67rem", fontWeight: 600, border: "1.5px solid", cursor: "pointer", transition: "all 0.15s", backgroundColor: selected ? "#C4703A" : "#FFFFFF", color: selected ? "#FAF7F2" : "#7A5C42", borderColor: selected ? "#C4703A" : "#E8DED0" }}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.63rem", color: "#B8A090", marginTop: "0.25rem" }}>
                    Min booking: {space.min_booking_hours}h · Select contiguous slots
                  </p>
                </div>
              )}

              {/* Half Day: Period Selector — blueprint fixed periods */}
              {bookingType === "halfday" && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Choose Period</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                    {HALF_DAY_PERIODS.map((p) => (
                      <button key={p.key} onClick={() => setSelectedHalfDay(p.key)}
                        style={{ padding: "0.55rem 0.875rem", borderRadius: "8px", border: `1.5px solid ${selectedHalfDay === p.key ? "#C4703A" : "#E8DED0"}`, fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: selectedHalfDay === p.key ? "#FDF0E6" : "#FAF7F2", color: selectedHalfDay === p.key ? "#C4703A" : "#5C4A3A", transition: "all 0.15s", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{p.label}</span>
                        <span style={{ fontSize: "0.72rem", color: selectedHalfDay === p.key ? "#C4703A" : "#9B7B60", fontWeight: 500 }}>{p.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Day: just shows the confirmation */}
              {bookingType === "fullday" && (
                <div style={{ marginBottom: "0.75rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "8px", padding: "0.625rem 0.875rem", fontSize: "0.78rem", color: "#5C4A3A" }}>
                  ☀️ Full working day — select a date above to confirm your slot.
                </div>
              )}

              {/* Skill Workers compact */}
              {nearbyCreators.length > 0 && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      Add Creators{selectedCreators.length > 0 ? <span style={{ color: "#C4703A" }}> ({selectedCreators.length})</span> : ""}
                    </label>
                    <button onClick={() => setWorkerPanelOpen((v) => !v)}
                      style={{ fontSize: "0.67rem", fontWeight: 600, color: "#C4703A", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.18rem 0.5rem", borderRadius: "100px", cursor: "pointer" }}>
                      {workerPanelOpen ? "Done ↑" : "Browse +"}
                    </button>
                  </div>

                  {selectedCreators.length > 0 && !workerPanelOpen && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {chosenCreators.map((c) => (
                        <div key={c.id} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "100px", padding: "0.18rem 0.4rem 0.18rem 0.3rem" }}>
                          <span style={{ fontSize: "0.75rem" }}>{CREATOR_CATEGORY_ICON[c.category] ?? "🎯"}</span>
                          <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#8B4513" }}>{c.profile?.full_name ?? c.category}</span>
                          <span style={{ fontSize: "0.68rem", color: "#C4703A", fontWeight: 700 }}>+₹{c.starting_price.toLocaleString()}</span>
                          <button onClick={(e) => { e.stopPropagation(); toggleCreator(c.id); }}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#C4703A", fontSize: "0.8rem", padding: "0 0 0 0.1rem", lineHeight: 1, fontWeight: 700 }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {!workerPanelOpen && selectedCreators.length === 0 && (
                    <p style={{ fontSize: "0.73rem", color: "#B8A090", fontStyle: "italic" }}>Optional — photographer, videographer, sound engineer…</p>
                  )}

                  {workerPanelOpen && (
                    <div style={{ border: "1.5px solid #E8DED0", borderRadius: "8px", overflow: "hidden", backgroundColor: "#FAF7F2" }}>
                      {nearbyCreators.map((c, idx) => {
                        const isSelected = selectedCreators.includes(c.id);
                        return (
                          <div key={c.id} onClick={() => toggleCreator(c.id)}
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.75rem", cursor: "pointer", backgroundColor: isSelected ? "#FDF0E6" : "transparent", borderBottom: idx < nearbyCreators.length - 1 ? "1px solid #E8DED0" : "none", transition: "background-color 0.15s" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                              <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: `2px solid ${isSelected ? "#C4703A" : "#D0C4B8"}`, backgroundColor: isSelected ? "#C4703A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                                {isSelected && <span style={{ color: "#FAF7F2", fontSize: "0.6rem", lineHeight: 1 }}>✓</span>}
                              </div>
                              <span style={{ fontSize: "1rem" }}>{CREATOR_CATEGORY_ICON[c.category] ?? "🎯"}</span>
                              <div>
                                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1C1410" }}>{c.profile?.full_name ?? "Creator"}</p>
                                <p style={{ fontSize: "0.67rem", color: "#9B7B60" }}>{c.category}{c.experience ? ` · ${c.experience}` : ""}</p>
                              </div>
                            </div>
                            <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C4703A", flexShrink: 0 }}>₹{c.starting_price.toLocaleString()}</p>
                          </div>
                        );
                      })}
                      <div style={{ padding: "0.5rem 0.75rem", borderTop: "1px solid #E8DED0", backgroundColor: "#F5EFE7" }}>
                        <button onClick={() => setWorkerPanelOpen(false)}
                          style={{ width: "100%", padding: "0.4rem", backgroundColor: "#C4703A", color: "#FAF7F2", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                          Confirm{selectedCreators.length > 0 ? ` (${selectedCreators.length})` : " Selection"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Price Breakdown — always show when date is selected */}
              {selectedDate && (bookingType !== "hourly" || selectedSlots.length > 0) && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "0.625rem 0.875rem" }}>
                    {/* Space line */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: chosenCreators.length > 0 ? "0.35rem" : 0 }}>
                      <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>
                        Space{bookingType === "hourly"
                          ? ` (${selectedSlots.length}h)`
                          : bookingType === "halfday"
                          ? ` (${selectedHalfDay ?? "half day"})`
                          : " (full day)"}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5C4A3A" }}>₹{studioSubtotal.toLocaleString()}</span>
                    </div>
                    {/* Creator lines — their fees shown but noted as separate requests */}
                    {chosenCreators.map((c) => (
                      <div key={c.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>{c.profile?.full_name ?? c.category} <span style={{ fontSize: "0.65rem", color: "#B8A090" }}>(separate request)</span></span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5C4A3A" }}>₹{c.starting_price.toLocaleString()}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px dashed #E8DED0", paddingTop: "0.35rem", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.82rem", color: "#5C4A3A", fontWeight: 700 }}>Total Estimate</span>
                      <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: "#C4703A" }}>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Advance / Balance split — blueprint correct values */}
                  <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                    <div style={{ backgroundColor: "#C4703A", borderRadius: "7px", padding: "0.5rem 0.625rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "rgba(250,247,242,0.7)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                        Pay Now ({advancePct}%)
                      </p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 900, color: "#FAF7F2" }}>₹{advanceAmount.toLocaleString()}</p>
                      <p style={{ fontSize: "0.58rem", color: "rgba(250,247,242,0.6)", marginTop: "0.1rem" }}>Platform · Held until QR scan</p>
                    </div>
                    <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "7px", padding: "0.5rem 0.625rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>
                        Pay at Space ({100 - advancePct}%)
                      </p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 900, color: "#5C4A3A" }}>₹{balanceAmount.toLocaleString()}</p>
                      <p style={{ fontSize: "0.58rem", color: "#B8A090", marginTop: "0.1rem" }}>Cash / UPI · After session</p>
                    </div>
                  </div>

                  {/* CJ commission note — blueprint: 10% on advance only */}
                  <p style={{ fontSize: "0.63rem", color: "#B8A090", marginTop: "0.35rem", lineHeight: 1.5 }}>
                    CultureJeevan fee: ₹{cjCommission.toLocaleString()} (10% of advance only). Space receives ₹{creatorReceives.toLocaleString()} on QR scan.
                  </p>
                </div>
              )}

              {/* Book Button */}
              <button disabled={!canBook}
                style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: canBook ? "pointer" : "not-allowed", backgroundColor: canBook ? "#C4703A" : "#E8DED0", color: canBook ? "#FAF7F2" : "#B8A090", transition: "background-color 0.2s", letterSpacing: "0.02em" }}
                onMouseEnter={(e) => { if (canBook) e.currentTarget.style.backgroundColor = "#A85C2E"; }}
                onMouseLeave={(e) => { if (canBook) e.currentTarget.style.backgroundColor = "#C4703A"; }}>
                {!selectedDate
                  ? "Select a Date First"
                  : bookingType === "hourly" && selectedSlots.length < space.min_booking_hours
                  ? `Pick at Least ${space.min_booking_hours} Slot${space.min_booking_hours > 1 ? "s" : ""}`
                  : bookingType === "halfday" && !selectedHalfDay
                  ? "Choose a Period"
                  : `Pay ₹${advanceAmount.toLocaleString()} to Confirm →`}
              </button>

              <p style={{ fontSize: "0.67rem", color: "#B8A090", textAlign: "center", marginTop: "0.5rem", lineHeight: 1.5 }}>
                🔐 Advance held securely · Released on QR scan<br />
                Balance paid directly at the space after session
              </p>
            </div>

            {/* Cancellation — corrected to blueprint rules */}
            <div style={{ marginTop: "0.625rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "12px", padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Cancellation Policy</p>
              {[
                // Blueprint exact rules
                { dot: "🟢", text: "Full refund if cancelled 5+ days before the event" },
                { dot: "🔴", text: "No refund if cancelled less than 5 days before" },
                { dot: "🟢", text: "Space no-show → 100% refund, CJ waives commission" },
                { dot: "⚠️", text: "No rescheduling — cancellation only" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.4rem", fontSize: "0.73rem", color: "#6B5240", alignItems: "flex-start", marginBottom: i < 3 ? "0.2rem" : 0 }}>
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