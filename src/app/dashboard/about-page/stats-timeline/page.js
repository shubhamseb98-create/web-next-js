'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import DataTable from '../../../../components/dashboard/DataTable';
import TableToolbar from '../../../../components/dashboard/TableToolbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../../../components/ui/dialog';
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input';
import { Edit2, Trash2, Check, Plus, TrendingUp, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../../lib/utils';
import ConfirmDeleteModal from '../../../../components/dashboard/ConfirmDeleteModal';

const EMPTY_STAT = { id: '', value: '', label: '' };
const EMPTY_MILESTONE = { id: '', year: '', title: '', description: '' };

export default function AboutStatsTimeline() {
  const [data, setData] = useState({
    stats: [],
    milestones: [],
  });
  const [loading, setLoading] = useState(true);
  const [savingModal, setSavingModal] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Stats Modal & State
  const [statModal, setStatModal] = useState(null);
  const [statForm, setStatForm] = useState({ ...EMPTY_STAT });
  const [statSearch, setStatSearch] = useState('');
  const [statSort, setStatSort] = useState('latest');
  const [selectedStatIds, setSelectedStatIds] = useState([]);
  const [statDeletingId, setStatDeletingId] = useState(null);

  // Milestone Modal & State
  const [milestoneModal, setMilestoneModal] = useState(null);
  const [milestoneForm, setMilestoneForm] = useState({ ...EMPTY_MILESTONE });
  const [milestoneSearch, setMilestoneSearch] = useState('');
  const [milestoneSort, setMilestoneSort] = useState('latest');
  const [selectedMilestoneIds, setSelectedMilestoneIds] = useState([]);
  const [milestoneDeletingId, setMilestoneDeletingId] = useState(null);

  // Confirm Modal
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, entity: 'stat', type: 'single', id: null });

  function addToast(message, type = 'success') {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4000);
  }

  useEffect(() => {
    fetchStatsTimeline();
  }, []);

  async function fetchStatsTimeline() {
    try {
      setLoading(true);
      const res = await fetch('/api/about-page');
      if (!res.ok) throw new Error('Failed to fetch data');
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (err) {
      addToast('Could not load stats & timeline: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  const rawStats = data.stats || [];
  const statRows = rawStats.map((s, idx) => ({ ...s, _id: s.id || `stat-${idx}` }));

  const rawMilestones = data.milestones || [];
  const milestoneRows = rawMilestones.map((m, idx) => ({ ...m, _id: m.id || `mile-${idx}` }));

  // ================= STATS HANDLERS =================
  function openCreateStat() {
    setStatForm({ ...EMPTY_STAT, id: `stat-${Date.now()}` });
    setStatModal('new');
  }

  function openEditStat(st) {
    setStatForm({ ...st });
    setStatModal(st);
  }

  async function handleSaveStat(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentStats = [...rawStats];
      let updatedStats = [];

      if (statModal === 'new') {
        updatedStats = [...currentStats, statForm];
      } else {
        const itemIdx = currentStats.findIndex((x, idx) => (x.id || `stat-${idx}`) === (statModal.id || statModal._id));
        if (itemIdx >= 0) {
          currentStats[itemIdx] = statForm;
          updatedStats = currentStats;
        } else {
          updatedStats = [...currentStats, statForm];
        }
      }

      const updatedData = { ...data, stats: updatedStats };
      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Save failed');

      setData(updatedData);
      addToast(statModal === 'new' ? 'Stat created successfully!' : 'Stat updated successfully!');
      setStatModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingModal(false);
    }
  }

  async function handleDeleteStat(id) {
    try {
      setConfirmModal({ isOpen: false, entity: 'stat', type: 'single', id: null });
      setStatDeletingId(id);

      const updatedStats = rawStats.filter((x, idx) => (x.id || `stat-${idx}`) !== id);
      const updatedData = { ...data, stats: updatedStats };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Delete failed');

      setData(updatedData);
      setSelectedStatIds((s) => s.filter((x) => x !== id));
      addToast('Stat deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setStatDeletingId(null);
    }
  }

  async function handleBulkDeleteStats() {
    try {
      setConfirmModal({ isOpen: false, entity: 'stat', type: 'bulk', id: null });
      const updatedStats = rawStats.filter((x, idx) => !selectedStatIds.includes(x.id || `stat-${idx}`));
      const updatedData = { ...data, stats: updatedStats };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Bulk delete failed');

      setData(updatedData);
      setSelectedStatIds([]);
      addToast('Selected stats deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    }
  }

  // ================= MILESTONES HANDLERS =================
  function openCreateMilestone() {
    setMilestoneForm({ ...EMPTY_MILESTONE, id: `mile-${Date.now()}` });
    setMilestoneModal('new');
  }

  function openEditMilestone(m) {
    setMilestoneForm({ ...m });
    setMilestoneModal(m);
  }

  async function handleSaveMilestone(e) {
    e.preventDefault();
    try {
      setSavingModal(true);
      const currentMilestones = [...rawMilestones];
      let updatedMilestones = [];

      if (milestoneModal === 'new') {
        updatedMilestones = [...currentMilestones, milestoneForm];
      } else {
        const itemIdx = currentMilestones.findIndex((x, idx) => (x.id || `mile-${idx}`) === (milestoneModal.id || milestoneModal._id));
        if (itemIdx >= 0) {
          currentMilestones[itemIdx] = milestoneForm;
          updatedMilestones = currentMilestones;
        } else {
          updatedMilestones = [...currentMilestones, milestoneForm];
        }
      }

      const updatedData = { ...data, milestones: updatedMilestones };
      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Save failed');

      setData(updatedData);
      addToast(milestoneModal === 'new' ? 'Milestone added successfully!' : 'Milestone updated successfully!');
      setMilestoneModal(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingModal(false);
    }
  }

  async function handleDeleteMilestone(id) {
    try {
      setConfirmModal({ isOpen: false, entity: 'milestone', type: 'single', id: null });
      setMilestoneDeletingId(id);

      const updatedMilestones = rawMilestones.filter((x, idx) => (x.id || `mile-${idx}`) !== id);
      const updatedData = { ...data, milestones: updatedMilestones };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Delete failed');

      setData(updatedData);
      setSelectedMilestoneIds((s) => s.filter((x) => x !== id));
      addToast('Milestone deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setMilestoneDeletingId(null);
    }
  }

  async function handleBulkDeleteMilestones() {
    try {
      setConfirmModal({ isOpen: false, entity: 'milestone', type: 'bulk', id: null });
      const updatedMilestones = rawMilestones.filter((x, idx) => !selectedMilestoneIds.includes(x.id || `mile-${idx}`));
      const updatedData = { ...data, milestones: updatedMilestones };

      const res = await fetch('/api/about-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error('Bulk delete failed');

      setData(updatedData);
      setSelectedMilestoneIds([]);
      addToast('Selected milestones deleted.', 'warning');
    } catch (err) {
      addToast(err.message, 'error');
    }
  }

  const filteredStats = statRows
    .filter((row) =>
      (row.value || '').toLowerCase().includes(statSearch.toLowerCase()) ||
      (row.label || '').toLowerCase().includes(statSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (statSort === 'a-z') return (a.label || '').localeCompare(b.label || '');
      if (statSort === 'z-a') return (b.label || '').localeCompare(a.label || '');
      return 0;
    });

  const filteredMilestones = milestoneRows
    .filter((row) =>
      (row.year || '').toLowerCase().includes(milestoneSearch.toLowerCase()) ||
      (row.title || '').toLowerCase().includes(milestoneSearch.toLowerCase()) ||
      (row.description || '').toLowerCase().includes(milestoneSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (milestoneSort === 'a-z') return (a.title || '').localeCompare(b.title || '');
      if (milestoneSort === 'z-a') return (b.title || '').localeCompare(a.title || '');
      return (Number(b.year) || 0) - (Number(a.year) || 0);
    });

  const statColumns = [
    {
      key: 'value',
      label: 'Stat Value',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          {row.value || 'N/A'}
        </span>
      ),
    },
    {
      key: 'label',
      label: 'Stat Description Label',
      render: (row) => (
        <div className="font-semibold text-foreground max-w-[380px] truncate" title={row.label}>
          {row.label || 'Untitled Stat'}
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
              openEditStat(row);
            }}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal({ isOpen: true, entity: 'stat', type: 'single', id: row._id });
            }}
            disabled={statDeletingId === row._id}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50"
          >
            {statDeletingId === row._id ? (
              <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      ),
    },
  ];

  const milestoneColumns = [
    {
      key: 'year',
      label: 'Year',
      render: (row) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Calendar className="w-3.5 h-3.5" />
          {row.year || '2024'}
        </span>
      ),
    },
    {
      key: 'title',
      label: 'Milestone Title',
      render: (row) => (
        <div className="font-bold text-foreground max-w-[240px] truncate" title={row.title}>
          {row.title || 'Untitled Milestone'}
        </div>
      ),
    },
    {
      key: 'description',
      label: 'Story Description',
      render: (row) => (
        <div className="min-w-[200px] max-w-[380px] text-xs text-muted-foreground line-clamp-2" title={row.description}>
          {row.description || 'No description'}
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
              openEditMilestone(row);
            }}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400 dark:hover:bg-emerald-500/30"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setConfirmModal({ isOpen: true, entity: 'milestone', type: 'single', id: row._id });
            }}
            disabled={milestoneDeletingId === row._id}
            className="w-8 h-8 rounded flex items-center justify-center transition-colors bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30 disabled:opacity-50"
          >
            {milestoneDeletingId === row._id ? (
              <span className="w-4 h-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <div className="p-8 text-center">Loading Stats & Timeline...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 bg-background min-h-full">
      <Breadcrumb
        title="Stats & Timeline"
        subtitle="Manage company key statistics and milestone story timeline cards."
        crumbs={[{ label: 'About Management' }, { label: 'Stats & Timeline' }]}
      />

      {/* SECTION 1: Company Stats List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Company Statistics
        </h2>
        <TableToolbar
          search={statSearch}
          onSearchChange={setStatSearch}
          sort={statSort}
          onSortChange={setStatSort}
          selectedCount={selectedStatIds.length}
          onBulkDelete={() => setConfirmModal({ isOpen: true, entity: 'stat', type: 'bulk', id: null })}
          bulkDeleting={false}
          onAdd={openCreateStat}
          addLabel="Add Stat"
        />
        <DataTable
          columns={statColumns}
          data={filteredStats}
          loading={false}
          onRowClick={openEditStat}
          actions={false}
          selectedIds={selectedStatIds}
          onToggleSelectAll={() => {
            if (selectedStatIds.length === filteredStats.length) setSelectedStatIds([]);
            else setSelectedStatIds(filteredStats.map((x) => x._id));
          }}
          onToggleSelectRow={(id) => {
            setSelectedStatIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
          }}
        />
      </div>

      {/* SECTION 2: Timeline Milestones List */}
      <div className="space-y-4 pt-4 border-t border-border/40">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Our Story (Timeline Milestones)
        </h2>
        <TableToolbar
          search={milestoneSearch}
          onSearchChange={setMilestoneSearch}
          sort={milestoneSort}
          onSortChange={setMilestoneSort}
          selectedCount={selectedMilestoneIds.length}
          onBulkDelete={() => setConfirmModal({ isOpen: true, entity: 'milestone', type: 'bulk', id: null })}
          bulkDeleting={false}
          onAdd={openCreateMilestone}
          addLabel="Add Milestone"
        />
        <DataTable
          columns={milestoneColumns}
          data={filteredMilestones}
          loading={false}
          onRowClick={openEditMilestone}
          actions={false}
          selectedIds={selectedMilestoneIds}
          onToggleSelectAll={() => {
            if (selectedMilestoneIds.length === filteredMilestones.length) setSelectedMilestoneIds([]);
            else setSelectedMilestoneIds(filteredMilestones.map((x) => x._id));
          }}
          onToggleSelectRow={(id) => {
            setSelectedMilestoneIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
          }}
        />
      </div>

      {/* Stat Modal */}
      <Dialog open={!!statModal} onOpenChange={(open) => !open && !savingModal && setStatModal(null)}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {statModal === 'new' ? 'Add Company Stat' : 'Edit Stat'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {statModal === 'new' ? 'Create a new numeric stat indicator.' : 'Modify stat value and label description.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveStat} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <FloatingInput
                label="Value (e.g. 15+, 99.8%) *"
                placeholder="e.g. 15+"
                required
                value={statForm.value}
                onChange={(e) => setStatForm({ ...statForm, value: e.target.value })}
              />
              <FloatingInput
                label="Label Description *"
                placeholder="e.g. Years of Experience"
                required
                value={statForm.label}
                onChange={(e) => setStatForm({ ...statForm, label: e.target.value })}
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
                onClick={() => setStatModal(null)}
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
                {savingModal ? 'Saving...' : statModal === 'new' ? 'Save Stat' : 'Save Changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Milestone Modal */}
      <Dialog open={!!milestoneModal} onOpenChange={(open) => !open && !savingModal && setMilestoneModal(null)}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {milestoneModal === 'new' ? 'Add Story Milestone' : 'Edit Milestone'}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {milestoneModal === 'new' ? 'Add a milestone to the story timeline.' : 'Modify milestone year, title, and story text.'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveMilestone} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <FloatingInput
                    label="Year *"
                    placeholder="e.g. 2018"
                    required
                    value={milestoneForm.year}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, year: e.target.value })}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FloatingInput
                    label="Milestone Title *"
                    placeholder="e.g. Global Expansion"
                    required
                    value={milestoneForm.title}
                    onChange={(e) => setMilestoneForm({ ...milestoneForm, title: e.target.value })}
                  />
                </div>
              </div>

              <FloatingTextarea
                label="Story Description"
                placeholder="Describe what occurred during this milestone..."
                value={milestoneForm.description}
                onChange={(e) => setMilestoneForm({ ...milestoneForm, description: e.target.value })}
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
                onClick={() => setMilestoneModal(null)}
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
                {savingModal ? 'Saving...' : milestoneModal === 'new' ? 'Save Milestone' : 'Save Changes'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={false}
        onClose={() => setConfirmModal({ isOpen: false, entity: 'stat', type: 'single', id: null })}
        onConfirm={() => {
          if (confirmModal.entity === 'stat') {
            confirmModal.type === 'single' ? handleDeleteStat(confirmModal.id) : handleBulkDeleteStats();
          } else {
            confirmModal.type === 'single' ? handleDeleteMilestone(confirmModal.id) : handleBulkDeleteMilestones();
          }
        }}
        title={`Delete ${confirmModal.entity === 'stat' ? 'Stat' : 'Milestone'}`}
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
