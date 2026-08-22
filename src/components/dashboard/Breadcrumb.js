import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ title, subtitle, crumbs = [], items = [], rightElement }) {
  // Support either crumbs or items array
  const breadcrumbList = crumbs.length > 0 ? crumbs : items.filter(x => x.label !== 'Dashboard');
  const displayTitle = title || (breadcrumbList[breadcrumbList.length - 1]?.label) || 'Management';

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '24px 32px', margin: '-32px -32px 32px -32px', borderTop: '1px solid rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
      <div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'white', margin: 0, letterSpacing: '-0.025em' }}>{displayTitle}</h1>
        {subtitle && (
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0 0' }}>{subtitle}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#94a3b8' }}>
          <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'white'} onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}>
            <Home style={{ width: '16px', height: '16px' }} />
            Home
          </Link>
          {breadcrumbList.map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ChevronRight style={{ width: '16px', height: '16px', color: '#64748b' }} />
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
