import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const matchMongo = envContent.match(/MONGO_URI=([^\r\n]+)/);
const MONGO_URI = matchMongo ? matchMongo[1].trim() : null;

async function checkServices() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const services = await db.collection('services').find({}).toArray();
  
  console.log(`Total services in DB: ${services.length}`);
  for (const s of services) {
    console.log(`\n========================================`);
    console.log(`Service: ${s.title} (slug: ${s.slug})`);
    console.log(`Status: ${s.status} | ShortDesc: ${s.shortDesc?.slice(0, 60)}...`);
    console.log(`Hero Banner Img: ${s.breadcrumbImage}`);
    console.log(`Overview Img: ${s.overviewImage}`);
    console.log(`Overview WhatIsIt: ${s.overviewWhatIsIt ? 'Yes (' + s.overviewWhatIsIt.slice(0, 40) + '...)' : 'No'}`);
    console.log(`Benefits count: ${s.benefits?.length}`);
    console.log(`Features count: ${s.features?.length}`);
    console.log(`Process steps count: ${s.process?.length}`);
    console.log(`WhyChooseUs count: ${s.whyChooseUs?.length}`);
    console.log(`FAQs count: ${s.faq?.length}`);
    console.log(`Portfolio items count: ${s.portfolio?.length}`);
    console.log('Portfolio items:', s.portfolio?.map(p => ({ name: p.name, img: p.image?.slice(0, 45) + '...' })));
  }

  await mongoose.disconnect();
}

checkServices().catch(console.error);
