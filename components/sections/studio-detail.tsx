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

const SKILL_WORKERS = [
  {
    id: "sw1",
    name: "Riya Kapoor",
    role: "Photographer",
    icon: "📸",
    rating: 4.9,
    sessions: 84,
    fee: 2500,
    tags: ["Fashion", "Editorial"],
  },
  {
    id: "sw2",
    name: "Dev Anand",
    role: "Photographer",
    icon: "📸",
    rating: 4.8,
    sessions: 61,
    fee: 2000,
    tags: ["Product", "Commercial"],
  },
  {
    id: "sw3",
    name: "Meera Joshi",
    role: "Photo Editor",
    icon: "🎨",
    rating: 5.0,
    sessions: 112,
    fee: 1500,
    tags: ["Retouching", "Color Grade"],
  },
  {
    id: "sw4",
    name: "Sahil Verma",
    role: "Videographer",
    icon: "🎬",
    rating: 4.7,
    sessions: 47,
    fee: 3000,
    tags: ["Reels", "Brand Film"],
  },
];

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
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);
  const [workerPanelOpen, setWorkerPanelOpen] = useState(false);

  const toggleSlot = (slot: string) => {
    if (BOOKED_SLOTS.includes(slot)) return;
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const toggleWorker = (id: string) => {
    setSelectedWorkers((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const chosenWorkers = SKILL_WORKERS.filter((w) => selectedWorkers.includes(w.id));
  const workerFeeTotal = chosenWorkers.reduce((sum, w) => sum + w.fee, 0);

  const studioSubtotal =
    bookingType === "hourly"
      ? selectedSlots.length * STUDIO.price
      : bookingType === "halfday"
      ? STUDIO.halfDayPrice
      : STUDIO.fullDayPrice;

  const totalPrice = studioSubtotal + workerFeeTotal;
  const advanceAmount = Math.round(totalPrice * 0.5);
  const balanceAmount = totalPrice - advanceAmount;

  const canBook = selectedDate && (bookingType !== "hourly" || selectedSlots.length > 0);

  return (
    <div style={{ backgroundColor: "#FAF7F2", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 0", display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#9B7B60", alignItems: "center" }}>
        <Link href="/" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Home</Link>
        <span>›</span>
        <Link href="/studios" style={{ color: "#9B7B60", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C4703A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9B7B60")}>Explore Studios</Link>
        <span>›</span>
        <span style={{ color: "#1C1410", fontWeight: 500 }}>{STUDIO.name}</span>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "1.5rem 2rem 5rem" }}>
        <div className="detail-grid" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Image Gallery */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ borderRadius: "20px", overflow: "hidden", height: "420px", backgroundColor: "#D4B896", marginBottom: "0.75rem" }}>
                <img src={STUDIO.images[activeImage]} alt={STUDIO.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                {STUDIO.images.map((img, i) => (
                  <div key={i} onClick={() => setActiveImage(i)} style={{ borderRadius: "10px", overflow: "hidden", height: "80px", cursor: "pointer", border: `2px solid ${activeImage === i ? "#C4703A" : "transparent"}`, transition: "border-color 0.2s", opacity: activeImage === i ? 1 : 0.7 }}>
                    <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Title + Meta */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <span style={{ backgroundColor: "#F0DCC8", color: "#8B4513", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase", display: "inline-block", marginBottom: "0.5rem" }}>{STUDIO.type}</span>
                  <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 900, color: "#1C1410", letterSpacing: "-0.02em", lineHeight: 1.15 }}>{STUDIO.name}</h1>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.8rem", fontWeight: 800, color: "#C4703A" }}>₹{STUDIO.price.toLocaleString()}</p>
                  <p style={{ fontSize: "0.8rem", color: "#9B7B60" }}>per hour</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>📍 {STUDIO.address}</span>
                <span style={{ fontSize: "0.875rem", color: "#7A5C42" }}>⭐ {STUDIO.rating} ({STUDIO.reviewCount} reviews)</span>
              </div>
            </div>

            {/* How Booking Works */}
            <Section title="How Booking Works">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem" }} className="how-grid">
                {[
                  { step: "01", icon: "💳", title: "Pay 50% Advance", desc: "Lock in your slot by paying half on the platform. Instant confirmation, zero hassle." },
                  { step: "02", icon: "📲", title: "Scan QR On Arrival", desc: "Scan the studio's QR code on arrival. This activates your booking and releases payment." },
                  { step: "03", icon: "🤝", title: "Pay Balance at Studio", desc: "Settle the remaining 50% directly with the Studio Manager via Cash or UPI after your shoot." },
                ].map((s) => (
                  <div key={s.step} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.125rem", position: "relative", overflow: "hidden" }}>
                    <span style={{ position: "absolute", top: "0.5rem", right: "0.75rem", fontSize: "2.5rem", fontFamily: "var(--font-playfair)", fontWeight: 900, color: "#F5EFE7", lineHeight: 1, userSelect: "none" }}>{s.step}</span>
                    <span style={{ fontSize: "1.4rem", display: "block", marginBottom: "0.5rem" }}>{s.icon}</span>
                    <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.875rem", fontWeight: 800, color: "#1C1410", marginBottom: "0.375rem" }}>{s.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "#6B5240", lineHeight: 1.65 }}>{s.desc}</p>
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", backgroundColor: "#C4703A", opacity: 0.35 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "0.875rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>ℹ️</span>
                <p style={{ fontSize: "0.78rem", color: "#8B4513", lineHeight: 1.65 }}>
                  <strong>Cancellation policy:</strong> Full refund if the studio no-shows. If you no-show, the 50% advance is non-refundable. CultureJeevan takes a 15% platform commission on total booking value.
                </p>
              </div>
            </Section>

            {/* About */}
            <Section title="About This Studio">
              <p style={{ fontSize: "0.95rem", color: "#5C4A3A", lineHeight: 1.8 }}>{STUDIO.about}</p>
            </Section>

            {/* Amenities */}
            <Section title="Amenities & Equipment">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
                {STUDIO.amenities.map((a) => (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.625rem 0.875rem" }}>
                    <span style={{ fontSize: "1.1rem" }}>{a.icon}</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "#5C4A3A" }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Skill Workers — full detail browsing on left */}
            <Section title="Add Skill Workers (Optional)">
              <p style={{ fontSize: "0.875rem", color: "#6B5240", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                Hire one or more vetted professionals to join your session. Their fees are included in your platform payment alongside studio rent.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {SKILL_WORKERS.map((w) => {
                  const isSelected = selectedWorkers.includes(w.id);
                  return (
                    <div key={w.id} onClick={() => toggleWorker(w.id)}
                      style={{ backgroundColor: isSelected ? "#FDF0E6" : "#FFFFFF", border: `1.5px solid ${isSelected ? "#C4703A" : "#E8DED0"}`, borderRadius: "14px", padding: "1rem 1.25rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                        <div style={{ width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0, backgroundColor: isSelected ? "#F0DCC8" : "#F5EFE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", border: `1.5px solid ${isSelected ? "#C4703A" : "#E8DED0"}` }}>
                          {w.icon}
                        </div>
                        <div>
                          <p style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1C1410" }}>{w.name}</p>
                          <p style={{ fontSize: "0.78rem", color: "#9B7B60", marginBottom: "0.35rem" }}>{w.role}</p>
                          <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                            {w.tags.map((tag) => (
                              <span key={tag} style={{ fontSize: "0.67rem", fontWeight: 600, color: "#8B4513", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#C4703A" }}>₹{w.fee.toLocaleString()}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9B7B60" }}>per session</p>
                        <p style={{ fontSize: "0.72rem", color: "#B8A090", marginTop: "0.2rem" }}>⭐ {w.rating} · {w.sessions} sessions</p>
                        <div style={{ marginTop: "0.45rem", width: "22px", height: "22px", borderRadius: "50%", border: `2px solid ${isSelected ? "#C4703A" : "#E8DED0"}`, backgroundColor: isSelected ? "#C4703A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}>
                          {isSelected && <span style={{ color: "#FAF7F2", fontSize: "0.7rem", lineHeight: 1 }}>✓</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {chosenWorkers.length > 0 && (
                <div style={{ marginTop: "0.875rem", backgroundColor: "#E8F5F2", border: "1px solid #C0E0DA", borderRadius: "10px", padding: "0.75rem 1rem", display: "flex", gap: "0.625rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>✅</span>
                  <p style={{ fontSize: "0.78rem", color: "#1C6B5A", lineHeight: 1.65 }}>
                    <strong>{chosenWorkers.map((w) => w.name).join(", ")}</strong> added.
                    Combined worker fee: <strong>₹{workerFeeTotal.toLocaleString()}</strong> — included in platform payment. Click any worker card again to remove them.
                  </p>
                </div>
              )}
            </Section>

            {/* Rules */}
            <Section title="Studio Rules">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {STUDIO.rules.map((rule, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.625rem", alignItems: "flex-start", fontSize: "0.875rem", color: "#5C4A3A" }}>
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
                  <div key={i} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "14px", padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <div>
                        <p style={{ fontWeight: 700, color: "#1C1410", fontSize: "0.9rem" }}>{r.name}</p>
                        <p style={{ fontSize: "0.78rem", color: "#9B7B60" }}>{r.role}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ color: "#C4703A", fontWeight: 700, fontSize: "0.875rem" }}>{"★".repeat(r.rating)}</p>
                        <p style={{ fontSize: "0.75rem", color: "#B8A090" }}>{r.date}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#5C4A3A", lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* ── RIGHT COLUMN — Booking Card ── */}
          {/*
            KEY FIX: sticky + max-height + overflow-y:auto
            The column scrolls independently inside its own container.
            This means the booking card is always visible and reachable without
            first scrolling all the way down the left column.
          */}
          <div style={{
            position: "sticky",
            top: "80px",
            maxHeight: "calc(100vh - 100px)",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#E8DED0 transparent",
          }}>
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E8DED0", borderRadius: "20px", padding: "1.25rem", boxShadow: "0 8px 40px rgba(196,112,58,0.10)" }}>

              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
                Book This Studio
              </p>

              {/* Booking Type Tabs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "3px", marginBottom: "0.75rem", gap: "2px" }}>
                {(["hourly", "halfday", "fullday"] as const).map((t) => (
                  <button key={t} onClick={() => { setBookingType(t); setSelectedSlots([]); }}
                    style={{ padding: "0.4rem", borderRadius: "6px", border: "none", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", backgroundColor: bookingType === t ? "#C4703A" : "transparent", color: bookingType === t ? "#FAF7F2" : "#7A5C42" }}>
                    {t === "hourly" ? "Hourly" : t === "halfday" ? "Half Day" : "Full Day"}
                  </button>
                ))}
              </div>

              {/* Pricing row */}
              <div style={{ backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "8px", padding: "0.5rem 0.875rem", marginBottom: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.78rem", color: "#8B4513", fontWeight: 500 }}>
                  {bookingType === "hourly" ? "₹1,200 / hour" : bookingType === "halfday" ? "4 hours" : "8 hours"}
                </span>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#C4703A" }}>
                  ₹{bookingType === "hourly" ? "1,200" : bookingType === "halfday" ? "4,500" : "8,000"}
                </span>
              </div>

              {/* Date */}
              <div style={{ marginBottom: "0.75rem" }}>
                <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Select Date</label>
                <input type="date" min={new Date().toISOString().split("T")[0]}
                  value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: "100%", padding: "0.55rem 0.75rem", border: "1.5px solid #E8DED0", borderRadius: "8px", fontSize: "0.85rem", color: "#1C1410", backgroundColor: "#FAF7F2", outline: "none", boxSizing: "border-box" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#C4703A")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E8DED0")} />
              </div>

              {/* Time Slots */}
              {bookingType === "hourly" && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                    <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>Time Slots</label>
                    {selectedSlots.length > 0 && (
                      <span style={{ fontSize: "0.67rem", color: "#C4703A", fontWeight: 600, backgroundColor: "#FDF0E6", padding: "0.1rem 0.45rem", borderRadius: "100px" }}>
                        {selectedSlots.length} selected
                      </span>
                    )}
                  </div>
                  <div style={{ height: "112px", overflowY: "auto", borderRadius: "8px", border: "1.5px solid #E8DED0", padding: "0.4rem", backgroundColor: "#FAF7F2", scrollbarWidth: "thin", scrollbarColor: "#E8DED0 transparent" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.3rem" }}>
                      {TIME_SLOTS.map((slot) => {
                        const booked = BOOKED_SLOTS.includes(slot);
                        const selected = selectedSlots.includes(slot);
                        return (
                          <button key={slot} onClick={() => toggleSlot(slot)} disabled={booked}
                            style={{ padding: "0.32rem 0.2rem", borderRadius: "6px", fontSize: "0.67rem", fontWeight: 600, border: "1.5px solid", cursor: booked ? "not-allowed" : "pointer", transition: "all 0.15s", backgroundColor: booked ? "#F0EBE4" : selected ? "#C4703A" : "#FFFFFF", color: booked ? "#C8B8A8" : selected ? "#FAF7F2" : "#7A5C42", borderColor: booked ? "#E8DED0" : selected ? "#C4703A" : "#E8DED0", textDecoration: booked ? "line-through" : "none" }}>
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <p style={{ fontSize: "0.63rem", color: "#B8A090", marginTop: "0.25rem" }}>Strikethrough = booked · Scroll for more</p>
                </div>
              )}

              {/* Skill Workers — compact multi-select inside card */}
              <div style={{ marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                  <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    Skill Workers{selectedWorkers.length > 0 ? <span style={{ color: "#C4703A" }}> ({selectedWorkers.length})</span> : ""}
                  </label>
                  <button onClick={() => setWorkerPanelOpen((v) => !v)}
                    style={{ fontSize: "0.67rem", fontWeight: 600, color: "#C4703A", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", padding: "0.18rem 0.5rem", borderRadius: "100px", cursor: "pointer" }}>
                    {workerPanelOpen ? "Done ↑" : "Browse +"}
                  </button>
                </div>

                {/* Selected worker chips (collapsed view) */}
                {selectedWorkers.length > 0 && !workerPanelOpen && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {chosenWorkers.map((w) => (
                      <div key={w.id} style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", backgroundColor: "#FDF0E6", border: "1px solid #F0DCC8", borderRadius: "100px", padding: "0.18rem 0.4rem 0.18rem 0.3rem" }}>
                        <span style={{ fontSize: "0.75rem" }}>{w.icon}</span>
                        <span style={{ fontSize: "0.68rem", fontWeight: 600, color: "#8B4513" }}>{w.name}</span>
                        <span style={{ fontSize: "0.68rem", color: "#C4703A", fontWeight: 700 }}>+₹{w.fee.toLocaleString()}</span>
                        <button onClick={(e) => { e.stopPropagation(); toggleWorker(w.id); }}
                          style={{ background: "none", border: "none", cursor: "pointer", color: "#C4703A", fontSize: "0.8rem", padding: "0 0 0 0.1rem", lineHeight: 1, fontWeight: 700 }}>×</button>
                      </div>
                    ))}
                    <button onClick={() => setWorkerPanelOpen(true)}
                      style={{ fontSize: "0.68rem", fontWeight: 600, color: "#9B7B60", background: "none", border: "1px dashed #D0C4B8", borderRadius: "100px", padding: "0.18rem 0.5rem", cursor: "pointer" }}>
                      + Add more
                    </button>
                  </div>
                )}

                {!workerPanelOpen && selectedWorkers.length === 0 && (
                  <p style={{ fontSize: "0.73rem", color: "#B8A090", fontStyle: "italic" }}>Optional — photographer, editor, or videographer</p>
                )}

                {/* Dropdown panel with checkboxes */}
                {workerPanelOpen && (
                  <div style={{ border: "1.5px solid #E8DED0", borderRadius: "8px", overflow: "hidden", backgroundColor: "#FAF7F2" }}>
                    {SKILL_WORKERS.map((w, idx) => {
                      const isSelected = selectedWorkers.includes(w.id);
                      return (
                        <div key={w.id} onClick={() => toggleWorker(w.id)}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 0.75rem", cursor: "pointer", backgroundColor: isSelected ? "#FDF0E6" : "transparent", borderBottom: idx < SKILL_WORKERS.length - 1 ? "1px solid #E8DED0" : "none", transition: "background-color 0.15s" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ width: "16px", height: "16px", borderRadius: "4px", border: `2px solid ${isSelected ? "#C4703A" : "#D0C4B8"}`, backgroundColor: isSelected ? "#C4703A" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                              {isSelected && <span style={{ color: "#FAF7F2", fontSize: "0.6rem", lineHeight: 1 }}>✓</span>}
                            </div>
                            <span style={{ fontSize: "1rem" }}>{w.icon}</span>
                            <div>
                              <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1C1410" }}>{w.name}</p>
                              <p style={{ fontSize: "0.67rem", color: "#9B7B60" }}>{w.role} · ⭐ {w.rating} · {w.sessions} sessions</p>
                            </div>
                          </div>
                          <p style={{ fontSize: "0.82rem", fontWeight: 800, color: "#C4703A", flexShrink: 0 }}>₹{w.fee.toLocaleString()}</p>
                        </div>
                      );
                    })}
                    <div style={{ padding: "0.5rem 0.75rem", borderTop: "1px solid #E8DED0", backgroundColor: "#F5EFE7" }}>
                      <button onClick={() => setWorkerPanelOpen(false)}
                        style={{ width: "100%", padding: "0.4rem", backgroundColor: "#C4703A", color: "#FAF7F2", border: "none", borderRadius: "6px", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer" }}>
                        Confirm{selectedWorkers.length > 0 ? ` (${selectedWorkers.length} selected)` : " Selection"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              {(selectedSlots.length > 0 || bookingType !== "hourly") && (
                <div style={{ marginBottom: "0.75rem" }}>
                  <div style={{ backgroundColor: "#F5EFE7", borderRadius: "8px", padding: "0.625rem 0.875rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: chosenWorkers.length > 0 ? "0.35rem" : 0 }}>
                      <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>
                        Studio{bookingType === "hourly" ? ` (${selectedSlots.length}h)` : bookingType === "halfday" ? " (4h)" : " (8h)"}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5C4A3A" }}>₹{studioSubtotal.toLocaleString()}</span>
                    </div>
                    {chosenWorkers.map((w) => (
                      <div key={w.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                        <span style={{ fontSize: "0.78rem", color: "#7A5C42" }}>{w.name} · {w.role}</span>
                        <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#5C4A3A" }}>₹{w.fee.toLocaleString()}</span>
                      </div>
                    ))}
                    <div style={{ borderTop: "1px dashed #E8DED0", paddingTop: "0.35rem", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.82rem", color: "#5C4A3A", fontWeight: 700 }}>Total</span>
                      <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: "#C4703A" }}>₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 50/50 payment split */}
                  <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                    <div style={{ backgroundColor: "#C4703A", borderRadius: "7px", padding: "0.5rem 0.625rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "rgba(250,247,242,0.7)", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Pay Now (50%)</p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 900, color: "#FAF7F2" }}>₹{advanceAmount.toLocaleString()}</p>
                      <p style={{ fontSize: "0.58rem", color: "rgba(250,247,242,0.6)", marginTop: "0.1rem" }}>Platform · Advance</p>
                    </div>
                    <div style={{ backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "7px", padding: "0.5rem 0.625rem" }}>
                      <p style={{ fontSize: "0.6rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.15rem" }}>Pay at Studio</p>
                      <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontWeight: 900, color: "#5C4A3A" }}>₹{balanceAmount.toLocaleString()}</p>
                      <p style={{ fontSize: "0.58rem", color: "#B8A090", marginTop: "0.1rem" }}>Cash / UPI · After shoot</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button disabled={!canBook}
                style={{ width: "100%", padding: "0.75rem", border: "none", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: canBook ? "pointer" : "not-allowed", backgroundColor: canBook ? "#C4703A" : "#E8DED0", color: canBook ? "#FAF7F2" : "#B8A090", transition: "background-color 0.2s", letterSpacing: "0.02em" }}
                onMouseEnter={(e) => { if (canBook) e.currentTarget.style.backgroundColor = "#A85C2E"; }}
                onMouseLeave={(e) => { if (canBook) e.currentTarget.style.backgroundColor = "#C4703A"; }}>
                {!selectedDate
                  ? "Select a Date First"
                  : bookingType === "hourly" && selectedSlots.length === 0
                  ? "Pick Time Slots"
                  : `Pay ₹${advanceAmount.toLocaleString()} to Confirm →`}
              </button>

              <p style={{ fontSize: "0.67rem", color: "#B8A090", textAlign: "center", marginTop: "0.5rem", lineHeight: 1.5 }}>
                🔐 Secure payment · Instant confirmation<br />
                Balance paid at studio after shoot
              </p>
            </div>

            {/* Cancellation summary */}
            <div style={{ marginTop: "0.625rem", backgroundColor: "#F5EFE7", border: "1px solid #E8DED0", borderRadius: "12px", padding: "0.75rem 1rem" }}>
              <p style={{ fontSize: "0.67rem", fontWeight: 700, color: "#9B7B60", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.35rem" }}>Cancellation</p>
              {[
                { dot: "🟢", text: "Full refund if studio no-shows" },
                { dot: "🟡", text: "Full refund 48hrs before" },
                { dot: "🟠", text: "50% refund within 24hrs" },
                { dot: "🔴", text: "No refund if you no-show" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.4rem", fontSize: "0.73rem", color: "#6B5240", alignItems: "center", marginBottom: i < 3 ? "0.2rem" : 0 }}>
                  <span>{item.dot}</span>{item.text}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #E8DED0; border-radius: 4px; }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.25rem", fontWeight: 800, color: "#1C1410", marginBottom: "1rem", paddingBottom: "0.625rem", borderBottom: "1.5px solid #E8DED0" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}