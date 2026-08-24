'use client';
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/CallToAction.module.css'

const CallToAction = ({ ctaData }) => {
  const title = ctaData?.title || 'Ready to redefine your <br /> digital future?';
  const rawContent = ctaData?.content || 'Partner with WebTycoons to build scalable, secure, and human-centric digital experiences that propel your business forward.';
  // Strip HTML tags for clean plain text description
  const description = rawContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

  return (
    <section className={`section-py ${styles.section}`}>
      <div className={styles.bgGlow}></div>
      <div className="container-fluid-px position-relative z-1">
        <div className="row justify-content-center text-center">
          <motion.div 
            className="col-12 col-xl-8"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: title }}></h2>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.btnRow}>
              <Link href="/contact" className={styles.btnPrimary}>
                Let's Talk
              </Link>
              <Link href="/about" className={styles.btnSecondary}>
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction;
