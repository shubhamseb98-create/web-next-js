'use client';
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'

const ServiceHero = ({ data, breadcrumbTitle }) => {
  return (
    <section className={styles.heroSection}>
      <div 
        className={styles.heroBgImage}
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>
      <div className={styles.heroOverlay}></div>
      
      <div className={`container-fluid-px position-relative z-1 ${styles.heroContentWrapper}`}>
        <motion.div 
          className="col-12 col-xl-9 col-xxl-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.nav aria-label="breadcrumb" variants={fadeUp} className="mb-4">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link href="/" className={styles.breadcrumbLink}>Home</Link></li>
              <li className="breadcrumb-item"><Link href="/#services" className={styles.breadcrumbLink}>Services</Link></li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: 'var(--clr-primary)' }}>{breadcrumbTitle}</li>
            </ol>
          </motion.nav>

          <motion.h1 className={styles.heroTitle} variants={fadeUp}>
            {data.title}
          </motion.h1>
          
          <motion.p className={styles.heroDescription} variants={fadeUp}>
            {data.description}
          </motion.p>
          
          <motion.div className="d-flex flex-wrap gap-4 mt-5" variants={fadeUp}>
            <Link href="#quote" className="btnPrimary">
              Get Free Quote
            </Link>
            <Link href="#portfolio" className="btnSecondary">
              View Portfolio
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceHero
