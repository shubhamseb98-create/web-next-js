const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
  require('dotenv').config({ path: '.env' });
}
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

async function run() {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
  const collection = mongoose.connection.collection('blogs');

  // Update Zero-Trust Security image
  await collection.updateOne(
    { title: /Zero-Trust Security/i },
    {
      $set: {
        coverImage: '/images/blogs/zero-trust-security.jpg',
        image: '/images/blogs/zero-trust-security.jpg',
        updatedAt: new Date()
      }
    }
  );
  console.log('Updated Zero-Trust Security cover image');

  // Update Design Systems image
  await collection.updateOne(
    { title: /Design Systems & UI\/UX/i },
    {
      $set: {
        coverImage: '/images/blogs/design-systems-ui-ux.jpg',
        image: '/images/blogs/design-systems-ui-ux.jpg',
        updatedAt: new Date()
      }
    }
  );
  console.log('Updated Design Systems & UI/UX cover image');

  const updatedBlogs = await collection.find({}).toArray();
  console.log('Current blogs in DB:');
  updatedBlogs.forEach(b => console.log(`- [${b.category}] ${b.title} -> ${b.coverImage}`));

  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
