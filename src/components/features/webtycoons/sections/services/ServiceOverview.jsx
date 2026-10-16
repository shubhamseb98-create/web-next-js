'use client';
import { motion } from 'framer-motion'
import { 
  FaCheck, 
  FaLaptopCode, 
  FaUsers, 
  FaAward, 
  FaChartLine, 
  FaLayerGroup 
} from 'react-icons/fa'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'

const ServiceOverview = ({ data, image, serviceTitle }) => {
  if (!data) return null;

  const displayTitle = serviceTitle || data.title || 'Website Designing';

  return (
    <section className={styles.overviewSection}>
      <div className="container-fluid-px">
        <div className={styles.overviewContainer}>

          {/* 1. TOP SERVICE IMAGE SHOWCASE */}
          {image && (
            <motion.div 
              className={styles.overviewHeroMediaWrapper}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <img 
                src={image} 
                alt={`${displayTitle} Showcase`} 
                className={styles.overviewHeroMediaImg}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className={styles.overviewHeroBadge}>
                <span className={styles.livePulse}></span>
                <span>WebTycoons Signature Craft</span>
              </div>
            </motion.div>
          )}

          {/* 2. SERVICE HEADING & PARAGRAPH BLOCK */}
          <motion.div 
            className={styles.overviewContentHeader}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className={styles.categoryBadge}>
              <FaLayerGroup />
              <span>Service Deep-Dive & Architecture</span>
            </div>

            <h2 className={styles.mainServiceHeading}>
              {displayTitle} — <span className={styles.mainServiceHeadingHighlight}>Built for Brand Authority, Speed & Scale</span>
            </h2>

            {data.description && (
              <div 
                className={styles.mainServiceDesc}
                dangerouslySetInnerHTML={{ __html: data.description }} 
              />
            )}
          </motion.div>

          {/* 3. 4-PILLAR BENTO MATRIX (Compact & Single-Tone Brand Theme) */}
          <motion.div 
            className={styles.bentoGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* CARD 1: What is this service? */}
            {data.whatIsIt && (
              <motion.div variants={fadeUp} className={styles.bentoCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconCircle}>
                    <FaLaptopCode />
                  </div>
                  <span className={styles.cardBadge}>01 • DEFINITION</span>
                </div>

                <div className={styles.cardMain}>
                  <h3 className={styles.cardTitle}>What is this service?</h3>
                  <p className={styles.cardText}>{data.whatIsIt}</p>
                </div>

                <div className={styles.compactTagRow}>
                  <span className={styles.compactTag}>Bespoke UI/UX</span>
                  <span className={styles.compactTag}>Sub-Second Speed</span>
                  <span className={styles.compactTag}>100% Responsive</span>
                </div>
              </motion.div>
            )}

            {/* CARD 2: Who needs this service? */}
            {data.whoNeedsIt && (
              <motion.div variants={fadeUp} className={styles.bentoCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconCircle}>
                    <FaUsers />
                  </div>
                  <span className={styles.cardBadge}>02 • TARGET AUDIENCE</span>
                </div>

                <div className={styles.cardMain}>
                  <h3 className={styles.cardTitle}>Who needs this service?</h3>
                  <p className={styles.cardText}>{data.whoNeedsIt}</p>
                </div>

                <div className={styles.compactTagRow}>
                  <span className={styles.compactTag}>Startups & Scaleups</span>
                  <span className={styles.compactTag}>Corporate Enterprises</span>
                  <span className={styles.compactTag}>E-Commerce Brands</span>
                  <span className={styles.compactTag}>Agencies & Founders</span>
                </div>
              </motion.div>
            )}

            {/* CARD 3: Why choose WebTycoons? */}
            {data.whyChooseUs && (
              <motion.div variants={fadeUp} className={styles.bentoCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconCircle}>
                    <FaAward />
                  </div>
                  <span className={styles.cardBadge}>03 • OUR ADVANTAGE</span>
                </div>

                <div className={styles.cardMain}>
                  <h3 className={styles.cardTitle}>Why choose WebTycoons?</h3>
                  <p className={styles.cardText}>{data.whyChooseUs}</p>
                </div>

                <div className={styles.compactStatsBar}>
                  <div className={styles.compactStatItem}>
                    <span className={styles.compactStatVal}>15+</span>
                    <span className={styles.compactStatLbl}>Years Legacy</span>
                  </div>
                  <div className={styles.compactStatItem}>
                    <span className={styles.compactStatVal}>350+</span>
                    <span className={styles.compactStatLbl}>Websites Live</span>
                  </div>
                  <div className={styles.compactStatItem}>
                    <span className={styles.compactStatVal}>100%</span>
                    <span className={styles.compactStatLbl}>Code Ownership</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CARD 4: Key Benefits & ROI */}
            {data.benefits && data.benefits.length > 0 && (
              <motion.div variants={fadeUp} className={styles.bentoCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardIconCircle}>
                    <FaChartLine />
                  </div>
                  <span className={styles.cardBadge}>04 • KEY BENEFITS</span>
                </div>

                <div className={styles.cardMain}>
                  <h3 className={styles.cardTitle}>Key Benefits & ROI</h3>
                  
                  <div className={styles.compactBenefitsList}>
                    {data.benefits.map((benefit, idx) => {
                      const isObj = typeof benefit === 'object' && benefit !== null;
                      const bTitle = isObj ? benefit.title : benefit;
                      return (
                        <div key={idx} className={styles.compactBenefitItem}>
                          <FaCheck className={styles.compactCheckIcon} />
                          <span>{bTitle}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
