import type { Metadata } from "next";
import CreatorDetail from "@/components/sections/creator-detail";

// Next.js 15: params is a Promise — must be awaited in both generateMetadata and Page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Creator ${id} — CultureJeevan`,
    description: "View creator details, skills, and book instantly.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CreatorDetail id={id} />;
}