import { 
  FaLaptopCode, 
  FaMobileAlt, 
  FaShoppingCart, 
  FaRocket, 
  FaSearchDollar, 
  FaCheckCircle,  
  FaBolt, 
  FaShieldAlt, 
  FaCogs, 
  FaCreditCard, 
  FaUserShield, 
  FaServer,
  FaHeadset,
  FaDollarSign,
  FaTrophy,
  FaDesktop
} from 'react-icons/fa'

export const servicesData = {
  static: {
    hero: {
      title: 'Static Website Development',
      description: 'Lightning-fast, highly secure, and beautifully designed static websites tailored to showcase your brand with zero compromises on performance.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop'
    },
    overview: {
      whatIsIt: 'A static website delivers pre-rendered HTML, CSS, and JavaScript directly to the browser. Without needing database queries, these sites offer unparalleled speed, security, and reliability.',
      whoNeedsIt: 'Perfect for portfolios, landing pages, small businesses, and informational sites that do not require frequent content updates or user authentication.',
      benefits: ['Lightning Fast Load Times', 'Bulletproof Security', 'Cost-Effective Hosting', 'Incredible SEO Performance'],
      whyChooseUs: 'We craft static websites with modern frameworks and pixel-perfect design, ensuring your online presence is both breathtaking and structurally flawless.'
    },
    features: [
      { title: 'Responsive Design', desc: 'Flawless experience across all devices.', icon: FaMobileAlt },
      { title: 'SEO Friendly', desc: 'Optimized structure for high search rankings.', icon: FaSearchDollar },
      { title: 'Fast Loading', desc: 'Near-instant page load times.', icon: FaBolt },
      { title: 'Mobile First', desc: 'Designed primarily for the mobile experience.', icon: FaMobileAlt },
      { title: 'Modern UI/UX', desc: 'Engaging, user-centric interfaces.', icon: FaDesktop },
      { title: 'Cross Browser', desc: 'Consistent look on Chrome, Safari, Firefox, etc.', icon: FaLaptopCode },
      { title: 'Secure Coding', desc: 'Zero database vulnerabilities.', icon: FaShieldAlt },
      { title: 'Performance Optimized', desc: 'Optimized assets for maximum speed.', icon: FaRocket }
    ],
    technologies: [
      { name: 'HTML5', desc: 'Semantic Structure', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', desc: 'Styling & Layouts', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', desc: 'Interactivity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Bootstrap', desc: 'Responsive Grid', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Tailwind CSS', desc: 'Utility-First Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'AOS', desc: 'Scroll Animations', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'GSAP', desc: 'Advanced Animations', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React', desc: 'UI Library', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ],
    process: [
      { step: '01', title: 'Discover', desc: 'Understanding your business goals and target audience.' },
      { step: '02', title: 'Planning', desc: 'Creating sitemaps, wireframes, and project timelines.' },
      { step: '03', title: 'UI/UX Design', desc: 'Designing high-fidelity mockups with modern aesthetics.' },
      { step: '04', title: 'Development', desc: 'Writing clean, semantic, and optimized code.' },
      { step: '05', title: 'Testing', desc: 'Rigorous cross-browser and performance testing.' },
      { step: '06', title: 'Deployment', desc: 'Launching your site on a secure, global CDN.' },
      { step: '07', title: 'Maintenance', desc: 'Ongoing support and performance monitoring.' }
    ],
    faqs: [
      { q: 'What is a static website?', a: 'A static website consists of web pages with fixed content. Each page displays exactly the same information to every visitor and doesn\'t rely on a database.' },
      { q: 'How long does it take to build?', a: 'Typically, a static website can be designed and developed within 2 to 4 weeks, depending on the number of pages and complexity of the design.' },
      { q: 'Can I update the content myself?', a: 'Since there is no CMS, updating content requires editing the code. We offer maintenance packages to handle updates for you, or we can integrate a headless CMS if you need frequent updates.' },
      { q: 'Is it mobile friendly?', a: 'Absolutely. We use a mobile-first approach ensuring your website looks perfect on smartphones, tablets, and desktops.' },
      { q: 'Will my website be SEO optimized?', a: 'Yes. Static websites are incredibly fast, which is a major ranking factor for Google. We also ensure all on-page SEO best practices are followed.' },
      { q: 'Where will the website be hosted?', a: 'We typically host static sites on premium CDNs like Vercel, Netlify, or AWS for maximum global performance.' },
      { q: 'Do you provide domain registration?', a: 'Yes, we can assist with domain registration and setting up custom professional email addresses.' },
      { q: 'What if I need to add e-commerce later?', a: 'A static site can easily be upgraded or migrated to a dynamic or e-commerce platform when your business is ready to scale.' }
    ]
  },
  
  dynamic: {
    hero: {
      title: 'Dynamic Website Development',
      description: 'Robust, scalable, and highly interactive dynamic websites powered by modern CMS and custom backend architectures.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop'
    },
    overview: {
      whatIsIt: 'Dynamic websites generate content in real-time using a database and backend logic. They allow for user authentication, content management systems (CMS), and complex personalized user experiences.',
      whoNeedsIt: 'Ideal for corporate websites, news portals, real estate listings, educational platforms, and businesses that require frequent content updates or user accounts.',
      benefits: ['Easy Content Management', 'Scalable Architecture', 'Personalized User Experiences', 'Advanced Integrations'],
      whyChooseUs: 'We engineer secure, scalable, and high-performance dynamic applications using the latest tech stacks to future-proof your digital business.'
    },
    features: [
      { title: 'CMS Integration', desc: 'Manage your own content easily.', icon: FaCogs },
      { title: 'User Authentication', desc: 'Secure login and registration.', icon: FaUserShield },
      { title: 'API Integration', desc: 'Connect with third-party services.', icon: FaServer },
      { title: 'Responsive Design', desc: 'Flawless on all devices.', icon: FaMobileAlt },
      { title: 'Modern UI/UX', desc: 'Engaging, interactive interfaces.', icon: FaDesktop },
      { title: 'Database Management', desc: 'Efficient data storage and retrieval.', icon: FaServer },
      { title: 'Secure Coding', desc: 'Protection against web vulnerabilities.', icon: FaShieldAlt },
      { title: 'Performance Optimized', desc: 'Fast rendering and query optimization.', icon: FaRocket }
    ],
    technologies: [
      { name: 'PHP', desc: 'Backend Scripting', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'Laravel', desc: 'PHP Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'MySQL', desc: 'Relational Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'React.js', desc: 'Frontend Library', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', desc: 'JavaScript Runtime', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', desc: 'Node Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'REST API', desc: 'Data Communication', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'MongoDB', desc: 'NoSQL Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' }
    ],
    process: [
      { step: '01', title: 'Discover', desc: 'Analyzing requirements, workflows, and database needs.' },
      { step: '02', title: 'Planning', desc: 'System architecture, database schema, and UI/UX wireframes.' },
      { step: '03', title: 'UI/UX Design', desc: 'Creating interactive prototypes and design systems.' },
      { step: '04', title: 'Development', desc: 'Building frontend interfaces and backend APIs.' },
      { step: '05', title: 'Testing', desc: 'QA testing, security audits, and bug fixing.' },
      { step: '06', title: 'Deployment', desc: 'Server setup, CI/CD pipeline configuration, and launch.' },
      { step: '07', title: 'Maintenance', desc: 'Server monitoring, backups, and feature updates.' }
    ],
    faqs: [
      { q: 'What is a dynamic website?', a: 'A dynamic website uses a database to pull and display information based on the user or the time of day. It allows you to log into an admin panel and change content without touching the code.' },
      { q: 'Will I be able to manage the content?', a: 'Yes! We integrate user-friendly Content Management Systems (CMS) so you can easily add, edit, or delete pages, posts, and images.' },
      { q: 'Is it secure from hackers?', a: 'Security is our top priority. We implement CSRF protection, SQL injection prevention, secure password hashing, and regular security audits.' },
      { q: 'How long does a dynamic website take to build?', a: 'Depending on the features and complexity, a custom dynamic website typically takes between 4 to 8 weeks.' },
      { q: 'Can you integrate third-party APIs?', a: 'Yes, we can integrate almost any third-party API, including CRMs, payment gateways, marketing tools, and social media platforms.' },
      { q: 'Do you provide hosting services?', a: 'We offer robust cloud hosting solutions (AWS, DigitalOcean) optimized specifically for dynamic web applications.' },
      { q: 'Is the website scalable?', a: 'Absolutely. We design our database schemas and server architectures to scale seamlessly as your user base grows.' },
      { q: 'Do you offer ongoing technical support?', a: 'Yes, we provide ongoing maintenance contracts to keep your server updated, secure, and running smoothly.' }
    ]
  },

  ecommerce: {
    hero: {
      title: 'E-Commerce Website Development',
      description: 'High-conversion, secure, and lightning-fast online stores designed to scale your business and maximize your digital revenue.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop'
    },
    overview: {
      whatIsIt: 'An e-commerce website allows you to sell products or services online. It includes product catalogs, shopping carts, secure payment gateways, and inventory management.',
      whoNeedsIt: 'Retailers, wholesalers, subscription services, and any business looking to sell physical or digital goods directly to consumers globally.',
      benefits: ['Global Reach & 24/7 Sales', 'Streamlined Inventory Management', 'Secure Payment Processing', 'Actionable Customer Analytics'],
      whyChooseUs: 'We build frictionless shopping experiences optimized for conversions, speed, and mobile responsiveness, ensuring your customers keep coming back.'
    },
    features: [
      { title: 'Payment Gateway', desc: 'Secure Stripe, PayPal, Razorpay integrations.', icon: FaCreditCard },
      { title: 'Admin Panel', desc: 'Comprehensive dashboard for orders & inventory.', icon: FaCogs },
      { title: 'Mobile Optimized', desc: 'Frictionless mobile checkout experience.', icon: FaMobileAlt },
      { title: 'SEO Optimized', desc: 'Product schema markup for higher rankings.', icon: FaSearchDollar },
      { title: 'Fast Loading', desc: 'Optimized product images for speed.', icon: FaBolt },
      { title: 'Secure Checkout', desc: 'SSL encryption and PCI compliance.', icon: FaShieldAlt },
      { title: 'User Accounts', desc: 'Order tracking and wishlists for users.', icon: FaUserShield },
      { title: 'Cart Recovery', desc: 'Automated abandoned cart emails.', icon: FaShoppingCart }
    ],
    technologies: [
      { name: 'Next.js', desc: 'React Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'React', desc: 'UI Library', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', desc: 'Backend Server', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Stripe', desc: 'Payment Processor', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Laravel', desc: 'PHP Framework', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
      { name: 'MySQL', desc: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'WooCommerce', desc: 'WP E-Commerce', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg' },
      { name: 'Firebase', desc: 'Realtime Auth', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
    ],
    process: [
      { step: '01', title: 'Discover', desc: 'Understanding your products, shipping, and payment requirements.' },
      { step: '02', title: 'Planning', desc: 'Designing the user journey from product discovery to checkout.' },
      { step: '03', title: 'UI/UX Design', desc: 'Creating high-converting product pages and cart layouts.' },
      { step: '04', title: 'Development', desc: 'Building the storefront, cart logic, and admin panel.' },
      { step: '05', title: 'Integrations', desc: 'Connecting payment gateways, shipping APIs, and ERPs.' },
      { step: '06', title: 'Testing', desc: 'Rigorous testing of the checkout flow and security audits.' },
      { step: '07', title: 'Deployment', desc: 'Store launch and performance monitoring.' }
    ],
    faqs: [
      { q: 'Which e-commerce platform do you use?', a: 'We build custom solutions using React/Next.js and Node.js for ultimate scalability, or use established platforms like WooCommerce and Shopify depending on your specific needs.' },
      { q: 'Can I manage my own inventory and orders?', a: 'Yes! We provide a comprehensive admin dashboard where you can easily manage products, track inventory, and fulfill orders.' },
      { q: 'Is the payment process secure?', a: 'Extremely. We only integrate with PCI-compliant payment processors like Stripe, PayPal, and Razorpay. Credit card data is never stored on your servers.' },
      { q: 'How many products can my store handle?', a: 'Our custom e-commerce architectures are designed to handle anywhere from a single product to catalogs with millions of SKUs without performance degradation.' },
      { q: 'Will the store work on mobile devices?', a: 'Yes, over 60% of e-commerce traffic is mobile. We design with a mobile-first philosophy to ensure the highest possible conversion rates on smartphones.' },
      { q: 'Can you integrate my accounting software?', a: 'Yes, we can integrate your e-commerce store with popular accounting software, ERPs, and CRMs using their APIs.' },
      { q: 'Do you offer SEO for e-commerce?', a: 'Yes, we build our stores with technical SEO in mind, including product schema markup, optimized meta tags, and fast loading speeds.' },
      { q: 'What happens after the store goes live?', a: 'We offer post-launch support, conversion rate optimization (CRO) consulting, and ongoing technical maintenance to ensure your store runs flawlessly.' }
    ]
  }
}

export const whyChooseUsGlobal = [
  { title: 'Experienced Developers', icon: 'FaLaptopCode', desc: 'Decades of combined engineering excellence.' },
  { title: 'Modern Technologies', icon: 'FaRocket', desc: 'We use the latest, most secure frameworks.' },
  { title: 'SEO Friendly Websites', icon: 'FaSearchDollar', desc: 'Built from the ground up for high rankings.' },
  { title: '100% Responsive', icon: 'FaMobileAlt', desc: 'Flawless performance on any screen size.' },
  { title: 'Fast Delivery', icon: 'FaBolt', desc: 'Agile development for rapid deployment.' },
  { title: 'Clean Code', icon: 'FaCogs', desc: 'Maintainable, scalable, and documented.' },
  { title: 'Scalable Architecture', icon: 'FaServer', desc: 'Ready to grow alongside your business.' },
  { title: 'Technical Support', icon: 'FaHeadset', desc: '24/7 dedicated monitoring and support.' },
  { title: 'Affordable Pricing', icon: 'FaDollarSign', desc: 'Premium enterprise quality without the bloat.' }
]

// ─── Static Website Portfolio ───────────────────────────────────────────────
export const staticPortfolioProjects = [
  { id: 1, name: 'Corporate Portfolio', category: 'Static', tech: 'HTML, CSS, GSAP', desc: 'Award-winning portfolio for a design agency.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 2, name: 'Brand Landing Page', category: 'Static', tech: 'React, Tailwind', desc: 'High-conversion product launch page.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 3, name: 'Professional Resume Site', category: 'Static', tech: 'HTML, CSS, JS', desc: 'Minimal, elegant online CV.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 4, name: 'Tech Startup Homepage', category: 'Static', tech: 'Vite, React', desc: 'SaaS company homepage with smooth animations.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 5, name: 'Restaurant Website', category: 'Static', tech: 'Bootstrap, GSAP', desc: 'Elegant site for a fine-dining restaurant.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 6, name: 'Event Page', category: 'Static', tech: 'HTML, CSS', desc: 'Countdown & registration page for a conference.', image: '/assets/img/project/snapweb.png', link: '#' },
]

// ─── Dynamic Website Portfolio ───────────────────────────────────────────────
export const dynamicPortfolioProjects = [
  { id: 1, name: 'Real Estate Platform', category: 'Dynamic', tech: 'Laravel, Vue.js', desc: 'Property listing & management portal.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 2, name: 'News & Blog Portal', category: 'Dynamic', tech: 'Node.js, React', desc: 'Multi-author publishing platform with CMS.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 3, name: 'Corporate Intranet', category: 'Dynamic', tech: 'PHP, MySQL', desc: 'Internal employee management portal.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 4, name: 'EdTech Learning App', category: 'Dynamic', tech: 'Next.js, MongoDB', desc: 'Online course platform with user accounts.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 5, name: 'Hospital Management', category: 'Dynamic', tech: 'Laravel, MySQL', desc: 'Patient records and appointment system.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 6, name: 'Cloud Security Platform', category: 'Dynamic', tech: 'React, Express', desc: 'Enterprise threat dashboard and log viewer.', image: '/assets/img/project/snapweb.png', link: '#' },
]

// ─── E-Commerce Portfolio ────────────────────────────────────────────────────
export const ecommercePortfolioProjects = [
  { id: 1, name: 'Fashion Boutique', category: 'E-Commerce', tech: 'WooCommerce', desc: 'Premium clothing store with filters & wishlist.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 2, name: 'Electronics Superstore', category: 'E-Commerce', tech: 'Next.js, Stripe', desc: 'Massive product catalog with smart search.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 3, name: 'Organic Foods Store', category: 'E-Commerce', tech: 'Shopify, React', desc: 'Subscription-based health food store.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 4, name: 'Furniture & Decor Shop', category: 'E-Commerce', tech: 'Laravel, Vue', desc: 'Room visualizer and product configurator.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 5, name: 'Jewellery Marketplace', category: 'E-Commerce', tech: 'Next.js, MySQL', desc: 'Multi-vendor jewellery marketplace.', image: '/assets/img/project/snapweb.png', link: '#' },
  { id: 6, name: 'Digital Products Store', category: 'E-Commerce', tech: 'Node.js, Stripe', desc: 'Sell e-books, templates, and courses online.', image: '/assets/img/project/snapweb.png', link: '#' },
]

// ─── Testimonials per service ────────────────────────────────────────────────
export const staticTestimonials = [
  { id: 1, text: "WebTycoons built our company portfolio site and it loads in under 1 second. The design is absolutely stunning.", author: "Priya Sharma", role: "Founder, Crescendo Studio" },
  { id: 2, text: "Our static landing page now converts at 3x the rate of our old site. Incredible work by the WebTycoons team.", author: "James Holloway", role: "Marketing Director, LaunchLab" },
  { id: 3, text: "The attention to detail in performance and design is unmatched. Our SEO rankings skyrocketed within weeks.", author: "Nadia Mehra", role: "CEO, BrandEdge" },
  { id: 4, text: "Clean code, pixel-perfect design, and delivered on time. Exactly what we needed.", author: "Tom Richards", role: "Director, Richards & Co." },
  { id: 5, text: "Our restaurant website is beautiful and lightning fast. Customers constantly compliment it!", author: "Sofia Rossi", role: "Owner, Rossi's Fine Dining" },
  { id: 6, text: "They took our rough ideas and created something truly premium. The process was smooth from start to finish.", author: "Ali Hassan", role: "Product Lead, Zeptive" },
]

export const dynamicTestimonials = [
  { id: 1, text: "Our real estate portal handles thousands of listings with zero downtime. WebTycoons built something truly scalable.", author: "Rajan Kapoor", role: "CTO, PropertyPrime" },
  { id: 2, text: "The CMS they built is so easy to use. We update our news portal daily without touching a line of code.", author: "Caroline Wu", role: "Editor-in-Chief, DailyBrief" },
  { id: 3, text: "Security was our biggest concern and they delivered. Our platform passed every penetration test.", author: "Marcus Lee", role: "CISO, SecureNova" },
  { id: 4, text: "The hospital management system they built for us has transformed our patient workflow completely.", author: "Dr. Anya Singh", role: "Director, MedCore Clinics" },
  { id: 5, text: "API integrations, custom dashboards, user roles — they handled our complex requirements with ease.", author: "Ben Turner", role: "COO, Enterprise Hub" },
  { id: 6, text: "The EdTech platform they built now serves over 10,000 students. Rock-solid performance every day.", author: "Seema Malhotra", role: "CEO, LearnSphere" },
]

export const ecommerceTestimonials = [
  { id: 1, text: "Our online store revenue doubled in the first quarter after launch. The checkout UX is frictionless.", author: "Divya Nair", role: "Owner, Divya's Boutique" },
  { id: 2, text: "The Stripe integration and abandoned cart emails alone recovered over ₹5L in lost sales in month one.", author: "Kevin Strauss", role: "E-Commerce Manager, TechMart" },
  { id: 3, text: "Our conversion rate on mobile went up by 65% thanks to their mobile-first checkout design.", author: "Aisha Patel", role: "CTO, QuickShop" },
  { id: 4, text: "They built a multi-vendor marketplace for us on time and within budget. Outstanding delivery.", author: "Rahul Verma", role: "Founder, ShopSphere" },
  { id: 5, text: "From product pages to payment flow, everything is butter smooth. Our customers love it.", author: "Laura Chen", role: "CEO, OrganicBox" },
  { id: 6, text: "The admin panel is incredibly powerful. Managing 10,000 SKUs is now a breeze.", author: "Patrick O'Brien", role: "Operations Head, ElectroMax" },
]

// Legacy export for backward compatibility
export const portfolioPlaceholders = staticPortfolioProjects
export const testimonialsGlobal = staticTestimonials

export const techStackGlobal = [
  { name: 'React', sub: 'TypeScript', icon: 'SiReact', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', sub: 'React Framework', icon: 'SiNextdotjs', color: '#FFFFFF', category: 'Frontend' },
  { name: 'TypeScript', sub: 'Language', icon: 'SiTypescript', color: '#3178C6', category: 'Frontend' },
  { name: 'Tailwind CSS', sub: 'Styling', icon: 'SiTailwindcss', color: '#06B6D4', category: 'Frontend' },
  { name: 'Vue 3', sub: 'JavaScript', icon: 'SiVuedotjs', color: '#4FC08D', category: 'Frontend' },
  { name: 'Figma', sub: 'Design Tool', icon: 'SiFigma', color: '#F24E1E', category: 'Frontend' },
  { name: 'GSAP', sub: 'Animation', icon: 'SiGreensock', color: '#88CE02', category: 'Frontend' },
  { name: 'Sass', sub: 'CSS Preprocessor', icon: 'SiSass', color: '#CC6699', category: 'Frontend' },
  { name: 'Node.js', sub: 'Runtime', icon: 'SiNodedotjs', color: '#339933', category: 'Backend' },
  { name: 'Python', sub: 'Backend', icon: 'SiPython', color: '#3776AB', category: 'Backend' },
  { name: 'AWS', sub: 'Cloud Infra', icon: 'FaAws', color: '#FF9900', category: 'Backend' },
  { name: 'MongoDB', sub: 'NoSQL Database', icon: 'SiMongodb', color: '#47A248', category: 'Backend' },
  { name: 'Docker', sub: 'Containerization', icon: 'SiDocker', color: '#2496ED', category: 'Backend' },
  { name: 'PostgreSQL', sub: 'Relational DB', icon: 'SiPostgresql', color: '#4169E1', category: 'Backend' },
  { name: 'GraphQL', sub: 'API Query', icon: 'SiGraphql', color: '#E10098', category: 'Backend' },
  { name: 'Firebase', sub: 'BaaS', icon: 'SiFirebase', color: '#FFCA28', category: 'Backend' }
]
