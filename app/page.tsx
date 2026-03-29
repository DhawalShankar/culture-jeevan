
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import FeaturedStudios from "@/components/sections/featured-studios";


export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#FAF7F2",
        color: "#1C1410",
        minHeight: "100vh",
      }}
    >
      
      <Hero />
      <HowItWorks />
      <FeaturedStudios />
    </main>
  );
}