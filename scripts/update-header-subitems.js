const mongoose = require('mongoose');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const col = mongoose.connection.collection('headermenuitems');

  const allSubItems = [
    { label: 'Website Designing', path: '/services/website-designing', order: 1, isActive: true, openInNewTab: false },
    { label: 'Static Website Development', path: '/services/static-website-development', order: 2, isActive: true, openInNewTab: false },
    { label: 'Dynamic Website Development', path: '/services/dynamic-website-development', order: 3, isActive: true, openInNewTab: false },
    { label: 'E-Commerce Website Development', path: '/services/e-commerce-website-development', order: 4, isActive: true, openInNewTab: false },
    { label: 'Logo Designing', path: '/services/logo-designing', order: 5, isActive: true, openInNewTab: false },
    { label: 'Domain & Hosting', path: '/services/domain', order: 6, isActive: true, openInNewTab: false },
    { label: 'Digital Marketing Solution', path: '/services/digital-marketing-solution', order: 7, isActive: true, openInNewTab: false },
    { label: 'Email Solution', path: '/services/email-solution', order: 8, isActive: true, openInNewTab: false },
    { label: 'Real Estate Advisory', path: '/services/real-estate-advisory', order: 9, isActive: true, openInNewTab: false },
  ];

  const res = await col.updateOne(
    { name: 'Services' },
    { 
      $set: { 
        path: '/services/website-designing',
        hasDropdown: true,
        subItems: allSubItems 
      } 
    }
  );
  console.log('Updated Services in headermenuitems:', res.matchedCount, res.modifiedCount);
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
