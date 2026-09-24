import Link from "next/link";

// BreadcrumbList JSON-LD schema for rich search result breadcrumbs
function BreadcrumbSchema({ breadcrumb }) {
  const items = breadcrumb.filter((item) => item.href);
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `https://thewebtycoons.com${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function PageHeader({
  title,
  subtitle,
  description,
  bgImage,
  breadcrumb = [],
  children,
}) {
  const defaultBg = "/images/banners/about-it-company.jpg";
  const finalBg = bgImage || defaultBg;

  return (
    <>
      {/* BreadcrumbList structured data for Google sitelinks */}
      <BreadcrumbSchema breadcrumb={breadcrumb} />

      <section
        className="page-header"
        style={{
          backgroundImage: `url(${finalBg})`,
        }}
      >
        <div className="page-header-overlay"></div>
        <div className="container-fluid-px page-header-container">
          <div className="page-header-content">
            {/* Breadcrumb placed ABOVE the title — matching the WebTycoons original signature design */}
            {breadcrumb && breadcrumb.length > 0 && (
              <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                {breadcrumb.map((item, index) => (
                  <span key={index} className="breadcrumb-node">
                    {item.href ? (
                      <Link href={item.href} className="breadcrumb-link">
                        {item.name}
                      </Link>
                    ) : (
                      <span className="breadcrumb-current">{item.name}</span>
                    )}
                    {index < breadcrumb.length - 1 && (
                      <span className="breadcrumb-separator">/</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {/* The banner title is the document's primary heading (H1). */}
            <h1
              className="page-header-title"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h1>

            {subtitle && !description && (
              <p className="page-header-desc">{subtitle}</p>
            )}

            {description && (
              <p className="page-header-desc">{description}</p>
            )}

            {children && (
              <div className="page-header-actions">
                {children}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
