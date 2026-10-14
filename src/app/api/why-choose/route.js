import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import WhyChoose from "../../models/whyChoose";
import { z } from "zod";
import { uploadFile, isUploadFile } from "../../../lib/upload";

// get, post, put, delete banner api
export async function GET() {
    await connectDB();

    const whyChoose = await WhyChoose.find();
    return Response.json(whyChoose);
}

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();

        const title = formData.get("title");
        const content = formData.get("content");
        const tag = formData.get("tag") || "";
        const status = formData.get("status") || "active";
        const sort = Number(formData.get("sort")) || 0;
        const icon = formData.get("icon"); // FILE

        let imageUrl = "";
        if (isUploadFile(icon)) {
            imageUrl = await uploadFile(icon, "why-choose", "why");
        }

        // save to DB
        const whyChoose = await WhyChoose.create({
            title,
            content,
            tag,
            status,
            sort,
            icon: imageUrl,
        });

        
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({
            message: "Why choose item created successfully",
            data: whyChoose,
        });

    } catch (error) {
        return Response.json(
            { message: "Upload failed", error: error.message },
            { status: 500 }
        );
    }
}

