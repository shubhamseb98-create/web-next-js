import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const match = envContent.match(/MONGO_URI=([^\r\n]+)/);
const MONGO_URI = match ? match[1].trim() : null;

async function testSync() {
  console.log('Connecting with URI:', MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  const db = mongoose.connection.db;
  const homeExtraCol = db.collection('homeextras');
  const techCol = db.collection('technologies');

  // 1. Check current homeExtra show_technology
  let homeExtra = await homeExtraCol.findOne({});
  console.log('Current homeExtra show_technology:', homeExtra?.show_technology);

  // 2. Count active technologies
  const activeTechCount = await techCol.countDocuments({ status: 'active' });
  const totalTechCount = await techCol.countDocuments({});
  console.log(`Technologies: total = ${totalTechCount}, active = ${activeTechCount}`);

  // 3. Test toggling show_technology to false
  await homeExtraCol.updateOne({}, { $set: { show_technology: false } });
  homeExtra = await homeExtraCol.findOne({});
  console.log('After setting false, show_technology:', homeExtra?.show_technology);

  // 4. Test toggling back to true
  await homeExtraCol.updateOne({}, { $set: { show_technology: true } });
  homeExtra = await homeExtraCol.findOne({});
  console.log('After resetting true, show_technology:', homeExtra?.show_technology);

  await mongoose.disconnect();
  console.log('Test completed successfully!');
}

testSync().catch(err => {
  console.error('Error in test:', err);
  process.exit(1);
});
