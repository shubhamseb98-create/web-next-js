'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Virtual } from 'swiper/modules'
import Image from 'next/image';
import 'swiper/css'
import 'swiper/css/navigation'
import styles from '../../../../css/webtycoons/SlantSlider.module.css'

const slantSlides = [
  {
    id: 1,
    category: 'WEB DEVELOPMENT',
    title: 'ENTERPRISE WEB',
    description: 'Custom web applications and responsive platforms built for massive scale.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  },
  {
    id: 2,
    category: 'MOBILE APPS',
    title: 'IOS & ANDROID',
    description: 'Native and cross-platform mobile experiences that engage and retain users.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  },
  {
    id: 3,
    category: 'DIGITAL MARKETING',
    title: 'GROWTH SEO',
    description: 'Data-driven SEO, PPC, and social media campaigns for maximum ROI.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  },
  {
    id: 4,
    category: 'CLOUD SOLUTIONS',
    title: 'CLOUD OPS',
    description: 'Secure and scalable cloud infrastructure and robust DevOps pipelines.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  },
  {
    id: 5,
    category: 'CYBER SECURITY',
    title: 'ZERO TRUST',
    description: 'Advanced protection systems to safeguard your critical digital assets.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  },
  {
    id: 6,
    category: 'AI & ML',
    title: 'SMART AUTOMATION',
    description: 'Intelligent data analytics and AI automation for future-proof business.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    logo: 'WT'
  }
]

const SlantSlider = ({ workData, homeExtraData }) => {
  const slidesToUse = workData && workData.length > 0 ? workData : slantSlides;
  // Duplicate slides so Swiper has enough elements to loop perfectly on ultra-wide screens (where 5.5 slides are shown)
  const allSlides = [...slidesToUse, ...slidesToUse.map(s => ({ ...s, id: (s.id || s._id) + '_dup' }))]

  const subtitle = homeExtraData?.work_subtitle || 'GLOBAL NETWORK';
  const mainTitle = homeExtraData?.work_title || 'Trusted by Industry Leaders';
  const description = homeExtraData?.work_description || "WebTycoons is a pioneering digital firm dedicated to safeguarding your digital assets. With over two decades of experience, we've been at the forefront of innovation, providing comprehensive solutions.";

  const swiperRef = useRef(null)
  const pathname = usePathname()

  // Force Swiper to recalculate its dimensions after every navigation
  useEffect(() => {
    if (!swiperRef.current) return
    const swiper = swiperRef.current

    // Small delay to ensure the DOM has settled after navigation
    const t1 = setTimeout(() => {
      if (swiper && !swiper.destroyed) {
        swiper.update()
        swiper.updateSize()
        swiper.updateSlides()
        swiper.updateProgress()
        swiper.updateSlidesClasses()
      }
    }, 100)

    const t2 = setTimeout(() => {
      if (swiper && !swiper.destroyed) {
        swiper.update()
      }
    }, 500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.subtitleWrapper}>
          <span className={styles.subtitleLine}></span>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        <h2 className={styles.mainTitle}>{mainTitle}</h2>
        <p className={styles.headerText}>{description}</p>
      </div>

      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1.5}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          observer={true}
          observeParents={true}
          resizeObserver={true}
          navigation={{
            nextEl: '.slant-next',
            prevEl: '.slant-prev',
          }}
          breakpoints={{
            576: { slidesPerView: 2.5 },
            768: { slidesPerView: 3.5 },
            1200: { slidesPerView: 4.5 },
            1400: { slidesPerView: 5.5 },
          }}
          className={styles.slantSwiper}
          onSwiper={(swiper) => { swiperRef.current = swiper }}
        >
          {allSlides.map((slide) => (
            <SwiperSlide key={slide.id || slide._id} className={styles.slide}>
              {({ isActive }) => (
                <div className={`${styles.cardWrapper} ${isActive ? styles.activeCard : ''}`}>
                  <div className={styles.cardInner}>
                    {/* Background Image (Unskewed) */}
                    {slide.image && (
                      <Image 
                        src={slide.image}
                        alt={slide.title || 'Work image'}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        style={{ objectFit: 'cover' }}
                        className={styles.bgImage}
                      />
                    )}
                    <div className={styles.overlay}></div>
                    
                    {/* Content (Unskewed) */}
                    <div className={styles.content}>
                      <div className={styles.logoContainer}>
                        <Image src={slide.logo || "/assets/img/logo-new.png"} alt={slide.title} width={120} height={40} style={{ objectFit: 'contain', width: '100%', height: 'auto' }} className={styles.cardLogo} />
                      </div>
                      <div>
                        <p className={styles.category}>{slide.category}</p>
                        <h3 className={styles.title}>{slide.title}</h3>
                        <p className={styles.description}>{slide.description}</p>
                      </div>
                    </div>
                    
                    {/* Active Indicator Line */}
                    <div className={styles.activeLine}></div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation (Bottom Left) */}
        <div className={styles.navControls}>
          <button className={`slant-prev ${styles.navBtn}`}>&lt;</button>
          <button className={`slant-next ${styles.navBtn}`}>&gt;</button>
        </div>
      </div>
    </section>
  )
}

export default SlantSlider
