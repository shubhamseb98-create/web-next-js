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
      <article style={{ background: '#0a0e08', color: '#fff', minHeight: '100vh', paddingBottom: '100px' }}>
        
        {/* HERO SECTION */}
        <section style={{ paddingTop: '180px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
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
                fontSize: 'clamp(3rem, 7vw, 6.5rem)', 
                fontWeight: 800, 
                lineHeight: 1.05, 
                letterSpacing: '-0.03em',
                marginBottom: '40px',
                textTransform: 'uppercase'
              }}>
                {project.title}
              </h1>
            </div>
          </div>
        </section>

        {/* METADATA GRID */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="container-fluid-px">
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto', 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '40px',
              padding: '40px 0'
            }}>
              {project.clientName && (
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Client</h4>
                  <p style={{ fontSize: '18px', fontWeight: 600 }}>{project.clientName}</p>
                </div>
              )}
              {project.category && (
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Services</h4>
                  <p style={{ fontSize: '18px', fontWeight: 600 }}>{project.category}</p>
                </div>
              )}
              {project.technologies?.length > 0 && (
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Tech Stack</h4>
                  <p style={{ fontSize: '18px', fontWeight: 600 }}>{project.technologies.slice(0,3).join(', ')}</p>
                </div>
              )}
              {project.projectUrl && (
                <div>
                  <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>Live Site</h4>
                  <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '18px', fontWeight: 600, color: 'var(--clr-primary)', textDecoration: 'none' }}>Visit Website ↗</a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* MAIN SHOWCASE IMAGE */}
        {project.image && (
          <section style={{ padding: '60px 0' }}>
            <div className="container-fluid-px">
              <div style={{ maxWidth: '1400px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', maxHeight: '800px' }} 
                />
              </div>
            </div>
          </section>
        )}

        {/* 2-COLUMN OVERVIEW & RICH TEXT */}
        {(project.shortDesc || project.description) && (
          <section style={{ padding: '100px 0' }}>
            <div className="container-fluid-px">
              <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '80px',
                alignItems: 'start'
              }}>
                {/* Left Side: Sticky Title */}
                <div style={{ position: 'sticky', top: '120px' }}>
                  <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontFamily: 'var(--font-heading)', fontWeight: 800, lineHeight: 1.1, marginBottom: '30px' }}>
                    Project <br/><span style={{ color: 'var(--clr-primary)' }}>Overview</span>
                  </h2>
                  <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>

                {/* Right Side: Rich Text Content */}
                <div>
                  {project.shortDesc && (
                    <p style={{ fontSize: '22px', lineHeight: 1.6, color: '#fff', marginBottom: '40px', fontWeight: 300 }}>
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
        <section style={{ paddingTop: '80px' }}>
          <div className="container-fluid-px text-center">
            <Link href="/projects" className="premium-btn">
              View All Work
            </Link>
          </div>
        </section>

      </article>
      
      {/* Premium Rich Text Styling specific to this page */}
      <style dangerouslySetInnerHTML={{__html: `
        .premium-btn {
          display: inline-block;
          padding: 16px 40px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .premium-btn:hover {
          background: #fff;
          color: #000;
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