import { connectDB } from "@/app/lib/config";
import AboutPageConfig from "@/app/models/AboutPageConfig";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let config = await AboutPageConfig.findOne().lean();
    if (!config) {
      config = await AboutPageConfig.create({}); // Returns default fields
    }
    return Response.json({ success: true, data: config });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json();

    const config = await AboutPageConfig.findOne();
    if (!config) {
      await AboutPageConfig.create(data);
    } else {
      await AboutPageConfig.updateOne({ _id: config._id }, { $set: data });
    }

    return Response.json({ success: true, message: "About Page Config updated successfully" });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
