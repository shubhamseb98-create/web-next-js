import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * About Us — Skeleton Loader
 * Layout: Hero → Stats row → Two-col (image + text) → Team grid
 */
export default function AboutLoading() {
  return (
    <div className={styles.skWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.skHero}>
        <div className={`${styles.sk} ${styles.skTag}`} />
        <div className={styles.sk} style={{ width: "260px", height: "44px", borderRadius: "8px" }} />
        <div className={styles.sk} style={{ width: "380px", maxWidth: "90%", height: "18px" }} />
      </div>

      {/* ── Stats Row ── */}
      <div className={styles.skSectionSm}>
        <div className={styles.skGrid4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skCard} style={{ padding: "28px 20px", textAlign: "center" }}>
              <div className={styles.sk} style={{ width: "60px", height: "44px", margin: "0 auto 12px", borderRadius: "8px" }} />
              <div className={styles.sk} style={{ width: "70%", height: "16px", margin: "0 auto" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Two-col: Image + Text ── */}
      <div className={styles.skSection}>
        <div className={styles.skGrid2}>
          <div className={styles.sk} style={{ width: "100%", height: "380px", borderRadius: "16px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className={`${styles.sk} ${styles.skTag}`} />
            <div className={styles.sk} style={{ width: "80%", height: "36px" }} />
            <div className={styles.sk} style={{ width: "100%", height: "16px" }} />
            <div className={styles.sk} style={{ width: "95%", height: "16px" }} />
            <div className={styles.sk} style={{ width: "85%", height: "16px" }} />
            <div className={styles.sk} style={{ width: "90%", height: "16px" }} />
            <div className={styles.sk} style={{ width: "140px", height: "44px", borderRadius: "999px", marginTop: "8px" }} />
          </div>
        </div>
      </div>

      {/* ── Team Grid ── */}
      <div className={styles.skSection} style={{ paddingTop: 0 }}>
        <div className={styles.skCenter}>
          <div className={styles.sk} style={{ width: "180px", height: "36px" }} />
          <div className={styles.sk} style={{ width: "340px", maxWidth: "90%", height: "16px" }} />
        </div>
        <div className={styles.skGrid4}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.skCard}>
              <div className={styles.sk} style={{ width: "100%", height: "220px", borderRadius: 0 }} />
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div className={styles.sk} style={{ width: "70%", height: "18px" }} />
                <div className={styles.sk} style={{ width: "50%", height: "14px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
