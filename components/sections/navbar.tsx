"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
// Replace these with real values from CartContext / NotificationContext later
const MOCK_CART_COUNT = 2;    // number of confirmed items in cart
const MOCK_NOTIF_COUNT = 3;   // number of unread notifications
// ─────────────────────────────────────────────────────────────────────────────

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

  // ── SVG Icons ──────────────────────────────────────────────────────────────

  const BellIcon = () => (
    <svg
      width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  const CartIcon = () => (
    <svg
      width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="9"  cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );

  // ── Reusable icon button with badge ────────────────────────────────────────

  const IconButton = ({
    href,
    label,
    count,
    children,
  }: {
    href: string;
    label: string;
    count?: number;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      aria-label={label}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        color: "#5C4A3A",
        textDecoration: "none",
        flexShrink: 0,
        transition: "color 0.2s, background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#C4703A";
        e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#5C4A3A";
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      {children}

      {/* Badge bubble */}
      {count != null && count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "3px",
            right: "3px",
            minWidth: "15px",
            height: "15px",
            padding: "0 4px",
            backgroundColor: "#C4703A",
            color: "#FAF7F2",
            fontSize: "9px",
            fontWeight: 700,
            lineHeight: "15px",
            borderRadius: "10px",
            textAlign: "center",
            pointerEvents: "none",
            border: "1.5px solid #FAF7F2",
          }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );

  // ── Desktop auth ───────────────────────────────────────────────────────────

  const AuthButton = () => {
    if (!isLoaded) return null;
    if (user) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Link
            href="/profile"
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
            {user.firstName ?? "Profile"}
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

  // ── Mobile auth ────────────────────────────────────────────────────────────

  const MobileAuthButtons = () => {
    if (!isLoaded) return null;
    if (user) {
      return (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            style={{
              backgroundColor: "#C4703A", color: "#FAF7F2",
              padding: "0.625rem 1.25rem", borderRadius: "6px",
              fontSize: "0.9rem", fontWeight: 600,
              textDecoration: "none", display: "inline-block",
            }}
          >
            Profile
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

  // ── Render ─────────────────────────────────────────────────────────────────

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

        {/* ── Logo ── */}
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}
        >
          <Image src="/logo.png" alt="CultureJeevan" width={52} height={52} style={{ objectFit: "contain" }} />
          <span style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1.5rem", fontWeight: 700,
            color: "#1C1410", letterSpacing: "-0.02em",
          }}>
            Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "0.15rem", alignItems: "center" }}>

            {/* Page links */}
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

            {/* Divider
            <div style={{ width: "1px", height: "20px", backgroundColor: "#E8DED0", margin: "0 0.3rem" }} /> */}

            {/* Bell — always visible on desktop */}
            {/* <IconButton href="/notifications" label="Notifications" count={MOCK_NOTIF_COUNT}>
              <BellIcon />
            </IconButton> */}

            {/* Cart — visible only when logged in (only logged-in users can book) */}
            {/* {isLoaded && user && (
              <IconButton href="/cart" label="My Cart" count={MOCK_CART_COUNT}>
                <CartIcon />
              </IconButton>
            )} */}

            {/* Divider */}
            <div style={{ width: "1px", height: "20px", backgroundColor: "#E8DED0", margin: "0 0.3rem" }} />

            <AuthButton />
          </div>
        )}

        {/* ── Mobile right cluster ── */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>

            {/* Bell */}
            {/* <IconButton href="/notifications" label="Notifications" count={MOCK_NOTIF_COUNT}>
              <BellIcon />
            </IconButton> */}

            {/* Cart (logged-in only) */}
            {/* {isLoaded && user && (
              <IconButton href="/cart" label="My Cart" count={MOCK_CART_COUNT}>
                <CartIcon />
              </IconButton>
            )} */}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0.5rem", marginLeft: "0.15rem",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}
              aria-label="Toggle menu"
            >
              <div style={{
                width: "22px", height: "2px", backgroundColor: "#1C1410", marginBottom: "5px",
                transition: "transform 0.3s, opacity 0.3s",
                transform: open ? "rotate(45deg) translate(5px, 5px)" : "none",
              }} />
              <div style={{
                width: "22px", height: "2px", backgroundColor: "#1C1410", marginBottom: "5px",
                transition: "opacity 0.3s",
                opacity: open ? 0 : 1,
              }} />
              <div style={{
                width: "22px", height: "2px", backgroundColor: "#1C1410",
                transition: "transform 0.3s",
                transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }} />
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile dropdown ── */}
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