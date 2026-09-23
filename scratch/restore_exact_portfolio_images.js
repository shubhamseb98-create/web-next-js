const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: '.env' });

async function restoreOriginalImages() {
  await mongoose.connect(process.env.MONGO_URI);
  const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }));
  
  const originals = [
    { query: { title: /SaaS/i }, image: '/assets/img/service/featured-projects.png' },
    { query: { title: /Apex/i }, image: '/images/portfolio/apex-logistics-v2.jpg' },
    { query: { title: /Meridian/i }, image: '/images/portfolio/apex-logistics.jpg' },
    { query: { title: /Nexora/i }, image: '/images/portfolio/nexora-telemetry.jpg' }
  ];

  for (const item of originals) {
    const res = await Portfolio.updateOne(item.query, { $set: { image: item.image } });
    console.log('Restored image for', item.query, '->', item.image, 'modified:', res.modifiedCount);
  }

  const all = await Portfolio.find({ status: 'active', isFeatured: true }).lean();
  console.log('Current featured portfolios in DB:');
  all.forEach(p => console.log(p.title, '=>', p.image));

  process.exit(0);
}
restoreOriginalImages();
