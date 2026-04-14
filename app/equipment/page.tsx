"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Equipment {
  id: string;
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
  owner_phone: string | null;
  owner_email: string | null;
}

const CITIES = ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Delhi", "Agra", "Prayagraj"];

const EQUIPMENT_CATEGORIES = [
  "Camera Body", "Lens", "Drone", "Lighting", "Audio / Mic",
  "Tripod / Stabiliser", "Monitor", "Memory / Storage",
  "Power / Battery", "Backdrop / Props", "Other",
];

function displayName(fullName: string | null | undefined, email?: string | null): string {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email) return email.split("@")[0];
  return "Equipment Owner";
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

function LoadingGrid() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} style={{
          height: "190px", borderRadius: "16px",
          background: "linear-gradient(90deg, #F0E8DC 25%, #FAF7F2 50%, #F0E8DC 75%)",
          backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
        }} />
      ))}
    </>
  );
}

const conditionColor = (c: string | null) => {
  if (c === "Brand New" || c === "Like New") return "#2E7D32";
  if (c === "Good") return "#C4703A";
  return "#9B7B60";
};

export default function EquipmentPage() {
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
        id, name, brand, category, price_per_day, price_per_hour,
        condition, description, pickup_area, pickup_city, is_available,
        profiles(full_name, email, phone)
      `)
      .order("is_available", { ascending: false })
      .order("created_at", { ascending: false });

    if (category) q = q.eq("category", category);
    if (city) q = q.eq("pickup_city", city);
    if (availableOnly) q = q.eq("is_available", true);

    const { data } = await q;
    setEquipment((data ?? []).map((r: any) => ({
      ...r,
      owner_name: displayName(r.profiles?.full_name, r.profiles?.email),
      owner_phone: r.profiles?.phone ?? null,
      owner_email: r.profiles?.email ?? null,
    })));
    setLoading(false);
  }, [category, city, availableOnly]);

  useEffect(() => { fetchEquipment(); }, [fetchEquipment]);

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
          <Link href="/profile" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.6)", textDecoration: "none" }}>My Profile →</Link>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.62rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.4rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(196,112,58,0.4)" }} />
            Rent Gear
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, color: "#1C1410", margin: "0 0 0.5rem" }}>
            Equipment for Rent
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#7A5C42", margin: 0, lineHeight: 1.6 }}>
            Cameras, lenses, lighting, drones — rent professional gear from owners near you.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
          <select style={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {EQUIPMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select style={sel} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All Cities</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="button" onClick={() => setAvailableOnly((v) => !v)} style={{
            padding: "0.45rem 0.85rem", borderRadius: "8px",
            border: availableOnly ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
            background: availableOnly ? "rgba(196,112,58,0.07)" : "#FFFFFF",
            color: availableOnly ? "#C4703A" : "#7A5C42",
            fontSize: "0.78rem", fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
          }}>
            {availableOnly ? "✓ Available Only" : "Available Only"}
          </button>
          {!loading && (
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", marginLeft: "0.25rem" }}>
              {equipment.length} {equipment.length === 1 ? "result" : "results"}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
          {loading ? <LoadingGrid /> : equipment.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem 1rem" }}>
              <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>📦</span>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.3rem" }}>No equipment found</p>
              <p style={{ fontSize: "0.8rem", color: "#9B7B60", margin: 0 }}>Try adjusting your filters</p>
            </div>
          ) : equipment.map((e) => (
            <Link key={e.id} href={`/equipment/${e.id}`} style={{ textDecoration: "none" }}>
              <div className="cj-card" style={{
                background: "#FFFFFF", border: "1.5px solid #E8DED0",
                borderRadius: "16px", overflow: "hidden",
                transition: "border-color 0.2s, box-shadow 0.2s",
                cursor: "pointer", height: "100%",
                opacity: e.is_available ? 1 : 0.6,
              }}>
                <div style={{
                  padding: "0.875rem 1.1rem", borderBottom: "1px solid #F0E8DC",
                  background: "linear-gradient(135deg, rgba(196,112,58,0.03), transparent)",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.35rem" }}>
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

                <div style={{ padding: "0.875rem 1.1rem" }}>
                  {e.description && (
                    <p style={{ fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.7rem", lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                      {e.description}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: "0.72rem", color: "#9B7B60" }}>
                      📍 {[e.pickup_area, e.pickup_city].filter(Boolean).join(", ") || "—"}
                      {e.condition && (
                        <span style={{ color: conditionColor(e.condition), fontWeight: 700 }}> · {e.condition}</span>
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
                    Listed by <span style={{ color: "#7A5C42", fontWeight: 600 }}>{e.owner_name}</span>
                  </div>

                  {(e.owner_phone || e.owner_email) && (
                    <div style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #F0E8DC", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                      {e.owner_phone && (
                        <a
                          href={`tel:${e.owner_phone}`}
                          onClick={(ev) => ev.stopPropagation()}
                          style={{ fontSize: "0.72rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem" }}
                        >
                          📞 {e.owner_phone}
                        </a>
                      )}
                      {e.owner_email && (
                        <a
                          href={`mailto:${e.owner_email}`}
                          onClick={(ev) => ev.stopPropagation()}
                          style={{ fontSize: "0.72rem", fontWeight: 600, color: "#C4703A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.3rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                        >
                          ✉️ {e.owner_email}
                        </a>
                      )}
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
        @media (max-width: 600px) { div[style*="minmax(240px"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}