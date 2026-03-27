"use client";

import { useState } from "react";
import Link from "next/link";

const PERKS = [
  { icon: "📅", title: "Instant Bookings", desc: "Accept bookings 24/7 without lifting a finger. We handle scheduling automatically." },
  { icon: "💸", title: "Guaranteed Payments", desc: "Get paid directly to your bank account within 24 hours of every completed booking." },
  { icon: "📊", title: "Analytics Dashboard", desc: "See who's booking, peak hours, revenue trends, and optimise your pricing." },
  { icon: "📣", title: "Built-in Marketing", desc: "Your studio gets featured across our platform, social media, and creator newsletters." },
  { icon: "🛡️", title: "Booking Protection", desc: "Our policies protect you from no-shows and last-minute cancellations." },
  { icon: "🤝", title: "Dedicated Support", desc: "A real human account manager to help you grow your studio business." },
];

const STEPS = [
  { number: "01", title: "Submit Your Studio", desc: "Fill out the form with your studio details, photos, amenities, and pricing." },
  { number: "02", title: "We Verify & Onboard", desc: "Our team reviews your listing within 48 hours and helps you set it up perfectly." },
  { number: "03", title: "Go Live & Earn", desc: "Your studio goes live on CultureJeevan and starts receiving booking requests." },
];

const STUDIO_TYPES = ["Photography Studio", "Film & Video Studio", "Podcast Studio", "Rooftop Studio", "Dance Studio", "Music Studio", "Other"];

export default function ListYourStudio() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    studioName: "", ownerName: "", phone: "", email: "",
    city: "", area: "", studioType: "", area_sqft: "",
    pricePerHour: "", description: "", agree: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = () => setSubmitted(true);

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem",
    border: "1.5px solid #E8DED0", borderRadius: "10px",
    fontSize: "0.9rem", color: "#1C1410", backgroundColor: "#FAF7F2",
    outline: "none", boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block" as const, fontSize: "0.78rem", fontWeight: 700 as const,
    color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" as const,
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>

      {/* Hero Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1C1410 0%, #3D2514 100%)",
        padding: "5rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-100px", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          backgroundColor: "#C4703A", opacity: 0.08, filter: "blur(60px)",
        }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        
          <div style={{ maxWidth: "640px", marginTop: "1.5rem" }}>
            <span style={{
              display: "inline-block", backgroundColor: "rgba(196,112,58,0.2)",
              color: "#F0A060", fontSize: "0.78rem", fontWeight: 700,
              padding: "0.35rem 0.9rem", borderRadius: "100px",
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "1.25rem",
            }}>For Studio Owners</span>
            <h1 style={{
              fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 900, color: "#FAF7F2", letterSpacing: "-0.03em",
              lineHeight: 1.1, marginBottom: "1rem",
            }}>
              Turn Your Studio Into<br />
              <span style={{ color: "#C4703A", fontStyle: "italic" }}>A Revenue Machine.</span>
            </h1>
            <p style={{ fontSize: "1rem", color: "#C8B4A0", lineHeight: 1.7, marginBottom: "2rem" }}>
              Join 500+ studio owners already earning on CultureJeevan. Get discovered by thousands of photographers, filmmakers, and creators — without spending a rupee on marketing.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {["₹0 setup fee", "No monthly charges", "You control pricing"].map((item) => (
                <span key={item} style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#FAF7F2", fontSize: "0.875rem", fontWeight: 500 }}>
                  <span style={{ color: "#C4703A", fontWeight: 700 }}>✓</span> {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Perks Grid */}
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 800, color: "#1C1410", textAlign: "center",
            letterSpacing: "-0.02em", marginBottom: "0.5rem",
          }}>Why List on CultureJeevan?</h2>
          <p style={{ textAlign: "center", color: "#7A5C42", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
            Everything you need to grow your studio business.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {PERKS.map((perk) => (
              <div key={perk.title} style={{
                backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
                borderRadius: "16px", padding: "1.5rem",
              }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>{perk.icon}</span>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.4rem" }}>{perk.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#7A5C42", lineHeight: 1.7 }}>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div style={{ marginBottom: "5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 800, color: "#1C1410", textAlign: "center",
            letterSpacing: "-0.02em", marginBottom: "2.5rem",
          }}>How It Works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
            {STEPS.map((s) => (
              <div key={s.number} style={{
                backgroundColor: "#F5EFE7", border: "1px solid #E8DED0",
                borderRadius: "16px", padding: "1.75rem", position: "relative",
              }}>
                <span style={{
                  fontFamily: "var(--font-playfair)", fontSize: "3rem", fontWeight: 900,
                  color: "#E8DED0", position: "absolute", top: "1rem", right: "1.25rem", lineHeight: 1,
                }}>{s.number}</span>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 700, color: "#1C1410", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#7A5C42", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 800, color: "#1C1410", letterSpacing: "-0.02em", marginBottom: "0.5rem",
            }}>Apply to List Your Studio</h2>
            <p style={{ color: "#7A5C42", fontSize: "0.95rem" }}>Takes less than 5 minutes. Our team will reach out within 48 hours.</p>
          </div>

          {submitted ? (
            <div style={{
              backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
              borderRadius: "20px", padding: "4rem 2rem", textAlign: "center",
            }}>
              <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}>🎉</span>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.75rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.5rem" }}>
                Application Received!
              </h3>
              <p style={{ color: "#7A5C42", fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 2rem" }}>
                Thanks {form.ownerName}! Our team will review your application and contact you at {form.email} within 48 hours.
              </p>
              <Link href="/" style={{
                display: "inline-block", backgroundColor: "#C4703A", color: "#FAF7F2",
                padding: "0.75rem 2rem", borderRadius: "10px", fontWeight: 600,
                textDecoration: "none", fontSize: "0.95rem",
              }}>Back to Home</Link>
            </div>
          ) : (
            <div style={{
              backgroundColor: "#FFFFFF", border: "1px solid #E8DED0",
              borderRadius: "20px", padding: "2.5rem",
              boxShadow: "0 8px 40px rgba(196,112,58,0.08)",
            }}>
              {/* Step indicators */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", alignItems: "center" }}>
                {[1, 2].map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: 700,
                      backgroundColor: step >= s ? "#C4703A" : "#F5EFE7",
                      color: step >= s ? "#FAF7F2" : "#9B7B60",
                      border: `2px solid ${step >= s ? "#C4703A" : "#E8DED0"}`,
                    }}>{s}</div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: step >= s ? "#C4703A" : "#9B7B60" }}>
                      {s === 1 ? "Contact Info" : "Studio Details"}
                    </span>
                    {s < 2 && <span style={{ color: "#E8DED0", margin: "0 0.25rem" }}>›</span>}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Your Name</label>
                      <input style={inputStyle} placeholder="Rahul Sharma" value={form.ownerName}
                        onChange={(e) => update("ownerName", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone Number</label>
                      <input style={inputStyle} placeholder="+91 98765 43210" value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input style={inputStyle} type="email" placeholder="you@studio.com" value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!form.ownerName || !form.phone || !form.email}
                    style={{
                      width: "100%", padding: "0.875rem", border: "none", borderRadius: "10px",
                      fontSize: "0.95rem", fontWeight: 700, cursor: form.ownerName && form.phone && form.email ? "pointer" : "not-allowed",
                      backgroundColor: form.ownerName && form.phone && form.email ? "#C4703A" : "#E8DED0",
                      color: form.ownerName && form.phone && form.email ? "#FAF7F2" : "#B8A090",
                      transition: "background-color 0.2s", marginTop: "0.5rem",
                    }}>Continue →</button>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={labelStyle}>Studio Name</label>
                    <input style={inputStyle} placeholder="e.g. Lumina Photography Studio" value={form.studioName}
                      onChange={(e) => update("studioName", e.target.value)}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input style={inputStyle} placeholder="Delhi" value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Area / Locality</label>
                      <input style={inputStyle} placeholder="Connaught Place" value={form.area}
                        onChange={(e) => update("area", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Studio Type</label>
                      <select style={{ ...inputStyle, appearance: "none", cursor: "pointer" }} value={form.studioType}
                        onChange={(e) => update("studioType", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}>
                        <option value="">Select type...</option>
                        {STUDIO_TYPES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Price Per Hour (₹)</label>
                      <input style={inputStyle} type="number" placeholder="1200" value={form.pricePerHour}
                        onChange={(e) => update("pricePerHour", e.target.value)}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>About Your Studio</label>
                    <textarea style={{ ...inputStyle, minHeight: "100px", resize: "vertical" as const }}
                      placeholder="Describe your studio — space, equipment, vibe..."
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
                  </div>
                  <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", cursor: "pointer" }}>
                    <input type="checkbox" checked={form.agree}
                      onChange={(e) => update("agree", e.target.checked)}
                      style={{ marginTop: "3px", accentColor: "#C4703A", width: "16px", height: "16px" }} />
                    <span style={{ fontSize: "0.82rem", color: "#7A5C42", lineHeight: 1.6 }}>
                      I agree to CultureJeevan&apos;s <span style={{ color: "#C4703A", textDecoration: "underline", cursor: "pointer" }}>Partner Terms</span> and confirm that I am the owner or authorised representative of this studio.
                    </span>
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button onClick={() => setStep(1)} style={{
                      flex: 1, padding: "0.875rem", backgroundColor: "transparent",
                      color: "#7A5C42", border: "1.5px solid #E8DED0", borderRadius: "10px",
                      fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
                    }}>← Back</button>
                    <button onClick={handleSubmit}
                      disabled={!form.studioName || !form.city || !form.studioType || !form.agree}
                      style={{
                        flex: 2, padding: "0.875rem", border: "none", borderRadius: "10px",
                        fontSize: "0.95rem", fontWeight: 700,
                        cursor: form.studioName && form.city && form.studioType && form.agree ? "pointer" : "not-allowed",
                        backgroundColor: form.studioName && form.city && form.studioType && form.agree ? "#C4703A" : "#E8DED0",
                        color: form.studioName && form.city && form.studioType && form.agree ? "#FAF7F2" : "#B8A090",
                        transition: "background-color 0.2s",
                      }}>Submit Application 🚀</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}