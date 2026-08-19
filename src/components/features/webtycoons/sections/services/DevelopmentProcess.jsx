'use client';
import { motion } from 'framer-motion'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'

const DevelopmentProcess = ({ processSteps }) => {
  if (!processSteps || processSteps.length === 0) return null;

  return (
    <section className={`py-100 ${styles.processSection}`}>
      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="OUR PROCESS" 
          title="How We Build It" 
          center={true} 
        />
        
        <motion.div 
          className={styles.timeline}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {processSteps.map((step, idx) => (
            <motion.div key={idx} variants={fadeUp} className={styles.timelineItem}>
              <div className={styles.timelineNumber}>{step.step}</div>
              <div className={styles.timelineContent}>
                <h4 className={styles.timelineTitle}>{step.title}</h4>
                <p className={styles.timelineDesc}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default DevelopmentProcess
