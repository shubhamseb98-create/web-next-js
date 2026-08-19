import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa'
import styles from './BlogDetailsPage.module.css'
import { fadeUp } from '../animations/variants'

// Reusing same blogs data for demonstration
const blogs = [
  {
    id: 1, slug: 'why-static-websites-are-making-a-comeback',
    category: 'Web Development',
    title: 'Why Static Websites Are Making a Massive Comeback in 2025',
    content: `
      Cloud Security Posture Management (CSPM) is a category of security solutions designed to enhance the security of cloud environments by identifying and mitigating risks associated with cloud misconfigurations, compliance violations.
      
      Ransomware attacks have become more targeted, focusing on critical infrastructure and large corporations. Attackers now use double extortion, demanding payment not only for decrypting files but also for not leaking sensitive data.
      
      SaaS platforms are increasingly popular among cybercriminals, enabling even non-technical individuals to launch ransomware attacks. APTs involve sophisticated, long-term attacks aimed at compromising systems and stealing information without immediate detection.
      
      Cybercriminals are leveraging artificial intelligence to develop smarter malware and conduct social engineering attacks. More convincing phishing emails, automated brute force attacks, and adaptive threats.
      
      A child's environment plays a crucial role in their development and happiness. That's why Dash provides a range of decor items that transform any room into a wonderland. Our collection includes whimsical wall decals, cozy rugs, and charming furniture pieces that add a touch of magic to any space. Designed to stimulate imagination and provide comfort, our decor items are perfect and joyful environment for kids.
    `,
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    author: 'Santosh Kumar', date: '21 Jun, 2025', readTime: '5 min read', featured: true
  },
  {
    id: 2, slug: 'ecommerce-conversion-rate-optimization',
    category: 'E-Commerce',
    title: '10 Proven Tactics to Boost Your E-Commerce Conversion Rate in 2025',
    content: 'Most e-commerce stores lose 70%+ of potential sales at checkout. Here are 10 data-backed CRO strategies our team has implemented with proven results.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    author: 'Riya Sharma', date: '26 Jul, 2025', readTime: '7 min read', featured: true
  },
  {
    id: 3, slug: 'seo-mistakes-web-developers-make',
    category: 'SEO & Marketing',
    title: '7 Critical SEO Mistakes Web Developers Still Make (And How to Fix Them)',
    content: 'Great design means nothing if your website can\'t be found. We break down the most common technical SEO errors — from slow Core Web Vitals to broken structured data.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    author: 'Arjun Mehta', date: '26 Jul, 2025', readTime: '6 min read', featured: true
  }
]

const recentPosts = [
  {
    id: 1,
    title: 'Top Cybersecurity Trends to Watch in 2024',
    date: '21 Jun, 2025',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'AI in Cybersecurity: A Double-Edged Sword?',
    date: '26 Jul, 2025',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Creating Strong Passwords',
    date: '26 Jul, 2025',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200&auto=format&fit=crop'
  }
]

const BlogDetailsPage = () => {
  const { id } = useParams()
  
  // The 'id' param is actually the slug
  const blog = blogs.find(b => b.slug === id) || blogs[0]

  useEffect(() => {
    document.title = `${blog.title} | WebTycoons`
  }, [blog])

  // Split title into two halves for the two-color effect
  const titleWords = blog.title.split(' ')
  const middleIndex = Math.ceil(titleWords.length / 2)
  const titleFirstHalf = titleWords.slice(0, middleIndex).join(' ')
  const titleSecondHalf = titleWords.slice(middleIndex).join(' ')

  return (
    <div className={styles.pageWrapper}>
      
      {/* ── Hero Banner ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${blog.image})` }} />
        <div className="container-fluid-px">
          <motion.div
            className={styles.heroContent}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className={styles.categoryBadgeHero}>{blog.category}</span>
            <h1 className={styles.heroTitle}>
              {titleFirstHalf} <span className={styles.accentGreen}>{titleSecondHalf}</span>
            </h1>
            <div className={styles.heroMeta}>
              <span className={styles.metaAuthor}><FaUser /> {blog.author}</span>
              <span className={styles.metaDot}>•</span>
              <span><FaCalendarAlt /> {blog.date}</span>
              <span className={styles.metaDot}>•</span>
              <span>{blog.readTime || '5 min read'}</span>
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
                <div className={styles.content}>
                  {blog.content.split('\n').map((paragraph, index) => {
                    const text = paragraph.trim();
                    if (!text) return null;
                    return (
                      <p key={index} className={index === 0 ? styles.firstParagraph : ''}>
                        {index === 0 ? (
                          <>
                            <span className={styles.dropCap}>{text.charAt(0)}</span>
                            {text.slice(1)}
                          </>
                        ) : (
                          text
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            </article>

            {/* Sidebar (Right) */}
            <aside className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>Related Posts</h3>
              <div className={styles.recentPostsList}>
                {recentPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className={styles.recentPostItem}>
                    <img src={post.image} alt={post.title} className={styles.recentPostImage} />
                    <div className={styles.recentPostContent}>
                      <h4 className={styles.recentPostTitle}>{post.title}</h4>
                      <div className={styles.recentPostDate}>
                        {post.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>

          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default BlogDetailsPage
