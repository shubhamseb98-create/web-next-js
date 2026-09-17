export const DEFAULT_CRM_CATEGORIES = [
  {
    name: "Real Estate CRM",
    slug: "real-estate-crm",
    description: "Tailored CRM workflows for real estate builders, brokers, and channel partner networks.",
    sort: 1,
    isActive: true,
  },
  {
    name: "Sales & Lead Automation",
    slug: "sales-lead-automation",
    description: "High-velocity pipeline management and multi-channel lead tracking for enterprise sales teams.",
    sort: 2,
    isActive: true,
  },
  {
    name: "Healthcare CRM",
    slug: "healthcare-crm",
    description: "Compliant patient management, appointment scheduling, and care cycle workflows for clinics and hospitals.",
    sort: 3,
    isActive: true,
  },
  {
    name: "E-Commerce & Retail",
    slug: "ecommerce-retail",
    description: "Customer lifecycle, cart recovery, and loyalty management for retail and D2C brands.",
    sort: 4,
    isActive: true,
  }
];

export const DEFAULT_CRM_PRODUCTS = [
  {
    _id: "crm-real-estate-01",
    name: "TycoonProp Real Estate CRM",
    slug: "real-estate-crm",
    categorySlug: "real-estate-crm",
    categoryName: "Real Estate CRM",
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
    modules: [
      {
        title: "Dynamic Inventory & Tower Matrix",
        desc: "Interactive floor-by-floor unit grid with real-time status badges (Available, Booked, Blocked, Sold). Eliminate double-booking errors across sales teams.",
        icon: "Building"
      },
      {
        title: "Site Visit Dispatch & Geo-Tracking",
        desc: "Assign field executives automatically based on geography. Capture customer feedback and digital signatures immediately upon visit completion.",
        icon: "Navigation"
      },
      {
        title: "Channel Partner Portal",
        desc: "Dedicated self-serve portal for real estate brokers to register prospective clients, track deal stages, and view verified commission payouts.",
        icon: "Users"
      },
      {
        title: "WhatsApp & Call Center Integration",
        desc: "Built-in WhatsApp Cloud API automation sends instant greeting messages, project video walk-throughs, and automated payment reminder links.",
        icon: "MessageSquare"
      }
    ],
    techStack: ["Next.js App Router", "Node.js Microservices", "MongoDB Atlas", "Redis Queue", "WhatsApp Cloud API", "Razorpay / Stripe"],
    description: `
      <h3>Purpose-Built CRM for Modern Real Estate Scalability</h3>
      <p>Generic CRMs like Salesforce and HubSpot fail in the real estate sector because they lack native unit inventory matrices, tower-level price breakdowns, and field site visit workflows. <strong>TycoonProp Real Estate CRM</strong> is engineered ground-up to solve these exact friction points.</p>
      
      <h4>Key Architecture Highlights</h4>
      <ul>
        <li><strong>Unified Lead Intake:</strong> Consolidate inquiries from Facebook Ads, Google Ads, Magicbricks, 99acres, and website landing pages directly into a single deduped queue within 1.2 seconds.</li>
        <li><strong>Automated Agent Assignment:</strong> Distribute leads via Round-Robin, Language preference, Project expertise, or Active shift availability.</li>
        <li><strong>Smart Site Visit Scheduler:</strong> Reduces no-show rates by 68% using automated SMS/WhatsApp calendar invites with Google Maps directions.</li>
        <li><strong>Cost Efficiency:</strong> Unlike SaaS products charging $150/user/month, our custom deployment gives your company complete database ownership and zero per-seat licensing penalties.</li>
      </ul>

      <h4>Customizable Modules & Business Rules</h4>
      <p>Every builder and agency operates with unique commission slabs, escalation workflows, and document approval hierarchies. We customize every schema and pipeline stage to mirror your exact standard operating procedures.</p>
    `,
    metatag: "TycoonProp Real Estate CRM | Custom Real Estate Lead & Inventory Software",
    metaDescription: "High-performance custom Real Estate CRM featuring live unit inventory, site visit dispatch, broker portal, and automated WhatsApp lead push.",
    metakeywords: ["real estate crm", "custom real estate crm", "property inventory software", "broker portal", "builder crm"]
  },
  {
    _id: "crm-enterprise-lead-02",
    name: "OmniFlow Enterprise Sales CRM",
    slug: "enterprise-lead-crm",
    categorySlug: "sales-lead-automation",
    categoryName: "Sales & Lead Automation",
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
    modules: [
      {
        title: "Intelligent Pipeline Kanban",
        desc: "Create limitless custom pipelines for differing sales products. Drag-and-drop deals with instant validation rules and stage change webhooks.",
        icon: "Kanban"
      },
      {
        title: "Predictive Lead Scoring Engine",
        desc: "Prioritize hot prospects based on interaction velocity, email clicks, budget indicators, and buyer persona match scores.",
        icon: "TrendingUp"
      },
      {
        title: "Omnichannel Communication Hub",
        desc: "Call, WhatsApp, and email directly from the lead drawer. Every message, recording, and note is preserved in a timeline.",
        icon: "PhoneCall"
      },
      {
        title: "Executive Revenue Analytics",
        desc: "Forecast monthly ARR/revenue, monitor individual rep conversion velocity, and identify pipeline drop-off bottlenecks in real time.",
        icon: "BarChart3"
      }
    ],
    techStack: ["React 19 / Next.js", "Node.js REST / GraphQL", "PostgreSQL / MongoDB", "WebSockets Engine", "Twilio / Exotel", "ElasticSearch"],
    description: `
      <h3>Scale Revenue Without Per-Seat SaaS Traps</h3>
      <p>As your sales development team expands from 10 to 100 reps, standard SaaS CRM subscriptions balloon into six-figure annual liabilities. <strong>OmniFlow Enterprise CRM</strong> provides an enterprise-class, scalable CRM architecture tailored to your unique sales framework with zero recurring per-user fees.</p>

      <h4>Engineered for High-Velocity Closing</h4>
      <ul>
        <li><strong>Zero Data Leakage:</strong> Role-based access ensures sales representatives only see assigned leads, with phone number masking and restricted export permissions.</li>
        <li><strong>Automated SLA Compliance:</strong> If an inbound high-value lead is not contacted within 15 minutes, OmniFlow automatically triggers a supervisor notification and reassigns the lead to an active agent.</li>
        <li><strong>Custom Quotation & Invoicing:</strong> Generate branded PDF proposals directly from deal records with integrated electronic signature workflows.</li>
      </ul>
    `,
    metatag: "OmniFlow Enterprise Sales CRM | Custom Lead Pipeline & Automation Platform",
    metaDescription: "Enterprise-grade custom sales CRM with dynamic Kanban pipelines, automated predictive lead scoring, virtual dialer, and full data privacy.",
    metakeywords: ["custom sales crm", "enterprise crm software", "lead automation crm", "kanban pipeline crm"]
  },
  {
    _id: "crm-healthcare-03",
    name: "ClinicaCore Healthcare & Clinic CRM",
    slug: "healthcare-clinic-crm",
    categorySlug: "healthcare-crm",
    categoryName: "Healthcare CRM",
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
    modules: [
      {
        title: "Smart Appointment & OPD Calendar",
        desc: "Color-coded multi-doctor schedule grid preventing double-bookings. Supports virtual telemedicine calls and in-clinic appointments.",
        icon: "Calendar"
      },
      {
        title: "Patient 360° Health Profile",
        desc: "Centralized record of visits, clinical notes, uploaded lab scans, treatment milestones, and billing ledgers.",
        icon: "FileHeart"
      },
      {
        title: "Automated Reminder Engine",
        desc: "Sends automated multi-touch notifications (24h before, 2h before) via WhatsApp and SMS with one-click rescheduling.",
        icon: "BellRing"
      },
      {
        title: "Treatment Pipeline & Packages",
        desc: "Track surgical proposals, dental aligner packages, and ongoing cosmetic treatments with scheduled billing installments.",
        icon: "Activity"
      }
    ],
    techStack: ["Next.js App Router", "Node.js HIPAA-Ready Backend", "Encrypted MongoDB", "WebRTC Telehealth", "WhatsApp Cloud API"],
    description: `
      <h3>Deliver Elevated Patient Experiences with Purpose-Built Healthcare CRM</h3>
      <p>Clinics, hospitals, and aesthetic medical centers need clinical workflow precision alongside empathetic, timely patient communication. <strong>ClinicaCore Healthcare CRM</strong> bridges the gap between clinical operations and patient relationship management.</p>

      <h4>Why Modern Practices Choose ClinicaCore:</h4>
      <ul>
        <li><strong>Slash No-Shows:</strong> Automatic two-way WhatsApp confirmations allow patients to confirm or reschedule with a single tap, keeping doctor calendars at peak utilization.</li>
        <li><strong>Holistic Treatment Tracking:</strong> Monitor multi-stage procedures such as Orthodontics, IVF, Physiotherapy, and Cosmetic surgeries with custom milestone checklists.</li>
        <li><strong>Strict Data Governance:</strong> Role-based access protects sensitive health information with field-level encryption and full session audit logs.</li>
      </ul>
    `,
    metatag: "ClinicaCore Healthcare CRM | Custom Clinic & Patient Management Software",
    metaDescription: "HIPAA-ready custom healthcare CRM for hospitals and clinics. Smart doctor scheduling, WhatsApp patient reminders, and treatment pipelines.",
    metakeywords: ["healthcare crm", "clinic management software", "patient crm", "hospital appointment crm"]
  },
  {
    _id: "crm-retail-d2c-04",
    name: "CommercePulse Retail & D2C Omni CRM",
    slug: "retail-d2c-crm",
    categorySlug: "ecommerce-retail",
    categoryName: "E-Commerce & Retail",
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
      { label: "Omnichannel Sync", value: "< 2 sec" }
    ],
    features: [
      "Unified Customer Single-View across Web, App, and Physical Retail Outlets",
      "Interactive Abandoned Cart Recovery via WhatsApp & Dynamic Discounts",
      "Tiered Loyalty Points Engine with QR Code In-Store Redemptions",
      "Customer Support Ticket Escalations linked directly to Order IDs",
      "Automated Restock & Product Recommendations based on Buying Frequency",
      "RFM (Recency, Frequency, Monetary) Customer Segmentation"
    ],
    modules: [
      {
        title: "Unified Customer Single View",
        desc: "Connect POS retail store transactions and online e-commerce orders into one definitive customer profile with total lifetime spend.",
        icon: "ShoppingBag"
      },
      {
        title: "Cart & Checkout Recovery Engine",
        desc: "Hyper-personalized recovery sequences triggered via WhatsApp with direct checkout checkout links and timed voucher incentives.",
        icon: "RotateCcw"
      },
      {
        title: "Omnichannel Loyalty & Rewards",
        desc: "Award points on every online or offline purchase. Allow customers to redeem points instantly via OTP or digital wallet pass.",
        icon: "Gift"
      },
      {
        title: "Customer Support & RMA Desk",
        desc: "Empower support agents with full order context, delivery tracking, and return/exchange authorizations from one view.",
        icon: "Headphones"
      }
    ],
    techStack: ["Next.js 16", "Node.js Event-Driven Architecture", "MongoDB Atlas", "Shopify / WooCommerce APIs", "WhatsApp Business", "Shiprocket"],
    description: `
      <h3>Turn One-Time Shoppers into Lifetime Brand Advocates</h3>
      <p>Modern D2C brands and multi-store retailers lose thousands in revenue when customer data is siloed across offline billing counters and online store dashboards. <strong>CommercePulse Retail CRM</strong> unifies every touchpoint into a cohesive customer engagement machine.</p>

      <h4>Key Competitive Advantages:</h4>
      <ul>
        <li><strong>Automated Abandoned Cart Wins:</strong> Recover up to 34% of dropped carts using rich interactive WhatsApp messages featuring product images and 1-tap checkout buttons.</li>
        <li><strong>Actionable RFM Segmentation:</strong> Automatically segment your audience into Champions, Promising, At Risk, and Dormant groups for pinpoint marketing campaigns.</li>
        <li><strong>Zero Cloud Vendor Lock-In:</strong> Fully owned source code and database, freeing your business from escalating SaaS percentages on GMV.</li>
      </ul>
    `,
    metatag: "CommercePulse Retail & D2C CRM | Omnichannel Customer Retention Software",
    metaDescription: "Custom D2C & Retail CRM featuring unified POS/e-commerce customer profiles, automated WhatsApp cart recovery, and tier-based loyalty engine.",
    metakeywords: ["retail crm", "d2c crm", "ecommerce customer crm", "whatsapp cart recovery crm"]
  }
];
