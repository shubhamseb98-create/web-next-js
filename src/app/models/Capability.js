import mongoose from "mongoose";

const CapabilitySchema = new mongoose.Schema(
  {
    idNumber: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CapabilitySchema.index({ status: 1, sort: 1 });

export default mongoose.models.Capability || mongoose.model("Capability", CapabilitySchema);
