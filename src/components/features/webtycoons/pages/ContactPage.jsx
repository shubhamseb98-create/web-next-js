import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaWhatsapp, FaLinkedinIn, FaInstagram, FaTwitter,
  FaPaperPlane, FaCheckCircle
} from 'react-icons/fa'
import styles from './ContactPage.module.css'
import { fadeUp, staggerContainer } from '../animations/variants'

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

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    document.title = 'Contact Us | WebTycoons'
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
  }

  return (
    <main className={styles.contactPage}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.breadcrumb}>
              <Link to="/">Home</Link> / <span>Contact Us</span>
            </div>
            <h1 className={styles.heroTitle}>
              Let's Build Something <span className={styles.accent}>Amazing</span><br />Together
            </h1>
            <p className={styles.heroDesc}>
              Have a project in mind? We'd love to hear about it. Drop us a message and our team will get back to you within 24 hours.
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
                <h2>Get In Touch</h2>
                <p>We're here to help you grow your business online. Reach out to us through any of the following channels.</p>
              </motion.div>

              {contactInfo.map((info, i) => (
                <motion.div key={i} variants={fadeUp} className={styles.infoCard}>
                  <div className={styles.infoIcon}><info.icon /></div>
                  <div>
                    <h4>{info.title}</h4>
                    {info.lines.map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className={styles.socialRow}>
                <span>Follow Us</span>
                <div className={styles.socials}>
                  <a href="#" className={styles.socialIcon}><FaWhatsapp /></a>
                  <a href="#" className={styles.socialIcon}><FaLinkedinIn /></a>
                  <a href="#" className={styles.socialIcon}><FaInstagram /></a>
                  <a href="#" className={styles.socialIcon}><FaTwitter /></a>
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
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formTitle}>
                    <h2>Send Us a Message</h2>
                    <p>Fill out the form below and we'll be in touch shortly.</p>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+91 8527458950" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="service">Service Interested In *</label>
                      <select id="service" name="service" value={formData.service} onChange={handleChange} required>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="budget">Estimated Budget</label>
                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
                      <option value="">Select a budget range...</option>
                      <option>Below ₹25,000</option>
                      <option>₹25,000 – ₹75,000</option>
                      <option>₹75,000 – ₹2,00,000</option>
                      <option>₹2,00,000+</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message">Tell Us About Your Project *</label>
                    <textarea id="message" name="message" rows={5} placeholder="Describe your project goals, timeline, and any specific requirements..." value={formData.message} onChange={handleChange} required />
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className={styles.mapSection}>
        <iframe
          title="WebTycoons Office Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.3765565254!2d77.32199!3d28.56978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f2d2b7e4d1%3A0x7f0c0c0c0c0c0c0c!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
          allowFullScreen=""
          loading="lazy"
        />
      </section>

    </main>
  )
}

export default ContactPage
