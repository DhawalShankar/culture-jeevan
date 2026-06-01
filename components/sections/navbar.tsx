"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationsOverlay from "@/components/sections/notifications-overlay";

export default function Navbar() {
  const [open, setOpen]           = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);

  const pathname           = usePathname();
  const { user, isLoaded } = useUser();
  const { signOut }        = useClerk();
  const bellRef            = useRef<HTMLButtonElement>(null);

  const { items, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications(isLoaded && !!user);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    setOpen(false);
    setNotifOpen(false);
  }, [pathname]);

  const NAV_LINKS = [
    { label: "Book a Creator", href: "/creators"     },
    { label: "Book a Space",   href: "/spaces"       },
    { label: "Rent Equipment", href: "/equipment"    },
    { label: "How It Works",   href: "/how-it-works" },
  ];

  const isActive = (href: string) => pathname === href;

  // ── Icons ──────────────────────────────────────────────────────────────────

  const BellIcon = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  // Bookmark/ticket icon for My Bookings
  const BookingsIcon = () => (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
      <line x1="8"  y1="14" x2="8"  y2="14" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="14" x2="16" y2="14" />
      <line x1="8"  y1="18" x2="8"  y2="18" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="16" y2="18" />
    </svg>
  );

  // ── Icon button styles ─────────────────────────────────────────────────────

  const iconBtnStyle = (active = false): React.CSSProperties => ({
    position: "relative",
    display: "flex", alignItems: "center", justifyContent: "center",
    width: "36px", height: "36px",
    borderRadius: "8px",
    color: active ? "#C4703A" : "#5C4A3A",
    backgroundColor: active ? "rgba(196,112,58,0.08)" : "transparent",
    border: "none",
    cursor: "pointer",
    flexShrink: 0,
    textDecoration: "none",
    transition: "color 0.2s, background-color 0.2s",
    fontFamily: "inherit",
  });

  const iconHoverOn  = (el: HTMLElement) => { el.style.color = "#C4703A"; el.style.backgroundColor = "rgba(196,112,58,0.08)"; };
  const iconHoverOff = (el: HTMLElement) => { el.style.color = "#5C4A3A"; el.style.backgroundColor = "transparent"; };

  // ── My Bookings button ─────────────────────────────────────────────────────

  const BookingsButton = () => (
    <Link
      href="/my-bookings"
      aria-label="My Bookings"
      style={iconBtnStyle(pathname === "/my-bookings")}
      onMouseEnter={(e) => { if (pathname !== "/my-bookings") iconHoverOn(e.currentTarget); }}
      onMouseLeave={(e) => { if (pathname !== "/my-bookings") iconHoverOff(e.currentTarget); }}
    >
      <BookingsIcon />
    </Link>
  );

  // ── Bell button ────────────────────────────────────────────────────────────

  const BellButton = () => (
    <div style={{ position: "relative" }}>
      <button
        ref={bellRef}
        onClick={() => setNotifOpen((v) => !v)}
        aria-label="Notifications"
        aria-expanded={notifOpen}
        style={iconBtnStyle(notifOpen)}
        onMouseEnter={(e) => { if (!notifOpen) iconHoverOn(e.currentTarget); }}
        onMouseLeave={(e) => { if (!notifOpen) iconHoverOff(e.currentTarget); }}
      >
        <BellIcon />
        {unreadCount > 0 && <Badge count={unreadCount} />}
      </button>

      <NotificationsOverlay
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={items}
        unreadCount={unreadCount}
        loading={loading}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        anchorRef={bellRef}
      />
    </div>
  );

  // ── Auth ───────────────────────────────────────────────────────────────────

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
            onMouseEnter={(e) => { e.currentTarget.style.color = "#C4703A"; e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#5C4A3A"; e.currentTarget.style.backgroundColor = "transparent"; }}
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

  const Divider = () => (
    <div style={{ width: "1px", height: "20px", backgroundColor: "#E8DED0", margin: "0 0.3rem" }} />
  );

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

        {/* Desktop nav */}
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
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#C4703A"; e.currentTarget.style.backgroundColor = "rgba(196,112,58,0.06)"; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "#5C4A3A"; e.currentTarget.style.backgroundColor = "transparent"; } }}
                >
                  {item.label}
                </Link>
              );
            })}

            <Divider />

            {isLoaded && user && (
              <>
                <BellButton />
                <BookingsButton />
              </>
            )}

            <Divider />
            <AuthButton />
          </div>
        )}

        {/* Mobile right cluster */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
            {isLoaded && user && (
              <>
                <BellButton />
                <BookingsButton />
              </>
            )}

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
              {[
                { transform: open ? "rotate(45deg) translate(5px, 5px)" : "none", opacity: 1, mb: "5px" },
                { transform: "none", opacity: open ? 0 : 1, mb: "5px" },
                { transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none", opacity: 1, mb: "0" },
              ].map((s, i) => (
                <div key={i} style={{
                  width: "22px", height: "2px",
                  backgroundColor: "#1C1410",
                  marginBottom: s.mb,
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: s.transform,
                  opacity: s.opacity,
                }} />
              ))}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
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

          {/* My Bookings in mobile menu too */}
          {isLoaded && user && (
            <Link
              href="/my-bookings"
              onClick={() => setOpen(false)}
              style={{
                fontSize: "1rem",
                fontWeight: pathname === "/my-bookings" ? 700 : 500,
                color: pathname === "/my-bookings" ? "#C4703A" : "#5C4A3A",
                textDecoration: "none",
                padding: "0.625rem 0.75rem",
                borderRadius: "8px",
                backgroundColor: pathname === "/my-bookings" ? "rgba(196,112,58,0.08)" : "transparent",
              }}
            >
              My Bookings
            </Link>
          )}

          <div style={{ height: "1px", backgroundColor: "#E8DED0", margin: "0.5rem 0" }} />
          <MobileAuthButtons />
        </div>
      )}
    </nav>
  );
}

// ── Badge ───────────────────────────────────────────────────────────────────
function Badge({ count }: { count: number }) {
  return (
    <span style={{
      position: "absolute",
      top: "3px", right: "3px",
      minWidth: "15px", height: "15px",
      padding: "0 4px",
      backgroundColor: "#C4703A",
      color: "#FAF7F2",
      fontSize: "9px", fontWeight: 700,
      lineHeight: "15px",
      borderRadius: "10px",
      textAlign: "center",
      pointerEvents: "none",
      border: "1.5px solid #FAF7F2",
    }}>
      {count > 9 ? "9+" : count}
    </span>
  );
}