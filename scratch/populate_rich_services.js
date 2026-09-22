import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const matchMongo = envContent.match(/MONGO_URI=([^\r\n]+)/);
const MONGO_URI = matchMongo ? matchMongo[1].trim() : null;

const SERVICES_DATA = [
  {
    slug: 'website-designing',
    title: 'Website Designing',
    shortDesc: 'Crafting visually stunning, user-centric digital experiences that captivate visitors, elevate brand authority, and maximize conversions.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    description: 'Our bespoke UI/UX website designing services bridge the gap between creative visual artistry and strategic commercial outcomes. We craft interactive, responsive design architectures tailored to elevate your brand above digital noise. From custom component libraries and design tokens to high-fidelity Figma prototypes, every element is designed to captivate your audience and deliver smooth conversion pathways.',
    overviewWhatIsIt: 'Website Designing is the comprehensive architectural process of planning, conceptualizing, and styling interactive user interfaces for web platforms. It encompasses visual hierarchy, typography systems, color harmony, user empathy flows, responsive grids, and micro-interactions that together define how users experience and interact with your digital brand.',
    overviewWhoNeedsIt: 'Enterprises wanting a premium market repositioning, growing D2C brands that require high-converting storefronts, startups preparing for funding rounds, and B2B corporations looking to project unquestioned credibility and industry leadership.',
    overviewWhyChooseUs: 'At WebTycoons, we do not use pre-made cookie-cutter themes. Every digital canvas is custom engineered in Figma from scratch with bespoke design tokens, fluid typography, atomic layout grids, and conversion-optimized behavioral funnels that double average session duration and slash bounce rates.',
    benefits: [
      { title: 'Elevated Brand Authority', desc: 'Instant premium first impression that builds trust with enterprise buyers and affluent consumers.' },
      { title: 'Higher Conversion Rates', desc: 'Strategically structured user pathways, clear call-to-actions, and friction-free user journeys.' },
      { title: '100% Mobile-First Responsiveness', desc: 'Flawless visual rendering and tactile touch responsiveness across smartphones, tablets, and 4K displays.' },
      { title: 'Reduced Bounce Rates', desc: 'Captivating visual hierarchy, fast-loading visual assets, and engaging micro-interactions that retain visitors.' },
      { title: 'Scalable Design System', desc: 'Component-based Figma libraries and tokens enabling rapid future expansion with absolute brand consistency.' }
    ],
    features: [
      { title: 'Bespoke UI/UX Architecture', desc: 'Original layouts engineered around your unique value proposition without generic templates.', icon: 'FaPaintBrush' },
      { title: 'Mobile-First Fluid Grids', desc: 'Adaptive layouts optimized for thumb-friendly navigation across all mobile viewports.', icon: 'FaMobileAlt' },
      { title: 'Interactive Figma Prototypes', desc: 'Clickable high-fidelity wireframes that let you experience user flows prior to production coding.', icon: 'FaLayerGroup' },
      { title: 'Design Systems & Tokens', desc: 'Centralized typography, color ramps, spacing scales, and iconography guides.', icon: 'FaCogs' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Strategic visual hierarchy, eye-tracking scan lines, and trust cues placed for maximum conversions.', icon: 'FaChartLine' },
      { title: 'Micro-Interactions & Motion Accents', desc: 'Subtle hover states, smooth transitions, and tactile feedback that make interfaces feel alive.', icon: 'FaBolt' },
      { title: 'Accessibility & WCAG Compliance', desc: 'Color contrast optimization, accessible keyboard navigation, and screen-reader compatibility.', icon: 'FaUniversalAccess' },
      { title: 'Cross-Browser Visual Perfection', desc: 'Rigorous pixel-perfection across Chrome, Safari, Firefox, Edge, and iOS WebKit.', icon: 'FaCheckCircle' }
    ],
    portfolio: [
      {
        name: 'Aura Luxury Living',
        category: 'UI/UX Architecture',
        tech: 'Figma, Tailwind, Next.js',
        desc: 'Ultra-luxury interior design agency website with interactive 3D spaces and editorial typography.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Nova Wealth Platform',
        category: 'Fintech SaaS',
        tech: 'React, Glassmorphism, Framer Motion',
        desc: 'Modern wealth management dashboard showcasing real-time asset analytics and clean UI.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Verde Botanicals',
        category: 'D2C Lifestyle',
        tech: 'Figma, Next.js, Headless Commerce',
        desc: 'Organic wellness brand storefront with immersive micro-interactions and editorial layouts.',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Apex Legal Counsel',
        category: 'Corporate Law Firm',
        tech: 'Figma, Clean Typography, Next.js',
        desc: 'Authoritative international litigation firm website with interactive attorney directories.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Discovery & Brand Analysis', desc: 'We examine your business goals, target audience demographics, competitor benchmarks, and core value proposition.' },
      { step: '02', title: 'Wireframing & Information Architecture', desc: 'Mapping structural page layouts, navigation hierarchies, and conversion funnels in low-fidelity wireframes.' },
      { step: '03', title: 'Visual UI Design & Styling', desc: 'Crafting bespoke typography systems, rich color palettes, and component libraries that encapsulate your brand.' },
      { step: '04', title: 'Interactive Figma Prototyping', desc: 'Building fully clickable prototypes demonstrating real user interaction, hover motions, and navigation.' },
      { step: '05', title: 'Client Feedback & Design Iteration', desc: 'Collaborative review sessions where we refine every button, spacing token, and layout until 100% perfection.' },
      { step: '06', title: 'Design Token & Asset Export', desc: 'Comprehensive developer handoff with CSS variables, SVGs, high-resolution imagery, and UI documentation.' }
    ],
    whyChooseUs: [
      { title: 'Zero Cookie-Cutter Templates', desc: 'Every layout is custom crafted from a blank canvas in Figma specifically for your brand DNA.', icon: 'FaPaintBrush' },
      { title: 'Conversion-Focused Strategy', desc: 'We merge psychological color theory and eye-path tracking to turn casual visitors into paying leads.', icon: 'FaChartLine' },
      { title: 'Obsessive Pixel Perfection', desc: 'Every margin, padding unit, letter-spacing, and line-height is dialed in with rigorous mathematical discipline.', icon: 'FaAward' },
      { title: 'Full Ownership of Figma Files', desc: 'You receive complete, organized design files with all styles, components, and master vectors.', icon: 'FaLock' },
      { title: 'Rapid Turnaround Times', desc: 'Structured agile sprints ensuring initial design concepts are in your hands within days, not months.', icon: 'FaRocket' },
      { title: 'Dedicated Art Director', desc: 'Direct access to senior creative designers throughout your project lifecycle.', icon: 'FaUsers' }
    ],
    faq: [
      { question: 'How long does a custom website design project take?', answer: 'Most custom UI/UX design projects are completed within 2 to 4 weeks depending on page count and interaction complexity. We begin with discovery wireframes in week one and deliver interactive Figma prototypes shortly after.' },
      { question: 'Do I get access to the editable Figma source files?', answer: 'Yes, absolutely! You receive complete, organized Figma design files including all component libraries, vector assets, typography tokens, and high-resolution export files with full commercial ownership.' },
      { question: 'Can you redesign our existing website without changing our backend?', answer: 'Yes! We can preserve your existing backend databases and APIs while completely modernizing your front-facing user interface, layout structure, and aesthetic experience.' },
      { question: 'How do you handle design revisions and feedback?', answer: 'We conduct iterative design sprints with built-in revision rounds. You can leave comments directly inside the interactive Figma prototype or discuss changes during video walkthroughs.' },
      { question: 'Is the design optimized for mobile devices?', answer: 'Every project is created with a strict mobile-first methodology. We design dedicated layouts for mobile phones, tablets, laptops, and ultra-wide desktops.' }
    ],
    metaTitle: 'UI/UX Website Designing Services | The WebTycoons',
    metaDescription: 'Custom website designing and UI/UX architecture by WebTycoons. Bespoke Figma designs, conversion funnels, and mobile-first layouts engineered to win clients.'
  },
  {
    slug: 'static-website-development',
    title: 'Static Website Development',
    shortDesc: 'Blazing-fast, ultra-secure static websites built with cutting-edge JAMstack technology and global edge delivery.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'We develop ultra-fast, rock-solid static websites using modern JAMstack architecture (Next.js SSG, HTML5, CSS3, Tailwind, and Cloudflare/Vercel edge networks). Pre-rendered at build time into pure static assets, our static websites boast zero server database vulnerabilities, flawless 100/100 Google Lighthouse scores, and sub-second loading speeds worldwide at a fraction of traditional hosting costs.',
    overviewWhatIsIt: 'Static Website Development utilizes modern Static Site Generation (SSG) to compile web pages into lightweight, pre-rendered HTML, CSS, and optimized JavaScript files. These assets are distributed across globally synchronized Edge Content Delivery Networks (CDNs), serving users instantly from the nearest geographic server node.',
    overviewWhoNeedsIt: 'Corporate firms, professional service agencies, industrial manufacturers, product landing pages, portfolios, and marketing campaigns that prioritize instant load times, bulletproof cybersecurity, and near-zero server infrastructure maintenance.',
    overviewWhyChooseUs: 'WebTycoons pioneers JAMstack performance engineering. We do not just build simple static files; we integrate pre-rendered Next.js SSG, automated image pipelines (AVIF/WebP), semantic SEO JSON-LD schema, and serverless edge functions for lead forms with zero hosting bloat.',
    benefits: [
      { title: 'Sub-Second Loading Speeds', desc: 'Pre-rendered static files delivered directly from edge caches with TTFB under 50ms.' },
      { title: 'Bulletproof Cybersecurity', desc: 'No backend database connection or vulnerable PHP scripts for attackers to exploit.' },
      { title: 'Near-Zero Hosting Costs', desc: 'Static edge hosting eliminates the need for expensive dedicated cloud virtual machines.' },
      { title: 'Flawless 100/100 Core Web Vitals', desc: 'Perfect scores on Google PageSpeed Insights, directly elevating your organic search rank.' },
      { title: 'Infinite Traffic Scalability', desc: 'Effortlessly handles viral traffic spikes without server crashes or latency degradation.' }
    ],
    features: [
      { title: 'JAMstack Edge Architecture', desc: 'Pre-compiled static delivery for maximum performance and lightning-fast worldwide response.', icon: 'FaBolt' },
      { title: 'Zero Server Vulnerabilities', desc: 'Eliminates SQL injection, database exploits, and server-side attacks entirely.', icon: 'FaShieldAlt' },
      { title: 'Perfect Core Web Vitals', desc: 'Engineered for sub-1-second Largest Contentful Paint (LCP) and zero Cumulative Layout Shift (CLS).', icon: 'FaRocket' },
      { title: 'Automated Image Optimization', desc: 'Responsive WebP and AVIF generation ensuring crisp visuals without large file weight.', icon: 'FaImage' },
      { title: 'SEO-Structured Markup', desc: 'Semantic HTML5, automated XML sitemaps, OpenGraph meta tags, and JSON-LD schema.', icon: 'FaSearch' },
      { title: 'Serverless Contact Forms', desc: 'Secure serverless email delivery (Resend / AWS SES) with anti-spam honeypots.', icon: 'FaEnvelope' },
      { title: 'Mobile-First Fluid Layout', desc: 'Pixel-perfect rendering across all screen resolutions and browser platforms.', icon: 'FaMobileAlt' },
      { title: 'Global CDN Acceleration', desc: 'Distributed across 300+ edge locations worldwide for instantaneous localized delivery.', icon: 'FaGlobe' }
    ],
    portfolio: [
      {
        name: 'Pulse Logistics Global',
        category: 'Edge JAMstack Site',
        tech: 'Next.js SSG, Tailwind, Vercel Edge',
        desc: 'Global supply chain enterprise website achieving 99/100 Google Lighthouse score and instant edge loading.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Strata Architecture',
        category: 'Portfolio & Showcase',
        tech: 'Next.js, Framer Motion, Cloudflare',
        desc: 'Minimalist architecture firm portfolio showcasing high-resolution projects with zero load lag.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Helios Clean Energy',
        category: 'Corporate ESG Hub',
        tech: 'Static JAMstack, SEO Schema',
        desc: 'Renewable energy corporate portal featuring interactive static sustainability reports.',
        image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'AeroMed Biopharma',
        category: 'Static Institutional Portal',
        tech: 'Next.js SSG, WebP Image Pipeline',
        desc: 'Medical research and pharmaceutical company static web presence with military-grade security.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Requirements & Content Architecture', desc: 'Defining page structure, content blueprints, brand assets, and conversion goals.' },
      { step: '02', title: 'JAMstack Component Engineering', desc: 'Coding modular HTML5, modern CSS/Tailwind, and lightweight interactive JavaScript.' },
      { step: '03', title: 'Automated Asset Optimization', desc: 'Compressing and converting imagery to AVIF/WebP, minifying code bundles, and inlining critical CSS.' },
      { step: '04', title: 'SEO & Schema Integration', desc: 'Implementing structured data, open graph tags, canonical links, and automated sitemap generation.' },
      { step: '05', title: 'Edge CDN Deployment', desc: 'Deploying to global edge networks (Cloudflare/Vercel) with instant SSL certificate provisioning.' },
      { step: '06', title: 'Lighthouse Performance Verification', desc: 'Rigorous audit testing to guarantee green 95+ scores across Performance, Accessibility, and SEO.' }
    ],
    whyChooseUs: [
      { title: 'Sub-Second Performance', desc: 'We obsess over web performance metrics to guarantee lightning-fast load times.', icon: 'FaBolt' },
      { title: 'Zero Maintenance Burden', desc: 'No database patches, security vulnerabilities, or server downtime worries.', icon: 'FaShieldAlt' },
      { title: '100% Uptime Reliability', desc: 'Backed by enterprise global edge CDNs with 99.99% historical uptime.', icon: 'FaServer' },
      { title: 'Clean, Semantic Code', desc: 'Crafted with clean code standards that search engine crawlers understand and reward.', icon: 'FaCode' },
      { title: 'Serverless Forms & CRM', desc: 'Seamlessly capture leads with anti-spam honeypots and automated email/CRM sync.', icon: 'FaEnvelope' },
      { title: 'Dedicated Lifetime Support', desc: 'Ongoing technical guidance, domain management, and annual maintenance assurance.', icon: 'FaHeadset' }
    ],
    faq: [
      { question: 'What is the main difference between a static and dynamic website?', answer: 'A static website serves pre-rendered HTML/CSS/JS files directly from a global Content Delivery Network, making it extraordinarily fast and impervious to database hacking. A dynamic website uses a live database to generate content on-the-fly for features like user logins and complex catalogs.' },
      { question: 'Can I update content on a static website?', answer: 'Yes! Static websites can be integrated with Headless CMS platforms or Git repositories. When you publish an update, the site automatically rebuilds and deploys globally in seconds.' },
      { question: 'Will my contact form work on a static website?', answer: 'Yes! We integrate secure serverless API endpoints (such as Resend, Formspree, or AWS SES) that deliver inquiries directly to your email inbox and CRM with reCAPTCHA anti-spam protection.' },
      { question: 'How does static web development benefit SEO?', answer: 'Google ranks websites that load quickly and deliver stable Core Web Vitals higher. Because static websites load in under a second and feature clean semantic HTML, search crawlers index them rapidly and rank them favorably.' },
      { question: 'Where is the static website hosted?', answer: 'We deploy static websites on premier global edge networks like Vercel, Cloudflare Pages, or AWS CloudFront, providing automatic SSL certificates, infinite scaling, and 99.99% uptime.' }
    ],
    metaTitle: 'Static Website Development Services | The WebTycoons',
    metaDescription: 'High-speed static website development using JAMstack and edge CDNs. Flawless 100/100 Core Web Vitals, zero database vulnerabilities, and sub-second load times.'
  },
  {
    slug: 'dynamic-website-development',
    title: 'Dynamic Website Development',
    shortDesc: 'Scalable, database-driven web applications and CMS platforms engineered with Next.js, Node.js, and MongoDB.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
    description: 'Our dynamic website development solutions provide full-stack web applications equipped with custom administrative dashboards, secure role-based access, and flexible database architectures. Built on Next.js 15, Node.js, and MongoDB, our dynamic platforms empower you to publish content, manage customer accounts, automate business workflows, and scale seamlessly without writing a single line of code.',
    overviewWhatIsIt: 'Dynamic Website Development involves creating feature-rich web platforms powered by server-side logic, real-time database interactions, and customized Content Management Systems (CMS). Unlike static pages, dynamic websites generate tailored content based on user inputs, database records, and authentication states.',
    overviewWhoNeedsIt: 'Businesses requiring frequent content publishing, customer login portals, real estate directories, recruitment boards, SaaS dashboards, booking engines, and organizations with multi-tiered team workflows.',
    overviewWhyChooseUs: 'We deliver tailored full-stack architectures built on Next.js App Router and high-availability databases. Every admin dashboard is custom tailored to your exact operational workflow, featuring drag-and-drop media managers, rich text editors, and role-based access controls.',
    benefits: [
      { title: 'Effortless Content Management', desc: 'Update blogs, portfolio items, team rosters, and services in seconds through an intuitive custom dashboard.' },
      { title: 'Role-Based User Permissions', desc: 'Secure authentication system allowing distinct access privileges for super admins, editors, and clients.' },
      { title: 'Interactive User Features', desc: 'Dynamic search filters, customer account portals, bookmarking, and interactive data forms.' },
      { title: 'Enterprise Database Scaling', desc: 'MongoDB and PostgreSQL database models optimized with indexing for millions of dynamic records.' },
      { title: 'Automated Business Workflows', desc: 'Direct webhook integrations with payment gateways, email marketing, and third-party CRMs.' }
    ],
    features: [
      { title: 'Custom Admin Dashboard', desc: 'Intuitive interface with live previews, media manager, and granular content controls.', icon: 'FaCogs' },
      { title: 'Robust Database Architecture', desc: 'High-availability MongoDB cluster with indexed queries and automated daily backups.', icon: 'FaDatabase' },
      { title: 'Secure Authentication & Roles', desc: 'JWT-based token authentication, bcrypt password hashing, and role-based permissions.', icon: 'FaLock' },
      { title: 'Third-Party API Integrations', desc: 'Seamless connections with payment gateways, WhatsApp APIs, and enterprise CRMs.', icon: 'FaPlug' },
      { title: 'Real-Time Data Processing', desc: 'Instantaneous UI updates via Server-Sent Events or WebSockets for live notifications.', icon: 'FaBolt' },
      { title: 'Faceted Search & Filtering', desc: 'Sub-millisecond keyword search and multi-parameter filtering across thousands of records.', icon: 'FaSearch' },
      { title: 'Automated Lead Capture & CRM', desc: 'Form submissions automatically validated, stored in database, and synced to sales pipelines.', icon: 'FaChartLine' },
      { title: 'Enterprise Cloud Deployment', desc: 'Containerized deployment on high-availability cloud infrastructure with 99.99% uptime.', icon: 'FaServer' }
    ],
    portfolio: [
      {
        name: 'Kredence B2B Marketplace',
        category: 'Vendor Dynamic Portal',
        tech: 'Next.js 15, Node.js, MongoDB, Tailwind',
        desc: 'Multi-vendor B2B procurement portal with automated quote generation and supplier dashboards.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'TalentMesh Global',
        category: 'AI Candidate Job Board',
        tech: 'Next.js, MongoDB, Custom CMS',
        desc: 'Interactive hiring platform with dynamic candidate filtering, resume parsing, and employer portals.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'OmniCare Clinic Cloud',
        category: 'Patient Booking & EHR',
        tech: 'React, Node.js, Secure Auth, Calendar Sync',
        desc: 'Healthcare appointment booking portal with automated SMS/email reminders and doctor schedules.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Zenith Academy',
        category: 'Learning Management System',
        tech: 'Next.js, Video Streaming, MongoDB',
        desc: 'Educational course portal with student dashboards, progress tracking, and automated certifications.',
        image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Data Modeling & Schema Design', desc: 'Architecting MongoDB schemas, relations, field validations, and entity relationship diagrams.' },
      { step: '02', title: 'RESTful API & Server Actions', desc: 'Developing secure endpoints with input validation, JWT authentication, and pagination.' },
      { step: '03', title: 'Admin CMS Dashboard Engineering', desc: 'Building custom dashboard UI with data tables, search filters, modal forms, and media uploads.' },
      { step: '04', title: 'Front-End State & UI Binding', desc: 'Connecting dynamic backend endpoints with client-side reactive components and optimistic updates.' },
      { step: '05', title: 'Security & Penetration Testing', desc: 'Sanitizing inputs to prevent XSS/SQLi, rate-limiting API calls, and verifying CSRF tokens.' },
      { step: '06', title: 'Production Cloud Deployment', desc: 'Deploying database clusters, configuring automated nightly backups, and monitoring server health.' }
    ],
    whyChooseUs: [
      { title: 'Custom-Built For Your Workflow', desc: 'No clunky generic WordPress plugins. We build the exact admin fields and controls you need.', icon: 'FaCogs' },
      { title: 'Enterprise-Grade Security', desc: 'Encrypted passwords, secure session cookies, sanitization pipelines, and HTTPS encryption.', icon: 'FaLock' },
      { title: 'Lightning-Fast Next.js 15', desc: 'Hybrid server-side rendering and client-side caching for instant page transitions.', icon: 'FaRocket' },
      { title: 'Unlimited Content Scaling', desc: 'Database architecture designed to store hundreds of thousands of dynamic entries smoothly.', icon: 'FaDatabase' },
      { title: 'Complete Source Code Ownership', desc: 'You own 100% of the proprietary source code, database schemas, and intellectual property.', icon: 'FaAward' },
      { title: 'Comprehensive Admin Training', desc: 'We provide personalized video walkthroughs and documentation for your content team.', icon: 'FaUsers' }
    ],
    faq: [
      { question: 'Can I manage website content myself without any coding experience?', answer: 'Yes! We create an intuitive, custom-tailored administrative dashboard where you can easily add, edit, or delete services, blog posts, banners, team members, and media with a few clicks.' },
      { question: 'What database technology do you use for dynamic websites?', answer: 'We primarily utilize MongoDB Atlas for high-speed document storage and schema flexibility, or PostgreSQL for relational transactions, hosted on enterprise cloud clusters with automated daily backups.' },
      { question: 'How secure is user data and login credentials?', answer: 'Security is paramount. Passwords are encrypted with bcrypt, authentication tokens use signed JWTs with httpOnly cookie flags, and all API endpoints feature rigorous validation to block injection attacks.' },
      { question: 'Can we integrate third-party APIs like payment gateways and CRMs?', answer: 'Yes! We frequently integrate Razorpay, Stripe, WhatsApp Business API, HubSpot, Salesforce, Zoho, Google Workspace, and custom REST/GraphQL endpoints.' },
      { question: 'What happens if our website experiences high traffic spikes?', answer: 'Our dynamic platforms are built on modern cloud architectures (like Vercel and Node.js microservices) that automatically scale server resources in response to traffic surges.' }
    ],
    metaTitle: 'Dynamic Website Development Services | The WebTycoons',
    metaDescription: 'Custom dynamic website development with Next.js, Node.js, and MongoDB. Bespoke admin CMS, secure authentication, and scalable database architecture.'
  },
  {
    slug: 'e-commerce-website-development',
    title: 'E-Commerce Website Development',
    shortDesc: 'High-converting online storefronts engineered with seamless checkouts, automated inventory, and multi-gateway payments.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
    description: 'We build high-converting e-commerce storefronts designed to maximize average order value (AOV) and turn browsers into loyal repeat customers. Whether you require custom headless e-commerce built on Next.js or a tailored Shopify Plus architecture, our solutions feature lightning-fast single-page checkouts, integrated UPI/Razorpay/Stripe payment gateways, automated abandoned cart recovery, and real-time inventory management.',
    overviewWhatIsIt: 'E-Commerce Website Development is the end-to-end engineering of digital retail storefronts. It encompasses product catalogs, faceted search filtering, secure shopping carts, multi-currency payment processing, automated shipping label generation, tax calculation, and customer retention systems.',
    overviewWhoNeedsIt: 'Direct-to-Consumer (D2C) brands, boutique retailers, manufacturing wholesalers, and retail businesses transitioning to digital sales channels who require a frictionless purchasing experience.',
    overviewWhyChooseUs: 'Most e-commerce websites suffer from high checkout abandonment due to slow loading speeds and clunky steps. WebTycoons builds sub-second, frictionless checkout funnels optimized for mobile thumb scrolling, 1-click UPI payments, and automated WhatsApp abandoned cart sequences that boost conversion rates by up to 35%.',
    benefits: [
      { title: 'Higher Checkout Conversions', desc: 'Streamlined single-page checkout optimized for mobile users with instant 1-click payment options.' },
      { title: 'Zero Cart Abandonment Leaks', desc: 'Automated WhatsApp and email recovery sequences that recapture lost sales automatically.' },
      { title: 'Real-Time Inventory Synchronization', desc: 'Centralized stock management preventing overselling across multiple sales channels.' },
      { title: 'Multi-Payment Gateway Support', desc: 'Instant support for UPI, Credit/Debit cards, Net Banking, EMI, Cash on Delivery (COD), and Stripe/PayPal.' },
      { title: 'High-Ticket Product Showcase', desc: 'High-resolution zoom galleries, variant pickers, video previews, and verified customer reviews.' }
    ],
    features: [
      { title: 'High-Conversion Product Pages', desc: 'Optimized galleries, sticky Add-to-Cart buttons, urgency cues, and trust badges.', icon: 'FaShoppingBag' },
      { title: 'Seamless Multi-Gateway Checkout', desc: 'Integrated Razorpay, Stripe, PhonePe, Cashfree, and COD with automated OTP verification.', icon: 'FaCreditCard' },
      { title: 'Real-Time Inventory Management', desc: 'Low-stock automated alerts, SKU tracking, and variant-specific inventory controls.', icon: 'FaBoxes' },
      { title: 'Automated Abandoned Cart Recovery', desc: 'Instant WhatsApp and email reminder triggers that bring customers back to complete purchases.', icon: 'FaShoppingCart' },
      { title: 'Smart Search & Faceted Filtering', desc: 'Instant search suggestions, price sliders, size/color swatches, and category tags.', icon: 'FaSearch' },
      { title: 'Promotional Discounts & Coupons', desc: 'Flexible coupon rules, automatic BOGO deals, free shipping thresholds, and flash sales.', icon: 'FaTags' },
      { title: 'Customer Account & Order History', desc: 'Self-service customer portal for order tracking, invoice downloads, and returns.', icon: 'FaUser' },
      { title: 'E-Commerce Schema & Google Shopping', desc: 'Rich Product Schema markup enabling price, availability, and review stars in Google search.', icon: 'FaChartLine' }
    ],
    portfolio: [
      {
        name: 'Velvet & Stone',
        category: 'Luxury Apparel Store',
        tech: 'Next.js Commerce, Razorpay, Tailwind',
        desc: 'High-end designer clothing brand with single-page checkout and automated WhatsApp order notifications.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Kavita Jewellers',
        category: 'High-Ticket Fine Jewellery',
        tech: 'Shopify Plus, Custom Liquid, Custom Checkout',
        desc: 'Precious gemstone and diamond boutique featuring certificate verification and customized gifting flows.',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'BrewCraft Roasters',
        category: 'Subscription Coffee',
        tech: 'Next.js, Stripe Recurring Billing, MongoDB',
        desc: 'Artisan coffee subscription platform with flexible weekly/monthly grind customization.',
        image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Aura Audio Co.',
        category: 'Consumer Electronics',
        tech: 'Headless E-Commerce, 3D Product Viewers',
        desc: 'Audiophile headphone brand store featuring 360-degree interactive product models and fast checkout.',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Product Architecture & User Journey', desc: 'Planning taxonomy, category trees, product attributes, and checkout conversion funnel.' },
      { step: '02', title: 'E-Commerce UI/UX Design', desc: 'Crafting mobile-first product pages, thumb-accessible filters, and frictionless checkout steps in Figma.' },
      { step: '03', title: 'Catalog Setup & Database Configuration', desc: 'Importing SKUs, variants, high-resolution imagery, pricing tiers, and tax configurations.' },
      { step: '04', title: 'Payment & Logistics Integration', desc: 'Connecting payment gateways (Razorpay/Stripe) and automated shipping partners (Shiprocket/Delhivery).' },
      { step: '05', title: 'End-to-End Transaction Testing', desc: 'Testing real payment captures, refunds, abandoned cart triggers, and mobile checkout reliability.' },
      { step: '06', title: 'Launch & Conversion Optimization', desc: 'Going live with analytics event tracking (Meta Pixel, Google Tag Manager, GA4 E-Commerce).' }
    ],
    whyChooseUs: [
      { title: 'Engineered For High Conversions', desc: 'Every layout decision is optimized to eliminate checkout friction and increase average order values.', icon: 'FaChartLine' },
      { title: 'Sub-Second Page Speeds', desc: 'Fast product page loading that dramatically reduces bounce rates on mobile ad campaigns.', icon: 'FaBolt' },
      { title: '1-Click UPI & Card Payments', desc: 'Deep payment gateway integrations ensuring rapid, failure-free checkouts for Indian & global buyers.', icon: 'FaCreditCard' },
      { title: 'Automated Logistics & Invoicing', desc: 'Auto-generate GST invoices and sync with leading shipping couriers for automated tracking.', icon: 'FaBoxes' },
      { title: 'Zero Vendor Lock-In', desc: 'Full ownership of customer data, product databases, and custom source code.', icon: 'FaLock' },
      { title: 'Ongoing Conversion Optimization', desc: 'Post-launch analytics review to continuously refine product pages and marketing funnels.', icon: 'FaRocket' }
    ],
    faq: [
      { question: 'Which e-commerce platform do you recommend for our brand?', answer: 'We build custom headless storefronts using Next.js for high-speed custom requirements, or custom Shopify Plus themes for traditional e-commerce. We recommend the best platform based on your catalog size, payment needs, and technical goals.' },
      { question: 'Which payment gateways can we accept payments through?', answer: 'We integrate all major Indian and international gateways including Razorpay, Stripe, PhonePe, Paytm, Cashfree, PayPal, as well as Cash on Delivery (COD) with OTP confirmation.' },
      { question: 'Can our store integrate with shipping couriers automatically?', answer: 'Yes! We connect your store directly with shipping aggregators like Shiprocket, Delhivery, Bluedart, and iThink Logistics to automate AWB generation, label printing, and customer tracking.' },
      { question: 'How do automated abandoned cart reminders work?', answer: 'When a shopper enters their phone number or email and abandons their cart, our automated system triggers customized WhatsApp and email reminders with one-click direct recovery links.' },
      { question: 'Is the e-commerce store secure for customer credit card details?', answer: 'Yes. All payments are processed through PCI-DSS Level 1 compliant gateway SDKs with 256-bit SSL encryption. Sensitive card data never touches your web server directly.' }
    ],
    metaTitle: 'E-Commerce Website Development Services | The WebTycoons',
    metaDescription: 'High-converting e-commerce web development with Next.js and Shopify. Seamless UPI/card checkouts, automated inventory, and abandoned cart recovery.'
  },
  {
    slug: 'logo-designing',
    title: 'Logo Designing & Brand Identity',
    shortDesc: 'Distinctive, memorable brand marks and comprehensive visual identity systems crafted for long-term recognition.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1200&auto=format&fit=crop',
    description: 'A great logo is more than just an attractive symbol; it is the visual cornerstone of your company’s market reputation. At WebTycoons, we craft bespoke brand marks grounded in mathematical grid geometry, timeless aesthetic principles, and behavioral color psychology. Our logo design services deliver complete visual identity packages including full vector master files, typography pairing rules, stationery collateral, and brand guideline manuals.',
    overviewWhatIsIt: 'Logo Designing is the strategic discipline of distilling a brand’s core mission, ethos, and industry authority into a clean, timeless visual symbol. It encompasses conceptual sketching, geometric grid construction, color theory, typography hierarchy, and multi-format vector engineering.',
    overviewWhoNeedsIt: 'New startups establishing their first brand presence, established corporations requiring a modern rebrand, and businesses launching specialized product lines or subsidiary ventures.',
    overviewWhyChooseUs: 'We never use generic clip-art generators or AI templates. Every logo begins with pencil-on-paper conceptual sketching, followed by precision vector construction in Adobe Illustrator using golden ratio geometric grids to ensure timeless elegance and mathematical balance.',
    benefits: [
      { title: 'Immediate Brand Recognition', desc: 'Distinctive iconography that stays etched in your prospective clients memory.' },
      { title: 'Unquestioned Industry Credibility', desc: 'Professional mark that signals prestige, permanence, and enterprise caliber.' },
      { title: 'Infinite Vector Scalability', desc: 'Renders crisply whether printed on a tiny 16px website favicon or a 50-foot roadside billboard.' },
      { title: 'Complete Brand Guideline Manual', desc: 'Clear guidelines specifying exact hex codes, CMYK print formulas, clear space rules, and font pairings.' },
      { title: 'Full Trademark Commercial Ownership', desc: '100% intellectual property ownership transferred to you for legal trademark registration.' }
    ],
    features: [
      { title: 'Bespoke Conceptual Sketching', desc: 'Original exploratory sketches exploring multiple distinct creative angles.', icon: 'FaPaintBrush' },
      { title: 'Mathematical Grid Alignment', desc: 'Geometric golden ratio curve construction ensuring perfect proportions and visual balance.', icon: 'FaDraftingCompass' },
      { title: 'Color Psychology Palettes', desc: 'Primary and secondary color harmonies selected to evoke desired emotional responses.', icon: 'FaPalette' },
      { title: 'Typography & Font Hierarchy', desc: 'Hand-picked or custom-modified typography paired harmoniously with your icon.', icon: 'FaFont' },
      { title: 'Social Media Profile Kit', desc: 'Perfect crop dimensions for LinkedIn, Instagram, X/Twitter, Facebook, and YouTube.', icon: 'FaShareAlt' },
      { title: 'Stationery & Collateral Mockups', desc: 'Business card, letterhead, email signature, and envelope templates ready for print.', icon: 'FaPrint' },
      { title: 'Complete Brand Guidelines PDF', desc: 'Comprehensive manual detailing usage rules, minimum sizing, and color codes.', icon: 'FaBook' },
      { title: 'All Master File Formats', desc: 'High-res vector formats: AI, EPS, SVG, PDF, transparent PNG, and WebP.', icon: 'FaFileCode' }
    ],
    portfolio: [
      {
        name: 'Vanguard Horizon',
        category: 'Financial Advisory Identity',
        tech: 'Vector Grid, Adobe Illustrator, Monomark',
        desc: 'Sleek geometric brand mark for a wealth management firm communicating security and forward growth.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Solaar Mobility',
        category: 'Clean EV Brand Identity',
        tech: 'Modern Minimalism, Typography, Guidelines',
        desc: 'Dynamic electric vehicle charging network emblem built with clean fluid aerodynamics.',
        image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Moka Roastery',
        category: 'Artisan Packaging & Mark',
        tech: 'Handcrafted Emblem, Vintage Modern',
        desc: 'Specialty coffee roastery visual mark and packaging design system with bespoke typography.',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Quantum Leap Health',
        category: 'MedTech Brand System',
        tech: 'Abstract Tech Vector, Modern Ramps',
        desc: 'Medical biotechnology identity system balancing scientific precision with human warmth.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Creative Brief & Discovery', desc: 'Understanding your brand values, target audience, competitive landscape, and preferred styles.' },
      { step: '02', title: 'Conceptual Pencil Sketching', desc: 'Exploring dozens of creative directions, abstract symbols, wordmarks, and visual metaphors.' },
      { step: '03', title: 'Vector Construction & Gridding', desc: 'Digitizing the strongest concepts in Adobe Illustrator using mathematical curve grids.' },
      { step: '04', title: 'Color Palette & Typography Selection', desc: 'Applying color psychology and selecting typography pairings that amplify brand personality.' },
      { step: '05', title: 'Client Concept Presentation', desc: 'Presenting 3 to 5 distinct logo concepts mocked up in realistic real-world contexts.' },
      { step: '06', title: 'Master Asset Package Delivery', desc: 'Exporting complete vector master files (AI, EPS, SVG, PNG) and comprehensive brand guideline PDF.' }
    ],
    whyChooseUs: [
      { title: '100% Original Vector Art', desc: 'No stock templates, AI generators, or reused icons. Guaranteed unique identity.', icon: 'FaAward' },
      { title: 'Complete Source File Delivery', desc: 'Includes full editable Adobe Illustrator, SVG, EPS, PDF, and high-res transparent PNGs.', icon: 'FaFileCode' },
      { title: 'Brand Guidelines Manual', desc: 'A multi-page PDF specifying color formulas, clear space, and correct typography pairings.', icon: 'FaBook' },
      { title: 'Full Copyright Ownership', desc: 'Complete commercial and legal rights transferred directly to your business.', icon: 'FaLock' },
      { title: 'Multi-Format Scalability', desc: 'Constructed for perfect clarity from tiny smartphone app icons to massive exterior signage.', icon: 'FaLayerGroup' },
      { title: 'Unlimited Revisions on Chosen Concept', desc: 'We fine-tune the final concept until every curve and shade satisfies your vision.', icon: 'FaCheckCircle' }
    ],
    faq: [
      { question: 'How many logo concepts do you present initially?', answer: 'We typically present 3 to 5 unique, distinct conceptual directions during the initial presentation, each shown with realistic mockups (stationery, digital screen, signage) to help you visualize real-world usage.' },
      { question: 'What file formats will I receive upon completion?', answer: 'You receive all industry-standard vector and raster formats: Adobe Illustrator (.AI), Scalable Vector Graphics (.SVG), Encapsulated PostScript (.EPS), high-resolution PDF, transparent PNGs, and web-ready JPEGs.' },
      { question: 'Can I legally trademark the logo you create?', answer: 'Yes! Because our designs are 100% original and crafted from scratch, all intellectual property rights transfer to you upon final payment, making the mark eligible for trademark registration.' },
      { question: 'What is included in the Brand Guidelines document?', answer: 'Our Brand Guidelines PDF documents exact color hex codes, RGB, CMYK, and Pantone values, primary and secondary font pairings, minimum sizing limits, clear-space zones, and visual do-and-dont rules.' },
      { question: 'Can you redesign our existing company logo while keeping its heritage?', answer: 'Yes! We frequently perform brand modernization where we preserve recognizable brand recognition while modernizing curves, typography, and contrast for modern digital displays.' }
    ],
    metaTitle: 'Professional Logo Design & Brand Identity | The WebTycoons',
    metaDescription: 'Custom logo design and corporate branding by The WebTycoons. Mathematical vector marks, color psychology, and complete brand guideline manuals.'
  },
  {
    slug: 'domain',
    title: 'Domain & Enterprise Cloud Hosting',
    shortDesc: 'High-availability cloud hosting, 99.99% uptime SLA, Anycast DNS routing, and automated SSL protection.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop',
    description: 'Your digital infrastructure is only as reliable as the servers and DNS routing behind it. WebTycoons provides enterprise-grade domain registration and high-availability cloud hosting architectures engineered for 99.99% uptime, automated multi-zone failover, automated 256-bit SSL certificate renewals, and blazing-fast Anycast DNS resolution. We manage all server maintenance, security patches, and daily backups so your business runs smoothly 24/7.',
    overviewWhatIsIt: 'Domain & Cloud Hosting provides the secure internet address and server infrastructure required to deliver your web application worldwide. It combines ICANN-accredited domain registration, Anycast DNS management, NVMe cloud storage clusters, automated daily snapshots, and server-side DDoS mitigation.',
    overviewWhoNeedsIt: 'Businesses seeking reliable, zero-downtime hosting, companies migrating away from slow shared servers, and organizations requiring dedicated enterprise cloud resources with active monitoring.',
    overviewWhyChooseUs: 'Unlike generic shared hosting providers that cram hundreds of websites onto a single sluggish server, WebTycoons hosts clients on isolated NVMe cloud instances with dedicated memory, HTTP/3 protocol support, automated cloud snapshots, and proactive 24/7 server health monitoring.',
    benefits: [
      { title: '99.99% Guaranteed Uptime SLA', desc: 'Enterprise cloud infrastructure with automated multi-availability-zone failover.' },
      { title: 'Lightning-Fast NVMe SSD Storage', desc: 'Up to 10x faster disk read/write speeds compared to standard SATA/SSD servers.' },
      { title: 'Automated Daily Cloud Backups', desc: 'Automated off-site snapshots allowing one-click point-in-time database restoration.' },
      { title: 'Free Automated SSL Certificates', desc: 'Bank-grade 256-bit SSL encryption automatically provisioned and renewed.' },
      { title: 'Enterprise DDoS Mitigation', desc: 'Multi-layered perimeter firewalls that deflect malicious bot floods and traffic attacks.' }
    ],
    features: [
      { title: 'Global Anycast DNS Routing', desc: 'Sub-10ms DNS lookup times distributed across redundant global DNS servers.', icon: 'FaGlobe' },
      { title: 'High-Speed NVMe Cloud Instances', desc: 'Isolated CPU and RAM resources ensuring your site never slows down due to other users.', icon: 'FaServer' },
      { title: 'Automated 256-Bit SSL Encryption', desc: 'Automated Let’s Encrypt / Cloudflare SSL provisioning with HTTP/3 support.', icon: 'FaLock' },
      { title: 'Daily Automated Off-Site Backups', desc: 'Full file and database snapshots stored in independent geographic cloud regions.', icon: 'FaDatabase' },
      { title: 'Web Application Firewall (WAF)', desc: 'Blocks brute force attempts, SQL injection, and zero-day vulnerabilities in real time.', icon: 'FaShieldAlt' },
      { title: 'Server-Side Caching (Redis/Memcached)', desc: 'In-memory data caching for instantaneous query responses and reduced database load.', icon: 'FaBolt' },
      { title: 'Staging Environment & Git Sync', desc: 'Isolated test environments allowing safe testing before pushing changes live.', icon: 'FaCodeBranch' },
      { title: '24/7 Server Health Monitoring', desc: 'Automated uptime pinging and proactive alerts to resolve anomalies before they impact users.', icon: 'FaHeartbeat' }
    ],
    portfolio: [
      {
        name: 'InfiniCloud Hosting',
        category: 'High-Availability Cluster',
        tech: 'NVMe Cloud, Redis, NGINX, Automated SSL',
        desc: 'Enterprise multi-server cloud deployment handling over 2M monthly pageviews with 99.99% uptime.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Apex DNS Global',
        category: 'Anycast Routing Network',
        tech: 'Cloudflare Anycast, DNSSEC, Geo-Steering',
        desc: 'Ultra-low latency global DNS routing network delivering sub-15ms resolution across 6 continents.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'ShieldSSL Enterprise',
        category: 'Automated Security Suite',
        tech: 'WAF, 256-Bit SSL, Automated Failover',
        desc: 'Security infrastructure deployment blocking over 100k malicious bot requests daily.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'SpeedEdge CDN',
        category: 'Edge Content Delivery',
        tech: 'Edge Caching, Brotli, HTTP/3',
        desc: 'Global media delivery network delivering sub-second video and image delivery worldwide.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Infrastructure Audit & Sizing', desc: 'Evaluating traffic expectations, database size, and geographic user distribution.' },
      { step: '02', title: 'Domain Registration & DNS Setup', desc: 'Registering your domain with WHOIS privacy and configuring Anycast DNS records.' },
      { step: '03', title: 'Server Provisioning & Hardening', desc: 'Configuring NVMe cloud instances, NGINX/Node environments, firewall rules, and SSH keys.' },
      { step: '04', title: 'Zero-Downtime Data Migration', desc: 'Transferring files, database tables, and SSL certificates with seamless DNS cutover.' },
      { step: '05', title: 'Automated Backup & Snapshot Setup', desc: 'Configuring daily off-site cloud snapshots and automated database dump scripts.' },
      { step: '06', title: 'Live Monitoring & Maintenance', desc: 'Activating 24/7 uptime monitoring, security patching, and proactive performance checks.' }
    ],
    whyChooseUs: [
      { title: 'Isolated Cloud Resources', desc: 'Guaranteed RAM and CPU cores that are never throttled or shared with other accounts.', icon: 'FaServer' },
      { title: 'Zero Downtime Migration', desc: 'We migrate your current website from your old host smoothly without disrupting your business.', icon: 'FaSyncAlt' },
      { title: 'Bank-Grade Security & WAF', desc: 'Enterprise firewalls and automated SSL certificates protect you from cyber threats.', icon: 'FaShieldAlt' },
      { title: 'Automated Nightly Backups', desc: 'Rest easy knowing complete daily snapshots are safely stored in redundant cloud vaults.', icon: 'FaDatabase' },
      { title: 'Anycast DNS Speed', desc: 'Instantaneous domain resolution from the closest physical server node to your visitor.', icon: 'FaGlobe' },
      { title: '24/7 Proactive Monitoring', desc: 'Our technical team monitors server metrics round the clock to ensure maximum reliability.', icon: 'FaHeartbeat' }
    ],
    faq: [
      { question: 'What is the uptime guarantee for WebTycoons hosting?', answer: 'We offer an enterprise 99.99% uptime Service Level Agreement (SLA). Our infrastructure is distributed across redundant multi-availability cloud zones with automated failover routing.' },
      { question: 'Can you migrate our existing website from our old hosting provider?', answer: 'Yes! We handle the complete migration process including file transfers, database replication, email account transfers, and DNS updates with zero website downtime.' },
      { question: 'Are automated backups included with your hosting plans?', answer: 'Yes, full automated backups are taken every 24 hours and stored in an independent geographic cloud vault, allowing one-click point-in-time restorations whenever needed.' },
      { question: 'Do you provide SSL certificates for HTTPS encryption?', answer: 'Yes! Automated 256-bit SSL certificates are provisioned for all your domains and subdomains at no additional cost, with automatic auto-renewal.' },
      { question: 'Can we upgrade our server resources as our website traffic grows?', answer: 'Absolutely! Our cloud instances feature elastic scalability. We can upgrade your CPU, RAM, and bandwidth seamlessly with zero service interruptions.' }
    ],
    metaTitle: 'Domain Registration & Enterprise Cloud Hosting | The WebTycoons',
    metaDescription: 'Fast, secure cloud hosting and domain registration by The WebTycoons. 99.99% uptime SLA, Anycast DNS, NVMe storage, and automated SSL encryption.'
  },
  {
    slug: 'digital-marketing-solution',
    title: 'Digital Marketing & Growth Solutions',
    shortDesc: 'Data-driven performance marketing, high-ROAS paid media campaigns, and organic SEO authority building.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop',
    description: 'A great website needs qualified prospective buyers to drive revenue. WebTycoons delivers data-driven digital marketing solutions that consistently generate qualified inbound leads and profitable e-commerce sales. Combining Google Ads (Search, Display, Shopping), Meta Ads (Facebook & Instagram), technical Search Engine Optimization (SEO), and full-funnel retargeting, we build customer acquisition engines tailored to your return on ad spend (ROAS) targets.',
    overviewWhatIsIt: 'Digital Marketing is the strategic discipline of driving qualified traffic and conversions across search engines, social media platforms, and display networks. It encompasses market research, keyword intent mapping, paid media buying, ad creative testing, conversion rate tracking, and organic SEO authority building.',
    overviewWhoNeedsIt: 'Businesses seeking consistent, predictable customer acquisition, e-commerce storefronts aiming to scale monthly revenue, and B2B companies looking to fill their sales pipeline with high-ticket inbound inquiries.',
    overviewWhyChooseUs: 'We reject vanity metrics like "impressions" and "clicks." At WebTycoons, we measure success strictly by Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and verified closed revenue. Our proprietary full-funnel tracking links every advertising dollar directly to real business sales.',
    benefits: [
      { title: 'Predictable Pipeline of High-Ticket Leads', desc: 'Consistent inbound inquiries from buyers actively searching for your exact solutions.' },
      { title: 'Maximum Return on Ad Spend (ROAS)', desc: 'Continuous ad creative testing, negative keyword pruning, and bid optimization to maximize profit margins.' },
      { title: 'Dominant Organic Google Rankings', desc: 'Sustainable first-page search rankings through technical SEO and authoritative backlinks.' },
      { title: 'Full-Funnel Retargeting Architecture', desc: 'Re-engage lost website visitors across Facebook, Instagram, YouTube, and Google Display.' },
      { title: 'Transparent Live ROI Dashboards', desc: 'Real-time reporting dashboards showing exact spend, cost-per-lead, and generated revenue.' }
    ],
    features: [
      { title: 'Google Search & Shopping Ads', desc: 'High-intent search campaigns targeting buyers ready to transact immediately.', icon: 'FaGoogle' },
      { title: 'Meta Ads (Facebook & Instagram)', desc: 'High-converting video and carousel ad creatives reaching targeted demographic audiences.', icon: 'FaBullhorn' },
      { title: 'Technical On-Page & Schema SEO', desc: 'Optimized title tags, meta descriptions, canonical URLs, and JSON-LD structured schema.', icon: 'FaSearch' },
      { title: 'Full-Funnel Retargeting Campaigns', desc: 'Dynamic remarketing ads that bring past visitors back to complete their purchases.', icon: 'FaSyncAlt' },
      { title: 'Conversion Rate Optimization (CRO)', desc: 'Dedicated landing page design with A/B split testing to increase visitor conversion rates.', icon: 'FaChartLine' },
      { title: 'Custom Ad Creatives & Copywriting', desc: 'Compelling ad copy and visual graphics crafted to stop the scroll and drive clicks.', icon: 'FaPaintBrush' },
      { title: 'Server-Side Event Tracking (CAPI)', desc: 'Meta Conversions API and GA4 server-side tagging for 100% accurate tracking despite iOS privacy blocks.', icon: 'FaCode' },
      { title: 'Monthly Executive ROI Reporting', desc: 'Detailed monthly performance reports detailing cost per acquisition, conversions, and growth roadmap.', icon: 'FaFileAlt' }
    ],
    portfolio: [
      {
        name: 'Revitalize D2C Wellness',
        category: 'Meta & Google Ads Campaign',
        tech: 'Meta CAPI, GA4, Custom Landing Pages',
        desc: 'Scaled direct-to-consumer health brand from ₹3L to ₹18L monthly revenue at a consistent 4.2x ROAS.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Skyline Luxury Real Estate',
        category: 'High-Ticket Lead Generation',
        tech: 'Google Search Ads, WhatsApp Funnels',
        desc: 'Generated 420+ verified NRI buyer inquiries for luxury penthouses in Delhi NCR and Mumbai.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Aura Healthtech Diagnostic',
        category: 'Google Search & Local SEO',
        tech: 'Google Ads, Schema, Call Tracking',
        desc: 'Decreased Cost-Per-Acquisition by 47% while capturing top 3 local rankings for clinical testing queries.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Equinox Law Group',
        category: 'Local SEO Domination',
        tech: 'Technical SEO, Content Silos, Backlinks',
        desc: 'Achieved #1 organic ranking for corporate commercial dispute queries across northern India.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Audience & Competitor Intelligence', desc: 'Analyzing search volume, competitor ad strategies, consumer pain points, and target demographics.' },
      { step: '02', title: 'Tracking & Conversion Infrastructure', desc: 'Installing GA4, Google Tag Manager, Meta Conversions API (CAPI), and call tracking.' },
      { step: '03', title: 'High-Converting Landing Pages', desc: 'Designing dedicated conversion-focused landing pages engineered specifically for ad campaigns.' },
      { step: '04', title: 'Ad Creative & Campaign Launch', desc: 'Writing persuasive ad copy, producing visual creatives, and launching segmented campaigns.' },
      { step: '05', title: 'Continuous Bid & Creative Optimization', desc: 'A/B testing headlines, adjusting negative keywords, and reallocating budget toward winning ad sets.' },
      { step: '06', title: 'Scale & Performance Reporting', desc: 'Scaling winning campaigns to multiply revenue while providing weekly transparent performance reports.' }
    ],
    whyChooseUs: [
      { title: 'Obsessed With Real ROI', desc: 'We do not report vanity impressions; we measure success strictly by revenue and qualified leads.', icon: 'FaChartLine' },
      { title: 'Server-Side Tracking Accuracy', desc: 'Our advanced tracking bypasses iOS 14+ ad-blockers to capture 100% of conversion data.', icon: 'FaCode' },
      { title: 'Bespoke High-Converting Landers', desc: 'We do not send paid ad traffic to generic homepages; we build dedicated landing pages.', icon: 'FaBolt' },
      { title: 'Multi-Channel Synergy', desc: 'Seamlessly coordinate Google Ads, Meta Ads, and SEO to surround your target audience.', icon: 'FaShareAlt' },
      { title: '100% Transparent Ad Accounts', desc: 'You retain full ownership and administrative access to all your advertising accounts.', icon: 'FaLock' },
      { title: 'Dedicated Growth Strategist', desc: 'Direct bi-weekly strategy calls with your senior performance marketing account manager.', icon: 'FaUsers' }
    ],
    faq: [
      { question: 'How quickly can we expect results from digital marketing campaigns?', answer: 'Paid media campaigns on Google Ads and Meta Ads typically start driving qualified leads and purchases within 48 to 72 hours of launch. Organic SEO is a compounding long-term asset that generally builds significant authority and rankings over 3 to 6 months.' },
      { question: 'What monthly ad budget do we need to get started?', answer: 'We tailor campaign strategies to your budget. For targeted local campaigns, a monthly ad spend of ₹25,000 to ₹50,000 is common, while aggressive national and e-commerce growth campaigns typically invest ₹1,00,000+ monthly.' },
      { question: 'Who owns the advertising accounts and data?', answer: 'You own 100% of your Google Ads, Meta Business Manager, and Analytics accounts. All pixel data, audience lists, and campaign history remain your permanent intellectual property.' },
      { question: 'How do you prevent wasted ad spend on unqualified clicks?', answer: 'We implement daily negative keyword pruning, strict geographic geofencing, audience exclusion lists, and click-fraud protection tools to ensure your budget is spent only on high-intent prospects.' },
      { question: 'What kind of reports will I receive?', answer: 'You receive access to a 24/7 live Looker Studio dashboard showing real-time spend, cost-per-lead, conversion rates, and ROAS, supplemented by weekly strategy updates and monthly executive reviews.' }
    ],
    metaTitle: 'Digital Marketing & Growth Solutions | The WebTycoons',
    metaDescription: 'High-ROAS digital marketing solutions by The WebTycoons. Google Ads, Meta Ads, SEO, and full-funnel conversion tracking engineered to scale your revenue.'
  },
  {
    slug: 'email-solution',
    title: 'Enterprise Email & Workspace Solutions',
    shortDesc: 'Professional corporate email, Google Workspace & Microsoft 365 setup, 100% inbox deliverability, and SPF/DKIM/DMARC authentication.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1200&auto=format&fit=crop',
    description: 'Using generic free email addresses damages company credibility and risks vital business communications landing in spam. WebTycoons provisions enterprise-grade business email solutions powered by Google Workspace, Microsoft 365, and high-security private mail clusters. We configure bulletproof SPF, DKIM, DMARC, and MX records to guarantee 100% inbox deliverability, seamless multi-device synchronization, and zero-downtime mailbox migrations.',
    overviewWhatIsIt: 'Enterprise Email Solutions provide branded business mailboxes (e.g., yourname@yourcompany.com) configured with enterprise security protocols, high cloud storage allowances, synchronized calendar/contacts, and advanced domain verification records that protect your brand from email spoofing.',
    overviewWhoNeedsIt: 'Businesses looking to present professional brand credibility, organizations experiencing email deliverability or spam issues, and growing teams migrating to centralized Google Workspace or Microsoft 365 ecosystems.',
    overviewWhyChooseUs: 'Most basic email setups fail modern email security checks introduced by Google and Yahoo, causing emails to land in spam. WebTycoons configures full cryptographic authentication (DKIM, SPF, DMARC policies, and BIMI) ensuring your emails bypass spam filters and land directly in the primary inbox.',
    benefits: [
      { title: '100% Primary Inbox Deliverability', desc: 'Full SPF, DKIM, and DMARC cryptographic records preventing your emails from landing in spam.' },
      { title: 'Professional Brand Credibility', desc: 'Custom domain addresses (info@yourcompany.com) that project enterprise trust.' },
      { title: 'Seamless Multi-Device Sync', desc: 'Real-time synchronization across iPhone, Android, Outlook, Mac Mail, and webmail.' },
      { title: 'Zero-Downtime Mailbox Migration', desc: 'Seamless migration of your historical emails, folders, and contacts without missing a single message.' },
      { title: 'Enterprise Spam & Phishing Shield', desc: 'Advanced AI filters that block malicious phishing attempts, ransomware attachments, and spoofing.' }
    ],
    features: [
      { title: 'Custom Branded Mailboxes', desc: 'Professional email accounts under your exact company domain name.', icon: 'FaEnvelope' },
      { title: 'Google Workspace & M365 Setup', desc: 'Official provisioning with integrated Google Drive, Docs, Meet, or Microsoft Office Suite.', icon: 'FaCogs' },
      { title: 'SPF, DKIM & DMARC Authentication', desc: 'Strict cryptographic domain security records complying with modern 2024+ inbox deliverability standards.', icon: 'FaLock' },
      { title: 'Seamless Multi-Device Sync', desc: 'IMAP and Exchange ActiveSync ensuring read/unread states and folders sync across all phones and computers.', icon: 'FaMobileAlt' },
      { title: 'Generous Cloud Storage per Mailbox', desc: 'Scalable storage ranging from 30GB to unlimited cloud archiving per employee mailbox.', icon: 'FaHdd' },
      { title: 'Zero-Downtime Mailbox Migration', desc: 'Complete historical email and contact migration from cPanel, Godaddy, or legacy servers.', icon: 'FaSyncAlt' },
      { title: 'Shared Team Inboxes & Aliases', desc: 'Unlimited aliases (e.g. sales@, billing@, support@) routing to designated team members.', icon: 'FaUsers' },
      { title: 'Enterprise Admin Security Console', desc: 'Centralized administrator controls for 2-Factor Authentication (2FA), device management, and password resets.', icon: 'FaShieldAlt' }
    ],
    portfolio: [
      {
        name: 'Starlight Media Network',
        category: 'Google Workspace Enterprise',
        tech: '250-Seat Google Workspace, DMARC Strict',
        desc: 'Migrated 250 corporate mailboxes from legacy cPanel to Google Workspace with zero minutes of downtime.',
        image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Vertex Capital Partners',
        category: 'Microsoft 365 Suite',
        tech: 'Exchange Online, Advanced Threat Protection',
        desc: 'Configured HIPAA & financial grade encrypted email routing with multi-factor authentication.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'MedPro Diagnostic Labs',
        category: 'HIPAA-Compliant Email Routing',
        tech: 'DMARC Enforcement, TLS 1.3 Encryption',
        desc: 'Implemented strict domain spoofing protection ensuring confidential diagnostic reports land safely in client inboxes.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Urban Logistics Co.',
        category: 'Deliverability Optimization',
        tech: 'DKIM, SPF, BIMI Brand Logo Integration',
        desc: 'Rescued critical shipping notification emails from spam folders, achieving a 99.8% verified inbox delivery rate.',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Requirements & User Inventory', desc: 'Auditing existing mailboxes, storage requirements, email aliases, and team routing structures.' },
      { step: '02', title: 'Domain Verification & DNS Configuration', desc: 'Verifying domain ownership and configuring primary MX records with low TTL for smooth transition.' },
      { step: '03', title: 'Cryptographic Deliverability Setup', desc: 'Publishing strict SPF, DKIM 2048-bit keys, DMARC p=quarantine/reject policies, and BIMI.' },
      { step: '04', title: 'Historical Email Data Migration', desc: 'Syncing all historical emails, subfolders, and attachments to the new enterprise mailboxes.' },
      { step: '05', title: 'Device Client Setup (Outlook/Mobile)', desc: 'Guiding employees through 2FA configuration, mobile device sync, and Outlook integration.' },
      { step: '06', title: 'Deliverability Verification & Audit', desc: 'Testing inbox placement across Gmail, Outlook, Yahoo, and corporate firewalls to ensure 100% deliverability.' }
    ],
    whyChooseUs: [
      { title: '100% Deliverability Guarantee', desc: 'We configure strict SPF, DKIM, and DMARC records so your messages never land in spam.', icon: 'FaCheckCircle' },
      { title: 'Zero Lost Emails During Migration', desc: 'Our dual-delivery migration methodology ensures not a single customer email is missed.', icon: 'FaSyncAlt' },
      { title: 'Official Google & Microsoft Partner', desc: 'Direct partner pricing, priority support, and certified implementation specialists.', icon: 'FaAward' },
      { title: 'Anti-Phishing & Spoofing Defense', desc: 'Prevent cybercriminals from sending fraudulent invoices under your domain name.', icon: 'FaShieldAlt' },
      { title: 'Centralized Administrative Controls', desc: 'Easily add or deactivate team member mailboxes as your company hires and scales.', icon: 'FaUsers' },
      { title: 'Instant WhatsApp & Phone Support', desc: 'Dedicated technical engineers ready to troubleshoot client configuration issues instantly.', icon: 'FaHeadset' }
    ],
    faq: [
      { question: 'Why are our business emails currently landing in the spam folder?', answer: 'Major email providers (Google, Yahoo, Microsoft) now require strict SPF, DKIM, and DMARC cryptographic verification records. If your domain is missing these records or misconfigured, outgoing emails are automatically marked as suspicious or spam.' },
      { question: 'Will we lose our existing emails when migrating to a new email service?', answer: 'No! We use specialized server-to-server migration tools that transfer all historical emails, subfolders, sent items, and contacts directly to your new accounts before switching the live routing.' },
      { question: 'What is the difference between Google Workspace and Microsoft 365?', answer: 'Google Workspace is cloud-native with collaborative tools like Google Drive, Docs, Sheets, and Gmail. Microsoft 365 includes native desktop Office apps (Word, Excel, Outlook) along with OneDrive and Exchange. We help you choose the best fit for your team.' },
      { question: 'Can I check my business email on my iPhone or Android phone?', answer: 'Yes! Your email seamlessly synchronizes with the Gmail app, Microsoft Outlook mobile app, Apple Mail, or any standard IMAP/Exchange mail application with instant push notifications.' },
      { question: 'Can we create department aliases like sales@ or info@ at no extra cost?', answer: 'Yes! You can create unlimited email aliases (e.g. sales@, info@, billing@, support@) that automatically forward to your primary user mailbox without needing additional paid user licenses.' }
    ],
    metaTitle: 'Enterprise Business Email Solutions | The WebTycoons',
    metaDescription: 'Professional business email setup by The WebTycoons. Google Workspace, Microsoft 365, SPF/DKIM/DMARC deliverability, and zero-downtime mailbox migration.'
  },
  {
    slug: 'real-estate-advisory',
    title: 'Real Estate Business Growth & Scaling Advisory',
    shortDesc: 'High-ticket HNWI & NRI buyer acquisition, immersive PropTech 3D portals, automated sales CRM, and channel partner scaling.',
    breadcrumbImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1920&auto=format&fit=crop',
    overviewImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    description: 'We partner with luxury real estate developers, top-tier brokerage houses, and land syndicates to engineer high-velocity sales growth. Combining high-ticket digital buyer acquisition funnels targeting High Net Worth Individuals (HNWI) and Non-Resident Indians (NRIs), interactive PropTech 3D portals, automated WhatsApp lead distribution CRMs, and channel partner scaling playbooks, we accelerate inventory sell-through and slash customer acquisition costs.',
    overviewWhatIsIt: 'Real Estate Business Growth & Scaling Advisory is a specialized commercial consultancy and technology solution designed exclusively for property developers and real estate firms. It integrates project launch Go-To-Market (GTM) strategies, digital media buying, custom 3D PropTech landing portals, sales executive performance tracking, and channel partner network expansion.',
    overviewWhoNeedsIt: 'Real estate developers launching residential or commercial projects, luxury brokerage firms handling high-ticket properties, plotted township developers, and real estate marketing agencies seeking scalable lead generation pipelines.',
    overviewWhyChooseUs: 'Generic marketing agencies fail in real estate because they focus on cheap, unqualified CPL (Cost-Per-Lead). WebTycoons engineers high-intent qualification funnels with automated salary/budget filtering, site visit booking engines, and instant WhatsApp sales routing that deliver verified site visits and booked unit transactions.',
    benefits: [
      { title: 'Qualified HNWI & NRI Buyer Leads', desc: 'Targeted funnels capturing affluent investors actively searching for luxury property assets.' },
      { title: 'Higher Site Visit Conversion Ratios', desc: 'Pre-qualified leads with verified budgets, timeframes, and automated site visit booking.' },
      { title: 'Accelerated Project Inventory Sell-Out', desc: 'Structured launch campaigns that build market anticipation and close early-bird units fast.' },
      { title: 'Sub-60-Second Lead Response Time', desc: 'Automated WhatsApp CRM routes incoming leads directly to active sales executives in real time.' },
      { title: 'Channel Partner Network Expansion', desc: 'Digital portal enabling brokers and channel partners to submit clients and track commissions.' }
    ],
    features: [
      { title: 'Project Launch GTM Playbooks', desc: 'Structured multi-stage marketing campaigns engineered for explosive project launch sell-through.', icon: 'FaRocket' },
      { title: 'HNWI & NRI Lead Generation', desc: 'Precision demographic and wealth-targeted campaigns across UAE, USA, UK, Singapore, and India.', icon: 'FaGem' },
      { title: 'PropTech 3D Portals & Unit Selectors', desc: 'Interactive floorplan navigators, 3D walkthroughs, and real-time inventory availability charts.', icon: 'FaBuilding' },
      { title: 'Instant WhatsApp Sales CRM', desc: 'Automated lead dispatching, sales agent accountability tracking, and automated follow-up sequences.', icon: 'FaComments' },
      { title: 'Channel Partner Network Scaling', desc: 'Dedicated digital portal for brokers to register clients, download collateral, and monitor pipeline.', icon: 'FaUsers' },
      { title: 'Local Micro-Market Domination SEO', desc: 'Capture top Google positions for high-intent project and luxury micro-market keyword queries.', icon: 'FaSearch' },
      { title: 'Site Visit Booking Engines', desc: 'Automated scheduling calendars with cab dispatch coordination and SMS/WhatsApp confirmations.', icon: 'FaCalendarCheck' },
      { title: 'Executive Performance Analytics', desc: 'Real-time dashboard tracking cost per site visit, cost per booking, and sales rep close ratios.', icon: 'FaChartLine' }
    ],
    portfolio: [
      {
        name: 'The Sovereign Penthouses',
        category: 'Luxury NRI Investor Funnel',
        tech: 'Next.js 3D Viewer, Meta Ads, WhatsApp CRM',
        desc: 'Generated ₹84 Crore in closed luxury penthouse inventory sales within 90 days of project launch.',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Elysium Golf Villas',
        category: '3D Virtual PropTech Portal',
        tech: 'Interactive 3D Walkthroughs, Google Search Ads',
        desc: 'Ultra-luxury golf villa showcase portal achieving 380+ pre-qualified site visit appointments.',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Nexus Commercial Towers',
        category: 'Institutional Leasing Campaign',
        tech: 'LinkedIn Ads, B2B Landing Funnels',
        desc: 'Leased 180,000 sq.ft of Grade-A commercial office space to multinational tech tenants.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      },
      {
        name: 'Azure Beachfront Estates',
        category: 'Ultra-HNWI Lead Engine',
        tech: 'Global Performance Marketing, Video Tours',
        desc: 'Sold out 48 luxury coastal holiday villas targeting international NRI investors.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
        link: 'https://thewebtycoons.com'
      }
    ],
    process: [
      { step: '01', title: 'Asset & Target Audience Audit', desc: 'Analyzing unit mix, pricing benchmarks, USP differentiators, and ideal investor profiles.' },
      { step: '02', title: 'High-Converting PropTech Digital Landers', desc: 'Developing high-speed project websites with 3D floorplans, interactive master plans, and video tours.' },
      { step: '03', title: 'Multi-Channel Campaign Activation', desc: 'Launching targeted Google Search, Meta Ads, and NRI campaigns across GCC and Western markets.' },
      { step: '04', title: 'Automated CRM & WhatsApp Lead Routing', desc: 'Routing inquiries within 60 seconds to pre-screened sales closers with automated WhatsApp brochures.' },
      { step: '05', title: 'Site Visit Driving & Follow-Up Automation', desc: 'Executing automated nurture sequences to maximize site visit attendance and token commitments.' },
      { step: '06', title: 'Inventory Sell-Out & Campaign Scaling', desc: 'Analyzing unit conversion rates and scaling high-performing channels to close out project inventory.' }
    ],
    whyChooseUs: [
      { title: 'Real Estate Domain Specialists', desc: 'We understand floor plans, RERA guidelines, carpet areas, and investor psychology inside out.', icon: 'FaBuilding' },
      { title: 'Focus on Verified Site Visits & Bookings', desc: 'We measure success not by raw lead count, but by physical site visits and closed unit sales.', icon: 'FaChartLine' },
      { title: 'Sub-60-Second Lead Response Systems', desc: 'Instant WhatsApp automation ensures hot buyer inquiries are engaged before interest cools.', icon: 'FaComments' },
      { title: 'Global NRI & HNWI Reach', desc: 'Proven campaign playbooks targeting affluent NRI buyers across Dubai, Singapore, USA, and UK.', icon: 'FaGlobe' },
      { title: 'Bespoke 3D PropTech Experiences', desc: 'Interactive unit pickers and virtual tours that give buyers confidence even from overseas.', icon: 'FaRocket' },
      { title: 'Full Sales Pipeline Transparency', desc: 'Complete visibility into marketing spend, lead attribution, and sales team closing ratios.', icon: 'FaLock' }
    ],
    faq: [
      { question: 'How is your real estate advisory different from generic digital marketing agencies?', answer: 'Generic agencies generate cheap, low-intent inquiries from unqualified leads. We build high-intent qualification funnels that verify buyer budgets, purchase timelines, and financing readiness before routing them directly to your sales team with automated site visit booking.' },
      { question: 'Can you help target NRI buyers in the UAE, US, and UK?', answer: 'Yes! Over 45% of our real estate campaign budgets are deployed internationally across the GCC (Dubai, Abu Dhabi, Qatar), UK, USA, and Singapore, targeting high-net-worth NRIs looking for capital appreciation and rental yield assets.' },
      { question: 'How quickly does our sales team receive new buyer inquiries?', answer: 'Instantly! Our automated WhatsApp and CRM integration delivers leads with their verified phone number, preferred unit size, and budget to your sales managers phones within 60 seconds of submission.' },
      { question: 'What tools or technologies do you integrate for virtual site visits?', answer: 'We build interactive 3D floor plans, virtual 360-degree walk-through tours, and real-time inventory unit pickers that allow remote and overseas buyers to inspect layouts and reserve units.' },
      { question: 'Do you help manage channel partner (broker) networks?', answer: 'Yes! We create dedicated digital partner portals where channel partners can register clients, access marketing brochures and walkthroughs, and track their commission payouts.' }
    ],
    metaTitle: 'Real Estate Business Growth & Scaling Advisory | The WebTycoons',
    metaDescription: 'Luxury real estate growth advisory and PropTech solutions by The WebTycoons. High-ticket HNWI/NRI lead generation, 3D portals, and automated sales CRM.'
  }
];

async function populateAll() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB successfully!');

  const db = mongoose.connection.db;
  const servicesCol = db.collection('services');

  for (const item of SERVICES_DATA) {
    console.log(`\nUpdating service: ${item.title} (${item.slug})...`);
    
    const updatePayload = {
      title: item.title,
      slug: item.slug,
      shortDesc: item.shortDesc,
      description: item.description,
      overviewWhatIsIt: item.overviewWhatIsIt,
      overviewWhoNeedsIt: item.overviewWhoNeedsIt,
      overviewWhyChooseUs: item.overviewWhyChooseUs,
      breadcrumbImage: item.breadcrumbImage,
      overviewImage: item.overviewImage,
      benefits: item.benefits,
      features: item.features,
      portfolio: item.portfolio,
      process: item.process,
      whyChooseUs: item.whyChooseUs,
      faq: item.faq,
      status: 'active',
      metaTitle: item.metaTitle,
      metaDescription: item.metaDescription,
      canonicalUrl: `https://thewebtycoons.com/services/${item.slug}`,
      updatedAt: new Date()
    };

    const res = await servicesCol.updateOne(
      { slug: item.slug },
      { $set: updatePayload },
      { upsert: true }
    );
    console.log(`✓ Updated ${item.slug}: matched=${res.matchedCount}, modified=${res.modifiedCount}, upserted=${res.upsertedCount}`);
  }

  console.log('\n--- Revalidating Next.js Cache for public routes ---');
  try {
    for (const item of SERVICES_DATA) {
      await fetch(`http://localhost:3000/api/services/${item.slug}`).catch(() => {});
    }
  } catch (e) {
    console.warn('Revalidation fetch notice:', e.message);
  }

  await mongoose.disconnect();
  console.log('\nAll 9 Services populated with authentic, rich content, features, and high-res imagery!');
}

populateAll().catch(err => {
  console.error('Population error:', err);
  process.exit(1);
});
