// Animation variants for Framer Motion
// Used across the entire application for consistent motion design

/* ── Fade Up ── */
export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Fade Down ── */
export const fadeDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Fade Left ── */
export const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Fade Right ── */
export const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Zoom In ── */
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
}

/* ── Stagger Container ── */
export const staggerContainer = (stagger = 0.12, delay = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
})

/* ── Stagger Item ── */
export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Scale Up ── */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
}

/* ── Slide In from Bottom (used for hero) ── */
export const heroText = {
  hidden: { opacity: 0, y: 80, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Card Hover ── */
export const cardHover = {
  rest: { y: 0, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
  hover: {
    y: -8,
    boxShadow: '0 24px 80px rgba(124,58,237,0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

/* ── View Port triggers (used with whileInView) ── */
export const viewportOptions = { once: true, amount: 0.1 }
