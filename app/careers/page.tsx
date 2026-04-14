import Link from "next/link";

export default function Careers() {
  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      <div style={{
        backgroundColor: "#1C1410",
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "4rem 2rem",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", backgroundColor: "#C4703A", opacity: 0.05, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-40px", width: "220px", height: "220px", borderRadius: "50%", backgroundColor: "#C4703A", opacity: 0.04, pointerEvents: "none" }} />

        <div style={{ maxWidth: "580px", position: "relative" }}>
          <span style={{
            display: "inline-block", backgroundColor: "#2C1F18", color: "#C4703A",
            fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", padding: "0.3rem 1rem",
            borderRadius: "100px", marginBottom: "1.5rem", border: "1px solid #3D2918",
          }}>
            Careers
          </span>

          <h1 style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 900, color: "#FAF7F2",
            letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: "1.25rem",
          }}>
            We&apos;re Building Something Real.
          </h1>

          <p style={{ fontSize: "0.95rem", color: "#9B7B60", lineHeight: 1.85, marginBottom: "0.75rem" }}>
            CultureJeevan is at an early stage — every person who joins now helps shape how India&apos;s creative economy works. The careers portal is on the way.
          </p>

          <p style={{ fontSize: "0.875rem", color: "#5C3D26", lineHeight: 1.7, marginBottom: "2.5rem", fontStyle: "italic" }}>
            Phasna Nahi, Udna Hai.
          </p>

          <div style={{
            backgroundColor: "#241810", border: "1px solid #3D2918",
            borderRadius: "16px", padding: "1.5rem 2rem",
            marginBottom: "2.5rem",
          }}>
            <p style={{ fontSize: "0.82rem", color: "#9B7B60", lineHeight: 1.75 }}>
              Interested in working with us before the portal goes live?{" "}
              <br />
              Email us directly at{" "}
              <a href="mailto:cosmoindiaprakashan@gmail.com?subject=Careers — CultureJeevan" style={{ color: "#C4703A", textDecoration: "none" }}>
                cosmoindiaprakashan@gmail.com
              </a>{" "}
              with the subject line <strong style={{ color: "#FAF7F2" }}>Careers — [Your Role]</strong>.
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 700, textDecoration: "none",
            }}>
              Back to Home
            </Link>
            <Link href="/about" style={{
              backgroundColor: "transparent", color: "#FAF7F2",
              padding: "0.75rem 1.75rem", borderRadius: "10px",
              fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", border: "1.5px solid #3D2918",
            }}>
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}