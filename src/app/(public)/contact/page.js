import ContactPageClient from "../../../components/features/webtycoons/pages/ContactPageClient";
import { connectDB } from "../../lib/config";
import ContactPageModel from "../../models/ContactPage";
import GlobalSetting from "../../models/GlobalSetting";

export const revalidate = 3600;

export async function generateMetadata() {
  await connectDB();
  const contact = await ContactPageModel.findOne();
  if (!contact) {
    return {
      title: 'Contact Us | WebTycoons',
      description: 'Get in touch with WebTycoons. We would love to discuss your project and help bring your vision to life.',
      alternates: { canonical: 'https://thewebtycoons.com/contact' },
    };
  }
  return {
    title: contact.metatag || 'Contact Us | WebTycoons',
    description: contact.metaDescription || 'Get in touch with WebTycoons.',
    alternates: { canonical: contact.canonicalUrl || 'https://thewebtycoons.com/contact' },
    openGraph: {
      title: contact.ogTitle || contact.metatag || 'Contact Us | WebTycoons',
      description: contact.ogDescription || contact.metaDescription || 'Get in touch with WebTycoons. Let us build something great together.',
    },
    robots: contact.robots || "index, follow",
  };
}

export default async function ContactPage() {
  await connectDB();
  const contact = await ContactPageModel.findOne();
  const data = contact ? JSON.parse(JSON.stringify(contact)) : null;
  
  const settings = await GlobalSetting.findOne();
  const globalSettings = settings ? JSON.parse(JSON.stringify(settings)) : null;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact WebTycoons",
    "url": "https://thewebtycoons.com/contact",
    "description": "Contact WebTycoons for web design and development services.",
    "mainEntity": {
      "@type": "Organization",
      "name": "WebTycoons",
      "telephone": "+91 8527458950",
      "email": "info@thewebtycoons.com"
    }
  };

  const schema = (data && data.schemaMarkup) ? data.schemaMarkup : defaultSchema;
  const schemaString = typeof schema === 'string' ? schema : JSON.stringify(schema);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaString }} />
      <ContactPageClient initialData={data} globalSettings={globalSettings} />
    </>
  );
}