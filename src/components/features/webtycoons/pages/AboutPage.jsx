import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaUsers, FaRocket, FaAward, FaHandshake,
  FaBullseye, FaLightbulb, FaShieldAlt, FaHeart,
  FaLinkedinIn, FaTwitter, FaInstagram
} from 'react-icons/fa'
import styles from '../../../../css/webtycoons/AboutPage.module.css'
import { fadeUp, staggerContainer } from '../animations/variants'
import SectionHeading from '../components/SectionHeading/SectionHeading'
import TeamSection from '../components/Sections/TeamSection'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '350+', label: 'Projects Delivered' },
  { value: '120+', label: 'Happy Clients' },
  { value: '25+', label: 'Expert Team Members' },
]

const values = [
  { icon: FaBullseye, title: 'Client-First', desc: 'Every decision is driven by what creates maximum value for our clients.' },
  { icon: FaLightbulb, title: 'Innovation', desc: 'We stay ahead of the curve, building with the latest and best technologies.' },
  { icon: FaShieldAlt, title: 'Integrity', desc: 'Honest timelines, transparent pricing, and clean code — always.' },
  { icon: FaHeart, title: 'Passion', desc: 'We genuinely love building great digital products. That passion shows.' },
]

const milestones = [
  { year: '2011', title: 'Founded', desc: 'WebTycoons was born with a vision to help businesses win online.' },
  { year: '2014', title: '50 Clients', desc: 'Hit our first milestone of 50 happy clients across industries.' },
  { year: '2017', title: 'Team of 10', desc: 'Grew into a specialized team of designers, developers, and strategists.' },
  { year: '2020', title: 'E-Commerce Boom', desc: 'Launched 80+ online stores, helping businesses go digital during COVID.' },
  { year: '2023', title: '200+ Projects', desc: 'Crossed 200 delivered projects and expanded into AI-integrated web apps.' },
  { year: '2026', title: '15 Years of Excellence', desc: 'Celebrating 15 years as one of the top web agencies in Delhi NCR.' },
]

const AboutPage = () => {
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

  useEffect(() => {
    document.title = 'About Us | WebTycoons'
  }, [])

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
            <h1 className={styles.heroTitle}>
              We Are the <span className={styles.accent}>King Makers</span><br />of the Digital World
            </h1>
            <p className={styles.heroDesc}>
              A passionate team of designers, developers, and digital strategists on a mission to build extraordinary web experiences.
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
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                  alt="WebTycoons Team"
                  className={styles.aboutImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.aboutImgFloat}>
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
                  alt="Our Office"
                  className={styles.aboutImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.aboutExpBadge}>
                <span className={styles.expNumber}>15<sup>+</sup></span>
                <span className={styles.expText}>Years of<br />Excellence</span>
              </div>
            </motion.div>

            {/* Right — Content */}
            <motion.div variants={fadeUp} className={styles.aboutUsContent}>
              <div className={styles.sectionLabel}>WHO WE ARE</div>
              <h2 className={styles.aboutUsTitle}>
                Your Trusted Partner in<br />
                <span className={styles.accent}>Digital Transformation</span>
              </h2>
              <p className={styles.aboutUsPara}>
                Founded in 2011, <strong>WebTycoons</strong> is a full-service digital agency based in Delhi NCR, India. We are a passionate team of designers, developers, strategists, and digital thinkers who believe that a great website is more than just a pretty interface — it's your most powerful business tool.
              </p>
              <p className={styles.aboutUsPara}>
                Over the past 15 years, we have delivered <strong>350+ projects</strong> for startups, SMEs, and enterprises across industries — from high-converting landing pages and complex dynamic platforms to enterprise e-commerce stores. Every project we take on is driven by a single goal: <em>measurable results for our clients.</em>
              </p>

              <div className={styles.aboutHighlights}>
                <div className={styles.highlight}>
                  <FaAward className={styles.highlightIcon} />
                  <div>
                    <h4>Award-Winning Work</h4>
                    <p>Recognized as a top digital agency in Delhi NCR for design excellence.</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <FaHandshake className={styles.highlightIcon} />
                  <div>
                    <h4>Client-Centric Approach</h4>
                    <p>We treat your business as our own, ensuring success at every step.</p>
                  </div>
                </div>
                <div className={styles.highlight}>
                  <FaUsers className={styles.highlightIcon} />
                  <div>
                    <h4>Expert Team of 25+</h4>
                    <p>Specialists in design, development, SEO, cloud, and digital strategy.</p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutUsBtns}>
                <Link href="/contact" className="btnPrimary">Work With Us →</Link>
                <Link href="/services/static-website-development" className={styles.btnOutline}>Our Services</Link>
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
              <p>To empower businesses of all sizes with cutting-edge, high-performance digital products — delivered with transparency, passion, and precision.</p>
            </motion.div>
            <motion.div variants={fadeUp} className={styles.missionCard}>
              <div className={styles.missionIcon}><FaRocket /></div>
              <h2>Our Vision</h2>
              <p>To be the most trusted web development partner for growth-focused businesses globally, recognized for excellence in craft and client success.</p>
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
            {stats.map((s, i) => (
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
            
            {milestones.map((m, i) => (
              <div key={i} className={styles.hmCard}>
                <div className={styles.hmDot}></div>
                <div className={styles.hmYear}>{m.year}</div>
                <div className={styles.hmContent}>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
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
            {values.map((v, i) => {
              const indexFormatted = String(i + 1).padStart(2, '0');
              return (
                <motion.div key={i} variants={fadeUp} className={styles.valueCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.valueIcon}>
                      <v.icon />
                    </div>
                    <span className={styles.cardNumber}>{indexFormatted}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{v.title}</h3>
                    <p className={styles.cardDesc}>{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Team ── */}
      <TeamSection />

      {/* ── CTA ── */}
      <section className={`py-100 ${styles.ctaSection}`}>
        <div className="container-fluid-px text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className={styles.ctaTitle}>Ready to Build Something <span className={styles.accent}>Extraordinary?</span></h2>
            <p className={styles.ctaDesc}>Let's discuss your project and turn your vision into a world-class digital product.</p>
            <div className={styles.ctaBtns}>
              <Link href="/contact" className="btnPrimary">Start a Project →</Link>
              <Link href="/services/static-website-development" className={styles.ctaBtnOutline}>Explore Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}

export default AboutPage
