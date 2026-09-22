import { notFound } from "next/navigation";
import { connectDB } from "../../../lib/config";
import Service from "../../../models/Service";
import ServicePageClient from "src/components/features/webtycoons/pages/ServicePageClient";
import { mergeRealEstateData } from "../../../../lib/realEstateDefaults";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Static service slugs that always exist
const STATIC_SERVICES = [
  'website-designing',
  'static-website-development',
  'dynamic-website-development', 
  'e-commerce-website-development',
  'logo-designing',
  'domain',
  'digital-marketing-solution',
  'email-solution',
  'real-estate-advisory',
];

export async function generateStaticParams() {
  try {
    await connectDB();
    const allDbServices = await Service.find({}).select('slug status').lean();
    const activeSlugs = allDbServices.filter(s => s.status === 'active').map(s => ({ slug: s.slug }));
    const inactiveSlugs = new Set(allDbServices.filter(s => s.status !== 'active').map(s => s.slug));
    const staticSlugs = STATIC_SERVICES
      .filter(s => !inactiveSlugs.has(s) && !activeSlugs.find(d => d.slug === s))
      .map(s => ({ slug: s }));
    return [...activeSlugs, ...staticSlugs];
  } catch {
    return STATIC_SERVICES.map(s => ({ slug: s }));
  }
}

const STATIC_SERVICE_DATA = {
  'website-designing': {
    title: 'Website Designing',
    shortDesc: 'Crafting visually stunning, user-centric interfaces that captivate your audience, reflect brand authority, and maximize conversions.',
    description: 'We specialize in modern, bespoke UI/UX website designing that elevates your brand from ordinary to unforgettable. Every layout, color palette, typography hierarchy, and micro-interaction is custom crafted to communicate your core value proposition clearly and guide visitors seamlessly toward conversion.',
    features: ['Bespoke UI/UX Architecture', 'Mobile-First Responsiveness', 'Interactive Figma Prototypes', 'Design Systems & Tokens', 'Conversion Rate Optimization (CRO)', 'Micro-Interactions & Motion Accents', 'Accessibility & WCAG Compliance', 'Cross-Browser Visual Perfection'],
    icon: '🎨',
    image: '/assets/img/homeservice/service2.svg',
  },
  'static-website-development': {
    title: 'Static Website Development',
    shortDesc: 'Lightning-fast, ultra-secure static websites built with modern frameworks.',
    description: 'We design and develop blazing-fast static websites using cutting-edge JAMstack technology. Static sites offer unparalleled performance, rock-solid security, and lower hosting costs.',
    features: ['Lightning-fast load times', 'Zero server vulnerabilities', 'Easy to deploy globally', 'Perfect Core Web Vitals', 'Fully customizable design', 'SEO-optimized structure'],
    icon: '🚀',
    image: '/assets/img/homeservice/service3.svg',
  },
  'dynamic-website-development': {
    title: 'Dynamic Website Development',
    shortDesc: 'Powerful CMS-driven websites that you can update without any coding.',
    description: 'Our dynamic websites are built with robust backends and intuitive CMS platforms, enabling you to manage content, grow your site, and scale your business effortlessly.',
    features: ['Custom admin dashboard', 'Content management system', 'User authentication & roles', 'API integrations', 'Real-time data processing', 'Scalable architecture'],
    icon: '⚡',
    image: '/assets/img/homeservice/service1.webp',
  },
  'e-commerce-website-development': {
    title: 'E-Commerce Website Development',
    shortDesc: 'Revenue-generating online stores with seamless checkout experiences.',
    description: 'We build comprehensive e-commerce solutions that convert visitors into customers. From product catalog to payment gateway integration, we handle every aspect of your online store.',
    features: ['Seamless checkout flow', 'Payment gateway integration', 'Inventory management', 'Order tracking system', 'Mobile-first design', 'Advanced analytics'],
    icon: '🛒',
    image: '/assets/img/homeservice/service4.webp',
  },
  'logo-designing': {
    title: 'Logo Designing',
    shortDesc: 'Creating memorable, unique, and impactful logos and brand identities that establish a strong, recognizable market presence.',
    description: 'Your logo is the foundation of your company’s visual identity. We craft iconic, timeless logos and complete brand identity packages that captivate audiences, evoke trust, and stand out across digital platforms, print collateral, and physical merchandise.',
    features: ['Bespoke Conceptual Sketching', 'Infinite Vector Scalability', 'Comprehensive Brand Guidelines', 'Typography Pairing & Hierarchy', 'Social Media & Favicon Kit', 'Stationery & Collateral Mockups', '100% Commercial Copyright Transfer', 'Multiple Master File Formats'],
    icon: '✒️',
    image: '/assets/img/homeservice/service6.webp',
  },
  'domain': {
    title: 'Domain & Hosting',
    shortDesc: 'Secure domain registration, DNS zone routing, enterprise SSL certification, and ultra-fast hosting setup.',
    description: 'Your domain is your digital address and the cornerstone of your online credibility. We provide enterprise-grade domain registration, DNS routing with Anycast global resolution, automated SSL/TLS certificate management, and bulletproof security against DNS hijacking.',
    features: ['Instant Domain Registration & TLDs', 'Free Whois Privacy Guard', 'Anycast Global DNS Routing', 'Automated SSL/TLS Encryption', 'DNSSEC Hijack Protection', 'Seamless Email & CDN Integration'],
    icon: '🌐',
    image: '/assets/img/homeservice/service5.svg',
  },
  'digital-marketing-solution': {
    title: 'Digital Marketing Solution',
    shortDesc: 'Data-driven performance marketing: Google PPC ads, Meta campaigns, SEO, and conversion funnels engineered for maximum ROI.',
    description: 'Driving sustainable business growth requires more than just traffic—it demands high-intent, converting customers. Our performance marketing solutions encompass Google Search ads, Meta (Facebook & Instagram) ads, audience retargeting funnels, and conversion rate optimization to scale your revenue predictably.',
    features: ['Google Search & Shopping PPC', 'Meta (Facebook & Instagram) Ads', 'Full-Funnel Retargeting', 'Precision Conversion Tracking', 'High-Converting Ad Creatives', 'A/B Split Testing', 'Transparent Real-Time Dashboards', 'Landing Page Optimization'],
    icon: '📈',
    image: '/assets/img/homeservice/service7.webp',
  },
  'email-solution': {
    title: 'Email Solution',
    shortDesc: 'Enterprise business email hosting with 99.99% uptime, advanced spam filtering, custom domain branding, and cloud synchronization.',
    description: 'Establish instant trust and authority with custom business email addresses matching your domain. We deploy and manage enterprise email solutions on Google Workspace, Microsoft 365, and secure private cloud mail servers, featuring spam shields, multi-device sync, and seamless migration.',
    features: ['Custom Domain Branding', '99.99% Uptime SLA', 'AI Spam & Anti-Phishing Shield', 'SPF, DKIM & DMARC Delivery', 'Seamless Multi-Device Sync', 'Large Mailbox Storage & Cloud Drive', 'Zero-Downtime Inbox Migration', 'Shared Calendars & Contacts'],
    icon: '✉️',
    image: '/assets/img/homeservice/service8.webp',
  },
  'real-estate-advisory': {
    title: 'Real Estate Business Growth & Scaling Advisory',
    shortDesc: 'Strategic growth advisory, high-ticket buyer lead funnels, PropTech platforms, and sales automation for builders & agencies.',
    description: 'We do not sell properties. We advise real estate builders, developers, agencies, and channel partners on how to generate 10x high-ticket buyer leads, automate sales funnels, and scale project revenues.',
    features: [
      'High-Ticket Buyer & NRI Lead Generation', 
      'PropTech 3D Portals & Interactive Unit Selectors', 
      'Instant WhatsApp CRM & Zero Lead Leakage Automation', 
      'Project Launch GTM Playbooks & Rapid Inventory Absorption', 
      'Channel Partner Network Scaling & Portals', 
      'Local Micro-Market Domination SEO'
    ],
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    await connectDB();
    const service = await Service.findOne({ slug: slug }).lean();
    if (service) {
      if (service.status !== 'active') {
        return {
          title: 'Service Not Found | WebTycoons',
          robots: { index: false, follow: false },
        };
      }
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

  return { title: 'Service Not Found | WebTycoons', robots: { index: false, follow: false } };
}

import Technology from "../../../models/Technology";
import HomeExtra from "../../../models/HomeExtra";

export default async function ServicePage({ params }) {
  const { slug } = await params;
  let serviceData = null;
  let globalTechStack = [];
  let homeExtra = null;
  let isInactive = false;

  try {
    await connectDB();
    const [service, techs, homeExtraDoc] = await Promise.all([
      Service.findOne({ slug: slug }).lean(),
      Technology.find({ status: 'active' }).sort({ category: 1, sort: 1 }).lean(),
      HomeExtra.findOne().lean(),
    ]);

    if (service) {
      // If service exists in DB and is NOT active (e.g. draft/turned off), mark inactive
      if (service.status !== 'active') {
        isInactive = true;
      } else {
        serviceData = JSON.parse(JSON.stringify(service));
      }
    }
    
    if (techs) globalTechStack = JSON.parse(JSON.stringify(techs));
    if (homeExtraDoc) homeExtra = JSON.parse(JSON.stringify(homeExtraDoc));
  } catch (err) {
    console.error("ServicePage DB fetch error:", err);
  }

  // If service exists in DB and was turned off (draft), return 404 immediately!
  // NEVER fall back to static data for an inactive/draft service.
  if (isInactive) {
    notFound();
  }

  // Only fall back to static data if the service does NOT exist in the database at all
  if (!serviceData) {
    serviceData = STATIC_SERVICE_DATA[slug] || null;
  }

  if (slug === 'real-estate-advisory' || serviceData?.slug === 'real-estate-advisory') {
    serviceData = mergeRealEstateData(serviceData || {});
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
      <ServicePageClient 
        service={serviceData} 
        slug={slug} 
        globalTechStack={globalTechStack} 
        homeExtraData={homeExtra}
      />
    </>
  );
}