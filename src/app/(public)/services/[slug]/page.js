import { notFound } from "next/navigation";
import { connectDB } from "../../../lib/config";
import Service from "../../../models/Service";
import ServicePageClient from "src/components/features/webtycoons/pages/ServicePageClient";

export const revalidate = 3600;

// Static service slugs that always exist
const STATIC_SERVICES = [
  'static-website-development',
  'dynamic-website-development', 
  'e-commerce-website-development',
];

export async function generateStaticParams() {
  try {
    await connectDB();
    const services = await Service.find({ status: 'active' }).select('slug').lean();
    const dbSlugs = services.map(s => ({ slug: s.slug }));
    const staticSlugs = STATIC_SERVICES
      .filter(s => !dbSlugs.find(d => d.slug === s))
      .map(s => ({ slug: s }));
    return [...dbSlugs, ...staticSlugs];
  } catch {
    return STATIC_SERVICES.map(s => ({ slug: s }));
  }
}

const STATIC_SERVICE_DATA = {
  'static-website-development': {
    title: 'Static Website Development',
    shortDesc: 'Lightning-fast, ultra-secure static websites built with modern frameworks.',
    description: 'We design and develop blazing-fast static websites using cutting-edge JAMstack technology. Static sites offer unparalleled performance, rock-solid security, and lower hosting costs.',
    features: ['Lightning-fast load times', 'Zero server vulnerabilities', 'Easy to deploy globally', 'Perfect Core Web Vitals', 'Fully customizable design', 'SEO-optimized structure'],
    icon: '🚀',
    image: '/assets/img/service/featured-projects.png',
  },
  'dynamic-website-development': {
    title: 'Dynamic Website Development',
    shortDesc: 'Powerful CMS-driven websites that you can update without any coding.',
    description: 'Our dynamic websites are built with robust backends and intuitive CMS platforms, enabling you to manage content, grow your site, and scale your business effortlessly.',
    features: ['Custom admin dashboard', 'Content management system', 'User authentication & roles', 'API integrations', 'Real-time data processing', 'Scalable architecture'],
    icon: '⚡',
    image: '/assets/img/service/featured-projects.png',
  },
  'e-commerce-website-development': {
    title: 'E-Commerce Website Development',
    shortDesc: 'Revenue-generating online stores with seamless checkout experiences.',
    description: 'We build comprehensive e-commerce solutions that convert visitors into customers. From product catalog to payment gateway integration, we handle every aspect of your online store.',
    features: ['Seamless checkout flow', 'Payment gateway integration', 'Inventory management', 'Order tracking system', 'Mobile-first design', 'Advanced analytics'],
    icon: '🛒',
    image: '/assets/img/service/featured-projects.png',
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const service = await Service.findOne({ slug: slug, status: 'active' }).lean();
    if (service) {
      return {
        title: `${service.metaTitle || service.title} | WebTycoons`,
        description: service.metaDescription || service.shortDesc,
        alternates: { canonical: `https://thewebtycoons.com/services/${slug}` },
      };
    }
  } catch {}

  const staticData = STATIC_SERVICE_DATA[slug];
  if (staticData) {
    return {
      title: `${staticData.title} | WebTycoons`,
      description: staticData.shortDesc,
      alternates: { canonical: `https://thewebtycoons.com/services/${slug}` },
      openGraph: { title: `${staticData.title} | WebTycoons`, description: staticData.shortDesc },
    };
  }

  return { title: 'Service Not Found | WebTycoons' };
}

import Technology from "../../../models/Technology";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  let serviceData = null;
  let globalTechStack = [];

  try {
    await connectDB();
    const service = await Service.findOne({ slug: slug, status: 'active' }).lean();
    if (service) serviceData = JSON.parse(JSON.stringify(service));
    
    const techs = await Technology.find({ status: 'active' }).sort({ category: 1, sort: 1 }).lean();
    globalTechStack = JSON.parse(JSON.stringify(techs));
  } catch {}

  if (!serviceData) {
    serviceData = STATIC_SERVICE_DATA[slug] || null;
  }

  if (!serviceData) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceData.title,
    "description": serviceData.shortDesc,
    "provider": { "@type": "Organization", "name": "WebTycoons", "url": "https://thewebtycoons.com" },
    "url": `https://thewebtycoons.com/services/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ServicePageClient service={serviceData} slug={slug} globalTechStack={globalTechStack} />
    </>
  );
}