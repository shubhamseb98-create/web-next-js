import { cache } from "react";
import { connectDB } from "../lib/config";
import Blog from "../models/Blog";
import GlobalSetting from "../models/GlobalSetting";
import HomeSeo from "../models/HomeSeo";
import Portfolio from "../models/Portfolio";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";

// WebTycoons section components - Server Components
import AboutCompany from "src/components/features/webtycoons/sections/AboutCompany";
import ServicesGrid from "src/components/features/webtycoons/sections/ServicesGrid";
import TechnicalExpertise from "src/components/features/webtycoons/sections/TechnicalExpertise";
import TechnologiesSection from "src/components/features/webtycoons/sections/TechnologiesSection";
import CallToAction from "src/components/features/webtycoons/sections/CallToAction";
import LatestThinking from "src/components/features/webtycoons/sections/LatestThinking";

// Client Components (need browser APIs / animations)
import Hero from "src/components/features/webtycoons/sections/Hero";
import SlantSlider from "src/components/features/webtycoons/sections/SlantSlider";
import ClientsSlider from "src/components/features/webtycoons/sections/ClientsSlider";
import StatsCounter from "src/components/features/webtycoons/sections/StatsCounter";
import GsapFeaturedProjects from "src/components/features/webtycoons/sections/GsapFeaturedProjects";
import TeamSection from "src/components/features/webtycoons/sections/TeamSection";
import TestimonialsSection from "src/components/features/webtycoons/sections/TestimonialsSection";

// ISR: rebuild at most every 5 minutes
export const revalidate = 300;

const getHomeSeo = cache(async () => {
  await connectDB();
  return HomeSeo.findOne({ pageSlug: 'home' }).lean();
});

export async function generateMetadata() {
  const seoData = await getHomeSeo();

  if (!seoData) {
    return {
      title: 'WebTycoons | Web Design & Development Agency',
      description: 'WebTycoons is a premium web design & development agency specializing in custom websites, e-commerce, SEO, and digital growth solutions.',
    };
  }

  return {
    title: seoData.title || 'WebTycoons | Web Design & Development Agency',
    description: seoData.metaDescription || '',
    keywords: seoData.metaKeywords?.length ? seoData.metaKeywords : undefined,
    alternates: {
      canonical: seoData.canonicalUrl || 'https://thewebtycoons.com',
    },
    openGraph: {
      title: seoData.ogTitle || seoData.title,
      description: seoData.ogDescription || seoData.metaDescription,
      images: seoData.ogImage ? [{ url: seoData.ogImage, width: 1200, height: 630, alt: seoData.title }] : [],
      type: 'website',
    },
    robots: seoData.robots || 'index, follow',
  };
}

export default async function WebTycoonsHomePage() {
  await connectDB();

  const [seoData, blogs, portfolio, testimonials, settings, homeAboutArr, services, ctaArr, banners, homeExtraArr, works, clients, achievements, capabilities, technologies, teamMembers, featuredProjectsSection] = await Promise.all([
    getHomeSeo(),
    Blog.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 }).limit(5).lean(),
    Portfolio.find({ status: 'active', isFeatured: true }).sort({ sort: 1 }).limit(6).lean(),
    Testimonial.find({ isActive: true }).sort({ sort: 1 }).lean(),
    GlobalSetting.findOne().lean(),
    // New dynamic queries
    import('../models/HomeAbout').then(m => m.default.find().lean()),
    Service.find({ status: 'active' }).sort({ sort: 1 }).lean(),
    import('../models/Cta').then(m => m.default.find().lean()),
    import('../models/Banner').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/HomeExtra').then(m => m.default.find().lean()),
    import('../models/Work').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/Client').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/Achievement').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/Capability').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/Technology').then(m => m.default.find({ status: 'active' }).sort({ category: 1, sort: 1 }).lean()),
    import('../models/TeamMember').then(m => m.default.find({ status: 'active' }).sort({ sort: 1 }).lean()),
    import('../models/HomeFeaturedProjectsSection').then(m => m.default.findOne().lean()),
  ]);

  const homeAbout = homeAboutArr?.[0] || null;
  const cta = ctaArr?.[0] || null;
  const homeExtra = homeExtraArr?.[0] || null;

  const serialize = (doc) => {
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  };

  const schemaObj = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "WebTycoons",
        "url": "https://thewebtycoons.com",
        "logo": "https://thewebtycoons.com/assets/img/logo-new.png",
        "description": "Premium web design & development agency specializing in custom websites, e-commerce, and SEO.",
        "telephone": "+91 8527458950",
        "email": "info@thewebtycoons.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Noida",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        },
        "serviceType": ["Web Design", "Web Development", "E-Commerce Development", "SEO", "Digital Marketing"]
      },
      {
        "@type": "WebSite",
        "name": "WebTycoons",
        "url": "https://thewebtycoons.com"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
      />
      
      {/* Hero - Client Component for GSAP animations */}
      <Hero bannerData={serialize(banners)} />

      {/* SlantSlider - Client Component for Swiper */}
      <SlantSlider workData={serialize(works)} homeExtraData={serialize(homeExtra)} />

      {/* About Company - Server Component */}
      <AboutCompany aboutData={serialize(homeAbout)} />

      {/* Services Grid - Server Component */}
      <ServicesGrid servicesData={serialize(services)} homeExtraData={serialize(homeExtra)} />

      {/* Clients Slider - Client Component */}
      <ClientsSlider clientsData={serialize(clients)} homeExtraData={serialize(homeExtra)} />

      {/* Stats Counter - Client Component for counter animation */}
      <StatsCounter achievementsData={serialize(achievements)} homeExtraData={serialize(homeExtra)} />

      {/* Technical Expertise - Server Component */}
      <TechnicalExpertise capabilitiesData={serialize(capabilities)} homeExtraData={serialize(homeExtra)} />

      {/* Technologies - Server Component */}
      <TechnologiesSection technologiesData={serialize(technologies)} homeExtraData={serialize(homeExtra)} />

      {/* Featured Projects - Client Component for GSAP */}
      <GsapFeaturedProjects 
        portfolioData={serialize(portfolio)} 
        sectionData={{
          ...serialize(featuredProjectsSection),
          title: homeExtra?.featured_project_title || featuredProjectsSection?.title || 'Featured',
          titleHighlight: homeExtra?.featured_project_subtitle || featuredProjectsSection?.titleHighlight || 'Projects',
          intro: homeExtra?.featured_project_description || featuredProjectsSection?.intro || 'Explore a curated selection of our most recent and impactful work. Scroll down to experience our stacked GSAP presentation.'
        }} 
      />
      {/* Team Section - Client Component for state */}
      <TeamSection teamData={serialize(teamMembers)} homeExtraData={serialize(homeExtra)} />

      {/* Testimonials - Client Component for Swiper */}
      <TestimonialsSection testimonialsData={serialize(testimonials)} homeExtraData={serialize(homeExtra)} />

      {/* Latest Blog Posts - Server Component */}
      <LatestThinking blogsData={serialize(blogs)} homeExtraData={serialize(homeExtra)} />

      {/* Call to Action - Server Component */}
      <CallToAction ctaData={serialize(cta)} settings={serialize(settings)} />
    </>
  );
}