import { connectDB } from '../../../lib/config';
import HomeExtra from '../../../models/HomeExtra';
import { requireAuth } from '../../../lib/auth';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const homeExtra = await HomeExtra.findOne().lean();
    return Response.json({
      success: true,
      enabled: homeExtra?.show_technology !== false,
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { error } = await requireAuth(request);
    if (error) return error;
    await connectDB();

    const body = await request.json();
    const isEnabled = body.enabled !== false;

    let homeExtra = await HomeExtra.findOne();
    if (homeExtra) {
      homeExtra = await HomeExtra.findByIdAndUpdate(
        homeExtra._id,
        { $set: { show_technology: isEnabled } },
        { new: true }
      );
    } else {
      homeExtra = await HomeExtra.create({ show_technology: isEnabled });
    }

    try {
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
      revalidatePath('/services/[slug]', 'page');
      revalidatePath('/services', 'page');
      revalidatePath('/services', 'layout');
    } catch (e) {
      console.error('Revalidation error on tech section status change:', e);
    }

    return Response.json({
      success: true,
      enabled: isEnabled,
      message: isEnabled ? 'Tech stack section enabled across website' : 'Tech stack section disabled across website',
    });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
