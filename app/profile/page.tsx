"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { loadProfile, saveProfile } from "./actions";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  pricePerDay: string;
  pricePerHour: string;
  condition: string;
  description: string;
}

export interface SpaceItem {
  id: string;
  spaceName: string;
  spaceType: string;
  addressLine1: string;
  addressArea: string;
  addressCity: string;
  pincode: string;
  googleMapsUrl: string;
  hourlyRate: string;
  halfDayRate: string;
  fullDayRate: string;
  capacity: string;
  minBookingHours: string;
  amenities: string[];
  spaceRules: string;
  spaceDescription: string;
}

export interface ProfileData {
  phone: string;
  city: string;
  bio: string;
  instagramHandle: string;
  portfolioUrl: string;
  isCreator: boolean;
  creatorCategory: string;
  startingPrice: string;
  experience: string;
  languages: string;
  isSpace: boolean;
  spaces: SpaceItem[];
  isEquipment: boolean;
  equipmentPhone: string;
  equipmentAddressLine: string;
  equipmentArea: string;
  equipmentCity: string;
  equipmentPincode: string;
  equipment: EquipmentItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CITIES = ["Lucknow", "Kanpur", "Noida", "Ghaziabad", "Delhi", "Agra", "Prayagraj", "Other"];

const CREATOR_CATEGORIES = [
  "Photographer", "Videographer", "Cinematographer", "Drone Pilot",
  "Singer", "Musician", "Tabla Player", "Flautist", "Pianist", "Guitarist",
  "Sound Engineer", "Podcast Host", "Stand-up Comedian", "Poet",
  "Storyteller", "Spoken Word Artist", "Anchor / Emcee", "Voice-over Artist",
  "Video Editor", "Motion Designer", "Colorist", "Art Director",
  "Set Designer", "Prop Stylist", "Costume Designer", "Makeup Artist",
  "Lighting Professional", "Gaffer", "Grip Crew", "Production Assistant", "Other",
];

const SPACE_TYPES = [
  "Photography Studio", "Film Studio", "Dance Studio", "Recording Studio",
  "Podcast Booth", "Aesthetic Café", "Rooftop Studio", "Reel Space",
  "Co-working Space", "Event Venue", "Other",
];

const AMENITIES_LIST = [
  "WiFi", "AC", "Natural Light", "Parking", "Changing Room",
  "Makeup Station", "Green Screen", "Cyclorama Wall", "Lounge Area",
  "Projector / Screen", "Soundproofing", "Kitchen / Pantry", "Rooftop Access",
  "Backup Power", "Continuous Power", "Props Available", "Tripod / Stand",
  "Ring Light", "Backdrop Stand", "Coffee / Tea", "Elevator Access",
];

const EXPERIENCE_OPTIONS = [
  "Less than 1 year", "1–2 years", "3–5 years", "5–10 years", "10+ years",
];

const EQUIPMENT_CATEGORIES = [
  "Camera Body", "Lens", "Drone", "Lighting", "Audio / Mic",
  "Tripod / Stabiliser", "Monitor", "Memory / Storage",
  "Power / Battery", "Backdrop / Props", "Other",
];

const CONDITION_OPTIONS = ["Brand New", "Like New", "Good", "Fair"];

const EMPTY_EQUIPMENT = (): EquipmentItem => ({
  id: Math.random().toString(36).slice(2),
  name: "", brand: "", category: "",
  pricePerDay: "", pricePerHour: "",
  condition: "", description: "",
});

const EMPTY_SPACE = (): SpaceItem => ({
  id: Math.random().toString(36).slice(2),
  spaceName: "", spaceType: "",
  addressLine1: "", addressArea: "", addressCity: "", pincode: "", googleMapsUrl: "",
  hourlyRate: "", halfDayRate: "", fullDayRate: "",
  capacity: "", minBookingHours: "",
  amenities: [], spaceRules: "", spaceDescription: "",
});

const INITIAL_DATA: ProfileData = {
  phone: "", city: "", bio: "", instagramHandle: "", portfolioUrl: "",
  isCreator: false, creatorCategory: "", startingPrice: "", experience: "", languages: "",
  isSpace: false, spaces: [],
  isEquipment: false, equipmentPhone: "", equipmentAddressLine: "",
  equipmentArea: "", equipmentCity: "", equipmentPincode: "",
  equipment: [],
};

// ─── Phone validation ─────────────────────────────────────────────────────────
// Must start with 6–9 and be exactly 10 digits (Indian mobile)
const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.trim());

// ─── Shared styles ────────────────────────────────────────────────────────────

const SELECT_ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%239B7B60' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`;

const baseInput: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  borderRadius: "8px",
  border: "1.5px solid #E8DED0",
  background: "#FAF7F2",
  color: "#1C1410",
  fontSize: "0.875rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const lbl: React.CSSProperties = {
  display: "block",
  fontSize: "0.68rem",
  fontWeight: 700,
  color: "#9B7B60",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginBottom: "0.35rem",
};

// ─── Field ────────────────────────────────────────────────────────────────────

function F({
  label, value, onChange, type = "text", placeholder = "",
  as = "input", required = false, readOnly = false, hint, children, min, error,
}: {
  label: string; value: string; onChange?: (v: string) => void;
  type?: string; placeholder?: string;
  as?: "input" | "textarea" | "select";
  required?: boolean; readOnly?: boolean;
  hint?: string; children?: React.ReactNode;
  min?: string; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;
  const bc = hasError ? "#C0392B" : focused ? "#C4703A" : "#E8DED0";
  const h = { onFocus: () => setFocused(true), onBlur: () => setFocused(false) };

  const handleChange = (raw: string) => {
    if (!onChange) return;
    if (type === "number") {
      const num = parseFloat(raw);
      if (raw !== "" && num < 0) return;
    }
    onChange(raw);
  };

  return (
    <div>
      <label style={lbl}>{label}{required && <span style={{ color: "#C4703A" }}> *</span>}</label>
      {as === "select" ? (
        <select value={value} onChange={(e) => onChange?.(e.target.value)} {...h}
          style={{ ...baseInput, border: `1.5px solid ${bc}`, cursor: "pointer", appearance: "none", backgroundImage: SELECT_ARROW, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", paddingRight: "2rem" }}>
          {children}
        </select>
      ) : as === "textarea" ? (
        <textarea value={value} onChange={(e) => handleChange(e.target.value)} {...h}
          placeholder={placeholder} rows={3}
          style={{ ...baseInput, border: `1.5px solid ${bc}`, resize: "vertical", lineHeight: 1.65 }} />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          {...h}
          placeholder={placeholder}
          readOnly={readOnly}
          min={type === "number" ? (min ?? "0") : undefined}
          style={{ ...baseInput, border: `1.5px solid ${bc}`, ...(readOnly ? { background: "#F0EAE2", color: "#7A5C42", cursor: "not-allowed" } : {}) }}
        />
      )}
      {hasError && (
        <p style={{ fontSize: "0.68rem", color: "#C0392B", margin: "0.3rem 0 0", lineHeight: 1.4, fontWeight: 600 }}>
          {error}
        </p>
      )}
      {!hasError && hint && (
        <p style={{ fontSize: "0.68rem", color: "#9B7B60", margin: "0.3rem 0 0", lineHeight: 1.4 }}>{hint}</p>
      )}
    </div>
  );
}

// ─── CitySelect ───────────────────────────────────────────────────────────────

function CitySelect({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={lbl}>City{required && <span style={{ color: "#C4703A" }}> *</span>}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ ...baseInput, border: `1.5px solid ${focused ? "#C4703A" : "#E8DED0"}`, cursor: "pointer", appearance: "none", backgroundImage: SELECT_ARROW, backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", paddingRight: "2rem" }}>
        <option value="">Select city</option>
        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function Section({ icon, title, accent = false, action, children }: {
  icon: string; title: string; accent?: boolean; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div style={{ background: "#FFFFFF", border: `1px solid ${accent ? "rgba(196,112,58,0.25)" : "#E8DED0"}`, borderRadius: "16px", overflow: "hidden", marginBottom: "1rem" }}>
      <div style={{ padding: "0.8rem 1.5rem", borderBottom: `1px solid ${accent ? "rgba(196,112,58,0.12)" : "#F0E8DC"}`, background: accent ? "rgba(196,112,58,0.03)" : "#FDFAF7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          <span style={{ fontSize: "0.95rem" }}>{icon}</span>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: accent ? "#C4703A" : "#7A5C42", letterSpacing: "0.1em", textTransform: "uppercase" }}>{title}</span>
        </div>
        {action}
      </div>
      <div style={{ padding: "1.25rem 1.5rem" }}>{children}</div>
    </div>
  );
}

// ─── Row ─────────────────────────────────────────────────────────────────────

function Row({ cols = 3, gap = "0.875rem", mb = "0.875rem", children }: {
  cols?: number; gap?: string; mb?: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, marginBottom: mb }}>
      {children}
    </div>
  );
}

// ─── SubBox ───────────────────────────────────────────────────────────────────

function SubBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#FAF7F2", borderRadius: "10px", padding: "1rem 1.1rem", marginBottom: "0.875rem", border: "1px solid #F0E8DC" }}>
      <p style={{ ...lbl, marginBottom: "0.75rem" }}>{label}</p>
      {children}
    </div>
  );
}

// ─── TogglePill ───────────────────────────────────────────────────────────────

function TogglePill({ checked, onChange, icon, label, sub, disabled, disabledReason }: {
  checked: boolean; onChange: (v: boolean) => void; icon: string; label: string; sub: string;
  disabled?: boolean; disabledReason?: string;
}) {
  return (
    <div style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        title={disabled ? disabledReason : undefined}
        style={{
          display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.9rem 1.1rem",
          borderRadius: "12px", cursor: disabled ? "not-allowed" : "pointer",
          border: checked ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
          background: disabled ? "#F5F0EA" : checked ? "rgba(196,112,58,0.05)" : "#FDFAF7",
          transition: "all 0.2s", textAlign: "left", width: "100%",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span style={{ width: "38px", height: "38px", borderRadius: "9px", flexShrink: 0, background: checked ? "rgba(196,112,58,0.12)" : "#F0E8DC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{icon}</span>
        <div style={{ flex: 1, textAlign: "left" }}>
          <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1C1410", margin: "0 0 0.12rem" }}>{label}</p>
          <p style={{ fontSize: "0.73rem", color: "#9B7B60", margin: 0, lineHeight: 1.35 }}>{sub}</p>
        </div>
        <div style={{ width: "38px", height: "21px", borderRadius: "100px", flexShrink: 0, background: checked ? "#C4703A" : "#E8DED0", position: "relative", transition: "background 0.2s" }}>
          <div style={{ position: "absolute", top: "2.5px", left: checked ? "19px" : "2.5px", width: "16px", height: "16px", borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }} />
        </div>
      </button>
      {disabled && (
        <p style={{ fontSize: "0.65rem", color: "#C0392B", margin: "0.3rem 0 0 0.2rem", fontWeight: 600 }}>
          {disabledReason}
        </p>
      )}
    </div>
  );
}

// ─── EquipmentCard ────────────────────────────────────────────────────────────

function EquipmentCard({
  item, index, onChange, onRemove,
}: {
  item: EquipmentItem; index: number;
  onChange: (id: string, key: keyof EquipmentItem, val: string) => void;
  onRemove: (id: string) => void;
}) {
  const upd = (key: keyof EquipmentItem) => (val: string) => onChange(item.id, key, val);
  return (
    <div style={{ background: "#FDFAF7", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1rem 1.1rem", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#C4703A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Item {index + 1}
        </span>
        <button type="button" onClick={() => onRemove(item.id)} style={{
          background: "none", border: "1px solid #E8DED0", borderRadius: "6px",
          color: "#9B7B60", fontSize: "0.72rem", fontWeight: 600,
          padding: "0.2rem 0.55rem", cursor: "pointer",
        }}>Remove</button>
      </div>
      <Row cols={3} mb="0.75rem">
        <F label="Equipment Name" value={item.name} onChange={upd("name")} placeholder="e.g. Sony A7 III" required />
        <F label="Brand" value={item.brand} onChange={upd("brand")} placeholder="e.g. Sony, Canon, DJI" />
        <F label="Category" value={item.category} onChange={upd("category")} as="select" required>
          <option value="">Select category</option>
          {EQUIPMENT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </F>
      </Row>
      <Row cols={3} mb="0.75rem">
        <F label="Price / Day (₹)" value={item.pricePerDay} onChange={upd("pricePerDay")} type="number" placeholder="e.g. 1500" required />
        <F label="Price / Hour (₹)" value={item.pricePerHour} onChange={upd("pricePerHour")} type="number" placeholder="e.g. 300" />
        <F label="Condition" value={item.condition} onChange={upd("condition")} as="select">
          <option value="">Select condition</option>
          {CONDITION_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
        </F>
      </Row>
      <F label="Description / Specs" value={item.description} onChange={upd("description")}
        as="textarea" placeholder="e.g. Comes with 2 batteries, SD card, original bag. Full-frame mirrorless body." />
    </div>
  );
}

// ─── SpaceCard ────────────────────────────────────────────────────────────────

function SpaceCard({
  item, index, onChange, onRemove,
}: {
  item: SpaceItem; index: number;
  onChange: (id: string, key: keyof SpaceItem, val: string | string[]) => void;
  onRemove: (id: string) => void;
}) {
  const upd = (key: keyof SpaceItem) => (val: string) => onChange(item.id, key, val);
  const toggleAmenity = (a: string) =>
    onChange(item.id, "amenities",
      item.amenities.includes(a)
        ? item.amenities.filter((x) => x !== a)
        : [...item.amenities, a]
    );

  return (
    <div style={{ background: "#FDFAF7", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1rem 1.1rem", position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#C4703A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Space {index + 1}{item.spaceName ? ` — ${item.spaceName}` : ""}
        </span>
        <button type="button" onClick={() => onRemove(item.id)} style={{
          background: "none", border: "1px solid #E8DED0", borderRadius: "6px",
          color: "#9B7B60", fontSize: "0.72rem", fontWeight: 600,
          padding: "0.2rem 0.55rem", cursor: "pointer",
        }}>Remove</button>
      </div>

      <Row cols={3} mb="0.875rem">
        <F label="Space Name" value={item.spaceName} onChange={upd("spaceName")} placeholder="e.g. Lumina Photography Studio" required />
        <F label="Space Type" value={item.spaceType} onChange={upd("spaceType")} as="select" required>
          <option value="">Select type</option>
          {SPACE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
        </F>
        <F label="Max Capacity (people)" value={item.capacity} onChange={upd("capacity")} type="number" placeholder="e.g. 10" />
      </Row>

      <SubBox label="📍 Address *">
        <Row cols={3} mb="0.75rem">
          <F label="Street / Building" value={item.addressLine1} onChange={upd("addressLine1")} placeholder="e.g. 12A, MG Road" required />
          <F label="Area / Locality" value={item.addressArea} onChange={upd("addressArea")} placeholder="e.g. Hazratganj" required />
          <CitySelect value={item.addressCity} onChange={(v) => onChange(item.id, "addressCity", v)} required />
        </Row>
        <Row cols={2} mb="0">
          <F label="Pincode" value={item.pincode} onChange={upd("pincode")} placeholder="e.g. 226001" type="number" required />
          <F label="Google Maps Link" value={item.googleMapsUrl} onChange={upd("googleMapsUrl")} placeholder="Paste share link from Google Maps" hint="Clients see this before arriving" />
        </Row>
      </SubBox>

      <SubBox label="💰 Pricing (₹) *">
        <Row cols={3} mb="0.75rem">
          <F label="Per Hour" value={item.hourlyRate} onChange={upd("hourlyRate")} type="number" placeholder="e.g. 1200" required />
          <F label="Half Day (4 hrs)" value={item.halfDayRate} onChange={upd("halfDayRate")} type="number" placeholder="e.g. 4000" />
          <F label="Full Day (8 hrs)" value={item.fullDayRate} onChange={upd("fullDayRate")} type="number" placeholder="e.g. 7000" />
        </Row>
        <Row cols={1} mb="0">
          <F label="Minimum Booking (hours)" value={item.minBookingHours} onChange={upd("minBookingHours")} type="number" placeholder="e.g. 2" hint="Minimum hours a client must book at once" />
        </Row>
      </SubBox>

      <Row cols={1} mb="0.875rem">
        <F label="Space Description" value={item.spaceDescription} onChange={upd("spaceDescription")} as="textarea"
          placeholder="What makes your space special — vibe, lighting, ideal use, what shoots it's perfect for..." />
      </Row>

      <div style={{ marginBottom: "0.875rem" }}>
        <label style={lbl}>Amenities</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.45rem" }}>
          {AMENITIES_LIST.map((a) => (
            <button key={a} type="button" onClick={() => toggleAmenity(a)} style={{
              padding: "0.28rem 0.7rem", borderRadius: "100px", fontSize: "0.73rem", fontWeight: 600, cursor: "pointer",
              border: item.amenities.includes(a) ? "1.5px solid #C4703A" : "1.5px solid #E8DED0",
              background: item.amenities.includes(a) ? "rgba(196,112,58,0.08)" : "#FFFFFF",
              color: item.amenities.includes(a) ? "#C4703A" : "#7A5C42", transition: "all 0.15s",
            }}>{a}</button>
          ))}
        </div>
      </div>

      <Row cols={1} mb="0">
        <F label="House Rules" value={item.spaceRules} onChange={upd("spaceRules")} as="textarea"
          placeholder="e.g. No footwear inside, No outside food, Music allowed till 9PM, No smoking on premises..."
          hint="Shown to clients before they confirm — sets clear expectations" />
      </Row>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string>("");

  const [data, setData] = useState<ProfileData>(INITIAL_DATA);

  useEffect(() => {
    loadProfile().then((saved) => {
      if (saved) setData(saved);
    }).finally(() => setLoading(false));
  }, []);

  // ── Phone change handler — validates and auto-disables toggles if invalid ──
  const handlePhoneChange = (value: string) => {
    // Strip non-digits for validation but store raw for UX
    const digits = value.replace(/\D/g, "");

    setData((prev) => {
      const phoneOk = isValidPhone(digits);
      // If phone becomes invalid and any listing toggle is on, force them off
      const shouldForceOff = !phoneOk && (prev.isCreator || prev.isSpace || prev.isEquipment);
      return {
        ...prev,
        phone: digits, // store only digits
        ...(shouldForceOff ? { isCreator: false, isSpace: false, isEquipment: false } : {}),
      };
    });

    if (digits.length === 0) {
      setPhoneError("");
    } else if (digits.length < 10) {
      setPhoneError("Phone number must be 10 digits.");
    } else if (!isValidPhone(digits)) {
      setPhoneError("Enter a valid Indian mobile number (starts with 6–9).");
    } else {
      setPhoneError("");
    }
  };

  // ── Toggle handler — blocks if phone invalid, auto-saves on toggle OFF ──
  const handleToggle = async (
    field: "isCreator" | "isSpace" | "isEquipment",
    currentValue: boolean
  ) => {
    const phoneOk = isValidPhone(data.phone);

    // Trying to turn ON without valid phone → block and show error
    if (!currentValue && !phoneOk) {
      setPhoneError(
        data.phone.length === 0
          ? "Add your phone number first — required to list."
          : "Enter a valid Indian mobile number (starts with 6–9)."
      );
      return;
    }

    const turningOff = currentValue; // they're toggling what was ON → turning it off
    const updated: ProfileData = { ...data, [field]: !currentValue };
    setData(updated);

    // If toggling OFF → immediately save to DB so listing disappears right away
    if (turningOff) {
      setSaving(true);
      setSaveError(null);
      const result = await saveProfile(updated);
      setSaving(false);
      if (result?.error) {
        setSaveError(result.error);
        // Revert the toggle if save failed
        setData((prev) => ({ ...prev, [field]: currentValue }));
      }
    }
  };

  const set = (key: keyof ProfileData) => (v: string | boolean) =>
    setData((p) => ({ ...p, [key]: v }));

  // ── Space helpers ──
  const addSpace = () =>
    setData((p) => ({ ...p, spaces: [...p.spaces, EMPTY_SPACE()] }));

  const removeSpace = (id: string) =>
    setData((p) => ({ ...p, spaces: p.spaces.filter((s) => s.id !== id) }));

  const updateSpace = (id: string, key: keyof SpaceItem, val: string | string[]) =>
    setData((p) => ({
      ...p,
      spaces: p.spaces.map((s) => s.id === id ? { ...s, [key]: val } : s),
    }));

  // ── Equipment helpers ──
  const addEquipment = () =>
    setData((p) => ({ ...p, equipment: [...p.equipment, EMPTY_EQUIPMENT()] }));

  const removeEquipment = (id: string) =>
    setData((p) => ({ ...p, equipment: p.equipment.filter((e) => e.id !== id) }));

  const updateEquipment = (id: string, key: keyof EquipmentItem, val: string) =>
    setData((p) => ({ ...p, equipment: p.equipment.map((e) => e.id === id ? { ...e, [key]: val } : e) }));

  // ── Save ──
  const handleSave = async () => {
    // Block save if phone is present but invalid
    if (data.phone && !isValidPhone(data.phone)) {
      setPhoneError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setSaving(true);
    setSaveError(null);
    const result = await saveProfile(data);
    setSaving(false);
    if (result?.success) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else if (result?.error) {
      setSaveError(result.error);
    }
  };

  const phoneOk = isValidPhone(data.phone);
  const listingToggled = data.isCreator || data.isSpace || data.isEquipment;

  const checks = [
    !!data.bio,
    !!data.city,
    listingToggled ? phoneOk : true,
    data.isCreator ? !!(data.creatorCategory && data.startingPrice) : true,
    data.isSpace ? data.spaces.length > 0 && data.spaces.every(s => !!(s.spaceName && s.addressLine1 && s.hourlyRate)) : true,
    data.isEquipment ? !!(data.equipmentAddressLine && data.equipmentCity && data.equipmentPincode && data.equipment.length > 0) : true,
  ];
  const completion = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  const validationMsg = saveError
    ? `❌ ${saveError}`
    : listingToggled && !phoneOk
    ? "⚠️ Valid phone number required to be listed."
    : !data.bio
    ? "⚠️ Bio is required to book or be listed."
    : data.isSpace && data.spaces.length === 0
    ? "⚠️ Add at least one space."
    : data.isEquipment && data.equipment.length === 0
    ? "⚠️ Add at least one equipment item."
    : completion < 100
    ? "Fill required fields to go live."
    : "Profile is complete ✓";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#FAF7F2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid #E8DED0", borderTopColor: "#C4703A", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <p style={{ fontSize: "0.875rem", color: "#9B7B60", margin: 0 }}>Loading your profile…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* Topbar */}
      <div style={{ background: "#1C1410", padding: "0 2rem", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 40, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.05rem", fontWeight: 800, color: "#FAF7F2" }}>
            Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {data.isSpace && <Link href="/spaces/dashboard" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.45)", textDecoration: "none" }}>Space Dashboard →</Link>}
          {data.isCreator && <Link href="/creator-dashboard" style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(250,247,242,0.45)", textDecoration: "none" }}>Creator Dashboard →</Link>}
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#C4703A", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF7F2", fontWeight: 700, fontSize: "0.82rem" }}>
            {user?.firstName?.[0] ?? "U"}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "920px", margin: "0 auto", padding: "1.75rem 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ fontSize: "0.62rem", color: "rgba(196,112,58,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 0.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "18px", height: "1px", background: "rgba(196,112,58,0.4)" }} />
              Your Profile
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 3vw, 1.85rem)", fontWeight: 900, color: "#1C1410", margin: 0 }}>
              {user?.firstName ? `${user.firstName}'s Profile` : "My Profile"}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "#fff", border: "1px solid #E8DED0", borderRadius: "10px", padding: "0.55rem 1rem" }}>
            <div style={{ width: "72px", height: "4px", background: "#F0E8DC", borderRadius: "100px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${completion}%`, background: completion === 100 ? "#2E7D32" : "#C4703A", borderRadius: "100px", transition: "width 0.4s" }} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: completion === 100 ? "#2E7D32" : "#C4703A", whiteSpace: "nowrap" }}>{completion}% complete</span>
          </div>
        </div>

        {/* ── Identity ── */}
        <Section icon="🔒" title="Account Identity">
          <Row cols={3}>
            <F label="Full Name" value={user?.fullName ?? "—"} readOnly hint="From your login — cannot be changed here" />
            <F label="Email Address" value={user?.primaryEmailAddress?.emailAddress ?? "—"} readOnly hint="From your login — cannot be changed here" />
            <F
              label="Phone Number"
              value={data.phone}
              onChange={handlePhoneChange}
              type="tel"
              placeholder="9876543210"
              required={listingToggled}
              error={phoneError || undefined}
              hint={
                !phoneError
                  ? listingToggled
                    ? "Required to be listed — 10-digit Indian mobile"
                    : "Optional for bookers — 10-digit Indian mobile"
                  : undefined
              }
            />
          </Row>
        </Section>

        {/* ── About ── */}
        <Section icon="✏️" title="About You">
          <Row cols={3} mb="0.875rem">
            <CitySelect value={data.city} onChange={set("city")} required />
            <F label="Instagram" value={data.instagramHandle} onChange={set("instagramHandle")} placeholder="@yourhandle" />
            <F label="Portfolio / Website" value={data.portfolioUrl} onChange={set("portfolioUrl")} placeholder="https://yoursite.com" />
          </Row>
          <F label="Bio" value={data.bio} onChange={set("bio")} as="textarea" required
            placeholder="Tell people who you are — works whether you're here to book, create, or host. Required to do anything on CultureJeevan."
            hint="Required for everyone. Appears on your public profile and booking requests." />
        </Section>

        {/* ── Roles ── */}
        <Section icon="⚡" title="Your Roles">
          {/* Phone warning banner — shown when phone is missing/invalid */}
          {!phoneOk && (
            <div style={{
              display: "flex", alignItems: "flex-start", gap: "0.6rem",
              background: "rgba(192,57,43,0.06)", border: "1px solid rgba(192,57,43,0.2)",
              borderRadius: "10px", padding: "0.75rem 1rem", marginBottom: "1rem",
            }}>
              <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>🔒</span>
              <p style={{ fontSize: "0.75rem", color: "#C0392B", margin: 0, lineHeight: 1.5, fontWeight: 600 }}>
                Add a valid 10-digit phone number above before turning on any listing toggle. Without it, clients cannot reach you and your listing will not go live.
              </p>
            </div>
          )}
          <p style={{ fontSize: "0.78rem", color: "#7A5C42", margin: "0 0 0.875rem", lineHeight: 1.6 }}>
            Everyone can book by default. Toggle on to also list yourself — each unlocks a section below and a dedicated dashboard.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
            <TogglePill
              checked={data.isCreator}
              onChange={() => handleToggle("isCreator", data.isCreator)}
              icon="🎨"
              label="Creative Professional"
              sub="Photographer, Musician, Editor, Comedian, Poet etc."
              disabled={!data.isCreator && !phoneOk}
              disabledReason="Valid phone required to list"
            />
            <TogglePill
              checked={data.isSpace}
              onChange={() => handleToggle("isSpace", data.isSpace)}
              icon="🏛️"
              label="Space Owner"
              sub="Studio, Café, Rooftop, Podcast Booth — list for bookings"
              disabled={!data.isSpace && !phoneOk}
              disabledReason="Valid phone required to list"
            />
            <TogglePill
              checked={data.isEquipment}
              onChange={() => handleToggle("isEquipment", data.isEquipment)}
              icon="📷"
              label="Equipment Owner"
              sub="Camera, Lens, Lighting, Drone — rent out your gear"
              disabled={!data.isEquipment && !phoneOk}
              disabledReason="Valid phone required to list"
            />
          </div>

          {/* Auto-saving indicator */}
          {saving && (
            <p style={{ fontSize: "0.72rem", color: "#9B7B60", margin: "0.75rem 0 0", textAlign: "center" }}>
              Updating listing status…
            </p>
          )}
        </Section>

        {/* ── Creator Section ── */}
        {data.isCreator && (
          <Section icon="🎨" title="Creator Profile" accent
            action={<Link href="/creator-dashboard" style={{ fontSize: "0.7rem", fontWeight: 700, color: "#C4703A", textDecoration: "none" }}>Creator Dashboard →</Link>}>
            <Row cols={3} mb="0.875rem">
              <F label="Category" value={data.creatorCategory} onChange={set("creatorCategory")} as="select" required>
                <option value="">Select category</option>
                {CREATOR_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </F>
              <F label="Starting Price (₹)" value={data.startingPrice} onChange={set("startingPrice")} type="number" placeholder="e.g. 2500" required />
              <F label="Experience" value={data.experience} onChange={set("experience")} as="select">
                <option value="">Select years</option>
                {EXPERIENCE_OPTIONS.map((e) => <option key={e} value={e}>{e}</option>)}
              </F>
            </Row>
            <Row cols={1} mb="0">
              <F label="Languages you work in" value={data.languages} onChange={set("languages")} placeholder="e.g. Hindi, English, Urdu" hint="Helps clients find the right fit" />
            </Row>
          </Section>
        )}

        {/* ── Space Section ── */}
        {data.isSpace && (
          <Section icon="🏛️" title="Space Listings" accent
            action={<Link href="/spaces/dashboard" style={{ fontSize: "0.7rem", fontWeight: 700, color: "#C4703A", textDecoration: "none" }}>Space Dashboard →</Link>}>

            {data.spaces.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem", border: "1.5px dashed #E8DED0", borderRadius: "12px", marginBottom: "0.875rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🏛️</span>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#7A5C42", margin: "0 0 0.25rem" }}>No spaces listed yet</p>
                <p style={{ fontSize: "0.75rem", color: "#9B7B60", margin: 0 }}>Add your studio, café, rooftop, or any creative space below</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "0.875rem" }}>
                {data.spaces.map((space, i) => (
                  <SpaceCard key={space.id} item={space} index={i} onChange={updateSpace} onRemove={removeSpace} />
                ))}
              </div>
            )}

            <button type="button" onClick={addSpace} style={{
              width: "100%", padding: "0.7rem", borderRadius: "10px",
              border: "1.5px dashed #C4703A", background: "rgba(196,112,58,0.04)",
              color: "#C4703A", fontSize: "0.875rem", fontWeight: 700,
              cursor: "pointer", transition: "background 0.2s", display: "flex",
              alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}>
              + Add Space
            </button>

            <div style={{ marginTop: "1rem", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(196,112,58,0.05)", border: "1px solid rgba(196,112,58,0.15)", fontSize: "0.75rem", color: "#7A5C42", lineHeight: 1.6 }}>
              💡 Each space gets its own listing page. Clients can browse, compare, and book directly. You can manage availability and bookings from the Space Dashboard.
            </div>
          </Section>
        )}

        {/* ── Equipment Section ── */}
        {data.isEquipment && (
          <Section icon="📷" title="Equipment Listings" accent>
            <SubBox label="📍 Pickup / Collection Details *">
              <p style={{ fontSize: "0.75rem", color: "#7A5C42", margin: "0 0 0.875rem", lineHeight: 1.5 }}>
                Renters will coordinate pickup or delivery from this address. Your phone number (above) is also required.
              </p>
              <Row cols={3} mb="0.75rem">
                <F label="Street / Building" value={data.equipmentAddressLine} onChange={set("equipmentAddressLine")} placeholder="e.g. 4B, Aliganj Lane" required />
                <F label="Area / Locality" value={data.equipmentArea} onChange={set("equipmentArea")} placeholder="e.g. Aliganj" required />
                <CitySelect value={data.equipmentCity} onChange={set("equipmentCity")} required />
              </Row>
              <Row cols={2} mb="0">
                <F label="Pincode" value={data.equipmentPincode} onChange={set("equipmentPincode")} placeholder="e.g. 226022" type="number" required />
                <F label="Alternate Phone (optional)" value={data.equipmentPhone} onChange={set("equipmentPhone")} type="tel" placeholder="If different from account phone" />
              </Row>
            </SubBox>

            {data.equipment.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 1rem", border: "1.5px dashed #E8DED0", borderRadius: "12px", marginBottom: "0.875rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>📦</span>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#7A5C42", margin: "0 0 0.25rem" }}>No equipment listed yet</p>
                <p style={{ fontSize: "0.75rem", color: "#9B7B60", margin: 0 }}>Add your gear below — cameras, lenses, lighting, drones, audio and more</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "0.875rem" }}>
                {data.equipment.map((item, i) => (
                  <EquipmentCard key={item.id} item={item} index={i} onChange={updateEquipment} onRemove={removeEquipment} />
                ))}
              </div>
            )}

            <button type="button" onClick={addEquipment} style={{
              width: "100%", padding: "0.7rem", borderRadius: "10px",
              border: "1.5px dashed #C4703A", background: "rgba(196,112,58,0.04)",
              color: "#C4703A", fontSize: "0.875rem", fontWeight: 700,
              cursor: "pointer", transition: "background 0.2s", display: "flex",
              alignItems: "center", justifyContent: "center", gap: "0.4rem",
            }}>
              + Add Equipment Item
            </button>

            <div style={{ marginTop: "1rem", padding: "0.8rem 1rem", borderRadius: "10px", background: "rgba(196,112,58,0.05)", border: "1px solid rgba(196,112,58,0.15)", fontSize: "0.75rem", color: "#7A5C42", lineHeight: 1.6 }}>
              💡 All rentals are platform-protected. Always coordinate and complete transactions on CultureJeevan.
            </div>
          </Section>
        )}

        {/* ── Save bar ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", background: "#fff", border: "1px solid #E8DED0", borderRadius: "12px", padding: "1rem 1.25rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={handleSave} disabled={saving} style={{
            padding: "0.72rem 2rem", background: saved ? "#2E7D32" : "#C4703A",
            color: "#FAF7F2", border: "none", borderRadius: "8px", fontSize: "0.875rem", fontWeight: 700,
            cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.75 : 1, transition: "background 0.3s", flexShrink: 0,
          }}>
            {saving ? "Saving…" : saved ? "✓ Saved" : "Save Profile"}
          </button>
          <p style={{ fontSize: "0.75rem", color: saveError ? "#C0392B" : completion === 100 ? "#2E7D32" : "#9B7B60", margin: 0 }}>
            {validationMsg}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 601px) and (max-width: 820px) {
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}