'use client';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ServicePages.module.css'
import { fadeUp } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'

const ServicePortfolio = ({ projects, serviceTitle }) => {
  const [visibleCount, setVisibleCount] = useState(3)

  if (!projects || projects.length === 0) return null;

  return (
    <section id="portfolio" className={`py-100 ${styles.portfolioSection}`}>
      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="OUR PORTFOLIO"
          title={<>Everything You Need in a <span style={{ color: 'var(--clr-primary)' }}>Powerful</span> <br /> {serviceTitle || 'Dynamic Website'}</>} 
          center={true} 
        />

        <motion.div layout className={styles.portfolioGrid}>
          <AnimatePresence>
            {projects.slice(0, visibleCount).map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id || idx}
                className={styles.projectCard}
              >
                <div className={styles.projectImageWrapper}>
                  <div className={styles.liveBadge}>
                    <span className={styles.liveDot}></span> Live
                  </div>
                  <img src={project.image} alt={project.name} className={styles.projectImage} loading="lazy" />
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectName}>{project.name}</h3>
                  <a href={project.link || "#"} className={styles.visitBtn} target="_blank" rel="noopener noreferrer">
                    Visit &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {projects.length > 3 && (
          <div className="text-center mt-5 pt-4">
            <button 
              className="btnPrimary" 
              onClick={() => setVisibleCount(visibleCount === 3 ? projects.length : 3)}
            >
              {visibleCount === 3 ? 'Load More \u2192' : 'Show Less \u2190'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicePortfolio
