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

    const getString = (key) => {
      const val = formData.get(key);
      return val !== null ? val.toString().trim() : "";
    };

    const eyebrow = getString("eyebrow") || "FROM THE FOUNDER'S DESK";
    const heading_start = getString("heading_start") || "Architecting";
    const heading_highlight = getString("heading_highlight") || "Digital Dominance";
    const heading_end = getString("heading_end") || "& Engineering Real Value";
    const founder_name = getString("founder_name") || "Dheeraj Aggarwal";
    const founder_role = getString("founder_role") || "Founder & CEO";
    const quote_tag = getString("quote_tag");
    const quote_text = getString("quote_text");
    const bio_text = getString("bio_text");
    const primary_btn_text = getString("primary_btn_text");
    const primary_btn_url = getString("primary_btn_url");
    const linkedin_url = getString("linkedin_url");
    const signature_text = getString("signature_text");
    const signature_subtext = getString("signature_subtext");
    const alt = getString("alt") || "Dheeraj Aggarwal - Founder & CEO";

    // Badges can be completely cleared/blanked by user:
    const badge_1_number = getString("badge_1_number");
    const badge_1_label = getString("badge_1_label");
    const badge_2_tag = getString("badge_2_tag");
    const badge_2_number = getString("badge_2_number");
    const badge_2_label = getString("badge_2_label");
    const badge_3_text = getString("badge_3_text");
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
