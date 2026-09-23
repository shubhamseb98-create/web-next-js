const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config({ path: '.env' });

async function restore() {
  await mongoose.connect(process.env.MONGO_URI);
  const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', new mongoose.Schema({}, { strict: false }));
  await Portfolio.updateOne({ title: /SaaS/i }, { $set: { image: '/assets/img/service/featured-projects.png' } });
  console.log('Restored SaaS Launchpad image in DB');
  process.exit(0);
}
restore();
