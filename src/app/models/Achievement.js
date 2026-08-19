import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    value: { type: Number, required: true, default: 0 },
    suffix: { type: String, default: "" },
    label: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

AchievementSchema.index({ status: 1, sort: 1 });

export default mongoose.models.Achievement || mongoose.model("Achievement", AchievementSchema);
