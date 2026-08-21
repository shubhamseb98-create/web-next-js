import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const uri = process.env.MONGO_URI;
console.log('Connecting to', uri);

async function run() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const config = await db.collection('globalsettings').findOne();
  console.log('adminTitle in DB:', config?.adminTitle);
  process.exit(0);
}
run();
