import { connectDB } from "../../lib/config";
import Portfolio from "../../models/Portfolio";
import ContactPage from "../../models/ContactPage";
import ProjectFaq from "../../models/ProjectFaq";
import HomeSeo from "../../models/HomeSeo";
import PortfolioGrid from "src/components/features/webtycoons/pages/PortfolioGrid";

export const revalidate = 300;

export async function generateMetadata() {
  return {
    title: 'Our Projects | WebTycoons',
    description: 'Explore our portfolio of websites, e-commerce stores, web apps, and digital experiences we have built for clients worldwide.',
    alternates: { canonical: 'https://thewebtycoons.com/projects' },
    openGraph: {
      title: 'Our Projects | WebTycoons',
      description: 'Explore our portfolio of stunning websites and digital experiences.',
    },
  };
}

export default async function ProjectsPage() {
  let portfolioItems = [];
  let contactConfig = null;
  let projectFaqs = [];
  try {
    await connectDB();
    const [items, contact, faqs] = await Promise.all([
      Portfolio.find({ status: 'active' }).sort({ sort: 1, createdAt: -1 }).lean(),
      ContactPage.findOne().lean(),
      ProjectFaq.find({ status: 'active' }).sort({ sort: 1, createdAt: 1 }).lean()
    ]);
    portfolioItems = JSON.parse(JSON.stringify(items || []));
    if (contact) contactConfig = JSON.parse(JSON.stringify(contact));
    if (faqs && faqs.length > 0) projectFaqs = JSON.parse(JSON.stringify(faqs));
  } catch (error) {
    console.error('Failed to load portfolio:', error);
  }

  const categories = ['All', ...new Set(portfolioItems.map(p => p.category).filter(Boolean))];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "WebTycoons Portfolio",
    "description": "Portfolio of web design and development projects",
    "url": "https://thewebtycoons.com/projects",
    "numberOfItems": portfolioItems.length,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PortfolioGrid items={portfolioItems} categories={categories} contactConfig={contactConfig} faqs={projectFaqs} />
    </>
  );
}