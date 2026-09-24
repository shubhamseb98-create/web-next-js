"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import PageHeader from "src/components/layout/PageHeader";
import ContactModal from "../../layout/ContactModal/ContactModal";
import styles from "src/css/webtycoons/ProductsPage.module.css";

export default function CrmProductsShowcase({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoProductTitle, setDemoProductTitle] = useState("");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter((p) => {
      const catSlug = p.category?.slug || p.categorySlug;
      const catName = p.category?.name || p.categoryName;
      return catSlug === selectedCategory || catName?.toLowerCase() === selectedCategory.toLowerCase();
    });
  }, [products, selectedCategory]);

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Products" }
  ];

  const handleOpenDemo = (productName = "") => {
    setDemoProductTitle(productName);
    setIsDemoModalOpen(true);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* ─── 1. WEBTYCOONS EXACT ORIGINAL BREADCRUMB BANNER ── */}
      <PageHeader
        title={`Enterprise Custom CRMs <br /><span class="textGreen">– Built to Scale</span>`}
        description="Purpose-built custom CRM architectures designed for lead acceleration, multi-pipeline automation, and complete private data ownership."
        bgImage="/images/banners/products-it-company.jpg"
        breadcrumb={breadcrumb}
      />

      {/* ─── 2. ENTERPRISE CRM CATALOG SECTION ── */}
      <section className={styles.catalogSection}>
        <div className="container-fluid-px">
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}>
              <span className={styles.dot}></span> ENTERPRISE PLATFORMS
            </span>
            <h2 className={styles.sectionHeading}>
              Our Range of <span className={styles.textGreen}>Custom CRMs</span>
            </h2>
            <p className={styles.sectionSubDesc}>
              Say goodbye to generic SaaS limits and escalating per-seat fees. Explore our industry-tailored CRM platforms built for maximum pipeline velocity.
            </p>

            {/* Category Filter Tabs */}
            <div className={styles.filterPills}>
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`${styles.filterPill} ${selectedCategory === "all" ? styles.filterPillActive : ""}`}
              >
                All Platforms ({products.length})
              </button>

              {categories.map((cat) => {
                const isCatActive = selectedCategory === cat.slug;
                const count = products.filter((p) => {
                  const pCatSlug = p.category?.slug || p.categorySlug;
                  const pCatName = p.category?.name || p.categoryName;
                  return pCatSlug === cat.slug || pCatName?.toLowerCase() === cat.slug?.toLowerCase();
                }).length;

                return (
                  <button
                    key={cat.slug || cat._id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`${styles.filterPill} ${isCatActive ? styles.filterPillActive : ""}`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact 4-Column Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255, 255, 255, 0.5)" }}>
              No CRM solutions found in this category.
            </div>
          ) : (
            <div className={styles.cardsGrid}>
              {filteredProducts.map((prod) => {
                const productUrl = `/products/${prod.slug}`;
                const imageSrc = prod.image || prod.detailImage || "/images/crm/tycoonprop.jpg";
                const topMetric = prod.metrics && prod.metrics.length > 0 ? prod.metrics[0] : null;

                return (
                  <Link
                    href={productUrl}
                    className={styles.compactCard}
                    key={prod._id || prod.slug}
                  >
                    {/* Top Image Preview */}
                    <div className={styles.compactImageWrapper}>
                      <img
                        src={imageSrc}
                        alt={prod.alt || prod.name}
                        loading="lazy"
                      />
                      <span className={styles.compactArrow}>↗</span>
                      <span className={styles.compactBadge}>
                        {prod.category?.name || "CRM Solution"}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className={styles.compactBody}>
                      <p className={styles.compactTag}>
                        {prod.grade || "ENTERPRISE CRM"}
                      </p>

                      <h3 className={styles.compactTitle}>
                        {prod.name}
                      </h3>

                      {/* Top Metric Highlight Chip */}
                      {topMetric && (
                        <div className={styles.compactMetric}>
                          <span className={styles.metricVal}>{topMetric.value}</span>
                          <span className={styles.metricTxt}>{topMetric.label}</span>
                        </div>
                      )}

                      <div className={styles.compactFooter}>
                        <span className={styles.compactCta}>
                          Explore System <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* ─── 3. COMPARISON SECTION: CUSTOM CRM VS OFF-THE-SHELF ── */}
          <div className="mt-5 pt-4">
            <div className={styles.sectionHeader} style={{ marginBottom: "1.5rem" }}>
              <span className={styles.sectionSub}>
                <span className={styles.dot}></span> ARCHITECTURE ADVANTAGE
              </span>
              <h2 className={styles.sectionHeading} style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}>
                Why Leading Brands Choose <span className={styles.textGreen}>Custom CRM</span>
              </h2>
              <p className={styles.sectionSubDesc}>
                Stop paying per-seat subscriptions to SaaS giants when you can own your custom CRM platform with infinite scalability.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.tableCustom}>
                <thead>
                  <tr>
                    <th>Capability</th>
                    <th className={styles.colHighlight}>WebTycoons Custom CRM</th>
                    <th>Salesforce / HubSpot</th>
                    <th>Generic Off-The-Shelf SaaS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Data Ownership & Security</strong></td>
                    <td className={styles.colHighlight}>100% Private Cloud / On-Premise</td>
                    <td>Multi-Tenant Cloud (Vendor Owned)</td>
                    <td>Shared Public Servers</td>
                  </tr>
                  <tr>
                    <td><strong>Per-User Monthly Licensing</strong></td>
                    <td className={styles.colHighlight}>$0 / User (Zero Per-Seat Tax)</td>
                    <td>$150 – $300 / user / month</td>
                    <td>$45 – $90 / user / month</td>
                  </tr>
                  <tr>
                    <td><strong>Workflow & Pipeline Customization</strong></td>
                    <td className={styles.colHighlight}>100% Tailored to Your Exact SOPs</td>
                    <td>Limited, Requires Expensive Consultants</td>
                    <td>Rigid, Pre-Packaged Templates</td>
                  </tr>
                  <tr>
                    <td><strong>WhatsApp Cloud & VoIP Integration</strong></td>
                    <td className={styles.colHighlight}>Native Direct API Automation</td>
                    <td>Requires 3rd-Party Expensive Add-ons</td>
                    <td>Limited or Not Supported</td>
                  </tr>
                  <tr>
                    <td><strong>Source Code & Intellectual Property</strong></td>
                    <td className={styles.colHighlight}>Full IP Ownership Given to You</td>
                    <td>You Rent Platform Only</td>
                    <td>You Rent Platform Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ─── 4. BOTTOM CALL TO ACTION ── */}
          <div className="mt-5 pt-3">
            <div className={styles.ctaBox}>
              <h3 style={{ color: "#ffffff", fontWeight: "800", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "12px" }}>
                Need a Bespoke CRM Engineered for Your Team?
              </h3>
              <p style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "1rem", maxWidth: "680px", margin: "0 auto 28px auto", lineHeight: 1.6 }}>
                Our senior software architects build enterprise CRM platforms tailored from the database up to mirror your unique sales processes, hierarchies, and security needs.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenDemo("Bespoke Enterprise CRM")}
                  className={styles.btnPrimary}
                >
                  Schedule an Architecture Demo →
                </button>
                <Link href="/contact" className={styles.btnSecondary}>
                  Contact Engineering Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo / Inquiry Modal */}
      <ContactModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        initialService={demoProductTitle ? `Custom CRM: ${demoProductTitle}` : "Custom CRM Inquiry"}
      />
    </div>
  );
}
