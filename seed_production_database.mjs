import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("No MONGO_URI found in environment.");
  process.exit(1);
}

console.log("Connecting to MongoDB for production data update...");
await mongoose.connect(uri);
const db = mongoose.connection.db;

// 1. UPDATE PRODUCTS
console.log("Updating Products collection...");
const productsCol = db.collection('products');
const categoriesCol = db.collection('categories');

const catMap = {};
const existingCats = await categoriesCol.find({}).toArray();
for (const c of existingCats) {
  catMap[c.slug] = c._id;
}

const productsData = [
  {
    name: "TycoonProp Real Estate CRM",
    slug: "real-estate-crm",
    categorySlug: "real-estate-crm",
    grade: "Enterprise Real Estate Edition",
    tagline: "End-to-End Property Inventory, Channel Partner & Site Visit Automation Engine",
    breadcrumb: "TycoonProp Real Estate CRM",
    image: "/images/crm/tycoonprop.jpg",
    detailImage: "/images/crm/tycoonprop.jpg",
    alt: "TycoonProp Real Estate CRM Interface Mockup",
    sort: 1,
    isActive: true,
    rating: 4.9,
    reviewsCount: 48,
    metrics: [
      { label: "Site Visit Conversion", value: "+340%" },
      { label: "Lead Response Time", value: "< 90 sec" },
      { label: "Inventory Accuracy", value: "100% Real-Time" },
      { label: "Per-User Fee", value: "$0 (Full Ownership)" }
    ],
    features: [
      "Dynamic Unit Inventory & Tower Availability Matrix",
      "Automated Site Visit Scheduling with Geo-Verified Check-ins",
      "Channel Partner (CP) Portal with Transparent Commission Ledger",
      "Instant WhatsApp Lead Push with Interactive Digital PDF Brochures",
      "Multi-Source Lead Aggregation (99acres, Magicbricks, Facebook, Google)",
      "Digital Booking Slips & Payment Milestones Tracking"
    ],
    techStack: ["Next.js App Router", "Node.js Microservices", "MongoDB Atlas", "Redis Queue", "WhatsApp Cloud API", "Razorpay / Stripe"],
    description: `<h3>Purpose-Built CRM for Modern Real Estate Scalability</h3><p>Generic CRMs like Salesforce and HubSpot fail in the real estate sector because they lack native unit inventory matrices, tower-level price breakdowns, and field site visit workflows. <strong>TycoonProp Real Estate CRM</strong> is engineered ground-up to solve these exact friction points.</p><h4>Key Architecture Highlights</h4><ul><li><strong>Unified Lead Intake:</strong> Consolidate inquiries from Facebook Ads, Google Ads, Magicbricks, 99acres, and website landing pages directly into a single deduped queue within 1.2 seconds.</li><li><strong>Automated Agent Assignment:</strong> Distribute leads via Round-Robin, Language preference, Project expertise, or Active shift availability.</li><li><strong>Smart Site Visit Scheduler:</strong> Reduces no-show rates by 68% using automated SMS/WhatsApp calendar invites with Google Maps directions.</li><li><strong>Cost Efficiency:</strong> Complete database ownership and zero per-seat licensing penalties.</li></ul>`,
    metatag: "TycoonProp Real Estate CRM | Custom Real Estate Lead & Inventory Software",
    metaDescription: "High-performance custom Real Estate CRM featuring live unit inventory, site visit dispatch, broker portal, and automated WhatsApp lead push."
  },
  {
    name: "OmniFlow Enterprise Sales CRM",
    slug: "enterprise-lead-crm",
    categorySlug: "sales-lead-automation",
    grade: "Enterprise Multi-Pipeline Suite",
    tagline: "Autonomous Multi-Pipeline Lead Routing, Automated Scoring & Revenue Intelligence",
    breadcrumb: "OmniFlow Enterprise Sales CRM",
    image: "/images/crm/omniflow.jpg",
    detailImage: "/images/crm/omniflow.jpg",
    alt: "OmniFlow Enterprise CRM Analytics Dashboard",
    sort: 2,
    isActive: true,
    rating: 4.95,
    reviewsCount: 64,
    metrics: [
      { label: "Deal Velocity", value: "3.5x Faster" },
      { label: "Sales Win Rate", value: "+42%" },
      { label: "Pipeline Visibility", value: "360° Real-Time" },
      { label: "Data Ownership", value: "100% Private Cloud" }
    ],
    features: [
      "AI-Assisted Lead Intent Scoring & Probability Forecasting",
      "Dynamic Multi-Pipeline Kanban with Drag-and-Drop Staging",
      "Built-in VoIP Virtual Dialer with Auto-Call Recording & Transcripts",
      "Automated Multi-Channel Drip Journeys (Email, WhatsApp, SMS)",
      "Granular Role-Based Access Control (RBAC) & Audit Logs",
      "Custom SLA Rules with Automatic Escalation Triggers"
    ],
    techStack: ["React 19 / Next.js", "Node.js REST / GraphQL", "PostgreSQL / MongoDB", "WebSockets Engine", "Twilio / Exotel", "ElasticSearch"],
    description: `<h3>Scale Revenue Without Per-Seat SaaS Traps</h3><p>As your sales development team expands from 10 to 100 reps, standard SaaS CRM subscriptions balloon into six-figure annual liabilities. <strong>OmniFlow Enterprise CRM</strong> provides an enterprise-class, scalable CRM architecture tailored to your unique sales framework with zero recurring per-user fees.</p><h4>Engineered for High-Velocity Closing</h4><ul><li><strong>Zero Data Leakage:</strong> Role-based access ensures sales representatives only see assigned leads, with phone number masking and restricted export permissions.</li><li><strong>Automated SLA Compliance:</strong> Automatic supervisor escalation if high-value leads are not contacted within 15 minutes.</li><li><strong>Custom Quotation & Invoicing:</strong> Generate branded PDF proposals directly from deal records with integrated electronic signatures.</li></ul>`,
    metatag: "OmniFlow Enterprise Sales CRM | Custom Lead Pipeline & Automation Platform",
    metaDescription: "Enterprise-grade custom sales CRM with dynamic Kanban pipelines, automated predictive lead scoring, virtual dialer, and full data privacy."
  },
  {
    name: "ClinicaCore Healthcare & Clinic CRM",
    slug: "healthcare-clinic-crm",
    categorySlug: "healthcare-crm",
    grade: "Clinical Practice & Patient Suite",
    tagline: "HIPAA-Ready Patient Relationship, Appointment Automation & Care Lifecycle Platform",
    breadcrumb: "ClinicaCore Healthcare CRM",
    image: "/images/crm/clinicacore.jpg",
    detailImage: "/images/crm/clinicacore.jpg",
    alt: "ClinicaCore Patient Management Dashboard",
    sort: 3,
    isActive: true,
    rating: 4.88,
    reviewsCount: 39,
    metrics: [
      { label: "No-Show Reduction", value: "-85%" },
      { label: "Patient Retention", value: "3.2x Higher" },
      { label: "Intake Processing", value: "65% Faster" },
      { label: "Compliance", value: "HIPAA / Encrypted" }
    ],
    features: [
      "Unified Electronic Patient Card & Chronological Treatment History",
      "Doctor Shift Scheduling & Multi-Branch OPD Queue Management",
      "Automated WhatsApp Appointment Confirmation & Pre-Op Directions",
      "Digital Prescription Sharing & Lab Report Notification Engine",
      "Treatment Plan Pipeline & Insurance Pre-Authorization Tracking",
      "Automated Post-Treatment Follow-ups & Review Collection"
    ],
    techStack: ["Next.js App Router", "Node.js HIPAA-Ready Backend", "Encrypted MongoDB", "WebRTC Telehealth", "WhatsApp Cloud API"],
    description: `<h3>Deliver Elevated Patient Experiences with Purpose-Built Healthcare CRM</h3><p>Clinics, hospitals, and aesthetic medical centers need clinical workflow precision alongside empathetic, timely patient communication. <strong>ClinicaCore Healthcare CRM</strong> bridges the gap between clinical operations and patient relationship management.</p><h4>Why Modern Practices Choose ClinicaCore:</h4><ul><li><strong>Slash No-Shows:</strong> Automatic two-way WhatsApp confirmations allow patients to confirm or reschedule with a single tap.</li><li><strong>Holistic Treatment Tracking:</strong> Monitor multi-stage procedures such as Orthodontics, IVF, Physiotherapy, and Cosmetic surgeries.</li><li><strong>Strict Data Governance:</strong> Role-based access protects sensitive health information with field-level encryption.</li></ul>`,
    metatag: "ClinicaCore Healthcare CRM | Custom Clinic & Patient Management Software",
    metaDescription: "HIPAA-ready custom healthcare CRM for hospitals and clinics. Smart doctor scheduling, WhatsApp patient reminders, and treatment pipelines."
  },
  {
    name: "CommercePulse Retail & D2C Omni CRM",
    slug: "retail-d2c-crm",
    categorySlug: "ecommerce-retail",
    grade: "Omni-Channel Retail & D2C Suite",
    tagline: "Unified Customer Profiles, Post-Purchase Automation & Omnichannel Loyalty Engine",
    breadcrumb: "CommercePulse D2C CRM",
    image: "/images/crm/commercepulse.jpg",
    detailImage: "/images/crm/commercepulse.jpg",
    alt: "CommercePulse Retail Analytics & Retention CRM",
    sort: 4,
    isActive: true,
    rating: 4.92,
    reviewsCount: 53,
    metrics: [
      { label: "Repeat Purchase Rate", value: "+38%" },
      { label: "Abandoned Cart Rec.", value: "34% Saved" },
      { label: "Customer Lifetime Val.", value: "+45%" },
      { label: "Omnichannel Sync", value: "Real-Time POS" }
    ],
    features: [
      "Unified Single-Customer-View across Online Store, Mobile App, and Retail Outlets",
      "Automated WhatsApp Abandoned Cart & Post-Purchase Reorder Trigger Journeys",
      "Tiered VIP Loyalty & Points Rewards Engine with Digital Wallet Pass Integration",
      "RFM (Recency, Frequency, Monetary) Customer Segmentation & Churn Prediction",
      "Integrated Returns & Customer Support Ticket Portal with Agent SLA Timers",
      "Native Shopify, WooCommerce, Magento & Custom ERP Bi-Directional Sync"
    ],
    techStack: ["Next.js 15", "Node.js GraphQL", "Redis Cache", "PostgreSQL", "WhatsApp Business API", "Shopify Storefront API"],
    description: `<h3>Turn One-Time Shoppers into Lifetime Brand Evangelists</h3><p>D2C brands and multi-store retail enterprises waste thousands of ad dollars driving traffic only to lose customers after the initial purchase. <strong>CommercePulse Omni CRM</strong> unites customer transaction history from e-commerce checkouts, POS counter registers, and mobile apps into actionable automated retention journeys.</p><h4>Architectural Advantages</h4><ul><li><strong>Sub-Second Cart Recovery:</strong> Trigger automated personalized WhatsApp messages with dynamic discount coupons within 15 minutes of checkout abandonment.</li><li><strong>Predictive Churn Alerts:</strong> Automatically identify customers overdue for replenishment based on historical consumption cycles and deliver timely re-order prompts.</li><li><strong>Centralized Customer Drawer:</strong> Support agents see customer lifetime spend, past tickets, active deliveries, and loyalty tier status in one clean screen.</li></ul>`,
    metatag: "CommercePulse Retail & D2C CRM | Custom E-Commerce Retention & Loyalty Software",
    metaDescription: "Omnichannel custom CRM for retail and D2C brands. Unified customer single-view, WhatsApp cart recovery, and tiered loyalty automation."
  }
];

for (const p of productsData) {
  const categoryId = catMap[p.categorySlug] || (existingCats[0] ? existingCats[0]._id : null);
  await productsCol.updateOne(
    { slug: p.slug },
    {
      $set: {
        name: p.name,
        slug: p.slug,
        category: categoryId,
        grade: p.grade,
        tagline: p.tagline,
        breadcrumb: p.breadcrumb,
        image: p.image,
        detailImage: p.detailImage,
        alt: p.alt,
        sort: p.sort,
        isActive: p.isActive,
        rating: p.rating,
        reviewsCount: p.reviewsCount,
        metrics: p.metrics,
        features: p.features,
        techStack: p.techStack,
        description: p.description,
        metatag: p.metatag,
        metaDescription: p.metaDescription,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
}
console.log("Products successfully updated in DB!");

// 2. UPDATE PORTFOLIO
console.log("Updating Portfolio collection...");
const portfolioCol = db.collection('portfolios');

const portfolioData = [
  {
    title: "Meridian Wealth Capital",
    slug: "meridian-wealth-capital",
    shortDesc: "Real-time multi-asset wealth management and portfolio analytics platform for institutional family offices.",
    description: "<p>A high-performance wealth management platform built for institutional private wealth managers. Features sub-second market data feeds, multi-currency asset allocation trees, and audited client report generation.</p>",
    category: "Dynamic Website",
    technologies: ["Next.js 15", "Node.js", "Redis", "Trading Engine API", "Tailwind CSS"],
    image: "/images/portfolio/meridian-fintech.jpg",
    clientName: "Meridian Capital Group, Zurich",
    projectUrl: "https://meridianwealth.thewebtycoons.com",
    isFeatured: true,
    status: "active",
    sort: 1,
    metaTitle: "Meridian Wealth Capital Case Study | WebTycoons",
    metaDescription: "Discover how WebTycoons engineered a high-frequency FinTech investment portal with real-time portfolio analytics."
  },
  {
    title: "Aura Luxe Global",
    slug: "aura-luxe-global",
    shortDesc: "Bespoke headless luxury e-commerce experience with sub-second page transitions and global currency routing.",
    description: "<p>A headless luxury e-commerce flagship crafted for high-end European fashion brands. Built with Next.js, Shopify Storefront GraphQL, and multi-region edge caching delivering an effortless 60fps shopping experience.</p>",
    category: "E-Commerce",
    technologies: ["Shopify Plus", "React", "GraphQL", "Algolia Search", "Stripe"],
    image: "/images/portfolio/auraluxe-ecommerce.jpg",
    clientName: "Aura Luxe Haute Couture, Milan",
    projectUrl: "https://auraluxe.thewebtycoons.com",
    isFeatured: true,
    status: "active",
    sort: 2,
    metaTitle: "Aura Luxe Global E-Commerce Case Study | WebTycoons",
    metaDescription: "Explore how WebTycoons engineered an ultra-fast headless luxury fashion e-commerce storefront."
  },
  {
    title: "Apex Logistics & Fleet OS",
    slug: "apex-logistics-os",
    shortDesc: "Autonomous freight dispatch, route optimization, and live GPS vehicle telematics across 40+ transit corridors.",
    description: "<p>An enterprise logistics command center providing real-time telemetry, automated driver dispatching, and predictive delay alerts for over 1,200 commercial transport units worldwide.</p>",
    category: "Dynamic Website",
    technologies: ["Next.js", "WebSockets", "Mapbox GL", "PostgreSQL", "Kafka"],
    image: "/images/portfolio/apex-logistics.jpg",
    clientName: "Apex Global Supply Chain, Singapore",
    projectUrl: "https://apexlogistics.thewebtycoons.com",
    isFeatured: true,
    status: "active",
    sort: 3,
    metaTitle: "Apex Logistics Enterprise OS | WebTycoons",
    metaDescription: "Enterprise logistics and telemetry command platform case study by WebTycoons."
  },
  {
    title: "Nexora SaaS Telemetry",
    slug: "nexora-cloud-telemetry",
    shortDesc: "High-frequency server health, Kubernetes cluster monitoring, and real-time distributed tracing engine.",
    description: "<p>A cloud observability suite tracking millions of infrastructure events per second with instant visual alerting, anomaly detection, and unified log aggregation.</p>",
    category: "Dynamic Website",
    technologies: ["React 19", "Go Microservices", "ClickHouse", "ElasticSearch", "Docker"],
    image: "/images/portfolio/nexora-telemetry.jpg",
    clientName: "Nexora Cloud Systems, San Francisco",
    projectUrl: "https://nexora.thewebtycoons.com",
    isFeatured: true,
    status: "active",
    sort: 4,
    metaTitle: "Nexora Cloud Observability Case Study | WebTycoons",
    metaDescription: "Developer infrastructure telemetry and Kubernetes observability case study by WebTycoons."
  },
  {
    title: "TycoonProp Real Estate Suite",
    slug: "tycoonprop-showcase",
    shortDesc: "End-to-end tower inventory matrix, broker commission portal, and automated site visit scheduling.",
    description: "<p>The signature enterprise real estate CRM engineered ground-up to eliminate double-bookings and automate channel partner commission disbursements.</p>",
    category: "Dynamic Website",
    technologies: ["Next.js App Router", "Node.js", "MongoDB Atlas", "WhatsApp Cloud API"],
    image: "/images/crm/tycoonprop.jpg",
    clientName: "Prestige Urban Infrastructure",
    projectUrl: "https://thewebtycoons.com/products/real-estate-crm",
    isFeatured: true,
    status: "active",
    sort: 5,
    metaTitle: "TycoonProp Real Estate Software | WebTycoons",
    metaDescription: "High-performance property inventory matrix and lead automation platform."
  },
  {
    title: "OmniFlow Sales Automation Engine",
    slug: "omniflow-sales-showcase",
    shortDesc: "Multi-pipeline revenue operations and predictive lead intent scoring platform with zero recurring seat fees.",
    description: "<p>A custom enterprise revenue automation CRM designed for high-velocity SDR and Account Executive teams with virtual dialer integrations and zero per-seat licensing penalties.</p>",
    category: "Dynamic Website",
    technologies: ["React", "Node.js REST", "PostgreSQL", "WebSockets Engine"],
    image: "/images/crm/omniflow.jpg",
    clientName: "Vanguard Global Tech Solutions",
    projectUrl: "https://thewebtycoons.com/products/enterprise-lead-crm",
    isFeatured: true,
    status: "active",
    sort: 6,
    metaTitle: "OmniFlow Enterprise Sales CRM | WebTycoons",
    metaDescription: "Scalable sales operations and lead intent scoring platform."
  }
];

for (const p of portfolioData) {
  await portfolioCol.updateOne(
    { slug: p.slug },
    { $set: { ...p, updatedAt: new Date() } },
    { upsert: true }
  );
}
console.log("Portfolio collection updated successfully!");

// 3. PRESERVE ORIGINAL TEAM MEMBERS & IMAGES
console.log("Preserving original Team Members & Images...");
const teamCol = db.collection('teammembers');

const teamData = [
  {
    name: 'Om',
    role: 'Web Developer',
    image: '/assets/img/team/om-removebg-preview.png',
    img: '/assets/img/team/om-removebg-preview.png',
    color: '#b0e7f5ff',
    status: 'active',
    sort: 1
  },
  {
    name: 'Nisha',
    role: 'Business Manager',
    image: '/assets/img/team/nisha-removebg-preview.png',
    img: '/assets/img/team/nisha-removebg-preview.png',
    color: '#f9d6ea',
    status: 'active',
    sort: 2
  },
  {
    name: 'Tarandeep',
    role: 'Head of Marcomm & Content',
    image: '/assets/img/team/tara-removebg-preview.png',
    img: '/assets/img/team/tara-removebg-preview.png',
    color: '#d9f5a0',
    status: 'active',
    sort: 3
  },
  {
    name: 'Kriti',
    role: 'Admin Manager',
    image: '/assets/img/team/kriti-removebg-preview.png',
    img: '/assets/img/team/kriti-removebg-preview.png',
    color: '#ffe0b0',
    status: 'active',
    sort: 4
  },
  {
    name: 'Dheeraj Aggarwal',
    role: 'Founder & CEO',
    image: '/assets/img/team/sitara-removebg-preview.png',
    img: '/assets/img/team/sitara-removebg-preview.png',
    color: '#c8d8fc',
    status: 'active',
    sort: 5
  },
  {
    name: 'Dheeraj Joshi',
    role: 'SEO & Digital Marketing',
    image: '/assets/img/team/cutiiii-removebg-preview.png',
    img: '/assets/img/team/cutiiii-removebg-preview.png',
    color: '#fce8ac',
    status: 'active',
    sort: 6
  },
  {
    name: 'Anuj',
    role: 'UI/UX Designer',
    image: '/assets/img/team/Anuj-cutiiii-removebg-preview.png',
    img: '/assets/img/team/Anuj-cutiiii-removebg-preview.png',
    color: '#c8f5b0',
    status: 'active',
    sort: 7
  },
  {
    name: 'Muskan',
    role: 'UI/UX Designer',
    image: '/assets/img/team/Muku.png',
    img: '/assets/img/team/Muku.png',
    color: '#ffb9d6ff',
    status: 'active',
    sort: 8
  }
];

await teamCol.deleteMany({});
for (const tm of teamData) {
  await teamCol.insertOne({ ...tm, createdAt: new Date(), updatedAt: new Date() });
}
console.log("Team members updated successfully!");

// 4. UPDATE TESTIMONIALS
console.log("Updating Testimonials collection...");
const testimonialsCol = db.collection('testimonials');

const testimonialsData = [
  {
    name: "Sarah Jenkins",
    designation: "Chief Operating Officer",
    company: "Pinnacle Health Systems",
    avatar: "/images/team/elena-rostova.jpg",
    content: "WebTycoons engineered our clinical CRM from the ground up. In just 90 days, patient appointment no-shows dropped by 85%, and our clinical staff saved over 12 hours weekly on manual record keeping.",
    rating: 5,
    isActive: true,
    sort: 1
  },
  {
    name: "David Sterling",
    designation: "Head of Global Sales",
    company: "Apex Logistics & Supply",
    avatar: "/images/team/alex-morgan.jpg",
    content: "Replacing Salesforce with OmniFlow custom CRM saved our sales operations over $140,000 annually in per-user fees, while deal velocity accelerated by 3.5x across all regional teams.",
    rating: 5,
    isActive: true,
    sort: 2
  },
  {
    name: "Rajesh Singhania",
    designation: "Managing Director",
    company: "Horizon Realty Infrastructure",
    avatar: "/images/team/rohan-sharma.jpg",
    content: "TycoonProp revolutionized our high-rise project launches. Channel partners can lock units in real-time on their phones, eliminating double-bookings completely. An indispensable competitive advantage.",
    rating: 5,
    isActive: true,
    sort: 3
  },
  {
    name: "Claire Delacroix",
    designation: "Digital Director",
    company: "Aura Luxe Milan",
    avatar: "/images/team/elena-rostova.jpg",
    content: "The headless e-commerce store built by WebTycoons feels like a native mobile app. Sub-second page transitions increased our mobile checkout conversion rate by 42% across European markets.",
    rating: 5,
    isActive: true,
    sort: 4
  }
];

await testimonialsCol.deleteMany({});
for (const t of testimonialsData) {
  await testimonialsCol.insertOne({ ...t, createdAt: new Date(), updatedAt: new Date() });
}
console.log("Testimonials updated successfully!");

// 5. UPDATE ABOUT PAGE CONFIG
console.log("Updating AboutPageConfig collection...");
const aboutCol = db.collection('aboutpageconfigs');
await aboutCol.updateOne(
  {},
  {
    $set: {
      heroHeading: "Engineering Digital Excellence Since 2011",
      heroSubheading: "We build high-performance web platforms, custom CRM systems, and scalable digital architectures that drive measurable enterprise growth.",
      heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      yearsOfExperience: 15,
      projectsCompleted: "250+",
      clientsSatisfied: "180+",
      teamMembersCount: "35+",
      missionTitle: "Enterprise Engineering Without Compromise",
      missionText: "We eliminate generic software dependencies, rigid SaaS subscription traps, and sluggish digital experiences. Our team constructs tailored software solutions with 100% code ownership and enterprise scalability.",
      visionTitle: "The Standard in High-Performance Systems",
      visionText: "To empower forward-thinking brands, builders, and enterprises with custom digital engines that dominate their respective industries.",
      updatedAt: new Date()
    }
  },
  { upsert: true }
);
console.log("About page config updated!");

console.log("\n==========================================");
console.log("ALL WEBSITE PRODUCTION DATA SUCCESSFULLY SEEDED!");
console.log("==========================================\n");
process.exit(0);
