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
import { Edit2, Trash2, Check, Plus, Save, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

const EMPTY_HIGHLIGHT = {
  id: '',
  icon: 'award',
  title: '',
  description: '',
};

export default function AboutContent() {
  const [data, setData] = useState({
    aboutUsTitle: '',
    aboutUsParagraph1: '',
    aboutUsParagraph2: '',
    aboutUsYears: '',
    aboutUsImage1: '',
    aboutUsImage2: '',
    aboutUsHighlights: [],
  });
  const [loading, setLoading] = useState(true);
  const [savingHeader, setSavingHeader] = useState(false);
  const [savingModal, setSavingModal] = useState(false);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ ...EMPTY_HIGHLIGHT });
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
    fetchContent();
  }, []);

  async function fetchContent() {
    try {
      setLoading(true);
      const res = await fetch('/api/about-page');
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      addToast('Could not load content: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  const rawHighlights = data.aboutUsHighlights || [];
  const rows = rawHighlights.map((item, index) => ({
    ...item,
    _id: item.id || `hl-${index}`,
  }));

  function openCreate() {
    setForm({ ...EMPTY_HIGHLIGHT, id: `hl-${Date.now()}` });
    setModal('new');
  }

  function openEdit(item) {
    setForm({ ...item });
    setModal(item);
  }

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
        setData((p) => ({ ...p, [field]: responseData.url }));
        addToast('Image uploaded successfully', 'success');
      } else {
        throw new Error(responseData.error?.message || 'Upload failed');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleSaveContent = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSavingHeader(true);
    try {
      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save');
      addToast('About Us Content Settings Saved!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingHeader(false);
    }
  };

  async function handleSaveHighlight(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentHighlights = [...rawHighlights];
      let updatedHighlights = [];

      if (modal === 'new') {
        updatedHighlights = [...currentHighlights, form];
      } else {
        const itemIdx = currentHighlights.findIndex((x, idx) => (x.id || `hl-${idx}`) === (modal.id || modal._id));
        if (itemIdx >= 0) {
          currentHighlights[itemIdx] = form;
          updatedHighlights = currentHighlights;
        } else {
          updatedHighlights = [...currentHighlights, form];
        }
      }

      const updatedData = {
        ...data,
        aboutUsHighlights: updatedHighlights,
      };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Save failed');

      setData(updatedData);
      addToast(modal === 'new' ? 'Highlight added successfully!' : 'Highlight updated successfully!');
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

      const updatedHighlights = rawHighlights.filter((x, idx) => (x.id || `hl-${idx}`) !== id);
      const updatedData = {
        ...data,
        aboutUsHighlights: updatedHighlights,
      };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Delete failed');

      setData(updatedData);
      setSelectedIds((s) => s.filter((x) => x !== id));
      addToast('Highlight deleted.', 'warning');
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

      const updatedHighlights = rawHighlights.filter((x, idx) => !selectedIds.includes(x.id || `hl-${idx}`));
      const updatedData = {
        ...data,
        aboutUsHighlights: updatedHighlights,
      };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Bulk delete failed');

      setData(updatedData);
      setSelectedIds([]);
      addToast('Selected highlights deleted.', 'warning');
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
      (row.description || '').toLowerCase().includes(search.toLowerCase()) ||
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
      label: 'Icon Key',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Award className="w-3.5 h-3.5" />
          {row.icon || 'award'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Highlight Title',
      render: (row) => (
        <div className="min-w-[180px]">
          <div className="font-bold text-foreground max-w-[240px] truncate" title={row.title}>
            {row.title || 'Untitled Highlight'}
          </div>
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Description Preview',
      render: (row) => (
        <div className="min-w-[220px] max-w-[380px] text-xs text-muted-foreground line-clamp-2" title={row.description}>
          {row.description || 'No description entered'}
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

  if (loading) return <div className="p-8 text-center">Loading Content Settings...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb
        title="About Us Content"
        subtitle="Manage the primary description, story, values, and highlights for the About Us page."
        crumbs={[{ label: 'About Management' }, { label: 'About Us Content' }]}
      />

      {/* Top Header Card */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">About Us Content Settings</CardTitle>
          <Button
            onClick={handleSaveContent}
            disabled={savingHeader}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
          >
            <Save className="w-4 h-4 mr-1.5" /> {savingHeader ? 'Saving...' : 'Save Content'}
          </Button>
        </CardHeader>
        <CardContent style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput
              label="About Us Title"
              value={data.aboutUsTitle}
              onChange={(e) => setData({ ...data, aboutUsTitle: e.target.value })}
            />
            <FloatingInput
              label="Years of Excellence (Badge)"
              value={data.aboutUsYears}
              onChange={(e) => setData({ ...data, aboutUsYears: e.target.value })}
            />
          </div>

          <FloatingTextarea
            label="Paragraph 1"
            value={data.aboutUsParagraph1}
            onChange={(e) => setData({ ...data, aboutUsParagraph1: e.target.value })}
            rows={3}
          />
          <FloatingTextarea
            label="Paragraph 2"
            value={data.aboutUsParagraph2}
            onChange={(e) => setData({ ...data, aboutUsParagraph2: e.target.value })}
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">About Us Image 1 (Large)</label>
              <div className="flex gap-4 items-center">
                {data.aboutUsImage1 && (
                  <img src={data.aboutUsImage1} alt="Preview 1" className="w-24 h-16 object-cover rounded-xl border border-white/10 shadow" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'aboutUsImage1')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">About Us Image 2 (Floating)</label>
              <div className="flex gap-4 items-center">
                {data.aboutUsImage2 && (
                  <img src={data.aboutUsImage2} alt="Preview 2" className="w-24 h-16 object-cover rounded-xl border border-white/10 shadow" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'aboutUsImage2')}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlights Table Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
        selectedCount={selectedIds.length}
        onBulkDelete={() => setConfirmModal({ isOpen: true, type: 'bulk', id: null })}
        bulkDeleting={bulkDeleting}
        onAdd={openCreate}
        addLabel="Add Highlight"
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
              {modal === 'new' ? 'Add New Highlight' : 'Edit Highlight'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {modal === 'new'
                ? 'Create a key company highlight for the About Us section.'
                : 'Modify highlight title, icon, and description.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveHighlight} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label="Highlight Title *"
                  placeholder="e.g. Award-Winning Agency"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  rightElement={
                    <AIAssistantButton
                      context="About Us Highlight"
                      field="Highlight Title"
                      onGenerate={(val) => setForm({ ...form, title: val })}
                    />
                  }
                />
                <FloatingInput
                  label="Icon Key (e.g. award, users, shield)"
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                />
              </div>

              <FloatingTextarea
                label="Description"
                placeholder="Highlight details and explanation..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
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
                {savingModal ? 'Saving...' : modal === 'new' ? 'Save Highlight' : 'Save Changes'}
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
        title={confirmModal.type === 'single' ? 'Delete Highlight' : 'Bulk Delete'}
        message={
          confirmModal.type === 'single'
            ? 'Are you sure you want to delete this highlight? This action cannot be undone.'
            : `Are you sure you want to delete ${selectedIds.length} highlights? This action cannot be undone.`
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
