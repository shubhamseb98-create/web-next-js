import { notFound } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import PageHeader from "src/components/layout/PageHeader";
import BlogSidebar from "src/components/features/blog/BlogSidebar";
import { cache } from "react";
import { connectDB } from "../../../lib/config";
import Blog from "../../../models/Blog";

export const revalidate = 3600; // 1 hour ISR

export async function generateStaticParams() {
  await connectDB();
  const blogs = await Blog.find({ isPublished: true }).select('slug').lean();
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

const getBlogPost = cache(async (slug) => {
  await connectDB();
  const post = await Blog.findOne({ slug }).lean();
  return post;
});

// Dynamic SEO metadata generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metatag || post.title || "The WebTycoons Blog",
    description: post.metaDescription || post.excerpt || "",
    keywords: post.metakeywords?.length ? post.metakeywords : undefined,
    alternates: {
        canonical: post.canonicalUrl 
            ? (post.canonicalUrl.startsWith('http') ? post.canonicalUrl : `https://thewebtycoons.com${post.canonicalUrl}`)
            : `https://thewebtycoons.com/blog/${post.slug}`,
    },
    openGraph: {

        title: post.ogTitle || post.metatag || post.title,
        description: post.ogDescription || post.metaDescription || post.excerpt,
        images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
        card: post.twitterCard || 'summary_large_image',
    },
    robots: post.robots || "index, follow",
  };
}

import BlogDetailsPageClient from "src/components/features/webtycoons/pages/BlogDetailsPageClient";

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;
  const postRaw = await getBlogPost(slug);

  if (!postRaw) notFound();
  
  const post = JSON.parse(JSON.stringify(postRaw));

  const relatedPostsRaw = await getRelatedBlogs(post._id, post.category);
  const relatedPosts = JSON.parse(JSON.stringify(relatedPostsRaw));

  return (
    <>
      {/* Schema Injection */}
      {post.schemaMarkup && Object.keys(post.schemaMarkup).length > 0 && (
          <Script
              id="blog-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(post.schemaMarkup) }}
          />
      )}

      <BlogDetailsPageClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}

async function getRelatedBlogs(currentId, category) {
  await connectDB();
  // Try to find blogs in same category first
  let related = await Blog.find({ 
      _id: { $ne: currentId }, 
      isPublished: true,
      category: category 
  }).sort({ createdAt: -1 }).limit(3).lean();
  
  // If not enough, fetch latest
  if (related.length < 3) {
      const more = await Blog.find({
          _id: { $ne: currentId, $nin: related.map(r => r._id) },
          isPublished: true,
      }).sort({ createdAt: -1 }).limit(3 - related.length).lean();
      related = [...related, ...more];
  }


  return related.map(b => ({
      id: b._id.toString(),
      title: b.title,
      excerpt: b.excerpt || b.metaDescription || '',
      date: b.publishedAt ? new Date(b.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : new Date(b.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: b.coverImage || "/images/slide1.jpg",
      slug: b.slug,
  }));
}
