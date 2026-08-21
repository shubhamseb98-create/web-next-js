import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Project Details — Skeleton Loader
 * Layout: Large Hero Image → Project Overview (2-col) → Content Blocks
 */
export default function ProjectDetailsLoading() {
  return (
    <div className={styles.skWrapper} style={{ paddingTop: "80px" }}>

      {/* ── Hero / Cover Image ── */}
      <div className={styles.sk} style={{ width: "100%", height: "500px", borderRadius: "0 0 24px 24px" }} />

      {/* ── Project Title & Meta ── */}
      <div className={styles.skSectionSm} style={{ textAlign: "center" }}>
        <div className={styles.skCenter}>
            <div className={`${styles.sk} ${styles.skTag}`} />
            <div className={styles.sk} style={{ width: "60%", height: "56px", borderRadius: "8px", marginTop: "16px" }} />
            <div className={styles.sk} style={{ width: "40%", height: "20px", marginTop: "8px" }} />
        </div>
      </div>

      {/* ── Project Info Grid (Client, Role, Date etc) ── */}
      <div className={styles.skSection} style={{ paddingTop: 0 }}>
        <div className={styles.skGrid4} style={{ padding: "32px", background: "#111", borderRadius: "16px", border: "1px solid #1f1f1f" }}>
             {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
                    <div className={styles.sk} style={{ width: "60px", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "100px", height: "24px", borderRadius: "4px" }} />
                </div>
            ))}
        </div>
      </div>

      {/* ── Main Content Layout ── */}
      <div className={styles.skSection} style={{ paddingTop: 0 }}>
        <div className={styles.skLayoutSplit}>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.sk} style={{ width: "80%", height: "36px" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div className={styles.sk} style={{ width: "100%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "95%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "98%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "85%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "90%", height: "16px" }} />
                    <div className={styles.sk} style={{ width: "70%", height: "16px" }} />
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                 <div className={styles.sk} style={{ width: "100%", height: "300px", borderRadius: "16px" }} />
            </div>

        </div>
      </div>

    </div>
  );
}
