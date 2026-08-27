'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  FaUsers, FaRocket, FaAward, FaHandshake,
  FaBullseye, FaLightbulb, FaShieldAlt, FaHeart,
  FaLinkedinIn, FaTwitter, FaInstagram,
  FaCheckCircle, FaBolt, FaGlobe, FaGem, FaChartLine,
  FaStar, FaArrowRight
} from 'react-icons/fa'
import styles from '../../../../css/webtycoons/AboutPage.module.css'
import TeamSection from '../sections/TeamSection'

gsap.registerPlugin(ScrollTrigger)

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

const iconMap = {
  award: FaAward,
  handshake: FaHandshake,
  users: FaUsers,
  bullseye: FaBullseye,
  target: FaBullseye,
  lightbulb: FaLightbulb,
  shield: FaShieldAlt,
  heart: FaHeart,
  rocket: FaRocket,
  bolt: FaBolt,
  globe: FaGlobe,
  gem: FaGem,
  chart: FaChartLine,
  check: FaCheckCircle
};

// Extracted from original Vite template for visual matching
const SectionHeading = ({ subtitle, title, center }) => (
  <div className={`section-heading-wrapper ${center ? 'text-center mx-auto' : ''}`} style={{ maxWidth: center ? '700px' : '100%', marginBottom: '40px' }}>
    {subtitle && <span className="section-label d-inline-flex mb-2">{subtitle}</span>}
    {title && <h2 className="section-heading mb-3">{title}</h2>}
  </div>
);

export default function AboutPageClient({ data = {}, teamData = [] }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    const section = sectionRef.current

    if (track && section) {
      const getScrollDist = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.15;
      gsap.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      })
    }
  }, { scope: sectionRef })

  return (
    <main className={styles.aboutPage}>
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div 
          className={styles.heroBg} 
          style={{ backgroundImage: `url('${data?.heroImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'}')` }}
        />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <span>About Us</span>
            </div>
            <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: (data?.heroTitle || 'We Are the King Makers of the Digital World').replace('King Makers', `<span class="${styles.accent}">King Makers</span>`) }} />
            <p className={styles.heroDesc}>
              {data?.heroDescription || 'A passionate team of designers, developers, and digital strategists on a mission to build extraordinary web experiences.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── About Us (Who We Are - Ultra Modern Redesign) ── */}
      <section className={`py-100 ${styles.aboutUsSection}`}>
        <div className="container-fluid-px">
          <motion.div
            className={styles.aboutUsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Left — Cyber Bento Visual Showcase */}
            <motion.div variants={fadeUp} className={styles.aboutVisualContainer}>
              {/* Ambient Glow Backdrop */}
              <div className={styles.visualAuraGlow} />

              {/* Main Image Frame */}
              <div className={styles.mainImageFrame}>
                <Image
                  src={data.aboutUsImage1 || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"}
                  alt="WebTycoons Digital Agency"
                  className={styles.mainImage}
                  width={1000}
                  height={800}
                  priority
                />
                <div className={styles.imageOverlayGradient} />
                
                {/* Tech Corner Accents */}
                <div className={`${styles.cornerAccent} ${styles.cornerTopLeft}`} />
                <div className={`${styles.cornerAccent} ${styles.cornerBottomRight}`} />
              </div>

              {/* Floating Glassmorphic Badge 1 (Top Left: Years Experience) */}
              <div className={styles.experienceGlassPill}>
                <div className={styles.expIconBox}>
                  <FaStar className={styles.expIcon} />
                </div>
                <div>
                  <div className={styles.expNumberText}>
                    {data.aboutUsYears || '15'}<span>+</span>
                  </div>
                  <div className={styles.expSubLabel}>Years of Mastery</div>
                </div>
              </div>

              {/* Floating Glassmorphic Badge 2 (Bottom Right: Delivered Projects) */}
              <div className={styles.projectsGlassCard}>
                <div className={styles.projectsTopRow}>
                  <span className={styles.livePulseDot} />
                  <span className={styles.projectsLiveTag}>PROVEN IMPACT</span>
                </div>
                <div className={styles.projectsCount}>
                  350<span>+</span> Projects
                </div>
                <div className={styles.projectsSubText}>Delivered Worldwide</div>
              </div>

              {/* Floating Micro Badge 3 (Bottom Left: Quality / Satisfaction) */}
              <div className={styles.qualityPill}>
                <FaBolt className={styles.qualityIcon} />
                <span>99.8% Client Satisfaction</span>
              </div>
            </motion.div>

            {/* Right — High-Impact Storytelling & Interactive Bento Feature Cards */}
            <motion.div variants={fadeUp} className={styles.aboutUsContent}>
              <div className={styles.modernBadgePill}>
                <span className={styles.pulseDot} />
                <span>WHO WE ARE</span>
              </div>

              <h2 className={styles.aboutUsTitle}>
                Your Strategic Partner in <span className={styles.greenGradientText}>Digital Transformation</span>
              </h2>

              <p className={styles.aboutUsLeadPara} dangerouslySetInnerHTML={{ __html: (data?.aboutUsParagraph1 || 'Founded in 2011, WebTycoons is a high-performance digital agency based in Delhi NCR, India, crafting bespoke web platforms and digital growth engines.').replace('WebTycoons', '<strong>WebTycoons</strong>') }} />

              <p className={styles.aboutUsSubPara} dangerouslySetInnerHTML={{ __html: (data?.aboutUsParagraph2 || 'Over the past 15 years, we have delivered 350+ projects for ambitious startups, scaling SMEs, and enterprises across the globe.').replace('350+ projects', '<strong>350+ projects</strong>').replace('15 years', '<strong>15 years</strong>') }} />

              {/* Modern Bento Feature Deck */}
              <div className={styles.bentoDeck}>
                {(data.aboutUsHighlights && data.aboutUsHighlights.length > 0 ? data.aboutUsHighlights : [
                  { icon: 'award', title: 'Award-Winning Work', description: 'Recognized as a top digital agency in Delhi NCR for design excellence & performance.' },
                  { icon: 'handshake', title: 'Client-Centric ROI', description: 'We treat your business as our own, engineering digital products that drive measurable growth.' },
                  { icon: 'users', title: 'Expert Team of 25+', description: 'Specialists in Next.js, full-stack development, UI/UX architecture, and digital strategy.' }
                ]).map((hl, i) => {
                  const Icon = iconMap[hl.icon?.toLowerCase()] || FaAward;
                  return (
                    <div key={i} className={styles.bentoCard}>
                      <div className={styles.bentoIconBox}>
                        <Icon className={styles.bentoIcon} />
                      </div>
                      <div className={styles.bentoText}>
                        <h4>{hl.title}</h4>
                        <p>{hl.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Action Row */}
              <div className={styles.aboutUsBtns}>
                <Link href="/contact" className={styles.primaryActionButton}>
                  <span>Work With Us</span>
                  <FaArrowRight className={styles.btnArrowIcon} />
                </Link>
                <Link href="/services" className={styles.secondaryActionButton}>
                  <span>Our Services</span>
                </Link>
              </div>

              {/* Trust Checkpoints */}
              <div className={styles.trustCheckpoints}>
                <div className={styles.checkpointItem}>
                  <FaCheckCircle className={styles.checkIcon} />
                  <span>100% Code Ownership</span>
                </div>
                <div className={styles.checkpointItem}>
                  <FaCheckCircle className={styles.checkIcon} />
                  <span>Next-Gen Architecture</span>
                </div>
                <div className={styles.checkpointItem}>
                  <FaCheckCircle className={styles.checkIcon} />
                  <span>Global Delivery</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className={styles.missionSection}>
        <div className="container-fluid-px">
          <motion.div
            className={styles.missionGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Card 1: Our Mission */}
            <motion.div variants={fadeUp} className={`${styles.missionCard} ${styles.missionCardMission}`}>
              <div className={styles.cardGlowEffect} />
              
              <div className={styles.cardTopRow}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.missionIcon}>
                    <FaBullseye />
                  </div>
                  <h3 className={styles.cardTitle}>Our Mission</h3>
                </div>
                <span className={styles.cardStepBadge}>MISSION</span>
              </div>
              
              <p className={styles.cardStatement}>
                {data.missionText || 'To empower businesses of all sizes with cutting-edge, high-performance digital products — delivered with transparency, passion, and precision.'}
              </p>
            </motion.div>

            {/* Card 2: Our Vision */}
            <motion.div variants={fadeUp} className={`${styles.missionCard} ${styles.missionCardVision}`}>
              <div className={styles.cardGlowEffectVision} />
              
              <div className={styles.cardTopRow}>
                <div className={styles.cardHeaderLeft}>
                  <div className={`${styles.missionIcon} ${styles.missionIconVision}`}>
                    <FaRocket />
                  </div>
                  <h3 className={styles.cardTitle}>Our Vision</h3>
                </div>
                <span className={`${styles.cardStepBadge} ${styles.cardStepBadgeVision}`}>VISION</span>
              </div>
              
              <p className={styles.cardStatement}>
                {data.visionText || 'To be the most trusted web development partner for growth-focused businesses globally, recognized for excellence in craft and client success.'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={`py-100 ${styles.statsSection}`}>
        <div className={styles.statsBgBlobs}>
          <div className={styles.blob1}></div>
          <div className={styles.blob2}></div>
        </div>
        <div className="container-fluid-px">
          <motion.div
            className={styles.statsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.stats?.map((s, i) => (
              <motion.div key={i} variants={fadeUp} className={styles.statCard}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Our Story (Horizontal Alternating Timeline with Line, Dots & Ghost Years) ── */}
      <section className="story-section-pinned" ref={sectionRef} style={{ background: '#070a06', position: 'relative', overflow: 'hidden', padding: '60px 0 40px 0' }}>
        <div className="container-fluid-px">
          <div style={{ maxWidth: '750px', margin: '0 auto 10px auto', textAlign: 'center' }}>
            <SectionHeading subtitle="OUR STORY" title={<>From a Small Studio to a <span className={styles.accent}>Trusted Agency</span></>} center={true} />
          </div>
        </div>
        
        {/* Horizontal Timeline Viewport */}
        <div style={{ width: '100%', height: '540px', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div 
            ref={trackRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              width: 'max-content',
              padding: '0 45vw 0 12vw',
              height: '100%',
              willChange: 'transform'
            }}
          >
            {/* Continuous Glowing Horizontal Line */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '8vw',
                right: '0',
                height: '2px',
                background: 'linear-gradient(90deg, #52a436 0%, rgba(82, 164, 54, 0.4) 50%, #52a436 100%)',
                boxShadow: '0 0 10px rgba(82, 164, 54, 0.4)',
                transform: 'translateY(-50%)',
                zIndex: 1
              }}
            />
            
            {data.milestones?.map((m, i) => {
              const isTop = i % 2 === 0; // Alternates: 0=Top, 1=Bottom, 2=Top, 3=Bottom...
              return (
                <div 
                  key={i} 
                  style={{
                    position: 'relative',
                    width: '380px',
                    height: '100%',
                    marginRight: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 2
                  }}
                >
                  {/* Glowing Node on the line */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#52a436',
                      border: '3px solid #070a06',
                      boxShadow: '0 0 14px #52a436, 0 0 0 6px rgba(82, 164, 54, 0.2)',
                      zIndex: 5,
                      transition: 'all 0.3s ease'
                    }}
                  />

                  {/* Giant Ghost Year Watermark */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '6.5rem',
                      fontWeight: '900',
                      color: 'rgba(255, 255, 255, 0.04)',
                      fontFamily: 'var(--font-heading, sans-serif)',
                      pointerEvents: 'none',
                      zIndex: 2,
                      lineHeight: 1,
                      letterSpacing: '-2px',
                      userSelect: 'none'
                    }}
                  >
                    {m.year}
                  </div>

                  {/* Alternating Content Card */}
                  <div 
                    style={{
                      position: 'absolute',
                      [isTop ? 'bottom' : 'top']: 'calc(50% + 28px)',
                      left: 0,
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.025)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(15px)',
                      borderRadius: '18px',
                      padding: '22px 24px',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
                      zIndex: 4,
                      transition: 'all 0.3s ease'
                    }}
                    className="timeline-card hover:border-emerald-500/50 hover:-translate-y-1"
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span 
                        style={{
                          padding: '3px 12px',
                          borderRadius: '100px',
                          background: 'rgba(82, 164, 54, 0.12)',
                          border: '1px solid rgba(82, 164, 54, 0.3)',
                          color: '#52a436',
                          fontSize: '12px',
                          fontWeight: '800',
                          letterSpacing: '0.8px'
                        }}
                      >
                        {m.year}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: 'rgba(255, 255, 255, 0.3)' }}>
                        PHASE 0{i + 1}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: '0 0 6px 0', lineHeight: '1.3' }}>
                      {m.title}
                    </h3>
                    <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                      {m.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`py-100 ${styles.valuesSection}`}>
        {/* Ambient background glow & grid */}
        <div className={styles.valuesGlow} aria-hidden="true" />
        <div className={styles.valuesGridPattern} aria-hidden="true" />

        <div className="container-fluid-px" style={{ position: 'relative', zIndex: 1 }}>
          <div className={styles.valuesHeader}>
            <div className={styles.valuesBadge}>
              <span className={styles.badgePulseDot} />
              <span>WHAT WE STAND FOR</span>
            </div>
            <h2 className={styles.valuesMainTitle}>
              Our Core <span className={styles.titleGradient}>Values</span>
            </h2>
            <p className={styles.valuesSubtitle}>
              The principles that define our culture, drive our craft, and ensure exceptional results for every client.
            </p>
          </div>

          <motion.div
            className={styles.valuesGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.values?.map((v, i) => {
              const Icon = iconMap[v.icon?.toLowerCase()] || FaHeart;
              const indexFormatted = String(i + 1).padStart(2, '0');
              return (
                <motion.div key={i} variants={fadeUp} className={styles.valueCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.valueIcon}>
                      <Icon />
                    </div>
                    <span className={styles.cardNumber}>{indexFormatted}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{v.title}</h3>
                    <p className={styles.cardDesc}>{v.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      {teamData && teamData.length > 0 && <TeamSection teamData={teamData} />}

      {/* ── CTA ── */}
      <section className={`py-100 ${styles.ctaSection}`}>
        <div className="container-fluid-px text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className={styles.ctaTitle} dangerouslySetInnerHTML={{ __html: (data?.ctaTitle || 'Ready to Build Something Extraordinary?').replace('Extraordinary?', `<span class="${styles.accent}">Extraordinary?</span>`) }} />
            <p className={styles.ctaDesc}>{data?.ctaDescription}</p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btnPrimary">Start a Project &rarr;</Link>
              <Link href="/services" className={styles.ctaBtnOutline}>Explore Services</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}