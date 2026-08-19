import Header from "src/components/layout/WebTycoonsHeader/Header";
import Footer from "src/components/layout/WebTycoonsFooter/Footer";
import MaintenanceScreen from "src/components/core/MaintenanceScreen";
import Script from "next/script";
import FloatingContactButtons from "src/components/layout/FloatingContactButtons";
import SmoothScroller from "src/components/animations/SmoothScroller";
import Preloader from "src/components/features/webtycoons/Preloader";
import "bootstrap/dist/css/bootstrap.min.css";

import 'swiper/css';

import { connectDB } from "src/app/lib/config";
import GlobalSetting from "src/app/models/GlobalSetting";
import Service from "src/app/models/Service";

// ISR: rebuild layout data every 5 minutes
export const revalidate = 300;

// WebTycoons base static navigation structure
const BASE_NAV = [
  { id: 1, title: "Home", slug: "/", children: [] },
  { id: 2, title: "About", slug: "/about", children: [] },
  {
    id: 3,
    title: "Services",
    slug: "/services",
    children: [], // To be populated dynamically
  },
  { id: 4, title: "Projects", slug: "/projects", children: [] },
  { id: 5, title: "Blog", slug: "/blog", children: [] },
  { id: 6, title: "Contact Us", slug: "/contact", children: [] },
];

export default async function PublicLayout({ children }) {
  let globalSettings = null;
  let navData = JSON.parse(JSON.stringify(BASE_NAV));

  try {
    await connectDB();
    const settings = await GlobalSetting.findOne().lean();
    if (settings) {
      globalSettings = JSON.parse(JSON.stringify(settings));
    }

    // Fetch active services to populate the Services dropdown
    const activeServices = await Service.find({ status: "active" }).sort({ sort: 1 }).lean();
    if (activeServices && activeServices.length > 0) {
      const servicesNavIndex = navData.findIndex((item) => item.title === "Services");
      if (servicesNavIndex !== -1) {
        // Set the parent link to the first service's slug
        navData[servicesNavIndex].slug = `/services/${activeServices[0].slug}`;
        
        navData[servicesNavIndex].children = activeServices.map((service, index) => ({
          id: `3${index}`,
          title: service.title,
          slug: `/services/${service.slug}`,
          children: [],
        }));
      }
    }
  } catch (error) {
    console.error("Failed to fetch global settings or services:", error);
  }

  if (globalSettings?.emergencyShutdown || globalSettings?.isMaintenanceMode) {
    return (
      <>
        <MaintenanceScreen
          isEmergency={globalSettings?.emergencyShutdown}
          message={globalSettings?.maintenanceMessage}
        />
      </>
    );
  }

  return (
    <SmoothScroller>
      <Preloader />
      <Header initialNavData={navData} initialGlobalSettings={globalSettings} />
      {children}
      <Footer />
      {globalSettings?.googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${globalSettings.googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${globalSettings.googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
      {globalSettings?.googleTagManagerId && (
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${globalSettings.googleTagManagerId}');
          `}
        </Script>
      )}
      {globalSettings?.customBodyCode && (
        <div
          id="custom-body-code"
          dangerouslySetInnerHTML={{ __html: globalSettings.customBodyCode }}
        />
      )}
      <FloatingContactButtons
        phoneNumber={globalSettings?.primaryPhone || "+91 8527458950"}
        socialLinks={globalSettings?.socialLinks || []}
      />
    </SmoothScroller>
  );
}