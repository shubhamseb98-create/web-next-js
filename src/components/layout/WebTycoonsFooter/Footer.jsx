import Link from 'next/link';
import styles from './Footer.module.css';
import GlobalSetting from "src/app/models/GlobalSetting";
import { connectDB } from "src/app/lib/config";

const Footer = async () => {
  let settings = null;
  try {
    await connectDB();
    settings = await GlobalSetting.findOne().lean();
  } catch (error) {
    console.error("Error fetching global settings for footer:", error);
  }

  // Filter active social links from DB or fallback to defaults
  const dynamicSocialLinks = settings?.socialLinks?.filter(link => link.isActive !== false) || [
    { platform: "LINKEDIN", url: "https://linkedin.com/company/thewebtycoons" },
    { platform: "FACEBOOK", url: "https://facebook.com/thewebtycoons" },
    { platform: "INSTAGRAM", url: "https://instagram.com/thewebtycoons" }
  ];

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
            <a href={`tel:${settings?.footerPhone || "+918527458950"}`} className={styles.contactInfo}>{settings?.footerPhone || "+91 8527458950"}</a>
            <a href={`mailto:${settings?.primaryEmail || "info@thewebtycoons.com"}`} className={styles.contactInfo}>{settings?.primaryEmail || "info@thewebtycoons.com"}</a>
            <div className={styles.btnWrapper}>
              <Link href="/contact" className={styles.connectBtn}>
                Let's Connect ↗
              </Link>
            </div>
          </div>
          
          <div className={styles.footerColRight}>
            <h5 className={styles.colTitle}>SOCIAL</h5>
            <ul className={styles.footerLinksRight}>
              {dynamicSocialLinks.map((social, index) => (
                <li key={index}>
                  <a href={social.url || social.href || "#"} target="_blank" rel="noopener noreferrer">
                    ↗ {social.platform?.toUpperCase() || social.name?.toUpperCase() || "LINK"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <div className={styles.footerMiddle}>
          <div className={styles.copyright}>&copy; {new Date().getFullYear()} ALL RIGHTS RESERVED</div>
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

export default Footer;
