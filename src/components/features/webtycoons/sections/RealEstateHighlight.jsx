'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBuilding, 
  FaRocket, 
  FaChartLine, 
  FaWhatsapp, 
  FaDesktop, 
  FaHandshake, 
  FaArrowRight, 
  FaCheckCircle, 
  FaShieldAlt,
  FaCalculator
} from 'react-icons/fa';
import styles from '../../../../css/webtycoons/RealEstateHighlight.module.css';
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants';

const growthPillars = [
  {
    icon: FaChartLine,
    title: 'High-Ticket Lead Generation',
    desc: 'Hyper-targeted Meta & Google ad funnels generating verified luxury homebuyers & NRI investors.'
  },
  {
    icon: FaDesktop,
    title: 'PropTech Portals & 3D Tech',
    desc: 'Interactive 3D unit selectors, virtual walkthroughs, and high-speed Next.js project landing pages.'
  },
  {
    icon: FaWhatsapp,
    title: '60-Sec Sales & WhatsApp CRM',
    desc: 'Zero lead leakage with instant automated WhatsApp connect, call routing, and site-visit reminders.'
  },
  {
    icon: FaHandshake,
    title: 'Channel Partner (CP) Scaling',
    desc: 'Dedicated broker portals, transparent attribution, and automated commission milestone tracking.'
  }
];

const keyStats = [
  { value: '₹4,200Cr+', label: 'Sales Influenced' },
  { value: '14.8x', label: 'Average ROAS' },
  { value: '185K+', label: 'Verified Inquiries' },
  { value: '< 60s', label: 'Lead Response' }
];

export default function RealEstateHighlight() {
  return (
    <section className={styles.section} id="real-estate-specialist">
      {/* Subtle Glows */}
      <div className={styles.ambientGlow} />

      <div className="container-fluid-px">
        <div className={styles.showcaseBox}>
          
          <div className={styles.splitGrid}>
            
            {/* ── Left: Value Prop & Pillars ── */}
            <motion.div 
              className={styles.leftCol}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeUp}
            >
              {/* Badge */}
              <div className={styles.badge}>
                <span className={styles.pulseDot} />
                <span>Specialized Advisory Vertical</span>
              </div>

              {/* Headline */}
              <h2 className={styles.heading}>
                We Help Real Estate Businesses <span className={styles.gradientText}>Scale &amp; Grow</span>
              </h2>

              {/* Subtitle */}
              <p className={styles.subtext}>
                We do <strong className={styles.strongText}>NOT</strong> sell properties. We are specialized PropTech &amp; growth strategists who advise builders, developers, and agencies on generating 10x high-ticket buyer leads, automating sales funnels, and accelerating sales velocity.
              </p>

              {/* 4 Compact Growth Pillars */}
              <div className={styles.pillarsGrid}>
                {growthPillars.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={idx} className={styles.pillarItem}>
                      <div className={styles.pillarIconBox}>
                        <Icon />
                      </div>
                      <div className={styles.pillarText}>
                        <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                        <p className={styles.pillarDesc}>{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className={styles.actionRow}>
                <Link href="/services/real-estate-advisory" className={styles.primaryBtn}>
                  Explore Growth Advisory <FaArrowRight />
                </Link>
                <Link href="/services/real-estate-advisory#consultation" className={styles.secondaryBtn}>
                  Book Growth Audit
                </Link>
              </div>
            </motion.div>

            {/* ── Right: Executive Stats & Proof Card ── */}
            <motion.div 
              className={styles.rightCol}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeUp}
            >
              <div className={styles.proofCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardBadge}>
                    <FaShieldAlt /> Proven Advisory Track Record
                  </div>
                  <span className={styles.cardSub}>For Developers &amp; Agencies</span>
                </div>

                {/* 2x2 Stats Grid */}
                <div className={styles.statsGrid}>
                  {keyStats.map((st, i) => (
                    <div key={i} className={styles.statBox}>
                      <div className={styles.statNum}>{st.value}</div>
                      <div className={styles.statLbl}>{st.label}</div>
                    </div>
                  ))}
                </div>

                {/* Growth Highlights */}
                <div className={styles.bulletList}>
                  <div className={styles.bulletItem}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <span>Multi-layer OTP verified NRI &amp; HNI buyer funnels</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <span>Interactive 3D unit selector &amp; virtual tour architecture</span>
                  </div>
                  <div className={styles.bulletItem}>
                    <FaCheckCircle className={styles.checkIcon} />
                    <span>Under-60-second automated WhatsApp &amp; CRM pipeline</span>
                  </div>
                </div>

                {/* Bottom Calculator Link */}
                <div className={styles.cardFooter}>
                  <Link href="/services/real-estate-advisory#roi-calculator" className={styles.calcLink}>
                    <FaCalculator /> Calculate Your Real Estate Growth ROI →
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

