import { connectDB } from '../../lib/config';
import Testimonial from '../../models/Testimonial';
import { requireAuth } from '../../lib/auth';
import { uploadFile } from '../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const items = await Testimonial.find({ isActive: true }).sort({ sort: 1 }).lean();
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(items)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch testimonials' }, { status: 500 });
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
      if (key === 'avatar') {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'testimonials');
          if (fileUrl) body.avatar = fileUrl;
        } else if (value) {
          body.avatar = value;
        }
      } else if (key === 'sort' || key === 'rating') {
        body[key] = Number(value);
      } else if (key === 'isActive') {
        body[key] = value === 'true';
      } else {
        body[key] = value;
      }
    }
    const item = await Testimonial.create(body);
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}