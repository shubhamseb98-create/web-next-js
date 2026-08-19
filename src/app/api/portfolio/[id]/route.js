import { connectDB } from '../../../lib/config';
import Portfolio from '../../../models/Portfolio';
import { requireAuth } from '../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request, context) {
  try {
    const params = await context.params;
    await connectDB();
    const item = await Portfolio.findOne({ $or: [{ _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null }, { slug: params.id }] }).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, context) {
  try {
    const params = await context.params;
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();
    const formData = await request.formData();
    const body = {};
    for (const [key, value] of formData.entries()) {
      if (key === 'image' || key === '_id') continue;
      body[key] = value;
    }

    if (body.isFeatured === 'true') body.isFeatured = true;
    if (body.isFeatured === 'false') body.isFeatured = false;
    if (body.sort) body.sort = Number(body.sort);
    
    if (body.technologies) {
      try {
        body.technologies = JSON.parse(body.technologies);
      } catch (e) {
        body.technologies = [];
      }
    }

    const { uploadFile, isUploadFile } = await import('../../../../lib/upload');
    const imageFile = formData.get('image');
    if (isUploadFile(imageFile)) {
      body.image = await uploadFile(imageFile, 'portfolio');
    }

    const query = { $or: [{ _id: params.id.match(/^[0-9a-fA-F]{24}$/) ? params.id : null }, { slug: params.id }] };
    const item = await Portfolio.findOneAndUpdate(query, body, { new: true, runValidators: true }).lean();
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const params = await context.params;
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();
    const item = await Portfolio.findByIdAndDelete(params.id);
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}