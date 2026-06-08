"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { createClient } from "@/lib/supabase/client";

interface Creator {
  id: string;
  profile_id: string;
  category: string;
  sub_category: string | null;
  experience: string | null;
  bio: string | null;
  creator_description: string | null;
  occasion_types: string[] | null;
  advance_percent: number | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  city: string | null;
}

interface BookingRequest {
  id: string;
  status: "pending" | "accepted" | "declined" | "paid";
  agreed_price: number | null;
  advance_percent: number | null;
  creator_id: string;
}

const OCCASION_ICONS: Record<string, string> = {
  Wedding: "💍", Corporate: "🏢", "College Fest": "🎓",
  Birthday: "🎂", Concert: "🎸", "Brand Campaign": "📣",
  "Short Film": "🎬", "Product Shoot": "📦", "Reel / Content": "📱",
  "Open Mic": "🎤", Other: "✏️",
};

const ALL_OCCASIONS = [
  "Wedding", "Birthday", "College Fest", "Corporate",
  "Concert", "Open Mic", "Brand Campaign", "Short Film",
  "Product Shoot", "Reel / Content", "Other",
];

const C = {
  bg:      "#FAF8F5",
  dark:    "#1C1410",
  primary: "#C4703A",
  muted:   "#7A6655",
  subtle:  "#9B8070",
  border:  "#E2DAD0",
  surface: "#F3EDE6",
  cream:   "#FDF2E9",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.58rem", fontWeight: 700,
  color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase",
  marginBottom: "0.25rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "0.55rem 0.8rem",
  border: `1.5px solid ${C.border}`, borderRadius: "8px",
  fontSize: "0.85rem", color: C.dark, background: "#fff",
  outline: "none", boxSizing: "border-box", fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const focusIn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = C.primary);
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.currentTarget.style.borderColor = C.border);

function Skeleton() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "2rem" }}>
      {[200, 140, 100].map((h, i) => (
        <div key={i} style={{
          height: `${h}px`, borderRadius: "14px", marginBottom: "1rem",
          background: "linear-gradient(90deg,#EDE8E0 25%,#E4DED6 50%,#EDE8E0 75%)",
          backgroundSize: "200% 100%", animation: "shimmer 1.4s infinite",
          animationDelay: `${i * 0.15}s`,
        }} />
      ))}
      <style>{`@keyframes shimmer { to { background-position: -200% 0; } }`}</style>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ textAlign: "center" }}>
        <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>🎭</span>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.4rem", fontWeight: 900, color: C.dark, marginBottom: "0.5rem" }}>Creator Not Found</h2>
        <p style={{ color: C.muted, marginBottom: "1.5rem", fontSize: "0.875rem" }}>This profile may have been removed.</p>
        <Link href="/creators" style={{ background: C.primary, color: "#FAF8F5", padding: "0.7rem 1.5rem", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem" }}>
          Browse All Creators →
        </Link>
      </div>
    </div>
  );
}

export default function CreatorDetail({ id }: { id: string }) {
  const { user } = useUser();

  const [creator,          setCreator]          = useState<Creator | null>(null);
  const [profile,          setProfile]          = useState<Profile | null>(null);
  const [loading,          setLoading]          = useState(true);
  const [notFound,         setNotFound]         = useState(false);
  const [userPhone,        setUserPhone]        = useState<string | null>(null);
  const [phoneLoading,     setPhoneLoading]     = useState(true);
  const [checkingExisting, setCheckingExisting] = useState(false);

  const [eventDate,  setEventDate]  = useState("");
  const [occasion,   setOccasion]   = useState("");
  const [location,   setLocation]   = useState("");
  const [budget,     setBudget]     = useState("");
  const [note,       setNote]       = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [requestId,  setRequestId]  = useState<string | null>(null);
  const [bookingReq, setBookingReq] = useState<BookingRequest | null>(null);
  const [paying,     setPaying]     = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Load creator + profile
  useEffect(() => {
    async function load() {
      const sb = createClient();
      const { data: c, error } = await sb.from("creators").select("*").eq("id", id).single();
      if (error || !c) { setNotFound(true); setLoading(false); return; }
      setCreator(c);
      const { data: p } = await sb.from("profiles")
        .select("id, full_name, phone, city").eq("id", c.profile_id).single();
      setProfile(p ?? null);
      setLoading(false);
    }
    load();
  }, [id]);

  // Fetch user's own phone from their profile
  useEffect(() => {
    if (!user) { setPhoneLoading(false); return; }
    async function fetchUserPhone() {
      const sb = createClient();
      const { data } = await sb.from("profiles").select("phone").eq("id", user!.id).single();
      setUserPhone(data?.phone ?? null);
      setPhoneLoading(false);
    }
    fetchUserPhone();
  }, [user]);

  // Check if user already has an active request for this creator
  useEffect(() => {
    if (!creator || !userPhone || userPhone.length !== 10) return;
    async function checkExisting() {
      setCheckingExisting(true);
      const sb = createClient();
      const { data } = await sb
        .from("booking_requests")
        .select("id, status, agreed_price, advance_percent, creator_id")
        .eq("creator_id", creator!.id)
        .eq("requester_phone", userPhone!.trim())
        .in("status", ["pending", "accepted"])
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setBookingReq(data as BookingRequest);
        setRequestId(data.id);
        setSubmitted(true);
      }
      setCheckingExisting(false);
    }
    checkExisting();
  }, [creator, userPhone]);

  // Poll for status updates
  useEffect(() => {
    if (!requestId) return;
    const interval = setInterval(async () => {
      const sb = createClient();
      const { data } = await sb.from("booking_requests")
        .select("id, status, agreed_price, advance_percent, creator_id")
        .eq("id", requestId).single();
      if (data) setBookingReq(data as BookingRequest);
    }, 15000);
    return () => clearInterval(interval);
  }, [requestId]);

  async function handleSubmit() {
  if (!creator || !userPhone || submitting) return;
  setSubmitting(true);
  setSubmitted(true); // ← PEHLE set karo, await se pehle

  const sb = createClient();
  const { data } = await sb.from("booking_requests").insert({
    creator_id:      creator.id,
    requester_id:    user!.id,        // ← add this to link request to user
    requester_phone: userPhone.trim(),
    occasion_type:   occasion,
    event_date:      eventDate,
    location:        location.trim(),
    budget:          budget.trim() || null,
    note:            note.trim() || null,
    status:          "pending",
  }).select("id").single();

  setSubmitting(false);
  if (data?.id) setRequestId(data.id);
  // bookingReq null hai toh "pending" panel dikhega submitted=true se
  setBookingReq({ id: data!.id, status: "pending", agreed_price: null, advance_percent: null, creator_id: creator.id });
}

  async function handlePay() {
    if (!bookingReq?.agreed_price) return;
    setPaying(true);
    const advancePct = bookingReq.advance_percent ?? creator?.advance_percent ?? 50;
    const advanceAmt = Math.round((bookingReq.agreed_price * advancePct) / 100);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/create-order/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ booking_request_id: bookingReq.id, amount: advanceAmt }),
    });
    const order = await res.json();
    setPaying(false);
    const options = {
      key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount:      order.amount,
      currency:    "INR",
      name:        "CultureJeevan",
      description: `Advance for ${profile?.full_name ?? "Creator"}`,
      order_id:    order.razorpay_order_id,
      handler: async (response: Record<string, string>) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...response, booking_request_id: bookingReq.id }),
        });
        setBookingReq((prev) => prev ? { ...prev, status: "paid" } : prev);
      },
      prefill: { contact: userPhone },
      theme:   { color: C.primary },
    };
    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  if (loading || phoneLoading || checkingExisting) return <Skeleton />;
  if (notFound || !creator) return <NotFound />;

  const occasions  = (() => {
    const base = creator.occasion_types?.length ? creator.occasion_types : ALL_OCCASIONS;
    return base.includes("Other") ? base : [...base, "Other"];
  })();

  const hasPhone   = userPhone && userPhone.length === 10;
  const isValid    = eventDate && occasion && location.trim().length > 1 && !!hasPhone;
  const advancePct = bookingReq?.advance_percent ?? creator.advance_percent ?? 50;
  const advanceAmt = bookingReq?.agreed_price
    ? Math.round((bookingReq.agreed_price * advancePct) / 100) : null;

  // ── No phone in profile — block booking ──
  const noPhonePanel = (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.6rem" }}>📱</span>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 900, color: C.dark, marginBottom: "0.35rem" }}>Phone number required</h3>
      <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.65, marginBottom: "1rem" }}>
        Add your phone number to your profile before sending a booking request. This ensures the creator can reach you and keeps your booking history consistent.
      </p>
      <Link href="/profile" style={{ display: "block", padding: "0.75rem", background: C.primary, color: "#FAF8F5", borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
        Go to Profile → Add Phone
      </Link>
    </div>
  );

  // ── Not logged in ──
  const notLoggedInPanel = (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.6rem" }}>🔐</span>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 900, color: C.dark, marginBottom: "0.35rem" }}>Sign in to book</h3>
      <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.65, marginBottom: "1rem" }}>
        Create a free account or sign in to send a booking request.
      </p>
      <Link href="/sign-in" style={{ display: "block", padding: "0.75rem", background: C.primary, color: "#FAF8F5", borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
        Sign In / Sign Up →
      </Link>
    </div>
  );

  // ── Right panel ──
  const rightPanel = !user ? notLoggedInPanel

  : !hasPhone ? noPhonePanel

  : bookingReq?.status === "paid" ? (
    <div style={{ background: "#EFF6EE", border: "1px solid #C3E0BF", borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.6rem" }}>🎉</span>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: C.dark, marginBottom: "0.35rem" }}>Booking Confirmed!</h3>
      <p style={{ fontSize: "0.82rem", color: "#3A6B35", lineHeight: 1.65, marginBottom: "1rem" }}>
        Advance paid. Share your OTP with the creator on the event day.
      </p>
      <Link href="/my-bookings" style={{ display: "block", padding: "0.75rem", background: C.primary, color: "#FAF8F5", borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
        View My Bookings →
      </Link>
    </div>

  ) : bookingReq?.status === "accepted" && bookingReq.agreed_price ? (
    <div style={{ background: "#fff", border: `1.5px solid ${C.primary}`, borderRadius: "14px", padding: "1.5rem" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 700, color: C.primary, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Request Accepted ✓</p>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: C.dark, marginBottom: "0.75rem" }}>
        {profile?.full_name ?? "Creator"} has set a price
      </h3>
      <div style={{ display: "flex", justifyContent: "space-between", background: C.surface, borderRadius: "9px", padding: "0.75rem 0.9rem", marginBottom: "0.75rem" }}>
        <div>
          <p style={{ ...labelStyle, marginBottom: "0.15rem" }}>Total Agreed</p>
          <p style={{ fontSize: "1.15rem", fontWeight: 800, color: C.dark, margin: 0 }}>₹{bookingReq.agreed_price.toLocaleString("en-IN")}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ ...labelStyle, marginBottom: "0.15rem" }}>Advance ({advancePct}%)</p>
          <p style={{ fontSize: "1.15rem", fontWeight: 800, color: C.primary, margin: 0 }}>₹{advanceAmt?.toLocaleString("en-IN")}</p>
        </div>
      </div>
      <p style={{ fontSize: "0.72rem", color: C.muted, marginBottom: "0.85rem", lineHeight: 1.55 }}>
        Remaining ₹{(bookingReq.agreed_price - (advanceAmt ?? 0)).toLocaleString("en-IN")} paid directly on the day — cash or UPI.
      </p>
      <button onClick={handlePay} disabled={paying} style={{ width: "100%", padding: "0.8rem", border: "none", borderRadius: "9px", fontSize: "0.9rem", fontWeight: 700, cursor: paying ? "not-allowed" : "pointer", background: paying ? "#E2DAD0" : C.primary, color: paying ? C.subtle : "#FAF8F5", fontFamily: "inherit", boxShadow: paying ? "none" : "0 4px 14px rgba(196,112,58,0.25)", transition: "background 0.2s" }}>
        {paying ? "Opening Payment…" : `Pay ₹${advanceAmt?.toLocaleString("en-IN")} Advance →`}
      </button>
    </div>

  ) : bookingReq?.status === "declined" ? (
    <div style={{ background: "#FFF5F5", border: "1px solid #F5C6C6", borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
      <span style={{ fontSize: "1.75rem", display: "block", marginBottom: "0.6rem" }}>😔</span>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.1rem", fontWeight: 900, color: C.dark, marginBottom: "0.35rem" }}>Request Declined</h3>
      <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.65, marginBottom: "1rem" }}>This creator couldn't take your booking. Try another creator.</p>
      <Link href="/creators" style={{ display: "block", padding: "0.75rem", background: C.primary, color: "#FAF8F5", borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
        Browse Other Creators →
      </Link>
    </div>

  ) : submitted && bookingReq?.status === "pending" ? (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.5rem", textAlign: "center" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", margin: "0 auto 0.75rem" }}>⏳</div>
      <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 900, color: C.dark, marginBottom: "0.35rem" }}>Request Sent!</h3>
      <p style={{ fontSize: "0.82rem", color: C.muted, lineHeight: 1.65, marginBottom: "0.6rem" }}>
        <strong style={{ color: C.dark }}>{profile?.full_name ?? "The creator"}</strong> will review and set a price within 24 hours. This page updates automatically.
      </p>
      <div style={{ background: C.cream, border: "1px solid #F0DCC8", borderRadius: "8px", padding: "0.5rem 0.8rem", marginBottom: "1rem" }}>
        <p style={{ fontSize: "0.72rem", color: "#8B4513", margin: 0, lineHeight: 1.6 }}>
          🔒 One active request per creator. Come back here to pay once they set a price.
        </p>
      </div>
      <Link href="/my-bookings" style={{ display: "block", padding: "0.75rem", background: C.surface, color: C.dark, borderRadius: "9px", textDecoration: "none", fontWeight: 700, fontSize: "0.875rem", textAlign: "center" }}>
        View My Bookings
      </Link>
    </div>

  ) : (
    // Booking form
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "1.25rem", boxShadow: "0 2px 16px rgba(196,112,58,0.06)" }}>
      <p style={{ fontSize: "0.58rem", fontWeight: 700, color: C.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Send a Booking Request</p>
      <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 900, color: C.dark, margin: "0 0 1rem" }}>Tell us about your event</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "0.7rem" }}>
        <div>
          <label style={labelStyle}>Event Date *</label>
          <input type="date" min={today} value={eventDate} onChange={e => setEventDate(e.target.value)} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
        <div>
          <label style={labelStyle}>Location *</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Venue, area, city" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
        </div>
      </div>

      <div style={{ marginBottom: "0.7rem" }}>
        <label style={labelStyle}>Occasion *</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
          {occasions.map(occ => (
            <button key={occ} onClick={() => setOccasion(occ)} style={{ padding: "0.25rem 0.6rem", borderRadius: "100px", border: `1.5px solid ${occasion === occ ? C.primary : C.border}`, fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", background: occasion === occ ? C.cream : C.bg, color: occasion === occ ? C.primary : C.muted, transition: "all 0.15s", fontFamily: "inherit" }}>
              {OCCASION_ICONS[occ] ?? "🎪"} {occ}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "0.7rem" }}>
        <label style={labelStyle}>Budget (Optional)</label>
        <input type="text" value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. ₹5k – ₹10k" style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
      </div>

      {/* Phone — readonly, from profile */}
      <div style={{ marginBottom: "0.7rem" }}>
        <label style={labelStyle}>Your Phone</label>
        <div style={{ ...inputStyle, background: "#F5EFE7", color: C.muted, cursor: "not-allowed", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span>{userPhone}</span>
          <Link href="/profile" style={{ fontSize: "0.65rem", color: C.primary, textDecoration: "none", fontWeight: 600 }}>Edit in profile →</Link>
        </div>
      </div>

      <div style={{ marginBottom: "0.85rem" }}>
        <label style={labelStyle}>Note (Optional)</label>
        <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Specific requirements, references, mood..." style={{ ...inputStyle, resize: "none", lineHeight: 1.55 }} onFocus={focusIn} onBlur={focusOut} />
      </div>

      <div style={{ background: C.cream, border: "1px solid #F0DCC8", borderRadius: "8px", padding: "0.5rem 0.8rem", marginBottom: "0.85rem" }}>
        <p style={{ fontSize: "0.72rem", color: "#8B4513", lineHeight: 1.6, margin: 0 }}>
          💳 <strong>No payment now.</strong> Creator sets the price after accepting — you pay then.
        </p>
      </div>

      <button onClick={handleSubmit} disabled={!isValid || submitting} style={{ width: "100%", padding: "0.8rem", border: "none", borderRadius: "9px", fontSize: "0.9rem", fontWeight: 700, cursor: isValid && !submitting ? "pointer" : "not-allowed", background: isValid && !submitting ? C.primary : "#E2DAD0", color: isValid && !submitting ? "#FAF8F5" : C.subtle, fontFamily: "inherit", boxShadow: isValid ? "0 4px 14px rgba(196,112,58,0.25)" : "none", transition: "background 0.2s" }}>
        {submitting ? "Sending…" : "Send Booking Request →"}
      </button>
      <p style={{ fontSize: "0.62rem", color: C.subtle, textAlign: "center", marginTop: "0.55rem" }}>No payment now · Creator responds within 24 hrs</p>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem 1.5rem 0" }}>
        <Link href="/creators" style={{ fontSize: "0.78rem", color: C.subtle, textDecoration: "none" }}>← Creators</Link>
      </div>

      <div className="creator-layout" style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.25rem 1.5rem 3rem" }}>

        <div className="creator-left">
          <div style={{ display: "inline-flex", alignItems: "center", background: C.cream, border: "1px solid #F0DCC8", borderRadius: "100px", padding: "0.2rem 0.7rem", fontSize: "0.7rem", fontWeight: 700, color: C.primary, marginBottom: "0.5rem" }}>
            {creator.category}{creator.sub_category ? ` · ${creator.sub_category}` : ""}
          </div>

          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.75rem, 2.5vw, 2.4rem)", fontWeight: 900, color: C.dark, margin: "0 0 0.35rem", lineHeight: 1.15 }}>
            {profile?.full_name ?? "Creator"}
          </h1>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", fontSize: "0.8rem", color: C.muted, marginBottom: "0.85rem" }}>
            {profile?.city      && <span>📍 {profile.city}</span>}
            {creator.experience && <span>· {creator.experience}</span>}
          </div>

          {(creator.creator_description ?? creator.bio) && (
            <p style={{ fontSize: "0.875rem", color: "#5C4A3A", lineHeight: 1.75, margin: "0 0 1rem" }}>
              {creator.creator_description ?? creator.bio}
            </p>
          )}

          <div style={{ height: "1px", background: C.border, margin: "0.85rem 0" }} />

          <p style={{ ...labelStyle, marginBottom: "0.6rem" }}>How It Works</p>
          {[
            { n: "01", text: "Send your event details — no payment yet" },
            { n: "02", text: "Creator accepts and sets the price within 24 hrs" },
            { n: "03", text: "You pay the advance — booking confirmed" },
            { n: "04", text: "Share OTP on event day → advance released to creator" },
          ].map(s => (
            <div key={s.n} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", marginBottom: "0.45rem" }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: "0.68rem", fontWeight: 900, color: C.primary, opacity: 0.5, flexShrink: 0, paddingTop: "0.1rem" }}>{s.n}</span>
              <span style={{ fontSize: "0.8rem", color: "#5C4A3A", lineHeight: 1.6 }}>{s.text}</span>
            </div>
          ))}

          <div style={{ height: "1px", background: C.border, margin: "0.85rem 0" }} />

          <p style={{ ...labelStyle, marginBottom: "0.5rem" }}>Cancellation Policy</p>
          {[
            { dot: "🟢", text: "Full refund if cancelled 5+ days before event" },
            { dot: "🔴", text: "No refund less than 5 days before" },
            { dot: "🟠", text: "Creator no-show → payment returned in T+2 days" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "0.4rem", fontSize: "0.78rem", color: "#6B5240", alignItems: "flex-start", marginBottom: "0.25rem" }}>
              <span style={{ flexShrink: 0 }}>{item.dot}</span>{item.text}
            </div>
          ))}
        </div>

        <div className="creator-right">
          {rightPanel}
        </div>

      </div>

      <style>{`
        .creator-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        .creator-left  { order: 2; }
        .creator-right { order: 1; }

        @media (min-width: 768px) {
          .creator-layout {
            grid-template-columns: 5fr 4fr;
            gap: 2.5rem;
            align-items: start;
          }
          .creator-left {
            order: 1;
            position: sticky;
            top: 80px;
          }
          .creator-right { order: 2; }
        }
        @keyframes shimmer { to { background-position: -200% 0; } }
      `}</style>
    </div>
  );
}