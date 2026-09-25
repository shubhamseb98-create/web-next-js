'use client';
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { fadeUp, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/LatestThinking.module.css'
import Image from 'next/image';

const fallbackBlogData = [
  {
    id: 1,
    category: 'SECURITY | CLOUD DEFENSE',
    title: 'Zero-Trust Security & DevSecOps: Hardening Enterprise Web Applications',
    image: '/images/blogs/zero-trust-security.jpg',
    gridArea: 'card-1' // tall left card
  },
  {
    id: 2,
    category: 'DESIGN | PRODUCT ENGINEERING',
    title: 'Design Systems & UI/UX Engineering: Driving 3x Conversions in Digital Products',
    image: '/images/blogs/design-systems-ui-ux.jpg',
    gridArea: 'card-2' // middle top
  },
  {
    id: 3,
    category: 'DEVOPS | CLOUD INFRASTRUCTURE',
    title: 'DevOps & CI/CD Automation: Zero-Downtime Deployment at Scale',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    gridArea: 'card-3' // right top
  },
  {
    id: 4,
    category: 'SOFTWARE | BACKEND ARCHITECTURE',
    title: 'Microservices vs. Modular Monoliths: Designing Scalable Cloud Backends',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    gridArea: 'card-4' // middle bottom
  },
  {
    id: 5,
    category: 'ENGINEERING | FULL-STACK',
    title: 'Scaling Enterprise Next.js Applications: Cloud Architecture & Edge Performance',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    gridArea: 'card-5' // right bottom
  }
];

const LatestThinking = ({ blogsData, homeExtraData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const displayData = (blogsData && blogsData.length > 0) ? blogsData : fallbackBlogData;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeDot = Math.min(2, Math.floor((activeIndex / (displayData.length || 1)) * 3));

  return (
    <section className={`py-100 ${styles.sectionWrapper}`}>
      <div className="container-fluid-px">
        
        {/* Header Section */}
        <div className={styles.headerArea}>
          <div className={styles.headerLeft}>
            <h2 className={`section-heading mb-0 ${styles.sectionHeading}`} style={{ color: 'var(--clr-white)' }}>
              {homeExtraData?.blog_title || 'Latest Thinking'}
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.headerDesc}>
              {homeExtraData?.blog_subtitle || "Read what we're thinking. Research that uncovers what's next. Perspectives that challenge the status quo. Ideas that help you see around corners."}
            </p>
          </div>
        </div>

        {/* Desktop Bento Grid (Visible on tablet/desktop) */}
        <motion.div 
          className={styles.desktopBentoGrid}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          {displayData.map((post, index) => {
            const gridArea = post.gridArea || `card-${index + 1}`;
            return (
              <Link 
                href={`/blog/${post.slug || '#'}`}
                key={post._id || post.id || index} 
                className={styles.blogCard} 
                style={{ gridArea }}
              >
                <div className={styles.imageWrapper}>
                  <Image 
                    src={post.coverImage || post.image} 
                    alt={post.alt || post.title} 
                    fill
                    sizes="(max-width: 992px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className={styles.bgImage} 
                  />
                  <div className={styles.overlay}></div>
                </div>

                <div className={styles.cardContent}>
                  <div className={styles.categoryBadge}>{post.category}</div>
                  <div className={styles.cardBottom}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <div className={styles.readMore}>
                      Read More &rarr;
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </motion.div>

        {/* Mobile Carousel (Visible on mobile screens) */}
        <div className={styles.mobileCarouselWrapper}>
          {isMounted && (
            <Swiper
              direction="horizontal"
              modules={[Autoplay]}
              slidesPerView={1.2}
              centeredSlides={true}
              spaceBetween={16}
              loop={displayData.length > 2}
              autoplay={{
                delay: 3800,
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
              {displayData.map((post, index) => (
                <SwiperSlide key={post._id || post.id || index} className={styles.carouselSlide}>
                  <Link 
                    href={`/blog/${post.slug || '#'}`}
                    className={`${styles.blogCard} ${styles.carouselCard}`}
                  >
                    <div className={styles.imageWrapper}>
                      <Image 
                        src={post.coverImage || post.image} 
                        alt={post.alt || post.title} 
                        fill
                        sizes="90vw"
                        style={{ objectFit: 'cover' }}
                        className={styles.bgImage} 
                      />
                      <div className={styles.overlay}></div>
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.categoryBadge}>{post.category}</div>
                      <div className={styles.cardBottom}>
                        <h3 className={styles.cardTitle}>{post.title}</h3>
                        <div className={styles.readMore}>
                          Read More &rarr;
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Controls with Prev/Next buttons and 3-dot pagination */}
          <div className={styles.controls}>
            <button 
              type="button"
              className={styles.controlBtn} 
              aria-label="Previous Blog"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FaChevronLeft />
            </button>
            
            <div className={styles.threeDotsPagination}>
              {[0, 1, 2].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Go to blog group ${dotIdx + 1}`}
                  className={`${styles.dotBtn} ${activeDot === dotIdx ? styles.activeDot : ''}`}
                  onClick={() => {
                    if (swiperRef.current) {
                      const target = Math.floor((dotIdx / 3) * displayData.length);
                      swiperRef.current.slideToLoop(target, 600);
                    }
                  }}
                />
              ))}
            </div>

            <button 
              type="button"
              className={styles.controlBtn} 
              aria-label="Next Blog"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* View All Blogs Button */}
        <div className={styles.viewMoreWrapper}>
          <Link href="/blog" className={styles.viewMoreBtn}>
            View All Blogs <FaArrowRight />
          </Link>
        </div>

      </div>
    </section>
  )
}

export default LatestThinking
