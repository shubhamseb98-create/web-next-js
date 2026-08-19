'use client'
import { servicesData } from 'src/data/servicesData';
import ServiceHero from '../sections/services/ServiceHero';
import ServiceOverview from '../sections/services/ServiceOverview';
import ServiceFeatures from '../sections/services/ServiceFeatures';
import ServiceFAQs from '../sections/services/ServiceFAQs';

import DevelopmentProcess from '../sections/services/DevelopmentProcess';
import WhyChooseUsIconCards from '../sections/services/WhyChooseUsIconCards';
import TechStack from '../sections/services/TechStack';
import ServicePortfolio from '../sections/services/ServicePortfolio';
import ServiceCTA from '../sections/services/ServiceCTA';
import { whyChooseUsGlobal, staticPortfolioProjects, dynamicPortfolioProjects, ecommercePortfolioProjects, techStackGlobal } from 'src/data/servicesData';

export default function ServicePageClient({ service, slug, globalTechStack }) {
  if (!service) return null;

  // Find fallback data from the old static data file based on slug keywords
  let oldData = servicesData.static;
  let portfolioProjects = staticPortfolioProjects;
  
  if (slug.includes('dynamic')) {
    oldData = servicesData.dynamic;
    portfolioProjects = dynamicPortfolioProjects;
  }
  if (slug.includes('ecommerce') || slug.includes('e-commerce')) {
    oldData = servicesData.ecommerce;
    portfolioProjects = ecommercePortfolioProjects;
  }

  // Synthesize hero data combining DB and old design
  const heroData = {
    title: service.title,
    description: service.shortDesc || oldData?.hero?.description,
    image: service.breadcrumbImage || service.image || oldData?.hero?.image,
  };

  // Synthesize overview data combining DB and old design
  const overviewData = {
    description: service.description,
    whatIsIt: service.overviewWhatIsIt || oldData?.overview?.whatIsIt,
    whoNeedsIt: service.overviewWhoNeedsIt || oldData?.overview?.whoNeedsIt,
    whyChooseUs: service.overviewWhyChooseUs || oldData?.overview?.whyChooseUs,
    benefits: service.benefits?.length > 0 ? service.benefits : (oldData?.overview?.benefits || []),
    image: service.overviewImage || heroData.image
  };

  // Synthesize features, faqs, portfolio, process, and whyChooseUs
  const features = service.features?.length > 0 ? service.features : oldData?.features;
  const faqs = service.faq?.length > 0 ? service.faq : oldData?.faqs;
  const currentPortfolio = service.portfolio?.length > 0 ? service.portfolio : portfolioProjects;
  const processSteps = service.process?.length > 0 ? service.process : oldData?.process;
  const whyChooseUs = service.whyChooseUs?.length > 0 ? service.whyChooseUs : whyChooseUsGlobal;
  const currentTechStack = globalTechStack?.length > 0 ? globalTechStack : techStackGlobal;

  return (
    <main>
      <ServiceHero data={heroData} breadcrumbTitle={service.title} />
      <ServiceOverview data={overviewData} image={overviewData.image} />
      <ServiceFeatures features={features} />
      <TechStack techStack={currentTechStack} />
      <ServicePortfolio projects={currentPortfolio} serviceTitle={service.title} />
      <DevelopmentProcess processSteps={processSteps} />
      <WhyChooseUsIconCards reasons={whyChooseUs} />
      <ServiceFAQs faqs={faqs} />
      {/* Testimonials section can be added later if needed */}
      <ServiceCTA />
    </main>
  );
}