"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AboutStatsTimeline() {
  const [data, setData] = useState({ stats: [], milestones: [] });
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
      addToast("Stats & Timeline Saved!");
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
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'About Management' }, { label: 'Stats & Timeline' }]} />
        <Button onClick={handleSubmit} disabled={saving} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(t => <Toast key={t.id} message={t.message} type={t.type} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />)}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Company Stats</CardTitle>
              <Button type="button" onClick={() => addArrayItem('stats', { value: '', label: '' })} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Stat
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.stats?.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative">
                    <Button type="button" onClick={() => removeArrayItem('stats', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                    <div className="w-full space-y-4 pt-2 pr-6">
                      <FloatingInput label="Value (e.g. 15+)" value={item.value} onChange={(e) => handleArrayChange('stats', i, 'value', e.target.value)} />
                      <FloatingInput label="Label" value={item.label} onChange={(e) => handleArrayChange('stats', i, 'label', e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Our Story (Timeline Milestones)</CardTitle>
              <Button type="button" onClick={() => addArrayItem('milestones', { year: '', title: '', description: '' })} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" /> Add Milestone
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.milestones?.map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative">
                    <Button type="button" onClick={() => removeArrayItem('milestones', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                    <div className="w-full space-y-4 pt-2 pr-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FloatingInput label="Year" value={item.year} onChange={(e) => handleArrayChange('milestones', i, 'year', e.target.value)} />
                        <FloatingInput label="Title" value={item.title} onChange={(e) => handleArrayChange('milestones', i, 'title', e.target.value)} />
                      </div>
                      <FloatingTextarea label="Description" value={item.description} onChange={(e) => handleArrayChange('milestones', i, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
