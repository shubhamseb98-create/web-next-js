'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from 'next-themes';
import { Bell, LogOut, Settings, User as UserIcon, Sun, Moon, Menu, ExternalLink, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const BASE_URL = '';

export default function Topbar({ mobileMenuOpen, setMobileMenuOpen }) {
  const { user, logout, isSuperAdmin, hasModuleAccess } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [dropOpen, setDropOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    function handler(e) { if (menuRef.current && !menuRef.current.contains(e.target)) setDropOpen(false); }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const [newEnquiriesCount, setNewEnquiriesCount] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/api/enquiries`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const newCount = data.filter(e => !e.isRead).length;
          setNewEnquiriesCount(newCount);
        }
      })
      .catch(console.error);

    const handleEnquiryRead = () => {
      setNewEnquiriesCount(prev => Math.max(0, prev - 1));
    };

    window.addEventListener('enquiryRead', handleEnquiryRead);
    return () => window.removeEventListener('enquiryRead', handleEnquiryRead);
  }, []);

  const displayName = user?.name || user?.email || 'Admin';
  const initials    = displayName.charAt(0).toUpperCase();
  const avatarSrc   = user?.avatar ? `${BASE_URL}${user.avatar}` : null;

  return (
    <header className="sticky top-0 z-40 h-16 bg-background border-b border-border flex items-center justify-between px-4 lg:px-8 transition-colors duration-200 shadow-xs shrink-0">
      <div className="flex items-center gap-3 lg:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="p-2 -ml-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center overflow-hidden relative">
            <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">The WebTycoons</span>
        </Link>
      </div>

      <div className="flex-1 hidden lg:block" />

      {/* Visit Website Button */}
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px',
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.15)',
          color: '#f8fafc',
          padding: '8px 16px',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.2s',
          cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}
        onMouseEnter={(e) => {
           e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
           e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        }}
        onMouseLeave={(e) => {
           e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
           e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }}
      >
        <ExternalLink style={{ width: '15px', height: '15px', strokeWidth: 2 }} />
        Visit Website
      </a>

      <div className="flex items-center gap-4" ref={menuRef} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-muted-foreground hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        )}

        {/* Notifications — only visible if user has enquiries module access */}
        {hasModuleAccess('enquiries') && (
          <Link href="/dashboard/enquiries" className="relative p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors flex items-center justify-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Bell className="w-5 h-5" />
            {newEnquiriesCount > 0 && (
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white shadow-sm border-2 border-background" style={{ position: 'absolute', top: '2px', right: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ef4444', color: 'white', fontSize: '9px', fontWeight: 'bold' }}>
                {newEnquiriesCount > 99 ? '99+' : newEnquiriesCount}
              </span>
            )}
          </Link>
        )}

        {/* User Menu */}
        <div className="relative">
          <button
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity focus:outline-none"
            onClick={() => setDropOpen(!dropOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', outline: 'none' }}
          >
            <div className="hidden sm:block text-right" style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.2, margin: 0 }}>{displayName}</p>
              <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', lineHeight: 1.2, margin: 0 }}>{user?.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#52a436', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold', border: '2px solid var(--background)', overflow: 'hidden', flexShrink: 0 }}>
              {avatarSrc ? (
                <img src={avatarSrc} alt={displayName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                initials
              )}
            </div>
          </button>

          <AnimatePresence>
            {dropOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-60 bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col z-50 origin-top-right"
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#52a436] flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setDropOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    Settings
                  </Link>
                  {isSuperAdmin && isSuperAdmin() && (
                    <>
                      <Link
                        href="/dashboard/users"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-muted-foreground" />
                        Manage Users
                      </Link>
                      <Link
                        href="/dashboard/profile/api-keys"
                        onClick={() => setDropOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        <Key className="w-4 h-4 text-muted-foreground" />
                        Manage API Keys
                      </Link>
                    </>
                  )}
                </div>

                <div className="py-1 border-t border-border">
                  <button
                    onClick={() => { setDropOpen(false); logout(); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

