'use client';
import { motion } from 'framer-motion'
import { fadeUp } from '../animations/variants'
import styles from '../../../../css/webtycoons/TechnologiesSection.module.css'
import Image from 'next/image';
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFigma, SiGreensock, SiTypescript, SiSass,
  SiNodedotjs, SiPython, SiMongodb, SiDocker, SiPostgresql, SiGraphql, SiFirebase, SiJavascript
} from 'react-icons/si'
import { 
  FaAws, FaPaintBrush, FaLaptopCode, FaCogs, FaBullhorn, FaSearch, 
  FaShoppingCart, FaPalette, FaBookOpen, FaGlobe, FaServer, 
  FaEnvelopeOpenText, FaBuilding, FaWhatsapp, FaChartLine 
} from 'react-icons/fa'

const frontendTech = [
  { name: 'Website Designing', sub: 'UI/UX & Creative', icon: FaPaintBrush, color: '#38BDF8' },
  { name: 'Website Development', sub: 'Custom Web Apps', icon: FaLaptopCode, color: '#10B981' },
  { name: 'Software Development & CRM', sub: 'Enterprise & CRM', icon: FaCogs, color: '#8B5CF6' },
  { name: 'Digital Marketing', sub: 'Performance & Ads', icon: FaBullhorn, color: '#F59E0B' },
  { name: 'Search Engine Optimization (SEO)', sub: 'Rankings & Traffic', icon: FaSearch, color: '#EC4899' },
  { name: 'Ecommerce Solution', sub: 'Stores & Shopify', icon: FaShoppingCart, color: '#06B6D4' },
  { name: 'Logo Designing & Brand Identity', sub: 'Brand Kits & Logos', icon: FaPalette, color: '#F43F5E' },
  { name: 'Brochure Designing', sub: 'Print & Media', icon: FaBookOpen, color: '#A855F7' },
]

const backendTech = [
  { name: 'React', sub: 'TypeScript', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', sub: 'React Framework', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'TypeScript', sub: 'Language', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', sub: 'Styling', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Vue 3', sub: 'JavaScript', icon: SiVuedotjs, color: '#4FC08D' },
  { name: 'Figma', sub: 'Design Tool', icon: SiFigma, color: '#F24E1E' },
  { name: 'GSAP', sub: 'Animation', icon: SiGreensock, color: '#88CE02' },
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
  // Languages & Technologies
  'React': SiReact, 'Next.js': SiNextdotjs, 'Vue 3': SiVuedotjs, 'Tailwind CSS': SiTailwindcss,
  'Figma': SiFigma, 'GSAP': SiGreensock, 'TypeScript': SiTypescript, 'Sass': SiSass,
  'Node.js': SiNodedotjs, 'Python': SiPython, 'MongoDB': SiMongodb, 'Docker': SiDocker,
  'PostgreSQL': SiPostgresql, 'GraphQL': SiGraphql, 'Firebase': SiFirebase, 'AWS': FaAws,
  'Java script': SiJavascript, 'JavaScript': SiJavascript,

  // Services
  'Website Designing': FaPaintBrush,
  'Website Development': FaLaptopCode,
  'Software Development & CRM': FaCogs,
  'Digital Marketing': FaBullhorn,
  'Search Engine Optimization (SEO)': FaSearch,
  'SEO': FaSearch,
  'Ecommerce Solution': FaShoppingCart,
  'Logo Designing & Brand Identity': FaPalette,
  'Brochure Designing': FaBookOpen,
  'Domain Registration': FaGlobe,
  'Web Hosting Solutions': FaServer,
  'Enterprise Email Solutions': FaEnvelopeOpenText,
  'Company Profile Designing': FaBuilding,
  'WhatsApp Promotional Images': FaWhatsapp,

  // Direct icon names fallback
  'FaPaintBrush': FaPaintBrush,
  'FaLaptopCode': FaLaptopCode,
  'FaCogs': FaCogs,
  'FaBullhorn': FaBullhorn,
  'FaSearch': FaSearch,
  'FaShoppingCart': FaShoppingCart,
  'FaPalette': FaPalette,
  'FaBookOpen': FaBookOpen,
  'FaGlobe': FaGlobe,
  'FaServer': FaServer,
  'FaEnvelopeOpenText': FaEnvelopeOpenText,
  'FaBuilding': FaBuilding,
  'FaWhatsapp': FaWhatsapp,
  'FaChartLine': FaChartLine
};

const TechnologiesSection = ({ technologiesData, homeExtraData }) => {
  // 1. If the Tech Stack section is globally turned off, do not render
  if (homeExtraData?.show_technology === false) return null;

  // 2. If technologiesData was provided from server, strictly use it; do not fall back to hardcoded items if empty
  const activeTech = Array.isArray(technologiesData)
    ? technologiesData.filter(t => (t.status ? t.status === 'active' : true))
    : (technologiesData === null ? [] : [...frontendTech, ...backendTech]);

  // If there are no active technologies, hide the section entirely
  if (!activeTech || activeTech.length === 0) return null;

  const frontArr = activeTech.filter(t => t.category?.toLowerCase() === 'frontend');
  const backArr = activeTech.filter(t => t.category?.toLowerCase() === 'backend');

  if (frontArr.length === 0 && backArr.length === 0) return null;

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
          <div className="d-flex justify-content-center" style={{ marginBottom: '8px' }}>
            <span className="section-label" style={{ marginBottom: 0 }}>
              {homeExtraData?.technology_label || 'OUR TECH STACK'}
            </span>
          </div>
          <h2 className="section-heading text-center mb-3" style={{ color: 'var(--clr-white)', marginTop: 0 }}>
            {homeExtraData?.technology_title ? `${homeExtraData.technology_title} ${homeExtraData.technology_subtitle || ''}`.trim() : 'Modern Tech Stack'}
          </h2>
          <p className="section-description text-center" style={{ color: 'var(--clr-text-light)', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
            {homeExtraData?.technology_description || 'We build lightning-fast, highly scalable applications using industry-leading technologies and frameworks to ensure your product is future-proof.'}
          </p>
        </motion.div>

        {/* Infinite Scrolling Marquees */}
        <div className={styles.marqueeContainer}>
          
          {/* Top Track (Frontend) */}
          <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
            {/* Render twice for infinite loop effect */}
            {[...frontArr, ...frontArr].map((tech, index) => {
              const IconComp = iconMap[tech.name] || (typeof tech.icon === 'function' ? tech.icon : (iconMap[tech.icon] || null));
              return (
              <div key={`front-${index}`} className={styles.techCard}>
                {tech.image ? (
                  <img src={tech.image} alt={tech.name} className={styles.techIcon} style={{ width: 40, height: 40, objectFit: 'contain' }} />
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
              const IconComp = iconMap[tech.name] || (typeof tech.icon === 'function' ? tech.icon : (iconMap[tech.icon] || null));
              return (
              <div key={`back-${index}`} className={styles.techCard}>
                {tech.image ? (
                  <img src={tech.image} alt={tech.name} className={styles.techIcon} style={{ width: 40, height: 40, objectFit: 'contain' }} />
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
