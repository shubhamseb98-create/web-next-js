'use client' 
import { useState, useEffect, useMemo } from 'react'
import Breadcrumb from '../../components/dashboard/Breadcrumb'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Calendar, LayoutTemplate, Box, Edit3, MessageSquare, Image as ImageIcon, Users, Star, Award, ArrowRight, Settings, Building, Globe, Plus, Search, Bell, Shield, Key, RefreshCw, ArrowDownUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function Clock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    function update() {
      const now = new Date()
      const t = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      const d = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
      setTime(`${t} | ${d}`)
    }
    update()
    const iv = setInterval(update, 1000)
    return () => clearInterval(iv)
  }, [])
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 w-fit">
      <Calendar className="w-4 h-4" />
      <span className="font-medium tracking-wide">{time}</span>
    </div>
  )
}

const STAT_CONFIG = {
  banners: { label: 'Banners', icon: LayoutTemplate, bgHex: '#C9CBF4' },
  products: { label: 'Products', icon: Box, bgHex: '#E4E7E9' },
  blogs: { label: 'Blogs', icon: Edit3, bgHex: '#F6D3DB' },
  enquiries: { label: 'Enquiries', icon: MessageSquare, bgHex: '#D9E8F5' },
  gallery: { label: 'Gallery', icon: ImageIcon, bgHex: '#FDF0D1' },
  users: { label: 'System Users', icon: Users, bgHex: '#D8F1DD' },
  whyChoose: { label: 'Why Choose', icon: Star, bgHex: '#FADEC9' },
  certifications: { label: 'Certifications', icon: Award, bgHex: '#EFE3F7' },
}

// Maps each dashboard page entry to the permission module required to access it.
// Pages with permission: null are always visible (e.g. dashboard overview).
const DASHBOARD_PAGES = [
  { name: 'Dashboard Overview',       href: '/dashboard',                          permission: null },
  { name: 'System Users',             href: '/dashboard/users',                    permission: 'users' },
  { name: 'Products Management',      href: '/dashboard/products',                 permission: 'products' },
  { name: 'Product Categories',       href: '/dashboard/products/categories',      permission: 'products' },
  { name: 'Product SEO',              href: '/dashboard/products/seo',             permission: 'products' },
  { name: 'Gallery',                  href: '/dashboard/gallery',                  permission: 'gallery' },
  { name: 'Portfolio',                href: '/dashboard/portfolio',                permission: 'portfolio' },
  { name: 'Services',                 href: '/dashboard/services',                 permission: 'services' },
  { name: 'Testimonials',             href: '/dashboard/testimonials',             permission: 'testimonials' },
  { name: 'Blogs',                    href: '/dashboard/blogs',                    permission: 'blogs' },
  { name: 'Enquiries',                href: '/dashboard/enquiries',                permission: 'enquiries' },
  { name: 'Certifications',           href: '/dashboard/certifications',           permission: 'certifications' },
  { name: 'Team / Board of Directors', href: '/dashboard/team',                   permission: 'team' },
  { name: 'Team Jobs',                href: '/dashboard/team/jobs',                permission: 'team' },
  { name: 'Global Settings',          href: '/dashboard/settings',                 permission: 'global_settings' },
  { name: 'Page Banners',             href: '/dashboard/settings/page-banners',   permission: 'global_settings' },
  { name: 'Home Banner',              href: '/dashboard/home/banner',              permission: 'home' },
  { name: 'Home About',               href: '/dashboard/home/about',               permission: 'home' },
  // { name: 'Home Why Choose',          href: '/dashboard/home/why-choose',          permission: 'home' }, // Hidden as requested
  { name: 'Home Our Work',            href: '/dashboard/home/our-work',            permission: 'home' },
  { name: 'Home Certifications',      href: '/dashboard/home/certifications',      permission: 'home' },
  { name: 'Home Heading Text',        href: '/dashboard/home/heading-text',        permission: 'home' },
  { name: 'Home CTA One',             href: '/dashboard/home/cta-one',             permission: 'home' },
  { name: 'Home CTA Two',             href: '/dashboard/home/cta-two',             permission: 'home' },
  { name: 'Home SEO',                 href: '/dashboard/home/seo',                 permission: 'home' },
  { name: 'Inner Page Sections',      href: '/dashboard/inner-pages/sections',     permission: 'inner_pages' },
  { name: 'Contact Page Management',  href: '/dashboard/contact',                  permission: 'contact_cms' },
]

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [recentEnquiries, setRecentEnquiries] = useState([])
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, hasModuleAccess } = useAuth()
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Filter pages by permission — mirrors the sidebar's hasModuleAccess check.
  // Pages with permission: null (e.g. dashboard root) are always shown.
  const accessiblePages = useMemo(() => {
    return DASHBOARD_PAGES.filter(p => p.permission === null || hasModuleAccess(p.permission))
  }, [user])

  const filteredPages = accessiblePages.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  async function fetchData() {
    setLoading(true)
    try {
      const minDelay = new Promise(resolve => setTimeout(resolve, 600))
      const [statsRes, healthRes, analyticsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/system/health'),
        fetch('/api/analytics/stats'),
        minDelay
      ])
      
      const statsData = await statsRes.json()
      if (statsData.success) {
        setStats(statsData.stats)
        setRecentEnquiries(statsData.recentEnquiries || [])
      }

      if (healthRes.ok) {
        const healthData = await healthRes.json()
        setHealth(healthData)
      }

      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json()
        setAnalytics(analyticsData)
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Determine permission count or super admin status
  const isSuperAdmin = user?.role === 'super_admin';
  const permissionCount = user?.permissions 
    ? Object.values(user.permissions).filter(actions => Array.isArray(actions) && actions.length > 0).length 
    : 0;

  return (
    <div className="min-h-full flex flex-col bg-background">
      
      <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1600px] w-full mx-auto">
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">Hello, {user?.name ? user.name.split(' ')[0] : 'Admin'}</h1>
                <Clock />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search style={{ width: '16px', height: '16px', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Search pages..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(true); }}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                  style={{
                    padding: '8px 16px 8px 40px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#f8fafc',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '999px',
                    fontSize: '14px',
                    width: '280px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                />
                {showSearch && searchQuery && (
                  <div className="absolute top-full mt-2 w-full bg-popover/90 backdrop-blur-2xl border border-border/50 rounded-xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto">
                    {filteredPages.length > 0 ? filteredPages.map(p => (
                      <Link href={p.href} key={p.href} className="block px-4 py-3 hover:bg-foreground/5 text-sm text-popover-foreground border-b border-border/50 last:border-0 font-medium transition-colors">
                        {p.name}
                      </Link>
                    )) : (
                      <div className="px-4 py-4 text-sm text-muted-foreground text-center">No matching pages found</div>
                    )}
                  </div>
                )}
              </div>
              <button 
                onClick={fetchData} 
                title="Refresh Dashboard"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' }}
              >
                <RefreshCw style={{ width: '18px', height: '18px', color: '#f8fafc' }} className={loading ? 'animate-spin' : ''} />
              </button>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8">
          
          {/* Main Left Column */}
          <div className="flex-1 space-y-8 overflow-hidden">
            
            {/* Real-time Analytics Section */}
            <div style={{ marginBottom: '48px' }}>
               <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '20px', letterSpacing: '-0.025em' }}>Real-time Analytics</h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                  {/* Visitors Today */}
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#E3F2FD', border: '0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1d4ed8' }}>
                           <Users className="w-4 h-4 shrink-0" />
                           <p className="font-semibold" style={{ fontSize: '13px', margin: 0 }}>Visitors Today</p>
                        </div>
                        {loading ? <div className="h-9 w-16 bg-black/10 rounded animate-pulse" style={{ marginTop: 'auto' }} /> : (
                           <h4 className="text-4xl font-bold leading-none" style={{ color: '#1e3a8a', marginTop: 'auto', marginBottom: 0 }}>{analytics?.visitorsToday?.toLocaleString() ?? 0}</h4>
                        )}
                     </div>
                  </div>

                  {/* Active Users */}
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#E8F5E9', border: '0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d' }}>
                           <span className="relative flex h-3 w-3 shrink-0">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                             <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
                           </span>
                           <p className="font-semibold" style={{ fontSize: '13px', margin: 0 }}>Active Users (5m)</p>
                        </div>
                        {loading ? <div className="h-9 w-16 bg-black/10 rounded animate-pulse" style={{ marginTop: 'auto' }} /> : (
                           <h4 className="text-4xl font-bold leading-none" style={{ color: '#14532d', marginTop: 'auto', marginBottom: 0 }}>{analytics?.activeUsers?.toLocaleString() ?? 0}</h4>
                        )}
                     </div>
                  </div>

                  {/* Page Views */}
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FFF3E0', border: '0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c2410c' }}>
                           <Globe className="w-4 h-4 shrink-0" />
                           <p className="font-semibold" style={{ fontSize: '13px', margin: 0 }}>Page Views</p>
                        </div>
                        {loading ? <div className="h-9 w-16 bg-black/10 rounded animate-pulse" style={{ marginTop: 'auto' }} /> : (
                           <h4 className="text-4xl font-bold leading-none" style={{ color: '#7c2d12', marginTop: 'auto', marginBottom: 0 }}>{analytics?.pageViews?.toLocaleString() ?? 0}</h4>
                        )}
                     </div>
                  </div>

                  {/* Bounce Rate */}
                  <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#FCE4EC', border: '0', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                     <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '110px', padding: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#be185d' }}>
                           <ArrowDownUp className="w-4 h-4 shrink-0" />
                           <p className="font-semibold" style={{ fontSize: '13px', margin: 0 }}>Bounce Rate</p>
                        </div>
                        {loading ? <div className="h-9 w-16 bg-black/10 rounded animate-pulse" style={{ marginTop: 'auto' }} /> : (
                           <h4 className="text-3xl font-bold leading-none" style={{ color: '#831843', marginTop: 'auto', marginBottom: 0 }}>{analytics?.bounceRate ?? 0}%</h4>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Quick Actions Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0, letterSpacing: '-0.025em' }}>Quick actions</h2>
              <button 
                title="Add Action"
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', 
                  cursor: 'pointer', transition: 'all 0.2s', outline: 'none' 
                }} 
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)' }} 
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)' }}
              >
                <Plus style={{ width: '16px', height: '16px', color: '#f1f5f9' }} />
              </button>
            </div>

            {/* Quick Action Users (Mocking the "Latest Transaction" avatars) */}
            {/* Only show quick-action cards for modules the user can access */}
            {(hasModuleAccess('global_settings') || hasModuleAccess('home') || hasModuleAccess('inner_pages')) && (
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '48px' }}>
               {[
                 hasModuleAccess('global_settings') && { name: 'Website Details', email: 'Manage SEO & Info', icon: Settings, link: '/dashboard/settings' },
                 hasModuleAccess('home') && { name: 'Home Content', email: 'Banners & CTAs', icon: LayoutTemplate, link: '/dashboard/home/banner' },
                 hasModuleAccess('inner_pages') && { name: 'Inner Pages', email: 'Corporate & Vision', icon: Building, link: '/dashboard/inner-pages/sections' },
               ].filter(Boolean).map((item, i) => (
                 <Link href={item.link} key={i} style={{ textDecoration: 'none' }}>
                   <div 
                     style={{ 
                       display: 'flex', 
                       alignItems: 'center', 
                       gap: '16px', 
                       padding: '16px 20px', 
                       borderRadius: '16px', 
                       backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                       backdropFilter: 'blur(16px)',
                       WebkitBackdropFilter: 'blur(16px)',
                       border: '1px solid rgba(255, 255, 255, 0.08)', 
                       boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.1)',
                       cursor: 'pointer', 
                       minWidth: '220px', 
                       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                     }} 
                     onMouseEnter={(e) => {
                       e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                       e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                       e.currentTarget.style.transform = 'translateY(-2px)';
                       e.currentTarget.style.boxShadow = '0 8px 32px -4px rgba(0, 0, 0, 0.2)';
                     }} 
                     onMouseLeave={(e) => {
                       e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                       e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.08)';
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = '0 4px 24px -4px rgba(0, 0, 0, 0.1)';
                     }}
                   >
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.05)', color: '#f1f5f9', flexShrink: 0 }}>
                       <item.icon style={{ width: '18px', height: '18px' }} />
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                       <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{item.name}</p>
                       <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8', lineHeight: 1.2 }}>{item.email}</p>
                     </div>
                   </div>
                 </Link>
               ))}
            </div>
            )}

            {/* System Content Metrics Section */}
            <div style={{ marginBottom: '48px' }}>
               <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '20px', letterSpacing: '-0.025em' }}>Content Metrics</h2>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                 {Object.keys(STAT_CONFIG).map((key, i) => {
                   const config = STAT_CONFIG[key]
                   const Icon = config.icon
                   const value = stats ? stats[key] : 0
                   return (
                     <div key={i} style={{ backgroundColor: config.bgHex, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                       <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Icon style={{ width: '20px', height: '20px', color: '#0f172a' }} />
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                         <p style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: 500, color: '#0f172a' }}>{config.label}</p>
                         {loading ? (
                           <div style={{ height: '28px', width: '48px', backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px' }} />
                         ) : (
                           <h4 style={{ margin: 0, fontSize: '28px', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{value.toLocaleString()}</h4>
                         )}
                       </div>
                     </div>
                   )
                 })}
               </div>
            </div>

            {/* Charts Section */}
            {!loading && analytics && (
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
                 
                 {/* Device Breakdown */}
                 <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                       <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Device Breakdown</h3>
                    </div>
                    <div style={{ padding: '24px', height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                       {analytics.devices?.length > 0 ? (
                         <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                             <Pie data={analytics.devices} innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" nameKey="name" stroke="none">
                               {analytics.devices.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                             </Pie>
                             <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', backgroundColor: '#18181b', color: 'white' }} itemStyle={{ color: 'white' }} />
                           </PieChart>
                         </ResponsiveContainer>
                       ) : <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>No data yet</p>}
                    </div>
                 </div>

                 {/* Top Browsers */}
                 <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                       <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Top Browsers</h3>
                    </div>
                    <div style={{ padding: '24px', height: '320px' }}>
                       {analytics.browsers?.length > 0 ? (
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={analytics.browsers} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                             <XAxis type="number" hide />
                             <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={70} stroke="#94a3b8" />
                             <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', backgroundColor: '#18181b', color: 'white' }} itemStyle={{ color: 'white' }} />
                             <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                           </BarChart>
                         </ResponsiveContainer>
                       ) : <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>No data yet</p>}
                    </div>
                 </div>

                 {/* Top Countries */}
                 <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                    <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                       <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: 'white' }}>Top Countries</h3>
                    </div>
                    <div style={{ padding: '24px', height: '320px' }}>
                       {analytics.countries?.length > 0 ? (
                         <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={analytics.countries}>
                             <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#94a3b8" />
                             <YAxis hide />
                             <RechartsTooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)', backgroundColor: '#18181b', color: 'white' }} itemStyle={{ color: 'white' }} />
                             <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                           </BarChart>
                         </ResponsiveContainer>
                       ) : <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0, display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>No data yet</p>}
                    </div>
                 </div>
               </div>
            )}

            {/* Top Pages & Recent Enquiries split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Quick Navigation Links — filtered by user permissions */}
               <div>
                 <h2 className="text-xl font-bold text-foreground mb-4">Navigation</h2>
                 <div className="flex flex-col space-y-1">
                   {[
                     hasModuleAccess('products')       && { label: 'Add New Product',       href: '/dashboard/products' },
                     hasModuleAccess('blogs')          && { label: 'Write Blog Post',        href: '/dashboard/blogs' },
                     hasModuleAccess('gallery')        && { label: 'Upload to Gallery',      href: '/dashboard/gallery' },
                     hasModuleAccess('home')           && { label: 'Edit Home Banner',       href: '/dashboard/home/banner' },
                     hasModuleAccess('certifications') && { label: 'Manage Certifications',  href: '/dashboard/certifications' },
                   ].filter(Boolean).map((link, i) => (
                     <Link key={i} href={link.href}>
                       <div 
                         style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '16px', cursor: 'pointer', transition: 'background-color 0.2s', border: 'none' }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                       >
                         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                             <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                 <Globe style={{ width: '16px', height: '16px', color: '#94a3b8' }} />
                             </div>
                             <span style={{ fontWeight: 'bold', fontSize: '15px', color: 'white' }}>{link.label}</span>
                         </div>
                         <ArrowRight style={{ width: '16px', height: '16px', color: '#64748b' }} />
                       </div>
                     </Link>
                   ))}
                   {/* Show a friendly message if no navigation items are accessible */}
                   {!hasModuleAccess('products') && !hasModuleAccess('blogs') && !hasModuleAccess('gallery') && !hasModuleAccess('home') && !hasModuleAccess('certifications') && (
                     <div className="text-center py-6 text-muted-foreground text-sm bg-muted/20 rounded-2xl border border-border">
                       No quick actions available for your access level.
                     </div>
                   )}
                 </div>
               </div>

               {/* Recent Enquiries */}
               <div>
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-bold text-foreground">Recent Enquiries</h2>
                   <Link href="/dashboard/enquiries">
                     <span className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">View All</span>
                   </Link>
                 </div>
                 
                 <div className="flex flex-col space-y-1">
                     {loading ? (
                         [...Array(5)].map((_, i) => (
                             <div key={i} className="flex items-center gap-4 py-3 border-b border-border">
                                 <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                                 <div className="flex-1">
                                   <div className="h-4 w-32 bg-muted rounded animate-pulse mb-1" />
                                   <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                                 </div>
                             </div>
                         ))
                     ) : recentEnquiries.length === 0 ? (
                         <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>No recent enquiries found.</div>
                     ) : (
                         recentEnquiries.map(enq => {
                           const initial = enq.contactPerson ? enq.contactPerson.charAt(0).toUpperCase() : 'U';
                           return (
                             <div 
                               key={enq._id} 
                               style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'background-color 0.2s' }} 
                               onClick={() => window.location.href = '/dashboard/enquiries'}
                               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                             >
                               <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                 <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', color: '#94a3b8' }}>
                                   {initial}
                                 </div>
                                 <div style={{ display: 'flex', flexDirection: 'column' }}>
                                   <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{enq.contactPerson}</h4>
                                   <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94a3b8' }}>{new Date(enq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                 </div>
                               </div>
                               <div style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: enq.status === 'new' ? 'rgba(249, 115, 22, 0.1)' : enq.status === 'replied' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.1)', color: enq.status === 'new' ? '#f97316' : enq.status === 'replied' ? '#22c55e' : '#94a3b8', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>
                                 {enq.status || 'new'}
                               </div>
                             </div>
                           )
                         })
                     )}
                 </div>
               </div>
            </div>



          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
             
             {/* Admin Status / Profile Card */}
             <div className="shadow-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                 <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: 'white', margin: 0 }}>Admin Profile</h3>
                 <Link href="/dashboard/settings">
                   <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                     <Settings style={{ width: '18px', height: '18px', color: '#94a3b8' }} />
                   </div>
                 </Link>
               </div>
               
               {/* Dark Card */}
               <div className="shadow-xl" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #18181b 0%, #09090b 100%)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', color: 'white' }}>
                 
                 {/* Credit Card Glow Effect */}
                 <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '160px', height: '160px', backgroundColor: 'rgba(255,255,255,0.1)', filter: 'blur(40px)', borderRadius: '50%', zIndex: 0 }} />

                 <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Shield style={{ width: '20px', height: '20px', color: '#cbd5e1', strokeWidth: 1.5 }} />
                     <span style={{ fontWeight: 600, letterSpacing: '0.025em', textTransform: 'capitalize', color: '#f1f5f9', margin: 0, fontSize: '15px' }}>{user?.role?.replace('_', ' ') || 'Super Admin'}</span>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center' }}>
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '50%', zIndex: 2 }} />
                     <div style={{ width: '20px', height: '20px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '50%', marginLeft: '-8px', zIndex: 1 }} />
                   </div>
                 </div>
                 
                 <div style={{ position: 'relative', zIndex: 10, marginBottom: '32px' }}>
                   <h2 style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '-0.025em', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Super Admin'}</h2>
                   <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || 'superadmin@jindalmetal.com'}</p>
                 </div>
                 
                 <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 500, margin: 0 }}>
                           <Key style={{ width: '14px', height: '14px' }} /> Access Level
                        </span>
                        <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold', margin: 0 }}>
                            {isSuperAdmin ? 'Full System Access' : `${permissionCount} Module${permissionCount !== 1 ? 's' : ''} Authorized`}
                        </span>
                    </div>
                 </div>
               </div>
             </div>

             {/* System Health Card */}
             <div style={{ 
               backgroundColor: 'rgba(255, 255, 255, 0.02)', 
               backdropFilter: 'blur(16px)',
               WebkitBackdropFilter: 'blur(16px)',
               border: '1px solid rgba(255, 255, 255, 0.08)', 
               boxShadow: '0 4px 24px -4px rgba(0, 0, 0, 0.1)',
               borderRadius: '16px', 
               padding: '24px' 
             }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'white', margin: 0 }}>System Health</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: health?.status === 'OK' ? '#22c55e' : '#ef4444' }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>{health?.status || 'Loading...'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Database Status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Globe style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>Database</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8', lineHeight: 1.2 }}>{health?.database?.latencyMs || 0}ms latency</p>
                      </div>
                    </div>
                    <div style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', fontSize: '13px', fontWeight: 700 }}>
                      {health?.database?.status || 'Check'}
                    </div>
                  </div>

                  {/* Memory Usage */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box style={{ width: '20px', height: '20px', color: '#a855f7' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>Memory</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8', lineHeight: 1.2 }}>Resident Set Size</p>
                      </div>
                    </div>
                    <div style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white', fontSize: '13px', fontWeight: 700 }}>
                      {health?.memory?.rss || '0 MB'}
                    </div>
                  </div>

                  {/* Uptime */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(249, 115, 22, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <RefreshCw style={{ width: '20px', height: '20px', color: '#f97316' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'white', lineHeight: 1.2 }}>Uptime</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8', lineHeight: 1.2 }}>Server Process</p>
                      </div>
                    </div>
                    <div style={{ padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: 'white', fontSize: '13px', fontWeight: 700 }}>
                      {health?.uptimeSeconds ? (health.uptimeSeconds / 3600).toFixed(1) + 'h' : '0h'}
                    </div>
                  </div>
                </div>
             </div>

             {/* Top Pages */}
             <div className="pt-2">
               <h3 className="text-lg font-bold text-foreground mb-4 px-2">Top Visited Pages</h3>
               <div className="flex flex-col space-y-1">
                  {loading ? (
                      [...Array(5)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between px-4 py-3">
                              <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                              <div className="h-4 w-10 bg-muted rounded animate-pulse" />
                          </div>
                      ))
                  ) : analytics?.topPages?.length === 0 ? (
                      <div className="text-center py-10 text-muted-foreground bg-muted/20 rounded-2xl border border-border mx-2">No page visits recorded yet.</div>
                  ) : analytics?.topPages?.map((page, i) => (
                           <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/50 group transition-colors">
                              <div className="flex items-center gap-2.5">
                                 <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}.</span>
                                 <span className="text-sm font-medium text-foreground truncate max-w-[170px]">{page.path}</span>
                              </div>
                              <Badge variant="secondary" className="font-mono bg-[#52a436]/10 text-[#52a436] border-0 font-bold">{page.views.toLocaleString()}</Badge>
                           </div>
                       ))}
               </div>
             </div>

          </div>
        </div>
        
      </div>
    </div>
  )
}

