const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const liveTestimonials = [
  {
    name: "Mr. Vishesh Jindal",
    designation: "CEO",
    company: "Supply Wheels (www.supplywheels.com)",
    avatar: "/assets/img/testimonials/vishesh-jindal.jpg",
    content: "It feels great to work with Team Web Tycoons. I got a lot of appreciation for unique and wonderful UI for my website.",
    rating: 5,
    isActive: true,
    sort: 1
  },
  {
    name: "Mr. Rajeev Tyagi",
    designation: "Owner",
    company: "RS Timber (www.rstimber.com)",
    avatar: "/assets/img/testimonials/rajeev-tyagi.png",
    content: "Their SEO services are just wonderful. First I got a website and followed by that got huge enquiries. Our site is almost on No. 1 Position of Google's first page with almost 20 keywords.",
    rating: 5,
    isActive: true,
    sort: 2
  },
  {
    name: "Mr. Prateek Bhardwaj",
    designation: "Director",
    company: "CSB Skills (www.csbskills.com)",
    avatar: "/assets/img/testimonials/prateek-bhardwaj.jpg",
    content: "Team Web Tycoons is quite professional in what they are doing. They know what clients want and how to do that.",
    rating: 5,
    isActive: true,
    sort: 3
  },
  {
    name: "Mr. Ashok Aggarwal",
    designation: "Director",
    company: "Austro Labs (www.austrolabs.com)",
    avatar: "/assets/img/testimonials/ashok-aggarwal.jpg",
    content: "Pleasure to give testimonial to Dheeraj and Web Tycoons. They are best at what they do. Choose them if you want to be on top of Google.",
    rating: 5,
    isActive: true,
    sort: 4
  },
  {
    name: "Mr. Parmod Mittal",
    designation: "Director",
    company: "Shriram GPS (www.shriramgps.com)",
    avatar: "/assets/img/testimonials/parmod-mittal.jpg",
    content: "More than 15 websites and 7 SEO projects in past 6 years and still continuing. 100% satisfied and will recommend to people.",
    rating: 5,
    isActive: true,
    sort: 5
  },
  {
    name: "Mr. Nitin Goel",
    designation: "Director",
    company: "Coco Foam (www.cocofoam.in)",
    avatar: "/assets/img/testimonials/nitin-goel.jpg",
    content: "We had an old site and were looking for a makeover. Team Web Tycoons did a wonderful job with a nice revamp from a Dynamic site to an Ecommerce website. I am very happy.",
    rating: 5,
    isActive: true,
    sort: 6
  }
];

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing in .env");
  
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
  
  const db = mongoose.connection.db;
  const collection = db.collection('testimonials');
  
  // Clear existing dummy testimonials
  const delResult = await collection.deleteMany({});
  console.log(`Deleted ${delResult.deletedCount} existing testimonials`);
  
  // Insert all 6 live testimonials with timestamps
  const now = new Date();
  const docsToInsert = liveTestimonials.map(t => ({
    ...t,
    createdAt: now,
    updatedAt: now
  }));
  
  const insertResult = await collection.insertMany(docsToInsert);
  console.log(`Successfully inserted ${insertResult.insertedCount} live testimonials!`);
  
  const all = await collection.find({}).toArray();
  console.log("\nCurrent Testimonials in DB:");
  all.forEach((doc, idx) => {
    console.log(`${idx + 1}. ${doc.name} (${doc.designation} - ${doc.company})`);
  });
  
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding testimonials:", err);
  process.exit(1);
});
