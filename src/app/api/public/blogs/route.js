// Public blog endpoint — no auth required, only returns published posts
import { connectDB } from '../../../lib/config';
import Blog from '../../../models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    const blogs = await Blog.find({ isPublished: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .select('title slug excerpt category coverImage alt publishedAt createdAt')
      .lean();

    return Response.json({ success: true, data: JSON.parse(JSON.stringify(blogs)) });
  } catch (error) {
    return Response.json({ success: false, message: 'Failed to fetch blogs' }, { status: 500 });
  }
}
