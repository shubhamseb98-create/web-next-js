require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const HomeAbout = mongoose.connection.collection('homeabouts');
  const data = await HomeAbout.findOne();
  
  if (data && data.title && !data.title.includes('*') && !data.title.includes('[')) {
    await HomeAbout.updateOne(
      { _id: data._id }, 
      { $set: { title: '[Transforming Ideas] Into Digital Reality' } }
    );
    console.log('Successfully updated the title in DB to include brackets!');
  } else {
    console.log('No update needed or document not found.');
  }
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
