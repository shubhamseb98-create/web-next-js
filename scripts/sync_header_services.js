const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');

async function sync() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB.');

  const Service = mongoose.connection.collection('services');
  const HeaderMenuItem = mongoose.connection.collection('headermenuitems');

  // 1. Mark older redundant slugs as inactive
  const redundantSlugs = [
    'static-website-development',
    'dynamic-website-development',
    'e-commerce-website-development',
    'digital-marketing-solution'
  ];
  await Service.updateMany(
    { slug: { $in: redundantSlugs } },
    { $set: { status: 'inactive' } }
  );
  await Service.updateOne({ slug: 'real-estate-advisory' }, { $set: { sort: 14 } });
  console.log('Marked redundant duplicate services as inactive and set real-estate-advisory sort to 14.');

  // 2. Define the exact 13 services from the old website
  const servicesList = [
    { label: 'Website Designing', path: '/services/website-designing', order: 1, isActive: true, openInNewTab: false },
    { label: 'Website Development', path: '/services/web-development', order: 2, isActive: true, openInNewTab: false },
    { label: 'Software Development', path: '/services/software-development', order: 3, isActive: true, openInNewTab: false },
    { label: 'Digital Marketing', path: '/services/digital-marketing', order: 4, isActive: true, openInNewTab: false },
    { label: 'Search Engine Optimization', path: '/services/search-engine-optimization', order: 5, isActive: true, openInNewTab: false },
    { label: 'Ecommerce Solution', path: '/services/ecommerce-solution', order: 6, isActive: true, openInNewTab: false },
    { label: 'Logo Designing', path: '/services/logo-designing', order: 7, isActive: true, openInNewTab: false },
    { label: 'Brochure Designing', path: '/services/brochure-designing', order: 8, isActive: true, openInNewTab: false },
    { label: 'Company Profile', path: '/services/company-profile', order: 9, isActive: true, openInNewTab: false },
    { label: 'WhatsApp Promotional Images', path: '/services/whatsapp-promotional-images', order: 10, isActive: true, openInNewTab: false },
    { label: 'Domain', path: '/services/domain', order: 11, isActive: true, openInNewTab: false },
    { label: 'Hosting Solution', path: '/services/hosting-solution', order: 12, isActive: true, openInNewTab: false },
    { label: 'Email Solution', path: '/services/email-solution', order: 13, isActive: true, openInNewTab: false },
  ];

  // 3. Update the Services tab in HeaderMenuItem collection
  const res = await HeaderMenuItem.updateOne(
    { name: 'Services' },
    {
      $set: {
        hasDropdown: true,
        path: '/services/website-designing',
        subItems: servicesList
      }
    }
  );
  console.log('Updated Services HeaderMenuItem in DB:', res.modifiedCount);

  // 4. Verify updated menu
  const updatedItem = await HeaderMenuItem.findOne({ name: 'Services' });
  console.log(`Services dropdown now has ${updatedItem.subItems.length} subItems:`);
  updatedItem.subItems.forEach(s => console.log(`  ${s.order}. ${s.label} (${s.path})`));

  process.exit(0);
}

sync().catch(err => {
  console.error('Error syncing:', err);
  process.exit(1);
});
