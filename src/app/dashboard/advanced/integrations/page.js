'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Activity, Search, BarChart3, Puzzle, Code, ExternalLink } from 'lucide-react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import Toast from '../../../../components/dashboard/Toast';

const TABS = [
  { key: 'analytics', label: 'Analytics & Tracking', icon: BarChart3 },
  { key: 'custom', label: 'Custom Code Injection', icon: Code },
];

export default function IntegrationsManagement() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const [settings, setSettings] = useState({
    googleAnalyticsId: '',
    googleTagManagerId: '',
    googleSearchConsoleKey: '',
    customHeadCode: '',
    customBodyCode: '',
  });

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/global-settings');
      const data = await res.json();
      if (data.success) {
        setSettings({
          googleAnalyticsId: data.data.googleAnalyticsId || '',
          googleTagManagerId: data.data.googleTagManagerId || '',
          googleSearchConsoleKey: data.data.googleSearchConsoleKey || '',
          customHeadCode: data.data.customHeadCode || '',
          customBodyCode: data.data.customBodyCode || '',
        });
      }
    } catch {
      addToast('Failed to load integration settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const formData = new FormData();
      Object.entries(settings).forEach(([k, v]) => formData.append(k, v));
      const res = await fetch('/api/global-settings', { method: 'PUT', body: formData });
      const data = await res.json();
      if (data.success) addToast('Integrations updated successfully');
      else addToast(data.error || 'Failed to update integrations', 'error');
    } catch {
      addToast('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

  return (
    <div className="min-h-full flex flex-col bg-background">
      <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1600px] w-full mx-auto">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Advanced', href: '#' }, { label: 'Integrations' }]} />

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2 flex items-center gap-3">
              <Puzzle className="w-8 h-8 text-indigo-500" />
              Integrations & Code Manager
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Connect analytics tools, inject tracking scripts, and manage third-party code — all without touching source files.
            </p>
          </div>
          <Button onClick={saveSettings} disabled={saving} className="rounded-xl px-8 h-12 font-bold shadow-lg shrink-0">
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border pb-2">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                activeTab === key
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* ── Analytics Tab ── */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              {/* GA4 */}
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid #1e2e20',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Google Analytics (GA4)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Track website traffic, user behavior, and engagement metrics.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Measurement ID (e.g., G-XXXXXXXXXX)</label>
                  <input
                    type="text"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-..."
                    className="w-full bg-black/40 text-foreground border border-[#1e2e20] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                </div>
                <a href="https://analytics.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#22c55e] hover:underline mt-1 font-medium">
                  Get Measurement ID <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* GTM */}
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid #1e2e20',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Google Tag Manager</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Manage marketing tags and track conversions without touching code.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Container ID (e.g., GTM-XXXXXXX)</label>
                  <input
                    type="text"
                    value={settings.googleTagManagerId}
                    onChange={(e) => setSettings({ ...settings, googleTagManagerId: e.target.value })}
                    placeholder="GTM-..."
                    className="w-full bg-black/40 text-foreground border border-[#1e2e20] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                </div>
                <a href="https://tagmanager.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#22c55e] hover:underline mt-1 font-medium">
                  Open Tag Manager <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* GSC */}
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid #1e2e20',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">Google Search Console</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Verify site ownership and monitor your search performance.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <label className="text-xs font-semibold text-slate-300">Verification Meta Tag Content</label>
                  <input
                    type="text"
                    value={settings.googleSearchConsoleKey}
                    onChange={(e) => setSettings({ ...settings, googleSearchConsoleKey: e.target.value })}
                    placeholder="e.g. Y7xxX..."
                    className="w-full bg-black/40 text-foreground border border-[#1e2e20] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Paste only the content string, not the full HTML tag.</p>
                </div>
                <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-[#22c55e] hover:underline mt-1 font-medium">
                  Open Search Console <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ── Custom Code Tab ── */}
        {activeTab === 'custom' && (
          <div className="max-w-4xl space-y-6">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl text-sm text-amber-800 dark:text-amber-300">
              ⚠️ <strong>Caution:</strong> Only paste trusted JavaScript code here. Malicious or broken scripts can break your entire website for all visitors.
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2 mb-1">
                  <Code className="w-4 h-4 text-purple-400" /> Custom Head Script
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Runs immediately after page load (e.g., Meta Pixel, Clarity, custom analytics). Injected with <code className="bg-white/5 px-1.5 py-0.5 rounded text-slate-300">afterInteractive</code> strategy.
                </p>
                <textarea
                  rows={8}
                  value={settings.customHeadCode}
                  onChange={(e) => setSettings({ ...settings, customHeadCode: e.target.value })}
                  placeholder={`// Example: Microsoft Clarity\n(function(c,l,a,r,i,t,y){\n  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\n  // ...\n})(window, document, "clarity", "script", "YOUR_ID");`}
                  className="w-full font-mono text-sm bg-black/40 border border-[#1e2e20] rounded-xl px-4 py-3 focus:outline-none focus:border-[#22c55e] transition-colors resize-none"
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div>
                <h3 className="text-base font-bold text-foreground flex items-center gap-2 mb-1">
                  <Code className="w-4 h-4 text-blue-400" /> Custom Body Script
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Loads lazily after page is fully idle (e.g., live chat widgets, support tools). Injected with <code className="bg-white/5 px-1.5 py-0.5 rounded text-slate-300">lazyOnload</code> strategy — will not slow page load.
                </p>
                <textarea
                  rows={8}
                  value={settings.customBodyCode}
                  onChange={(e) => setSettings({ ...settings, customBodyCode: e.target.value })}
                  placeholder={`// Example: Intercom, Tidio, or other chat widgets\nwindow.intercomSettings = { app_id: "YOUR_APP_ID" };\n// ...`}
                  className="w-full font-mono text-sm bg-black/40 border border-[#1e2e20] rounded-xl px-4 py-3 focus:outline-none focus:border-[#22c55e] transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        )}

        <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
      </div>
    </div>
  );
}
