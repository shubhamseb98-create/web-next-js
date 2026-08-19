'use client'
import { useState, useEffect } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import DataTable from '../../../../components/dashboard/DataTable'
import TableToolbar from '../../../../components/dashboard/TableToolbar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../../components/ui/dialog'
import { Button } from '../../../../components/ui/button'
import { FloatingInput, FloatingSelect } from '../../../../components/ui/floating-input'
import { Plus, Image as ImageIcon, Link as LinkIcon, ChevronRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../../../lib/utils'
import { Switch } from '../../../../components/ui/switch'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../../../components/ui/dropdown-menu'
import { Edit2, Trash2, MoreVertical } from 'lucide-react'
import { SortInput } from '../../../../components/dashboard/SortInput'
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = { title: '', subtitle: '', url: '', buttonText: '', bnr_image: '', alt: '', status: 'active', sort: '', showCertifications: false }

export default function BannerPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ ...EMPTY })
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [toasts, setToasts] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [statusTogglingId, setStatusTogglingId] = useState(null)
  const [sortIsAuto, setSortIsAuto] = useState(false)
  
  // New States for Standardization
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'single', id: null })

  function addToast(message, type = 'success') {
    setToasts(t => [...t, { id: Date.now(), message, type }])
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== t[t.length - 1]?.id))
    }, 4000)
  }

  useEffect(() => {
    fetchBanners()
  }, [])

  async function fetchBanners() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/banner`)
      if (!res.ok) throw new Error('Failed to fetch banners')
      const data = await res.json()
      setRows(data)
    } catch (err) {
      addToast('Could not load banners: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  function openCreate() {
    const maxSort = rows.reduce((max, r) => Math.max(max, Number(r.sort) || 0), 0)
    setForm({ ...EMPTY, sort: maxSort + 1 })
    setImageFile(null)
    setPreview('')
    setSortIsAuto(true)
    setModal('new')
  }

  function openEdit(banner) {
    setForm({ ...banner })
    setImageFile(null)
    setPreview(banner.image || '')
    setSortIsAuto(false)
    setModal(banner)
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      setSaving(true)

      const fd = new FormData()
      fd.append('title', form.title || '')
      fd.append('subtitle', form.subtitle || '')
      fd.append('url', form.url || '')
      fd.append('buttonText', form.buttonText || '')
      fd.append('alt', form.alt || '')
      fd.append('status', form.status || 'active')
      fd.append('sort', form.sort || 0)
      fd.append('showCertifications', form.showCertifications || false)
      if (imageFile) fd.append('image', imageFile)

      const isEdit = Boolean(form._id)
      const url = isEdit ? `${BASE_URL}/api/banner/${form._id}` : `${BASE_URL}/api/banner`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, body: fd })
      const data = await res.json()

      if (!res.ok) throw new Error(data.message || 'Save failed')

      addToast(isEdit ? 'Banner updated successfully!' : 'Banner added successfully!')
      setModal(null)
      fetchBanners()
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false, type: 'single', id: null })
      setDeletingId(id)
      const res = await fetch(`${BASE_URL}/api/banner/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Delete failed')
      addToast('Banner deleted.', 'warning')
      setRows(r => r.filter(x => x._id !== id))
      setSelectedIds(s => s.filter(x => x !== id))
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setDeletingId(null)
    }
  }

  async function handleBulkDelete() {
    try {
      setConfirmModal({ isOpen: false, type: 'bulk', id: null })
      setBulkDeleting(true)
      await Promise.all(selectedIds.map(id => fetch(`${BASE_URL}/api/banner/${id}`, { method: 'DELETE' })))
      setRows(r => r.filter(x => !selectedIds.includes(x._id)))
      setSelectedIds([])
      addToast('Banners deleted', 'warning')
    } catch (e) {
      addToast('Error deleting some banners: ' + e.message, 'error')
    } finally {
      setBulkDeleting(false)
    }
  }

  async function toggleStatus(row) {
    try {
      setStatusTogglingId(row._id)
      const newStatus = row.status === 'active' ? 'inactive' : 'active'
      
      const fd = new FormData()
      fd.append('title', row.title || '')
      fd.append('subtitle', row.subtitle || '')
      fd.append('url', row.url || '')
      fd.append('buttonText', row.buttonText || '')
      fd.append('alt', row.alt || '')
      fd.append('status', newStatus)
      fd.append('sort', row.sort || 0)
      fd.append('showCertifications', row.showCertifications || false)

      const res = await fetch(`${BASE_URL}/api/banner/${row._id}`, { method: 'PUT', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Status update failed')
      
      setRows(r => r.map(x => x._id === row._id ? { ...x, status: newStatus } : x))
      addToast('Status updated.')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setStatusTogglingId(null)
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) setSelectedIds([])
    else setSelectedIds(filteredData.map(x => x._id))
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const filteredData = rows
    .filter(row => 
      row.title?.toLowerCase().includes(search.toLowerCase()) || 
      row.subtitle?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'latest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      if (sort === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
      if (sort === 'a-z') return (a.title || '').localeCompare(b.title || '')
      if (sort === 'z-a') return (b.title || '').localeCompare(a.title || '')
      return (a.sort || 0) - (b.sort || 0) // default fallback
    })

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => {
        const isVid = row.image?.endsWith('.mp4') || row.image?.endsWith('.webm');
        return (
          <div className="w-14 h-10 rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border shrink-0">
            {row.image ? (
               isVid ? (
                 <video src={row.image} className="w-full h-full object-cover" autoPlay muted loop playsInline />
               ) : (
                 <img src={row.image} alt={row.alt} className="w-full h-full object-cover" />
               )
            ) : (
               <ImageIcon className="w-4 h-4 text-muted-foreground/50" />
            )}
          </div>
        )
      }
    },
    {
      key: 'details',
      label: 'Banner Details',
      render: (row) => (
        <div className="min-w-[120px]">
          <div className="font-bold text-foreground max-w-[200px] truncate" title={row.title}>{row.title}</div>
          <div className="text-xs text-muted-foreground truncate max-w-[200px]" title={row.subtitle}>{row.subtitle || 'No subtitle'}</div>
        </div>
      )
    },
    {
      key: 'button',
      label: 'Button & URL',
      render: (row) => (
        <div className="min-w-[120px]">
           <div className="font-medium text-[13px]">{row.buttonText || 'No Button'}</div>
           <div className="text-[11px] text-blue-600 truncate max-w-[150px]" title={row.url}>{row.url || '#'}</div>
        </div>
      )
    },
    {
      key: 'sort',
      label: 'Sort',
      render: (row) => <span className="font-medium text-sm text-muted-foreground">{row.sort}</span>
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <div className="flex items-center gap-2">
          {statusTogglingId === row._id ? (
             <span className="text-xs text-muted-foreground animate-pulse">Updating...</span>
          ) : (
             <Switch 
               checked={row.status === 'active'}
               onCheckedChange={() => toggleStatus(row)}
             />
          )}
        </div>
      )
    },
    {
      key: 'actions',
      align: 'right',
      label: 'Action',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={(e) => { e.stopPropagation(); openEdit(row); }} className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setConfirmModal({ isOpen: true, type: 'single', id: row._id }); }} disabled={deletingId === row._id} className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50">
            {deletingId === row._id ? <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb 
        title="Banner Management" 
        subtitle="Manage the hero banners displayed on the home page."
        crumbs={[{ label: 'Home Management' }, { label: 'Banners' }]} 
      />
      
      <TableToolbar 
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
        bulkDeleting={bulkDeleting}
        onAdd={openCreate}
        addLabel="Add Banner"
      />

      <DataTable 
        columns={columns}
        data={filteredData}
        loading={loading}
        onRowClick={openEdit}
        actions={false}
        selectedIds={selectedIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectRow={toggleSelect}
      />

      <Dialog open={!!modal} onOpenChange={(open) => !open && !saving && setModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>{modal === 'new' ? "Add New Banner" : "Edit Banner"}</DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>{modal === 'new' ? "Create a new hero banner" : "Modify existing banner details"}</p>
          </DialogHeader>

          <form onSubmit={handleSave} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FloatingInput
                label="Banner Title *"
                required
                value={form.title}
                onChange={e => setForm({...form, title: e.target.value})}
                rightElement={<AIAssistantButton context="Homepage Hero Banner" field="Catchy Banner Title" onGenerate={(val) => setForm({...form, title: val})} />}
              />
              <FloatingInput
                label="Subtitle"
                value={form.subtitle}
                onChange={e => setForm({...form, subtitle: e.target.value})}
                rightElement={<AIAssistantButton context={form.title || 'Homepage Hero Banner'} field="Engaging Subtitle" onGenerate={(val) => setForm({...form, subtitle: val})} />}
              />
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput
                  label="Button Text"
                  value={form.buttonText}
                  onChange={e => setForm({...form, buttonText: e.target.value})}
                  rightElement={<AIAssistantButton context={form.title || 'Hero Banner'} field="Actionable Button Text" onGenerate={(val) => setForm({...form, buttonText: val})} />}
                />
                <FloatingInput
                  label="Button URL"
                  value={form.url}
                  onChange={e => setForm({...form, url: e.target.value})}
                  icon={<LinkIcon className="w-4 h-4" />}
                />
              </div>
              
              <div style={{ padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>Banner Image</label>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, marginTop: '-8px' }}>Recommended: 1920×680px JPG/PNG</p>
                <style>{`
                  .custom-file-upload::-webkit-file-upload-button {
                    background: transparent;
                    border: none;
                    color: #3b82f6;
                    font-weight: 600;
                    font-size: 14px;
                    line-height: 46px;
                    cursor: pointer;
                    margin-right: 12px;
                    padding: 0;
                  }
                `}</style>
                <input
                  type="file"
                  accept="image/*,video/mp4,video/webm"
                  onChange={handleImage}
                  className="custom-file-upload"
                  style={{ boxSizing: 'border-box', display: 'block', width: '100%', height: '48px', lineHeight: '46px', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: '0 20px', fontSize: '14px', color: 'white', cursor: 'pointer', transition: 'border-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                {preview && (
                  <div style={{ width: '100%', height: '128px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8px' }}>
                    {(preview.endsWith('.mp4') || preview.endsWith('.webm') || preview.startsWith('blob:') && imageFile?.type?.includes('video')) ? (
                      <video src={preview} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} autoPlay muted loop />
                    ) : (
                      <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                    )}
                  </div>
                )}
              </div>

              <FloatingInput
                label="Image ALT Text"
                value={form.alt}
                onChange={e => setForm({...form, alt: e.target.value})}
                rightElement={<AIAssistantButton context={form.title || 'Banner'} field="SEO Image Alt Text" onGenerate={(val) => setForm({...form, alt: val})} />}
              />

              <div className="grid grid-cols-2 gap-4">
              <SortInput
                  label="Sort Order"
                  value={form.sort}
                  isEditing={Boolean(form._id)}
                  isAuto={sortIsAuto}
                  onManualEdit={() => setSortIsAuto(false)}
                  onChange={v => setForm({...form, sort: v})}
                />
                <FloatingSelect
                  label="Status"
                  value={form.status}
                  onChange={e => setForm({...form, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </FloatingSelect>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>Show Certifications</h4>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' }}>Display certification logos on this banner slide</p>
                </div>
                <Switch 
                  checked={form.showCertifications} 
                  onCheckedChange={(val) => setForm({...form, showCertifications: val})}
                />
              </div>
            </div>

            <DialogFooter style={{ paddingTop: '24px', marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button 
                type="button" 
                onClick={() => setModal(null)} 
                disabled={saving} 
                style={{ padding: '0 24px', height: '48px', borderRadius: '24px', backgroundColor: 'transparent', color: '#94a3b8', fontSize: '15px', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving} 
                style={{ padding: '0 40px', height: '48px', borderRadius: '24px', backgroundColor: '#52a436', color: 'white', fontSize: '15px', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 25px -5px rgba(82, 164, 54, 0.6)', transition: 'background-color 0.2s, transform 0.1s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e8027'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#52a436'}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                {saving ? 'Saving...' : modal === 'new' ? 'Save Banner' : 'Save Changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={confirmModal.type === 'single' ? deletingId === confirmModal.id : bulkDeleting}
        onClose={() => setConfirmModal({ isOpen: false, type: 'single', id: null })}
        onConfirm={() => confirmModal.type === 'single' ? handleDelete(confirmModal.id) : handleBulkDelete()}
        title={confirmModal.type === 'single' ? "Delete Banner" : "Bulk Delete"}
        message={confirmModal.type === 'single' 
          ? "Are you sure you want to delete this banner? This action cannot be undone." 
          : `Are you sure you want to delete ${selectedIds.length} banners? This action cannot be undone.`}
      />

      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={cn(
              "fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-bold z-50 flex items-center gap-3",
              toast.type === 'success' ? "bg-polaris-primary" : "bg-red-600"
            )}
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
               {toast.type === 'success' ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 rotate-45" />}
            </div>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}