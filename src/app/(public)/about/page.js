import { Suspense } from 'react';
import { connectDB } from "../../lib/config";
import HomeSeo from "../../models/HomeSeo";

// Import section components
import AboutPageClient from "src/components/features/webtycoons/pages/AboutPageClient";

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    await connectDB();
    const seo = await HomeSeo.findOne({ pageSlug: 'about' }).lean();
    if (seo) {
      return {
        title: seo.title || 'About Us | WebTycoons',
        description: seo.metaDescription || 'Learn about WebTycoons — a premium web design & development agency with 15+ years of experience.',
        alternates: { canonical: seo.canonicalUrl || 'https://thewebtycoons.com/about' },
        openGraph: {
          title: seo.ogTitle || seo.title,
          description: seo.ogDescription || seo.metaDescription,
          images: seo.ogImage ? [{ url: seo.ogImage }] : [],
        },
      };
    }
  } catch {}
  return {
    title: 'About Us | WebTycoons',
    description: 'Learn about WebTycoons — a premium web design & development agency with 15+ years of experience building fast, beautiful, and SEO-optimized websites.',
    alternates: { canonical: 'https://thewebtycoons.com/about' },
    openGraph: {
      title: 'About Us | WebTycoons',
      description: 'Learn about WebTycoons — 15+ years of excellence in web design & development.',
    },
  };
}

import AboutPageConfig from "../../models/AboutPageConfig";
import TeamMember from "../../models/TeamMember";
import FounderSection from "../../models/FounderSection";

export default async function AboutPage() {
  await connectDB();
  let config = await AboutPageConfig.findOne().lean();
  if (!config) {
    // Fallback to default schema if not created yet
    config = new AboutPageConfig().toObject();
  }
  
  // Serialize ObjectId to string
  const serialize = (doc) => JSON.parse(JSON.stringify(doc));
  
  const [teamMembers, founderSectionDoc] = await Promise.all([
    TeamMember.find({ status: 'active' }).sort({ sort: 1 }).lean(),
    FounderSection.findOne().lean(),
  ]);
  const founderMember = founderSectionDoc || teamMembers?.find(m => /founder|ceo/i.test(m.role || m.designation)) || null;

  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About WebTycoons",
    "url": "https://thewebtycoons.com/about",
    "description": "WebTycoons is a premium web design & development agency with 15+ years of experience.",
    "mainEntity": {
      "@type": "Organization",
      "name": "WebTycoons",
      "foundingDate": "2011",
      "numberOfEmployees": "25+"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }} />
      <AboutPageClient data={serialize(config)} teamData={serialize(teamMembers)} founderData={serialize(founderMember)} />
    </>
  );
}