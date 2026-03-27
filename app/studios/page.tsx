import Navbar from "@/components/sections/navbar";
import StudiosListing from "@/components/sections/studios-listing";
import Footer from "@/components/sections/footer";

export const metadata = {
  title: "Explore Studios — CultureJeevan",
  description: "Browse and book photography, film, podcast, rooftop, and dance studios across India.",
};

export default function StudiosPage() {
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
      <StudiosListing />
      <Footer />
    </main>
  );
}