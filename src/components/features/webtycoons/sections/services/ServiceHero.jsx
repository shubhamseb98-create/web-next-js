'use client';
import Link from 'next/link'
import PageHeader from 'src/components/layout/PageHeader'

const ServiceHero = ({ data, breadcrumbTitle }) => {
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
        <Link href="#quote" className="btnPrimary" style={{ padding: '7px 20px', fontSize: '0.88rem' }}>
          Get Free Quote
        </Link>
        <Link href="#portfolio" className="btnSecondary" style={{ padding: '7px 20px', fontSize: '0.88rem' }}>
          View Portfolio
        </Link>
      </div>
    </PageHeader>
  )
}

export default ServiceHero
