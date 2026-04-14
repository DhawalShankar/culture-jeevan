"use client";

import { useEffect, useCallback } from "react";

type PolicyType = "privacy" | "terms" | null;

interface LegalModalProps {
  open: PolicyType;
  onClose: () => void;
}

const PRIVACY_SECTIONS = [
  {
    title: "What we collect",
    body: "Name, email, phone number (Creators and Space Owners only), booking history, and device/browser info for security.",
  },
  {
    title: "How we use it",
    body: "To process bookings, release escrow payments via OTP confirmation, send booking notifications, and calculate badge tiers.",
  },
  {
    title: "What we don't do",
    body: "We don't sell your data. We don't host your creative work. We don't record or access the negotiation call between Customer and Creator.",
  },
  {
    title: "Third-party services",
    body: "Clerk (auth), Razorpay (payments), Supabase (database), Render (backend). Each governed by their own privacy policies.",
  },
  {
    title: "Data retention",
    body: "Booking records retained for 3 years for financial compliance. Account data deleted within 30 days of account closure on request.",
  },
  {
    title: "Your rights",
    body: "Request a copy of your data or deletion at cosmoindiaprakashan@gmail.com. We respond within 15 working days.",
  },
];

const TERMS_SECTIONS = [
  {
    title: "Platform role",
    body: "CultureJeevan is a connector, not a party to your agreement. Like a telecom operator, we connect two parties but are not responsible for what is agreed, said, or delivered between them.",
  },
  {
    title: "Accounts",
    body: "One account per person. You may activate Customer, Creator, and Space Owner roles simultaneously. Phone verification is mandatory for Creator and Space Owner listings.",
  },
  {
    title: "Payments & escrow",
    body: "Advance (50–80% of total) is paid via Razorpay and held in escrow. Platform deducts 10% commission. Remaining balance is settled directly at the venue — off-platform and unrecorded.",
  },
  {
    title: "OTP release",
    body: "Advance is released only on OTP confirmation by the Creator or Space Owner on their dashboard. Disputes about OTP failure can be reported by email — no automatic refund is implied.",
  },
  {
    title: "Cancellations",
    body: "5+ days before event: full refund, no penalty either side. Under 5 days: if Space or Creator cancels, full refund to customer and no earnings for Creator; if customer no-shows, advance goes to the Creator or Space after platform commission.",
  },
  {
    title: "Equipment section",
    body: "Equipment listings are a directory only. No payment, OTP, commission, or reviews. Platform has zero liability for equipment transactions.",
  },
  {
    title: "No rescheduling",
    body: "There is no rescheduling. Only cancellation. A new booking must be created for a new date.",
  },
  {
    title: "Disputes",
    body: "Price, scope, and delivery disputes are outside platform jurisdiction. CultureJeevan does not mediate, arbitrate, or guarantee outcomes of any creative engagement.",
  },
  {
    title: "Subscriptions",
    body: "CJ Premium (₹199/month) and CJ Gold (₹1999/month) are recurring charges. Cancel anytime from your profile. No refund on the current billing cycle.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of India. Jurisdiction: Lucknow, Uttar Pradesh.",
  },
];

export default function LegalModal({ open, onClose }: LegalModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, handleKey]);

  if (!open) return null;

  const isPrivacy = open === "privacy";
  const sections = isPrivacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";
  const lastUpdated = "June 2026";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0D0C0A",
          border: "1px solid rgba(196,112,58,0.18)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "540px",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem 1rem",
            borderBottom: "1px solid rgba(250,247,242,0.06)",
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                color: "#C4703A",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 0.25rem",
              }}
            >
              CultureJeevan
            </p>
            <h2
              style={{
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "#FAF7F2",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              border: "1px solid rgba(250,247,242,0.1)",
              background: "rgba(250,247,242,0.04)",
              color: "rgba(250,247,242,0.45)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(196,112,58,0.1)";
              e.currentTarget.style.borderColor = "rgba(196,112,58,0.3)";
              e.currentTarget.style.color = "#C4703A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(250,247,242,0.04)";
              e.currentTarget.style.borderColor = "rgba(250,247,242,0.1)";
              e.currentTarget.style.color = "rgba(250,247,242,0.45)";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            overflowY: "auto",
            padding: "1.25rem 1.5rem 1.5rem",
            flex: 1,
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(250,247,242,0.25)",
              margin: "0 0 1.25rem",
            }}
          >
            Last updated: {lastUpdated}
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {sections.map((s) => (
              <div
                key={s.title}
                style={{
                  padding: "0.85rem 1rem",
                  background: "rgba(250,247,242,0.03)",
                  border: "1px solid rgba(250,247,242,0.06)",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#C4703A",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    margin: "0 0 0.4rem",
                  }}
                >
                  {s.title}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(250,247,242,0.55)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          {/* Contact nudge */}
          <p
            style={{
              fontSize: "0.75rem",
              color: "rgba(250,247,242,0.2)",
              marginTop: "1.25rem",
              lineHeight: 1.6,
            }}
          >
            Questions?{" "}
            <a
              href="mailto:cosmoindiaprakashan@gmail.com"
              style={{ color: "#C4703A", textDecoration: "none" }}
            >
              cosmoindiaprakashan@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}