'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

const SectionHeading = ({ subtitle, title, description, center = false, className = "mb-5" }) => {
  return (
    <motion.div 
      className={`${className} ${center ? 'text-center mx-auto' : ''}`}
      style={{ maxWidth: center ? '800px' : '100%' }}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {subtitle && <span className="section-label d-inline-flex mb-2">{subtitle}</span>}
      <h2 className="section-heading mb-3">{title}</h2>
      {description && (
        <p className="section-description" style={{ color: 'var(--clr-text-light)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeading