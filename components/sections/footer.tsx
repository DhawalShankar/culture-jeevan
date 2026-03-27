"use client";

const FOOTER_LINKS = {
  Discover: ["Browse Studios", "Cities We Serve", "Studio Types", "New Listings"],
  Company: ["About Us", "Blog", "Press Kit", "Careers"],
  Support: ["Help Center", "Contact Us", "Cancellation Policy", "Trust & Safety"],
  "For Studios": ["List Your Studio", "Studio Owner Guide", "Pricing Plans", "Partner Program"],
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1C1410",
        color: "#FAF7F2",
        padding: "5rem 2rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top: Logo + Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(4, 1fr)",
            gap: "3rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#FAF7F2",
                marginBottom: "0.875rem",
                letterSpacing: "-0.02em",
              }}
            >
              Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#9B7B60",
                lineHeight: 1.7,
                maxWidth: "260px",
                marginBottom: "1.5rem",
              }}
            >
              India&apos;s largest marketplace for professional studio spaces.
              Discover, book, and create — all in one place.
            </p>

            {/* Social Icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["📸", "🎬", "🐦", "💼"].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#2C1F18",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                    border: "1px solid #3D2918",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#C4703A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2C1F18")
                  }
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#C4703A",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                {category}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: "0.875rem",
                        color: "#9B7B60",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#FAF7F2")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#9B7B60")
                      }
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #2C1F18",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "#5C4030" }}>
            © {new Date().getFullYear()} CultureJeevan. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontSize: "0.82rem",
                    color: "#5C4030",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#9B7B60")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#5C4030")
                  }
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}