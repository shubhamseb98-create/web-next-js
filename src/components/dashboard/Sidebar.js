'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  Home,
  FileText,
  Package,
  FileEdit,
  MessageSquare,
  Contact,
  Settings,
  Image as ImageIcon,
  Award,
  ShieldCheck,
  ChevronRight,
  Zap,
  Sparkles,
  Briefcase,
  Users,
  LogOut,
  ChevronDown,
  Building2
} from 'lucide-react';

/* ─── Navigation config ─────────────────────────────── */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', permission: null },
  {
    id: 'home', label: 'Home Management', icon: Home, permission: 'home',
    children: [
      { label: 'Banner Management', href: '/dashboard/home/banner' },
      { label: 'Home Page About',   href: '/dashboard/home/about' },
      { label: 'Call To Action',    href: '/dashboard/home/cta-one' },
      { label: 'Our Work',          href: '/dashboard/home/our-work' },

      { label: 'Heading Text',      href: '/dashboard/home/heading-text' },
      // { label: 'Certifications',    href: '/dashboard/home/certifications' },
      // { label: 'Something CTA',     href: '/dashboard/home/cta-two' },
      // { label: 'Homepage SEO',      href: '/dashboard/home/seo' },
      { label: 'Clients Management',  href: '/dashboard/clients' },
      { label: 'Achievements',        href: '/dashboard/achievements' },
      { label: 'Technologies',        href: '/dashboard/technologies' },
      { label: 'Team Management',     href: '/dashboard/team' },
      { label: 'Testimonials',        href: '/dashboard/testimonials' },
    ],
  },
  {
    id: 'about', label: 'About Management', icon: FileText, permission: 'about',
    children: [
      { label: 'About Breadcrumb',   href: '/dashboard/about-page/breadcrumb' },
      { label: 'About Us Content',   href: '/dashboard/about-page/content' },
      { label: 'Mission & Vision',   href: '/dashboard/about-page/mission' },
      { label: 'Stats & Timeline',   href: '/dashboard/about-page/stats-timeline' },
      { label: 'Call To Action',     href: '/dashboard/about-page/cta' },
    ],
  },
  {
    id: 'services', label: 'Services Management', icon: Briefcase, permission: 'services',
    children: [
      { label: 'All Services',       href: '/dashboard/services' },
      { label: 'Dynamic Website',    href: '/dashboard/services/dynamic-website-development' },
      { label: 'Ecommerce Website',  href: '/dashboard/services/e-commerce-website-development' },
      { label: 'Static Website',     href: '/dashboard/services/static-website-development' },
    ],
  },
  {
    id: 'real-estate',
    label: 'Real Estate Management',
    icon: Building2,
    permission: 'real_estate',
    children: [
      { label: 'Breadcrumb & Banner', href: '/dashboard/real-estate/breadcrumb' },
      { label: 'Overview & Pillars',   href: '/dashboard/real-estate/overview' },
      { label: 'Growth Verticals',     href: '/dashboard/real-estate/verticals' },
      { label: 'Track Record & Stats', href: '/dashboard/real-estate/track-record' },
      { label: '5-Stage Framework',    href: '/dashboard/real-estate/framework' },
      { label: 'Comparison Matrix',    href: '/dashboard/real-estate/comparison' },
      { label: 'Contact & Audit',      href: '/dashboard/real-estate/contact' },
      { label: 'FAQs Management',      href: '/dashboard/real-estate/faqs' },
    ],
  },
  { id: 'portfolio',     label: 'Portfolio Projects',    icon: Package,        permission: 'portfolio',      href: '/dashboard/portfolio' },
  { id: 'blogs',         label: 'Blogs Management',      icon: FileEdit,       permission: 'blogs',          href: '/dashboard/blogs' },
  { id: 'contact-cms',   label: 'Contact Page CMS',      icon: Contact,        permission: 'contact_cms',    href: '/dashboard/contact' },
  { id: 'inner-pages',   label: 'Inner Pages',          icon: FileText,       permission: 'inner_pages',    href: '/dashboard/inner-pages/sections' },
  { id: 'custom-pages',  label: 'Custom Pages',          icon: FileText,       permission: 'inner_pages',    href: '/dashboard/custom-pages' },
  { id: 'enquiries',     label: 'Enquiry Management',    icon: MessageSquare,  permission: 'enquiries',      href: '/dashboard/enquiries' },
  { id: 'email-templates',label: 'Email Templates',      icon: MessageSquare,  permission: 'email_templates',href: '/dashboard/email-templates' },
  { id: 'file-manager',  label: 'File Manager',          icon: FileText,       permission: 'file_manager',   href: '/dashboard/files' },
  {
    id: 'global-settings', label: 'Global Settings', icon: Settings, permission: 'global_settings',
    children: [
      { label: 'General Settings', href: '/dashboard/settings' },
      { label: 'Page Banners',     href: '/dashboard/settings/page-banners' },
    ],
  },
  { id: 'ai-features', label: 'AI Features', icon: Sparkles, permission: 'ai_features', href: '/dashboard/advanced/ai' },
];

const ADMIN_NAV = [
  { id: 'manage-users',     label: 'Manage Users',     icon: ShieldCheck, href: '/dashboard/users' },
  { id: 'security-settings',label: 'Security Settings',icon: ShieldCheck, href: '/dashboard/security' },
  {
    id: 'advanced', label: 'Advanced Features', icon: Zap,
    children: [
      { label: 'SEO Health Audit',    href: '/dashboard/advanced/seo-audit' },
      { label: 'Redirect Manager',    href: '/dashboard/advanced/redirects' },
      { label: 'Sitemap Manager',     href: '/dashboard/advanced/sitemap' },
      { label: 'Integrations & Code', href: '/dashboard/advanced/integrations' },
      { label: 'Performance Monitor', href: '/dashboard/advanced/performance' },
      { label: 'Error & 404 Monitor', href: '/dashboard/advanced/error-monitor' },
      { label: 'Activity Logs',       href: '/dashboard/logs' },
      { label: 'Cache Management',    href: '/dashboard/advanced/cache' },
      { label: 'Maintenance Mode',    href: '/dashboard/advanced/maintenance' },
      { label: 'Backup Management',   href: '/dashboard/advanced/backups' },
    ],
  },
];

function isRouteActive(currentPath, targetHref) {
  if (!currentPath || !targetHref) return false;
  const cleanCurrent = currentPath.replace(/\/$/, '');
  const cleanTarget = targetHref.replace(/\/$/, '');
  return cleanCurrent === cleanTarget;
}

function checkItemChildActive(item, currentPath) {
  if (!item.children || !Array.isArray(item.children)) return false;
  return item.children.some(child => {
    if (child.href && isRouteActive(currentPath, child.href)) return true;
    if (child.children && Array.isArray(child.children)) {
      return child.children.some(sub => sub.href && isRouteActive(currentPath, sub.href));
    }
    return false;
  });
}

/* ─── Reusable sub-item list ────────────────────────── */
function SubList({ items, pathname }) {
  return (
    <div className="space-y-1" style={{ padding: '4px 0' }}>
      {items.map((child) => {
        const active = isRouteActive(pathname, child.href);
        return (
          <Link
            key={child.href}
            href={child.href}
            className="flex items-center text-sm transition-all"
            style={{
              padding: '8px 16px',
              marginLeft: '28px',
              marginRight: '8px',
              borderRadius: '10px',
              backgroundColor: active ? 'rgba(82, 164, 54, 0.18)' : 'transparent',
              border: active ? '1px solid rgba(82, 164, 54, 0.35)' : '1px solid transparent',
              color: active ? '#ffffff' : '#94a3b8',
              fontWeight: active ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (!active) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!active) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            {child.label}
          </Link>
        );
      })}
    </div>
  );
}

/* ─── Nested (3-level) child ────────────────────────── */
function NestedNavChild({ child, pathname }) {
  const isActive = child.children?.some(c => isRouteActive(pathname, c.href));
  const [open, setOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-sm transition-colors"
        style={{
          padding: '8px 16px',
          marginLeft: '28px',
          marginRight: '8px',
          borderRadius: '10px',
          backgroundColor: isActive || open ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
          color: isActive || open ? '#ffffff' : '#94a3b8',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span>{child.label}</span>
        <ChevronRight className={cn('w-3.5 h-3.5 transition-transform duration-200', open && 'rotate-90')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <SubList items={child.children} pathname={pathname} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Single nav item ────────────────────────────────── */
function NavItem({ item, pathname, hasModuleAccess }) {
  const isChildActive = checkItemChildActive(item, pathname);
  const isActive = item.href ? isRouteActive(pathname, item.href) : false;
  const [open, setOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) setOpen(true);
  }, [isChildActive]);

  if (item.permission && !hasModuleAccess(item.permission)) return null;

  const hasChildren = !!(item.children?.length);
  const isItemActive = isActive || isChildActive;

  const activeStyle = {
    padding: '10px 16px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #52a436 0%, #3e8027 100%)',
    color: '#ffffff',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(82, 164, 54, 0.25)',
    border: 'none',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const inactiveStyle = {
    padding: '10px 16px',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    color: '#94a3b8',
    fontWeight: 500,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    transition: 'all 0.2s',
  };

  const innerContent = (
    <>
      <item.icon
        className="nav-item-icon w-5 h-5 shrink-0"
        style={{
          marginRight: '12px',
          color: isItemActive ? '#ffffff' : '#64748b',
          transition: 'margin 0.3s, color 0.2s',
        }}
      />
      <span
        className="nav-item-text flex-1 text-left whitespace-nowrap overflow-hidden transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:w-0 lg:group-hover:w-auto"
        style={{ color: isItemActive ? '#ffffff' : '#cbd5e1' }}
      >
        {item.label}
      </span>
      {hasChildren && (
        <ChevronRight
          className={cn(
            'nav-item-chevron w-4 h-4 shrink-0 transition-all duration-300',
            open && 'rotate-90',
            'opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:w-0 lg:group-hover:w-4'
          )}
          style={{ color: isItemActive ? '#ffffff' : '#64748b' }}
        />
      )}
    </>
  );

  return (
    <div>
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="nav-item-pill"
          style={isItemActive ? activeStyle : inactiveStyle}
          onMouseEnter={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
            }
          }}
        >
          {innerContent}
        </button>
      ) : (
        <Link
          href={item.href}
          className="nav-item-pill"
          style={isItemActive ? activeStyle : inactiveStyle}
          onMouseEnter={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#ffffff';
            }
          }}
          onMouseLeave={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
            }
          }}
        >
          {innerContent}
        </Link>
      )}

      <AnimatePresence initial={false}>
        {hasChildren && open && (
          <motion.div
            key="sub"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden lg:hidden lg:group-hover:block"
          >
            <div className="space-y-1" style={{ padding: '4px 0' }}>
              {item.children.map((child) => {
                if (child.children) {
                  return <NestedNavChild key={child.label} child={child} pathname={pathname} />;
                }
                const subActive = isRouteActive(pathname, child.href);
                return (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="flex items-center text-sm transition-all"
                    style={{
                      padding: '8px 16px',
                      marginLeft: '28px',
                      marginRight: '8px',
                      borderRadius: '10px',
                      backgroundColor: subActive ? 'rgba(82, 164, 54, 0.18)' : 'transparent',
                      border: subActive ? '1px solid rgba(82, 164, 54, 0.35)' : '1px solid transparent',
                      color: subActive ? '#ffffff' : '#94a3b8',
                      fontWeight: subActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!subActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!subActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                      }
                    }}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Sidebar root ──────────────────────────────────── */
export default function Sidebar({ mobileMenuOpen, setMobileMenuOpen }) {
  const pathname = usePathname();
  const { user, hasModuleAccess, isSuperAdmin } = useAuth();
  const [sections, setSections]             = useState([]);
  const [globalSettings, setGlobalSettings] = useState({});

  /* Fetch dynamic data */
  useEffect(() => {
    const fetchSections = () =>
      fetch('/api/sections')
        .then(r => r.json())
        .then(j => setSections(Array.isArray(j) ? j : (j.data ?? [])))
        .catch(() => {});
    fetchSections();
    window.addEventListener('sectionsUpdated', fetchSections);

    fetch('/api/global-settings')
      .then(r => r.json())
      .then(j => { if (j.data) setGlobalSettings(j.data); })
      .catch(() => {});

    return () => window.removeEventListener('sectionsUpdated', fetchSections);
  }, []);

  /* Auto-close on mobile nav */
  useEffect(() => { if (mobileMenuOpen) setMobileMenuOpen(false); }, [pathname]);

  /* Inject dynamic sections into inner-pages nav */
  const dynamicNav = NAV.map(item => {
    if (item.id !== 'inner-pages') return item;
    return {
      ...item,
      children: [
        { label: 'Manage Sections', href: '/dashboard/inner-pages/sections' },
        {
          label: 'Manage Pages',
          children: sections.map(sec => ({
            label: sec.name || sec.sectionName || 'Unnamed',
            href:  `/dashboard/inner-pages/${sec.slug}`,
          })),
        },
      ],
    };
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1024px) {
          aside.group:not(:hover) .nav-item-pill {
            padding: 10px !important;
            justify-content: center !important;
          }
          aside.group:not(:hover) .nav-item-icon {
            margin-right: 0 !important;
          }
          aside.group:not(:hover) .nav-item-text,
          aside.group:not(:hover) .nav-item-chevron {
            display: none !important;
          }
          aside.group:not(:hover) .logo-header {
            padding: 0 !important;
            justify-content: center !important;
          }
          aside.group:not(:hover) .logo-text {
            display: none !important;
          }
          aside.group:not(:hover) .user-footer {
            padding: 12px !important;
            justify-content: center !important;
          }
          aside.group:not(:hover) .user-info {
            display: none !important;
          }
          aside.group:not(:hover) .section-title {
            display: none !important;
          }
        }
      `}} />
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          /* structure */
          'group font-sans flex flex-col h-screen fixed lg:sticky top-0 z-50 overflow-x-hidden',
          /* colors */
          'border-r',
          /* slide */
          'transition-[width,transform] duration-300 ease-in-out',
          mobileMenuOpen ? 'w-72 translate-x-0' : '-translate-x-full lg:translate-x-0 w-72 lg:w-20 lg:hover:w-72',
        )}
        style={{ backgroundColor: '#080e06', borderColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        {/* ── Logo header ── */}
        <div className="logo-header h-24 flex items-center gap-3 px-5 lg:group-hover:px-6 shrink-0 mt-2 transition-all duration-300">
          <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center shadow overflow-hidden relative">
            <Image
              src={globalSettings.adminLogo || '/logo.png'}
              alt="Logo"
              fill
              className="object-contain p-1"
            />
          </div>
          <span className="logo-text font-bold text-base tracking-tight text-white transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
            {globalSettings.adminTitle || 'Jindal Metals'}
          </span>
        </div>

        {/* ── Scrollable nav ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 lg:group-hover:px-4 py-2 space-y-8 no-scrollbar transition-all duration-300">

          {/* Main menu */}
          <section>
            <p className="section-title text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4 overflow-hidden transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto">
              Main Menu
            </p>
            <nav className="space-y-1">
              {dynamicNav.map(item => (
                <NavItem
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  hasModuleAccess={hasModuleAccess}
                />
              ))}
            </nav>
          </section>

          {/* Admin section */}
          {isSuperAdmin?.() && (
            <section>
              <p className="section-title text-xs font-bold text-slate-500 uppercase tracking-widest px-2 mb-4 overflow-hidden transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:h-0 lg:group-hover:h-auto">
                Administration
              </p>
              <nav className="space-y-1">
                {ADMIN_NAV.map(item => (
                  <NavItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    hasModuleAccess={() => true}
                  />
                ))}
              </nav>
            </section>
          )}
        </div>

        {/* ── User footer ── */}
        <div className="shrink-0 border-t p-3" style={{ backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.05)' }}>
          <Link
            href="/dashboard/profile"
            className="user-footer flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.05] transition-colors"
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm border-[1.5px] border-green-600/50 overflow-hidden"
              style={{ background: 'linear-gradient(135deg,#52a436 0%,#3e8027 100%)' }}
            >
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                : (user?.name || 'A').charAt(0).toUpperCase()
              }
            </div>

            {/* Name + role */}
            <div className="user-info min-w-0 overflow-hidden transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:w-0 lg:group-hover:w-auto">
              <p className="text-[13px] font-semibold text-white truncate leading-tight">{user?.name || 'Admin'}</p>
              <p className="text-[11px] text-slate-400 truncate leading-tight mt-0.5">
                {user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
