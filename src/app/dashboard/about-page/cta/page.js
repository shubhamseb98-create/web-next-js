"use client";
import { useState, useEffect } from "react";
import AIAssistantButton from "../../../../components/dashboard/AIAssistantButton";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save } from "lucide-react";

export default function AboutCTA() {
  const [data, setData] = useState({ ctaTitle: "", ctaDescription: "" });
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
      addToast("CTA Settings Saved!");
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
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'About Management' }, { label: 'Call To Action' }]} />
        <Button onClick={handleSubmit} disabled={saving} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />)}
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Call To Action Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-2 duration-300">
            <FloatingInput 
              label="CTA Title" name="ctaTitle" value={data.ctaTitle} onChange={handleChange} 
              rightElement={<AIAssistantButton context="About Page CTA Title" field="Title" onGenerate={(val) => setData(p => ({...p, ctaTitle: val}))} />}
            />
            <FloatingTextarea 
              label="CTA Description" name="ctaDescription" value={data.ctaDescription} onChange={handleChange} rows={4}
              rightElement={<AIAssistantButton context="About Page CTA Description" field="Description" onGenerate={(val) => setData(p => ({...p, ctaDescription: val}))} />}
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
