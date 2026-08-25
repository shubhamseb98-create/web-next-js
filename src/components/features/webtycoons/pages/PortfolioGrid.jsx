'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../../../../css/webtycoons/PortfolioPage.module.css'
import { FaArrowRight, FaExternalLinkAlt, FaPlus, FaMinus, FaPaperPlane } from 'react-icons/fa'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

function isVideoUrl(url) {
  if (!url) return true; // default is video (the .mp4)
  return /\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(url);
}

const PLACEHOLDER_PROJECTS = [
  { _id: '1', title: 'Elite Corporate Portal', category: 'Dynamic Website', shortDesc: 'A powerful, enterprise-grade corporate website with custom CMS.', image: '/assets/img/service/featured-projects.png', slug: '#', technologies: ['Next.js', 'MongoDB', 'Tailwind CSS'] },
  { _id: '2', title: 'Luxury Retail Platform', category: 'E-Commerce', shortDesc: 'Full-featured e-commerce store with advanced product filtering.', image: '/assets/img/service/featured-projects.png', slug: '#', technologies: ['Shopify', 'React', 'GraphQL'] },
  { _id: '3', title: 'SaaS Dashboard', category: 'Dynamic Website', shortDesc: 'Analytics and reporting dashboard for a SaaS product.', image: '/assets/img/service/featured-projects.png', slug: '#', technologies: ['React', 'Node.js', 'Recharts'] },
]

const projectStyles = [
  { gradient: 'linear-gradient(90deg, #4196ff 0%, #d4e8ff 100%)', textColor: '#111' },
  { gradient: 'linear-gradient(90deg, #6a4cff 0%, #bca5ff 100%)', textColor: '#fff' },
  { gradient: 'linear-gradient(90deg, #ffd600 0%, #fff4b3 100%)', textColor: '#111' },
  { gradient: 'linear-gradient(90deg, #333333 0%, #888888 100%)', textColor: '#fff' },
  { gradient: 'linear-gradient(90deg, #80c8ff 0%, #e0f2ff 100%)', textColor: '#111' }
];

const tagColors = ['#00a3ff', '#00ff88', '#ffb800', '#ff5c5c'];

const faqs = [
  {
    question: "What development services do you specialize in?",
    answer: "We specialize in developing robust static, dynamic, and complex e-commerce websites. We leverage cutting-edge frameworks like React, Next.js, and Node to deliver high-performance solutions."
  },
  {
    question: "How do you roll out digital solutions for businesses?",
    answer: "Our process includes Discovery (auditing your needs), Prototyping (building MVP), Optimization (fine-tuning UX/UI), and Deployment (launching with comprehensive monitoring)."
  },
  {
    question: "Can you tailor web solutions to fit our specific needs?",
    answer: "Absolutely. We build fully custom, highly scalable platforms tailored strictly to your industry requirements, from healthcare portals to luxury e-commerce."
  },
  {
    question: "What kind of post-deployment support do you provide?",
    answer: "We provide extensive maintenance packs including performance monitoring, security patching, feature scaling, and dedicated engineering support."
  }
];

export default function PortfolioGrid({ items = [], categories = ['All'], contactConfig = null }) {
  const [active, setActive] = useState('All')
  const [openFaq, setOpenFaq] = useState(0)
  const projects = items.length > 0 ? items : PLACEHOLDER_PROJECTS

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <main className={styles.pageWrapper}>
      {/* Page Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)' }}></div>
        <div className={styles.heroOverlay}></div>
        <div className={`container-fluid-px ${styles.heroContent}`}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className={styles.heroText}>
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <span>Projects</span>
            </div>
            <h1 className={styles.heroTitle}>
              Code That Delivers <br />
              <span className={styles.textGreen}>– Real Results</span>
            </h1>
            <p className={styles.heroDesc}>Discover how we’ve crafted measurable success and digital excellence for leading brands.</p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.projectsSection}>
        <div className="container-fluid-px">
          <div className={styles.sectionHeader} style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', marginBottom: '40px' }}>
            <span className={styles.sectionSub}><span className={styles.dot}></span> Our Projects</span>
            
            {/* Interactive Category Filter Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {categories.map((cat) => {
                const isCatActive = active === cat;
                const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActive(cat)}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '100px',
                      fontSize: '13px',
                      fontWeight: isCatActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      backgroundColor: isCatActive ? '#52a436' : 'rgba(255, 255, 255, 0.04)',
                      border: isCatActive ? '1px solid #52a436' : '1px solid rgba(255, 255, 255, 0.1)',
                      color: isCatActive ? '#ffffff' : '#94a3b8',
                      boxShadow: isCatActive ? '0 4px 15px rgba(82, 164, 54, 0.4)' : 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>{cat}</span>
                    <span 
                      style={{
                        fontSize: '10px',
                        padding: '2px 6px',
                        borderRadius: '100px',
                        backgroundColor: isCatActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                        color: isCatActive ? '#ffffff' : '#64748b'
                      }}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.projectGrid}>
            <AnimatePresence mode="wait">
              {filtered.map((project, idx) => {
                const pStyle = projectStyles[idx % projectStyles.length];
                return (
                  <motion.div
                    key={project._id || idx}
                    className={styles.projectCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.06 }}
                  >
                    <div className={styles.cardTop} style={{ background: project.themeColor || pStyle.gradient }}>
                      <div className={styles.cardSideTitle}>
                        <h3 className={styles.verticalTitle} style={{ color: project.themeTextColor || pStyle.textColor }}>{project.title}</h3>
                      </div>
                      <div className={styles.projectImageWrapper}>
                        <div className={styles.projectImageInner}>
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
                                {project.projectUrl ? project.projectUrl.replace(/^https?:\/\//, '') : `thewebtycoons.com/projects/${project.slug && project.slug !== '#' ? project.slug : ''}`}
                              </span>
                            </div>
                          </div>
                          <div className={styles.imageBox}>
                            <img src={project.image || '/assets/img/service/featured-projects.png'} alt={project.title} className={styles.projectImage} loading="lazy" />
                            <div className={styles.projectOverlay}>
                              <Link href={project.slug && project.slug !== '#' ? `/projects/${project.slug}` : '#'} className={styles.viewBtn}>View</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.cardBottom}>
                      <div className={styles.detailCol}>
                        <span className={styles.detailLabel}>Project Name:</span>
                        <div className={styles.detailValueName}>
                          <Link href={project.slug && project.slug !== '#' ? `/projects/${project.slug}` : '#'} style={{ color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s' }}>
                            {project.title}
                          </Link> 
                          {project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className={styles.externalLinkBtn}>
                              <FaExternalLinkAlt />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className={styles.detailCol}>
                        <span className={styles.detailLabel}>Industry:</span>
                        <span className={styles.detailValue}>{project.category}</span>
                      </div>
                      <div className={styles.detailColTags}>
                        {project.technologies?.length > 0 && (
                          <div className={styles.tagsWrapper}>
                            {project.technologies.slice(0,3).map((tech, tIdx) => (
                              <span key={tech} className={styles.tagBadge} style={{ borderColor: tagColors[tIdx % tagColors.length], color: tagColors[tIdx % tagColors.length] }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-5">
              <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className={styles.faqSection}>
        <div className="container-fluid-px">
          <div className={styles.faqHeader}>
            <span className={styles.sectionSub}><span className={styles.dot}></span> SOLUTIONS FAQ</span>
            <h2 className={styles.faqTitle}>Technical Expertise, <br/><span className={styles.textGreen}>FAQs</span></h2>
            <p className={styles.faqDesc}>Discover how our development process works and the tangible business benefits we provide through innovative web solutions.</p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(index === openFaq ? -1 : index)}
              >
                <div className={styles.faqQuestion}>
                  <div className={styles.faqQText}>
                    <span className={styles.faqNum}>{(index + 1).toString().padStart(2, '0')}.</span>
                    {faq.question}
                  </div>
                  <div className={styles.faqIcon}>
                    {openFaq === index ? <FaMinus /> : <FaPlus />}
                  </div>
                </div>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div 
                      className={styles.faqAnswer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Let's Connect Section ── */}
      <section className={styles.connectSection}>
        <div className="container-fluid-px">
          <div className={styles.connectWrapper}>
            <div className={styles.connectLeft}>
              <div className={styles.formCard}>
                <h3 className={styles.formCardTitle}>{contactConfig?.connectFormTitle || "Send Us a Message"}</h3>
                <p className={styles.formCardSubtitle}>{contactConfig?.connectFormSubtitle || "Fill out the form below and we'll be in touch shortly."}</p>
                
                <form className={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>FULL NAME *</label>
                      <input type="text" placeholder="John Doe" className={styles.inputCardField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>EMAIL ADDRESS *</label>
                      <input type="email" placeholder="john@example.com" className={styles.inputCardField} />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>PHONE NUMBER</label>
                      <input type="tel" placeholder="+91 8527458950" className={styles.inputCardField} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>SERVICE INTERESTED IN *</label>
                      <select className={styles.selectCardField}>
                        <option>Select a service...</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>ESTIMATED BUDGET</label>
                    <select className={styles.selectCardField}>
                      <option>Select a budget range...</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>TELL US ABOUT YOUR PROJECT *</label>
                    <textarea placeholder="Describe your project goals, timeline, and any specific requirements..." className={styles.textCardArea} rows="4"></textarea>
                  </div>
                  
                  <button type="submit" className={styles.submitBtnFull}>
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.connectRight}>
              <div className={styles.connectImageWrapper}>
                {(() => {
                  const mediaUrl = contactConfig?.connectVideoUrl || "/assets/img/portfolio/chips-vmake1.mp4";
                  if (isVideoUrl(mediaUrl)) {
                    return (
                      <video 
                        key={mediaUrl}
                        src={mediaUrl} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className={styles.connectImg} 
                        style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} 
                      />
                    );
                  } else {
                    return (
                      <img 
                        key={mediaUrl}
                        src={mediaUrl} 
                        alt="Contact section visual"
                        className={styles.connectImg} 
                        style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} 
                      />
                    );
                  }
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}