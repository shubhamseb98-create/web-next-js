'use client';

import { useState, useEffect } from 'react';
import Breadcrumb from '../../../components/dashboard/Breadcrumb';
import Toast from '../../../components/dashboard/Toast';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import {
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  Save,
  RotateCcw,
  Sparkles,
  Smartphone,
  Eye,
  Sliders,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import {
  FaPhone,
  FaWhatsapp,
  FaLinkedinIn,
  FaArrowUp,
  FaEnvelope,
  FaTelegram,
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaGlobe,
  FaLink
} from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

// Standard preset swatches
const COLOR_PRESETS = [
  { name: 'Royal Blue', color: '#2563eb', hover: '#1d4ed8' },
  { name: 'Emerald WhatsApp', color: '#22c55e', hover: '#16a34a' },
  { name: 'LinkedIn Blue', color: '#0a66c2', hover: '#004182' },
  { name: 'Forest Green', color: '#52a436', hover: '#3e8027' },
  { name: 'Vibrant Orange', color: '#f97316', hover: '#ea580c' },
  { name: 'Violet Purple', color: '#8b5cf6', hover: '#7c3aed' },
  { name: 'Deep Crimson', color: '#ef4444', hover: '#dc2626' },
  { name: 'Midnight Dark', color: '#1e293b', hover: '#0f172a' },
];

const AVAILABLE_ICONS = [
  { id: 'phone', label: 'Phone', Icon: FaPhone },
  { id: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp },
  { id: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { id: 'arrow_up', label: 'Arrow Up', Icon: FaArrowUp },
  { id: 'mail', label: 'Email', Icon: FaEnvelope },
  { id: 'telegram', label: 'Telegram', Icon: FaTelegram },
  { id: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { id: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { id: 'twitter', label: 'Twitter / X', Icon: FaXTwitter },
  { id: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { id: 'globe', label: 'Website / Globe', Icon: FaGlobe },
  { id: 'link', label: 'Custom Link', Icon: FaLink },
];

const DEFAULT_BUTTONS = [
  {
    id: 'call',
    type: 'call',
    label: 'Call Us',
    tooltip: 'Call Us',
    value: '+91 8527458950',
    customMessage: '',
    color: '#2563eb',
    hoverColor: '#1d4ed8',
    icon: 'phone',
    isEnabled: true,
    openInNewTab: false,
    sort: 1
  },
  {
    id: 'whatsapp',
    type: 'whatsapp',
    label: 'WhatsApp',
    tooltip: 'WhatsApp',
    value: '+91 8527458950',
    customMessage: 'Hello WebTycoons, I would like to enquire about your services.',
    color: '#22c55e',
    hoverColor: '#16a34a',
    icon: 'whatsapp',
    isEnabled: true,
    openInNewTab: true,
    sort: 2
  },
  {
    id: 'linkedin',
    type: 'linkedin',
    label: 'LinkedIn',
    tooltip: 'LinkedIn',
    value: 'https://linkedin.com',
    customMessage: '',
    color: '#0a66c2',
    hoverColor: '#004182',
    icon: 'linkedin',
    isEnabled: true,
    openInNewTab: true,
    sort: 3
  },
  {
    id: 'scroll_top',
    type: 'scroll_top',
    label: 'Scroll to Top',
    tooltip: 'Top',
    value: '250',
    customMessage: '',
    color: '#52a436',
    hoverColor: '#3e8027',
    icon: 'arrow_up',
    isEnabled: true,
    openInNewTab: false,
    sort: 4
  }
];

function getIconComponent(iconName) {
  const item = AVAILABLE_ICONS.find(i => i.id === iconName?.toLowerCase());
  return item ? item.Icon : FaLink;
}

export default function FloatingButtonsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Config State
  const [isEnabled, setIsEnabled] = useState(true);
  const [position, setPosition] = useState('right');
  const [bottomOffset, setBottomOffset] = useState(24);
  const [sideOffset, setSideOffset] = useState(20);
  const [buttonSize, setButtonSize] = useState(44);
  const [showTooltips, setShowTooltips] = useState(true);
  const [buttons, setButtons] = useState(DEFAULT_BUTTONS);

  // Edit Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingBtn, setEditingBtn] = useState(null);
  const [isNewBtn, setIsNewBtn] = useState(false);

  // Preview interactive state
  const [hoveredPreviewBtn, setHoveredPreviewBtn] = useState(null);

  const addToast = (msg, type = 'success') => {
    setToasts(t => [...t, { id: Date.now(), message: msg, type }]);
  };

  const removeToast = (id) => {
    setToasts(t => t.filter(x => x.id !== id));
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  async function fetchConfig() {
    try {
      setLoading(true);
      const res = await fetch('/api/floating-buttons');
      const data = await res.json();
      if (data.success && data.data) {
        setIsEnabled(data.data.isEnabled !== undefined ? data.data.isEnabled : true);
        setPosition(data.data.position || 'right');
        setBottomOffset(Number(data.data.bottomOffset) || 24);
        setSideOffset(Number(data.data.sideOffset) || 20);
        setButtonSize(Number(data.data.buttonSize) || 44);
        setShowTooltips(data.data.showTooltips !== undefined ? data.data.showTooltips : true);
        if (Array.isArray(data.data.buttons) && data.data.buttons.length > 0) {
          setButtons(data.data.buttons);
        }
      }
    } catch (err) {
      addToast('Failed to load settings: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      const payload = {
        isEnabled,
        position,
        bottomOffset: Number(bottomOffset),
        sideOffset: Number(sideOffset),
        buttonSize: Number(buttonSize),
        showTooltips,
        buttons
      };

      const res = await fetch('/api/floating-buttons', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');

      addToast('Floating buttons updated successfully!');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  }

  function handleResetDefaults() {
    if (confirm('Reset all floating action buttons and layout back to default settings?')) {
      setIsEnabled(true);
      setPosition('right');
      setBottomOffset(24);
      setSideOffset(20);
      setButtonSize(44);
      setShowTooltips(true);
      setButtons(DEFAULT_BUTTONS);
      addToast('Reset to defaults. Remember to click "Save Changes".', 'warning');
    }
  }

  // Toggle button active state
  function toggleButtonStatus(id) {
    setButtons(prev =>
      prev.map(btn => (btn.id === id ? { ...btn, isEnabled: !btn.isEnabled } : btn))
    );
  }

  // Reordering
  function moveButton(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= buttons.length) return;

    const newButtons = [...buttons];
    const temp = newButtons[index];
    newButtons[index] = newButtons[targetIndex];
    newButtons[targetIndex] = temp;

    // Re-assign sort indices
    newButtons.forEach((b, idx) => {
      b.sort = idx + 1;
    });

    setButtons(newButtons);
  }

  // Open modal to edit existing
  function openEdit(btn) {
    setEditingBtn({ ...btn });
    setIsNewBtn(false);
    setEditModalOpen(true);
  }

  // Open modal to create new
  function openCreate() {
    const newId = 'btn_' + Date.now();
    setEditingBtn({
      id: newId,
      type: 'custom',
      label: 'Custom Action',
      tooltip: 'Contact Us',
      value: 'https://',
      customMessage: '',
      color: '#2563eb',
      hoverColor: '#1d4ed8',
      icon: 'link',
      isEnabled: true,
      openInNewTab: true,
      sort: buttons.length + 1
    });
    setIsNewBtn(true);
    setEditModalOpen(true);
  }

  // Save from modal
  function handleModalSave(e) {
    e.preventDefault();
    if (!editingBtn.label?.trim()) {
      addToast('Please provide a label', 'error');
      return;
    }

    if (isNewBtn) {
      setButtons(prev => [...prev, editingBtn]);
      addToast('Button added.');
    } else {
      setButtons(prev => prev.map(b => (b.id === editingBtn.id ? editingBtn : b)));
      addToast('Button updated.');
    }
    setEditModalOpen(false);
  }

  // Delete button
  function handleDeleteButton(id) {
    if (confirm('Delete this button?')) {
      setButtons(prev => prev.filter(b => b.id !== id));
      addToast('Button removed.');
    }
  }

  // Active buttons in preview
  const activeButtons = buttons.filter(b => b.isEnabled);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-screen text-foreground">
      <Toast toasts={toasts} onRemove={removeToast} />

      {/* Breadcrumb Header */}
      <Breadcrumb
        title="Floating Action Buttons Management"
        subtitle="Manage quick contact buttons (Call, WhatsApp, LinkedIn, Scroll to Top) and custom actions displayed across all website pages."
        crumbs={[{ label: 'Home Management' }, { label: 'Floating Buttons' }]}
        rightElement={
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleResetDefaults}
              className="text-xs border-border/40 hover:bg-white/5"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Defaults
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs shadow-lg shadow-[#22c55e]/20"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 mr-1.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        }
      />

      {/* Master Enable/Disable Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-card to-card/60 border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-muted text-muted-foreground'}`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base">Global Floating Widget Status</span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {isEnabled ? 'ACTIVE ON WEBSITE' : 'DISABLED'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Turn off if you want to temporarily hide the entire floating contact button stack from visitors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-muted-foreground">
            {isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Configuration & Button List (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">

          {/* Placement & Appearance Card */}
          <Card className="border border-border/80 bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <CardTitle className="text-base font-semibold">Position & Visual Layout</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 pt-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Screen Side Alignment */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Screen Alignment</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPosition('left')}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        position === 'left'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-muted/30 border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Bottom Left
                    </button>
                    <button
                      type="button"
                      onClick={() => setPosition('right')}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                        position === 'right'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                          : 'bg-muted/30 border-border text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Bottom Right (Default)
                    </button>
                  </div>
                </div>

                {/* Button Size */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-foreground">Button Diameter</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { size: 38, label: 'Small (38px)' },
                      { size: 44, label: 'Standard (44px)' },
                      { size: 50, label: 'Large (50px)' },
                    ].map(item => (
                      <button
                        key={item.size}
                        type="button"
                        onClick={() => setButtonSize(item.size)}
                        className={`px-2 py-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                          buttonSize === item.size
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                            : 'bg-muted/30 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Offset */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-foreground">Bottom Offset</label>
                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{bottomOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="2"
                    value={bottomOffset}
                    onChange={e => setBottomOffset(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Side Offset */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-foreground">Side Offset</label>
                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{sideOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="2"
                    value={sideOffset}
                    onChange={e => setSideOffset(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Show Tooltips Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div>
                  <span className="text-xs font-semibold text-foreground">Hover Tooltips</span>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Show descriptive tooltip labels when hovering over buttons</p>
                </div>
                <Switch checked={showTooltips} onCheckedChange={setShowTooltips} />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons Management List */}
          <Card className="border border-border/80 bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="p-5 sm:p-6 pb-4 border-b border-border/40 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Active Buttons & Order</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">Reorder buttons or edit individual destinations, icons, and styling.</p>
              </div>
              <Button
                type="button"
                onClick={openCreate}
                size="sm"
                className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs px-3 py-1.5 rounded-lg"
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add Button
              </Button>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 space-y-4">
              {buttons.map((btn, index) => {
                const IconComp = getIconComponent(btn.icon);
                return (
                  <div
                    key={btn.id}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all shadow-sm ${
                      btn.isEnabled
                        ? 'bg-card/90 border-border/80 hover:border-emerald-500/30 hover:shadow-md'
                        : 'bg-muted/10 border-border/30 opacity-50'
                    }`}
                  >
                    {/* Left: Drag Handle, Icon Swatch, Labels */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Sort arrows */}
                      <div className="flex flex-col gap-1 pr-1 border-r border-border/40">
                        <button
                          type="button"
                          onClick={() => moveButton(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveButton(index, 1)}
                          disabled={index === buttons.length - 1}
                          className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-20 transition-colors"
                          title="Move Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Icon preview in its custom color */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white shadow-lg transition-transform hover:scale-105"
                        style={{ backgroundColor: btn.color }}
                      >
                        <IconComp size={20} />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold text-sm text-foreground truncate">{btn.label}</span>
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-semibold">
                            {btn.type}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-[320px]">
                          {btn.type === 'call' && `Tel: ${btn.value || 'Not configured'}`}
                          {btn.type === 'whatsapp' && `WhatsApp: ${btn.value || 'Not configured'}`}
                          {btn.type === 'linkedin' && `${btn.value || 'Not configured'}`}
                          {btn.type === 'scroll_top' && `Scrolls past ${btn.value || 250}px`}
                          {btn.type === 'custom' && (btn.value || 'Custom Link')}
                        </p>
                      </div>
                    </div>

                    {/* Right: Toggle Switch & Actions */}
                    <div className="flex items-center gap-3 shrink-0 pl-3">
                      <Switch
                        checked={btn.isEnabled}
                        onCheckedChange={() => toggleButtonStatus(btn.id)}
                        title={btn.isEnabled ? 'Deactivate Button' : 'Activate Button'}
                      />
                      <button
                        type="button"
                        onClick={() => openEdit(btn)}
                        className="p-2.5 rounded-xl bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit Button Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {btn.type === 'custom' && (
                        <button
                          type="button"
                          onClick={() => handleDeleteButton(btn.id)}
                          className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Button"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Website Mockup Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
          <Card className="border border-border/80 bg-card overflow-hidden shadow-lg">
            <CardHeader className="pb-3 border-b border-border/40 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <CardTitle className="text-sm font-semibold">Live Interactive Preview</CardTitle>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded">
                {position.toUpperCase()} • {activeButtons.length} ACTIVE
              </span>
            </CardHeader>

            <CardContent className="p-4">
              {/* Mock Device Container */}
              <div className="relative w-full h-[480px] rounded-2xl bg-[#090d16] border-2 border-border/60 overflow-hidden flex flex-col shadow-2xl">
                
                {/* Mock Browser Header */}
                <div className="h-9 bg-[#111827] border-b border-border/40 px-3 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <div className="text-[10px] text-muted-foreground font-mono bg-black/40 px-3 py-1 rounded-md border border-white/5 truncate max-w-[160px]">
                    thewebtycoons.com
                  </div>
                  <div className="w-8" />
                </div>

                {/* Mock Website Page Content */}
                <div className="relative flex-1 p-5 overflow-hidden flex flex-col justify-between select-none">
                  {/* Mock Hero Header */}
                  <div className="space-y-3 pt-4">
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-semibold">
                      Enterprise Digital Agency
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-5 w-4/5 bg-slate-700/60 rounded" />
                      <div className="h-5 w-3/5 bg-slate-700/40 rounded" />
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="h-2 w-full bg-slate-800 rounded" />
                      <div className="h-2 w-5/6 bg-slate-800 rounded" />
                      <div className="h-2 w-4/6 bg-slate-800 rounded" />
                    </div>
                  </div>

                  {/* Mock Content Cards */}
                  <div className="grid grid-cols-2 gap-2 opacity-50">
                    <div className="h-16 rounded-lg bg-slate-800/40 border border-slate-700/30 p-2" />
                    <div className="h-16 rounded-lg bg-slate-800/40 border border-slate-700/30 p-2" />
                  </div>

                  {/* LIVE FLOATING BUTTONS STACK ON MOCKUP */}
                  {isEnabled && activeButtons.length > 0 && (
                    <div
                      className="absolute flex flex-col items-center gap-2.5 pointer-events-auto"
                      style={{
                        bottom: `${bottomOffset}px`,
                        [position]: `${sideOffset}px`,
                        zIndex: 30
                      }}
                    >
                      {activeButtons.map(btn => {
                        const IconComponent = getIconComponent(btn.icon);
                        const isHovered = hoveredPreviewBtn === btn.id;
                        return (
                          <div
                            key={btn.id}
                            className="relative flex items-center justify-center cursor-pointer transition-transform duration-200"
                            style={{
                              transform: isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
                            }}
                            onMouseEnter={() => setHoveredPreviewBtn(btn.id)}
                            onMouseLeave={() => setHoveredPreviewBtn(null)}
                          >
                            {/* Hover Tooltip */}
                            {showTooltips && isHovered && (
                              <div
                                className="absolute bg-gray-900/95 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-xl whitespace-nowrap pointer-events-none z-50 border border-white/10"
                                style={{
                                  [position === 'right' ? 'right' : 'left']: 'calc(100% + 8px)',
                                  top: '50%',
                                  transform: 'translateY(-50%)'
                                }}
                              >
                                {btn.tooltip || btn.label}
                              </div>
                            )}

                            {/* Circle Button */}
                            <div
                              className="rounded-full flex items-center justify-center text-white shadow-xl transition-colors duration-150"
                              style={{
                                width: `${buttonSize}px`,
                                height: `${buttonSize}px`,
                                backgroundColor: isHovered ? (btn.hoverColor || btn.color) : btn.color
                              }}
                            >
                              <IconComponent size={Math.round(buttonSize * 0.42)} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!isEnabled && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                      <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-2">
                        <Eye className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-sm">Widget is Currently Disabled</span>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                        Switch the master toggle above to enable floating contact buttons.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Footer note */}
              <div className="flex items-center gap-2 mt-3 text-[11px] text-muted-foreground">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Hover over the buttons in the preview to test tooltips and interaction animations.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit / Add Button Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-[#0d131f] border border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-white">
              {isNewBtn ? 'Add New Floating Button' : `Edit: ${editingBtn?.label}`}
            </DialogTitle>
          </DialogHeader>

          {editingBtn && (
            <form onSubmit={handleModalSave} className="space-y-4 pt-2">
              {/* Button Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Action Type</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'call', label: 'Phone Call', icon: FaPhone },
                    { id: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp },
                    { id: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn },
                    { id: 'scroll_top', label: 'Scroll Top', icon: FaArrowUp },
                    { id: 'custom', label: 'Custom Link', icon: FaLink },
                  ].map(t => {
                    const TIcon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          const matchingIcon = t.id === 'scroll_top' ? 'arrow_up' : t.id === 'call' ? 'phone' : t.id === 'custom' ? 'link' : t.id;
                          setEditingBtn(prev => ({
                            ...prev,
                            type: t.id,
                            icon: matchingIcon,
                            label: t.id === 'call' ? 'Call Us' : t.id === 'whatsapp' ? 'WhatsApp' : t.id === 'linkedin' ? 'LinkedIn' : t.id === 'scroll_top' ? 'Scroll to Top' : prev.label
                          }));
                        }}
                        className={`p-2.5 rounded-lg border text-xs flex flex-col items-center gap-1 transition-all ${
                          editingBtn.type === t.id
                            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-400 font-semibold'
                            : 'bg-muted/20 border-border/40 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <TIcon className="w-4 h-4" />
                        <span className="text-[11px] truncate">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Label & Tooltip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">Button Label (Admin name)</label>
                  <input
                    type="text"
                    required
                    value={editingBtn.label || ''}
                    onChange={e => setEditingBtn({ ...editingBtn, label: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-border/60 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Call Us"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">Hover Tooltip Text</label>
                  <input
                    type="text"
                    value={editingBtn.tooltip || ''}
                    onChange={e => setEditingBtn({ ...editingBtn, tooltip: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-border/60 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Chat with us on WhatsApp"
                  />
                </div>
              </div>

              {/* Value Input (Phone / URL / Threshold) */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-300">
                  {editingBtn.type === 'call' && 'Phone Number (with Country Code)'}
                  {editingBtn.type === 'whatsapp' && 'WhatsApp Number (with Country Code)'}
                  {editingBtn.type === 'linkedin' && 'LinkedIn Profile or Company URL'}
                  {editingBtn.type === 'scroll_top' && 'Scroll Visibility Trigger (in pixels)'}
                  {editingBtn.type === 'custom' && 'Link Destination URL (http://, mailto:, etc.)'}
                </label>
                <input
                  type="text"
                  value={editingBtn.value || ''}
                  onChange={e => setEditingBtn({ ...editingBtn, value: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-border/60 text-white focus:outline-none focus:border-emerald-500"
                  placeholder={
                    editingBtn.type === 'call' || editingBtn.type === 'whatsapp'
                      ? '+91 8527458950'
                      : editingBtn.type === 'scroll_top'
                      ? '250'
                      : 'https://...'
                  }
                />
              </div>

              {/* WhatsApp Pre-filled message */}
              {editingBtn.type === 'whatsapp' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-300">WhatsApp Pre-filled Greeting Message (Optional)</label>
                  <textarea
                    rows={2}
                    value={editingBtn.customMessage || ''}
                    onChange={e => setEditingBtn({ ...editingBtn, customMessage: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-border/60 text-white focus:outline-none focus:border-emerald-500"
                    placeholder="Hello WebTycoons, I would like to enquire about your services."
                  />
                  <p className="text-[10px] text-muted-foreground">
                    When visitors tap this button, their WhatsApp app will open with this message automatically typed.
                  </p>
                </div>
              )}

              {/* Icon Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Icon Symbol</label>
                <div className="grid grid-cols-6 gap-2">
                  {AVAILABLE_ICONS.map(ic => {
                    const IconComp = ic.Icon;
                    return (
                      <button
                        key={ic.id}
                        type="button"
                        onClick={() => setEditingBtn({ ...editingBtn, icon: ic.id })}
                        className={`p-2 rounded-lg border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          editingBtn.icon?.toLowerCase() === ic.id
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            : 'bg-black/30 border-border/40 text-muted-foreground hover:text-foreground'
                        }`}
                        title={ic.label}
                      >
                        <IconComp size={16} />
                        <span className="text-[9px] truncate w-full">{ic.label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches & Custom Pickers */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300">Color Palette</label>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PRESETS.map(preset => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setEditingBtn({ ...editingBtn, color: preset.color, hoverColor: preset.hover })}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs text-white transition-transform hover:scale-105"
                      style={{
                        backgroundColor: preset.color,
                        borderColor: editingBtn.color === preset.color ? '#ffffff' : 'transparent',
                        outline: editingBtn.color === preset.color ? '2px solid #22c55e' : 'none'
                      }}
                    >
                      <span className="text-[10px] font-medium drop-shadow">{preset.name}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <span className="text-[11px] text-muted-foreground">Custom Color</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingBtn.color || '#2563eb'}
                        onChange={e => setEditingBtn({ ...editingBtn, color: e.target.value })}
                        className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={editingBtn.color || ''}
                        onChange={e => setEditingBtn({ ...editingBtn, color: e.target.value })}
                        className="w-full px-2 py-1 text-xs rounded bg-black/40 border border-border/60 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-muted-foreground">Hover Color</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={editingBtn.hoverColor || '#1d4ed8'}
                        onChange={e => setEditingBtn({ ...editingBtn, hoverColor: e.target.value })}
                        className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={editingBtn.hoverColor || ''}
                        onChange={e => setEditingBtn({ ...editingBtn, hoverColor: e.target.value })}
                        className="w-full px-2 py-1 text-xs rounded bg-black/40 border border-border/60 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <span className="text-xs font-medium text-gray-300">Open in New Browser Tab</span>
                <Switch
                  checked={editingBtn.openInNewTab !== false}
                  onCheckedChange={val => setEditingBtn({ ...editingBtn, openInNewTab: val })}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-gray-300">Active Status</span>
                <Switch
                  checked={editingBtn.isEnabled !== false}
                  onCheckedChange={val => setEditingBtn({ ...editingBtn, isEnabled: val })}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-2 pt-4 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold"
                >
                  Save Button
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
