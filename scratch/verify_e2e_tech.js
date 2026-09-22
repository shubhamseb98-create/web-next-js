import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const match = envContent.match(/MONGO_URI=([^\r\n]+)/);
const MONGO_URI = match ? match[1].trim() : null;

async function checkUrl(url, label) {
  const res = await fetch(url);
  const text = await res.text();
  const hasTechStack = text.includes('Tech Stack') || text.includes('Modern') && text.includes('technologies');
  console.log(`[${label}] (${url}): contains Tech Stack? -> ${hasTechStack}`);
  return hasTechStack;
}

async function run() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const homeExtraCol = db.collection('homeextras');

  console.log('\n--- PHASE 1: When show_technology = true ---');
  await homeExtraCol.updateOne({}, { $set: { show_technology: true } });
  await checkUrl('http://localhost:3000/', 'Home Page');
  await checkUrl('http://localhost:3000/services/website-designing', 'Service Page (website-designing)');
  await checkUrl('http://localhost:3000/services/static-website-development', 'Service Page (static-website-dev)');

  console.log('\n--- PHASE 2: When show_technology = false ---');
  await homeExtraCol.updateOne({}, { $set: { show_technology: false } });
  await checkUrl('http://localhost:3000/', 'Home Page');
  await checkUrl('http://localhost:3000/services/website-designing', 'Service Page (website-designing)');
  await checkUrl('http://localhost:3000/services/static-website-development', 'Service Page (static-website-dev)');

  console.log('\n--- PHASE 3: Resetting show_technology = true ---');
  await homeExtraCol.updateOne({}, { $set: { show_technology: true } });
  await checkUrl('http://localhost:3000/', 'Home Page');
  await checkUrl('http://localhost:3000/services/website-designing', 'Service Page (website-designing)');

  await mongoose.disconnect();
  console.log('\nE2E Verification completed!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
