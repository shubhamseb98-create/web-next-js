'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Quote, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { FaLinkedinIn, FaStar } from 'react-icons/fa';
import styles from '../../../../css/webtycoons/FounderSection.module.css';
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants';

export default function FounderSection({ founderData }) {
  if (founderData?.isActive === false) return null;

  const eyebrow = founderData?.eyebrow || "FROM THE FOUNDER'S DESK";
  const heading_start = founderData?.heading_start || "Architecting";
  const heading_highlight = founderData?.heading_highlight || "Digital Dominance";
  const heading_end = founderData?.heading_end || "& Engineering Real Value";
  const name = founderData?.founder_name || founderData?.name?.replace(/<br\s*\/?>/gi, ' ') || 'Dheeraj Aggarwal';
  const role = founderData?.founder_role || founderData?.role || 'Founder & CEO';
  const quote_tag = founderData?.quote_tag || "OUR FOUNDATIONAL COMMITMENT";
  const quote_text = founderData?.quote_text || "We didn't start WebTycoons to just build websites. We set out to give ambitious businesses complete code ownership, sub-second speed, and high-converting digital platforms engineered to dominate their industries.";
  const bio = founderData?.bio_text || founderData?.bio || 'MBA in Marketing from Symbiosis Pune with over 18 years of expertise in digital marketing, SEO, and enterprise growth operations. Regular keynote speaker across national business forums. Since establishing WebTycoons in 2011, he has personally steered over 350+ enterprise digital projects, pioneering bespoke tech solutions that eliminate software bloat and maximize measurable client ROI.';
  const primary_btn_text = founderData?.primary_btn_text || "Work With Our Team";
  const primary_btn_url = founderData?.primary_btn_url || "/contact";
  const linkedin = founderData?.linkedin_url || (founderData?.linkedin && founderData?.linkedin !== '#' ? founderData.linkedin : 'https://www.linkedin.com');
  const signature_text = founderData?.signature_text || "Dheeraj Aggarwal";
  const signature_subtext = founderData?.signature_subtext || "Founder & CEO, WebTycoons";
  const image = founderData?.image || founderData?.img || '/assets/img/team/sitara-removebg-preview.png';
  const alt = founderData?.alt || `${name} - ${role}`;
  const badge_1_number = founderData?.badge_1_number || "18+";
  const badge_1_label = founderData?.badge_1_label || "Years Industry Mastery";
  const badge_2_tag = founderData?.badge_2_tag || "PROVEN TRACK RECORD";
  const badge_2_number = founderData?.badge_2_number || "350+";
  const badge_2_label = founderData?.badge_2_label || "Delivered Worldwide";
  const badge_3_text = founderData?.badge_3_text || "100% Code Ownership";

  return (
    <section className={styles.section} id="founder">
      {/* Background ambient lighting */}
      <div className={styles.ambientGlowLeft} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      <div className={`container-fluid-px ${styles.containerWrapper}`}>
        <div className="row align-items-center g-4 g-lg-5">
          {/* ── Left Column: Founder Story, Vision & Manifesto ── */}
          <div className="col-12 col-lg-7">
            <motion.div 
              className={styles.contentCol}
              variants={staggerContainer(0.06, 0.04)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              {/* Eyebrow Badge */}
              <motion.div variants={fadeUp}>
                <div className={styles.modernBadgePill}>
                  <span className={styles.pulseDot} />
                  <span>{eyebrow}</span>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={fadeUp}>
                <h2 className={styles.mainTitle}>
                  {heading_start}{' '}
                  <span className={styles.titleGradient}>{heading_highlight}</span>
                  {' '}{heading_end}
                </h2>
              </motion.div>

              {/* Founder Header (Name & Designation Badge) */}
              <motion.div variants={fadeUp} className={styles.founderIntroHeader}>
                <h3 className={styles.founderName}>{name}</h3>
                <span className={styles.founderRoleBadge}>{role}</span>
              </motion.div>

              {/* Founder Quote Card */}
              <motion.div variants={fadeUp} className={styles.quoteCard}>
                <div className={styles.quoteHeader}>
                  <Quote className={styles.quoteIcon} />
                  <span className={styles.quoteTag}>{quote_tag}</span>
                </div>
                <p className={styles.quoteText}>
                  &ldquo;{quote_text}&rdquo;
                </p>
              </motion.div>

              {/* Bio Narrative */}
              <motion.div variants={fadeUp}>
                <p className={styles.bioText} dangerouslySetInnerHTML={{ __html: bio }} />
              </motion.div>

              {/* Action Buttons & Signature */}
              <motion.div variants={fadeUp} className={styles.actionRow}>
                <Link href={primary_btn_url} className={styles.primaryBtn}>
                  <span>{primary_btn_text}</span>
                  <ArrowRight size={15} className={styles.btnArrowIcon} />
                </Link>

                {linkedin && (
                  <a 
                    href={linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles.linkedinBtn}
                    aria-label={`Connect with ${name} on LinkedIn`}
                  >
                    <FaLinkedinIn size={13} />
                    <span>Connect on LinkedIn</span>
                  </a>
                )}

                {/* Digital Signature */}
                {signature_text && (
                  <div className={styles.signatureWrap}>
                    <span className={styles.signatureScript}>{signature_text}</span>
                    <span className={styles.signatureSubtext}>{signature_subtext}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* ── Right Column: High-Impact Visual Showcase ── */}
          <div className="col-12 col-lg-5">
            <motion.div 
              className={styles.visualCol}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.visualWrapper}>
                {/* Ambient Aura Behind Image */}
                <div className={styles.visualAuraGlow} aria-hidden="true" />

                {/* Main Portrait Frame */}
                <div className={styles.portraitFrame}>
                  <div className={styles.frameRing} aria-hidden="true" />
                  
                  {/* Tech Corner Brackets */}
                  <div className={`${styles.cornerAccent} ${styles.cornerTopLeft}`} aria-hidden="true" />
                  <div className={`${styles.cornerAccent} ${styles.cornerBottomRight}`} aria-hidden="true" />

                  {/* Founder Image */}
                  <Image
                    src={image}
                    alt={alt}
                    width={480}
                    height={560}
                    className={styles.founderImage}
                    priority
                  />

                  {/* Bottom Vignette Gradient */}
                  <div className={styles.imageBottomGradient} aria-hidden="true" />
                </div>

                {/* Floating Glassmorphic Badge 1: 18+ Years Mastery */}
                {badge_1_number && (
                  <div className={styles.badgeExperience}>
                    <div className={styles.badgeIconBox}>
                      <FaStar />
                    </div>
                    <div>
                      <div className={styles.badgeNumber}>
                        {badge_1_number}
                      </div>
                      <div className={styles.badgeLabel}>{badge_1_label}</div>
                    </div>
                  </div>
                )}

                {/* Floating Glassmorphic Badge 2: 350+ Projects Delivered */}
                {badge_2_number && (
                  <div className={styles.badgeProjects}>
                    <div className={styles.badgeLiveRow}>
                      <span className={styles.badgeLiveDot} />
                      <span className={styles.badgeLiveTag}>{badge_2_tag}</span>
                    </div>
                    <div className={styles.badgeProjectsCount}>
                      {badge_2_number} Projects
                    </div>
                    <div className={styles.badgeProjectsSub}>{badge_2_label}</div>
                  </div>
                )}

                {/* Floating Micro Badge 3: 100% Code Ownership */}
                {badge_3_text && (
                  <div className={styles.badgeCodeOwnership}>
                    <CheckCircle2 className={styles.badgeCheckIcon} size={13} />
                    <span>{badge_3_text}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
