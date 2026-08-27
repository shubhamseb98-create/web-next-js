'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { ArrowRight, Plus, Trash2, ExternalLink, CornerDownRight } from 'lucide-react';
import { Switch } from '../../../../components/ui/switch';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import Toast from '../../../../components/dashboard/Toast';

import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

export default function RedirectManager() {
  const [redirects, setRedirects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ from: '', to: '', type: 301 });
  const [deletingId, setDeletingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => { fetchRedirects(); }, []);

  const fetchRedirects = async () => {
    try {
      const res = await fetch('/api/system/redirects');
      const data = await res.json();
      if (data.success) setRedirects(data.data);
    } catch { addToast('Failed to load redirects', 'error'); }
    finally { setLoading(false); }
  };

  const handleAdd = async () => {
    if (!form.from.trim() || !form.to.trim()) { addToast('Both From and To paths are required', 'error'); return; }
    if (!form.from.startsWith('/')) { addToast('"From" path must start with /', 'error'); return; }
    try {
      setAdding(true);
      const res = await fetch('/api/system/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setRedirects(r => [data.data, ...r]);
        setForm({ from: '', to: '', type: 301 });
        addToast('Redirect added successfully');
      } else addToast(data.error || 'Failed to add redirect', 'error');
    } catch { addToast('Error adding redirect', 'error'); }
    finally { setAdding(false); }
  };

  const handleToggle = async (r) => {
    const newStatus = !r.isActive;
    setRedirects(prev => prev.map(x => x._id === r._id ? { ...x, isActive: newStatus } : x));
    try {
      const res = await fetch('/api/system/redirects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: r._id, from: r.from, to: r.to, type: r.type, isActive: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        addToast(newStatus ? 'Redirect activated' : 'Redirect deactivated');
      } else {
        setRedirects(prev => prev.map(x => x._id === r._id ? { ...x, isActive: r.isActive } : x));
        addToast('Failed to update status', 'error');
      }
    } catch {
      setRedirects(prev => prev.map(x => x._id === r._id ? { ...x, isActive: r.isActive } : x));
      addToast('Error updating redirect', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const res = await fetch('/api/system/redirects', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) setRedirects(prev => prev.filter(x => x._id !== id));
      else addToast('Failed to delete', 'error');
    } catch { addToast('Error deleting redirect', 'error'); }
    finally { setDeletingId(null); }
  };

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Breadcrumb title="Redirect Manager" crumbs={[{ label: 'Advanced Settings' }, { label: 'Redirect Manager' }]} />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Redirect Manager</CardTitle>
            <CardDescription>
              Create 301 (permanent) or 302 (temporary) redirects to preserve SEO when URLs change. Active redirects are automatically processed on request.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-8">
            {/* Add New Redirect Box */}
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid #1e2e20',
                borderRadius: '16px',
                padding: '24px'
              }}
            >
              <div className="flex items-center gap-2 text-sm font-bold text-white mb-5">
                <Plus className="w-4 h-4 text-emerald-400" />
                <span>Add New Redirect</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                {/* FROM Path */}
                <div className="col-span-12 sm:col-span-5 lg:col-span-4 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">FROM Path</label>
                  <input
                    type="text"
                    value={form.from}
                    onChange={e => setForm({ ...form, from: e.target.value })}
                    placeholder="/old-url-path"
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid #1e2e20',
                      padding: '0 16px',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  />
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex lg:col-span-1 items-center justify-center h-[44px]">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </div>

                {/* TO Path */}
                <div className="col-span-12 sm:col-span-5 lg:col-span-4 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">TO Path / Destination URL</label>
                  <input
                    type="text"
                    value={form.to}
                    onChange={e => setForm({ ...form, to: e.target.value })}
                    placeholder="/new-url-path or https://..."
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid #1e2e20',
                      padding: '0 16px',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  />
                </div>

                {/* Type */}
                <div className="col-span-6 sm:col-span-2 lg:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground/80">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: parseInt(e.target.value) })}
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#0a100c',
                      border: '1px solid #1e2e20',
                      padding: '0 12px',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box',
                      width: '100%'
                    }}
                  >
                    <option value={301}>301 Permanent</option>
                    <option value={302}>302 Temporary</option>
                  </select>
                </div>

                {/* Submit */}
                <div className="col-span-6 sm:col-span-12 lg:col-span-1 flex flex-col justify-end">
                  <button 
                    type="button"
                    onClick={handleAdd} 
                    disabled={adding}
                    style={{
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '13.5px',
                      border: 'none',
                      cursor: adding ? 'not-allowed' : 'pointer',
                      opacity: adding ? 0.7 : 1,
                      boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%'
                    }}
                  >
                    {adding ? '...' : 'Add'}
                  </button>
                </div>
              </div>
            </div>

            {/* Redirect Table */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin h-8 w-8 rounded-full border-b-2 border-emerald-500" />
              </div>
            ) : redirects.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground border border-[#1e2e20] rounded-2xl bg-black/20">
                <CornerDownRight className="w-10 h-10 mx-auto mb-3 text-emerald-500/40" />
                <p className="text-base font-semibold text-foreground">No redirects configured yet</p>
                <p className="text-xs text-muted-foreground mt-1">Add your first URL redirect above to get started.</p>
              </div>
            ) : (
              <div className="border border-[#1e2e20] rounded-2xl overflow-hidden bg-black/20">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e2e20] bg-white/[0.02]">
                        <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">From Path</th>
                        <th className="text-left px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</th>
                        <th className="text-center px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Status Code</th>
                        <th className="text-center px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Active</th>
                        <th className="text-right px-5 py-3.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2e20]">
                      {redirects.map(r => (
                        <tr key={r._id} className={`hover:bg-white/[0.02] transition-colors ${!r.isActive ? 'opacity-50' : ''}`}>
                          <td className="px-5 py-4 font-mono text-xs text-emerald-400 font-semibold">{r.from}</td>
                          <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                            <a href={r.to} target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                              <span>{r.to}</span>
                              <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${r.type === 301 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                              {r.type} {r.type === 301 ? 'Permanent' : 'Temporary'}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center">
                              <Switch 
                                checked={r.isActive}
                                onCheckedChange={() => handleToggle(r)}
                              />
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button 
                              onClick={() => setConfirmModal({ isOpen: true, id: r._id })} 
                              disabled={deletingId === r._id} 
                              className="w-8 h-8 rounded inline-flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50"
                              title="Delete Redirect"
                            >
                              {deletingId === r._id ? <span className="w-4 h-4 rounded-full border-2 border-red-500 border-t-transparent animate-spin inline-block" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <ConfirmDeleteModal
          isOpen={confirmModal.isOpen}
          isDeleting={deletingId === confirmModal.id}
          onClose={() => setConfirmModal({ isOpen: false, id: null })}
          onConfirm={() => handleDelete(confirmModal.id)}
          title="Delete Redirect"
          message="Are you sure you want to delete this redirect? This cannot be undone."
        />

        <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
      </div>
    </div>
  );
}
