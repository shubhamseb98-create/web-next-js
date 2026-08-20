'use client';
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, staggerContainer, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/AboutCompany.module.css'
import Image from 'next/image';

const AboutCompany = ({ aboutData }) => {
  const title = aboutData?.title || '*Scale at Speed™* with WebTycoons';
  const description = aboutData?.description || 'Our promise to help enterprises across industries transform at speed and bring agility, resilience, and efficiency to their businesses.';
  const image = aboutData?.image || '/assets/img/about-us-it-company.png';
  const alt = aboutData?.alt || 'WebTycoons IT Company';

  const formatTitle = (text) => {
    if (!text) return '';
    // If they provided literal HTML, just use it (for backwards compatibility if any old HTML is in DB)
    if (text.includes('<span')) return text;
    
    // Convert *text* to span with titleHighlight, wrap everything else in titleSecondary
    // Split by asterisks, every odd index is inside asterisks
    const parts = text.split('*');
    let formatted = '';
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        formatted += `<span class="${styles.titleHighlight}">${parts[i]}</span>`;
      } else {
        formatted += `<span class="${styles.titleSecondary}">${parts[i]}</span>`;
      }
    }
    
    return formatted.replace(/\n/g, '<br />');
  };

  return (
    <section className={styles.section} id="about">
      <div className="container-fluid-px">
        <div className="row align-items-center">
          {/* Left: Text Content */}
          <motion.div 
            className={`col-12 col-lg-6 ${styles.contentWrapper}`}
            variants={staggerContainer()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <motion.div variants={fadeUp}>
              <h2 className="mb-4" dangerouslySetInnerHTML={{ __html: formatTitle(title) }}></h2>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.text} dangerouslySetInnerHTML={{ __html: description }}></motion.div>
            
            <motion.div variants={fadeUp} className={styles.buttonGroup}>
              <a href="#contact" className={styles.primaryBtn}>
                KNOW MORE
              </a>
              <a href="#about" className={styles.outlineBtn}>
                OUR BRAND STORY
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Abstract Visual / Image */}
          <motion.div 
            className={`col-12 col-lg-6 p-0 ${styles.imageCol}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeLeft}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={image} 
                alt={alt} 
                fill
                sizes="(max-width: 992px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className={styles.image} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutCompany
