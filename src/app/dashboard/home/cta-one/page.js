'use client'
import { useState, useEffect } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card'
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
      if (Array.isArray(data) && data.length > 0) {
        const record = data[0]
        setRecordId(record._id)
        setForm({ title: record.title || '', content: record.content || '', image: record.image || '' })
        if (record.image) setPreview(record.image)
      } else if (data && data._id) {
        setRecordId(data._id)
        setForm({ title: data.title || '', content: data.content || '', image: data.image || '' })
        if (data.image) setPreview(data.image)
      }
    } catch (err) {
      addToast('Failed to load CTA data', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleImage(e) {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      fd.append('content', form.content)
      if (imageFile) fd.append('image', imageFile)

      const res = await fetch(`${BASE_URL}/api/cta`, { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Save failed')
      addToast('CTA section updated successfully!')
      if (data.data?._id) setRecordId(data.data._id)
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Breadcrumb title="Some CTA" crumbs={[{ label: 'Home Management' }, { label: 'Some CTA' }]} />
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit CTA Section</CardTitle>
            <CardDescription>Update the content and background image for the CTA section.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid #1e2e20', 
                    borderRadius: '16px',
                    padding: '24px' 
                  }}
                >
                  <label className="font-bold text-foreground block mb-6 text-sm">Background / Feature Image</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-foreground/75 leading-none">Upload New Image</label>
                        <p className="text-[11px] text-muted-foreground">Recommended size: 1200×600px</p>
                        
                        <style>{`
                          .blue-file-upload::-webkit-file-upload-button {
                            background: transparent !important;
                            border: none !important;
                            color: #22c55e !important;
                            font-weight: 600 !important;
                            font-size: 13.5px !important;
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
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            border: '1px solid #1e2e20',
                            borderRadius: '12px',
                            padding: '10px 16px',
                            color: 'white',
                            height: '44px',
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[13px] font-semibold text-foreground/75 leading-none">Current Preview</span>
                      <div className="w-full aspect-[3/1] rounded-xl bg-black/40 flex items-center justify-center shadow-sm overflow-hidden" style={{ minHeight: '120px', border: '1px solid #1e2e20' }}>
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

                <div className="flex flex-col gap-6">
                  <FloatingInput
                    label="CTA Title"
                    required
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    rightElement={<AIAssistantButton context="Call to Action Section" field="Catchy Title" onGenerate={(val) => setForm({...form, title: val})} />}
                  />

                  <div 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                      border: '1px solid #1e2e20', 
                      borderRadius: '16px',
                      padding: '24px' 
                    }}
                  >
                    <div className="flex flex-col gap-2">
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
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={fetchCta}
                disabled={saving}
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <button 
                type="submit" 
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#ffffff',
                  padding: '0 28px',
                  height: '42px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)'
                }}
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}