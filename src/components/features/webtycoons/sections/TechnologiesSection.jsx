'use client';
import { motion } from 'framer-motion'
import { fadeUp } from '../animations/variants'
import styles from '../../../../css/webtycoons/TechnologiesSection.module.css'
import Image from 'next/image';
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFigma, SiGreensock, SiTypescript, SiSass,
  SiNodedotjs, SiPython, SiMongodb, SiDocker, SiPostgresql, SiGraphql, SiFirebase
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const frontendTech = [
  { name: 'React', sub: 'TypeScript', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', sub: 'React Framework', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', sub: 'Language', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', sub: 'Styling', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Vue 3', sub: 'JavaScript', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Figma', sub: 'Design Tool', icon: SiFigma, color: '#F24E1E' },
  { name: 'GSAP', sub: 'Animation', icon: SiGreensock, color: '#88CE02' },
  { name: 'Sass', sub: 'CSS Preprocessor', icon: SiSass, color: '#CC6699' },
]

const backendTech = [
  { name: 'Node.js', sub: 'Runtime', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', sub: 'Backend', icon: SiPython, color: '#3776AB' },
  { name: 'AWS', sub: 'Cloud Infra', icon: FaAws, color: '#FF9900' },
  { name: 'MongoDB', sub: 'NoSQL Database', icon: SiMongodb, color: '#47A248' },
  { name: 'Docker', sub: 'Containerization', icon: SiDocker, color: '#2496ED' },
  { name: 'PostgreSQL', sub: 'Relational DB', icon: SiPostgresql, color: '#4169E1' },
  { name: 'GraphQL', sub: 'API Query', icon: SiGraphql, color: '#E10098' },
  { name: 'Firebase', sub: 'BaaS', icon: SiFirebase, color: '#FFCA28' },
]

const iconMap = {
  'React': SiReact, 'Next.js': SiNextdotjs, 'Vue 3': SiVuedotjs, 'Tailwind CSS': SiTailwindcss,
  'Figma': SiFigma, 'GSAP': SiGreensock, 'TypeScript': SiTypescript, 'Sass': SiSass,
  'Node.js': SiNodedotjs, 'Python': SiPython, 'MongoDB': SiMongodb, 'Docker': SiDocker,
  'PostgreSQL': SiPostgresql, 'GraphQL': SiGraphql, 'Firebase': SiFirebase, 'AWS': FaAws
};

const TechnologiesSection = ({ technologiesData, homeExtraData }) => {
  const isDynamic = technologiesData?.length > 0;
  const frontArr = isDynamic ? technologiesData.filter(t => t.category === 'frontend') : frontendTech;
  const backArr = isDynamic ? technologiesData.filter(t => t.category === 'backend') : backendTech;

  return (
    <section className={styles.sectionWrapper}>
      
      {/* Floating Background Logos */}
      <div className={styles.bgLogosContainer}>
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={styles.bgLogoWrapper} 
          style={{ top: '10%', left: '0%', fontSize: '200px' }}
        >
          <SiReact />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={styles.bgLogoWrapper} 
          style={{ top: '25%', right: '-5%', fontSize: '250px' }}
        >
          <SiNodedotjs />
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={styles.bgLogoWrapper} 
          style={{ bottom: '-5%', left: '35%', fontSize: '150px' }}
        >
          <SiPython />
        </motion.div>
      </div>

      <div className={`container-fluid-px ${styles.contentWrapper}`}>
        
        {/* Header */}
        <motion.div 
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className={styles.title}>
            {homeExtraData?.technology_title || 'Modern'} <span className={styles.titleHighlight}>{homeExtraData?.technology_subtitle || 'Tech Stack'}</span>
          </h2>
          <p className={styles.intro}>
            {homeExtraData?.technology_description || 'We build lightning-fast, highly scalable applications using industry-leading technologies and frameworks to ensure your product is future-proof.'}
          </p>
        </motion.div>

        {/* Infinite Scrolling Marquees */}
        <div className={styles.marqueeContainer}>
          
          {/* Top Track (Frontend) */}
          <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
            {/* Render twice for infinite loop effect */}
            {[...frontArr, ...frontArr].map((tech, index) => {
              const IconComp = isDynamic ? iconMap[tech.name] : tech.icon;
              return (
              <div key={`front-${index}`} className={styles.techCard}>
                {tech.image ? (
                  <Image src={tech.image} alt={tech.name} width={40} height={40} className={styles.techIcon} style={{ objectFit: 'contain' }} />
                ) : (
                  IconComp && <IconComp className={styles.techIcon} style={{ color: tech.color }} />
                )}
                <div className={styles.techText}>
                  <span className={styles.techTitle}>{tech.name}</span>
                  <span className={styles.techSub}>{tech.sub}</span>
                </div>
              </div>
              )
            })}
          </div>

          {/* Bottom Track (Backend) */}
          <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
            {/* Render twice for infinite loop effect */}
            {[...backArr, ...backArr].map((tech, index) => {
              const IconComp = isDynamic ? iconMap[tech.name] : tech.icon;
              return (
              <div key={`back-${index}`} className={styles.techCard}>
                {tech.image ? (
                  <Image src={tech.image} alt={tech.name} width={40} height={40} className={styles.techIcon} style={{ objectFit: 'contain' }} />
                ) : (
                  IconComp && <IconComp className={styles.techIcon} style={{ color: tech.color }} />
                )}
                <div className={styles.techText}>
                  <span className={styles.techTitle}>{tech.name}</span>
                  <span className={styles.techSub}>{tech.sub}</span>
                </div>
              </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}

export default TechnologiesSection
