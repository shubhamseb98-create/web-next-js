  'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaWhatsapp, FaLinkedinIn, FaInstagram, FaTwitter,
  FaFacebookF, FaYoutube, FaGlobe, FaCheckCircle, FaPaperPlane
} from 'react-icons/fa'
import styles from '../../../../css/webtycoons/ContactPage.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    title: 'Our Office',
    lines: ['123, Digital Hub, Sector 18', 'Noida, Uttar Pradesh — 201301']
  },
  {
    icon: FaPhone,
    title: 'Call Us',
    lines: ['+91 8527458950']
  },
  {
    icon: FaEnvelope,
    title: 'Email Us',
    lines: ['info@thewebtycoons.com']
  },
  {
    icon: FaClock,
    title: 'Working Hours',
    lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sun: Closed']
  },
]

const services = [
  'Static Website', 'Dynamic Website', 'E-Commerce Store',
  'Mobile App', 'SEO & Marketing', 'UI/UX Design',
  'Cloud Solutions', 'Maintenance & Support'
]

export default function ContactPageClient({ initialData = {}, globalSettings = {} }) {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.message || 'Submission failed')
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatTitle = (title) => {
    if (!title) return `Let's Build Something <span class="${styles.accent}">Amazing</span><br />Together`;
    return title
      .replace(/\*(.*?)\*/g, `<span class="${styles.accent}">$1</span>`)
      .replace(/\n/g, '<br />');
  };

  return (
    <main className={styles.contactPage}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={initialData?.headerImage ? { backgroundImage: `url(${initialData.headerImage})` } : undefined} />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <span>{initialData?.breadcrumb || "Contact Us"}</span>
            </div>
            <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: formatTitle(initialData?.headerTitle) }} />
            <p className={styles.heroDesc}>
              {initialData?.headerDescription || initialData?.contactDescription || "Have a project in mind? We'd love to hear about it. Drop us a message and our team will get back to you within 24 hours."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Main Contact Grid ── */}
      <section className={`py-100 ${styles.mainSection}`}>
        <div className="container-fluid-px">
          <div className={styles.contactGrid}>

            {/* Left: Info cards */}
            <motion.div
              className={styles.infoSide}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className={styles.infoHeader}>
                <h2>{initialData?.contactSubTitle || "Get In Touch"}</h2>
                <p>{initialData?.contactTitle || "We're here to help you grow your business online. Reach out to us through any of the following channels."}</p>
              </motion.div>

              {initialData?.locations && initialData.locations.length > 0 ? (
                initialData.locations.map((loc, i) => (
                  <motion.div key={i} variants={fadeUp} className={styles.infoCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className={styles.infoIcon}><FaMapMarkerAlt /></div>
                    <div>
                      <h4>{loc.title}</h4>
                      <p>{loc.address}</p>
                      {loc.phone && <p style={{ marginTop: '0.5rem' }}><FaPhone style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--clr-primary)' }}/> {loc.phone}</p>}
                      {loc.email && <p><FaEnvelope style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--clr-primary)' }}/> {loc.email}</p>}
                    </div>
                  </motion.div>
                ))
              ) : (
                <>
                  <motion.div variants={fadeUp} className={styles.infoCard}>
                    <div className={styles.infoIcon}><FaMapMarkerAlt /></div>
                    <div>
                      <h4>Our Office</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{initialData?.officeAddress || "123, Digital Hub, Sector 18\nNoida, Uttar Pradesh — 201301"}</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeUp} className={styles.infoCard}>
                    <div className={styles.infoIcon}><FaPhone /></div>
                    <div>
                      <h4>Call Us</h4>
                      <p>{initialData?.officePhone || "+91 8527458950"}</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeUp} className={styles.infoCard}>
                    <div className={styles.infoIcon}><FaEnvelope /></div>
                    <div>
                      <h4>Email Us</h4>
                      <p>{initialData?.officeEmail || "info@thewebtycoons.com"}</p>
                    </div>
                  </motion.div>
                  <motion.div variants={fadeUp} className={styles.infoCard}>
                    <div className={styles.infoIcon}><FaClock /></div>
                    <div>
                      <h4>Working Hours</h4>
                      <p style={{ whiteSpace: 'pre-line' }}>{initialData?.workingHours || "Mon – Sat: 9:00 AM – 7:00 PM\nSun: Closed"}</p>
                    </div>
                  </motion.div>
                </>
              )}

              <motion.div variants={fadeUp} className={styles.socialRow}>
                <span>Follow Us</span>
                <div className={styles.socials}>
                  {globalSettings?.socialLinks?.filter(s => s.isActive !== false).map((social, idx) => {
                    let Icon;
                    switch(social.platform?.toLowerCase()) {
                      case 'linkedin': Icon = FaLinkedinIn; break;
                      case 'facebook': Icon = FaFacebookF; break;
                      case 'twitter': Icon = FaTwitter; break;
                      case 'instagram': Icon = FaInstagram; break;
                      case 'whatsapp': Icon = FaWhatsapp; break;
                      case 'youtube': Icon = FaYoutube; break;
                      default: Icon = FaGlobe; break;
                    }
                    return (
                      <a key={idx} href={social.url} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
                        <Icon />
                      </a>
                    );
                  }) || (
                    <>
                      <a href="https://wa.me/918527458950" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                      <a href="https://linkedin.com/company/thewebtycoons" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
                      <a href="https://instagram.com/thewebtycoons" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                      <a href="https://twitter.com/thewebtycoons" className={styles.socialIcon} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              className={styles.formSide}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {submitted ? (
                <motion.div
                  className={styles.successBox}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <FaCheckCircle className={styles.successIcon} />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button className="btnPrimary mt-4" onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', phone:'', service:'', budget:'', message:'' }) }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>Send Us a Message</h3>
                  <p className={styles.formCardSubtitle}>Fill out the form below and we'll be in touch shortly.</p>
                  
                  {error && <div className={styles.errorMsg} style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                  <form className={styles.contactForm} onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>FULL NAME *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className={styles.inputField} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>EMAIL ADDRESS *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className={styles.inputField} />
                      </div>
                    </div>
                    
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>PHONE NUMBER</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 8527458950" className={styles.inputField} />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>SERVICE INTERESTED IN *</label>
                        <select className={styles.selectField} name="service" value={formData.service} onChange={handleChange} required>
                          <option value="">Select a service...</option>
                          {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>ESTIMATED BUDGET</label>
                      <select className={styles.selectField} name="budget" value={formData.budget} onChange={handleChange}>
                        <option value="">Select a budget range...</option>
                        <option value="Under ₹25,000">Under ₹25,000</option>
                        <option value="₹25,000 – ₹75,000">₹25,000 – ₹75,000</option>
                        <option value="₹75,000 – ₹2,00,000">₹75,000 – ₹2,00,000</option>
                        <option value="₹2,00,000+">₹2,00,000+</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>TELL US ABOUT YOUR PROJECT *</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Describe your project goals, timeline, and any specific requirements..." className={styles.textArea} rows="4"></textarea>
                    </div>
                    
                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                      {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className={styles.mapSection}>
        {initialData?.mapIframeUrl ? (
          <div dangerouslySetInnerHTML={{ __html: initialData.mapIframeUrl.replace('<iframe', '<iframe width="100%" height="450" style="border: 0; display: block; filter: invert(90%) hue-rotate(180deg);" allowfullscreen="" loading="lazy"') }} />
        ) : (
          <iframe
            title="WebTycoons Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3765565254!2d77.32199!3d28.56978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f2d2b7e4d1%3A0x7f0c0c0c0c0c0c0c!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen=""
            loading="lazy"
          />
        )}
      </section>

    </main>
  )
}