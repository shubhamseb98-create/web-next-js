import mongoose from "mongoose";

const AboutPageConfigSchema = new mongoose.Schema({
  // Hero Section
  heroTitle: { type: String, default: "We Are the King Makers of the Digital World" },
  heroDescription: { type: String, default: "A passionate team of designers, developers, and digital strategists on a mission to build extraordinary web experiences." },

  // About Us Section
  aboutUsTitle: { type: String, default: "Your Trusted Partner in Digital Transformation" },
  aboutUsParagraph1: { type: String, default: "Founded in 2011, WebTycoons is a full-service digital agency based in Delhi NCR, India." },
  aboutUsParagraph2: { type: String, default: "Over the past 15 years, we have delivered 350+ projects for startups, SMEs, and enterprises across industries." },
  aboutUsImage1: { type: String, default: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop" },
  aboutUsImage2: { type: String, default: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop" },
  aboutUsYears: { type: String, default: "15" },
  aboutUsHighlights: {
    type: [{
      icon: String, // 'award', 'handshake', 'users' etc
      title: String,
      description: String
    }],
    default: [
      { icon: 'award', title: 'Award-Winning Work', description: 'Recognized as a top digital agency in Delhi NCR for design excellence.' },
      { icon: 'handshake', title: 'Client-Centric Approach', description: 'We treat your business as our own, ensuring success at every step.' },
      { icon: 'users', title: 'Expert Team of 25+', description: 'Specialists in design, development, SEO, cloud, and digital strategy.' }
    ]
  },

  // Mission / Vision
  missionText: { type: String, default: "To empower businesses of all sizes with cutting-edge, high-performance digital products — delivered with transparency, passion, and precision." },
  visionText: { type: String, default: "To be the most trusted web development partner for growth-focused businesses globally, recognized for excellence in craft and client success." },

  // Stats
  stats: {
    type: [{ value: String, label: String }],
    default: [
      { value: '15+', label: 'Years of Excellence' },
      { value: '350+', label: 'Projects Delivered' },
      { value: '120+', label: 'Happy Clients' },
      { value: '25+', label: 'Expert Team Members' }
    ]
  },

  // Our Story (Milestones)
  milestones: {
    type: [{ year: String, title: String, description: String }],
    default: [
      { year: '2011', title: 'Founded', description: 'WebTycoons was born with a vision to help businesses win online.' },
      { year: '2014', title: '50 Clients', description: 'Hit our first milestone of 50 happy clients across industries.' },
      { year: '2017', title: 'Team of 10', description: 'Grew into a specialized team of designers, developers, and strategists.' },
      { year: '2020', title: 'E-Commerce Boom', description: 'Launched 80+ online stores, helping businesses go digital during COVID.' },
      { year: '2023', title: '200+ Projects', description: 'Crossed 200 delivered projects and expanded into AI-integrated web apps.' },
      { year: '2026', title: '15 Years of Excellence', description: 'Celebrating 15 years as one of the top web agencies in Delhi NCR.' }
    ]
  },

  // Values
  values: {
    type: [{ icon: String, title: String, description: String }],
    default: [
      { icon: 'bullseye', title: 'Client-First', description: 'Every decision is driven by what creates maximum value for our clients.' },
      { icon: 'lightbulb', title: 'Innovation', description: 'We stay ahead of the curve, building with the latest and best technologies.' },
      { icon: 'shield', title: 'Integrity', description: 'Honest timelines, transparent pricing, and clean code — always.' },
      { icon: 'heart', title: 'Passion', description: 'We genuinely love building great digital products. That passion shows.' }
    ]
  },

  // CTA
  ctaTitle: { type: String, default: "Ready to Build Something Extraordinary?" },
  ctaDescription: { type: String, default: "Let's discuss your project and turn your vision into a world-class digital product." }
}, {
  timestamps: true,
});

export default mongoose.models.AboutPageConfig || mongoose.model("AboutPageConfig", AboutPageConfigSchema, "aboutpageconfigs");
