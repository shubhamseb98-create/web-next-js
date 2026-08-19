import { connectDB } from "./lib/config";
import Product from "./models/Product";
import Category from "./models/Category";
import Blog from "./models/Blog";
import Section from "./models/Section";
import About from "./models/About";
import CustomPage from "./models/CustomPage";
import Portfolio from "./models/Portfolio";
import Service from "./models/Service";

export const revalidate = 86400; // Cache for 24 hours

export default async function sitemap() {
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://thewebtycoons.com').replace(/\/$/, '');

  try {
    await connectDB();

    // Fetch ALL dynamic routes from DB in parallel
    const [products, categories, blogs, sections, aboutPages, customPages, portfolios, services] = await Promise.all([
      Product.find({ isActive: true }).populate('category', 'slug').lean(),
      Category.find({ isActive: true }).lean(),
      Blog.find({ isPublished: true }).lean(),
      Section.find({ isActive: true }).lean(),
      About.find({ isActive: true }).lean(),
      CustomPage.find({ isActive: true }).lean(),
      Portfolio.find({ status: 'active' }).lean(),
      Service.find({ status: 'active' }).lean(),
    ]);

    // ── Products: /{category-slug}/{product-slug}
    const productUrls = products
      .filter(p => p.category?.slug && p.slug)
      .map((product) => ({
        url: `${baseUrl}/${product.category.slug}/${product.slug}`,
        lastModified: product.updatedAt || product.createdAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));

    // ── Categories: /{category-slug}
    const categoryUrls = categories
      .filter(c => c.slug)
      .map((category) => ({
        url: `${baseUrl}/${category.slug}`,
        lastModified: category.updatedAt || category.createdAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      }));

    // ── Section landing pages: /{section-slug}
    const sectionUrls = sections
      .filter(s => s.slug)
      .map((section) => ({
        url: `${baseUrl}/${section.slug}`,
        lastModified: section.updatedAt || section.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));

    // ── About / Inner pages: /{section-slug}/{page-slug}
    const aboutUrls = aboutPages
      .filter(p => p.section && p.slug)
      .map((page) => ({
        url: `${baseUrl}/${page.section}/${page.slug}`,
        lastModified: page.updatedAt || page.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    // ── Blog posts: /blogs/{slug}
    const blogUrls = blogs
      .filter(b => b.slug)
      .map((blog) => ({
        url: `${baseUrl}/blogs/${blog.slug}`,
        lastModified: blog.updatedAt || blog.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    // ── Custom pages: /{slug}
    const customPageUrls = customPages
      .filter(p => p.slug)
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: page.updatedAt || page.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));

    // ── WebTycoons Portfolio: /projects/{slug}
    const portfolioUrls = portfolios
      .filter(p => p.slug)
      .map((portfolio) => ({
        url: `${baseUrl}/projects/${portfolio.slug}`,
        lastModified: portfolio.updatedAt || portfolio.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));

    // ── WebTycoons Services: /services/{slug}
    const serviceUrls = services
      .filter(s => s.slug)
      .map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: service.updatedAt || service.createdAt || new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));

    // ── Truly static pages (no DB slug)
    const staticPages = [
      { route: '', priority: 1.0, freq: 'daily' },
      { route: '/about', priority: 0.9, freq: 'monthly' },
      { route: '/projects', priority: 0.9, freq: 'daily' },
      { route: '/services', priority: 0.9, freq: 'weekly' },
      { route: '/contact', priority: 0.8, freq: 'monthly' },
      { route: '/blogs', priority: 0.8, freq: 'daily' },
      { route: '/gallery', priority: 0.6, freq: 'monthly' },
      { route: '/certifications', priority: 0.6, freq: 'monthly' },
    ].map(({ route, priority, freq }) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
    }));

    return [
      ...staticPages,
      ...categoryUrls,
      ...sectionUrls,
      ...aboutUrls,
      ...customPageUrls,
      ...productUrls,
      ...blogUrls,
      ...portfolioUrls,
      ...serviceUrls,
    ];

  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}


