"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "src/components/layout/PageHeader";
import ProductCard from "src/ui/ProductCard";
import ContactModal from "../../layout/ContactModal/ContactModal";

export default function CrmDetailClient({ product, relatedProducts = [] }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: product.name }
  ];

  const imageSrc = product.detailImage || product.image
    ? product.detailImage?.startsWith("http") || product.detailImage?.startsWith("/")
      ? product.detailImage
      : product.image?.startsWith("http") || product.image?.startsWith("/")
      ? product.image
      : `/uploads/${product.detailImage || product.image}`
    : "/images/slide1.jpg";

  return (
    <>
      {/* ─── 1. WEBTYCOONS EXACT INNER-PAGE BREADCRUMB BANNER ── */}
      <PageHeader
        title={`${product.name} <br /><span class="textGreen">– ${product.grade || "Enterprise Platform"}</span>`}
        description={product.tagline}
        bgImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={breadcrumb}
      />

      {/* ─── 2. PRODUCT DETAILS SECTION ── */}
      <section className="project-details-page my-5">
        <div className="container">
          {/* Full-width Image Banner */}
          <div className="mb-5">
            <div
              className="position-relative mb-4"
              style={{
                height: "420px",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
            >
              <img
                src={imageSrc}
                alt={product.alt || product.name}
                className="w-100 h-100 object-fit-cover"
                style={{ objectFit: "cover" }}
              />
            </div>

            {/* Tag / Category Badge */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <span
                style={{
                  backgroundColor: "rgba(82, 164, 54, 0.15)",
                  color: "var(--clr-primary, #52a436)",
                  border: "1px solid rgba(82, 164, 54, 0.3)",
                  fontSize: "13px",
                  fontWeight: "700",
                  padding: "4px 14px",
                  borderRadius: "50px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              >
                {product.grade || product.category?.name || "ENTERPRISE CRM"}
              </span>
              <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px" }}>
                Category: <strong className="text-white">{product.category?.name || "Software Platform"}</strong>
              </span>
            </div>

            {/* CKEditor Rich Text Description */}
            {product.description && (
              <div
                className="details-content-wrapper ck-content p-4 p-md-5 rounded-4"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: "1.8"
                }}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>

          {/* ─── 3. FULL-WIDTH CTA BANNER ── */}
          <div className="pd-cta mb-5">
            <div className="pd-cta__circle pd-cta__circle--1" aria-hidden="true" />
            <div className="pd-cta__circle pd-cta__circle--2" aria-hidden="true" />

            <div className="pd-cta__left">
              <div className="pd-cta__icon-wrap">
                <i className="bi bi-lightning-charge-fill" />
              </div>
              <div>
                <h3 className="pd-cta__heading">
                  Ready to deploy <span>{product.name}?</span>
                </h3>
                <p className="pd-cta__sub">
                  Get a tailored deployment blueprint, live sandbox demo, and custom pricing for your sales team.
                </p>
              </div>
            </div>

            <div className="pd-cta__right">
              <button
                type="button"
                onClick={() => setIsDemoModalOpen(true)}
                className="primary-btn1 white-bg"
                style={{
                  cursor: "pointer",
                  backgroundColor: "#ffffff",
                  color: "#0f172a",
                  fontWeight: "700",
                  padding: "14px 32px",
                  borderRadius: "50px",
                  border: "none"
                }}
              >
                Schedule Live Demo
              </button>
            </div>
          </div>

          {/* ─── 4. RELATED PRODUCTS USING EXACT WEBSITE CARDS ── */}
          {relatedProducts.length > 0 && (
            <div className="mt-5 pt-4">
              <div className="mb-4">
                <h3 style={{ fontSize: "24px", fontWeight: "700", color: "#ffffff" }}>
                  Other Specialized CRM Systems
                </h3>
                <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14px" }}>
                  Explore other pre-built architectures from our enterprise software catalog.
                </p>
              </div>

              <div className="row gy-4">
                {relatedProducts.slice(0, 4).map((item) => (
                  <div className="col-lg-3 col-md-6 col-sm-6" key={item._id || item.slug}>
                    <ProductCard
                      product={{
                        slug: `/products/${item.slug}`,
                        tag: item.grade || item.category?.name || "CUSTOM CRM",
                        title: item.name,
                        cta: "Explore System",
                        image: item.image || item.detailImage || "/images/slide1.jpg",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Demo Contact Modal */}
      <ContactModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <style jsx>{`
        .pd-cta {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: linear-gradient(120deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
          padding: 2.25rem 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          box-shadow: 0 8px 32px rgba(10, 110, 189, 0.2);
        }

        .pd-cta__circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .pd-cta__circle--1 {
          width: 280px;
          height: 280px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
          top: -80px;
          right: 80px;
        }
        .pd-cta__circle--2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(10, 110, 189, 0.15) 0%, transparent 70%);
          bottom: -60px;
          left: 60px;
        }

        .pd-cta__left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          z-index: 1;
        }

        .pd-cta__icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: #38bdf8;
          flex-shrink: 0;
        }

        .pd-cta__heading {
          font-size: 1.35rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.25rem;
        }

        .pd-cta__heading span {
          color: #38bdf8;
        }

        .pd-cta__sub {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0;
        }

        .pd-cta__right {
          z-index: 1;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .pd-cta {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.75rem;
          }
        }
      `}</style>
    </>
  );
}
