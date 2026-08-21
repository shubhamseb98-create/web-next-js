import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Blog — Skeleton Loader
 * Layout: Hero → Featured post (large) → Blog grid cards
 */
export default function BlogLoading() {
  return (
    <div className={styles.skWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.skHero}>
        <div className={`${styles.sk} ${styles.skTag}`} />
        <div className={styles.sk} style={{ width: "220px", height: "44px", borderRadius: "8px" }} />
        <div className={styles.sk} style={{ width: "360px", maxWidth: "90%", height: "18px" }} />
      </div>

      {/* ── Featured Post ── */}
      <div className={styles.skSection}>
        <div className={styles.skGrid2} style={{ gap: "40px" }}>
          <div className={styles.sk} style={{ width: "100%", height: "340px", borderRadius: "16px" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", justifyContent: "center" }}>
            <div className={`${styles.sk} ${styles.skTag}`} />
            <div className={styles.sk} style={{ width: "90%", height: "36px" }} />
            <div className={styles.sk} style={{ width: "100%", height: "15px" }} />
            <div className={styles.sk} style={{ width: "95%", height: "15px" }} />
            <div className={styles.sk} style={{ width: "80%", height: "15px" }} />
            <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "8px" }}>
              <div className={styles.sk} style={{ width: "36px", height: "36px", borderRadius: "50%" }} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div className={styles.sk} style={{ width: "100px", height: "14px" }} />
                <div className={styles.sk} style={{ width: "80px", height: "12px" }} />
              </div>
              <div className={styles.sk} style={{ width: "120px", height: "40px", borderRadius: "999px" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Blog Cards Grid ── */}
      <div className={styles.skSection} style={{ paddingTop: 0 }}>
        <div className={styles.skCenter}>
          <div className={styles.sk} style={{ width: "200px", height: "32px" }} />
        </div>
        <div className={styles.skGrid3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.skCard}>
              <div className={styles.sk} style={{ width: "100%", height: "200px", borderRadius: 0 }} />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <div className={`${styles.sk} ${styles.skTag}`} />
                  <div className={styles.sk} style={{ width: "60px", height: "24px", borderRadius: "999px" }} />
                </div>
                <div className={styles.sk} style={{ width: "85%", height: "20px" }} />
                <div className={styles.sk} style={{ width: "100%", height: "13px" }} />
                <div className={styles.sk} style={{ width: "90%", height: "13px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <div className={styles.sk} style={{ width: "90px", height: "13px" }} />
                  <div className={styles.sk} style={{ width: "60px", height: "13px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
