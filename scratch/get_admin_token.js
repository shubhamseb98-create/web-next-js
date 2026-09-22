import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve('.env'), 'utf-8');
const matchMongo = envContent.match(/MONGO_URI=([^\r\n]+)/);
const matchJwt = envContent.match(/JWT_SECRET="?([^"\r\n]+)"?/);

const MONGO_URI = matchMongo ? matchMongo[1].trim() : null;
const JWT_SECRET = matchJwt ? matchJwt[1].trim() : null;

async function checkAdmin() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const user = await db.collection('users').findOne({});
  console.log('Admin user found:', user ? { email: user.email, role: user.role } : 'No users found');

  if (user) {
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('Generated token for testing:');
    console.log(token);
  }

  await mongoose.disconnect();
}

checkAdmin().catch(console.error);
