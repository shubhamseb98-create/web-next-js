// Shared default header navigation items for both Server & Client
export const DEFAULT_HEADER_ITEMS = [
  // ── Tier 1: Corporate / Top Utility Bar ──
  {
    name: 'Home',
    path: '/',
    order: 1,
    tier: 'topNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Brand Story',
    path: '/about',
    order: 2,
    tier: 'topNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Projects',
    path: '/projects',
    order: 3,
    tier: 'topNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Blog',
    path: '/blog',
    order: 4,
    tier: 'topNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Contact Us',
    path: '/contact',
    order: 5,
    tier: 'topNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: true,
    ctaAction: 'modal',
    subItems: []
  },

  // ── Tier 2: Dedicated Services Bar (Matching Client 13 Points) ──
  {
    name: 'Website Designing',
    path: '/services/website-designing',
    order: 1,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: true,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: [
      { label: 'Static Website Designing', path: '/services/static-website-development', order: 1, isActive: true, openInNewTab: false },
      { label: 'Dynamic Website Designing', path: '/services/dynamic-website-development', order: 2, isActive: true, openInNewTab: false },
      { label: 'Ecommerce Website Designing', path: '/services/e-commerce-website-development', order: 3, isActive: true, openInNewTab: false },
    ]
  },
  {
    name: 'Software Development',
    path: '/services/software-development',
    order: 2,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Social Media',
    path: '/services/social-media-marketing',
    order: 3,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: true,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: [
      { label: 'Facebook Promotion', path: '/services/facebook-promotion', order: 1, isActive: true, openInNewTab: false },
      { label: 'Meta Ads & Campaign', path: '/services/meta-ads-campaign', order: 2, isActive: true, openInNewTab: false },
      { label: 'Instagram Growth & Reels', path: '/services/instagram-growth', order: 3, isActive: true, openInNewTab: false },
    ]
  },
  {
    name: 'Digital Marketing',
    path: '/services/digital-marketing',
    order: 4,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: true,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: [
      { label: 'Search Engine Optimization (SEO)', path: '/services/search-engine-optimization', order: 1, isActive: true, openInNewTab: false },
      { label: 'Lead Generation Ads', path: '/services/lead-generation-ads', order: 2, isActive: true, openInNewTab: false },
      { label: 'Banner Ads Design & Media', path: '/services/banner-ads', order: 3, isActive: true, openInNewTab: false },
    ]
  },
  {
    name: 'Ecommerce',
    path: '/services/ecommerce-solution',
    order: 5,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: []
  },
  {
    name: 'Domain & Hosting',
    path: '/services/domain',
    order: 6,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: true,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: [
      { label: 'Domain Registration', path: '/services/domain', order: 1, isActive: true, openInNewTab: false },
      { label: 'Web Hosting Solutions', path: '/services/hosting-solution', order: 2, isActive: true, openInNewTab: false },
      { label: 'Business Email Solutions', path: '/services/email-solution', order: 3, isActive: true, openInNewTab: false },
    ]
  },
  {
    name: 'Media & Tech',
    path: '/products',
    order: 7,
    tier: 'servicesNav',
    isActive: true,
    hasDropdown: true,
    openInNewTab: false,
    isSpecialCta: false,
    subItems: [
      { label: 'CRM Solutions', path: '/products', order: 1, isActive: true, openInNewTab: false },
      { label: 'AI Videos & Reels', path: '/services/ai-videos', order: 2, isActive: true, openInNewTab: false },
      { label: 'Web Security & SSL', path: '/services/web-security', order: 3, isActive: true, openInNewTab: false },
      { label: 'Podcast Production', path: '/services/podcast', order: 4, isActive: true, openInNewTab: false },
      { label: 'Video Shoot & Production', path: '/services/video-shoot', order: 5, isActive: true, openInNewTab: false },
    ]
  }
];
