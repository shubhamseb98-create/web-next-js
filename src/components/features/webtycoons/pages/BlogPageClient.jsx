'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaCalendarAlt, FaClock, FaUser, FaArrowRight, FaSearch, FaTags } from 'react-icons/fa'
import styles from '../../../../css/webtycoons/BlogPage.module.css'
import PageHeader from 'src/components/layout/PageHeader'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const categories = ['All', 'Web Development', 'E-Commerce', 'SEO & Marketing', 'UI/UX Design', 'Technology']

export default function BlogPageClient({ initialBlogs = [] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')

  const filteredBlogs = initialBlogs.filter(blog => {
    const matchCat = activeCategory === 'All' || blog.category === activeCategory
    const matchSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })


  return (
    <main className={styles.blogPage}>

      {/* ── Hero (Standardized PageHeader) ── */}
      <PageHeader
        title={`Insights, Ideas &amp; <span class="textGreen">Digital Wisdom</span>`}
        description="Practical tips, industry trends, and expert insights from the WebTycoons team — helping you make better digital decisions."
        bgImage="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2070&auto=format&fit=crop"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Blog" }
        ]}
      >
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
      </PageHeader>


      {/* ── Category Filters ── */}
      <section className={styles.filterSection}>
        <div className="container-fluid-px">
          <div className={styles.filterTabs}>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
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
            <motion.div
              className={styles.blogGrid}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredBlogs.map(blog => (
                <motion.article key={blog.id} variants={fadeUp} className={styles.blogCard}>
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
                    <h3 className={styles.blogTitle}>{blog.title}</h3>
                    <p className={styles.blogExcerpt}>{blog.excerpt}</p>
                    <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
                      Read Article <FaArrowRight />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
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
              <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btnPrimary" onClick={() => setEmail('')}>Subscribe</button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
