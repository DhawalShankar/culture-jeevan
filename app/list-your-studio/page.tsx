import Navbar from "@/components/sections/navbar";
import ListYourStudio from "@/components/sections/list-your-studio";
import Footer from "@/components/sections/footer";

export const metadata = {
  title: "List Your Studio — CultureJeevan",
  description:
    "Partner with CultureJeevan and get your studio discovered by thousands of creators across India.",
};

export default function ListYourStudioPage() {
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
      <ListYourStudio />
      <Footer />
    </main>
  );
}