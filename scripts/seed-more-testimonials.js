const mongoose = require('mongoose');
require('dotenv').config();

const moreTestimonials = [
  {
    name: "Sophie Langford",
    role: "Product Director, Sova Health UK",
    company: "Sova Health UK",
    quote: "We needed a digital presence that felt calm, trustworthy, and conversion-focused — and WebTycoons absolutely delivered. They translated our abstract vision into something clear and scalable.",
    content: "We needed a digital presence that felt calm, trustworthy, and conversion-focused — and WebTycoons absolutely delivered. They translated our abstract vision into something clear and scalable.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    isActive: true,
    sort: 5
  },
  {
    name: "Eunji Kwon",
    role: "Founder, LUMN Music Seoul",
    company: "LUMN Music",
    quote: "WebTycoons helped me build a global brand that sounds and looks iconic. They listened carefully and turned my ideas into something minimalist, ultra-fast, and full of character.",
    content: "WebTycoons helped me build a global brand that sounds and looks iconic. They listened carefully and turned my ideas into something minimalist, ultra-fast, and full of character.",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 5,
    isActive: true,
    sort: 6
  },
  {
    name: "Daniel Reyes",
    role: "Head of Growth, Vorte Project USA",
    company: "Vorte Project USA",
    quote: "They didn't just design a website — they helped us shape the entire product narrative and lead funnel. Smart architecture, sub-second load times, and conversions doubled within 60 days.",
    content: "They didn't just design a website — they helped us shape the entire product narrative and lead funnel. Smart architecture, sub-second load times, and conversions doubled within 60 days.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    isActive: true,
    sort: 7
  },
  {
    name: "Matteo Bianchi",
    role: "Managing Director, Lunara Global Milan",
    company: "Lunara Global",
    quote: "Working with WebTycoons was a relief. The communication was transparent, the engineering quality was world-class, and our client inquiries nearly tripled after launch.",
    content: "Working with WebTycoons was a relief. The communication was transparent, the engineering quality was world-class, and our client inquiries nearly tripled after launch.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    isActive: true,
    sort: 8
  }
];

async function seedTestimonials() {
  await mongoose.connect(process.env.MONGO_URI);
  const col = mongoose.connection.collection('testimonials');

  for (const t of moreTestimonials) {
    const exists = await col.findOne({ name: t.name });
    if (!exists) {
      await col.insertOne(t);
      console.log('Inserted testimonial for:', t.name);
    }
  }

  const count = await col.countDocuments({ isActive: true });
  console.log('Total active testimonials now:', count);
  process.exit(0);
}

seedTestimonials().catch(e => {
  console.error(e);
  process.exit(1);
});
