import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    company: { type: String, default: "" },
    avatar: { type: String, default: "" },
    content: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    isActive: { type: Boolean, default: true },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TestimonialSchema.index({ isActive: 1, sort: 1 });

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
