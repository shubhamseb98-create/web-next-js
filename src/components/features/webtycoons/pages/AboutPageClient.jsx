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
import { ArrowUpRight } from 'lucide-react'
import styles from '../../../../css/webtycoons/AboutPage.module.css'
import TeamSection from '../sections/TeamSection'
import FounderSection from '../sections/FounderSection'
import PageHeader from 'src/components/layout/PageHeader'

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
    {subtitle && (
      <div className={center ? "d-flex justify-content-center" : ""} style={{ marginBottom: '8px' }}>
        <span className="section-label" style={{ marginBottom: 0 }}>{subtitle}</span>
      </div>
    )}
    {title && <h2 className="section-heading mb-3" style={{ color: 'var(--clr-white)', marginTop: 0 }}>{title}</h2>}
  </div>
);

export default function AboutPageClient({ data = {}, teamData = [], founderData = null }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const lineProgressRef = useRef(null)

  const handleCardMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty('--mouse-x', `${clientX - left}px`);
    currentTarget.style.setProperty('--mouse-y', `${clientY - top}px`);
  };

  useGSAP(() => {
    const track = trackRef.current
    const section = sectionRef.current
    const lineProgress = lineProgressRef.current

    if (track && section) {
      const getScrollDist = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.15;
      const milestoneItems = track.querySelectorAll(`.${styles.milestoneItem}`);
      const count = milestoneItems.length;

      // Function to dynamically compute each node's exact ratio along the progress line
      const getNodeRatios = () => {
        const lineWidth = lineProgress ? lineProgress.offsetWidth : 1;
        const lineLeft = lineProgress ? lineProgress.offsetLeft : 0;

        return Array.from(milestoneItems).map((item, idx) => {
          const nodeCenterX = item.offsetLeft + item.offsetWidth / 2;
          const relX = nodeCenterX - lineLeft;
          // The tip of the green line touches the node (radius ~11px) at relX - 10
          const computedRatio = (relX - 10) / (lineWidth || 1);
          if (!isNaN(computedRatio) && computedRatio > 0) {
            return computedRatio;
          }
          return count > 1 ? idx / (count - 1) : 0;
        });
      };

      let nodeRatios = getNodeRatios();
      const startScale = nodeRatios.length > 0 ? Math.max(0.04, nodeRatios[0]) : 0.08;
      const endScale = nodeRatios.length > 0 ? Math.min(1, Math.max(0.96, nodeRatios[nodeRatios.length - 1] + 0.04)) : 1;

      // Initial state: set initial line scale and activate first milestone
      if (lineProgress) {
        gsap.set(lineProgress, { scaleX: startScale });
      }
      if (milestoneItems[0]) {
        milestoneItems[0].classList.add(styles.milestoneActive, styles.milestoneCurrent);
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'center center',
          end: () => `+=${track.scrollWidth * 1.1}`,
          invalidateOnRefresh: true,
          onRefresh: () => {
            nodeRatios = getNodeRatios();
          },
          onUpdate: (self) => {
            const p = self.progress;

            // 1. Advance the green glowing progress line smoothly as you scroll
            const currentScale = Math.min(1, startScale + p * (endScale - startScale));
            if (lineProgress) {
              gsap.set(lineProgress, { scaleX: currentScale });
            }

            // 2. Exact physical sync: highlight nodes the instant the green line reaches them
            if (count > 0 && nodeRatios.length > 0) {
              let latestReachedIdx = 0;
              nodeRatios.forEach((ratio, idx) => {
                // When line progress touches or passes this node's physical position
                if (currentScale >= ratio - 0.003) {
                  latestReachedIdx = idx;
                }
              });

              milestoneItems.forEach((item, idx) => {
                const isReached = idx <= latestReachedIdx;
                const isCurrent = idx === latestReachedIdx;

                if (isReached) {
                  item.classList.add(styles.milestoneActive);
                } else {
                  item.classList.remove(styles.milestoneActive);
                }

                if (isCurrent) {
                  item.classList.add(styles.milestoneCurrent);
                } else {
                  item.classList.remove(styles.milestoneCurrent);
                }
              });
            }
          }
        }
      });

      // Horizontal track movement
      tl.to(track, {
        x: () => -getScrollDist(),
        ease: 'none',
        duration: 1,
      }, 0);
    }
  }, { scope: sectionRef, dependencies: [data?.milestones] })

  return (
    <main className={styles.aboutPage}>
      {/* ── Hero Banner (Standardized PageHeader) ── */}
      <PageHeader
        title={(data?.heroTitle || 'We Are the King Makers of the Digital World').replace('King Makers', `<span class="textGreen">King Makers</span>`)}
        description={data?.heroDescription || 'A passionate team of designers, developers, and digital strategists on a mission to build extraordinary web experiences.'}
        bgImage={data?.heroImage || '/images/banners/about-it-company.jpg'}
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About Us" }
        ]}
      />

      {/* ── About Us (Who We Are - Float Left Image Flow) ── */}
      {(() => {
        // Collect all paragraph strings
        const rawP1 = data?.aboutUsParagraph1 || 'Founded in 2011, WebTycoons is a high-performance digital agency based in Delhi NCR, India, crafting bespoke web platforms and digital growth engines.';
        const rawP2 = data?.aboutUsParagraph2 || 'Over the past 15 years, we have delivered 350+ projects for ambitious startups, scaling SMEs, and enterprises across the globe.';
        const rawP3 = data?.aboutUsParagraph3 || '';

        const allParagraphs = [];
        if (rawP1 && rawP1.trim()) {
          allParagraphs.push(rawP1.trim());
        }
        if (rawP2 && rawP2.trim()) {
          const p2Split = rawP2.split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);
          allParagraphs.push(...p2Split);
        }
        if (rawP3 && rawP3.trim()) {
          const p3Split = rawP3.split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);
          allParagraphs.push(...p3Split);
        }

        const formatAboutText = (text) => {
          if (!text) return '';
          return text
            .replace(/Web\s?Tycoons/g, '<strong>WebTycoons</strong>')
            .replace(/350\+\s*projects/gi, '<strong>350+ projects</strong>')
            .replace(/15\s*years/gi, '<strong>15 years</strong>')
            .replace(/1500\s*website/gi, '<strong>1500 websites</strong>')
            .replace(/2200\+\s*customers/gi, '<strong>2200+ customers</strong>');
        };

        return (
          <section className={`py-100 ${styles.aboutUsSection}`}>
            <div className="container-fluid-px">
              <motion.div
                className={styles.aboutUsFlowWrapper}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {/* Floated Left Visual Showcase */}
                <div className={styles.aboutUsFloatVisual}>
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
                </div>

                {/* Content Flowing Beside and Then Underneath */}
                <motion.div variants={fadeUp}>
                  <div style={{ marginBottom: '8px' }}>
                    <span className="section-label" style={{ marginBottom: 0 }}>WHO WE ARE</span>
                  </div>

                  <h2 className="section-heading mb-3" style={{ color: 'var(--clr-white)', marginTop: 0 }}>
                    {data?.aboutUsTitle || 'Your Strategic Partner in Digital Transformation'}
                  </h2>
                </motion.div>

                {allParagraphs.map((para, idx) => (
                  <motion.p
                    key={idx}
                    variants={fadeUp}
                    className={idx === 0 ? styles.aboutUsLeadPara : styles.aboutUsSubPara}
                    dangerouslySetInnerHTML={{ __html: formatAboutText(para) }}
                  />
                ))}

                {/* Modern Bento Feature Deck */}
                {Array.isArray(data?.aboutUsHighlights) && data.aboutUsHighlights.length > 0 && (
                  <motion.div variants={fadeUp} className={styles.bentoDeck}>
                    {data.aboutUsHighlights.map((hl, i) => {
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
                  </motion.div>
                )}

                {/* CTA Action Row & Trust Checkpoints */}
                <motion.div variants={fadeUp} className={styles.aboutUsActionRow}>
                  <div className={styles.aboutUsBtns}>
                    <Link href="/contact" className={styles.primaryActionButton}>
                      <span>Work With Us</span>
                      <FaArrowRight className={styles.btnArrowIcon} />
                    </Link>
                  </div>

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

                {/* Clearfix */}
                <div style={{ clear: 'both' }} />
              </motion.div>
            </div>
          </section>
        );
      })()}

      {/* ── Founder Section (Leadership Manifesto) ── */}
      <FounderSection founderData={founderData} />

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
            <SectionHeading subtitle="OUR STORY" title="From a Small Studio to a Trusted Agency" center={true} />
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
            {/* Inactive Base Guide Line */}
            <div className={styles.timelineBaseLine} />

            {/* Active Glowing Green Progress Line */}
            <div ref={lineProgressRef} className={styles.timelineProgressLine} />
            
            {data.milestones?.map((m, i) => {
              const isTop = i % 2 === 0; // Alternates: 0=Top, 1=Bottom, 2=Top, 3=Bottom...
              return (
                <div 
                  key={i} 
                  className={styles.milestoneItem}
                  data-milestone-index={i}
                >
                  {/* Glowing Node on the line */}
                  <div className={styles.timelineNode} />

                  {/* Giant Ghost Year Watermark */}
                  <div className={styles.timelineGhostYear}>
                    {m.year}
                  </div>

                  {/* Alternating Content Card */}
                  <div 
                    className={styles.timelineCard}
                    style={{
                      [isTop ? 'bottom' : 'top']: 'calc(50% + 28px)',
                    }}
                  >
                    {/* Header Row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <span className={styles.timelineYearBadge}>
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
            <div className="d-flex justify-content-center" style={{ marginBottom: '8px' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>WHAT WE STAND FOR</span>
            </div>
            <h2 className="section-heading text-center mb-3" style={{ color: 'var(--clr-white)', marginTop: 0 }}>
              Our Core Values
            </h2>
            <p className="section-description text-center" style={{ color: 'var(--clr-text-light)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
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
              const fallbackTags = ['CLIENT CENTRIC', 'MODERN TECH', 'HONEST & CLEAN', 'CRAFT & PRIDE'];
              const tag = v.tag || fallbackTags[i % fallbackTags.length];

              return (
                <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  className={styles.valueCard}
                  onMouseMove={handleCardMouseMove}
                >
                  {/* Large Background Watermark Number */}
                  <span className={styles.watermarkNumber} aria-hidden="true">
                    {indexFormatted}
                  </span>

                  {/* Top Row: Icon + Badge */}
                  <div className={styles.cardTop}>
                    <div className={styles.iconBox}>
                      <Icon />
                    </div>
                    <span className={styles.badgeNumber}>{indexFormatted}</span>
                  </div>

                  {/* Card Title & Description */}
                  <h3 className={styles.cardTitle}>{v.title}</h3>
                  <div className={styles.cardDesc}>
                    <p>{v.description}</p>
                  </div>

                  {/* Footer with Tag and Arrow */}
                  <div className={styles.cardFooter}>
                    <span className={styles.featureTag}>{tag}</span>
                    <div className={styles.arrowCircle}>
                      <ArrowUpRight size={17} strokeWidth={2.2} />
                    </div>
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