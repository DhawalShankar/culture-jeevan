"use client";

import Link from "next/link";

const FOOTER_LINKS = {
  Platform: [
    { label: "Book a Creator", href: "/creators" },
    { label: "Book a Space", href: "/spaces" },
    { label: "Rent Equipment", href: "/equipment" },
    { label: "List Your Profile", href: "/profile" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "Cancellation Policy", href: "/cancellation" },
    { label: "Trust & Safety", href: "/trust" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
};

const SOCIAL = [
  {
    label: "Instagram",
    href: "https://instagram.com/culturejeevan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/culturejeevan",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/culturejeevan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/culturejeevan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@culturejeevan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#0D0C0A",
      borderTop: "1px solid rgba(196,112,58,0.1)",
      color: "#FAF7F2",
      padding: "4rem 3rem 2rem",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Top grid */}
        <div className="footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr repeat(3, 1fr)",
          gap: "3rem",
          marginBottom: "3.5rem",
        }}>

          {/* Brand col */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: "1rem" }}>
              <span style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "#FAF7F2",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}>
                Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
              </span>
            </Link>

            <p style={{
              fontSize: "0.82rem",
              color: "rgba(250,247,242,0.3)",
              lineHeight: 1.75,
              maxWidth: "240px",
              marginBottom: "1.5rem",
            }}>
              India's standard for creative bookings. Creators, spaces, and equipment — one platform.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: "34px", height: "34px",
                    background: "rgba(250,247,242,0.04)",
                    border: "1px solid rgba(250,247,242,0.08)",
                    borderRadius: "8px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(250,247,242,0.35)",
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#C4703A";
                    e.currentTarget.style.borderColor = "rgba(196,112,58,0.35)";
                    e.currentTarget.style.background = "rgba(196,112,58,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(250,247,242,0.35)";
                    e.currentTarget.style.borderColor = "rgba(250,247,242,0.08)";
                    e.currentTarget.style.background = "rgba(250,247,242,0.04)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                color: "#C4703A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
                margin: "0 0 1rem",
              }}>
                {category}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ fontSize: "0.82rem", color: "rgba(250,247,242,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,247,242,0.3)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CJ Badge — cities */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
          padding: "0.75rem 1.25rem",
          background: "rgba(196,112,58,0.06)",
          border: "1px solid rgba(196,112,58,0.12)",
          borderRadius: "10px",
          width: "fit-content",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#C4703A" opacity="0.7"/>
          </svg>
          <span style={{ fontSize: "0.65rem", color: "rgba(196,112,58,0.7)", fontWeight: 600, letterSpacing: "0.06em" }}>
            Currently serving
          </span>
          <span style={{ fontSize: "0.65rem", color: "#C4703A", fontWeight: 700, letterSpacing: "0.06em" }}>
            Lucknow · Kanpur · NCR
          </span>
          <span style={{ fontSize: "0.65rem", color: "rgba(196,112,58,0.4)", fontWeight: 500, letterSpacing: "0.04em" }}>
            — expanding soon
          </span>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(250,247,242,0.05)",
          paddingTop: "1.25rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(250,247,242,0.18)", margin: 0 }}>
            © {new Date().getFullYear()} CultureJeevan. All rights reserved. · culturejeevan.co.in
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" style={{
                fontSize: "0.75rem", color: "rgba(250,247,242,0.18)",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(250,247,242,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,247,242,0.18)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          .footer-grid{grid-template-columns:1fr 1fr !important;}
        }
        @media(max-width:560px){
          .footer-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </footer>
  );
}