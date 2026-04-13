// ─── Base Profile ─────────────────────────────────────────────────────────────

export interface Profile {
  id: string;               // clerk user id
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  bio: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  is_creator: boolean;
  is_space: boolean;
  is_equipment: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Creator ──────────────────────────────────────────────────────────────────

export interface Creator {
  id: string;
  profile_id: string;
  category: string;
  starting_price: number;
  experience: string | null;
  languages: string | null;
  // CJ badge system
  review_count: number;
  avg_rating: number | null;
  badge: "none" | "verified" | "silver" | "gold" | "platinum";
  is_premium: boolean;
  // joined from profiles
  full_name: string;
  city: string;
  bio: string | null;
  instagram_handle: string | null;
  portfolio_url: string | null;
  created_at: string;
}

// ─── Space ────────────────────────────────────────────────────────────────────

export interface Space {
  id: string;
  profile_id: string;
  space_name: string;
  space_type: string;                // "Photography Studio" | "Aesthetic Café" etc.
  space_category: "studio" | "cafe";
  address_line1: string;
  address_area: string;
  address_city: string;
  pincode: string;
  google_maps_url: string | null;
  hourly_rate: number;
  half_day_rate: number | null;
  full_day_rate: number | null;
  capacity: number | null;
  min_booking_hours: number | null;
  amenities: string[];
  space_rules: string | null;
  space_description: string | null;
  advance_percentage: number;        // 50–80
  // CJ badge system
  review_count: number;
  avg_rating: number | null;
  badge: "none" | "verified" | "silver" | "gold" | "platinum";
  is_premium: boolean;
  is_cj_certified: boolean;
  // joined from profiles
  owner_name: string;
  owner_phone: string | null;
  created_at: string;
}

// ─── Equipment ────────────────────────────────────────────────────────────────

export interface EquipmentListing {
  id: string;
  profile_id: string;
  name: string;
  brand: string | null;
  category: string;
  price_per_hour: number;
  deposit_amount: number | null;
  condition: "Brand New" | "Like New" | "Good" | "Fair";
  description: string | null;
  pickup_address: string;
  pickup_area: string;
  pickup_city: string;
  pickup_pincode: string;
  is_available: boolean;
  // joined from profiles
  owner_name: string;
  owner_phone: string;
  created_at: string;
}

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  booking_id: string;
  reviewer_id: string;
  target_id: string;          // creator/space id
  target_type: "creator" | "space";
  rating: number;             // 1–5
  comment: string | null;
  created_at: string;
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export type BookingStatus =
  | "pending"       // request sent, awaiting response
  | "quoted"        // creator set custom price, awaiting payment
  | "confirmed"     // advance paid, in escrow
  | "arrived"       // QR scanned, advance released
  | "completed"     // done
  | "cancelled"     // cancelled
  | "expired";      // 24hr window passed

export interface Booking {
  id: string;
  host_id: string;            // clerk user id of person booking
  target_id: string;          // creator or space id
  target_type: "creator" | "space";
  status: BookingStatus;
  event_name: string | null;
  event_date: string;
  slot_type: "hourly" | "half_day" | "full_day" | "multi_day";
  hours: number;
  total_amount: number;
  advance_percentage: number;
  advance_amount: number;
  custom_price: number | null;
  custom_note: string | null;
  location: string | null;
  occasion_type: string | null;
  contact_phone: string;
  qr_scanned_at: string | null;
  advance_released_at: string | null;
  created_at: string;
  expires_at: string | null;  // for 24hr custom request window
}

// ─── Filter Types (for UI) ────────────────────────────────────────────────────

export interface CreatorFilters {
  category?: string;
  city?: string;
  minRating?: number;
  maxPrice?: number;
  availableOnly?: boolean;
}

export interface SpaceFilters {
  category?: "studio" | "cafe" | "all";
  city?: string;
  minRating?: number;
  maxHourlyRate?: number;
  amenities?: string[];
}

export interface EquipmentFilters {
  category?: string;
  city?: string;
  availableOnly?: boolean;
}