"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AboutContent() {
  const [data, setData] = useState({ aboutUsTitle: "", aboutUsParagraph1: "", aboutUsParagraph2: "", aboutUsYears: "", aboutUsImage1: "", aboutUsImage2: "", aboutUsHighlights: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const addToast = (msg, type = "success") => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);
  
  useEffect(() => {
    fetch('/api/about-page')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) setData(res.data);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        addToast("Failed to load data", "error");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, emptyItem) => {
    setData(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), emptyItem] }));
  };

  const removeArrayItem = (arrayName, index) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload', file);
    addToast('Uploading image...', 'info');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        setData(p => ({ ...p, [field]: responseData.url }));
        addToast('Image uploaded successfully', 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save');
      addToast("Content Settings Saved!");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 min-h-screen relative max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'About Management' }, { label: 'About Us Content' }]} />
        <Button onClick={handleSubmit} disabled={saving} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Toast toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(x => x.id !== id))} />

      <form onSubmit={handleSubmit}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>About Us Content Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-5xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="About Us Title" name="aboutUsTitle" value={data.aboutUsTitle} onChange={handleChange} />
              <FloatingInput label="Years of Excellence (Badge)" name="aboutUsYears" value={data.aboutUsYears} onChange={handleChange} />
            </div>
            <FloatingTextarea label="Paragraph 1" name="aboutUsParagraph1" value={data.aboutUsParagraph1} onChange={handleChange} rows={3} />
            <FloatingTextarea label="Paragraph 2" name="aboutUsParagraph2" value={data.aboutUsParagraph2} onChange={handleChange} rows={3} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">About Us Image 1 (Large)</label>
                <div className="flex gap-4 items-center">
                  {data.aboutUsImage1 && <img src={data.aboutUsImage1} alt="Preview 1" className="w-16 h-16 object-cover rounded shadow" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aboutUsImage1')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">About Us Image 2 (Floating)</label>
                <div className="flex gap-4 items-center">
                  {data.aboutUsImage2 && <img src={data.aboutUsImage2} alt="Preview 2" className="w-16 h-16 object-cover rounded shadow" />}
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'aboutUsImage2')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">About Us Highlights</h3>
                <Button type="button" onClick={() => addArrayItem('aboutUsHighlights', { icon: 'award', title: '', description: '' })} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Highlight
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {data.aboutUsHighlights?.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative">
                    <Button type="button" onClick={() => removeArrayItem('aboutUsHighlights', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                    <div className="w-full space-y-4 pt-2 pr-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingInput label="Icon String (e.g. 'award', 'users')" value={item.icon} onChange={(e) => handleArrayChange('aboutUsHighlights', i, 'icon', e.target.value)} />
                        <FloatingInput label="Title" value={item.title} onChange={(e) => handleArrayChange('aboutUsHighlights', i, 'title', e.target.value)} />
                      </div>
                      <FloatingTextarea label="Description" value={item.description} onChange={(e) => handleArrayChange('aboutUsHighlights', i, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
