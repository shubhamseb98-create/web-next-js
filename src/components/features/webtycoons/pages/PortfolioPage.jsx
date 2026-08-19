import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaPlus, FaMinus, FaArrowRight, FaExternalLinkAlt, FaPaperPlane } from 'react-icons/fa'
import styles from './PortfolioPage.module.css'
import { fadeUp, staggerContainer } from '../animations/variants'

const projects = [
  {
    id: 1,
    title: 'Fortunexa',
    gradient: 'linear-gradient(90deg, #4196ff 0%, #d4e8ff 100%)',
    textColor: '#111',
    image: '/assets/img/project/snapweb.png', 
    industry: 'Crypto & Finance',
    tags: [
      { name: 'Dashboard', color: '#00a3ff' },
      { name: 'Crypto', color: '#00ff88' }
    ]
  },
  {
    id: 2,
    title: 'Buzz Writer',
    gradient: 'linear-gradient(90deg, #6a4cff 0%, #bca5ff 100%)',
    textColor: '#fff',
    image: '/assets/img/project/snapweb.png',
    industry: 'GenAI',
    tags: [
      { name: 'SEO', color: '#ffb800' },
      { name: 'AI', color: '#ff5c5c' },
      { name: 'Content Writing', color: '#00a3ff' }
    ]
  },
  {
    id: 3,
    title: 'BROOMEES',
    gradient: 'linear-gradient(90deg, #ffd600 0%, #fff4b3 100%)',
    textColor: '#111',
    image: '/assets/img/project/snapweb.png',
    industry: 'Domestic Service Tech',
    tags: [
      { name: 'Domestic Help', color: '#ffb800' },
      { name: 'Professionals', color: '#00a3ff' }
    ]
  },
  {
    id: 4,
    title: 'Lexcomply',
    gradient: 'linear-gradient(90deg, #333333 0%, #888888 100%)',
    textColor: '#fff',
    image: '/assets/img/project/snapweb.png',
    industry: 'RegTech',
    tags: [
      { name: 'Compliance Management', color: '#00ff88' }
    ]
  },
  {
    id: 5,
    title: 'Nema AI',
    gradient: 'linear-gradient(90deg, #80c8ff 0%, #e0f2ff 100%)',
    textColor: '#111',
    image: '/assets/img/project/snapweb.png',
    industry: 'NeuroTech',
    tags: [
      { name: 'AI', color: '#00a3ff' },
      { name: 'EEG', color: '#00a3ff' },
      { name: 'Learning', color: '#00a3ff' }
    ]
  }
]

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
]

const PortfolioPage = () => {
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    document.title = 'Projects | WebTycoons'
  }, [])

  return (
    <div className={styles.pageWrapper}>
      {/* ── Hero Section ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBg} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop)' }}></div>
        <div className={styles.heroOverlay}></div>
        <div className={`container-fluid-px ${styles.heroContent}`}>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className={styles.heroText}>
            <div className={styles.breadcrumb}>
              <Link to="/">Home</Link> / <span>Projects</span>
            </div>
            <h1 className={styles.heroTitle}>
              Code That Delivers <br />
              <span className={styles.textGreen}>– Real Results</span>
            </h1>
            <p className={styles.heroDesc}>Discover how we’ve crafted measurable success and digital excellence for leading brands.</p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Projects Section ── */}
      <section className={styles.projectsSection}>
        <div className="container-fluid-px">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSub}><span className={styles.dot}></span> Our Projects</span>
          </div>
          
          <motion.div 
            className={styles.projectGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={fadeUp} className={styles.projectCard}>
                <div className={styles.cardTop} style={{ background: project.gradient }}>
                  <div className={styles.cardSideTitle}>
                    <h3 className={styles.verticalTitle} style={{ color: project.textColor }}>{project.title}</h3>
                  </div>
                  <div className={styles.projectImageWrapper}>
                    <img src={project.image} alt={project.title} className={styles.projectImage} />
                    <div className={styles.projectOverlay}>
                      <button className={styles.viewBtn}>View</button>
                    </div>
                  </div>
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.detailCol}>
                    <span className={styles.detailLabel}>Project Name:</span>
                    <div className={styles.detailValueName}>
                      {project.title} <button className={styles.externalLinkBtn}><FaExternalLinkAlt /></button>
                    </div>
                  </div>
                  <div className={styles.detailCol}>
                    <span className={styles.detailLabel}>Industry</span>
                    <div className={styles.detailValue}>{project.industry}</div>
                  </div>
                  <div className={styles.detailColTags}>
                    <span className={styles.detailLabel}>Tags:</span>
                    <div className={styles.tagsWrapper}>
                      {project.tags.map((tag, i) => (
                        <span key={i} className={styles.tagBadge} style={{ borderColor: tag.color }}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                <h3 className={styles.formCardTitle}>Send Us a Message</h3>
                <p className={styles.formCardSubtitle}>Fill out the form below and we'll be in touch shortly.</p>
                
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
                <video 
                  src="/assets/img/portfolio/chips-vmake1.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className={styles.connectImg} 
                  style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default PortfolioPage
