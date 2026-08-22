'use client'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'
import { Button } from '../../../components/ui/button'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingSelect } from '../../../components/ui/floating-input'
import { SortInput } from '../../../components/dashboard/SortInput'
import { Edit2, Trash2, Image as ImageIcon } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = { name: '', image: '', hasBg: false, sort: 0, status: 'active' }

function ClientModal({ item, nextSort = 1, onClose, onSave, saving }) {
  const [form, setForm] = useState(item ? { ...item } : { ...EMPTY, sort: nextSort })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(item?.image || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form }, imageFile)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item ? 'Edit Client' : 'Add Client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          <FloatingInput label="Client Name *" required value={form.name} onChange={e => f('name', e.target.value)} />
          
          <div className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-white/20">
            <div className="flex-1">
              <label className="block text-[13px] font-medium text-slate-400 mb-2">Client Logo</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer text-sm font-medium bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                  Choose File
                  <input type="file" className="hidden" accept="image/*" onChange={e => {
                    const file = e.target.files[0]; if (!file) return; setImageFile(file); setImagePreview(URL.createObjectURL(file))
                  }} />
                </label>
                <span className="text-sm text-slate-400 truncate max-w-[140px]">{imageFile ? imageFile.name : 'No file chosen'}</span>
              </div>
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="preview" className="h-14 w-auto max-w-[100px] rounded-lg object-contain bg-white/10 p-1 border border-white/10 shrink-0" />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FloatingSelect label="Status" value={form.status} onChange={e => f('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </FloatingSelect>
            <SortInput label="Sort Order" value={form.sort} isEditing={!!item} isAuto={false} onManualEdit={() => {}} onChange={v => f('sort', v)} />
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={form.hasBg} onCheckedChange={c => f('hasBg', c)} />
            <label className="text-sm text-slate-400">Display background on logo container</label>
          </div>

          <DialogFooter className="pt-6 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Client'}</Button>
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
    try { setLoading(true); const res = await fetch(`${BASE_URL}/api/clients`); const json = await res.json(); setRows(json.data || []); }
    catch (err) { addToast('Error: ' + err.message, 'error') } finally { setLoading(false) }
  }

  async function handleSave(form, imageFile) {
    try {
      setSaving(true); const fd = new FormData()
      Object.keys(form).forEach(k => {
        fd.append(k, form[k] === null ? '' : form[k])
      })
      if (imageFile) fd.append('image', imageFile)
      
      const isEdit = Boolean(form._id)
      const res = await fetch(isEdit ? `${BASE_URL}/api/clients/${form._id}` : `${BASE_URL}/api/clients`, { method: isEdit ? 'PUT' : 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).message)
      addToast(isEdit ? 'Updated!' : 'Created!'); setModal(null); fetchItems();
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
    { key: 'name', label: 'Client Name', render: r => <div className="font-semibold text-white text-sm">{r.name}</div> },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.status === 'active'} onCheckedChange={async () => { const newStatus = r.status==='active'?'draft':'active'; setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: newStatus } : x)); try { const fd = new FormData(); fd.append('status', newStatus); await fetch(`${BASE_URL}/api/clients/${r._id}`, { method: 'PUT', body: fd }); addToast(newStatus === 'active' ? 'Status activated!' : 'Status deactivated!', newStatus === 'active' ? 'success' : 'error'); } catch(e) { setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: r.status } : x)); addToast('Error updating status', 'error'); } }} /> },
    { key: 'actions', align: 'right', label: 'Action', render: r => (
      <div className="flex items-center justify-end gap-3.5" onClick={e => e.stopPropagation()}>
        <button 
          type="button"
          onClick={() => setModal(r)} 
          className="p-1 text-blue-500 hover:text-blue-400 transition-colors" 
          title="Edit Client"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => setConfirmModal({ isOpen: true, id: r._id })} 
          className="p-1 text-red-500 hover:text-red-400 transition-colors" 
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )}
  ]
  const filtered = rows.filter(r => r.name.toLowerCase().includes(search.toLowerCase()))

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
