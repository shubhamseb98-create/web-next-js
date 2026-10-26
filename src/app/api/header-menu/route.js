import { revalidatePath } from "next/cache";
import { connectDB } from "../../lib/config";
import { HeaderMenuItem, HeaderConfig } from "../../models/HeaderMenu";
import { requireAuth } from "../../lib/auth";

export const dynamic = 'force-dynamic';

import { DEFAULT_HEADER_ITEMS } from "../../../data/headerMenuDefaults";

export { DEFAULT_HEADER_ITEMS };

export async function GET() {
  try {
    await connectDB();

    let items = await HeaderMenuItem.find().sort({ order: 1 }).lean();

    // Auto-seed if empty or upgrade if legacy single-services structure
    const isLegacy = !items || items.length === 0 || items.some(it => it.name === 'Services' && !it.tier);
    if (isLegacy) {
      await HeaderMenuItem.deleteMany({});
      await HeaderMenuItem.insertMany(DEFAULT_HEADER_ITEMS);
      items = await HeaderMenuItem.find().sort({ order: 1 }).lean();
    }

    let config = await HeaderConfig.findOne().lean();
    if (!config) {
      config = await HeaderConfig.create({
        ctaButtonText: "Let's Talk",
        ctaButtonAction: "modal",
        ctaButtonLink: "/contact",
        showCtaButton: true,
      });
      config = config.toObject ? config.toObject() : config;
    }

    return Response.json({
      success: true,
      data: items,
      config: config
    });
  } catch (error) {
    console.error("GET /api/header-menu error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to fetch header menu" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    await connectDB();
    const body = await request.json();

    if (!body.name || !body.path) {
      return Response.json(
        { success: false, message: "Tab name and path are required." },
        { status: 400 }
      );
    }

    if (typeof body.order !== 'number') {
      const count = await HeaderMenuItem.countDocuments();
      body.order = count + 1;
    }

    const newItem = await HeaderMenuItem.create(body);

    try {
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn("revalidatePath layout error:", revalErr);
    }

    return Response.json({
      success: true,
      message: "Navigation tab created successfully",
      data: newItem
    });
  } catch (error) {
    console.error("POST /api/header-menu error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to create navigation tab" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;

    await connectDB();
    const body = await request.json();

    // Action: Update Header Configuration (CTA button settings)
    if (body.action === 'update-config' && body.config) {
      let config = await HeaderConfig.findOne();
      if (!config) {
        config = new HeaderConfig(body.config);
      } else {
        Object.assign(config, body.config);
      }
      await config.save();

      try {
        revalidatePath('/', 'layout');
      } catch (e) {}

      return Response.json({
        success: true,
        message: "Header configuration updated successfully",
        config
      });
    }

    // Action: Reorder / Bulk Update items
    if (body.action === 'reorder' && Array.isArray(body.items)) {
      const bulkOps = body.items.map((item, index) => ({
        updateOne: {
          filter: { _id: item._id },
          update: {
            $set: {
              order: index + 1,
              ...(typeof item.isActive === 'boolean' ? { isActive: item.isActive } : {})
            }
          }
        }
      }));

      if (bulkOps.length > 0) {
        await HeaderMenuItem.bulkWrite(bulkOps);
      }

      const updated = await HeaderMenuItem.find().sort({ order: 1 }).lean();

      try {
        revalidatePath('/', 'layout');
      } catch (e) {}

      return Response.json({
        success: true,
        message: "Menu order updated successfully",
        data: updated
      });
    }

    // Fallback: save both items & config if provided
    if (body.config) {
      let config = await HeaderConfig.findOne();
      if (!config) {
        config = new HeaderConfig(body.config);
      } else {
        Object.assign(config, body.config);
      }
      await config.save();
    }

    try {
      revalidatePath('/', 'layout');
    } catch (e) {}

    return Response.json({
      success: true,
      message: "Settings updated successfully"
    });
  } catch (error) {
    console.error("PUT /api/header-menu error:", error);
    return Response.json(
      { success: false, message: error.message || "Failed to update header menu" },
      { status: 500 }
    );
  }
}
