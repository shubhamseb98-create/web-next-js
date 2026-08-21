import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
dotenv.config({ path: './.env' });

const uri = process.env.MONGO_URI;
console.log('Connecting to', uri);

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const config = await db.collection('aboutpageconfigs').findOne();
  console.log('Hero image in DB:', config?.heroImage);
  process.exit(0);
}
run();
