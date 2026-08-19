'use client';
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown } from 'react-icons/fa'
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
    <section className={`py-100 ${styles.faqSection}`}>
      <div className="container-fluid-px">
        <SectionHeading 
          subtitle="COMMON QUESTIONS" 
          title="Frequently Asked Questions" 
          center={true} 
        />
        
        <motion.div 
          className={styles.accordionContainer}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {faqs.map((faq, index) => (
            <motion.div key={index} variants={fadeUp} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question || faq.q}
                <FaChevronDown 
                  className={`${styles.accordionIcon} ${openIndex === index ? styles.accordionIconOpen : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.accordionBody}
                  >
                    <div className={styles.accordionContent}>
                      {faq.answer || faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceFAQs
