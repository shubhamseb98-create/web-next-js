import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Service Details — Skeleton Loader
 * Layout: Hero → Two-col (Main Content + Sidebar)
 */
export default function ServiceDetailsLoading() {
  return (
    <div className={styles.skWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.skHero}>
        <div className={styles.skBreadcrumb}>
            <div className={styles.sk} style={{ width: "60px", height: "14px", borderRadius: "4px" }} />
            <div className={styles.sk} style={{ width: "10px", height: "14px" }} />
            <div className={styles.sk} style={{ width: "80px", height: "14px", borderRadius: "4px" }} />
            <div className={styles.sk} style={{ width: "10px", height: "14px" }} />
            <div className={styles.sk} style={{ width: "120px", height: "14px", borderRadius: "4px" }} />
        </div>
        <div className={styles.sk} style={{ width: "320px", height: "48px", borderRadius: "8px" }} />
        <div className={styles.sk} style={{ width: "420px", maxWidth: "90%", height: "20px" }} />
      </div>

      {/* ── Main Content Area ── */}
      <div className={styles.skSection}>
        <div className={styles.skLayoutSidebar}>
            
            {/* Left Content */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.sk} style={{ width: "100%", height: "400px", borderRadius: "16px" }} />
                <div className={styles.sk} style={{ width: "60%", height: "32px", marginTop: "16px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div className={styles.sk} style={{ width: "100%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "95%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "98%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "80%", height: "16px" }} />
                </div>
                <div className={styles.sk} style={{ width: "40%", height: "28px", marginTop: "24px" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                     <div className={styles.sk} style={{ width: "100%", height: "120px", borderRadius: "12px" }} />
                     <div className={styles.sk} style={{ width: "100%", height: "120px", borderRadius: "12px" }} />
                </div>
            </div>

            {/* Right Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Sidebar Widget 1 */}
                <div className={styles.skCard} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className={styles.sk} style={{ width: "120px", height: "24px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "48px", borderRadius: "8px" }} />
                </div>

                {/* Sidebar Widget 2 (Contact) */}
                <div className={styles.skCard} style={{ padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
                    <div className={styles.sk} style={{ width: "64px", height: "64px", borderRadius: "50%" }} />
                    <div className={styles.sk} style={{ width: "140px", height: "24px" }} />
                    <div className={styles.sk} style={{ width: "90%", height: "14px" }} />
                    <div className={styles.sk} style={{ width: "180px", height: "44px", borderRadius: "999px", marginTop: "16px" }} />
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
