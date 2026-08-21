'use client'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingTextarea } from '../../../components/ui/floating-input'
import { SortInput } from '../../../components/dashboard/SortInput'
import { Edit2, Trash2 } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = { name: '', designation: '', content: '', rating: 5, sort: 0, isActive: true }

function TestimonialModal({ item, nextSort = 1, onClose, onSave, saving }) {
  const [form, setForm] = useState(item ? { ...item, designation: item.designation || item.role, content: item.content || item.quote } : { ...EMPTY, sort: nextSort })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(item?.avatar || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form }, imageFile)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle className="text-2xl font-bold">{item ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput label="Client Name *" required value={form.name} onChange={e => f('name', e.target.value)} />
            <FloatingInput label="Role / Company *" required value={form.designation} onChange={e => f('designation', e.target.value)} />
          </div>
          <FloatingTextarea label="Quote *" required value={form.content} onChange={e => f('content', e.target.value)} rows={4} />
          
          <div className="border border-input/60 rounded-xl p-6 bg-muted/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-1">
              <label className="text-sm font-semibold text-foreground/80 mb-1 block">Avatar Image</label>
              <div className="flex items-center gap-4 mt-2">
                <label className="cursor-pointer text-sm font-medium bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                  Choose File
                  <input type="file" accept="image/*" onChange={e => { 
                    const file = e.target.files[0]; if (!file) return; setImageFile(file); setImagePreview(URL.createObjectURL(file))
                  }} className="hidden" />
                </label>
                <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                  {imageFile ? imageFile.name : 'No file chosen'}
                </span>
              </div>
            </div>
            {imagePreview && (
              <div className="shrink-0 bg-background p-1.5 rounded-full shadow-sm border border-border">
                <img src={imagePreview} alt="preview" className="w-16 h-16 rounded-full object-cover" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FloatingInput type="number" label="Rating (1-5)" value={form.rating} onChange={e => f('rating', e.target.value)} min="1" max="5" />
            <SortInput label="Sort Order" value={form.sort} isEditing={!!item} isAuto={!item} onChange={v => f('sort', v)} />
            <div className="flex items-center gap-3 h-[50px] border border-input/60 rounded-xl px-4">
              <Switch checked={form.isActive} onCheckedChange={c => f('isActive', c)} />
              <label className="text-sm font-semibold">Active</label>
            </div>
          </div>
          <DialogFooter className="pt-6 border-t">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Testimonial'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function TestimonialsPage() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [modal, setModal] = useState(null)
  const [search, setSearch] = useState(''); const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null })
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try { setLoading(true); const res = await fetch(`${BASE_URL}/api/testimonials`); const json = await res.json(); setRows(json.data || []); }
    catch (err) { addToast('Error: ' + err.message, 'error') } finally { setLoading(false) }
  }

  async function handleSave(form, imageFile) {
    try {
      setSaving(true); const fd = new FormData()
      Object.keys(form).forEach(k => fd.append(k, form[k] === null ? '' : form[k]))
      if (imageFile) fd.append('avatar', imageFile)
      
      const isEdit = Boolean(form._id)
      const res = await fetch(isEdit ? `${BASE_URL}/api/testimonials/${form._id}` : `${BASE_URL}/api/testimonials`, { method: isEdit ? 'PUT' : 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).message)
      addToast(isEdit ? 'Updated!' : 'Created!'); setModal(null); fetchItems();
    } catch (err) { addToast(err.message, 'error') } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false }); const res = await fetch(`${BASE_URL}/api/testimonials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(); addToast('Deleted.', 'warning'); setRows(r => r.filter(x => x._id !== id))
    } catch (err) {}
  }

  const columns = [
    { key: 'avatar', label: 'Avatar', render: r => <div className="w-10 h-10 bg-muted rounded-full overflow-hidden">{r.avatar && <img src={r.avatar} className="w-full h-full object-cover"/>}</div> },
    { key: 'name', label: 'Client', render: r => <div><div className="font-semibold">{r.name}</div><div className="text-xs text-muted-foreground">{r.designation || r.role}</div></div> },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.isActive} onCheckedChange={async () => { const newStatus = !r.isActive; setRows(prev => prev.map(x => x._id === r._id ? { ...x, isActive: newStatus } : x)); try { const fd = new FormData(); fd.append('isActive', newStatus.toString()); await fetch(`${BASE_URL}/api/testimonials/${r._id}`, { method: 'PUT', body: fd }); addToast(newStatus ? 'Status activated!' : 'Status deactivated!', newStatus ? 'success' : 'error'); } catch(e) { setRows(prev => prev.map(x => x._id === r._id ? { ...x, isActive: r.isActive } : x)); addToast('Error updating status', 'error'); } }} /> },
    { key: 'actions', align: 'right', label: 'Action', render: r => (
      <div className="flex gap-2 justify-end">
        <button onClick={e => { e.stopPropagation(); setModal(r); }} className="p-2 bg-blue-500/10 text-blue-600 rounded"><Edit2 className="w-4 h-4" /></button>
        <button onClick={e => { e.stopPropagation(); setConfirmModal({ isOpen: true, id: r._id }); }} className="p-2 bg-red-500/10 text-red-600 rounded"><Trash2 className="w-4 h-4" /></button>
      </div>
    )}
  ]
  const filtered = rows.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Breadcrumb title="Testimonials" crumbs={[{ label: 'Testimonials' }]} />
      <TableToolbar search={search} onSearchChange={setSearch} selectedCount={0} onAdd={() => setModal('new')} addLabel="Add Testimonial" />
      <DataTable columns={columns} data={filtered} loading={loading} onRowClick={setModal} actions={false} selectedIds={[]} onToggleSelectAll={()=>{}} onToggleSelectRow={()=>{}} />
      {modal && <TestimonialModal item={modal === 'new' ? null : modal} nextSort={rows.length + 1} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      <ConfirmDeleteModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false })} onConfirm={() => handleDelete(confirmModal.id)} title="Delete Testimonial" message="Are you sure?" />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}