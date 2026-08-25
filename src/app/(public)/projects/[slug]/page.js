import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { connectDB } from "../../../lib/config";
import Portfolio from "../../../models/Portfolio";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    await connectDB();
    const items = await Portfolio.find({ status: 'active' }).select('slug').lean();
    return items.map(item => ({ slug: item.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const item = await Portfolio.findOne({ slug: resolvedParams.slug, status: 'active' }).lean();
    if (!item) return { title: 'Project Not Found | WebTycoons' };
    
    return {
      title: `${item.metaTitle || item.title} | WebTycoons Case Study`,
      description: item.metaDescription || item.shortDesc || `View our ${item.category} project: ${item.title}`,
      alternates: { canonical: `https://thewebtycoons.com/projects/${item.slug}` },
      openGraph: {
        title: item.title,
        description: item.shortDesc,
        images: item.image ? [{ url: item.image, width: 1200, height: 630 }] : [],
      },
    };
  } catch {
    return { title: 'Project | WebTycoons' };
  }
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  await connectDB();
  
  // Fetch active projects for navigation & current item
  let allProjects = [];
  try {
    allProjects = await Portfolio.find({ status: 'active' })
      .sort({ sort: 1, createdAt: -1 })
      .select('title slug category image shortDesc themeColor themeTextColor')
      .lean();
  } catch (err) {
    allProjects = [];
  }

  let item = allProjects.find(p => p.slug === resolvedParams.slug);

  // If not in DB, check fallback demo projects
  const fallbackProjects = [
    {
      slug: 'elite-corporate-portal',
      title: 'Elite Corporate Portal',
      category: 'Corporate Website',
      shortDesc: 'A high-performance corporate portal built for enterprise scalability, featuring ultra-fast page transitions, dynamic CMS content, and interactive GSAP animations.',
      description: '<h3>The Challenge</h3><p>The client needed a modern, resilient corporate platform to replace their legacy portal. The goal was to drastically improve performance scores, modernize their digital brand identity, and provide a frictionless content management workflow.</p><h3>Our Solution</h3><p>We engineered a cutting-edge Next.js application integrated with a streamlined dashboard, custom animations, and responsive micro-interactions. The result is a stunning 99+ Lighthouse performance score and enhanced user engagement across all global offices.</p>',
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      image: '/assets/img/service/featured-projects.png',
      clientName: 'Elite Corp Global',
      projectUrl: 'https://thewebtycoons.com',
      themeColor: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)',
      themeTextColor: '#000000'
    },
    {
      slug: 'luxury-retail-platform',
      title: 'Luxury Retail Platform',
      category: 'E-Commerce Website',
      shortDesc: 'An immersive digital storefront for high-end luxury goods with dynamic product customization, seamless checkout, and rich visual storytelling.',
      description: '<h3>The Challenge</h3><p>Deliver an editorial-quality shopping experience that matches the exclusivity and aesthetic prestige of in-store luxury shopping.</p><h3>Our Solution</h3><p>Custom e-commerce frontend architecture with headless checkout, lightning-fast product filtering, and fluid image zoom galleries.</p>',
      technologies: ['Shopify Plus', 'React', 'GraphQL', 'Tailwind CSS'],
      image: '/assets/img/service/featured-projects.png',
      clientName: 'Maison Luxe',
      projectUrl: 'https://thewebtycoons.com',
      themeColor: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      themeTextColor: '#ffffff'
    },
    {
      slug: 'saas-launchpad',
      title: 'SaaS Launchpad',
      category: 'Landing Page',
      shortDesc: 'High-conversion marketing landing page with interactive pricing calculators, live product tour walkthroughs, and custom 3D web graphics.',
      description: '<h3>The Challenge</h3><p>Accelerate customer acquisition with a modern, authoritative landing experience that clearly demonstrates SaaS software capabilities.</p><h3>Our Solution</h3><p>Engineered interactive component showcases with Framer Motion animations and direct CRM lead capture integrations.</p>',
      technologies: ['Next.js', 'GSAP', 'Framer Motion', 'TypeScript'],
      image: '/assets/img/service/featured-projects.png',
      clientName: 'Launchpad Inc',
      projectUrl: 'https://thewebtycoons.com',
      themeColor: 'linear-gradient(135deg, #00ff88 0%, #00b4d8 100%)',
      themeTextColor: '#0f172a'
    },
    {
      slug: 'fintech-dashboard',
      title: 'FinTech Dashboard',
      category: 'Custom Web Application',
      shortDesc: 'A powerful real-time analytics and portfolio management interface designed for institutional wealth managers and active investors.',
      description: '<h3>The Challenge</h3><p>Process and visualize real-time market data streams with sub-second latency while keeping the interface intuitive and responsive.</p><h3>Our Solution</h3><p>Modular dashboard components with real-time websocket updates, SVG financial charts, and dark-mode first design system.</p>',
      technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Chart.js'],
      image: '/assets/img/service/featured-projects.png',
      clientName: 'Apex Wealth',
      projectUrl: 'https://thewebtycoons.com',
      themeColor: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      themeTextColor: '#ffffff'
    }
  ];

  if (!item) {
    item = fallbackProjects.find(p => p.slug === resolvedParams.slug);
    if (allProjects.length === 0) {
      allProjects = fallbackProjects;
    }
  }

  if (!item) notFound();
  
  const project = JSON.parse(JSON.stringify(item));

  // Determine Next & Previous Projects
  const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : (allProjects.length > 1 ? allProjects[allProjects.length - 1] : null);
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : (allProjects.length > 1 ? allProjects[0] : null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.shortDesc || project.description,
    "url": project.projectUrl || `https://thewebtycoons.com/projects/${project.slug}`,
    "image": project.image,
    "creator": { "@type": "Organization", "name": "WebTycoons" }
  };

  const currentThemeBg = project.themeColor || 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)';
  const currentThemeTextColor = project.themeTextColor || '#000000';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      
      <article className="project-detail-wrapper">
        {/* Ambient Glows */}
        <div className="ambient-container">
          <div className="glow-top-left" />
          <div className="glow-bottom-right" />
        </div>

        {/* TOP UNIFIED BREADCRUMB & NAVIGATION BAR */}
        <div className="top-nav-bar fade-up">
          <div className="container-fluid-px">
            <div className="top-nav-inner">
              
              {/* Back Button & Breadcrumbs Combined */}
              <div className="unified-nav-left">
                <Link href="/projects" className="back-btn-pill">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  <span>All Projects</span>
                </Link>

                <div className="breadcrumb-glass-pill">
                  <Link href="/">Home</Link>
                  <span className="crumb-sep">›</span>
                  <Link href="/projects">Projects</Link>
                  <span className="crumb-sep">›</span>
                  <span className="crumb-current">{project.title}</span>
                </div>
              </div>

              {/* Category Pill Tag on Right */}
              <div className="category-tag">
                <span className="status-dot"></span>
                <span>{project.category || 'Featured Project'}</span>
              </div>

            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <header className="project-hero-section fade-up">
          <div className="container-fluid-px">
            <div className="hero-content-box">
              {/* Main Title */}
              <h1 className="hero-project-title">
                {project.title}
              </h1>

              {/* Lead Summary */}
              {project.shortDesc && (
                <p className="hero-lead-text">
                  {project.shortDesc}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* QUICK SPECS / METADATA MATRIX */}
        <section className="specs-section fade-up">
          <div className="container-fluid-px">
            <div className="specs-grid">
              
              {/* Client Card */}
              <div className="spec-card">
                <div className="spec-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="spec-label">Client</h4>
                  <p className="spec-value">{project.clientName || 'Private Enterprise'}</p>
                </div>
              </div>

              {/* Services Card */}
              <div className="spec-card">
                <div className="spec-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="spec-label">Services</h4>
                  <p className="spec-value">{project.category || 'Digital Engineering'}</p>
                </div>
              </div>

              {/* Tech Stack Card */}
              {project.technologies?.length > 0 && (
                <div className="spec-card tech-spec-card">
                  <div className="spec-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                  <div className="tech-pills-wrapper">
                    <h4 className="spec-label">Technologies</h4>
                    <div className="tech-pills-list">
                      {project.technologies.map(t => (
                        <span key={t} className="tech-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Live Preview Button Card */}
              {project.projectUrl && (
                <div className="spec-card cta-spec-card">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="live-preview-btn">
                    <span>Visit Live Site</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </a>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* MAIN SHOWCASE STAGE (Refined & Proportional Browser Mockup) */}
        {project.image && (
          <section className="showcase-stage-section fade-up">
            <div className="container-fluid-px">
              <div 
                className="showcase-stage-outer"
                style={{ background: currentThemeBg }}
              >
                {/* Vertical Decorative Badge */}
                <div 
                  className="vertical-title-badge hidden md:block"
                  style={{ color: currentThemeTextColor }}
                >
                  {project.title}
                </div>

                {/* Modern macOS-Style Browser Frame */}
                <div className="browser-mockup-frame">
                  {/* Browser Header Bar */}
                  <div className="browser-header-bar">
                    <div className="browser-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>

                    {project.projectUrl ? (
                      <a 
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="browser-url-bar"
                        title={`Open ${project.projectUrl}`}
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="url-text">
                          {project.projectUrl.replace(/^https?:\/\//, '')}
                        </span>
                      </a>
                    ) : (
                      <div className="browser-url-bar">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lock-icon">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="url-text">
                          {`thewebtycoons.com/projects/${project.slug}`}
                        </span>
                      </div>
                    )}

                    <div className="browser-actions">
                      {project.projectUrl ? (
                        <a 
                          href={project.projectUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="action-pill"
                          style={{ textDecoration: 'none' }}
                        >
                          Live Preview
                        </a>
                      ) : (
                        <span className="action-pill">Live Preview</span>
                      )}
                    </div>
                  </div>

                  {/* Browser Screen / Image Display */}
                  <div className="browser-screen">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="browser-screen-img"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* 2-COLUMN PROJECT OVERVIEW & PROCESS */}
        <section className="overview-section fade-up">
          <div className="container-fluid-px">
            <div className="overview-layout-grid">
              
              {/* Left Column: Sticky Title & Key Takeaways */}
              <div className="overview-sidebar">
                <div className="sticky-sidebar-box">
                  <div className="watermark-details">PROJECT</div>
                  <div className="green-accent-bar" />
                  <h2 className="overview-heading">
                    Project <br />
                    <span className="accent-text">Overview</span>
                  </h2>
                  <p className="overview-subtext">The Challenge & Process</p>

                  {/* Quick Highlights Card */}
                  <div className="highlights-card">
                    <h5 className="highlights-title">Key Deliverables</h5>
                    <ul className="highlights-list">
                      <li>Bespoke Architecture & Design</li>
                      <li>Mobile-First Responsive Layout</li>
                      <li>High Performance Optimization</li>
                      <li>Interactive Motion & Micro-interactions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Rich Text */}
              <div className="overview-content">
                {project.description ? (
                  <div 
                    className="premium-rich-text"
                    dangerouslySetInnerHTML={{ 
                      __html: project.description
                        .replace(/style="[^"]*"/gi, '')
                        .replace(/class="[^"]*"/gi, '')
                        .replace(/color:[^;"]+;?/gi, '')
                        .replace(/background-color:[^;"]+;?/gi, '')
                    }} 
                  />
                ) : (
                  <div className="premium-rich-text">
                    <h3>The Vision</h3>
                    <p>{project.shortDesc || 'Comprehensive case study breakdown showcasing our end-to-end design, architecture, and deployment.'}</p>
                    <h3>Impact & Results</h3>
                    <p>Designed to deliver exceptional conversion rates, brand authority, and lightning-fast loading speeds across all device viewports.</p>
                  </div>
                )}

                {/* Action Row */}
                {project.projectUrl && (
                  <div className="overview-actions-row">
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="primary-glow-btn">
                      <span>Launch Live Website</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* REDESIGNED PREV / NEXT CASE STUDY NAVIGATION */}
        <section className="adjacent-projects-section fade-up">
          <div className="container-fluid-px">
            <div className="adjacent-nav-wrapper">
              
              {/* Previous Project Card */}
              {prevProject ? (
                <Link href={`/projects/${prevProject.slug}`} className="adjacent-card prev-card group">
                  <div className="adjacent-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </div>

                  {prevProject.image && (
                    <div className="adjacent-thumb">
                      <img src={prevProject.image} alt={prevProject.title} />
                    </div>
                  )}

                  <div className="adjacent-info">
                    <span className="adjacent-tag">Previous Project</span>
                    <h4 className="adjacent-title">{prevProject.title}</h4>
                    <span className="adjacent-category">{prevProject.category}</span>
                  </div>
                </Link>
              ) : <div />}

              {/* View All Projects Center Pill */}
              <Link href="/projects" className="view-all-center-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Browse All</span>
              </Link>

              {/* Next Project Card */}
              {nextProject ? (
                <Link href={`/projects/${nextProject.slug}`} className="adjacent-card next-card group">
                  <div className="adjacent-info text-right">
                    <span className="adjacent-tag">Next Project</span>
                    <h4 className="adjacent-title">{nextProject.title}</h4>
                    <span className="adjacent-category">{nextProject.category}</span>
                  </div>

                  {nextProject.image && (
                    <div className="adjacent-thumb">
                      <img src={nextProject.image} alt={nextProject.title} />
                    </div>
                  )}

                  <div className="adjacent-arrow">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              ) : <div />}

            </div>
          </div>
        </section>

        {/* REFINED BOTTOM CTA BANNER (Proportional & Elegant) */}
        <section className="project-cta-banner-section fade-up">
          <div className="container-fluid-px">
            <div className="cta-banner-box">
              <div className="cta-glow-effect" />
              <div className="cta-content">
                <span className="cta-eyebrow">READY TO SCALE YOUR BRAND?</span>
                <h3 className="cta-headline">
                  Let's Build Something <span className="accent-text">Extraordinary</span> Together.
                </h3>
                <p className="cta-description">
                  Have an ambitious project in mind? We design and engineer high-performance web experiences tailored for your business growth.
                </p>
                <div className="cta-buttons-row">
                  <Link href="/contact" className="cta-primary-btn">
                    <span>Start Your Project</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link href="/services" className="cta-secondary-btn">
                    Explore Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </article>

      {/* SCOPED PREMIUM CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --clr-primary: #52a436;
          --clr-primary-glow: rgba(82, 164, 54, 0.4);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .project-detail-wrapper {
          background-color: #070a06;
          color: #ffffff;
          min-height: 100vh;
          padding-bottom: 100px;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient Glows */
        .ambient-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .glow-top-left {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, rgba(82, 164, 54, 0.1) 0%, transparent 65%);
          filter: blur(140px);
        }
        .glow-bottom-right {
          position: absolute;
          bottom: 10%;
          right: -10%;
          width: 45vw;
          height: 45vw;
          background: radial-gradient(circle, rgba(82, 164, 54, 0.08) 0%, transparent 70%);
          filter: blur(120px);
        }

        /* Top Nav Bar - Unified Breadcrumb */
        .top-nav-bar {
          padding-top: 130px;
          padding-bottom: 20px;
          position: relative;
          z-index: 10;
        }
        .top-nav-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
        }
        .unified-nav-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .back-btn-pill {
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
        .back-btn-pill:hover {
          background: var(--clr-primary);
          color: #ffffff;
          transform: translateX(-3px);
          box-shadow: 0 4px 15px rgba(82, 164, 54, 0.4);
        }
        .breadcrumb-glass-pill {
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
        .breadcrumb-glass-pill a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .breadcrumb-glass-pill a:hover {
          color: var(--clr-primary);
        }
        .crumb-sep {
          color: rgba(255, 255, 255, 0.25);
          font-size: 11px;
        }
        .crumb-current {
          color: #ffffff;
          font-weight: 600;
          max-width: 220px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .category-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: 100px;
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.25);
          color: var(--clr-primary);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--clr-primary);
          box-shadow: 0 0 8px var(--clr-primary);
        }

        /* Hero Section */
        .project-hero-section {
          padding-top: 10px;
          padding-bottom: 40px;
          position: relative;
          z-index: 10;
        }
        .hero-content-box {
          max-width: 1100px;
          margin: 0 auto;
        }
        .hero-project-title {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 18px;
          color: #ffffff;
        }
        .hero-lead-text {
          font-size: clamp(1rem, 1.6vw, 1.2rem);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          max-width: 850px;
          font-weight: 400;
        }

        /* Specs Section */
        .specs-section {
          padding-bottom: 50px;
          position: relative;
          z-index: 10;
        }
        .specs-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        .spec-card {
          background: rgba(255, 255, 255, 0.025);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .spec-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(82, 164, 54, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
        }
        .spec-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.2);
          color: var(--clr-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          shrink-0;
        }
        .spec-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 4px;
          font-weight: 700;
        }
        .spec-value {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }
        .tech-spec-card {
          grid-column: span 1;
        }
        @media (min-width: 992px) {
          .tech-spec-card {
            grid-column: span 2;
          }
        }
        .tech-pills-wrapper {
          flex: 1;
        }
        .tech-pills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tech-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 600;
          color: #e2e8f0;
        }
        .cta-spec-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
        }
        .live-preview-btn {
          width: 100%;
          height: 100%;
          min-height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--clr-primary);
          color: #ffffff;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          box-shadow: 0 6px 20px -3px rgba(82, 164, 54, 0.5);
          transition: all 0.25s ease;
        }
        .live-preview-btn:hover {
          background: #448c2c;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(82, 164, 54, 0.7);
        }

        /* Showcase Stage - Refined & Balanced Dimensions */
        .showcase-stage-section {
          padding-bottom: 70px;
          position: relative;
          z-index: 10;
        }
        .showcase-stage-outer {
          max-width: 1050px;
          margin: 0 auto;
          border-radius: 24px;
          padding: clamp(14px, 2.5vw, 28px) clamp(14px, 2.5vw, 28px) clamp(14px, 2.5vw, 28px) clamp(14px, 4vw, 64px);
          position: relative;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .vertical-title-badge {
          position: absolute;
          left: 22px;
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          writing-mode: vertical-rl;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0.85;
        }
        .browser-mockup-frame {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #0f1410;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6);
        }
        .browser-header-bar {
          background: rgba(20, 26, 20, 0.95);
          backdrop-filter: blur(10px);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
        }
        .browser-dots {
          display: flex;
          align-items: center;
          gap: 7px;
          width: 70px;
          flex-shrink: 0;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }
        .browser-url-bar {
          flex: 1;
          min-width: 0;
          max-width: 440px;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
          padding: 5px 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 11px;
          font-family: monospace;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        a.browser-url-bar:hover {
          background: rgba(0, 0, 0, 0.6);
          border-color: rgba(82, 164, 54, 0.4);
          color: rgba(255, 255, 255, 0.9);
        }
        .lock-icon {
          color: var(--clr-primary);
          flex-shrink: 0;
        }
        .url-text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
          display: inline-block;
        }
        .browser-actions {
          width: 70px;
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
        }
        .action-pill {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--clr-primary);
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.2);
          padding: 2px 8px;
          border-radius: 4px;
          white-space: nowrap;
          transition: all 0.2s ease;
          display: inline-block;
        }
        a.action-pill:hover {
          background: rgba(82, 164, 54, 0.2);
          border-color: var(--clr-primary);
          color: #ffffff;
        }

        /* Responsive Mobile Styles for Showcase Stage & Browser Bar */
        @media (max-width: 768px) {
          .showcase-stage-section {
            padding-bottom: 45px;
          }
          .showcase-stage-outer {
            padding: 10px;
            border-radius: 18px;
          }
          .browser-mockup-frame {
            border-radius: 12px;
          }
          .browser-header-bar {
            padding: 8px 12px;
            gap: 8px;
          }
          .browser-dots {
            width: auto;
            gap: 5px;
          }
          .dot {
            width: 8px;
            height: 8px;
          }
          .browser-actions {
            width: auto;
          }
          .action-pill {
            font-size: 9px;
            padding: 2px 6px;
          }
          .browser-url-bar {
            padding: 4px 8px;
            font-size: 10.5px;
            gap: 5px;
            border-radius: 5px;
          }
        }

        @media (max-width: 540px) {
          .showcase-stage-section {
            padding-bottom: 35px;
          }
          .showcase-stage-outer {
            padding: 7px;
            border-radius: 14px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          }
          .browser-mockup-frame {
            border-radius: 10px;
          }
          .browser-header-bar {
            padding: 6px 8px;
            gap: 6px;
          }
          .browser-dots {
            gap: 4px;
          }
          .dot {
            width: 7px;
            height: 7px;
          }
          .browser-actions {
            display: none;
          }
          .browser-url-bar {
            padding: 3.5px 6px;
            font-size: 9.5px;
            gap: 4px;
            max-width: 100%;
          }
          .lock-icon {
            width: 9px;
            height: 9px;
          }
        }
        .browser-screen {
          width: 100%;
          max-height: 520px;
          background: #000;
          overflow: hidden;
          line-height: 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .browser-screen-img {
          width: 100%;
          height: auto;
          max-height: 520px;
          display: block;
          object-fit: cover;
          object-position: top;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .browser-mockup-frame:hover .browser-screen-img {
          transform: scale(1.015);
        }

        /* Overview & Details Section */
        .overview-section {
          padding: 40px 0 70px;
          position: relative;
          z-index: 10;
        }
        .overview-layout-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 992px) {
          .overview-layout-grid {
            grid-template-columns: 340px 1fr;
            gap: 60px;
          }
        }
        .sticky-sidebar-box {
          position: relative;
        }
        @media (min-width: 992px) {
          .sticky-sidebar-box {
            position: sticky;
            top: 130px;
          }
        }
        .watermark-details {
          position: absolute;
          top: -30px;
          left: -10px;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.04);
          z-index: -1;
          pointer-events: none;
          font-family: var(--font-heading, sans-serif);
          line-height: 0.8;
          text-transform: uppercase;
        }
        .green-accent-bar {
          width: 44px;
          height: 3px;
          background: var(--clr-primary);
          margin-bottom: 20px;
        }
        .overview-heading {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .accent-text {
          color: var(--clr-primary);
        }
        .overview-subtext {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 24px;
          font-weight: 600;
        }
        .highlights-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          margin-top: 24px;
        }
        .highlights-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--clr-primary);
          font-weight: 800;
          margin-bottom: 14px;
        }
        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .highlights-list li {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.75);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .highlights-list li::before {
          content: '✓';
          color: var(--clr-primary);
          font-weight: 900;
        }

        /* Rich Text Styling */
        .premium-rich-text {
          font-size: 16px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
        }
        .premium-rich-text h2, .premium-rich-text h3 {
          font-family: var(--font-heading, sans-serif);
          color: #ffffff;
          font-size: clamp(20px, 2.5vw, 26px);
          margin-top: 32px;
          margin-bottom: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .premium-rich-text h2:first-child, .premium-rich-text h3:first-child {
          margin-top: 0;
        }
        .premium-rich-text p {
          margin-bottom: 20px;
        }
        .premium-rich-text ul {
          list-style: none;
          padding: 0;
          margin-bottom: 24px;
        }
        .premium-rich-text li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          font-size: 15px;
        }
        .premium-rich-text li::before {
          content: '→';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--clr-primary);
          font-weight: 900;
        }
        .premium-rich-text a {
          color: var(--clr-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(82, 164, 54, 0.3);
          transition: border-color 0.2s;
        }
        .premium-rich-text a:hover {
          border-bottom-color: var(--clr-primary);
        }
        .overview-actions-row {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .primary-glow-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 30px;
          border-radius: 100px;
          background: var(--clr-primary);
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          text-decoration: none;
          box-shadow: 0 8px 25px -4px rgba(82, 164, 54, 0.6);
          transition: all 0.3s ease;
        }
        .primary-glow-btn:hover {
          background: #448c2c;
          box-shadow: 0 12px 30px rgba(82, 164, 54, 0.8);
          transform: translateY(-2px);
        }

        /* Adjacent Projects Navigation (Redesigned with Thumbnails) */
        .adjacent-projects-section {
          padding: 30px 0 50px;
          position: relative;
          z-index: 10;
        }
        .adjacent-nav-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .adjacent-nav-wrapper {
            grid-template-columns: 1fr auto 1fr;
          }
        }
        .adjacent-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .adjacent-card:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(82, 164, 54, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
        }
        .adjacent-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--clr-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          shrink-0;
          transition: all 0.25s ease;
        }
        .adjacent-card:hover .adjacent-arrow {
          background: var(--clr-primary);
          color: #ffffff;
          transform: scale(1.08);
        }
        .adjacent-thumb {
          width: 52px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #000;
          shrink-0;
        }
        .adjacent-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .adjacent-info {
          flex: 1;
          min-width: 0;
        }
        .adjacent-tag {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: var(--clr-primary);
          display: block;
          margin-bottom: 3px;
        }
        .adjacent-title {
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 2px 0;
          line-height: 1.25;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .adjacent-category {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
        }
        .view-all-center-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 0 auto;
          transition: all 0.25s ease;
          white-space: nowrap;
        }
        .view-all-center-pill:hover {
          background: rgba(82, 164, 54, 0.15);
          border-color: var(--clr-primary);
          color: #ffffff;
          transform: translateY(-2px);
        }

        /* Proportional Bottom CTA Banner */
        .project-cta-banner-section {
          padding-top: 30px;
          position: relative;
          z-index: 10;
        }
        .cta-banner-box {
          max-width: 1050px;
          margin: 0 auto;
          background: linear-gradient(135deg, rgba(82, 164, 54, 0.1) 0%, rgba(15, 22, 15, 0.7) 100%);
          border: 1px solid rgba(82, 164, 54, 0.25);
          border-radius: 28px;
          padding: clamp(30px, 5vw, 48px) clamp(20px, 4vw, 40px);
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }
        .cta-glow-effect {
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
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 720px;
          margin: 0 auto;
        }
        .cta-eyebrow {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--clr-primary);
          display: block;
          margin-bottom: 12px;
        }
        .cta-headline {
          font-family: var(--font-heading, sans-serif);
          font-size: clamp(1.6rem, 3.2vw, 2.3rem);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -0.015em;
          text-transform: uppercase;
          margin-bottom: 16px;
          color: #ffffff;
        }
        .cta-description {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 28px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-buttons-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .cta-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 100px;
          background: var(--clr-primary);
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-decoration: none;
          box-shadow: 0 8px 25px -4px rgba(82, 164, 54, 0.6);
          transition: all 0.25s ease;
        }
        .cta-primary-btn:hover {
          background: #448c2c;
          box-shadow: 0 12px 30px rgba(82, 164, 54, 0.8);
          transform: translateY(-2px);
        }
        .cta-secondary-btn {
          display: inline-flex;
          align-items: center;
          padding: 14px 26px;
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
        .cta-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }
      `}} />
    </>
  );
}