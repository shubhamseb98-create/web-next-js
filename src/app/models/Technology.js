import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    sub: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    color: { type: String, default: "#FFFFFF" },
    category: { type: String, enum: ["frontend", "backend"], default: "frontend" },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TechnologySchema.index({ status: 1, category: 1, sort: 1 });

export default mongoose.models.Technology || mongoose.model("Technology", TechnologySchema);
