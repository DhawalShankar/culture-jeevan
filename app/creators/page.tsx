import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Creator, CreatorFilters } from "@/types/database";
import CreatorsCrew from "@/components/sections/creators-crew";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Book a Creator — CultureJeevan",
  description:
    "Browse and book verified photographers, singers, comedians, poets, and more across Lucknow, Kanpur, and NCR.",
};

// ─── Data Fetch ───────────────────────────────────────────────────────────────

async function getCreators(filters: CreatorFilters = {}): Promise<Creator[]> {
  const supabase = await createClient();

  let query = supabase
    .from("creators")
    .select(`
      id,
      profile_id,
      category,
      starting_price,
      experience,
      languages,
      review_count,
      avg_rating,
      badge,
      is_premium,
      created_at,
      profiles (
        full_name,
        city,
        bio,
        instagram_handle,
        portfolio_url
      )
    `)
    // Premium + higher badge first, then by review count
    .order("is_premium", { ascending: false })
    .order("review_count", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }
  if (filters.city) {
    query = query.eq("profiles.city", filters.city);
  }
  if (filters.minRating) {
    query = query.gte("avg_rating", filters.minRating);
  }
  if (filters.maxPrice) {
    query = query.lte("starting_price", filters.maxPrice);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Creators fetch error:", error.message);
    return [];
  }

  // Flatten joined profiles into creator object
  return (data ?? []).map((row: any) => ({
    ...row,
    full_name: row.profiles?.full_name ?? "Unknown",
    city: row.profiles?.city ?? "",
    bio: row.profiles?.bio ?? null,
    instagram_handle: row.profiles?.instagram_handle ?? null,
    portfolio_url: row.profiles?.portfolio_url ?? null,
  }));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CreatorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const filters: CreatorFilters = {
    category: searchParams.category,
    city: searchParams.city,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
  };

  const creators = await getCreators(filters);
  return <ComingSoon/>;
  // return <CreatorsCrew creators={creators} />;
}