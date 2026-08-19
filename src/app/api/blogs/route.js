import { connectDB } from '../../lib/config';
import Blog from '../../models/Blog';
import { requireAuth } from '../../lib/auth';
import { uploadFile } from '../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const query = all === 'true' ? {} : { isPublished: true };
    const items = await Blog.find(query).sort({ publishedAt: -1, createdAt: -1 }).lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch blogs' }, { status: 500 });
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
      if (key === 'coverImage' || key === 'breadImage') {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'blogs');
          if (fileUrl) body[key] = fileUrl;
        } else if (value) {
          body[key] = value;
        }
      } else if (key === 'sort') {
        body[key] = Number(value) || 0;
      } else if (key === 'isPublished') {
        body[key] = value === 'true';
      } else if (key === 'metakeywords') {
        body[key] = value ? value.split(',').map(s => s.trim()) : [];
      } else if (key === 'schemaMarkup') {
        try { body[key] = value ? JSON.parse(value) : {}; } catch(e) { body[key] = {}; }
      } else {
        body[key] = value;
      }
    }

    const item = await Blog.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
