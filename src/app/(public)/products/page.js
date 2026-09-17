import { connectDB } from "../../lib/config";
import Product from "../../models/Product";
import Category from "../../models/Category";
import { DEFAULT_CRM_CATEGORIES, DEFAULT_CRM_PRODUCTS } from "../../../lib/crmDefaults";
import CrmProductsShowcase from "../../../components/features/products/CrmProductsShowcase";

export const revalidate = 180; // Revalidate every 3 minutes

export async function generateMetadata() {
  return {
    title: "Custom CRM Solutions & Software Platforms | WebTycoons",
    description:
      "Explore our enterprise custom CRM platforms: Real Estate CRM, Sales Pipeline & Lead Automation, Healthcare CRM, and Omnichannel Retail Systems. 100% data ownership, zero per-seat fees.",
    alternates: { canonical: "https://thewebtycoons.com/products" },
    openGraph: {
      title: "Enterprise Custom CRM Products | WebTycoons",
      description:
        "Purpose-built custom CRM architectures designed for lead acceleration, multi-pipeline automation, and actionable analytics tailored to your industry.",
      images: [{ url: "/assets/img/service/featured-projects.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Custom CRM Platforms | WebTycoons",
      description: "Scale faster with dedicated custom CRM systems built for your industry pipelines.",
    },
  };
}

export default async function ProductsPage() {
  let products = [];
  let categories = [];

  try {
    await connectDB();
    const [dbProducts, dbCategories] = await Promise.all([
      Product.find({ isActive: true })
        .populate("category", "name slug")
        .sort({ sort: 1, createdAt: -1 })
        .lean(),
      Category.find({ isActive: true }).sort({ sort: 1 }).lean(),
    ]);

    if (dbProducts && dbProducts.length > 0) {
      products = JSON.parse(JSON.stringify(dbProducts));
    }
    if (dbCategories && dbCategories.length > 0) {
      categories = JSON.parse(JSON.stringify(dbCategories));
    }
  } catch (err) {
    console.error("Error fetching products from DB:", err);
  }

  // Merge DB products with default high-grade CRM specifications
  if (products.length === 0) {
    products = DEFAULT_CRM_PRODUCTS;
  } else {
    products = products.map((p) => {
      const defaultItem = DEFAULT_CRM_PRODUCTS.find(
        (d) => d.slug === p.slug || d.name?.toLowerCase() === p.name?.toLowerCase()
      );
      if (!defaultItem) return p;

      const isBadImage =
        !p.image ||
        p.image.includes("featured-projects.png") ||
        p.image.includes("slide1.jpg");

      return {
        ...defaultItem,
        ...p,
        image: isBadImage ? defaultItem.image : p.image,
        detailImage: isBadImage ? defaultItem.detailImage : (p.detailImage || p.image),
        tagline: p.tagline || defaultItem.tagline,
        metrics: p.metrics && p.metrics.length > 0 ? p.metrics : defaultItem.metrics,
        features: p.features && p.features.length > 0 ? p.features : defaultItem.features,
        techStack: p.techStack && p.techStack.length > 0 ? p.techStack : defaultItem.techStack,
        grade: p.grade || defaultItem.grade,
      };
    });
  }

  if (categories.length === 0) {
    categories = DEFAULT_CRM_CATEGORIES;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Custom CRM Solutions by WebTycoons",
    "description": "Catalog of custom enterprise CRM systems and workflow platforms.",
    "itemListElement": products.map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": p.name,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Cloud, iOS, Android",
        "url": `https://thewebtycoons.com/products/${p.slug}`,
        "description": p.tagline || (p.description ? p.description.replace(/<[^>]+>/g, "").slice(0, 160) : p.name)
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CrmProductsShowcase products={products} categories={categories} />
    </>
  );
}
