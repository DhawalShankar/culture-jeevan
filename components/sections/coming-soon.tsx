"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FEATURES = [
  { icon: "📅", label: "Instant Bookings" },
  { icon: "💸", label: "Guaranteed Advance Payment" },
  { icon: "📊", label: "Studio Dashboard" },
  { icon: "📣", label: "Built-in Discovery" },
  { icon: "🛡️", label: "No-Show Protection" },
  { icon: "✅", label: "Verified Studio Badge" },
];

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ComingSoon() {
  const launch = new Date(Date.now() + 22 * 86400000 + 14 * 3600000 + 33 * 60000);
  const { days, hours, minutes, seconds } = useCountdown(launch);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleNotify = () => {
    if (email.includes("@")) setSubmitted(true);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1C1410 0%, #2A1A0E 50%, #1C1410 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-dm-sans, sans-serif)",
      }}
    >
      {/* ── Ambient blobs ── */}
      <div
        style={{
          position: "absolute", top: "-120px", right: "-120px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,112,58,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "-160px", left: "-160px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,112,58,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(196,112,58,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,112,58,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "760px", width: "100%", textAlign: "center" }}>

        {/* ── Logo / brand ── */}
        <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "2.5rem" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair, serif)",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "#FAF7F2",
              letterSpacing: "-0.02em",
            }}
          >
            Culture<span style={{ color: "#C4703A", fontStyle: "italic" }}>Jeevan</span>
          </span>
        </Link>

        {/* ── Badge ── */}
        <div style={{ marginBottom: "1.5rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "rgba(196,112,58,0.15)",
              border: "1px solid rgba(196,112,58,0.3)",
              color: "#F0A060",
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "0.35rem 1rem",
              borderRadius: "100px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "6px", height: "6px", borderRadius: "50%",
                backgroundColor: "#C4703A",
                boxShadow: "0 0 6px #C4703A",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }}
            />
            Something Big Is Coming
          </span>
        </div>

        {/* ── Headline ── */}
        <h1
          style={{
            fontFamily: "var(--font-playfair, serif)",
            fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            fontWeight: 900,
            color: "#FAF7F2",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            marginBottom: "1.25rem",
          }}
        >
          The Studio Booking
          <br />
          Platform for{" "}
          <span style={{ color: "#C4703A", fontStyle: "italic" }}>Creators.</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            color: "#C8B4A0",
            lineHeight: 1.75,
            maxWidth: "520px",
            margin: "0 auto 3rem",
          }}
        >
          We&apos;re building the easiest way for photographers, filmmakers, and creators to
          find and book studios — with guaranteed 50% advance payment and zero marketing cost for owners.
        </p>

        {/* ── Countdown ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(0.75rem, 3vw, 1.5rem)",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Days", value: pad(days) },
            { label: "Hours", value: pad(hours) },
            { label: "Mins", value: pad(minutes) },
            { label: "Secs", value: pad(seconds) },
          ].map((unit, i) => (
            <div key={unit.label} style={{ display: "flex", alignItems: "center", gap: "clamp(0.75rem, 3vw, 1.5rem)" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    backgroundColor: "#241810",
                    border: "1px solid #3D2918",
                    borderRadius: "14px",
                    padding: "clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 1.75rem)",
                    minWidth: "clamp(64px, 12vw, 90px)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(196,112,58,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-playfair, serif)",
                      fontSize: "clamp(1.75rem, 5vw, 3rem)",
                      fontWeight: 900,
                      color: "#FAF7F2",
                      display: "block",
                      lineHeight: 1,
                      letterSpacing: "-0.03em",
                    }}
                  >
                    {unit.value}
                  </span>
                </div>
                <span
                  style={{
                    display: "block",
                    marginTop: "0.5rem",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#9B7B60",
                  }}
                >
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <span
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                    fontWeight: 900,
                    color: "#3D2918",
                    lineHeight: 1,
                    marginTop: "-1.5rem",
                  }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        {/* ── Email capture ── */}
        {!submitted ? (
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              maxWidth: "460px",
              margin: "0 auto 2.5rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <input
              type="email"
              placeholder="Enter your email for early access"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleNotify()}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "0.8rem 1.1rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: `1.5px solid ${focused ? "#C4703A" : "#3D2918"}`,
                borderRadius: "10px",
                color: "#FAF7F2",
                fontSize: "0.9rem",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
            />
            <button
              onClick={handleNotify}
              style={{
                padding: "0.8rem 1.5rem",
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B0612E")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
            >
              Notify Me →
            </button>
          </div>
        ) : (
          <div
            style={{
              maxWidth: "460px",
              margin: "0 auto 2.5rem",
              backgroundColor: "rgba(196,112,58,0.12)",
              border: "1px solid rgba(196,112,58,0.3)",
              borderRadius: "12px",
              padding: "1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>🎉</span>
            <p style={{ fontSize: "0.9rem", color: "#F0A060", fontWeight: 600 }}>
              You&apos;re on the early access list! We&apos;ll reach out soon.
            </p>
          </div>
        )}

        {/* ── Feature pills ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            justifyContent: "center",
            marginBottom: "3.5rem",
          }}
        >
          {FEATURES.map((f) => (
            <span
              key={f.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#241810",
                border: "1px solid #3D2918",
                borderRadius: "100px",
                padding: "0.4rem 0.9rem",
                fontSize: "0.78rem",
                color: "#C8B4A0",
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: "0.9rem" }}>{f.icon}</span>
              {f.label}
            </span>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #3D2918, transparent)",
            marginBottom: "2rem",
          }}
        />

        {/* ── Bottom links ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/"
            style={{
              fontSize: "0.82rem",
              color: "#9B7B60",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            ← Back to Home
          </Link>
          <span style={{ color: "#3D2918" }}>|</span>
          <Link
            href="/list-your-studio"
            style={{
              fontSize: "0.82rem",
              color: "#9B7B60",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            List Your Studio
          </Link>
          <span style={{ color: "#3D2918" }}>|</span>
          <a
            href="mailto:hello@culturejeevan.com"
            style={{
              fontSize: "0.82rem",
              color: "#9B7B60",
              textDecoration: "none",
              fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
          >
            Contact Us
          </a>
        </div>

        <p style={{ marginTop: "1.5rem", fontSize: "0.72rem", color: "#4A3828", fontWeight: 500 }}>
          © {new Date().getFullYear()} CultureJeevan. All rights reserved.
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}