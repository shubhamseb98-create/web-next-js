'use client';
import { motion } from 'framer-motion'
import { FaCode, FaServer, FaRobot, FaMobileAlt, FaDatabase, FaPaintBrush } from 'react-icons/fa'
import styles from '../../../../css/webtycoons/TechnicalExpertise.module.css'
import { fadeUp, staggerContainer } from '../animations/variants'
import Image from 'next/image';

const expertiseData = [
  {
    id: '01',
    title: 'Advanced Web Engineering',
    desc: 'Building highly scalable, performant architectures using React, Next.js, and headless CMS solutions designed for heavy traffic.',
    icon: FaCode
  },
  {
    id: '02',
    title: 'AI & Automation',
    desc: 'Integrating Large Language Models (LLMs) and custom AI agents to automate workflows and create intelligent user experiences.',
    icon: FaRobot
  },
  {
    id: '03',
    title: 'Cloud Infrastructure',
    desc: 'Deploying secure, serverless backend environments and databases optimized for speed and global scalability.',
    icon: FaServer
  },
  {
    id: '04',
    title: 'Mobile-First Ecosystems',
    desc: 'Developing responsive platforms and progressive web apps that deliver native-like experiences across all devices.',
    icon: FaMobileAlt
  },
  {
    id: '05',
    title: 'Data Architecture',
    desc: 'Designing robust SQL and NoSQL database schemas to handle complex relational data safely and efficiently.',
    icon: FaDatabase
  },
  {
    id: '06',
    title: 'Premium UX/UI Design',
    desc: 'Crafting visually stunning, conversion-optimized interfaces that perfectly balance aesthetics with usability.',
    icon: FaPaintBrush
  }
]

const iconMap = { '01': FaCode, '02': FaRobot, '03': FaServer, '04': FaMobileAlt, '05': FaDatabase, '06': FaPaintBrush };

const TechnicalExpertise = ({ capabilitiesData, homeExtraData }) => {
  const displayData = capabilitiesData?.length > 0 ? capabilitiesData : expertiseData;

  return (
    <section className={styles.sectionWrapper}>
      <div className="container-fluid-px">
        
        {/* Header */}
        <motion.div 
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="d-flex justify-content-center" style={{ marginBottom: '8px' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>
              {homeExtraData?.capability_label || 'OUR CAPABILITIES'}
            </span>
          </div>
          <h2 className="section-heading text-center mb-3" style={{ color: 'var(--clr-white)', marginTop: 0 }}>
            {homeExtraData?.capability_title ? `${homeExtraData.capability_title} ${homeExtraData.capability_subtitle || ''}`.trim() : 'Core Capabilities'}
          </h2>
          <p className="section-description text-center" style={{ color: 'var(--clr-text-light)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            {homeExtraData?.capability_description || 'We combine strategic thinking with deep technical expertise to solve complex business challenges. Our capabilities span the entire modern digital stack.'}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div 
          className={styles.expertiseGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {displayData.map((item, index) => {
            const IconComp = item.icon || iconMap[item.idNumber] || iconMap[item.id];
            return (
              <motion.div key={item._id || item.id || index} variants={fadeUp} className={styles.expertCard}>
                <div className={styles.cardNumber}>{item.idNumber || item.id}</div>
                {item.image ? (
                  <Image src={item.image} alt={item.title} width={40} height={40} className={styles.cardIcon} style={{ objectFit: 'contain' }} />
                ) : (
                  IconComp && <IconComp className={styles.cardIcon} />
                )}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}

export default TechnicalExpertise
