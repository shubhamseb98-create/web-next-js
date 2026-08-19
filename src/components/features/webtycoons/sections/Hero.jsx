'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import styles from '../../../../css/webtycoons/Hero.module.css'

/* ══════════════════════════════════════════════════════════
   GSAP SETUP
══════════════════════════════════════════════════════════ */
gsap.registerPlugin(CustomEase)
CustomEase.create('shapeRevealSettle', 'M0,0 C0.10,0.16 0.26,0.115 0.34,0.115 C0.50,0.115 0.78,0.85 1,1')
CustomEase.create('shapeRevealSnap',   'M0,0 C0.09,0.16 0.24,0.110 0.32,0.110 C0.46,0.110 0.74,0.88 1,1')
CustomEase.create('shapeRevealDrift',  'M0,0 C0.12,0.18 0.28,0.130 0.38,0.130 C0.58,0.130 0.80,0.84 1,1')

/* ══════════════════════════════════════════════════════════
   EXACT SVG MASK SHAPES (from reference design)
   Solid-black fill SVGs encoded as data-URIs for mask-image
══════════════════════════════════════════════════════════ */
const _svg = s => `url("data:image/svg+xml,${encodeURIComponent(s)}")`

const MASKS = {
  circle:  _svg(`<svg width="281" height="281" viewBox="0 0 281 281" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.078125" width="280" height="280" rx="140" fill="#000"/></svg>`),
  flower:  _svg(`<svg width="282" height="281" viewBox="0 0 282 281" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M75.9469 280.078C91.5033 280.078 105.96 275.398 117.97 267.376C130.585 258.951 151.308 258.951 163.924 267.376C175.934 275.398 190.39 280.078 205.947 280.078C247.615 280.078 281.394 246.499 281.394 205.078C281.394 189.768 276.779 175.529 268.856 163.661C260.282 150.817 260.282 129.339 268.856 116.496C276.779 104.628 281.394 90.3887 281.394 75.0781C281.394 33.6568 247.615 0.078125 205.947 0.078125C190.39 0.078125 175.934 4.75843 163.924 12.7798C151.308 21.2056 130.585 21.2056 117.97 12.7798C105.96 4.75843 91.5033 0.078125 75.9469 0.078125C34.2787 0.078125 0.5 33.6568 0.5 75.0781C0.5 90.3887 5.11505 104.628 13.0377 116.496C21.6119 129.339 21.6119 150.817 13.0377 163.661C5.11505 175.529 0.5 189.768 0.5 205.078C0.5 246.499 34.2787 280.078 75.9469 280.078Z" fill="#000"/></svg>`),
  hexagon: _svg(`<svg width="277" height="301" viewBox="0 0 277 301" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M108.103 8.24078C126.954 -2.64276 150.179 -2.64276 169.03 8.24078L246.169 52.7773C265.02 63.6609 276.633 83.7745 276.633 105.542V194.615C276.633 216.382 265.02 236.495 246.169 247.379L169.03 291.915C150.179 302.799 126.954 302.799 108.103 291.915L30.9635 247.379C12.1126 236.495 0.5 216.382 0.5 194.615V105.542C0.5 83.7745 12.1126 63.6609 30.9635 52.7773L108.103 8.24078Z" fill="#000"/></svg>`),
  square:  _svg(`<svg width="281" height="281" viewBox="0 0 281 281" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.078125" width="280" height="280" rx="60" fill="#000"/></svg>`),
}

/* ══════════════════════════════════════════════════════════
   REVEAL VARIANTS — custom easing + timing + rotation dir
══════════════════════════════════════════════════════════ */
const REVEAL_VARIANTS = [
  { ease: 'shapeRevealSettle', duration: 1.55, rotDur: 0.85, dir: -1 },
  { ease: 'shapeRevealSnap',   duration: 1.50, rotDur: 0.70, dir:  1 },
  { ease: 'shapeRevealDrift',  duration: 1.75, rotDur: 1.00, dir: -1 },
]

const SHAPE_NAMES = ['circle', 'flower', 'hexagon', 'square']

/* ══════════════════════════════════════════════════════════
   STATIC FALLBACK SLIDES
══════════════════════════════════════════════════════════ */
const fallbackSlides = [
  { video: '/assets/img/v1.mp4', heading: 'We Build Digital Experiences', cta: 'Get Started',      ctaHref: '/contact' },
  { video: '/assets/img/v2.mp4', heading: 'Creative Design & Branding',   cta: 'See Our Work',     ctaHref: '/projects' },
  { video: '/assets/img/v3.mp4', heading: 'Full-Stack Development',        cta: 'Explore Services', ctaHref: '/services/static-website-development' },
  { video: '/assets/img/v1.mp4', heading: 'SEO & Digital Growth',          cta: "Let's Talk",       ctaHref: '/contact' },
]

const AUTOPLAY_MS = 5000

/* ══════════════════════════════════════════════════════════
   MASK HELPERS — direct el.style (bypasses GSAP camelCase)
══════════════════════════════════════════════════════════ */
function applyMaskInit(el, maskUri) {
  el.style.maskImage          = maskUri
  el.style.WebkitMaskImage    = maskUri
  el.style.maskRepeat         = 'no-repeat'
  el.style.WebkitMaskRepeat   = 'no-repeat'
  el.style.maskPosition       = 'center'
  el.style.WebkitMaskPosition = 'center'
  el.style.maskSize           = '0%'
  el.style.WebkitMaskSize     = '0%'
}

function setMaskSize(el, pct) {
  el.style.maskSize        = `${pct}%`
  el.style.WebkitMaskSize  = `${pct}%`
}

function clearMask(el) {
  el.style.maskImage          = ''
  el.style.WebkitMaskImage    = ''
  el.style.maskSize           = ''
  el.style.WebkitMaskSize     = ''
  el.style.maskRepeat         = ''
  el.style.WebkitMaskRepeat   = ''
  el.style.maskPosition       = ''
  el.style.WebkitMaskPosition = ''
}

/* ══════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════ */
const Hero = ({ bannerData }) => {
  const [active, setActive] = useState(0)

  // Map dynamic banner data or use fallback
  const slides = bannerData?.length > 0 
    ? bannerData.map(b => ({
        image: b.image,
        heading: b.title,
        cta: b.buttonText || 'Learn More',
        ctaHref: b.url || '#'
      }))
    : fallbackSlides;

  const COUNT = slides.length;

  // ── Refs (all stable, no re-render concerns) ──
  const activeRef       = useRef(0)
  const incomingRef     = useRef(null)   // slide idx currently transitioning in
  const lastShapeRef    = useRef(null)   // prevent shape repeat
  const lastVariantRef  = useRef(null)   // prevent variant repeat
  const innerRefs       = useRef([])     // .inner divs for counter-rotation
  const textRefs        = useRef([])     // .textInner for crossfade
  const progressRefs    = useRef([])     // dot buttons for progress fill
  const tlRef           = useRef(null)   // current GSAP timeline
  const progressTweenRef= useRef(null)
  const navigateRef     = useRef(null)   // latest navigate fn (for progress onComplete)

  // ── Pickers ──
  const pickShape = () => {
    const pool = SHAPE_NAMES.filter(s => s !== lastShapeRef.current)
    const s    = pool[Math.floor(Math.random() * pool.length)]
    lastShapeRef.current = s
    return s
  }

  const pickVariant = () => {
    const pool = [0, 1, 2].filter(i => i !== lastVariantRef.current)
    const i    = pool[Math.floor(Math.random() * pool.length)]
    lastVariantRef.current = i
    return REVEAL_VARIANTS[i]
  }

  /* ── snapInProgress ──────────────────────────────────────
   * Interrupt: kill current tween, snap incoming to fully
   * revealed, promote it as the new current slide.
   * ───────────────────────────────────────────────────── */
  const snapInProgress = useCallback(() => {
    if (!tlRef.current) return
    tlRef.current.kill()
    tlRef.current = null

    const prevIn = incomingRef.current
    if (prevIn === null) return

    const inEl    = document.getElementById(`hs-${prevIn}`)
    const inInner = innerRefs.current[prevIn]
    const inText  = textRefs.current[prevIn]
    const oldEl   = document.getElementById(`hs-${activeRef.current}`)

    if (inEl) {
      clearMask(inEl)
      gsap.set(inEl, { rotation: 0, zIndex: 3 })
    }
    if (inInner) gsap.set(inInner, { rotation: 0 })
    if (inText)  gsap.set(inText,  { opacity: 1, y: 0 })
    if (oldEl && oldEl !== inEl) gsap.set(oldEl, { opacity: 0, zIndex: 1 })

    // Old active text — reset for next time it becomes incoming
    const oldText = textRefs.current[activeRef.current]
    if (oldText) gsap.set(oldText, { opacity: 1, y: 0 })

    activeRef.current   = prevIn
    incomingRef.current = null
    setActive(prevIn)
  }, [])

  /* ── goTo ────────────────────────────────────────────────
   * Core transition using mask-image + mask-size + counter-rotation
   * ───────────────────────────────────────────────────── */
  const goTo = useCallback((rawIdx) => {
    const nextIdx = ((rawIdx % COUNT) + COUNT) % COUNT

    // Interrupt any in-progress transition
    snapInProgress()

    const currIdx = activeRef.current
    if (nextIdx === currIdx) return

    const inEl    = document.getElementById(`hs-${nextIdx}`)
    const currEl  = document.getElementById(`hs-${currIdx}`)
    const inInner = innerRefs.current[nextIdx]
    const inText  = textRefs.current[nextIdx]
    const curText = textRefs.current[currIdx]

    if (!inEl) return

    const shape   = pickShape()
    const variant = pickVariant()
    const { ease, duration, rotDur, dir } = variant

    incomingRef.current = nextIdx

    // ── z-index: incoming=2, current=1, rest=0 (per spec)
    for (let i = 0; i < COUNT; i++) {
      const el = document.getElementById(`hs-${i}`)
      if (el) gsap.set(el, { zIndex: i === currIdx ? 1 : 0 })
    }

    // ── Set up incoming slide ──
    gsap.set(inEl, { opacity: 1, zIndex: 2, rotation: 0 })
    applyMaskInit(inEl, MASKS[shape])
    if (inInner) gsap.set(inInner, { rotation: 0 })
    if (inText)  gsap.set(inText,  { opacity: 0, y: 40 })

    // ── GSAP Timeline ──
    const proxy = { pct: 0 }

    const tl = gsap.timeline({
      onComplete() {
        // mask fully covers viewport — snap is invisible
        clearMask(inEl)
        gsap.set(inEl,    { rotation: 0, zIndex: 3 })
        if (inInner) gsap.set(inInner, { rotation: 0 })
        if (currEl)  gsap.set(currEl,  { opacity: 0, zIndex: 0 })
        // Reset outgoing text for re-use
        if (curText) gsap.set(curText, { opacity: 1, y: 0 })
        incomingRef.current = null
        activeRef.current   = nextIdx
        setActive(nextIdx)
        tlRef.current = null
      },
    })
    tlRef.current = tl

    // 1) Spin the mask element & counter-spin its inner container
    tl.fromTo(inEl,    { rotation: -90 * dir }, { rotation: 0, duration: rotDur, ease: 'power2.out' }, 0)
    tl.fromTo(inInner, { rotation:  90 * dir }, { rotation: 0, duration: rotDur, ease: 'power2.out' }, 0)

    // 2) Expand mask from 0% to 150% (custom ease)
    tl.to(proxy, {
      pct: 150,
      duration,
      ease,
      onUpdate: () => setMaskSize(inEl, proxy.pct),
    }, 0)

    // 3) Fade outgoing text down, fade incoming text up
    tl.to(curText, { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, 0)
    tl.to(inText,  { opacity: 1, y: 0,   duration: 0.5, ease: 'power2.out' }, duration * 0.4)

  }, [COUNT, snapInProgress])

  /* ── startProgress ───────────────────────────────────────
   * Linear fill animation on the active dot.
   * onComplete auto-advances via navigateRef (latest fn).
   * ───────────────────────────────────────────────────── */
  const startProgress = useCallback((idx) => {
    if (progressTweenRef.current) progressTweenRef.current.kill()
    // Reset all fills
    progressRefs.current.forEach(el => {
      const f = el?.querySelector(`.${styles.fill}`)
      if (f) gsap.set(f, { scaleX: 0 })
    })
    const fill = progressRefs.current[idx]?.querySelector(`.${styles.fill}`)
    if (!fill) return
    progressTweenRef.current = gsap.to(fill, {
      scaleX: 1,
      duration: AUTOPLAY_MS / 1000,
      ease: 'none',
      onComplete() {
        // Always use latest navigate
        navigateRef.current?.(activeRef.current + 1)
      },
    })
  }, [])

  /* ── navigate ────────────────────────────────────────────
   * Public navigation: transition + restart progress bar.
   * ───────────────────────────────────────────────────── */
  const navigate = useCallback((rawIdx) => {
    const idx = ((rawIdx % COUNT) + COUNT) % COUNT
    goTo(idx)
    startProgress(idx)
  }, [COUNT, goTo, startProgress])

  // Keep ref in sync for use inside startProgress onComplete
  navigateRef.current = navigate

  /* ── Init ── */
  useEffect(() => {
    const firstEl = document.getElementById('hs-0')
    if (firstEl) { clearMask(firstEl); gsap.set(firstEl, { opacity: 1, zIndex: 3 }) }
    if (textRefs.current[0]) gsap.set(textRefs.current[0], { opacity: 1, y: 0 })
    for (let i = 1; i < COUNT; i++) {
      const el = document.getElementById(`hs-${i}`)
      if (el) gsap.set(el, { opacity: 0, zIndex: 0 })
      if (textRefs.current[i]) gsap.set(textRefs.current[i], { opacity: 0, y: 40 })
    }
    // Kick off autoplay progress bar
    startProgress(0)
  }, [COUNT, startProgress])

  const isVideo = (url) => url && (url.endsWith('.mp4') || url.endsWith('.webm'))

  return (
    <section className={styles.hero} aria-label="Hero Slider">

      {/* ── Slides ── */}
      {slides.map((slide, idx) => (
        <div key={idx} id={`hs-${idx}`} className={styles.slide}>
          <div ref={el => { innerRefs.current[idx] = el }} className={styles.inner}>
            {isVideo(slide.video || slide.image) ? (
              <video
                className={styles.bg}
                src={slide.video || slide.image}
                autoPlay muted loop playsInline
              />
            ) : (
              <img
                className={styles.bg}
                src={slide.image || slide.video}
                alt={slide.heading}
                style={{ objectFit: 'cover' }}
              />
            )}
            <div className={styles.gradient} />
            <div className={styles.textWrap}>
              <div
                ref={el => { textRefs.current[idx] = el }}
                className={styles.textInner}
              >
                <h1 className={styles.heading}>{slide.heading}</h1>
                <a href={slide.ctaHref} className={styles.cta}>
                  <span>{slide.cta}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ── Bottom blur band ── */}
      <div className={styles.blurBand} aria-hidden="true">
        {[1,2,3,4,5].map(n => (
          <span key={n} className={`${styles.bl} ${styles[`bl${n}`]}`} />
        ))}
      </div>

      {/* ── Controls ── */}
      <div className={styles.controls}>
        <button
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={() => navigate(activeRef.current - 1)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              ref={el => { progressRefs.current[idx] = el }}
              className={`${styles.dot} ${idx === active ? styles.dotActive : ''}`}
              onClick={() => navigate(idx)}
              aria-label={`Slide ${idx + 1}`}
            >
              <span className={styles.fill} />
            </button>
          ))}
        </div>

        <button
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={() => navigate(activeRef.current + 1)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default Hero
