'use client';
import { motion } from 'framer-motion'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'
import * as FaIcons from 'react-icons/fa'

const WhyChooseUsIconCards = ({ reasons }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <section className={styles.whyChooseUsSection}>
      {/* Background Ambient Glows & Tech Grid */}
      <div className={styles.whyAmbientGlow}></div>
      <div className={styles.whyBackgroundMesh}></div>

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
            const isImageUrl = typeof reason.icon === 'string' && (
              reason.icon.startsWith('/') || 
              reason.icon.startsWith('http') || 
              reason.icon.startsWith('data:image')
            );

            let IconComponent = null;
            if (!isImageUrl && typeof reason.icon === 'string') {
              IconComponent = FaIcons[reason.icon];
              if (!IconComponent) {
                const capitalized = 'Fa' + reason.icon.charAt(0).toUpperCase() + reason.icon.slice(1);
                IconComponent = FaIcons[capitalized];
              }
            } else if (typeof reason.icon === 'function') {
              IconComponent = reason.icon;
            }

            const stepNumber = String(idx + 1).padStart(2, '0');

            return (
              <motion.div key={idx} variants={fadeUp} className={styles.iconCard}>
                <div className={styles.cardHeaderBar}>
                  <div className={styles.iconCardIcon}>
                    {isImageUrl ? (
                      <img src={reason.icon} alt={reason.title} className="w-6 h-6 object-contain" />
                    ) : (
                      IconComponent ? <IconComponent /> : <FaIcons.FaAward />
                    )}
                  </div>
                  <span className={styles.cardStepNumber}>{stepNumber}</span>
                </div>

                <div className={styles.iconCardContent}>
                  <h4 className={styles.iconCardTitle}>{reason.title}</h4>
                  <p className={styles.iconCardDesc}>{reason.desc}</p>
                </div>

                <div className={styles.cardBottomGlowLine}></div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUsIconCards
