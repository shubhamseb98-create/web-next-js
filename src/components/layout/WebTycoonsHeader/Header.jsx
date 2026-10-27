"use client";
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import { 
  FaInstagram, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaYoutube, 
  FaChevronDown,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa'
import { useScrolled } from '../../features/webtycoons/hooks/useScroll'
import ContactModal from '../ContactModal/ContactModal'
import { DEFAULT_HEADER_ITEMS } from '../../../data/headerMenuDefaults'
import styles from './Header.module.css'

const formatSubMenuLabel = (str, max = 40) => {
  if (!str) return '';
  if (str.length <= max) return str;
  return str.slice(0, max).trim() + '...';
};

const isCorporateNavName = (name = '') => {
  const n = name.toLowerCase().trim();
  return ['home', 'brand story', 'about', 'about us', 'projects', 'portfolio', 'blog', 'contact us', 'contact'].includes(n);
};

const formatInitialNav = (data) => {
  let source = Array.isArray(data) && data.length > 0 ? data : DEFAULT_HEADER_ITEMS;

  // If source contains legacy single-tab 'Services' without tier, upgrade to dual-tier default
  if (source.some((it) => (it.name === 'Services' || it.title === 'Services') && !it.tier)) {
    source = DEFAULT_HEADER_ITEMS;
  }

  return source
    .filter((it) => it.isActive !== false)
    .map((it) => {
      const rawSub = it.subItems || it.children || [];
      const activeSubs = rawSub
        .filter((sub) => sub.isActive !== false)
        .map((sub, sIdx) => ({
          _id: sub._id || sub.id || sIdx,
          label: sub.label || sub.title,
          path: sub.path || sub.slug,
          openInNewTab: Boolean(sub.openInNewTab),
          isActive: true,
        }));

      let parentPath = it.path || it.slug || '#';
      if (Boolean(it.hasDropdown) && activeSubs.length > 0) {
        if (parentPath === '/services' || parentPath === '#' || !parentPath) {
          parentPath = activeSubs[0].path;
        }
      }

      const inferredTier = it.tier || (isCorporateNavName(it.name || it.title) ? 'topNav' : 'servicesNav');

      return {
        id: it.id || it._id || it.title || it.name,
        name: it.name || it.title,
        path: parentPath,
        order: it.order || it.id || 0,
        tier: inferredTier,
        hasDropdown: Boolean(it.hasDropdown ?? (activeSubs.length > 0)),
        openInNewTab: Boolean(it.openInNewTab),
        isSpecialCta: Boolean(it.isSpecialCta || it.slug === '/contact' || it.path === '/contact'),
        ctaAction: it.ctaAction || (it.slug === '/contact' || it.path === '/contact' ? 'modal' : 'link'),
        subItems: activeSubs,
      };
    });
};

const Header = ({ initialNavData, initialGlobalSettings, initialHeaderConfig }) => {
  const [navLinks, setNavLinks]                     = useState(() => formatInitialNav(initialNavData))
  const [ctaConfig, setCtaConfig]                   = useState({
    ctaButtonText: initialHeaderConfig?.ctaButtonText || initialGlobalSettings?.headerCtaText || "Let's Talk",
    ctaButtonAction: initialHeaderConfig?.ctaButtonAction || "modal",
    ctaButtonLink: initialHeaderConfig?.ctaButtonLink || "/contact",
    showCtaButton: initialHeaderConfig?.showCtaButton !== false,
  })
  const [isMenuOpen, setIsMenuOpen]                 = useState(false)
  const [hoveredDropdown, setHoveredDropdown]       = useState(null)
  const [expandedDropdowns, setExpandedDropdowns]   = useState({})
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactModalService, setContactModalService] = useState('Web Development')
  const isScrolled                                  = useScrolled(30)
  const location                                    = usePathname()

  // Partition links cleanly into Top Tier (Corporate) and Main Tier (Services)
  const topLinks = useMemo(() => {
    const list = navLinks.filter(it => it.tier === 'topNav');
    if (list.length > 0) return list;
    return formatInitialNav(DEFAULT_HEADER_ITEMS).filter(it => it.tier === 'topNav');
  }, [navLinks]);

  const serviceLinks = useMemo(() => {
    const list = navLinks.filter(it => it.tier !== 'topNav');
    if (list.length > 0) return list;
    return formatInitialNav(DEFAULT_HEADER_ITEMS).filter(it => it.tier !== 'topNav');
  }, [navLinks]);

  /* Fetch dynamic header navigation menu from API */
  useEffect(() => {
    let isMounted = true
    async function fetchMenu() {
      try {
        const res = await fetch('/api/header-menu')
        const json = await res.json()
        if (isMounted && json.success && Array.isArray(json.data) && json.data.length > 0) {
          setNavLinks(formatInitialNav(json.data))
          if (json.config) {
            setCtaConfig(json.config)
          }
        }
      } catch (err) {
        // Graceful fallback to initial state
      }
    }
    fetchMenu()
    return () => { isMounted = false }
  }, [])

  /* Update navLinks if initialNavData changes */
  useEffect(() => {
    if (initialNavData && Array.isArray(initialNavData) && initialNavData.length > 0) {
      setNavLinks(formatInitialNav(initialNavData));
    }
  }, [initialNavData])

  /* Listen for global modal open events */
  useEffect(() => {
    const handleOpenModal = (e) => {
      if (e?.detail?.service) {
        setContactModalService(e.detail.service)
      }
      setIsContactModalOpen(true)
    }
    window.addEventListener('open-contact-modal', handleOpenModal)
    return () => window.removeEventListener('open-contact-modal', handleOpenModal)
  }, [])

  /* Close on route change */
  useEffect(() => {
    setIsMenuOpen(false)
    setExpandedDropdowns({})
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

  /* Lock background scrolling & pause Lenis when drawer menu is open */
  useEffect(() => {
    if (isMenuOpen) {
      if (typeof window !== 'undefined' && window.lenis?.stop) {
        window.lenis.stop()
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (typeof window !== 'undefined' && window.lenis?.start) {
        window.lenis.start()
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }

    return () => {
      if (typeof window !== 'undefined' && window.lenis?.start) {
        window.lenis.start()
      }
      if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
      }
    }
  }, [isMenuOpen])

  /* Prevent mousewheel and touch scroll leakage to the main background page */
  useEffect(() => {
    if (!isMenuOpen) return

    const handleWheel = (e) => {
      const scrollable = e.target.closest?.(`.${styles.drawerLinksWrapper}`)
      if (!scrollable) {
        e.preventDefault()
      }
    }

    const handleTouchMove = (e) => {
      const scrollable = e.target.closest?.(`.${styles.drawerLinksWrapper}`)
      if (!scrollable) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
    if (typeof document !== 'undefined') {
      document.activeElement?.blur?.()
    }
  }

  return (
    <>
      {/* ════════════════════════════════════════════
          2-Tier (Dual Navbar) Glassmorphism Header
      ════════════════════════════════════════════ */}
      <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
        
        {/* ── Tier 1: Top Utility & Corporate Bar (Desktop Only) ── */}
        <div className={`${styles.topUtilityBar} ${isScrolled ? styles.topUtilityBarHidden : ''}`}>
          <div className={`container-fluid-px h-100 d-flex align-items-center justify-content-between ${styles.topBarInner}`}>
            {/* Left: Contact Info */}
            <div className={styles.topBarContact}>
              <a href="tel:+918527458950" className={styles.topContactItem} title="Call Us">
                <FaPhoneAlt className={styles.topContactIcon} />
                <span>(+91) - 8527458950</span>
              </a>
              <span className={styles.contactDivider}>•</span>
              <a href="mailto:info@thewebtycoons.com" className={styles.topContactItem} title="Email Us">
                <FaEnvelope className={styles.topContactIcon} />
                <span>info@thewebtycoons.com</span>
              </a>
            </div>

            {/* Right: Corporate Links */}
            <nav className={styles.topCorporateNav} aria-label="Corporate Links">
              {topLinks.map((link) => (
                link.isSpecialCta && link.ctaAction === 'modal' ? (
                  <button
                    key={link.id || link.name}
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className={styles.topCorporateLink}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.id || link.name}
                    href={link.path}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={`${styles.topCorporateLink} ${location === link.path ? styles.activeTopLink : ''}`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        </div>

        {/* ── Tier 2: Main Services Navbar + Logo + CTA ── */}
        <div className={styles.mainServicesBar}>
          <div className={`container-fluid-px h-100 d-flex align-items-center justify-content-between ${styles.headerInner}`}>
            
            {/* WebTycoons Logo */}
            <Link
              href="/"
              className={styles.logoLink}
              aria-label="WebTycoons Home"
            >
              <Image
                src="/assets/img/logo-new.png"
                alt="WebTycoons Logo"
                width={200}
                height={50}
                style={{ objectFit: 'contain', height: '38px', width: 'auto', display: 'block' }}
                className={styles.logoImg}
                priority
              />
            </Link>

            {/* Desktop Services Navigation Bar */}
            <nav className={`align-items-center mx-auto ${styles.desktopNav}`} aria-label="Services Navigation">
              {serviceLinks.map((link) => {
                const key = link.id || link.name;
                const isDropdownVisible = hoveredDropdown === key;
                const isCurrentActive = location === link.path || (link.hasDropdown && location.startsWith(link.path) && link.path !== '/');

                return (
                  <div 
                    key={key} 
                    id={`nav-item-${link.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    className={styles.navItemWrapper}
                    onMouseEnter={() => setHoveredDropdown(key)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    <Link 
                      href={link.path} 
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className={`${styles.navLink} ${link.hasDropdown ? styles.hasDropdown : ''} ${isCurrentActive ? styles.activeNavLink : ''}`}
                    >
                      <span>{link.name}</span>
                      {link.hasDropdown && (
                        <FaChevronDown className={styles.dropdownIcon} size={9} />
                      )}
                    </Link>

                    {/* Rich Floating Dropdown Menu */}
                    {link.hasDropdown && link.subItems && link.subItems.length > 0 && (
                      <div 
                        className={styles.dropdownMenu}
                        data-visible={isDropdownVisible ? "true" : undefined}
                      >
                        <div className={styles.dropdownHeader}>
                          <span>{link.name}</span>
                        </div>
                        <div className={styles.dropdownItemsList}>
                          {link.subItems.map((sub, sIdx) => {
                            const isSubActive = location === sub.path;
                            return (
                              <Link 
                                key={sub._id || sIdx} 
                                href={sub.path}
                                target={sub.openInNewTab ? '_blank' : undefined}
                                rel={sub.openInNewTab ? 'noopener noreferrer' : undefined}
                                title={sub.label}
                                className={`${styles.dropdownSubItem} ${isSubActive ? styles.activeSubLink : ''}`}
                              >
                                <span className={styles.dropdownBullet} />
                                <span className={styles.dropdownLabel}>{formatSubMenuLabel(sub.label, 36)}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right: CTA Button & Mobile Toggle */}
            <div className="d-flex align-items-center gap-2 gap-sm-3">
              {ctaConfig.showCtaButton && (
                ctaConfig.ctaButtonAction === 'modal' ? (
                  <button
                    type="button"
                    onClick={() => setIsContactModalOpen(true)}
                    className={styles.ctaButton}
                    aria-label="Open contact modal"
                  >
                    {ctaConfig.ctaButtonText}
                  </button>
                ) : (
                  <Link
                    href={ctaConfig.ctaButtonLink || '/contact'}
                    className={styles.ctaButton}
                    aria-label={ctaConfig.ctaButtonText}
                  >
                    {ctaConfig.ctaButtonText}
                  </Link>
                )
              )}

              {/* Hamburger Button for Mobile / Tablet */}
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
        </div>
      </header>

      {/* ════════════════════════════════════════════
          Drawer Backdrop (click outside to close)
      ════════════════════════════════════════════ */}
      <div 
        className={`${styles.drawerBackdrop} ${isMenuOpen ? styles.backdropActive : ''}`}
        onClick={closeMenu}
        data-lenis-prevent="true"
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════
          Segmented Side Drawer Menu (Mobile & Tablet)
      ════════════════════════════════════════════ */}
      <nav
        className={`${styles.sideDrawerMenu} ${isMenuOpen ? styles.drawerOpen : ''}`}
        data-open={isMenuOpen ? 'true' : 'false'}
        data-lenis-prevent="true"
        aria-hidden={!isMenuOpen}
      >
        {/* Floating Shapes Background Decoration */}
        <div className={styles.header__shapes}>
          <div name="hexagon" className={`${styles.header__shape} ${styles['header__shape--hexagon']}`}>
            <svg viewBox="0 0 360 360" fill="none" className={`${styles.shape} ${styles['shape--hexagon']}`}>
              <path fill="currentColor" className={`${styles.shape__path} ${styles['shape__path--active']}`} transform="translate(19.5 1.5)"
                d="M132.896 7.43243C149.932 -2.47747 170.922 -2.47748 187.958 7.43242L293.323 68.7223C310.359 78.6322 320.854 96.9465 320.854 116.766L320.854 239.346C320.854 259.166 310.359 277.48 293.323 287.39L187.958 348.68C170.922 358.59 149.932 358.59 132.896 348.68L27.5311 287.39C10.4948 277.48 0 259.166 0 239.346L0 116.766C0 96.9465 10.4948 78.6322 27.5311 68.7223L132.896 7.43243Z" />
            </svg>
          </div>
          <div name="circle" className={`${styles.header__shape} ${styles['header__shape--circle']}`}>
            <svg viewBox="0 0 360 360" fill="none" className={`${styles.shape} ${styles['shape--circle']}`}>
              <path fill="currentColor" className={`${styles.shape__path} ${styles['shape__path--active']}`} transform="translate(19 19)"
                d="M160.545 0C249.211 0 321.09 71.879 321.09 160.545C321.09 249.211 249.211 321.09 160.545 321.09C71.879 321.09 0 249.211 0 160.545C0 71.879 71.879 0 160.545 0Z" />
            </svg>
          </div>
        </div>

        {/* Drawer Header: Logo + Close */}
        <div className={styles.drawerHeader}>
          <Link
            href="/"
            className={styles.drawerLogo}
            onClick={closeMenu}
          >
            <Image 
              src="/assets/img/logo-new.png" 
              alt="WebTycoons Logo" 
              width={160} 
              height={42} 
              style={{ objectFit: 'contain', height: '32px', width: 'auto', display: 'block' }} 
              className={styles.logoImg} 
            />
          </Link>
          <button className={styles.drawerCloseBtn} onClick={closeMenu} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Vertical Links List */}
        <div className={styles.drawerLinksWrapper} data-lenis-prevent="true">
          
          {/* Quick Call Strip inside Mobile Drawer */}
          <div className={styles.drawerQuickContactStrip}>
            <a href="tel:+918527458950" className={styles.drawerCallBtn}>
              <FaPhoneAlt size={12} />
              <span>Call Us: (+91) 8527458950</span>
            </a>
          </div>

          {/* SECTION 1: OUR SERVICES */}
          <div className={styles.drawerSectionTitle}>
            <span>OUR SERVICES</span>
            <div className={styles.drawerSectionLine} />
          </div>

          <ul className={styles.drawerList}>
            {serviceLinks.map((link) => {
              const key = link.id || link.name;
              const isExpanded = Boolean(expandedDropdowns[key]);
              const toggleDropdown = (e) => {
                const nextState = !expandedDropdowns[key];
                setExpandedDropdowns((prev) => ({
                  ...prev,
                  [key]: nextState,
                }));
                if (nextState) {
                  const targetEl = e?.currentTarget?.closest?.(`.${styles.drawerItem}`);
                  setTimeout(() => {
                    targetEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 80);
                }
              };

              return (
                <li key={key} className={styles.drawerItem}>
                  {link.hasDropdown ? (
                    <>
                      <div className={styles.drawerDropdownTrigger}>
                        <button
                          type="button"
                          className={styles.drawerLink}
                          style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                          onClick={toggleDropdown}
                        >
                          <div className={styles.hoverBar} aria-hidden="true">
                            <span className={styles.hoverBarLine} />
                            <span className={styles.hoverBarDot} />
                          </div>
                          <span className={styles.drawerLinkText}>{link.name}</span>
                        </button>
                        <button 
                          type="button"
                          className={`${styles.chevronBtn} ${isExpanded ? styles.chevronOpen : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleDropdown(e);
                          }}
                          aria-label={`Toggle ${link.name} sub-menu`}
                        >
                          <FaChevronDown size={14} />
                        </button>
                      </div>
                      {isExpanded && link.subItems && link.subItems.length > 0 && (
                        <div className={styles.drawerSubMenu}>
                          {link.subItems.map((sub, sIdx) => (
                            <Link
                              key={sub._id || sIdx}
                              href={sub.path}
                              target={sub.openInNewTab ? '_blank' : undefined}
                              rel={sub.openInNewTab ? 'noopener noreferrer' : undefined}
                              className={styles.drawerSubLink}
                              onClick={closeMenu}
                            >
                              <div className={styles.hoverBar} aria-hidden="true">
                                <span className={styles.hoverBarLine} />
                                <span className={styles.hoverBarDot} />
                              </div>
                              <span className={styles.drawerSubLinkText}>{sub.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className={styles.drawerLink}
                      onClick={closeMenu}
                    >
                      <div className={styles.hoverBar} aria-hidden="true">
                        <span className={styles.hoverBarLine} />
                        <span className={styles.hoverBarDot} />
                      </div>
                      <span className={styles.drawerLinkText}>{link.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* SECTION 2: COMPANY QUICK LINKS */}
          <div className={styles.drawerSectionTitle} style={{ marginTop: '1.25rem' }}>
            <span>COMPANY</span>
            <div className={styles.drawerSectionLine} />
          </div>

          <ul className={styles.drawerList}>
            {topLinks.map((link) => {
              const key = link.id || link.name;
              return (
                <li key={key} className={styles.drawerItem}>
                  {link.isSpecialCta && link.ctaAction === 'modal' ? (
                    <button
                      type="button"
                      className={styles.drawerLink}
                      style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                      onClick={() => {
                        closeMenu();
                        setIsContactModalOpen(true);
                      }}
                    >
                      <div className={styles.hoverBar} aria-hidden="true">
                        <span className={styles.hoverBarLine} />
                        <span className={styles.hoverBarDot} />
                      </div>
                      <span className={styles.drawerLinkText}>{link.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={link.path}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      className={styles.drawerLink}
                      onClick={closeMenu}
                    >
                      <div className={styles.hoverBar} aria-hidden="true">
                        <span className={styles.hoverBarLine} />
                        <span className={styles.hoverBarDot} />
                      </div>
                      <span className={styles.drawerLinkText}>{link.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Bottom CTA Button inside drawer */}
          <div style={{ padding: '1.5rem 0.5rem 0.5rem' }}>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                setIsContactModalOpen(true);
              }}
              className={styles.drawerCtaBtn}
            >
              {ctaConfig.ctaButtonText || "Let's Talk"}
            </button>
          </div>

        </div>

        {/* Drawer footer: STALK US & Social Icons */}
        <div className={styles.drawerFooter}>
          <span className={styles.drawerSocialTitle}>STALK US</span>
          <div className={styles.drawerSocialRow}>
            <a href="https://instagram.com/thewebtycoons" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com/thewebtycoons" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com/company/thewebtycoons" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>
      </nav>

      {/* Interactive Contact / Let's Talk Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        initialService={contactModalService}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  )
}

export default Header
