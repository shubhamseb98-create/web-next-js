import Link from 'next/link';
import styles from './Footer.module.css'

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div className="container-fluid-px">
        <div className={styles.footerTop}>
          
          <div className={styles.footerCol}>
            <h5 className={styles.colTitle}>COMPANY</h5>
            <ul className={styles.footerLinks}>
              <li><Link href="/">↗ HOME</Link></li>
              <li><Link href="/about">↗ ABOUT US</Link></li>
              <li><Link href="/team">↗ OUR TEAM</Link></li>
              <li><Link href="/projects">↗ PROJECTS</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerColCenter}>
            <h5 className={styles.colTitle}>REACH OUT TO US</h5>
            <a href="tel:+918527458950" className={styles.contactInfo}>+91 8527458950</a>
            <a href="mailto:info@thewebtycoons.com" className={styles.contactInfo}>info@thewebtycoons.com</a>
            <div className={styles.btnWrapper}>
              <Link href="/contact" className={styles.connectBtn}>
                Let's Connect ↗
              </Link>
            </div>
          </div>
          
          <div className={styles.footerColRight}>
            <h5 className={styles.colTitle}>SOCIAL</h5>
            <ul className={styles.footerLinksRight}>
              <li><a href="#">↗ LINKEDIN</a></li>
              <li><a href="#">↗ FACEBOOK</a></li>
              <li><a href="#">↗ INSTAGRAM</a></li>
            </ul>
          </div>
          
        </div>
        
        <div className={styles.footerMiddle}>
          <div className={styles.copyright}>&copy; 2026 ALL RIGHTS RESERVED</div>
          <div className={styles.location}>BASED IN INDIA 🇮🇳</div>
        </div>

        <div className={styles.footerBottom}>
          <div className={styles.bigBrandText}>
            {"WEBTYCOONS".split("").map((char, index) => (
              <span key={index} className={styles.brandChar}>{char}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
