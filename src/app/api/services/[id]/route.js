import { connectDB } from '../../../lib/config';
import Service from '../../../models/Service';
import { requireAuth } from '../../../lib/auth';
import { uploadFile } from '../../../../lib/upload';
import { revalidatePath } from 'next/cache';

// Trigger Turbopack rebuild
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Service.findOne({ slug: id }).lean()
      || await Service.findById(id).lean();
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
      if (['image', 'breadcrumbImage', 'overviewImage'].includes(key)) {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'services');
          if (fileUrl) body[key] = fileUrl;
        } else if (value) {
          body[key] = value;
        }
      } else if (['features', 'faq', 'benefits', 'portfolio', 'process', 'whyChooseUs', 'techStack'].includes(key)) {
        try { body[key] = JSON.parse(value); } catch (e) { body[key] = []; }
      } else if (key === 'isFeatured') {
        body[key] = value === 'true';
      } else {
        body[key] = value;
      }
    }

    const { id } = await params;
    const item = await Service.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    
    // Clear Next.js cache so public site reflects changes immediately
    revalidatePath(`/services/${item.slug}`);
    revalidatePath('/services', 'page');
    
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
    const item = await Service.findByIdAndDelete(id);
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}