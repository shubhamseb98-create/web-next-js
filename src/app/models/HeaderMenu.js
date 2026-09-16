import mongoose from "mongoose";

const SubItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  openInNewTab: { type: Boolean, default: false },
}, { _id: true });

const HeaderMenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  hasDropdown: { type: Boolean, default: false },
  openInNewTab: { type: Boolean, default: false },
  isSpecialCta: { type: Boolean, default: false },
  ctaAction: { type: String, enum: ['link', 'modal'], default: 'link' },
  subItems: [SubItemSchema],
}, { timestamps: true });

const HeaderConfigSchema = new mongoose.Schema({
  ctaButtonText: { type: String, default: "Let's Talk" },
  ctaButtonAction: { type: String, enum: ['modal', 'link'], default: 'modal' },
  ctaButtonLink: { type: String, default: "/contact" },
  showCtaButton: { type: Boolean, default: true },
  logoAlt: { type: String, default: "WebTycoons Logo" },
}, { timestamps: true });

if (mongoose.models['HeaderMenuItem']) {
  delete mongoose.models['HeaderMenuItem'];
}
if (mongoose.models['HeaderConfig']) {
  delete mongoose.models['HeaderConfig'];
}

export const HeaderMenuItem = mongoose.model("HeaderMenuItem", HeaderMenuItemSchema);
export const HeaderConfig = mongoose.model("HeaderConfig", HeaderConfigSchema);

export default HeaderMenuItem;
