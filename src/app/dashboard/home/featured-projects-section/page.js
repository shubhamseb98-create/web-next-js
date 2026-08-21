'use client'
import { useEffect, useState } from 'react'
import Breadcrumb from '../../../../components/dashboard/Breadcrumb'
import Toast from '../../../../components/dashboard/Toast'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../../components/ui/card'
import { Button } from '../../../../components/ui/button'
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input'
import { Save, RotateCcw, ExternalLink, PenSquare } from 'lucide-react'
import Link from 'next/link'

export default function HomeFeaturedProjectsSectionPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState({
    title: '',
    titleHighlight: '',
    intro: '',
    backgroundColor: '',
  })
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    setToasts(prev => [...prev, { id: Date.now(), message, type }])
  }

  const updateField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [sectionRes, projectsRes] = await Promise.all([
        fetch(`/api/home-featured-projects`, { cache: 'no-store' }),
        fetch(`/api/portfolio?featured=true`, { cache: 'no-store' })
      ])
      
      const sectionData = await sectionRes.json()
      const projectsData = await projectsRes.json()

      if (sectionData && sectionData.success && sectionData.data) {
        const item = sectionData.data
        setForm({
          title: item.title || '',
          titleHighlight: item.titleHighlight || '',
          intro: item.intro || '',
          backgroundColor: item.backgroundColor || '',
        })
      }

      if (projectsData && projectsData.success && projectsData.data) {
        setProjects(projectsData.data)
      }
    } catch (error) {
      console.error(error)
      addToast('Failed to load data', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async e => {
    e.preventDefault()
    try {
      setSaving(true)

      const response = await fetch(`/api/home-featured-projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Update failed')
      }

      addToast('Section updated successfully!', 'success')
      fetchData()
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
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-6 space-y-6 max-w-5xl mx-auto overflow-y-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Featured Projects Section</h1>
          <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Home Page', href: '/dashboard/home' }, { label: 'Featured Projects Section' }]} />
        </div>
      </div>

      <form onSubmit={handleSave}>
        <Card className="border-border/50 shadow-sm backdrop-blur-xl bg-card/50">
          <CardHeader>
            <CardTitle>Section Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Title (e.g. Featured)" value={form.title} onChange={e => updateField('title', e.target.value)} required />
              <FloatingInput label="Title Highlight (e.g. Projects)" value={form.titleHighlight} onChange={e => updateField('titleHighlight', e.target.value)} />
            </div>

            <FloatingTextarea label="Intro Text" value={form.intro} onChange={e => updateField('intro', e.target.value)} rows={3} required />
            
            <FloatingInput label="Background Color (e.g. transparent, #ffffff, or linear-gradient)" value={form.backgroundColor} onChange={e => updateField('backgroundColor', e.target.value)} />
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t border-border/50 pt-6">
            <Button type="button" variant="outline" onClick={fetchData} disabled={saving} className="rounded-xl">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button type="submit" disabled={saving} className="rounded-xl">
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {/* Featured Projects Preview Grid */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Active Featured Projects</h2>
          <Link href="/dashboard/portfolio">
            <Button variant="outline" size="sm" className="rounded-xl">
              <PenSquare className="w-4 h-4 mr-2" />
              Manage Projects
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">These projects are currently marked as "Featured" in your Portfolio and are displayed on the home page.</p>
        
        {projects.length === 0 ? (
          <div className="p-8 text-center border rounded-xl border-dashed border-border/50 bg-card/20">
            <p className="text-muted-foreground">No featured projects found. Go to Portfolio to feature some projects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project._id} className="overflow-hidden bg-card/60 border border-border hover:border-primary/50 transition-colors flex flex-col rounded-xl shadow-sm">
                <div className="aspect-[16/9] w-full overflow-hidden bg-muted relative">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No Image</div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 text-foreground text-xs font-bold rounded shadow-sm backdrop-blur-sm border border-border">
                    # {project.sort || 0}
                  </div>
                </div>
                <CardContent className="p-4 flex-1">
                  <h3 className="font-semibold text-lg line-clamp-1 text-foreground mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{project.category}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto flex items-center justify-between border-t border-border/40">
                  <div className={`mt-4 px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {project.status}
                  </div>
                  <Link href={`/dashboard/portfolio`} className="mt-4 text-primary hover:text-primary/80 transition-colors text-sm font-medium flex items-center">
                    Edit <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

        <Toast toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(x => x.id !== id))} />
    </div>
  )
}
