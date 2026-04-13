import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Space, SpaceFilters } from "@/types/database";
import StudiosListing from "@/components/sections/studios-listing";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Book a Space — CultureJeevan",
  description:
    "Browse and book photography studios, cafés, rooftops, and creative spaces across Lucknow, Kanpur, and NCR.",
};

// ─── Data Fetch ───────────────────────────────────────────────────────────────

async function getSpaces(filters: SpaceFilters = {}): Promise<Space[]> {
  const supabase = await createClient();

  let query = supabase
    .from("spaces")
    .select(`
      id,
      profile_id,
      space_name,
      space_type,
      space_category,
      address_line1,
      address_area,
      address_city,
      pincode,
      google_maps_url,
      hourly_rate,
      half_day_rate,
      full_day_rate,
      capacity,
      min_booking_hours,
      amenities,
      space_rules,
      space_description,
      advance_percentage,
      review_count,
      avg_rating,
      badge,
      is_premium,
      is_cj_certified,
      created_at,
      profiles (
        full_name,
        phone
      )
    `)
    .order("is_premium", { ascending: false })
    .order("review_count", { ascending: false });

  // Category filter: studio or cafe
  if (filters.category && filters.category !== "all") {
    query = query.eq("space_category", filters.category);
  }
  if (filters.city) {
    query = query.eq("address_city", filters.city);
  }
  if (filters.minRating) {
    query = query.gte("avg_rating", filters.minRating);
  }
  if (filters.maxHourlyRate) {
    query = query.lte("hourly_rate", filters.maxHourlyRate);
  }
  // Amenity filter — Supabase array contains
  if (filters.amenities && filters.amenities.length > 0) {
    query = query.contains("amenities", filters.amenities);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Spaces fetch error:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    owner_name: row.profiles?.full_name ?? "Unknown",
    owner_phone: row.profiles?.phone ?? null,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SpacesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filters: SpaceFilters = {
    category: (searchParams.category as SpaceFilters["category"]) ?? "all",
    city: searchParams.city,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    maxHourlyRate: searchParams.maxRate ? Number(searchParams.maxRate) : undefined,
    amenities: searchParams.amenities ? searchParams.amenities.split(",") : undefined,
  };

  const spaces = await getSpaces(filters);
return <ComingSoon/>;
  // return <StudiosListing spaces={spaces} />;
}