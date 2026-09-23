const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const liveAchievements = [
  {
    value: 2400,
    suffix: '+',
    label: 'Clients\nServed',
    image: '/assets/img/whychoose/choose1.webp',
    sort: 1,
    status: 'active'
  },
  {
    value: 2000,
    suffix: '+',
    label: 'Websites\nDelivered',
    image: '/assets/img/whychoose/choose2.webp',
    sort: 2,
    status: 'active'
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years of\nExcellence',
    image: '/assets/img/whychoose/choose3.webp',
    sort: 3,
    status: 'active'
  },
  {
    value: 70,
    suffix: '+',
    label: 'Cities across\n10+ Countries',
    image: '/assets/img/whychoose/choose4.webp',
    sort: 4,
    status: 'active'
  }
];

async function update() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("No MONGO_URI in .env");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const db = mongoose.connection.db;

  // 1. Update achievements collection
  const achCol = db.collection('achievements');
  await achCol.deleteMany({});
  const now = new Date();
  const docs = liveAchievements.map(a => ({
    ...a,
    createdAt: now,
    updatedAt: now
  }));
  await achCol.insertMany(docs);
  console.log(`Updated achievements with ${docs.length} live items.`);

  // 2. Update homeextras collection
  const homeCol = db.collection('homeextras');
  const homeRes = await homeCol.updateOne(
    {},
    {
      $set: {
        achievement_subtitle: 'Why Choose Us',
        achievement_title: 'Numbers That Matter',
        achievement_description: "Before creating a website we think by putting ourselves in customer’s shoes. Over 15 years of excellence delivering 2,000+ websites, managing 2,800+ domains, and serving 2,400+ clients across 70+ cities and 10+ countries.",
        updatedAt: now
      }
    }
  );
  console.log('Updated homeextra achievement headers:', homeRes.modifiedCount);

  process.exit(0);
}

update().catch(err => {
  console.error("Error updating achievements:", err);
  process.exit(1);
});
