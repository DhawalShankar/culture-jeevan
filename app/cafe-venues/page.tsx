import type { Metadata } from "next";
import CafeVenues from "@/components/sections/cafe-venues";

export const metadata: Metadata = {
  title: "Cafe Venues — CultureJeevan",
  description:
    "Explore curated cafes and venues for meetings, shoots, and creative sessions.",
};

export default function Page() {
  return <CafeVenues />;
}