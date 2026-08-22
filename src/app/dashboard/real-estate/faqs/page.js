'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import DataTable from '../../../../components/dashboard/DataTable';
import TableToolbar from '../../../../components/dashboard/TableToolbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../../components/ui/dialog';
import { Button } from '../../../../components/ui/button';
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Edit2, Trash2, Check, Plus, Save, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

const EMPTY_FAQ = {
  id: '',
  q: '',
  a: '',
};

export default function RealEstateFaqsPage() {
  const [data, setData] = useState({
    realEstateData: {
      faqs: {
        label: 'CLEAR ANSWERS',
        title: 'Frequently Asked Questions',
        desc: 'Understand how our growth advisory, PropTech digital infrastructure, and lead generation funnels work for real estate firms.',
        items: [],
      },
    },
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingHeader, setSavingHeader] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_FAQ });
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
    fetchFaqs();
  }, []);

  async function fetchFaqs() {
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
      addToast('Could not load FAQs: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  const faqs = data.realEstateData?.faqs || {};
  const rawItems = faqs.items || [];
  const rows = rawItems.map((item, index) => ({
    ...item,
    _id: item.id || `faq-${index}`,
  }));

  function openCreate() {
    setForm({ ...EMPTY_FAQ, id: `faq-${Date.now()}` });
    setModal('new');
  }

  function openEdit(faq) {
    setForm({ ...faq });
    setModal(faq);
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
      addToast('FAQs Section Header Saved!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingHeader(false);
    }
  }

  async function handleSaveFaq(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentItems = [...rawItems];
      let updatedItems = [];

      if (modal === 'new') {
        updatedItems = [...currentItems, form];
      } else {
        const itemIdx = currentItems.findIndex((x, idx) => (x.id || `faq-${idx}`) === (modal.id || modal._id));
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
          faqs: {
            ...faqs,
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
      addToast(modal === 'new' ? 'FAQ created successfully!' : 'FAQ updated successfully!');
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

      const updatedItems = rawItems.filter((x, idx) => (x.id || `faq-${idx}`) !== id);
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          faqs: {
            ...faqs,
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
      addToast('FAQ deleted.', 'warning');
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

      const updatedItems = rawItems.filter((x, idx) => !selectedIds.includes(x.id || `faq-${idx}`));
      const updatedData = {
        ...data,
        realEstateData: {
          ...(data.realEstateData || {}),
          faqs: {
            ...faqs,
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
      addToast('Selected FAQs deleted.', 'warning');
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
      (row.q || '').toLowerCase().includes(search.toLowerCase()) ||
      (row.a || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'a-z') return (a.q || '').localeCompare(b.q || '');
      if (sort === 'z-a') return (b.q || '').localeCompare(a.q || '');
      return 0;
    });

  const columns = [
    {
      key: 'question',
      label: 'Question',
      render: (row) => (
        <div className="min-w-[200px] flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="font-bold text-foreground max-w-[320px] truncate" title={row.q}>
            {row.q || 'Untitled Question'}
          </div>
        </div>
      ),
    },
    {
      key: 'answer',
      label: 'Answer Preview',
      render: (row) => (
        <div className="min-w-[220px] max-w-[420px] text-xs text-muted-foreground line-clamp-2" title={row.a}>
          {row.a || 'No answer entered'}
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
        title="Real Estate FAQs Management"
        subtitle="Manage frequently asked questions and answers for real estate advisory clients."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'FAQs Management' }]}
      />

      {/* Section Header Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">FAQs Section Header</CardTitle>
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
              placeholder="e.g. CLEAR ANSWERS"
              value={faqs.label || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    faqs: { ...(p.realEstateData?.faqs || {}), label: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Title"
              placeholder="e.g. Frequently Asked Questions"
              value={faqs.title || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    faqs: { ...(p.realEstateData?.faqs || {}), title: e.target.value },
                  },
                }))
              }
            />
            <FloatingInput
              label="Section Description"
              placeholder="FAQ section description..."
              value={faqs.desc || ''}
              onChange={(e) =>
                setData((p) => ({
                  ...p,
                  realEstateData: {
                    ...(p.realEstateData || {}),
                    faqs: { ...(p.realEstateData?.faqs || {}), desc: e.target.value },
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
        addLabel="Add FAQ"
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
              {modal === 'new' ? 'Add Real Estate FAQ' : 'Edit FAQ'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a new question and detailed answer for clients.'
                : 'Modify question and answer content.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveFaq} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FloatingInput
                label="Question *"
                placeholder="e.g. How do you generate verified high-ticket buyer leads?"
                required
                value={form.q}
                onChange={(e) => setForm({ ...form, q: e.target.value })}
              />

              <FloatingTextarea
                label="Answer *"
                placeholder="Enter detailed answer here..."
                required
                value={form.a}
                onChange={(e) => setForm({ ...form, a: e.target.value })}
                rows={5}
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
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save FAQ' : 'Save Changes'}
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
        title={confirmModal.type === 'single' ? 'Delete FAQ' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this FAQ? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} FAQs? This action cannot be undone.`
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
