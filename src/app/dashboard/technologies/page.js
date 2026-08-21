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
import { Edit2, Trash2 } from 'lucide-react'
import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss, SiFigma, SiGreensock, SiTypescript, SiSass,
  SiNodedotjs, SiPython, SiMongodb, SiDocker, SiPostgresql, SiGraphql, SiFirebase
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const EMPTY = { name: '', sub: '', image: '', color: '#FFFFFF', category: 'frontend', sort: 0, status: 'active' }

const iconMap = {
  'React': SiReact, 'Next.js': SiNextdotjs, 'Vue 3': SiVuedotjs, 'Tailwind CSS': SiTailwindcss,
  'Figma': SiFigma, 'GSAP': SiGreensock, 'TypeScript': SiTypescript, 'Sass': SiSass,
  'Node.js': SiNodedotjs, 'Python': SiPython, 'MongoDB': SiMongodb, 'Docker': SiDocker,
  'PostgreSQL': SiPostgresql, 'GraphQL': SiGraphql, 'Firebase': SiFirebase, 'AWS': FaAws
};

function TechnologyModal({ item, nextSort = 1, onClose, onSave, saving }) {
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-2xl font-bold">{item ? 'Edit Technology' : 'Add Technology'}</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-2">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FloatingInput label="Name *" required value={form.name} onChange={e => f('name', e.target.value)} placeholder="e.g. Next.js" />
            <FloatingInput label="Subtitle *" required value={form.sub} onChange={e => f('sub', e.target.value)} placeholder="e.g. React Framework" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FloatingSelect label="Category" value={form.category} onChange={e => f('category', e.target.value)}>
              <option value="frontend">Frontend (Top Row)</option>
              <option value="backend">Backend (Bottom Row)</option>
            </FloatingSelect>
            <div className="flex items-center gap-3">
              <input type="color" value={form.color} onChange={e => f('color', e.target.value)} className="h-10 w-14 p-1 rounded cursor-pointer bg-white/5 border border-white/10" />
              <div className="text-sm text-slate-400">Brand Color</div>
            </div>
          </div>
          
          <div className="relative w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:border-white/20">
            <div className="flex-1">
              <label className="block text-[13px] font-medium text-slate-400 mb-2">Icon Image (Optional)</label>
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
              <img src={imagePreview} alt="preview" className="h-12 w-12 rounded-lg object-contain border border-white/10 shrink-0 bg-slate-800 p-1" onError={(e) => { e.target.style.display = 'none' }} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FloatingSelect label="Status" value={form.status} onChange={e => f('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </FloatingSelect>
            <SortInput label="Sort Order" value={form.sort} isEditing={!!item} isAuto={!item} onChange={v => f('sort', v)} />
          </div>

          <DialogFooter className="pt-6 border-t border-white/10">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Technology'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function TechnologiesPage() {
  const [rows, setRows] = useState([]); const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [modal, setModal] = useState(null)
  const [search, setSearch] = useState(''); const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null })
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try { setLoading(true); const res = await fetch(`${BASE_URL}/api/technologies?all=true`); const json = await res.json(); setRows(json.data || []); }
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
      const res = await fetch(isEdit ? `${BASE_URL}/api/technologies/${form._id}` : `${BASE_URL}/api/technologies`, { method: isEdit ? 'PUT' : 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).message)
      addToast(isEdit ? 'Updated!' : 'Created!'); setModal(null); fetchItems();
    } catch (err) { addToast(err.message, 'error') } finally { setSaving(false) }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false }); const res = await fetch(`${BASE_URL}/api/technologies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(); addToast('Deleted.', 'warning'); setRows(r => r.filter(x => x._id !== id))
    } catch (err) {}
  }

  const columns = [
    { key: 'icon', label: 'Icon', render: r => {
      const IconComp = iconMap[r.name];
      return r.image ? (
        <img src={r.image} alt={r.name} className="h-10 w-10 object-contain rounded bg-slate-800 p-1" />
      ) : (
        IconComp ? <IconComp className="h-8 w-8 mx-auto" style={{ color: r.color }} /> : <div className="h-10 w-10 bg-slate-800 rounded flex items-center justify-center text-xs">None</div>
      )
    }},
    { key: 'name', label: 'Name', render: r => <div className="font-semibold">{r.name}</div> },
    { key: 'category', label: 'Category', render: r => <div className="text-sm text-slate-400 capitalize">{r.category}</div> },
    { key: 'color', label: 'Color', render: r => <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full" style={{ backgroundColor: r.color }}></div><span className="text-xs font-mono">{r.color}</span></div> },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.status === 'active'} onCheckedChange={async () => { const newStatus = r.status==='active'?'draft':'active'; setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: newStatus } : x)); try { const fd = new FormData(); fd.append('status', newStatus); await fetch(`${BASE_URL}/api/technologies/${r._id}`, { method: 'PUT', body: fd }); addToast(newStatus === 'active' ? 'Status activated!' : 'Status deactivated!', newStatus === 'active' ? 'success' : 'error'); } catch(e) { setRows(prev => prev.map(x => x._id === r._id ? { ...x, status: r.status } : x)); addToast('Error updating status', 'error'); } }} /> },
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
      <Breadcrumb title="Technologies Management" crumbs={[{ label: 'Technologies' }]} />
      <TableToolbar search={search} onSearchChange={setSearch} selectedCount={0} onAdd={() => setModal('new')} addLabel="Add Technology" />
      <DataTable columns={columns} data={filtered} loading={loading} onRowClick={setModal} actions={false} selectedIds={[]} onToggleSelectAll={()=>{}} onToggleSelectRow={()=>{}} />
      {modal && <TechnologyModal item={modal === 'new' ? null : modal} nextSort={rows.length + 1} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      <ConfirmDeleteModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false })} onConfirm={() => handleDelete(confirmModal.id)} title="Delete Technology" message="Are you sure?" />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
