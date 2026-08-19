import PageHeader from "src/components/layout/PageHeader";
import BlogCard from "src/components/features/blog/BlogCard";

import { connectDB } from "../../lib/config";
import Blog from "../../models/Blog";
import PageBanner from "../../models/PageBanner";

import BlogPageClient from "src/components/features/webtycoons/pages/BlogPageClient";

export const metadata = {
  title: "Blog & Updates | The WebTycoons",
  description:
    "Read the latest industry news, manufacturing updates, and articles from The WebTycoons on stainless steel, production technology, and sustainability.",
  alternates: {
    canonical: "https://thewebtycoons.com/blog",
  },
};

export const revalidate = 3600; // 1 hour ISR

async function getBlogs() {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ sort: 1, createdAt: -1 }).lean();
    return blogs.map(b => ({
        id: b._id.toString(),
        image: b.coverImage || "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
        date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) : new Date(b.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}),
        category: b.category || "Technology",
        title: b.title,
        excerpt: b.excerpt || b.metaDescription || "Read our latest insights and updates on web development, design, and digital marketing strategies.",
        author: b.author || "WebTycoons Team",
        readTime: b.readTime || "5 min read",
        slug: b.slug,
        featured: b.isFeatured || false,
    }));
}

export default async function BlogPage() {
    await connectDB();
    const blogData = await getBlogs();

    return (
        <BlogPageClient initialBlogs={blogData} />
    );
}

