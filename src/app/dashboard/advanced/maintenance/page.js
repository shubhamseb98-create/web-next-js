'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../../context/AuthContext';
import { ShieldAlert, Wrench, Globe, CheckCircle2, Home, Save, Loader2 } from 'lucide-react';
import Toast from '../../../../components/dashboard/Toast';

export default function MaintenanceManagement() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    isMaintenanceMode: false,
    maintenanceMessage: '',
    emergencyShutdown: false
  });

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/system/maintenance');
      const data = await res.json();
      if (data.success) {
        setSettings(data.maintenance);
      }
    } catch (error) {
      addToast('Failed to load maintenance settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const res = await fetch('/api/system/maintenance', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (data.success) {
        addToast('Maintenance settings updated');
      } else {
        addToast(data.error || 'Failed to update settings', 'error');
      }
    } catch (error) {
      addToast('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#52a436]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <div className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1500px] w-full mx-auto font-sans">
        
        {/* Top Right Navigation */}
        <div className="flex justify-end items-center mb-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="w-7 h-7 text-[#3b82f6] shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Maintenance Management
              </h1>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Control public access to your website. Enable maintenance mode during updates, or trigger an emergency shutdown if critical issues arise. The dashboard remains accessible to admins at all times.
            </p>
          </div>

          <button
            onClick={saveSettings}
            disabled={saving}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: '#ffffff',
              padding: '0 24px',
              height: '42px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: 'none',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)',
              flexShrink: 0
            }}
            onMouseEnter={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.45)';
              }
            }}
            onMouseLeave={(e) => {
              if (!saving) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(34, 197, 94, 0.35)';
              }
            }}
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column (Cards with clean gap-6) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Standard Maintenance Mode Card */}
            <div
              style={{
                backgroundColor: '#0d150e',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.2s'
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#142016',
                      border: '1px solid #253828',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#cbd5e1',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5">
                      Standard Maintenance Mode
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                      Displays a friendly maintenance screen to all public visitors. Search engines will be instructed to check back later without losing your SEO ranking (HTTP 503).
                    </p>

                    {settings.isMaintenanceMode && (
                      <div className="mt-4 space-y-2">
                        <label className="text-xs font-semibold text-slate-300">
                          Maintenance Message (Visible to visitors)
                        </label>
                        <textarea
                          rows={3}
                          className="w-full bg-[#080e06] border border-[#1e2e20] rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e]/30 outline-none transition-colors"
                          value={settings.maintenanceMessage}
                          onChange={(e) => setSettings({ ...settings, maintenanceMessage: e.target.value })}
                          placeholder="e.g. We are currently upgrading our system. We will be back online shortly."
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Pill Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.isMaintenanceMode}
                  onClick={() => setSettings({ ...settings, isMaintenanceMode: !settings.isMaintenanceMode })}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '9999px',
                    padding: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: settings.isMaintenanceMode ? '#22c55e' : '#202c22',
                    border: settings.isMaintenanceMode ? '1px solid #22c55e' : '1px solid #2c3e30',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    flexShrink: 0,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: settings.isMaintenanceMode ? 'translateX(22px)' : 'translateX(0)',
                      pointerEvents: 'none',
                      display: 'block'
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Emergency Shutdown Card */}
            <div
              style={{
                backgroundColor: '#0d150e',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                padding: '24px',
                transition: 'all 0.2s'
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#142016',
                      border: '1px solid #253828',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#cbd5e1',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#ef4444] mb-1.5">
                      Emergency Shutdown
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                      Instantly blocks all public traffic with a stark &ldquo;System Offline&rdquo; message. Use this only during active security breaches or critical data corruption. Overrides standard maintenance mode.
                    </p>
                  </div>
                </div>

                {/* Custom Pill Toggle Switch */}
                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.emergencyShutdown}
                  onClick={() => setSettings({ ...settings, emergencyShutdown: !settings.emergencyShutdown })}
                  style={{
                    width: '48px',
                    height: '26px',
                    borderRadius: '9999px',
                    padding: '2px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: settings.emergencyShutdown ? '#ef4444' : '#202c22',
                    border: settings.emergencyShutdown ? '1px solid #ef4444' : '1px solid #2c3e30',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    flexShrink: 0,
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '9999px',
                      backgroundColor: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: settings.emergencyShutdown ? 'translateX(22px)' : 'translateX(0)',
                      pointerEvents: 'none',
                      display: 'block'
                    }}
                  />
                </button>
              </div>
            </div>

          </div>

          {/* Right Column (Status Card) */}
          <div className="flex flex-col gap-6">
            <div
              style={{
                backgroundColor: '#0d150e',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  padding: '20px',
                  borderBottom: '1px solid #1e2e20',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Globe className="w-5 h-5 text-[#22c55e]" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Current Status
                </h3>
              </div>

              {/* Card Content */}
              <div style={{ padding: '20px' }} className="space-y-4">
                
                {/* Public Website */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Public Website
                  </span>
                  {settings.emergencyShutdown ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                      <ShieldAlert className="w-3.5 h-3.5" /> OFFLINE
                    </span>
                  ) : settings.isMaintenanceMode ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Wrench className="w-3.5 h-3.5" /> MAINTENANCE
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: 'rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        color: '#22c55e',
                        borderRadius: '9999px',
                        padding: '4px 12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #1e2e20' }} />

                {/* Admin Dashboard */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">
                    Admin Dashboard
                  </span>
                  <span
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.08)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      color: '#22c55e',
                      borderRadius: '9999px',
                      padding: '4px 12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />

      </div>
    </div>
  );
}



