const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: '.env' });

async function updateBannerTexts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const Banner = mongoose.models.Banner || mongoose.model('Banner', new mongoose.Schema({}, { strict: false }));

    const updates = [
      {
        filter: { sort: 1 },
        data: {
          title: 'Enterprise IT Solutions & Digital Engineering',
          subtitle: 'Architecting robust cloud infrastructures, bespoke enterprise software, and scalable digital ecosystems engineered for modern business growth.',
          buttonText: 'Get Free Consultation',
          url: '/contact',
          status: 'active'
        }
      },
      {
        filter: { sort: 2 },
        data: {
          title: 'Full-Stack Development & Cloud Architecture',
          subtitle: 'High-performance Next.js web applications, reactive mobile platforms, and secure microservices built for maximum speed and global scale.',
          buttonText: 'Explore Our Services',
          url: '/services',
          status: 'active'
        }
      },
      {
        filter: { sort: 3 },
        data: {
          title: 'Next-Gen UI/UX & Digital Product Design',
          subtitle: 'Crafting intuitive human-centered interfaces, conversion-driven user journeys, and cutting-edge design systems that elevate tech brands.',
          buttonText: 'See Featured Work',
          url: '/projects',
          status: 'active'
        }
      },
      {
        filter: { sort: 4 },
        data: {
          title: 'DevOps, Cyber Security & Growth Engineering',
          subtitle: 'Streamlining continuous delivery pipelines, enterprise-grade cloud security, and data-driven organic growth funnels to scale your revenue.',
          buttonText: 'Schedule IT Audit',
          url: '/contact',
          status: 'active'
        }
      }
    ];

    for (const item of updates) {
      const res = await Banner.updateOne(item.filter, { $set: item.data });
      console.log(`Updated banner sort=${item.filter.sort}: matched=${res.matchedCount}, modified=${res.modifiedCount}`);
    }

    const allBanners = await Banner.find({ status: 'active' }).sort({ sort: 1 }).lean();
    console.log('\n--- Updated Active Banners ---');
    allBanners.forEach(b => {
      console.log(`[Sort ${b.sort}] ${b.title}`);
      console.log(`       Subtitle: ${b.subtitle}`);
      console.log(`       CTA: ${b.buttonText} -> ${b.url}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error updating banners:', err);
    process.exit(1);
  }
}

updateBannerTexts();
