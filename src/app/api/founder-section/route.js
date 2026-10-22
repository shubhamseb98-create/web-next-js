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

    // Auto-populate points if missing in the existing MongoDB document
    if (!doc.points || doc.points.length === 0) {
      const defaultPoints = [
        {
          number: "01",
          title: doc.point_1_title || "Direct Founder Advisory",
          desc: doc.point_1_desc || "Personal architectural oversight and strategic technical consultation on every enterprise delivery.",
        },
        {
          number: "02",
          title: doc.point_2_title || "Zero Software Bloat",
          desc: doc.point_2_desc || "Clean, bespoke codebases engineered for sub-second speeds and ultra-high Lighthouse scores.",
        },
        {
          number: "03",
          title: doc.point_3_title || "100% Code & IP Ownership",
          desc: doc.point_3_desc || "Complete transparency, full GitHub repository handover, and zero proprietary lock-in.",
        },
        {
          number: "04",
          title: doc.point_4_title || "Measurable Growth ROI",
          desc: doc.point_4_desc || "Sprint-driven execution focused strictly on driving real business pipeline and client revenue.",
        },
      ];

      await FounderSection.findByIdAndUpdate(doc._id, {
        points: defaultPoints,
        point_1_title: defaultPoints[0].title,
        point_1_desc: defaultPoints[0].desc,
        point_2_title: defaultPoints[1].title,
        point_2_desc: defaultPoints[1].desc,
        point_3_title: defaultPoints[2].title,
        point_3_desc: defaultPoints[2].desc,
        point_4_title: defaultPoints[3].title,
        point_4_desc: defaultPoints[3].desc,
      });

      doc.points = defaultPoints;
      doc.point_1_title = defaultPoints[0].title;
      doc.point_1_desc = defaultPoints[0].desc;
      doc.point_2_title = defaultPoints[1].title;
      doc.point_2_desc = defaultPoints[1].desc;
      doc.point_3_title = defaultPoints[2].title;
      doc.point_3_desc = defaultPoints[2].desc;
      doc.point_4_title = defaultPoints[3].title;
      doc.point_4_desc = defaultPoints[3].desc;
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
    const point_1_title = getString("point_1_title");
    const point_1_desc = getString("point_1_desc");
    const point_2_title = getString("point_2_title");
    const point_2_desc = getString("point_2_desc");
    const point_3_title = getString("point_3_title");
    const point_3_desc = getString("point_3_desc");
    const point_4_title = getString("point_4_title");
    const point_4_desc = getString("point_4_desc");
    const isActive = formData.get("isActive") !== "false";

    // Parse dynamic points array if provided
    let points = [];
    const pointsRaw = formData.get("points");
    if (pointsRaw) {
      try {
        points = JSON.parse(pointsRaw);
      } catch (e) {
        console.warn("Could not parse points JSON:", e.message);
      }
    }

    if (!Array.isArray(points) || points.length === 0) {
      // Fallback to point_1..4
      points = [
        { number: "01", title: point_1_title, desc: point_1_desc },
        { number: "02", title: point_2_title, desc: point_2_desc },
        { number: "03", title: point_3_title, desc: point_3_desc },
        { number: "04", title: point_4_title, desc: point_4_desc },
      ].filter((p) => p.title && p.title.trim());
    }

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
      point_1_title: points[0]?.title || point_1_title,
      point_1_desc: points[0]?.desc || point_1_desc,
      point_2_title: points[1]?.title || point_2_title,
      point_2_desc: points[1]?.desc || point_2_desc,
      point_3_title: points[2]?.title || point_3_title,
      point_3_desc: points[2]?.desc || point_3_desc,
      point_4_title: points[3]?.title || point_4_title,
      point_4_desc: points[3]?.desc || point_4_desc,
      points,
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
