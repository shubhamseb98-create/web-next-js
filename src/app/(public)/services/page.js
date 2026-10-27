import { connectDB } from "../../lib/config";
import Service from "../../models/Service";
import HomeSeo from "../../models/HomeSeo";
import PageHeader from "src/components/layout/PageHeader";
import ServicesGrid from "src/components/features/webtycoons/sections/ServicesGrid";
import CallToAction from "src/components/features/webtycoons/sections/CallToAction";

export const revalidate = 300;

export async function generateMetadata() {
  try {
    await connectDB();
    const seo = await HomeSeo.findOne({ pageSlug: 'services' }).lean();
    if (seo) {
      return {
        title: seo.title || 'Our Services | WebTycoons',
        description: seo.metaDescription || 'Explore our full range of web design, development, and digital marketing services.',
        alternates: { canonical: 'https://thewebtycoons.com/services' },
      };
    }
  } catch {}
  return {
    title: 'Our Services | WebTycoons',
    description: 'Explore WebTycoons full range of premium web design, software development, e-commerce, and digital marketing services.',
    alternates: { canonical: 'https://thewebtycoons.com/services' },
    openGraph: {
      title: 'Our Services | WebTycoons',
      description: 'Explore WebTycoons full range of premium web design, software development, and digital marketing services.',
    },
  };
}

export default async function ServicesPage() {
  let services = [];
  try {
    await connectDB();
    services = await Service.find({ status: 'active' }).sort({ sort: 1, createdAt: -1 }).lean();
  } catch (error) {
    console.error('Failed to load services:', error);
  }

  const serialize = (doc) => JSON.parse(JSON.stringify(doc));
  const activeServices = services.length > 0 
    ? services.map(s => ({ ...serialize(s), isFeatured: true })) 
    : undefined;

  return (
    <main style={{ backgroundColor: '#070a06', minHeight: '100vh' }}>
      <PageHeader
        title={`Custom Digital Solutions <br /><span class="textGreen">– Engineered For Growth</span>`}
        description="From high-performance bespoke websites and e-commerce stores to enterprise software and revenue-generating digital marketing."
        bgImage="/images/banners/products-it-company.jpg"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Services" }
        ]}
      />

      <div style={{ padding: '20px 0' }}>
        <ServicesGrid servicesData={activeServices} />
      </div>

      <CallToAction />
    </main>
  );
}
