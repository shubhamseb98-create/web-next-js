import mongoose from "mongoose";

const ProjectFaqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    sort: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

if (mongoose.models.ProjectFaq) {
  delete mongoose.models.ProjectFaq;
}

export default mongoose.model("ProjectFaq", ProjectFaqSchema);
