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
import { Edit2, Trash2, ImageIcon, Video, Sparkles, Upload, Play, RefreshCw } from 'lucide-react'
import ConfirmDeleteModal from '../../../components/dashboard/ConfirmDeleteModal'
import PortfolioThemePicker from '../../../components/dashboard/PortfolioThemePicker'

const BASE_URL = ''
const EMPTY = {
  title: '', slug: '', category: '', shortDesc: '', description: '',
  clientName: '', projectUrl: '', technologies: '', sort: 0,
  isFeatured: false, status: 'active',
  themeColor: '', themeTextColor: ''
}

function ContactVideoModal({ onClose, onSaved }) {
  const [videoUrl, setVideoUrl] = useState('/assets/img/portfolio/chips-vmake1.mp4')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('/assets/img/portfolio/chips-vmake1.mp4')
  const [formTitle, setFormTitle] = useState('Send Us a Message')
  const [formSubtitle, setFormSubtitle] = useState("Fill out the form below and we'll be in touch shortly.")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const res = await fetch('/api/contact-page')
        const json = await res.json()
        if (json.data) {
          if (json.data.connectVideoUrl) {
            setVideoUrl(json.data.connectVideoUrl)
            setVideoPreview(json.data.connectVideoUrl)
          }
          if (json.data.connectFormTitle) setFormTitle(json.data.connectFormTitle)
          if (json.data.connectFormSubtitle) setFormSubtitle(json.data.connectFormSubtitle)
        }
      } catch (e) {
        console.error('Failed to load contact video settings:', e)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setVideoFile(file)
    const previewUrl = URL.createObjectURL(file)
    setVideoPreview(previewUrl)
  }

  function isVideoSrc(src) {
    if (!src) return true;
    // Blob URL from file — detect from file type if videoFile is set
    if (src.startsWith('blob:')) {
      return videoFile ? videoFile.type.startsWith('video/') : true;
    }
    return /\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(src);
  }

  function handleUrlChange(val) {
    setVideoUrl(val)
    setVideoFile(null)
    setVideoPreview(val)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      const fd = new FormData()
      if (videoFile) {
        fd.append('connectVideo', videoFile)
      } else {
        fd.append('connectVideoUrl', videoUrl)
      }
      fd.append('connectFormTitle', formTitle)
      fd.append('connectFormSubtitle', formSubtitle)

      const res = await fetch('/api/contact-page', {
        method: 'PUT',
        body: fd
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Failed to update video settings')
      onSaved('Contact form video & settings updated successfully!')
      onClose()
    } catch (err) {
      alert(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && !saving && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Contact Form 3D Video & Content</DialogTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage the 3D loop video and message text shown next to the contact form on the Projects page.
              </p>
            </div>
          </div>
        </DialogHeader>

        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" /> Loading video settings...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Live Video Player Preview */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Live Video Preview
                </label>
                <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 aspect-square flex items-center justify-center shadow-xl">
                  {videoPreview ? (
                    isVideoSrc(videoPreview) ? (
                      <video 
                        key={videoPreview}
                        src={videoPreview} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        controls
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <img
                        key={videoPreview}
                        src={videoPreview}
                        alt="Media preview"
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="text-center p-6 text-muted-foreground text-xs">
                      <Video className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      No media selected
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Preview
                  </div>
                </div>

                {/* Preset Selector */}
                <div style={{ paddingTop: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 500, display: 'block', marginBottom: '8px' }}>Quick Presets:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleUrlChange('/assets/img/portfolio/chips-vmake1.mp4')}
                      style={{
                        fontSize: '12px',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: videoUrl === '/assets/img/portfolio/chips-vmake1.mp4' && !videoFile
                          ? '1px solid rgba(82, 164, 54, 0.5)'
                          : '1px solid rgba(255,255,255,0.1)',
                        backgroundColor: videoUrl === '/assets/img/portfolio/chips-vmake1.mp4' && !videoFile
                          ? 'rgba(82, 164, 54, 0.15)'
                          : 'rgba(255,255,255,0.04)',
                        color: videoUrl === '/assets/img/portfolio/chips-vmake1.mp4' && !videoFile
                          ? '#86efac'
                          : 'rgba(255,255,255,0.5)',
                        fontWeight: videoUrl === '/assets/img/portfolio/chips-vmake1.mp4' && !videoFile ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      3D Torus Loop (Default)
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Upload & Form Fields */}
              <div className="space-y-4">
                {/* Upload File */}
                <div className="border border-dashed border-input/80 rounded-2xl p-4 bg-muted/5 hover:bg-muted/10 transition-colors">
                  <label className="text-xs font-bold text-foreground block mb-1.5 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    Upload Video or Image (.mp4, .webm, .mov, .jpg, .png, .gif, .webp)
                  </label>
                  <input 
                    type="file" 
                    accept="video/mp4,video/webm,video/quicktime,video/ogg,image/jpeg,image/png,image/gif,image/webp,image/svg+xml" 
                    onChange={handleFileChange}
                    className="flex h-10 w-full rounded-xl border border-input/60 bg-background px-3 py-1.5 text-xs file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 cursor-pointer"
                  />
                  {videoFile && (
                    <p className="text-[11px] text-emerald-400 mt-1.5 font-medium flex items-center gap-1">
                      {videoFile.type.startsWith('video/') ? '🎬' : '🖼️'}
                      {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                  )}
                </div>

                {/* Direct URL */}
                <div>
                  <FloatingInput 
                    label="Or Enter Media URL / Path (video or image)" 
                    value={videoFile ? '' : videoUrl} 
                    disabled={!!videoFile}
                    onChange={e => handleUrlChange(e.target.value)} 
                    placeholder="/assets/img/portfolio/my-video.mp4 or image.jpg"
                  />
                </div>

                {/* Form Title */}
                <div>
                  <FloatingInput 
                    label="Form Title *" 
                    required 
                    value={formTitle} 
                    onChange={e => setFormTitle(e.target.value)} 
                  />
                </div>

                {/* Form Subtitle */}
                <div>
                  <FloatingTextarea 
                    label="Form Subtitle" 
                    rows={2} 
                    value={formSubtitle} 
                    onChange={e => setFormSubtitle(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t gap-2">
              <Button variant="ghost" type="button" onClick={onClose} disabled={saving}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saving}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/30"
              >
                {saving ? 'Saving...' : 'Save Video Settings'}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
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
          <PortfolioThemePicker
            themeColor={form.themeColor}
            themeTextColor={form.themeTextColor}
            onThemeColorChange={v => f('themeColor', v)}
            onThemeTextColorChange={v => f('themeTextColor', v)}
            projectTitle={form.title}
          />
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
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  
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
      const newStatus = currentStatus === 'active' ? 'draft' : 'active'
      const fd = new FormData()
      fd.append('status', newStatus)
      await fetch(`${BASE_URL}/api/portfolio/${id}`, { method: 'PUT', body: fd })
      setRows(r => r.map(x => x._id === id ? { ...x, status: newStatus } : x))
      addToast(newStatus === 'active' ? 'Status activated!' : 'Status deactivated!', newStatus === 'active' ? 'success' : 'error')
    } catch (err) {}
  }

  const columns = [
    { 
      key: 'image', 
      label: 'Image', 
      render: r => (
        <div className="w-16 h-10 rounded-md border border-white/10 overflow-hidden bg-black/40 flex items-center justify-center shrink-0 shadow-sm">
          {r.image ? (
            <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-white/40">
              <ImageIcon className="w-4 h-4 text-emerald-400/60" />
            </div>
          )}
        </div>
      )
    },
    { key: 'title', label: 'Project', render: r => <div className="font-semibold text-white text-sm">{r.title}</div> },
    { key: 'category', label: 'Category', render: r => <Badge variant="outline" className="bg-muted text-foreground/80 font-medium capitalize">{r.category}</Badge> },
    { key: 'status', label: 'Active', render: r => <Switch checked={r.status === 'active'} onCheckedChange={() => handleToggleStatus(r._id, r.status)} /> },
    { key: 'featured', label: 'Featured', render: r => r.isFeatured ? <Badge className="bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs">Featured</Badge> : <span className="text-slate-500 text-xs">-</span> },
    { key: 'actions', align: 'right', label: 'Action', render: r => (
      <div className="flex items-center justify-end gap-3.5" onClick={e => e.stopPropagation()}>
        <button 
          type="button"
          onClick={() => setModal(r)} 
          className="p-1 text-blue-500 hover:text-blue-400 transition-colors" 
          title="Edit Project"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button 
          type="button"
          onClick={() => setConfirmModal({ isOpen: true, type: 'single', id: r._id })} 
          className="p-1 text-red-500 hover:text-red-400 transition-colors" 
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )}
  ]

  const filtered = rows.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <Breadcrumb title="Portfolio Projects" crumbs={[{ label: 'Portfolio' }]} />
      <TableToolbar 
        search={search} 
        onSearchChange={setSearch} 
        selectedCount={selectedIds.length} 
        onAdd={() => setModal('new')} 
        addLabel="Add Project"
        extraActions={
          <button 
            type="button"
            onClick={() => setVideoModalOpen(true)}
            style={{
              height: '40px',
              padding: '0 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(82, 164, 54, 0.12)',
              color: '#52a436',
              border: '1px solid rgba(82, 164, 54, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.22)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.12)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Video style={{ width: '15px', height: '15px' }} />
            Manage Form Video
          </button>
        }
      />
      <DataTable columns={columns} data={filtered} loading={loading} onRowClick={setModal} actions={false} selectedIds={selectedIds} onToggleSelectAll={() => setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(x=>x._id))} onToggleSelectRow={id => setSelectedIds(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])} />
      {modal && <PortfolioModal item={modal === 'new' ? null : modal} nextSort={rows.length + 1} onClose={() => setModal(null)} onSave={handleSave} saving={saving} />}
      {videoModalOpen && <ContactVideoModal onClose={() => setVideoModalOpen(false)} onSaved={msg => addToast(msg, 'success')} />}
      <ConfirmDeleteModal isOpen={confirmModal.isOpen} onClose={() => setConfirmModal({ isOpen: false, type: 'single' })} onConfirm={() => handleDelete(confirmModal.id)} title="Delete Project" message="Are you sure?" />
      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}