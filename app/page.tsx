import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import FeaturedStudios from "@/components/sections/featured-studios";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "#FAF7F2",
        color: "#1C1410",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Hero />
      <FeaturedStudios />
      <Footer />
    </main>
  );
}