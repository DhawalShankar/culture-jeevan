import type { Metadata } from "next";
import StudiosListing from "@/components/sections/studios-listing";
import ComingSoon from "@/components/sections/coming-soon";
export const metadata: Metadata = {
  title: "Explore Studios — CultureJeevan",
  description:
    "Browse and book photography, film, podcast, rooftop, and dance studios across India.",
};

export default function Page() {
  return <StudiosListing/>;
}