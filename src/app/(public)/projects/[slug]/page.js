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
    const item = await Portfolio.findOne({ slug: params.slug, status: 'active' }).lean();
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
  await connectDB();
  const item = await Portfolio.findOne({ slug: params.slug, status: 'active' }).lean();
  
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
      <article className="project-detail">
        {/* Hero */}
        <section className="project-hero" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '120px 0 80px', color: 'white' }}>
          <div className="container-fluid-px">
            <div style={{ maxWidth: '800px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '2px', color: '#60a5fa', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                {project.category}
              </span>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px' }}>
                {project.title}
              </h1>
              {project.shortDesc && (
                <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '32px' }}>
                  {project.shortDesc}
                </p>
              )}
              {project.technologies?.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {project.technologies.map(t => (
                    <span key={t} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '6px', padding: '4px 12px', fontSize: '13px', fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Main Image */}
        {project.image && (
          <section style={{ background: '#f8fafc', padding: '60px 0' }}>
            <div className="container-fluid-px">
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', display: 'block', height: 'auto' }} loading="eager" />
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        {project.description && (
          <section style={{ padding: '80px 0' }}>
            <div className="container-fluid-px">
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div dangerouslySetInnerHTML={{ __html: project.description }} />
              </div>
            </div>
          </section>
        )}

        {/* Meta */}
        <section style={{ background: '#f8fafc', padding: '60px 0' }}>
          <div className="container-fluid-px">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', maxWidth: '800px', margin: '0 auto' }}>
              {project.clientName && (
                <div><strong style={{ display: 'block', color: '#64748b', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Client</strong>
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.clientName}</span></div>
              )}
              {project.category && (
                <div><strong style={{ display: 'block', color: '#64748b', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Category</strong>
                <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.category}</span></div>
              )}
              {project.projectUrl && (
                <div><strong style={{ display: 'block', color: '#64748b', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Live URL</strong>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontWeight: 600 }}>View Live →</a></div>
              )}
            </div>
          </div>
        </section>

        {/* Back link */}
        <section style={{ padding: '40px 0 80px' }}>
          <div className="container-fluid-px text-center">
            <Link href="/projects" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'none', fontSize: '1.05rem' }}>
              ← Back to All Projects
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}