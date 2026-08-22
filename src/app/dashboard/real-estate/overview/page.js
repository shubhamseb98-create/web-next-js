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
import { Plus, Edit2, Trash2, Check, Save, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

const EMPTY_PILLAR = {
  id: '',
  icon: 'FaChartLine',
  title: '',
  desc: '',
};

export default function RealEstateOverviewPage() {
  const [data, setData] = useState({
    description: '',
    overviewImage: '',
    realEstateData: {
      overview: {
        label: 'OUR SCALING STRATEGY',
        title: 'How We Scale Real Estate Enterprises',
        desc: '',
        image: '',
        floatingBadgeTitle: 'We Scale Real Estate Companies',
        floatingBadgeText: '',
        pillars: [
          { id: 'p-1', icon: 'FaChartLine', title: 'High-Ticket Buyer & Investor Lead Generation', desc: 'We design high-converting Meta, Google Search, and YouTube ad campaigns targeting affluent homebuyers, NRI investors, and commercial buyers with verified purchasing power.' },
          { id: 'p-2', icon: 'FaDesktop', title: 'High-Converting PropTech Web Portals & 3D Tech', desc: 'We build lightning-fast project landing pages, 3D interactive unit selectors, and virtual tour platforms that convert cold visitors into booked site visits.' },
          { id: 'p-3', icon: 'FaCogs', title: 'Automated WhatsApp & Sales CRM Funnels', desc: 'Eliminate lead leakage with automated 60-second WhatsApp responses, instant sales executive call connects, and automated site-visit reminder cadences.' }
        ],
      },
    },
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingHeader, setSavingHeader] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_PILLAR });
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
    fetchOverview();
  }, []);

  async function fetchOverview() {
    try {
      setLoading(true);
      const res = await fetch('/api/services/real-estate-advisory');
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      if (json.success && json.data) {
        setServiceId(json.data._id);
        setData(json.data);
      }
    } catch (err) {
      addToast('Could not load overview: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  const overview = data.realEstateData?.overview || {};
  const rawPillars = overview.pillars || [];
  const rows = rawPillars.map((item, index) => ({
    ...item,
    _id: item.id || `pillar-${index}`,
  }));

  function openCreate() {
    setForm({ ...EMPTY_PILLAR, id: `pillar-${Date.now()}` });
    setModal('new');
  }

  function openEdit(pillar) {
    setForm({ ...pillar });
    setModal(pillar);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('upload', file);
    addToast('Uploading overview image...', 'info');
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        setData((p) => ({
          ...p,
          overviewImage: responseData.url,
          realEstateData: {
            ...(p.realEstateData || {}),
            overview: {
              ...(p.realEstateData?.overview || {}),
              image: responseData.url,
            },
          },
        }));
        addToast('Image uploaded successfully', 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
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
      addToast('Overview Header & Strategy Saved!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleSavePillar(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentPillars = [...rawPillars];
      let updatedPillars = [];

      if (modal === 'new') {
        updatedPillars = [...currentPillars, form];
      } else {
        const itemIdx = currentPillars.findIndex((x, idx) => (x.id || `pillar-${idx}`) === (modal.id || modal._id));
        if (itemIdx >= 0) {
          currentPillars[itemIdx] = form;
          updatedPillars = currentPillars;
        } else {
          updatedPillars = [...currentPillars, form];
        }
      }

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          overview: {
            ...overview,
            pillars: updatedPillars,
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
      addToast(modal === 'new' ? 'Strategic Pillar created successfully!' : 'Strategic Pillar updated successfully!');
      setModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingModal(false);
    }
  }

  async function handleDelete(id) {
    try {
      setConfirmModal({ isOpen: false, type: 'single', id: null });
      setDeletingId(id);

      const updatedPillars = rawPillars.filter((x, idx) => (x.id || `pillar-${idx}`) !== id);
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          overview: {
            ...overview,
            pillars: updatedPillars,
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
      addToast('Strategic Pillar deleted.', 'warning');
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

      const updatedPillars = rawPillars.filter((x, idx) => !selectedIds.includes(x.id || `pillar-${idx}`));
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          overview: {
            ...overview,
            pillars: updatedPillars,
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
      addToast('Selected pillars deleted.', 'warning');
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
      (row.desc || '').toLowerCase().includes(search.toLowerCase()) ||
      (row.icon || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.title || '').localeCompare(b.title || '');
      if (sort === 'z-a') return (b.title || '').localeCompare(a.title || '');
      return 0;
    });

  const columns = [
    {
      key: 'icon',
      label: 'Icon / Key',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          {row.icon || 'FaChartLine'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Strategic Pillar Title',
      render: (row) => (
        <div className="min-w-[180px]">
          <div className="font-bold text-foreground max-w-[240px] truncate" title={row.title}>
            {row.title || 'Untitled Pillar'}
          </div>
        </div>
      ),
    },
    {
      key: 'desc',
      label: 'Description Preview',
      render: (row) => (
        <div className="min-w-[220px] max-w-[350px] text-xs text-muted-foreground line-clamp-2" title={row.desc}>
          {row.desc || 'No description entered'}
        </div>
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
        title="Overview & Strategic Pillars"
        subtitle="Manage the scaling strategy overview, image, badge, and 3 strategic pillar cards."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'Overview & Pillars' }]}
      />

      {/* Top Header Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">Executive Strategy Overview</CardTitle>
          <Button
            onClick={handleSaveHeader}
            disabled={savingHeader}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          >
            <Save className="w-4 h-4 mr-1.5" /> {savingHeader ? 'Saving...' : 'Save Overview'}
          </Button>
        </CardHeader>
        <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput
              label="Section Tag Label"
              placeholder="e.g. OUR SCALING STRATEGY"
              value={overview.label || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    overview: { ...(p.realEstateData?.overview || {}), label: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Overview Section Title"
              placeholder="e.g. How We Scale Real Estate Enterprises"
              value={overview.title || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    overview: { ...(p.realEstateData?.overview || {}), title: e.target.value },
                  },
                }))
              }
            />
          </div>

          <FloatingTextarea
            label="Overview Section Description"
            placeholder="Detailed description of scaling strategy..."
            value={overview.desc || data.description || ''}
            onChange={(e) => {
              const val = e.target.value;
              setData((p) => ({
                ...p,
                description: val,
                realEstateData: {
                  ...(p.realEstateData || {}),
                  overview: { ...(p.realEstateData?.overview || {}), desc: val },
                },
              }));
            }}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput
              label="Floating Badge Title"
              placeholder="e.g. We Scale Real Estate Companies"
              value={overview.floatingBadgeTitle || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    overview: { ...(p.realEstateData?.overview || {}), floatingBadgeTitle: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Floating Badge Subtitle"
              placeholder="e.g. From project launch campaigns..."
              value={overview.floatingBadgeText || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    overview: { ...(p.realEstateData?.overview || {}), floatingBadgeText: e.target.value },
                  },
                }))
              }
            />
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-medium text-foreground">Overview Section Cover Image</label>
            <div className="flex gap-4 items-center">
              {(overview.image || data.overviewImage) && (
                <img
                  src={overview.image || data.overviewImage}
                  alt="Overview Preview"
                  className="w-32 h-20 object-cover rounded-xl border border-white/10 shadow"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Pillars Table Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
        bulkDeleting={bulkDeleting}
        onAdd={openCreate}
        addLabel="Add Strategic Pillar"
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
      <Dialog open={!!modal} onOpenChange={(open) => !open && !savingModal && setModal(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {modal === 'new' ? 'Add Strategic Pillar' : 'Edit Strategic Pillar'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a strategic pillar card to be displayed next to the executive overview.'
                : 'Modify pillar details, icon, and description.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSavePillar} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Pillar Title *"
                  placeholder="e.g. High-Ticket Buyer Lead Gen"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  rightElement={
                    <AIAssistantButton
                      context="Strategic Real Estate Pillar"
                      field="Pillar Title"
                      onGenerate={(val) => setForm({ ...form, title: val })}
                    />
                  }
                />
                <FloatingInput
                  label="Icon Class / Name"
                  placeholder="e.g. FaChartLine, FaDesktop, FaCogs"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </div>

              <FloatingTextarea
                label="Description"
                placeholder="Detailed description of this strategic scaling pillar..."
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                rows={4}
              />
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
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save Pillar' : 'Save Changes'}
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
        title={confirmModal.type === 'single' ? 'Delete Strategic Pillar' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this strategic pillar? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} pillars? This action cannot be undone.`
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
