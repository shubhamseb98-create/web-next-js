const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
if (!process.env.MONGO_URI && !process.env.MONGODB_URI) {
  require('dotenv').config({ path: '.env' });
}
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

const teamData = [
  {
    name: 'Om',
    role: 'Web Developer',
    designation: 'Web Developer',
    department: 'Web Engineering',
    bio: 'Frontend and backend engineering specialist proficient in React, Next.js, responsive layouts, and modern web application development.',
    image: '/assets/img/team/om-removebg-preview.png',
    img: '/assets/img/team/om-removebg-preview.png',
    color: '#b0e7f5ff',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 1
  },
  {
    name: 'Nisha',
    role: 'Business Manager',
    designation: 'Business Manager',
    department: 'Client Relations & Business Development',
    bio: 'Driving strategic business partnerships, client onboarding, and corporate solution delivery across domestic and global markets.',
    image: '/assets/img/team/nisha-removebg-preview.png',
    img: '/assets/img/team/nisha-removebg-preview.png',
    color: '#f9d6ea',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 2
  },
  {
    name: 'Tarandeep',
    role: 'Head of Marcomm & Content',
    designation: 'Head of Marcomm & Content',
    department: 'Brand & Communications',
    bio: 'Leading brand communication, technical storytelling, and omni-channel PR strategies for high-growth tech ventures.',
    image: '/assets/img/team/tara-removebg-preview.png',
    img: '/assets/img/team/tara-removebg-preview.png',
    color: '#d9f5a0',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 3
  },
  {
    name: 'Kriti',
    role: 'Admin Manager',
    designation: 'Admin Manager',
    department: 'Operations & Administration',
    bio: 'Overseeing smooth agency operations, talent management, project workflows, and administrative coordination.',
    image: '/assets/img/team/kriti-removebg-preview.png',
    img: '/assets/img/team/kriti-removebg-preview.png',
    color: '#ffe0b0',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 4
  },
  {
    name: 'Dheeraj Aggarwal',
    role: 'Founder & CEO',
    designation: 'Founder & CEO',
    department: 'Leadership & Marketing',
    bio: 'MBA in Marketing from Symbiosis Pune with over 18 years of expertise in digital marketing, SEO, and enterprise growth operations. Regular keynote speaker across national business forums.',
    image: '/assets/img/team/sitara-removebg-preview.png',
    img: '/assets/img/team/sitara-removebg-preview.png',
    color: '#c8d8fc',
    linkedin: 'https://www.linkedin.com/company/web-tycoons',
    twitter: '#',
    instagram: 'https://www.instagram.com/web.tycoons/',
    status: 'active',
    sort: 5
  },
  {
    name: 'Dheeraj Joshi',
    role: 'SEO & Digital Marketing',
    designation: 'SEO & Digital Marketing',
    department: 'Digital Marketing & Growth',
    bio: 'SEO strategist and digital marketing specialist driving organic ranking, conversion optimization, and ROI-driven marketing campaigns.',
    image: '/assets/img/team/cutiiii-removebg-preview.png',
    img: '/assets/img/team/cutiiii-removebg-preview.png',
    color: '#fce8ac',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 6
  },
  {
    name: 'Anuj',
    role: 'UI/UX Designer',
    designation: 'UI/UX Designer',
    department: 'Product Design',
    bio: 'Design system specialist focused on user research, responsive prototyping, interactive Figma design systems, and seamless user experiences.',
    image: '/assets/img/team/Anuj-cutiiii-removebg-preview.png',
    img: '/assets/img/team/Anuj-cutiiii-removebg-preview.png',
    color: '#c8f5b0',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 7
  },
  {
    name: 'Muskan',
    role: 'UI/UX Designer',
    designation: 'UI/UX Designer',
    department: 'UI/UX & Creative Design',
    bio: 'Creative UI/UX designer crafting intuitive interface layouts, high-converting design systems, and visually captivating brand assets.',
    image: '/assets/img/team/Muku.png',
    img: '/assets/img/team/Muku.png',
    color: '#ffb9d6ff',
    linkedin: '#',
    twitter: '#',
    instagram: '#',
    status: 'active',
    sort: 8
  }
];

async function run() {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB');
  const collection = mongoose.connection.collection('teammembers');
  
  await collection.deleteMany({});
  console.log('Cleared existing teammembers');
  
  const now = new Date();
  const docs = teamData.map(item => ({
    ...item,
    createdAt: now,
    updatedAt: now
  }));
  
  const result = await collection.insertMany(docs);
  console.log(`Successfully inserted ${result.insertedCount} team members into MongoDB!`);
  
  const verify = await collection.find({}).sort({ sort: 1 }).toArray();
  console.log('Current DB Team Members:');
  verify.forEach(m => console.log(`- [${m.sort}] ${m.name} (${m.role}) -> ${m.image} / ${m.color}`));
  
  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
