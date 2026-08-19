"use client";

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Preloader.module.css'

const BRAND_NAME = 'WEBTYCOONS'

// Each letter animates in: starts below and small, flies up to its position
const letterVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.4,
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,           // stagger — each letter 80ms after the previous
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // snappy spring-like ease
    },
  }),
  exit: (i) => ({
    opacity: 0,
    y: -50,
    scale: 0.5,
    transition: {
      delay: i * 0.05,           // exit stagger in reverse order
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
}

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Keep loader visible long enough to see the full animation
    // Letters: 10 * 80ms = 800ms + 550ms last letter = ~1350ms visible, so 2400ms total is good
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2400)

    return () => clearTimeout(timer)
  }, [])

  // Lock scrolling while preloader is active
  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className={styles.preloader}
          key="preloader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            borderBottomLeftRadius: '60%',
            borderBottomRightRadius: '60%',
            transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
          }}
        >
          <div className={styles.content}>
            {/* Staggered letter animation */}
            <div className={styles.wordRow}>
              {BRAND_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className={styles.letter}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Thin animated underline that sweeps across */}
            <motion.div
              className={styles.underline}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
