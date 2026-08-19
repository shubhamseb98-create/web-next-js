'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import styles from '../../../../css/webtycoons/GsapFeaturedProjects.module.css'

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger)

// Featured projects placeholder data
const featuredProjects = [
  {
    id: 1,
    title: 'Elite Corporate Portal',
    category: 'Corporate Website',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting ',
    tech: ['React', 'Next.js', 'Tailwind CSS'],
    image: '/assets/img/service/featured-projects.png',
    link: '/projects',
    gradient: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
    textColor: 'rgba(15, 23, 42, 0.8)',
    themeColor: 'rgba(226, 232, 240, 0.6)'
  },
  {
    id: 2,
    title: 'Luxury Retail Platform',
    category: 'E-Commerce Website',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
    tech: ['Shopify Plus', 'React', 'GraphQL'],
    image: '/assets/img/service/featured-projects.png',
    link: '/projects',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    themeColor: 'rgba(168, 85, 247, 0.6)'
  },
  {
    id: 3,
    title: 'SaaS Launchpad',
    category: 'Landing Page',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
    tech: ['HTML/CSS', 'GSAP', 'Framer Motion'],
    image: '/assets/img/service/featured-projects.png',
    link: '/projects',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    themeColor: 'rgba(245, 158, 11, 0.6)'
  },
  {
    id: 4,
    title: 'FinTech Dashboard',
    category: 'Custom Web Application',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL'],
    image: '/assets/img/service/featured-projects.png',
    link: '/projects',
    gradient: 'linear-gradient(135deg, #00ff88 0%, #0088ff 100%)',
    textColor: 'rgba(255, 255, 255, 0.9)',
    themeColor: 'rgba(0, 255, 136, 0.6)'
  }
]

const GsapFeaturedProjects = ({ portfolioData, sectionData }) => {
  // Use DB data if available, otherwise fall back to static placeholder data
  const projects = (portfolioData && portfolioData.length > 0)
    ? portfolioData.map((p, i) => ({
        id: p._id,
        title: p.title,
        category: p.category || 'Website',
        desc: p.shortDesc || p.description?.replace(/<[^>]+>/g, '').slice(0, 200) || '',
        tech: p.technologies || [],
        image: p.image || '/assets/img/service/featured-projects.png',
        link: `/projects/${p.slug}`,
        gradient: p.themeColor || featuredProjects[i % featuredProjects.length]?.gradient || 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
        textColor: p.themeTextColor || featuredProjects[i % featuredProjects.length]?.textColor || 'rgba(15, 23, 42, 0.8)',
        themeColor: p.themeColor || featuredProjects[i % featuredProjects.length]?.themeColor || 'rgba(226, 232, 240, 0.6)',
      }))
    : featuredProjects;
  const containerRef = useRef(null)
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    // Custom Cursor tracking
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
    
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" })
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" })

    const handleMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    // ScrollTrigger pinning logic
    const cards = gsap.utils.toArray(`.${styles.projectCard}`)
    
    cards.forEach((card, index) => {
      // The last card doesn't need to scale down because nothing scrolls over it
      if (index === cards.length - 1) return 

      gsap.to(card, {
        scale: 0.92, // Shrink slightly
        opacity: 0.2, // Fade it back more so it's less distracting when covered
        ease: "none",
        scrollTrigger: {
          trigger: cards[index + 1], // Trigger based on the NEXT card
          start: "top top+=40vh", // Start when next card is halfway up the screen
          end: "top top+=12vh", // End when next card reaches its sticky point
          scrub: true, // Smooth scrub
        }
      })
    })

    return () => {
        window.removeEventListener("mousemove", handleMouseMove)
    }
  }, { scope: containerRef })

  return (
    <section 
      className={styles.featuredSection} 
      ref={containerRef}
      style={{ background: sectionData?.backgroundColor || 'transparent' }}
    >
      {/* Custom Follower Cursor */}
      <div ref={cursorRef} className={styles.cursorWrapper}>
        <div className={`${styles.customCursor} ${isHovering ? styles.active : ''}`}>
          View
        </div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          {sectionData?.title || 'Featured'} <span className={styles.titleHighlight}>{sectionData?.titleHighlight || 'Projects'}</span>
        </h2>
        <p className={styles.intro}>
          {sectionData?.intro || 'Explore a curated selection of our most recent and impactful work. Scroll down to experience our stacked GSAP presentation.'}
        </p>
      </div>

      {/* Vertical Sticky Stack Container */}
      <div className={styles.trackWrapper}>
        {projects.map((project, index) => (
          <Link 
            key={project.id} 
            href={project.link}
            className={styles.projectCard}
            style={{ zIndex: index + 1 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Left Content Side */}
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectSubtitle}>{project.category}</p>
              
              <p className={styles.projectDesc}>{project.desc}</p>
              
              <div className={styles.techStack}>
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className={styles.techItem}
                    style={{ '--tag-gradient': project.gradient }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image Side */}
            <div className={styles.imageWrapper}>
              <div 
                className={styles.gradientBg} 
                style={{ background: project.gradient || 'linear-gradient(135deg, #00ff88 0%, #0088ff 100%)' }}
              >
                <span 
                  className={styles.verticalTitle}
                  style={{ color: project.textColor || 'rgba(255, 255, 255, 0.75)' }}
                >
                  {project.title}
                </span>
                <div className={styles.innerImageWrapper}>
                  <img src={project.image} alt={project.title} className={styles.projectImage} loading="lazy" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Projects Button */}
      <div className={styles.viewMoreWrapper}>
        <Link href="/projects" className={styles.viewMoreBtn}>
          View All Projects <FaArrowRight />
        </Link>
      </div>

    </section>
  )
}

export default GsapFeaturedProjects
