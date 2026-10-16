import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import FounderSection from "../../models/FounderSection";
import fs from "fs";
import path from "path";
import { uploadFile, isUploadFile, deleteFile } from "../../../lib/upload";

export async function GET() {
  try {
    await connectDB();
    let doc = await FounderSection.findOne().lean();
    if (!doc) {
      doc = await FounderSection.create({});
    }
    return Response.json(doc);
  } catch (error) {
    return Response.json({ message: "Failed to fetch founder section", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

    const eyebrow = formData.get("eyebrow") || "FROM THE FOUNDER'S DESK";
    const heading_start = formData.get("heading_start") || "Architecting";
    const heading_highlight = formData.get("heading_highlight") || "Digital Dominance";
    const heading_end = formData.get("heading_end") || "& Engineering Real Value";
    const founder_name = formData.get("founder_name") || "Dheeraj Aggarwal";
    const founder_role = formData.get("founder_role") || "Founder & CEO";
    const quote_tag = formData.get("quote_tag") || "OUR FOUNDATIONAL COMMITMENT";
    const quote_text = formData.get("quote_text") || "";
    const bio_text = formData.get("bio_text") || "";
    const primary_btn_text = formData.get("primary_btn_text") || "Work With Our Team";
    const primary_btn_url = formData.get("primary_btn_url") || "/contact";
    const linkedin_url = formData.get("linkedin_url") || "https://www.linkedin.com";
    const signature_text = formData.get("signature_text") || "Dheeraj Aggarwal";
    const signature_subtext = formData.get("signature_subtext") || "Founder & CEO, WebTycoons";
    const alt = formData.get("alt") || "Dheeraj Aggarwal - Founder & CEO";
    const badge_1_number = formData.get("badge_1_number") || "18+";
    const badge_1_label = formData.get("badge_1_label") || "Years Industry Mastery";
    const badge_2_tag = formData.get("badge_2_tag") || "PROVEN TRACK RECORD";
    const badge_2_number = formData.get("badge_2_number") || "350+";
    const badge_2_label = formData.get("badge_2_label") || "Delivered Worldwide";
    const badge_3_text = formData.get("badge_3_text") || "100% Code Ownership";
    const isActive = formData.get("isActive") !== "false";

    // Handle File Upload: check 'imageFile' and 'image'
    const imageFile = formData.get("imageFile") || formData.get("image");
    let imageUrl = undefined;

    if (isUploadFile(imageFile)) {
      imageUrl = await uploadFile(imageFile, "founder", "founder");
    } else {
      // Check if existingImage string was passed
      const existingImage = formData.get("existingImage") || formData.get("image");
      if (typeof existingImage === "string" && existingImage.trim() && !existingImage.startsWith("data:")) {
        imageUrl = existingImage.trim();
      }
    }

    const updateData = {
      eyebrow,
      heading_start,
      heading_highlight,
      heading_end,
      founder_name,
      founder_role,
      quote_tag,
      quote_text,
      bio_text,
      primary_btn_text,
      primary_btn_url,
      linkedin_url,
      signature_text,
      signature_subtext,
      alt,
      badge_1_number,
      badge_1_label,
      badge_2_tag,
      badge_2_number,
      badge_2_label,
      badge_3_text,
      isActive,
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    let doc = await FounderSection.findOne();
    if (doc) {
      // If a new file was uploaded, delete old uploaded file (never touch static /assets/)
      if (imageUrl && isUploadFile(imageFile) && doc.image && doc.image !== imageUrl) {
        if (doc.image.startsWith("/uploads/")) {
          try {
            const oldPath = path.join(process.cwd(), "public", doc.image);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          } catch (e) {
            console.warn("Could not delete old local founder image:", e.message);
          }
        } else if (doc.image.includes("res.cloudinary.com")) {
          try {
            await deleteFile(doc.image);
          } catch (delErr) {
            console.warn("Could not delete old cloud founder image:", delErr.message);
          }
        }
      }
      doc = await FounderSection.findByIdAndUpdate(doc._id, updateData, { new: true });
    } else {
      doc = await FounderSection.create(updateData);
    }

    // Revalidate paths for instant cache refresh
    revalidatePath("/", "layout");
    revalidatePath("/about", "layout");

    return Response.json({
      message: "Founder section updated successfully",
      data: doc,
    });
  } catch (error) {
    console.error("Founder section POST error:", error);
    return Response.json(
      { message: "Failed to save founder section", error: error.message },
      { status: 500 }
    );
  }
}
