"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Creator {
  id: string;
  profile_id: string;
  category: string;
  starting_price: number | null;
  experience: string | null;
  languages: string | null;
  review_count: number;
  avg_rating: number | null;
  badge: string | null;
  is_premium: boolean;
  full_name: string;
  city: string | null;
  bio: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
}

interface Space {
  id: string;
  profile_id: string;
  space_name: string;
  space_type: string;
  space_category: string | null;
  address_area: string | null;
  address_city: string | null;
  hourly_rate: number | null;
  capacity: number | null;
  amenities: string[];
  avg_rating: number | null;
  review_count: number;
  badge: string | null;
  is_premium: boolean;
  is_cj_certified: boolean;
  space_description: string | null;
  owner_name: string;
}

interface Equipment {
  id: string;
  profile_id: string;
  name: string;
  brand: string | null;
  category: string;
  price_per_day: number | null;
  price_per_hour: number | null;
  condition: string | null;
  description: string | null;
  pickup_area: string | null;
  pickup_city: string | null;
  is_available: boolean;
  owner_name: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CITIES = ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Delhi", "Agra", "Prayagraj"];

const CREATOR_CATEGORIES = [
  "Photographer", "Videographer", "Cinematographer", "Drone Pilot",
  "Singer", "Musician", "Tabla Player", "Flautist", "Pianist", "Guitarist",
  "Sound Engineer", "Podcast Host", "Stand-up Comedian", "Poet",
  "Storyteller", "Spoken Word Artist", "Anchor / Emcee", "Voice-over Artist",
  "Video Editor", "Motion Designer", "Colorist", "Art Director",
  "Set Designer", "Prop Stylist", "Costume Designer", "Makeup Artist",
  "Lighting Professional", "Gaffer", "Grip Crew", "Production Assistant", "Other",
];

const SPACE_TYPES = [
  "Photography Studio", "Film Studio", "Dance Studio", "Recording Studio",
  "Podcast Booth", "Rooftop Studio", "Reel Space", "Co-working Space",
  "Event Venue", "Aesthetic Café", "Other",
];

const EQUIPMENT_CATEGORIES = [
  "Camera Body", "Lens", "Drone", "Lighting", "Audio / Mic",
  "Tripod / Stabiliser", "Monitor", "Memory / Storage",
  "Power / Battery", "Backdrop / Props", "Other",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Derive a display name from profile data — never shows null/"—"/"Unknown"
function displayName(fullName: string | null | undefined, email?: string | null): string {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email) return email.split("@")[0];
  return "Creator";
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B7B60' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

const sel: React.CSSProperties = {
  padding: "0.45rem 2rem 0.45rem 0.7rem",
  borderRadius: "8px",
  border: "1.5px solid #E8DED0",
  background: "#FFFFFF",
  color: "#1C1410",
  fontSize: "0.78rem",
  fontWeight: 600,
  outline: "none",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: SELECT_ARROW,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0.5rem center",
  fontFamily: "inherit",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number | null }) {
  const r = rating ?? 0;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
      <span style={{ color: "#C4703A", fontSize: "0.72rem" }}>★</span>
      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1C1410" }}>
        {r > 0 ? r.toFixed(1) : "New"}
      </span>
    </span>
  );
}

function Pill({ children, orange }: { children: React.ReactNode; orange?: boolean }) {
  return (
    <span style={{
      padding: "0.18rem 0.55rem", borderRadius: "100px", fontSize: "0.62rem",
      fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" as const,
      background: orange ? "rgba(196,112,58,0.1)" : "#F0E8DC",
      color: orange ? "#C4703A" : "#7A5C42",
      border: orange ? "1px solid rgba(196,112,58,0.25)" : "none",
    }}>{children}</span>
  );
}

function EmptyState({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem" }}>
      <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>{icon}</span>
      <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.3rem" }}>{title}</p>
      <p style={{ fontSize: "0.8rem", color: "#9B7B60", margin: 0 }}>{sub}</p>
    </div>
  );
}

function LoadingGrid() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{
          height: "200px", borderRadius: "16px",
          background: "linear-gradient(90deg, #F0E8DC 25%, #FAF7F2 50%, #F0E8DC 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
        }} />
      ))}
    </>
  );
}

function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", flexWrap: "wrap", gap: "0.5rem",
      marginBottom: "1.25rem", alignItems: "center",
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ icon, title, count, loading }: {
  icon: string; title: string; count: number; loading: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.65rem", marginBottom: "1rem" }}>
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      <h2 style={{
        fontFamily: "var(--font-playfair), serif",
        fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
        fontWeight: 900, color: "#1C1410", margin: 0,
      }}>{title}</h2>
      {!loading && (
        <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60" }}>
          {count} {count === 1 ? "result" : "results"}
        </span>
      )}
    </div>
  );
}

// ─── CREATORS SECTION ─────────────────────────────────────────────────────────

function CreatorsSection() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("rating");

  const fetchCreators = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase
      .from("creators")
      .select(`
        id, profile_id, category, starting_price, experience, languages,
        review_count, avg_rating, badge, is_premium,
        profiles(full_name, email, city, bio, instagram_handle, portfolio_url)
      `)
      .order("is_premium", { ascending: false })
      .order("review_count", { ascending: false });

    if (category) q = q.eq("category", category);

    const { data } = await q;

    let list: Creator[] = (data ?? []).map((r: any) => ({
      ...r,
      // ✅ Never show "—" — use email fallback, then generic
      full_name: displayName(r.profiles?.full_name, r.profiles?.email),
      city: r.profiles?.city ?? null,
      bio: r.profiles?.bio ?? null,
      instagram_handle: r.profiles?.instagram_handle ?? null,
      portfolio_url: r.profiles?.portfolio_url ?? null,
    }));

    if (city) list = list.filter((c) => c.city === city);
    if (sort === "price_asc") list.sort((a, b) => (a.starting_price ?? 0) - (b.starting_price ?? 0));
    if (sort === "price_desc") list.sort((a, b) => (b.starting_price ?? 0) - (a.starting_price ?? 0));

    setCreators(list);
    setLoading(false);
  }, [category, city, sort]);

  useEffect(() => { fetchCreators(); }, [fetchCreators]);

  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).filter(Boolean).join("").slice(0, 2).toUpperCase() || "CR";
  const avatarColors = ["#C4703A", "#7A5C42", "#9B7B60", "#5C3D2E", "#8B6B4A"];
  const avatarColor = (name: string) => avatarColors[name.charCodeAt(0) % avatarColors.length];

  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <SectionHeader icon="🎨" title="Creative Professionals" count={creators.length} loading={loading} />

      <FilterBar>
        <select style={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {CREATOR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={sel} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={sel} value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="rating">Top Rated</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
      </FilterBar>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "1rem",
      }}>
        {loading ? <LoadingGrid /> : creators.length === 0 ? (
          <EmptyState icon="🎭" title="No creators found" sub="Try adjusting your filters" />
        ) : creators.map((c) => (
          <Link key={c.id} href={`/creators/${c.id}`} style={{ textDecoration: "none" }}>
            <div className="cj-card" style={{
              background: "#FFFFFF",
              border: "1.5px solid #E8DED0",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              height: "100%",
            }}>
              {/* Avatar strip */}
              <div style={{
                height: "88px",
                background: `linear-gradient(135deg, ${avatarColor(c.full_name)}18, ${avatarColor(c.full_name)}06)`,
                display: "flex", alignItems: "center",
                padding: "0 1.1rem", gap: "0.875rem",
                borderBottom: "1px solid #F0E8DC",
              }}>
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0,
                  background: avatarColor(c.full_name),
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FAF7F2", fontWeight: 800, fontSize: "1.1rem",
                }}>
                  {initials(c.full_name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: 800, fontSize: "0.9rem", color: "#1C1410",
                    margin: "0 0 0.2rem", whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {c.full_name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    {c.is_premium && <Pill orange>✦ Premium</Pill>}
                    {/* ✅ Only show badge pill if badge is not null/none */}
                    {c.badge && c.badge !== "none" && !c.is_premium && <Pill>{c.badge}</Pill>}
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "0.875rem 1.1rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#C4703A" }}>{c.category}</span>
                  <Stars rating={c.avg_rating} />
                </div>
                {c.bio && (
                  <p style={{
                    fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.6rem",
                    lineHeight: 1.55, display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                  }}>{c.bio}</p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>
                    {c.city ?? ""}
                    {c.city && c.experience ? " · " : ""}
                    {c.experience ?? ""}
                  </span>
                  {c.starting_price ? (
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1C1410" }}>
                      from ₹{c.starting_price.toLocaleString("en-IN")}
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>Price on request</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── SPACES SECTION ───────────────────────────────────────────────────────────

function SpacesSection() {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"studio" | "cafe">("studio");
  const [city, setCity] = useState("");
  const [spaceType, setSpaceType] = useState("");

  const fetchSpaces = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase
      .from("spaces")
      .select(`
        id, profile_id, space_name, space_type, space_category,
        address_area, address_city, hourly_rate, capacity, amenities,
        avg_rating, review_count, badge, is_premium, is_cj_certified,
        space_description, profiles(full_name, email)
      `)
      .order("is_premium", { ascending: false })
      .order("review_count", { ascending: false });

    if (tab === "studio") {
      q = q.neq("space_category", "cafe");
    } else {
      q = q.eq("space_category", "cafe");
    }
    if (city) q = q.eq("address_city", city);
    if (spaceType) q = q.eq("space_type", spaceType);

    const { data } = await q;
    setSpaces((data ?? []).map((r: any) => ({
      ...r,
      // ✅ Never show "Unknown"
      owner_name: displayName(r.profiles?.full_name, r.profiles?.email),
      amenities: r.amenities ?? [],
    })));
    setLoading(false);
  }, [tab, city, spaceType]);

  useEffect(() => { fetchSpaces(); }, [fetchSpaces]);

  const studioTypes = SPACE_TYPES.filter((t) => t !== "Aesthetic Café");

  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <SectionHeader icon="🏛️" title="Spaces" count={spaces.length} loading={loading} />

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
        {(["studio", "cafe"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => { setTab(t); setSpaceType(""); }}
            style={{
              padding: "0.5rem 1.1rem",
              borderRadius: "8px",
              border: tab === t ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
              background: tab === t ? "rgba(196,112,58,0.07)" : "#FFFFFF",
              color: tab === t ? "#C4703A" : "#7A5C42",
              fontSize: "0.8rem", fontWeight: 700, cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {t === "studio" ? "🎬 Studios" : "☕ Cafés & Venues"}
          </button>
        ))}
      </div>

      <FilterBar>
        <select style={sel} value={spaceType} onChange={(e) => setSpaceType(e.target.value)}>
          <option value="">All Types</option>
          {(tab === "studio" ? studioTypes : ["Aesthetic Café"]).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select style={sel} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FilterBar>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1rem",
      }}>
        {loading ? <LoadingGrid /> : spaces.length === 0 ? (
          <EmptyState
            icon={tab === "studio" ? "🎬" : "☕"}
            title={`No ${tab === "studio" ? "studios" : "cafés"} found`}
            sub="Try adjusting your filters"
          />
        ) : spaces.map((s) => (
          <Link key={s.id} href={`/spaces/${s.id}`} style={{ textDecoration: "none" }}>
            <div className="cj-card" style={{
              background: "#FFFFFF",
              border: "1.5px solid #E8DED0",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              height: "100%",
            }}>
              {/* Header */}
              <div style={{
                padding: "1rem 1.1rem",
                borderBottom: "1px solid #F0E8DC",
                background: "linear-gradient(135deg, rgba(196,112,58,0.04), transparent)",
              }}>
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.4rem",
                }}>
                  <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C1410", margin: 0, lineHeight: 1.3 }}>
                    {s.space_name}
                  </p>
                  <Stars rating={s.avg_rating} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.72rem", color: "#7A5C42", fontWeight: 600 }}>{s.space_type}</span>
                  {s.is_premium && <Pill orange>✦ Premium</Pill>}
                  {s.is_cj_certified && <Pill>✓ CJ Certified</Pill>}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "0.875rem 1.1rem" }}>
                {s.space_description && (
                  <p style={{
                    fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.7rem",
                    lineHeight: 1.55, display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                  }}>{s.space_description}</p>
                )}

                {/* Amenities */}
                {s.amenities.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.7rem" }}>
                    {s.amenities.slice(0, 4).map((a: string) => (
                      <span key={a} style={{
                        fontSize: "0.62rem", fontWeight: 600, padding: "0.15rem 0.45rem",
                        borderRadius: "100px", background: "#F0E8DC", color: "#7A5C42",
                      }}>{a}</span>
                    ))}
                    {s.amenities.length > 4 && (
                      <span style={{ fontSize: "0.62rem", color: "#9B7B60" }}>
                        +{s.amenities.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>
                    📍 {[s.address_area, s.address_city].filter(Boolean).join(", ") || "—"}
                    {s.capacity ? ` · Up to ${s.capacity}` : ""}
                  </span>
                  {s.hourly_rate ? (
                    <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1C1410" }}>
                      ₹{s.hourly_rate.toLocaleString("en-IN")}/hr
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>Price on request</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── EQUIPMENT SECTION ────────────────────────────────────────────────────────

function EquipmentSection() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);

  const fetchEquipment = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let q = supabase
      .from("equipment")
      .select(`
        id, profile_id, name, brand, category, price_per_day, price_per_hour,
        condition, description, pickup_area, pickup_city, is_available,
        profiles(full_name, email)
      `)
      .order("is_available", { ascending: false })
      .order("created_at", { ascending: false });

    if (category) q = q.eq("category", category);
    if (city) q = q.eq("pickup_city", city);
    if (availableOnly) q = q.eq("is_available", true);

    const { data } = await q;
    setEquipment((data ?? []).map((r: any) => ({
      ...r,
      // ✅ Never show "Unknown"
      owner_name: displayName(r.profiles?.full_name, r.profiles?.email),
    })));
    setLoading(false);
  }, [category, city, availableOnly]);

  useEffect(() => { fetchEquipment(); }, [fetchEquipment]);

  const conditionColor = (c: string | null) => {
    if (c === "Brand New" || c === "Like New") return "#2E7D32";
    if (c === "Good") return "#C4703A";
    return "#9B7B60";
  };

  return (
    <section style={{ marginBottom: "3.5rem" }}>
      <SectionHeader icon="📷" title="Equipment for Rent" count={equipment.length} loading={loading} />

      <FilterBar>
        <select style={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {EQUIPMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select style={sel} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">All Cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          type="button"
          onClick={() => setAvailableOnly((v) => !v)}
          style={{
            padding: "0.45rem 0.85rem",
            borderRadius: "8px",
            border: availableOnly ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
            background: availableOnly ? "rgba(196,112,58,0.07)" : "#FFFFFF",
            color: availableOnly ? "#C4703A" : "#7A5C42",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {availableOnly ? "✓ Available Only" : "Available Only"}
        </button>
      </FilterBar>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "1rem",
      }}>
        {loading ? <LoadingGrid /> : equipment.length === 0 ? (
          <EmptyState icon="📦" title="No equipment found" sub="Try adjusting your filters" />
        ) : equipment.map((e) => (
          <Link key={e.id} href={`/equipment/${e.id}`} style={{ textDecoration: "none" }}>
            <div className="cj-card" style={{
              background: "#FFFFFF",
              border: "1.5px solid #E8DED0",
              borderRadius: "16px",
              overflow: "hidden",
              transition: "border-color 0.2s, box-shadow 0.2s",
              cursor: "pointer",
              height: "100%",
              opacity: e.is_available ? 1 : 0.6,
            }}>
              {/* Header */}
              <div style={{
                padding: "0.875rem 1.1rem",
                borderBottom: "1px solid #F0E8DC",
                background: "linear-gradient(135deg, rgba(196,112,58,0.03), transparent)",
              }}>
                <div style={{
                  display: "flex", alignItems: "flex-start",
                  justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.35rem",
                }}>
                  <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C1410", margin: 0, lineHeight: 1.3 }}>
                    {e.name}
                  </p>
                  <span style={{
                    fontSize: "0.62rem", fontWeight: 800, padding: "0.18rem 0.5rem",
                    borderRadius: "100px", flexShrink: 0,
                    background: e.is_available ? "rgba(46,125,50,0.1)" : "#F0E8DC",
                    color: e.is_available ? "#2E7D32" : "#9B7B60",
                  }}>
                    {e.is_available ? "Available" : "Booked"}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ fontSize: "0.72rem", color: "#7A5C42", fontWeight: 600 }}>{e.category}</span>
                  {e.brand && <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>· {e.brand}</span>}
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "0.875rem 1.1rem" }}>
                {e.description && (
                  <p style={{
                    fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.7rem",
                    lineHeight: 1.55, display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                  }}>{e.description}</p>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "0.72rem", color: "#9B7B60" }}>
                    📍 {[e.pickup_area, e.pickup_city].filter(Boolean).join(", ") || "—"}
                    {e.condition && (
                      <span style={{ color: conditionColor(e.condition), fontWeight: 700 }}>
                        {" "}· {e.condition}
                      </span>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {e.price_per_day != null && (
                      <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1C1410", margin: 0 }}>
                        ₹{e.price_per_day.toLocaleString("en-IN")}/day
                      </p>
                    )}
                    {e.price_per_hour != null && (
                      <p style={{ fontSize: "0.68rem", color: "#9B7B60", margin: 0 }}>
                        ₹{e.price_per_hour.toLocaleString("en-IN")}/hr
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: "0.6rem", fontSize: "0.7rem", color: "#9B7B60" }}>
                  Listed by{" "}
                  <span style={{ color: "#7A5C42", fontWeight: 600 }}>{e.owner_name}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* Topbar */}
      <div style={{
        background: "#1C1410", padding: "0 2rem", height: "56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 40,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#FAF7F2" }}>
            Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <Link href="/profile" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.6)", textDecoration: "none" }}>
            My Profile →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        {/* Page header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{
            fontSize: "0.62rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.14em",
            textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.4rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
          }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(196,112,58,0.4)" }} />
            Discover
          </p>
          <h1 style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            fontWeight: 900, color: "#1C1410", margin: 0,
          }}>
            Creators, Spaces & Equipment
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#7A5C42", margin: "0.5rem 0 0", lineHeight: 1.6 }}>
            Book creative professionals, find the perfect space, and rent gear — all in one place.
          </p>
        </div>

        <CreatorsSection />
        <SpacesSection />
        <EquipmentSection />
      </div>

      <style>{`
        .cj-card:hover {
          border-color: #C4703A !important;
          box-shadow: 0 8px 28px rgba(196,112,58,0.1) !important;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 600px) {
          div[style*="minmax(260px"] { grid-template-columns: 1fr !important; }
          div[style*="minmax(280px"] { grid-template-columns: 1fr !important; }
          div[style*="minmax(240px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}