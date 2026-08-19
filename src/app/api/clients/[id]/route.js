import { connectDB } from '../../../lib/config';
import Client from '../../../models/Client';
import { requireAuth } from '../../../lib/auth';
import { uploadFile } from '../../../../lib/upload';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Client.findById(id).lean();
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
      if (key === 'image') {
        if (value && typeof value !== 'string') {
          const fileUrl = await uploadFile(value, 'clients');
          if (fileUrl) body.image = fileUrl;
        } else if (value) {
          body.image = value;
        }
      } else if (key === 'hasBg') {
        body[key] = value === 'true';
      } else {
        body[key] = value;
      }
    }

    const { id } = await params;
    const item = await Client.findByIdAndUpdate(id, body, { new: true }).lean();
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
    const item = await Client.findByIdAndDelete(id);
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
