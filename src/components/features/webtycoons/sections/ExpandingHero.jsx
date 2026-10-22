'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { FiArrowRight, FiChevronDown, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX } from 'react-icons/fi'
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
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

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

    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

    // Initial clip-path for centered preview card
    const initialClip = isMobile
      ? 'inset(62% 4% 4% 4% round 16px)'
      : isTablet
      ? 'inset(58% 10% 4% 10% round 20px)'
      : 'inset(54% 20% 4% 20% round 24px)'

    // Set initial styles
    gsap.set(copy, { opacity: 1, y: 0 })
    gsap.set(media, { clipPath: initialClip })
    if (frame) gsap.set(frame, { opacity: 1 })
    if (shade) gsap.set(shade, { opacity: 0 })
    if (caption) gsap.set(caption, { opacity: 0, y: 35, pointerEvents: 'none' })
    if (scrollHint) gsap.set(scrollHint, { opacity: 1 })

    // Scroll-Linked Pinned Expansion Timeline (Karma Ayurveda Style)
    // Pinned for 2.2x viewport height:
    // 0 -> 40%: Top copy fades out and card smoothly expands to edge-to-edge
    // 40% -> 65%: Overlay shade & expanded caption reveal
    // 65% -> 95%: Full screen hold / dwell state so user can admire & interact with full banner
    // 95% -> 100%: Clean release, then AboutCompany scrolls in naturally
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        id: 'heroPinTrigger',
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.2}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    })

    // Phase 1: Top text fades up & away (0 to 0.35)
    scrollTl.to(copy, {
      opacity: 0,
      y: -60,
      ease: 'power1.out',
      duration: 0.35,
    }, 0)

    // Scroll hint disappears immediately
    if (scrollHint) {
      scrollTl.to(scrollHint, {
        opacity: 0,
        duration: 0.15,
      }, 0)
    }

    // Phase 2: Media card expands to 100% full screen (0 to 0.85)
    scrollTl.fromTo(
      media,
      { clipPath: initialClip },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'power2.inOut',
        duration: 0.85,
      },
      0
    )

    if (mediaInner) {
      scrollTl.fromTo(
        mediaInner,
        { scale: 1.2 },
        { scale: 1.0, ease: 'power2.inOut', duration: 0.85 },
        0
      )
    }

    if (frame) {
      scrollTl.to(frame, { opacity: 0, duration: 0.25 }, 0.1)
    }

    // Phase 3: Dark luxury shade overlay & expanded caption reveal (0.7 to 1.1)
    if (shade) {
      scrollTl.fromTo(
        shade,
        { opacity: 0 },
        { opacity: 0.65, duration: 0.35, ease: 'power1.inOut' },
        0.7
      )
    }

    if (caption) {
      scrollTl.fromTo(
        caption,
        { opacity: 0, y: 35, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.4, ease: 'power2.out' },
        0.8
      )

      const captionChildren = caption.children
      if (captionChildren && captionChildren.length > 0) {
        scrollTl.fromTo(
          captionChildren,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.35, ease: 'power2.out' },
          0.85
        )
      }
    }

    // Phase 4: Full-Screen Dwell / Hold State (1.2 to 2.0)
    // Keeps hero pinned and 100% full screen so user sees the complete expanded section
    scrollTl.to({}, { duration: 0.8 })

    // Safety refreshes once preloader finishes and layouts settle
    const refreshST = () => {
      ScrollTrigger.refresh()
    }

    const t1 = setTimeout(refreshST, 600)
    const t2 = setTimeout(refreshST, 2500)
    const t3 = setTimeout(refreshST, 3600)

    window.addEventListener('scrolltrigger-refresh', refreshST)
    window.addEventListener('resize', refreshST)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      window.removeEventListener('scrolltrigger-refresh', refreshST)
      window.removeEventListener('resize', refreshST)
    }
  }, { scope: sectionRef })

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
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNextSlide = (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
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
    <section id="hero" ref={sectionRef} className={styles.heroPin}>
      {/* ── Ambient Radial Background ── */}
      <div className={styles.heroBg} aria-hidden="true" />

      {/* ── Top Hero Copy (Headline, Subtitle, Buttons) ── */}
      <div
        ref={copyRef}
        className={styles.heroCopy}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: 'auto' }}
      >
        {/* Eyebrow / Wordmark */}
        <div className="d-flex justify-content-center" style={{ marginBottom: '10px' }}>
          <span className="section-label" style={{ marginBottom: 0 }}>
            {currentSlide.badge}
          </span>
        </div>

        {/* Main Hero Headline */}
        <h1
          className={styles.heroTitle}
          style={currentSlide.titleFontSize ? { fontSize: `clamp(1.8rem, 3.5vw, ${currentSlide.titleFontSize})` } : (isLongHeading ? { fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)' } : undefined)}
        >
          {currentSlide.topHeading ? (
            currentSlide.topHeading
          ) : (
            <>
              Architecting High-Growth <br />
              <em>Digital Products</em> &amp; Web Platforms.
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className={styles.heroSub}>
          {currentSlide.topSubtitle}
        </p>

        {/* Hero CTA Button Row */}
        <div className={styles.heroCta}>
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
        </div>
      </div>

      {/* ── The Media Layer (Preview Card that expands on scroll to full screen banner) ── */}
      <div
        ref={mediaRef}
        className={styles.heroMedia}
        style={{ position: 'absolute', inset: 0, zIndex: 2 }}
      >
        <div ref={mediaInnerRef} className={styles.heroMediaInner}>
          {currentSlide.video ? (
            <video
              key={`hero-vid-${activeSlide}-${currentSlide.video}`}
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
              key={`hero-img-${activeSlide}-${currentSlide.image}`}
              src={currentSlide.image || '/assets/img/bn-1.jpg'}
              alt={currentSlide.topHeading || 'WebTycoons Hero'}
              className={styles.heroMediaEl}
            />
          )}
        </div>

        {/* Card glow/frame visible in initial preview state */}
        <div ref={frameRef} className={styles.cardFrame} aria-hidden="true" />

        {/* Dark luxury overlay for readability on full banner */}
        <div ref={shadeRef} className={styles.heroShade} aria-hidden="true" />

        {/* Floating Side Prev / Next Navigation Arrows on Full Banner */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevSlide}
              className={`${styles.sideArrow} ${styles.sideArrowPrev}`}
              aria-label="Previous slide"
              title="Previous slide"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className={`${styles.sideArrow} ${styles.sideArrowNext}`}
              aria-label="Next slide"
              title="Next slide"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* ── Expanded Banner Caption (Revealed when opened) ── */}
        <div ref={captionRef} className={styles.heroCaption}>
          <div className={styles.captionBadge}>
            <span className="section-label" style={{ marginBottom: 0 }}>
              {currentSlide.expandedBadge}
            </span>
          </div>

          <h2 className={styles.captionHeading}>
            {currentSlide.expandedHeading}
          </h2>

          <p className={styles.captionDesc}>
            {currentSlide.expandedSubtitle}
          </p>

          <div className={styles.captionBtns}>
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
          </div>

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
                    onClick={() => setActiveSlide(idx)}
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

              <span className={styles.slideCounter}>
                0{activeSlide + 1} <span style={{ opacity: 0.4 }}>/</span> 0{slides.length}
              </span>
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
