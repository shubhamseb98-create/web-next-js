'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import DataTable from '../../../../components/dashboard/DataTable';
import TableToolbar from '../../../../components/dashboard/TableToolbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../../components/ui/dialog';
import { FloatingInput } from '../../../../components/ui/floating-input';
import { Edit2, Trash2, Check, Plus, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';
import { DEFAULT_REAL_ESTATE_DATA, mergeRealEstateData } from '../../../../lib/realEstateDefaults';

const EMPTY_STAT = {
  id: '',
  value: '',
  label: '',
  desc: '',
};

export default function RealEstateTrackRecordPage() {
  const [data, setData] = useState({
    title: 'Real Estate Business Growth & Scaling Advisory',
    slug: 'real-estate-advisory',
    realEstateData: DEFAULT_REAL_ESTATE_DATA,
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingModal, setSavingModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_STAT });
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
    fetchTrackRecord();
  }, []);

  async function fetchTrackRecord() {
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
      console.warn('Using default track record state:', err);
    } finally {
      setLoading(false);
    }
  }

  const rawStats = data.realEstateData?.stats || [];
  const rows = rawStats.map((item, index) => ({
    ...item,
    _id: item.id || `stat-${index}`,
  }));

  function openCreate() {
    setForm({ ...EMPTY_STAT, id: `stat-${Date.now()}` });
    setModal('new');
  }

  function openEdit(stat) {
    setForm({ ...stat });
    setModal(stat);
  }

  async function handleSaveStat(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentStats = [...rawStats];
      let updatedStats = [];

      if (modal === 'new') {
        updatedStats = [...currentStats, form];
      } else {
        const itemIdx = currentStats.findIndex((x, idx) => (x.id || `stat-${idx}`) === (modal.id || modal._id));
        if (itemIdx >= 0) {
          currentStats[itemIdx] = form;
          updatedStats = currentStats;
        } else {
          updatedStats = [...currentStats, form];
        }
      }

      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          stats: updatedStats,
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
      addToast(modal === 'new' ? 'Metric created successfully!' : 'Metric updated successfully!');
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

      const updatedStats = rawStats.filter((x, idx) => (x.id || `stat-${idx}`) !== id);
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          stats: updatedStats,
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
      addToast('Metric deleted.', 'warning');
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

      const updatedStats = rawStats.filter((x, idx) => !selectedIds.includes(x.id || `stat-${idx}`));
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          stats: updatedStats,
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
      addToast('Selected metrics deleted.', 'warning');
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
      (row.value || '').toLowerCase().includes(search.toLowerCase()) ||
      (row.label || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.label || '').localeCompare(b.label || '');
      if (sort === 'z-a') return (b.label || '').localeCompare(a.label || '');
      return 0;
    });

  const columns = [
    {
      key: 'value',
      label: 'Metric Value',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          {row.value || 'N/A'}
        </span>
      ),
    },
    {
      key: 'label',
      label: 'Metric Label & Milestone Description',
      render: (row) => (
        <div className="font-semibold text-foreground max-w-[400px] truncate" title={row.label}>
          {row.label || 'Untitled Metric'}
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
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
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
        title="Track Record & Simulator Stats"
        subtitle="Manage the 4 key business performance metrics and track record milestones."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'Track Record & Stats' }]}
      />

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
        addLabel="Add Metric"
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {modal === 'new' ? 'Add Track Record Metric' : 'Edit Metric'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a key business scaling result metric.'
                : 'Modify metric value and label description.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveStat} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FloatingInput
                label="Metric Value (e.g. 150+, ₹2,500Cr+) *"
                placeholder="e.g. 150+"
                required
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
              />

              <FloatingInput
                label="Metric Label / Description *"
                placeholder="e.g. Real Estate Businesses Scaled"
                required
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
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
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save Metric' : 'Save Changes'}
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
        title={confirmModal.type === 'single' ? 'Delete Metric' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this metric? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} metrics? This action cannot be undone.`
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
