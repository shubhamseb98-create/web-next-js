import { Poppins, Rajdhani } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";
import NavigationProgress from "src/components/core/NavigationProgress";
import ClientTracker from "src/components/core/ClientTracker";
import FloatingContactButtons from "src/components/layout/FloatingContactButtons";
import SmoothScroller from "src/components/animations/SmoothScroller";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});
import { connectDB } from "./lib/config";
import GlobalSetting from "./models/GlobalSetting";

export async function generateMetadata() {
  let faviconUrl = '/favicon.ico';
  try {
    await connectDB();
    const settings = await GlobalSetting.findOne().lean();
    if (settings?.favicon) faviconUrl = settings.favicon;
  } catch (e) {
    console.error("Failed to load favicon from DB", e);
  }

  return {
    metadataBase: new URL('https://thewebtycoons.com'),
    title: {
      default: 'WebTycoons | Web Design & Development Agency',
      template: '%s | WebTycoons'
    },
    description: 'WebTycoons is a premium web design & development agency specializing in custom websites, e-commerce, SEO, and digital growth solutions for businesses worldwide.',
    alternates: {
      canonical: 'https://thewebtycoons.com',
    },
    icons: {
      icon: faviconUrl,
    },
    openGraph: {
      title: 'WebTycoons | Web Design & Development Agency',
      description: 'Premium web design & development agency. We build fast, SEO-optimized, beautiful websites that drive results.',
      url: 'https://thewebtycoons.com',
      siteName: 'WebTycoons',
      locale: 'en_US',
      type: 'website',
      images: [{
        url: 'https://thewebtycoons.com/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'WebTycoons — Web Design & Development Agency',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'WebTycoons | Web Design & Development Agency',
      description: 'Premium web design & development agency building fast, SEO-optimized websites.',
      images: ['https://thewebtycoons.com/images/og-default.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'WebTycoons',
    url: 'https://thewebtycoons.com',
    logo: 'https://thewebtycoons.com/assets/img/logo-new.png',
    description: 'WebTycoons is a premium web design & development agency specializing in custom websites, e-commerce, SEO, and digital growth.',
    foundingDate: '2011',
    email: 'info@thewebtycoons.com',
    telephone: '+91 8527458950',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.linkedin.com/company/thewebtycoons',
      'https://www.instagram.com/thewebtycoons',
      'https://www.facebook.com/thewebtycoons'
    ]
  };


  return (
    <html
      lang="en"
      className={`h-full antialiased ${poppins.variable} ${rajdhani.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NavigationProgress />
        <ClientTracker />
        {children}
      </body>
    </html>
  );
}
