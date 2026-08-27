"use client";
import { useState, useEffect } from "react";
import AIAssistantButton from "../../../components/dashboard/AIAssistantButton";
import Breadcrumb from "../../../components/dashboard/Breadcrumb";
import Toast from "../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../components/ui/floating-input";
import { Save, Image as ImageIcon, FileText, Phone, Link2, Share2, Globe, MapPin, Mail, Plus, Trash2, Edit, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Switch } from "../../../components/ui/switch";
import Image from "next/image";

export default function GlobalSettingsCMS() {
  const [data, setData] = useState({
    logoImage: "",
    adminLogo: "",
    favicon: "",
    adminTitle: "",
    footerDescription: "",
    primaryEmail: "",
    primaryPhone: "",
    footerPhone: "",
    address: "",
    pdf1Text: "",
    pdf2Url: "",
    socialLinks: []
  });

  const [files, setFiles] = useState({
    logoImage: null,
    adminLogo: null,
    favicon: null,
    pdf1Url: null,
    pdf2Url: null,
  });
  
  const [logoPreview, setLogoPreview] = useState(null);
  const [adminLogoPreview, setAdminLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [tab, setTab] = useState("branding");
  
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialForm, setSocialForm] = useState({ platform: '', icon: '', url: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [togglingSocialIndex, setTogglingSocialIndex] = useState(null);

  const addToast = (msg, type = "success") =>
    setToasts((t) => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/global-settings");
      const json = await res.json();
      if (json.data) {
        setData(json.data);
        if (json.data.logoImage) {
          setLogoPreview(json.data.logoImage);
        }
        if (json.data.adminLogo) {
          setAdminLogoPreview(json.data.adminLogo);
        }
        if (json.data.favicon) {
          setFaviconPreview(json.data.favicon);
        }
      }
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    setFiles({ ...files, [key]: file });
    
    if (key === 'logoImage' && file) {
      setLogoPreview(URL.createObjectURL(file));
    }
    if (key === 'adminLogo' && file) {
      setAdminLogoPreview(URL.createObjectURL(file));
    }
    if (key === 'favicon' && file) {
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const openAddSocialModal = () => {
    setSocialForm({ platform: '', icon: '', url: '' });
    setEditingIndex(null);
    setIsSocialModalOpen(true);
  };

  const openEditSocialModal = (index) => {
    setSocialForm({ ...data.socialLinks[index] });
    setEditingIndex(index);
    setIsSocialModalOpen(true);
  };

  const saveSocialForm = () => {
    const newLinks = [...(data.socialLinks || [])];
    if (editingIndex !== null) {
      newLinks[editingIndex] = socialForm;
    } else {
      newLinks.push(socialForm);
    }
    setData({ ...data, socialLinks: newLinks });
    setIsSocialModalOpen(false);
  };

  const removeSocialLink = (index) => {
    const newLinks = [...(data.socialLinks || [])];
    newLinks.splice(index, 1);
    setData({ ...data, socialLinks: newLinks });
  };

  const toggleSocialStatus = async (index) => {
    try {
      setTogglingSocialIndex(index);
      const newLinks = [...(data.socialLinks || [])];
      newLinks[index] = { 
        ...newLinks[index], 
        isActive: newLinks[index].isActive === false ? true : false 
      };
      
      const formData = new FormData();
      formData.append("socialLinks", JSON.stringify(newLinks));
      
      const res = await fetch("/api/global-settings", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      
      const newActive = newLinks[index].isActive;
      setData({ ...data, socialLinks: newLinks });
      addToast(newActive ? "Social status activated!" : "Social status deactivated!", newActive ? "success" : "error");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setTogglingSocialIndex(null);
    }
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (!["logoImage", "adminLogo", "favicon", "pdf1Url", "pdf2Url", "socialLinks"].includes(key)) {
            formData.append(key, data[key]);
        }
      });
      
      formData.append("socialLinks", JSON.stringify(data.socialLinks || []));
      
      if (files.logoImage) formData.append("logoImage", files.logoImage);
      if (files.adminLogo) formData.append("adminLogo", files.adminLogo);
      if (files.favicon) formData.append("favicon", files.favicon);
      if (files.pdf1Url) formData.append("pdf1Url", files.pdf1Url);
      if (files.pdf2Url) formData.append("pdf2Url", files.pdf2Url);

      const res = await fetch("/api/global-settings", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      addToast("Global Settings updated successfully!");
      setData(json.data);
      setFiles({ logoImage: null, adminLogo: null, favicon: null, pdf1Url: null, pdf2Url: null });
      // Reset file inputs visually
      document.querySelectorAll("input[type=file]").forEach(el => el.value = "");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  const TABS = [
    { key: "branding", label: "Public Branding", icon: ImageIcon },
    { key: "admin", label: "Dashboard Icon", icon: ImageIcon },
    { key: "contact", label: "Contact Info", icon: Phone },
    { key: "brochures", label: "Header PDFs", icon: FileText },
    { key: "social", label: "Social Media", icon: Share2 },
  ];

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-muted-foreground animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-full flex flex-col bg-background text-foreground">
      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <Breadcrumb
          title="Global Website Settings"
          crumbs={[{ label: "Global Settings CMS" }]}
        />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <div
          style={{
            backgroundColor: '#0d150e',
            border: '1px solid #1e2e20',
            borderRadius: '16px',
            boxShadow: '0 0 35px -10px rgba(34, 197, 94, 0.12), 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(34, 197, 94, 0.08), transparent 75%), #0d150e',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div style={{ padding: '24px 28px 16px 28px' }}>
            <h1 style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
              Global Settings
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', margin: '4px 0 0 0' }}>
              Manage website logo, contact information, social links, and brochures.
            </p>
          </div>

          {/* Seamless Tab Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderBottom: '1px solid #1e2e20',
              padding: '0 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              overflowX: 'auto'
            }}
          >
            {TABS.map(t => {
              const Icon = t.icon;
              const isActive = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  style={{
                    padding: '14px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: isActive ? '#22c55e' : '#94a3b8',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #22c55e' : '2px solid transparent',
                    marginBottom: '-1px',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#94a3b8';
                  }}
                >
                  <Icon style={{ width: '15px', height: '15px', color: isActive ? '#22c55e' : '#64748b' }} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSave}>
            <div style={{ padding: '28px' }}>
              
              {tab === "branding" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <label className="text-sm font-semibold text-white mb-1 block">Main Website Logo</label>
                    <p className="text-xs text-slate-400 mb-4">Recommended size: 200x60px. Must be PNG with transparent background.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "logoImage")}
                        className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm text-slate-300 transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600"
                      />
                      
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold text-slate-400 mb-2">Live Logo Preview</span>
                        <div className="p-4 bg-black/50 border border-[#1e2e20] rounded-xl flex items-center justify-center min-h-[90px] min-w-[220px]">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <div className="flex flex-col items-center text-muted-foreground/50">
                              <span className="text-[10px] font-medium uppercase tracking-wider">No Logo</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <label className="text-sm font-semibold text-white mb-1 block">Browser Favicon</label>
                    <p className="text-xs text-slate-400 mb-4">Recommended: 32x32px or 64x64px ICO/PNG file.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <input
                        type="file"
                        accept="image/png, image/x-icon, image/ico"
                        onChange={(e) => handleFileChange(e, "favicon")}
                        className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm text-slate-300 transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600"
                      />
                      
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold text-slate-400 mb-2">Favicon Preview</span>
                        <div className="p-3 bg-black/50 border border-[#1e2e20] rounded-xl flex items-center justify-center min-h-[60px] min-w-[60px]">
                          {faviconPreview ? (
                            <img
                              src={faviconPreview}
                              alt="Favicon preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-slate-500">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "admin" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px'
                    }}
                  >
                    <label className="text-sm font-semibold text-white mb-1 block">Dashboard Sidebar Logo / Icon</label>
                    <p className="text-xs text-slate-400 mb-4">Displayed at the top left of the dashboard management console.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "adminLogo")}
                        className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm text-slate-300 transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600"
                      />
                      
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-xs font-semibold text-slate-400 mb-2">Admin Logo Preview</span>
                        <div className="p-4 bg-black/50 border border-[#1e2e20] rounded-xl flex items-center justify-center min-h-[90px] min-w-[220px]">
                          {adminLogoPreview ? (
                            <img
                              src={adminLogoPreview}
                              alt="Dashboard Logo preview"
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <span className="text-xs text-slate-500">Default Brand Icon Used</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "contact" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6">
                      <FloatingInput
                        label="Primary Email (Header & Footer)"
                        name="primaryEmail"
                        value={data.primaryEmail}
                        onChange={handleChange}
                        icon={<Mail className="w-4 h-4" />}
                      />
                      <FloatingInput
                        label="Primary Phone (Header)"
                        name="primaryPhone"
                        value={data.primaryPhone}
                        onChange={handleChange}
                        icon={<Phone className="w-4 h-4" />}
                      />
                      <FloatingInput
                        label="Footer Phone"
                        name="footerPhone"
                        value={data.footerPhone}
                        onChange={handleChange}
                        icon={<Phone className="w-4 h-4" />}
                      />
                    </div>
                    <div className="flex flex-col gap-6">
                      <FloatingTextarea
                        label="Office Address (Footer)"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              )}

              {tab === "brochures" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h4 className="font-bold text-white text-base flex items-center gap-2 border-b border-[#1e2e20] pb-3">
                      <FileText className="w-5 h-5 text-[#22c55e]" /> Header PDF 1
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <FloatingInput
                        label="PDF 1 Button Text"
                        name="pdf1Text"
                        value={data.pdf1Text}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Company Brochure" field="Compelling Button Text" onGenerate={(val) => setData({ ...data, pdf1Text: val })} />}
                      />
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 ml-1">Upload PDF File</label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handleFileChange(e, "pdf1Url")}
                          className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm text-slate-300 transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600"
                        />
                      </div>
                    </div>
                    {data.pdf1Url && !files.pdf1Url && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">Current File:</span>
                        <a href={data.pdf1Url} target="_blank" rel="noreferrer" className="text-[#22c55e] hover:underline font-medium flex items-center gap-1">
                          <Link2 className="w-3.5 h-3.5" /> View PDF
                        </a>
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px'
                    }}
                  >
                    <h4 className="font-bold text-white text-base flex items-center gap-2 border-b border-[#1e2e20] pb-3">
                      <FileText className="w-5 h-5 text-[#22c55e]" /> Header PDF 2
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                      <FloatingInput
                        label="PDF 2 Button Text"
                        name="pdf2Text"
                        value={data.pdf2Text}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Company Brochure" field="Compelling Button Text" onGenerate={(val) => setData({ ...data, pdf2Text: val })} />}
                      />
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 ml-1">Upload PDF File</label>
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handleFileChange(e, "pdf2Url")}
                          className="flex h-11 w-full rounded-xl border border-[#1e2e20] bg-black/40 px-4 py-2 text-sm text-slate-300 transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold file:text-[#22c55e] cursor-pointer hover:border-slate-600"
                        />
                      </div>
                    </div>
                    {data.pdf2Url && data.pdf2Url !== "#" && !files.pdf2Url && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-400">Current File:</span>
                        <a href={data.pdf2Url} target="_blank" rel="noreferrer" className="text-[#22c55e] hover:underline font-medium flex items-center gap-1">
                          <Link2 className="w-3.5 h-3.5" /> View PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {tab === "social" && (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    style={{
                      backgroundColor: '#142016',
                      border: '1px solid #1e2e20',
                      borderRadius: '16px',
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h3 className="text-base font-bold text-white">Social Media Links</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Manage dynamic social media links displayed across the site.</p>
                    </div>
                    <button
                      type="button"
                      onClick={openAddSocialModal}
                      style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#ffffff',
                        padding: '0 16px',
                        height: '36px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                      }}
                    >
                      <Plus className="w-4 h-4" /> Add Link
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {(data.socialLinks || []).map((link, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid #1e2e20',
                          borderRadius: '16px',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-[#1e2e20] flex items-center justify-center text-[#22c55e]">
                            <i className={`bi ${link.icon} text-lg`}></i>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">{link.platform || 'Unnamed Platform'}</h4>
                            <p className="text-xs text-slate-400">{link.url || 'No URL specified'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {togglingSocialIndex === index ? (
                            <span className="text-xs text-slate-400 animate-pulse">Updating...</span>
                          ) : (
                            <Switch 
                              checked={link.isActive !== false}
                              onCheckedChange={() => toggleSocialStatus(index)}
                            />
                          )}
                          <button type="button" onClick={() => openEditSocialModal(index)} className="p-2 text-slate-400 hover:text-[#22c55e] hover:bg-[#22c55e]/10 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => removeSocialLink(index)} className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {(!data.socialLinks || data.socialLinks.length === 0) && (
                      <div className="text-center py-12 text-slate-400 border border-dashed border-[#1e2e20] rounded-2xl">
                        <Share2 className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                        <p className="font-medium text-white text-sm">No social links added</p>
                        <p className="text-xs mt-1 text-slate-400">Click 'Add Link' above to get started.</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-black/40 border border-[#1e2e20] rounded-xl p-4 text-xs text-slate-400 flex items-start gap-3">
                    <Globe className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
                    <p>These links will be displayed in the website footer and header where applicable. The icon should be a valid Bootstrap Icon class (e.g. 'bi-facebook', 'bi-twitter-x').</p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="p-6 sm:p-8 border-t border-[#1e2e20] flex items-center justify-end bg-black/20">
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: '#ffffff',
                  padding: '0 28px',
                  height: '44px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1,
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  boxShadow: '0 4px 16px rgba(34, 197, 94, 0.35)'
                }}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={isSocialModalOpen} onOpenChange={setIsSocialModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Edit Social Link' : 'Add Social Link'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Platform Name</label>
              <input type="text" className="w-full bg-background border border-border/60 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" value={socialForm.platform} onChange={e => setSocialForm({...socialForm, platform: e.target.value})} placeholder="e.g. LinkedIn" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Bootstrap Icon Class</label>
              <input type="text" className="w-full bg-background border border-border/60 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" value={socialForm.icon} onChange={e => setSocialForm({...socialForm, icon: e.target.value})} placeholder="e.g. bi-linkedin" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Profile URL</label>
              <input type="text" className="w-full bg-background border border-border/60 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" value={socialForm.url} onChange={e => setSocialForm({...socialForm, url: e.target.value})} placeholder="https://..." />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
            <Button variant="outline" onClick={() => setIsSocialModalOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={saveSocialForm} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">Save Link</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Toast
        toasts={toasts}
        onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
      />
    </div>
  );
}
