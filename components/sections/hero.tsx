"use client";

import { useState } from "react";
import Link from "next/link";

const STUDIO_TYPES = [
  "Photography Studio",
  "Film & Video Studio",
  "Podcast Studio",
  "Rooftop Studio",
  "Dance Studio",
];

const CAFE_AMBIENCE = ["Cosy", "Industrial", "Vintage", "Minimalist", "Outdoor"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"studio" | "cafe">("studio");
  const [location, setLocation] = useState("");
  const [studioType, setStudioType] = useState("");
  const [cafeAmbience, setCafeAmbience] = useState("");

  return (
    <>
      {/* ── Safety Banner ── */}
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
        Always book on platform for verified spaces &amp; conflict resolution.
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
          {/* ── LEFT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Dual category pills */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  backgroundColor: "#F0DCC8", color: "#8B4513",
                  fontSize: "0.75rem", fontWeight: 700,
                  padding: "0.35rem 0.9rem", borderRadius: "100px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}
              >
                🎬 Studios
              </span>
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  backgroundColor: "#1C1410", color: "#C4703A",
                  fontSize: "0.75rem", fontWeight: 700,
                  padding: "0.35rem 0.9rem", borderRadius: "100px",
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}
              >
                ☕ Café Venues
                <span
                  style={{
                    backgroundColor: "#C4703A", color: "#FAF7F2",
                    fontSize: "0.55rem", fontWeight: 800,
                    padding: "0.1rem 0.35rem", borderRadius: "100px",
                  }}
                >
                  NEW
                </span>
              </span>
            </div>

            {/* Heading — switches with tab */}
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
                {activeTab === "studio" ? (
                  <>
                    Book a Studio.
                    <br />
                    <span style={{ color: "#C4703A", fontStyle: "italic" }}>Scan, Shoot,</span>
                    <br />
                    Create.
                  </>
                ) : (
                  <>
                    Shoot Where
                    <br />
                    <span style={{ color: "#C4703A", fontStyle: "italic" }}>the Vibe</span>
                    <br />
                    is Real.
                  </>
                )}
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#6B5240",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                  fontWeight: 400,
                }}
              >
                {activeTab === "studio" ? (
                  <>
                    Discover and instantly book verified studios — photography, film,
                    podcast, rooftop, dance. Pay 50% to secure your slot, scan the QR
                    when you arrive, and settle the rest at the studio.{" "}
                    <strong style={{ color: "#1C1410" }}>Simple. Transparent. Protected.</strong>
                  </>
                ) : (
                  <>
                    Stop recreating café aesthetics in a studio. Book the actual café —
                    before it opens or during its quietest hours. Real ambience. Real light.{" "}
                    <strong style={{ color: "#1C1410" }}>Verified by CultureJeevan.</strong>
                  </>
                )}
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
              {/* Tab switcher inside card */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  backgroundColor: "#FAF7F2",
                  borderRadius: "10px",
                  padding: "4px",
                  border: "1px solid #E8DED0",
                }}
              >
                <button
                  onClick={() => setActiveTab("studio")}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "7px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.35rem",
                    backgroundColor: activeTab === "studio" ? "#FFFFFF" : "transparent",
                    color: activeTab === "studio" ? "#1C1410" : "#9B7B60",
                    boxShadow: activeTab === "studio" ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  🎬 Studios
                </button>
                <button
                  onClick={() => setActiveTab("cafe")}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "7px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.35rem",
                    backgroundColor: activeTab === "cafe" ? "#1C1410" : "transparent",
                    color: activeTab === "cafe" ? "#C4703A" : "#9B7B60",
                    boxShadow: activeTab === "cafe" ? "0 1px 6px rgba(0,0,0,0.15)" : "none",
                  }}
                >
                  ☕ Café Venues
                </button>
              </div>

              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#9B7B60",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                }}
              >
                {activeTab === "studio" ? "Find Your Studio" : "Find Your Café"}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {/* Location — same for both */}
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute", left: "0.875rem", top: "50%",
                      transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none",
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

                {/* Studio type OR Café ambience */}
                {activeTab === "studio" ? (
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute", left: "0.875rem", top: "50%",
                        transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none",
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
                      <option value="" disabled>Studio type...</option>
                      {STUDIO_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute", left: "0.875rem", top: "50%",
                        transform: "translateY(-50%)", fontSize: "1rem", pointerEvents: "none",
                      }}
                    >
                      ☕
                    </span>
                    <select
                      value={cafeAmbience}
                      onChange={(e) => setCafeAmbience(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.75rem 0.875rem 0.75rem 2.5rem",
                        border: "1.5px solid #E8DED0",
                        borderRadius: "10px",
                        fontSize: "0.9rem",
                        color: cafeAmbience ? "#1C1410" : "#9B7B60",
                        backgroundColor: "#FAF7F2",
                        outline: "none",
                        appearance: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="" disabled>Café ambience...</option>
                      {CAFE_AMBIENCE.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* CTA — routes to correct page */}
                <Link
                  href={activeTab === "studio" ? "/studios" : "/cafe-venues"}
                  style={{
                    width: "100%",
                    padding: "0.875rem",
                    backgroundColor: activeTab === "studio" ? "#C4703A" : "#1C1410",
                    color: activeTab === "studio" ? "#FAF7F2" : "#C4703A",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    transition: "opacity 0.2s",
                    boxSizing: "border-box",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {activeTab === "studio" ? "Search Studios →" : "Find a Café →"}
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              {[
                { icon: "⚡", text: "Instant Confirmation" },
                { icon: "🔐", text: "Secure Payments" },
                { icon: "✅", text: "Verified Spaces" },
                { icon: "🛡️", text: "Platform Protected" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    fontSize: "0.8rem", color: "#7A5C42", fontWeight: 500,
                  }}
                >
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Image (switches with tab) ── */}
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
                position: "absolute", right: "-40px", bottom: "-40px",
                width: "480px", height: "480px", borderRadius: "50%",
                backgroundColor: "#EDD5B8", zIndex: 0,
              }}
            />

            {/* Float 1 */}
            <div
              style={{
                position: "absolute", top: "10%", left: "-20px",
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "14px", padding: "1rem 1.25rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)", zIndex: 10, minWidth: "170px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair)", fontSize: "1.1rem",
                  fontWeight: 800, color: "#C4703A", lineHeight: 1.2, marginBottom: "0.25rem",
                }}
              >
                Studios + Cafés
              </p>
              <p style={{ fontSize: "0.72rem", color: "#7A5C42", fontWeight: 500 }}>
                Two verticals. One platform.
              </p>
            </div>

            {/* Float 2 */}
            <div
              style={{
                position: "absolute", bottom: "15%", left: "-30px",
                backgroundColor: "#1C1410", borderRadius: "14px",
                padding: "0.875rem 1.25rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 10,
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

            {/* Float 3: Platform Protected */}
            <div
              style={{
                position: "absolute", bottom: "42%", right: "-20px",
                backgroundColor: "#0D3B2E", border: "1px solid #1a5c46",
                borderRadius: "14px", padding: "0.7rem 1rem",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>🛡️</span>
                <p style={{ fontSize: "0.72rem", color: "#7FFFD4", fontWeight: 700, lineHeight: 1.3 }}>
                  Platform<br />Protected Booking
                </p>
              </div>
            </div>

            {/* Main image — switches with active tab */}
            <div
              style={{
                position: "relative", zIndex: 5,
                width: "100%", maxWidth: "500px",
                aspectRatio: "3/4", borderRadius: "24px",
                overflow: "hidden", backgroundColor: "#D4B896",
              }}
            >
              <img
                key={activeTab}
                src={
                  activeTab === "studio"
                    ? "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
                    : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                }
                alt={activeTab === "studio" ? "Professional studio" : "Aesthetic café"}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(196,112,58,0.3) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              {/* Label on image */}
              <div
                style={{
                  position: "absolute", bottom: "1.25rem", left: "1.25rem",
                  backgroundColor: "rgba(28,20,16,0.75)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "100px", padding: "0.35rem 0.875rem",
                  fontSize: "0.72rem", fontWeight: 700, color: "#FAF7F2",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                }}
              >
                {activeTab === "studio" ? "🎬 Studio Shoot" : "☕ Café Session"}
              </div>
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