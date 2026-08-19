import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    designation: { type: String, default: "" },
    department: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
    image: { type: String, default: "" },
    color: { type: String, default: "#FFFFFF" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    status: { type: String, enum: ["active", "draft"], default: "active" },
    sort: { type: Number, default: 0 },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ status: 1, sort: 1 });

export default mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);
