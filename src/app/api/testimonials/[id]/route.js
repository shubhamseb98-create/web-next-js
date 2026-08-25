import { connectDB } from '../../../lib/config';
import Testimonial from '../../../models/Testimonial';
import { requireAuth } from '../../../lib/auth';
import { uploadFile } from '../../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
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
    const { id } = await params;
    const item = await Testimonial.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });

    const { revalidatePath } = require("next/cache");
    revalidatePath('/', 'layout');

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
    const item = await Testimonial.findByIdAndDelete(id);
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });

    const { revalidatePath } = require("next/cache");
    revalidatePath('/', 'layout');

    return Response.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}