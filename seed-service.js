import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import mongoose from 'mongoose';
import { connectDB } from './src/app/lib/config.js';
import Service from './src/app/models/Service.js';
import { servicesData } from './src/data/servicesData.js';

async function seed() {
  try {
    await connectDB();
    const staticData = servicesData.static;
    
    // Convert features array properly
    const mappedFeatures = staticData.features.map(f => ({ title: f.title, desc: f.desc, icon: f.icon.name }));
    
    // Map benefits to the correct format
    const mappedBenefits = staticData.overview.benefits.map(b => ({title: b, desc: ''}));
    
    // Map why choose us
    const whyChooseUsData = [
      { title: 'Lightning Fast', desc: 'Pre-rendered pages for near-instant load times.', icon: 'bolt' },
      { title: 'Ultra Secure', desc: 'No database queries means no injection vulnerabilities.', icon: 'shield' },
      { title: 'SEO Optimized', desc: 'Clean HTML structure for perfect search engine indexing.', icon: 'search' }
    ];

    const service = {
      title: staticData.hero.title,
      slug: 'static-website-development',
      shortDesc: staticData.hero.description,
      description: staticData.overview.whyChooseUs,
      overviewWhatIsIt: staticData.overview.whatIsIt,
      overviewWhoNeedsIt: staticData.overview.whoNeedsIt,
      overviewWhyChooseUs: staticData.overview.whyChooseUs,
      image: staticData.hero.image,
      features: mappedFeatures,
      benefits: mappedBenefits,
      whyChooseUs: whyChooseUsData,
      isFeatured: true,
      status: 'active'
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'static-website-development' }, 
      service, 
      { upsert: true, new: true }
    );
    
    console.log('Successfully seeded static website development service!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding:', error);
    process.exit(1);
  }
}

seed();
