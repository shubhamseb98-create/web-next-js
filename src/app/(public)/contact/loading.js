/**
 * Contact page — instant loading shell.
 * Shown while the server fetches ContactPage and PageBanner data.
 */
export default function ContactLoading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#050505",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1
          style={{
            color: "#e5e5e5",
            fontFamily: "Impact, 'Arial Black', sans-serif",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            letterSpacing: "4px",
            margin: "0 0 8px 0",
            fontWeight: "normal",
            textTransform: "uppercase",
          }}
        >
          WEBTYCOONS
        </h1>
        <div
          style={{
            width: "120%",
            height: "2px",
            background: "linear-gradient(90deg, transparent 0%, #39ff14 50%, transparent 100%)",
            boxShadow: "0 0 10px #39ff14, 0 0 20px #39ff14",
            borderRadius: "50%",
          }}
        />
      </div>
    </div>
  );
}
