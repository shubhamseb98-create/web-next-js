'use client';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaComments } from 'react-icons/fa'
import styles from './ServicePages.module.css'
import { fadeUp, staggerContainer } from '../../../../animations/variants'
import SectionHeading from '../../SectionHeading'

const ServiceFAQs = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0)

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className={styles.faqSection}>
      {/* Background Ambient Glows & Tech Grid */}
      <div className={styles.faqAmbientGlow}></div>
      <div className={styles.faqBackgroundMesh}></div>

      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="COMMON QUESTIONS" 
          title="Frequently Asked Questions" 
          description="Everything you need to know about our bespoke design process, code ownership, and warranties."
          center={true} 
        />
        
        <motion.div 
          className={styles.accordionContainer}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const qNumber = String(index + 1).padStart(2, '0');

            return (
              <motion.div 
                key={index} 
                variants={fadeUp} 
                className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ''}`}
              >
                <button
                  type="button"
                  className={styles.accordionHeader}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.accordionHeaderLeft}>
                    <span className={styles.faqQBadge}>{qNumber}</span>
                    <span className={styles.faqQuestionText}>{faq.question || faq.q}</span>
                  </div>

                  <div className={`${styles.accordionIconCircle} ${isOpen ? styles.accordionIconCircleOpen : ''}`}>
                    <FaChevronDown className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ''}`} />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className={styles.accordionBody}
                    >
                      <div className={styles.accordionContent}>
                        {faq.answer || faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Help Ribbon */}
        <motion.div 
          className={styles.faqHelpRibbon}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
        >
          <div className={styles.faqHelpLeft}>
            <div className={styles.faqHelpIcon}><FaComments /></div>
            <div>
              <div className={styles.faqHelpTitle}>Have more questions about your project?</div>
              <div className={styles.faqHelpSub}>Our senior architects are here to help you scope your website perfectly.</div>
            </div>
          </div>
          <a href="/contact" className={styles.faqHelpBtn}>
            Speak with an Expert
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default ServiceFAQs
