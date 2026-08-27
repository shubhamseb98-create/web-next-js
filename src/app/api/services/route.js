import { connectDB } from '../../lib/config';
import Service from '../../models/Service';
import { requireAuth } from '../../lib/auth';
import { uploadFile } from '../../../lib/upload';

// Trigger Turbopack rebuild
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const query = {};
    if (featured === 'true') query.isFeatured = true;
    const items = await Service.find(query).sort({ sort: 1 }).lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();
    
    const formData = await request.formData();
    const body = {};
    for (const [key, value] of formData.entries()) {
      if (['image', 'breadcrumbImage', 'overviewImage'].includes(key)) {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'services');
          if (fileUrl) body[key] = fileUrl;
        } else if (value) {
          body[key] = value;
        }
      } else if (['features', 'faq', 'benefits', 'portfolio', 'process', 'whyChooseUs', 'techStack'].includes(key)) {
        if (typeof value === 'string' && value.startsWith('[object')) {
          continue;
        }
        try { 
          body[key] = JSON.parse(value); 
        } catch (e) { 
          if (typeof value === 'object' && value !== null) {
            body[key] = value;
          }
        }
      } else if (key === 'isFeatured') {
        body[key] = value === 'true' || value === true;
      } else {
        body[key] = value;
      }
    }

    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }
    const item = await Service.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) return Response.json({ success: false, message: 'Slug already exists' }, { status: 409 });
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}