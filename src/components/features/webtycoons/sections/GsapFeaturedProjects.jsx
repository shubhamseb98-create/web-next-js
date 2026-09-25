'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image';
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
    slug: 'elite-corporate-portal',
    link: '/projects/elite-corporate-portal',
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
    slug: 'luxury-retail-platform',
    link: '/projects/luxury-retail-platform',
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
    slug: 'saas-launchpad',
    link: '/projects/saas-launchpad',
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
    slug: 'fintech-dashboard',
    link: '/projects/fintech-dashboard',
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
  const stageRef = useRef(null)
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useGSAP(() => {
    const container = containerRef.current
    const stage = stageRef.current
    if (!container || !stage) return

    const mm = gsap.matchMedia(containerRef)

    // Desktop: Cursor follower
    let handleMouseMove = null
    if (cursorRef.current && window.matchMedia("(min-width: 992px) and (pointer: fine)").matches) {
      gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 })
      const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.2, ease: "power3" })
      const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.2, ease: "power3" })

      handleMouseMove = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
      }
      container.addEventListener("mousemove", handleMouseMove, { passive: true })
    }

    const cards = gsap.utils.toArray(`.${styles.projectCard}`)
    if (cards.length <= 1) return

    // Desktop: Pinned stack timeline
    mm.add("(min-width: 992px)", () => {
      gsap.set(cards[0], { y: 0, scale: 1, filter: "brightness(1)", autoAlpha: 1, zIndex: 1 })
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { y: "100vh", scale: 1, filter: "brightness(1)", autoAlpha: 0, zIndex: i + 1 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=85px",
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.9}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      })

      for (let i = 1; i < cards.length; i++) {
        tl.set(cards[i], { autoAlpha: 1 })
        tl.fromTo(cards[i],
          { y: "100vh" },
          { y: 0, duration: 1, ease: "none" }
        )

        tl.to(cards[i - 1], {
          scale: 0.95,
          y: -18,
          filter: "brightness(0.38)",
          transformOrigin: "top center",
          duration: 1,
          ease: "none",
        }, "<")

        for (let j = 0; j < i - 1; j++) {
          tl.to(cards[j], {
            scale: Math.max(0.85, 0.95 - (i - j) * 0.03),
            y: -18 * (i - j + 1),
            filter: `brightness(${Math.max(0.18, 0.38 - (i - j) * 0.08)})`,
            duration: 1,
            ease: "none",
          }, "<")
        }
      }
    })

    // Mobile & Tablet: Pinned stack timeline
    mm.add("(max-width: 991px)", () => {
      gsap.set(cards[0], { y: 0, scale: 1, filter: "brightness(1)", autoAlpha: 1, zIndex: 1 })
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], { y: "100vh", scale: 1, filter: "brightness(1)", autoAlpha: 0, zIndex: i + 1 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top+=75px",
          end: () => `+=${(cards.length - 1) * window.innerHeight * 0.85}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      })

      for (let i = 1; i < cards.length; i++) {
        tl.set(cards[i], { autoAlpha: 1 })
        tl.fromTo(cards[i],
          { y: "100vh" },
          { y: 0, duration: 1, ease: "none" }
        )

        tl.to(cards[i - 1], {
          scale: 0.94,
          y: -12,
          filter: "brightness(0.35)",
          transformOrigin: "top center",
          duration: 1,
          ease: "none",
        }, "<")

        for (let j = 0; j < i - 1; j++) {
          tl.to(cards[j], {
            scale: Math.max(0.86, 0.94 - (i - j) * 0.03),
            y: -12 * (i - j + 1),
            filter: `brightness(${Math.max(0.16, 0.35 - (i - j) * 0.08)})`,
            duration: 1,
            ease: "none",
          }, "<")
        }
      }
    })

    return () => {
      if (handleMouseMove) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
      mm.revert()
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

      {/* Pinned Stage Container */}
      <div className={styles.stackStage} ref={stageRef}>
        <div className={styles.cardsStack}>
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
              <div className={styles.projectCategoryBadge}>
                <span className={styles.categoryDot} />
                <span className={styles.projectSubtitle}>{project.category}</span>
              </div>

              <h3 className={styles.projectTitle}>{project.title}</h3>
              
              <p className={styles.projectDesc}>{project.desc}</p>
              
              <div className={styles.techStack}>
                {project.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className={styles.techItem}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.glassCta}>
                <span>View Case Study</span>
                <FaArrowRight className={styles.ctaArrow} />
              </div>
            </div>

            {/* Right Image Side */}
            <div className={styles.imageWrapper}>
              <div 
                className={styles.gradientBg} 
                style={{ 
                  background: project.gradient || 'linear-gradient(135deg, #00ff88 0%, #0088ff 100%)' 
                }}
              >
                <span 
                  className={styles.verticalTitle}
                  style={{ color: project.textColor || 'rgba(255, 255, 255, 0.75)' }}
                >
                  {project.clientName || project.title}
                </span>
                <div className={styles.innerImageWrapper}>
                  {/* Browser Mockup Header Bar */}
                  <div className={styles.browserHeaderBar}>
                    <div className={styles.browserDots}>
                      <span className={`${styles.dot} ${styles.dotRed}`} />
                      <span className={`${styles.dot} ${styles.dotYellow}`} />
                      <span className={`${styles.dot} ${styles.dotGreen}`} />
                    </div>
                    <div className={styles.browserUrlBar}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.lockIcon}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className={styles.urlText}>
                        {`thewebtycoons.com/projects/${project.slug || ''}`}
                      </span>
                    </div>
                  </div>
                  <div className={styles.projectImageContainer}>
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={800}
                      height={500}
                      sizes="(max-width: 992px) 100vw, 50vw"
                      className={styles.projectImage} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        </div>
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
