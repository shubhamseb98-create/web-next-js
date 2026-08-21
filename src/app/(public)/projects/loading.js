import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Projects — Skeleton Loader
 * Layout: Hero → Filter tabs → Masonry/grid of project cards
 */
export default function ProjectsLoading() {
  return (
    <div className={styles.skWrapper}>

      {/* ── Hero Banner ── */}
      <div className={styles.skHero}>
        <div className={`${styles.sk} ${styles.skTag}`} />
        <div className={styles.sk} style={{ width: "280px", height: "44px", borderRadius: "8px" }} />
        <div className={styles.sk} style={{ width: "400px", maxWidth: "90%", height: "18px" }} />
      </div>

      {/* ── Filter Tabs ── */}
      <div className={styles.skSection} style={{ paddingBottom: "20px" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.sk} style={{ width: `${70 + i * 10}px`, height: "38px", borderRadius: "999px" }} />
          ))}
        </div>
      </div>

      {/* ── Projects Grid ── */}
      <div className={styles.skSection} style={{ paddingTop: "20px" }}>
        <div className={styles.skGrid3}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className={styles.skCard}>
              <div className={styles.sk} style={{ width: "100%", height: "240px", borderRadius: 0 }} />
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className={`${styles.sk} ${styles.skTag}`} />
                <div className={styles.sk} style={{ width: "80%", height: "22px" }} />
                <div className={styles.sk} style={{ width: "100%", height: "14px" }} />
                <div className={styles.sk} style={{ width: "90%", height: "14px" }} />
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <div className={styles.sk} style={{ width: "70px", height: "30px", borderRadius: "6px" }} />
                  <div className={styles.sk} style={{ width: "70px", height: "30px", borderRadius: "6px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
