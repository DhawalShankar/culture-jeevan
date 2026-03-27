"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const NAV_LINKS = ["Explore Studios", "How It Works", "List Your Studio"];

  return (
    <nav
      style={{
        backgroundColor: "#FAF7F2",
        borderBottom: "1px solid #E8DED0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#1C1410",
              letterSpacing: "-0.02em",
            }}
          >
            Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
          </span>
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "#5C4A3A",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#5C4A3A")}
              >
                {item}
              </Link>
            ))}
            <a
              href="#"
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#A85C2E")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#C4703A")
              }
            >
              Book a Studio
            </a>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            aria-label="Toggle menu"
          >
            <div
              style={{
                width: "22px",
                height: "2px",
                backgroundColor: "#1C1410",
                marginBottom: "5px",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <div
              style={{
                width: "22px",
                height: "2px",
                backgroundColor: "#1C1410",
                marginBottom: "5px",
                transition: "opacity 0.3s",
                opacity: open ? 0 : 1,
              }}
            />
            <div
              style={{
                width: "22px",
                height: "2px",
                backgroundColor: "#1C1410",
                transition: "transform 0.3s",
                transform: open
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <div
          style={{
            backgroundColor: "#FAF7F2",
            borderTop: "1px solid #E8DED0",
            padding: "1rem 2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item}
              href="#"
              onClick={() => setOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                color: "#5C4A3A",
                textDecoration: "none",
              }}
            >
              {item}
            </Link>
          ))}
          <a
            href="#"
            style={{
              backgroundColor: "#C4703A",
              color: "#FAF7F2",
              padding: "0.625rem 1.25rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
              width: "fit-content",
            }}
          >
            Book a Studio
          </a>
        </div>
      )}
    </nav>
  );
}