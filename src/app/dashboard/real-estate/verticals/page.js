'use client';
import { useState, useEffect } from 'react';
import AIAssistantButton from '../../../../components/dashboard/AIAssistantButton';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import DataTable from '../../../../components/dashboard/DataTable';
import TableToolbar from '../../../../components/dashboard/TableToolbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../../components/ui/dialog';
import { Button } from '../../../../components/ui/button';
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Plus, Image as ImageIcon, Edit2, Trash2, Check, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

const EMPTY = {
  id: '',
  title: '',
  tag: '',
  image: '',
  desc: '',
  features: [],
  yield: '',
};

const INITIAL_VERTICALS = [
  { id: 'gtm', title: 'Project Launch GTM Strategy', tag: 'For Builders & Developers', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop', desc: 'Complete digital launch playbooks to build intense pre-launch FOMO, drive initial bookings, and accelerate inventory absorption in under 60 days.', features: ['Pre-launch teaser & digital hype funnels', '3D architectural renders & virtual walkthroughs', 'High-converting project landing page ecosystems', 'Omnichannel buyer acquisition (Meta, Google, YouTube)'], yield: 'Result: 70%+ Inventory Absorption' },
  { id: 'agency', title: 'Real Estate Agency & Broker Scaling', tag: 'For Agencies & Channel Partners', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop', desc: 'Turn your real estate agency into an automated inbound lead powerhouse. We build localized acquisition funnels that keep your agents closing high-ticket deals.', features: ['Inbound buyer & seller lead generation', 'Instant 60-second automated WhatsApp connect', 'Automated site-visit booking & calendar reminders', 'Lead qualification playbooks for sales reps'], yield: 'Result: 3x Monthly Site Visits' },
  { id: 'cp', title: 'Channel Partner (CP) Network Systems', tag: 'Broker Network Automation', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop', desc: 'Build, manage, and scale a massive channel partner network with custom CP portals, automated commission trackers, and exclusive broker event marketing.', features: ['Custom Channel Partner login & asset portals', 'Real-time lead mapping & transparent attribution', 'Automated commission & slab milestone tracking', 'CP engagement & broker meet event campaigns'], yield: 'Result: 500+ Active Brokers Onboarded' },
  { id: 'nri', title: 'High-Ticket NRI Investor Funnels', tag: 'Global NRI Acquisition', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop', desc: 'Target affluent overseas Indians in Dubai, US, UK, Singapore, and Canada with virtual 3D tour experiences and trust-building digital collateral.', features: ['High-intent international geo-targeting', 'Virtual 3D immersive property tours & video walkthroughs', 'NRI legal & repatriation objection-handling content', 'High-converting WhatsApp Cloud API nurture'], yield: 'Result: 14.8x Average ROAS' },
  { id: 'proptech', title: 'PropTech Web Portals & 3D Tech', tag: 'Custom Digital Infrastructure', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop', desc: 'Bespoke Next.js real estate web platforms with interactive master plans, unit availability selectors, and lightning-fast mobile performance.', features: ['Interactive 3D unit selector & floorplan viewer', 'Integrated mortgage & EMI calculators', 'Direct WhatsApp & CRM lead capture hooks', 'Sub-second page load speeds for maximum ad conversions'], yield: 'Result: 68% Higher Conversion Rate' },
  { id: 'seo', title: 'Local Territory Dominance SEO', tag: 'Organic Buyer Pipeline', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop', desc: 'Dominate Google search results for micro-market keywords, project comparisons, and builder reviews in your target geographical territory.', features: ['Rank #1 for high-intent property buyer searches', 'Google Business Profile & local map pack domination', 'Project review & comparison pillar content', 'Zero ongoing ad spend for organic buyer leads'], yield: 'Result: Zero-CAC Organic Pipeline' }
];

export default function RealEstateVerticalsPage() {
  const [data, setData] = useState({
    realEstateData: {
      verticals: {
        label: 'GROWTH SERVICES',
        title: 'Tailored Solutions to Grow Your Real Estate Business',
        desc: 'Whether you are a developer launching a ₹200Cr+ township, a real estate agency scaling broker closings, or expanding a channel partner network — we have the proven blueprint.',
        items: INITIAL_VERTICALS,
      },
    },
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingHeader, setSavingHeader] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [featuresText, setFeaturesText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [toasts, setToasts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  // Search, Sort & Bulk Selection
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'single', id: null });

  function addToast(message, type = 'success') {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }

  useEffect(() => {
    fetchVerticals();
  }, []);

  async function fetchVerticals() {
    try {
      setLoading(true);
      const res = await fetch('/api/services/real-estate-advisory');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setServiceId(json.data._id);
          const loadedItems = json.data.realEstateData?.verticals?.items;
          if (loadedItems && loadedItems.length > 0) {
            setData(json.data);
          } else {
            // Merge defaults if items array in db is empty
            setData({
              ...json.data,
              realEstateData: {
                ...(json.data.realEstateData || {}),
                verticals: {
                  ...(json.data.realEstateData?.verticals || {}),
                  label: json.data.realEstateData?.verticals?.label || 'GROWTH SERVICES',
                  title: json.data.realEstateData?.verticals?.title || 'Tailored Solutions to Grow Your Real Estate Business',
                  desc: json.data.realEstateData?.verticals?.desc || 'Whether you are a developer launching a ₹200Cr+ township, a real estate agency scaling broker closings, or expanding a channel partner network — we have the proven blueprint.',
                  items: INITIAL_VERTICALS,
                }
              }
            });
          }
        }
      }
    } catch (err) {
      console.warn('Using local fallback for verticals:', err);
    } finally {
      setLoading(false);
    }
  }

  const verticals = data.realEstateData?.verticals || {};
  const rows = (verticals.items || []).map((item, index) => ({
    ...item,
    _id: item.id || `vert-${index}`,
  }));

  function openCreate() {
    setForm({ ...EMPTY, id: `vert-${Date.now()}` });
    setFeaturesText('');
    setImageFile(null);
    setPreview('');
    setModal('new');
  }

  function openEdit(vert) {
    setForm({ ...vert });
    setFeaturesText(Array.isArray(vert.features) ? vert.features.join('\n') : vert.features || '');
    setImageFile(null);
    setPreview(vert.image || '');
    setModal(vert);
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSaveHeader(e) {
    if (e && e.preventDefault) e.preventDefault();
    setSavingHeader(true);
    try {
      const targetId = serviceId || 'real-estate-advisory';
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || 'Failed to save');
      addToast('Verticals Section Header Saved!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    try {
      setSaving(true);

      let uploadedImageUrl = form.image;
      if (imageFile) {
        const fd = new FormData();
        fd.append('upload', imageFile);
        const upRes = await fetch('/api/upload', { method: 'POST', body: fd });
        const upData = await upRes.json();
        if (upRes.ok && upData.url) {
          uploadedImageUrl = upData.url;
        } else {
          throw new Error(upData.error?.message || 'Image upload failed');
        }
      }

      const parsedFeatures = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const savedItem = {
        ...form,
        image: uploadedImageUrl,
        features: parsedFeatures,
      };

      const currentItems = [...(verticals.items || [])];
      let updatedItems = [];

      if (modal === 'new') {
        updatedItems = [...currentItems, savedItem];
      } else {
        const itemIdx = currentItems.findIndex((x, idx) => (x.id || `vert-${idx}`) === (modal.id || modal._id));
        if (itemIdx >= 0) {
          currentItems[itemIdx] = savedItem;
          updatedItems = currentItems;
        } else {
          updatedItems = [...currentItems, savedItem];
        }
      }

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          verticals: {
            ...verticals,
            items: updatedItems,
          },
        },
      };

      const targetId = serviceId || 'real-estate-advisory';
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || 'Save failed');

      setData(updatedData);
      addToast(modal === 'new' ? 'Growth Vertical created successfully!' : 'Growth Vertical updated successfully!');
      setModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false, type: 'single', id: null });
      setDeletingId(id);

      const currentItems = [...(verticals.items || [])];
      const updatedItems = currentItems.filter((x, idx) => (x.id || `vert-${idx}`) !== id);

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          verticals: {
            ...verticals,
            items: updatedItems,
          },
        },
      };

      const targetId = serviceId || 'real-estate-advisory';
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Delete failed');

      setData(updatedData);
      setSelectedIds((s) => s.filter((x) => x !== id));
      addToast('Growth Vertical deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleBulkDelete() {
    try {
      setConfirmModal({ isOpen: false, type: 'bulk', id: null });
      setBulkDeleting(true);

      const currentItems = [...(verticals.items || [])];
      const updatedItems = currentItems.filter((x, idx) => !selectedIds.includes(x.id || `vert-${idx}`));

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          verticals: {
            ...verticals,
            items: updatedItems,
          },
        },
      };

      const targetId = serviceId || 'real-estate-advisory';
      const res = await fetch(`/api/services/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Bulk delete failed');

      setData(updatedData);
      setSelectedIds([]);
      addToast('Selected verticals deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setBulkDeleting(false);
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) setSelectedIds([]);
    else setSelectedIds(filteredData.map((x) => x._id));
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredData = rows
    .filter((row) =>
      (row.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (row.tag || '').toLowerCase().includes(search.toLowerCase()) ||
      (row.yield || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.title || '').localeCompare(b.title || '');
      if (sort === 'z-a') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <div className="w-14 h-10 rounded-md overflow-hidden bg-muted flex items-center justify-center border border-border shrink-0">
          {row.image ? (
            <img src={row.image} alt={row.title} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-4 h-4 text-muted-foreground/50" />
          )}
        </div>
      ),
    },
    {
      key: 'details',
      label: 'Vertical Details',
      render: (row) => (
        <div className="min-w-[180px]">
          <div className="font-bold text-foreground max-w-[240px] truncate" title={row.title}>
            {row.title || 'Untitled Vertical'}
          </div>
          <div className="text-xs text-emerald-400 font-medium truncate max-w-[240px]" title={row.tag}>
            {row.tag || 'No Target Tag'}
          </div>
        </div>
      ),
    },
    {
      key: 'yield',
      label: 'Result / Yield',
      render: (row) => (
        <div className="min-w-[140px]">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {row.yield || 'No Result Metric'}
          </span>
        </div>
      ),
    },
    {
      key: 'features',
      label: 'Features Count',
      render: (row) => (
        <span className="text-sm font-medium text-muted-foreground">
          {Array.isArray(row.features) ? `${row.features.length} features` : '0 features'}
        </span>
      ),
    },
    {
      key: 'actions',
      align: 'right',
      label: 'Action',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openEdit(row);
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
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb
        title="Growth Verticals Management"
        subtitle="Manage the growth and scaling verticals displayed on the real estate advisory page."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'Growth Verticals' }]}
      />

      {/* Section Header Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">Section Header Configuration</CardTitle>
          <Button
            onClick={handleSaveHeader}
            disabled={savingHeader}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          >
            <Save className="w-4 h-4 mr-1.5" /> {savingHeader ? 'Saving...' : 'Save Header'}
          </Button>
        </CardHeader>
        <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FloatingInput
              label="Section Tag Label"
              placeholder="e.g. GROWTH SERVICES"
              value={verticals.label || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    verticals: { ...(p.realEstateData?.verticals || {}), label: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Title"
              placeholder="e.g. Tailored Solutions to Grow Your Real Estate Business"
              value={verticals.title || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    verticals: { ...(p.realEstateData?.verticals || {}), title: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Description"
              placeholder="Section overview text..."
              value={verticals.desc || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    verticals: { ...(p.realEstateData?.verticals || {}), desc: e.target.value },
                  },
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Table Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
        bulkDeleting={bulkDeleting}
        onAdd={openCreate}
        addLabel="Add Growth Vertical"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        onRowClick={openEdit}
        actions={false}
        selectedIds={selectedIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelectRow={toggleSelect}
      />

      {/* Create / Edit Dialog Modal */}
      <Dialog open={!!modal} onOpenChange={(open) => !open && !saving && setModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {modal === 'new' ? 'Add New Growth Vertical' : 'Edit Growth Vertical'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a new specialized real estate advisory service'
                : 'Modify existing vertical details and features'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSave} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FloatingInput
                label="Vertical Title *"
                placeholder="e.g. Project Launch GTM Strategy"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                rightElement={
                  <AIAssistantButton
                    context="Real Estate Advisory Vertical"
                    field="Vertical Title"
                    onGenerate={(val) => setForm({ ...form, title: val })}
                  />
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Target Audience Tag"
                  placeholder="e.g. For Builders & Developers"
                  value={form.tag}
                  onChange={(e) => setForm({ ...form, tag: e.target.value })}
                />
                <FloatingInput
                  label="Result / Yield Metric"
                  placeholder="e.g. Result: 70%+ Inventory Absorption"
                  value={form.yield}
                  onChange={(e) => setForm({ ...form, yield: e.target.value })}
                />
              </div>

              <FloatingTextarea
                label="Description"
                placeholder="Detailed description of this growth vertical..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                rows={3}
              />

              <FloatingTextarea
                label="Bullet Features (One per line)"
                placeholder="Pre-launch teaser & digital hype funnels&#10;3D architectural renders & virtual walkthroughs&#10;High-converting project landing page ecosystems"
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                rows={4}
              />

              {/* Image Upload Box */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <label style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>
                  Vertical Cover Image
                </label>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, marginTop: '-8px' }}>
                  Recommended: 1000×600px High-Quality JPG/PNG
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{
                    boxSizing: 'border-box',
                    display: 'block',
                    width: '100%',
                    height: '48px',
                    lineHeight: '46px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    padding: '0 20px',
                    fontSize: '14px',
                    color: 'white',
                    cursor: 'pointer',
                  }}
                />
                {preview && (
                  <div
                    style={{
                      width: '100%',
                      height: '140px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '8px',
                    }}
                  >
                    <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter
              style={{
                paddingTop: '24px',
                marginTop: '24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
              }}
            >
              <button
                type="button"
                onClick={() => setModal(null)}
                disabled={saving}
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
                disabled={saving}
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
                {saving ? 'Saving...' : modal === 'new' ? 'Save Vertical' : 'Save Changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={confirmModal.type === 'single' ? deletingId === confirmModal.id : bulkDeleting}
        onClose={() => setConfirmModal({ isOpen: false, type: 'single', id: null })}
        onConfirm={() => (confirmModal.type === 'single' ? handleDelete(confirmModal.id) : handleBulkDelete())}
        title={confirmModal.type === 'single' ? 'Delete Growth Vertical' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this growth vertical? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} verticals? This action cannot be undone.`
        }
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
