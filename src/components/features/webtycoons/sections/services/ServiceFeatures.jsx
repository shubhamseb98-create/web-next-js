'use client';
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'

import * as FaIcons from 'react-icons/fa'

const ServiceFeatures = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <section className={`py-100 ${styles.featuresSection}`}>
      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="KEY CAPABILITIES" 
          title="Premium Features" 
          center={true} 
        />
        
        <motion.div 
          className={styles.featuresGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature, idx) => {
            const isString = typeof feature === 'string';
            const title = isString ? feature : feature.title;
            const desc = isString ? '' : feature.desc;
            
            // Render dynamic icon if provided and exists in FaIcons, else fallback to FaCheckCircle
            const iconName = (!isString && feature.icon) ? feature.icon : null;
            let IconComponent = FaIcons.FaCheckCircle;
            
            if (iconName) {
              if (typeof iconName === 'string' && FaIcons[iconName]) {
                IconComponent = FaIcons[iconName];
              } else if (typeof iconName === 'function') {
                IconComponent = iconName;
              }
            }
            
            return (
              <motion.div key={idx} variants={fadeUp} className={styles.featureCard}>
                <div className={styles.featureIcon} style={feature.image ? { width: '40px', height: '40px' } : {}}>
                  {feature.image ? (
                    <img src={feature.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <IconComponent />
                  )}
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                {desc && <p className={styles.featureDesc}>{desc}</p>}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceFeatures
