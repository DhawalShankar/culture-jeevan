import type { Metadata } from "next";
import StudioDetail from "@/components/sections/studio-detail";

// ✅ Dynamic metadata yahin likhna hai
export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Studio ${params.id} — CultureJeevan`,
    description: "View studio details, amenities, and book instantly.",
  };
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return <StudioDetail id={params.id} />;
}