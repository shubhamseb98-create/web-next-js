import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaClock, FaUser, FaArrowRight, FaSearch, FaTags } from 'react-icons/fa'
import styles from './BlogPage.module.css'
import { fadeUp, staggerContainer } from '../animations/variants'
import SectionHeading from '../components/SectionHeading/SectionHeading'

const categories = ['All', 'Web Development', 'E-Commerce', 'SEO & Marketing', 'UI/UX Design', 'Technology']

const blogs = [
  {
    id: 1, slug: 'why-static-websites-are-making-a-comeback',
    category: 'Web Development',
    title: 'Why Static Websites Are Making a Massive Comeback in 2025',
    excerpt: 'With the rise of JAMstack and edge computing, static websites are no longer just brochures — they are now powering enterprise-grade applications at lightning speed.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    author: 'Santosh Kumar', date: 'July 28, 2025', readTime: '5 min read', featured: true
  },
  {
    id: 2, slug: 'ecommerce-conversion-rate-optimization',
    category: 'E-Commerce',
    title: '10 Proven Tactics to Boost Your E-Commerce Conversion Rate in 2025',
    excerpt: 'Most e-commerce stores lose 70%+ of potential sales at checkout. Here are 10 data-backed CRO strategies our team has implemented with proven results.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    author: 'Riya Sharma', date: 'July 20, 2025', readTime: '7 min read', featured: true
  },
  {
    id: 3, slug: 'seo-mistakes-web-developers-make',
    category: 'SEO & Marketing',
    title: '7 Critical SEO Mistakes Web Developers Still Make (And How to Fix Them)',
    excerpt: 'Great design means nothing if your website can\'t be found. We break down the most common technical SEO errors — from slow Core Web Vitals to broken structured data.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    author: 'Arjun Mehta', date: 'July 15, 2025', readTime: '6 min read', featured: true
  },
  {
    id: 4, slug: 'react-vs-next-which-to-choose',
    category: 'Web Development',
    title: 'React vs. Next.js in 2025: Which Should You Choose For Your Business?',
    excerpt: 'Both are excellent tools, but choosing the wrong one for your project can cost you months. We compare performance, SEO capabilities, and developer experience.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    author: 'Santosh Kumar', date: 'July 10, 2025', readTime: '8 min read', featured: false
  },
  {
    id: 5, slug: 'ui-ux-principles-for-higher-conversions',
    category: 'UI/UX Design',
    title: '5 UI/UX Principles That Directly Increase Website Conversions',
    excerpt: 'Great aesthetics and great results are not mutually exclusive. Learn the five design principles that simultaneously make sites look premium and convert visitors into clients.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    author: 'Riya Sharma', date: 'July 5, 2025', readTime: '5 min read', featured: false
  },
  {
    id: 6, slug: 'ai-changing-web-development-2025',
    category: 'Technology',
    title: 'How AI is Changing Web Development in 2025 — What Agencies Need to Know',
    excerpt: 'From AI-powered code completion to automated testing and personalized user experiences, artificial intelligence is reshaping every layer of the web development stack.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    author: 'Priya Nair', date: 'July 1, 2025', readTime: '9 min read', featured: false
  },
  {
    id: 7, slug: 'choosing-right-cms-for-business',
    category: 'Web Development',
    title: 'Choosing the Right CMS for Your Business in 2025: A Complete Guide',
    excerpt: 'WordPress, Contentful, Sanity, or a custom CMS — each has its strengths and weaknesses. We break down the perfect fit for every type of business and budget.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop',
    author: 'Arjun Mehta', date: 'June 25, 2025', readTime: '6 min read', featured: false
  },
  {
    id: 8, slug: 'mobile-first-design-why-it-matters',
    category: 'UI/UX Design',
    title: 'Mobile-First Design: Why It Still Matters More Than Ever',
    excerpt: 'With 65% of web traffic coming from mobile devices, designing for desktop first is now a critical business mistake. Here\'s how to do it right.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    author: 'Riya Sharma', date: 'June 18, 2025', readTime: '4 min read', featured: false
  },
  {
    id: 9, slug: 'payment-gateway-comparison-india',
    category: 'E-Commerce',
    title: 'Razorpay vs Stripe vs PayU: Best Payment Gateway for Indian E-Commerce',
    excerpt: 'Choosing the wrong payment gateway can cost you sales through hidden fees, poor UX, and failed transactions. We compared the top 3 options for Indian businesses.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    author: 'Priya Nair', date: 'June 10, 2025', readTime: '7 min read', featured: false
  },
]

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    document.title = 'Blog | WebTycoons'
  }, [])

  const filteredBlogs = blogs.filter(blog => {
    const matchCat = activeCategory === 'All' || blog.category === activeCategory
    const matchSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const featuredBlogs = filteredBlogs.filter(b => b.featured)
  const regularBlogs = filteredBlogs.filter(b => !b.featured)

  return (
    <main className={styles.blogPage}>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.breadcrumb}>
              <Link to="/">Home</Link> / <span>Blog</span>
            </div>
            <h1 className={styles.heroTitle}>
              Insights, Ideas &amp; <span className={styles.accent}>Digital Wisdom</span>
            </h1>
            <p className={styles.heroDesc}>
              Practical tips, industry trends, and expert insights from the WebTycoons team — helping you make better digital decisions.
            </p>

            {/* Search */}
            <div className={styles.searchBar}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className={styles.filterSection}>
        <div className="container-fluid-px">
          <div className={styles.filterTabs}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className={`py-100 ${styles.contentSection}`}>
        <div className="container-fluid-px">

          {filteredBlogs.length === 0 ? (
            <div className={styles.noResults}>
              <FaTags style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.2)', marginBottom: '1rem' }} />
              <h3>No Articles Found</h3>
              <p>Try a different search term or category.</p>
            </div>
          ) : (
            <>
              {/* Featured (top 2) */}
              {featuredBlogs.length > 0 && (
                <motion.div
                  className={styles.featuredGrid}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {featuredBlogs.map(blog => (
                    <motion.article key={blog.id} variants={fadeUp} className={styles.featuredCard}>
                      <div className={styles.blogImgWrapper}>
                        <img src={blog.image} alt={blog.title} className={styles.blogImg} loading="lazy" />
                        <span className={styles.categoryBadge}>{blog.category}</span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.meta}>
                          <span><FaUser /> {blog.author}</span>
                          <span><FaCalendarAlt /> {blog.date}</span>
                          <span><FaClock /> {blog.readTime}</span>
                        </div>
                        <h2 className={styles.blogTitle}>{blog.title}</h2>
                        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                        <Link to={`/blog/${blog.slug}`} className={styles.readMore}>
                          Read Article <FaArrowRight />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {/* Regular Grid */}
              {regularBlogs.length > 0 && (
                <motion.div
                  className={styles.blogGrid}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {regularBlogs.map(blog => (
                    <motion.article key={blog.id} variants={fadeUp} className={styles.blogCard}>
                      <div className={styles.blogImgWrapper}>
                        <img src={blog.image} alt={blog.title} className={styles.blogImg} loading="lazy" />
                        <span className={styles.categoryBadge}>{blog.category}</span>
                      </div>
                      <div className={styles.cardBody}>
                        <div className={styles.meta}>
                          <span><FaCalendarAlt /> {blog.date}</span>
                          <span><FaClock /> {blog.readTime}</span>
                        </div>
                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                        <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                        <Link to={`/blog/${blog.slug}`} className={styles.readMore}>
                          Read More <FaArrowRight />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className={`py-100 ${styles.newsletterSection}`}>
        <div className="container-fluid-px">
          <motion.div
            className={styles.newsletterBox}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Stay Ahead of the Curve</h2>
            <p>Get our best articles, tips, and industry news delivered straight to your inbox every week.</p>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email address" />
              <button className="btnPrimary">Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}

export default BlogPage
