"use client";

import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  Discover: [
    { label: "Browse Studios", href: "/studios" },
    { label: "Cities We Serve", href: "/studios" },
    { label: "Studio Types", href: "/studios" },
    { label: "New Listings", href: "/studios" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Careers", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Cancellation Policy", href: "#" },
    { label: "Trust & Safety", href: "#" },
  ],
  "For Studios": [
    { label: "List Your Studio", href: "/list-your-studio" },
    { label: "Studio Owner Guide", href: "/list-your-studio" },
    { label: "Pricing Plans", href: "/list-your-studio" },
    { label: "Partner Program", href: "/list-your-studio" },
  ],
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
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.875rem",
              }}
            >
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="CultureJeevan Logo"
                  width={32}
                  height={32}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  color: "#FAF7F2",
                  letterSpacing: "-0.02em",
                }}
              >
                Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
              </span>
            </Link>

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
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
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
                      {link.label}
                    </Link>
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
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: "0.82rem",
                  color: "#5C4030",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9B7B60")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5C4030")}
              >
                {item}
              </a>
            ))}
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