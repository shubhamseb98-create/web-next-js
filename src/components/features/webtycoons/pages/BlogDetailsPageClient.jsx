'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaUser } from 'react-icons/fa'
import styles from '../../../../css/webtycoons/BlogDetailsPage.module.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function BlogDetailsPageClient({ post, relatedPosts = [] }) {
  // Split title into two halves for the two-color effect
  const titleWords = (post.title || '').split(' ')
  const middleIndex = Math.ceil(titleWords.length / 2)
  const titleFirstHalf = titleWords.slice(0, middleIndex).join(' ')
  const titleSecondHalf = titleWords.slice(middleIndex).join(' ')

  const postImage = post.coverImage || "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop"
  const postDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) 
    : new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})

  return (
    <div className={styles.pageWrapper}>
      
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${postImage})` }} />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.categoryBadgeHero}>{post.category || 'Technology'}</span>
            <h1 className={styles.heroTitle}>
              {titleFirstHalf} <span className={styles.accentGreen}>{titleSecondHalf}</span>
            </h1>
            <div className={styles.heroMeta}>
              {post.author && (
                <>
                  <span className={styles.metaAuthor}><FaUser /> {post.author}</span>
                  <span className={styles.metaDot}>•</span>
                </>
              )}
              <span><FaCalendarAlt /> {postDate}</span>
              <span className={styles.metaDot}>•</span>
              <span>{post.readTime || '5 min read'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content Area ── */}
      <section className={styles.contentSection}>
        <div className="container-fluid-px">
          <motion.div 
            className={styles.blogContainer}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Main Content (Left) */}
            <article className={styles.mainContent}>
              <div className={styles.contentBody}>
                {post.excerpt && (
                  <p className="lead mb-4 fw-medium" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.2rem' }}>
                    {post.excerpt}
                  </p>
                )}
                
                <div 
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: post.content || 'No content available.' }}
                />
              </div>
            </article>

            {/* Sidebar (Right) */}
            <aside className={styles.sidebar}>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-3">Related Posts</h3>
              <div className="flex flex-col gap-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map(rPost => {
                    return (
                      <Link 
                        href={`/blog/${rPost.slug}`} 
                        key={rPost.id || rPost._id} 
                        className="group flex items-start gap-4 p-3 rounded-xl hover:-translate-y-1 no-underline transition-all duration-300"
                        style={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden relative mt-0.5">
                          <img 
                            src={rPost.image || rPost.coverImage || "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=200&auto=format&fit=crop"} 
                            alt={rPost.title} 
                            className="w-full h-full object-cover" 
                            loading="lazy" 
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                          <h4 
                            className="font-semibold text-white group-hover:text-emerald-400 transition-colors m-0"
                            style={{ fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}
                          >
                            {rPost.title}
                          </h4>
                          {rPost.excerpt && (
                            <p className="text-white/60 m-0" style={{ fontSize: '11px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                              {rPost.excerpt}
                            </p>
                          )}
                          {rPost.date && <span className="font-medium text-white/40 uppercase tracking-wider mt-1" style={{ fontSize: '10px' }}>{rPost.date}</span>}
                        </div>
                      </Link>
                    )
                  })
                ) : (
                  <p className="text-white/50 text-sm">No related posts found.</p>
                )}
              </div>
            </aside>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
