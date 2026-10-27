'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGlobe, FaTimes, FaArrowRight, FaPlus, FaLayerGroup, FaFileAlt, FaCog } from 'react-icons/fa'
import styles from '../../../../css/webtycoons/WebflowShowcaseProjects.module.css'

// High-quality portfolio data matching real live projects
const placeholderProjects = [
  {
    id: 1,
    title: 'Thukral Electric Mobility Portal',
    clientName: 'Thukral Electric',
    category: 'EV Mobility',
    image: '/assets/img/portfolio/tt-test.png',
    slug: 'thukral-electric-bikes',
    link: '/projects/thukral-electric-bikes',
  },
  {
    id: 2,
    title: 'BLS World School Campus Platform',
    clientName: 'BLS World School',
    category: 'Campus Portal',
    image: '/images/clients/snapshots/blsworldschool.jpg',
    slug: 'bls-world-school',
    link: '/projects/bls-world-school',
  },
  {
    id: 3,
    title: 'Jindal Metals & Alloys Portal',
    clientName: 'Jindal Metal',
    category: 'Corporate Enterprise',
    image: '/images/clients/snapshots/iupjindal.jpg',
    slug: 'jindal-metal',
    link: '/projects/jindal-metal',
  },
  {
    id: 4,
    title: 'Abrigo Advanced Shield Systems',
    clientName: 'Abrigo Protection',
    category: 'Shield Systems',
    image: '/images/clients/snapshots/abrigo.jpg',
    slug: 'abrigo-protection',
    link: '/projects/abrigo-protection',
  },
  {
    id: 5,
    title: 'knyxsports Athleisure Store',
    clientName: 'knyxsports',
    category: 'E-Commerce Store',
    image: 'https://res.cloudinary.com/ungz4hok/image/upload/v1790672531/webtycoons/portfolio/1790672531536-screencapture-knyxsports-2026-09-29-14_25_08-%281%29.png',
    slug: 'knyxsports',
    link: '/projects/knyxsports',
  },
  {
    id: 6,
    title: 'Catalyst Clinical Research Portal',
    clientName: 'Catalyst Clinical',
    category: 'Healthcare Platform',
    image: '/images/clients/snapshots/catalyst.jpg',
    slug: 'catalyst-clinical-services',
    link: '/projects/catalyst-clinical-services',
  },
  {
    id: 7,
    title: 'Digital by Diksha Vohra',
    clientName: 'Diksha Vohra',
    category: 'Personal Brand & Agency',
    image: '/images/clients/snapshots/digital.jpg',
    slug: 'digital-diksha-vohra',
    link: '/projects/digital-diksha-vohra',
  },
  {
    id: 8,
    title: 'Chaircraft Ergonomic Workspaces',
    clientName: 'Chaircraft',
    category: 'E-Commerce Platform',
    image: '/images/clients/snapshots/chaircraft.jpg',
    slug: 'chaircraft',
    link: '/projects',
  },
  {
    id: 9,
    title: 'Austrolabs Health Science',
    clientName: 'Austrolabs',
    category: 'Healthcare Enterprise',
    image: '/images/clients/snapshots/austrolabs.jpg',
    slug: 'austrolabs',
    link: '/projects',
  },
]

// Ultra-smooth physics and fluid easing animation variants for modal open & close
const backdropVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.28,
      ease: [0.32, 0, 0.67, 0],
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const modalDialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.91,
    y: 30,
    filter: 'blur(8px)',
    transition: {
      duration: 0.24,
      ease: [0.32, 0, 0.67, 0],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 280,
      mass: 0.85,
    },
  },
}

const closeBtnVariants = {
  hidden: {
    opacity: 0,
    scale: 0.3,
    rotate: -90,
    transition: {
      duration: 0.18,
      ease: 'easeIn',
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 350,
      delay: 0.12,
    },
  },
}

const canvasWebsiteVariants = {
  hidden: {
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
      delay: 0.08,
    },
  },
}

const WebflowShowcaseProjects = ({ portfolioData, sectionData }) => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  // ── Drag & Momentum Track System ──
  const trackRef = useRef(null)
  const isPointerDownRef = useRef(false)
  const isDraggingRef = useRef(false)
  const hasMovedRef = useRef(false)
  const startXRef = useRef(0)
  const startYRef = useRef(0)
  const currentXRef = useRef(0)
  const targetXRef = useRef(0)
  const velocityRef = useRef(0)
  const lastPointerXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const isHoveredRef = useRef(false)
  const rafIdRef = useRef(null)
  const oneSetWidthRef = useRef(0)
  const initializedRef = useRef(false)
  const cardPointerDownRef = useRef({ x: 0, y: 0, time: 0 })

  // Close modal on Escape key press and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  // Filter for featured items if provided and marked
  const featuredOnly = portfolioData?.filter((p) => Boolean(p.isFeatured));
  const sourceProjects = (featuredOnly && featuredOnly.length > 0) ? featuredOnly : (portfolioData || []);

  // Use DB data with placeholderProjects fallback overrides
  const rawProjects = (sourceProjects && sourceProjects.length > 0)
    ? sourceProjects.map((p) => {
        const matched = placeholderProjects.find(
          (ph) => ph.slug === p.slug || (ph.title && p.title && (ph.title.toLowerCase().includes(p.title.toLowerCase()) || p.title.toLowerCase().includes(ph.title.toLowerCase())))
        );
        return {
          id: p._id || p.id,
          title: p.title || matched?.title,
          clientName: p.clientName || matched?.clientName || p.title,
          category: p.category || matched?.category || 'Website',
          image: p.image || matched?.image || '/assets/img/service/featured-projects.png',
          slug: p.slug,
          link: `/projects/${p.slug}`,
          isFeatured: Boolean(p.isFeatured),
        };
      })
    : placeholderProjects;

  // Ensure we have at least 8 items for a rich continuous ribbon by repeating user projects
  let baseProjects = rawProjects;
  if (baseProjects.length > 0 && baseProjects.length < 8) {
    while (baseProjects.length < 8) {
      baseProjects = [...baseProjects, ...rawProjects];
    }
  }

  // Quadruplicate for unbreakable 3D infinite continuous wrap buffer
  const streamProjects = [...baseProjects, ...baseProjects, ...baseProjects, ...baseProjects];
  const headline = sectionData?.hashtagTitle || '#MadeinWebTycoons';

  // ── High-Performance 60FPS Physics RAF Loop ──
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateMetrics = () => {
      if (!trackRef.current) return
      const totalWidth = trackRef.current.scrollWidth
      if (totalWidth > 0) {
        const setW = totalWidth / 4
        oneSetWidthRef.current = setW
        if (!initializedRef.current) {
          currentXRef.current = -setW * 1.5
          targetXRef.current = -setW * 1.5
          initializedRef.current = true
        }
      }
    }

    updateMetrics()
    const timer = setTimeout(updateMetrics, 120)
    window.addEventListener('resize', updateMetrics)

    let lastFrameTime = performance.now()

    const loop = (time) => {
      const dt = Math.min((time - lastFrameTime) / 1000, 0.1)
      lastFrameTime = time

      const setW = oneSetWidthRef.current

      if (setW > 0) {
        if (isDraggingRef.current) {
          // Direct tracking while dragging with responsive interpolation
          currentXRef.current += (targetXRef.current - currentXRef.current) * 0.45
        } else {
          // Apply throw momentum velocity decay
          if (Math.abs(velocityRef.current) > 0.15) {
            targetXRef.current += velocityRef.current * (dt * 60)
            velocityRef.current *= 0.94 // natural friction
          } else {
            velocityRef.current = 0
            // Auto-scroll when not hovered or actively dragging
            if (!isHoveredRef.current) {
              targetXRef.current -= 0.7 * (dt * 60) // gentle constant drift
            }
          }

          // Smooth lerp to target
          currentXRef.current += (targetXRef.current - currentXRef.current) * 0.14
        }

        // Infinite wrapping modulo across 4 sets
        if (currentXRef.current <= -2.5 * setW) {
          currentXRef.current += setW
          targetXRef.current += setW
        } else if (currentXRef.current >= -1.0 * setW) {
          currentXRef.current -= setW
          targetXRef.current -= setW
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${currentXRef.current.toFixed(2)}px) translateZ(0)`
        }
      } else {
        updateMetrics()
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateMetrics)
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
    }
  }, [baseProjects])

  // ── Drag & Scroll Pointer Handlers ──
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return

    isPointerDownRef.current = true
    isDraggingRef.current = false
    hasMovedRef.current = false
    startXRef.current = e.clientX
    startYRef.current = e.clientY
    lastPointerXRef.current = e.clientX
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    // Note: Do NOT setPointerCapture on pointerdown so child clicks/pointerups are preserved
  }

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return

    const dist = Math.hypot(e.clientX - startXRef.current, e.clientY - startYRef.current)

    // Activate drag and capture pointer ONLY after moving > 8px
    if (!isDraggingRef.current && dist > 8) {
      isDraggingRef.current = true
      hasMovedRef.current = true
      setIsDragging(true)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch (_) {}
    }

    if (isDraggingRef.current) {
      const now = performance.now()
      const dx = e.clientX - lastPointerXRef.current
      targetXRef.current += dx

      const dt = Math.max(now - lastTimeRef.current, 1)
      velocityRef.current = (dx / dt) * 16.66

      lastPointerXRef.current = e.clientX
      lastTimeRef.current = now
    }
  }

  const handlePointerUp = (e) => {
    isPointerDownRef.current = false

    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)

      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId)
        }
      } catch (_) {}

      const maxVelocity = 40
      if (velocityRef.current > maxVelocity) velocityRef.current = maxVelocity
      if (velocityRef.current < -maxVelocity) velocityRef.current = -maxVelocity
    }

    setTimeout(() => {
      hasMovedRef.current = false
    }, 50)
  }

  const handlePointerCancel = (e) => {
    isPointerDownRef.current = false
    isDraggingRef.current = false
    setIsDragging(false)
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
    } catch (_) {}
    setTimeout(() => {
      hasMovedRef.current = false
    }, 50)
  }

  const handleWheel = (e) => {
    // Horizontal wheel or trackpad swipe
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      targetXRef.current -= e.deltaX * 1.1
      velocityRef.current = -e.deltaX * 0.35
    }
  }

  // ── Card Click Handlers (Guaranteed Immediate Modal Trigger) ──
  const handleCardPointerDown = (e) => {
    cardPointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    }
  }

  const handleCardPointerUp = (e, project) => {
    const dx = Math.abs(e.clientX - cardPointerDownRef.current.x)
    const dy = Math.abs(e.clientY - cardPointerDownRef.current.y)
    const dist = Math.hypot(dx, dy)
    const dt = Date.now() - cardPointerDownRef.current.time

    // If movement < 10px and released within 600ms, it is a genuine click!
    if (dist < 10 && dt < 600 && !hasMovedRef.current) {
      setSelectedProject(project)
    }
  }

  const handleCardClick = (e, project) => {
    const dx = Math.abs(e.clientX - cardPointerDownRef.current.x)
    const dy = Math.abs(e.clientY - cardPointerDownRef.current.y)
    const dist = Math.hypot(dx, dy)

    if (dist < 10 && !hasMovedRef.current) {
      setSelectedProject(project)
    }
  }

  return (
    <section className={styles.showcaseSection} id="webflowShowcaseSection">
      
      {/* Header Area: Clean Bold #MadeinWebflow style */}
      <div className={styles.headerContainer}>
        <h2 className={styles.bigHeadline}>
          {headline}
        </h2>
      </div>

      {/* 3D Perspective Stage - Grabbable & Draggable */}
      <div
        className={`${styles.perspectiveStage} ${isDragging ? styles.isDragging : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onMouseEnter={() => { isHoveredRef.current = true }}
        onMouseLeave={() => { isHoveredRef.current = false }}
        onWheel={handleWheel}
      >
        <div className={styles.tiltTrackWrapper}>
          <div ref={trackRef} className={styles.streamTrack}>
            {streamProjects.map((project, index) => {
              return (
                <div
                  key={`${project.id || project.slug}-${index}`}
                  role="button"
                  tabIndex={0}
                  onPointerDown={handleCardPointerDown}
                  onPointerUp={(e) => handleCardPointerUp(e, project)}
                  onClick={(e) => handleCardClick(e, project)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedProject(project) }}
                  className={styles.showcaseCard}
                  title="Click to preview • Drag to scroll"
                  style={{ zIndex: streamProjects.length - (index % streamProjects.length) }}
                  draggable={false}
                >
                  {/* Clean Website Showcase Container */}
                  <div className={styles.imageContainer}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 300px, 460px"
                      className={styles.projectImage}
                      priority={index < 4}
                      draggable={false}
                    />
                  </div>

                  {/* Subtle Hover Info Overlay */}
                  <div className={styles.cardFooter}>
                    <span className={styles.cardCategory}>{project.category}</span>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating "Made in WebTycoons" Badge */}
      <Link href="/projects" className={styles.floatingBadge} title="Explore all projects">
        <FaGlobe className={styles.badgeIcon} />
        <span>Made in WebTycoons</span>
      </Link>

      {/* ── Webflow Studio Designer Lightbox Popup (Matching Reference Image) ── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="studio-modal-backdrop"
            className={styles.modalBackdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Dialog Content */}
            <motion.div
              className={styles.modalContentWrapper}
              variants={modalDialogVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ willChange: 'transform, opacity, filter' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Blue Circular Close Button (Top-Left, matching reference image) */}
              <motion.button
                type="button"
                className={styles.blueCloseBtn}
                onClick={() => setSelectedProject(null)}
                variants={closeBtnVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.14, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label="Close Preview"
                title="Close (Esc)"
              >
                <FaTimes />
              </motion.button>

              {/* Studio Editor Outer Frame */}
              <div className={styles.studioFrame}>
                
                {/* Top Studio Header Toolbar */}
                <div className={styles.studioTopBar}>
                  <div className={styles.topBarLeft}>
                    <div className={styles.studioLogoIcon}>W</div>
                    <div className={styles.studioNavTabs}>
                      <span className={`${styles.studioTab} ${styles.studioTabActive}`}>Design</span>
                      <span className={styles.studioTab}>CMS</span>
                      <span className={styles.studioTab}>Insights</span>
                      <span className={styles.studioTab}>Assets</span>
                    </div>
                  </div>

                  <div className={styles.topBarCenter}>
                    <div className={styles.pagePill}>
                      <span className={styles.pagePillDot} />
                      <span className={styles.pagePillText}>thewebtycoons.com/projects/{selectedProject.slug}</span>
                    </div>
                  </div>

                  <div className={styles.topBarRight}>
                    <div className={styles.avatarPills}>
                      <span className={styles.avatarDot} style={{ background: '#3b82f6' }}>JS</span>
                      <span className={styles.avatarDot} style={{ background: '#10b981' }}>WT</span>
                    </div>
                    <span className={styles.shareBadge}>Preview</span>
                    <span className={styles.publishBtn}>Verified</span>
                  </div>
                </div>

                {/* Studio Workspace Area */}
                <div className={styles.studioWorkspace}>
                  
                  {/* Left Micro Toolstrip */}
                  <div className={styles.leftToolstrip}>
                    <div className={styles.toolstripIcon} title="Add Elements"><FaPlus /></div>
                    <div className={`${styles.toolstripIcon} ${styles.toolstripActive}`} title="Navigator"><FaLayerGroup /></div>
                    <div className={styles.toolstripIcon} title="Pages"><FaFileAlt /></div>
                    <div className={styles.toolstripIcon} title="Settings"><FaCog /></div>
                  </div>

                  {/* Main Canvas Viewport */}
                  <div className={styles.centerCanvas}>
                    <motion.div
                      className={styles.canvasWebsiteContainer}
                      variants={canvasWebsiteVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className={styles.canvasWebsiteImg}
                      />
                    </motion.div>
                  </div>

                  {/* Right Studio Inspector Panel */}
                  <div className={styles.rightInspector}>
                    <div className={styles.inspectorHeader}>
                      <span className={styles.inspectorTitle}>Style Properties</span>
                      <span className={styles.inspectorSub}>Layout & Tokens</span>
                    </div>

                    <div className={styles.inspectorGroup}>
                      <div className={styles.inspectorLabel}>CLIENT</div>
                      <div className={styles.inspectorValue}>{selectedProject.clientName || selectedProject.title}</div>
                    </div>

                    <div className={styles.inspectorGroup}>
                      <div className={styles.inspectorLabel}>INDUSTRY / CATEGORY</div>
                      <div className={styles.inspectorValue}>{selectedProject.category}</div>
                    </div>

                    <div className={styles.inspectorGroup}>
                      <div className={styles.inspectorLabel}>RESOLUTION</div>
                      <div className={styles.inspectorValue}>Responsive 1920 × 1080</div>
                    </div>

                    <div className={styles.inspectorGroup}>
                      <div className={styles.inspectorLabel}>PERFORMANCE SCORE</div>
                      <div className={styles.inspectorValue} style={{ color: '#22c55e', fontWeight: 700 }}>99+ Ultra Fast</div>
                    </div>

                    <div className={styles.inspectorActionBox}>
                      <Link
                        href={selectedProject.link || `/projects/${selectedProject.slug}`}
                        className={styles.inspectorCtaBtn}
                      >
                        Full Case Study <FaArrowRight />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default WebflowShowcaseProjects
