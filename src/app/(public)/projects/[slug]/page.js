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
      title: `${item.metaTitle || item.title} | WebTycoons`,
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
  let item = await Portfolio.findOne({ slug: resolvedParams.slug, status: 'active' }).lean();
  
  // If not in DB, check if it's one of the placeholder featured projects
  if (!item) {
    const fallbackProjects = [
      {
        slug: 'elite-corporate-portal',
        title: 'Elite Corporate Portal',
        category: 'Corporate Website',
        shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting ',
        technologies: ['React', 'Next.js', 'Tailwind CSS'],
        image: '/assets/img/service/featured-projects.png',
      },
      {
        slug: 'luxury-retail-platform',
        title: 'Luxury Retail Platform',
        category: 'E-Commerce Website',
        shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
        technologies: ['Shopify Plus', 'React', 'GraphQL'],
        image: '/assets/img/service/featured-projects.png',
      },
      {
        slug: 'saas-launchpad',
        title: 'SaaS Launchpad',
        category: 'Landing Page',
        shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
        technologies: ['HTML/CSS', 'GSAP', 'Framer Motion'],
        image: '/assets/img/service/featured-projects.png',
      },
      {
        slug: 'fintech-dashboard',
        title: 'FinTech Dashboard',
        category: 'Custom Web Application',
        shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting Lorem Ipsum is simply dummy text of the printing and typesetting',
        technologies: ['Vue.js', 'Node.js', 'PostgreSQL'],
        image: '/assets/img/service/featured-projects.png',
      }
    ];
    item = fallbackProjects.find(p => p.slug === resolvedParams.slug);
  }

  if (!item) notFound();
  
  const project = JSON.parse(JSON.stringify(item));

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.shortDesc || project.description,
    "url": project.projectUrl || `https://thewebtycoons.com/projects/${project.slug}`,
    "image": project.image,
    "creator": { "@type": "Organization", "name": "WebTycoons" }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article style={{ 
        backgroundColor: '#0a0e08', 
        color: '#fff', 
        minHeight: '100vh', 
        paddingBottom: '100px',
        position: 'relative'
      }}>
        
        {/* Ambient Glows Container (prevents horizontal scroll without breaking sticky) */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(82, 164, 54, 0.08) 0%, transparent 70%)', filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        </div>

        {/* HERO SECTION */}
        <section className="fade-up" style={{ 
          paddingTop: '180px', 
          paddingBottom: '80px', 
          position: 'relative', 
          zIndex: 1,
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(82, 164, 54, 0.15) 0%, transparent 60%),
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px'
        }}>
          <div className="container-fluid-px">
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <div style={{ width: '40px', height: '2px', background: 'var(--clr-primary)' }}></div>
                <span style={{ color: 'var(--clr-primary)', fontWeight: 600, letterSpacing: '4px', textTransform: 'uppercase', fontSize: '13px' }}>
                  {project.category || 'Featured Case Study'}
                </span>
              </div>
              <h1 style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(3.5rem, 8vw, 3.5rem)', 
                fontWeight: 800, 
                lineHeight: 1.05, 
                letterSpacing: '-0.04em',
                marginBottom: '40px',
                textTransform: 'uppercase',
                textShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}>
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* METADATA GRID */}
        <section className="fade-up" style={{ position: 'relative', zIndex: 1, paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container-fluid-px">
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', 
              gap: '24px'
            }}>
              {project.clientName && (
                <div className="meta-card">
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Client</h4>
                  <p style={{ fontSize: '18px', fontWeight: 600 }}>{project.clientName}</p>
                </div>
              )}
              {project.category && (
                <div className="meta-card">
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Services</h4>
                  <p style={{ fontSize: '18px', fontWeight: 600 }}>{project.category}</p>
                </div>
              )}
              {project.technologies?.length > 0 && (
                <div className="meta-card" style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Tech Stack</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {project.technologies.slice(0,4).map(t => (
                      <span key={t} style={{ 
                        background: 'rgba(82, 164, 54, 0.1)', 
                        color: 'var(--clr-primary)', 
                        border: '1px solid rgba(82, 164, 54, 0.2)', 
                        borderRadius: '100px', 
                        padding: '6px 16px', 
                        fontSize: '13px', 
                        fontWeight: 600,
                        letterSpacing: '0.5px'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.projectUrl && (
                <div className="meta-card flex flex-col justify-center items-start">
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="live-site-link">
                    Visit Website 
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MAIN SHOWCASE IMAGE */}
        {project.image && (
          <section className="fade-up" style={{ padding: '0 0 60px', position: 'relative', zIndex: 2 }}>
            <div className="container-fluid-px">
              
              <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                background: project.themeColor || 'linear-gradient(135deg, #4b9aff, #2a75d3)',
                borderRadius: '16px',
                padding: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 24px) clamp(16px, 8vw, 90px)',
                position: 'relative',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
              }}>
                
                {/* Vertical Text */}
                <div className="hidden md:block" style={{
                  position: 'absolute',
                  left: '30px',
                  top: '50%',
                  transform: 'translateY(-50%) rotate(180deg)',
                  writingMode: 'vertical-rl',
                  color: project.themeTextColor || 'rgba(255,255,255,0.9)',
                  fontSize: '20px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}>
                  {project.title}
                </div>

                {/* The Image */}
                <div className="" style={{ 
                  width: '100%', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '-10px 10px 30px #00000026'
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'top' }} 
                  />
                </div>

              </div>
            </div>
          </section>
        )}

        {/* 2-COLUMN OVERVIEW & RICH TEXT */}
        {(project.shortDesc || project.description) && (
          <section className="fade-up" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
            
            {/* Section Ambient Glow */}
            <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(82, 164, 54, 0.04) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0, pointerEvents: 'none' }} />

            <div className="container-fluid-px">
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', 
                // gap: '100px',
                alignItems: 'start',
                position: 'relative',
                zIndex: 1
              }}>
                {/* Left Side: Sticky Title */}
                <div className="md:sticky md:top-[140px]">
                  
                  {/* Huge Ghost Typography Watermark */}
                  <div style={{ 
                    position: 'absolute', 
                    top: '-40px', 
                    left: '-20px', 
                    fontSize: 'clamp(3rem, 15vw, 12rem)', 
                    fontWeight: 900, 
                    color: 'transparent',
                    WebkitTextStroke: '2px rgba(255,255,255,0.03)',
                    zIndex: -1,
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                    fontFamily: 'var(--font-heading)',
                    lineHeight: 0.8,
                    letterSpacing: '-0.05em'
                  }}>
                    DETAILS
                  </div>
                  <div style={{ width: '60px', height: '3px', background: 'var(--clr-primary)', marginBottom: '30px' }}></div>
                  <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.05, marginBottom: '30px', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                    Project <br/><span style={{ color: 'var(--clr-primary)' }}>Overview</span>
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>Deep Dive into the Process</p>
                </div>

                {/* Right Side: Rich Text Content */}
                <div>
                  {project.shortDesc && (
                    <p style={{ 
                      fontSize: '26px', 
                      lineHeight: 1.6, 
                      color: '#fff', 
                      marginBottom: '50px', 
                      fontWeight: 400,
                      letterSpacing: '-0.01em'
                    }}>
                      {project.shortDesc}
                    </p>
                  )}
                  
                  {project.description && (
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
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FOOTER NAV */}
        <section style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <div className="container-fluid-px text-center">
            <Link href="/projects" className="premium-btn-v2">
              <span className="premium-btn-text">View All Work</span>
              <span className="premium-btn-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </section>

      </article>
      
      {/* Premium CSS Styling */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .meta-card {
          background: rgba(255,255,255,0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 32px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .meta-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(82, 164, 54, 0.4);
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(82, 164, 54, 0.1);
        }

        .live-site-link {
          display: inline-flex;
          align-items: center;
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .live-site-link:hover {
          color: var(--clr-primary);
        }

        .premium-btn-v2 {
          display: inline-flex;
          align-items: center;
          gap: 20px;
          padding: 12px 12px 12px 40px;
          background: rgba(82, 164, 54, 0.1);
          border: 1px solid rgba(82, 164, 54, 0.3);
          border-radius: 100px;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(82, 164, 54, 0.05);
        }
        .premium-btn-v2::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--clr-primary);
          z-index: 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-btn-v2:hover {
          box-shadow: 0 15px 30px rgba(82, 164, 54, 0.3);
          transform: translateY(-3px);
          border-color: var(--clr-primary);
        }
        .premium-btn-v2:hover::before {
          transform: scaleX(1);
        }
        .premium-btn-text, .premium-btn-icon {
          position: relative;
          z-index: 1;
        }
        .premium-btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: #fff;
          color: #000;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-btn-v2:hover .premium-btn-icon {
          transform: translateX(4px);
          background: #0a0e08;
          color: #fff;
        }

        .premium-rich-text {
          font-size: 18px;
          line-height: 1.9;
          color: rgba(255,255,255,0.7);
        }
        .premium-rich-text h2, .premium-rich-text h3 {
          font-family: var(--font-heading);
          color: #fff;
          font-size: 32px;
          margin-top: 40px;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .premium-rich-text p {
          margin-bottom: 24px;
        }
        .premium-rich-text ul {
          list-style: none;
          padding: 0;
          margin-bottom: 30px;
        }
        .premium-rich-text li {
          position: relative;
          padding-left: 30px;
          margin-bottom: 15px;
          font-size: 17px;
        }
        .premium-rich-text li::before {
          content: '→';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--clr-primary);
          font-weight: bold;
        }
        .premium-rich-text a {
          color: var(--clr-primary);
          text-decoration: none;
          border-bottom: 1px solid rgba(82, 164, 54, 0.3);
          transition: all 0.3s ease;
        }
        .premium-rich-text a:hover {
          border-bottom-color: var(--clr-primary);
        }
      `}} />
    </>
  );
}