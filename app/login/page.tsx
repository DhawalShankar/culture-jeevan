"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────
type Portal = "user" | "space" | "crew";
type AuthMode = "login" | "register";

// ── Crew Skills ───────────────────────────────────────────────────────────────
const CREW_SKILLS = [
  "Photographer", "Videographer", "Video Editor",
  "Makeup Artist", "Hair Stylist", "Set Designer",
  "Lighting Tech", "Sound Engineer", "Art Director",
];

// ── Portal Config ─────────────────────────────────────────────────────────────
const PORTALS: { id: Portal; emoji: string; label: string; sublabel: string; accentColor: string; bgAccent: string }[] = [
  {
    id: "user",
    emoji: "👤",
    label: "I'm a Creator",
    sublabel: "Book studios & cafés",
    accentColor: "#C4703A",
    bgAccent: "rgba(196,112,58,0.1)",
  },
  {
    id: "space",
    emoji: "🏛️",
    label: "I'm a Space",
    sublabel: "Studio or Café partner",
    accentColor: "#2E8B7A",
    bgAccent: "rgba(46,139,122,0.1)",
  },
  {
    id: "crew",
    emoji: "🎨",
    label: "I'm Crew",
    sublabel: "Skilled creative professional",
    accentColor: "#7C5CBF",
    bgAccent: "rgba(124,92,191,0.1)",
  },
];

// ── Input Component ───────────────────────────────────────────────────────────
function Field({
  label,
  type = "text",
  placeholder,
  required = false,
  optional = false,
  accent,
}: {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  optional?: boolean;
  accent: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.75rem", fontWeight: 700,
          color: "#5A4535", letterSpacing: "0.05em",
          textTransform: "uppercase", marginBottom: "0.4rem",
        }}
      >
        {label}
        {optional && (
          <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9B8070", textTransform: "none", letterSpacing: 0 }}>
            (optional)
          </span>
        )}
        {required && <span style={{ color: accent, fontSize: "0.7rem" }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          fontSize: "0.9rem",
          color: "#1C1410",
          backgroundColor: focused ? "#FFFFFF" : "#FAF7F2",
          border: `1.5px solid ${focused ? accent : "#E8DED0"}`,
          borderRadius: "10px",
          outline: "none",
          transition: "all 0.18s",
          fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Select Component ──────────────────────────────────────────────────────────
function SelectField({
  label,
  options,
  accent,
  optional,
}: {
  label: string;
  options: string[];
  accent: string;
  optional?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "flex", alignItems: "center", gap: "0.4rem",
          fontSize: "0.75rem", fontWeight: 700,
          color: "#5A4535", letterSpacing: "0.05em",
          textTransform: "uppercase", marginBottom: "0.4rem",
        }}
      >
        {label}
        {optional && (
          <span style={{ fontSize: "0.65rem", fontWeight: 500, color: "#9B8070", textTransform: "none", letterSpacing: 0 }}>
            (optional)
          </span>
        )}
      </label>
      <select
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "0.75rem 1rem",
          fontSize: "0.9rem",
          color: "#1C1410",
          backgroundColor: focused ? "#FFFFFF" : "#FAF7F2",
          border: `1.5px solid ${focused ? accent : "#E8DED0"}`,
          borderRadius: "10px",
          outline: "none",
          transition: "all 0.18s",
          fontFamily: "inherit",
          appearance: "none",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      >
        <option value="">Select…</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ── Multi-Select Skill Pills ──────────────────────────────────────────────────
function SkillPicker({ accent }: { accent: string }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (s: string) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  return (
    <div style={{ marginBottom: "1.1rem" }}>
      <label
        style={{
          display: "block", fontSize: "0.75rem", fontWeight: 700,
          color: "#5A4535", letterSpacing: "0.05em",
          textTransform: "uppercase", marginBottom: "0.6rem",
        }}
      >
        Your Skills <span style={{ color: accent, fontSize: "0.7rem" }}>*</span>
      </label>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {CREW_SKILLS.map((skill) => {
          const active = selected.includes(skill);
          return (
            <button
              key={skill}
              type="button"
              onClick={() => toggle(skill)}
              style={{
                padding: "0.35rem 0.85rem",
                fontSize: "0.78rem", fontWeight: 600,
                borderRadius: "100px", cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
                border: `1.5px solid ${active ? accent : "#E8DED0"}`,
                backgroundColor: active ? accent : "transparent",
                color: active ? "#FAF7F2" : "#7A6050",
              }}
            >
              {skill}
            </button>
          );
        })}
      </div>
      {selected.length > 0 && (
        <p style={{ fontSize: "0.72rem", color: "#9B8070", marginTop: "0.5rem" }}>
          {selected.length} skill{selected.length > 1 ? "s" : ""} selected
        </p>
      )}
    </div>
  );
}

// ── Submit Button ─────────────────────────────────────────────────────────────
function SubmitBtn({ label, accent }: { label: string; accent: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="submit"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "0.875rem",
        fontSize: "0.95rem", fontWeight: 800,
        color: "#FAF7F2",
        backgroundColor: hovered ? shiftColor(accent, -20) : accent,
        border: "none", borderRadius: "12px",
        cursor: "pointer", fontFamily: "inherit",
        letterSpacing: "0.02em",
        transition: "all 0.18s",
        marginTop: "0.5rem",
      }}
    >
      {label}
    </button>
  );
}

function shiftColor(hex: string, amt: number) {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amt));
  return `rgb(${r},${g},${b})`;
}

// ── Divider ───────────────────────────────────────────────────────────────────
function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
      <span style={{ fontSize: "0.72rem", color: "#9B8070", fontWeight: 600, letterSpacing: "0.05em" }}>OR</span>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#E8DED0" }} />
    </div>
  );
}

// ── FORMS ─────────────────────────────────────────────────────────────────────

function UserLoginForm({ accent }: { accent: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field label="Email" type="email" placeholder="you@example.com" required accent={accent} />
      <Field label="Password" type="password" placeholder="••••••••" required accent={accent} />
      <div style={{ textAlign: "right", marginBottom: "1rem", marginTop: "-0.5rem" }}>
        <Link href="/forgot-password" style={{ fontSize: "0.78rem", color: accent, textDecoration: "none", fontWeight: 600 }}>
          Forgot password?
        </Link>
      </div>
      <SubmitBtn label="Sign In →" accent={accent} />
    </form>
  );
}

function UserRegisterForm({ accent }: { accent: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
        <Field label="First Name" placeholder="Arjun" required accent={accent} />
        <Field label="Last Name" placeholder="Mehta" required accent={accent} />
      </div>
      <Field label="Email" type="email" placeholder="you@example.com" required accent={accent} />
      <Field label="Phone" type="tel" placeholder="+91 98765 43210" required accent={accent} />
      <Field label="City" placeholder="Mumbai, Delhi, Bangalore…" required accent={accent} />
      <Field label="Password" type="password" placeholder="Create a strong password" required accent={accent} />
      <Field label="Confirm Password" type="password" placeholder="Repeat your password" required accent={accent} />
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
          <input type="checkbox" required style={{ marginTop: "2px", accentColor: accent }} />
          <span style={{ fontSize: "0.78rem", color: "#7A6050", lineHeight: 1.5 }}>
            I agree to CultureJeevan&apos;s{" "}
            <Link href="/terms" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
          </span>
        </label>
      </div>
      <SubmitBtn label="Create Account →" accent={accent} />
    </form>
  );
}

function SpaceLoginForm({ accent }: { accent: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Info notice */}
      <div
        style={{
          backgroundColor: "rgba(46,139,122,0.07)",
          border: "1px solid rgba(46,139,122,0.2)",
          borderRadius: "10px", padding: "0.875rem 1rem",
          marginBottom: "1.5rem",
          display: "flex", gap: "0.75rem", alignItems: "flex-start",
        }}
      >
        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🔒</span>
        <div>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1C6B5A", marginBottom: "0.15rem" }}>
            Partner Access Only
          </p>
          <p style={{ fontSize: "0.75rem", color: "#2E8B7A", lineHeight: 1.55 }}>
            Space accounts are created by the CultureJeevan team. Your login credentials were sent to your registered email upon onboarding.
          </p>
        </div>
      </div>
      <Field label="Space ID / Email" type="email" placeholder="your-space@culturejeevan.in" required accent={accent} />
      <SelectField
        label="Space Type"
        options={["Photography Studio", "Film & Video Studio", "Podcast Studio", "Rooftop Studio", "Dance Studio", "Café Venue"]}
        accent={accent}
      />
      <Field label="Password" type="password" placeholder="••••••••" required accent={accent} />
      <div style={{ textAlign: "right", marginBottom: "1rem", marginTop: "-0.5rem" }}>
        <Link href="/space-support" style={{ fontSize: "0.78rem", color: accent, textDecoration: "none", fontWeight: 600 }}>
          Need help accessing your account?
        </Link>
      </div>
      <SubmitBtn label="Enter Dashboard →" accent={accent} />
      <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9B8070", marginTop: "1.25rem", lineHeight: 1.5 }}>
        Want to list your space?{" "}
        <Link href="/list-your-space" style={{ color: accent, textDecoration: "none", fontWeight: 700 }}>
          Apply to become a partner →
        </Link>
      </p>
    </form>
  );
}

function CrewLoginForm({ accent }: { accent: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field label="Email" type="email" placeholder="you@example.com" required accent={accent} />
      <Field label="Password" type="password" placeholder="••••••••" required accent={accent} />
      <div style={{ textAlign: "right", marginBottom: "1rem", marginTop: "-0.5rem" }}>
        <Link href="/forgot-password" style={{ fontSize: "0.78rem", color: accent, textDecoration: "none", fontWeight: 600 }}>
          Forgot password?
        </Link>
      </div>
      <SubmitBtn label="Sign In →" accent={accent} />
    </form>
  );
}

function CrewRegisterForm({ accent }: { accent: string }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
        <Field label="First Name" placeholder="Priya" required accent={accent} />
        <Field label="Last Name" placeholder="Kapoor" required accent={accent} />
      </div>
      <Field label="Email" type="email" placeholder="you@example.com" required accent={accent} />
      <Field label="Phone" type="tel" placeholder="+91 98765 43210" required accent={accent} />
      <Field label="City / Base Location" placeholder="Where you primarily work" required accent={accent} />
      <SkillPicker accent={accent} />
      <Field label="Portfolio URL" type="url" placeholder="https://your-work.com" optional accent={accent} />
      <Field label="Instagram Handle" placeholder="@yourhandle" optional accent={accent} />
      <SelectField label="Experience Level" options={["0–1 years", "2–3 years", "4–6 years", "7+ years"]} accent={accent} />
      <Field label="Hourly Rate (₹)" type="number" placeholder="e.g. 1500" optional accent={accent} />
      <Field label="Password" type="password" placeholder="Create a strong password" required accent={accent} />
      <Field label="Confirm Password" type="password" placeholder="Repeat your password" required accent={accent} />
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", cursor: "pointer" }}>
          <input type="checkbox" required style={{ marginTop: "2px", accentColor: accent }} />
          <span style={{ fontSize: "0.78rem", color: "#7A6050", lineHeight: 1.5 }}>
            I agree to CultureJeevan&apos;s{" "}
            <Link href="/terms" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>Terms</Link>
            {" "}and{" "}
            <Link href="/crew-guidelines" style={{ color: accent, textDecoration: "none", fontWeight: 600 }}>Crew Guidelines</Link>
          </span>
        </label>
      </div>
      <SubmitBtn label="Join as Crew →" accent={accent} />
    </form>
  );
}

// ── LEFT PANEL VISUAL ─────────────────────────────────────────────────────────
function LeftPanel({ portal }: { portal: Portal }) {
  const config = {
    user: {
      title: "Book the Space. Own the Shot.",
      body: "Discover studios, cafés, and creative spaces trusted by thousands of creators across India.",
      stats: [
        { value: "500+", label: "Verified Spaces" },
        { value: "12K+", label: "Sessions Booked" },
        { value: "4.9★", label: "Avg. Rating" },
      ],
      image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=80",
      accent: "#C4703A",
    },
    space: {
      title: "Your Space. Our Platform.",
      body: "Manage bookings, track sessions, and grow your space with CultureJeevan's partner dashboard.",
      stats: [
        { value: "₹0", label: "Listing Cost" },
        { value: "48hr", label: "Avg. First Booking" },
        { value: "100%", label: "Payment Protected" },
      ],
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=900&q=80",
      accent: "#2E8B7A",
    },
    crew: {
      title: "Your Craft. Your Rate. Your Bookings.",
      body: "Get discovered by creators at checkout. Work sessions that match your skills and schedule.",
      stats: [
        { value: "9", label: "Skill Categories" },
        { value: "Flexible", label: "Availability" },
        { value: "Direct", label: "Payout" },
      ],
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=900&q=80",
      accent: "#7C5CBF",
    },
  }[portal];

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        minHeight: "600px",
        overflow: "hidden",
        borderRadius: "24px 0 0 24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "2.5rem",
      }}
    >
      {/* BG Image */}
      <img
        src={config.image}
        alt=""
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%", objectFit: "cover",
          transition: "opacity 0.5s",
        }}
      />
      {/* Overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(160deg, rgba(28,20,16,0.3) 0%, rgba(28,20,16,0.92) 70%)`,
        }}
      />
      {/* Accent stripe */}
      <div
        style={{
          position: "absolute", top: 0, left: 0,
          width: "4px", height: "100%",
          backgroundColor: config.accent,
          borderRadius: "24px 0 0 0",
        }}
      />
      {/* Logo */}
      <div style={{ position: "absolute", top: "2rem", left: "2.5rem" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.15rem", fontWeight: 900,
              color: "#FAF7F2", letterSpacing: "-0.01em",
            }}
          >
            Culture<span style={{ color: config.accent }}>Jeevan</span>
          </span>
        </Link>
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.2,
            marginBottom: "0.875rem",
          }}
        >
          {config.title}
        </h2>
        <p style={{ fontSize: "0.875rem", color: "rgba(250,247,242,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
          {config.body}
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {config.stats.map((s) => (
            <div key={s.label}>
              <p
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.35rem", fontWeight: 900,
                  color: config.accent, marginBottom: "0.1rem",
                }}
              >
                {s.value}
              </p>
              <p style={{ fontSize: "0.7rem", color: "rgba(250,247,242,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [portal, setPortal] = useState<Portal>("user");
  const [mode, setMode] = useState<AuthMode>("login");

  const current = PORTALS.find((p) => p.id === portal)!;
  const accent = current.accentColor;

  const canRegister = portal !== "space";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF7F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "inherit",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 32px 80px rgba(28,20,16,0.14), 0 4px 16px rgba(28,20,16,0.06)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "660px",
        }}
        className="auth-card"
      >
        {/* ── Left Visual Panel ── */}
        <LeftPanel portal={portal} />

        {/* ── Right Form Panel ── */}
        <div
          style={{
            padding: "2.5rem 2.5rem 2rem",
            overflowY: "auto",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Portal Switcher */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "0.7rem", fontWeight: 700, color: "#9B8070",
                letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem",
              }}
            >
              Sign in as
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.4rem",
                backgroundColor: "#FAF7F2",
                borderRadius: "12px",
                padding: "0.3rem",
                border: "1px solid #E8DED0",
              }}
            >
              {PORTALS.map((p) => {
                const active = portal === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setPortal(p.id); setMode("login"); }}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "0.15rem",
                      padding: "0.6rem 0.4rem",
                      borderRadius: "9px", cursor: "pointer",
                      border: active ? `1.5px solid ${p.accentColor}` : "1.5px solid transparent",
                      backgroundColor: active ? "#FFFFFF" : "transparent",
                      fontFamily: "inherit",
                      transition: "all 0.18s",
                      boxShadow: active ? `0 2px 10px ${p.accentColor}22` : "none",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                    <span
                      style={{
                        fontSize: "0.68rem", fontWeight: 800,
                        color: active ? p.accentColor : "#7A6050",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {p.label}
                    </span>
                    <span style={{ fontSize: "0.6rem", color: "#9B8070" }}>{p.sublabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode Toggle (Login / Register) */}
          {canRegister && (
            <div
              style={{
                display: "flex",
                backgroundColor: "#FAF7F2",
                borderRadius: "10px",
                padding: "0.25rem",
                border: "1px solid #E8DED0",
                marginBottom: "1.75rem",
              }}
            >
              {(["login", "register"] as AuthMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1, padding: "0.55rem",
                    fontSize: "0.82rem", fontWeight: 700,
                    borderRadius: "8px", cursor: "pointer",
                    border: "none", fontFamily: "inherit",
                    transition: "all 0.18s",
                    backgroundColor: mode === m ? "#FFFFFF" : "transparent",
                    color: mode === m ? accent : "#9B8070",
                    boxShadow: mode === m ? `0 1px 6px ${accent}22` : "none",
                  }}
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
          )}

          {/* Heading */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.4rem", fontWeight: 900,
                color: "#1C1410", marginBottom: "0.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {portal === "space"
                ? "Partner Dashboard"
                : mode === "login"
                ? `Welcome back${portal === "crew" ? ", Crew" : ""}`
                : portal === "crew"
                ? "Join the Crew"
                : "Create your account"}
            </h1>
            <p style={{ fontSize: "0.82rem", color: "#9B8070", lineHeight: 1.5 }}>
              {portal === "space"
                ? "Log in to manage your space and bookings."
                : mode === "login"
                ? "Sign in to continue your creative journey."
                : portal === "crew"
                ? "Set up your crew profile and start getting booked."
                : "Join thousands of creators already on CultureJeevan."}
            </p>
          </div>

          {/* Form */}
          <div style={{ flex: 1 }}>
            {portal === "user" && mode === "login" && <UserLoginForm accent={accent} />}
            {portal === "user" && mode === "register" && <UserRegisterForm accent={accent} />}
            {portal === "space" && <SpaceLoginForm accent={accent} />}
            {portal === "crew" && mode === "login" && <CrewLoginForm accent={accent} />}
            {portal === "crew" && mode === "register" && <CrewRegisterForm accent={accent} />}
          </div>

          {/* Social / Bottom */}
          {(portal === "user" || portal === "crew") && mode === "login" && (
            <>
              <OrDivider />
              <button
                type="button"
                style={{
                  width: "100%", padding: "0.75rem",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
                  fontSize: "0.875rem", fontWeight: 600,
                  backgroundColor: "#FAF7F2",
                  border: "1.5px solid #E8DED0",
                  borderRadius: "10px", cursor: "pointer",
                  fontFamily: "inherit", color: "#3C3C3C",
                  transition: "border-color 0.18s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#9B8070")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#B8A898", marginTop: "1.5rem" }}>
            <Link href="/" style={{ color: "#9B8070", textDecoration: "none", fontWeight: 600 }}>← Back to CultureJeevan</Link>
          </p>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 700px) {
          .auth-card {
            grid-template-columns: 1fr !important;
          }
          .auth-card > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}