"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Space {
  id: string;
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
  owner_phone: string | null;
}

const CITIES = ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Delhi", "Agra", "Prayagraj"];

const SPACE_TYPES = [
  "Photography Studio", "Film Studio", "Dance Studio", "Recording Studio",
  "Podcast Booth", "Rooftop Studio", "Reel Space", "Co-working Space",
  "Event Venue", "Aesthetic Café", "Other",
];

function displayName(fullName: string | null | undefined, email?: string | null): string {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email) return email.split("@")[0];
  return "Space Owner";
}

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B7B60' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

const sel: React.CSSProperties = {
  padding: "0.45rem 2rem 0.45rem 0.7rem",
  borderRadius: "8px", border: "1.5px solid #E8DED0",
  background: "#FFFFFF", color: "#1C1410",
  fontSize: "0.78rem", fontWeight: 600,
  outline: "none", cursor: "pointer",
  appearance: "none", backgroundImage: SELECT_ARROW,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center",
  fontFamily: "inherit",
};

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

function LoadingGrid() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{
          height: "220px", borderRadius: "16px",
          background: "linear-gradient(90deg, #F0E8DC 25%, #FAF7F2 50%, #F0E8DC 75%)",
          backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
        }} />
      ))}
    </>
  );
}

export default function SpacesPage() {
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
        id, space_name, space_type, space_category,
        address_area, address_city, hourly_rate, capacity, amenities,
        avg_rating, review_count, badge, is_premium, is_cj_certified,
        space_description, profiles(full_name, email, phone)
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
      owner_name: displayName(r.profiles?.full_name, r.profiles?.email),
      owner_phone: r.profiles?.phone ?? null,
      amenities: r.amenities ?? [],
    })));
    setLoading(false);
  }, [tab, city, spaceType]);

  useEffect(() => { fetchSpaces(); }, [fetchSpaces]);

  const studioTypes = SPACE_TYPES.filter((t) => t !== "Aesthetic Café");

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "var(--font-dm-sans), sans-serif" }}>

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
          <Link href="/explore" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.6)", textDecoration: "none" }}>Explore →</Link>
          <Link href="/profile" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.6)", textDecoration: "none" }}>My Profile →</Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.62rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(196,112,58,0.4)" }} />
            Book a Space
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#1C1410", margin: "0 0 0.5rem" }}>
            Studios & Venues
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#7A5C42", margin: 0, lineHeight: 1.6 }}>
            Photography studios, recording rooms, rooftops, cafés — find and book the perfect creative space.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem" }}>
          {(["studio", "cafe"] as const).map((t) => (
            <button key={t} type="button"
              onClick={() => { setTab(t); setSpaceType(""); }}
              style={{
                padding: "0.5rem 1.1rem", borderRadius: "8px",
                border: tab === t ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
                background: tab === t ? "rgba(196,112,58,0.07)" : "#FFFFFF",
                color: tab === t ? "#C4703A" : "#7A5C42",
                fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
              }}>
              {t === "studio" ? "🎬 Studios" : "☕ Cafés & Venues"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
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
          {!loading && (
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", marginLeft: "0.25rem" }}>
              {spaces.length} {spaces.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {loading ? <LoadingGrid /> : spaces.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>
                {tab === "studio" ? "🎬" : "☕"}
              </span>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.3rem" }}>
                No {tab === "studio" ? "studios" : "cafés"} found
              </p>
              <p style={{ fontSize: "0.8rem", color: "#9B7B60", margin: 0 }}>Try adjusting your filters</p>
            </div>
          ) : spaces.map((s) => (
            <Link key={s.id} href={`/spaces/${s.id}`} style={{ textDecoration: "none" }}>
              <div className="cj-card" style={{
                background: "#FFFFFF", border: "1.5px solid #E8DED0",
                borderRadius: "16px", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
                cursor: "pointer", height: "100%",
              }}>
                <div style={{
                  padding: "1rem 1.1rem", borderBottom: "1px solid #F0E8DC",
                  background: "linear-gradient(135deg, rgba(196,112,58,0.04), transparent)",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.4rem" }}>
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

                <div style={{ padding: "0.875rem 1.1rem" }}>
                  {s.space_description && (
                    <p style={{ fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.7rem", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {s.space_description}
                    </p>
                  )}
                  {s.amenities.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.7rem" }}>
                      {s.amenities.slice(0, 4).map((a: string) => (
                        <span key={a} style={{ fontSize: "0.62rem", fontWeight: 600, padding: "0.15rem 0.45rem", borderRadius: "100px", background: "#F0E8DC", color: "#7A5C42" }}>
                          {a}
                        </span>
                      ))}
                      {s.amenities.length > 4 && (
                        <span style={{ fontSize: "0.62rem", color: "#9B7B60" }}>+{s.amenities.length - 4} more</span>
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

                  {s.owner_phone && (
                    <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #F0E8DC" }}>
                      <a
                        href={`tel:${s.owner_phone}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: "0.72rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}
                      >
                        📞 {s.owner_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cj-card:hover { border-color: #C4703A !important; box-shadow: 0 8px 28px rgba(196,112,58,0.1) !important; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @media (max-width: 600px) { div[style*="minmax(280px"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}