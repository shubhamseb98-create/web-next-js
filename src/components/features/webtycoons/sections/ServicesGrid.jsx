'use client';
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../animations/variants'
import { FiCode, FiCloud, FiShield, FiTrendingUp, FiSmartphone, FiCpu, FiMonitor, FiSearch, FiShoppingCart, FiPenTool, FiGlobe, FiMail, FiArrowRight } from 'react-icons/fi'
import { FaBuilding } from 'react-icons/fa'

import styles from '../../../../css/webtycoons/ServicesGrid.module.css'

const services = [
  {
    title: 'Real Estate Growth Advisory',
    slug: 'real-estate-advisory',
    description: 'We advise builders, developers, and agencies on scaling their business, generating 10x high-ticket leads, and PropTech sales automation.',
    icon: <FaBuilding />,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    bgColor: 'linear-gradient(135deg, #152213, #22381e, #3e6b32)', // Emerald Dark Luxury Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Website Designing',
    slug: 'static-website-development',
    description: 'Crafting visually stunning, user-centric interfaces that captivate your audience and reflect your brand identity.',
    icon: <FiMonitor />,
    image: './assets/img/homeservice/service2.svg',
    bgColor: '#ffffff', // White
    hoverTextColor: '#000000',
    imageStyle: 'small', // Use for SVG illustrations
  },
  {
    title: 'Website Development',
    slug: 'dynamic-website-development',
    description: 'Building robust, scalable, and high-performance websites using the latest technologies and architectures.',
    icon: <FiCode />,
    image: './assets/img/homeservice/service1.webp',
    bgColor: 'linear-gradient(135deg, #091236, #1E215D, #2B32B2)', // Deep Blue/Purple Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full', // Use for background photos
  },
  {
    title: 'SEO',
    slug: 'static-website-development',
    description: 'Data-driven search engine optimization strategies to boost your online visibility and drive organic traffic.',
    icon: <FiSearch />,
    image: './assets/img/homeservice/service3.svg',
    bgColor: '#ffffffff', // White
    hoverTextColor: '#000000ff',
    imageStyle: 'small',
  },
  {
    title: 'Ecommerce Solution',
    slug: 'e-commerce-website-development',
    description: 'End-to-end ecommerce platforms designed to maximize conversions and deliver seamless shopping experiences.',
    icon: <FiShoppingCart />,
    image: './assets/img/homeservice/service4.webp',
    bgColor: 'linear-gradient(135deg, #2b102b, #451b4d, #70287a)', // Rich Purple Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Logo Designing',
    slug: 'static-website-development',
    description: 'Creating memorable, unique, and impactful logos that establish a strong and recognizable brand presence.',
    icon: <FiPenTool />,
    image: './assets/img/homeservice/service6.webp',
    bgColor: 'linear-gradient(135deg, #4b120c, #7a2213, #a43419)', // Warm Rust/Red Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Domain',
    slug: 'static-website-development',
    description: 'Secure and reliable domain registration services to help you establish your unique identity on the web.',
    icon: <FiGlobe />,
    image: './assets/img/homeservice/service5.svg',
    bgColor: '#f4f4f5', // Light Gray
    hoverTextColor: '#000000',
    imageStyle: 'small',
  },
  {
    title: 'Digital Marketing Solution',
    slug: 'static-website-development',
    description: 'Comprehensive marketing campaigns spanning social media, content, and paid ads to grow your business.',
    icon: <FiTrendingUp />,
    image: './assets/img/homeservice/service7.webp',
    bgColor: 'linear-gradient(135deg, #1c1c1c, #333333, #4d4d4d)', // Charcoal Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Email Solution',
    slug: 'static-website-development',
    description: 'Professional, secure, and scalable email hosting solutions tailored for seamless enterprise communication.',
    icon: <FiMail />,
    image: './assets/img/homeservice/service8.webp',
    bgColor: '#ffffffff', // Deep Ocean Blue
    hoverTextColor: '#000000ff',
    imageStyle: 'full',
  },
]

const BG_COLORS = [
  '#ffffff',
  'linear-gradient(135deg, #091236, #1E215D, #2B32B2)',
  '#ffffffff',
  'linear-gradient(135deg, #2b102b, #451b4d, #70287a)',
  'linear-gradient(135deg, #4b120c, #7a2213, #a43419)',
  '#f4f4f5',
  'linear-gradient(135deg, #1c1c1c, #333333, #4d4d4d)',
  '#ffffffff',
]
const HOVER_COLORS = ['#000000', '#ffffff', '#000000ff', '#ffffff', '#ffffff', '#000000', '#ffffff', '#000000ff']

const ServicesGrid = ({ servicesData, homeExtraData }) => {  
  const displayServices = servicesData?.length > 0 ? servicesData : services;

  const subtitle = homeExtraData?.service_subtitle || 'Our Services';
  const mainTitle = homeExtraData?.service_title || 'Innovative IT Solutions for <br /> Your Business Growth';
  const description = homeExtraData?.service_description || 'We provide cutting-edge IT services and digital solutions designed to elevate your brand, streamline your operations, and drive exceptional results in the digital landscape.';

  return (
    <section className={`section-py ${styles.section}`} id="services">
      <div className="container-fluid-px">
        <div className={styles.roundedWrapper}>
          <motion.div 
            className="row mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <div className="col-12 col-lg-8">
              <span className="section-label">{subtitle}</span>
              <h2 className="section-heading mb-4" dangerouslySetInnerHTML={{ __html: mainTitle }}>
              </h2>
              <p className="section-description" style={{ color: 'var(--clr-text-light)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                {description}
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            className={styles.gridContainer}
          >
            {displayServices.map((service, index) => {
              // Alternate animation direction based on index
              const slideClass = index % 2 === 0 ? styles.slideLeft : styles.slideRight;
              
              // Handle dynamically loaded services logic vs fallback logic
              const isDynamic = !!service._id;
              
              // Check if the service has these fields explicitly set in the DB, otherwise fallback
              const bgColor = service.bgColor || (isDynamic ? BG_COLORS[index % BG_COLORS.length] : service.bgColor);
              const hoverColor = service.hoverTextColor || (isDynamic ? HOVER_COLORS[index % HOVER_COLORS.length] : service.hoverTextColor);
              const description = isDynamic ? (service.shortDesc || service.description) : service.description;
              const imageSizeClass = (service.imageStyle === 'small' || service.image?.endsWith('.svg')) ? styles.imageSmall : styles.imageFull;

              const targetSlug = service.slug || (service.title?.toLowerCase().includes('real') ? 'real-estate-advisory' : 'static-website-development');

              return (
                <motion.div key={index} variants={fadeUp} className={styles.gridItem}>
                  <Link 
                    href={`/services/${targetSlug}`}
                    className={`${styles.card} ${slideClass} ${imageSizeClass}`}
                    style={{
                      '--bg-color': bgColor,
                      '--hover-text': hoverColor,
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    <div className={styles.cardBg}>
                      {(service.image || service.breadcrumbImage) && (
                        <img src={service.image || service.breadcrumbImage} alt={service.title} className={styles.cardImage} />
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <span className={styles.label}>SERVICE</span>
                      <h3 className={styles.title}>{service.title}</h3>
                      <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
                      <div className={styles.cardHoverArrow}>
                        <span className={styles.expandText}>Explore Service</span> <FiArrowRight />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
