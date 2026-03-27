"use client";

import StudioCard from "./studio-card";

const STUDIOS = [
  {
    name: "Lumina Studio Delhi",
    type: "Photography",
    city: "Connaught Place, Delhi",
    price: 1200,
    rating: 4.9,
    reviewCount: 128,
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=600&q=80",
    tags: ["Cyclorama Wall", "Natural Light", "Prop Room"],
  },
  {
    name: "FilmBox Mumbai",
    type: "Film & Video",
    city: "Andheri West, Mumbai",
    price: 2500,
    rating: 4.8,
    reviewCount: 94,
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    tags: ["Green Screen", "Pro Lighting", "Editing Suite"],
  },
  {
    name: "Echo Booth Bangalore",
    type: "Podcast",
    city: "Koramangala, Bangalore",
    price: 800,
    rating: 4.7,
    reviewCount: 67,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80",
    tags: ["Soundproofed", "4K Camera", "Live Streaming"],
  },
  {
    name: "Skyline Rooftop Pune",
    type: "Rooftop Studio",
    city: "Koregaon Park, Pune",
    price: 1800,
    rating: 4.9,
    reviewCount: 51,
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    tags: ["360° View", "Golden Hour", "Outdoor Setup"],
  },
];

const CATEGORIES = [
  "All",
  "Photography",
  "Film & Video",
  "Podcast",
  "Rooftop",
  "Dance",
];

export default function FeaturedStudios() {
  return (
    <section
      style={{
        backgroundColor: "#FAF7F2",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#F0DCC8",
                color: "#8B4513",
                fontSize: "0.78rem",
                fontWeight: 700,
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Featured Studios
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: "#1C1410",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              Top-Rated Spaces
              <br />
              <span style={{ color: "#C4703A", fontStyle: "italic" }}>
                Loved by Creators
              </span>
            </h2>
          </div>

          <a
            href="#"
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#C4703A",
              textDecoration: "none",
              border: "1.5px solid #C4703A",
              padding: "0.5rem 1.25rem",
              borderRadius: "8px",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C4703A";
              e.currentTarget.style.color = "#FAF7F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#C4703A";
            }}
          >
            View All Studios →
          </a>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              style={{
                padding: "0.45rem 1rem",
                borderRadius: "100px",
                fontSize: "0.82rem",
                fontWeight: 600,
                border: "1.5px solid",
                cursor: "pointer",
                transition: "all 0.2s",
                ...(i === 0
                  ? {
                      backgroundColor: "#C4703A",
                      color: "#FAF7F2",
                      borderColor: "#C4703A",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "#7A5C42",
                      borderColor: "#E8DED0",
                    }),
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {STUDIOS.map((studio) => (
            <StudioCard key={studio.name} {...studio} />
          ))}
        </div>
      </div>
    </section>
  );
}