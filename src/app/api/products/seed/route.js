import { connectDB } from "../../../lib/config";
import Product from "../../../models/Product";
import Category from "../../../models/Category";
import { DEFAULT_CRM_CATEGORIES, DEFAULT_CRM_PRODUCTS } from "../../../../lib/crmDefaults";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      return Response.json({
        message: "Products already exist in the database.",
        count: existingCount
      });
    }

    // Insert or update categories
    const categoryMap = {};
    for (const cat of DEFAULT_CRM_CATEGORIES) {
      let existingCat = await Category.findOne({ slug: cat.slug });
      if (!existingCat) {
        existingCat = await Category.create({
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          sort: cat.sort,
          isActive: true
        });
      }
      categoryMap[cat.slug] = existingCat._id;
    }

    // Insert products
    const inserted = [];
    for (const prod of DEFAULT_CRM_PRODUCTS) {
      const catId = categoryMap[prod.categorySlug] || Object.values(categoryMap)[0];
      const created = await Product.create({
        name: prod.name,
        slug: prod.slug,
        category: catId,
        grade: prod.grade,
        description: prod.description,
        breadcrumb: prod.breadcrumb,
        image: prod.image,
        detailImage: prod.detailImage,
        alt: prod.alt,
        sort: prod.sort,
        isActive: true,
        metatag: prod.metatag,
        metaDescription: prod.metaDescription,
        metakeywords: prod.metakeywords
      });
      inserted.push(created);
    }

    return Response.json({
      success: true,
      message: `Successfully seeded ${inserted.length} custom CRM products and categories.`,
      products: inserted
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to seed CRM products", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST() {
  return GET();
}
