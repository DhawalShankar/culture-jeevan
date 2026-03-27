"use client";

import { useState } from "react";
import Link from "next/link";

const STUDIO = {
  id: "1",
  name: "Lumina Photography Studio",
  type: "Photography",
  city: "Delhi",
  area: "Connaught Place",
  address: "B-14, Connaught Place, New Delhi — 110001",
  price: 1200,
  halfDayPrice: 4500,
  fullDayPrice: 8000,
  rating: 4.9,
  reviewCount: 128,
  about:
    "Lumina is a premium photography studio designed for editorial, commercial, and portrait shoots. With 2000 sq. ft. of shooting space, a signature cyclorama wall, and professional lighting equipment included in every booking — it's the go-to space for Delhi's top creators.",
  images: [
    "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=85",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=85",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=85",
  ],
  amenities: [
    { icon: "💡", label: "Pro Lighting Kit" },
    { icon: "🎨", label: "Cyclorama Wall" },
    { icon: "🪞", label: "Makeup Room" },
    { icon: "📦", label: "Prop Storage" },
    { icon: "❄️", label: "Air Conditioning" },
    { icon: "🅿️", label: "Free Parking" },
    { icon: "☕", label: "Pantry & Lounge" },
    { icon: "📶", label: "High-Speed WiFi" },
    { icon: "🎭", label: "10+ Backdrops" },
    { icon: "🔌", label: "Power Backup" },
  ],
  rules: [
    "No outside food or beverages in shooting area",
    "Shoes off on the cyclorama wall",
    "Equipment must be returned to original position",
    "Overtime billed at ₹300 per 15 min",
    "Cancellation: Full refund 48hrs before, 50% within 24hrs",
  ],
  reviews: [
    {
      name: "Aryan Mehta",
      role: "Commercial Photographer",
      rating: 5,
      text: "Absolutely stunning space. The cyclorama wall is immaculate and the lighting setup saved us so much time. Booked twice already.",
      date: "Feb 2025",
    },
    {
      name: "Priya Sharma",
      role: "Fashion Blogger",
      rating: 5,
      text: "The makeup room is a game changer. Clean, well-lit, and the staff is incredibly helpful. My go-to studio in Delhi.",
      date: "Jan 2025",
    },
    {
      name: "Vikram Nair",
      role: "Brand Videographer",
      rating: 4,
      text: "Great space overall. Parking is a blessing in CP. Docked one star only because the pantry ran out of coffee by noon!",
      date: "Dec 2024",
    },
  ],
};

const TIME_SLOTS = [
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM",
];

const BOOKED_SLOTS = ["10:00 AM", "11:00 AM", "2:00 PM"];

export default function StudioDetail({ id }: { id: string }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [bookingType, setBookingType] = useState<"hourly" | "halfday" | "fullday">("hourly");

  const toggleSlot = (slot: string) => {
    if (BOOKED_SLOTS.includes(slot)) return;
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const totalPrice =
    bookingType === "hourly"
      ? selectedSlots.length * STUDIO.price
      : bookingType === "halfday"
      ? STUDIO.halfDayPrice
      : STUDIO.fullDayPrice;

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem 2rem 0",
          display: "flex",
          gap: "0.5rem",
          fontSize: "0.82rem",
          color: "#9B7B60",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
        >
          Home
        </Link>
        <span>›</span>
        <Link
          href="/studios"
          style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}
        >
          Explore Studios
        </Link>
        <span>›</span>
        <span style={{ color: "#1C1410", fontWeight: 500 }}>{STUDIO.name}</span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 5rem" }}>
        <div
          className="detail-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 360px",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Image Gallery */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  height: "420px",
                  backgroundColor: "#D4B896",
                  marginBottom: "0.75rem",
                }}
              >
                <img
                  src={STUDIO.images[activeImage]}
                  alt={STUDIO.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0.5rem",
                }}
              >
                {STUDIO.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      borderRadius: "10px",
                      overflow: "hidden",
                      height: "80px",
                      cursor: "pointer",
                      border: `2px solid ${activeImage === i ? "#C4703A" : "transparent"}`,
                      transition: "border-color 0.2s",
                      opacity: activeImage === i ? 1 : 0.7,
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Title + Meta */}
            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <span
                    style={{
                      backgroundColor: "#F0DCC8",
                      color: "#8B4513",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.3rem 0.75rem",
                      borderRadius: "100px",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {STUDIO.type}
                  </span>
                  <h1
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "2rem",
                      fontWeight: 900,
                      color: "#1C1410",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.15,
                    }}
                  >
                    {STUDIO.name}
                  </h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      color: "#C4703A",
                    }}
                  >
                    ₹{STUDIO.price.toLocaleString()}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#9B7B60" }}>per hour</p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginTop: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>
                  📍 {STUDIO.address}
                </span>
                <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>
                  ⭐ {STUDIO.rating} ({STUDIO.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* About */}
            <Section title="About This Studio">
              <p style={{ fontSize: "0.95rem", color: "#5C4A3A", lineHeight: 1.8 }}>
                {STUDIO.about}
              </p>
            </Section>

            {/* Amenities */}
            <Section title="Amenities & Equipment">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {STUDIO.amenities.map((a) => (
                  <div
                    key={a.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      backgroundColor: "#F5EFE7",
                      border: "1px solid #E8DED0",
                      borderRadius: "10px",
                      padding: "0.625rem 0.875rem",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem" }}>{a.icon}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#5C4A3A" }}>
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Rules */}
            <Section title="Studio Rules">
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {STUDIO.rules.map((rule, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.625rem",
                      alignItems: "flex-start",
                      fontSize: "0.875rem",
                      color: "#5C4A3A",
                    }}
                  >
                    <span style={{ color: "#C4703A", fontWeight: 700, flexShrink: 0 }}>—</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Reviews */}
            <Section title={`Reviews (${STUDIO.reviewCount})`}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {STUDIO.reviews.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E8DED0",
                      borderRadius: "14px",
                      padding: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 700, color: "#1C1410", fontSize: "0.9rem" }}>
                          {r.name}
                        </p>
                        <p style={{ fontSize: "0.78rem", color: "#9B7B60" }}>{r.role}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#C4703A", fontWeight: 700, fontSize: "0.875rem" }}>
                          {"★".repeat(r.rating)}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "#B8A090" }}>{r.date}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#5C4A3A", lineHeight: 1.7 }}>
                      {r.text}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* ── RIGHT COLUMN — Booking Card ── */}
          <div style={{ position: "sticky", top: "88px" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8DED0",
                borderRadius: "20px",
                padding: "1.5rem",
                boxShadow: "0 8px 40px rgba(196,112,58,0.10)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#9B7B60",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Book This Studio
              </p>

              {/* Booking Type Tabs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  backgroundColor: "#F5EFE7",
                  borderRadius: "10px",
                  padding: "4px",
                  marginBottom: "1rem",
                  gap: "3px",
                }}
              >
                {(["hourly", "halfday", "fullday"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setBookingType(t);
                      setSelectedSlots([]);
                    }}
                    style={{
                      padding: "0.5rem",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      backgroundColor: bookingType === t ? "#C4703A" : "transparent",
                      color: bookingType === t ? "#FAF7F2" : "#7A5C42",
                    }}
                  >
                    {t === "hourly" ? "Hourly" : t === "halfday" ? "Half Day" : "Full Day"}
                  </button>
                ))}
              </div>

              {/* Pricing info */}
              <div
                style={{
                  backgroundColor: "#FDF0E6",
                  border: "1px solid #F0DCC8",
                  borderRadius: "10px",
                  padding: "0.75rem 1rem",
                  marginBottom: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.82rem", color: "#8B4513", fontWeight: 500 }}>
                  {bookingType === "hourly"
                    ? "₹1,200 / hour"
                    : bookingType === "halfday"
                    ? "4 hours"
                    : "8 hours (full day)"}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "#C4703A",
                  }}
                >
                  ₹
                  {bookingType === "hourly"
                    ? "1,200"
                    : bookingType === "halfday"
                    ? "4,500"
                    : "8,000"}
                </span>
              </div>

              {/* Date */}
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#9B7B60",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}
                >
                  Select Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.875rem",
                    border: "1.5px solid #E8DED0",
                    borderRadius: "10px",
                    fontSize: "0.875rem",
                    color: "#1C1410",
                    backgroundColor: "#FAF7F2",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")}
                />
              </div>

              {/* Time Slots — fixed height scrollable to keep card consistent */}
              {bookingType === "hourly" && (
                <div style={{ marginBottom: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "#9B7B60",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Select Time Slots
                    </label>
                    {selectedSlots.length > 0 && (
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#C4703A",
                          fontWeight: 600,
                          backgroundColor: "#FDF0E6",
                          padding: "0.15rem 0.5rem",
                          borderRadius: "100px",
                        }}
                      >
                        {selectedSlots.length} selected
                      </span>
                    )}
                  </div>

                  {/* Scrollable slots container — fixed height keeps card size consistent */}
                  <div
                    style={{
                      height: "148px",
                      overflowY: "auto",
                      borderRadius: "10px",
                      border: "1.5px solid #E8DED0",
                      padding: "0.5rem",
                      backgroundColor: "#FAF7F2",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#E8DED0 transparent",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "0.35rem",
                      }}
                    >
                      {TIME_SLOTS.map((slot) => {
                        const booked = BOOKED_SLOTS.includes(slot);
                        const selected = selectedSlots.includes(slot);
                        return (
                          <button
                            key={slot}
                            onClick={() => toggleSlot(slot)}
                            disabled={booked}
                            style={{
                              padding: "0.38rem 0.25rem",
                              borderRadius: "7px",
                              fontSize: "0.7rem",
                              fontWeight: 600,
                              border: "1.5px solid",
                              cursor: booked ? "not-allowed" : "pointer",
                              transition: "all 0.15s",
                              backgroundColor: booked
                                ? "#F0EBE4"
                                : selected
                                ? "#C4703A"
                                : "#FFFFFF",
                              color: booked ? "#C8B8A8" : selected ? "#FAF7F2" : "#7A5C42",
                              borderColor: booked
                                ? "#E8DED0"
                                : selected
                                ? "#C4703A"
                                : "#E8DED0",
                              textDecoration: booked ? "line-through" : "none",
                            }}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.68rem", color: "#B8A090", marginTop: "0.35rem" }}>
                    Strikethrough = already booked · Scroll to see all
                  </p>
                </div>
              )}

              {/* Total */}
              {(selectedSlots.length > 0 || bookingType !== "hourly") && (
                <div
                  style={{
                    backgroundColor: "#F5EFE7",
                    borderRadius: "10px",
                    padding: "0.75rem 1rem",
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: "0.875rem", color: "#5C4A3A", fontWeight: 600 }}>
                    Total{bookingType === "hourly" ? ` (${selectedSlots.length}h)` : ""}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair)",
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#C4703A",
                    }}
                  >
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Book Button */}
              <button
                disabled={
                  !selectedDate ||
                  (bookingType === "hourly" && selectedSlots.length === 0)
                }
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  cursor:
                    selectedDate &&
                    (bookingType !== "hourly" || selectedSlots.length > 0)
                      ? "pointer"
                      : "not-allowed",
                  backgroundColor:
                    selectedDate &&
                    (bookingType !== "hourly" || selectedSlots.length > 0)
                      ? "#C4703A"
                      : "#E8DED0",
                  color:
                    selectedDate &&
                    (bookingType !== "hourly" || selectedSlots.length > 0)
                      ? "#FAF7F2"
                      : "#B8A090",
                  transition: "background-color 0.2s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (
                    selectedDate &&
                    (bookingType !== "hourly" || selectedSlots.length > 0)
                  )
                    e.currentTarget.style.backgroundColor = "#A85C2E";
                }}
                onMouseLeave={(e) => {
                  if (
                    selectedDate &&
                    (bookingType !== "hourly" || selectedSlots.length > 0)
                  )
                    e.currentTarget.style.backgroundColor = "#C4703A";
                }}
              >
                {!selectedDate
                  ? "Select a Date First"
                  : bookingType === "hourly" && selectedSlots.length === 0
                  ? "Pick Time Slots"
                  : "Confirm Booking →"}
              </button>

              <p
                style={{
                  fontSize: "0.72rem",
                  color: "#B8A090",
                  textAlign: "center",
                  marginTop: "0.75rem",
                }}
              >
                🔐 Secure payment · Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
        div::-webkit-scrollbar {
          width: 4px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: #E8DED0;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.25rem",
          fontWeight: 800,
          color: "#1C1410",
          marginBottom: "1rem",
          paddingBottom: "0.625rem",
          borderBottom: "1.5px solid #E8DED0",
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}