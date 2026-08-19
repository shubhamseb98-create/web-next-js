const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env' });

async function fixAdmin() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("No MONGO_URI in .env");
  console.log("Connecting to:", uri.replace(/:([^:@]+)@/, ':***@'));
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    // Check if the user exists
    const user = await db.collection('users').findOne({ email: 'admin@thewebtycoons.com' });
    console.log("User before:", user);
    
    if (user) {
      const result = await db.collection('users').updateOne(
        { email: 'admin@thewebtycoons.com' },
        { $set: { role: 'super_admin' } }
      );
      console.log('Modified count:', result.modifiedCount);
    } else {
      console.log("User admin@thewebtycoons.com not found!");
      // find any admin user
      const anyUser = await db.collection('users').findOne({});
      console.log("Any user found:", anyUser);
    }
  } finally {
    await client.close();
  }
}

fixAdmin().catch(console.error);
