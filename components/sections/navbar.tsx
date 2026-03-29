"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const NAV_LINKS = [
    { label: "Studios", href: "/studios" },
    { label: "Café Venues", href: "/cafe-venues", isNew: true },
    { label: "How It Works", href: "/how-it-works" },
    { label: "List Your Studio", href: "/list-your-studio" },
    { label: "List Your Café", href: "/list-your-cafe" },
  ];

  const isActive = (href: string) => pathname === href;

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
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexShrink: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="CultureJeevan Logo"
            width={52}
            height={52}
            style={{ objectFit: "contain" }}
          />
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

        {/* ── Desktop Links ── */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive(item.href) ? "#C4703A" : "#5C4A3A",
                  textDecoration: "none",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "8px",
                  transition: "color 0.2s, background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  backgroundColor: isActive(item.href)
                    ? "rgba(196,112,58,0.08)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "#C4703A";
                    e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.href)) {
                    e.currentTarget.style.color = "#5C4A3A";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {/* Café Venues gets a ☕ icon */}
                {item.href === "/cafe-venues" && (
                  <span style={{ fontSize: "0.85rem" }}>☕</span>
                )}
                {item.label}
                {/* NEW badge for Café Venues */}
                {item.isNew && (
                  <span
                    style={{
                      backgroundColor: "#C4703A",
                      color: "#FAF7F2",
                      fontSize: "0.55rem",
                      fontWeight: 800,
                      padding: "0.1rem 0.35rem",
                      borderRadius: "100px",
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      lineHeight: 1.4,
                    }}
                  >
                    NEW
                  </span>
                )}
              </Link>
            ))}

            {/* Divider */}
            <div
              style={{
                width: "1px",
                height: "20px",
                backgroundColor: "#E8DED0",
                margin: "0 0.5rem",
              }}
            />

            {/* Login CTA */}
            <Link
              href="/studios"
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                padding: "0.5rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background-color 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#A85C2E")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#C4703A")
              }
            >
              Login
            </Link>
          </div>
        )}

        {/* ── Mobile Hamburger ── */}
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
                transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        )}
      </div>

      {/* ── Mobile Dropdown ── */}
      {isMobile && open && (
        <div
          style={{
            backgroundColor: "#FAF7F2",
            borderTop: "1px solid #E8DED0",
            padding: "1rem 2rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: isActive(item.href) ? 700 : 500,
                color: isActive(item.href) ? "#C4703A" : "#5C4A3A",
                textDecoration: "none",
                padding: "0.625rem 0.75rem",
                borderRadius: "8px",
                backgroundColor: isActive(item.href)
                  ? "rgba(196,112,58,0.08)"
                  : "transparent",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {item.href === "/cafe-venues" && <span>☕</span>}
              {item.label}
              {item.isNew && (
                <span
                  style={{
                    backgroundColor: "#C4703A",
                    color: "#FAF7F2",
                    fontSize: "0.55rem",
                    fontWeight: 800,
                    padding: "0.1rem 0.4rem",
                    borderRadius: "100px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  NEW
                </span>
              )}
            </Link>
          ))}

          {/* Divider */}
          <div
            style={{
              height: "1px",
              backgroundColor: "#E8DED0",
              margin: "0.5rem 0",
            }}
          />

          {/* Mobile CTA */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link
              href="/studios"
              onClick={() => setOpen(false)}
              style={{
                backgroundColor: "#C4703A",
                color: "#FAF7F2",
                padding: "0.625rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Book a Studio
            </Link>
            <Link
              href="/cafe-venues"
              onClick={() => setOpen(false)}
              style={{
                backgroundColor: "transparent",
                color: "#C4703A",
                padding: "0.625rem 1.25rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-block",
                border: "1.5px solid #C4703A",
              }}
            >
              ☕ Book a Café
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}