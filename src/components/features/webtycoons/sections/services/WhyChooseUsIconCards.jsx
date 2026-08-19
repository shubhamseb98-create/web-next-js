'use client';
import { motion } from 'framer-motion'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'

import * as FaIcons from 'react-icons/fa'

const WhyChooseUsIconCards = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className={`py-100 ${styles.whyChooseUsSection}`}>
      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="WHY WEBTYCOONS" 
          title="The WebTycoons Advantage" 
          center={true} 
        />
        
        <motion.div 
          className={styles.iconCardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {reasons.map((reason, idx) => {
            const isImageUrl = typeof reason.icon === 'string' && (reason.icon.startsWith('/') || reason.icon.startsWith('http') || reason.icon.startsWith('data:image'));
            const IconComponent = !isImageUrl && typeof reason.icon === 'string' ? FaIcons[reason.icon] : reason.icon;
            
            return (
              <motion.div key={idx} variants={fadeUp} className={styles.iconCard}>
                <div className={styles.iconCardIcon}>
                  {isImageUrl ? (
                    <img src={reason.icon} alt={reason.title} className="w-10 h-10 object-contain" />
                  ) : (
                    IconComponent && <IconComponent />
                  )}
                </div>
                <div className={styles.iconCardContent}>
                  <h4>{reason.title}</h4>
                  <p>{reason.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsIconCards
