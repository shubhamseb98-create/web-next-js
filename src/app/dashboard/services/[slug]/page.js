"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import DataTable from "../../../../components/dashboard/DataTable";
import TableToolbar from "../../../../components/dashboard/TableToolbar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../../components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save, Plus, Trash2, Edit2, Check, Sparkles, Image as ImageIcon, Upload, HelpCircle, Layers, CheckCircle2 } from "lucide-react";
import AIAssistantButton from "../../../../components/dashboard/AIAssistantButton";
import ConfirmDeleteModal from "../../../../components/dashboard/ConfirmDeleteModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../../lib/utils";

import { servicesData, whyChooseUsGlobal, staticPortfolioProjects, dynamicPortfolioProjects, ecommercePortfolioProjects, techStackGlobal } from "src/data/servicesData";

export default function ServiceCMSPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [activeTab, setActiveTab] = useState('banner');

  // Modal State for each tab
  const [modal, setModal] = useState(null); // 'new' or item object
  const [modalType, setModalType] = useState(''); // 'feature' | 'benefit' | 'process' | 'whyChooseUs' | 'portfolio' | 'faq'
  const [form, setForm] = useState({});

  // Search & Sort per tab
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'single', id: null });

  function addToast(message, type = "success") {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts(t => t.filter(x => x.id !== id));
    }, 4000);
  }

  useEffect(() => {
    fetchService();
  }, [slug]);

  async function fetchService() {
    try {
      setLoading(true);
      const res = await fetch(`/api/services/${slug}`);
      const json = await res.json();

      if (json.success && json.data) {
        let loadedData = json.data;

        if (loadedData.description) {
          loadedData.description = loadedData.description.replace(/<\/?p>/g, '');
        }

        let fallback = servicesData.static;
        let fallbackPortfolio = staticPortfolioProjects;
        if (slug.includes('dynamic')) { fallback = servicesData.dynamic; fallbackPortfolio = dynamicPortfolioProjects; }
        if (slug.includes('ecommerce') || slug.includes('e-commerce')) { fallback = servicesData.ecommerce; fallbackPortfolio = ecommercePortfolioProjects; }

        if (!loadedData.faq || loadedData.faq.length === 0) {
          loadedData.faq = fallback?.faqs?.map(f => ({ question: f.q, answer: f.a })) || [];
        }
        if (!loadedData.features || loadedData.features.length === 0) {
          loadedData.features = fallback?.features?.map(f => typeof f === 'string' ? { title: f, desc: '', image: '' } : { title: f.title, desc: f.desc || '', image: f.image || '' }) || [];
        } else if (loadedData.features.length > 0 && typeof loadedData.features[0] === 'string') {
          loadedData.features = loadedData.features.map(f => ({ title: f, desc: '', image: '' }));
        }
        if (!loadedData.benefits || loadedData.benefits.length === 0) {
          loadedData.benefits = (fallback?.overview?.benefits || []).map(b => ({ title: b, desc: "" }));
        }
        if (!loadedData.process || loadedData.process.length === 0) {
          loadedData.process = fallback?.process?.map(p => ({ step: p.step, title: p.title, desc: p.desc })) || [];
        }
        if (!loadedData.whyChooseUs || loadedData.whyChooseUs.length === 0) {
          loadedData.whyChooseUs = whyChooseUsGlobal?.map(w => ({ title: w.title, desc: w.desc, icon: w.icon || "" })) || [];
        }
        if (!loadedData.portfolio || loadedData.portfolio.length === 0) {
          loadedData.portfolio = fallbackPortfolio?.map(p => ({ name: p.name, category: p.category, tech: p.tech, desc: p.desc, image: p.image, link: p.link })) || [];
        }

        if (!loadedData.overviewWhatIsIt) loadedData.overviewWhatIsIt = fallback?.overview?.whatIsIt || "";
        if (!loadedData.overviewWhoNeedsIt) loadedData.overviewWhoNeedsIt = fallback?.overview?.whoNeedsIt || "";
        if (!loadedData.overviewWhyChooseUs) loadedData.overviewWhyChooseUs = fallback?.overview?.whyChooseUs || "";

        setData(loadedData);
      } else {
        addToast("Service not found", "error");
      }
    } catch (err) {
      addToast("Failed to load service: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  // Handle Image Uploads
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

  const handleModalImageUpload = async (e, field = 'image') => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload', file);
    addToast(`Uploading image...`, 'info');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        setForm(prev => ({ ...prev, [field]: responseData.url }));
        addToast(`Image uploaded successfully`, 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Main Save
  const handleSaveAll = async (updatedData = data) => {
    try {
      setSaving(true);
      const targetId = updatedData._id || slug;
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || 'Failed to save');
      setData(updatedData);
      addToast("Service configuration saved successfully!", "success");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  // Helper for opening modals
  function openCreate(type, emptyForm) {
    setModalType(type);
    setForm({ ...emptyForm, _id: `item-${Date.now()}` });
    setModal('new');
  }

  function openEdit(type, item) {
    setModalType(type);
    setForm({ ...item });
    setModal(item);
  }

  // Save Modal Item into array & persist
  async function handleSaveModalItem(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const arrayKey = modalType;
      const currentList = [...(data[arrayKey] || [])];
      let updatedList = [];

      if (modal === 'new') {
        updatedList = [...currentList, form];
      } else {
        const idx = currentList.findIndex((x, i) => (x._id || `item-${i}`) === (modal._id || modal.id));
        if (idx >= 0) {
          currentList[idx] = form;
          updatedList = currentList;
        } else {
          updatedList = [...currentList, form];
        }
      }

      const updatedData = { ...data, [arrayKey]: updatedList };
      const targetId = data._id || slug;
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Failed to save');

      setData(updatedData);
      addToast(modal === 'new' ? 'Item added successfully!' : 'Item updated successfully!');
      setModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingModal(false);
    }
  }

  // Delete Item from array
  async function handleDeleteItem(id, arrayKey) {
    try {
      setConfirmModal({ isOpen: false, type: 'single', id: null });
      setDeletingId(id);

      const currentList = data[arrayKey] || [];
      const updatedList = currentList.filter((x, i) => (x._id || `item-${i}`) !== id);
      const updatedData = { ...data, [arrayKey]: updatedList };

      const targetId = data._id || slug;
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Delete failed');

      setData(updatedData);
      setSelectedIds(prev => prev.filter(x => x !== id));
      addToast('Item deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  // Bulk Delete
  async function handleBulkDelete(arrayKey) {
    try {
      setConfirmModal({ isOpen: false, type: 'bulk', id: null });
      const currentList = data[arrayKey] || [];
      const updatedList = currentList.filter((x, i) => !selectedIds.includes(x._id || `item-${i}`));
      const updatedData = { ...data, [arrayKey]: updatedList };

      const targetId = data._id || slug;
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Bulk delete failed');

      setData(updatedData);
      setSelectedIds([]);
      addToast('Selected items deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    }
  }

  if (loading) return <div className="p-8 text-center">Loading Service Data...</div>;
  if (!data) return <div className="p-8 text-center text-red-500">Service not found.</div>;

  if (slug === 'real-estate-advisory' || slug === 'realestate-advisory') {
    if (typeof window !== 'undefined') {
      router.replace('/dashboard/real-estate/breadcrumb');
    }
    return <div className="p-8 text-center text-muted-foreground">Redirecting to Real Estate Management...</div>;
  }

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

  // Prepare table data for active list tab
  const getActiveArray = () => {
    switch (activeTab) {
      case 'features': return data.features || [];
      case 'benefits': return data.benefits || [];
      case 'process': return data.process || [];
      case 'whyChooseUs': return data.whyChooseUs || [];
      case 'portfolio': return data.portfolio || [];
      case 'faq': return data.faq || [];
      default: return [];
    }
  };

  const rawRows = getActiveArray().map((item, idx) => ({ ...item, _id: item._id || item.id || `item-${idx}` }));

  const filteredRows = rawRows
    .filter(row => {
      const searchLower = search.toLowerCase();
      return (
        (row.title || '').toLowerCase().includes(searchLower) ||
        (row.name || '').toLowerCase().includes(searchLower) ||
        (row.question || '').toLowerCase().includes(searchLower) ||
        (row.desc || '').toLowerCase().includes(searchLower) ||
        (row.description || '').toLowerCase().includes(searchLower) ||
        (row.answer || '').toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const titleA = a.title || a.name || a.question || a.step || '';
      const titleB = b.title || b.name || b.question || b.step || '';
      if (sort === 'a-z') return titleA.localeCompare(titleB);
      if (sort === 'z-a') return titleB.localeCompare(titleA);
      return 0;
    });

  // Action column renderer
  const renderActions = (row) => (
    <div className="flex items-center justify-end gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          openEdit(activeTab, row);
        }}
        className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30"
      >
        <Edit2 className="w-4 h-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setConfirmModal({ isOpen: true, type: 'single', id: row._id });
        }}
        disabled={deletingId === row._id}
        className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50"
      >
        {deletingId === row._id ? (
          <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );

  // Column definitions per tab
  const getColumns = () => {
    switch (activeTab) {
      case 'features':
        return [
          {
            key: 'image',
            label: 'Image / Icon',
            render: (row) => (
              row.image ? (
                <img src={row.image} alt="Feature" className="w-10 h-10 object-cover rounded-lg border border-white/10" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Layers className="w-5 h-5" />
                </div>
              )
            )
          },
          {
            key: 'title',
            label: 'Feature Title',
            render: (row) => <div className="font-bold text-foreground max-w-[240px] truncate">{row.title || 'Untitled'}</div>
          },
          {
            key: 'desc',
            label: 'Description Preview',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[360px] line-clamp-2">{row.desc || 'No description'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      case 'benefits':
        return [
          {
            key: 'title',
            label: 'Benefit Title',
            render: (row) => (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-foreground">{row.title || 'Untitled Benefit'}</span>
              </div>
            )
          },
          {
            key: 'desc',
            label: 'Description',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[400px] line-clamp-2">{row.desc || 'No description'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      case 'process':
        return [
          {
            key: 'step',
            label: 'Step',
            render: (row) => (
              <span className="inline-flex items-center justify-center w-9 h-9 text-xs font-black rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {row.step || '01'}
              </span>
            )
          },
          {
            key: 'title',
            label: 'Process Stage Title',
            render: (row) => <div className="font-bold text-foreground max-w-[220px] truncate">{row.title || 'Untitled'}</div>
          },
          {
            key: 'desc',
            label: 'Description',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[360px] line-clamp-2">{row.desc || 'No description'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      case 'whyChooseUs':
        return [
          {
            key: 'icon',
            label: 'Icon Preview',
            render: (row) => (
              row.icon && (row.icon.startsWith('/') || row.icon.startsWith('http') || row.icon.startsWith('data:image')) ? (
                <img src={row.icon} alt="Icon" className="w-10 h-10 object-cover rounded-lg border border-white/10" />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
              )
            )
          },
          {
            key: 'title',
            label: 'Advantage Title',
            render: (row) => <div className="font-bold text-foreground max-w-[220px] truncate">{row.title || 'Untitled'}</div>
          },
          {
            key: 'desc',
            label: 'Description',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[360px] line-clamp-2">{row.desc || 'No description'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      case 'portfolio':
        return [
          {
            key: 'image',
            label: 'Project Cover',
            render: (row) => (
              row.image ? (
                <img src={row.image} alt={row.name} className="w-14 h-10 object-cover rounded-lg border border-white/10" />
              ) : (
                <div className="w-14 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <ImageIcon className="w-4 h-4" />
                </div>
              )
            )
          },
          {
            key: 'name',
            label: 'Project Name',
            render: (row) => (
              <div>
                <div className="font-bold text-foreground">{row.name || 'Untitled Project'}</div>
                <div className="text-xs text-emerald-400 font-medium">{row.category || 'Dynamic'}</div>
              </div>
            )
          },
          {
            key: 'tech',
            label: 'Technologies',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[200px] truncate">{row.tech || 'React, Node'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      case 'faq':
        return [
          {
            key: 'question',
            label: 'Question',
            render: (row) => (
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-bold text-foreground max-w-[280px] truncate">{row.question || 'Untitled Question'}</span>
              </div>
            )
          },
          {
            key: 'answer',
            label: 'Answer Preview',
            render: (row) => <div className="text-xs text-muted-foreground max-w-[400px] line-clamp-2">{row.answer || 'No answer'}</div>
          },
          { key: 'actions', align: 'right', label: 'Action', render: renderActions }
        ];

      default:
        return [];
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb
        title={data.title || "Service Management"}
        subtitle="Manage the banner, overview narrative, features, benefits, development roadmap, portfolio, and FAQs."
        crumbs={[{ label: 'Services' }, { label: data.title || slug }]}
        rightElement={
          <Button
            onClick={() => handleSaveAll(data)}
            disabled={saving}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Service"}
          </Button>
        }
      />

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveTab(tab.id);
              setSearch('');
              setSelectedIds([]);
            }}
            className={`px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Banner Information */}
      {activeTab === 'banner' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Banner Information</CardTitle>
            <Button onClick={() => handleSaveAll(data)} disabled={saving} size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
              <Save className="w-4 h-4 mr-1.5" /> Save Banner
            </Button>
          </CardHeader>
          <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput label="Service Title" name="title" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} required />
              <FloatingInput label="Slug (URL)" name="slug" value={data.slug} disabled />
            </div>
            <FloatingTextarea
              label="Short Description (Used in cards & banner)"
              name="shortDesc"
              value={data.shortDesc}
              onChange={(e) => setData({ ...data, shortDesc: e.target.value })}
              rows={3}
              rightElement={<AIAssistantButton context={`Service Short Desc for ${data.title}`} field="shortDesc" onGenerate={v => setData(p => ({ ...p, shortDesc: v }))} />}
            />
            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-foreground">Hero / Breadcrumb Image</label>
              <div className="flex gap-4 items-center">
                {data.breadcrumbImage && <img src={data.breadcrumbImage} alt="Preview" className="w-40 h-20 object-cover rounded-xl border border-white/10 shadow" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'breadcrumbImage')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: Overview Information */}
      {activeTab === 'overview' && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Overview Information</CardTitle>
            <Button onClick={() => handleSaveAll(data)} disabled={saving} size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
              <Save className="w-4 h-4 mr-1.5" /> Save Overview
            </Button>
          </CardHeader>
          <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <FloatingTextarea
              label="Full Detailed Description"
              name="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              rows={4}
              rightElement={<AIAssistantButton context={`Service Full Desc for ${data.title}`} field="description" onGenerate={v => setData(p => ({ ...p, description: v }))} />}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingTextarea
                label="Overview: What is it?"
                name="overviewWhatIsIt"
                value={data.overviewWhatIsIt || ''}
                onChange={(e) => setData({ ...data, overviewWhatIsIt: e.target.value })}
                rows={3}
                rightElement={<AIAssistantButton context={`What is ${data.title}?`} field="overviewWhatIsIt" onGenerate={v => setData(p => ({ ...p, overviewWhatIsIt: v }))} />}
              />
              <FloatingTextarea
                label="Overview: Who Needs It?"
                name="overviewWhoNeedsIt"
                value={data.overviewWhoNeedsIt || ''}
                onChange={(e) => setData({ ...data, overviewWhoNeedsIt: e.target.value })}
                rows={3}
                rightElement={<AIAssistantButton context={`Who needs ${data.title}?`} field="overviewWhoNeedsIt" onGenerate={v => setData(p => ({ ...p, overviewWhoNeedsIt: v }))} />}
              />
              <FloatingTextarea
                label="Overview: Why Choose Us (Text)"
                name="overviewWhyChooseUs"
                value={data.overviewWhyChooseUs || ''}
                onChange={(e) => setData({ ...data, overviewWhyChooseUs: e.target.value })}
                rows={3}
                rightElement={<AIAssistantButton context={`Why choose our ${data.title} service?`} field="overviewWhyChooseUs" onGenerate={v => setData(p => ({ ...p, overviewWhyChooseUs: v }))} />}
              />
            </div>
            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-foreground">Overview Section Image</label>
              <div className="flex gap-4 items-center">
                {data.overviewImage && <img src={data.overviewImage} alt="Preview" className="w-32 h-20 object-cover rounded-xl border border-white/10 shadow" />}
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'overviewImage')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* LIST TABS: Features, Benefits, Process, Why Choose Us, Portfolio, FAQ */}
      {['features', 'benefits', 'process', 'whyChooseUs', 'portfolio', 'faq'].includes(activeTab) && (
        <div className="space-y-6">
          <TableToolbar
            search={search}
            onSearchChange={setSearch}
            sort={sort}
            onSortChange={setSort}
            selectedCount={selectedIds.length}
            onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
            bulkDeleting={false}
            onAdd={() => {
              if (activeTab === 'features') openCreate('features', { title: '', desc: '', image: '' });
              if (activeTab === 'benefits') openCreate('benefits', { title: '', desc: '' });
              if (activeTab === 'process') openCreate('process', { step: String((data.process?.length || 0) + 1).padStart(2, '0'), title: '', desc: '' });
              if (activeTab === 'whyChooseUs') openCreate('whyChooseUs', { title: '', desc: '', icon: '' });
              if (activeTab === 'portfolio') openCreate('portfolio', { name: '', category: 'Dynamic', tech: '', desc: '', image: '', link: '' });
              if (activeTab === 'faq') openCreate('faq', { question: '', answer: '' });
            }}
            addLabel={
              activeTab === 'features' ? 'Add Feature' :
              activeTab === 'benefits' ? 'Add Benefit' :
              activeTab === 'process' ? 'Add Step' :
              activeTab === 'whyChooseUs' ? 'Add Advantage' :
              activeTab === 'portfolio' ? 'Add Project' : 'Add FAQ'
            }
          />

          <DataTable
            columns={getColumns()}
            data={filteredRows}
            loading={false}
            onRowClick={(row) => openEdit(activeTab, row)}
            actions={false}
            selectedIds={selectedIds}
            onToggleSelectAll={() => {
              if (selectedIds.length === filteredRows.length) setSelectedIds([]);
              else setSelectedIds(filteredRows.map(x => x._id));
            }}
            onToggleSelectRow={(id) => {
              setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
            }}
          />
        </div>
      )}

      {/* CREATE / EDIT DIALOG MODAL */}
      <Dialog open={!!modal} onOpenChange={(open) => !open && !savingModal && setModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {modal === 'new' ? `Add ${modalType}` : `Edit ${modalType}`}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new' ? `Create a new item in the service configuration.` : `Modify item details and content.`}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveModalItem} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Form Fields according to modalType */}
            {modalType === 'features' && (
              <>
                <FloatingInput
                  label="Feature Title *"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  rightElement={<AIAssistantButton context="Service Feature" field="Feature Title" onGenerate={v => setForm({ ...form, title: v })} />}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Feature Image / Icon</label>
                  <div className="flex gap-4 items-center">
                    {form.image && <img src={form.image} alt="Feature" className="w-16 h-16 object-cover rounded-xl border border-white/10 shadow" />}
                    <input type="file" accept="image/*" onChange={(e) => handleModalImageUpload(e, 'image')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
                  </div>
                </div>
                <FloatingTextarea
                  label="Feature Description"
                  value={form.desc || ''}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                />
              </>
            )}

            {modalType === 'benefits' && (
              <>
                <FloatingInput
                  label="Benefit Title *"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  rightElement={<AIAssistantButton context="Service Benefit" field="Benefit Title" onGenerate={v => setForm({ ...form, title: v })} />}
                />
                <FloatingTextarea
                  label="Benefit Description"
                  value={form.desc || ''}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                />
              </>
            )}

            {modalType === 'process' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <FloatingInput
                      label="Step #"
                      required
                      value={form.step || ''}
                      onChange={(e) => setForm({ ...form, step: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <FloatingInput
                      label="Process Stage Title *"
                      required
                      value={form.title || ''}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      rightElement={<AIAssistantButton context="Development Process Stage" field="Stage Title" onGenerate={v => setForm({ ...form, title: v })} />}
                    />
                  </div>
                </div>
                <FloatingTextarea
                  label="Stage Description"
                  value={form.desc || ''}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                />
              </>
            )}

            {modalType === 'whyChooseUs' && (
              <>
                <FloatingInput
                  label="Advantage Title *"
                  required
                  value={form.title || ''}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  rightElement={<AIAssistantButton context="Why Choose Us Advantage" field="Advantage Title" onGenerate={v => setForm({ ...form, title: v })} />}
                />
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Advantage Icon Image</label>
                  <div className="flex gap-4 items-center">
                    {form.icon && (form.icon.startsWith('/') || form.icon.startsWith('http') || form.icon.startsWith('data:image')) && (
                      <img src={form.icon} alt="Icon" className="w-14 h-14 object-cover rounded-xl border border-white/10 shadow" />
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleModalImageUpload(e, 'icon')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
                  </div>
                </div>
                <FloatingTextarea
                  label="Advantage Description"
                  value={form.desc || ''}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={3}
                />
              </>
            )}

            {modalType === 'portfolio' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <FloatingInput
                    label="Project Name *"
                    required
                    value={form.name || ''}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <FloatingInput
                    label="Category (e.g. Dynamic)"
                    value={form.category || ''}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                  <FloatingInput
                    label="Tech Stack (e.g. React, Node)"
                    value={form.tech || ''}
                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Project Cover Image</label>
                  <div className="flex gap-4 items-center">
                    {form.image && <img src={form.image} alt="Project" className="w-24 h-16 object-cover rounded-xl border border-white/10 shadow" />}
                    <input type="file" accept="image/*" onChange={(e) => handleModalImageUpload(e, 'image')} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500" />
                  </div>
                </div>
                <FloatingInput
                  label="External Project Link"
                  value={form.link || ''}
                  onChange={(e) => setForm({ ...form, link: e.target.value })}
                />
                <FloatingTextarea
                  label="Short Description"
                  value={form.desc || ''}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  rows={2}
                />
              </>
            )}

            {modalType === 'faq' && (
              <>
                <FloatingInput
                  label="Question *"
                  required
                  value={form.question || ''}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                />
                <FloatingTextarea
                  label="Answer *"
                  required
                  value={form.answer || ''}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={4}
                />
              </>
            )}

            <DialogFooter
              style={{
                paddingTop: '20px',
                marginTop: '10px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => setModal(null)}
                disabled={savingModal}
                style={{
                  padding: '0 24px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  fontSize: '15px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingModal}
                style={{
                  padding: '0 40px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: '#52a436',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px -5px rgba(82, 164, 54, 0.6)',
                }}
              >
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save Item' : 'Save Changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={confirmModal.type === 'single' ? deletingId === confirmModal.id : false}
        onClose={() => setConfirmModal({ isOpen: false, type: 'single', id: null })}
        onConfirm={() => (confirmModal.type === 'single' ? handleDeleteItem(confirmModal.id, activeTab) : handleBulkDelete(activeTab))}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />

      {/* Floating Animated Toasts */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={cn(
              'fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-bold z-50 flex items-center gap-3',
              toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            )}
            style={{ backgroundColor: toast.type === 'success' ? '#52a436' : '#dc2626' }}
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              {toast.type === 'success' ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 rotate-45" />}
            </div>
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
