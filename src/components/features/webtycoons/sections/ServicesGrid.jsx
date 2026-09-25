'use client';
import React, { isValidElement, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../animations/variants'
import { FiCode, FiCloud, FiShield, FiTrendingUp, FiSmartphone, FiCpu, FiMonitor, FiSearch, FiShoppingCart, FiPenTool, FiGlobe, FiMail, FiArrowRight } from 'react-icons/fi'
import { FaBuilding, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import styles from '../../../../css/webtycoons/ServicesGrid.module.css'

const services = [
  {
    title: 'Website Designing',
    slug: 'website-designing',
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
    title: 'Static Website Development',
    slug: 'static-website-development',
    description: 'Lightning-fast, highly secure, and beautifully designed static websites tailored to showcase your brand with zero compromises.',
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
    slug: 'logo-designing',
    description: 'Creating memorable, unique, and impactful logos that establish a strong and recognizable brand presence.',
    icon: <FiPenTool />,
    image: './assets/img/homeservice/service6.webp',
    bgColor: 'linear-gradient(135deg, #4b120c, #7a2213, #a43419)', // Warm Rust/Red Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Domain',
    slug: 'domain',
    description: 'Secure and reliable domain registration services to help you establish your unique identity on the web.',
    icon: <FiGlobe />,
    image: './assets/img/homeservice/service5.svg',
    bgColor: '#f4f4f5', // Light Gray
    hoverTextColor: '#000000',
    imageStyle: 'small',
  },
  {
    title: 'Digital Marketing Solution',
    slug: 'digital-marketing-solution',
    description: 'Comprehensive marketing campaigns spanning social media, content, and paid ads to grow your business.',
    icon: <FiTrendingUp />,
    image: './assets/img/homeservice/service7.webp',
    bgColor: 'linear-gradient(135deg, #1c1c1c, #333333, #4d4d4d)', // Charcoal Gradient
    hoverTextColor: '#ffffff',
    imageStyle: 'full',
  },
  {
    title: 'Email Solution',
    slug: 'email-solution',
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

const getServiceIcon = (service, index) => {
  // Only accept if it's already a valid React component element
  if (isValidElement(service.icon)) return service.icon;

  const t = (service.title || service.slug || '').toLowerCase();
  if (t.includes('design') || t.includes('logo') || t.includes('ui') || t.includes('ux')) return <FiPenTool />;
  if (t.includes('ecommerce') || t.includes('e-commerce') || t.includes('shop')) return <FiShoppingCart />;
  if (t.includes('dynamic') || t.includes('develop') || t.includes('code') || t.includes('software')) return <FiCode />;
  if (t.includes('static') || t.includes('website')) return <FiMonitor />;
  if (t.includes('domain') || t.includes('hosting') || t.includes('web')) return <FiGlobe />;
  if (t.includes('marketing') || t.includes('growth') || t.includes('ads')) return <FiTrendingUp />;
  if (t.includes('email') || t.includes('mail')) return <FiMail />;
  if (t.includes('seo') || t.includes('search') || t.includes('analytics')) return <FiSearch />;
  if (t.includes('cloud') || t.includes('devops')) return <FiCloud />;
  if (t.includes('security') || t.includes('cyber')) return <FiShield />;
  if (t.includes('mobile') || t.includes('app')) return <FiSmartphone />;
  if (t.includes('ai') || t.includes('ml') || t.includes('automation')) return <FiCpu />;
  
  const defaultIcons = [<FiMonitor />, <FiCode />, <FiSearch />, <FiShoppingCart />, <FiPenTool />, <FiGlobe />, <FiTrendingUp />, <FiMail />];
  return defaultIcons[index % defaultIcons.length];
};

const serviceCardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const ServicesGrid = ({ servicesData, homeExtraData }) => {  
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredServices = Array.isArray(servicesData)
    ? servicesData.filter(s => s.slug !== 'real-estate-advisory' && (s.status ? s.status === 'active' : true))
    : services.filter(s => s.slug !== 'real-estate-advisory' && (s.status ? s.status === 'active' : true));

  const displayServices = servicesData ? filteredServices : (filteredServices.length > 0 ? filteredServices : []);

  const subtitle = homeExtraData?.service_subtitle || 'Our Services';
  const mainTitle = homeExtraData?.service_title || 'Innovative IT Solutions for <br /> Your Business Growth';
  const description = homeExtraData?.service_description || 'We provide cutting-edge IT services and digital solutions designed to elevate your brand, streamline your operations, and drive exceptional results in the digital landscape.';

  const activeDot = Math.min(2, Math.floor((activeIndex / (displayServices.length || 1)) * 3));

  const renderCardContent = (service, index, isMobile = false) => {
    const slideClass = index % 2 === 0 ? styles.slideLeft : styles.slideRight;
    const isDynamic = !!service._id;
    const bgColor = service.bgColor || (isDynamic ? BG_COLORS[index % BG_COLORS.length] : service.bgColor);
    const hoverColor = service.hoverTextColor || (isDynamic ? HOVER_COLORS[index % HOVER_COLORS.length] : service.hoverTextColor);
    const desc = isDynamic ? (service.shortDesc || service.description) : service.description;
    const imageSizeClass = (service.imageStyle === 'small' || service.image?.endsWith('.svg')) ? styles.imageSmall : styles.imageFull;
    const serviceIcon = getServiceIcon(service, index);
    const targetSlug = service.slug || 'static-website-development';

    return (
      <Link 
        href={`/services/${targetSlug}`}
        className={`${styles.card} ${slideClass} ${imageSizeClass} ${isMobile ? styles.carouselCard : ''}`}
        style={{
          '--bg-color': bgColor,
          '--hover-text': hoverColor,
          textDecoration: 'none',
          display: 'flex'
        }}
      >
        <div className={styles.cardBg}>
          {service.image && (
            <img 
              src={service.image} 
              alt={service.title} 
              className={styles.cardImage} 
              loading="lazy"
              decoding="async"
              width={280}
              height={430}
            />
          )}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <span className={styles.label}>SERVICE</span>
            <div className={styles.iconBadge}>
              {serviceIcon}
            </div>
          </div>
          <h3 className={styles.title}>{service.title}</h3>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: desc }} />
          <div className={styles.cardHoverArrow}>
            <span className={styles.expandText}>Explore Service</span>
            <span className={styles.arrowCircle}><FiArrowRight /></span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section className={`section-py ${styles.section}`} id="services">
      <div className="container-fluid-px">
        <div className={styles.roundedWrapper}>
          <motion.div 
            className="row mb-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
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

          {/* Desktop Grid Layout (Visible on desktop/tablet) */}
          <motion.div 
            variants={staggerContainer(0.06, 0.02)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className={styles.desktopGridContainer}
          >
            {displayServices.map((service, index) => (
              <motion.div key={index} variants={serviceCardVariant} className={styles.gridItem}>
                {renderCardContent(service, index, false)}
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Swiper Carousel (Visible on mobile screens) */}
          <div className={styles.mobileCarouselWrapper}>
            {isMounted && (
              <Swiper
                direction="horizontal"
                modules={[Autoplay]}
                slidesPerView={1.2}
                centeredSlides={true}
                spaceBetween={16}
                loop={displayServices.length > 2}
                autoplay={{
                  delay: 3600,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                speed={600}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex ?? 0);
                }}
                className={styles.mobileSwiper}
                breakpoints={{
                  320: {
                    slidesPerView: 1.18,
                    centeredSlides: true,
                    spaceBetween: 14,
                  },
                  420: {
                    slidesPerView: 1.25,
                    centeredSlides: true,
                    spaceBetween: 16,
                  },
                  640: {
                    slidesPerView: 1.45,
                    centeredSlides: true,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    centeredSlides: false,
                    spaceBetween: 24,
                  }
                }}
              >
                {displayServices.map((service, index) => (
                  <SwiperSlide key={service._id || service.slug || index} className={styles.carouselSlide}>
                    {renderCardContent(service, index, true)}
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {/* Controls with Prev/Next buttons and 3-dot pagination */}
            <div className={styles.controls}>
              <button 
                type="button"
                className={styles.controlBtn} 
                aria-label="Previous Service"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FaChevronLeft />
              </button>
              
              <div className={styles.threeDotsPagination}>
                {[0, 1, 2].map((dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={`Go to service group ${dotIdx + 1}`}
                    className={`${styles.dotBtn} ${activeDot === dotIdx ? styles.activeDot : ''}`}
                    onClick={() => {
                      if (swiperRef.current) {
                        const target = Math.floor((dotIdx / 3) * displayServices.length);
                        swiperRef.current.slideToLoop(target, 600);
                      }
                    }}
                  />
                ))}
              </div>

              <button 
                type="button"
                className={styles.controlBtn} 
                aria-label="Next Service"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FaChevronRight />
              </button>
            </div>       
          </div>       

        </div>
      </div>
    </section>
  )
}

export default ServicesGrid
