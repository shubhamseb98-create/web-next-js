'use client';
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/AboutCompany.module.css'
import Image from 'next/image';
import Link from 'next/link';

const imageEntranceVariant = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const AboutCompany = ({ aboutData }) => {
  const title_green = aboutData?.title_green;
  const title_white = aboutData?.title_white;
  const title = aboutData?.title || '*Scale at Speed™* with WebTycoons';
  const description = aboutData?.description || 'Our promise to help enterprises across industries transform at speed and bring agility, resilience, and efficiency to their businesses.';
  const image = aboutData?.image || '/assets/img/about-us-it-company.png';
  const alt = aboutData?.alt || 'WebTycoons IT Company';

  const formatTitle = (text) => {
    if (!text) return '';
    // If they provided literal HTML, just use it (for backwards compatibility if any old HTML is in DB)
    if (text.includes('<span')) return text;
    
    // Convert [text] or *text* to span with titleHighlight, wrap everything else in titleSecondary
    let parts = text.split('*');
    if (parts.length === 1) {
       parts = text.split(/\[|\]/);
    }
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

  const renderHeading = () => {
    if (title_green || title_white) {
      return (
        <>
          {title_green && <span className={styles.titleHighlight}>{title_green}</span>}
          {title_green && title_white && <br />}
          {title_white && <span className={styles.titleSecondary}>{title_white}</span>}
        </>
      );
    }
    return <span dangerouslySetInnerHTML={{ __html: formatTitle(title) }} />;
  };

  return (
    <section className={styles.section} id="about">
      <div className="container-fluid-px">
        <div className="row align-items-center">
          {/* Left: Text Content */}
          <motion.div 
            className={`col-12 col-lg-6 ${styles.contentWrapper}`}
            variants={staggerContainer(0.08, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            <motion.div variants={fadeUp}>
              <h2 className="mb-4">
                {renderHeading()}
              </h2>
            </motion.div>
            
            <motion.div variants={fadeUp} className={styles.text} dangerouslySetInnerHTML={{ __html: description }}></motion.div>
            
            <motion.div variants={fadeUp} className={styles.buttonGroup}>
              <Link href="/about" className={styles.primaryBtn}>
                KNOW MORE
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual / Image with GPU-accelerated entrance */}
          <div className={`col-12 col-lg-6 p-0 ${styles.imageCol}`}>
            <motion.div 
              className={styles.imageWrapper}
              variants={imageEntranceVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.12 }}
            >
              <div className={styles.imageInner}>
                <Image 
                  src={image} 
                  alt={alt} 
                  fill
                  sizes="(max-width: 992px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.image} 
                />

                {/* Cyber Green Light Sweep Sheen - lightweight GPU-only translation */}
                <motion.div
                  initial={{ x: '-150%', opacity: 0 }}
                  whileInView={{ x: '250%', opacity: 0.4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                  className={styles.sheen}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCompany
