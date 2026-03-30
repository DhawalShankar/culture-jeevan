import type { Metadata } from "next";
import ListYourCafe from "@/components/sections/list-your-cafe";
import ComingSoon from "@/components/sections/coming-soon";
export const metadata: Metadata = {
  title: "List Your Cafe — CultureJeevan",
  description:
    "List your cafe on CultureJeevan and host creative shoots and experiences.",
};

export default function Page() {
  return <ComingSoon />;
}