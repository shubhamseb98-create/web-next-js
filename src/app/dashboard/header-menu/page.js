"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../components/dashboard/Breadcrumb";
import Toast from "../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Switch } from "../../../components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { FloatingInput } from "../../../components/ui/floating-input";
import {
  Menu,
  Plus,
  Trash2,
  Edit2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  Eye,
  EyeOff,
  Link as LinkIcon,
  MessageSquare,
  ChevronRight,
  Sliders,
  Settings2,
  ArrowUpDown,
  Loader2,
  Check
} from "lucide-react";

export default function HeaderManagementPage() {
  const [items, setItems] = useState([]);
  const [config, setConfig] = useState({
    ctaButtonText: "Let's Talk",
    ctaButtonAction: "modal",
    ctaButtonLink: "/contact",
    showCtaButton: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Modal states
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Form states
  const [editingItem, setEditingItem] = useState(null);
  const [tabForm, setTabForm] = useState({
    name: "",
    path: "",
    order: 0,
    isActive: true,
    hasDropdown: false,
    openInNewTab: false,
    isSpecialCta: false,
    ctaAction: "link",
    subItems: [],
  });

  // Sub-item inline form
  const [newSubLabel, setNewSubLabel] = useState("");
  const [newSubPath, setNewSubPath] = useState("");

  // Submenu expanded accordions in table
  const [expandedRows, setExpandedRows] = useState({});

  const addToast = (msg, type = "success") =>
    setToasts((t) => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetchHeaderMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchHeaderMenu() {
    try {
      setLoading(true);
      const res = await fetch("/api/header-menu");
      const json = await res.json();
      if (json.success) {
        setItems(json.data || []);
        if (json.config) setConfig(json.config);
      } else {
        addToast(json.message || "Failed to load header menu", "error");
      }
    } catch (err) {
      addToast(err.message || "Network error loading header menu", "error");
    } finally {
      setLoading(false);
    }
  }

  // Open Tab modal for creation
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setTabForm({
      name: "",
      path: "/",
      order: items.length + 1,
      isActive: true,
      hasDropdown: false,
      openInNewTab: false,
      isSpecialCta: false,
      ctaAction: "link",
      subItems: [],
    });
    setNewSubLabel("");
    setNewSubPath("");
    setIsTabModalOpen(true);
  };

  // Open Tab modal for edit
  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setTabForm({
      name: item.name,
      path: item.path,
      order: item.order || 0,
      isActive: item.isActive !== false,
      hasDropdown: Boolean(item.hasDropdown),
      openInNewTab: Boolean(item.openInNewTab),
      isSpecialCta: Boolean(item.isSpecialCta),
      ctaAction: item.ctaAction || "link",
      subItems: Array.isArray(item.subItems) ? [...item.subItems] : [],
    });
    setNewSubLabel("");
    setNewSubPath("");
    setIsTabModalOpen(true);
  };

  // Save Tab (Create or Update)
  const handleSaveTab = async (e) => {
    e?.preventDefault?.();
    if (!tabForm.name.trim()) {
      addToast("Please enter a tab title/name", "error");
      return;
    }
    if (!tabForm.path.trim()) {
      addToast("Please enter a target path/URL", "error");
      return;
    }

    try {
      setSaving(true);
      let res;
      if (editingItem && editingItem._id) {
        res = await fetch(`/api/header-menu/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tabForm),
        });
      } else {
        res = await fetch("/api/header-menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tabForm),
        });
      }

      const json = await res.json();
      if (json.success) {
        addToast(
          editingItem ? "Tab updated successfully" : "New tab created successfully",
          "success"
        );
        setIsTabModalOpen(false);
        await fetchHeaderMenu();
      } else {
        addToast(json.message || "Failed to save tab", "error");
      }
    } catch (err) {
      addToast(err.message || "Error saving tab", "error");
    } finally {
      setSaving(false);
    }
  };

  // Quick toggle active status
  const handleToggleActive = async (item) => {
    const updatedStatus = !item.isActive;
    const newItems = items.map((it) =>
      it._id === item._id ? { ...it, isActive: updatedStatus } : it
    );
    setItems(newItems);

    try {
      const res = await fetch(`/api/header-menu/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updatedStatus }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Tab '${item.name}' is now ${updatedStatus ? "Active" : "Hidden"}`, "success");
      } else {
        addToast(json.message || "Failed to update status", "error");
        fetchHeaderMenu();
      }
    } catch (err) {
      addToast("Network error updating status", "error");
      fetchHeaderMenu();
    }
  };

  // Quick toggle active status for a specific sub-item (e.g. within Services)
  const handleToggleSubItemActive = async (parentTab, subIndex) => {
    const updatedSubItems = (parentTab.subItems || []).map((sub, idx) =>
      idx === subIndex ? { ...sub, isActive: sub.isActive === false ? true : false } : sub
    );
    const updatedStatus = updatedSubItems[subIndex].isActive;
    const subLabel = updatedSubItems[subIndex].label;

    // Optimistic UI update
    const newItems = items.map((it) =>
      it._id === parentTab._id ? { ...it, subItems: updatedSubItems } : it
    );
    setItems(newItems);

    try {
      const res = await fetch(`/api/header-menu/${parentTab._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subItems: updatedSubItems }),
      });
      const json = await res.json();
      if (json.success) {
        addToast(`Sub-tab '${subLabel}' is now ${updatedStatus ? "ON (Active)" : "OFF (Hidden)"}`, "success");
      } else {
        addToast(json.message || "Failed to update sub-item status", "error");
        fetchHeaderMenu();
      }
    } catch (err) {
      addToast("Network error updating sub-item status", "error");
      fetchHeaderMenu();
    }
  };

  // Move Tab Up / Down
  const handleMove = async (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    try {
      const res = await fetch("/api/header-menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", items: newItems }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("Navigation order updated", "success");
      } else {
        addToast(json.message || "Failed to save order", "error");
        fetchHeaderMenu();
      }
    } catch (err) {
      addToast("Network error reordering tabs", "error");
      fetchHeaderMenu();
    }
  };

  // Delete Tab
  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    try {
      setSaving(true);
      const res = await fetch(`/api/header-menu/${itemToDelete._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        addToast("Tab deleted successfully", "success");
        setIsDeleteConfirmOpen(false);
        setItemToDelete(null);
        await fetchHeaderMenu();
      } else {
        addToast(json.message || "Failed to delete tab", "error");
      }
    } catch (err) {
      addToast(err.message || "Error deleting tab", "error");
    } finally {
      setSaving(false);
    }
  };

  // Reset to default menu tabs
  const handleResetToDefaults = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/header-menu/reset", {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) {
        addToast("Header menu reset to standard defaults!", "success");
        setIsResetConfirmOpen(false);
        await fetchHeaderMenu();
      } else {
        addToast(json.message || "Failed to reset menu", "error");
      }
    } catch (err) {
      addToast(err.message || "Error resetting menu", "error");
    } finally {
      setSaving(false);
    }
  };

  // Save CTA Configuration
  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/header-menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-config",
          config: config,
        }),
      });
      const json = await res.json();
      if (json.success) {
        addToast("CTA button settings updated successfully", "success");
        setIsConfigModalOpen(false);
      } else {
        addToast(json.message || "Failed to update CTA settings", "error");
      }
    } catch (err) {
      addToast(err.message || "Error updating CTA settings", "error");
    } finally {
      setSaving(false);
    }
  };

  // Sub-items management in tabForm modal
  const handleAddSubItem = () => {
    if (!newSubLabel.trim() || !newSubPath.trim()) {
      addToast("Enter both sub-item label and URL path", "error");
      return;
    }
    const newSub = {
      label: newSubLabel.trim(),
      path: newSubPath.trim(),
      order: (tabForm.subItems?.length || 0) + 1,
      isActive: true,
      openInNewTab: false,
    };
    setTabForm({
      ...tabForm,
      subItems: [...(tabForm.subItems || []), newSub],
    });
    setNewSubLabel("");
    setNewSubPath("");
  };

  const handleRemoveSubItem = (idx) => {
    const updated = tabForm.subItems.filter((_, i) => i !== idx);
    setTabForm({ ...tabForm, subItems: updated });
  };

  // Toggle row accordion
  const toggleRowAccordion = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeItemsCount = items.filter((it) => it.isActive).length;
  const dropdownItemsCount = items.filter((it) => it.hasDropdown && it.isActive).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto min-h-screen">
      {/* Toast Notification Renderer */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast message={t.message} type={t.type} />
          </div>
        ))}
      </div>

      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Global Settings", href: "/dashboard/settings" },
              { label: "Header Management", active: true },
            ]}
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3 mt-1">
            <div className="w-9 h-9 rounded-xl bg-[#52a436]/15 border border-[#52a436]/30 flex items-center justify-center text-[#52a436]">
              <Menu className="w-5 h-5" />
            </div>
            Header Navigation Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Easily manage, reorder, show/hide, or add new tabs and dropdown sub-menus on your website&apos;s header.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            onClick={() => setIsResetConfirmOpen(true)}
            className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm h-9 px-3 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            Reset Defaults
          </Button>

          <Button
            variant="outline"
            onClick={() => setIsConfigModalOpen(true)}
            className="border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs sm:text-sm h-9 px-3 gap-1.5"
          >
            <Settings2 className="w-4 h-4 text-[#52a436]" />
            CTA Button Settings
          </Button>

          <Button
            onClick={handleOpenCreateModal}
            className="bg-[#52a436] hover:bg-[#438a2c] text-white text-xs sm:text-sm font-semibold h-9 px-4 gap-1.5 shadow-lg shadow-[#52a436]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Navigation Tab
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Menu className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{items.length}</div>
            <div className="text-xs text-slate-400">Total Tabs</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#52a436]/10 border border-[#52a436]/20 flex items-center justify-center text-[#52a436]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{activeItemsCount}</div>
            <div className="text-xs text-slate-400">Active on Website</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{dropdownItemsCount}</div>
            <div className="text-xs text-slate-400">Dropdown Menus</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              {config.showCtaButton ? config.ctaButtonText : "Hidden"}
            </div>
            <div className="text-xs text-slate-400">Header CTA Button</div>
          </div>
        </div>
      </div>

      {/* Live Header Preview Bar */}
      <Card className="bg-slate-900/90 border-slate-800/90 overflow-hidden shadow-xl shadow-black/40">
        <CardHeader className="py-3 px-5 border-b border-slate-800/80 bg-slate-950/60 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-[#52a436]" />
            Live Website Header Preview
          </CardTitle>
          <span className="text-[11px] text-slate-500 font-mono">
            {activeItemsCount} tab{activeItemsCount !== 1 ? "s" : ""} visible
          </span>
        </CardHeader>
        <CardContent className="p-4 sm:p-5 bg-gradient-to-b from-[#0e140e] to-[#080d08]">
          <div className="rounded-xl border border-white/10 bg-black/60 backdrop-blur-md p-3 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto">
            {/* Logo Preview */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-[#52a436] font-bold text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                <span className="text-white">web</span> tycoons
              </span>
            </div>

            {/* Nav Tabs Preview */}
            <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-1">
              {items
                .filter((item) => item.isActive)
                .map((tab) => (
                  <div
                    key={tab._id || tab.name}
                    className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-200 hover:text-[#52a436] px-2.5 py-1 rounded-md transition-colors whitespace-nowrap bg-white/[0.02]"
                  >
                    <span>{tab.name}</span>
                    {tab.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-slate-400 opacity-75" />
                    )}
                  </div>
                ))}
            </div>

            {/* CTA Button Preview */}
            {config.showCtaButton && (
              <div className="flex-shrink-0">
                <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/15 flex items-center gap-1.5">
                  {config.ctaButtonText}
                  {config.ctaButtonAction === "modal" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52a436]" />
                  )}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs List & Table */}
      <Card className="bg-slate-900/90 border-slate-800 shadow-xl shadow-black/40 overflow-hidden">
        <CardHeader className="py-4 px-5 sm:px-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-[#52a436]" />
              Navigation Tabs & Structure
            </CardTitle>
            <p className="text-xs text-slate-400 mt-0.5">
              Drag or use arrows to change tab sequence. Toggle switches to show or hide items on the site instantly.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono bg-slate-800/80 px-2.5 py-1 rounded-md self-start sm:self-auto">
            {items.length} Registered Tabs
          </span>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <Loader2 className="w-8 h-8 text-[#52a436] animate-spin mb-3" />
              <p className="text-sm text-slate-400">Loading header navigation tabs...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-center p-6">
              <Menu className="w-12 h-12 text-slate-600 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">No Navigation Tabs Found</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-4">
                You can create a custom tab from scratch or restore the standard default navigation.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={handleResetToDefaults}
                  variant="outline"
                  className="border-slate-700 bg-slate-800 text-slate-200 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5 text-amber-400" />
                  Restore Defaults
                </Button>
                <Button
                  onClick={handleOpenCreateModal}
                  className="bg-[#52a436] hover:bg-[#438a2c] text-white"
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Tab
                </Button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {items.map((tab, index) => {
                const isExpanded = Boolean(expandedRows[tab._id]);
                const subItemsCount = Array.isArray(tab.subItems) ? tab.subItems.length : 0;

                return (
                  <div key={tab._id || index} className="transition-colors hover:bg-slate-800/30">
                    {/* Main Row */}
                    <div className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* Left: Reorder & Name */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Up/Down buttons */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMove(index, -1)}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-25 hover:bg-slate-800 rounded transition-colors"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={index === items.length - 1}
                            onClick={() => handleMove(index, 1)}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-25 hover:bg-slate-800 rounded transition-colors"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Order Badge */}
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-[11px] font-mono font-semibold text-slate-300 flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>

                        {/* Title & Path */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm sm:text-base font-semibold text-white truncate">
                              {tab.name}
                            </span>

                            {tab.hasDropdown && (
                              <button
                                type="button"
                                onClick={() => toggleRowAccordion(tab._id)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 hover:bg-purple-500/25 transition-colors"
                              >
                                <Layers className="w-3 h-3" />
                                <span>{subItemsCount} Sub-items</span>
                                <ChevronRight
                                  className={`w-3 h-3 transition-transform duration-200 ${
                                    isExpanded ? "rotate-90" : ""
                                  }`}
                                />
                              </button>
                            )}

                            {tab.openInNewTab && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <ExternalLink className="w-2.5 h-2.5" />
                                New Tab
                              </span>
                            )}

                            {tab.isSpecialCta && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                <MessageSquare className="w-2.5 h-2.5" />
                                Opens Modal
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-1.5 truncate">
                            <LinkIcon className="w-3 h-3 text-slate-500 flex-shrink-0" />
                            <span className="truncate">{tab.path}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Toggle Status & Actions */}
                      <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                        {/* Visibility Switch */}
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={tab.isActive !== false}
                            onCheckedChange={() => handleToggleActive(tab)}
                            aria-label={`Toggle ${tab.name} visibility`}
                          />
                          <span className="text-xs text-slate-400 w-12 text-left">
                            {tab.isActive !== false ? (
                              <span className="text-[#52a436] font-medium flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Active
                              </span>
                            ) : (
                              <span className="text-slate-500 flex items-center gap-1">
                                <EyeOff className="w-3 h-3" /> Hidden
                              </span>
                            )}
                          </span>
                        </div>

                        {/* Edit Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEditModal(tab)}
                          className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 w-8 p-0"
                          title="Edit Tab"
                        >
                          <Edit2 className="w-4 h-4 text-blue-400" />
                        </Button>

                        {/* Delete Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setItemToDelete(tab);
                            setIsDeleteConfirmOpen(true);
                          }}
                          className="text-slate-300 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                          title="Delete Tab"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                      </div>
                    </div>

                    {/* Submenu Accordion Details */}
                    {tab.hasDropdown && isExpanded && (
                      <div className="bg-slate-950/60 border-t border-slate-800/80 p-4 sm:pl-16 sm:pr-6 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-purple-400" />
                              Dropdown Tabs for &ldquo;{tab.name}&rdquo;
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                              {(tab.subItems || []).filter(s => s.isActive !== false).length} of {subItemsCount} Active
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEditModal(tab)}
                            className="text-xs text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 h-7 px-2"
                          >
                            + Manage Sub-items
                          </Button>
                        </div>

                        {subItemsCount === 0 ? (
                          <p className="text-xs text-slate-500 italic py-2">
                            No dropdown links added yet. Click &ldquo;Manage Sub-items&rdquo; to add links.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {tab.subItems.map((sub, sIdx) => {
                              const isSubActive = sub.isActive !== false;
                              return (
                                <div
                                  key={sub._id || sIdx}
                                  className={`p-3 rounded-lg border flex items-center justify-between gap-3 transition-all ${
                                    isSubActive
                                      ? "bg-slate-900/90 border-slate-700/80 shadow-sm"
                                      : "bg-slate-950/40 border-slate-800/40 opacity-60"
                                  }`}
                                >
                                  <div className="min-w-0 flex items-center gap-2.5">
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 flex-shrink-0">
                                      #{sIdx + 1}
                                    </span>
                                    <div className="min-w-0">
                                      <div className={`text-xs font-semibold truncate flex items-center gap-1.5 ${
                                        isSubActive ? "text-slate-100" : "text-slate-400 line-through"
                                      }`}>
                                        {sub.label}
                                        {!isSubActive && (
                                          <span className="text-[10px] text-slate-500 font-normal no-underline">(Hidden)</span>
                                        )}
                                      </div>
                                      <div className="text-[11px] text-slate-500 font-mono truncate">
                                        {sub.path}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Direct ON / OFF Switch for sub-item */}
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    <Switch
                                      checked={isSubActive}
                                      onCheckedChange={() => handleToggleSubItemActive(tab, sIdx)}
                                      aria-label={`Toggle ${sub.label} visibility`}
                                    />
                                    <span className="text-[11px] font-semibold w-8 text-left">
                                      {isSubActive ? (
                                        <span className="text-[#52a436]">ON</span>
                                      ) : (
                                        <span className="text-slate-500">OFF</span>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ──────────────────────────────────────────────────
          MODAL: ADD / EDIT NAVIGATION TAB (Spacious & Open)
      ────────────────────────────────────────────────── */}
      <Dialog open={isTabModalOpen} onOpenChange={setIsTabModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d120d] border border-white/10 text-white rounded-2xl shadow-2xl p-6 sm:p-8 [scrollbar-width:thin] [scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-700/80 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <DialogHeader style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {editingItem ? "Edit Navigation Tab" : "Add Navigation Tab"}
            </DialogTitle>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
              {editingItem ? "Modify existing navigation tab and sub-menu details" : "Configure new navigation tab route and behavior"}
            </p>
          </DialogHeader>

          <form onSubmit={handleSaveTab} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tab Name / Title */}
              <FloatingInput
                label="Tab Name / Title *"
                value={tabForm.name}
                onChange={(e) => setTabForm({ ...tabForm, name: e.target.value })}
                required
              />

              {/* Target URL Path */}
              <div>
                <FloatingInput
                  label="Target URL Path *"
                  value={tabForm.path}
                  onChange={(e) => setTabForm({ ...tabForm, path: e.target.value })}
                  rightElement={<LinkIcon className="w-4 h-4 text-slate-500" />}
                  required
                />
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, marginTop: '6px', paddingLeft: '4px' }}>
                  Internal paths start with <code className="text-slate-300 bg-white/5 px-1.5 py-0.5 rounded text-[11px] font-mono">/</code> (e.g. <code className="text-slate-300 bg-white/5 px-1.5 py-0.5 rounded text-[11px] font-mono">/services</code>), or external URLs start with <code className="text-slate-300 bg-white/5 px-1.5 py-0.5 rounded text-[11px] font-mono">https://</code>.
                </p>
              </div>

              {/* Selection Options: Open in New Tab & Trigger Contact Modal (Smooth Rounded 12px) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  paddingTop: '4px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setTabForm(f => ({ ...f, openInNewTab: !f.openInNewTab }))}
                  style={{
                    height: '48px',
                    padding: '0 18px',
                    borderRadius: '12px',
                    border: tabForm.openInNewTab ? '1px solid #52a436' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: tabForm.openInNewTab ? 'rgba(82, 164, 54, 0.14)' : 'rgba(0, 0, 0, 0.35)',
                    color: tabForm.openInNewTab ? '#ffffff' : '#cbd5e1',
                    boxShadow: tabForm.openInNewTab ? '0 4px 14px rgba(82, 164, 54, 0.2)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: tabForm.openInNewTab ? '1px solid #52a436' : '1px solid #64748b',
                      backgroundColor: tabForm.openInNewTab ? '#52a436' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tabForm.openInNewTab && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span>Open in New Tab</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTabForm(f => ({
                    ...f,
                    isSpecialCta: !f.isSpecialCta,
                    ctaAction: !f.isSpecialCta ? "modal" : "link"
                  }))}
                  style={{
                    height: '48px',
                    padding: '0 18px',
                    borderRadius: '12px',
                    border: tabForm.isSpecialCta ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    backgroundColor: tabForm.isSpecialCta ? 'rgba(245, 158, 11, 0.14)' : 'rgba(0, 0, 0, 0.35)',
                    color: tabForm.isSpecialCta ? '#ffffff' : '#cbd5e1',
                    boxShadow: tabForm.isSpecialCta ? '0 4px 14px rgba(245, 158, 11, 0.2)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: tabForm.isSpecialCta ? '1px solid #f59e0b' : '1px solid #64748b',
                      backgroundColor: tabForm.isSpecialCta ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tabForm.isSpecialCta && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                  <span>Trigger Contact Modal</span>
                </button>
              </div>

              {/* Dropdown Toggle Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      color: '#c084fc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Has Dropdown Sub-menu</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>Enable child navigation links for this tab (like Services).</div>
                  </div>
                </div>
                <Switch
                  checked={tabForm.hasDropdown}
                  onCheckedChange={(checked) => setTabForm({ ...tabForm, hasDropdown: checked })}
                  aria-label="Has dropdown toggle"
                />
              </div>

              {/* Dropdown Sub-items Manager (Clean Spacing & Distinct 12px Cards) */}
              {tabForm.hasDropdown && (
                <div
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(168, 85, 247, 0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
                  {/* Section Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#d8b4fe',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <Layers className="w-4 h-4 text-purple-400" />
                      SUB-MENU ITEMS ({tabForm.subItems?.length || 0})
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        fontWeight: 500,
                        color: '#94a3b8',
                        padding: '4px 12px',
                        borderRadius: '9999px',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {(tabForm.subItems || []).filter(s => s.isActive !== false).length} of {tabForm.subItems?.length || 0} Active
                    </span>
                  </div>

                  {/* Sub-items list with guaranteed gap and no overlapping */}
                  {tabForm.subItems && tabForm.subItems.length > 0 ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        maxHeight: '260px',
                        overflowY: 'auto',
                        paddingRight: '6px',
                        paddingBottom: '2px',
                      }}
                      className="custom-thin-scrollbar"
                    >
                      {tabForm.subItems.map((sub, sIdx) => {
                        const isSubActive = sub.isActive !== false;
                        return (
                          <div
                            key={sIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '14px',
                              padding: '12px 16px',
                              borderRadius: '12px',
                              backgroundColor: isSubActive ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.2)',
                              border: isSubActive ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
                              opacity: isSubActive ? 1 : 0.6,
                              transition: 'all 0.2s ease',
                              boxShadow: isSubActive ? '0 2px 6px rgba(0, 0, 0, 0.3)' : 'none',
                            }}
                          >
                            <div style={{ minWidth: 0, paddingLeft: '4px' }}>
                              <div
                                style={{
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  color: isSubActive ? '#ffffff' : '#94a3b8',
                                  textDecoration: isSubActive ? 'none' : 'line-through',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {sub.label}
                              </div>
                              <div
                                style={{
                                  fontSize: '11px',
                                  color: '#64748b',
                                  fontFamily: 'monospace',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  marginTop: '2px',
                                }}
                              >
                                {sub.path}
                              </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                              <Switch
                                checked={isSubActive}
                                onCheckedChange={(checked) => {
                                  const updated = tabForm.subItems.map((s, i) =>
                                    i === sIdx ? { ...s, isActive: checked } : s
                                  );
                                  setTabForm({ ...tabForm, subItems: updated });
                                }}
                                aria-label={`Toggle ${sub.label}`}
                              />
                              <span
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 700,
                                  width: '28px',
                                  textAlign: 'left',
                                  color: isSubActive ? '#52a436' : '#64748b',
                                }}
                              >
                                {isSubActive ? 'ON' : 'OFF'}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemoveSubItem(sIdx)}
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '8px',
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  color: '#94a3b8',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
                                  e.currentTarget.style.color = '#ef4444';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = '#94a3b8';
                                }}
                                title="Delete sub-item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontStyle: 'italic',
                        padding: '16px',
                        textAlign: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.25)',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        margin: 0,
                      }}
                    >
                      No sub-items added yet.
                    </p>
                  )}

                  {/* Add Sub-item Form (Clean Spacing, Inputs & Button separated without overlap) */}
                  <div
                    style={{
                      paddingTop: '16px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '12px',
                      }}
                    >
                      <FloatingInput
                        label="Sub-item Label (e.g. E-Commerce)"
                        value={newSubLabel}
                        onChange={(e) => setNewSubLabel(e.target.value)}
                      />
                      <FloatingInput
                        label="Sub-item Path (e.g. /services/ecommerce)"
                        value={newSubPath}
                        onChange={(e) => setNewSubPath(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleAddSubItem}
                      style={{
                        width: '100%',
                        height: '46px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        borderRadius: '12px',
                        backgroundColor: 'rgba(82, 164, 54, 0.16)',
                        border: '1px solid rgba(82, 164, 54, 0.45)',
                        color: '#6bc24b',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.28)';
                        e.currentTarget.style.borderColor = '#52a436';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(82, 164, 54, 0.16)';
                        e.currentTarget.style.borderColor = 'rgba(82, 164, 54, 0.45)';
                        e.currentTarget.style.color = '#6bc24b';
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Sub-item to List</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter
              style={{
                paddingTop: '20px',
                marginTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
              }}
            >
              <button
                type="button"
                onClick={() => setIsTabModalOpen(false)}
                disabled={saving}
                style={{
                  height: '44px',
                  padding: '0 24px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                style={{
                  height: '44px',
                  padding: '0 28px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#52a436',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(82, 164, 54, 0.3)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#438a2c';
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#52a436';
                }}
              >
                {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{editingItem ? "Update Tab" : "Save Tab"}</span>
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ──────────────────────────────────────────────────
          MODAL: CTA BUTTON CONFIGURATION
      ────────────────────────────────────────────────── */}
      <Dialog open={isConfigModalOpen} onOpenChange={setIsConfigModalOpen}>
        <DialogContent className="max-w-md bg-[#0c120c] border border-white/10 text-white rounded-2xl shadow-2xl shadow-black/80 p-6">
          <DialogHeader className="pb-3 border-b border-slate-800">
            <DialogTitle className="text-lg font-bold text-white flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#52a436]/15 border border-[#52a436]/30 text-[#52a436] flex items-center justify-center flex-shrink-0">
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <div>Header CTA Button Settings</div>
                <p className="text-xs font-normal text-slate-400 mt-0.5">
                  Configure top-right call-to-action button behavior.
                </p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
            {/* Show/Hide CTA Toggle Card */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
              <div>
                <div className="text-sm font-semibold text-white">Show CTA Button</div>
                <div className="text-xs text-slate-400">Display button on the right side of header</div>
              </div>
              <Switch
                checked={config.showCtaButton}
                onCheckedChange={(checked) => setConfig({ ...config, showCtaButton: checked })}
                aria-label="Show CTA button toggle"
              />
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Button Text
              </label>
              <input
                type="text"
                placeholder="e.g. Let's Talk, Contact Us, Get Quote"
                value={config.ctaButtonText}
                onChange={(e) => setConfig({ ...config, ctaButtonText: e.target.value })}
                className="w-full h-11 px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#52a436] focus:ring-2 focus:ring-[#52a436]/20 transition-all"
              />
            </div>

            {/* Action Type: Custom Select Box Design with Chevron */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Button Click Action
              </label>
              <div className="relative">
                <select
                  value={config.ctaButtonAction}
                  onChange={(e) => setConfig({ ...config, ctaButtonAction: e.target.value })}
                  className="w-full appearance-none h-11 pl-4 pr-10 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-[#52a436] focus:ring-2 focus:ring-[#52a436]/20 transition-all cursor-pointer"
                >
                  <option value="modal">Open Interactive Contact Modal</option>
                  <option value="link">Navigate to Custom URL / Page</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Custom Link if action is link */}
            {config.ctaButtonAction === "link" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Target URL / Path
                </label>
                <input
                  type="text"
                  placeholder="e.g. /contact or https://..."
                  value={config.ctaButtonLink}
                  onChange={(e) => setConfig({ ...config, ctaButtonLink: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:border-[#52a436] focus:ring-2 focus:ring-[#52a436]/20 transition-all"
                />
              </div>
            )}
          </div>

          <DialogFooter className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsConfigModalOpen(false)}
              className="px-5 h-10 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-colors"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveConfig}
              disabled={saving}
              className="px-6 h-10 rounded-xl bg-[#52a436] hover:bg-[#438a2c] text-white text-sm font-semibold shadow-lg shadow-[#52a436]/25 transition-all flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────────────────────────────────────────
          MODAL: CONFIRM RESET TO DEFAULTS
      ────────────────────────────────────────────────── */}
      <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-400" />
              Reset Header to Standard Defaults?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-400">
            This will reset all header tabs to the default 6 links:
            <span className="block mt-2 font-mono text-xs text-slate-300 bg-slate-800/80 p-2.5 rounded-lg">
              1. Home (/)<br />
              2. Brand Story (/about)<br />
              3. Services (/services/static-website-development with 4 sub-items)<br />
              4. Projects (/projects)<br />
              5. Blog (/blog)<br />
              6. Contact Us (/contact)
            </span>
          </p>
          <DialogFooter className="pt-3 border-t border-slate-800 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsResetConfirmOpen(false)}
              className="border-slate-700 bg-slate-800 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResetToDefaults}
              disabled={saving}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Yes, Reset Menu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ──────────────────────────────────────────────────
          MODAL: CONFIRM DELETE TAB
      ────────────────────────────────────────────────── */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="max-w-md bg-slate-900 border-slate-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-400" />
              Delete Navigation Tab?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-400">
            Are you sure you want to delete <strong className="text-white">&ldquo;{itemToDelete?.name}&rdquo;</strong>?
            This tab will immediately be removed from the header navigation.
          </p>
          <DialogFooter className="pt-3 border-t border-slate-800 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="border-slate-700 bg-slate-800 text-slate-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
