import { useEffect } from 'react'
import Hero from '../components/Sections/Hero'
import SlantSlider from '../components/Sections/SlantSlider'
import AboutCompany from '../components/Sections/AboutCompany'
import ServicesGrid from '../components/Sections/ServicesGrid'
import ClientsSlider from '../components/Sections/ClientsSlider'
import StatsCounter from '../components/Sections/StatsCounter'
import Industries from '../components/Sections/Industries'
import TechnicalExpertise from '../components/Sections/TechnicalExpertise'
import TechnologiesSection from '../components/Sections/TechnologiesSection'
import GsapFeaturedProjects from '../components/Sections/GsapFeaturedProjects'
import WhyChooseUs from '../components/Sections/WhyChooseUs'
import TeamSection from '../components/Sections/TeamSection'
import TestimonialsSection from '../components/Sections/TestimonialsSection'
import LatestThinking from '../components/Sections/LatestThinking'
import CallToAction from '../components/Sections/CallToAction'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Home | WebTycoons'
  }, [])

  return (
    <>
      <Hero />
      <SlantSlider />
      <AboutCompany />
      <ServicesGrid />
      <ClientsSlider />
      <StatsCounter />
      {/* <Industries /> */}
      <TechnicalExpertise />
      <TechnologiesSection />
      <GsapFeaturedProjects />
      {/* <WhyChooseUs /> */}
      <TeamSection />
      <TestimonialsSection />
      <LatestThinking />
      <CallToAction />
    </>
  )
}

export default HomePage
