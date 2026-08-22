import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    overviewWhatIsIt: { type: String, default: "" },
    overviewWhoNeedsIt: { type: String, default: "" },
    overviewWhyChooseUs: { type: String, default: "" },
    icon: { type: String, default: "" },
    image: { type: String, default: "" },
    breadcrumbImage: { type: String, default: "" },
    overviewImage: { type: String, default: "" },
    bgColor: { type: String, default: "" },
    hoverTextColor: { type: String, default: "" },
    imageStyle: { type: String, enum: ["small", "full"], default: "small" },
    features: { 
      type: [{ title: String, desc: String, icon: String, image: String }], 
      default: [] 
    },
    benefits: {
      type: [{ title: String, desc: String }],
      default: [],
    },
    faq: {
      type: [{ question: String, answer: String }],
      default: [],
    },
    portfolio: {
      type: [{ name: String, category: String, tech: String, desc: String, image: String, link: String }],
      default: [],
    },
    process: {
      type: [{ step: String, title: String, desc: String }],
      default: [],
    },
    whyChooseUs: {
      type: [{ title: String, desc: String, icon: String }],
      default: [],
    },
    techStack: {
      type: [{ name: String, sub: String, icon: String, color: String, category: { type: String, enum: ['Frontend', 'Backend'], default: 'Frontend' } }],
      default: [],
    },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    realEstateData: { type: mongoose.Schema.Types.Mixed, default: {} },
    customData: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

ServiceSchema.index({ slug: 1 });
ServiceSchema.index({ status: 1, sort: 1 });

if (mongoose.models.Service) {
  delete mongoose.models.Service;
}
export default mongoose.model("Service", ServiceSchema);
