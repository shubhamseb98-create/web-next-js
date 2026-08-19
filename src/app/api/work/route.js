import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import Work from "../../models/Work";
import { uploadFile, isUploadFile } from "../../../lib/upload";

// get, post, put, delete banner api
export async function GET() {
    await connectDB();

    const works = await Work.find();
    return Response.json(works);
}

export async function POST(request) {
    try {
        await connectDB();

        const formData = await request.formData();
        const title = formData.get("title");
        const description = formData.get("description") || "";
        const status = formData.get("status");
        const sort = Number(formData.get("sort"));
        const category = formData.get("category") || "Industry";
        const logo = formData.get("logo");
        const image = formData.get("image");

        if (!isUploadFile(logo) && !title) {
            return Response.json(
                { message: "Valid title and logo is required" },
                { status: 400 }
            );
        }

        let logoUrl = "";
        let imageUrl = "";

        if (isUploadFile(logo)) {
            logoUrl = await uploadFile(logo, "work", "work");
        }
        if (isUploadFile(image)) {
            imageUrl = await uploadFile(image, "work", "work");
        }

        // save to DB
        const work = await Work.create({
            title,
            description,
            status,
            sort,
            category,
            logo: logoUrl,
            image: imageUrl,
        });
        
        
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({
            message: "Work created successfully",
            data: work,
        });

    } catch (error) {
        return Response.json(
            { message: "Upload failed", error: error.message },
            { status: 500 }
        );
    }
}
