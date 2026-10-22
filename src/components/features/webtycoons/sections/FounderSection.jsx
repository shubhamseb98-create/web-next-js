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
  const badge_1_number = founderData?.badge_1_number !== undefined ? founderData.badge_1_number : "18+";
  const badge_1_label = founderData?.badge_1_label !== undefined ? founderData.badge_1_label : "Years Industry Mastery";
  const badge_2_tag = founderData?.badge_2_tag !== undefined ? founderData.badge_2_tag : "PROVEN TRACK RECORD";
  const badge_2_number = founderData?.badge_2_number !== undefined ? founderData.badge_2_number : "350+";
  const badge_2_label = founderData?.badge_2_label !== undefined ? founderData.badge_2_label : "Delivered Worldwide";
  const badge_3_text = founderData?.badge_3_text !== undefined ? founderData.badge_3_text : "100% Code Ownership";

  // Dynamic Bottom Key Value Points (from founderData.points array or fallback fields)
  const rawPoints = Array.isArray(founderData?.points) && founderData.points.length > 0
    ? founderData.points
    : [
        { number: "01", title: founderData?.point_1_title || "Direct Founder Advisory", desc: founderData?.point_1_desc || "Personal architectural oversight and strategic technical consultation on every enterprise delivery." },
        { number: "02", title: founderData?.point_2_title || "Zero Software Bloat", desc: founderData?.point_2_desc || "Clean, bespoke codebases engineered for sub-second speeds and ultra-high Lighthouse scores." },
        { number: "03", title: founderData?.point_3_title || "100% Code & IP Ownership", desc: founderData?.point_3_desc || "Complete transparency, full GitHub repository handover, and zero proprietary lock-in." },
        { number: "04", title: founderData?.point_4_title || "Measurable Growth ROI", desc: founderData?.point_4_desc || "Sprint-driven execution focused strictly on driving real business pipeline and client revenue." },
      ];

  const pointsList = rawPoints
    .filter((p) => p && typeof p.title === 'string' && p.title.trim())
    .map((p, idx) => ({
      ...p,
      number: p.number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
    }));

  const colClass = pointsList.length === 3 
    ? "col-12 col-md-4" 
    : pointsList.length === 2 
    ? "col-12 col-md-6" 
    : "col-12 col-sm-6 col-lg-3";

  // Badges only show if user entered values (if blank, they hide completely)
  const hasBadge1 = Boolean(badge_1_number && badge_1_number.trim());
  const hasBadge2 = Boolean(badge_2_number && badge_2_number.trim());
  const hasBadge3 = Boolean(badge_3_text && badge_3_text.trim());

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
              {/* Eyebrow Badge & Main Headline */}
              <motion.div variants={fadeUp}>
                <div style={{ marginBottom: '8px' }}>
                  <span className="section-label" style={{ marginBottom: 0 }}>{eyebrow}</span>
                </div>
                <h2 className="section-heading mt-0 mb-4" style={{ color: 'var(--clr-white)', marginTop: 0 }}>
                  {heading_start}{' '}{heading_highlight}{' '}{heading_end}
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
                {hasBadge1 && (
                  <div className={styles.badgeExperience}>
                    <div className={styles.badgeIconBox}>
                      <FaStar />
                    </div>
                    <div>
                      {badge_1_number && (
                        <div className={styles.badgeNumber}>
                          {badge_1_number}
                        </div>
                      )}
                      {badge_1_label && (
                        <div className={styles.badgeLabel}>{badge_1_label}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Floating Glassmorphic Badge 2: 350+ Projects Delivered */}
                {hasBadge2 && (
                  <div className={styles.badgeProjects}>
                    {badge_2_tag && (
                      <div className={styles.badgeLiveRow}>
                        <span className={styles.badgeLiveDot} />
                        <span className={styles.badgeLiveTag}>{badge_2_tag}</span>
                      </div>
                    )}
                    {badge_2_number && (
                      <div className={styles.badgeProjectsCount}>
                        {badge_2_number} Projects
                      </div>
                    )}
                    {badge_2_label && (
                      <div className={styles.badgeProjectsSub}>{badge_2_label}</div>
                    )}
                  </div>
                )}

                {/* Floating Micro Badge 3: 100% Code Ownership */}
                {hasBadge3 && (
                  <div className={styles.badgeCodeOwnership}>
                    <CheckCircle2 className={styles.badgeCheckIcon} size={13} />
                    <span>{badge_3_text}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Bottom Section: 4 Key Value Points / Pillars ── */}
        {pointsList.length > 0 && (
          <motion.div 
            className={styles.pointsWrapper}
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <div className="row g-3 g-lg-4">
              {pointsList.map((pt, idx) => (
                <div key={idx} className={colClass}>
                  <motion.div variants={fadeUp} className={styles.pointCard}>
                    <div className={styles.pointHeader}>
                      <span className={styles.pointNumber}>{pt.number}</span>
                      <div className={styles.pointIconWrap}>
                        <CheckCircle2 size={15} className={styles.pointIcon} />
                      </div>
                    </div>
                    <h4 className={styles.pointTitle}>{pt.title}</h4>
                    {pt.desc && <p className={styles.pointDesc}>{pt.desc}</p>}
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
