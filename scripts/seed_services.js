const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    overviewWhatIsIt: { type: String, default: "" },
    overviewWhoNeedsIt: { type: String, default: "" },
    overviewWhyChooseUs: { type: String, default: "" },
    icon: { type: String, default: "" },
    image: { type: String, default: "" },
    breadcrumbImage: { type: String, default: "" },
    overviewImage: { type: String, default: "" },
    bgColor: { type: String, default: "" },
    hoverTextColor: { type: String, default: "" },
    imageStyle: { type: String, enum: ["small", "full"], default: "small" },
    features: { 
      type: [{ title: String, desc: String, icon: String, image: String }], 
      default: [] 
    },
    benefits: {
      type: [{ title: String, desc: String }],
      default: [],
    },
    faq: {
      type: [{ question: String, answer: String }],
      default: [],
    },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const servicesToImport = [
  {
    title: "Website Designing",
    slug: "website-designing",
    sort: 1,
    status: "active",
    shortDesc: "Creative, interactive UI/UX website designing compatible with all mobile screens and browsers.",
    description: "Website design describes the visual appearance of a website. Web design uses many of the same key visual elements as all types of design such as layout, colours, graphics, fonts, content. Besides the basic elements of web design that make a site beautiful and visually compelling, a website must also always consider the end user. User-friendliness can be achieved by paying attention to compatibility, technology and how interactive the site is.\n\nWeb Designing is an art and our designers aim to turn your imagination into reality. Get yourself a website that attracts your target audience through a high-end user interface. Web Tycoons is the best website designing company in Delhi which creates interactive UI and user-friendly websites that are compatible with all types of browsers and responsive to all screen sizes.",
    overviewWhatIsIt: "Bespoke website designing crafted to captivate visitors, elevate brand perception, and deliver seamless responsive experiences across all desktop, tablet, and mobile devices.",
    overviewWhoNeedsIt: "Enterprises, startups, retail businesses, and professionals who need a standout digital presence that attracts leads and builds trust.",
    overviewWhyChooseUs: "Over 15+ years of designing excellence, custom tailored visual aesthetics, high-conversion landing page layouts, and 100% mobile responsiveness.",
    image: "/assets/img/homeservice/service1.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Custom UI/UX Design", desc: "Unique visual identities engineered specifically for your brand." },
      { title: "100% Mobile Responsive", desc: "Pixel-perfect layouts that adapt seamlessly to every device." },
      { title: "Lead Generation Forms", desc: "Integrated inquiry forms linked directly to your company email." },
      { title: "Google Maps & Social Sync", desc: "Seamless integration with maps, socials, and contact endpoints." }
    ],
    metaTitle: "Website Designing Company in Delhi | The Web Tycoons",
    metaDescription: "Web Tycoons is a leading website designing company in Delhi specializing in creative, mobile-responsive, and high-conversion web designs."
  },
  {
    title: "Website Development",
    slug: "web-development",
    sort: 2,
    status: "active",
    shortDesc: "High-performance full-stack web development, dynamic CMS solutions, and custom portals.",
    description: "Web development is the coding and programming that powers website functionality per your exact business requirements. Building a website that doesn't just look good, but has all the features that enable you to manage your content anytime or create multiple user logins requires true expertise.\n\nWe build CMS and Dynamic Websites. A CMS Website enables you to manage your website on your own — add/edit content, manage unlimited categories, and publish pages without technical hurdles. A Dynamic Website enables multiple users to login, interact, and manage their profiles with database security.",
    overviewWhatIsIt: "Full-stack web development engineered with modern architectures, clean codebases, lightning-fast database interactions, and flexible content management.",
    overviewWhoNeedsIt: "Companies requiring dynamic user interactions, custom admin panels, database workflows, or frequent content updates.",
    overviewWhyChooseUs: "Scalable modern architectures, secure data encryption, rapid page loading speeds, and intuitive custom CMS dashboards.",
    image: "/assets/img/homeservice/service2.svg",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Dynamic CMS Integration", desc: "Effortlessly manage pages, categories, and content independently." },
      { title: "User Portals & Auth", desc: "Multi-tier user accounts, role-based permissions, and secure login." },
      { title: "Database Architecture", desc: "High-speed querying, structured data storage, and automated backups." },
      { title: "API & Third-Party Sync", desc: "Connect CRMs, payment gateways, and external APIs with ease." }
    ],
    metaTitle: "Website Development Company in Delhi | The Web Tycoons",
    metaDescription: "Professional web development company in Delhi providing dynamic CMS websites, custom portals, and full-stack web applications."
  },
  {
    title: "Software Development & CRM",
    slug: "software-development",
    sort: 3,
    status: "active",
    shortDesc: "Bespoke CRM software solutions, automated sales pipelines, and enterprise automation.",
    description: "Want to manage your business effectively without manual chaos? Web Tycoons will help you streamline and automate your business operations. We are experts in providing tailored CRM (Customer Relationship Management) software solutions for almost every industry.\n\nOur custom CRMs empower you to manage sales leads from capture to close. Simply enter incoming leads, and the CRM automatically schedules call, email, and WhatsApp follow-up reminders. It never lets an inquiry slip through the cracks, with task lists, calendar reminders, and multi-user performance tracking.",
    overviewWhatIsIt: "Custom business software and CRM suites designed to automate workflows, organize customer data, and accelerate team sales productivity.",
    overviewWhoNeedsIt: "Growing sales teams, service companies, real estate agencies, and manufacturers looking to replace manual spreadsheets with an automated system.",
    overviewWhyChooseUs: "100% custom-built for your specific business workflow with zero per-user monthly license lock-ins.",
    image: "/assets/img/homeservice/service3.svg",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Lead Management CRM", desc: "Automate lead tracking, status pipelines, and executive assignments." },
      { title: "Follow-Up Reminders", desc: "Automated SMS, email, and WhatsApp reminder alerts for your team." },
      { title: "Role-Based Permissions", desc: "Granular access control for sales executives, managers, and admins." },
      { title: "Real-time Analytics", desc: "Comprehensive conversion reports and executive performance dashboards." }
    ],
    metaTitle: "Software Development & CRM Company in Delhi | The Web Tycoons",
    metaDescription: "Custom CRM and software development in Delhi by Web Tycoons. Streamline leads, automate sales follow-ups, and manage operations."
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    sort: 4,
    status: "active",
    shortDesc: "Data-driven digital marketing across SEO, Social Media (SMO/SMM), and performance campaigns.",
    description: "Digital marketing connects your brand with targeted customers where they spend their time: on the internet. Web Tycoons promotes your business across two powerhouse channels: Search Engine Optimization (SEO) and Social Media Marketing (SMN, SMO, and SMM).\n\nWe optimize your digital visibility so your products and services rank prominently on Google searches, while driving consistent engagement, authentic followers, and qualified leads across Facebook, Instagram, LinkedIn, and YouTube.",
    overviewWhatIsIt: "End-to-end digital marketing campaigns that combine organic search dominance with high-engagement social media campaigns to drive measurable business revenue.",
    overviewWhoNeedsIt: "Brands and businesses wanting consistent customer acquisition, higher market share, and strong online brand presence.",
    overviewWhyChooseUs: "Proven ROI-focused strategies that focus on qualified inbound leads and verified customer acquisition rather than vanity metrics.",
    image: "/assets/img/homeservice/service4.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Search Engine Marketing", desc: "Drive high-intent commercial buyers directly from search queries." },
      { title: "Social Media Campaigns", desc: "Build authority and community on Facebook, Instagram, and LinkedIn." },
      { title: "Content Strategy", desc: "Compelling copywriting and graphics tailored to convert prospects." },
      { title: "Conversion Tracking", desc: "Transparent tracking linking marketing spend to actual closed sales." }
    ],
    metaTitle: "Digital Marketing Company in Delhi | The Web Tycoons",
    metaDescription: "Best digital marketing company in Delhi NCR providing SEO, SMO, SMM, and lead generation solutions for business growth."
  },
  {
    title: "Search Engine Optimization (SEO)",
    slug: "search-engine-optimization",
    sort: 5,
    status: "active",
    shortDesc: "Guaranteed organic Google first-page rankings, in-depth keyword analysis, and on-page optimization.",
    description: "A website without SEO is like a car without fuel. Web Tycoons offers premier SEO services in Delhi, specialized in delivering genuine organic search results for your highest-value commercial keywords.\n\nOur SEO specialists perform comprehensive industry keyword analysis based on search volumes and competition levels. Through rigorous technical SEO, on-page optimization, content refinement, and quality link architecture, we systematically elevate your website to Google's first page.",
    overviewWhatIsIt: "Strategic technical and content search engine optimization designed to capture top Google rankings for high-intent business search queries.",
    overviewWhoNeedsIt: "Companies looking for sustainable, long-term organic traffic without ongoing paid per-click advertising expenses.",
    overviewWhyChooseUs: "White-hat SEO techniques, comprehensive on-page audits, fast indexing, and transparent monthly ranking progress reports.",
    image: "/assets/img/homeservice/service5.svg",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Keyword Research & Strategy", desc: "Identify high-volume, buyer-intent search queries in your niche." },
      { title: "On-Page & Technical SEO", desc: "Meta tags, structured schema, crawl optimization, and site speed." },
      { title: "Quality Authority Building", desc: "High-trust backlink acquisition and industry citation placements." },
      { title: "Google First-Page Goal", desc: "Focused optimization targeting top-ranking commercial terms." }
    ],
    metaTitle: "SEO Company in Delhi | Top Search Engine Optimization - Web Tycoons",
    metaDescription: "Rank on Google's 1st page with Web Tycoons, the top SEO company in Delhi. Organic keyword rankings, technical SEO, and proven growth."
  },
  {
    title: "Ecommerce Solution",
    slug: "ecommerce-solution",
    sort: 6,
    status: "active",
    shortDesc: "High-conversion online shopping stores, secure payment gateways, and inventory management.",
    description: "Ecommerce websites facilitate seamless online transactions of goods and services worldwide. With the continuous surge in online shopping, having an intuitive, fast, and secure ecommerce store is essential to business growth.\n\nWeb Tycoons delivers complete ecommerce solutions featuring modern product catalogs, multi-currency pricing, shopping cart workflows, secure payment gateway integrations (Razorpay, Stripe, PayU), order tracking, automated invoices, and mobile-first shopping experiences.",
    overviewWhatIsIt: "Complete online retail storefronts built for scale, fast checkout experiences, secure payments, and effortless product inventory management.",
    overviewWhoNeedsIt: "D2C brands, manufacturers, retailers, and wholesalers seeking to sell products directly to consumers nationwide or globally.",
    overviewWhyChooseUs: "Sub-second product browsing speeds, one-page frictionless checkouts, and seamless payment gateway compliance.",
    image: "/assets/img/homeservice/service6.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Catalog & Inventory Control", desc: "Manage thousands of SKUs, categories, variants, and stock counts." },
      { title: "Secure Payment Gateways", desc: "Credit/Debit cards, UPI, Net Banking, and wallet integrations." },
      { title: "Order Tracking & Invoices", desc: "Automated GST invoices, shipping status notifications, and customer portal." },
      { title: "Mobile-First Storefront", desc: "Frictionless shopping designed for lightning-fast mobile checkouts." }
    ],
    metaTitle: "Ecommerce Website Development Company in Delhi | The Web Tycoons",
    metaDescription: "Scalable ecommerce solutions in Delhi by Web Tycoons. Secure payment gateways, inventory management, and high-conversion online stores."
  },
  {
    title: "Logo Designing & Brand Identity",
    slug: "logo-designing",
    sort: 7,
    status: "active",
    shortDesc: "Distinctive, memorable brand logos, color systems, and corporate visual identities.",
    description: "A logo is the cornerstone of your brand. It represents your company's values, mission, and professional stature in a single memorable visual symbol.\n\nA great logo makes you instantly recognizable and differentiates you from market competitors. Web Tycoons creates unique, conceptually rich logos that make an immediate positive impression and provide the foundation for your brand's entire marketing strategy.",
    overviewWhatIsIt: "Creative logo design and brand identity kits crafted to establish an unmistakable, premium corporate presence.",
    overviewWhoNeedsIt: "New businesses launching their venture, or established enterprises looking for a modern brand redesign.",
    overviewWhyChooseUs: "100% original custom concepts, vector source files (AI, EPS, SVG, PNG), and multi-format versatility for print and digital.",
    image: "/assets/img/homeservice/service7.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Original Concept Art", desc: "Bespoke symbol and typographic concepts tailored to your niche." },
      { title: "Vector Master Files", desc: "Full ownership of AI, SVG, EPS, PDF, and high-res transparent PNGs." },
      { title: "Color & Typography Guide", desc: "Defined color palettes and font hierarchy for brand consistency." },
      { title: "Multi-Surface Scalability", desc: "Looks stunning on business cards, giant billboards, and mobile app icons." }
    ],
    metaTitle: "Logo Designing Company in Delhi | Creative Brand Logos - Web Tycoons",
    metaDescription: "Professional logo designing company in Delhi. Unique, memorable, and creative logo designs that build strong brand recognition."
  },
  {
    title: "Brochure Designing",
    slug: "brochure-designing",
    sort: 8,
    status: "active",
    shortDesc: "Elegant corporate brochures, digital e-brochures, and sales presentation collaterals.",
    description: "Brochures are vital promotional documents used to introduce a company, organization, products, and services while communicating competitive advantages to clients.\n\nWeb Tycoons designs both print-ready brochures and digital e-brochures. E-brochures give you the advantage of unlimited distribution via email, WhatsApp, and websites without printing overhead. Our designers craft persuasive layouts with sharp typography and compelling visuals.",
    overviewWhatIsIt: "High-impact multi-page corporate brochures and digital PDF e-brochures engineered to win enterprise sales and client proposals.",
    overviewWhoNeedsIt: "B2B companies, real estate developers, product manufacturers, and corporate service providers.",
    overviewWhyChooseUs: "Magazine-quality graphic design, persuasive content layout, and print-ready high-resolution CMYK exports.",
    image: "/assets/img/homeservice/service8.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Print & Digital Formats", desc: "Print-ready CMYK PDFs plus compressed interactive digital e-brochures." },
      { title: "Bi-Fold & Tri-Fold Layouts", desc: "Custom fold architectures, multi-page booklets, and product catalogs." },
      { title: "Persuasive Visual Layout", desc: "Content structured to guide readers naturally towards taking action." },
      { title: "Fast Turnaround", desc: "Prompt revisions and polished design delivery aligned with your schedule." }
    ],
    metaTitle: "Brochure Designing Company in Delhi | The Web Tycoons",
    metaDescription: "Creative brochure and e-brochure designing in Delhi by Web Tycoons. High-impact corporate sales collaterals and product catalogs."
  },
  {
    title: "Company Profile Designing",
    slug: "company-profile",
    sort: 9,
    status: "active",
    shortDesc: "Authoritative corporate profiles, investor pitch decks, and company credentials documentation.",
    description: "A company profile is the definitive professional introduction to your business, conveying your history, capabilities, achievements, and leadership to clients, banks, and investors.\n\nA well-written, professionally designed corporate profile acts as a silent 24/7 business development tool. Web Tycoons crafts concise, engaging, and authoritative profiles that highlight your mission, team, services, and client testimonials.",
    overviewWhatIsIt: "Executive corporate profiles and capability statements designed to establish undeniable institutional credibility.",
    overviewWhoNeedsIt: "Established enterprises pitching government tenders, seeking venture capital, or onboarding Fortune 500 corporate clients.",
    overviewWhyChooseUs: "Crisp corporate storytelling paired with modern minimalist layout design and infographic data visualizations.",
    image: "/assets/img/homeservice/service1.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Executive Storytelling", desc: "Articulate your company vision, milestone history, and core capabilities." },
      { title: "Infographic Visuals", desc: "Transform complex statistics and service offerings into clean infographics." },
      { title: "Tender & RFP Ready", desc: "Structured to satisfy vendor onboarding and government tender requirements." },
      { title: "Digital & Print Ready", desc: "Supplied in interactive PDF format and commercial print press files." }
    ],
    metaTitle: "Company Profile Designing Company in Delhi | The Web Tycoons",
    metaDescription: "Professional company profile and corporate deck designing in Delhi. Establish credibility with clients, investors, and tenders."
  },
  {
    title: "WhatsApp Promotional Images",
    slug: "whatsapp-promotional-images",
    sort: 10,
    status: "active",
    shortDesc: "Eye-catching banners and social graphics tailored for WhatsApp broadcasts, status, and social feeds.",
    description: "Photos and visual graphics are the universal language of modern mobile communication. With billions of active users on WhatsApp and Instagram, visual creatives drive the highest message open and conversion rates.\n\nWeb Tycoons creates customized, attention-grabbing promotional images for WhatsApp marketing campaigns, festival greetings, promotional sales, and daily status broadcasts that captivate your contact list and generate direct inquiries.",
    overviewWhatIsIt: "Mobile-optimized visual marketing banners tailored for WhatsApp broadcast lists, business catalogs, and social channels.",
    overviewWhoNeedsIt: "Retailers, consultants, real estate agents, and local businesses leveraging direct WhatsApp broadcast lists.",
    overviewWhyChooseUs: "Quick-loading compressed graphic formats that display crisp and vivid on every mobile screen without blurriness.",
    image: "/assets/img/homeservice/service4.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "High-Engagement Visuals", desc: "Designed specifically to provoke click-throughs and message replies." },
      { title: "Festival & Seasonal Kits", desc: "Timely promotional graphics for national holidays, sales, and events." },
      { title: "Optimized File Sizes", desc: "Lightweight images that load instantaneously on mobile networks." },
      { title: "Brand Watermarking", desc: "Includes your logo, contact numbers, and website on every graphic." }
    ],
    metaTitle: "WhatsApp Promotional Images & Creatives Design - Web Tycoons",
    metaDescription: "Custom WhatsApp promotional images and social graphics in Delhi. Boost engagement and customer responses through creative banners."
  },
  {
    title: "Domain Registration",
    slug: "domain",
    sort: 11,
    status: "active",
    shortDesc: "Global domain registration (.com, .in, .org), DNS routing, and brand domain protection.",
    description: "A domain name is your online address and the cornerstone of your digital identity. Your domain URL is the very first thing visitors see, creating a lasting first impression of your organization.\n\nWeb Tycoons assists in researching, selecting, and securing the ideal domain name for your business across popular top-level domains (.com, .in, .co.in, .org, .net), providing complete DNS routing, privacy protection, and automated annual renewals.",
    overviewWhatIsIt: "Official corporate domain search, registration, DNS security configuration, and brand trademark preservation.",
    overviewWhoNeedsIt: "Every company, entrepreneur, or organization establishing an online presence or protecting digital trademarks.",
    overviewWhyChooseUs: "Full ownership access, reliable DNS resolution, WHOIS privacy protection, and zero hidden renewal fees.",
    image: "/assets/img/homeservice/service2.svg",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Global & Country TLDs", desc: "Register .com, .in, .co.in, .org, .io, and specialized extensions." },
      { title: "Full DNS Control", desc: "Easy management of A, CNAME, MX, TXT, and SPF/DKIM verification records." },
      { title: "WHOIS Privacy", desc: "Shield your personal phone number and address from spam scrapers." },
      { title: "Domain Lock Security", desc: "Prevent unauthorized transfers with automated security locks." }
    ],
    metaTitle: "Domain Registration Services in Delhi | The Web Tycoons",
    metaDescription: "Register your business domain name with Web Tycoons. Secure .com, .in, .org domains with full DNS management and privacy protection."
  },
  {
    title: "Web Hosting Solutions",
    slug: "hosting-solution",
    sort: 12,
    status: "active",
    shortDesc: "High-speed Linux SSD cloud hosting, 99.9% uptime, free SSL certificates, and 24/7 security monitoring.",
    description: "Web hosting is the high-performance cloud infrastructure that makes your website accessible worldwide around the clock. Reliable hosting ensures instant load times, zero downtime, and robust protection against cyber threats.\n\nWeb Tycoons provides enterprise-grade Linux shared and cloud hosting solutions equipped with high-speed NVMe SSD storage, unmetered bandwidth, automated daily backups, free SSL certificates, and round-the-clock server monitoring.",
    overviewWhatIsIt: "Secure, blazing-fast cloud hosting infrastructure engineered for maximum uptime, speed, and data protection.",
    overviewWhoNeedsIt: "Businesses needing dependable web hosting without frequent downtimes, slow response times, or server crashes.",
    overviewWhyChooseUs: "99.9% guaranteed uptime SLA, SSD NVMe storage clusters, automated backups, and instant technical support.",
    image: "/assets/img/homeservice/service3.svg",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "99.9% Uptime Guarantee", desc: "Redundant cloud architecture ensures your website is always online." },
      { title: "Free SSL Certificates", desc: "Automatic HTTPS encryption protecting visitor communications." },
      { title: "NVMe SSD Performance", desc: "Blazing-fast file reading speeds reducing page load times." },
      { title: "Daily Cloud Backups", desc: "Automated snapshot recovery ensuring peace of mind against data loss." }
    ],
    metaTitle: "Web Hosting Company in Delhi | Linux Cloud Hosting - Web Tycoons",
    metaDescription: "Reliable Linux web hosting in Delhi by Web Tycoons. High-speed SSD storage, 99.9% uptime, free SSL, and 24/7 support."
  },
  {
    title: "Enterprise Email Solutions",
    slug: "email-solution",
    sort: 13,
    status: "active",
    shortDesc: "Corporate business email on your domain, Google Workspace / Microsoft 365, SPF/DKIM authentication.",
    description: "Using generic free email addresses like @gmail.com or @yahoo.com severely harms corporate credibility and risks critical messages landing in spam filters.\n\nWeb Tycoons sets up enterprise-grade business email solutions powered by Google Workspace, Microsoft 365, and private mail servers. We configure cryptographic SPF, DKIM, DMARC, and MX records to ensure 100% inbox deliverability, spam defense, and seamless cross-device synchronization.",
    overviewWhatIsIt: "Professional corporate email addresses (you@yourcompany.com) configured with enterprise security and zero-spam authentication.",
    overviewWhoNeedsIt: "Any business looking to project professionalism, establish client trust, and protect communications.",
    overviewWhyChooseUs: "Flawless SPF/DKIM/DMARC implementation guaranteeing your emails reach primary inboxes every time.",
    image: "/assets/img/homeservice/service8.webp",
    bgColor: "#ffffff",
    hoverTextColor: "#000000",
    features: [
      { title: "Branded Mailboxes", desc: "Professional addresses like info@yourcompany.com and sales@yourcompany.com." },
      { title: "Google & Microsoft 365", desc: "Seamless onboarding for Google Workspace and Microsoft 365 ecosystems." },
      { title: "100% Deliverability", desc: "Full cryptographic SPF, DKIM, DMARC records preventing email spoofing." },
      { title: "Cross-Device Sync", desc: "Synchronize email, calendar, and contacts across iPhone, Android, and PC." }
    ],
    metaTitle: "Business Email Solutions in Delhi | Enterprise Email - Web Tycoons",
    metaDescription: "Enterprise business email setup in Delhi by Web Tycoons. Google Workspace, Microsoft 365, SPF/DKIM deliverability, and spam protection."
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB.');

  for (const svc of servicesToImport) {
    const existing = await Service.findOne({ slug: svc.slug });
    if (existing) {
      console.log(`Updating existing service: ${svc.slug} (${svc.title})`);
      await Service.updateOne({ slug: svc.slug }, { $set: svc });
    } else {
      console.log(`Creating new service: ${svc.slug} (${svc.title})`);
      await Service.create(svc);
    }
  }

  const count = await Service.countDocuments({ status: 'active' });
  console.log(`\nAll 13 services successfully upserted! Total active services in DB: ${count}`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
