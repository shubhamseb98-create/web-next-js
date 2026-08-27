'use client';
import { motion } from 'framer-motion'
import { fadeUp, fadeLeft, staggerContainer, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/AboutCompany.module.css'
import Image from 'next/image';

const smoothImageVariant = {
  hidden: { opacity: 0, scale: 0.96, x: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const AboutCompany = ({ aboutData }) => {
  const title = aboutData?.title || '*Scale at Speed™* with WebTycoons';
  const description = aboutData?.description || 'Our promise to help enterprises across industries transform at speed and bring agility, resilience, and efficiency to their businesses.';
  const image = aboutData?.image || '/assets/img/about-us-it-company.png';
  const alt = aboutData?.alt || 'WebTycoons IT Company';

  const formatTitle = (text) => {
    if (!text) return '';
    // If they provided literal HTML, just use it (for backwards compatibility if any old HTML is in DB)
    if (text.includes('<span')) return text;
    
    // Convert [text] or *text* to span with titleHighlight, wrap everything else in titleSecondary
    // Split by asterisks or brackets
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
          <div className={`col-12 col-lg-6 p-0 ${styles.imageCol}`}>
            <motion.div 
              className={styles.imageWrapper}
              initial={{ opacity: 0, x: 80, clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 15% 100%)' }}
              whileInView={{ opacity: 1, x: 0, clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)' }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image with subtle ambient breath and hover zoom */}
              <motion.div 
                style={{ width: '100%', height: '100%', position: 'relative' }}
                initial={{ scale: 1.15, filter: 'brightness(0.9)' }}
                whileInView={{ scale: 1, filter: 'brightness(1)' }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image 
                  src={image} 
                  alt={alt} 
                  fill
                  sizes="(max-width: 992px) 100vw, 55vw"
                  style={{ objectFit: 'cover' }}
                  className={styles.image} 
                />

                {/* Cyber Green Light Sweep Sheen */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  whileInView={{ x: '250%', opacity: [0, 0.6, 0] }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '60%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(82, 164, 54, 0.3), rgba(255, 255, 255, 0.2), transparent)',
                    transform: 'skewX(-25deg)',
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCompany
