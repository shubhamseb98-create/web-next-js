'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';
import { AuthProvider, useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/dashboard/Sidebar';
import Topbar from '../../components/dashboard/Topbar';
import "../../components/dashboard/dashboard.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ThemeProvider } from '../../components/dashboard/ThemeProvider';

const ROUTE_PERMISSION_MAP = [
  { prefix: '/dashboard/real-estate', permission: 'real_estate' },
  { prefix: '/dashboard/services', permission: 'services' },
  { prefix: '/dashboard/portfolio', permission: 'portfolio' },
  { prefix: '/dashboard/blogs', permission: 'blogs' },
  { prefix: '/dashboard/about-page', permission: ['about', 'inner_pages'] },
  { prefix: '/dashboard/contact', permission: 'contact_cms' },
  { prefix: '/dashboard/inner-pages', permission: 'inner_pages' },
  { prefix: '/dashboard/custom-pages', permission: 'inner_pages' },
  { prefix: '/dashboard/products', permission: 'products' },
  { prefix: '/dashboard/categories', permission: ['products', 'categories'] },
  { prefix: '/dashboard/enquiries', permission: 'enquiries' },
  { prefix: '/dashboard/email-templates', permission: 'email_templates' },
  { prefix: '/dashboard/files', permission: 'file_manager' },
  { prefix: '/dashboard/settings', permission: 'global_settings' },
  { prefix: '/dashboard/advanced/ai', permission: 'ai_features' },
  { prefix: '/dashboard/clients', permission: ['clients', 'home'] },
  { prefix: '/dashboard/achievements', permission: ['achievements', 'home'] },
  { prefix: '/dashboard/technologies', permission: ['technologies', 'home'] },
  { prefix: '/dashboard/team', permission: ['team', 'home'] },
  { prefix: '/dashboard/testimonials', permission: ['testimonials', 'home'] },
  { prefix: '/dashboard/certifications', permission: ['certifications', 'home'] },
  { prefix: '/dashboard/home', permission: 'home' },
  { prefix: '/dashboard/users', superAdminOnly: true },
  { prefix: '/dashboard/security', superAdminOnly: true },
  { prefix: '/dashboard/advanced', superAdminOnly: true },
  { prefix: '/dashboard/logs', superAdminOnly: true },
];

function DashboardGuard({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50">
        {/* Outer spinning ring */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-slate-700/50 border-t-[#22c55e] animate-spin" />
          <div className="absolute w-16 h-16 rounded-full border-4 border-slate-700/30 border-b-[#22c55e]/60 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          {/* Logo in center */}
          <div className="absolute w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden">
            <img src="/assets/img/logo-new.png" alt="WebTycoons" className="w-full h-full object-contain p-1" />
          </div>
        </div>
        {/* Brand text */}
        <div className="mt-8 text-center">
          <h2 className="text-white font-bold text-lg tracking-wide">WebTycoons</h2>
          <p className="text-slate-400 text-sm mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>
        {/* Loading dots */}
        <div className="flex gap-1.5 mt-6">
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#22c55e] animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return children;
}

function DashboardShell({ children }) {
  const { user, hasModuleAccess, isSuperAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current route is allowed for this user
  let isAllowed = true;
  if (user && !isSuperAdmin?.()) {
    for (const rule of ROUTE_PERMISSION_MAP) {
      if (pathname.startsWith(rule.prefix)) {
        if (rule.superAdminOnly) {
          isAllowed = false;
        } else if (rule.permission && !hasModuleAccess(rule.permission)) {
          isAllowed = false;
        }
        break;
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground font-inter antialiased transition-colors duration-200">
      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        <Topbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto">
          {isAllowed ? (
            children
          ) : (
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center mb-4 shadow-lg shadow-red-500/10">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Restricted</h2>
              <p className="text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
                You do not have permission to access this module. Please contact your administrator if you believe this is an error.
              </p>
              <Link
                href="/dashboard"
                className="px-6 py-2.5 bg-[#52a436] hover:bg-[#3e8027] text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-[#52a436]/20 inline-flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <DashboardGuard>
          <DashboardShell>
            {children}
          </DashboardShell>
        </DashboardGuard>
      </AuthProvider>
    </ThemeProvider>
  );
}
