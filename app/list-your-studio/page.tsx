import type { Metadata } from "next";
import ListYourStudio from "@/components/sections/list-your-studio";

export const metadata: Metadata = {
  title: "List Your Studio — CultureJeevan",
  description:
    "Partner with CultureJeevan and get your studio discovered by thousands of creators across India.",
};

export default function Page() {
  return <ListYourStudio />;
}