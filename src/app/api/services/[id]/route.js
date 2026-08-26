import { connectDB } from '../../../lib/config';
import Service from '../../../models/Service';
import { requireAuth } from '../../../lib/auth';
import { uploadFile } from '../../../../lib/upload';
import { revalidatePath } from 'next/cache';
import { DEFAULT_REAL_ESTATE_DATA, mergeRealEstateData } from '../../../../lib/realEstateDefaults';

// Trigger Turbopack rebuild
export const dynamic = 'force-dynamic';

import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    let item = await Service.findOne({ slug: id }).lean();
    if (!item && mongoose.Types.ObjectId.isValid(id)) {
      item = await Service.findById(id).lean();
    }
    if (id === 'real-estate-advisory' || item?.slug === 'real-estate-advisory') {
      if (!item) {
        return Response.json({
          success: true,
          data: {
            title: 'Real Estate Business Growth & Scaling Advisory',
            slug: 'real-estate-advisory',
            shortDesc: 'High-ticket buyer lead generation, PropTech portals, and automated CRM.',
            bgColor: 'linear-gradient(135deg, #152213, #22381e, #3e6b32)',
            hoverTextColor: '#ffffff',
            imageStyle: 'full',
            status: 'active',
            isFeatured: true,
            realEstateData: DEFAULT_REAL_ESTATE_DATA
          }
        });
      }
      const merged = mergeRealEstateData(item);
      return Response.json({ success: true, data: JSON.parse(JSON.stringify(merged)) });
    }
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
    
    let body = {};
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (['image', 'breadcrumbImage', 'overviewImage'].includes(key)) {
          if (value && typeof value !== 'string') {
            const fileUrl = await uploadFile(value, 'services');
            if (fileUrl) body[key] = fileUrl;
          } else if (value) {
            body[key] = value;
          }
        } else if (['features', 'faq', 'benefits', 'portfolio', 'process', 'whyChooseUs', 'techStack', 'realEstateData', 'customData'].includes(key)) {
          try { body[key] = JSON.parse(value); } catch (e) { body[key] = value; }
        } else if (key === 'isFeatured') {
          body[key] = value === 'true';
        } else {
          body[key] = value;
        }
      }
    }

    const { id } = await params;

    // Delete immutable root fields
    delete body._id;
    delete body.__v;
    delete body.createdAt;
    delete body.updatedAt;

    // Sanitize subdocument array IDs so synthetic client IDs ('item-0', etc.) don't fail Mongoose ObjectId casting
    const sanitizeArray = (arr) => {
      if (!Array.isArray(arr)) return arr;
      return arr.map((item) => {
        if (!item || typeof item !== 'object') return item;
        const clean = { ...item };
        if (clean._id && !mongoose.Types.ObjectId.isValid(clean._id)) {
          delete clean._id;
        }
        if (clean.id && !mongoose.Types.ObjectId.isValid(clean.id)) {
          delete clean.id;
        }
        return clean;
      });
    };

    ['features', 'faq', 'benefits', 'portfolio', 'process', 'whyChooseUs', 'techStack'].forEach((key) => {
      if (body[key] && Array.isArray(body[key])) {
        body[key] = sanitizeArray(body[key]);
      }
    });

    let item;
    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Service.findByIdAndUpdate(id, { $set: body }, { new: true, runValidators: true }).lean();
    } else {
      item = await Service.findOneAndUpdate({ slug: id }, { $set: body }, { upsert: true, new: true, runValidators: true }).lean();
    }
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    
    // Clear Next.js cache so public site reflects changes immediately
    revalidatePath(`/services/${item.slug}`);
    revalidatePath('/services', 'page');
    
    return Response.json({ success: true, data: JSON.parse(JSON.stringify(item)) });
  } catch (error) {
    console.error("Service PUT error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();
    const { id } = await params;
    let item;
    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await Service.findByIdAndDelete(id);
    } else {
      item = await Service.findOneAndDelete({ slug: id });
    }
    if (!item) return Response.json({ success: false, message: 'Not found' }, { status: 404 });
    return Response.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}