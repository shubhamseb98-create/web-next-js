const mongoose = require('mongoose');
require('dotenv').config();

async function cleanAchievements() {
  await mongoose.connect(process.env.MONGO_URI);
  const col = mongoose.connection.collection('achievements');
  const docs = await col.find({}).toArray();
  for (const doc of docs) {
    const cleaned = (doc.label || '').replace(/\\+/g, '\n').trim();
    await col.updateOne({ _id: doc._id }, { $set: { label: cleaned } });
  }
  console.log('Cleaned achievements labels in DB');
  process.exit(0);
}
cleanAchievements().catch(e => { console.error(e); process.exit(1); });
