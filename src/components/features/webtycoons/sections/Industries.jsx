'use client';
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/Industries.module.css'
import { FiBriefcase, FiActivity, FiShoppingCart, FiCpu, FiTool, FiZap } from 'react-icons/fi'

const industries = [
  { 
    name: 'Banking & Capital Markets', 
    icon: <FiBriefcase />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
    desc: 'Secure, scalable financial solutions tailored for modern banking and trading platforms.'
  },
  { 
    name: 'Healthcare & Life Sciences', 
    icon: <FiActivity />,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
    desc: 'Innovative health tech systems ensuring compliance, care, and data integration.'
  },
  { 
    name: 'Retail & Consumer Goods', 
    icon: <FiShoppingCart />,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    desc: 'Digital commerce platforms and supply chain solutions to drive retail growth.'
  },
  { 
    name: 'Technology & Software', 
    icon: <FiCpu />,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
    desc: 'Next-gen software architecture enabling fast iterations and robust deployments.'
  },
  { 
    name: 'Manufacturing & Automotive', 
    icon: <FiTool />,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
    desc: 'Smart manufacturing systems bridging the gap between hardware and software.'
  },
  { 
    name: 'Energy & Utilities', 
    icon: <FiZap />,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
    desc: 'Sustainable energy grids and analytics for a greener, more efficient tomorrow.'
  },
]

const Industries = () => {
  return (
    <section className={`section-py ${styles.section}`} id="industries">
      <div className="container-fluid-px">
        <motion.div 
          className="text-center mb-5"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <motion.div variants={fadeUp}>
            <span className="section-label">Industry Expertise</span>
            <h2 className="section-heading mb-4">
              Tailored Solutions for Every Sector
            </h2>
          </motion.div>
          
          <motion.p variants={fadeUp} className={`${styles.text} mx-auto`}>
            We understand that every industry faces unique challenges. Our specialized teams combine deep domain expertise with technological innovation to deliver solutions that drive sustainable value and competitive differentiation.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.grid}
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {industries.map((industry, idx) => (
            <motion.div key={idx} className={styles.card} variants={fadeUp}>
              <div className={styles.cardBg}>
                <img src={industry.image} alt={industry.name} />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.content}>
                <div className={styles.iconWrapper}>
                  {industry.icon}
                </div>
                <h3 className={styles.industryTitle}>{industry.name}</h3>
                <p className={styles.industryDesc}>{industry.desc}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.learnMore}>Learn More</span>
                  <div className={styles.iconArrow}>&rarr;</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <a href="#industries" className="btnSecondary">
            View All Industries
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Industries
