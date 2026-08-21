import styles from "src/css/webtycoons/skeleton.module.css";

/**
 * Blog Details — Skeleton Loader
 * Layout: Top Title Area → Cover Image → Two-col (Content + Sidebar)
 */
export default function BlogDetailsLoading() {
  return (
    <div className={styles.skWrapper} style={{ paddingTop: "120px" }}>

      {/* ── Header / Title Area ── */}
      <div className={styles.skSectionSm} style={{ paddingBottom: "20px" }}>
         <div className={styles.skBreadcrumb} style={{ justifyContent: "center" }}>
            <div className={styles.sk} style={{ width: "60px", height: "14px", borderRadius: "4px" }} />
            <div className={styles.sk} style={{ width: "10px", height: "14px" }} />
            <div className={styles.sk} style={{ width: "40px", height: "14px", borderRadius: "4px" }} />
        </div>
        <div className={styles.skCenter} style={{ marginBottom: "24px" }}>
            <div className={`${styles.sk} ${styles.skTag}`} />
            <div className={styles.sk} style={{ width: "70%", height: "48px", borderRadius: "8px", marginTop: "12px" }} />
            <div className={styles.sk} style={{ width: "50%", height: "48px", borderRadius: "8px" }} />
        </div>
        
        {/* Meta Info */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className={styles.sk} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div className={styles.sk} style={{ width: "100px", height: "14px" }} />
                    <div className={styles.sk} style={{ width: "80px", height: "12px" }} />
                </div>
            </div>
            <div className={styles.sk} style={{ width: "1px", height: "24px" }} />
            <div className={styles.sk} style={{ width: "120px", height: "14px" }} />
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className={styles.skSection}>
        <div className={styles.skLayoutSidebar}>
            
            {/* Left Content (Article) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div className={styles.sk} style={{ width: "100%", height: "450px", borderRadius: "16px" }} />
                
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "24px" }}>
                    <div className={styles.sk} style={{ width: "100%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "95%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "98%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "85%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "92%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "70%", height: "18px" }} />
                </div>

                <div className={styles.sk} style={{ width: "40%", height: "32px", marginTop: "32px" }} />

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div className={styles.sk} style={{ width: "98%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "18px" }} />
                    <div className={styles.sk} style={{ width: "80%", height: "18px" }} />
                </div>
            </div>

            {/* Right Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                
                {/* Search / Categories */}
                <div className={styles.skCard} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className={styles.sk} style={{ width: "140px", height: "24px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "1px" }} />
                    {Array.from({ length: 4 }).map((_, i) => (
                         <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                              <div className={styles.sk} style={{ width: "100px", height: "16px" }} />
                              <div className={styles.sk} style={{ width: "20px", height: "16px" }} />
                         </div>
                    ))}
                </div>

                {/* Recent Posts */}
                <div className={styles.skCard} style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div className={styles.sk} style={{ width: "140px", height: "24px" }} />
                    <div className={styles.sk} style={{ width: "100%", height: "1px" }} />
                    
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} style={{ display: "flex", gap: "16px" }}>
                            <div className={styles.sk} style={{ width: "80px", height: "80px", borderRadius: "8px", flexShrink: 0 }} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1, justifyContent: "center" }}>
                                 <div className={styles.sk} style={{ width: "100%", height: "14px" }} />
                                 <div className={styles.sk} style={{ width: "80%", height: "14px" }} />
                                 <div className={styles.sk} style={{ width: "60px", height: "12px", marginTop: "4px" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
