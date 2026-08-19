'use client';
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/FeaturedProjects.module.css'
import { FiArrowRight } from 'react-icons/fi'

const projects = [
  {
    id: 1,
    title: 'Elite Corporate Portal',
    category: 'Corporate Website',
    description: 'A high-end corporate presence built for a Fortune 500 company, featuring complex user flows and integrated CRM.',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
    image: '/assets/img/service/featured-projects.png',
    gradient: 'linear-gradient(135deg, #00c6fb 0%, #4facfe 100%)'
  },
  {
    id: 2,
    title: 'Buzzwriter AI',
    category: 'GenAI',
    description: 'BuzzWriter is all about delivering top-quality AI SEO solutions that really ramp up your traffic and boost your online presence. With handy tools like the Article Writer and Traffic Analyzer, we empower businesses to achieve fantastic results in digital marketing. We ensure that your content ranks higher, connects with the right audience, and drives real growth.',
    tags: ['SEO', 'AI', 'Content Writing'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #6366f1 100%)'
  },
  {
    id: 3,
    title: 'SaaS Launchpad',
    category: 'Landing Page',
    description: 'A conversion-optimized, highly animated landing page that secured a successful multi-million dollar product launch.',
    tags: ['HTML/CSS', 'GSAP', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=1200',
    gradient: 'linear-gradient(135deg, #00c6fb 0%, #4facfe 100%)'
  }
]

const ProjectCard = ({ project }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Custom cursor blob */}
      <motion.div
        className={styles.customCursor}
        animate={{
          x: mousePos.x - 50,
          y: mousePos.y - 50,
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      >
        View
      </motion.div>

      {/* Left content pane */}
      <div className={styles.cardLeft}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.category}>{project.category}</p>
        <p className={styles.description}>{project.description}</p>

        <div className={styles.tags}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <button className={styles.button}>
          View Project <FiArrowRight className={styles.buttonIcon} />
        </button>
      </div>

      {/* Right gradient + image pane */}
      <div className={styles.cardRight}>
        <div
          className={styles.gradientWrapper}
          style={{ background: project.gradient }}
        >
          <span className={styles.verticalTitle}>{project.title}</span>
          <div className={styles.imageWrapper}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const FeaturedProjects = () => {
  const containerRef = useRef(null)

  return (
    <section
      className={`section-py-lg ${styles.section}`}
      id="featured-projects"
      ref={containerRef}
    >
      <div className={`container-fluid-px ${styles.maxWidthContainer}`}>
        <motion.div
          className={styles.headerRow}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <h2 className={styles.mainHeading}>Featured Projects</h2>
          <p className={styles.headerText}>
            Explore some of our most impactful work — where innovative design meets powerful technology to drive real business results.
          </p>
        </motion.div>

        <div className={styles.projectsContainer}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
