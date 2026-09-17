const mongoose = require('mongoose');
require('dotenv').config();

const servicesToUpdate = [
  {
    slug: 'website-designing',
    title: 'Website Designing',
    shortDesc: 'Crafting visually stunning, user-centric interfaces that captivate your audience, reflect brand authority, and maximize conversions.',
    description: 'We specialize in modern, bespoke UI/UX website designing that elevates your brand from ordinary to unforgettable. Every layout, color palette, typography hierarchy, and micro-interaction is custom crafted to communicate your core value proposition clearly and guide visitors seamlessly toward conversion.',
    overviewWhatIsIt: 'Custom UI/UX website design blends artistic aesthetic appeal with psychological user journey mapping. It focuses on how users perceive, interact with, and navigate through your digital presence before a single line of code is written.',
    overviewWhoNeedsIt: 'Startups launching a disruptive product, established enterprises undergoing rebranding, and businesses whose existing websites look outdated, suffer from high bounce rates, or fail to convert visitors into inquiries.',
    overviewWhyChooseUs: 'Our design studio combines deep user research, Figma interactive prototypes, brand-aligned visual design, and accessibility standards to craft interfaces that turn visitors into loyal clients.',
    benefits: [
      { title: 'Brand Distinction', desc: 'Stand out from competitors with an iconic, bespoke aesthetic that commands authority.' },
      { title: 'Higher Conversions', desc: 'Strategic visual hierarchy and clear CTAs engineered to guide visitors toward action.' },
      { title: 'Flawless Responsiveness', desc: 'Pixel-perfect display on smartphones, tablets, laptops, and 4K ultra-wide monitors.' },
      { title: 'Rapid Development Handoff', desc: 'Organized design tokens and assets in Figma ready for clean, rapid implementation.' }
    ],
    features: [
      { title: 'Bespoke UI/UX Architecture', desc: 'Custom layout wireframes and user flow journeys tailored exclusively to your business objectives.', icon: 'FaLaptopCode' },
      { title: 'Mobile-First Responsiveness', desc: 'Adaptive layouts designed to deliver flawless visual experiences across all device form factors.', icon: 'FaMobileAlt' },
      { title: 'Interactive Figma Prototypes', desc: 'Clickable, realistic prototypes allowing you to experience user journeys and animations before development.', icon: 'FaDesktop' },
      { title: 'Design Systems & Tokens', desc: 'Unified UI component libraries including typography, color palettes, spacing tokens, and iconography.', icon: 'FaCogs' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Strategic CTA placements, visual contrast, and intuitive navigation structures engineered to maximize inquiries.', icon: 'FaSearchDollar' },
      { title: 'Micro-Interactions & Motion Accents', desc: 'Delightful motion accents and hover states that elevate user engagement without hurting performance.', icon: 'FaRocket' },
      { title: 'Accessibility & WCAG Compliance', desc: 'High-contrast ratios, legible typography, and intuitive focus states ensuring inclusive access.', icon: 'FaShieldAlt' },
      { title: 'Cross-Browser Visual Perfection', desc: 'Precision testing to ensure stunning visual consistency across Chrome, Safari, Firefox, and Edge.', icon: 'FaBolt' }
    ],
    process: [
      { step: '01', title: 'Discovery & Brand Research', desc: 'Analyzing your brand personality, target audience persona, and competitor benchmarks.' },
      { step: '02', title: 'User Journeys & Wireframing', desc: 'Mapping out information architecture, content hierarchy, and low-fidelity structural blueprints.' },
      { step: '03', title: 'Moodboard & Style Direction', desc: 'Curating color schemes, typography pairings, and visual references to establish the design aesthetic.' },
      { step: '04', title: 'High-Fidelity UI Design', desc: 'Crafting pixel-perfect page mockups in Figma with modern glassmorphism, cards, and bespoke imagery.' },
      { step: '05', title: 'Interactive Clickable Prototype', desc: 'Connecting flows so you can test navigation, modal triggers, and transitions interactively.' },
      { step: '06', title: 'Client Collaboration & Refinement', desc: 'Iterative feedback loops ensuring every detail meets your vision and brand guidelines.' },
      { step: '07', title: 'Design System & Dev Handoff', desc: 'Exporting organized assets, typography specs, and responsive component tokens for engineering.' }
    ],
    faq: [
      { question: 'What is the difference between Website Designing and Website Development?', answer: 'Website Designing focuses on the visual aesthetics, UX/UI layout, typography, colors, and user journey in Figma. Website Development translates those approved designs into clean, responsive, and functional code.' },
      { question: 'How long does a custom website design project typically take?', answer: 'A standard multi-page website design project typically takes 2 to 3 weeks, including research, wireframing, high-fidelity UI design, and revision rounds.' },
      { question: 'Do you design for mobile devices first?', answer: 'Yes, we adopt a mobile-first philosophy. Over 60% of web traffic comes from mobile devices, so every interface is meticulously optimized for touch interactions and smaller screens.' },
      { question: 'Will I receive clickable prototypes to test before coding?', answer: 'Absolutely. We provide full interactive Figma prototypes so you and your team can click through pages and experience the flow firsthand.' },
      { question: 'Can you redesign our existing website without losing brand identity?', answer: 'Yes. We frequently modernize legacy websites by retaining recognizable core brand assets while vastly elevating visual appeal, typography, and UX performance.' },
      { question: 'Do you provide source design files upon completion?', answer: 'Yes, you receive complete ownership of all Figma project files, component libraries, typography guides, and vector graphic assets.' }
    ],
    image: '/assets/img/homeservice/service2.svg',
    breadcrumbImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1581291518655-9523c932ded8?q=80&w=1200&auto=format&fit=crop',
    metaTitle: 'Bespoke Website Designing & UI/UX Services',
    metaDescription: 'Award-winning UI/UX website design services by WebTycoons. High-converting layouts, interactive Figma prototypes, and responsive designs.'
  },
  {
    slug: 'logo-designing',
    title: 'Logo Designing',
    shortDesc: 'Creating memorable, unique, and impactful logos and brand identities that establish a strong, recognizable market presence.',
    description: 'Your logo is the foundation of your company’s visual identity. We craft iconic, timeless logos and complete brand identity packages that captivate audiences, evoke trust, and stand out across digital platforms, print collateral, and physical merchandise.',
    overviewWhatIsIt: 'Professional logo and brand identity design is the strategic art of translating your company’s vision, values, and competitive edge into an unforgettable visual emblem, typography signature, and cohesive style guideline.',
    overviewWhoNeedsIt: 'New startups seeking a powerful initial market impression, established businesses rebranding to reflect modern evolution, and companies expanding into new markets needing a unified visual voice.',
    overviewWhyChooseUs: 'We do not use clipart or AI templates. Every logo begins with hand-drawn conceptual sketching, vector precision drafting in Adobe Illustrator, color psychology analysis, and multi-format delivery with 100% commercial copyright transfer.',
    benefits: [
      { title: 'Memorable Brand Recall', desc: 'Distinctive visual mark engineered to stick in the minds of your prospective clients.' },
      { title: 'Timeless Aesthetic', desc: 'Designs crafted to endure decades rather than quickly fading design fads.' },
      { title: 'Infinite Vector Scalability', desc: 'From mobile app favicons to 50-foot billboards without a single millimeter of pixelation.' },
      { title: 'Complete Copyright Transfer', desc: '100% intellectual property ownership transferred to you upon project sign-off.' }
    ],
    features: [
      { title: 'Bespoke Conceptual Sketching', desc: 'Original, handcrafted concept explorations based on in-depth market and competitor research.', icon: 'FaPalette' },
      { title: 'Infinite Vector Scalability', desc: 'Precision vector illustrations that look crystal clear on any screen resolution or print medium.', icon: 'FaDesktop' },
      { title: 'Comprehensive Brand Guidelines', desc: 'Detailed PDF brand book specifying exact CMYK, RGB, HEX, and Pantone color codes and typography rules.', icon: 'FaCogs' },
      { title: 'Typography Pairing & Hierarchy', desc: 'Curated primary and secondary font pairings that reinforce brand personality and readability.', icon: 'FaLaptopCode' },
      { title: 'Social Media & Favicon Kit', desc: 'Pre-sized avatar assets, header banners, and favicons tailored for LinkedIn, Twitter, Instagram, and web.', icon: 'FaMobileAlt' },
      { title: 'Stationery & Collateral Mockups', desc: 'Realistic 3D visual mockups for business cards, letterheads, email signatures, and corporate envelopes.', icon: 'FaCheckCircle' },
      { title: '100% Commercial Copyright Transfer', desc: 'Complete legal ownership and intellectual property rights transferred to your business.', icon: 'FaShieldAlt' },
      { title: 'Multiple Master File Formats', desc: 'Delivery of AI, EPS, SVG, PDF, high-res PNG (transparent), and JPG formats for all printing and digital needs.', icon: 'FaRocket' }
    ],
    process: [
      { step: '01', title: 'Brand Discovery & Briefing', desc: 'Understanding your industry, target demographic, brand values, and preferred visual aesthetics.' },
      { step: '02', title: 'Market & Competitor Audit', desc: 'Analyzing industry competitors to ensure your new brand identity stands out distinctly.' },
      { step: '03', title: 'Sketching & Vector Ideation', desc: 'Brainstorming and hand-sketching dozens of concepts before digitizing top contenders into vector drafts.' },
      { step: '04', title: 'Presentation of Concepts', desc: 'Presenting 3-5 distinct creative logo directions visualized in real-world brand mockups.' },
      { step: '05', title: 'Collaborative Refinements', desc: 'Fine-tuning the chosen concept’s typography, kerning, color harmony, and proportions.' },
      { step: '06', title: 'Brand Asset Package Delivery', desc: 'Packaging master vector files, digital web assets, and the comprehensive brand style guide.' }
    ],
    faq: [
      { question: 'How many logo concepts will you provide?', answer: 'We typically present 3 to 5 completely distinct creative directions, each showcasing a unique perspective on your brand identity.' },
      { question: 'What file formats will I receive?', answer: 'You will receive full master vector files (AI, EPS, SVG, PDF) for professional printing as well as web-ready transparent PNGs and high-resolution JPEGs.' },
      { question: 'Do I own the full copyright to the logo?', answer: 'Yes, 100%. Upon final project sign-off and balance settlement, all intellectual property and commercial copyright ownership are transferred to you.' },
      { question: 'What is a Brand Guideline or Brand Book?', answer: 'A Brand Book is an essential manual detailing how to use your logo, minimum clear space, forbidden alterations, color palettes (HEX, RGB, CMYK, Pantone), and corporate font rules.' },
      { question: 'How long does the logo design process take?', answer: 'Initial concept presentations are ready within 5 to 7 business days, with final deliverables completed shortly after revision rounds.' }
    ],
    image: '/assets/img/homeservice/service6.webp',
    breadcrumbImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    metaTitle: 'Professional Logo Design & Brand Identity Services',
    metaDescription: 'Iconic logo design and complete corporate brand identity by WebTycoons. Master vector files, brand guidelines, and 100% copyright ownership.'
  },
  {
    slug: 'domain',
    title: 'Domain & Hosting',
    shortDesc: 'Secure domain registration, DNS zone routing, enterprise SSL certification, and ultra-fast hosting setup.',
    description: 'Your domain is your digital address and the cornerstone of your online credibility. We provide enterprise-grade domain registration, DNS routing with Anycast global resolution, automated SSL/TLS certificate management, and bulletproof security against DNS hijacking.',
    overviewWhatIsIt: 'Domain and DNS management services encompass the search, registration, protection, and network routing of your web address to high-performance servers, guaranteeing 99.99% availability worldwide.',
    overviewWhoNeedsIt: 'Any business launching a new brand, reserving defensive trademark domains (.com, .in, .org, .io), migrating existing domains without downtime, or requiring enterprise DNS configuration for email authentication.',
    overviewWhyChooseUs: 'We eliminate technical headaches by managing nameservers, SPF/DKIM records, Whois privacy protection, auto-renewals, and CDN routing seamlessly under one roof.',
    benefits: [
      { title: 'Global High-Speed DNS', desc: 'Anycast DNS network delivers sub-millisecond lookup times worldwide.' },
      { title: 'Privacy Guaranteed', desc: 'Mask your personal identity and contact info from public spammers and scrapers.' },
      { title: 'Automated Security Renewals', desc: 'Never lose your domain or SSL due to expired registration lapses.' },
      { title: 'Zero Downtime Transfers', desc: 'Effortlessly migrate existing domains from third-party registrars without interruption.' }
    ],
    features: [
      { title: 'Instant Domain Registration & TLDs', desc: 'Register popular TLDs (.com, .in, .co, .org, .net, .io) and specialized extensions with zero hassle.', icon: 'FaGlobe' },
      { title: 'Free Whois Privacy Guard', desc: 'Mask your personal phone number, email, and home address from public WHOIS spam scrapers.', icon: 'FaUserShield' },
      { title: 'Anycast Global DNS Routing', desc: 'Lightning-fast DNS lookup times distributed across Tier-4 global data centers for instant site loads.', icon: 'FaBolt' },
      { title: 'Automated SSL/TLS Encryption', desc: 'Enterprise 256-bit SSL certificates with automated renewal to secure visitor data and boost SEO.', icon: 'FaShieldAlt' },
      { title: 'DNSSEC Hijack Protection', desc: 'Cryptographic signature validation that protects your domain from DNS spoofing and cache poisoning.', icon: 'FaServer' },
      { title: 'Seamless Email & CDN Integration', desc: 'Pre-configured DNS records for Google Workspace, Microsoft 365, Cloudflare, and AWS.', icon: 'FaCogs' }
    ],
    process: [
      { step: '01', title: 'Domain Availability & Brand Audit', desc: 'Verifying availability across top TLDs and recommending brand protection variations.' },
      { step: '02', title: 'Secure Registrar Allocation', desc: 'Securing the domain under your verified ownership credentials with 2-factor authentication.' },
      { step: '03', title: 'DNS Zone Configuration', desc: 'Configuring A records, CNAMEs, MX mail exchanges, TXT, and SPF/DKIM verification tags.' },
      { step: '04', title: 'SSL Encryption Deployment', desc: 'Issuing and validating 256-bit SSL certificates for HTTPS browser padlock security.' },
      { step: '05', title: 'Propagation & Health Monitoring', desc: 'Global propagation testing and 24/7 DNS uptime monitoring.' }
    ],
    faq: [
      { question: 'Who owns the domain once registered?', answer: 'You own the domain 100%. All domains are registered using your official company contact details and administrative credentials.' },
      { question: 'What is Whois Privacy and why is it important?', answer: 'Whois Privacy masks your private name, address, and phone number from public registries, preventing spam callers, identity theft, and marketing solicitation.' },
      { question: 'Can you help migrate my domain from another registrar?', answer: 'Yes, we handle the entire domain transfer and DNS migration with zero downtime for your website or email.' },
      { question: 'Do you configure custom business emails with the domain?', answer: 'Yes, we configure all required MX, SPF, DKIM, and DMARC records to connect your domain seamlessly with Google Workspace or Microsoft 365.' }
    ],
    image: '/assets/img/homeservice/service5.svg',
    breadcrumbImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2000&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    metaTitle: 'Domain Registration, DNS & Cloud Hosting Services',
    metaDescription: 'Secure domain registration, Anycast DNS, WHOIS privacy, and automated SSL encryption managed by WebTycoons.'
  },
  {
    slug: 'digital-marketing-solution',
    title: 'Digital Marketing Solution',
    shortDesc: 'Data-driven performance marketing: Google PPC ads, Meta campaigns, SEO, and conversion funnels engineered for maximum ROI.',
    description: 'Driving sustainable business growth requires more than just traffic—it demands high-intent, converting customers. Our performance marketing solutions encompass Google Search ads, Meta (Facebook & Instagram) ads, audience retargeting funnels, and conversion rate optimization to scale your revenue predictably.',
    overviewWhatIsIt: 'A full-funnel digital marketing strategy that combines paid media acquisition, advanced retargeting, creative ad design, and conversion tracking to acquire qualified leads and customers at the lowest possible cost per acquisition (CPA).',
    overviewWhoNeedsIt: 'Businesses wanting predictable customer acquisition, e-commerce stores looking to scale ROAS (Return on Ad Spend), and service providers needing a steady stream of qualified inbound sales leads.',
    overviewWhyChooseUs: 'We are obsessed with ROI, not vanity metrics. Every campaign is backed by conversion pixel tracking, A/B tested ad copy, continuous bid optimization, and transparent weekly reporting.',
    benefits: [
      { title: 'Predictable Pipeline', desc: 'Transform advertising spend into a consistent, measurable source of qualified inbound leads.' },
      { title: 'Lower Cost Per Lead', desc: 'Continuous negative keyword management and audience pruning to lower CPA week-over-week.' },
      { title: 'Hyper-Targeted Demographics', desc: 'Reach decision-makers filtered by exact job titles, income levels, interests, and buying intent.' },
      { title: 'Complete Funnel Attribution', desc: 'Track every dollar spent back to specific ad creatives, keywords, and booked revenue.' }
    ],
    features: [
      { title: 'Google Search & Shopping PPC', desc: 'Capturing high-intent buyers at the exact moment they search for your products or services.', icon: 'FaSearchDollar' },
      { title: 'Meta (Facebook & Instagram) Ads', desc: 'Visually engaging social ad campaigns targeted by demographics, interests, and lookalike audiences.', icon: 'FaRocket' },
      { title: 'Full-Funnel Retargeting', desc: 'Re-engaging visitors who left your site without purchasing, dramatically reducing bounce drop-offs.', icon: 'FaBolt' },
      { title: 'Precision Conversion Tracking', desc: 'Server-side tracking (CAPI) and Google Tag Manager setups to attribute every single conversion accurately.', icon: 'FaCogs' },
      { title: 'High-Converting Ad Creatives', desc: 'Custom designed video reels, carousels, and banner graphics engineered to stop the scroll.', icon: 'FaDesktop' },
      { title: 'A/B Split Testing', desc: 'Rigorous testing of headlines, hooks, landing pages, and CTAs to continually drive down acquisition costs.', icon: 'FaChartLine' },
      { title: 'Transparent Real-Time Dashboards', desc: '24/7 access to live metrics showing ad spend, CPC, conversion rate, and revenue generated.', icon: 'FaLaptopCode' },
      { title: 'Landing Page Optimization', desc: 'Fine-tuning post-click landing pages to ensure seamless alignment with ad messaging and higher conversion.', icon: 'FaMobileAlt' }
    ],
    process: [
      { step: '01', title: 'Market & Competitor Audit', desc: 'Analyzing your audience demographics, past campaign performance, and competitors’ top-performing ads.' },
      { step: '02', title: 'Funnel Architecture & Budgeting', desc: 'Formulating top-of-funnel (awareness), middle (consideration), and bottom (conversion) budget splits.' },
      { step: '03', title: 'Creative Production & Copywriting', desc: 'Writing compelling hooks and designing eye-catching creatives tailored to each platform.' },
      { step: '04', title: 'Tracking & Pixel Integration', desc: 'Setting up GA4, Meta Pixel, Conversions API, and custom event triggers for precise attribution.' },
      { step: '05', title: 'Campaign Launch & Bidding', desc: 'Deploying campaigns with algorithmic bidding strategies optimized for qualified conversions.' },
      { step: '06', title: 'Continuous Optimization & Scaling', desc: 'Pruning underperforming ads, scaling top winners, and expanding lookalike audiences for maximum profit.' }
    ],
    faq: [
      { question: 'How quickly can we see results from digital marketing?', answer: 'Paid advertising (Google and Meta Ads) begins driving targeted traffic and potential leads within 24 to 48 hours of campaign launch.' },
      { question: 'How do you decide our advertising budget?', answer: 'We calculate budget recommendations based on your average customer value, industry cost-per-click (CPC) benchmarks, and desired monthly lead targets.' },
      { question: 'Do you create the ad graphics and videos?', answer: 'Yes, our creative team designs all required banner visuals, video reels, and compelling ad copy as part of the service.' },
      { question: 'How do you track if the ads are actually generating sales?', answer: 'We implement advanced server-side conversion tracking (Conversions API and Google Tag Manager) to track phone calls, form fills, and purchases directly to ad spend.' },
      { question: 'What reporting will I receive?', answer: 'You receive access to a live 24/7 dashboard as well as comprehensive bi-weekly and monthly strategy review calls detailing ROAS, CPA, and growth opportunities.' }
    ],
    image: '/assets/img/homeservice/service7.webp',
    breadcrumbImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    metaTitle: 'Digital Marketing & Performance Growth Solutions',
    metaDescription: 'Scale your business with high-ROI Google Ads, Meta Ads, and full-funnel conversion marketing managed by WebTycoons.'
  },
  {
    slug: 'email-solution',
    title: 'Email Solution',
    shortDesc: 'Enterprise business email hosting with 99.99% uptime, advanced spam filtering, custom domain branding, and cloud synchronization.',
    description: 'Establish instant trust and authority with custom business email addresses matching your domain. We deploy and manage enterprise email solutions on Google Workspace, Microsoft 365, and secure private cloud mail servers, featuring spam shields, multi-device sync, and seamless migration.',
    overviewWhatIsIt: 'Enterprise email solutions provide reliable, secure, and professional email infrastructure with dedicated spam protection, DKIM/SPF/DMARC authentication to guarantee inbox delivery, and unified calendar/contact integration.',
    overviewWhoNeedsIt: 'Businesses moving away from generic @gmail or @yahoo addresses to establish professional credibility, corporate teams requiring calendar collaboration, and organizations needing encrypted communication.',
    overviewWhyChooseUs: 'We handle complete end-to-end DNS configuration, zero-data-loss migration of your old inboxes, two-factor authentication security, and ongoing administrative support.',
    benefits: [
      { title: 'Executive Authority', desc: 'Clients are 9x more likely to trust business inquiries from a branded domain email.' },
      { title: 'Zero Inbox Spam', desc: 'Multi-layer anti-spam and phishing algorithms eliminate 99.9% of incoming malicious threats.' },
      { title: 'Universal Device Sync', desc: 'Emails, calendar events, and corporate contacts sync instantly across phone, tablet, and PC.' },
      { title: 'Guaranteed Deliverability', desc: 'Full SPF, DKIM, and DMARC enforcement ensures your outgoing emails bypass spam filters.' }
    ],
    features: [
      { title: 'Custom Domain Branding', desc: 'Professional addresses like yourname@yourcompany.com that establish immediate client trust.', icon: 'FaGlobe' },
      { title: '99.99% Uptime SLA', desc: 'Enterprise-grade mail servers ensuring your critical business communication is never interrupted.', icon: 'FaServer' },
      { title: 'AI Spam & Anti-Phishing Shield', desc: 'Multi-layer security filtering out malicious attachments, ransomware, and unsolicited spam.', icon: 'FaShieldAlt' },
      { title: 'SPF, DKIM & DMARC Delivery', desc: 'Strict cryptographic email authentication configured so your emails never land in client spam folders.', icon: 'FaCheckCircle' },
      { title: 'Seamless Multi-Device Sync', desc: 'Real-time synchronization across iPhone, Android, Outlook, Mac Mail, and browser webmail.', icon: 'FaMobileAlt' },
      { title: 'Large Mailbox Storage & Cloud Drive', desc: 'Generous storage per user for high-res attachments, archives, and cloud document collaboration.', icon: 'FaDesktop' },
      { title: 'Zero-Downtime Inbox Migration', desc: 'We seamlessly migrate existing emails, folders, and contacts from legacy hosts with zero data loss.', icon: 'FaBolt' },
      { title: 'Shared Calendars & Contacts', desc: 'Integrated team scheduling, conference room booking, and unified corporate address books.', icon: 'FaCogs' }
    ],
    process: [
      { step: '01', title: 'Architecture & Platform Selection', desc: 'Recommending the ideal platform (Google Workspace, Microsoft 365, or Private Cloud) for your team size.' },
      { step: '02', title: 'DNS Authentication Configuration', desc: 'Adding MX, SPF, DKIM, and DMARC records to ensure bulletproof inbox deliverability.' },
      { step: '03', title: 'Account Provisioning & Security', desc: 'Setting up user mailboxes, aliases, distribution groups, and two-factor authentication policies.' },
      { step: '04', title: 'Legacy Data Migration', desc: 'Migrating historical emails, folder structures, and contacts securely without interrupting active operations.' },
      { step: '05', title: 'Device Setup & Team Onboarding', desc: 'Guiding your team on connecting accounts to Outlook, Apple Mail, and mobile devices.' }
    ],
    faq: [
      { question: 'Can I keep my existing emails when switching to WebTycoons?', answer: 'Yes. Our team performs complete server-to-server migrations, moving all your emails, folders, sent items, and contacts with zero loss.' },
      { question: 'Why should I use a custom domain email instead of free Gmail?', answer: 'Emails sent from a custom domain (e.g. info@yourcompany.com) convey professionalism, legitimacy, and trust. Clients are over 9 times more likely to choose a company with a professional email address.' },
      { question: 'How do you prevent our emails from going into spam?', answer: 'We implement rigorous industry standards including SPF, DKIM, and DMARC policies that verify your domain identity to recipient mail servers.' },
      { question: 'Can I access my emails on my mobile phone?', answer: 'Yes, all accounts sync seamlessly in real time with Outlook, Apple Mail, Gmail app, and native mobile email clients on both iOS and Android.' }
    ],
    image: '/assets/img/homeservice/service8.webp',
    breadcrumbImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=2000&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1200&auto=format&fit=crop',
    metaTitle: 'Professional Business Email Hosting Solutions',
    metaDescription: 'Secure enterprise business email with custom domain branding, SPF/DKIM authentication, and 99.99% uptime SLA.'
  }
];

async function updateServices() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to DB');

  const servicesCollection = mongoose.connection.collection('services');

  for (const item of servicesToUpdate) {
    const res = await servicesCollection.updateOne(
      { slug: item.slug },
      { $set: item },
      { upsert: true }
    );
    console.log(`Updated ${item.slug}: matched ${res.matchedCount}, modified ${res.modifiedCount}, upserted ${res.upsertedId}`);
  }

  console.log('All services successfully updated in MongoDB!');
  process.exit(0);
}

updateServices().catch(e => {
  console.error('Error updating services:', e);
  process.exit(1);
});
