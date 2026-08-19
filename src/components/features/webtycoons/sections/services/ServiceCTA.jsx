'use client';
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './ServicePages.module.css'
import { fadeUp } from '../../../../animations/variants'

const ServiceCTA = () => {
  return (
    <section className={styles.ctaSection}>
      <div className="container-fluid-px position-relative z-1">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto"
        >
          <motion.h2 variants={fadeUp} className={styles.ctaTitle}>
            Let's Build Your Next Website
          </motion.h2>
          
          <motion.p variants={fadeUp} className={styles.ctaDesc}>
            Ready to transform your digital presence? Partner with WebTycoons to build a premium, scalable, and high-performing website that drives real business results.
          </motion.p>
          
          <motion.div variants={fadeUp} className="d-flex flex-wrap justify-content-center gap-4">
            <Link href="/#contact" className="btnPrimary">
              Start Your Project
            </Link>
            <Link href="/#about" className="btnSecondary">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceCTA
