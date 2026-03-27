import Navbar from "@/components/sections/navbar";
import HowItWorks from "@/components/sections/how-it-works";
import Footer from "@/components/sections/footer";

export const metadata = {
  title: "How It Works — CultureJeevan",
  description:
    "Understand the Scan-to-Shoot flow — book a studio, pay 50% advance, scan QR on arrival, and settle the rest directly at the studio.",
};

export default function HowItWorksPage() {
  return (
    <main
      style={{
        backgroundColor: "#FAF7F2",
        color: "#1C1410",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <Navbar />
      <HowItWorks />
      <Footer />
    </main>
  );
}