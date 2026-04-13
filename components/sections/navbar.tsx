"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const NAV_LINKS = [
    { label: "Book a Creator", href: "/creators" },
    { label: "Book a Space",   href: "/spaces"   },
    { label: "Rent Equipment", href: "/equipment" },
    { label: "How It Works",   href: "/how-it-works" },
  ];

  const isActive = (href: string) => pathname === href;

  const AuthButton = () => {
    if (!isLoaded) return null;
    if (user) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link
            href="/dashboard"
            style={{
              fontSize: "0.875rem", fontWeight: 600,
              color: "#5C4A3A", textDecoration: "none",
              padding: "0.4rem 0.7rem", borderRadius: "8px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C4703A";
              e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#5C4A3A";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {user.firstName ?? "Dashboard"}
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            style={{
              backgroundColor: "transparent", color: "#C4703A",
              padding: "0.5rem 1.1rem", borderRadius: "6px",
              fontSize: "0.875rem", fontWeight: 600,
              border: "1.5px solid #C4703A", cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <Link
        href="/login"
        style={{
          backgroundColor: "#C4703A", color: "#FAF7F2",
          padding: "0.5rem 1.25rem", borderRadius: "6px",
          fontSize: "0.875rem", fontWeight: 600,
          textDecoration: "none", transition: "background-color 0.2s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#A85C2E")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#C4703A")}
      >
        Login
      </Link>
    );
  };

  const MobileAuthButtons = () => {
    if (!isLoaded) return null;
    if (user) {
      return (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.625rem 1.25rem", borderRadius: "6px",
              fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Dashboard
          </Link>
          <button
            onClick={() => { setOpen(false); signOut({ redirectUrl: "/" }); }}
            style={{
              backgroundColor: "transparent", color: "#C4703A",
              padding: "0.625rem 1.25rem", borderRadius: "6px",
              fontSize: "0.9rem", fontWeight: 600,
              border: "1.5px solid #C4703A", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <Link
        href="/login"
        onClick={() => setOpen(false)}
        style={{
          backgroundColor: "#C4703A", color: "#FAF7F2",
          padding: "0.625rem 1.5rem", borderRadius: "6px",
          fontSize: "0.9rem", fontWeight: 600,
          textDecoration: "none", display: "inline-block",
        }}
      >
        Login / Register
      </Link>
    );
  };

  return (
    <nav style={{
      backgroundColor: "#FAF7F2",
      borderBottom: "1px solid #E8DED0",
      position: "sticky", top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        padding: "0 2rem", height: "68px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
          <Image src="/logo.png" alt="CultureJeevan" width={52} height={52} style={{ objectFit: "contain" }} />
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.5rem", fontWeight: 700,
            color: "#1C1410", letterSpacing: "-0.02em",
          }}>
            Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
          </span>
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "0.15rem", alignItems: "center" }}>
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    fontSize: "0.875rem", fontWeight: 500,
                    color: active ? "#C4703A" : "#5C4A3A",
                    textDecoration: "none",
                    padding: "0.4rem 0.75rem", borderRadius: "8px",
                    backgroundColor: active ? "rgba(196,112,58,0.08)" : "transparent",
                    transition: "color 0.2s, background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#C4703A";
                      e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.color = "#5C4A3A";
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}

            <div style={{ width: "1px", height: "20px", backgroundColor: "#E8DED0", margin: "0 0.4rem" }} />
            <AuthButton />
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}
            aria-label="Toggle menu"
          >
            <div style={{ width: "22px", height: "2px", backgroundColor: "#1C1410", marginBottom: "5px", transition: "transform 0.3s, opacity 0.3s", transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: "22px", height: "2px", backgroundColor: "#1C1410", marginBottom: "5px", transition: "opacity 0.3s", opacity: open ? 0 : 1 }} />
            <div style={{ width: "22px", height: "2px", backgroundColor: "#1C1410", transition: "transform 0.3s", transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && open && (
        <div style={{
          backgroundColor: "#FAF7F2",
          borderTop: "1px solid #E8DED0",
          padding: "1rem 2rem 1.5rem",
          display: "flex", flexDirection: "column", gap: "0.25rem",
        }}>
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "1rem",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#C4703A" : "#5C4A3A",
                  textDecoration: "none",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "8px",
                  backgroundColor: active ? "rgba(196,112,58,0.08)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div style={{ height: "1px", backgroundColor: "#E8DED0", margin: "0.5rem 0" }} />
          <MobileAuthButtons />
        </div>
      )}
    </nav>
  );
}