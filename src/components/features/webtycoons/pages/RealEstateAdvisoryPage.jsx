'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  FaBuilding, 
  FaCity, 
  FaRocket, 
  FaChartLine, 
  FaCogs, 
  FaHandshake, 
  FaArrowRight, 
  FaCheckCircle, 
  FaChevronDown, 
  FaChevronUp,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaDesktop,
  FaCalculator,
  FaLock
} from 'react-icons/fa';
import RealEstateCalculator from '../sections/services/RealEstateCalculator';
import styles from './RealEstateAdvisoryPage.module.css';
import { fadeUp, staggerContainer, viewportOptions } from '../animations/variants';

// Icon resolver helper for dynamic pillars and verticals
const resolveIcon = (iconName, defaultIcon = FaChartLine) => {
  switch (iconName) {
    case 'FaChartLine': return FaChartLine;
    case 'FaDesktop': return FaDesktop;
    case 'FaCogs': return FaCogs;
    case 'FaBuilding': return FaBuilding;
    case 'FaCity': return FaCity;
    case 'FaRocket': return FaRocket;
    case 'FaHandshake': return FaHandshake;
    case 'FaPhoneAlt': return FaPhoneAlt;
    case 'FaEnvelope': return FaEnvelope;
    case 'FaGlobe': return FaGlobe;
    default: return defaultIcon;
  }
};

const defaultGrowthVerticals = [
  {
    id: 'gtm',
    title: 'Project Launch GTM Strategy',
    tag: 'For Builders & Developers',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
    desc: 'Complete digital launch playbooks to build intense pre-launch FOMO, drive initial bookings, and accelerate inventory absorption in under 60 days.',
    features: [
      'Pre-launch teaser & digital hype funnels',
      '3D architectural renders & virtual walkthroughs',
      'High-converting project landing page ecosystems',
      'Omnichannel buyer acquisition (Meta, Google, YouTube)'
    ],
    yield: 'Result: 70%+ Inventory Absorption'
  },
  {
    id: 'agency',
    title: 'Real Estate Agency & Broker Scaling',
    tag: 'For Agencies & Channel Partners',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    desc: 'Turn your real estate agency into an automated inbound lead powerhouse. We build localized acquisition funnels that keep your agents closing high-ticket deals.',
    features: [
      'Inbound buyer & seller lead generation',
      'Instant 60-second automated WhatsApp connect',
      'Automated site-visit booking & calendar reminders',
      'Lead qualification playbooks for sales reps'
    ],
    yield: 'Result: 3x Monthly Site Visits'
  },
  {
    id: 'cp',
    title: 'Channel Partner (CP) Network Systems',
    tag: 'Broker Network Automation',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop',
    desc: 'Build, manage, and scale a massive channel partner network with custom CP portals, automated commission trackers, and exclusive broker event marketing.',
    features: [
      'Custom Channel Partner login & asset portals',
      'Real-time lead mapping & transparent attribution',
      'Automated commission & slab milestone tracking',
      'CP engagement & broker meet event campaigns'
    ],
    yield: 'Result: 500+ Active Brokers Onboarded'
  },
  {
    id: 'nri',
    title: 'High-Ticket NRI Investor Funnels',
    tag: 'Global NRI Acquisition',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    desc: 'Target affluent overseas Indians in Dubai, US, UK, Singapore, and Canada with virtual 3D tour experiences and trust-building digital collateral.',
    features: [
      'High-intent international geo-targeting',
      'Virtual 3D immersive property tours & video walkthroughs',
      'NRI legal & repatriation objection-handling content',
      'High-converting WhatsApp Cloud API nurture'
    ],
    yield: 'Result: 14.8x Average ROAS'
  },
  {
    id: 'proptech',
    title: 'PropTech Web Portals & 3D Tech',
    tag: 'Custom Digital Infrastructure',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop',
    desc: 'Bespoke Next.js real estate web platforms with interactive master plans, unit availability selectors, and lightning-fast mobile performance.',
    features: [
      'Interactive 3D unit selector & floorplan viewer',
      'Integrated mortgage & EMI calculators',
      'Direct WhatsApp & CRM lead capture hooks',
      'Sub-second page load speeds for maximum ad conversions'
    ],
    yield: 'Result: 68% Higher Conversion Rate'
  },
  {
    id: 'seo',
    title: 'Local Territory Dominance SEO',
    tag: 'Organic Buyer Pipeline',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    desc: 'Dominate Google search results for micro-market keywords, project comparisons, and builder reviews in your target geographical territory.',
    features: [
      'Rank #1 for high-intent property buyer searches',
      'Google Business Profile & local map pack domination',
      'Project review & comparison pillar content',
      'Zero ongoing ad spend for organic buyer leads'
    ],
    yield: 'Result: Zero-CAC Organic Pipeline'
  }
];

const defaultScalingProcess = [
  {
    num: '01',
    title: 'Business & Funnel Audit',
    desc: 'We analyze your current lead costs, sales conversion bottlenecks, broker network, and digital assets to identify growth leakages.'
  },
  {
    num: '02',
    title: 'PropTech & Web Infrastructure',
    desc: 'We build high-speed project discovery portals, 3D interactive unit viewers, and frictionless lead capture pages.'
  },
  {
    num: '03',
    title: 'High-Ticket Lead Generation',
    desc: 'We launch precision-targeted Meta, Google, and YouTube ad campaigns targeting verified homebuyers and high-net-worth investors.'
  },
  {
    num: '04',
    title: 'Sales Automation & WhatsApp CRM',
    desc: 'We implement 60-second automated WhatsApp response bots, instant calling triggers, and automated site-visit reminder cadences.'
  },
  {
    num: '05',
    title: 'Channel Partner & Revenue Scale',
    desc: 'We scale your monthly booking volume, optimize marketing CPA, and expand your active channel partner reach.'
  }
];

const defaultComparisonData = [
  {
    feature: 'Industry Specialization',
    advisor: '100% Real Estate Domain Specialists: We understand project launches, RERA, CPs, and buyer psychology.',
    broker: 'Generic Marketing Agencies: Handle restaurants, dentists, and e-commerce with zero real estate domain insight.'
  },
  {
    feature: 'Lead Quality & Verification',
    advisor: 'Multi-step qualification funnels filtering out casual clickers, delivering verified site-visit ready buyers.',
    broker: 'Sends cheap, unqualified leads with invalid phone numbers that waste your sales team’s time.'
  },
  {
    feature: 'Sales Automation & Nurturing',
    advisor: 'Instant WhatsApp Cloud API integration, 60-second response triggers, and automated calendar scheduling.',
    broker: 'Dumps raw spreadsheet leads that get cold after 4 hours of delay.'
  },
  {
    feature: 'Channel Partner (CP) Strategy',
    advisor: 'Dedicated broker portals, automated commission trackers, and CP incentive program marketing.',
    broker: 'No channel partner systems or broker network capabilities.'
  },
  {
    feature: 'PropTech Engineering',
    advisor: 'Custom 3D virtual tour integrations, interactive unit selectors, and sub-second Next.js web portals.',
    broker: 'Slow, bloated generic WordPress templates that leak 50%+ of paid ad traffic.'
  }
];

const defaultFaqs = [
  {
    q: 'Do you sell properties or act as real estate brokers?',
    a: 'No, we are NOT property brokers and we do not sell properties directly. We are a specialized Real Estate Business Growth Advisory & PropTech firm. We advise builders, developers, real estate agencies, and channel partners on how to build digital systems, generate high-quality leads, automate their sales funnels, and scale their real estate business revenue.'
  },
  {
    q: 'How do you help real estate developers sell project inventory faster?',
    a: 'We design complete Go-To-Market (GTM) launch strategies, build high-converting 3D project web portals, run hyper-targeted digital ad campaigns (Meta, Google, YouTube), and implement automated WhatsApp/CRM follow-up systems that turn cold inquiries into verified on-site visits and bookings.'
  },
  {
    q: 'Can you help real estate agencies and brokers scale their lead generation?',
    a: 'Yes! We help property agencies and channel partners build automated inbound lead funnels, setup localized SEO to rank #1 in their target territory, and automate lead qualification so agents only spend time closing high-ticket buyers.'
  },
  {
    q: 'How quickly can we see an increase in qualified real estate leads?',
    a: 'Once your PropTech landing infrastructure and performance campaigns are launched (typically within 7 to 14 days), qualified inbound inquiries and site-visit requests begin generating immediately.'
  },
  {
    q: 'How do you prevent lead leakage in our sales team?',
    a: 'We integrate automated CRM and WhatsApp Cloud API pipelines that connect with your leads within 60 seconds of form submission. Our automated nurture cadences, reminder sequences, and call routing ensure no buyer falls through the cracks.'
  },
  {
    q: 'How do we get started with a business growth audit?',
    a: 'Simply request a growth consultation below. Our senior real estate growth strategists will analyze your current sales funnels, CPA, and inventory targets to deliver a customized scaling roadmap.'
  }
];

export default function RealEstateAdvisoryPage({ service = {} }) {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formState, setFormState] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    businessType: 'builder',
    monthlyBudget: '1-3lakh',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Extract dynamic data from DB object or fallbacks
  const rData = service.realEstateData || {};

  // 1. Hero Dynamic Data
  const heroBadge = rData.hero?.badge || 'Real Estate Growth & Scaling Advisory';
  const heroTitle = rData.hero?.title || service.title || 'Scale Your Real Estate Business with Strategic Growth & PropTech';
  const heroDescription = rData.hero?.subtitle || service.shortDesc || 'We do NOT sell properties or act as brokers. We advise real estate builders, developers, agencies, and channel partners on how to generate 10x high-ticket buyer leads, automate sales funnels, and scale business revenue.';
  const heroPrimaryBtn = rData.hero?.primaryBtnText || 'Request Growth Blueprint';
  const heroSecondaryBtn = rData.hero?.secondaryBtnText || 'Explore Services';
  const heroCalcBtn = rData.hero?.calcBtnText || 'Growth Calculator';
  const heroBgImage = rData.hero?.bgImage || service.breadcrumbImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop';

  // 2. Overview Dynamic Data
  const overviewLabel = rData.overview?.label || 'OUR SCALING STRATEGY';
  const overviewTitle = rData.overview?.title || 'How We Scale Real Estate Enterprises';
  const overviewDesc = rData.overview?.desc || service.description || 'Real estate growth requires more than random social media posts — it demands hyper-targeted buyer funnels, rapid lead follow-up automation, and world-class PropTech presentations.';
  const overviewImage = rData.overview?.image || service.overviewImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop';
  const floatingBadgeTitle = rData.overview?.floatingBadgeTitle || 'We Scale Real Estate Companies';
  const floatingBadgeText = rData.overview?.floatingBadgeText || 'From project launch campaigns and PropTech web portals to automated WhatsApp CRMs — we build predictable digital sales engines for builders and agencies.';
  const pillars = rData.overview?.pillars && rData.overview.pillars.length > 0 ? rData.overview.pillars : [
    {
      icon: 'FaChartLine',
      title: 'High-Ticket Buyer & Investor Lead Generation',
      desc: 'We design high-converting Meta, Google Search, and YouTube ad campaigns targeting affluent homebuyers, NRI investors, and commercial buyers with verified purchasing power.'
    },
    {
      icon: 'FaDesktop',
      title: 'High-Converting PropTech Web Portals & 3D Tech',
      desc: 'We build lightning-fast project landing pages, 3D interactive unit selectors, and virtual tour platforms that convert cold visitors into booked site visits.'
    },
    {
      icon: 'FaCogs',
      title: 'Automated WhatsApp & Sales CRM Funnels',
      desc: 'Eliminate lead leakage with automated 60-second WhatsApp responses, instant sales executive call connects, and automated site-visit reminder cadences.'
    }
  ];

  // 3. Verticals Dynamic Data
  const verticalsLabel = rData.verticals?.label || 'GROWTH SERVICES';
  const verticalsTitle = rData.verticals?.title || 'Tailored Solutions to Grow Your Real Estate Business';
  const verticalsDesc = rData.verticals?.desc || 'Whether you are a developer launching a ₹200Cr+ township, a real estate agency scaling broker closings, or expanding a channel partner network — we have the proven blueprint.';
  const verticalsList = rData.verticals?.items && rData.verticals.items.length > 0 
    ? rData.verticals.items 
    : (service.features && service.features.length > 0 ? service.features : defaultGrowthVerticals);

  // 4. Stats & Simulator Dynamic Data
  const statsList = rData.stats && rData.stats.length > 0 ? rData.stats : [
    { value: '150+', label: 'Real Estate Businesses Scaled' },
    { value: '10x', label: 'Average Lead Volume Growth' },
    { value: '₹2,500Cr+', label: 'Project Sales Marketed' },
    { value: '45%', label: 'Lower Cost Per Acquisition' }
  ];

  // 5. Process Dynamic Data
  const processLabel = rData.process?.label || 'OUR BLUEPRINT';
  const processTitle = rData.process?.title || 'The 5-Stage Business Scaling Framework';
  const processDesc = rData.process?.desc || 'Our battle-tested roadmap for real estate builders and agencies to achieve rapid inventory sales, lower acquisition costs, and predictable business scale.';
  const processList = rData.process?.items && rData.process.items.length > 0 
    ? rData.process.items 
    : (service.process && service.process.length > 0 ? service.process : defaultScalingProcess);

  // 6. Comparison Dynamic Data
  const comparisonLabel = rData.comparison?.label || 'WHY BUILDERS & AGENCIES CHOOSE US';
  const comparisonTitle = rData.comparison?.title || 'Real Estate Specialists vs. Generic Agencies';
  const comparisonDesc = rData.comparison?.desc || 'Why standard digital marketing agencies fail in real estate, and how our domain-specific growth systems deliver exponential ROI.';
  const comparisonList = rData.comparison?.items && rData.comparison.items.length > 0 
    ? rData.comparison.items 
    : defaultComparisonData;

  // 7. Contact / Lead Dynamic Data
  const contactLabel = rData.contact?.label || 'GROWTH AUDIT';
  const contactTitle = rData.contact?.title || 'Ready to Scale Your Real Estate Business?';
  const contactDesc = rData.contact?.desc || 'Book a strategic discovery call with our senior real estate growth strategists to audit your lead costs, PropTech funnels, and inventory targets.';
  const contactPhone = rData.contact?.phone || '+91 8527458950';
  const contactEmail = rData.contact?.email || 'info@thewebtycoons.com';
  const contactLocation = rData.contact?.location || '123, Digital Hub, Sector 18, Noida, UP — 201301';
  const contactTerritories = rData.contact?.territories || 'Delhi NCR, Mumbai, Bangalore, Dubai & Global NRIs';
  const formCardTitle = rData.contact?.formTitle || 'Request Real Estate Growth Audit';
  const formCardSubtitle = rData.contact?.formSubtitle || 'Fill out the form below and we will prepare a tailored scaling blueprint for your firm.';

  // 8. FAQ Dynamic Data
  const faqsLabel = rData.faqs?.label || 'CLEAR ANSWERS';
  const faqsTitle = rData.faqs?.title || 'Frequently Asked Questions';
  const faqsDesc = rData.faqs?.desc || 'Understand how our growth advisory, PropTech digital infrastructure, and lead generation funnels work for real estate firms.';
  const faqsList = rData.faqs?.items && rData.faqs.items.length > 0 
    ? rData.faqs.items 
    : (service.faq && service.faq.length > 0 ? service.faq.map(f => ({ q: f.question, a: f.answer })) : defaultFaqs);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* ── 1. Compact Hero Banner (Dynamic & Matches About Page) ── */}
      <section className={styles.heroSection}>
        <div className={styles.heroBgImage} style={{ backgroundImage: `url(${heroBgImage})` }} />
        <div className={styles.heroGridOverlay} />

        <div className="container-fluid-px">
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Clean Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Link href="/">Home</Link> / <Link href="/#services">Services</Link> / <span>Real Estate Advisory</span>
            </div>

            {/* Specialization Badge */}
            <div className={styles.heroBadge}>
              <span className={styles.pulseDot} />
              {heroBadge}
            </div>

            {/* Hero Title */}
            <h1 className={styles.heroTitle}>
              {heroTitle.includes('Strategic Growth') ? (
                <>Scale Your Real Estate Business with <span className={styles.accent}>Strategic Growth &amp; PropTech</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: heroTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h1>

            {/* Hero Subtitle */}
            <p className={styles.heroDescription}>
              {heroDescription}
            </p>

            {/* Action Buttons */}
            <div className={styles.heroActionGroup}>
              <a href="#consultation" className={styles.btnPrimary}>
                {heroPrimaryBtn} <FaArrowRight />
              </a>
              <a href="#verticals" className={styles.btnSecondary}>
                {heroSecondaryBtn}
              </a>
              <a href="#roi-calculator" className={styles.btnSecondary}>
                <FaCalculator style={{ color: '#6bc24b' }} /> {heroCalcBtn}
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── 2. Executive Overview (Dynamic) ── */}
      <section className={`${styles.section} ${styles.sectionDarker}`} id="overview">
        <div className="container-fluid-px">
          <div className={styles.overviewGrid}>
            
            {/* Left Column: Image with Floating Badge */}
            <motion.div 
              className={styles.overviewImageWrap}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
              variants={fadeUp}
            >
              <img 
                src={overviewImage} 
                alt={overviewTitle} 
                className={styles.overviewImg}
              />
              <div className={styles.floatingCardBadge}>
                <div className={styles.floatingBadgeTitle}>
                  <FaRocket /> {floatingBadgeTitle}
                </div>
                <p className={styles.floatingBadgeText}>
                  {floatingBadgeText}
                </p>
              </div>
            </motion.div>

            {/* Right Column: Strategic Pillars */}
            <motion.div 
              className={styles.overviewContent}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOptions}
            >
              <div>
                <span className={styles.sectionLabel}>{overviewLabel}</span>
                <h2 className={styles.sectionTitle}>
                  {overviewTitle}
                </h2>
                <p className={styles.sectionDesc}>
                  {overviewDesc}
                </p>
              </div>

              {pillars.map((pillar, idx) => {
                const IconComponent = resolveIcon(pillar.icon);
                return (
                  <div key={idx} className={styles.overviewPillarCard}>
                    <div className={styles.pillarHeader}>
                      <div className={styles.pillarIcon}><IconComponent /></div>
                      <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    </div>
                    <p className={styles.pillarDesc}>
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}

            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. Specialist Growth Verticals (Dynamic) ── */}
      <section className={styles.section} id="verticals">
        <div className="container-fluid-px">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{verticalsLabel}</span>
            <h2 className={styles.sectionTitle}>
              {verticalsTitle.includes('Grow Your') ? (
                <>Tailored Solutions to <span className={styles.accent}>Grow Your Real Estate Business</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: verticalsTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h2>
            <p className={styles.sectionDesc}>
              {verticalsDesc}
            </p>
          </div>

          <motion.div 
            className={styles.verticalsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {verticalsList.map((vertical, idx) => (
              <motion.div key={vertical.id || idx} variants={fadeUp} className={styles.verticalCard}>
                <div className={styles.verticalCardImgWrap}>
                  <img src={vertical.image || vertical.icon || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop'} alt={vertical.title} className={styles.verticalCardImg} />
                  {vertical.tag && <span className={styles.verticalCardTag}>{vertical.tag}</span>}
                </div>
                
                <div className={styles.verticalCardBody}>
                  <div>
                    <h3 className={styles.verticalCardTitle}>{vertical.title}</h3>
                    <p className={styles.verticalCardText}>{vertical.desc}</p>
                    
                    {Array.isArray(vertical.features) && vertical.features.length > 0 && (
                      <ul className={styles.verticalFeaturesList}>
                        {vertical.features.map((feat, i) => (
                          <li key={i} className={styles.verticalFeatureItem}>
                            <FaCheckCircle className={styles.checkIcon} />
                            <span>{typeof feat === 'string' ? feat : feat.title || feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className={styles.verticalCardFooter}>
                    <span className={styles.yieldText}>{vertical.yield || 'High ROI Blueprint'}</span>
                    <a href="#consultation" className={styles.inquireLink}>
                      Scale This <FaArrowRight />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 4. Interactive Growth Simulator & Dynamic Stats ── */}
      <RealEstateCalculator stats={statsList} />

      {/* ── 5. 5-Stage Scaling Methodology (Dynamic) ── */}
      <section className={`${styles.section} ${styles.sectionDarker}`} id="methodology">
        <div className="container-fluid-px">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{processLabel}</span>
            <h2 className={styles.sectionTitle}>
              {processTitle.includes('Framework') ? (
                <>The 5-Stage <span className={styles.accent}>Business Scaling Framework</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: processTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h2>
            <p className={styles.sectionDesc}>
              {processDesc}
            </p>
          </div>

          <motion.div 
            className={styles.processTimeline}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
          >
            {processList.map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} className={styles.processStepCard}>
                <div>
                  <div className={styles.processStepNum}>{step.num || step.step || `0${idx + 1}`}</div>
                  <h3 className={styles.processStepTitle}>{step.title}</h3>
                  <p className={styles.processStepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── 6. Comparison Matrix (Dynamic) ── */}
      <section className={styles.section} id="comparison">
        <div className="container-fluid-px">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{comparisonLabel}</span>
            <h2 className={styles.sectionTitle}>
              {comparisonTitle.includes('Specialists') ? (
                <>Real Estate Specialists <span className={styles.accent}>vs. Generic Agencies</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: comparisonTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h2>
            <p className={styles.sectionDesc}>
              {comparisonDesc}
            </p>
          </div>

          <motion.div 
            className={styles.comparisonContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            variants={fadeUp}
          >
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>Key Capability</th>
                  <th className={styles.thHighlighted} style={{ width: '40%' }}>✨ WebTycoons Real Estate Advisory</th>
                  <th style={{ width: '35%' }}>Generic Digital Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonList.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.comparisonFeature}>{row.feature}</td>
                    <td className={styles.tdHighlighted}>{row.advisor}</td>
                    <td className={styles.traditionalBrokerText}>{row.broker}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

        </div>
      </section>

      {/* ── 7. Growth Consultation Form (Dynamic & Matches Website Contact Page Design) ── */}
      <section className={styles.section} id="consultation">
        <div className="container-fluid-px">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{contactLabel}</span>
            <h2 className={styles.sectionTitle}>
              {contactTitle.includes('Scale Your') ? (
                <>Ready to <span className={styles.accent}>Scale Your Real Estate Business?</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: contactTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h2>
            <p className={styles.sectionDesc}>
              {contactDesc}
            </p>
          </div>

          <div className={styles.contactGrid}>
            
            {/* Left: Info Side */}
            <motion.div 
              className={styles.infoSide}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className={styles.infoHeader}>
                <h3>Get In Touch</h3>
                <p>We are here to help real estate builders, developers, and agencies scale sales volume. Connect with our dedicated advisory desk.</p>
              </motion.div>

              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><FaPhoneAlt /></div>
                <div>
                  <h4>Call Us Directly</h4>
                  <p>{contactPhone}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><FaEnvelope /></div>
                <div>
                  <h4>Email Inquiries</h4>
                  <p>{contactEmail}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><FaGlobe /></div>
                <div>
                  <h4>Office Location</h4>
                  <p>{contactLocation}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className={styles.infoCard}>
                <div className={styles.infoIcon}><FaBuilding /></div>
                <div>
                  <h4>Territories Covered</h4>
                  <p>{contactTerritories}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form Side */}
            <motion.div 
              className={styles.formSide}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <div className={styles.successBox}>
                  <FaCheckCircle className={styles.successIcon} />
                  <h3>Growth Audit Requested!</h3>
                  <p>Thank you, {formState.name} from {formState.companyName || 'your company'}. A senior real estate growth strategist will contact you within 2 business hours.</p>
                  <button 
                    type="button" 
                    className="btnPrimary mt-4"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', companyName: '', phone: '', email: '', businessType: 'builder', monthlyBudget: '1-3lakh', message: '' });
                    }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div className={styles.formCard}>
                  <h3 className={styles.formCardTitle}>{formCardTitle}</h3>
                  <p className={styles.formCardSubtitle}>{formCardSubtitle}</p>

                  <form onSubmit={handleSubmit} className={styles.contactForm}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>FULL NAME *</label>
                        <input 
                          type="text" 
                          name="name" 
                          required 
                          placeholder="e.g. Siddharth Verma"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>COMPANY / AGENCY NAME *</label>
                        <input 
                          type="text" 
                          name="companyName" 
                          required 
                          placeholder="e.g. Grandeur Developers"
                          value={formState.companyName}
                          onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>PHONE / WHATSAPP *</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          required 
                          placeholder="+91 98765 43210"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>WORK EMAIL *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          placeholder="siddharth@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>BUSINESS MODEL *</label>
                        <select 
                          value={formState.businessType}
                          onChange={(e) => setFormState({ ...formState, businessType: e.target.value })}
                        >
                          <option value="builder">Builder / Real Estate Developer</option>
                          <option value="agency">Real Estate Agency / Channel Partner</option>
                          <option value="commercial">Commercial / Pre-Leased Specialist</option>
                          <option value="luxury">Luxury Real Estate Brokerage</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label>MONTHLY AD / GROWTH BUDGET</label>
                        <select 
                          value={formState.monthlyBudget}
                          onChange={(e) => setFormState({ ...formState, monthlyBudget: e.target.value })}
                        >
                          <option value="50k-1lakh">₹50,000 – ₹1 Lakh / month</option>
                          <option value="1-3lakh">₹1 Lakh – ₹3 Lakh / month</option>
                          <option value="3-8lakh">₹3 Lakh – ₹8 Lakh / month</option>
                          <option value="8lakh+">₹8 Lakh+ / month (Mega Project Launch)</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>SCALING GOALS / SPECIFIC REQUIREMENTS</label>
                      <textarea 
                        rows="3"
                        placeholder="Tell us about your upcoming project launches, current cost per lead, or sales challenges..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      <FaLock /> Claim Custom Business Growth Blueprint
                    </button>
                  </form>
                </div>
              )}
            </motion.div>

          </div>

        </div>
      </section>

      {/* ── 8. FAQs (Dynamic) ── */}
      <section className={`${styles.section} ${styles.sectionDarker}`} id="faqs">
        <div className="container-fluid-px">
          
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>{faqsLabel}</span>
            <h2 className={styles.sectionTitle}>
              {faqsTitle.includes('Questions') ? (
                <>Frequently Asked <span className={styles.accent}>Questions</span></>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: faqsTitle.replace(/\*(.*?)\*/g, '<span class="accent">$1</span>') }} />
              )}
            </h2>
            <p className={styles.sectionDesc}>
              {faqsDesc}
            </p>
          </div>

          <div className={styles.faqAccordion}>
            {faqsList.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemActive : ''}`}>
                  <button 
                    type="button" 
                    className={styles.faqQuestion} 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q || faq.question}</span>
                    {isOpen ? <FaChevronUp className={styles.faqChevron} /> : <FaChevronDown className={styles.faqChevron} />}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className={styles.faqAnswer}
                      >
                        {faq.a || faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
