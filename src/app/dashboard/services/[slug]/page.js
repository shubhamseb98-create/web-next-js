"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save, Plus, Trash2, ArrowLeft, Image as ImageIcon, Upload } from "lucide-react";
import AIAssistantButton from "../../../../components/dashboard/AIAssistantButton";

import { servicesData, whyChooseUsGlobal, staticPortfolioProjects, dynamicPortfolioProjects, ecommercePortfolioProjects, techStackGlobal } from "src/data/servicesData";

export default function ServiceCMSPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const addToast = (msg, type = "success") => setToasts(t => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetch(`/api/services/${slug}`)
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data) {
          let loadedData = res.data;

          // Strip <p> tags from description if present
          if (loadedData.description) {
            loadedData.description = loadedData.description.replace(/<\/?p>/g, '');
          }

          // PREFILL FALLBACK DATA IF EMPTY
          let fallback = servicesData.static;
          let fallbackPortfolio = staticPortfolioProjects;
          if (slug.includes('dynamic')) { fallback = servicesData.dynamic; fallbackPortfolio = dynamicPortfolioProjects; }
          if (slug.includes('ecommerce') || slug.includes('e-commerce')) { fallback = servicesData.ecommerce; fallbackPortfolio = ecommercePortfolioProjects; }

          if (!loadedData.faq || loadedData.faq.length === 0) {
             console.log("FAQ is empty, prefilling with:", fallback.faqs);
             loadedData.faq = fallback.faqs?.map(f => ({ question: f.q, answer: f.a })) || [];
          } else {
             console.log("FAQ is NOT empty:", loadedData.faq);
          }
          if (!loadedData.features || loadedData.features.length === 0) {
             loadedData.features = fallback.features?.map(f => typeof f === 'string' ? { title: f, desc: '' } : { title: f.title, desc: f.desc || '' }) || [];
          } else if (loadedData.features.length > 0 && typeof loadedData.features[0] === 'string') {
             // Convert existing string array to object array
             loadedData.features = loadedData.features.map(f => ({ title: f, desc: '' }));
          }
          if (!loadedData.benefits || loadedData.benefits.length === 0) {
             loadedData.benefits = (fallback.overview?.benefits || []).map(b => ({ title: b, desc: "" }));
          }
          if (!loadedData.process || loadedData.process.length === 0) {
             loadedData.process = fallback.process?.map(p => ({ step: p.step, title: p.title, desc: p.desc })) || [];
          }
          if (!loadedData.whyChooseUs || loadedData.whyChooseUs.length === 0) {
             loadedData.whyChooseUs = whyChooseUsGlobal?.map(w => ({ title: w.title, desc: w.desc, icon: w.icon || "" })) || [];
          }
          if (!loadedData.techStack || loadedData.techStack.length === 0) {
             loadedData.techStack = techStackGlobal?.map(t => ({ name: t.name, sub: t.sub, icon: t.icon || "", color: t.color, category: t.category })) || [];
          }
          if (!loadedData.portfolio || loadedData.portfolio.length === 0) {
             loadedData.portfolio = fallbackPortfolio?.map(p => ({ name: p.name, category: p.category, tech: p.tech, desc: p.desc, image: p.image, link: p.link })) || [];
          }

          if (!loadedData.overviewWhatIsIt) loadedData.overviewWhatIsIt = fallback.overview?.whatIsIt || "";
          if (!loadedData.overviewWhoNeedsIt) loadedData.overviewWhoNeedsIt = fallback.overview?.whoNeedsIt || "";
          if (!loadedData.overviewWhyChooseUs) loadedData.overviewWhyChooseUs = fallback.overview?.whyChooseUs || "";

          console.log("Setting data to:", loadedData);
          setData({ ...loadedData });
        } else {
          addToast("Service not found or failed to load", "error");
        }
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        addToast("Failed to load service data", "error");
        setLoading(false);
      });
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayStringChange = (arrayName, index, value) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = value;
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleArrayObjectChange = (arrayName, index, field, value) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = { ...newArray[index], [field]: value };
      return { ...prev, [arrayName]: newArray };
    });
  };

  const addArrayItem = (arrayName, emptyItem) => {
    setData(prev => ({ ...prev, [arrayName]: [...(prev[arrayName] || []), emptyItem] }));
    setTimeout(() => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTo({ top: mainContent.scrollHeight, behavior: 'smooth' });
      }
    }, 100);
  };

  const removeArrayItem = (arrayName, index) => {
    setData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return { ...prev, [arrayName]: newArray };
    });
  };

  const handleImageUpload = async (e, key = 'image') => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload', file);
    addToast(`Uploading ${key}...`, 'info');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        setData(p => ({ ...p, [key]: responseData.url }));
        addToast(`${key} uploaded successfully`, 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleArrayImageUpload = async (e, arrayName, index, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload', file);
    addToast(`Uploading image...`, 'info');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        handleArrayObjectChange(arrayName, index, field, responseData.url);
        addToast(`Image uploaded successfully`, 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (e && e.preventDefault) e.preventDefault();
      setSaving(true);
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (['features', 'faq', 'benefits', 'portfolio', 'process', 'whyChooseUs'].includes(key)) {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key !== '_id' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v') {
          formData.append(key, data[key]);
        }
      });
      
      const res = await fetch(`/api/services/${data._id}`, {
        method: 'PUT',
        body: formData
      });
      const result = await res.json();
      console.log("Save Response:", result);
      if (!res.ok) throw new Error(result.error || result.message || 'Failed to save');
      addToast("Service Updated Successfully!", "success");
    } catch (err) {
      console.error(err);
      alert("Error in handleSubmit: " + err.message);
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  const [activeTab, setActiveTab] = useState('banner');

  const tabs = [
    { id: 'banner', label: 'Banner Info' },
    { id: 'overview', label: 'Overview Info' },
    { id: 'features', label: 'Features' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'process', label: 'Process' },
    { id: 'whyChooseUs', label: 'Why Choose Us' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'faq', label: 'FAQ' },
  ];

  if (loading) return <div className="p-8 text-center">Loading Service Data...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Service not found.</div>;

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 min-h-screen relative max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Services' }, { label: data.title }]} />
        <Button onClick={handleSubmit} disabled={saving} size="lg" className="shadow-lg hover:shadow-xl transition-all">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Service"}
        </Button>
      </div>

      <Toast toasts={toasts} onRemove={(id) => setToasts(prev => prev.filter(x => x.id !== id))} />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Tabs Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mt-6">
          {activeTab === 'banner' && (
            <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Banner Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Service Title" name="title" value={data.title} onChange={handleChange} required />
              <FloatingInput label="Slug (URL)" name="slug" value={data.slug} disabled />
            </div>
            <FloatingTextarea label="Short Description (Used in cards & banner)" name="shortDesc" value={data.shortDesc} onChange={handleChange} rows={2} 
              rightElement={<AIAssistantButton context={`Service Short Desc for ${data.title}`} field="shortDesc" onGenerate={v => setData(p => ({...p, shortDesc: v}))} />} />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Hero / Breadcrumb Image</label>
              <div className="flex gap-4 items-center">
                {data.breadcrumbImage && <img src={data.breadcrumbImage} alt="Preview" className="w-48 h-24 object-cover rounded shadow" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'breadcrumbImage')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'overview' && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Overview Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FloatingTextarea label="Full Detailed Description (HTML supported)" name="description" value={data.description} onChange={handleChange} rows={6} 
              rightElement={<AIAssistantButton context={`Service Full Desc for ${data.title}`} field="description" onGenerate={v => setData(p => ({...p, description: v}))} />} />
            
            <FloatingTextarea label="Overview: What is it?" name="overviewWhatIsIt" value={data.overviewWhatIsIt || ''} onChange={handleChange} rows={3} 
              rightElement={<AIAssistantButton context={`What is ${data.title}?`} field="overviewWhatIsIt" onGenerate={v => setData(p => ({...p, overviewWhatIsIt: v}))} />} />
            
            <FloatingTextarea label="Overview: Who Needs It?" name="overviewWhoNeedsIt" value={data.overviewWhoNeedsIt || ''} onChange={handleChange} rows={3} 
              rightElement={<AIAssistantButton context={`Who needs ${data.title}?`} field="overviewWhoNeedsIt" onGenerate={v => setData(p => ({...p, overviewWhoNeedsIt: v}))} />} />
            
            <FloatingTextarea label="Overview: Why Choose Us (Text)" name="overviewWhyChooseUs" value={data.overviewWhyChooseUs || ''} onChange={handleChange} rows={3} 
              rightElement={<AIAssistantButton context={`Why choose our ${data.title} service?`} field="overviewWhyChooseUs" onGenerate={v => setData(p => ({...p, overviewWhyChooseUs: v}))} />} />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Overview Section Image</label>
              <div className="flex gap-4 items-center">
                {data.overviewImage && <img src={data.overviewImage} alt="Preview" className="w-24 h-24 object-cover rounded shadow" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'overviewImage')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              </div>
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'features' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Features</CardTitle>
            <Button type="button" onClick={() => addArrayItem('features', { title: '', desc: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Feature
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.features?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('features', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <FloatingInput label={`Feature ${i+1} Title`} value={item.title || ''} onChange={(e) => handleArrayObjectChange('features', i, 'title', e.target.value)} />
                    <div style={{ position: 'relative', width: '100%', minHeight: '76px', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="flex flex-col gap-2">
                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
                          Feature Image / Icon
                        </span>
                        <div className="flex gap-3 items-center">
                          {item.image ? (
                            <img src={item.image} alt="Preview" className="object-cover shadow-sm rounded-lg" style={{ width: '36px', height: '36px' }} />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                              <ImageIcon className="w-4 h-4" />
                            </div>
                          )}
                          <span className="text-[12px]" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                            {item.image ? "Image uploaded successfully" : "No image selected"}
                          </span>
                        </div>
                      </div>

                      <label className="text-[11px] font-medium cursor-pointer transition-all hover:bg-white/5 m-0 shadow-sm px-4 py-2 rounded-[10px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minWidth: '84px' }}>
                        <Upload className="w-4 h-4" />
                        Upload
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleArrayImageUpload(e, 'features', i, 'image')} />
                      </label>
                    </div>
                    <FloatingTextarea label="Description (Sub Text)" value={item.desc || ''} onChange={(e) => handleArrayObjectChange('features', i, 'desc', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'benefits' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Benefits</CardTitle>
            <Button type="button" onClick={() => addArrayItem('benefits', { title: '', desc: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Benefit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.benefits?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('benefits', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <FloatingInput label="Title" value={item.title || ''} onChange={(e) => handleArrayObjectChange('benefits', i, 'title', e.target.value)} />
                    <FloatingTextarea label="Description" value={item.desc || ''} onChange={(e) => handleArrayObjectChange('benefits', i, 'desc', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'process' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Development Process</CardTitle>
            <Button type="button" onClick={() => addArrayItem('process', { step: '', title: '', desc: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.process?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('process', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <div className="flex gap-4">
                      <div className="w-32"><FloatingInput label="Step (e.g. 01)" value={item.step || ''} onChange={(e) => handleArrayObjectChange('process', i, 'step', e.target.value)} /></div>
                      <div className="flex-1"><FloatingInput label="Title" value={item.title || ''} onChange={(e) => handleArrayObjectChange('process', i, 'title', e.target.value)} /></div>
                    </div>
                    <FloatingTextarea label="Description" value={item.desc || ''} onChange={(e) => handleArrayObjectChange('process', i, 'desc', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'whyChooseUs' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Why Choose Us (Advantages)</CardTitle>
            <Button type="button" onClick={() => addArrayItem('whyChooseUs', { title: '', desc: '', icon: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Reason
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.whyChooseUs?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('whyChooseUs', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <div className="flex flex-col gap-4">
                      <FloatingInput label="Title" value={item.title || ''} onChange={(e) => handleArrayObjectChange('whyChooseUs', i, 'title', e.target.value)} />
                      
                      <div style={{ position: 'relative', width: '100%', minHeight: '76px', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex flex-col gap-2">
                          <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
                            Icon Image
                          </span>
                          <div className="flex gap-3 items-center">
                            {item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http') || item.icon.startsWith('data:image')) ? (
                              <img src={item.icon} alt="Preview" className="object-cover shadow-sm rounded-lg" style={{ width: '36px', height: '36px' }} />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-[12px]" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                              {(item.icon && (item.icon.startsWith('/') || item.icon.startsWith('http') || item.icon.startsWith('data:image'))) ? "Icon uploaded successfully" : "No icon selected"}
                            </span>
                          </div>
                        </div>

                        <label className="text-[11px] font-medium cursor-pointer transition-all hover:bg-white/5 m-0 shadow-sm px-4 py-2 rounded-[10px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minWidth: '84px' }}>
                          <Upload className="w-4 h-4" />
                          Upload icon
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleArrayImageUpload(e, 'whyChooseUs', i, 'icon')} />
                        </label>
                      </div>
                    </div>
                    <FloatingTextarea label="Description" value={item.desc || ''} onChange={(e) => handleArrayObjectChange('whyChooseUs', i, 'desc', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'portfolio' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Projects</CardTitle>
            <Button type="button" onClick={() => addArrayItem('portfolio', { name: '', category: '', tech: '', desc: '', image: '', link: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.portfolio?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('portfolio', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FloatingInput label="Project Name" value={item.name || ''} onChange={(e) => handleArrayObjectChange('portfolio', i, 'name', e.target.value)} />
                      <FloatingInput label="Category (e.g. Dynamic)" value={item.category || ''} onChange={(e) => handleArrayObjectChange('portfolio', i, 'category', e.target.value)} />
                      <FloatingInput label="Technologies (e.g. React, Node)" value={item.tech || ''} onChange={(e) => handleArrayObjectChange('portfolio', i, 'tech', e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-4">
                      <div style={{ position: 'relative', width: '100%', minHeight: '76px', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="flex flex-col gap-2">
                          <span style={{ fontSize: '13px', fontWeight: 500, color: '#94a3b8' }}>
                            Project Image
                          </span>
                          <div className="flex gap-3 items-center">
                            {item.image ? (
                              <img src={item.image} alt="Preview" className="object-cover shadow-sm" style={{ width: '100px', height: '100px', objectPosition: 'top'}} />
                            ) : (
                              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-[12px]" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                              {item.image ? "Image uploaded successfully" : "No image selected"}
                            </span>
                          </div>
                        </div>

                        <label className="text-[11px] font-medium cursor-pointer transition-all hover:bg-white/5 m-0 shadow-sm px-4 py-2 rounded-[10px]" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', minWidth: '84px' }}>
                          <Upload className="w-4 h-4" />
                          Upload image
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleArrayImageUpload(e, 'portfolio', i, 'image')} />
                        </label>
                      </div>
                      <FloatingInput label="External Link" value={item.link || ''} onChange={(e) => handleArrayObjectChange('portfolio', i, 'link', e.target.value)} />
                    </div>
                    <FloatingTextarea label="Short Description" value={item.desc || ''} onChange={(e) => handleArrayObjectChange('portfolio', i, 'desc', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}

        {activeTab === 'faq' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>FAQ</CardTitle>
            <Button type="button" onClick={() => addArrayItem('faq', { question: '', answer: '' })} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add FAQ
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {data.faq?.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 border border-border rounded-xl bg-muted/20 relative pr-12">
                  <Button type="button" onClick={() => removeArrayItem('faq', i)} variant="ghost" className="absolute top-2 right-2 text-red-500 w-8 h-8 p-0"><Trash2 className="w-4 h-4"/></Button>
                  <div className="w-full space-y-4 pt-2">
                    <FloatingInput label="Question" value={item.question || ''} onChange={(e) => handleArrayObjectChange('faq', i, 'question', e.target.value)} />
                    <FloatingTextarea label="Answer" value={item.answer || ''} onChange={(e) => handleArrayObjectChange('faq', i, 'answer', e.target.value)} rows={2} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}
        </div>

      </form>
    </div>
  );
}
