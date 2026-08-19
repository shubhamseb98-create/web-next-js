const dotenv = require('dotenv');
const fs = require('fs');
if (fs.existsSync('.env.local')) dotenv.config({ path: '.env.local' });
else dotenv.config();

const mongoose = require('mongoose');
const Client = require('./src/app/models/Client').default;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => Client.deleteMany({}))
  .then(() => {
    console.log('Deleted dummy clients!');
    process.exit(0);
  })
  .catch(console.error);
