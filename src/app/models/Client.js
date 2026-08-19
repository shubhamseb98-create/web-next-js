import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    hasBg: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ClientSchema.index({ status: 1, sort: 1 });

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
