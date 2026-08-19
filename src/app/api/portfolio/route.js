import { connectDB } from '../../lib/config';
import Portfolio from '../../models/Portfolio';
import { requireAuth } from '../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 0;

    const query = { status: 'active' };
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;

    let q = Portfolio.find(query).sort({ sort: 1, createdAt: -1 }).lean();
    if (limit > 0) q = q.limit(limit);

    const items = await q;
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    console.error('[api/portfolio GET]', error);
    return Response.json({ success: false, message: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { user, error } = await requireAuth(request);
    if (error) return error;

    await connectDB();
    const formData = await request.formData();
    const body = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'image') continue;
      body[key] = value;
    }
    
    if (body.isFeatured === 'true') body.isFeatured = true;
    if (body.isFeatured === 'false') body.isFeatured = false;
    if (body.sort) body.sort = Number(body.sort);

    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    const { uploadFile, isUploadFile } = await import('../../../lib/upload');
    const imageFile = formData.get('image');
    if (isUploadFile(imageFile)) {
      body.image = await uploadFile(imageFile, 'portfolio');
    }

    const item = await Portfolio.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    console.error('[api/portfolio POST]', error);
    if (error.code === 11000) {
      return Response.json({ success: false, message: 'A portfolio item with this slug already exists' }, { status: 409 });
    }
    return Response.json({ success: false, message: error.message || 'Failed to create' }, { status: 500 });
  }
}