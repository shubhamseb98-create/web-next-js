import mongoose from "mongoose";

const FounderSectionSchema = new mongoose.Schema(
  {
    eyebrow: {
      type: String,
      default: "FROM THE FOUNDER'S DESK",
    },
    heading_start: {
      type: String,
      default: "Architecting",
    },
    heading_highlight: {
      type: String,
      default: "Digital Dominance",
    },
    heading_end: {
      type: String,
      default: "& Engineering Real Value",
    },
    founder_name: {
      type: String,
      default: "Dheeraj Aggarwal",
    },
    founder_role: {
      type: String,
      default: "Founder & CEO",
    },
    quote_tag: {
      type: String,
      default: "OUR FOUNDATIONAL COMMITMENT",
    },
    quote_text: {
      type: String,
      default:
        "We didn't start WebTycoons to just build websites. We set out to give ambitious businesses complete code ownership, sub-second speed, and high-converting digital platforms engineered to dominate their industries.",
    },
    bio_text: {
      type: String,
      default:
        "MBA in Marketing from Symbiosis Pune with over 18 years of expertise in digital marketing, SEO, and enterprise growth operations. Regular keynote speaker across national business forums. Since establishing WebTycoons in 2011, he has personally steered over 350+ enterprise digital projects, pioneering bespoke tech solutions that eliminate software bloat and maximize measurable client ROI.",
    },
    primary_btn_text: {
      type: String,
      default: "Work With Our Team",
    },
    primary_btn_url: {
      type: String,
      default: "/contact",
    },
    linkedin_url: {
      type: String,
      default: "https://www.linkedin.com",
    },
    signature_text: {
      type: String,
      default: "Dheeraj Aggarwal",
    },
    signature_subtext: {
      type: String,
      default: "Founder & CEO, WebTycoons",
    },
    image: {
      type: String,
      default: "/assets/img/team/sitara-removebg-preview.png",
    },
    alt: {
      type: String,
      default: "Dheeraj Aggarwal - Founder & CEO",
    },
    badge_1_number: {
      type: String,
      default: "18+",
    },
    badge_1_label: {
      type: String,
      default: "Years Industry Mastery",
    },
    badge_2_tag: {
      type: String,
      default: "PROVEN TRACK RECORD",
    },
    badge_2_number: {
      type: String,
      default: "350+",
    },
    badge_2_label: {
      type: String,
      default: "Delivered Worldwide",
    },
    badge_3_text: {
      type: String,
      default: "100% Code Ownership",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.FounderSection) {
  delete mongoose.models.FounderSection;
}

export default mongoose.model("FounderSection", FounderSectionSchema, "foundersections");
