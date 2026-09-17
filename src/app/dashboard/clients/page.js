'use client'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingSelect } from '../../../components/ui/floating-input'
import { SortInput } from '../../../components/dashboard/SortInput'
import { Edit2, Trash2, Image as ImageIcon, Globe, Building2, Sliders, Upload, ExternalLink, Sparkles } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = { 
  name: '', 
  image: '', 
  websiteUrl: '', 
  domain: '', 
  category: '', 
  snapshotImage: '', 
  hasBg: false, 
  sort: 0, 
  status: 'active' 
}

function ClientModal({ item, nextSort = 1, onClose, onSave, saving }) {
  const [form, setForm] = useState(item ? { ...EMPTY, ...item } : { ...EMPTY, sort: nextSort })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(item?.image || '')
  const [snapshotFile, setSnapshotFile] = useState(null)
  const [snapshotPreview, setSnapshotPreview] = useState(item?.snapshotImage || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleUrlChange = (val) => {
    f('websiteUrl', val)
    if (val && val.startsWith('http')) {
      try {
        const u = new URL(val)
        if (!form.domain) {
          f('domain', u.hostname.replace('www.', ''))
        }
      } catch (_) {}
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form }, imageFile, snapshotFile)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-2xl sm:max-w-2xl w-full">
        <DialogHeader className="pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <DialogTitle className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {item ? 'Edit Client Details' : 'Add New Client'}
              </DialogTitle>
              <DialogDescription className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Configure client brand info, live website link, and hover preview snapshot.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-3 pb-4">
          {/* SECTION 1: Client General Details */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>General Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingInput 
                label="Client Name *" 
                required 
                value={form.name} 
                onChange={e => f('name', e.target.value)} 
              />
              <FloatingInput 
                label="Category / Industry" 
                value={form.category || ''} 
                onChange={e => f('category', e.target.value)} 
              />
            </div>
          </div>

          {/* SECTION 2: Website & Snapshot Hover Popup */}
          <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/25 via-emerald-950/10 to-transparent p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Globe className="w-3.5 h-3.5" />
                <span>Website & Snapshot Preview</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-medium">
                <Sparkles className="w-3 h-3" />
                Hover Popup on Homepage
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Provide the client website URL and upload a snapshot screenshot. When visitors hover on this client logo on the homepage, a preview card with this snapshot will pop up.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingInput 
                label="Website URL" 
                value={form.websiteUrl || ''} 
                onChange={e => handleUrlChange(e.target.value)} 
              />
              <FloatingInput 
                label="Domain Display" 
                value={form.domain || ''} 
                onChange={e => f('domain', e.target.value)} 
              />
            </div>

            {/* Snapshot Image Upload Box */}
            <div className="rounded-lg border border-emerald-500/20 bg-black/30 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-200 mb-1">
                  Website Snapshot Image (16:9 ratio)
                </div>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-3.5 py-2 rounded-lg transition-colors border border-emerald-500/30 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Snapshot</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        setSnapshotFile(file)
                        setSnapshotPreview(URL.createObjectURL(file))
                      }} 
                    />
                  </label>
                  <span className="text-xs text-slate-400 truncate max-w-[200px]">
                    {snapshotFile ? snapshotFile.name : (form.snapshotImage ? 'Current snapshot active' : 'No snapshot uploaded')}
                  </span>
                </div>
              </div>

              {snapshotPreview ? (
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-32 h-18 rounded-lg overflow-hidden border border-emerald-500/40 shadow-lg bg-black/80 group relative">
                    <img 
                      src={snapshotPreview} 
                      alt="Snapshot preview" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] font-medium text-emerald-400 mt-1">Live Hover Preview</span>
                </div>
              ) : (
                <div className="shrink-0 w-32 h-18 rounded-lg border border-dashed border-white/15 bg-white/[0.02] flex flex-col items-center justify-center text-[10px] text-slate-500">
                  <Globe className="w-4 h-4 mb-1 text-slate-500" />
                  <span>No preview</span>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 3: Client Logo & Visual Display */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>Brand Logo</span>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/30 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-200 mb-1">
                  Logo File
                </div>
                <p className="text-[11px] text-slate-400 mb-2">Transparent PNG or SVG with high contrast recommended</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 text-white hover:bg-white/20 px-3.5 py-2 rounded-lg transition-colors border border-white/10 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Logo</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        setImageFile(file)
                        setImagePreview(URL.createObjectURL(file))
                      }} 
                    />
                  </label>
                  <span className="text-xs text-slate-400 truncate max-w-[200px]">
                    {imageFile ? imageFile.name : (form.image ? 'Using existing logo' : 'No file chosen')}
                  </span>
                </div>
              </div>

              {imagePreview ? (
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-24 h-14 rounded-lg bg-black/50 p-2 border border-white/15 flex items-center justify-center shadow-md">
                    <img 
                      src={imagePreview} 
                      alt="Logo preview" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">Logo Preview</span>
                </div>
              ) : (
                <div className="shrink-0 w-24 h-14 rounded-lg border border-dashed border-white/15 bg-white/[0.02] flex items-center justify-center text-[10px] text-slate-500">
                  No Logo
                </div>
              )}
            </div>

            {/* Slider Tile Background Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
              <div className="space-y-0.5">
                <label className="text-xs font-medium text-slate-200">Slider Background Tile</label>
                <p className="text-[11px] text-slate-400">Display subtle dark container tile behind logo in the homepage slider</p>
              </div>
              <Switch checked={form.hasBg} onCheckedChange={c => f('hasBg', c)} />
            </div>
          </div>

          {/* SECTION 4: Status & Sort Order */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>Visibility & Sort Order</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FloatingSelect label="Status" value={form.status} onChange={e => f('status', e.target.value)}>
                <option value="active" className="bg-slate-900 text-white">Active (Visible)</option>
                <option value="draft" className="bg-slate-900 text-white">Draft (Hidden)</option>
              </FloatingSelect>
              <SortInput 
                label="Sort Order" 
                value={form.sort} 
                isEditing={!!item} 
                isAuto={false} 
                onManualEdit={() => {}} 
                onChange={v => f('sort', v)} 
              />
            </div>
          </div>

          {/* Action Footer */}
          <DialogFooter className="pt-6 border-t border-white/10 mt-6 flex items-center justify-end gap-3">
            <Button 
              variant="ghost" 
              type="button" 
              onClick={onClose} 
              disabled={saving}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold shadow-lg shadow-emerald-500/20 px-6"
            >
              {saving ? 'Saving...' : (item ? 'Save Changes' : 'Create Client')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ClientsPage() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [modal, setModal] = useState(null)
  const [search, setSearch] = useState(''); const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null })
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try { setLoading(true); const res = await fetch(`${BASE_URL}/api/clients?all=true`); const json = await res.json(); setRows(json.data || []); }
    catch (err) { addToast('Error: ' + err.message, 'error') } finally { setLoading(false) }
  }

  async function handleSave(form, imageFile, snapshotFile) {
    try {
      setSaving(true); const fd = new FormData()
      Object.keys(form).forEach(k => {
        fd.append(k, form[k] === null ? '' : form[k])
      })
      if (imageFile) fd.append('image', imageFile)
      if (snapshotFile) fd.append('snapshotImage', snapshotFile)
      
      const isEdit = Boolean(form._id)
      const res = await fetch(isEdit ? `${BASE_URL}/api/clients/${form._id}` : `${BASE_URL}/api/clients`, { method: isEdit ? 'PUT' : 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).message)
      addToast(isEdit ? 'Client updated successfully!' : 'Client created successfully!'); setModal(null); fetchItems();
    } catch (err) { addToast(err.message, 'error') } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false }); const res = await fetch(`${BASE_URL}/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(); addToast('Deleted.', 'warning'); setRows(r => r.filter(x => x._id !== id))
    } catch (err) {}
  }

  const columns = [
    { 
      key: 'logo', 
      label: 'Logo', 
      render: r => (
        <div className="w-16 h-10 rounded-md border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center shrink-0 shadow-sm p-1">
          {r.image ? (
            <img src={r.image} alt={r.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-white/40">
              <ImageIcon className="w-4 h-4 text-emerald-400/60" />
            </div>
          )}
        </div>
      )
    },
    { 
      key: 'name', 
      label: 'Client Info', 
      render: r => (
        <div>
          <div className="font-semibold text-white text-sm">{r.name}</div>
          {r.category && <div className="text-xs text-emerald-400/90 font-medium">{r.category}</div>}
        </div>
      )
    },
    {
      key: 'website',
      label: 'Website Link',
      render: r => r.websiteUrl ? (
        <a 
          href={r.websiteUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          onClick={e => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-mono bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-500/20 hover:border-emerald-500/40 transition-colors"
        >
          {r.domain || r.websiteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')} <span>↗</span>
        </a>
      ) : (
        <span className="text-xs text-slate-500 italic">No link set</span>
      )
    },
    {
      key: 'snapshot',
      label: 'Hover Snapshot',
      render: r => (
        <div className="w-20 h-12 rounded-md border border-white/10 overflow-hidden bg-black/60 shrink-0 shadow-sm relative group">
          {r.snapshotImage ? (
            <img src={r.snapshotImage} alt="Snapshot" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500 bg-white/5">
              No Snapshot
            </div>
          )}
        </div>
      )
    },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.status === 'active'} onCheckedChange={async () => { const newStatus = r.status==='active'?'draft':'active'; setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: newStatus } : x)); try { const fd = new FormData(); fd.append('status', newStatus); await fetch(`${BASE_URL}/api/clients/${r._id}`, { method: 'PUT', body: fd }); addToast(newStatus === 'active' ? 'Status activated!' : 'Status deactivated!', newStatus === 'active' ? 'success' : 'error'); } catch(e) { setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: r.status } : x)); addToast('Error updating status', 'error'); } }} /> },
    { key: 'actions', align: 'right', label: 'Action', render: r => (
      <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
        <button 
          type="button"
          onClick={() => setModal(r)} 
          className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30" 
          title="Edit Client & Snapshot"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => setConfirmModal({ isOpen: true, id: r._id })} 
          className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30" 
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )}
  ]
  const filtered = rows.filter(r => (r.name || '').toLowerCase().includes(search.toLowerCase()) || (r.category || '').toLowerCase().includes(search.toLowerCase()) || (r.domain || '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Breadcrumb title="Clients Management" crumbs={[{ label: 'Clients' }]} />
      <TableToolbar search={search} onSearchChange={setSearch} selectedCount={0} onAdd={() => setModal('new')} addLabel="Add Client" />
      <DataTable columns={columns} data={filtered} loading={loading} onRowClick={setModal} actions={false} selectedIds={[]} onToggleSelectAll={()=>{}} onToggleSelectRow={()=>{}} />
      {modal && <ClientModal item={modal === 'new' ? null : modal} nextSort={rows.length + 1} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      <ConfirmDeleteModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false })} onConfirm={() => handleDelete(confirmModal.id)} title="Delete Client" message="Are you sure?" />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
