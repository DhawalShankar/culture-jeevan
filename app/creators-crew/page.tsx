import type { Metadata } from "next";
import CreatorsCrew from "@/components/sections/creators-crew";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Creator's Crew — CultureJeevan",
  description: "Browse vetted photographers, videographers, makeup artists, and more.",
};

export default function Page() {
  return <ComingSoon />;
}