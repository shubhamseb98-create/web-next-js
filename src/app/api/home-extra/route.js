import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import HomeExtra from "../../models/HomeExtra";
import { z } from "zod";
import fs from "fs";
import path from "path";

// get, post, put, delete banner api
export async function GET() {
    await connectDB();

    const homeExtra = await HomeExtra.find();
    return Response.json(homeExtra);
}

export async function POST(request) {
    try {
        await connectDB();

        const contentType = request.headers.get('content-type') || '';
        let body = {};

        if (contentType.includes('application/json')) {
            body = await request.json();
        } else {
            const formData = await request.formData();
            body = Object.fromEntries(formData.entries());
        }

        const updateData = {
            work_title: body.work_title || "",
            work_subtitle: body.work_subtitle || "",
            work_description: body.work_description || "",
            service_title: body.service_title || "",
            service_subtitle: body.service_subtitle || "",
            service_description: body.service_description || "",
            blog_title: body.blog_title || "",
            blog_subtitle: body.blog_subtitle || "",
            contact_title: body.contact_title || "",
            contact_subtitle: body.contact_subtitle || "",
            featured_project_title: body.featured_project_title || "",
            featured_project_subtitle: body.featured_project_subtitle || "",
            featured_project_description: body.featured_project_description || "",
            client_title: body.client_title || "",
            client_subtitle: body.client_subtitle || "",
            client_description: body.client_description || "",
            achievement_title: body.achievement_title || "",
            achievement_subtitle: body.achievement_subtitle || "",
            achievement_description: body.achievement_description || "",
            capability_title: body.capability_title || "",
            capability_subtitle: body.capability_subtitle || "",
            capability_description: body.capability_description || "",
            technology_title: body.technology_title || "",
            technology_subtitle: body.technology_subtitle || "",
            technology_description: body.technology_description || "",
            team_title: body.team_title || "",
            team_subtitle: body.team_subtitle || "",
            team_label: body.team_label || "",
            team_description: body.team_description || "",
            testimonial_title: body.testimonial_title || "",
            testimonial_subtitle: body.testimonial_subtitle || "",
            testimonial_description: body.testimonial_description || "",
        };

        // Upsert: Find the first one and update it, or create if none exists.
        let homeExtra = await HomeExtra.findOne();
        if (homeExtra) {
            homeExtra = await HomeExtra.findByIdAndUpdate(homeExtra._id, updateData, { new: true });
        } else {
            homeExtra = await HomeExtra.create(updateData);
        }

        
    // On-Demand Revalidation
    revalidatePath('/', 'layout');
    return Response.json({
            message: "HomeExtra saved successfully",
            data: homeExtra,
        });

    } catch (error) {
        return Response.json(
            { message: "Save failed", error: error.message },
            { status: 500 }
        );
    }
}
