import type { Metadata } from "next";
import CafeVenues from "@/components/sections/cafe-venues";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "Cafe Venues — CultureJeevan",
  description:
    "Explore curated cafes and venues for meetings, shoots, and creative sessions.",
};

export default function Page() {
  return <ComingSoon />;
}