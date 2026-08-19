import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

const ContactPageSchema = new mongoose.Schema({
    // Page Header
    headerTitle: { type: String, default: "Contact Us" },
    headerImage: { type: String, default: "" },
    headerDescription: { type: String, default: "Looking for reliable metal solutions? Our experts are ready to assist you." },
    breadcrumb: { type: String, default: "Contact Us" },

    // Contact Section
    contactSubTitle: { type: String, default: "Get In Touch" },
    contactTitle: { type: String, default: "Contact Us" },
    contactDescription: { type: String, default: "Looking for reliable metal solutions? Our experts are ready to assist you." },
    mapIframeUrl: { type: String, default: "" },

    // Office Info
    officeAddress: { type: String, default: "123, Digital Hub, Sector 18, Noida, Uttar Pradesh — 201301" },
    officePhone: { type: String, default: "+91 8527458950" },
    officeEmail: { type: String, default: "info@thewebtycoons.com" },
    workingHours: { type: String, default: "Mon – Sat: 9:00 AM – 7:00 PM\nSun: Closed" },

    // Locations Array
    locations: { type: [LocationSchema], default: [] },

    // SEO fields
    metatag: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metakeywords: { type: [String], default: [] },
    canonicalUrl: { type: String, default: "" },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    twitterCard: { type: String, default: "summary_large_image" },
    robots: { type: String, default: "index, follow" },
    schemaMarkup: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

if (mongoose.models.ContactPage) {
  delete mongoose.models.ContactPage;
}
export default mongoose.model("ContactPage", ContactPageSchema);
