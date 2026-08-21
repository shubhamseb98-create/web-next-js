'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';
import { FaLinkedinIn, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function BlogDetailsPageClient({ post, relatedPosts = [] }) {
  const [copied, setCopied] = useState(false);

  // Direct zero-delay reading progress update
  useEffect(() => {
    const updateProgress = () => {
      const bar = document.getElementById('blog-reading-progress-fill');
      if (!bar) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        bar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const postTitleEnc = encodeURIComponent(post?.title || 'WebTycoons Blog');

  const postImage = post.coverImage || "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop";
  const postDate = post.publishedAt 
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'}) 
    : new Date(post.createdAt || Date.now()).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});

  const authorName = post.author || "WebTycoons Editorial Team";

  return (
    <article className="blog-article-root">
      
      {/* ── Top Reading Progress Bar (Instant 0ms Sync) ── */}
      <div 
        id="blog-reading-progress-fill"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          width: '0%',
          background: 'linear-gradient(90deg, #52a436, #00ff88)',
          boxShadow: '0 0 10px rgba(82, 164, 54, 0.9)',
          zIndex: 999999,
          pointerEvents: 'none',
          transition: 'none'
        }}
      />

      {/* ── Ambient Background Glows ── */}
      <div className="ambient-glows-container">
        <div className="ambient-glow-top" />
        <div className="ambient-glow-mid" />
      </div>

      {/* ── Top Breadcrumb & Back Bar ── */}
      <div className="blog-top-bar">
        <div className="container-fluid-px">
          <div className="blog-top-bar-inner">
            
            <div className="blog-nav-left">
              <Link 
                href="/blog" 
                className="blog-back-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  background: 'rgba(82, 164, 54, 0.1)',
                  border: '1px solid rgba(82, 164, 54, 0.3)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'inline-block' }}>
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>All Articles</span>
              </Link>

              <div 
                className="blog-breadcrumb-pill"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Home</Link>
                <span className="crumb-sep">›</span>
                <Link href="/blog" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>Blog</Link>
                <span className="crumb-sep">›</span>
                <span className="crumb-current">{post.title}</span>
              </div>
            </div>

            <div 
              className="blog-category-badge"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '8px',
                padding: '5px 14px',
                borderRadius: '100px',
                background: 'rgba(82, 164, 54, 0.1)',
                border: '1px solid rgba(82, 164, 54, 0.25)',
                color: '#52a436',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <span className="cat-dot"></span>
              <span>{post.category || 'Technology'}</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Main Article Header / Hero ── */}
      <header className="blog-hero-section" style={{ paddingTop: '10px', paddingBottom: '36px' }}>
        <div className="container-fluid-px">
          <div className="blog-hero-wrapper">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="blog-hero-content"
              style={{ marginBottom: '28px' }}
            >
              <h1 
                className="blog-title-heading" 
                style={{ 
                  fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', 
                  fontWeight: '700',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em',
                  marginBottom: '18px',
                  maxWidth: '920px',
                  color: '#ffffff'
                }}
              >
                {post.title}
              </h1>

              {/* Author & Meta Row */}
              <div className="blog-meta-row">
                <div className="author-pill">
                  <div className="author-avatar-circle">
                    {authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="author-name-text">{authorName}</span>
                </div>

                <div className="meta-separator">•</div>

                <div className="meta-item">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{postDate}</span>
                </div>

                <div className="meta-separator">•</div>

                <div className="meta-item">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{post.readTime || '5 min read'}</span>
                </div>
              </div>
            </motion.div>

            {/* Featured Hero Cover Image (Full Width & Balanced Height) */}
            <motion.div 
              className="blog-featured-image-box"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                width: '100%',
                maxWidth: '1140px',
                height: '380px',
                maxHeight: '380px',
                margin: '0 auto',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
                background: '#0f1410'
              }}
            >
              <img 
                src={postImage} 
                alt={post.title} 
                className="blog-featured-img"
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '380px',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Main Body & Sidebar Layout ── */}
      <section className="blog-body-section">
        <div className="container-fluid-px">
          <div className="blog-body-layout">
            
            {/* Left Content Area (Article Body) */}
            <div className="blog-main-column">
              
              {/* Lead Excerpt Box */}
              {post.excerpt && (
                <div className="blog-lead-box">
                  <p className="blog-lead-text">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Social Share Bar */}
              <div className="social-share-strip">
                <div className="share-label">
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>Share Article:</span>
                </div>

                <div className="share-buttons-group">
                  <button 
                    type="button" 
                    onClick={handleCopyLink}
                    className="share-btn"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <a 
                    href={`https://wa.me/?text=${postTitleEnc}%20${currentUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="share-btn share-wa"
                    title="Share on WhatsApp"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="share-btn share-li"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedinIn className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>

                  <a 
                    href={`https://twitter.com/intent/tweet?text=${postTitleEnc}&url=${currentUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="share-btn share-tw"
                    title="Share on X"
                  >
                    <FaTwitter className="w-3.5 h-3.5" />
                    <span>X</span>
                  </a>
                </div>
              </div>

              {/* Rich HTML Content Body */}
              <div 
                className="blog-rich-content"
                dangerouslySetInnerHTML={{ 
                  __html: post.content || '<p>Detailed article content coming soon.</p>' 
                }}
              />

              {/* Author Bio Box */}
              <div className="author-bio-card">
                <div className="author-bio-avatar">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div className="author-bio-info">
                  <span className="author-badge-label">Written by</span>
                  <h4 className="author-bio-name">{authorName}</h4>
                  <p className="author-bio-desc">
                    Senior Digital Strategist & Technology Architect at WebTycoons. Dedicated to building world-class web applications and high-conversion digital experiences.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Sticky Sidebar */}
            <aside className="blog-sidebar-column">
              <div className="sidebar-sticky-wrapper">
                
                {/* Related Articles Card */}
                <div className="sidebar-card">
                  <div className="sidebar-header-row">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <h3 className="sidebar-card-title">Related Insights</h3>
                  </div>

                  <div className="sidebar-related-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {relatedPosts.length > 0 ? (
                      relatedPosts.map((rPost) => (
                        <Link 
                          href={`/blog/${rPost.slug}`} 
                          key={rPost.id || rPost._id} 
                          className="sidebar-article-item group"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 10px',
                            borderRadius: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            textDecoration: 'none',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <div 
                            style={{
                              width: '80px',
                              height: '60px',
                              minWidth: '80px',
                              maxWidth: '80px',
                              minHeight: '60px',
                              maxHeight: '60px',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              backgroundColor: '#000000',
                              flexShrink: 0
                            }}
                          >
                            <img 
                              src={rPost.image || rPost.coverImage || "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=200&auto=format&fit=crop"} 
                              alt={rPost.title} 
                              style={{
                                width: '100%',
                                height: '100%',
                                minHeight: '60px',
                                maxHeight: '60px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                display: 'block'
                              }} 
                              loading="lazy" 
                            />
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 
                              style={{
                                fontSize: '13px',
                                fontWeight: '700',
                                color: '#ffffff',
                                margin: '0 0 4px 0',
                                lineHeight: '1.35',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {rPost.title}
                            </h4>
                            {rPost.date && (
                              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '500' }}>
                                {rPost.date}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 py-3">No other articles in this category.</p>
                    )}
                  </div>
                </div>

                {/* Free Consultation Sticky Card */}
                <div className="sidebar-cta-card">
                  <div className="cta-icon-pill">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="sidebar-cta-heading">Ready to transform your web presence?</h4>
                  <p className="sidebar-cta-text">
                    Let's discuss your project goals with our senior engineering team.
                  </p>
                  <Link 
                    href="/contact" 
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      width: '100%',
                      padding: '10px 16px',
                      borderRadius: '100px',
                      backgroundColor: '#52a436',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 15px rgba(82, 164, 54, 0.4)',
                      transition: 'all 0.25s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>Book a Free Call</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── Bottom High-Conversion CTA Banner ── */}
      <section className="blog-bottom-cta-section">
        <div className="container-fluid-px">
          <div className="blog-cta-banner-box">
            <div className="cta-banner-glow" />
            <div className="cta-banner-content">
              <span className="cta-eyebrow-text">DISCUSS YOUR NEXT PROJECT</span>
              <h3 className="cta-headline-text">
                Build High-Performing Digital Products with <span className="text-emerald-400">WebTycoons</span>
              </h3>
              <p className="cta-sub-text">
                From bespoke design systems to complex full-stack web applications, we engineer solutions that scale.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
                <Link 
                  href="/contact" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '100px',
                    backgroundColor: '#52a436',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(82, 164, 54, 0.5)',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>Start Your Project</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Link>
                
                <Link 
                  href="/projects" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '12px 26px',
                    borderRadius: '100px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>View Our Portfolio</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scoped Premium CSS ── */}
      <style jsx>{`
        .blog-article-root {
          background-color: #070a06;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 80px;
          position: relative;
          overflow-x: hidden;
        }

        /* Reading Progress Bar */
        .reading-progress-bar-wrap {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(255, 255, 255, 0.05);
          z-index: 9999;
        }
        .reading-progress-bar-fill {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #52a436, #00ff88);
          box-shadow: 0 0 12px rgba(82, 164, 54, 0.9);
          transform-origin: 0% 50%;
        }

        /* Ambient Glows */
        .ambient-glows-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .ambient-glow-top {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(82, 164, 54, 0.08) 0%, transparent 70%);
          filter: blur(140px);
        }
        .ambient-glow-mid {
          position: absolute;
          top: 35%;
          right: -10%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(82, 164, 54, 0.06) 0%, transparent 70%);
          filter: blur(120px);
        }

        /* Top Nav Bar */
        .blog-top-bar {
          padding-top: 130px;
          padding-bottom: 20px;
          position: relative;
          z-index: 10;
        }
        .blog-top-bar-inner {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .blog-nav-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .blog-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.3);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .blog-back-btn:hover {
          background: #52a436;
          color: #ffffff;
          transform: translateX(-3px);
          box-shadow: 0 4px 15px rgba(82, 164, 54, 0.4);
        }
        .blog-breadcrumb-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }
        .blog-breadcrumb-pill a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .blog-breadcrumb-pill a:hover {
          color: #52a436;
        }
        .crumb-sep {
          color: rgba(255, 255, 255, 0.25);
          font-size: 11px;
        }
        .crumb-current {
          color: #ffffff;
          font-weight: 600;
          max-width: 240px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .blog-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.25);
          color: #52a436;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .cat-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #52a436;
          box-shadow: 0 0 8px #52a436;
        }

        /* Hero / Header Section */
        .blog-hero-section {
          padding-top: 10px;
          padding-bottom: 40px;
          position: relative;
          z-index: 10;
        }
        .blog-hero-wrapper {
          max-width: 1140px;
          margin: 0 auto;
        }
        .blog-hero-content {
          margin-bottom: 30px;
        }
        .blog-title-heading {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 20px;
        }
        .blog-meta-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
        }
        .author-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 12px 4px 4px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .author-avatar-circle {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #52a436;
          color: #ffffff;
          font-weight: 800;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .author-name-text {
          font-weight: 700;
          color: #ffffff;
          font-size: 13px;
        }
        .meta-separator {
          color: rgba(255, 255, 255, 0.2);
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Hero Featured Image */
        .blog-featured-image-box {
          width: 100%;
          max-height: 520px;
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          background: #0f1410;
        }
        .blog-featured-img {
          width: 100%;
          height: auto;
          max-height: 520px;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        /* Main Body & Sidebar Grid */
        .blog-body-section {
          padding-bottom: 60px;
          position: relative;
          z-index: 10;
        }
        .blog-body-layout {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 992px) {
          .blog-body-layout {
            grid-template-columns: 1fr 340px;
            gap: 50px;
          }
        }

        /* Lead Excerpt Box */
        .blog-lead-box {
          background: rgba(82, 164, 54, 0.05);
          border-left: 3px solid #52a436;
          border-radius: 0 16px 16px 0;
          padding: 20px 24px;
          margin-bottom: 30px;
        }
        .blog-lead-text {
          font-size: clamp(16px, 1.8vw, 18px);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          margin: 0;
        }

        /* Social Share Strip */
        .social-share-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          padding: 14px 20px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          margin-bottom: 36px;
        }
        .share-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
        }
        .share-buttons-group {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .share-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .share-btn:hover {
          background: rgba(82, 164, 54, 0.15);
          border-color: #52a436;
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Rich Article Content */
        .blog-rich-content {
          font-size: 17px;
          line-height: 1.85;
          color: rgba(255, 255, 255, 0.75);
        }
        .blog-rich-content :global(h2), .blog-rich-content :global(h3) {
          font-family: var(--font-heading, sans-serif);
          color: #ffffff;
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 800;
          margin-top: 40px;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .blog-rich-content :global(p) {
          margin-bottom: 24px;
        }
        .blog-rich-content :global(ul) {
          list-style: none;
          padding: 0;
          margin-bottom: 28px;
        }
        .blog-rich-content :global(li) {
          position: relative;
          padding-left: 26px;
          margin-bottom: 14px;
          font-size: 16px;
        }
        .blog-rich-content :global(li::before) {
          content: '→';
          position: absolute;
          left: 0;
          top: 0;
          color: #52a436;
          font-weight: 900;
        }
        .blog-rich-content :global(a) {
          color: #52a436;
          text-decoration: none;
          border-bottom: 1px solid rgba(82, 164, 54, 0.3);
          transition: border-color 0.2s;
        }
        .blog-rich-content :global(a:hover) {
          border-bottom-color: #52a436;
        }
        .blog-rich-content :global(img) {
          max-width: 100%;
          height: auto;
          border-radius: 16px;
          margin: 30px 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .blog-rich-content :global(blockquote) {
          border-left: 3px solid #52a436;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 0 16px 16px 0;
          padding: 20px 24px;
          margin: 30px 0;
          font-style: italic;
          color: #ffffff;
        }

        /* Author Bio Card */
        .author-bio-card {
          margin-top: 50px;
          padding: 28px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }
        .author-bio-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #52a436, #00ff88);
          color: #000000;
          font-size: 24px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          shrink-0;
          box-shadow: 0 6px 20px rgba(82, 164, 54, 0.3);
        }
        .author-bio-info {
          flex: 1;
        }
        .author-badge-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #52a436;
          font-weight: 800;
          display: block;
          margin-bottom: 4px;
        }
        .author-bio-name {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 8px 0;
        }
        .author-bio-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          margin: 0;
        }

        /* Sidebar Elements */
        .sidebar-sticky-wrapper {
          position: sticky;
          top: 130px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .sidebar-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
        }
        .sidebar-header-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 16px;
        }
        .sidebar-card-title {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #ffffff;
          margin: 0;
        }
        .sidebar-related-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sidebar-article-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .sidebar-article-item:hover {
          background: rgba(82, 164, 54, 0.1);
          border-color: rgba(82, 164, 54, 0.3);
          transform: translateX(4px);
        }
        .sidebar-thumb-wrap {
          width: 60px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          background: #000;
          shrink-0;
        }
        .sidebar-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sidebar-info-wrap {
          flex: 1;
          min-width: 0;
        }
        .sidebar-post-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 4px 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .sidebar-post-date {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        /* Sidebar CTA Card */
        .sidebar-cta-card {
          background: linear-gradient(135deg, rgba(82, 164, 54, 0.15) 0%, rgba(10, 16, 10, 0.8) 100%);
          border: 1px solid rgba(82, 164, 54, 0.3);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
        }
        .cta-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(82, 164, 54, 0.2);
          border: 1px solid rgba(82, 164, 54, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px auto;
        }
        .sidebar-cta-heading {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.35;
          margin: 0 0 8px 0;
        }
        .sidebar-cta-text {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          margin: 0 0 16px 0;
        }
        .sidebar-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 10px 16px;
          border-radius: 100px;
          background: #52a436;
          color: #ffffff;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(82, 164, 54, 0.4);
          transition: all 0.25s ease;
        }
        .sidebar-cta-btn:hover {
          background: #448c2c;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(82, 164, 54, 0.6);
        }

        /* Bottom CTA Banner */
        .blog-bottom-cta-section {
          padding-top: 20px;
          position: relative;
          z-index: 10;
        }
        .blog-cta-banner-box {
          max-width: 1140px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(82, 164, 54, 0.1) 0%, rgba(15, 22, 15, 0.7) 100%);
          border: 1px solid rgba(82, 164, 54, 0.25);
          border-radius: 28px;
          padding: clamp(30px, 4.5vw, 44px) clamp(20px, 4vw, 40px);
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }
        .cta-banner-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 450px;
          height: 250px;
          background: radial-gradient(circle, rgba(82, 164, 54, 0.25) 0%, transparent 70%);
          filter: blur(70px);
          pointer-events: none;
        }
        .cta-banner-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
        }
        .cta-eyebrow-text {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #52a436;
          display: block;
          margin-bottom: 12px;
        }
        .cta-headline-text {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(1.6rem, 3.2vw, 2.3rem);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          margin-bottom: 14px;
          color: #ffffff;
        }
        .cta-sub-text {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 24px;
        }
        .cta-action-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .cta-primary-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: 100px;
          background: #52a436;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(82, 164, 54, 0.5);
          transition: all 0.25s ease;
        }
        .cta-primary-pill:hover {
          background: #448c2c;
          box-shadow: 0 10px 25px rgba(82, 164, 54, 0.7);
          transform: translateY(-2px);
        }
        .cta-secondary-pill {
          display: inline-flex;
          align-items: center;
          padding: 12px 24px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .cta-secondary-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
      `}</style>
    </article>
  );
}
