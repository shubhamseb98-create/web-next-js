const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env' });

async function resetPass() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("No MONGO_URI in .env");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    
    const hashed = await bcrypt.hash('admin123', 10);
    const result = await db.collection('users').updateOne(
      { email: 'admin@thewebtycoons.com' },
      { $set: { password: hashed, role: 'super_admin' } }
    );
    console.log('Password reset for admin@thewebtycoons.com to admin123. Modified count:', result.modifiedCount);
  } finally {
    await client.close();
  }
}

resetPass().catch(console.error);
