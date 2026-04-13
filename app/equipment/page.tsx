import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { EquipmentListing, EquipmentFilters } from "@/types/database";
import ExplorePage from "../explore/page";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Rent Equipment — CultureJeevan",
  description:
    "Browse cameras, lenses, lighting, and more listed by owners across Lucknow, Kanpur, and NCR.",
};

// ─── Data Fetch ───────────────────────────────────────────────────────────────

async function getEquipment(filters: EquipmentFilters = {}): Promise<EquipmentListing[]> {
  const supabase = await createClient();

  let query = supabase
    .from("equipment")
    .select(`
      id,
      profile_id,
      name,
      brand,
      category,
      price_per_hour,
      deposit_amount,
      condition,
      description,
      pickup_address,
      pickup_area,
      pickup_city,
      pickup_pincode,
      is_available,
      created_at,
      profiles (
        full_name,
        phone
      )
    `)
    // Available first, then newest
    .order("is_available", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.city) {
    query = query.eq("pickup_city", filters.city);
  }
  if (filters.availableOnly) {
    query = query.eq("is_available", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Equipment fetch error:", error.message);
    return [];
  }

  return (data ?? []).map((row: any) => ({
    ...row,
    owner_name: row.profiles?.full_name ?? "Unknown",
    owner_phone: row.profiles?.phone ?? "",
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filters: EquipmentFilters = {
    category: searchParams.category,
    city: searchParams.city,
    availableOnly: searchParams.available === "true",
  };

  const equipment = await getEquipment(filters);
return <ComingSoon/>;
//   return <EquipmentPageClient equipment={equipment} />;
}