'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedinIn, FaTwitter, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import SectionHeading from '../SectionHeading'
import styles from '../../../../css/webtycoons/TeamSection.module.css'
import { fadeUp } from '../animations/variants'

/* ── Team Data ─────────────────────────────────────── */
const team = [
  {
    name: 'Om',
    role: 'Web Developer',
    img: '/assets/img/team/om-removebg-preview.png',
    color: '#b0e7f5ff',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Nisha',
    role: 'Business  Manager',
    img: '/assets/img/team/nisha-removebg-preview.png',
    color: '#f9d6ea',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Tarandeep',
    role: 'Head of Marcomm & Content',
    img: '/assets/img/team/tara-removebg-preview.png',
    color: '#d9f5a0',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Kriti',
    role: 'Admin Manager',
    img: '/assets/img/team/kriti-removebg-preview.png',
    color: '#ffe0b0',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Dheeraj <br> Aggarwal',
    role: 'Founder & CEO',
    img: '/assets/img/team/sitara-removebg-preview.png',
    color: '#c8d8fc',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Dheeraj <br> Joshi',
    role: 'SEO & Digital Marketing',
    img: '/assets/img/team/cutiiii-removebg-preview.png',
    color: '#fce8ac',
    linkedin: '#',

    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Anuj',
    role: 'UI/UX Designer',
    img: '/assets/img/team/Anuj-cutiiii-removebg-preview.png',
    color: '#c8f5b0',
    linkedin: '#',

    twitter: '#',
    instagram: '#',
  },
  {
    name: 'Muskan',
    role: 'UI/UX Designer',
    img: '/assets/img/team/Muku.png',
    color: '#ffb9d6ff',
    linkedin: '#',

    twitter: '#',
    instagram: '#',
  },
  // {
  //   name: 'chotu budhau',
  //   role: 'UI/UX Designer',
  //   img: '/assets/img/team/rahul.png',
  //   color: '#eb9053ff',
  //   linkedin: '#',
  //   twitter: '#',
  //   instagram: '#',
  // },
  
]

/* ── Constants ──────────────────────────────────────── */
const AUTOPLAY_MS   = 3500
const TRANSITION_MS = 550
const VISIBLE       = 2        // cards visible on each side of center
const CARD_W        = 200      // reference card width (px) — matches CSS .pillCard width
const CARD_GAP      = 48       // gap between card centres (px)

function mod(n, m) {
  return ((n % m) + m) % m
}

/* ── Component ──────────────────────────────────────── */
const TeamSection = ({ teamData, homeExtraData }) => {
  const displayTeam = (teamData && teamData.length > 0) ? teamData : team;
  const count                     = displayTeam.length
  const [active, setActive]       = useState(0)
  const [animating, setAnimating] = useState(false)
  const autoplayRef               = useRef(null)
  const dragStartX                = useRef(null)
  const dragStartY                = useRef(null)

  /* ── Navigation ── */
  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setActive(mod(idx, count))
    setTimeout(() => setAnimating(false), TRANSITION_MS)
  }, [animating, count])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(next, AUTOPLAY_MS)
  }, [next])

  useEffect(() => {
    autoplayRef.current = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(autoplayRef.current)
  }, [next])

  /* ── Mouse drag ── */
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
  }
  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return
    const dx = e.clientX - dragStartX.current
    const dy = e.clientY - dragStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
      resetAutoplay()
    }
    dragStartX.current = null
  }

  /* ── Touch swipe ── */
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX
    dragStartY.current = e.touches[0].clientY
  }
  const handleTouchEnd = (e) => {
    if (dragStartX.current === null) return
    const dx = e.changedTouches[0].clientX - dragStartX.current
    const dy = e.changedTouches[0].clientY - dragStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev()
      resetAutoplay()
    }
    dragStartX.current = null
  }

  return (
    <section className={`py-100 ${styles.teamSection}`} id="team-section">
      
      {/* ── Premium Tech Dark Theme Background ── */}
      <div className={styles.bgElements} aria-hidden="true">
        <div className={styles.ambientGlow}></div>
        <div className={styles.techGrid}></div>
        
        {/* Cinematic Spotlight Beam */}
        <div className={styles.lightBeam}></div>
      </div>

      <div className="container-fluid-px" style={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          subtitle={homeExtraData?.team_label || "MEET THE TEAM"}
          title={<>{homeExtraData?.team_title || "The Minds Behind"} <span style={{ color: 'var(--clr-primary)' }}>{homeExtraData?.team_subtitle || "WebTycoons"}</span></>}
          description={homeExtraData?.team_description || "Passionate experts dedicated to transforming digital visions into reality."}
          center={true}
          className=""
        />

        <motion.div
          className={styles.carouselOuter}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* ── Decorative abstract background wave ── */}
          <div className={styles.waveBg} aria-hidden="true">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className={styles.waveSvg}>
              <defs>
                <linearGradient id="team-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--clr-primary)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="var(--clr-accent)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--clr-primary-dark)" stopOpacity="0.1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Main glowing tech line */}
              <path
                d="M-100,200 C 300,300 1100,100 1540,200"
                fill="none"
                stroke="url(#team-wave-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              
              {/* Secondary dashed intersecting line */}
              <path
                d="M-100,150 C 400,250 1000,150 1540,250"
                fill="none"
                stroke="var(--clr-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="6 12"
                opacity="0.4"
              />
              
              {/* Third subtle track line */}
              <path
                d="M-100,250 C 500,150 900,250 1540,150"
                fill="none"
                stroke="var(--clr-accent)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.2"
              />
            </svg>
          </div>
          <div className={styles.carouselTrack}>
            {displayTeam.map((member, idx) => {
              let offset = idx - active
              if (offset >  count / 2) offset -= count
              if (offset < -count / 2) offset += count

              const isCenter  = offset === 0
              const isVisible = Math.abs(offset) <= VISIBLE

              const translateX = offset * (CARD_W + CARD_GAP)

              let scale   = 1
              let opacity = 1
              if (Math.abs(offset) === 1) { scale = 0.88 }
              if (Math.abs(offset) === 2) { scale = 0.76 }
              if (!isCenter && Math.abs(offset) > 2) { scale = 0.65; opacity = 0 }
              if (isCenter) scale = 1.20

              return (
                <div
                  key={idx}
                  className={`${styles.cardSlot} ${isCenter ? styles.cardSlotActive : ''}`}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity,
                    zIndex: isCenter ? 10 : (VISIBLE - Math.abs(offset) + 1),
                    pointerEvents: isVisible ? 'auto' : 'none',
                    transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.34,1.2,0.64,1), opacity ${TRANSITION_MS}ms ease`,
                  }}
                  onClick={() => {
                    if (!isCenter) { goTo(idx); resetAutoplay() }
                  }}
                  role={!isCenter ? 'button' : undefined}
                  aria-label={!isCenter ? `View ${member.name.replace(/<br\s*\/?>/gi, ' ')}` : undefined}
                >
                  <div
                    className={`${styles.pillCard} ${isCenter ? styles.pillCardActive : ''}`}
                    style={{ '--card-color': member.color }}
                  >
                    {/* name + role */}
                    <div className={styles.cardMeta}>
                      <span className={styles.memberName} dangerouslySetInnerHTML={{ __html: member.name }}></span>
                      <span className={styles.memberRole}>{member.role}</span>
                    </div>

                    {/* photo */}
                    <div className={styles.photoWrap}>
                      <img
                        src={member.image || member.img}
                        alt={member.name.replace(/<br\s*\/?>/gi, ' ')}
                        className={styles.memberPhoto}
                        draggable={false}
                        loading="lazy"
                      />
                    </div>

                    {/* social links — only visible on center card */}
                    {isCenter && (
                      <div className={styles.socialBar}>
                        <a href={member.linkedin} className={styles.socialBtn} aria-label="LinkedIn">
                          <FaLinkedinIn />
                        </a>
                        <a href={member.twitter} className={styles.socialBtn} aria-label="Twitter">
                          <FaTwitter />
                        </a>
                        <a href={member.instagram} className={styles.socialBtn} aria-label="Instagram">
                          <FaInstagram />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── Nav arrows ── */}
          <button
            className={`${styles.navBtn} ${styles.navPrev}`}
            onClick={() => { prev(); resetAutoplay() }}
            aria-label="Previous team member"
          >
            <FaChevronLeft />
          </button>
          <button
            className={`${styles.navBtn} ${styles.navNext}`}
            onClick={() => { next(); resetAutoplay() }}
            aria-label="Next team member"
          >
            <FaChevronRight />
          </button>
        </motion.div>

        {/* ── Dot indicators ── */}
        <div className={styles.dots} role="tablist" aria-label="Team carousel pagination">
          {displayTeam.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === active ? styles.dotActive : ''}`}
              onClick={() => { goTo(idx); resetAutoplay() }}
              role="tab"
              aria-selected={idx === active}
              aria-label={`Go to ${displayTeam[idx].name.replace(/<br\s*\/?>/gi, ' ')}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
