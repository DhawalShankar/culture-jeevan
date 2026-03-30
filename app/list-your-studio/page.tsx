import type { Metadata } from "next";
import ListYourStudio from "@/components/sections/list-your-studio";
import ComingSoon from "@/components/sections/coming-soon";

export const metadata: Metadata = {
  title: "List Your Studio — CultureJeevan",
  description:
    "Partner with CultureJeevan and get your studio discovered by thousands of creators across India.",
};

export default function Page() {
  return <ComingSoon />;
}