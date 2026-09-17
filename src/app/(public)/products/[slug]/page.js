import { notFound } from "next/navigation";
import { connectDB } from "../../../lib/config";
import Product from "../../../models/Product";
import Category from "../../../models/Category";
import { DEFAULT_CRM_PRODUCTS } from "../../../../lib/crmDefaults";
import CrmDetailClient from "../../../../components/features/products/CrmDetailClient";

export const revalidate = 180;

export async function generateStaticParams() {
  try {
    await connectDB();
    const items = await Product.find({ isActive: true }).select("slug").lean();
    if (items && items.length > 0) {
      return items.map((it) => ({ slug: it.slug }));
    }
  } catch (err) {
    console.error("Error in generateStaticParams:", err);
  }
  return DEFAULT_CRM_PRODUCTS.map((it) => ({ slug: it.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let product = null;
  try {
    await connectDB();
    product = await Product.findOne({ slug, isActive: true })
      .populate("category", "name slug")
      .lean();
  } catch (err) {
    console.error("Error fetching product metadata:", err);
  }

  if (!product) {
    product = DEFAULT_CRM_PRODUCTS.find((p) => p.slug === slug);
  }

  if (!product) {
    return {
      title: "CRM Product Not Found | WebTycoons",
      description: "The requested CRM platform could not be found.",
    };
  }

  const title = product.metatag || `${product.name} | WebTycoons Custom CRM Platform`;
  const description =
    product.metaDescription ||
    product.tagline ||
    `Explore ${product.name}, a custom enterprise CRM architecture with zero per-user seat fees and complete data ownership.`;

  return {
    title,
    description,
    keywords: product.metakeywords?.length ? product.metakeywords : ["crm", "custom crm", product.name],
    alternates: { canonical: `https://thewebtycoons.com/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://thewebtycoons.com/products/${slug}`,
      images: [
        {
          url: product.image?.startsWith("http") || product.image?.startsWith("/")
            ? product.image
            : "/assets/img/service/featured-projects.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let product = null;
  let allProducts = [];

  try {
    await connectDB();
    const [dbProduct, dbAll] = await Promise.all([
      Product.findOne({ slug, isActive: true })
        .populate("category", "name slug")
        .lean(),
      Product.find({ isActive: true })
        .populate("category", "name slug")
        .sort({ sort: 1 })
        .lean(),
    ]);

    if (dbProduct) {
      product = JSON.parse(JSON.stringify(dbProduct));
    }
    if (dbAll && dbAll.length > 0) {
      allProducts = JSON.parse(JSON.stringify(dbAll));
    }
  } catch (err) {
    console.error("Error fetching product detail:", err);
  }

  // Merge DB product with default high-grade CRM specifications
  const defaultProduct = DEFAULT_CRM_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    product = defaultProduct;
  } else if (defaultProduct) {
    const isBadImage =
      !product.image ||
      product.image.includes("featured-projects.png") ||
      product.image.includes("slide1.jpg");
    product = {
      ...defaultProduct,
      ...product,
      image: isBadImage ? defaultProduct.image : product.image,
      detailImage: isBadImage ? defaultProduct.detailImage : (product.detailImage || product.image),
      tagline: product.tagline || defaultProduct.tagline,
      metrics: product.metrics && product.metrics.length > 0 ? product.metrics : defaultProduct.metrics,
      features: product.features && product.features.length > 0 ? product.features : defaultProduct.features,
      modules: product.modules && product.modules.length > 0 ? product.modules : defaultProduct.modules,
      techStack: product.techStack && product.techStack.length > 0 ? product.techStack : defaultProduct.techStack,
      grade: product.grade || defaultProduct.grade,
    };
  }

  if (!product) {
    notFound();
  }

  if (allProducts.length === 0) {
    allProducts = DEFAULT_CRM_PRODUCTS;
  } else {
    allProducts = allProducts.map((p) => {
      const def = DEFAULT_CRM_PRODUCTS.find((d) => d.slug === p.slug);
      if (!def) return p;
      const isBadImage = !p.image || p.image.includes("featured-projects.png") || p.image.includes("slide1.jpg");
      return {
        ...def,
        ...p,
        image: isBadImage ? def.image : p.image,
        detailImage: isBadImage ? def.detailImage : (p.detailImage || p.image),
      };
    });
  }

  const relatedProducts = allProducts.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud, Web, Mobile",
    "url": `https://thewebtycoons.com/products/${product.slug}`,
    "description": product.tagline || (product.description ? product.description.replace(/<[^>]+>/g, "").slice(0, 160) : product.name),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Custom Architecture & Deployment"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || "4.9",
      "reviewCount": product.reviewsCount || 48
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://thewebtycoons.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://thewebtycoons.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://thewebtycoons.com/products/${product.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CrmDetailClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
