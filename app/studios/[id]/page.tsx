import Navbar from "@/components/sections/navbar";
import StudioDetail from "@/components/sections/studio-detail";
import Footer from "@/components/sections/footer";

export const metadata = {
  title: "Studio Detail — CultureJeevan",
  description: "View studio details, amenities, and book your slot instantly.",
};

export default function StudioDetailPage({
  params,
}: {
  params: { id: string };
}) {
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
      <StudioDetail id={params.id} />
      <Footer />
    </main>
  );
}