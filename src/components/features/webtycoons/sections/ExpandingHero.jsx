'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { FiArrowRight, FiChevronDown, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/css/webtycoons/Hero.module.css'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.clearScrollMemory('manual')
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
}

/* ══════════════════════════════════════════════════════════
   FALLBACK SLIDES (Dynamic IT & Digital Engineering Agency)
══════════════════════════════════════════════════════════ */
const fallbackSlides = [
  {
    video: '/assets/img/v1.mp4',
    image: '/assets/img/bn-1.jpg',
    badge: 'PREMIER DIGITAL & IT AGENCY',
    topHeading: 'Architecting High-Growth Digital Products.',
    topSubtitle: 'We craft bespoke web platforms, intelligent enterprise software, and scalable digital ecosystems designed to elevate your brand and drive exponential growth.',
    expandedBadge: 'INNOVATION · SCALE · PERFORMANCE',
    expandedHeading: 'Engineered for Speed. Built for Scale.',
    expandedSubtitle: 'From high-velocity Next.js web platforms to enterprise cloud systems and AI-powered workflows, we build software that drives real revenue.',
    cta: 'Explore Our Services',
    ctaHref: '/services',
    secondaryCta: 'Get Free Consultation',
  },
  {
    video: '/assets/img/v2.mp4',
    image: '/assets/img/bn-2.jpg',
    badge: 'FULL-STACK DEVELOPMENT',
    topHeading: 'Transforming Visions into High-Growth Reality.',
    topSubtitle: 'High-performance web applications, reactive mobile platforms, and secure microservices built for maximum speed and global reliability.',
    expandedBadge: 'CLOUD ARCHITECTURE & DEVOPS',
    expandedHeading: 'Enterprise Grade Cloud Architecture.',
    expandedSubtitle: 'Modern containerized microservices, serverless backends, and robust continuous delivery pipelines for unstoppable uptime.',
    cta: 'Explore Cloud Solutions',
    ctaHref: '/services',
    secondaryCta: 'Schedule IT Audit',
  },
  {
    video: '/assets/img/v3.mp4',
    image: '/assets/img/b-2.jpg',
    badge: 'LUXURY UI/UX DESIGN',
    topHeading: 'Human-Centered Design with Flawless Precision.',
    topSubtitle: 'Intuitive user journeys, conversion-optimized interfaces, and bespoke design systems that leave an indelible impression.',
    expandedBadge: 'BESPOKE DIGITAL CRAFT',
    expandedHeading: 'Designing the Future of Tech Brands.',
    expandedSubtitle: 'Every pixel, transition, and micro-interaction is deliberately engineered to convert visitors into loyal high-value clients.',
    cta: 'See Featured Work',
    ctaHref: '/projects',
    secondaryCta: 'Start a Project',
  }
]

function isVideo(url) {
  if (!url || typeof url !== 'string') return false
  const cleanUrl = url.split('?')[0].split('#')[0]
  return /\.(mp4|webm|ogg|mov)$/i.test(cleanUrl) || cleanUrl.includes('/video/upload/')
}

const ExpandingHero = ({ bannerData }) => {
  const [[activeSlide, direction], setSlide] = useState([0, 0])
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Scroll to top immediately on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }, [])

  // Format incoming DB banners or fallback
  const slides = Array.isArray(bannerData) && bannerData.length > 0
    ? bannerData.map((b, idx) => {
        const btnText = b.buttonText || 'Explore Our Services'
        const isConsult = /consult/i.test(btnText)
        const isMediaVideo = isVideo(b.video) || isVideo(b.image)
        const videoSrc = isVideo(b.video) ? b.video : (isVideo(b.image) ? b.image : null)
        const imageSrc = !isMediaVideo ? (b.image || fallbackSlides[idx % fallbackSlides.length].image) : (b.poster || fallbackSlides[idx % fallbackSlides.length].image)

        return {
          video: videoSrc,
          image: imageSrc,
          badge: b.badge || 'PREMIER DIGITAL & IT AGENCY',
          topHeading: b.title || fallbackSlides[idx % fallbackSlides.length].topHeading,
          topSubtitle: b.subtitle || b.description || fallbackSlides[idx % fallbackSlides.length].topSubtitle,
          titleFontSize: b.titleFontSize || '',
          expandedBadge: 'INNOVATION · SCALE · PERFORMANCE',
          expandedHeading: b.title || fallbackSlides[idx % fallbackSlides.length].expandedHeading,
          expandedSubtitle: b.subtitle || fallbackSlides[idx % fallbackSlides.length].expandedSubtitle,
          cta: btnText,
          ctaHref: b.url || '/services',
          secondaryCta: isConsult ? 'Explore Services' : 'Get Free Consultation',
          audio: b.audio || null,
          enableSound: b.enableSound === true
        }
      })
    : fallbackSlides;

  const currentSlide = slides[activeSlide] || slides[0];

  // DOM Refs for GSAP
  const sectionRef = useRef(null)
  const copyRef = useRef(null)
  const mediaRef = useRef(null)
  const mediaInnerRef = useRef(null)
  const shadeRef = useRef(null)
  const captionRef = useRef(null)
  const scrollRef = useRef(null)
  const frameRef = useRef(null)
  const audioRef = useRef(null)

  // ── GSAP ScrollTrigger Pinned Expansion Animation (Karma Ayurveda Style) ──
  useGSAP(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    const copy = copyRef.current
    const media = mediaRef.current
    const mediaInner = mediaInnerRef.current
    const shade = shadeRef.current
    const caption = captionRef.current
    const scrollHint = scrollRef.current
    const frame = frameRef.current

    if (!section || !media || !copy) return

    const mm = gsap.matchMedia()

    mm.add({
      isDesktop: '(min-width: 1025px)',
      isTablet: '(min-width: 768px) and (max-width: 1024px)',
      isMobile: '(max-width: 767px)',
    }, (context) => {
      const { isMobile, isTablet } = context.conditions

      const initialClip = isMobile
        ? 'inset(62% 4% 4% 4% round 16px)'
        : isTablet
        ? 'inset(56% 8% 4% 8% round 20px)'
        : 'inset(55% 15% 4% 15% round 22px)'

      gsap.set(copy, { opacity: 1, y: 0 })
      gsap.set(media, { clipPath: initialClip })
      if (frame) gsap.set(frame, { opacity: 1 })
      if (shade) gsap.set(shade, { opacity: 0 })
      if (caption) gsap.set(caption, { opacity: 0, y: 35, pointerEvents: 'none' })
      if (scrollHint) gsap.set(scrollHint, { opacity: 1 })

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          id: 'heroPinTrigger',
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 2.8}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      })

      scrollTl.to(copy, {
        opacity: 0,
        y: -45,
        ease: 'power1.out',
        duration: 0.7,
      }, 0)

      if (scrollHint) {
        scrollTl.to(scrollHint, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        }, 0)
      }

      scrollTl.fromTo(
        media,
        { clipPath: initialClip },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          duration: 1.8,
        },
        0
      )

      if (mediaInner) {
        scrollTl.fromTo(
          mediaInner,
          { scale: 1.12 },
          { scale: 1.0, ease: 'none', duration: 1.8 },
          0
        )
      }

      if (frame) {
        scrollTl.to(frame, { opacity: 0, duration: 0.5, ease: 'power1.out' }, 0.1)
      }

      if (shade) {
        scrollTl.fromTo(
          shade,
          { opacity: 0 },
          { opacity: 0.65, duration: 0.8, ease: 'power1.inOut' },
          1.0
        )
      }

      if (caption) {
        scrollTl.fromTo(
          caption,
          { opacity: 0, y: 30, pointerEvents: 'none' },
          { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.7, ease: 'power1.out' },
          1.2
        )
      }

      scrollTl.to({}, { duration: 1.1 })
    })

    return () => {
      mm.revert()
    }
  }, { scope: sectionRef })

  // Autoplay functionality with pause on hover
  useEffect(() => {
    if (slides.length <= 1 || isHovered) return
    const timer = setInterval(() => {
      setSlide(([curr]) => [curr === slides.length - 1 ? 0 : curr + 1, 1])
    }, 6500)
    return () => clearInterval(timer)
  }, [slides.length, isHovered])

  // Handle contact modal popup
  const handleOpenContactModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'))
    }
  }

  // Slide navigation handlers
  const handlePrevSlide = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setSlide(([curr]) => [curr === 0 ? slides.length - 1 : curr - 1, -1])
  }

  const handleNextSlide = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setSlide(([curr]) => [curr === slides.length - 1 ? 0 : curr + 1, 1])
  }

  const handleDotClick = (idx) => {
    setSlide(([curr]) => {
      if (idx === curr) return [curr, 0]
      return [idx, idx > curr ? 1 : -1]
    })
  }

  // Animation variants for smooth luxury text entrance/exit
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? 25 : -25,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.07,
        delayChildren: 0.04,
      },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? -20 : 20,
      filter: 'blur(4px)',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    }),
  }

  const childVariants = {
    enter: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? 18 : -18,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      y: dir >= 0 ? -12 : 12,
      transition: { duration: 0.2 },
    }),
  }

  // Audio mute/unmute toggle
  const toggleSound = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.play().catch(() => {})
      setIsMuted(false)
    } else {
      audioRef.current.pause()
      setIsMuted(true)
    }
  }

  const isLongHeading = currentSlide.topHeading && currentSlide.topHeading.length > 40

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={styles.heroPin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Ambient Radial Background ── */}
      <div className={styles.heroBg} aria-hidden="true" />

      {/* ── Top Hero Copy (Headline, Subtitle, Buttons) ── */}
      <div
        ref={copyRef}
        className={styles.heroCopy}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={`top-copy-${activeSlide}`}
            custom={direction}
            variants={slideVariants}
            initial={direction === 0 && activeSlide === 0 ? "center" : "enter"}
            animate="center"
            exit="exit"
            className={styles.heroCopyInner}
          >
            {/* Eyebrow / Wordmark */}
            <motion.div variants={childVariants} className="d-flex justify-content-center" style={{ marginBottom: '8px' }}>
              <span className={`section-label ${styles.heroBadge}`} style={{ marginBottom: 0 }}>
                {currentSlide.badge}
              </span>
            </motion.div>

            {/* Main Hero Headline */}
            <motion.h1
              variants={childVariants}
              className={`${styles.heroTitle} ${isLongHeading ? styles.heroTitleLong : ''}`}
              style={currentSlide.titleFontSize ? { '--custom-title-size': currentSlide.titleFontSize } : undefined}
            >
              {currentSlide.topHeading ? (
                currentSlide.topHeading
              ) : (
                <>
                  Architecting High-Growth <br />
                  <em>Digital Products</em> &amp; Web Platforms.
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={childVariants} className={styles.heroSub}>
              {currentSlide.topSubtitle}
            </motion.p>

            {/* Hero CTA Button Row */}
            <motion.div variants={childVariants} className={styles.heroCta}>
              <Link href={currentSlide.ctaHref || '/services'} className={styles.primaryBtn}>
                <span>{currentSlide.cta || 'Explore Our Services'}</span>
                <FiArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={handleOpenContactModal}
                className={styles.secondaryBtn}
              >
                <span>{currentSlide.secondaryCta || 'Get Free Consultation'}</span>
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── The Media Layer (Preview Card that expands on scroll to full screen banner) ── */}
      <div
        ref={mediaRef}
        className={styles.heroMedia}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      >
        <div ref={mediaInnerRef} className={styles.heroMediaInner}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`slide-media-${activeSlide}`}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={styles.heroMediaItemWrap}
            >
              {currentSlide.video ? (
                <video
                  src={currentSlide.video}
                  poster={currentSlide.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={styles.heroMediaEl}
                />
              ) : (
                <img
                  src={currentSlide.image || '/assets/img/bn-1.jpg'}
                  alt={currentSlide.expandedHeading || currentSlide.topHeading || 'WebTycoons Hero'}
                  className={styles.heroMediaEl}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card glow/frame visible in initial preview state */}
        <div ref={frameRef} className={styles.cardFrame} aria-hidden="true" />

        {/* Dark luxury overlay for readability on full banner */}
        <div ref={shadeRef} className={styles.heroShade} aria-hidden="true" />

        {/* ── Expanded Banner Caption (Revealed when opened) ── */}
        <div ref={captionRef} className={styles.heroCaption}>
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={`caption-${activeSlide}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.captionContentWrap}
            >
              <motion.div variants={childVariants} className={styles.captionBadge}>
                <span className="section-label" style={{ marginBottom: 0 }}>
                  {currentSlide.expandedBadge}
                </span>
              </motion.div>

              <motion.h2 variants={childVariants} className={styles.captionHeading}>
                {currentSlide.expandedHeading}
              </motion.h2>

              <motion.p variants={childVariants} className={styles.captionDesc}>
                {currentSlide.expandedSubtitle}
              </motion.p>

              <motion.div variants={childVariants} className={styles.captionBtns}>
                <Link href={currentSlide.ctaHref || '/services'} className={styles.primaryBtn}>
                  <span>{currentSlide.cta || 'Explore Our Services'}</span>
                  <FiArrowRight size={16} />
                </Link>
                <button
                  type="button"
                  onClick={handleOpenContactModal}
                  className={styles.secondaryBtn}
                >
                  <span>{currentSlide.secondaryCta || 'Schedule IT Consultation'}</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Switcher Controls (Prev button, Dots, Next button, Counter) */}
          {slides.length > 1 && (
            <div className={styles.slideControls} aria-label="Banner navigation">
              <button
                type="button"
                onClick={handlePrevSlide}
                className={styles.slideNavBtn}
                aria-label="Previous slide"
                title="Previous slide"
              >
                <FiChevronLeft size={18} />
              </button>

              <div className={styles.slideDots} aria-label="Banner slides">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDotClick(idx)}
                    className={`${styles.slideDot} ${idx === activeSlide ? styles.slideDotActive : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                className={styles.slideNavBtn}
                aria-label="Next slide"
                title="Next slide"
              >
                <FiChevronRight size={18} />
              </button>

              <div className={styles.slideCounter}>
                <span style={{ display: 'inline-block', position: 'relative', overflow: 'hidden', verticalAlign: 'middle', minWidth: '1.2ch' }}>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeSlide}
                      initial={{ opacity: 0, y: direction >= 0 ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: direction >= 0 ? -10 : 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{ display: 'inline-block' }}
                    >
                      0{activeSlide + 1}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span style={{ opacity: 0.4 }}> / </span>
                0{slides.length}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll To Expand Indicator ── */}
      <div ref={scrollRef} className={styles.heroScroll} aria-hidden="true">
        <span>Scroll to explore</span>
        <FiChevronDown className={styles.scrollArrow} size={18} />
      </div>

      {/* ── Sound Toggle for Video/Audio ── */}
      {(currentSlide.audio || currentSlide.enableSound) && (
        <div className={styles.soundToggleWrap}>
          {currentSlide.audio && (
            <audio ref={audioRef} src={currentSlide.audio} loop preload="none" />
          )}
          <button
            type="button"
            onClick={toggleSound}
            className={styles.soundBtn}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
          </button>
        </div>
      )}
    </section>
  )
}

export default ExpandingHero
