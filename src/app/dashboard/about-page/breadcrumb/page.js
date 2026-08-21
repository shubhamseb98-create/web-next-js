"use client";
import { useState, useEffect } from "react";
import AIAssistantButton from "../../../../components/dashboard/AIAssistantButton";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save } from "lucide-react";

export default function AboutBreadcrumb() {
  const [data, setData] = useState({ heroTitle: "", heroDescription: "", heroImage: "" });
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
      addToast("Breadcrumb Settings Saved!");
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
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'About Management' }, { label: 'About Breadcrumb' }]} />
        <Button onClick={handleSubmit} disabled={saving} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Toast toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <form onSubmit={handleSubmit}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>About Breadcrumb Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <FloatingInput 
              label="Hero Title" name="heroTitle" value={data.heroTitle} onChange={handleChange} 
              rightElement={<AIAssistantButton context="About Page Hero Title" field="Title" onGenerate={(val) => setData(p => ({...p, heroTitle: val}))} />}
            />
            <FloatingTextarea 
              label="Hero Description" name="heroDescription" value={data.heroDescription} onChange={handleChange} rows={4}
              rightElement={<AIAssistantButton context="About Page Hero Description" field="Description" onGenerate={(val) => setData(p => ({...p, heroDescription: val}))} />}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hero Background Image</label>
              <div className="flex gap-4 items-center">
                {data.heroImage && <img src={data.heroImage} alt="Preview" className="w-16 h-16 object-cover rounded shadow" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'heroImage')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
