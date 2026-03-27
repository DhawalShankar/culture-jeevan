"use client";

import { useState } from "react";

const STUDIO_TYPES = [
  "Photography Studio",
  "Film & Video Studio",
  "Podcast Studio",
  "Rooftop Studio",
  "Dance Studio",
];

export default function Hero() {
  const [location, setLocation] = useState("");
  const [studioType, setStudioType] = useState("");

  return (
    <>
      {/* ── Safety Banner (KEY ADDITION from blueprint) ── */}
      <div
        style={{
          backgroundColor: "#1C1410",
          color: "#FAF7F2",
          padding: "0.6rem 2rem",
          textAlign: "center",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.02em",
        }}
      >
        🔒{" "}
        <span style={{ color: "#C4703A" }}>
          Bookings outside CultureJeevan are not protected.
        </span>{" "}
        Always book on platform for verified studios &amp; conflict resolution.
      </div>

      <section
        style={{
          minHeight: "calc(100vh - 68px)",
          backgroundColor: "#FAF7F2",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            backgroundColor: "#F0DCC8",
            opacity: 0.5,
            filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "4rem 2rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
            minHeight: "calc(100vh - 100px)",
          }}
          className="hero-grid"
        >
          {/* ── LEFT: Copy & Search ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Pill badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#F0DCC8",
                color: "#8B4513",
                fontSize: "0.78rem",
                fontWeight: 700,
                padding: "0.35rem 0.9rem",
                borderRadius: "100px",
                width: "fit-content",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              <span>📸</span> Multiple Studios Across India
            </span>

            {/* Heading — updated to reflect Scan-to-Shoot model */}
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
                  fontWeight: 900,
                  lineHeight: 1.06,
                  color: "#1C1410",
                  letterSpacing: "-0.03em",
                  marginBottom: "0.75rem",
                }}
              >
                Book a Studio.
                <br />
                <span style={{ color: "#C4703A", fontStyle: "italic" }}>
                  Scan, Shoot,
                </span>
                <br />
                Create.
              </h1>
              {/* Sub-copy updated to explain the full model clearly */}
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#6B5240",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                  fontWeight: 400,
                }}
              >
                Discover and instantly book verified studios — photography, film,
                podcast, rooftop, dance. Pay 50% to secure your slot, scan the
                QR when you arrive, and settle the rest at the studio.{" "}
                <strong style={{ color: "#1C1410" }}>
                  Simple. Transparent. Protected.
                </strong>
              </p>
            </div>

            {/* Search Card */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DED0",
                borderRadius: "16px",
                padding: "1.5rem",
                boxShadow: "0 4px 24px rgba(196, 112, 58, 0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#9B7B60",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                Find Your Space
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "0.875rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1rem",
                      pointerEvents: "none",
                    }}
                  >
                    📍
                  </span>
                  <input
                    type="text"
                    placeholder="Enter city or area..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.875rem 0.75rem 2.5rem",
                      border: "1.5px solid #E8DED0",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      color: "#1C1410",
                      backgroundColor: "#FAF7F2",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
                  />
                </div>

                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "0.875rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "1rem",
                      pointerEvents: "none",
                    }}
                  >
                    🎬
                  </span>
                  <select
                    value={studioType}
                    onChange={(e) => setStudioType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 0.875rem 0.75rem 2.5rem",
                      border: "1.5px solid #E8DED0",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      color: studioType ? "#1C1410" : "#9B7B60",
                      backgroundColor: "#FAF7F2",
                      outline: "none",
                      appearance: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="" disabled>
                      Studio type...
                    </option>
                    {STUDIO_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    backgroundColor: "#C4703A",
                    color: "#FAF7F2",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "background-color 0.2s, transform 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#A85C2E";
                    e.currentTarget.style.transform = "scale(1.01)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#C4703A";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Search Studios →
                </button>
              </div>
            </div>

            {/* Trust row — added Platform Protected */}
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {[
                { icon: "⚡", text: "Instant Confirmation" },
                { icon: "🔐", text: "Secure Payments" },
                { icon: "✅", text: "Verified Studios" },
                { icon: "🛡️", text: "Platform Protected" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.8rem",
                    color: "#7A5C42",
                    fontWeight: 500,
                  }}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image ── */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: "-40px",
                bottom: "-40px",
                width: "480px",
                height: "480px",
                borderRadius: "50%",
                backgroundColor: "#EDD5B8",
                zIndex: 0,
              }}
            />

            {/* Float card 1: Studios count */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "-20px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DED0",
                borderRadius: "14px",
                padding: "1rem 1.25rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                zIndex: 10,
                minWidth: "160px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "#C4703A",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                Multiple
              </p>
              <p style={{ fontSize: "0.78rem", color: "#7A5C42", fontWeight: 500 }}>
                Studios Available
              </p>
            </div>

            {/* Float card 2: Cities */}
            <div
              style={{
                position: "absolute",
                bottom: "15%",
                left: "-30px",
                backgroundColor: "#1C1410",
                borderRadius: "14px",
                padding: "0.875rem 1.25rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1.2rem" }}>🏙️</span>
                <div>
                  <p style={{ fontSize: "0.78rem", color: "#FAF7F2", fontWeight: 600 }}>
                    Available in
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#C4703A", fontWeight: 500 }}>
                    Multiple Indian Cities
                  </p>
                </div>
              </div>
            </div>

            {/* Float card 3: Platform Protected (NEW — key trust signal) */}
            <div
              style={{
                position: "absolute",
                bottom: "42%",
                right: "-20px",
                backgroundColor: "#0D3B2E",
                border: "1px solid #1a5c46",
                borderRadius: "14px",
                padding: "0.7rem 1rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>🛡️</span>
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "#7FFFD4",
                    fontWeight: 700,
                    lineHeight: 1.3,
                  }}
                >
                  Platform<br />Protected Booking
                </p>
              </div>
            </div>

            {/* Main image */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
                width: "100%",
                maxWidth: "500px",
                aspectRatio: "3/4",
                borderRadius: "24px",
                overflow: "hidden",
                backgroundColor: "#D4B896",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
                alt="Professional cameraman in studio"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(196,112,58,0.3) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              padding: 2rem 1.25rem !important;
            }
            .hero-grid > div:last-child {
              display: none !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}