import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ title, subtitle, crumbs = [], items = [], rightElement }) {
  // Support either crumbs or items array
  const breadcrumbList = crumbs.length > 0 ? crumbs : items.filter(x => x.label !== 'Dashboard');
  const displayTitle = title || (breadcrumbList[breadcrumbList.length - 1]?.label) || 'Management';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', padding: '16px 0', borderBottom: '1px solid #1e2e20' }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: 0, letterSpacing: '-0.02em' }}>{displayTitle}</h1>
        {subtitle && (
          <p style={{ fontSize: '12.5px', color: '#94a3b8', margin: '3px 0 0 0' }}>{subtitle}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
            <Home style={{ width: '14px', height: '14px' }} />
            Home
          </Link>
          {breadcrumbList.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ChevronRight style={{ width: '14px', height: '14px', color: '#64748b' }} />
              {c.href ? (
                <Link href={c.href} style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
                  {c.label}
                </Link>
              ) : (
                <span style={{ color: 'white', fontWeight: 600 }}>{c.label}</span>
              )}
            </div>
          ))}
        </nav>
        {rightElement && <div>{rightElement}</div>}
      </div>
    </div>
  );
}
