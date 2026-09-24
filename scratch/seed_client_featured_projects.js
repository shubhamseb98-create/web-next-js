const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: '.env' });

const clientProjects = [
  {
    title: 'Kasturi Jewellers Luxury Flagship',
    slug: 'kasturi-jewellers',
    category: 'E-Commerce Website',
    clientName: 'Kasturi Jewellers Pvt. Ltd.',
    projectUrl: 'https://www.kasturijewellers.in',
    shortDesc: 'A prestigious luxury e-commerce and bridal jewelry digital showcase engineered with high-definition catalog browsing, live bullion rates, and bespoke consultation funnels.',
    description: '<p>WebTycoons engineered a prestigious digital flagship for Kasturi Jewellers featuring high-resolution handcrafted jewelry catalogs, real-time gold and silver bullion rate tracking, and an intuitive bridal suite appointment booking funnel.</p>',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Razorpay', 'Cloudinary CDN'],
    image: '/images/clients/snapshots/kasturi.jpg',
    themeColor: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    themeTextColor: '#0f172a',
    sort: 1,
    isFeatured: true,
    status: 'active',
    metaTitle: 'Kasturi Jewellers Website Case Study | WebTycoons',
    metaDescription: 'Explore the bespoke luxury jewelry e-commerce website designed and developed for Kasturi Jewellers by WebTycoons.'
  },
  {
    title: 'Thukral Electric Mobility Portal',
    slug: 'thukral-electric-bikes',
    category: 'Dynamic Website',
    clientName: 'Thukral Electric Bikes',
    projectUrl: 'http://thukralelectricbikes.com',
    shortDesc: "India's premier eco-friendly EV showcase featuring 2-wheeler and 3-wheeler interactive specs, mileage calculators, and a nationwide dealership discovery network.",
    description: '<p>Custom-built electric vehicle brand platform for Thukral Electric Bikes, featuring real-time vehicle battery specs, EMI calculators, and a nationwide dealer locator driving qualified B2B & B2C inquiries across India.</p>',
    technologies: ['Next.js', 'Framer Motion', 'Interactive Calculators', 'Dealer Locator', 'SEO'],
    image: '/images/clients/snapshots/thukral.jpg',
    themeColor: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    themeTextColor: '#ffffff',
    sort: 2,
    isFeatured: true,
    status: 'active',
    metaTitle: 'Thukral Electric Bikes Portal Case Study | WebTycoons',
    metaDescription: 'Case study on the responsive electric vehicle showcase and dealer portal developed for Thukral Electric Bikes by WebTycoons.'
  },
  {
    title: 'G.D. Goenka La Petite Montessori',
    slug: 'gd-goenka-la-petite',
    category: 'Dynamic Website',
    clientName: 'G.D. Goenka La Petite (Pitampura)',
    projectUrl: 'http://gdgoenkapp.com',
    shortDesc: 'A joyful, interactive early childhood educational platform featuring virtual campus walkthroughs, activity galleries, and an automated parent admission inquiry system.',
    description: '<p>A vibrant, mobile-first educational portal crafted for G.D. Goenka La Petite Pitampura to highlight their globally recognized Montessori curriculum, interactive activities, and seamless parent-teacher admission pipeline.</p>',
    technologies: ['React', 'Next.js', 'GSAP Animations', 'Admissions CRM', 'Mobile First'],
    image: '/images/clients/snapshots/lapetite.jpg',
    themeColor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    themeTextColor: '#ffffff',
    sort: 3,
    isFeatured: true,
    status: 'active',
    metaTitle: 'G.D. Goenka La Petite Website Case Study | WebTycoons',
    metaDescription: 'Modern education and admissions portal crafted for G.D. Goenka La Petite by WebTycoons.'
  },
  {
    title: 'BLS World School Campus Platform',
    slug: 'bls-world-school',
    category: 'Corporate Website',
    clientName: 'BLS World School',
    projectUrl: 'http://blsworldschool.com',
    shortDesc: 'Comprehensive institutional education ecosystem connecting students, parents, and faculty with dynamic academic calendars, syllabus modules, and online registration.',
    description: '<p>Engineered a secure, scalable K-12 institution portal featuring academic calendar management, dynamic notice board updates, faculty profiles, and comprehensive enrollment workflows.</p>',
    technologies: ['Next.js', 'Node.js', 'Notice Engine', 'Tailwind CSS', 'Schema Markup'],
    image: '/images/clients/snapshots/blsworldschool.jpg',
    themeColor: 'linear-gradient(135deg, #2563eb 0%, #38bdf8 100%)',
    themeTextColor: '#ffffff',
    sort: 4,
    isFeatured: true,
    status: 'active',
    metaTitle: 'BLS World School Website Case Study | WebTycoons',
    metaDescription: 'Enterprise K-12 institution website and academic portal engineered for BLS World School by WebTycoons.'
  },
  {
    title: 'Sabkool Industrial Climate Systems',
    slug: 'sabkool-air-cooling',
    category: 'Dynamic Website',
    clientName: 'Sabkool Commercial Air Cooling',
    projectUrl: 'https://www.sabkool.com',
    shortDesc: 'Heavy-duty industrial cooling B2B portal featuring duct air cooler specifications, cooling capacity estimators, and high-volume commercial quotation workflows.',
    description: '<p>Designed an engineering-focused B2B portal for Sabkool with airflow capacity calculators, commercial project case studies, and instant quote generation modules for factories, warehouses, and commercial complexes.</p>',
    technologies: ['Next.js', 'Product Matrix', 'Quote Estimator', 'Responsive UI'],
    image: '/images/clients/snapshots/sabkool.jpg',
    themeColor: 'linear-gradient(135deg, #0284c7 0%, #06b6d4 100%)',
    themeTextColor: '#ffffff',
    sort: 5,
    isFeatured: true,
    status: 'active',
    metaTitle: 'Sabkool Commercial HVAC Website Case Study | WebTycoons',
    metaDescription: 'B2B commercial cooling and industrial HVAC web portal designed for Sabkool by WebTycoons.'
  },
  {
    title: 'Maipo Architectural Bathware',
    slug: 'maipo-faucets',
    category: 'Dynamic Website',
    clientName: 'Maipo Faucets Expertise',
    projectUrl: 'https://www.maipo.in',
    shortDesc: 'Sleek, minimalist digital catalog showcasing designer brass and chrome sanitaryware, complete with 360-degree finish selectors and authorized distributor locator.',
    description: '<p>A sleek, minimalist digital catalog showcasing Maipo brass and chrome bath fittings, featuring product 360 views, downloadable architectural spec sheets, and retail partner locators.</p>',
    technologies: ['Next.js', 'React', 'Digital Lookbook', 'Dealer Network', 'CSS Modules'],
    image: '/images/clients/snapshots/maipo.jpg',
    themeColor: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)',
    themeTextColor: '#ffffff',
    sort: 6,
    isFeatured: true,
    status: 'active',
    metaTitle: 'Maipo Bathware Website Case Study | WebTycoons',
    metaDescription: 'Designer architectural bath fittings and faucet showcase developed for Maipo by WebTycoons.'
  },
  {
    title: 'Abrigo Advanced Shield Systems',
    slug: 'abrigo-protection',
    category: 'Corporate Website',
    clientName: 'Abrigo Protective Solutions',
    projectUrl: 'http://www.abrigo.in',
    shortDesc: 'High-durability safety and enterprise armor product showcase built with precision material certifications and industrial client lead capture.',
    description: '<p>Enterprise digital showcase highlighting Abrigo industrial protection solutions, ballistic materials, and automated quotation pipelines.</p>',
    technologies: ['Next.js', 'Tailwind CSS', 'Enterprise CMS', 'B2B Portal'],
    image: '/images/clients/snapshots/abrigo.jpg',
    themeColor: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    themeTextColor: '#ffffff',
    sort: 7,
    isFeatured: false,
    status: 'active'
  },
  {
    title: 'Catalyst Clinical Research Portal',
    slug: 'catalyst-clinical-services',
    category: 'Dynamic Website',
    clientName: 'Catalyst Clinical Services',
    projectUrl: 'https://catalystclinicalservices.com',
    shortDesc: 'Global clinical trial management and biopharma regulatory research portal engineered for speed, international compliance, and trial participant onboarding.',
    description: '<p>A secure, compliant digital clinical research portal designed for healthcare sponsors, investigators, and research subjects worldwide.</p>',
    technologies: ['Next.js', 'Node.js', 'HIPAA Compliant UI', 'Data Portal'],
    image: '/images/clients/snapshots/catalyst.jpg',
    themeColor: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    themeTextColor: '#ffffff',
    sort: 8,
    isFeatured: false,
    status: 'active'
  },
  {
    title: 'IUP Jindal Precision Metallurgy',
    slug: 'iup-jindal-metals',
    category: 'Corporate Website',
    clientName: 'IUP Jindal Metals & Alloys',
    projectUrl: 'https://www.iupjindal.com',
    shortDesc: 'Enterprise stainless steel strip specifications and global export portal serving aerospace, automotive, and industrial engineering worldwide.',
    description: '<p>Global manufacturing and metals engineering platform built with precision technical data sheets, international grades conversion, and direct export request workflows.</p>',
    technologies: ['Next.js', 'Product Spec Explorer', 'B2B Inquiries', 'Global CDN'],
    image: '/images/clients/snapshots/iupjindal.jpg',
    themeColor: 'linear-gradient(135deg, #334155 0%, #64748b 100%)',
    themeTextColor: '#ffffff',
    sort: 9,
    isFeatured: false,
    status: 'active'
  },
  {
    title: 'Digital by Diksha Vohra',
    slug: 'digital-diksha-vohra',
    category: 'Landing Page',
    clientName: 'Digital by Diksha Vohra',
    projectUrl: 'https://www.dikshavohra.com',
    shortDesc: 'Bespoke personal branding and content strategy portfolio showcasing high-impact editorial campaigns and multinational brand storytelling.',
    description: '<p>A luxury personal brand website built for author, journalist, and content strategist Diksha Vohra, highlighting global publications, speaking engagements, and copywriting services.</p>',
    technologies: ['Next.js', 'Framer Motion', 'Editorial Typography', 'Booking Engine'],
    image: '/images/clients/snapshots/digital.jpg',
    themeColor: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    themeTextColor: '#ffffff',
    sort: 10,
    isFeatured: false,
    status: 'active'
  }
];

async function seedFeaturedClientProjects() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }));

    // Un-feature previous dummy items so only real clients are featured
    const unfeatureResult = await Portfolio.updateMany(
      { slug: { $nin: clientProjects.map(c => c.slug) } },
      { $set: { isFeatured: false } }
    );
    console.log('Unfeatured dummy projects count:', unfeatureResult.modifiedCount);

    // Upsert each client project
    for (const project of clientProjects) {
      const res = await Portfolio.findOneAndUpdate(
        { slug: project.slug },
        { $set: project },
        { upsert: true, new: true }
      );
      console.log(`Saved client: ${res.title} (Featured: ${res.isFeatured}, Sort: ${res.sort})`);
    }

    const featured = await Portfolio.find({ status: 'active', isFeatured: true }).sort({ sort: 1 }).lean();
    console.log('\n--- Active Featured Projects for Homepage ---');
    featured.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.clientName}] ${p.title} (${p.projectUrl}) -> Image: ${p.image}`);
    });

    console.log('\nDatabase seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding featured projects:', err);
    process.exit(1);
  }
}

seedFeaturedClientProjects();
