'use client'
import { useState, useEffect } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { FloatingInput } from '../../../../components/ui/floating-input'
import RichEditor from '../../../../components/dashboard/RichEditor'
import { Save, Megaphone, RotateCcw, Link as LinkIcon } from 'lucide-react'

const BASE_URL = ''

export default function SecondaryCtaPage() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: '',
    buttonText1: '',
    url1: '',
    buttonText2: '',
    url2: '',
  })
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
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      const res = await fetch(`${BASE_URL}/api/othercta`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      if (data) {
        setForm({
          title: data.title || '',
          subtitle: data.subtitle || '',
          content: data.content || '',
          buttonText1: data.buttonText1 || '',
          url1: data.url1 || '',
          buttonText2: data.buttonText2 || '',
          url2: data.url2 || '',
        })
        if (data.image) setPreview(data.image)
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
      const formData = new FormData()
      formData.append('title', form.title)
      formData.append('subtitle', form.subtitle)
      formData.append('content', form.content)
      formData.append('buttonText1', form.buttonText1)
      formData.append('url1', form.url1)
      formData.append('buttonText2', form.buttonText2)
      formData.append('url2', form.url2)
      if (imageFile) formData.append('image', imageFile)

      const res = await fetch(`${BASE_URL}/api/othercta`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Save failed')
      addToast('Secondary CTA saved successfully!')
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
        <Breadcrumb title="Secondary CTA" crumbs={[{ label: 'Home Management' }, { label: 'Secondary CTA' }]} />
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Edit Secondary CTA</CardTitle>
            <CardDescription>Update the title, subtitle, and buttons for the secondary call-to-action.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Background Image Upload */}
                <div 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid #1e2e20', 
                    borderRadius: '16px',
                    padding: '20px' 
                  }}
                  className="flex flex-col gap-3"
                >
                  <div className="text-sm font-semibold text-foreground/80 block">Background Image</div>
                  <p className="text-[11px] text-muted-foreground -mt-1">Recommended: 1920×800px</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImage} 
                    className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600" 
                  />
                  {preview && (
                    <img 
                      src={preview} 
                      alt="preview" 
                      className="mt-2 w-full max-h-48 rounded-lg border border-[#1e2e20] shadow-sm object-cover" 
                    />
                  )}
                </div>

                <div className="flex flex-col gap-5">
                  <FloatingInput
                    label="Title *"
                    required
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})}
                    rightElement={<AIAssistantButton context="Call to Action Section" field="Catchy Title" onGenerate={(val) => setForm({...form, title: val})} />}
                  />
                  <FloatingInput
                    label="Subtitle"
                    value={form.subtitle}
                    onChange={e => setForm({...form, subtitle: e.target.value})}
                    rightElement={<AIAssistantButton context={form.title || 'Call to Action Section'} field="Engaging Subtitle" onGenerate={(val) => setForm({...form, subtitle: val})} />}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-semibold text-foreground/80 block">CTA Content</label>
                    <AIAssistantButton context={form.title || 'Call to Action'} field="Persuasive Content" onGenerate={(val) => setForm({...form, content: val})} />
                  </div>
                  <div className="border border-[#1e2e20] rounded-xl overflow-hidden">
                    <RichEditor
                      value={form.content}
                      onChange={v => setForm({...form, content: v})}
                      placeholder="Enter CTA description..."
                      minHeight={140}
                    />
                  </div>
                </div>

                {/* Primary Button */}
                <div className="rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e2e20' }}>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Primary Button</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="Button Text"
                      value={form.buttonText1}
                      onChange={e => setForm({...form, buttonText1: e.target.value})}
                      placeholder="e.g. Get a Quote"
                      rightElement={<AIAssistantButton context={form.title || 'Hero CTA'} field="Actionable Primary Button Text" onGenerate={(val) => setForm({...form, buttonText1: val})} />}
                    />
                    <FloatingInput
                      label="Button URL"
                      value={form.url1}
                      onChange={e => setForm({...form, url1: e.target.value})}
                      placeholder="/contact"
                      icon={<LinkIcon className="w-4 h-4" />}
                    />
                  </div>
                </div>

                {/* Secondary Button */}
                <div className="rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid #1e2e20' }}>
                  <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Secondary Button</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FloatingInput
                      label="Button Text"
                      value={form.buttonText2}
                      onChange={e => setForm({...form, buttonText2: e.target.value})}
                      placeholder="e.g. Know More"
                      rightElement={<AIAssistantButton context={form.title || 'Hero CTA'} field="Actionable Secondary Button Text" onGenerate={(val) => setForm({...form, buttonText2: val})} />}
                    />
                    <FloatingInput
                      label="Button URL"
                      value={form.url2}
                      onChange={e => setForm({...form, url2: e.target.value})}
                      placeholder="/products"
                      icon={<LinkIcon className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={fetchData}
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

        {/* Live Preview */}
        <div className="h-fit sticky top-6">
          <Card className="border border-blue-500/20 shadow-xl shadow-blue-500/5 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
            <CardHeader className="bg-white/10 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex flex-row items-center gap-3">
              <Megaphone className="w-5 h-5 text-blue-200" />
              <CardTitle className="text-lg font-semibold text-white">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-10 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="text-3xl font-extrabold tracking-tight mb-2">
                {form.title || 'Your CTA Title'}
              </div>
              {form.subtitle && (
                <div className="text-lg text-blue-100 font-medium mb-4">
                  {form.subtitle}
                </div>
              )}
              {form.content && (
                <div
                  className="text-sm text-blue-50/90 max-w-lg mx-auto leading-relaxed mb-8"
                  dangerouslySetInnerHTML={{ __html: form.content.replace(/<[^>]+>/g, ' ').trim() }}
                />
              )}
              
              <div className="flex flex-wrap items-center justify-center gap-4 mt-auto">
                {form.buttonText1 && (
                  <div className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-black/10 hover:shadow-xl transition-all cursor-pointer">
                    {form.buttonText1}
                  </div>
                )}
                {form.buttonText2 && (
                  <div className="bg-transparent border-2 border-white/70 hover:border-white text-white px-8 py-3 rounded-full font-bold text-sm transition-all cursor-pointer">
                    {form.buttonText2}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}