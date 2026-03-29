"use client";

import { useState } from "react";
import Link from "next/link";

// ── Why list your café (dead hours pitch) ─────────────────────────────────────
const PERKS = [
  {
    icon: "💸",
    title: "Earn From Dead Hours",
    desc: "Your café earns zero from 10am–12pm. We send you paying creators during those hours. Pure profit on top of their food orders.",
  },
  {
    icon: "📲",
    title: "Zero Effort Management",
    desc: "Creators book on CultureJeevan, pay 50% advance online. They arrive, scan your QR, shoot, pay balance. You do nothing extra.",
  },
  {
    icon: "✅",
    title: "Verified Café Badge",
    desc: "Get a CultureJeevan Verified badge — displayed on your listing and shareable on your own social media to attract more creators.",
  },
  {
    icon: "💰",
    title: "Guaranteed Advance Payout",
    desc: "Your share of the 50% advance is released the moment the creator scans your QR. Bank transfer within T+2 days, every time.",
  },
  {
    icon: "🛡️",
    title: "No-Show Protection",
    desc: "If a creator books and doesn't show up, their advance is forfeited. You receive a Kill Fee share — your slot was never free.",
  },
  {
    icon: "📣",
    title: "Free Discovery & Exposure",
    desc: "Photographers, musicians, and content creators actively search for aesthetic spaces. Your café gets in front of them — for free.",
  },
];

const AMBIENCE_OPTIONS = ["Cosy", "Industrial", "Vintage", "Minimalist", "Outdoor", "Rustic", "Modern"];
const LIGHT_OPTIONS = ["Morning Light", "Afternoon Light", "Evening Light", "Soft All-Day", "Golden Hour", "Minimal Natural Light"];
const CAFE_TYPES = ["Standalone Café", "Café + Bakery", "Café + Bar", "Rooftop Café", "Bookstore Café", "Other"];

// ── Revenue example ──────────────────────────────────────────────────────────
const REVENUE_ROWS = [
  { label: "Creator pays on platform (50%)", value: "₹300", highlight: false },
  { label: "Platform commission (15%)", value: "−₹75", highlight: false },
  { label: "Your T+2 bank transfer", value: "₹225", highlight: false },
  { label: "Creator pays you at café (50%)", value: "₹300", highlight: false },
  { label: "You earn total per hour", value: "₹525", highlight: true },
];

export default function ListYourCafe() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [form, setForm] = useState({
    // Step 1: Owner info
    ownerName: "",
    phone: "",
    email: "",
    // Step 2: Café basics
    cafeName: "",
    cafeType: "",
    city: "",
    area: "",
    // Step 3: Shoot specifics
    ambience: [] as string[],
    lightType: "",
    instrumentsAllowed: "",
    foodPolicy: "",
    exclusiveSlots: "",
    offPeakSlots: "",
    pricePerHour: "",
    description: "",
    agree: false,
  });

  const update = (field: string, value: string | boolean | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAmbience = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      ambience: prev.ambience.includes(tag)
        ? prev.ambience.filter((a) => a !== tag)
        : [...prev.ambience, tag],
    }));
  };

  const step1Valid = form.ownerName && form.phone && form.email;
  const step2Valid = form.cafeName && form.city && form.cafeType;
  const step3Valid = form.ambience.length > 0 && form.lightType && form.pricePerHour && form.agree;

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem",
    border: "1.5px solid #E8DED0", borderRadius: "10px",
    fontSize: "0.9rem", color: "#1C1410", backgroundColor: "#FAF7F2",
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color 0.2s", fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "0.75rem", fontWeight: 700 as const,
    color: "#9B7B60", letterSpacing: "0.06em",
    textTransform: "uppercase" as const, marginBottom: "0.4rem",
  };

  const focusOrange = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = "#C4703A");
  const blurDefault = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = "#E8DED0");

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(160deg, #0F0A06 0%, #1C1008 50%, #2A1A0A 100%)",
          padding: "5rem 2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-80px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,112,58,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,191,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ maxWidth: "640px", position: "relative" }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                backgroundColor: "rgba(196,112,58,0.15)", color: "#F0A060",
                fontSize: "0.75rem", fontWeight: 700, padding: "0.35rem 0.9rem",
                borderRadius: "100px", letterSpacing: "0.06em",
                textTransform: "uppercase", marginBottom: "1.25rem",
                border: "1px solid rgba(196,112,58,0.2)",
              }}
            >
              ☕ For Café Owners
            </span>

            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 900, color: "#FAF7F2",
                letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem",
              }}
            >
              Your Dead Hours Are
              <br />
              <span style={{ color: "#C4703A", fontStyle: "italic" }}>
                Someone&apos;s Dream Shoot.
              </span>
            </h1>

            <p style={{ fontSize: "1rem", color: "rgba(250,247,242,0.6)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Your café sits empty from 10am to 12pm every single day. CultureJeevan sends you
              paying creators during those hours — they pay on the platform, arrive, scan your QR,
              shoot, and pay the rest in cash. You earn. Zero extra effort.
            </p>

            {/* Key numbers */}
            <div
              style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem", marginBottom: "2.5rem",
              }}
              className="hero-stats"
            >
              {[
                { num: "₹0", label: "Setup fee" },
                { num: "T+2", label: "Bank payout" },
                { num: "15%", label: "Platform cut only" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px", padding: "1rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.5rem", fontWeight: 900,
                      color: "#C4703A", lineHeight: 1, marginBottom: "0.25rem",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(250,247,242,0.4)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  backgroundColor: "#C4703A", color: "#FAF7F2",
                  padding: "0.875rem 2rem", borderRadius: "10px",
                  fontSize: "0.95rem", fontWeight: 700, border: "none",
                  cursor: "pointer", fontFamily: "inherit",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85C2E")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
              >
                List My Café →
              </button>
              <Link
                href="/cafe-venues"
                style={{
                  backgroundColor: "transparent", color: "rgba(250,247,242,0.7)",
                  padding: "0.875rem 2rem", borderRadius: "10px",
                  fontSize: "0.95rem", fontWeight: 600,
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  textDecoration: "none",
                  transition: "border-color 0.2s",
                }}
              >
                See How It Looks →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* ── Perks ── */}
        <div style={{ marginBottom: "5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800, color: "#1C1410",
              textAlign: "center", letterSpacing: "-0.02em", marginBottom: "0.5rem",
            }}
          >
            Why List on CultureJeevan?
          </h2>
          <p style={{ textAlign: "center", color: "#7A5C42", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
            No marketing spend. No extra staff. Just a QR code and a new revenue stream.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                style={{
                  backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                  borderRadius: "16px", padding: "1.5rem",
                }}
              >
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>
                  {perk.icon}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-playfair)", fontSize: "1.05rem",
                    fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem",
                  }}
                >
                  {perk.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#7A5C42", lineHeight: 1.7 }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Revenue Breakdown ── */}
        <div
          style={{
            backgroundColor: "#1C1410", borderRadius: "24px",
            padding: "3rem 2rem", marginBottom: "5rem",
          }}
        >
          <div style={{ maxWidth: "520px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span
                style={{
                  display: "inline-block", backgroundColor: "#2C1F18",
                  color: "#C4703A", fontSize: "0.72rem", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "0.35rem 1rem", borderRadius: "100px",
                  marginBottom: "1rem", border: "1px solid #3D2918",
                }}
              >
                Example: ₹600/hr Café
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                  fontWeight: 900, color: "#FAF7F2", letterSpacing: "-0.02em",
                }}
              >
                How You Get Paid
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#9B7B60", marginTop: "0.5rem" }}>
                Transparent. Simple. No surprises.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#241810", border: "1px solid #3D2918",
                borderRadius: "16px", overflow: "hidden",
              }}
            >
              {REVENUE_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.875rem 1.25rem",
                    borderBottom: i < REVENUE_ROWS.length - 1 ? "1px solid #2C1F18" : "none",
                    backgroundColor: row.highlight ? "#C4703A" : "transparent",
                  }}
                >
                  <span style={{ fontSize: "0.845rem", color: row.highlight ? "#FAF7F2" : "#9B7B60", fontWeight: row.highlight ? 700 : 400 }}>
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: row.highlight ? "1.15rem" : "0.95rem",
                      fontWeight: 800,
                      color: row.highlight ? "#FAF7F2" : "#C4703A",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "#5C4030", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
              * Plus whatever the creator orders at your café during the shoot. That&apos;s extra income on top.
            </p>
          </div>
        </div>

        {/* ── Café Rules & Responsibilities ── */}
        <div
          style={{
            backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8",
            borderRadius: "20px", padding: "2rem 2.5rem",
            marginBottom: "5rem",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem",
          }}
          className="rules-grid"
        >
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#C4703A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Your Responsibilities
            </p>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 800, color: "#1C1410", marginBottom: "1rem" }}>
              What We Expect
            </h3>
            {[
              "Be ready at the café for the booked slot time",
              "Provide QR code at counter for creator to scan",
              "Collect remaining 50% from creator after shoot",
              "Keep your availability calendar updated",
              "Never ask creators to bypass the platform",
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ color: "#C4703A", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>✓</span>
                <span style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.6 }}>{rule}</span>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#7C3A3A", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Platform Policy
            </p>
            <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 800, color: "#1C1410", marginBottom: "1rem" }}>
              What You Must Know
            </h3>
            {[
              "CultureJeevan is NOT liable for any on-site disputes or damage",
              "Bypass attempts: 30-day suspension (permanent on 2nd offense)",
              "Café no-show = 100% refund to creator, no payout to you",
              "Verified badge can be revoked for policy violations",
              "On-site disputes are directly between you and the creator",
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ color: "#C4703A", fontWeight: 700, flexShrink: 0, marginTop: "2px" }}>→</span>
                <span style={{ fontSize: "0.845rem", color: "#6B5240", lineHeight: 1.6 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Application Form ── */}
        <div style={{ maxWidth: "720px", margin: "0 auto" }} id="apply-form">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 800, color: "#1C1410",
                letterSpacing: "-0.02em", marginBottom: "0.5rem",
              }}
            >
              List Your Café
            </h2>
            <p style={{ color: "#7A5C42", fontSize: "0.95rem" }}>
              3 quick steps. Our team will reach out within 48 hours.
            </p>
          </div>

          {submitted ? (
            <div
              style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "20px", padding: "4rem 2rem", textAlign: "center",
              }}
            >
              <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}>☕</span>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>
                Application Received!
              </h3>
              <p style={{ color: "#7A5C42", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 2rem" }}>
                Thanks {form.ownerName}! We&apos;ll review <strong>{form.cafeName}</strong> and
                contact you at {form.email} within 48 hours to verify and get you live.
              </p>
              <Link
                href="/"
                style={{
                  display: "inline-block", backgroundColor: "#C4703A", color: "#FAF7F2",
                  padding: "0.75rem 2rem", borderRadius: "10px",
                  fontWeight: 600, textDecoration: "none", fontSize: "0.95rem",
                }}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "20px", padding: "2.5rem",
                boxShadow: "0 8px 40px rgba(196,112,58,0.08)",
              }}
            >
              {/* Step indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "2rem" }}>
                {[
                  { n: 1, label: "Contact" },
                  { n: 2, label: "Café Info" },
                  { n: 3, label: "Shoot Details" },
                ].map((s, i) => (
                  <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <div
                      style={{
                        width: "28px", height: "28px", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.78rem", fontWeight: 700,
                        backgroundColor: step >= s.n ? "#C4703A" : "#F5EFE7",
                        color: step >= s.n ? "#FAF7F2" : "#9B7B60",
                        border: `2px solid ${step >= s.n ? "#C4703A" : "#E8DED0"}`,
                        flexShrink: 0,
                      }}
                    >
                      {step > s.n ? "✓" : s.n}
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: step >= s.n ? "#C4703A" : "#9B7B60", whiteSpace: "nowrap" }}>
                      {s.label}
                    </span>
                    {i < 2 && <span style={{ color: "#E8DED0", margin: "0 0.1rem", fontSize: "1rem" }}>›</span>}
                  </div>
                ))}
              </div>

              {/* ─ Step 1: Contact ─ */}
              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input style={inputStyle} placeholder="Priya Sharma" value={form.ownerName}
                        onChange={(e) => update("ownerName", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input style={inputStyle} placeholder="+91 98765 43210" value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" placeholder="you@yourcafe.com" value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onFocus={focusOrange} onBlur={blurDefault} />
                  </div>
                  <button
                    onClick={() => setStep(2)} disabled={!step1Valid}
                    style={{
                      width: "100%", padding: "0.875rem", border: "none", borderRadius: "10px",
                      fontSize: "0.95rem", fontWeight: 700, fontFamily: "inherit",
                      cursor: step1Valid ? "pointer" : "not-allowed",
                      backgroundColor: step1Valid ? "#C4703A" : "#E8DED0",
                      color: step1Valid ? "#FAF7F2" : "#B8A090",
                      transition: "background-color 0.2s", marginTop: "0.5rem",
                    }}
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* ─ Step 2: Café Basics ─ */}
              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Café Name</label>
                    <input style={inputStyle} placeholder="e.g. The Amber Nook" value={form.cafeName}
                      onChange={(e) => update("cafeName", e.target.value)}
                      onFocus={focusOrange} onBlur={blurDefault} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input style={inputStyle} placeholder="Delhi" value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault} />
                    </div>
                    <div>
                      <label style={labelStyle}>Area / Locality</label>
                      <input style={inputStyle} placeholder="Hauz Khas" value={form.area}
                        onChange={(e) => update("area", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Café Type</label>
                    <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      value={form.cafeType} onChange={(e) => update("cafeType", e.target.value)}
                      onFocus={focusOrange} onBlur={blurDefault}>
                      <option value="">Select type...</option>
                      {CAFE_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: "0.875rem", backgroundColor: "transparent", color: "#7A5C42", border: "1.5px solid #E8DED0", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      ← Back
                    </button>
                    <button onClick={() => setStep(3)} disabled={!step2Valid}
                      style={{
                        flex: 2, padding: "0.875rem", border: "none", borderRadius: "10px",
                        fontSize: "0.95rem", fontWeight: 700, fontFamily: "inherit",
                        cursor: step2Valid ? "pointer" : "not-allowed",
                        backgroundColor: step2Valid ? "#C4703A" : "#E8DED0",
                        color: step2Valid ? "#FAF7F2" : "#B8A090",
                        transition: "background-color 0.2s",
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* ─ Step 3: Shoot Details ─ */}
              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {/* Ambience multi-select tags */}
                  <div>
                    <label style={labelStyle}>Ambience (select all that apply)</label>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                      {AMBIENCE_OPTIONS.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => toggleAmbience(tag)}
                          style={{
                            padding: "0.4rem 0.875rem", borderRadius: "100px",
                            fontSize: "0.82rem", fontWeight: 600,
                            border: "1.5px solid", cursor: "pointer",
                            fontFamily: "inherit", transition: "all 0.15s",
                            ...(form.ambience.includes(tag)
                              ? { backgroundColor: "#C4703A", color: "#FAF7F2", borderColor: "#C4703A" }
                              : { backgroundColor: "transparent", color: "#7A5C42", borderColor: "#E8DED0" }),
                          }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Natural Light Type</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        value={form.lightType} onChange={(e) => update("lightType", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault}>
                        <option value="">Select...</option>
                        {LIGHT_OPTIONS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Price Per Hour (₹)</label>
                      <input style={inputStyle} type="number" placeholder="600"
                        value={form.pricePerHour}
                        onChange={(e) => update("pricePerHour", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Instruments Allowed?</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        value={form.instrumentsAllowed}
                        onChange={(e) => update("instrumentsAllowed", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault}>
                        <option value="">Select...</option>
                        <option>All Allowed</option>
                        <option>Acoustic Only</option>
                        <option>Not Allowed</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Food & Drink Policy</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        value={form.foodPolicy}
                        onChange={(e) => update("foodPolicy", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault}>
                        <option value="">Select...</option>
                        <option>Included (1 drink)</option>
                        <option>Minimum order required</option>
                        <option>Optional (creator pays)</option>
                        <option>Not included</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Before-Hours Slot? (8–10am)</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        value={form.exclusiveSlots}
                        onChange={(e) => update("exclusiveSlots", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault}>
                        <option value="">Select...</option>
                        <option>Yes — available</option>
                        <option>No — not available</option>
                        <option>On request only</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Off-Peak Slot? (10am–12pm)</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                        value={form.offPeakSlots}
                        onChange={(e) => update("offPeakSlots", e.target.value)}
                        onFocus={focusOrange} onBlur={blurDefault}>
                        <option value="">Select...</option>
                        <option>Yes — available</option>
                        <option>No — not available</option>
                        <option>On request only</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Tell Creators About Your Café</label>
                    <textarea
                      style={{ ...inputStyle, minHeight: "90px", resize: "vertical" as const }}
                      placeholder="Describe the vibe, unique features, what makes your café special for shoots..."
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      onFocus={focusOrange} onBlur={blurDefault}
                    />
                  </div>

                  <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", cursor: "pointer" }}>
                    <input type="checkbox" checked={form.agree}
                      onChange={(e) => update("agree", e.target.checked)}
                      style={{ marginTop: "3px", accentColor: "#C4703A", width: "16px", height: "16px" }} />
                    <span style={{ fontSize: "0.82rem", color: "#7A5C42", lineHeight: 1.6 }}>
                      I agree to CultureJeevan&apos;s{" "}
                      <span style={{ color: "#C4703A", textDecoration: "underline", cursor: "pointer" }}>
                        Partner Terms
                      </span>
                      , confirm I am the owner or authorised representative, and understand that
                      CultureJeevan is not liable for any on-site disputes or property damage.
                    </span>
                  </label>

                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: "0.875rem", backgroundColor: "transparent", color: "#7A5C42", border: "1.5px solid #E8DED0", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                      ← Back
                    </button>
                    <button
                      onClick={() => setSubmitted(true)} disabled={!step3Valid}
                      style={{
                        flex: 2, padding: "0.875rem", border: "none", borderRadius: "10px",
                        fontSize: "0.95rem", fontWeight: 700, fontFamily: "inherit",
                        cursor: step3Valid ? "pointer" : "not-allowed",
                        backgroundColor: step3Valid ? "#C4703A" : "#E8DED0",
                        color: step3Valid ? "#FAF7F2" : "#B8A090",
                        transition: "background-color 0.2s",
                      }}
                    >
                      Submit Application ☕
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-stats { grid-template-columns: repeat(3, 1fr) !important; }
          .rules-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}