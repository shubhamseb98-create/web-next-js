import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../../lib/config";
import Banner from "../../../models/Banner";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { uploadFile, isUploadFile } from "../../../../lib/upload";

export async function PUT(request, context) {
    try {
        await connectDB();

        const formData = await request.formData();
        // id will from params
        const { id } = await context.params;

        const existingBanner = await Banner.findById(id);

        if (!existingBanner) {
            return Response.json(
                { message: "Banner not found" },
                { status: 404 }
            );
        }

        let imageUrl = existingBanner.image;
        if (formData.has("imageUrl")) {
            const raw = formData.get("imageUrl");
            if (raw !== null && raw !== undefined && raw !== "") {
                imageUrl = raw;
            }
        } else if (formData.has("imageText")) {
            const raw = formData.get("imageText");
            if (raw !== null && raw !== undefined && raw !== "") {
                imageUrl = raw;
            }
        }

        let audioUrl = existingBanner.audio || "";
        if (formData.has("audioUrl")) {
            const raw = formData.get("audioUrl");
            if (raw !== null && raw !== undefined) {
                audioUrl = raw;
            }
        } else if (formData.has("audioText")) {
            const raw = formData.get("audioText");
            if (raw !== null && raw !== undefined) {
                audioUrl = raw;
            }
        }

        if (isUploadFile(image)) {
            imageUrl = await uploadFile(image, "banner", "banner");

            // Delete old image if it's a local file (local dev only — skip on Vercel/cloud)
            if (existingBanner.image && existingBanner.image.startsWith("/uploads/")) {
                try {
                    const oldImagePath = path.join(
                        process.cwd(),
                        "public",
                        existingBanner.image
                    );
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (fsErr) {
                    // Non-fatal: file may not exist on serverless environments
                    console.warn("Could not delete old banner image:", fsErr.message);
                }
            }
        }

        if (isUploadFile(audio)) {
            audioUrl = await uploadFile(audio, "banner-audio", "audio");

            if (existingBanner.audio && existingBanner.audio.startsWith("/uploads/")) {
                try {
                    const oldAudioPath = path.join(
                        process.cwd(),
                        "public",
                        existingBanner.audio
                    );
                    if (fs.existsSync(oldAudioPath)) {
                        fs.unlinkSync(oldAudioPath);
                    }
                } catch (fsErr) {
                    console.warn("Could not delete old banner audio:", fsErr.message);
                }
            }
        }

        const updateData = {
            title: formData.has("title") ? formData.get("title") : existingBanner.title,
            subtitle: formData.has("subtitle") ? formData.get("subtitle") : existingBanner.subtitle,
            url: formData.has("url") ? formData.get("url") : existingBanner.url,
            buttonText: formData.has("buttonText") ? formData.get("buttonText") : existingBanner.buttonText,
            alt: formData.has("alt") ? formData.get("alt") : existingBanner.alt,
            status: formData.has("status") ? formData.get("status") : existingBanner.status,
            sort: formData.has("sort") ? Number(formData.get("sort")) : existingBanner.sort,
            showCertifications: formData.has("showCertifications") ? (formData.get("showCertifications") === "true") : existingBanner.showCertifications,
            image: imageUrl,
            audio: audioUrl,
        };

        const banner = await Banner.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        // Trigger on-demand ISR revalidation so Vercel updates the frontend instantly
        const { revalidatePath } = require("next/cache");
        revalidatePath('/', 'layout');

        return Response.json({
            message: "Updated successfully",
            data: banner,
        });

    } catch (error) {
        console.error("Banner PUT Error:", error);
        return Response.json(
            {
                message: "Update failed",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, context) {
    await connectDB();
    const { id } = await context.params;

    console.log(id);
    const banner = await Banner.findById(id);

    if (!banner) {
        return Response.json({ message: "Not found" }, { status: 404 });
    }

    // delete image from /public (local dev only — skip on Vercel/cloud)
    if (banner.image && banner.image.startsWith("/uploads/")) {
        try {
            const filePath = path.join(process.cwd(), "public", banner.image);
            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, () => {});
            }
        } catch (fsErr) {
            console.warn("Could not delete banner image file:", fsErr.message);
        }
    }

    await Banner.findByIdAndDelete(id);

    // Trigger on-demand ISR revalidation so Vercel updates the frontend instantly
    const { revalidatePath } = require("next/cache");
    revalidatePath('/', 'layout');

    return Response.json({
        message: "Deleted successfully",
    });
}