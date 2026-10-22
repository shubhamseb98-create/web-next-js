'use client';
import Link from 'next/link'
import PageHeader from 'src/components/layout/PageHeader'

const ServiceHero = ({ data, breadcrumbTitle }) => {
  const handleOpenQuoteModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-contact-modal', {
        detail: { service: data?.title || 'Web Development' }
      }));
    }
  };

  return (
    <PageHeader
      title={data.title}
      description={data.description}
      bgImage={data.image}
      breadcrumb={[
        { name: "Home", href: "/" },
        { name: "Services", href: "/#services" },
        { name: breadcrumbTitle || data.title }
      ]}
    >
      <div className="d-flex flex-wrap gap-2 mt-1">
        <button
          type="button"
          onClick={handleOpenQuoteModal}
          className="btnPrimary"
          style={{ padding: '7px 20px', fontSize: '0.88rem', border: 'none', cursor: 'pointer' }}
        >
          Get Free Quote
        </button>
        <Link href="/projects" className="btnSecondary" style={{ padding: '7px 20px', fontSize: '0.88rem' }}>
          View Projects
        </Link>
      </div>
    </PageHeader>
  )
}

export default ServiceHero
