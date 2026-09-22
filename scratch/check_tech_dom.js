import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const match = envContent.match(/MONGO_URI=([^\r\n]+)/);
const MONGO_URI = match ? match[1].trim() : null;

async function checkTechStackRendered(url) {
  const res = await fetch(url, { headers: { 'Cache-Control': 'no-cache' } });
  const html = await res.text();
  // Check if either TechnologiesSection or TechStack rendered component is present in HTML
  const hasTechModule = html.includes('TechnologiesSection-module') || html.includes('TechStack-module');
  const hasHeading = html.includes('Modern') && html.includes('Tech Stack') && html.includes('marqueeTrack');
  return hasTechModule || hasHeading;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const homeExtraCol = db.collection('homeextras');

  console.log('=== TEST 1: show_technology = true ===');
  await homeExtraCol.updateOne({}, { $set: { show_technology: true } });
  
  const homeWithTech = await checkTechStackRendered('http://localhost:3000/');
  const serviceWithTech = await checkTechStackRendered('http://localhost:3000/services/website-designing');
  console.log(`Home Page renders Tech Stack: ${homeWithTech} (Expected: true)`);
  console.log(`Service Page renders Tech Stack: ${serviceWithTech} (Expected: true)`);

  console.log('\n=== TEST 2: show_technology = false ===');
  await homeExtraCol.updateOne({}, { $set: { show_technology: false } });
  
  const homeWithoutTech = await checkTechStackRendered('http://localhost:3000/');
  const serviceWithoutTech = await checkTechStackRendered('http://localhost:3000/services/website-designing');
  console.log(`Home Page renders Tech Stack: ${homeWithoutTech} (Expected: false)`);
  console.log(`Service Page renders Tech Stack: ${serviceWithoutTech} (Expected: false)`);

  console.log('\n=== RESTORING: show_technology = true ===');
  await homeExtraCol.updateOne({}, { $set: { show_technology: true } });
  const homeRestored = await checkTechStackRendered('http://localhost:3000/');
  const serviceRestored = await checkTechStackRendered('http://localhost:3000/services/website-designing');
  console.log(`Home Page restored Tech Stack: ${homeRestored} (Expected: true)`);
  console.log(`Service Page restored Tech Stack: ${serviceRestored} (Expected: true)`);

  await mongoose.disconnect();
}

run().catch(console.error);
