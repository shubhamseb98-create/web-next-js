'use client'
import { useState, useEffect } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { FloatingInput } from '../../../../components/ui/floating-input'
import RichEditor from '../../../../components/dashboard/RichEditor'
import { Save, Image as ImageIcon, RotateCcw } from 'lucide-react'

const BASE_URL = ''

export default function CtaOnePage() {
  const [form, setForm] = useState({ title: '', content: '', image: '' })
  const [recordId, setRecordId] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    setToasts(t => [...t, { id: Date.now(), message, type }])
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== t[t.length - 1]?.id))
    }, 4000)
  }

  useEffect(() => {
    fetchCta()
  }, [])

  async function fetchCta() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/cta`)
      if (!res.ok) throw new Error('Failed to fetch CTA')
      const data = await res.json()
      if (data.length > 0) {
        const record = data[0]
        setRecordId(record._id)
        setForm({ title: record.title || '', content: record.content || '', image: record.image || '' })
        setPreview(record.image || '')
      }
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      const fd = new FormData()
      fd.append('title', form.title || '')
      fd.append('content', form.content || '')
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch(`${BASE_URL}/api/cta`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Save failed')
      addToast('CTA saved successfully!')
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground animate-pulse">Loading CTA Data...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Breadcrumb title="Some CTA" crumbs={[{ label: 'Home Management' }, { label: 'Some CTA' }]} />
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8 w-full">
        <Card className="border-0 shadow-sm shadow-primary/5 bg-background">
          <CardHeader className="border-b border-border/40 px-6 py-4 bg-card rounded-t-2xl">
            <CardTitle className="text-base font-bold text-foreground">Edit CTA Section</CardTitle>
            <p className="text-sm text-muted-foreground" style={{ margin: 0, marginTop: '4px' }}>Update the content and background image for the CTA section.</p>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-8 bg-card" style={{ padding: '24px' }}>
              
              <div 
                className="rounded-xl shadow-sm overflow-hidden"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.05)', marginBottom: '24px', padding: '24px' }}
              >
                <label className="font-bold text-foreground block mb-6" style={{ fontSize: '14px' }}>Background / Feature Image</label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-semibold text-foreground/75 leading-none">Upload New Image</label>
                      <p className="text-[11px] text-muted-foreground">Recommended size: 1200×600px</p>
                      
                      <style>{`
                        .blue-file-upload::-webkit-file-upload-button {
                          background: transparent !important;
                          border: none !important;
                          color: #3b82f6 !important;
                          font-weight: 600 !important;
                          font-size: 14px !important;
                          cursor: pointer !important;
                          margin-right: 12px !important;
                        }
                      `}</style>
                      
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        className="custom-file-upload blue-file-upload flex items-center w-full text-sm cursor-pointer"
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '40px',
                          padding: '10px 20px',
                          color: 'white',
                          height: '48px',
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-foreground/75 leading-none">Current Preview</span>
                    <div className="w-full aspect-[3/1] rounded-xl bg-[#1a1a1a] flex items-center justify-center shadow-sm overflow-hidden" style={{ minHeight: '120px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-muted-foreground/50">
                          <span className="text-[10px] font-medium uppercase tracking-wider">No Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <FloatingInput
                  label="CTA Title"
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  rightElement={<AIAssistantButton context="Call to Action Section" field="Catchy Title" onGenerate={(val) => setForm({...form, title: val})} />}
                />

              <div 
                className="rounded-xl shadow-sm"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '24px' }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-semibold text-foreground/80 block">CTA Content</label>
                      <p className="text-[11px] text-muted-foreground mt-1">Supports rich text formatting</p>
                    </div>
                    <AIAssistantButton context={form.title || 'Call to Action'} field="Persuasive Content" onGenerate={(val) => setForm({...form, content: val})} />
                  </div>
                  <div className="pt-2">
                    <RichEditor
                      value={form.content}
                      onChange={v => setForm({...form, content: v})}
                      placeholder="Enter CTA content..."
                      minHeight={300}
                    />
                  </div>
                </div>
              </div>
              </div>
            </CardContent>

            <div className="py-4 px-5 bg-card border-t border-border/40 flex items-center justify-end gap-4 rounded-b-2xl">
              <button 
                type="button" 
                onClick={fetchCta}
                disabled={saving}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.12)', color: 'white', borderRadius: '8px', padding: '0 24px', height: '40px', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </button>
              <button 
                type="submit" 
                disabled={saving}
                style={{ backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', padding: '0 32px', height: '40px', fontWeight: 600, fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)' }}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </Card>
      </div>

      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}