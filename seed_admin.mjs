import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const uri = "mongodb+srv://shubhamseb98_db_user:wH6ZFTFMeiGHwJw3@webcluster0.6yic9wg.mongodb.net/webtycoons_db?appName=webCluster0";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'admin' },
  isActive: { type: Boolean, default: true },
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB');
    
    const existingAdmin = await User.findOne({ email: 'admin@thewebtycoons.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Super Admin',
      email: 'admin@thewebtycoons.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });
    
    await admin.save();
    console.log('Successfully created admin user!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedAdmin();