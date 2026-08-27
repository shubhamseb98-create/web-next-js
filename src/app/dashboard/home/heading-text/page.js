'use client'
import { useState, useEffect } from 'react'
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { FloatingInput } from '../../../../components/ui/floating-input'
import { Save, RotateCcw, Type } from 'lucide-react'

const BASE_URL = ''

const DEFAULT = {
  work_title: '', work_subtitle: '', work_description: '',
  service_title: '', service_subtitle: '', service_description: '',
  blog_title: '', blog_subtitle: '',
  contact_title: '', contact_subtitle: '',
  featured_project_title: '', featured_project_subtitle: '', featured_project_description: '',
  client_title: '', client_subtitle: '', client_description: '',
  achievement_title: '', achievement_subtitle: '', achievement_description: '',
  capability_title: '', capability_subtitle: '', capability_description: '',
  technology_title: '', technology_subtitle: '', technology_description: '',
  team_title: '', team_subtitle: '', team_label: '', team_description: '',
  testimonial_title: '', testimonial_subtitle: '', testimonial_description: '',
}

const sections = [
  { key: 'work',      label: 'Global Network',      fields: ['work_title', 'work_subtitle', 'work_description'] },
  { key: 'service',   label: 'Our Services Section',  fields: ['service_title', 'service_subtitle', 'service_description'] },
  { key: 'blog',      label: 'Blog Section',          fields: ['blog_title', 'blog_subtitle'] },
  { key: 'featured_project', label: 'Featured Projects Section', fields: ['featured_project_title', 'featured_project_subtitle', 'featured_project_description'] },
  { key: 'client',    label: 'Our Clients Section',   fields: ['client_title', 'client_subtitle', 'client_description'] },
  { key: 'achievement', label: 'Our Achievements Section', fields: ['achievement_title', 'achievement_subtitle', 'achievement_description'] },
  { key: 'technology', label: 'Modern Tech Stack Section', fields: ['technology_title', 'technology_subtitle', 'technology_description'] },
  { key: 'team',       label: 'Meet The Team Section',     fields: ['team_title', 'team_subtitle', 'team_label', 'team_description'] },
  { key: 'testimonial',label: 'Testimonials Section',      fields: ['testimonial_title', 'testimonial_subtitle', 'testimonial_description'] },
]

const fieldLabel = k => k.endsWith('_title') ? 'Title' : k.endsWith('_subtitle') ? 'Subtitle' : k.endsWith('_label') ? 'Small Label' : k.endsWith('_description') ? 'Description' : k

export default function HeadingTextPage() {
  const [form, setForm] = useState(DEFAULT)
  const [recordId, setRecordId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState([])

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))
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
      const res = await fetch(`${BASE_URL}/api/home-extra`)
      if (!res.ok) throw new Error('Failed to fetch heading texts')
      const data = await res.json()
      if (data.length > 0) {
        const r = data[0]
        setRecordId(r._id)
        setForm({
          work_title:        r.work_title        || '',
          work_subtitle:     r.work_subtitle     || '',
          work_description:  r.work_description  || '',
          service_title:     r.service_title     || '',
          service_subtitle:  r.service_subtitle  || '',
          service_description:r.service_description|| '',
          blog_title:        r.blog_title        || '',
          blog_subtitle:     r.blog_subtitle     || '',
          contact_title:     r.contact_title     || '',
          contact_subtitle:  r.contact_subtitle  || '',
          featured_project_title: r.featured_project_title || '',
          featured_project_subtitle: r.featured_project_subtitle || '',
          featured_project_description: r.featured_project_description || '',
          client_title:      r.client_title      || '',
          client_subtitle:   r.client_subtitle   || '',
          client_description:r.client_description|| '',
          achievement_title: r.achievement_title || '',
          achievement_subtitle: r.achievement_subtitle || '',
          achievement_description: r.achievement_description || '',
          capability_title:  r.capability_title  || '',
          capability_subtitle: r.capability_subtitle || '',
          capability_description: r.capability_description || '',
          technology_title:  r.technology_title  || '',
          technology_subtitle: r.technology_subtitle || '',
          technology_description: r.technology_description || '',
          team_title:        r.team_title        || '',
          team_subtitle:     r.team_subtitle     || '',
          team_label:        r.team_label        || '',
          team_description:  r.team_description  || '',
          testimonial_title: r.testimonial_title || '',
          testimonial_subtitle: r.testimonial_subtitle || '',
          testimonial_description: r.testimonial_description || '',
        })
      }
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setSaving(true)
      const res = await fetch(`${BASE_URL}/api/home-extra`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Save failed')
      addToast('All heading texts saved!')
      if (data.data && data.data._id) {
        setRecordId(data.data._id)
      }
    } catch (err) {
      addToast(err.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-muted-foreground animate-pulse">Loading Headings Data...</div>
      </div>
    )
  }

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Breadcrumb
          title="Home Page Heading Text"
          crumbs={[{ label: 'Home Management' }, { label: 'Heading Text' }]}
        />
      </div>
      
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <div
          style={{
            backgroundColor: '#0d150e',
            border: '1px solid #1e2e20',
            borderRadius: '16px',
            boxShadow: '0 0 35px -10px rgba(34, 197, 94, 0.12), 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(34, 197, 94, 0.08), transparent 75%), #0d150e',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '24px 28px 18px 28px',
              borderBottom: '1px solid #1e2e20',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[#1e2e20] flex items-center justify-center text-[#22c55e] shrink-0">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
                Edit Section Headings
              </h1>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '3px', margin: '3px 0 0 0' }}>
                Manage titles and subtitles for various sections on the home page.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ padding: '28px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map(sec => (
                  <div
                    key={sec.key}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', borderBottom: '1px solid #1e2e20', paddingBottom: '12px', margin: 0 }}>
                      {sec.label}
                    </h3>
                    <div className="flex flex-col gap-6">
                      {sec.fields.map(fieldKey => (
                        <FloatingInput
                          key={fieldKey}
                          label={fieldLabel(fieldKey)}
                          value={form[fieldKey] || ''}
                          onChange={e => f(fieldKey, e.target.value)}
                          rightElement={<AIAssistantButton context={`${sec.label} - ${fieldLabel(fieldKey)}`} field="Engaging Text" onGenerate={(val) => f(fieldKey, val)} />}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-[#1e2e20] flex items-center justify-end gap-4 bg-black/20">
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
                  height: '40px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)'
                }}
              >
                {saving ? (
                  <>
                    <span className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save All Headings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toast toasts={toasts} onRemove={id => setToasts(t => t.filter(x => x.id !== id))} />
    </div>
  )
}