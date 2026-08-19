'use client';
import { motion } from 'framer-motion'
import { fadeUp, viewportOptions } from '../animations/variants'
import styles from '../../../../css/webtycoons/TrustedClients.module.css'

const TrustedClients = () => {
  // Placeholder logos for demo purposes
  const clients = [
    { name: 'Acme Corp', logo: 'ACME' },
    { name: 'Globex', logo: 'GLOBEX' },
    { name: 'Soylent', logo: 'SOYLENT' },
    { name: 'Initech', logo: 'INITECH' },
    { name: 'Umbrella', logo: 'UMBRELLA' },
    { name: 'Massive Dynamic', logo: 'MASSIVE' },
  ]

  return (
    <section className={`section-py-sm ${styles.section}`}>
      <div className="container-fluid-px">
        <motion.div 
          className="text-center mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeUp}
        >
          <span className="section-label">Trusted by Industry Leaders</span>
        </motion.div>

        <div className={styles.marquee}>
          <div className={styles.track}>
            {/* Double the list for seamless infinite scroll */}
            {[...clients, ...clients].map((client, index) => (
              <div key={index} className={styles.logoItem}>
                <span className={styles.logoText}>{client.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedClients
