'use client';
import { motion } from 'framer-motion'
import { fadeUp } from '../../../../animations/variants'
import styles from './TechStack.module.css'
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFigma, SiGreensock, SiTypescript, SiSass,
  SiNodedotjs, SiPython, SiMongodb, SiDocker, SiPostgresql, SiGraphql, SiFirebase
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const iconMap = {
  'React': SiReact, 'Next.js': SiNextdotjs, 'Vue 3': SiVuedotjs, 'Tailwind CSS': SiTailwindcss,
  'Figma': SiFigma, 'GSAP': SiGreensock, 'TypeScript': SiTypescript, 'Sass': SiSass,
  'Node.js': SiNodedotjs, 'Python': SiPython, 'MongoDB': SiMongodb, 'Docker': SiDocker,
  'PostgreSQL': SiPostgresql, 'GraphQL': SiGraphql, 'Firebase': SiFirebase, 'AWS': FaAws
};

const TechStack = ({ techStack = [] }) => {
  if (!techStack || techStack.length === 0) return null;

  const frontendTech = techStack.filter(t => t.category?.toLowerCase() === 'frontend');
  const backendTech = techStack.filter(t => t.category?.toLowerCase() === 'backend');

  const getTechIconInfo = (tech) => {
    const isImage = !!(tech.image || (typeof tech.icon === 'string' && (tech.icon.startsWith('/') || tech.icon.startsWith('http') || tech.icon.startsWith('data:image'))));
    const imgSrc = tech.image || (typeof tech.icon === 'string' && (tech.icon.startsWith('/') || tech.icon.startsWith('http') || tech.icon.startsWith('data:image')) ? tech.icon : null);
    const IconComponent = !isImage ? (typeof tech.icon === 'function' ? tech.icon : (iconMap[tech.name] || (typeof tech.icon === 'string' ? iconMap[tech.icon] : null))) : null;
    return { isImage, imgSrc, IconComponent };
  };

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
          {SiReact && <SiReact />}
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={styles.bgLogoWrapper} 
          style={{ top: '25%', right: '-5%', fontSize: '250px' }}
        >
          {SiNodedotjs && <SiNodedotjs />}
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className={styles.bgLogoWrapper} 
          style={{ bottom: '-5%', left: '35%', fontSize: '150px' }}
        >
          {SiPython && <SiPython />}
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
            Modern <span className={styles.titleHighlight}>Tech Stack</span>
          </h2>
          <p className={styles.intro}>
            We build lightning-fast, highly scalable applications using industry-leading technologies and frameworks to ensure your product is future-proof.
          </p>
        </motion.div>

        {/* Infinite Scrolling Marquees */}
        <div className={styles.marqueeContainer}>
          
          {/* Top Track (Frontend) */}
          {frontendTech.length > 0 && (
          <div className={`${styles.marqueeTrack} ${styles.scrollLeft}`}>
            {/* Render twice for infinite loop effect */}
            {[...frontendTech, ...frontendTech].map((tech, index) => {
              const { isImage, imgSrc, IconComponent } = getTechIconInfo(tech);
              
              return (
                <div key={`front-${index}`} className={styles.techCard}>
                  <div className={styles.techIconWrapper}>
                    {isImage && imgSrc ? (
                      <img src={imgSrc} alt={tech.name} className={styles.techIconImage} />
                    ) : (
                      IconComponent ? <IconComponent className={styles.techIconSvg} style={{ color: tech.color || '#52a436' }} /> : (
                        <span className={styles.techIconFallback}>{tech.name?.charAt(0) || '⚡'}</span>
                      )
                    )}
                  </div>
                  <div className={styles.techText}>
                    <span className={styles.techTitle}>{tech.name}</span>
                    <span className={styles.techSub}>{tech.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
          )}

          {/* Bottom Track (Backend) */}
          {backendTech.length > 0 && (
          <div className={`${styles.marqueeTrack} ${styles.scrollRight}`}>
            {/* Render twice for infinite loop effect */}
            {[...backendTech, ...backendTech].map((tech, index) => {
              const { isImage, imgSrc, IconComponent } = getTechIconInfo(tech);
              
              return (
                <div key={`back-${index}`} className={styles.techCard}>
                  <div className={styles.techIconWrapper}>
                    {isImage && imgSrc ? (
                      <img src={imgSrc} alt={tech.name} className={styles.techIconImage} />
                    ) : (
                      IconComponent ? <IconComponent className={styles.techIconSvg} style={{ color: tech.color || '#52a436' }} /> : (
                        <span className={styles.techIconFallback}>{tech.name?.charAt(0) || '⚡'}</span>
                      )
                    )}
                  </div>
                  <div className={styles.techText}>
                    <span className={styles.techTitle}>{tech.name}</span>
                    <span className={styles.techSub}>{tech.sub}</span>
                  </div>
                </div>
              );
            })}
          </div>
          )}

        </div>

      </div>
    </section>
  )
}

export default TechStack
