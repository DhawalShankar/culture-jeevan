"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Studio {
  id: string;
  name: string;
  type: string;
  city: string;
  area: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  tags: string[];
  available: boolean;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ALL_STUDIOS: Studio[] = [
  {
    id: "1",
    name: "Lumina Photography Studio",
    type: "Photography",
    city: "Delhi",
    area: "Connaught Place",
    price: 1200,
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80",
    tags: ["Cyclorama Wall", "Natural Light", "Prop Room"],
    available: true,
  },
  {
    id: "2",
    name: "FilmBox Production Studio",
    type: "Film & Video",
    city: "Mumbai",
    area: "Andheri West",
    price: 2500,
    rating: 4.8,
    reviewCount: 94,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    tags: ["Green Screen", "Pro Lighting", "Editing Suite"],
    available: true,
  },
  {
    id: "3",
    name: "Echo Podcast Booth",
    type: "Podcast",
    city: "Bangalore",
    area: "Koramangala",
    price: 800,
    rating: 4.7,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    tags: ["Soundproofed", "4K Camera", "Live Streaming"],
    available: true,
  },
  {
    id: "4",
    name: "Skyline Rooftop Studio",
    type: "Rooftop",
    city: "Pune",
    area: "Koregaon Park",
    price: 1800,
    rating: 4.9,
    reviewCount: 51,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    tags: ["360° View", "Golden Hour", "Outdoor Setup"],
    available: true,
  },
  {
    id: "5",
    name: "Rhythm Dance Studio",
    type: "Dance",
    city: "Mumbai",
    area: "Bandra",
    price: 950,
    rating: 4.6,
    reviewCount: 83,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&q=80",
    tags: ["Mirror Wall", "Sprung Floor", "Sound System"],
    available: false,
  },
  {
    id: "6",
    name: "Lens & Light Studio",
    type: "Photography",
    city: "Delhi",
    area: "Lajpat Nagar",
    price: 900,
    rating: 4.5,
    reviewCount: 112,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80",
    tags: ["Multiple Backdrops", "Ring Light", "Makeup Room"],
    available: true,
  },
  {
    id: "7",
    name: "CineVault Film Studio",
    type: "Film & Video",
    city: "Hyderabad",
    area: "Jubilee Hills",
    price: 3200,
    rating: 4.9,
    reviewCount: 39,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    tags: ["4K RED Camera", "Dolly Track", "Production Office"],
    available: true,
  },
  {
    id: "8",
    name: "The Sound Lab",
    type: "Podcast",
    city: "Bangalore",
    area: "Indiranagar",
    price: 1100,
    rating: 4.8,
    reviewCount: 44,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80",
    tags: ["Acoustic Panels", "Video Podcast", "Green Room"],
    available: true,
  },
  {
    id: "9",
    name: "Terrace Dreams Studio",
    type: "Rooftop",
    city: "Delhi",
    area: "Hauz Khas",
    price: 2200,
    rating: 4.7,
    reviewCount: 28,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    tags: ["City Skyline", "Night Shoots", "Fairy Lights"],
    available: true,
  },
];

const CITIES = ["All Cities", "Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad"];
const TYPES = ["All Types", "Photography", "Film & Video", "Podcast", "Rooftop", "Dance"];
const SORT_OPTIONS = ["Recommended", "Price: Low to High", "Price: High to Low", "Top Rated"];

const TYPE_COLORS: Record<string, string> = {
  Photography: "#7C5CBF",
  "Film & Video": "#C4703A",
  Podcast: "#2E8B7A",
  Rooftop: "#C4873A",
  Dance: "#C43A6A",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StudioCard({ studio }: { studio: Studio }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8DED0",
        borderRadius: "18px",
        overflow: "hidden",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 20px 60px rgba(196,112,58,0.15)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "210px",
          backgroundColor: "#D4B896",
          overflow: "hidden",
        }}
      >
        <img
          src={studio.image}
          alt={studio.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(28,20,16,0.4) 0%, transparent 50%)",
          }}
        />
        {/* Type badge */}
        <span
          style={{
            position: "absolute",
            top: "0.875rem",
            left: "0.875rem",
            backgroundColor: TYPE_COLORS[studio.type] || "#C4703A",
            color: "#fff",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "0.3rem 0.75rem",
            borderRadius: "100px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {studio.type}
        </span>
        {/* Unavailable overlay */}
        {!studio.available && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(28,20,16,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "#FAF7F2",
                color: "#1C1410",
                fontSize: "0.78rem",
                fontWeight: 700,
                padding: "0.4rem 1rem",
                borderRadius: "100px",
                letterSpacing: "0.04em",
              }}
            >
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.4rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#1C1410",
              lineHeight: 1.25,
              maxWidth: "65%",
            }}
          >
            {studio.name}
          </h3>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "#C4703A" }}>
              ₹{studio.price.toLocaleString()}
            </p>
            <p style={{ fontSize: "0.7rem", color: "#9B7B60", marginTop: "1px" }}>per hour</p>
          </div>
        </div>

        {/* Location & Rating */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.875rem",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#7A5C42" }}>
            📍 {studio.area}, {studio.city}
          </span>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#7A5C42",
              display: "flex",
              alignItems: "center",
              gap: "0.2rem",
            }}
          >
            ⭐ {studio.rating}{" "}
            <span style={{ color: "#B8A090" }}>({studio.reviewCount})</span>
          </span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
          {studio.tags.map((tag) => (
            <span
              key={tag}
              style={{
                backgroundColor: "#F5EFE7",
                color: "#7A5C42",
                fontSize: "0.7rem",
                fontWeight: 500,
                padding: "0.22rem 0.6rem",
                borderRadius: "100px",
                border: "1px solid #E8DED0",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={`/studios/${studio.id}`}
          style={{
            display: "block",
            width: "100%",
            padding: "0.65rem",
            backgroundColor: studio.available ? "transparent" : "#F5EFE7",
            color: studio.available ? "#C4703A" : "#B8A090",
            border: `1.5px solid ${studio.available ? "#C4703A" : "#E8DED0"}`,
            borderRadius: "10px",
            fontSize: "0.875rem",
            fontWeight: 600,
            cursor: studio.available ? "pointer" : "not-allowed",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.2s",
            pointerEvents: studio.available ? "auto" : "none",
          }}
          onMouseEnter={(e) => {
            if (studio.available) {
              e.currentTarget.style.backgroundColor = "#C4703A";
              e.currentTarget.style.color = "#FAF7F2";
            }
          }}
          onMouseLeave={(e) => {
            if (studio.available) {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#C4703A";
            }
          }}
        >
          {studio.available ? "View & Book →" : "Unavailable"}
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StudiosListing() {
  const [city, setCity] = useState("All Cities");
  const [type, setType] = useState("All Types");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Recommended");
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleEnableLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        () => alert("Location access denied. Please enable it in your browser settings.")
      );
    }
  };

  const filtered = useMemo(() => {
    let result = ALL_STUDIOS.filter((s) => {
      if (city !== "All Cities" && s.city !== city) return false;
      if (type !== "All Types" && s.type !== type) return false;
      if (s.price < priceRange[0] || s.price > priceRange[1]) return false;
      if (s.rating < minRating) return false;
      return true;
    });

    if (sortBy === "Price: Low to High") result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") result = [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "Top Rated") result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [city, type, priceRange, minRating, sortBy]);

  const activeFilterCount = [
    city !== "All Cities",
    type !== "All Types",
    priceRange[0] > 0 || priceRange[1] < 5000,
    minRating > 0,
  ].filter(Boolean).length;

  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.875rem",
    border: "1.5px solid #E8DED0",
    borderRadius: "10px",
    fontSize: "0.875rem",
    color: "#1C1410",
    backgroundColor: "#FAF7F2",
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* ── Page Header ── */}
      <div
        style={{
          backgroundColor: "#F5EFE7",
          borderBottom: "1px solid #E8DED0",
          padding: "3rem 2rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.82rem",
              color: "#9B7B60",
              marginBottom: "1rem",
            }}
          >
            <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
            >
              Home
            </Link>
            <span>›</span>
            <span style={{ color: "#1C1410", fontWeight: 500 }}>Explore Studios</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  color: "#1C1410",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                Explore Studios
              </h1>
              <p style={{ fontSize: "0.95rem", color: "#6B5240" }}>
                {filtered.length} studio{filtered.length !== 1 ? "s" : ""} available
                {city !== "All Cities" ? ` in ${city}` : " across India"}
              </p>
            </div>

            {/* Location toggle */}
            <button
              onClick={handleEnableLocation}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                backgroundColor: locationEnabled ? "#C4703A" : "#FFFFFF",
                color: locationEnabled ? "#FAF7F2" : "#5C4A3A",
                border: "1.5px solid",
                borderColor: locationEnabled ? "#C4703A" : "#E8DED0",
                borderRadius: "10px",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              <span>{locationEnabled ? "✅" : "📍"}</span>
              {locationEnabled ? "Sorted by Distance" : "Sort by Nearest"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Filters Bar ── */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E8DED0",
          padding: "1rem 2rem",
          position: "sticky",
          top: "68px",
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* City */}
          <div style={{ position: "relative", minWidth: "150px" }}>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
            >
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Studio Type */}
          <div style={{ position: "relative", minWidth: "160px" }}>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* More Filters toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.625rem 1rem",
              backgroundColor: filtersOpen || activeFilterCount > 0 ? "#FDF0E6" : "#FAF7F2",
              color: activeFilterCount > 0 ? "#C4703A" : "#5C4A3A",
              border: `1.5px solid ${activeFilterCount > 0 ? "#C4703A" : "#E8DED0"}`,
              borderRadius: "10px",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ⚙️ Filters
            {activeFilterCount > 0 && (
              <span
                style={{
                  backgroundColor: "#C4703A",
                  color: "#FAF7F2",
                  borderRadius: "100px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  padding: "0.1rem 0.45rem",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <div style={{ marginLeft: "auto", minWidth: "190px" }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ ...inputStyle, fontWeight: 500 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
            >
              {SORT_OPTIONS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Clear filters */}
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setCity("All Cities");
                setType("All Types");
                setPriceRange([0, 5000]);
                setMinRating(0);
              }}
              style={{
                fontSize: "0.82rem",
                color: "#C4703A",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Expanded filters panel */}
        {filtersOpen && (
          <div
            style={{
              maxWidth: "1280px",
              margin: "0.875rem auto 0",
              padding: "1.25rem",
              backgroundColor: "#FAF7F2",
              border: "1.5px solid #E8DED0",
              borderRadius: "14px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Price Range */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#9B7B60",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Price Range (per hour)
              </label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="number"
                  placeholder="Min ₹"
                  value={priceRange[0] || ""}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value) || 0, priceRange[1]])
                  }
                  style={{ ...inputStyle, width: "50%" }}
                />
                <span style={{ color: "#9B7B60", fontSize: "0.875rem" }}>—</span>
                <input
                  type="number"
                  placeholder="Max ₹"
                  value={priceRange[1] === 5000 ? "" : priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value) || 5000])
                  }
                  style={{ ...inputStyle, width: "50%" }}
                />
              </div>
              <p style={{ fontSize: "0.75rem", color: "#B8A090", marginTop: "0.4rem" }}>
                ₹{priceRange[0].toLocaleString()} – ₹
                {priceRange[1] === 5000 ? "5,000+" : priceRange[1].toLocaleString()}
              </p>
            </div>

            {/* Min Rating */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#9B7B60",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Minimum Rating
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {[0, 4.0, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(r)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "100px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      border: "1.5px solid",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      backgroundColor: minRating === r ? "#C4703A" : "transparent",
                      color: minRating === r ? "#FAF7F2" : "#7A5C42",
                      borderColor: minRating === r ? "#C4703A" : "#E8DED0",
                    }}
                  >
                    {r === 0 ? "Any" : `${r}+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Studios Grid ── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2.5rem 2rem 5rem",
        }}
      >
        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            {city !== "All Cities" && (
              <FilterChip label={`📍 ${city}`} onRemove={() => setCity("All Cities")} />
            )}
            {type !== "All Types" && (
              <FilterChip label={`🎬 ${type}`} onRemove={() => setType("All Types")} />
            )}
            {(priceRange[0] > 0 || priceRange[1] < 5000) && (
              <FilterChip
                label={`₹${priceRange[0].toLocaleString()}–₹${priceRange[1].toLocaleString()}`}
                onRemove={() => setPriceRange([0, 5000])}
              />
            )}
            {minRating > 0 && (
              <FilterChip label={`⭐ ${minRating}+`} onRemove={() => setMinRating(0)} />
            )}
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "6rem 2rem",
            }}
          >
            <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}>🔍</span>
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#1C1410",
                marginBottom: "0.5rem",
              }}
            >
              No studios found
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#7A5C42", marginBottom: "1.5rem" }}>
              Try adjusting your filters to find more options.
            </p>
            <button
              onClick={() => {
                setCity("All Cities");
                setType("All Types");
                setPriceRange([0, 5000]);
                setMinRating(0);
              }}
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.75rem",
            }}
          >
            {filtered.map((studio) => (
              <StudioCard key={studio.id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Filter Chip ──────────────────────────────────────────────────────────────

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        backgroundColor: "#FDF0E6",
        color: "#8B4513",
        fontSize: "0.8rem",
        fontWeight: 600,
        padding: "0.3rem 0.625rem 0.3rem 0.875rem",
        borderRadius: "100px",
        border: "1.5px solid #F0DCC8",
      }}
    >
      {label}
      <button
        onClick={onRemove}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#C4703A",
          fontSize: "0.9rem",
          lineHeight: 1,
          padding: "0",
          fontWeight: 700,
        }}
      >
        ×
      </button>
    </span>
  );
}