'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Image from 'next/image';
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styles from '../../../../css/webtycoons/TestimonialsSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const fallbackTestimonials = [
  {
    id: 1,
    quote: "It feels great to work with Team Web Tycoons. I got a lot of appreciation for unique and wonderful UI for my website.",
    name: "Mr. Vishesh Jindal",
    role: "CEO, Supply Wheels (www.supplywheels.com)",
    avatar: "/assets/img/testimonials/vishesh-jindal.jpg"
  },
  {
    id: 2,
    quote: "Their SEO services are just wonderful. First I got a website and followed by that got huge enquiries. Our site is almost on No. 1 Position of Google's first page with almost 20 keywords.",
    name: "Mr. Rajeev Tyagi",
    role: "Owner, RS Timber (www.rstimber.com)",
    avatar: "/assets/img/testimonials/rajeev-tyagi.png"
  },
  {
    id: 3,
    quote: "Team Web Tycoons is quite professional in what they are doing. They know what clients want and how to do that.",
    name: "Mr. Prateek Bhardwaj",
    role: "Director, CSB Skills (www.csbskills.com)",
    avatar: "/assets/img/testimonials/prateek-bhardwaj.jpg"
  },
  {
    id: 4,
    quote: "Pleasure to give testimonial to Dheeraj and Web Tycoons. They are best at what they do. Choose them if you want to be on top of Google.",
    name: "Mr. Ashok Aggarwal",
    role: "Director, Austro Labs (www.austrolabs.com)",
    avatar: "/assets/img/testimonials/ashok-aggarwal.jpg"
  },
  {
    id: 5,
    quote: "More than 15 websites and 7 SEO projects in past 6 years and still continuing. 100% satisfied and will recommend to people.",
    name: "Mr. Parmod Mittal",
    role: "Director, Shriram GPS (www.shriramgps.com)",
    avatar: "/assets/img/testimonials/parmod-mittal.jpg"
  },
  {
    id: 6,
    quote: "We had an old site and were looking for a makeover. Team Web Tycoons did a wonderful job with a nice revamp from a Dynamic site to an Ecommerce website. I am very happy.",
    name: "Mr. Nitin Goel",
    role: "Director, Coco Foam (www.cocofoam.in)",
    avatar: "/assets/img/testimonials/nitin-goel.jpg"
  }
]

const TestimonialsSection = ({ testimonialsData, homeExtraData }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  const rawData = (testimonialsData && testimonialsData.length > 0) ? testimonialsData : fallbackTestimonials;
  
  // Ensure we have at least 8 slides for Swiper coverflow to loop infinitely without boundary collision
  const displayData = rawData.length < 8
    ? Array.from({ length: Math.ceil(8 / rawData.length) }, () => rawData).flat()
    : rawData;

  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        }
      })

      // Carousel Animation
      gsap.from(carouselRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carouselRef.current,
          start: 'top 85%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Calculate which of the 3 dots is active (0, 1, or 2)
  const activeDot = Math.min(2, Math.floor((activeIndex / displayData.length) * 3));

  return (
    <section className={styles.sectionWrapper} ref={sectionRef}>
      <div className="container-fluid-px">
        
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>
            {homeExtraData?.testimonial_title || 'What Our'} <span className={styles.titleHighlight}>{homeExtraData?.testimonial_subtitle || 'Partners Say'}</span>
          </h2>
          <p className={styles.intro}>
            {homeExtraData?.testimonial_description || "Don't just take our word for it. Here is what industry leaders have to say about our premium engineering and design capabilities."}
          </p>
        </div>

        {/* Carousel */}
        <div className={styles.carouselContainer} ref={carouselRef}>
          {isMounted ? (
            <Swiper
              modules={[Navigation, EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              loopedSlides={4}
              loopPreventsSliding={false}
              watchSlidesProgress={true}
              slidesPerView="auto"
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.realIndex ?? 0)
              }}
              breakpoints={{
                320: {
                  spaceBetween: 16,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                  }
                },
                768: {
                  spaceBetween: 24,
                  coverflowEffect: {
                    rotate: 15,
                    stretch: 0,
                    depth: 220,
                    modifier: 1.3,
                    slideShadows: false,
                  }
                }
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={750}
              observer={true}
              observeParents={true}
              navigation={{
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
              }}
              className={styles.swiperWrapper}
            >
              {displayData.map((t, idx) => {
                const quote = t.content || t.quote;
                const role = t.role || (t.designation ? `${t.designation}${t.company ? `, ${t.company}` : ''}` : t.company);
                const avatarSrc = t.avatar || '/assets/img/testimonials/vishesh-jindal.jpg';
                
                return (
                  <SwiperSlide key={`${t._id || t.id || 'testi'}-${idx}`} className={styles.swiperSlide}>
                    <div className={styles.card}>
                      <FaQuoteLeft className={styles.quoteIcon} />
                      <p className={styles.quoteText}>"{quote}"</p>
                      
                      <div className={styles.clientInfo}>
                        <Image 
                          src={avatarSrc} 
                          alt={t.name || 'Client'} 
                          width={60} 
                          height={60} 
                          style={{ objectFit: 'cover', borderRadius: '50%' }} 
                          className={styles.clientAvatar} 
                        />
                        <div className={styles.clientDetails}>
                          <span className={styles.clientName}>{t.name}</span>
                          <span className={styles.clientRole}>{role}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div style={{ minHeight: '380px' }} />
          )}

          <div className={styles.controls}>
            <button 
              type="button"
              className={`${styles.controlBtn} swiper-btn-prev`} 
              aria-label="Previous Testimonial"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FaChevronLeft />
            </button>
            
            {/* Custom 3-circle pagination */}
            <div className={styles.threeDotsPagination}>
              {[0, 1, 2].map((dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Go to slide group ${dotIdx + 1}`}
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
              className={`${styles.controlBtn} swiper-btn-next`} 
              aria-label="Next Testimonial"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
