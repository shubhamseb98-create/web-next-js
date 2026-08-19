import { connectDB } from '../../lib/config';
import Achievement from '../../models/Achievement';
import { requireAuth } from '../../lib/auth';
import { uploadFile } from '../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all');
    const query = all === 'true' ? {} : { status: 'active' };
    const items = await Achievement.find(query).sort({ sort: 1 }).lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch achievements' }, { status: 500 });
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
          const fileUrl = await uploadFile(value, 'achievements');
          if (fileUrl) body.image = fileUrl;
        } else if (value) {
          body.image = value;
        }
      } else if (key === 'value' || key === 'sort') {
        body[key] = Number(value);
      } else {
        body[key] = value;
      }
    }

    const item = await Achievement.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
