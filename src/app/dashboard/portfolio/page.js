'use client'
import AIAssistantButton from '../../../components/dashboard/AIAssistantButton'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import RichEditor from '../../../components/dashboard/RichEditor'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingTextarea, FloatingSelect } from '../../../components/ui/floating-input'
import { SlugInput } from '../../../components/dashboard/SlugInput'
import { SortInput } from '../../../components/dashboard/SortInput'
import { Edit2, Trash2, ImageIcon } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = {
  title: '', slug: '', category: '', shortDesc: '', description: '',
  clientName: '', projectUrl: '', technologies: '', sort: 0,
  isFeatured: false, status: 'active',
  themeColor: '', themeTextColor: ''
}

function PortfolioModal({ item, nextSort = 1, onClose, onSave, saving }) {
  const [form, setForm] = useState(item ? {
    ...item,
    technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || '')
  } : { ...EMPTY, sort: nextSort })

  const [slugLinked, setSlugLinked] = useState(!item)
  const [sortIsAuto, setSortIsAuto] = useState(!item)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(item?.image || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const toSlug = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form }, imageFile)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item ? 'Edit Project' : 'Add Project'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Project Title *" required value={form.title} onChange={e => {
              f('title', e.target.value)
              if (slugLinked) f('slug', toSlug(e.target.value))
            }} />
            <SlugInput label="Slug *" required value={form.slug} isEditing={!!item} linked={slugLinked}
              onToggleLink={() => {
                const nextLinked = !slugLinked; setSlugLinked(nextLinked);
                if (nextLinked) f('slug', toSlug(form.title));
              }}
              onChange={v => { setSlugLinked(false); f('slug', v); }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingSelect label="Category" value={form.category || "Dynamic Website"} onChange={e => f('category', e.target.value)}>
              <option value="Static Website">Static Website</option>
              <option value="Dynamic Website">Dynamic Website</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Mobile App">Mobile App</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Branding">Branding</option>
              <option value="Other">Other</option>
            </FloatingSelect>
            <FloatingInput label="Client Name" value={form.clientName} onChange={e => f('clientName', e.target.value)} />
          </div>
          <FloatingInput label="Project URL" value={form.projectUrl} onChange={e => f('projectUrl', e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Background (Hex or Gradient)" value={form.themeColor || ''} onChange={e => f('themeColor', e.target.value)} />
            <FloatingInput label="Hover Text Color" value={form.themeTextColor || ''} onChange={e => f('themeTextColor', e.target.value)} />
          </div>
          <FloatingInput label="Technologies (comma separated)" value={form.technologies} onChange={e => f('technologies', e.target.value)} />
          <FloatingTextarea label="Short Description" value={form.shortDesc} onChange={e => f('shortDesc', e.target.value)} rows={2} />
          
          <div className="space-y-2">
            <label className="text-sm font-semibold">Full Description</label>
            <div className="border border-input/60 rounded-xl overflow-hidden">
              <RichEditor value={form.description} onChange={v => f('description', v)} placeholder="Full project details..." />
            </div>
          </div>

          <div className="border border-input/60 rounded-xl p-6 bg-muted/10">
            <label className="text-sm font-semibold mb-1 block">Project Image</label>
            <input type="file" accept="image/*" onChange={handleFile} className="flex h-11 w-full rounded-xl border border-input/60 bg-background px-4 py-2 text-sm" />
            {imagePreview && <img src={imagePreview} alt="preview" className="mt-4 max-h-32 rounded-lg object-cover" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FloatingSelect label="Status" value={form.status} onChange={e => f('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </FloatingSelect>
            <SortInput label="Sort Order" value={form.sort} isEditing={!!item} isAuto={sortIsAuto} onManualEdit={() => setSortIsAuto(false)} onChange={v => f('sort', v)} />
            <div className="flex items-center gap-3 h-[50px] border border-input/60 rounded-xl px-4">
              <Switch checked={form.isFeatured} onCheckedChange={c => f('isFeatured', c)} />
              <label className="text-sm font-semibold">Featured</label>
            </div>
          </div>
          
          <DialogFooter className="pt-6 border-t">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Project'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function PortfolioPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modal, setModal] = useState(null)
  
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'single', id: null })

  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/portfolio`)
      const json = await res.json()
      setRows(json.data || [])
    } catch (err) { addToast('Error: ' + err.message, 'error') } finally { setLoading(false) }
  }

  async function handleSave(form, imageFile) {
    try {
      setSaving(true)
      const fd = new FormData()
      Object.keys(form).forEach(k => {
        if (k === 'technologies') fd.append(k, JSON.stringify(form[k].split(',').map(t=>t.trim()).filter(Boolean)))
        else fd.append(k, form[k] === null ? '' : form[k])
      })
      if (imageFile) fd.append('image', imageFile)
      
      const isEdit = Boolean(form._id)
      const res = await fetch(isEdit ? `${BASE_URL}/api/portfolio/${form._id}` : `${BASE_URL}/api/portfolio`, {
        method: isEdit ? 'PUT' : 'POST', body: fd
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      addToast(isEdit ? 'Updated!' : 'Created!')
      setModal(null); fetchItems();
    } catch (err) { addToast(err.message, 'error') } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false, type: 'single' })
      setDeletingId(id)
      const res = await fetch(`${BASE_URL}/api/portfolio/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      addToast('Deleted.', 'warning')
      setRows(r => r.filter(x => x._id !== id))
    } catch (err) { addToast('Delete failed', 'error') } finally { setDeletingId(null) }
  }

  async function handleToggleStatus(id, currentStatus) {
    try {
      const fd = new FormData()
      fd.append('status', currentStatus === 'active' ? 'draft' : 'active')
      await fetch(`${BASE_URL}/api/portfolio/${id}`, { method: 'PUT', body: fd })
      setRows(r => r.map(x => x._id === id ? { ...x, status: currentStatus === 'active' ? 'draft' : 'active' } : x))
    } catch (err) {}
  }

  const columns = [
    { key: 'image', label: 'Image', render: r => <div className="w-16 h-12 bg-muted rounded overflow-hidden">{r.image && <img src={r.image} className="w-full h-full object-cover"/>}</div> },
    { key: 'title', label: 'Project', render: r => <div className="font-semibold">{r.title}</div> },
    { key: 'category', label: 'Category', render: r => <Badge variant="outline">{r.category}</Badge> },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.status === 'active'} onCheckedChange={() => handleToggleStatus(r._id, r.status)} /> },
    { key: 'featured', label: 'Featured', render: r => r.isFeatured ? <Badge className="bg-amber-500/20 text-amber-600">Featured</Badge> : '-' },
    { key: 'actions', align: 'right', label: 'Action', render: r => (
      <div className="flex gap-2 justify-end">
        <button onClick={e => { e.stopPropagation(); setModal(r); }} className="p-2 bg-blue-500/10 text-blue-600 rounded"><Edit2 className="w-4 h-4" /></button>
        <button onClick={e => { e.stopPropagation(); setConfirmModal({ isOpen: true, type: 'single', id: r._id }); }} className="p-2 bg-red-500/10 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
      </div>
    )}
  ]

  const filtered = rows.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Breadcrumb title="Portfolio Projects" crumbs={[{ label: 'Portfolio' }]} />
      <TableToolbar search={search} onSearchChange={setSearch} selectedCount={selectedIds.length} onAdd={() => setModal('new')} addLabel="Add Project" />
      <DataTable columns={columns} data={filtered} loading={loading} onRowClick={setModal} actions={false} selectedIds={selectedIds} onToggleSelectAll={() => setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(x=>x._id))} onToggleSelectRow={id => setSelectedIds(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])} />
      {modal && <PortfolioModal item={modal === 'new' ? null : modal} nextSort={rows.length + 1} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      <ConfirmDeleteModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, type: 'single' })} onConfirm={() => handleDelete(confirmModal.id)} title="Delete Project" message="Are you sure?" />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}