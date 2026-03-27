"use client";

const STEPS = [
  {
    number: "01",
    icon: "🔍",
    title: "Search Your City",
    description:
      "Enter your location and studio type. Browse verified studios with real photos, pricing, and availability.",
  },
  {
    number: "02",
    icon: "📅",
    title: "Pick a Slot",
    description:
      "Choose your date, time, and duration. See real-time availability — no back-and-forth calls required.",
  },
  {
    number: "03",
    icon: "💳",
    title: "Book & Pay Securely",
    description:
      "Confirm your booking instantly with secure online payment. Get a confirmation on WhatsApp & email.",
  },
  {
    number: "04",
    icon: "🎬",
    title: "Walk In & Create",
    description:
      "Arrive, shoot, create. Everything is set up and ready. Focus on your craft, not the logistics.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        backgroundColor: "#F5EFE7",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
              marginBottom: "1rem",
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "#1C1410",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "0.75rem",
            }}
          >
            From Search to Studio in
            <br />
            <span style={{ color: "#C4703A", fontStyle: "italic" }}>
              Minutes, Not Days.
            </span>
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#6B5240",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            No calls, no waiting. Our platform makes studio booking as easy as
            ordering food online.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DED0",
                borderRadius: "20px",
                padding: "2rem",
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px rgba(196, 112, 58, 0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Step number */}
              <span
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  fontFamily: "var(--font-playfair)",
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  color: "#F0DCC8",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>

              {/* Icon */}
              <span style={{ fontSize: "2.2rem", display: "block", marginBottom: "1rem" }}>
                {step.icon}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#1C1410",
                  marginBottom: "0.625rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "#7A5C42",
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </p>

              {/* Connector line (not last) */}
              {index < STEPS.length - 1 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    right: "-1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "2rem",
                    height: "2px",
                    backgroundColor: "#E8DED0",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}