'use client'
import AIAssistantButton from '../../../components/dashboard/AIAssistantButton'
import { useState, useEffect } from 'react'
import Breadcrumb from '../../../components/dashboard/Breadcrumb'
import DataTable from '../../../components/dashboard/DataTable'
import TableToolbar from '../../../components/dashboard/TableToolbar'
import Toast from '../../../components/dashboard/Toast'
import RichEditor from '../../../components/dashboard/RichEditor'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import { Badge } from '../../../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../components/ui/dialog'
import { Switch } from '../../../components/ui/switch'
import { FloatingInput, FloatingSelect } from '../../../components/ui/floating-input'
import { Edit2, Trash2, Plus, Briefcase, Mail, Phone, Palette } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'

const BASE_URL = ''
const DEPTS = ['Management', 'Operations', 'Quality', 'HR', 'Sales', 'Finance', 'R&D', 'Maintenance']
const EMPTY = { name: '', role: '', designation: '', department: 'Management', email: '', phone: '', bio: '', image: '', color: '#FFFFFF', linkedin: '', twitter: '', instagram: '', sort: 1 }

function MemberModal({ member, onClose, onSave, saving }) {
  const [form, setForm] = useState(member || EMPTY)
  const [tab, setTab] = useState('basic')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(member?.image || '')

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{member ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          <p className="text-muted-foreground text-sm">Fill out the information below to {member ? 'update' : 'create'} this team profile.</p>
        </DialogHeader>
        <form onSubmit={e => { e.preventDefault(); onSave(form, imageFile) }} className="space-y-6 mt-2">
          
          <div className="flex gap-6 border-b border-border px-2">
            {[['basic', 'Basic Info'], ['bio', 'Bio / Profile'], ['media', 'Photo & Styling'], ['social', 'Social Links']].map(([key, label]) => (
              <button key={key} type="button" onClick={() => setTab(key)} 
                className={`py-3 text-[14px] font-semibold transition-colors relative ${
                  tab === key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
                {tab === key && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-md" />}
              </button>
            ))}
          </div>

          <div className="py-2 space-y-6">
            {tab === 'basic' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingInput label="Full Name *" required value={form.name} onChange={e => f('name', e.target.value)} placeholder="Use <br> for multi-line" />
                  <FloatingInput label="Carousel Role *" required value={form.role} onChange={e => f('role', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FloatingInput label="Full Designation" value={form.designation} onChange={e => f('designation', e.target.value)} rightElement={<AIAssistantButton context={form.name || 'Team Member'} field="Professional Job Title" onGenerate={(val) => f('designation', val)} />} />
                  <FloatingSelect label="Department" value={form.department} onChange={e => f('department', e.target.value)}>
                    {DEPTS.map(d => <option key={d}>{d}</option>)}
                  </FloatingSelect>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FloatingInput type="email" label="Email" value={form.email} onChange={e => f('email', e.target.value)} />
                  <FloatingInput label="Phone" value={form.phone} onChange={e => f('phone', e.target.value)} />
                  <FloatingInput type="number" min="1" label="Sort Order" value={form.sort} onChange={e => f('sort', e.target.value)} />
                </div>
              </div>
            )}
            
            {tab === 'bio' && (
               <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-foreground/80 block">Bio / Profile</label>
                  <AIAssistantButton context={form.name} field="Professional team member bio" onGenerate={(val) => f('bio', val)} />
                </div>
                <div className="border border-input/60 rounded-xl overflow-hidden shadow-sm">
                  <RichEditor value={form.bio} onChange={v => f('bio', v)} placeholder="Write a short professional bio..." minHeight={220} />
                </div>
              </div>
            )}
            
            {tab === 'media' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="border border-input/60 rounded-xl p-6 bg-muted/10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-foreground/80 mb-1 block">Profile Photo</label>
                    <p className="text-[11px] text-muted-foreground mb-4">Square transparent PNG recommended.</p>
                    <div className="flex items-center gap-4">
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
                      <img src={imagePreview} alt="preview" className="w-20 h-20 rounded-full object-cover" />
                    </div>
                  )}
                </div>

                <div className="border border-input/60 rounded-xl p-6 bg-muted/10">
                  <label className="text-sm font-semibold text-foreground/80 mb-1 block">Carousel Pill Color</label>
                  <p className="text-[11px] text-muted-foreground mb-4">Background color for the team carousel pill.</p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-input/60 shadow-sm">
                      <input type="color" value={form.color} onChange={e => f('color', e.target.value)} className="absolute -top-2 -left-2 w-20 h-20 cursor-pointer" />
                    </div>
                    <span className="font-mono text-sm font-medium text-foreground/80 px-3 py-1.5 bg-background rounded-md border border-border">{form.color}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'social' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <FloatingInput label="LinkedIn URL" value={form.linkedin} onChange={e => f('linkedin', e.target.value)} />
                 <FloatingInput label="Twitter URL" value={form.twitter} onChange={e => f('twitter', e.target.value)} />
                 <FloatingInput label="Instagram URL" value={form.instagram} onChange={e => f('instagram', e.target.value)} />
              </div>
            )}
          </div>

          <DialogFooter className="pt-6 border-t border-border mt-6">
            <Button variant="ghost" type="button" onClick={onClose} disabled={saving} className="rounded-full px-6 text-muted-foreground hover:bg-muted/50 font-medium">Cancel</Button>
            <Button type="submit" disabled={saving} className="rounded-full px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[15px] shadow-lg shadow-blue-500/30 transition-transform active:scale-95">
              {saving ? 'Saving...' : 'Save Member'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function TeamPage() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  
  // Standard states
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')
  const [selectedIds, setSelectedIds] = useState([])
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [toasts, setToasts] = useState([])
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'single', id: null })
  const [deletingId, setDeletingId] = useState(null)
  
  const addToast = (msg, type = 'success') => setToasts(t => [...t, { id: Date.now(), message: msg, type }])
  const stripHtml = html => (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

  useEffect(() => { fetchItems() }, [])

  async function fetchItems() {
    try { setLoading(true); const res = await fetch(`${BASE_URL}/api/team?all=true`); const json = await res.json(); setMembers(json.data || []); }
    catch (err) { addToast('Error: ' + err.message, 'error') } finally { setLoading(false) }
  }

  async function handleSave(form, imageFile) {
    try {
      setSaving(true)
      const fd = new FormData()
      Object.keys(form).forEach(k => { fd.append(k, form[k] === null ? '' : form[k]) })
      if (imageFile) fd.append('image', imageFile)
      
      const isEdit = Boolean(form._id)
      const res = await fetch(isEdit ? `${BASE_URL}/api/team/${form._id}` : `${BASE_URL}/api/team`, { method: isEdit ? 'PUT' : 'POST', body: fd })
      if (!res.ok) throw new Error((await res.json()).message)
      addToast(isEdit ? 'Updated!' : 'Created!'); setModal(null); fetchItems();
    } catch (err) { addToast(err.message, 'error') } finally { setSaving(false) }
  }

  async function handleBulkDelete() {
    try {
      setConfirmModal({ isOpen: false, type: 'bulk', id: null })
      setBulkDeleting(true)
      for (const id of selectedIds) {
        await fetch(`${BASE_URL}/api/team/${id}`, { method: 'DELETE' })
      }
      setSelectedIds([])
      addToast('Members deleted', 'warning')
      fetchItems()
    } catch (err) {
      addToast('Error deleting members: ' + err.message, 'error')
    } finally {
      setBulkDeleting(false)
    }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false, type: 'single', id: null })
      setDeletingId(id)
      const res = await fetch(`${BASE_URL}/api/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(); addToast('Deleted.', 'warning'); setMembers(r => r.filter(x => x._id !== id))
    } catch (err) { addToast('Delete failed', 'error') } finally { setDeletingId(null) }
  }

  async function handleToggleStatus(id, currentStatus) {
    try {
      const fd = new FormData()
      fd.append('status', currentStatus === 'active' ? 'draft' : 'active')
      await fetch(`${BASE_URL}/api/team/${id}`, { method: 'PUT', body: fd })
      setMembers(m => m.map(x => x._id === id ? { ...x, status: currentStatus === 'active' ? 'draft' : 'active' } : x))
      addToast('Status updated!')
    } catch (err) {}
  }

  const filteredMembers = members
    .filter(m => 
      m.name?.toLowerCase().includes(search.toLowerCase()) || 
      m.role?.toLowerCase().includes(search.toLowerCase()) ||
      m.department?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.name || '').localeCompare(b.name || '')
      if (sort === 'z-a') return (b.name || '').localeCompare(a.name || '')
      return (a.sort || 0) - (b.sort || 0)
    })

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredMembers.length) setSelectedIds([])
    else setSelectedIds(filteredMembers.map(x => x._id))
  }

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const columns = [
    {
      key: 'photo',
      label: 'Photo',
      render: (m) => (
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center overflow-hidden bg-primary/10 text-primary font-bold shadow-sm">
          {m.image ? (
            <img src={m.image} alt="photo" className="w-full h-full object-cover" />
          ) : (
            <span>{m.name.charAt(0)}</span>
          )}
        </div>
      )
    },
    {
      key: 'details',
      label: 'Member Details',
      render: (m) => (
        <div className="flex flex-col">
          <span className="font-semibold text-[14px] text-foreground" dangerouslySetInnerHTML={{ __html: m.name }}></span>
          <span className="text-xs font-medium text-primary mt-0.5">{m.role || m.designation}</span>
        </div>
      )
    },
    {
      key: 'color',
      label: 'Pill Color',
      render: (m) => (
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: m.color }}></div><span className="text-xs font-mono">{m.color}</span></div>
      )
    },
    {
      key: 'contact',
      label: 'Contact Info',
      render: (m) => (
        <div className="flex flex-col gap-1.5 text-[12px] text-muted-foreground">
          {m.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {m.email}</span>}
          {m.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {m.phone}</span>}
        </div>
      )
    },
    {
      key: 'sort',
      label: 'Sort',
      render: (m) => (
        <span className="font-medium text-muted-foreground text-sm">{m.sort}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (m) => (
        <Switch 
          checked={m.status === 'active'}
          onCheckedChange={() => handleToggleStatus(m._id, m.status)}
          onClick={(e) => e.stopPropagation()}
        />
      )
    },
    {
      key: 'actions',
      align: 'right',
      label: 'Action',
      render: (m) => (
        <div className="flex items-center justify-end gap-2">
          <button onClick={(e) => { e.stopPropagation(); setModal(m); }} className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setConfirmModal({ isOpen: true, type: 'single', id: m._id }); }} disabled={deletingId === m._id} className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50">
            {deletingId === m._id ? <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      )
    }
  ]

  const extraActions = (
    <Link href="/dashboard/team/jobs">
      <Button variant="outline" className="rounded-full px-4 h-10 font-medium whitespace-nowrap">
        <Briefcase className="w-4 h-4 mr-1.5" /> Job Openings
      </Button>
    </Link>
  )

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb 
        title="Team Management" 
        subtitle={`Manage your team members and profiles (${members.length} total)`}
        crumbs={[{ label: 'Team Management' }]} 
      />
      
      <TableToolbar 
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
        bulkDeleting={bulkDeleting}
        onAdd={() => setModal('new')}
        addLabel="Add Member"
        extraActions={extraActions}
      />

      <DataTable 
        columns={columns}
        data={filteredMembers}
        loading={loading}
        onRowClick={(row) => setModal(row)}
        actions={false}
        selectedIds={selectedIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectRow={toggleSelect}
      />

      {modal && <MemberModal member={modal === 'new' ? null : modal} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={confirmModal.type === 'single' ? deletingId === confirmModal.id : bulkDeleting}
        onClose={() => setConfirmModal({ isOpen: false, type: 'single', id: null })}
        onConfirm={() => confirmModal.type === 'single' ? handleDelete(confirmModal.id) : handleBulkDelete()}
        title={confirmModal.type === 'single' ? "Remove Member" : "Bulk Delete"}
        message={confirmModal.type === 'single' 
          ? "Are you sure you want to remove this team member? This action cannot be undone." 
          : `Are you sure you want to remove ${selectedIds.length} members? This action cannot be undone.`}
      />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}
