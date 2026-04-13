import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", color: "#1C1410", minHeight: "100vh" }}>
      <Hero />
      <HowItWorks />
    </main>
  );
}