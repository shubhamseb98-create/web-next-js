import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import ContactPage from "../../models/ContactPage";
import { uploadFile, isUploadFile } from "../../../lib/upload";
import fs from "fs";
import path from "path";

export async function GET() {
    try {
        await connectDB();
        let page = await ContactPage.findOne();
        if (!page) {
            page = await ContactPage.create({});
        }
        return Response.json({ success: true, data: page });
    } catch (error) {
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const formData = await request.formData();

        let page = await ContactPage.findOne();
        if (!page) {
            page = new ContactPage();
        }

        // Process File Uploads / Image URLs
        if (formData.has("headerImage")) {
            const headerImage = formData.get("headerImage");
            if (isUploadFile(headerImage)) {
                // Delete old image if it's a local file
                if (page.headerImage && page.headerImage.startsWith("/uploads/")) {
                    try {
                        const oldPath = path.join(process.cwd(), "public", page.headerImage);
                        if (fs.existsSync(oldPath)) {
                            fs.unlinkSync(oldPath);
                        }
                    } catch (fsErr) {
                        console.warn("Could not delete old contact header image:", fsErr.message);
                    }
                }
                page.headerImage = await uploadFile(headerImage, "contact", "header");
            } else if (typeof headerImage === "string" && headerImage !== "") {
                page.headerImage = headerImage;
            }
        }

        // Process Video/Image Upload / URL
        if (formData.has("connectVideo")) {
            const connectVideo = formData.get("connectVideo");
            if (isUploadFile(connectVideo)) {
                if (page.connectVideoUrl && page.connectVideoUrl.startsWith("/uploads/")) {
                    try {
                        const oldPath = path.join(process.cwd(), "public", page.connectVideoUrl);
                        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
                    } catch (fsErr) {
                        console.warn("Could not delete old connect media:", fsErr.message);
                    }
                }
                // Works for both video and image — uploadFile handles both MIME types
                page.connectVideoUrl = await uploadFile(connectVideo, "videos", "connect");
            } else if (typeof connectVideo === "string" && connectVideo !== "") {
                page.connectVideoUrl = connectVideo;
            }
        }
        if (formData.has("connectVideoUrl")) page.connectVideoUrl = formData.get("connectVideoUrl");
        if (formData.has("connectFormTitle")) page.connectFormTitle = formData.get("connectFormTitle");
        if (formData.has("connectFormSubtitle")) page.connectFormSubtitle = formData.get("connectFormSubtitle");

        // Text Fields
        if (formData.has("headerTitle")) page.headerTitle = formData.get("headerTitle");
        if (formData.has("headerDescription")) page.headerDescription = formData.get("headerDescription");
        if (formData.has("breadcrumb")) page.breadcrumb = formData.get("breadcrumb");
        if (formData.has("contactSubTitle")) page.contactSubTitle = formData.get("contactSubTitle");
        if (formData.has("contactTitle")) page.contactTitle = formData.get("contactTitle");
        if (formData.has("contactDescription")) page.contactDescription = formData.get("contactDescription");
        if (formData.has("mapIframeUrl")) page.mapIframeUrl = formData.get("mapIframeUrl");

        // Office Fields
        if (formData.has("officeAddress")) page.officeAddress = formData.get("officeAddress");
        if (formData.has("officePhone")) page.officePhone = formData.get("officePhone");
        if (formData.has("officeEmail")) page.officeEmail = formData.get("officeEmail");
        if (formData.has("workingHours")) page.workingHours = formData.get("workingHours");

        // Locations Array
        if (formData.has("locations")) {
            try {
                const locations = JSON.parse(formData.get("locations"));
                if (Array.isArray(locations)) {
                    page.locations = locations;
                }
            } catch (e) {
                console.error("Invalid locations JSON format");
            }
        }

        // SEO Fields
        if (formData.has("metatag")) page.metatag = formData.get("metatag");
        if (formData.has("metaDescription")) page.metaDescription = formData.get("metaDescription");
        if (formData.has("canonicalUrl")) page.canonicalUrl = formData.get("canonicalUrl");
        if (formData.has("ogTitle")) page.ogTitle = formData.get("ogTitle");
        if (formData.has("ogDescription")) page.ogDescription = formData.get("ogDescription");
        if (formData.has("twitterCard")) page.twitterCard = formData.get("twitterCard");
        if (formData.has("robots")) page.robots = formData.get("robots");

        if (formData.has("metakeywords")) {
            try {
                page.metakeywords = JSON.parse(formData.get("metakeywords"));
            } catch (e) {}
        }
        
        if (formData.has("schemaMarkup")) {
            try {
                page.schemaMarkup = JSON.parse(formData.get("schemaMarkup"));
            } catch (e) {}
        }

        await page.save();

        
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({ success: true, message: "Contact Page updated", data: page });
    } catch (error) {
        console.error(error);
        return Response.json({ success: false, message: error.message }, { status: 500 });
    }
}
