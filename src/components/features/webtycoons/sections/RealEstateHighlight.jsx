'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBuilding, 
  FaDesktop, 
  FaCogs, 
  FaRocket, 
  FaArrowRight, 
  FaChartLine,
  FaHandshake
} from 'react-icons/fa';
import styles from '../../../../css/webtycoons/RealEstateHighlight.module.css';
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants';

const growthPillars = [
  {
    icon: FaChartLine,
    title: 'High-Ticket Lead Generation',
    desc: 'Precision-targeted Meta & Google ad campaigns generating verified luxury homebuyers, NRIs, and commercial investors.',
    tag: 'Qualified Buyer Pipeline'
  },
  {
    icon: FaDesktop,
    title: 'PropTech Portals & 3D Tech',
    desc: 'Bespoke high-speed project discovery portals with 3D interactive unit selectors and immersive virtual walkthroughs.',
    tag: '68% Higher Conversion'
  },
  {
    icon: FaCogs,
    title: 'Automated WhatsApp & Sales CRM',
    desc: 'Zero lead leakage with 60-second automated WhatsApp response bots, instant calling triggers, and calendar scheduling.',
    tag: 'Zero Lead Leakage'
  },
  {
    icon: FaRocket,
    title: 'Project Launch GTM Strategy',
    desc: 'End-to-end launch playbooks, pre-booking buzz, 3D architectural visualization, and channel partner meet campaigns.',
    tag: 'Rapid Inventory Absorption'
  }
];

const stats = [
  { value: '150+', label: 'Real Estate Firms Scaled', isAccent: true },
  { value: '10x', label: 'Lead Volume Growth' },
  { value: '₹2,500Cr+', label: 'Project Sales Marketed', isAccent: true },
  { value: '45%', label: 'Lower Cost Per Acquisition' }
];

export default function RealEstateHighlight() {
  return (
    <section className={styles.section} id="real-estate-specialist">
      <div className={styles.backgroundGlow} />

      <div className="container-fluid-px">
        <div className={styles.roundedWrapper}>
          
          {/* Header */}
          <motion.div 
            className={styles.headerWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <div className={styles.specialistBadge}>
              <span className={styles.pulseDot} />
              Real Estate Business Growth &amp; Scaling Advisory
            </div>
            
            <h2 className={styles.mainHeading}>
              Accelerate &amp; Scale Your <span className={styles.titleHighlight}>Real Estate Business</span>
            </h2>
            
            <p className={styles.subHeading}>
              We do <strong>NOT</strong> sell properties or act as brokers. We advise real estate builders, developers, agencies, and channel partners on how to generate 10x high-ticket buyer leads, automate sales funnels, and scale project revenues.
            </p>
          </motion.div>

          {/* 4 Feature Cards */}
          <motion.div 
            className={styles.cardsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {growthPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className={styles.highlightCard}>
                  <div>
                    <div className={styles.cardIconWrap}>
                      <IconComp />
                    </div>
                    <h3 className={styles.cardTitle}>{pillar.title}</h3>
                    <p className={styles.cardDesc}>{pillar.desc}</p>
                  </div>
                  <div>
                    <span className={styles.cardTag}>{pillar.tag}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stats Bar */}
          <motion.div 
            className={styles.statsRow}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={`${styles.statNumber} ${stat.isAccent ? styles.statNumberAccent : ''}`}>
                  {stat.value}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Bottom Bar */}
          <motion.div 
            className={styles.ctaBar}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <div className={styles.ctaText}>
              <h4>Ready to scale your real estate business and 10x sales velocity?</h4>
              <p>Explore our dedicated growth advisory framework or claim a custom scaling blueprint for your firm.</p>
            </div>

            <div className={styles.ctaButtonGroup}>
              <Link href="/services/real-estate-advisory" className={styles.primaryCta}>
                Explore Growth Advisory <FaArrowRight />
              </Link>
              <Link href="/services/real-estate-advisory#consultation" className={styles.secondaryCta}>
                Request Growth Audit
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
