// Comprehensive default seed data for all new client services
export const NEW_SERVICES_DEFAULTS = [
  // ── 1. Static Website Development ──
  {
    title: 'Static Website Designing',
    slug: 'static-website-development',
    shortDesc: 'Lightning-fast, ultra-secure static websites built with modern frameworks and JAMstack architecture.',
    description: 'We design and develop blazing-fast static websites using cutting-edge JAMstack technology. Static sites offer unparalleled performance, rock-solid security, near-zero server maintenance, and lower hosting costs.',
    overviewWhatIsIt: 'A static website delivers pre-rendered HTML, CSS, and JavaScript directly to the browser. Without needing server-side database queries, these sites offer unparalleled speed, security, and 100% uptime reliability.',
    overviewWhoNeedsIt: 'Perfect for business portfolios, high-converting landing pages, corporate informational sites, and consulting brands that demand ultra-fast page speeds.',
    overviewWhyChooseUs: 'We craft static websites with modern frameworks and pixel-perfect design, ensuring your online presence achieves 99+ Google PageSpeed scores.',
    icon: '🚀',
    image: '/assets/img/homeservice/service3.svg',
    breadcrumbImage: '/assets/img/homeservice/service3.svg',
    overviewImage: '/assets/img/homeservice/service3.svg',
    status: 'active',
    isFeatured: true,
    sort: 1,
    features: [
      { title: 'Lightning Fast Load Speed', desc: 'Pre-rendered pages loaded instantly via global CDN edge servers.', icon: '⚡' },
      { title: 'Zero Database Vulnerabilities', desc: 'No SQL databases to hack, providing impenetrable enterprise security.', icon: '🛡️' },
      { title: 'Perfect Core Web Vitals', desc: 'Optimized for 95+ Google PageSpeed and Lighthouse benchmarks.', icon: '📈' },
      { title: 'Mobile-First Responsive Layouts', desc: 'Pixel-perfect rendering across smartphones, tablets, and desktops.', icon: '📱' },
      { title: 'SEO Optimized Semantic Markup', desc: 'Clean HTML5 structure, automated meta tags, and structured schema data.', icon: '🔍' },
      { title: 'Low Cost Global Edge Hosting', desc: 'Deploy globally on AWS, Cloudflare, or Vercel with near-zero running costs.', icon: '🌐' }
    ],
    benefits: [
      { title: 'Sub-second Load Times', desc: 'Instantly captivate visitors before they bounce.' },
      { title: 'Rock-Solid Security', desc: 'Eliminate 99% of CMS exploits and database injections.' },
      { title: 'Maximized Conversion Rate', desc: 'Faster pages convert up to 3x higher than sluggish sites.' }
    ],
    faq: [
      { question: 'What is a static website?', answer: 'A static website consists of pre-compiled web pages delivered instantly to users from edge servers without database processing delays.' },
      { question: 'Can I rank on Google with a static site?', answer: 'Yes! In fact, static websites rank exceptionally well on Google because page speed and Core Web Vitals are major search ranking factors.' },
      { question: 'How can I update content in the future?', answer: 'We connect your static site with our intuitive admin dashboard CMS so you can update text and images anytime without coding.' }
    ],
    process: [
      { step: '01', title: 'Strategy & Wireframing', desc: 'Understanding your business proposition and planning conversion layouts.' },
      { step: '02', title: 'UI/UX High-Fidelity Design', desc: 'Crafting bespoke Figma mockups aligned with your brand identity.' },
      { step: '03', title: 'Performance Engineering', desc: 'Developing clean semantic code with optimized assets and animations.' },
      { step: '04', title: 'Testing & Global Deployment', desc: 'Full cross-browser testing and publishing to global CDN networks.' }
    ]
  },

  // ── 2. Dynamic Website Development ──
  {
    title: 'Dynamic Website Designing',
    slug: 'dynamic-website-development',
    shortDesc: 'Powerful CMS-driven dynamic websites with interactive user experiences and custom admin dashboards.',
    description: 'Our dynamic websites are engineered with robust backend architectures and intuitive content management systems, enabling you to manage dynamic content, user authentication, interactive workflows, and scale your business effortlessly.',
    overviewWhatIsIt: 'Dynamic websites generate content in real-time using databases and API logic, allowing for automated updates, user logins, filtering, booking engines, and interactive portals.',
    overviewWhoNeedsIt: 'Ideal for corporate companies, media publishers, real estate portals, educational institutes, and brands that need regular content updates.',
    overviewWhyChooseUs: 'We deliver tailored web applications with fast database queries, zero-lag rendering, and completely customized administrative controls.',
    icon: '⚡',
    image: '/assets/img/homeservice/service1.webp',
    breadcrumbImage: '/assets/img/homeservice/service1.webp',
    overviewImage: '/assets/img/homeservice/service1.webp',
    status: 'active',
    isFeatured: true,
    sort: 2,
    features: [
      { title: 'Custom Admin Dashboard CMS', desc: 'Easily add, edit, or delete pages, blogs, and media with zero coding.', icon: '🎛️' },
      { title: 'Interactive User Portals', desc: 'Secure user login, registration, role-based permissions, and profiles.', icon: '👤' },
      { title: 'Real-Time Database Queries', desc: 'Instant search filters, live sorting, and automated form processing.', icon: '⚡' },
      { title: 'Third-Party API Integrations', desc: 'Seamless connections with CRMs, payment gateways, and WhatsApp webhooks.', icon: '🔗' },
      { title: 'Scalable Cloud Architecture', desc: 'Built to handle thousands of concurrent visitors with zero downtime.', icon: '☁️' },
      { title: 'Automated Backup Systems', desc: 'Scheduled cloud database backups ensuring your data is always safe.', icon: '💾' }
    ],
    benefits: [
      { title: 'Full Control Over Content', desc: 'Update pages, blogs, and banners anytime from your phone or PC.' },
      { title: 'Enhanced Customer Engagement', desc: 'Interactive forms, dynamic calculators, and user account portals.' },
      { title: 'Ready for Business Growth', desc: 'Easily expand with new features as your customer base multiplies.' }
    ],
    faq: [
      { question: 'What makes a website dynamic?', answer: 'A dynamic website stores content in a database and generates pages dynamically based on user requests, logins, or search criteria.' },
      { question: 'Is training provided to use the admin dashboard?', answer: 'Yes! We provide complete video tutorials and personal walkthroughs so your team can easily manage the website.' }
    ],
    process: [
      { step: '01', title: 'Requirement Architecture', desc: 'Mapping database schemas, user roles, and business workflows.' },
      { step: '02', title: 'Prototype & UI Design', desc: 'Creating responsive interfaces tailored for intuitive user journeys.' },
      { step: '03', title: 'Fullstack Development', desc: 'Connecting frontend UI with secure REST APIs and MongoDB backend.' },
      { step: '04', title: 'Launch & Training', desc: 'Deploying to production and training your staff on CMS management.' }
    ]
  },

  // ── 3. Ecommerce Website Development ──
  {
    title: 'Ecommerce Website Designing',
    slug: 'e-commerce-website-development',
    shortDesc: 'High-converting online stores, seamless multi-currency checkout, and complete inventory management systems.',
    description: 'We engineer turnkey eCommerce stores designed to turn curious visitors into repeat paying customers. From frictionless checkout funnels to payment gateway integrations and inventory sync, we handle every detail.',
    overviewWhatIsIt: 'A full-featured digital storefront equipped with product catalogs, shopping carts, automated discounts, payment processing, invoice generation, and courier tracking.',
    overviewWhoNeedsIt: 'Direct-to-consumer (D2C) brands, retailers, wholesalers, and entrepreneurs looking to sell physical or digital goods online 24/7.',
    overviewWhyChooseUs: 'Our eCommerce architectures are engineered around conversion rate optimization (CRO), fast mobile checkouts, and seamless payment reliability.',
    icon: '🛒',
    image: '/assets/img/homeservice/service4.webp',
    breadcrumbImage: '/assets/img/homeservice/service4.webp',
    overviewImage: '/assets/img/homeservice/service4.webp',
    status: 'active',
    isFeatured: true,
    sort: 3,
    features: [
      { title: 'Frictionless Mobile Checkout', desc: 'Single-page quick checkout designed to slash cart abandonment.', icon: '🛍️' },
      { title: 'Multi-Gateway Payment Integration', desc: 'Razorpay, Stripe, UPI, Credit Cards, Netbanking, and COD support.', icon: '💳' },
      { title: 'Smart Inventory & Variant Control', desc: 'Manage stock levels, sizes, colors, and SKU codes automatically.', icon: '📦' },
      { title: 'Automated Invoice & Tax Generation', desc: 'GST-ready automated invoice generation sent directly to customer email.', icon: '🧾' },
      { title: 'Order Tracking & Courier APIs', desc: 'Integration with Shiprocket, Delhivery, and automated WhatsApp tracking.', icon: '🚚' },
      { title: 'Abandoned Cart Recovery Funnels', desc: 'Automated SMS, email, and WhatsApp reminders to win back lost sales.', icon: '🔄' }
    ],
    benefits: [
      { title: 'Sell 24/7 Globally', desc: 'Your store never closes, accepting orders and payments round the clock.' },
      { title: 'Higher Average Order Value', desc: 'Smart upsells, cross-sells, and bundled product discounts.' },
      { title: 'Effortless Logistics', desc: 'Automated dispatch slips and courier integration.' }
    ],
    faq: [
      { question: 'Which payment gateways can be integrated?', answer: 'We support all major Indian and international gateways including Razorpay, Cashfree, Stripe, PayU, and PayPal.' },
      { question: 'Is my customer transaction data secure?', answer: 'Yes, 100%. We implement 256-bit SSL encryption, tokenized checkout, and PCI-DSS compliant payment processing.' }
    ],
    process: [
      { step: '01', title: 'Store Strategy', desc: 'Product taxonomy, payment options, and shipping rules planning.' },
      { step: '02', title: 'Conversion-First Design', desc: 'Designing product pages and checkout flows optimized for high sales.' },
      { step: '03', title: 'Payment & API Setup', desc: 'Configuring payment gateways, shipping APIs, and security certificates.' },
      { step: '04', title: 'Testing & Launch', desc: 'Running test orders, checking edge cases, and going live.' }
    ]
  },

  // ── 4. Social Media Marketing ──
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    shortDesc: 'Strategic social media management, virality campaigns, and multi-channel brand growth.',
    description: 'Transform your brand into a social powerhouse. We craft magnetic content, manage influencer partnerships, run high-converting campaigns across Meta, LinkedIn, and YouTube to drive exponential community growth.',
    overviewWhatIsIt: 'Full-service social media management covering content creation, daily posting, community management, viral reel production, and paid follower growth.',
    overviewWhoNeedsIt: 'Businesses aiming to build authentic brand awareness, foster trust, and generate high-intent inbound inquiries across social networks.',
    overviewWhyChooseUs: 'We combine creative visual storytelling with data-driven audience analytics to deliver real engagement rather than vanity metrics.',
    icon: '📱',
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: '/assets/img/homeservice/service7.webp',
    overviewImage: '/assets/img/homeservice/service7.webp',
    status: 'active',
    isFeatured: true,
    sort: 4,
    features: [
      { title: 'Branded Content Creation', desc: 'High-aesthetic graphics, carousels, and stories tailored to your identity.', icon: '🎨' },
      { title: 'Viral Short-Form Reels', desc: 'Scripted, shot, and edited vertical video reels optimized for reach.', icon: '🎬' },
      { title: 'Influencer Collaborations', desc: 'Partnering with niche micro and macro influencers for brand credibility.', icon: '⭐' },
      { title: 'Community & DM Management', desc: 'Prompt comment replies and automated direct message lead capture.', icon: '💬' },
      { title: 'Content Calendar & Scheduling', desc: 'Strategic advance planning and automated publishing at peak hours.', icon: '📅' },
      { title: 'Monthly Growth Analytics', desc: 'Transparent reporting on engagement, reach, profile visits, and leads.', icon: '📊' }
    ],
    benefits: [
      { title: 'Brand Credibility', desc: 'A vibrant social presence instills trust in first-time buyers.' },
      { title: 'Viral Organic Reach', desc: 'Reach thousands of prospective customers without paying for ads.' },
      { title: 'Direct Customer Relationships', desc: 'Turn casual followers into loyal brand ambassadors.' }
    ],
    faq: [
      { question: 'Which platforms do you manage?', answer: 'We specialize in Instagram, Facebook, LinkedIn, YouTube, and X (Twitter).' },
      { question: 'Do you create the content or do we need to provide it?', answer: 'We provide end-to-end creative support including graphic design, copywriting, video editing, and hashtag strategy.' }
    ],
    process: [
      { step: '01', title: 'Brand Audit', desc: 'Analyzing your current profile, competitors, and target audience.' },
      { step: '02', title: 'Content Strategy', desc: 'Establishing visual themes, content pillars, and posting calendars.' },
      { step: '03', title: 'Production & Publishing', desc: 'Designing posts, scripting reels, and scheduling across channels.' },
      { step: '04', title: 'Engagement & Optimization', desc: 'Active community interaction and weekly analytics refinement.' }
    ]
  },

  // ── 5. Facebook Promotion ──
  {
    title: 'Facebook Promotion & Ads',
    slug: 'facebook-promotion',
    shortDesc: 'Precision-targeted Facebook promotion, Meta conversion ads, and brand acceleration.',
    description: 'Dominate the Facebook ecosystem with hyper-targeted audience segments, retargeting funnels, and optimized creatives that deliver qualified inquiries at the lowest cost-per-acquisition (CPA).',
    overviewWhatIsIt: 'Paid Facebook marketing campaigns leveraging Meta AI algorithms, custom lookalike audiences, and high-converting creative ad sets.',
    overviewWhoNeedsIt: 'Businesses wanting rapid lead generation, local store footfall, event promotions, or nationwide brand reach.',
    overviewWhyChooseUs: 'We rigorously A/B test ad copies, creatives, and landing pages to ensure your ad spend delivers positive ROAS (Return On Ad Spend).',
    icon: '📘',
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: '/assets/img/homeservice/service7.webp',
    overviewImage: '/assets/img/homeservice/service7.webp',
    status: 'active',
    isFeatured: false,
    sort: 5,
    features: [
      { title: 'Hyper-Targeted Demographics', desc: 'Target by age, location, income, job titles, and specific interests.', icon: '🎯' },
      { title: 'Instant Lead Generation Forms', desc: 'Capture name, phone, and email directly inside Facebook with zero friction.', icon: '📋' },
      { title: 'Retargeting Stacks', desc: 'Re-engage website visitors and video viewers until they convert.', icon: '🔄' },
      { title: 'Lookalike Audience Modeling', desc: 'Find thousands of new prospects matching your top existing clients.', icon: '👥' },
      { title: 'High-CTR Ad Copywriting', desc: 'Compelling hooks, problem-solving benefits, and clear calls to action.', icon: '✍️' },
      { title: 'Live Ad Spend Monitoring', desc: 'Daily budget optimization to eliminate wasted spend on cold audiences.', icon: '💰' }
    ],
    benefits: [
      { title: 'Instant Inquiries', desc: 'Start receiving verified customer leads within 24-48 hours.' },
      { title: 'Predictable Cost per Lead', desc: 'Scale up your budget confidently as your cost per acquisition stabilizes.' },
      { title: 'Zero Wasted Budget', desc: 'Only pay to show ads to pre-qualified prospects.' }
    ],
    faq: [
      { question: 'How much budget should I start with?', answer: 'We recommend starting with a modest test budget (e.g. ₹500 to ₹1,000/day) to find winning ad combinations before scaling up.' }
    ],
    process: [
      { step: '01', title: 'Audience Research', desc: 'Mapping buyer personas, competitors, and geographic targets.' },
      { step: '02', title: 'Ad Creative Development', desc: 'Crafting static banners, carousel cards, and video hooks.' },
      { step: '03', title: 'Campaign Launch', desc: 'Setting up Meta Pixel, conversion API, and bidding rules.' },
      { step: '04', title: 'Scale & Optimize', desc: 'Turning off underperforming ads and allocating budget to top winners.' }
    ]
  },

  // ── 6. Meta Ads & Campaign ──
  {
    title: 'Meta Ads & Paid Campaigns',
    slug: 'meta-ads-campaign',
    shortDesc: 'End-to-end Meta performance marketing across Facebook, Instagram, and Messenger.',
    description: 'Harness the predictive power of Meta AI targeting algorithms to scale your customer acquisition, generate verified leads, and maximize direct eCommerce sales.',
    overviewWhatIsIt: 'Full-funnel Meta advertising across Facebook feed, Instagram stories, reels, explore page, and Messenger inbox.',
    overviewWhoNeedsIt: 'Brands looking for predictable customer acquisition at scale with automated tracking and attribution.',
    overviewWhyChooseUs: 'We implement Meta Conversions API (CAPI) server-side tracking to beat iOS privacy restrictions and recover 100% of conversion data.',
    icon: '🎯',
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: '/assets/img/homeservice/service7.webp',
    overviewImage: '/assets/img/homeservice/service7.webp',
    status: 'active',
    isFeatured: false,
    sort: 6,
    features: [
      { title: 'Meta Conversions API (CAPI)', desc: 'Server-side tracking for 100% accurate conversion data despite ad-blockers.', icon: '📡' },
      { title: 'Story & Reel Dynamic Ads', desc: 'Full-screen 9:16 vertical video ad creatives with interactive swipe-ups.', icon: '📱' },
      { title: 'Catalog Sales Integration', desc: 'Automatically show products people viewed on your website directly in their feed.', icon: '🛍️' },
      { title: 'Automated WhatsApp Click-to-Chat', desc: 'Direct qualified prospects straight into WhatsApp chats with your sales team.', icon: '💬' },
      { title: 'Creative Testing Matrix', desc: 'Testing 10+ hook and visual combinations weekly to prevent ad fatigue.', icon: '🧪' },
      { title: 'Dedicated Account Manager', desc: 'Weekly check-ins, campaign performance reviews, and strategic guidance.', icon: '🤝' }
    ],
    benefits: [
      { title: 'Highest ROAS Potential', desc: 'Scale campaigns profitably with algorithm-backed optimization.' },
      { title: 'Omnichannel Meta Reach', desc: 'Engage users wherever they scroll across the entire Meta network.' }
    ],
    faq: [
      { question: 'What is Meta CAPI?', answer: 'Conversions API is server-to-server tracking that ensures your ad data is not blocked by Apple iOS updates or browser cookies.' }
    ],
    process: [
      { step: '01', title: 'Pixel & CAPI Setup', desc: 'Ensuring bulletproof conversion tracking before running ads.' },
      { step: '02', title: 'Funnel Architecture', desc: 'Creating Top-of-Funnel (awareness) to Bottom-of-Funnel (retargeting) ad sets.' },
      { step: '03', title: 'Creative Execution', desc: 'Writing compelling ad copy and producing high-converting videos.' },
      { step: '04', title: 'Weekly Scaling', desc: 'Scaling winning audiences and refreshing creatives to maintain high ROAS.' }
    ]
  },

  // ── 7. Instagram Growth & Reels ──
  {
    title: 'Instagram Growth & Reels',
    slug: 'instagram-growth',
    shortDesc: 'High-engagement Instagram management, branded aesthetics, and viral Reel creation.',
    description: 'Elevate your brand presence on Instagram with curated feed curation, trending Reels production, community management, and paid growth campaigns.',
    overviewWhatIsIt: 'A comprehensive Instagram growth service dedicated to video reels, aesthetic profile branding, hashtag mastery, and direct customer conversion.',
    overviewWhoNeedsIt: 'Lifestyle brands, fashion, luxury, real estate, hospitality, influencers, and modern businesses seeking elite visual presence.',
    overviewWhyChooseUs: 'We script, record, and edit viral short-form reels tailored to the current Instagram algorithm, turning views into loyal paying clients.',
    icon: '📸',
    image: '/assets/img/homeservice/service6.webp',
    breadcrumbImage: '/assets/img/homeservice/service6.webp',
    overviewImage: '/assets/img/homeservice/service6.webp',
    status: 'active',
    isFeatured: true,
    sort: 7,
    features: [
      { title: 'Viral Reels Scripting & Editing', desc: 'Dynamic subtitles, sound design, sound effects, and 3-second hooks.', icon: '🎬' },
      { title: 'High-Aesthetic Grid Curation', desc: 'Cohesive color schemes, typography, and premium brand storytelling.', icon: '✨' },
      { title: 'Influencer Outreach & Collabs', desc: 'Connecting with key influencers to endorse your products on camera.', icon: '🌟' },
      { title: 'Automated DM Lead Funnels', desc: 'Send automated links, price lists, and coupons when users comment keywords.', icon: '🤖' },
      { title: 'Algorithmic Sound Selection', desc: 'Using trending audio tracks to maximize organic explore page distribution.', icon: '🎵' },
      { title: 'Bio & Highlight Optimization', desc: 'Convert visitors into leads the moment they land on your profile.', icon: '📌' }
    ],
    benefits: [
      { title: 'Explosive Organic Reach', desc: 'Reels can reach 10x-50x your follower count organically.' },
      { title: 'Elevated Brand Prestige', desc: 'A gorgeous Instagram page commands premium prices for your services.' }
    ],
    faq: [
      { question: 'How many reels are produced each month?', answer: 'Our packages range from 12 to 30 high-quality reels per month depending on your growth objectives.' }
    ],
    process: [
      { step: '01', title: 'Visual Identity & Bio Revamp', desc: 'Aligning your profile aesthetics, highlight covers, and bio copy.' },
      { step: '02', title: 'Scripting & Shoot Plan', desc: 'Drafting viral hooks and video concepts based on trending topics.' },
      { step: '03', title: 'Editing & Motion Polish', desc: 'Adding kinetic captions, transitions, sound effects, and color grading.' },
      { step: '04', title: 'Publishing & Engagement', desc: 'Posting at peak algorithmic hours and driving comment interactions.' }
    ]
  },

  // ── 8. Lead Generation Ads ──
  {
    title: 'Lead Generation Ads',
    slug: 'lead-generation-ads',
    shortDesc: 'Predictable high-ticket B2B & B2C lead pipelines with automated qualification funnels.',
    description: 'Stop guessing where your next client comes from. We engineer scalable lead generation machines using Google Search Ads, LinkedIn InMail, and Meta Instant Lead Forms.',
    overviewWhatIsIt: 'Turnkey lead acquisition system that captures, qualifies, and routes hot buyer leads directly to your sales representatives within seconds.',
    overviewWhoNeedsIt: 'Real estate developers, B2B services, SaaS providers, healthcare clinics, educational institutes, and high-ticket service agencies.',
    overviewWhyChooseUs: 'We do not just generate contacts—we build pre-qualification quizzes that weed out tire-kickers and deliver genuinely interested buyers.',
    icon: '🎯',
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: '/assets/img/homeservice/service7.webp',
    overviewImage: '/assets/img/homeservice/service7.webp',
    status: 'active',
    isFeatured: true,
    sort: 8,
    features: [
      { title: 'Multi-Channel Ad Placements', desc: 'Capture high-intent prospects across Google, LinkedIn, Facebook, and Instagram.', icon: '🌐' },
      { title: 'Pre-Qualification Screening', desc: 'Multi-step questionnaire funnels that verify budget, timeline, and need.', icon: '✅' },
      { title: 'Instant WhatsApp & CRM Webhooks', desc: 'Leads arrive on your phone within 5 seconds of form submission.', icon: '⚡' },
      { title: 'Zero Lead Leakage Routing', desc: 'Automated round-robin distribution to ensure every inquiry is called instantly.', icon: '📞' },
      { title: 'Conversion Rate Optimization', desc: 'Landing pages engineered specifically for high conversion rates (15%+).', icon: '📈' },
      { title: 'CPQL (Cost Per Qualified Lead) Metric', desc: 'We optimize for actual closed sales revenue, not just cheap click metrics.', icon: '💎' }
    ],
    benefits: [
      { title: 'Consistent Pipeline', desc: 'Never worry about where next month’s business will come from.' },
      { title: 'High Ticket Deal Closing', desc: 'Target decision-makers with buying power and immediate requirements.' }
    ],
    faq: [
      { question: 'How do leads get delivered to us?', answer: 'We connect your campaigns to Google Sheets, CRM (HubSpot, Zoho, etc.), email, and instant WhatsApp notifications.' }
    ],
    process: [
      { step: '01', title: 'Offer & Persona Mapping', desc: 'Structuring your irresistible high-ticket offer and buyer profile.' },
      { step: '02', title: 'Landing Page & Funnel Build', desc: 'Developing lightning-fast landing pages with qualification logic.' },
      { step: '03', title: 'Targeted Traffic Activation', desc: 'Launching search and social ad sets with precision bidding.' },
      { step: '04', title: 'CRM Pipeline Automation', desc: 'Connecting instant notifications and automated SMS/WhatsApp confirmations.' }
    ]
  },

  // ── 9. Banner Ads Design & Media ──
  {
    title: 'Banner Ads Design & Media',
    slug: 'banner-ads',
    shortDesc: 'High-CTR digital banners, animated HTML5 display units, and programmatic ad creatives.',
    description: 'Stand out across Google Display Network and premium publisher networks with eye-catching, brand-compliant banner creatives designed for maximum click-through rates.',
    overviewWhatIsIt: 'Professional banner design services encompassing static graphics, animated GIF/HTML5 ads, responsive display formats, and remarketing banners.',
    overviewWhoNeedsIt: 'Brands running display advertising, programmatic ad campaigns, web sponsorships, and eCommerce retargeting.',
    overviewWhyChooseUs: 'Our designers know how to capture attention in the split second before someone scrolls past, delivering 2x higher click-through rates.',
    icon: '🖼️',
    image: '/assets/img/homeservice/service6.webp',
    breadcrumbImage: '/assets/img/homeservice/service6.webp',
    overviewImage: '/assets/img/homeservice/service6.webp',
    status: 'active',
    isFeatured: false,
    sort: 9,
    features: [
      { title: 'Full Google Display Network (GDN) Sizes', desc: 'Complete sets covering all 20+ IAB standard ad banner dimensions.', icon: '📐' },
      { title: 'Animated HTML5 & Motion Units', desc: 'Eye-catching smooth animations that demand attention without lagging.', icon: '🎞️' },
      { title: 'High-Contrast Visual Hierarchy', desc: 'Clear headline, value proposition, and prominent Call to Action button.', icon: '👁️' },
      { title: 'Retargeting Creative Variations', desc: 'Tailored messages for people who visited specific products or pages.', icon: '🎯' },
      { title: 'A/B Split Test Sets', desc: 'Multiple color schemes and headline variations provided for split testing.', icon: '🔀' },
      { title: 'Lightweight File Optimization', desc: 'Under 150KB files ensuring instant delivery and strict ad network approval.', icon: '⚡' }
    ],
    benefits: [
      { title: 'High Click-Through Rates', desc: 'Compelling designs that invite clicks from interested prospects.' },
      { title: '100% Ad Network Compliance', desc: 'Zero rejections on Google Ads, Meta, or programmatic DSPs.' }
    ],
    faq: [
      { question: 'What sizes are included in a banner set?', answer: 'We include all popular sizes: 300x250, 728x90, 160x600, 300x600, 320x50, 320x100, 970x250, and 1200x628.' }
    ],
    process: [
      { step: '01', title: 'Creative Brief', desc: 'Understanding your promotion, offer, and brand guidelines.' },
      { step: '02', title: 'Concept Design', desc: 'Drafting master concepts in the top performing dimension.' },
      { step: '03', title: 'Resize Adaptation', desc: 'Adapting the approved design across all requested dimensions.' },
      { step: '04', title: 'Production Export', desc: 'Delivering optimized, ready-to-upload files in PNG, JPG, and HTML5 zip.' }
    ]
  },

  // ── 10. CRM Solutions & Software ──
  {
    title: 'CRM Solutions & Software',
    slug: 'crm-solutions',
    shortDesc: 'Automated customer relationship management platforms tailored to your sales process.',
    description: 'Empower your sales and operations teams with custom CRM software featuring automated lead capture, WhatsApp notifications, pipeline tracking, and revenue analytics.',
    overviewWhatIsIt: 'A centralized platform to manage leads, customer interactions, follow-ups, quotation generation, staff commissions, and deal stages in real time.',
    overviewWhoNeedsIt: 'Growing businesses losing leads due to disorganized spreadsheets, forgotten follow-ups, or unmonitored sales executives.',
    overviewWhyChooseUs: 'We customize CRM workflows specifically around how your business works, rather than forcing you to adapt to rigid generic tools.',
    icon: '💼',
    image: '/assets/img/homeservice/service1.webp',
    breadcrumbImage: '/assets/img/homeservice/service1.webp',
    overviewImage: '/assets/img/homeservice/service1.webp',
    status: 'active',
    isFeatured: true,
    sort: 10,
    features: [
      { title: 'Omnichannel Lead Capture', desc: 'Pulls leads automatically from Website, Facebook, Google, Indiamart, and WhatsApp.', icon: '📥' },
      { title: 'Visual Kanban Deal Pipelines', desc: 'Drag and drop deals from New Lead → In Conversation → Proposal → Won.', icon: '📊' },
      { title: 'Automated WhatsApp & SMS Alerts', desc: 'Instantly notify clients and staff when deal stages update.', icon: '📲' },
      { title: 'Staff Activity & Call Tracking', desc: 'Track sales executive call logs, follow-up dates, and conversion ratios.', icon: '👥' },
      { title: '1-Click Quotation & Invoicing', desc: 'Generate branded PDF quotes and invoices directly from customer cards.', icon: '📄' },
      { title: 'Executive Revenue Analytics', desc: 'Real-time dashboards forecasting sales numbers and conversion velocity.', icon: '📈' }
    ],
    benefits: [
      { title: 'Zero Lost Leads', desc: 'Every single inquiry is logged, assigned, and followed up on time.' },
      { title: '30%+ Increase in Sales Close Rate', desc: 'Consistent, timely follow-ups dramatically boost deal closures.' }
    ],
    faq: [
      { question: 'Can the CRM integrate with our existing website?', answer: 'Yes! We provide easy API webhooks and embeddable forms that connect seamlessly with any website or landing page.' }
    ],
    process: [
      { step: '01', title: 'Workflow Discovery', desc: 'Mapping your existing sales stages, team roles, and lead sources.' },
      { step: '02', title: 'System Configuration', desc: 'Setting up custom fields, pipelines, permissions, and email templates.' },
      { step: '03', title: 'Automation Webhooks', desc: 'Connecting lead sources, WhatsApp APIs, and automated tasks.' },
      { step: '04', title: 'Staff Training', desc: 'Hands-on training session for your sales reps and managers.' }
    ]
  },

  // ── 11. AI Videos & Reels ──
  {
    title: 'AI Videos & Generative Reels',
    slug: 'ai-videos',
    shortDesc: 'Cutting-edge AI video generation, automated spokesperson reels, and viral motion content.',
    description: 'Scale your video marketing without cameras, studios, or actors. We produce hyper-realistic AI avatars, automated voiceovers, and viral short-form video reels that captivate audiences.',
    overviewWhatIsIt: 'Next-generation video production utilizing generative AI tools to create lifelike digital presenters, automated multi-lingual voice clones, and dynamic motion visuals.',
    overviewWhoNeedsIt: 'Businesses wanting high-volume video content for social media, product explainers, e-learning, and international campaigns.',
    overviewWhyChooseUs: 'We blend state-of-the-art AI synthesis with professional human storytelling and motion editing to deliver broadcast-quality video at 80% lower cost.',
    icon: '🤖',
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: '/assets/img/homeservice/service7.webp',
    overviewImage: '/assets/img/homeservice/service7.webp',
    status: 'active',
    isFeatured: true,
    sort: 11,
    features: [
      { title: 'Photorealistic AI Presenters', desc: 'Human-like digital avatars delivering your script with natural lip-sync.', icon: '👤' },
      { title: 'Multi-Language Voice Clones', desc: 'Publish videos in English, Hindi, Spanish, Arabic, and 40+ languages instantly.', icon: '🗣️' },
      { title: 'Viral Hook Script Generation', desc: 'AI-assisted scripts crafted around high-retention storytelling formulas.', icon: '📝' },
      { title: 'Automated B-Roll Synthesis', desc: 'Dynamic stock footage, kinetic motion graphics, and background music.', icon: '🎬' },
      { title: 'Product Explainer Sequences', desc: 'Turn static product photos into 3D video showcases that drive sales.', icon: '📦' },
      { title: '10x Faster Turnaround', desc: 'Produce dozens of ready-to-post reels in days instead of months.', icon: '⚡' }
    ],
    benefits: [
      { title: 'Massive Cost Savings', desc: 'No need for expensive camera crews, lighting rigs, or studio rentals.' },
      { title: 'Global Multi-Lingual Reach', desc: 'Speak to local audiences in their native language effortlessly.' }
    ],
    faq: [
      { question: 'Do the AI avatars look realistic?', answer: 'Yes! We use cutting-edge enterprise AI rendering that produces natural facial expressions, blinking, head motion, and lip sync.' }
    ],
    process: [
      { step: '01', title: 'Scriptwriting', desc: 'Developing high-converting video scripts tailored to your target audience.' },
      { step: '02', title: 'Avatar & Voice Selection', desc: 'Choosing digital personas and voice accents matching your brand.' },
      { step: '03', title: 'AI Synthesis & Motion Editing', desc: 'Rendering the presenter and layering captions, sound effects, and B-roll.' },
      { step: '04', title: 'Delivery & Formatting', desc: 'Exporting in 9:16 vertical and 16:9 widescreen formats ready to publish.' }
    ]
  },

  // ── 12. Web Security & SSL ──
  {
    title: 'Web Security & Threat Defense',
    slug: 'web-security',
    shortDesc: 'Enterprise web security audits, vulnerability mitigation, SSL/TLS, and DDoS shielding.',
    description: 'Protect your brand reputation and customer data with comprehensive web application penetration testing, malware removal, DDoS protection, and continuous vulnerability scans.',
    overviewWhatIsIt: 'Full-spectrum cyber defense for web applications, including Web Application Firewalls (WAF), automated security audits, SSL hardening, and patch management.',
    overviewWhoNeedsIt: 'Businesses handling sensitive customer information, online payments, corporate databases, or facing malicious brute-force attacks.',
    overviewWhyChooseUs: 'We implement zero-trust enterprise security protocols and proactive threat mitigation to keep your digital infrastructure unbreachable.',
    icon: '🛡️',
    image: '/assets/img/homeservice/service5.svg',
    breadcrumbImage: '/assets/img/homeservice/service5.svg',
    overviewImage: '/assets/img/homeservice/service5.svg',
    status: 'active',
    isFeatured: false,
    sort: 12,
    features: [
      { title: 'Vulnerability & Penetration Testing', desc: 'Deep security audits identifying SQL injections, XSS, and authorization leaks.', icon: '🔍' },
      { title: 'Enterprise Web Application Firewall (WAF)', desc: 'Real-time filtering blocking malicious bots, scrapers, and hackers.', icon: '🧱' },
      { title: 'Malware Removal & Cleanup', desc: 'Instant neutralization and removal of injected malicious code or backdoors.', icon: '🧹' },
      { title: 'DDoS Shielding & Traffic Scrubbing', desc: 'Absorbs multi-gigabit attacks with global edge server networks.', icon: '🛡️' },
      { title: 'Advanced SSL/TLS Cipher Hardening', desc: 'A+ rated SSL certification, HSTS preloading, and encrypted data in transit.', icon: '🔒' },
      { title: 'Database Security & Access Logging', desc: 'Audit trails monitoring all database changes and login attempts.', icon: '📜' }
    ],
    benefits: [
      { title: 'Peace of Mind', desc: 'Protect your business against data breaches and devastating ransom demands.' },
      { title: 'Customer Trust & Compliance', desc: 'Display security trust badges that reassure buyers their payment data is safe.' }
    ],
    faq: [
      { question: 'What happens if our site has already been hacked?', answer: 'We offer emergency malware removal and site recovery services to clean your code, patch exploits, and restore normal operations fast.' }
    ],
    process: [
      { step: '01', title: 'Threat Audit', desc: 'Running exhaustive vulnerability scans across servers, code, and ports.' },
      { step: '02', title: 'Patching & Hardening', desc: 'Closing vulnerabilities, updating libraries, and configuring security headers.' },
      { step: '03', title: 'WAF & Firewall Deployment', desc: 'Routing web traffic through enterprise Cloudflare or AWS WAF shields.' },
      { step: '04', title: 'Continuous Monitoring', desc: 'Setting up 24/7 automated alerts for unauthorized file changes or anomalies.' }
    ]
  },

  // ── 13. Podcast Production ──
  {
    title: 'Podcast Studio & Production',
    slug: 'podcast',
    shortDesc: 'Full-service podcast recording, crystal-clear audio mastering, and viral micro-content clips.',
    description: 'Launch and scale a high-authority branded podcast. We handle recording setup, audio mixing, multi-cam video editing, and extract viral bite-sized clips for TikTok, Reels, and YouTube Shorts.',
    overviewWhatIsIt: 'End-to-end podcast production covering audio engineering, video editing, intro/outro creation, platform distribution, and micro-content repurposing.',
    overviewWhoNeedsIt: 'Founders, thought leaders, corporate enterprises, and creators looking to establish deep authority and long-form audience trust.',
    overviewWhyChooseUs: 'We do not just produce an episode—we transform one 45-minute podcast recording into 15+ viral reels, social quotes, and blog posts.',
    icon: '🎙️',
    image: '/assets/img/homeservice/service8.webp',
    breadcrumbImage: '/assets/img/homeservice/service8.webp',
    overviewImage: '/assets/img/homeservice/service8.webp',
    status: 'active',
    isFeatured: false,
    sort: 13,
    features: [
      { title: 'Multi-Track Studio Audio Mastering', desc: 'Pristine sound clarity, noise reduction, compression, and loudness normalization.', icon: '🎚️' },
      { title: 'Multi-Camera 4K Video Editing', desc: 'Dynamic camera switching, lower-thirds, guest name tags, and branding.', icon: '🎥' },
      { title: 'Viral Social Shorts & Reels', desc: 'Extracting 5-10 hook-filled vertical clips with animated captions per episode.', icon: '✂️' },
      { title: 'Apple & Spotify Syndication', desc: 'Automated RSS distribution across Spotify, Apple Podcasts, Amazon, and YouTube.', icon: '📡' },
      { title: 'Branded Intro, Outro & Jingle', desc: 'Custom intro animation and royalty-free music tailored to your show.', icon: '🎵' },
      { title: 'SEO Show Notes & Transcriptions', desc: 'Full episode transcripts and summaries that rank on Google search.', icon: '📝' }
    ],
    benefits: [
      { title: 'Unmatched Industry Authority', desc: 'Host insightful conversations that position your brand as the market leader.' },
      { title: 'Content Engine for a Month', desc: 'One podcast recording fuels your entire social media schedule for weeks.' }
    ],
    faq: [
      { question: 'Do we need a physical studio?', answer: 'Not necessarily! We can record high-definition remote interviews using studio-grade cloud software (Riverside/SquadCast) or guide your on-location setup.' }
    ],
    process: [
      { step: '01', title: 'Show Identity & Branding', desc: 'Designing cover artwork, intro music, format, and episode structure.' },
      { step: '02', title: 'Recording Assistance', desc: 'Remote or studio multi-track audio and 4K camera recording.' },
      { step: '03', title: 'Audio & Video Post-Production', desc: 'Mastering audio, video color grading, and speaker transitions.' },
      { step: '04', title: 'Distribution & Micro-Clips', desc: 'Publishing across major podcast platforms and delivering viral social clips.' }
    ]
  },

  // ── 14. Video Shoot & Commercial Production ──
  {
    title: 'Commercial Video Shoot & Production',
    slug: 'video-shoot',
    shortDesc: 'On-location cinematic video shoots, corporate brand films, and commercial advertisements.',
    description: 'Tell your story through cinematic video. Our production crew delivers broadcast-quality corporate profile videos, customer testimonials, product commercials, and event coverage.',
    overviewWhatIsIt: 'Full-scale video production including concept ideation, storyboarding, cinema-grade on-location filming, professional lighting, sound recording, and color grading.',
    overviewWhoNeedsIt: 'Businesses, manufacturers, real estate developers, and institutions wanting to showcase their infrastructure, team, or products with Hollywood-level polish.',
    overviewWhyChooseUs: 'We bring top-tier cinema cameras (Sony FX / RED), aerial drone videography, and seasoned directors who understand how to tell compelling business stories.',
    icon: '🎬',
    image: '/assets/img/homeservice/service2.svg',
    breadcrumbImage: '/assets/img/homeservice/service2.svg',
    overviewImage: '/assets/img/homeservice/service2.svg',
    status: 'active',
    isFeatured: true,
    sort: 14,
    features: [
      { title: '4K / 6K Cinema Camera Gear', desc: 'Filmed on professional cinema lenses and stabilized gimbal systems.', icon: '📹' },
      { title: 'Studio Lighting & Boom Microphones', desc: 'Broadcast-standard three-point lighting and crystal-clear wireless audio.', icon: '💡' },
      { title: 'Aerial 4K Drone Videography', desc: 'Breathtaking aerial footage of factories, campuses, buildings, and projects.', icon: '🚁' },
      { title: 'Corporate Story Films', desc: 'Showcase founder vision, company culture, manufacturing prowess, and values.', icon: '🏢' },
      { title: 'Client Testimonial Shoots', desc: 'Authentic customer case study videos that overcome buyer skepticism.', icon: '⭐' },
      { title: 'Hollywood Color Grading & Sound', desc: 'Custom color LUTs, sound effects design, and licensed orchestral music.', icon: '🎨' }
    ],
    benefits: [
      { title: 'Highest Conversion Asset', desc: 'Video on a landing page increases conversions by over 80%.' },
      { title: 'Unrivaled Brand Stature', desc: 'Cinematic footage sets you leagues apart from competitors using cheap stock photos.' }
    ],
    faq: [
      { question: 'Do you travel for shoots outside your city?', answer: 'Yes, our production crew travels nationwide for corporate, factory, and project shoots.' }
    ],
    process: [
      { step: '01', title: 'Pre-Production & Script', desc: 'Storyboards, shot lists, location scouting, and interview questions.' },
      { step: '02', title: 'On-Location Shoot', desc: 'Full-day cinema filming with directors, lighting, audio, and drone operators.' },
      { step: '03', title: 'Post-Production Editing', desc: 'Rough cut assembly, music selection, voiceover, and color grading.' },
      { step: '04', title: 'Final Master Delivery', desc: 'High-res master files exported in 4K for website, YouTube, and broadcast.' }
    ]
  }
];
