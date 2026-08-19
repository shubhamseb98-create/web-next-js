import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';

import { connectDB } from "../../../lib/config";
import Work from "../../../models/Work";
import fs from "fs";
import path from "path";
import { uploadFile, isUploadFile } from "../../../../lib/upload";

export async function PUT(request, context) {
    try {
        await connectDB();

        const formData = await request.formData();

        const { id } = await context.params;

        const existingWork = await Work.findById(id);

        if (!existingWork) {
            return Response.json(
                { message: "Work not found" },
                { status: 404 }
            );
        }

        const logo = formData.get("logo");
        const image = formData.get("image");

        let logoUrl = existingWork.logo;
        let imageUrl = existingWork.image;

        if (isUploadFile(logo)) {
            logoUrl = await uploadFile(logo, "work", "work");

            // Delete old logo
            if (existingWork.logo && existingWork.logo.startsWith("/uploads/")) {
                try {
                    const oldImagePath = path.join(
                        process.cwd(),
                        "public",
                        existingWork.logo
                    );
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (fsErr) {
                    console.warn("Could not delete old work logo:", fsErr.message);
                }
            }
        }

        if (isUploadFile(image)) {
            imageUrl = await uploadFile(image, "work", "work");

            // Delete old image
            if (existingWork.image && existingWork.image.startsWith("/uploads/")) {
                try {
                    const oldImagePath = path.join(
                        process.cwd(),
                        "public",
                        existingWork.image
                    );
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (fsErr) {
                    console.warn("Could not delete old work image:", fsErr.message);
                }
            }
        }

        const updateData = {
            title: formData.get("title"),
            description: formData.get("description") || "",
            status: formData.get("status"),
            category: formData.get("category") || existingWork.category || "Industry",
            sort: Number(formData.get("sort")),
            logo: logoUrl,
            image: imageUrl
        };

        const work = await Work.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({
            message: "Updated successfully",
            data: work,
        });

    } catch (error) {
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
    const work = await Work.findById(id);

    if (!work) {
        return Response.json({ message: "Not found" }, { status: 404 });
    }

    // delete image from /public
    if (work.logo && work.logo.startsWith("/uploads/")) {
        const filePath = path.join(
            process.cwd(),
            "public",
            work.logo
        );

        fs.unlink(filePath, () => {});
    }

    if (work.image && work.image.startsWith("/uploads/")) {
        const filePath = path.join(
            process.cwd(),
            "public",
            work.image
        );

        fs.unlink(filePath, () => {});
    }

    await Work.findByIdAndDelete(id);

    
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({
        message: "Deleted successfully",
    });
}