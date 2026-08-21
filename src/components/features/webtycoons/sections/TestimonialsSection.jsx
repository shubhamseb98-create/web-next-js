'use client'
import { useEffect, useRef } from 'react'
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
    quote: "Working with WebTycoons completely transformed our digital presence. Their deep understanding of modern architecture helped us scale our platform seamlessly.",
    name: "Sarah Jenkins",
    role: "CTO, TechNova Solutions",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    quote: "The level of engineering precision and attention to UI/UX detail is unmatched. They didn't just build a website; they built a revenue-generating asset.",
    name: "Michael Chen",
    role: "Founder, GrowthStack",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    quote: "From our first consultation to the final deployment, the team was professional, transparent, and incredibly fast. Highly recommended for enterprise projects.",
    name: "Elena Rodriguez",
    role: "Director of Marketing, BlueOcean",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 4,
    quote: "Our e-commerce conversion rates jumped 40% within two months of launching the new headless setup they designed. Absolutely stellar work.",
    name: "David Smith",
    role: "CEO, RetailEdge",
    avatar: "https://randomuser.me/api/portraits/men/85.jpg"
  },
  {
    id: 5,
    quote: "We needed a digital presence that felt calm and trustworthy — and WebTycoons absolutely delivered. They translated our abstract vision into something clear.",
    name: "Sophie Langford",
    role: "Sova Health, UK",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    id: 6,
    quote: "WebTycoons helped me build a brand that sounds and looks like me. They listened carefully and turned my ideas into something clear, minimalist, and full of character.",
    name: "Eunji Kwon",
    role: "LUMN Music, South Korea",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    id: 7,
    quote: "They didn't just design a website — they helped us shape the entire product narrative. Smart structure, fast delivery, and a tone that finally felt right for our audience.",
    name: "Daniel Reyes",
    role: "Vorte Project, USA",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 8,
    quote: "Working with WebTycoons was a relief. The communication was clear and the result was something we were proud to share. Our applications nearly doubled after launch.",
    name: "Matteo Bianchi",
    role: "Lunara Language School, Italy",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
]

const TestimonialsSection = ({ testimonialsData, homeExtraData }) => {
  const displayData = (testimonialsData && testimonialsData.length > 0) ? testimonialsData : fallbackTestimonials;
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const carouselRef = useRef(null)

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
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 20,
              stretch: -20,
              depth: 250,
              modifier: 1.5,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: '.swiper-btn-next',
              prevEl: '.swiper-btn-prev',
            }}
            pagination={{ clickable: true, el: '.swiper-custom-pagination' }}
            className={styles.swiperWrapper}
          >
            {displayData.map((t, idx) => {
              const quote = t.content || t.quote;
              const role = t.role || (t.designation ? `${t.designation}${t.company ? `, ${t.company}` : ''}` : t.company);
              
              return (
              <SwiperSlide key={t._id || t.id || idx} className={styles.swiperSlide}>
                <div className={styles.card}>
                  <FaQuoteLeft className={styles.quoteIcon} />
                  <p className={styles.quoteText}>"{quote}"</p>
                  
                  <div className={styles.clientInfo}>
                    <Image src={t.avatar} alt={t.name} width={60} height={60} style={{ objectFit: 'cover', borderRadius: '50%' }} className={styles.clientAvatar} />
                    <div className={styles.clientDetails}>
                      <span className={styles.clientName}>{t.name}</span>
                      <span className={styles.clientRole}>{role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              )
            })}
          </Swiper>

          <div className={styles.controls}>
            <button className={`${styles.controlBtn} swiper-btn-prev`} aria-label="Previous Testimonial">
              <FaChevronLeft />
            </button>
            <div className={`swiper-custom-pagination ${styles.pagination}`}></div>
            <button className={`${styles.controlBtn} swiper-btn-next`} aria-label="Next Testimonial">
              <FaChevronRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
