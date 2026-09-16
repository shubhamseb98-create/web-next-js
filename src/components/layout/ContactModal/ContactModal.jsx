"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaPaperPlane } from 'react-icons/fa';
import styles from './ContactModal.module.css';

const SERVICES = [
  'Web Development',
  'E-Commerce Store',
  'UI/UX Design',
  'Mobile Apps',
  'SEO & Marketing',
  'Real Estate Advisory'
];

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Development',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  /* Close on Escape key */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Prevent background scrolling when modal is open */
  useEffect(() => {
    if (isOpen) {
      if (typeof window !== 'undefined' && window.lenis?.stop) {
        window.lenis.stop();
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (typeof window !== 'undefined' && window.lenis?.start) {
        window.lenis.start();
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (typeof window !== 'undefined' && window.lenis?.start) {
        window.lenis.start();
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit inquiry.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web Development',
      message: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-lenis-prevent="true"
        >
          <motion.div
            className={styles.modalDialog}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent="true"
          >
            {/* Close Button */}
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Split Container: Left Office Image + Right Form */}
            <div className={styles.splitContainer}>
              {/* Left Column: Office Visual */}
              <div className={styles.leftCol}>
                <div className={styles.imageWrapper}>
                  <Image
                    src="/assets/img/modal-office.png"
                    alt="WebTycoons Active Workspace"
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className={styles.officeImg}
                    priority
                  />
                  <div className={styles.imageGradientOverlay} />
                  <div className={styles.imageBadge}>
                    <span className={styles.badgePulse} />
                    <span>Active Engineering Lab</span>
                  </div>
                  <div className={styles.imageCaption}>
                    <span className={styles.captionTag}>WebTycoons Hub</span>
                    <h4 className={styles.captionTitle}>Code. Create. Conquer.</h4>
                  </div>
                </div>
              </div>

              {/* Right Column: Form / Success */}
              <div className={styles.rightCol}>
                {!submitted ? (
                  <>
                    <div className={styles.modalHeader}>
                      <h3 className={styles.title}>
                        {"Let's "}
                        <span className={styles.accent}>Talk</span>
                      </h3>
                      <p className={styles.description}>
                        Have a project in mind? We would love to hear from you.
                      </p>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                      {error && <div className={styles.errorBanner}>{error}</div>}

                      {/* Row 1: Name & Phone */}
                      <div className={styles.row2}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Your Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Phone / WhatsApp</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            className={styles.input}
                          />
                        </div>
                      </div>

                      {/* Row 2: Email & Service */}
                      <div className={styles.row2}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@example.com"
                            className={styles.input}
                          />
                        </div>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>Service Needed</label>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={styles.select}
                          >
                            {SERVICES.map((srv) => (
                              <option key={srv} value={srv}>
                                {srv}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Message */}
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Project Brief *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Brief details about what you'd like to build..."
                          className={styles.textarea}
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className={styles.submitBtn}
                      >
                        {loading ? (
                          <span className={styles.spinner} />
                        ) : (
                          <>
                            <FaPaperPlane size={13} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className={styles.successContainer}>
                    <div className={styles.successIcon}>
                      <FaCheckCircle />
                    </div>
                    <h3 className={styles.successTitle}>Inquiry Sent Successfully!</h3>
                    <p className={styles.successText}>
                      Thank you, <strong>{formData.name}</strong>! We have received your project details. Our lead technology consultant will review your specifications and contact you shortly.
                    </p>
                    <button
                      type="button"
                      className={styles.successBtn}
                      onClick={handleReset}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
