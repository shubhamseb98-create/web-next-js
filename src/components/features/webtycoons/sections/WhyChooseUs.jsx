'use client';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, staggerItem, viewportOptions } from '../animations/variants';
import styles from '../../../../css/webtycoons/WhyChooseUs.module.css';
import Image from 'next/image';
import { 
  Layout, 
  MonitorSmartphone, 
  SearchCheck, 
  Zap, 
  Sliders, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react';

const defaultFeatures = [
  {
    title: 'Great User Interface',
    desc: 'A website must be designed with an intuitive, human-centered UI/UX at its core. As a premier website designing company in Delhi, we engineer visually captivating and effortless user journeys that maximize conversions.',
    tag: 'Intuitive UI/UX',
    icon: Layout,
    number: '01'
  },
  {
    title: 'Responsive for All Browsers',
    desc: 'With WebTycoons, you can ensure that your website functions seamlessly across all modern browsers (Chrome, Safari, Firefox, Edge) and fluidly adapts to every screen size, smartphone, tablet, and desktop.',
    tag: 'Cross-Platform',
    icon: MonitorSmartphone,
    number: '02'
  },
  {
    title: 'Optimized for SEO Standards',
    desc: 'Search visibility is paramount for every digital brand. We architect clean semantic code, optimized headings, schema markup, and metadata from day one to ensure high search engine rankings.',
    tag: 'Search Optimized',
    icon: SearchCheck,
    number: '03'
  },
  {
    title: 'Fastest Loading Speed',
    desc: 'A superior website means clean code, optimized queries, lightweight assets, and next-gen compression to deliver lightning-fast, sub-second load times that keep visitors engaged.',
    tag: 'Sub-Second Speed',
    icon: Zap,
    number: '04'
  },
  {
    title: 'Easy to Maintain & Manage',
    desc: 'Website maintenance shouldn\'t require technical headaches. We build intuitive, secure admin panels so business owners can update content, banners, and media effortlessly in just a few clicks.',
    tag: 'Effortless CMS',
    icon: Sliders,
    number: '05'
  },
  {
    title: 'More Flexibility & Scalability',
    desc: 'We deliver robust, flexible platforms tailored for growth. Enjoy complete operational freedom with easy third-party integrations, custom dashboards, and high-performance scalability as your business expands.',
    tag: 'Infinite Scale',
    icon: Layers,
    number: '06'
  }
];

const fallbackIcons = [Layout, MonitorSmartphone, SearchCheck, Zap, Sliders, Layers];
const fallbackTags = ['Intuitive UI/UX', 'Cross-Platform', 'Search Optimized', 'Sub-Second Speed', 'Effortless CMS', 'Infinite Scale'];

const WhyChooseUs = ({ whyChooseData, homeExtraData }) => {
  const activeItems = Array.isArray(whyChooseData) && whyChooseData.length > 0
    ? whyChooseData.filter(item => (item.status ? item.status === 'active' : true))
    : [];

  const displayItems = activeItems.length > 0 ? activeItems : defaultFeatures;

  const sectionLabel = homeExtraData?.choose_subtitle || 'Why Choose WebTycoons';
  const rawTitle = homeExtraData?.choose_title || 'What Makes Us Great as a *Best Website Designing Company* in Delhi?';
  const sectionDesc = homeExtraData?.choose_description || 'Before creating a website we think by putting ourselves in your customer\'s shoes. The process starts with strategic discussion followed by meticulous conceptualization to engineer the perfect high-converting web project.';

  // Format title: wrap words with *asterisks* in titleHighlight, or highlight 'Best Website Designing Company'
  const renderTitle = (text) => {
    if (!text) return null;
    const parts = text.split('*');
    if (parts.length > 1) {
      return parts.map((part, i) => 
        i % 2 === 1 ? (
          <span key={i} className={styles.titleHighlight}>{part}</span>
        ) : (
          part
        )
      );
    }
    if (text.includes('Best Website Designing Company')) {
      const sub = text.split('Best Website Designing Company');
      return (
        <>
          {sub[0]}
          <span className={styles.titleHighlight}>Best Website Designing Company</span>
          {sub[1]}
        </>
      );
    }
    return text;
  };

  // Mouse move handler for spotlight effect on cards
  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    currentTarget.style.setProperty('--mouse-x', `${clientX - left}px`);
    currentTarget.style.setProperty('--mouse-y', `${clientY - top}px`);
  };

  return (
    <section className={styles.section} id="why-choose-us">
      <div className={styles.ambientGlowTop} />
      <div className={styles.gridPattern} />

      <div className="container-fluid-px">
        {/* Section Header */}
        <motion.div 
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          <div className={styles.badgePill}>
            <span className={styles.beaconDot} />
            <span>{sectionLabel}</span>
          </div>

          <h2 className={styles.mainTitle}>
            {renderTitle(rawTitle)}
          </h2>

          <div 
            className={styles.headerText}
            dangerouslySetInnerHTML={{ __html: sectionDesc }}
          />
        </motion.div>

        {/* 6 Cards Grid with Spotlight */}
        <motion.div 
          className={styles.gridContainer}
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
        >
          {displayItems.map((item, index) => {
            const IconComponent = item.icon && typeof item.icon !== 'string' 
              ? item.icon 
              : fallbackIcons[index % fallbackIcons.length];
            const isImage = typeof item.icon === 'string' && (item.icon.startsWith('http') || item.icon.startsWith('/'));
            const numStr = String(index + 1).padStart(2, '0');
            const tag = item.tag || fallbackTags[index % fallbackTags.length];
            const content = item.content || item.desc || '';

            return (
              <motion.div 
                key={item._id || item.id || index}
                className={styles.card}
                variants={staggerItem}
                onMouseMove={handleMouseMove}
              >
                {/* Large Background Watermark Number */}
                <span className={styles.watermarkNumber} aria-hidden="true">
                  {numStr}
                </span>

                {/* Top Row: Icon + Badge */}
                <div className={styles.cardTop}>
                  <div className={styles.iconBox}>
                    {isImage ? (
                      <Image 
                        src={item.icon} 
                        alt={item.title || 'Feature'} 
                        width={32} 
                        height={32} 
                        className="object-contain" 
                      />
                    ) : (
                      <IconComponent size={28} strokeWidth={1.8} />
                    )}
                  </div>
                  <span className={styles.badgeNumber}>{numStr}</span>
                </div>

                {/* Card Title & Description */}
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div 
                  className={styles.cardDesc} 
                  dangerouslySetInnerHTML={{ __html: content }} 
                />

                {/* Footer with Tag and Arrow */}
                <div className={styles.cardFooter}>
                  <span className={styles.featureTag}>{tag}</span>
                  <div className={styles.arrowCircle}>
                    <ArrowUpRight size={17} strokeWidth={2.2} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
