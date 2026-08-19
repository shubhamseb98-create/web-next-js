import Link from "next/link";
import Image from "next/image";
import PopupCtaForm from "src/components/core/PopupCtaForm";

export default function BlogSidebar({ relatedPosts = [] }) {
  return (
    <div className="project-details-sidebar blog-sidebar-area">
      {/* Related Blogs Widget - Dynamically Rendered */}
      {relatedPosts.length > 0 && (
          <div className="single-widget mb-30">
            <h5 className="widget-title" style={{ marginBottom: '24px', fontSize: '20px', fontWeight: '700', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>Related Posts</h5>
            
            <style dangerouslySetInnerHTML={{__html: `
              .premium-related-post {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 12px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid rgba(255, 255, 255, 0.05);
                transition: all 0.3s ease;
                margin-bottom: 16px;
              }
              .premium-related-post:hover {
                background: rgba(255, 255, 255, 0.06);
                border-color: rgba(255, 255, 255, 0.15);
                transform: translateY(-2px);
              }
              .premium-related-img {
                flex-shrink: 0;
                width: 80px;
                height: 80px;
                border-radius: 8px;
                overflow: hidden;
                position: relative;
              }
              .premium-related-content {
                flex: 1;
                min-width: 0;
                display: flex;
                flex-direction: column;
                gap: 6px;
              }
              .premium-related-title {
                font-size: 14px;
                font-weight: 600;
                line-height: 1.4;
                color: #ffffff !important;
                margin: 0;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                transition: color 0.2s ease;
              }
              .premium-related-post:hover .premium-related-title {
                color: var(--primary-color1, #34d399) !important;
              }
              .premium-related-date {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: rgba(255, 255, 255, 0.5);
                font-weight: 500;
              }
            `}} />

            {relatedPosts.map((post) => {
              const dateObj = new Date(post.publishedAt || post.createdAt);
              const dateStr = isNaN(dateObj.getTime()) ? '' : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              return (
                <Link key={post.id || post._id} href={`/blog/${post.slug}`} className="premium-related-post" style={{ textDecoration: 'none' }}>
                  <div className="premium-related-img">
                    <Image
                      src={post.image || post.coverImage || '/placeholder.jpg'}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="premium-related-content">
                    <h6 className="premium-related-title">
                      {post.title}
                    </h6>
                    {dateStr && <span className="premium-related-date">{dateStr}</span>}
                  </div>
                </Link>
              );
            })}
          </div>
      )}

      {/* CTA Banner */}
      <div className="sidebar-banner position-relative">
        <Image
          src="/images/cta.jpg"
          alt="Contact Us"
          width={400}
          height={400}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />

        <div className="banner-content-wrap">
          <div className="banner-content">
            <h2>
              Ready to <span>work with us?</span>
            </h2>

            <PopupCtaForm
              buttonText="Know More"
              buttonClass="primary-btn1 white-bg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
