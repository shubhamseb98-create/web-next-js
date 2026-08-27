import { connectDB } from "../../../lib/config";
import ProjectFaq from "../../../models/ProjectFaq";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await ProjectFaq.findByIdAndUpdate(
      id,
      {
        question: body.question,
        answer: body.answer,
        sort: Number(body.sort) || 0,
        status: body.status || "active",
      },
      { new: true }
    );

    if (!updated) {
      return Response.json({ success: false, error: "FAQ not found" }, { status: 404 });
    }

    revalidatePath("/projects", "page");

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const deleted = await ProjectFaq.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ success: false, error: "FAQ not found" }, { status: 404 });
    }

    revalidatePath("/projects", "page");

    return Response.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
