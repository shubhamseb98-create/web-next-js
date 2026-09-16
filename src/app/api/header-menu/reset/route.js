import { connectDB } from "../../../lib/config";
import { HeaderMenuItem, HeaderConfig } from "../../../models/HeaderMenu";
import { requireAuth } from "../../../lib/auth";
import { DEFAULT_HEADER_ITEMS } from "../route";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    await connectDB();

    // Delete existing menu items
    await HeaderMenuItem.deleteMany({});

    // Re-insert default items
    await HeaderMenuItem.insertMany(DEFAULT_HEADER_ITEMS);

    // Reset config to defaults
    await HeaderConfig.deleteMany({});
    const config = await HeaderConfig.create({
      ctaButtonText: "Let's Talk",
      ctaButtonAction: "modal",
      ctaButtonLink: "/contact",
      showCtaButton: true,
    });

    const items = await HeaderMenuItem.find().sort({ order: 1 }).lean();

    return Response.json({
      success: true,
      message: "Header menu restored to default configuration",
      data: items,
      config: config.toObject ? config.toObject() : config
    });
  } catch (error) {
    console.error("POST /api/header-menu/reset error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to reset header menu" },
      { status: 500 }
    );
  }
}
