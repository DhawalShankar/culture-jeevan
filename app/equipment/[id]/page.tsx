import type { Metadata } from "next";
import EquipmentDetail from "@/components/sections/equipment-detail";

// Next.js 15: params is a Promise — must be awaited
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Equipment ${id} — CultureJeevan`,
    description: "View equipment details, specs, and contact the owner directly to arrange rental.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EquipmentDetail id={id} />;
}