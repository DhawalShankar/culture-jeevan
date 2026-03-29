import type { Metadata } from "next";
import HowItWorks from "@/components/sections/how-it-works";

export const metadata: Metadata = {
  title: "How It Works — CultureJeevan",
  description:
    "Understand the Scan-to-Shoot flow — book a studio, pay 50% advance, scan QR on arrival, and settle the rest directly at the studio.",
};

export default function Page() {
  return <HowItWorks />;
}