import { connectDB } from "../../../lib/config";
import { HeaderMenuItem } from "../../../models/HeaderMenu";
import { requireAuth } from "../../../lib/auth";

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    const { id } = await params;
    await connectDB();
    const body = await request.json();

    const updatedItem = await HeaderMenuItem.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return Response.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Navigation tab updated successfully",
      data: updatedItem
    });
  } catch (error) {
    console.error("PUT /api/header-menu/[id] error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    const { id } = await params;
    await connectDB();

    const deleted = await HeaderMenuItem.findByIdAndDelete(id);

    if (!deleted) {
      return Response.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Navigation tab deleted successfully"
    });
  } catch (error) {
    console.error("DELETE /api/header-menu/[id] error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to delete item" },
      { status: 500 }
    );
  }
}
