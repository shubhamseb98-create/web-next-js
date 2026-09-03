"use client";
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { useScrolled } from '../../features/webtycoons/hooks/useScroll'
import styles from './Header.module.css'

/* ══════════════════════════════════════════════
   SHAPE SVGs — matches CodePen exactly:
   Each has 4 path variants; only active shown.
   We cycle which path is "active" per shape.
══════════════════════════════════════════════ */
const ShapeSVG = ({ className }) => (
  <svg viewBox="0 0 360 360" fill="none" className={className} aria-hidden="true">
    {/* Hexagon */}
    <path fill="currentColor"
      d="M199.5 3.93243C216.536 -6.47747 237.526 -6.47748 254.562 3.43242L359.927 64.7223C376.963 74.6322 387.458 92.9465 387.458 112.766L387.458 235.346C387.458 255.166 376.963 273.48 359.927 283.39L254.562 344.68C237.526 354.59 216.536 354.59 199.5 344.68L94.135 283.39C77.0987 273.48 66.6039 255.166 66.6039 235.346L66.6039 112.766C66.6039 92.9465 77.0987 74.6322 94.135 64.7223L199.5 3.93243Z"
    />
  </svg>
)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen]                 = useState(false)
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState('')
  const isScrolled                                  = useScrolled(80)
  const location                                    = usePathname()

  /* Close on route change */
  useEffect(() => {
    setIsMenuOpen(false)
    setMobileDropdownOpen('')
    if (typeof document !== 'undefined') {
      document.activeElement?.blur?.()
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }, [location])

  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      document.activeElement?.blur?.()
    }
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0)
      if (window.lenis?.scrollTo) {
        window.lenis.scrollTo(0, { immediate: true })
      }
    }
  }

  /* Menu open state — NO scroll locking at all.
     The fullscreen menu is position:fixed and covers the whole viewport.
     Stopping lenis would add overflow:hidden to <html> via .lenis-stopped class,
     causing a ~15px scrollbar layout shift that breaks all Swiper sliders. */
  useEffect(() => {
    // intentionally empty — just track isMenuOpen for UI state
    return () => {}
  }, [isMenuOpen])


  const navLinks = [
    { name: 'Home',       path: '/' },
    { name: 'About',      path: '/about' },
    { name: 'Services',   path: '/services/static-website-development', hasDropdown: true },
    { name: 'Projects',   path: '/projects' },
    { name: 'Blog',       path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ]

  return (
    <>
      {/* ════════════════════════════════════════════
          Main transparent header
      ════════════════════════════════════════════ */}
      <header className={`${styles.header} ${isScrolled ? styles.headerHidden : ''}`}>

        {/* 5-layer backdrop-blur band */}
        <div className={styles.headerBlur} aria-hidden="true">
          <span className={`${styles.hbl} ${styles.hbl1}`} />
          <span className={`${styles.hbl} ${styles.hbl2}`} />
          <span className={`${styles.hbl} ${styles.hbl3}`} />
          <span className={`${styles.hbl} ${styles.hbl4}`} />
          <span className={`${styles.hbl} ${styles.hbl5}`} />
        </div>

        <div className={`container-fluid-px h-100 d-flex align-items-center justify-content-between ${styles.headerInner}`}>
          <Link href="/" className={styles.logo}>
            <Image src="/assets/img/logo-new.png" alt="WebTycoons Logo" width={200} height={50} style={{ objectFit: 'contain' }} className={styles.logoImg} />
          </Link>

          {/* Desktop Nav */}
          <nav className={`d-none d-lg-flex align-items-center ${styles.desktopNav}`}>
            {navLinks.map((link) => (
              <div key={link.name} className={styles.navItemWrapper}>
                <Link href={link.path} className={`${styles.navLink} ${link.hasDropdown ? styles.hasDropdown : ''}`}>
                  {link.name}
                  {link.hasDropdown && (
                    <svg className={styles.dropdownIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>
                {link.hasDropdown && (
                  <div className={styles.dropdownMenu}>
                    <Link href="/services/static-website-development">Static Websites</Link>
                    <Link href="/services/dynamic-website-development">Dynamic Websites</Link>
                    <Link href="/services/e-commerce-website-development">E-Commerce</Link>
                    <Link href="/services/real-estate-advisory">Real Estate Advisory</Link>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="d-flex align-items-center gap-3">
            <Link href="/contact" className={`d-none d-lg-flex ${styles.ctaButton}`}>
              {"Let's Talk"}
            </Link>
            <button
              className={styles.mobileToggle}
              onClick={() => setIsMenuOpen(v => !v)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Hamburger lines */}
              <svg width="28" height="10" viewBox="0 0 35 10" fill="none"
                style={{ opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'rotate(90deg)' : 'none', transition: 'all 0.25s ease', position: 'absolute' }}>
                <rect width="35" height="1.5" fill="currentColor" />
                <rect y="8" width="35" height="1.5" fill="currentColor" />
              </svg>
              {/* X icon */}
              <svg width="20" height="21" viewBox="0 0 22 23" fill="none"
                style={{ opacity: isMenuOpen ? 1 : 0, transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'all 0.25s ease' }}>
                <rect x="1.061" y="0.354" width="29.345" height="1.5" transform="rotate(45 1.061 0.354)" fill="currentColor" />
                <rect x="21.811" y="1.061" width="29.345" height="1.5" transform="rotate(135 21.811 1.061)" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          Floating pill (on scroll)
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && !isMenuOpen && (
          <motion.button
            className={styles.floatingPill}
            onClick={() => setIsMenuOpen(true)}
            initial={{ opacity: 0, scale: 0.7, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            aria-label="Open Menu"
          >
            <svg width="20" height="10" viewBox="0 0 35 10" fill="none">
              <rect width="35" height="1.5" fill="currentColor" />
              <rect y="8" width="35" height="1.5" fill="currentColor" />
            </svg>
            <span>Menu</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          Fullscreen menu — CodePen style
      ════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════
          Fullscreen menu — Exact Spec
      ════════════════════════════════════════════ */}
      <nav
        className={`${styles.fullscreenMenu} ${isMenuOpen ? styles.glFloat : ''}`}
        data-open={isMenuOpen ? 'true' : 'false'}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? '' : undefined}
      >
        
        {/* Floating Shapes Background Decoration */}
        <div className={styles.header__shapes}>
          {/* HEXAGON shape */}
          <div name="hexagon" className={`${styles.header__shape} ${styles['header__shape--hexagon']}`}>
            <svg viewBox="0 0 360 360" fill="none" className={`${styles.shape} ${styles['shape--hexagon']}`}>
              <path fill="currentColor" className={`${styles.shape__path} ${styles['shape__path--active']}`} transform="translate(19.5 1.5)"
                d="M132.896 7.43243C149.932 -2.47747 170.922 -2.47748 187.958 7.43242L293.323 68.7223C310.359 78.6322 320.854 96.9465 320.854 116.766L320.854 239.346C320.854 259.166 310.359 277.48 293.323 287.39L187.958 348.68C170.922 358.59 149.932 358.59 132.896 348.68L27.5311 287.39C10.4948 277.48 0 259.166 0 239.346L0 116.766C0 96.9465 10.4948 78.6322 27.5311 68.7223L132.896 7.43243Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(19 19)"
                d="M160.545 0C249.211 0 321.09 71.879 321.09 160.545C321.09 249.211 249.211 321.09 160.545 321.09C71.879 321.09 0 249.211 0 160.545C0 71.879 71.879 0 160.545 0Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(19.5 19.5)"
                d="M0 59.7623C0 26.7519 26.7519 0 59.7623 0H261.092C294.102 0 320.854 26.7519 320.854 59.7623V261.092C320.854 294.102 294.102 320.854 261.092 320.854H59.7623C26.7519 320.854 0 294.102 0 261.092V59.7623Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(17 17)"
                d="M89.8477 0C119.388 1.12081e-05 145.597 14.1722 161.972 36.0494C162.482 36.7304 163.51 36.7304 164.02 36.0495C180.396 14.1731 206.605 0.00203366 236.145 0.00195312C285.764 0.00195312 325.989 39.988 325.989 89.3135C325.989 119.25 311.171 145.745 288.429 161.95C287.716 162.459 287.716 163.528 288.429 164.036C311.172 180.241 325.992 206.737 325.992 236.675C325.992 286 285.767 325.986 236.147 325.986C206.606 325.986 180.395 311.813 164.019 289.933C163.509 289.252 162.481 289.252 161.971 289.933C145.596 311.813 119.386 325.987 89.8447 325.987C40.2252 325.987 0 286.001 0 236.676C3.7764e-05 206.737 14.8197 180.24 37.5637 164.035C38.2774 163.527 38.2775 162.458 37.5638 161.949C14.8217 145.744 0.0039728 119.249 0.00390625 89.3115C0.00390625 39.986 40.2281 0 89.8477 0Z" />
            </svg>
          </div>
          
          {/* CIRCLE shape */}
          <div name="circle" className={`${styles.header__shape} ${styles['header__shape--circle']}`}>
            <svg viewBox="0 0 360 360" fill="none" className={`${styles.shape} ${styles['shape--circle']}`}>
              <path fill="currentColor" className={styles.shape__path} transform="translate(19.5 1.5)"
                d="M132.896 7.43243C149.932 -2.47747 170.922 -2.47748 187.958 7.43242L293.323 68.7223C310.359 78.6322 320.854 96.9465 320.854 116.766L320.854 239.346C320.854 259.166 310.359 277.48 293.323 287.39L187.958 348.68C170.922 358.59 149.932 358.59 132.896 348.68L27.5311 287.39C10.4948 277.48 0 259.166 0 239.346L0 116.766C0 96.9465 10.4948 78.6322 27.5311 68.7223L132.896 7.43243Z" />
              <path fill="currentColor" className={`${styles.shape__path} ${styles['shape__path--active']}`} transform="translate(19 19)"
                d="M160.545 0C249.211 0 321.09 71.879 321.09 160.545C321.09 249.211 249.211 321.09 160.545 321.09C71.879 321.09 0 249.211 0 160.545C0 71.879 71.879 0 160.545 0Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(19.5 19.5)"
                d="M0 59.7623C0 26.7519 26.7519 0 59.7623 0H261.092C294.102 0 320.854 26.7519 320.854 59.7623V261.092C320.854 294.102 294.102 320.854 261.092 320.854H59.7623C26.7519 320.854 0 294.102 0 261.092V59.7623Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(17 17)"
                d="M89.8477 0C119.388 1.12081e-05 145.597 14.1722 161.972 36.0494C162.482 36.7304 163.51 36.7304 164.02 36.0495C180.396 14.1731 206.605 0.00203366 236.145 0.00195312C285.764 0.00195312 325.989 39.988 325.989 89.3135C325.989 119.25 311.171 145.745 288.429 161.95C287.716 162.459 287.716 163.528 288.429 164.036C311.172 180.241 325.992 206.737 325.992 236.675C325.992 286 285.767 325.986 236.147 325.986C206.606 325.986 180.395 311.813 164.019 289.933C163.509 289.252 162.481 289.252 161.971 289.933C145.596 311.813 119.386 325.987 89.8447 325.987C40.2252 325.987 0 286.001 0 236.676C3.7764e-05 206.737 14.8197 180.24 37.5637 164.035C38.2774 163.527 38.2775 162.458 37.5638 161.949C14.8217 145.744 0.0039728 119.249 0.00390625 89.3115C0.00390625 39.986 40.2281 0 89.8477 0Z" />
            </svg>
          </div>

          {/* SQUARE shape */}
          <div name="square" className={`${styles.header__shape} ${styles['header__shape--square']}`}>
            <svg viewBox="0 0 360 360" fill="none" className={`${styles.shape} ${styles['shape--square']}`}>
              <path fill="currentColor" className={styles.shape__path} transform="translate(19.5 1.5)"
                d="M132.896 7.43243C149.932 -2.47747 170.922 -2.47748 187.958 7.43242L293.323 68.7223C310.359 78.6322 320.854 96.9465 320.854 116.766L320.854 239.346C320.854 259.166 310.359 277.48 293.323 287.39L187.958 348.68C170.922 358.59 149.932 358.59 132.896 348.68L27.5311 287.39C10.4948 277.48 0 259.166 0 239.346L0 116.766C0 96.9465 10.4948 78.6322 27.5311 68.7223L132.896 7.43243Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(19 19)"
                d="M160.545 0C249.211 0 321.09 71.879 321.09 160.545C321.09 249.211 249.211 321.09 160.545 321.09C71.879 321.09 0 249.211 0 160.545C0 71.879 71.879 0 160.545 0Z" />
              <path fill="currentColor" className={`${styles.shape__path} ${styles['shape__path--active']}`} transform="translate(19.5 19.5)"
                d="M0 59.7623C0 26.7519 26.7519 0 59.7623 0H261.092C294.102 0 320.854 26.7519 320.854 59.7623V261.092C320.854 294.102 294.102 320.854 261.092 320.854H59.7623C26.7519 320.854 0 294.102 0 261.092V59.7623Z" />
              <path fill="currentColor" className={styles.shape__path} transform="translate(17 17)"
                d="M89.8477 0C119.388 1.12081e-05 145.597 14.1722 161.972 36.0494C162.482 36.7304 163.51 36.7304 164.02 36.0495C180.396 14.1731 206.605 0.00203366 236.145 0.00195312C285.764 0.00195312 325.989 39.988 325.989 89.3135C325.989 119.25 311.171 145.745 288.429 161.95C287.716 162.459 287.716 163.528 288.429 164.036C311.172 180.241 325.992 206.737 325.992 236.675C325.992 286 285.767 325.986 236.147 325.986C206.606 325.986 180.395 311.813 164.019 289.933C163.509 289.252 162.481 289.252 161.971 289.933C145.596 311.813 119.386 325.987 89.8447 325.987C40.2252 325.987 0 286.001 0 236.676C3.7764e-05 206.737 14.8197 180.24 37.5637 164.035C38.2774 163.527 38.2775 162.458 37.5638 161.949C14.8217 145.744 0.0039728 119.249 0.00390625 89.3115C0.00390625 39.986 40.2281 0 89.8477 0Z" />
            </svg>
          </div>
        </div>

        {/* Menu top bar */}
        <div className={styles.menuHeader}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image src="/assets/img/logo-new.png" alt="WebTycoons Logo" width={200} height={50} style={{ objectFit: 'contain' }} className={styles.logoImg} />
          </Link>
          <button className={styles.mobileToggle} onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="21" viewBox="0 0 22 23" fill="none">
              <rect x="1.061" y="0.354" width="29.345" height="1.5" transform="rotate(45 1.061 0.354)" fill="currentColor" />
              <rect x="21.811" y="1.061" width="29.345" height="1.5" transform="rotate(135 21.811 1.061)" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Vertical Links List */}
        <div className={styles.menuLinksWrapper} data-lenis-prevent="true">
          <ul className={styles.menuList}>
            {navLinks.map((link, i) => (
              <li key={link.name} className={styles.menuListItem} style={{ transitionDelay: `${0.15 * i + 0.15}s` }}>
                <Link href={link.path} className={styles.menuLink} onClick={closeMenu}>
                  {link.name}
                </Link>
                {link.hasDropdown && (
                  <div className={`${styles.menuDropdown} ${styles.menuLinkSub}`}>
                    <Link href="/services/static-website-development" className={styles.menuDropdownLink} onClick={closeMenu}>Static Websites</Link>
                    <Link href="/services/dynamic-website-development" className={styles.menuDropdownLink} onClick={closeMenu}>Dynamic Websites</Link>
                    <Link href="/services/e-commerce-website-development" className={styles.menuDropdownLink} onClick={closeMenu}>E-Commerce</Link>
                    <Link href="/services/real-estate-advisory" className={styles.menuDropdownLink} onClick={closeMenu}>Real Estate Advisory</Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Header
