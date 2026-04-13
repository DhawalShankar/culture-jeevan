"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Equipment {
  id: string;
  profile_id: string;
  item_name: string;
  category: string;
  sub_category: string | null;
  brand: string | null;
  model: string | null;
  condition: "Excellent" | "Good" | "Fair";
  hourly_rate: number | null;
  daily_rate: number | null;
  security_deposit: number | null;
  availability_notes: string | null;
  pickup_address: string | null;
  pickup_area: string | null;
  pickup_city: string | null;
  pincode: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  description: string | null;
  specs: Record<string, string> | null;
  images: string[] | null;
  available: boolean;
}

interface OwnerProfile {
  id: string;
  full_name: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  bio: string | null;
  city: string | null;
}

interface RelatedEquipment {
  id: string;
  item_name: string;
  category: string;
  hourly_rate: number | null;
  pickup_city: string | null;
  condition: string;
  images: string[] | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<string, string> = {
  "Camera":         "📷",
  "Lens":           "🔭",
  "Lighting":       "💡",
  "Audio":          "🎙️",
  "Stabilizer":     "🎬",
  "Drone":          "🚁",
  "Backdrop":       "🎭",
  "Tripod / Stand": "📐",
  "Monitor":        "🖥️",
  "Props":          "📦",
  "Grip & Support": "🔧",
  "Power":          "🔋",
  "default":        "🎯",
};

const CONDITION_CONFIG = {
  Excellent: { label: "Excellent Condition", color: "#166534", bg: "#F0FDF4", border: "#BBF7D0" },
  Good:      { label: "Good Condition",      color: "#1D4ED8", bg: "#EFF6FF", border: "#BFDBFE" },
  Fair:      { label: "Fair Condition",      color: "#92400E", bg: "#FFFBEB", border: "#FDE68A" },
} as const;

const FALLBACK_IMAGES: Record<string, string[]> = {
  Camera:   [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&q=85",
    "https://images.unsplash.com/photo-1491796014055-e6835cdcd4c6?w=900&q=85",
  ],
  Lens:     [
    "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=900&q=85",
    "https://images.unsplash.com/photo-1606986628253-4f6bd7be1a44?w=900&q=85",
  ],
  Lighting: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=85",
  ],
  Audio:    [
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=85",
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=900&q=85",
  ],
  default:  [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85",
  ],
};

function getImages(eq: Equipment): string[] {
  if (eq.images && eq.images.length > 0) return eq.images;
  return FALLBACK_IMAGES[eq.category] ?? FALLBACK_IMAGES["default"];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safe toLocaleString — never throws on null/undefined */
function fmt(val: number | null | undefined): string {
  if (val == null) return "—";
  return val.toLocaleString("en-IN");
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem" }}>
          <div>
            <div style={{ height: "400px", borderRadius: "20px", background: "linear-gradient(90deg,#F0E8DC 25%,#E8DED0 50%,#F0E8DC 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", marginBottom: "1.5rem" }} />
            {[240, 180, 120].map((w, i) => (
              <div key={i} style={{ height: "18px", width: `${w}px`, borderRadius: "6px", background: "#E8DED0", marginBottom: "0.75rem" }} />
            ))}
          </div>
          <div style={{ height: "420px", borderRadius: "20px", background: "#E8DED0" }} />
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
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🎛️</span>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", color: "#1C1410", marginBottom: "0.5rem" }}>
          Equipment Not Found
        </h2>
        <p style={{ color: "#9B7B60", marginBottom: "1.5rem" }}>
          This listing may have been removed or the link is incorrect.
        </p>
        <Link href="/equipment" style={{ backgroundColor: "#C4703A", color: "#FAF7F2", padding: "0.75rem 1.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Browse All Equipment →
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

export default function EquipmentDetail({ id }: { id: string }) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [owner, setOwner] = useState<OwnerProfile | null>(null);
  const [related, setRelated] = useState<RelatedEquipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [whatsappCopied, setWhatsappCopied] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const supabase = createClient();

      const { data, error } = await supabase
        .from("equipment")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) { setNotFound(true); setLoading(false); return; }
      setEquipment(data as Equipment);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("id, full_name, instagram_handle, portfolio_url, bio, city")
        .eq("id", data.profile_id)
        .single();
      setOwner(profileData ?? null);

      const { data: relatedData } = await supabase
        .from("equipment")
        .select("id, item_name, category, hourly_rate, pickup_city, condition, images")
        .eq("category", data.category)
        .eq("available", true)
        .neq("id", id)
        .limit(4);
      setRelated((relatedData ?? []) as RelatedEquipment[]);

      setLoading(false);
    }
    fetchAll();
  }, [id]);

  const handleCopyWhatsapp = () => {
    if (!equipment?.contact_whatsapp) return;
    navigator.clipboard.writeText(equipment.contact_whatsapp);
    setWhatsappCopied(true);
    setTimeout(() => setWhatsappCopied(false), 2000);
  };

  if (loading) return <Skeleton />;
  if (notFound || !equipment) return <NotFound />;

  const images = getImages(equipment);
  const icon = CATEGORY_ICONS[equipment.category] ?? CATEGORY_ICONS["default"];
  // Safely resolve condition — fall back to "Good" if DB value is unexpected
  const conditionKey = (["Excellent", "Good", "Fair"].includes(equipment.condition)
    ? equipment.condition
    : "Good") as keyof typeof CONDITION_CONFIG;
  const conditionCfg = CONDITION_CONFIG[conditionKey];

  const fullAddress = [
    equipment.pickup_address,
    equipment.pickup_area,
    equipment.pickup_city,
    equipment.pincode,
  ].filter(Boolean).join(", ");

  const whatsappLink = equipment.contact_whatsapp
    ? `https://wa.me/91${equipment.contact_whatsapp.replace(/\D/g, "").slice(-10)}?text=${encodeURIComponent(
        `Hi! I found your listing on CultureJeevan — *${equipment.item_name}*. Is it available for rent? Please share availability and pickup details.`
      )}`
    : null;

  const phoneLink = equipment.contact_phone
    ? `tel:+91${equipment.contact_phone.replace(/\D/g, "").slice(-10)}`
    : null;

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 0", display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#9B7B60", alignItems: "center", flexWrap: "wrap" }}>
        <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Home</Link>
        <span>›</span>
        <Link href="/equipment" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Rent Equipment</Link>
        <span>›</span>
        <Link href={`/equipment?category=${equipment.category}`} style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>{equipment.category}</Link>
        <span>›</span>
        <span style={{ color: "#1C1410", fontWeight: 500 }}>{equipment.item_name}</span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 5rem" }}>
        <div className="eq-detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>

          {/* ── LEFT COLUMN ── */}
          <div>

            {/* Gallery */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", height: "400px", backgroundColor: "#D4B896", marginBottom: "0.75rem", position: "relative" }}>
                <img
                  src={images[activeImage]}
                  alt={equipment.item_name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute", top: "1rem", left: "1rem",
                  backgroundColor: equipment.available ? "#166534" : "#991B1B",
                  color: "#FFFFFF",
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em",
                  padding: "0.3rem 0.75rem", borderRadius: "100px", textTransform: "uppercase",
                }}>
                  {equipment.available ? "✓ Available" : "✗ Not Available"}
                </div>
              </div>
              {images.length > 1 && (
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(images.length, 4)}, 1fr)`, gap: "0.5rem" }}>
                  {images.slice(0, 4).map((img, i) => (
                    <div key={i} onClick={() => setActiveImage(i)}
                      style={{ borderRadius: "10px", overflow: "hidden", height: "80px", cursor: "pointer", border: `2px solid ${activeImage === i ? "#C4703A" : "transparent"}`, transition: "border-color 0.2s", opacity: activeImage === i ? 1 : 0.65 }}>
                      <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title + Meta */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{ backgroundColor: "#F0DCC8", color: "#8B4513", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      {icon} {equipment.category}
                    </span>
                    {equipment.sub_category && (
                      <span style={{ backgroundColor: "#F5EFE7", color: "#7A5C42", fontSize: "0.75rem", fontWeight: 600, padding: "0.3rem 0.75rem", borderRadius: "100px" }}>
                        {equipment.sub_category}
                      </span>
                    )}
                    <span style={{ backgroundColor: conditionCfg.bg, color: conditionCfg.color, border: `1px solid ${conditionCfg.border}`, fontSize: "0.72rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "100px" }}>
                      {conditionCfg.label}
                    </span>
                  </div>
                  <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: "0.25rem" }}>
                    {equipment.item_name}
                  </h1>
                  {(equipment.brand || equipment.model) && (
                    <p style={{ fontSize: "0.9rem", color: "#7A5C42", fontWeight: 500 }}>
                      {[equipment.brand, equipment.model].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>

                {/* Price — guarded with fmt() */}
                <div style={{ textAlign: "right" }}>
                  {equipment.hourly_rate != null ? (
                    <>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.9rem", fontWeight: 800, color: "#C4703A" }}>
                        ₹{fmt(equipment.hourly_rate)}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "#9B7B60" }}>per hour</p>
                    </>
                  ) : (
                    <p style={{ fontSize: "0.9rem", color: "#9B7B60", fontStyle: "italic" }}>Contact for price</p>
                  )}
                  {equipment.daily_rate != null && (
                    <p style={{ fontSize: "0.82rem", color: "#7A5C42", fontWeight: 600, marginTop: "0.25rem" }}>
                      ₹{fmt(equipment.daily_rate)} / day
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.875rem", flexWrap: "wrap" }}>
                {equipment.pickup_city && (
                  <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>📍 {equipment.pickup_city}</span>
                )}
                {equipment.security_deposit != null && (
                  <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>🔒 ₹{fmt(equipment.security_deposit)} deposit</span>
                )}
              </div>
            </div>

            {/* How It Works */}
            <Section title="How Renting Works">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }} className="how-grid">
                {[
                  { step: "01", icon: "🔍", title: "Find & Contact", desc: "Browse the listing, check availability, and reach out directly to the equipment owner via WhatsApp or phone." },
                  { step: "02", icon: "🤝", title: "Arrange Directly", desc: "Agree on rental duration, pickup time, security deposit, and payment terms directly with the owner. Everything off-platform." },
                  { step: "03", icon: "🎬", title: "Pick Up & Shoot", desc: "Self-pickup from the owner's address. Return the gear in the same condition. Any damage is between you and the owner." },
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
                <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: "0.78rem", color: "#8B4513", lineHeight: 1.65 }}>
                  <strong>No platform payment.</strong> CultureJeevan is only the discovery point for equipment. All rental agreements, deposits, and payments happen directly between you and the owner. CultureJeevan has zero liability for any equipment damage, loss, or disputes.
                </p>
              </div>
            </Section>

            {/* Description */}
            {equipment.description && (
              <Section title="About This Equipment">
                <p style={{ fontSize: "0.95rem", color: "#5C4A3A", lineHeight: 1.8 }}>
                  {equipment.description}
                </p>
              </Section>
            )}

            {/* Specs */}
            {equipment.specs && Object.keys(equipment.specs).length > 0 && (
              <Section title="Technical Specifications">
                <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E8DED0" }}>
                  {Object.entries(equipment.specs).map(([key, val], i) => (
                    <div key={key} style={{
                      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                      padding: "0.75rem 1rem",
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#FAF7F2",
                      borderBottom: i < Object.keys(equipment.specs!).length - 1 ? "1px solid #F0E8DC" : "none",
                    }}>
                      <span style={{ fontSize: "0.82rem", color: "#9B7B60", fontWeight: 500 }}>{key}</span>
                      <span style={{ fontSize: "0.82rem", color: "#1C1410", fontWeight: 700, textAlign: "right", maxWidth: "55%" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Pickup Info */}
            <Section title="Pickup Details">
              <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: equipment.availability_notes ? "1rem" : 0 }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>📍</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1C1410", marginBottom: "0.25rem" }}>
                      Self-pickup from owner's location
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#5C4A3A", lineHeight: 1.6 }}>
                      {fullAddress || "Address shared by owner on contact"}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#9B7B60", marginTop: "0.25rem" }}>
                      Exact address shared after you connect with the owner
                    </p>
                  </div>
                </div>
                {equipment.availability_notes && (
                  <div style={{ borderTop: "1px solid #F0E8DC", paddingTop: "1rem" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                      Availability Notes
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#5C4A3A", lineHeight: 1.6 }}>
                      {equipment.availability_notes}
                    </p>
                  </div>
                )}
              </div>
            </Section>

            {/* Owner */}
            {owner && (
              <Section title="Listed By">
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0, backgroundColor: "#C4703A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF7F2", fontWeight: 800, fontSize: "1.2rem", fontFamily: "var(--font-playfair)" }}>
                    {owner.full_name?.[0] ?? "?"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1C1410" }}>{owner.full_name ?? "Equipment Owner"}</p>
                    {owner.city && <p style={{ fontSize: "0.78rem", color: "#9B7B60" }}>📍 {owner.city}</p>}
                    {owner.bio && <p style={{ fontSize: "0.82rem", color: "#5C4A3A", lineHeight: 1.6, marginTop: "0.35rem" }}>{owner.bio}</p>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexShrink: 0 }}>
                    {owner.instagram_handle && (
                      <a href={`https://instagram.com/${owner.instagram_handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "0.75rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", backgroundColor: "#FDF0E6", padding: "0.3rem 0.65rem", borderRadius: "100px", whiteSpace: "nowrap" }}>
                        {owner.instagram_handle}
                      </a>
                    )}
                    {owner.portfolio_url && (
                      <a href={owner.portfolio_url} target="_blank" rel="noopener noreferrer"
                        style={{ fontSize: "0.75rem", fontWeight: 600, color: "#7A5C42", textDecoration: "none", backgroundColor: "#F5EFE7", padding: "0.3rem 0.65rem", borderRadius: "100px", whiteSpace: "nowrap" }}>
                        Portfolio →
                      </a>
                    )}
                  </div>
                </div>
              </Section>
            )}

            {/* Related */}
            {related.length > 0 && (
              <Section title={`More ${equipment.category} Near You`}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.875rem" }}>
                  {related.map((r) => {
                    const rImg = (r.images && r.images.length > 0)
                      ? r.images[0]
                      : (FALLBACK_IMAGES[r.category] ?? FALLBACK_IMAGES["default"])[0];
                    const rIcon = CATEGORY_ICONS[r.category] ?? CATEGORY_ICONS["default"];
                    return (
                      <Link key={r.id} href={`/equipment/${r.id}`}
                        style={{ textDecoration: "none", backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", overflow: "hidden", display: "block", transition: "box-shadow 0.2s, border-color 0.2s" }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C4703A"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(196,112,58,0.12)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8DED0"; e.currentTarget.style.boxShadow = "none"; }}>
                        <div style={{ height: "120px", overflow: "hidden" }}>
                          <img src={rImg} alt={r.item_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <div style={{ padding: "0.75rem" }}>
                          <p style={{ fontSize: "0.72rem", color: "#9B7B60", marginBottom: "0.2rem" }}>{rIcon} {r.category}</p>
                          <p style={{ fontWeight: 700, fontSize: "0.875rem", color: "#1C1410", marginBottom: "0.25rem", lineHeight: 1.3 }}>{r.item_name}</p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>📍 {r.pickup_city ?? "—"}</span>
                            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 800, color: "#C4703A" }}>
                              {r.hourly_rate != null ? `₹${fmt(r.hourly_rate)}/hr` : "Contact"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </Section>
            )}
          </div>

          {/* ── RIGHT COLUMN — Contact Card ── */}
          <div style={{ position: "sticky", top: "80px" }}>

            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 8px 40px rgba(196,112,58,0.10)", marginBottom: "0.75rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                Rental Rate
              </p>

              {/* Rates — guarded */}
              <div style={{ display: "grid", gridTemplateColumns: equipment.daily_rate != null ? "1fr 1fr" : "1fr", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.875rem", textAlign: "center" }}>
                  <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Per Hour</p>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 900, color: "#C4703A" }}>
                    {equipment.hourly_rate != null ? `₹${fmt(equipment.hourly_rate)}` : "—"}
                  </p>
                </div>
                {equipment.daily_rate != null && (
                  <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.875rem", textAlign: "center" }}>
                    <p style={{ fontSize: "0.65rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Per Day</p>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.5rem", fontWeight: 900, color: "#5C4A3A" }}>₹{fmt(equipment.daily_rate)}</p>
                  </div>
                )}
              </div>

              {/* Security deposit — guarded */}
              {equipment.security_deposit != null && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "8px", padding: "0.625rem 0.875rem", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem" }}>🔒</span>
                    <div>
                      <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60" }}>Security Deposit</p>
                      <p style={{ fontSize: "0.67rem", color: "#B8A090" }}>Refundable · paid to owner</p>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1rem", fontWeight: 800, color: "#5C4A3A" }}>₹{fmt(equipment.security_deposit)}</p>
                </div>
              )}

              {/* Condition */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", flexShrink: 0, backgroundColor: conditionCfg.color }} />
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: conditionCfg.color }}>{conditionCfg.label}</span>
              </div>

              {/* Contact Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.8rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", backgroundColor: "#25D366", color: "#FFFFFF", textDecoration: "none", transition: "background-color 0.2s", boxSizing: "border-box" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1EB254")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#25D366")}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Message on WhatsApp
                  </a>
                )}

                {phoneLink && (
                  <a href={phoneLink}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", width: "100%", padding: "0.8rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", backgroundColor: "transparent", color: "#C4703A", border: "1.5px solid #C4703A", textDecoration: "none", transition: "background-color 0.2s", boxSizing: "border-box" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                    📞 Call Owner
                  </a>
                )}

                {equipment.contact_whatsapp && (
                  <button onClick={handleCopyWhatsapp}
                    style={{ width: "100%", padding: "0.55rem", borderRadius: "8px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", backgroundColor: "#F5EFE7", color: "#7A5C42", border: "1px solid #E8DED0", transition: "all 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDE5D8")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F5EFE7")}>
                    {whatsappCopied ? "✓ Number Copied!" : "📋 Copy Number"}
                  </button>
                )}

                {/* Fallback if no contact info at all */}
                {!whatsappLink && !phoneLink && !equipment.contact_whatsapp && (
                  <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.875rem", textAlign: "center" }}>
                    <p style={{ fontSize: "0.82rem", color: "#9B7B60" }}>No contact info provided yet.</p>
                    <p style={{ fontSize: "0.72rem", color: "#B8A090", marginTop: "0.25rem" }}>Owner hasn't added contact details.</p>
                  </div>
                )}
              </div>

              <p style={{ fontSize: "0.65rem", color: "#B8A090", textAlign: "center", marginTop: "0.875rem", lineHeight: 1.6 }}>
                All rental terms, deposit & payment are arranged<br />
                directly with the owner. CultureJeevan is not involved.
              </p>
            </div>

            {/* Pickup card */}
            <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1rem" }}>
              <p style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.625rem" }}>
                Pickup Location
              </p>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>📍</span>
                <div>
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#1C1410" }}>
                    {[equipment.pickup_area, equipment.pickup_city].filter(Boolean).join(", ") || "Location not specified"}
                  </p>
                  {equipment.pincode && <p style={{ fontSize: "0.72rem", color: "#9B7B60" }}>PIN: {equipment.pincode}</p>}
                </div>
              </div>
              <p style={{ fontSize: "0.7rem", color: "#9B7B60", lineHeight: 1.5 }}>
                Self-pickup only · Exact address shared by owner on contact
              </p>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .eq-detail-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #E8DED0; border-radius: 4px; }
      `}</style>
    </div>
  );
}