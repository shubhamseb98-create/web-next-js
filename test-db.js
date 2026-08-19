const mongoose = require('mongoose');
const uri = "mongodb+srv://shubhamseb98_db_user:wH6ZFTFMeiGHwJw3@webcluster0.6yic9wg.mongodb.net/webtycoons_db?appName=webCluster0";
async function testConnection() {
  try {
    console.log("Attempting to connect...");
    await mongoose.connect(uri);
    console.log("SUCCESS!");
    process.exit(0);
  } catch (err) {
    console.error("FAIL:", err.message);
    process.exit(1);
  }
}
testConnection();