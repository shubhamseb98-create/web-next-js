import { connectDB } from '../../lib/config';
import Technology from '../../models/Technology';
import { requireAuth } from '../../lib/auth';
import { uploadFile } from '../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const query = all === 'true' ? {} : { status: 'active' };
    const items = await Technology.find(query).sort({ category: 1, sort: 1 }).lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch technologies' }, { status: 500 });
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
      if (key === 'image') {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'technologies');
          if (fileUrl) body.image = fileUrl;
        } else if (value) {
          body.image = value;
        }
      } else if (key === 'sort') {
        body[key] = Number(value);
      } else {
        body[key] = value;
      }
    }

    const item = await Technology.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
