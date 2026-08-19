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
  FaLinkedinIn, FaTwitter, FaInstagram
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
  lightbulb: FaLightbulb,
  shield: FaShieldAlt,
  heart: FaHeart,
  rocket: FaRocket
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
      // Horizontal scroll animation
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: true,
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
        <div className={styles.heroBg} />
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

      {/* ── About Us ── */}
      <section className={`py-100 ${styles.aboutUsSection}`}>
        <div className="container-fluid-px">
          <motion.div
            className={styles.aboutUsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Left — Image Block */}
            <motion.div variants={fadeUp} className={styles.aboutImgBlock}>
              <div className={styles.aboutImgMain}>
                <Image
                  src={data.aboutUsImage1 || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"}
                  alt="WebTycoons Team"
                  className={styles.aboutImg}
                  width={1000}
                  height={800}
                />
              </div>
              <div className={styles.aboutImgFloat}>
                <Image
                  src={data.aboutUsImage2 || "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"}
                  alt="Our Office"
                  className={styles.aboutImg}
                  width={600}
                  height={400}
                />
              </div>
              <div className={styles.aboutExpBadge}>
                <span className={styles.expNumber}>{data.aboutUsYears}<sup>+</sup></span>
                <span className={styles.expText}>Years of<br />Excellence</span>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div variants={fadeUp} className={styles.aboutUsContent}>
              <div className={styles.sectionLabel}>WHO WE ARE</div>
              <h2 className={styles.aboutUsTitle} dangerouslySetInnerHTML={{ __html: (data?.aboutUsTitle || 'Your Trusted Partner in Digital Transformation').replace('Digital Transformation', `<span class="${styles.accent}">Digital Transformation</span>`) }} />
              <p className={styles.aboutUsPara} dangerouslySetInnerHTML={{ __html: (data?.aboutUsParagraph1 || 'Founded in 2011, WebTycoons is a full-service digital agency based in Delhi NCR, India.').replace('WebTycoons', '<strong>WebTycoons</strong>') }} />
              <p className={styles.aboutUsPara} dangerouslySetInnerHTML={{ __html: (data?.aboutUsParagraph2 || 'Over the past 15 years, we have delivered 350+ projects for startups, SMEs, and enterprises across industries.').replace('350+ projects', '<strong>350+ projects</strong>') }} />

              <div className={styles.aboutHighlights}>
                {data.aboutUsHighlights?.map((hl, i) => {
                  const Icon = iconMap[hl.icon?.toLowerCase()] || FaAward;
                  return (
                    <div key={i} className={styles.highlight}>
                      <Icon className={styles.highlightIcon} />
                      <div>
                        <h4>{hl.title}</h4>
                        <p>{hl.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.aboutUsBtns}>
                <Link href="/contact" className="btnPrimary">Work With Us &rarr;</Link>
                <Link href="/services" className={styles.btnOutline}>Our Services</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className={`py-100 ${styles.missionSection}`}>
        <div className="container-fluid-px">
          <motion.div
            className={styles.missionGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIcon}><FaBullseye /></div>
              <h2>Our Mission</h2>
              <p>{data.missionText}</p>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIcon}><FaRocket /></div>
              <h2>Our Vision</h2>
              <p>{data.visionText}</p>
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

      {/* ── Our Story (Horizontal GSAP Scroll) ── */}
      <section className={styles.storySection} ref={sectionRef}>
        <div className={styles.storyHeadingContainer}>
          <SectionHeading subtitle="OUR STORY" title={<>From a Small Studio to a <span className={styles.accent}>Trusted Agency</span></>} center={true} />
        </div>
        
        <div className={styles.stickyContainer}>
          <div className={styles.horizontalTrack} ref={trackRef}>
            <div className={styles.trackLine}></div>
            
            {data.milestones?.map((m, i) => (
              <div key={i} className={styles.hmCard}>
                <div className={styles.hmDot}></div>
                <div className={styles.hmYear}>{m.year}</div>
                <div className={styles.hmContent}>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className={`py-100 ${styles.valuesSection}`}>
        <div className="container-fluid-px">
          <SectionHeading subtitle="WHAT WE STAND FOR" title={<>Our Core <span className={styles.accent}>Values</span></>} center={true} />
          <motion.div
            className={styles.valuesGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.values?.map((v, i) => {
              const Icon = iconMap[v.icon?.toLowerCase()] || FaHeart;
              return (
                <motion.div key={i} variants={fadeUp} className={styles.valueCard}>
                  <div className={styles.valueIcon}><Icon /></div>
                  <h3>{v.title}</h3>
                  <p>{v.description}</p>
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