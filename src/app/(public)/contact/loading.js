import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Contact Us — Skeleton Loader
 * Layout: Hero → Two-col (form + info)
 */
export default function ContactLoading() {
  return (
    <div className={styles.skWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.skHero}>
        <div className={`${styles.sk} ${styles.skTag}`} />
        <div className={styles.sk} style={{ width: "240px", height: "44px", borderRadius: "8px" }} />
        <div className={styles.sk} style={{ width: "360px", maxWidth: "90%", height: "18px" }} />
      </div>

      {/* ── Two-col: Form + Contact Info ── */}
      <div className={styles.skSection}>
        <div className={styles.skGrid2} style={{ gap: "60px" }}>

          {/* Form side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.sk} style={{ width: "200px", height: "32px" }} />
            <div className={styles.skLayoutSplit} style={{ gap: "16px" }}>
              <div className={styles.sk} style={{ height: "52px", borderRadius: "8px" }} />
              <div className={styles.sk} style={{ height: "52px", borderRadius: "8px" }} />
            </div>
            <div className={styles.sk} style={{ width: "100%", height: "52px", borderRadius: "8px" }} />
            <div className={styles.sk} style={{ width: "100%", height: "52px", borderRadius: "8px" }} />
            <div className={styles.sk} style={{ width: "100%", height: "140px", borderRadius: "8px" }} />
            <div className={styles.sk} style={{ width: "160px", height: "52px", borderRadius: "999px" }} />
          </div>

          {/* Info side */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div className={styles.sk} style={{ width: "220px", height: "32px" }} />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <div className={styles.sk} style={{ width: "48px", height: "48px", borderRadius: "12px", flexShrink: 0 }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className={styles.sk} style={{ width: "120px", height: "18px" }} />
                  <div className={styles.sk} style={{ width: "90%", height: "14px" }} />
                </div>
              </div>
            ))}
            {/* Map placeholder */}
            <div className={styles.sk} style={{ width: "100%", height: "220px", borderRadius: "16px", marginTop: "8px" }} />
          </div>

        </div>
      </div>

    </div>
  );
}
