import { connectDB } from '../../../lib/config';
import Blog from '../../../models/Blog';
import { requireAuth } from '../../../lib/auth';
import { uploadFile } from '../../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Blog.findById(id).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
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

    const { id } = await params;
    const item = await Blog.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    const item = await Blog.findByIdAndDelete(id);
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
