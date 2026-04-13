import Hero from "@/components/sections/hero";
import WhyCultureJeevan from "@/components/sections/why-culture-jeevan";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#FAF7F2", color: "#1C1410", minHeight: "100vh" }}>
      <Hero />
      <WhyCultureJeevan />
    </main>
  );
}