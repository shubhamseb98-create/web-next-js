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
import { Edit2, Trash2, Check, Plus, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';
import { DEFAULT_REAL_ESTATE_DATA, mergeRealEstateData } from '../../../../lib/realEstateDefaults';

const EMPTY_STEP = {
  id: '',
  step: '01',
  title: '',
  desc: '',
};

export default function RealEstateFrameworkPage() {
  const [data, setData] = useState({
    title: 'Real Estate Business Growth & Scaling Advisory',
    slug: 'real-estate-advisory',
    realEstateData: DEFAULT_REAL_ESTATE_DATA,
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingHeader, setSavingHeader] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_STEP });
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
    fetchFramework();
  }, []);

  async function fetchFramework() {
    try {
      setLoading(true);
      const res = await fetch('/api/services/real-estate-advisory');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setServiceId(json.data._id);
          setData(mergeRealEstateData(json.data));
          return;
        }
      }
      const allRes = await fetch('/api/services');
      if (allRes.ok) {
        const allJson = await allRes.json();
        const found = allJson.data?.find(s => s.slug === 'real-estate-advisory');
        if (found) {
          setServiceId(found._id);
          setData(mergeRealEstateData(found));
        }
      }
    } catch (err) {
      console.warn('Using default framework state:', err);
    } finally {
      setLoading(false);
    }
  }

  const process = data.realEstateData?.process || {};
  const rawItems = process.items || [];
  const rows = rawItems.map((item, index) => ({
    ...item,
    _id: item.id || `step-${index}`,
  }));

  function openCreate() {
    const nextNum = String(rawItems.length + 1).padStart(2, '0');
    setForm({ ...EMPTY_STEP, num: nextNum, id: `step-${Date.now()}` });
    setModal('new');
  }

  function openEdit(step) {
    setForm({ ...step });
    setModal(step);
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
      addToast('Framework Section Header Saved!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleSaveStep(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentItems = [...rawItems];
      let updatedItems = [];

      if (modal === 'new') {
        updatedItems = [...currentItems, form];
      } else {
        const itemIdx = currentItems.findIndex((x, idx) => (x.id || `step-${idx}`) === (modal.id || modal._id));
        if (itemIdx >= 0) {
          currentItems[itemIdx] = form;
          updatedItems = currentItems;
        } else {
          updatedItems = [...currentItems, form];
        }
      }

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          process: {
            ...process,
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
      addToast(modal === 'new' ? 'Stage created successfully!' : 'Stage updated successfully!');
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

      const updatedItems = rawItems.filter((x, idx) => (x.id || `step-${idx}`) !== id);
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          process: {
            ...process,
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
      addToast('Stage deleted.', 'warning');
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

      const updatedItems = rawItems.filter((x, idx) => !selectedIds.includes(x.id || `step-${idx}`));
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          process: {
            ...process,
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
      addToast('Selected stages deleted.', 'warning');
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
      (row.num || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.title || '').localeCompare(b.title || '');
      if (sort === 'z-a') return (b.title || '').localeCompare(a.title || '');
      return (Number(a.num) || 0) - (Number(b.num) || 0);
    });

  const columns = [
    {
      key: 'num',
      label: 'Stage / Step',
      render: (row) => (
        <span className="inline-flex items-center justify-center w-10 h-10 text-sm font-black rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {row.num || '01'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Stage Title',
      render: (row) => (
        <div className="min-w-[180px]">
          <div className="font-bold text-foreground max-w-[240px] truncate" title={row.title}>
            {row.title || 'Untitled Stage'}
          </div>
        </div>
      ),
    },
    {
      key: 'desc',
      label: 'Stage Description Preview',
      render: (row) => (
        <div className="min-w-[220px] max-w-[380px] text-xs text-muted-foreground line-clamp-2" title={row.desc}>
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
        title="5-Stage Business Scaling Framework"
        subtitle="Manage the step-by-step advisory methodology and stage descriptions."
        crumbs={[{ label: 'Real Estate Management' }, { label: '5-Stage Framework' }]}
      />

      {/* Section Header Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">5-Stage Framework Header</CardTitle>
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
              placeholder="e.g. OUR BLUEPRINT"
              value={process.label || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    process: { ...(p.realEstateData?.process || {}), label: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Title"
              placeholder="e.g. The 5-Stage Business Scaling Framework"
              value={process.title || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    process: { ...(p.realEstateData?.process || {}), title: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Description"
              placeholder="Framework overview text..."
              value={process.desc || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    process: { ...(p.realEstateData?.process || {}), desc: e.target.value },
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
        addLabel="Add Framework Step"
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
              {modal === 'new' ? 'Add Framework Stage' : 'Edit Framework Stage'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a new step in the real estate business scaling blueprint.'
                : 'Modify step number, stage title, and description.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveStep} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <FloatingInput
                    label="Step #"
                    placeholder="e.g. 01"
                    required
                    value={form.num}
                    onChange={(e) => setForm({ ...form, num: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <FloatingInput
                    label="Stage Title *"
                    placeholder="e.g. Business & Funnel Audit"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    rightElement={
                      <AIAssistantButton
                        context="Real Estate Framework Stage"
                        field="Stage Title"
                        onGenerate={(val) => setForm({ ...form, title: val })}
                      />
                    }
                  />
                </div>
              </div>

              <FloatingTextarea
                label="Stage Description"
                placeholder="Detailed description of activities and deliverables in this stage..."
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
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save Stage' : 'Save Changes'}
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
        title={confirmModal.type === 'single' ? 'Delete Stage' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this stage? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} stages? This action cannot be undone.`
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
