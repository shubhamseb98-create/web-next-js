'use client'
import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants'
import { FaArrowRight } from 'react-icons/fa'
import { FiBriefcase, FiGlobe, FiAward, FiHeadphones } from 'react-icons/fi'
import Image from 'next/image';
import SectionHeading from '../SectionHeading'
import styles from '../../../../css/webtycoons/StatsCounter.module.css'

  const stats = [
    { 
      value: 2400, suffix: '+', label: 'Clients\nServed', 
      image: '/assets/img/whychoose/choose1.webp' 
    },
    { 
      value: 2000, suffix: '+', label: 'Websites\nDelivered', 
      image: '/assets/img/whychoose/choose2.webp' 
    },
    { 
      value: 15, suffix: '+', label: 'Years of\nExcellence', 
      image: '/assets/img/whychoose/choose3.webp' 
    },
    { 
      value: 70, suffix: '+', label: 'Cities across\n10+ Countries', 
      image: '/assets/img/whychoose/choose4.webp' 
    },
  ]

  const STAT_DEFAULT_ICONS = [
    <FiBriefcase key="biz" />,
    <FiGlobe key="web" />,
    <FiAward key="award" />,
    <FiHeadphones key="support" />,
  ];

  const getStatIcon = (stat, index) => {
    const lbl = (stat.label || '').toLowerCase();
    if (lbl.includes('business') || lbl.includes('client') || lbl.includes('served')) return <FiBriefcase />;
    if (lbl.includes('website') || lbl.includes('project') || lbl.includes('delivered')) return <FiGlobe />;
    if (lbl.includes('year') || lbl.includes('excellence') || lbl.includes('experience')) return <FiAward />;
    if (lbl.includes('city') || lbl.includes('cities') || lbl.includes('country') || lbl.includes('countries') || lbl.includes('domain')) return <FiGlobe />;
    if (lbl.includes('support') || lbl.includes('maintenance') || lbl.includes('24/7') || lbl.includes('service')) return <FiHeadphones />;
    return STAT_DEFAULT_ICONS[index % STAT_DEFAULT_ICONS.length];
  };

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
            subtitle={homeExtraData?.achievement_subtitle || "Why Choose Us"}
            title={homeExtraData?.achievement_title || "Numbers That Matter"}
            description={homeExtraData?.achievement_description || "Before creating a website we think by putting ourselves in customer’s shoes. Over 15 years of excellence delivering 2,000+ websites, managing 2,800+ domains, and serving 2,400+ clients across 70+ cities and 10+ countries."}
          center={true}
        />
        
        <motion.div 
          className={styles.cardGrid}
          variants={staggerContainer(0.15)}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {displayStats.map((stat, index) => {
            const cleanLabel = (stat.label || '').replace(/\\+/g, '\n').trim();
            const labelLines = cleanLabel.includes('\n') 
              ? cleanLabel.split('\n') 
              : cleanLabel.split(' ');
            
            return (
              <motion.div key={index} className={styles.statCardWrapper} variants={staggerItem}>
                <div className={styles.statCard}>
                  <Image 
                    src={typeof stat.image === 'string' ? stat.image : (stat.image?.src || stat.image)} 
                    alt="Abstract Background" 
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className={styles.cardBg} 
                  />
                  <div className={styles.cardOverlay}></div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <div className={styles.iconBadge}>
                        {getStatIcon(stat, index)}
                      </div>
                      <div className={styles.cardLabel}>
                        {labelLines.map((line, i) => (
                          <span key={i}>{line}<br/></span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.cardBottom}>
                      <div className={styles.cardValue}>
                        {isInView ? <Counter value={stat.value} /> : '0'}
                        <span className={styles.suffix}>{stat.suffix}</span>
                      </div>
                      <div className={styles.cardArrowCircle}>
                        <FaArrowRight className={styles.cardArrow} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsCounter
