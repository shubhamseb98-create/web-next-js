import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    shortDesc: { type: String, default: "" },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Static Website", "Dynamic Website", "E-Commerce", "Mobile App", "UI/UX Design", "Branding", "Other"],
      default: "Dynamic Website",
    },
    technologies: { type: [String], default: [] },
    image: { type: String, default: "" },
    images: { type: [String], default: [] },
    clientName: { type: String, default: "" },
    projectUrl: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "draft", "archived"], default: "active" },
    sort: { type: Number, default: 0 },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    themeColor: { type: String, default: "" },
    themeTextColor: { type: String, default: "" },
  },
  { timestamps: true }
);

PortfolioSchema.index({ slug: 1 });
PortfolioSchema.index({ isFeatured: 1, sort: 1 });
PortfolioSchema.index({ category: 1, status: 1 });

if (mongoose.models.Portfolio) {
  delete mongoose.models.Portfolio;
}
export default mongoose.model("Portfolio", PortfolioSchema);
