'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingTextarea, FloatingSelect } from '../../../components/ui/floating-input'
import { SlugInput } from '../../../components/dashboard/SlugInput'
import { SortInput } from '../../../components/dashboard/SortInput'
import { Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'
import PortfolioThemePicker from '../../../components/dashboard/PortfolioThemePicker'

const BASE_URL = ''
const EMPTY = { title: '', slug: '', shortDesc: '', icon: '', bgColor: '', hoverTextColor: '', imageStyle: 'small', sort: 0, isFeatured: false, status: 'active' }

const DEFAULT_SERVICES = [
  { _id: 'svc-1', title: 'Static Website Development', slug: 'static-website-development', shortDesc: 'High-speed, SEO-optimized static websites engineered for performance.', sort: 1, isFeatured: true, status: 'active' },
  { _id: 'svc-2', title: 'Dynamic Website Development', slug: 'dynamic-website-development', shortDesc: 'Database-driven modern web applications with CMS and realtime workflows.', sort: 2, isFeatured: true, status: 'active' },
  { _id: 'svc-3', title: 'E-Commerce Website Development', slug: 'ecommerce-website-development', shortDesc: 'Scalable online storefronts with seamless payment gateways and inventory.', sort: 3, isFeatured: true, status: 'active' },
]

function ServiceModal({ item, nextSort = 1, onClose, onSave, saving }) {
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY, sort: nextSort })
  const [slugLinked, setSlugLinked] = useState(!item)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(item?.image || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toSlug = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form }, imageFile)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput 
              label="Service Title *" 
              required 
              value={form.title || ''} 
              onChange={e => {
                f('title', e.target.value); 
                if (slugLinked) f('slug', toSlug(e.target.value))
              }} 
            />
            <SlugInput 
              label="Slug *" 
              required 
              value={form.slug || ''} 
              isEditing={!!item} 
              linked={slugLinked} 
              onToggleLink={() => setSlugLinked(!slugLinked)} 
              onChange={v => { setSlugLinked(false); f('slug', v) }} 
            />
          </div>
          
          <FloatingInput 
            label="Icon / Badge Tag" 
            value={form.icon || ''} 
            onChange={e => f('icon', e.target.value)} 
            placeholder="e.g. 🌐 or Web" 
          />
          
          <FloatingTextarea 
            label="Short Description" 
            value={form.shortDesc || ''} 
            onChange={e => f('shortDesc', e.target.value)} 
            rows={2} 
          />

          {/* Service Card Theme (Background & Text Color Picker) */}
          <PortfolioThemePicker
            title="Service Card Theme (Background & Text)"
            themeColor={form.bgColor}
            themeTextColor={form.hoverTextColor}
            onThemeColorChange={(val) => f('bgColor', val)}
            onThemeTextColorChange={(val) => f('hoverTextColor', val)}
            projectTitle={form.title || 'Service Card Title'}
          />

          <FloatingSelect label="Image Style" value={form.imageStyle || 'small'} onChange={e => f('imageStyle', e.target.value)}>
            <option value="small">Small Icon (SVG)</option>
            <option value="full">Full Cover (Image)</option>
          </FloatingSelect>

          <div className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-white/20">
            <div className="flex-1">
              <label className="block text-[13px] font-medium text-slate-400 mb-2">Service Image</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Choose File
                  <input type="file" className="hidden" accept="image/*" onChange={e => {
                    const file = e.target.files[0]; if (!file) return; setImageFile(file); setImagePreview(URL.createObjectURL(file))
                  }} />
                </label>
                <span className="text-sm text-slate-400 truncate max-w-[200px]">{imageFile ? imageFile.name : 'No file chosen'}</span>
              </div>
            </div>
            {imagePreview && imagePreview !== 'null' && imagePreview !== 'undefined' && (
              <img src={imagePreview} alt="preview" className="h-20 w-auto max-w-[140px] rounded-lg object-cover border border-white/10 shrink-0" onError={(e) => { e.target.style.display = 'none' }} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FloatingSelect label="Status" value={form.status || 'active'} onChange={e => f('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </FloatingSelect>
            <SortInput label="Sort Order" value={form.sort || 0} isEditing={!!item} isAuto={!item} onChange={v => f('sort', v)} />
            <div className="flex items-center gap-3 h-[50px] border border-input/60 rounded-xl px-4">
              <Switch checked={Boolean(form.isFeatured)} onCheckedChange={c => f('isFeatured', c)} />
              <label className="text-sm font-semibold">Featured</label>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Service'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function ServicesPage() {
  const [rows, setRows] = useState(DEFAULT_SERVICES)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const [selectedIds, setSelectedIds] = useState([])
  const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null })

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/services`)
      if (res.ok) {
        const json = await res.json()
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const generalServices = json.data.filter(s => s.slug !== 'real-estate-advisory')
          setRows(generalServices)
        }
      }
    } catch (err) {
      console.warn('Using local fallback for services:', err)
    } finally {
      setLoading(false)
    }
  }

  const getAuthHeaders = () => {
    if (typeof window === 'undefined') return {};
    const token = localStorage.getItem('admin_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  async function handleSave(form, imageFile) {
    try {
      setSaving(true)
      const fd = new FormData()
      Object.keys(form).forEach(k => {
        if (['features', 'faq', 'description', 'benefits', 'process', 'whyChooseUs', 'portfolio'].includes(k)) return
        fd.append(k, form[k] === null || form[k] === undefined ? '' : form[k])
      })
      if (imageFile) fd.append('image', imageFile)
      
      const isEdit = Boolean(form._id && !form._id.startsWith('svc-'))
      const endpoint = isEdit ? `${BASE_URL}/api/services/${form._id}` : `${BASE_URL}/api/services`
      const res = await fetch(endpoint, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { ...getAuthHeaders() },
        body: fd,
      })
      
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}))
        throw new Error(errJson.message || 'Failed to save service')
      }
      
      addToast(isEdit ? 'Service updated successfully!' : 'Service created successfully!')
      setModal(null)
      fetchItems()
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false })
      const res = await fetch(`${BASE_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { ...getAuthHeaders() },
      })
      if (!res.ok) throw new Error()
      addToast('Service deleted.', 'warning')
      setRows(r => r.filter(x => x._id !== id))
    } catch (err) {
      addToast('Failed to delete service', 'error')
    }
  }

  function getServiceImage(r) {
    const img = r.image || r.bannerImage || r.overviewImage || ''
    if (img && (img.startsWith('http') || img.startsWith('/'))) {
      return (
        <img 
          src={img} 
          alt={r.title || 'Service'} 
          className="w-full h-full object-cover" 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.style.display = 'none'; 
          }} 
        />
      )
    }
    return (
      <div className="w-full h-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
        <ImageIcon className="w-5 h-5 opacity-70" />
      </div>
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) setSelectedIds([])
    else setSelectedIds(filtered.map(x => x._id))
  }

  const toggleSelectRow = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const columns = [
    {
      key: 'title',
      label: 'Service',
      render: r => (
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-10 rounded-md border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center shrink-0 shadow-sm">
            {r.image ? (
              <img 
                src={r.image} 
                alt={r.title || 'Service'} 
                className="w-full h-full object-cover" 
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.style.display = 'none'; 
                }} 
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-emerald-400/60" />
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-white text-sm">{r.title || 'Untitled Service'}</div>
            <div className="text-xs text-slate-400 max-w-[340px] truncate">{r.shortDesc || `/services/${r.slug}`}</div>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Active',
      render: r => (
        <Switch 
          checked={r.status === 'active'} 
          onCheckedChange={async (e) => {
            const newStatus = r.status === 'active' ? 'draft' : 'active'
            setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: newStatus } : x))
            try {
              const fd = new FormData()
              fd.append('status', newStatus)
              await fetch(`${BASE_URL}/api/services/${r._id}`, { method: 'PUT', body: fd })
              addToast(newStatus === 'active' ? 'Service activated!' : 'Service drafted!', newStatus === 'active' ? 'success' : 'warning')
            } catch(e) {
              setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: r.status } : x))
              addToast('Error updating status', 'error')
            }
          }} 
        />
      )
    },
    {
      key: 'featured',
      label: 'Featured',
      render: r => r.isFeatured ? (
        <Badge className="bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs">Featured</Badge>
      ) : (
        <span className="text-slate-500 text-xs">-</span>
      )
    },
    {
      key: 'actions',
      align: 'right',
      label: 'Action',
      render: r => (
        <div className="flex items-center justify-end gap-2" onClick={e => e.stopPropagation()}>
          <button 
            type="button"
            onClick={() => setModal(r)} 
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30" 
            title="Edit Service"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={() => setConfirmModal({ isOpen: true, id: r._id })} 
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30" 
            title="Delete Service"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ]

  const filtered = (rows || []).filter(r => 
    (r?.title || '').toLowerCase().includes((search || '').toLowerCase()) ||
    (r?.slug || '').toLowerCase().includes((search || '').toLowerCase()) ||
    (r?.shortDesc || '').toLowerCase().includes((search || '').toLowerCase())
  ).sort((a, b) => {
    if (sort === 'a-z') return (a.title || '').localeCompare(b.title || '')
    if (sort === 'z-a') return (b.title || '').localeCompare(a.title || '')
    if (sort === 'oldest') return (a.sort || 0) - (b.sort || 0)
    return (b.sort || 0) - (a.sort || 0)
  })

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Breadcrumb title="Services Management" crumbs={[{ label: 'Services' }]} />
      <TableToolbar 
        search={search} 
        onSearchChange={setSearch} 
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length} 
        onAdd={() => setModal('new')} 
        addLabel="Add Service" 
      />
      <DataTable 
        columns={columns} 
        data={filtered} 
        loading={loading} 
        onRowClick={(row) => setModal(row)} 
        actions={false} 
        selectedIds={selectedIds} 
        onToggleSelectAll={toggleSelectAll} 
        onToggleSelectRow={toggleSelectRow} 
      />
      {modal && (
        <ServiceModal 
          item={modal === 'new' ? null : modal} 
          nextSort={rows.length + 1} 
          onClose={() => setModal(null)} 
          onSave={handleSave} 
          saving={saving} 
        />
      )}
      <ConfirmDeleteModal 
        isOpen={confirmModal.isOpen} 
        onClose={() => setConfirmModal({ isOpen: false })} 
        onConfirm={() => handleDelete(confirmModal.id)} 
        title="Delete Service" 
        message="Are you sure you want to delete this service?" 
      />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}