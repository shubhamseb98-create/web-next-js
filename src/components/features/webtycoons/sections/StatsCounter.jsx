'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants'
import { FaArrowRight } from 'react-icons/fa'
import SectionHeading from '../SectionHeading'
import styles from '../../../../css/webtycoons/StatsCounter.module.css'

const stats = [
  { 
    value: 2500, suffix: '+', label: 'Businesses\nServed', 
    image: './assets/img/whychoose/choose1.webp' 
  },
  { 
    value: 2000, suffix: '+', label: 'Websites\nDelivered', 
    image: './assets/img/whychoose/choose2.webp' 
  },
  { 
    value: 10, suffix: '+', label: 'Years\nExcellence', 
    image: './assets/img/whychoose/choose3.webp' 
  },
  { 
    value: 24, suffix: '/7', label: 'Support &\nMaintenance', 
    image: './assets/img/whychoose/choose4.webp' 
  },
]

// Custom framer-motion based counter to avoid dependency issues
const Counter = ({ value }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (value >= 1000) {
      let num = Math.round(latest);
      if (num === 0) return '0';
      return (num / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return Math.round(latest).toString()
  })

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: 'easeOut' })
    return controls.stop
  }, [value, count])

  return <motion.span>{rounded}</motion.span>
}

const StatsCounter = ({ achievementsData, homeExtraData }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  const displayStats = achievementsData?.length > 0 ? achievementsData : stats;

  return (
    <section className={`section-py-sm ${styles.section}`} ref={ref}>
      <div className="container-fluid-px position-relative z-1">
        <SectionHeading 
          subtitle={homeExtraData?.achievement_subtitle || "Our Achievements"}
          title={homeExtraData?.achievement_title || "Numbers That Matter"}
          description={homeExtraData?.achievement_description || "We've spent years perfecting our craft, delivering exceptional digital experiences that drive real business growth."}
          center={true}
        />
        
        <motion.div 
          className={styles.cardGrid}
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displayStats.map((stat, index) => (
            <motion.div key={index} className={styles.statCardWrapper} variants={staggerItem}>
              <div className={styles.statCard}>
                <img src={typeof stat.image === 'string' ? stat.image : (stat.image?.src || stat.image)} alt="Abstract Background" className={styles.cardBg} />
                <div className={styles.cardOverlay}></div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardLabel}>
                    {stat.label.split('\n').map((line, i) => (
                      <span key={i}>{line}<br/></span>
                    ))}
                  </div>
                  
                  <div className={styles.cardBottom}>
                    <div className={styles.cardValue}>
                      {isInView ? <Counter value={stat.value} /> : '0'}
                      <span className={styles.suffix}>{stat.suffix}</span>
                    </div>
                    <FaArrowRight className={styles.cardArrow} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsCounter
