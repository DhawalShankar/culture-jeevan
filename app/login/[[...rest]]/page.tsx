import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#FAF7F2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div
        className="auth-card"
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "960px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(28,20,16,0.14), 0 4px 16px rgba(28,20,16,0.06)",
        }}
      >
        {/* Left Panel */}
        <div
          className="auth-left"
          style={{
            flex: 1,
            position: "relative",
            minHeight: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "2.5rem",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=900&q=80"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(28,20,16,0.3) 0%, rgba(28,20,16,0.92) 70%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", backgroundColor: "#C4703A" }} />

          {/* Logo */}
          <div style={{ position: "absolute", top: "2rem", left: "2.5rem", zIndex: 1 }}>
            <span style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15rem", fontWeight: 900, color: "#FAF7F2" }}>
              Culture<span style={{ color: "#C4703A" }}>Jeevan</span>
            </span>
          </div>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 900, color: "#FAF7F2",
              lineHeight: 1.2, marginBottom: "0.875rem",
            }}>
              Book the Creation.<br />Own the Moment.
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(250,247,242,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
              Find and book creative professionals, studios, and cafés across India — all in one place.
            </p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { value: "Multiple", label: "Verified Creators" },
                { value: "Multiple", label: "Bookings Done" },
                { value: "Good", label: "Avg. Rating" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.35rem", fontWeight: 900, color: "#C4703A", marginBottom: "0.1rem" }}>{s.value}</p>
                  <p style={{ fontSize: "0.7rem", color: "rgba(250,247,242,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Clerk UI */}
        <div style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}>
          <SignIn
            forceRedirectUrl="/dashboard"
            appearance={{
              variables: {
                colorPrimary: "#C4703A",
                colorBackground: "#FFFFFF",
                colorInputBackground: "#FAF7F2",
                colorInputText: "#1C1410",
                borderRadius: "10px",
                fontFamily: "var(--font-dm-sans), sans-serif",
              },
              elements: {
                card: {
                  boxShadow: "none",
                  border: "none",
                  padding: "3rem",
                  width: "100%",
                },
                headerTitle: {
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.4rem",
                  fontWeight: "900",
                  color: "#1C1410",
                },
                headerSubtitle: {
                  color: "#9B8070",
                  fontSize: "0.82rem",
                },
                formButtonPrimary: {
                  backgroundColor: "#C4703A",
                  fontSize: "0.95rem",
                  fontWeight: "800",
                  "&:hover": { backgroundColor: "#A85C2E" },
                },
                footerActionLink: {
                  color: "#C4703A",
                  fontWeight: "600",
                },
                formFieldInput: {
                  backgroundColor: "#FAF7F2",
                  borderColor: "#E8DED0",
                  color: "#1C1410",
                },
                dividerLine: {
                  backgroundColor: "#E8DED0",
                },
                dividerText: {
                  color: "#9B8070",
                },
              },
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .auth-left { display: none !important; }
          .auth-card { border-radius: 16px !important; }
        }
      `}</style>
    </div>
  );
}