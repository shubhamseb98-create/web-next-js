import mongoose from 'mongoose';

const uri = "mongodb+srv://shubhamseb98_db_user:wH6ZFTFMeiGHwJw3@webcluster0.6yic9wg.mongodb.net/webtycoons_db?appName=webCluster0";

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
}, { strict: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function upgradeAdmin() {
  try {
    await mongoose.connect(uri);
    const result = await User.updateOne(
      { email: 'admin@thewebtycoons.com' },
      { $set: { role: 'super_admin' } }
    );
    console.log('Update result:', result);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

upgradeAdmin();