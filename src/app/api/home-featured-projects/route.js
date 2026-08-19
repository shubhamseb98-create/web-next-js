import { connectDB } from "../../lib/config";
import HomeFeaturedProjectsSection from "../../models/HomeFeaturedProjectsSection";
import { requireAuth } from "../../lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const item = await HomeFeaturedProjectsSection.findOne().lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item || {})) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    await connectDB();
    const body = await request.json();

    const existing = await HomeFeaturedProjectsSection.findOne();
    let item;
    
    if (existing) {
      item = await HomeFeaturedProjectsSection.findByIdAndUpdate(existing._id, body, { new: true, runValidators: true }).lean();
    } else {
      item = await HomeFeaturedProjectsSection.create(body);
    }
    
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
