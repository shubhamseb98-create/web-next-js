'use client'
import { useEffect, useState } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import RichEditor from '../../../../components/dashboard/RichEditor'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input'
import { Save, RotateCcw, Image as ImageIcon } from 'lucide-react'

const API_URL = ''

export default function HomeAboutPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutId, setAboutId] = useState(null)
  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    imageFile: null,
    alt: '',
  })
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }])
  }

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    fetchHomeAbout()
  }, [])

  const fetchHomeAbout = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/home-about`, { cache: 'no-store' })
      const data = await response.json()

      if (data && data.length > 0) {
        const about = data[0]
        setAboutId(about._id)
        setForm({
          title: about.title || '',
          description: about.description || '',
          image: about.image || '',
          imageFile: null,
          alt: about.alt || '',
        })
      }
    } catch (error) {
      console.error(error)
      addToast('Failed to load about section', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async e => {
    e.preventDefault()
    try {
      setSaving(true)
      const formData = new FormData()

      formData.append('title', form.title)
      formData.append('description', form.description)
      formData.append('alt', form.alt)

      if (form.imageFile) {
        formData.append('image', form.imageFile)
      }

      const response = await fetch(`/api/home-about`, {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Update failed')
      }

      addToast('About section updated successfully!', 'success')
      fetchHomeAbout()
    } catch (error) {
      console.error(error)
      addToast(error.message || 'Update failed', 'error')
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
        <Breadcrumb title="Home Page About" crumbs={[{ label: 'Home Management' }, { label: 'About Section' }]} />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit About Section</CardTitle>
            <CardDescription>Update the content for the Home Page About section.</CardDescription>
          </CardHeader>

          <form onSubmit={handleSave}>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* Image Upload Section */}
                <div 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                    border: '1px solid #1e2e20', 
                    borderRadius: '16px',
                    padding: '24px' 
                  }}
                >
                  <label className="font-bold text-foreground block mb-6 text-sm">Section Image</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-foreground/75 leading-none">Upload New Image</label>
                        <p className="text-[11px] text-muted-foreground">Recommended size: 600×450px</p>
                        
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
                          onChange={e => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setForm(prev => ({
                                ...prev,
                                imageFile: file,
                                image: URL.createObjectURL(file),
                              }))
                            }
                          }}
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
                      <FloatingInput
                        label="Image ALT Text"
                        value={form.alt}
                        onChange={e => updateField('alt', e.target.value)}
                        rightElement={<AIAssistantButton context={form.title || 'About The WebTycoons'} field="SEO Image Alt Text" onGenerate={(val) => updateField('alt', val)} />}
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[13px] font-semibold text-foreground/75 leading-none">Current Preview</span>
                      <div className="w-full aspect-video rounded-xl bg-black/40 flex items-center justify-center shadow-sm overflow-hidden" style={{ minHeight: '120px', border: '1px solid #1e2e20' }}>
                        {form.image ? (
                          <img
                            src={form.image.startsWith('/uploads') ? `${API_URL}${form.image}` : form.image}
                            alt={form.alt || 'About Image'}
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

                {/* Content Section */}
                <div className="flex flex-col gap-6">
                  <FloatingTextarea
                    label="Title *"
                    required
                    rows={2}
                    value={form.title}
                    onChange={e => updateField('title', e.target.value)}
                    rightElement={<AIAssistantButton context="The WebTycoons About Section" field="Catchy Title" onGenerate={(val) => updateField('title', val)} />}
                  />
                  <p className="text-[11px] text-muted-foreground -mt-4 px-1">Tip: Wrap words in asterisks like *Scale at Speed* to make them green! Use enter for a new line.</p>

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
                          <label className="text-sm font-semibold text-foreground/80 block">Description *</label>
                          <p className="text-[11px] text-muted-foreground mt-1">Supports rich text formatting</p>
                        </div>
                        <AIAssistantButton context={form.title || 'About The WebTycoons'} field="Detailed About Us Description" onGenerate={(val) => updateField('description', val)} />
                      </div>
                      <div className="pt-2">
                        <RichEditor
                          value={form.description}
                          onChange={value => updateField('description', value)}
                          placeholder="Enter description..."
                          minHeight={250}
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
                onClick={fetchHomeAbout}
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

      <Toast toasts={toasts} onRemove={id => setToasts(prev => prev.filter(toast => toast.id !== id))} />
    </div>
  )
}
