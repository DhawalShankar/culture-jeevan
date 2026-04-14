"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

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
  email: string | null;
}

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

function displayName(fullName: string | null | undefined, email?: string | null): string {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email) return email.split("@")[0];
  return "Creator";
}

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
          height: "200px", borderRadius: "16px",
          background: "linear-gradient(90deg, #F0E8DC 25%, #FAF7F2 50%, #F0E8DC 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s infinite",
        }} />
      ))}
    </>
  );
}

export default function CreatorsPage() {
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
        profiles(full_name, email, city, bio)
      `)
      .order("is_premium", { ascending: false })
      .order("review_count", { ascending: false });

    if (category) q = q.eq("category", category);

    const { data } = await q;

    let list: Creator[] = (data ?? []).map((r: any) => ({
      ...r,
      full_name: displayName(r.profiles?.full_name, r.profiles?.email),
      city: r.profiles?.city ?? null,
      bio: r.profiles?.bio ?? null,
      email: r.profiles?.email ?? null,
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
            Book a Creator
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#1C1410", margin: "0 0 0.5rem" }}>
            Creative Professionals
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#7A5C42", margin: 0, lineHeight: 1.6 }}>
            Photographers, musicians, comedians, poets — book verified creators for your next project or event.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
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
          {!loading && (
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", marginLeft: "0.25rem" }}>
              {creators.length} {creators.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {loading ? <LoadingGrid /> : creators.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>🎭</span>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.3rem" }}>No creators found</p>
              <p style={{ fontSize: "0.8rem", color: "#9B7B60", margin: 0 }}>Try adjusting your filters</p>
            </div>
          ) : creators.map((c) => (
            <Link key={c.id} href={`/creators/${c.id}`} style={{ textDecoration: "none" }}>
              <div className="cj-card" style={{
                background: "#FFFFFF", border: "1.5px solid #E8DED0",
                borderRadius: "16px", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
                cursor: "pointer", height: "100%",
              }}>
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
                  }}>{initials(c.full_name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 800, fontSize: "0.9rem", color: "#1C1410", margin: "0 0 0.2rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {c.full_name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      {c.is_premium && <Pill orange>✦ Premium</Pill>}
                      {c.badge && c.badge !== "none" && !c.is_premium && <Pill>{c.badge}</Pill>}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "0.875rem 1.1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#C4703A" }}>{c.category}</span>
                    <Stars rating={c.avg_rating} />
                  </div>
                  {c.bio && (
                    <p style={{ fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.6rem", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {c.bio}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>
                      {c.city ?? ""}{c.city && c.experience ? " · " : ""}{c.experience ?? ""}
                    </span>
                    {c.starting_price ? (
                      <span style={{ fontSize: "0.82rem", fontWeight: 800, color: "#1C1410" }}>
                        from ₹{c.starting_price.toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span style={{ fontSize: "0.72rem", color: "#9B7B60" }}>Price on request</span>
                    )}
                  </div>

                  {c.email && (
                    <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #F0E8DC" }}>
                      <a
                        href={`mailto:${c.email}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontSize: "0.72rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      >
                        ✉️ {c.email}
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
        @media (max-width: 600px) { div[style*="minmax(260px"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}