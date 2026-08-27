  "use client";
import { useState, useEffect } from "react";
import AIAssistantButton from "../../../components/dashboard/AIAssistantButton";
import Breadcrumb from "../../../components/dashboard/Breadcrumb";
import Toast from "../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../components/ui/floating-input";
import { Save, Plus, Trash2, MapPin, Search, Share2, FileText, ImageIcon, Edit2, Loader2 } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Switch } from "../../../components/ui/switch";
import ConfirmDeleteModal from "../../../components/dashboard/ConfirmDeleteModal";

function LocationModal({ location, onSave, onClose }) {
  const [form, setForm] = useState(location ? location : { title: "", address: "", phone: "", email: "", isActive: true });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{location ? 'Edit Location' : 'Add Location'}</DialogTitle>
          <p className="text-muted-foreground text-sm">Fill out the information below to {location ? 'update' : 'create'} this location.</p>
        </DialogHeader>
        <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="space-y-6 mt-4">
          <div className="space-y-6">
             <FloatingInput label="Office Name / Title" name="title" value={form.title} onChange={handleChange} required />
             <FloatingTextarea label="Address" name="address" value={form.address} onChange={handleChange} rows={2} required />
             <FloatingInput label="Phone Number(s)" name="phone" value={form.phone} onChange={handleChange} required />
             <FloatingInput label="Email(s)" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <DialogFooter className="pt-6 border-t border-border mt-6">
            <Button variant="ghost" type="button" onClick={onClose} className="rounded-full px-6 text-muted-foreground hover:bg-muted/50 font-medium">Cancel</Button>
            <Button type="submit" className="rounded-full px-10 py-6 bg-[#52a436] hover:bg-[#3e8027] text-white font-semibold text-[15px] shadow-lg shadow-[#52a436]/30 transition-transform active:scale-95">Save Location</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function ContactPageCMS() {
  const [data, setData] = useState({
    headerTitle: "",
    headerImage: "",
    headerDescription: "",
    breadcrumb: "",
    contactSubTitle: "",
    contactTitle: "",
    contactDescription: "",
    mapIframeUrl: "",
    officeAddress: "",
    officePhone: "",
    officeEmail: "",
    workingHours: "",
    locations: [],
    metatag: "",
    metaDescription: "",
    metakeywords: "[]",
    canonicalUrl: "",
    ogTitle: "",
    ogDescription: "",
    twitterCard: "summary_large_image",
    robots: "index, follow",
    schemaMarkup: "{}",
  });

  const [headerFile, setHeaderFile] = useState(null);
  const [headerPreview, setHeaderPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [tab, setTab] = useState("content");
  const [locationModal, setLocationModal] = useState(null);
  
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, index: null });
  const [isRemoving, setIsRemoving] = useState(false);

  const addToast = (msg, type = "success") =>
    setToasts((t) => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [contactRes, bannerRes] = await Promise.all([
        fetch("/api/contact-page"),
        fetch("/api/page-banners?pageKey=contact")
      ]);
      const json = await contactRes.json();
      const bannerJson = await bannerRes.json();
      const banner = bannerJson && bannerJson.length > 0 ? bannerJson[0] : null;

      if (json.data) {
        setData({
          headerTitle: banner ? banner.title : json.data.headerTitle || "",
          headerImage: banner ? banner.image : json.data.headerImage || "",
          headerDescription: json.data.headerDescription || "Looking for reliable metal solutions? Our experts are ready to assist you.",
          breadcrumb: json.data.breadcrumb || "Contact Us",
          contactSubTitle: json.data.contactSubTitle || "",
          contactTitle: json.data.contactTitle || "",
          contactDescription: json.data.contactDescription || "",
          mapIframeUrl: json.data.mapIframeUrl || "",
          officeAddress: json.data.officeAddress || "123, Digital Hub, Sector 18\nNoida, Uttar Pradesh — 201301",
          officePhone: json.data.officePhone || "+91 8527458950",
          officeEmail: json.data.officeEmail || "info@thewebtycoons.com",
          workingHours: json.data.workingHours || "Mon – Sat: 9:00 AM – 7:00 PM\nSun: Closed",
          locations: json.data.locations || [],
          metatag: json.data.metatag || "",
          metaDescription: json.data.metaDescription || "",
          metakeywords: Array.isArray(json.data.metakeywords)
            ? JSON.stringify(json.data.metakeywords)
            : "[]",
          canonicalUrl: json.data.canonicalUrl || "",
          ogTitle: json.data.ogTitle || "",
          ogDescription: json.data.ogDescription || "",
          twitterCard: json.data.twitterCard || "summary_large_image",
          robots: json.data.robots || "index, follow",
          schemaMarkup: json.data.schemaMarkup
            ? JSON.stringify(json.data.schemaMarkup, null, 2)
            : "{}",
        });
        if (banner && banner.image) {
          setHeaderPreview(banner.image);
        } else if (json.data.headerImage) {
          setHeaderPreview(json.data.headerImage);
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

  const openAddLocation = () => {
    setLocationModal({ data: null });
  };

  const openEditLocation = (index) => {
    setLocationModal({ index, data: data.locations[index] });
  };

  const handleSaveLocation = async (loc) => {
    let newLocations = [...data.locations];
    if (locationModal.index !== undefined) {
      newLocations[locationModal.index] = loc;
    } else {
      newLocations.push(loc);
    }
    
    // Auto-save to API
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "locations") {
          formData.append(key, JSON.stringify(newLocations));
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/contact-page", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setData({ ...data, locations: newLocations });
      setLocationModal(null);
      addToast("Location saved successfully!");
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  const confirmRemoveLocation = (index) => {
    setConfirmModal({ isOpen: true, index });
  };

  const handleConfirmRemove = async () => {
    const index = confirmModal.index;
    if (index === null) return;
    
    setConfirmModal({ isOpen: false, index: null });
    setIsRemoving(true);
    
    const newLocations = data.locations.filter((_, i) => i !== index);
    
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "locations") {
          formData.append(key, JSON.stringify(newLocations));
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/contact-page", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setData({ ...data, locations: newLocations });
      addToast("Location removed successfully!");
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleToggleLocationStatus = async (index, currentStatus) => {
    try {
      const newLocations = [...data.locations];
      newLocations[index].isActive = !currentStatus;
      
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "locations") {
          formData.append(key, JSON.stringify(newLocations));
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/contact-page", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      const newActive = !currentStatus;
      setData({ ...data, locations: newLocations });
      addToast(newActive ? "Location activated!" : "Location deactivated!", newActive ? "success" : "error");
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      // Save page banner first
      const bannerFd = new FormData();
      bannerFd.append("pageKey", "contact");
      bannerFd.append("title", data.headerTitle);
      if (headerFile) bannerFd.append("image", headerFile);

      const bannerRes = await fetch("/api/page-banners", {
        method: "POST",
        body: bannerFd,
      });
      const bannerJson = await bannerRes.json();

      // Save contact page
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "locations") {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === "headerImage") {
          // If we got a new banner image from the page-banners API, use that instead of the old state
          formData.append(key, bannerJson?.image || data[key]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const res = await fetch("/api/contact-page", {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      addToast("Contact Page updated successfully!");
      if (bannerJson?.image) {
        setData((prev) => ({ ...prev, headerImage: bannerJson.image }));
        setHeaderFile(null);
      } else if (json.data?.headerImage) {
        setData((prev) => ({ ...prev, headerImage: json.data.headerImage }));
      }
    } catch (error) {
      addToast(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  const TABS = [
    { key: "content", label: "Page Content", icon: FileText },
    { key: "locations", label: "Office Locations", icon: MapPin },
    { key: "seo", label: "SEO Settings", icon: Search },
  ]

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
          title="Contact Page Management"
          crumbs={[{ label: "Contact Page CMS" }]}
        />
      </div>

      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
        <div
          style={{
            backgroundColor: '#0d150e',
            border: '1px solid #1e2e20',
            borderRadius: '16px',
            boxShadow: '0 0 35px -10px rgba(34, 197, 94, 0.12), 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            background: 'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(34, 197, 94, 0.09), transparent 75%), #0d150e',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Header */}
          <div style={{ padding: '24px 28px 16px 28px' }}>
            <h1 style={{ fontSize: '21px', fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff', margin: 0 }}>
              Manage Contact Page
            </h1>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', margin: '4px 0 0 0' }}>
              Update the content, locations, and SEO settings for the contact page.
            </p>
          </div>

          {/* Tab Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              borderBottom: '1px solid #1e2e20',
              padding: '0 24px',
              backgroundColor: 'rgba(0, 0, 0, 0.15)'
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
                    transition: 'all 0.15s ease'
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
              {tab === "content" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <FloatingTextarea
                          label="Top Banner Title"
                          name="headerTitle"
                          value={data.headerTitle}
                          onChange={handleChange}
                          rows={2}
                          rightElement={<AIAssistantButton context="Contact Page Banner" field="Banner Title" onGenerate={(val) => setData({ ...data, headerTitle: val })} />}
                        />
                        <p className="text-[11px] text-slate-400 mt-2 px-1">Tip: Wrap words in asterisks like *Amazing* to make them green! Use enter for a new line.</p>
                      </div>

                      <FloatingInput
                        label="Breadcrumb Text"
                        name="breadcrumb"
                        value={data.breadcrumb}
                        onChange={handleChange}
                        placeholder="e.g. Contact Us"
                      />

                      <FloatingTextarea
                        label="Top Banner Description"
                        name="headerDescription"
                        value={data.headerDescription}
                        onChange={handleChange}
                        rows={2}
                      />

                      <div className="space-y-3 pt-2">
                        <label className="text-sm font-medium text-slate-200">Top Banner Background Image</label>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            className="relative overflow-hidden border-[#1e2e20] bg-white/[0.03] text-white hover:bg-white/[0.06] rounded-xl h-10 px-5"
                            onClick={() => document.getElementById('headerImageUpload').click()}
                          >
                            <ImageIcon className="w-4 h-4 mr-2 text-[#22c55e]" /> 
                            {headerFile ? "Change Image" : "Upload Image"}
                            <input 
                              id="headerImageUpload"
                              type="file" 
                              accept="image/*" 
                              className="hidden"
                              onChange={(e) => {
                                if(e.target.files && e.target.files[0]) {
                                  setHeaderFile(e.target.files[0]);
                                  setHeaderPreview(URL.createObjectURL(e.target.files[0]));
                                }
                              }} 
                            />
                          </Button>
                          {headerFile && <span className="text-xs text-slate-400">{headerFile.name}</span>}
                        </div>
                        {(headerPreview || data.headerImage) && (
                          <div className="mt-3 relative w-full h-36 rounded-2xl overflow-hidden border border-[#1e2e20] shadow-md">
                            <Image 
                              src={headerPreview || data.headerImage} 
                              alt="Banner Preview" 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <FloatingInput
                          label="Google Map Iframe URL (src only)"
                          name="mapIframeUrl"
                          value={data.mapIframeUrl}
                          onChange={handleChange}
                          placeholder="https://www.google.com/maps/embed?..."
                        />
                        <p className="text-[11px] text-slate-400 mt-2 px-1">Extract only the src link from the Google Maps iframe embed code.</p>
                      </div>
                      
                      {(() => {
                        let mapSrc = data.mapIframeUrl;
                        if (mapSrc && mapSrc.includes('<iframe')) {
                          const match = mapSrc.match(/src=["']([^"']+)["']/);
                          if (match) mapSrc = match[1];
                        }
                        if (!mapSrc) return null;
                        mapSrc = mapSrc.replace(/!2shi/g, '!2sen').replace(/!1shi/g, '!1sen');
                        if (!mapSrc.includes('hl=')) {
                          mapSrc += (mapSrc.includes('?') ? '&' : '?') + 'hl=en';
                        }
                        return (
                          <div
                            style={{
                              border: '1px solid #1e2e20',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              backgroundColor: 'rgba(255, 255, 255, 0.02)',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                            className="p-1.5"
                          >
                            <iframe 
                              src={mapSrc} 
                              width="100%" 
                              height="240" 
                              style={{ border: 0, borderRadius: '12px', display: 'block' }} 
                              loading="lazy"
                            ></iframe>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-[#1e2e20] space-y-6">
                    <h4 className="font-bold text-lg text-white">Contact Form Section</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="Section Sub-title (Orange text)"
                        name="contactSubTitle"
                        value={data.contactSubTitle}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Contact Form Section" field="Sub-title" onGenerate={(val) => setData({ ...data, contactSubTitle: val })} />}
                      />
                      <FloatingInput
                        label="Section Title"
                        name="contactTitle"
                        value={data.contactTitle}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Contact Form Section" field="Main Title" onGenerate={(val) => setData({ ...data, contactTitle: val })} />}
                      />
                    </div>
                    <FloatingTextarea
                      label="Section Description"
                      name="contactDescription"
                      value={data.contactDescription}
                      onChange={handleChange}
                      rows={3}
                      rightElement={<AIAssistantButton context="Contact Form Section" field="Description Text" onGenerate={(val) => setData({ ...data, contactDescription: val })} />}
                    />
                  </div>

                  <div className="pt-8 border-t border-[#1e2e20] space-y-6">
                    <div>
                      <h4 className="font-bold text-lg text-white">Main Office Details</h4>
                      <p className="text-xs text-slate-400 mt-1">These details will populate the 4 green boxes on the contact page if you leave the Locations tab empty.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingTextarea
                        label="Office Address"
                        name="officeAddress"
                        value={data.officeAddress}
                        onChange={handleChange}
                        rows={2}
                      />
                      <FloatingTextarea
                        label="Working Hours"
                        name="workingHours"
                        value={data.workingHours}
                        onChange={handleChange}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label="Phone Number"
                        name="officePhone"
                        value={data.officePhone}
                        onChange={handleChange}
                      />
                      <FloatingInput
                        label="Email Address"
                        name="officeEmail"
                        value={data.officeEmail}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {tab === "locations" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                    <h4 className="font-semibold text-white">Manage Office Locations</h4>
                    <button
                      type="button"
                      onClick={openAddLocation}
                      style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: '#ffffff',
                        padding: '0 18px',
                        height: '38px',
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
                      <Plus className="w-4 h-4" /> Add New Location
                    </button>
                  </div>
                  
                  {data.locations.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-[#1e2e20] rounded-2xl">
                      <p className="text-slate-400 text-sm">No locations added yet.</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {data.locations.map((loc, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid #1e2e20',
                          borderRadius: '16px',
                          overflow: 'hidden'
                        }}
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 gap-4">
                          <div>
                            <h5 className="font-semibold text-white flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-[#22c55e]" /> {loc.title || `Location #${index + 1}`}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1 ml-6">{loc.address}</p>
                          </div>
                          <div className="flex items-center gap-4 sm:ml-auto ml-6">
                            <Switch 
                              checked={loc.isActive !== false}
                              onCheckedChange={() => handleToggleLocationStatus(index, loc.isActive !== false)}
                            />
                            <div className="flex items-center gap-2">
                              <Button type="button" variant="ghost" size="sm" onClick={() => openEditLocation(index)} className="text-[#22c55e] hover:bg-[#22c55e]/10 rounded-lg h-8 px-3 text-xs font-semibold">
                                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                              </Button>
                              <Button type="button" variant="ghost" size="sm" onClick={() => confirmRemoveLocation(index)} className="text-red-400 hover:bg-red-500/10 rounded-lg h-8 px-3 text-xs font-semibold">
                                <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "seo" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <FloatingInput
                        label="Title Tag"
                        name="metatag"
                        value={data.metatag}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Contact Page" field="SEO Meta Title" onGenerate={(val) => setData({ ...data, metatag: val })} />}
                      />
                      <FloatingTextarea
                        label="Meta Description"
                        name="metaDescription"
                        value={data.metaDescription}
                        onChange={handleChange}
                        rows={3}
                        rightElement={<AIAssistantButton context="Contact Page" field="SEO Meta Description" onGenerate={(val) => setData({ ...data, metaDescription: val })} />}
                      />
                      <FloatingInput
                        label="Meta Keywords (JSON Array)"
                        name="metakeywords"
                        value={data.metakeywords}
                        onChange={handleChange}
                        placeholder='["metal", "contact"]'
                        rightElement={<AIAssistantButton context="Contact Page" field="SEO Meta Keywords JSON Array" onGenerate={(val) => setData({ ...data, metakeywords: val })} />}
                      />
                      <FloatingInput
                        label="Canonical URL"
                        name="canonicalUrl"
                        value={data.canonicalUrl}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-6">
                      <FloatingInput
                        label="OG Title"
                        name="ogTitle"
                        value={data.ogTitle}
                        onChange={handleChange}
                        rightElement={<AIAssistantButton context="Contact Page" field="OpenGraph Title" onGenerate={(val) => setData({ ...data, ogTitle: val })} />}
                      />
                      <FloatingTextarea
                        label="OG Description"
                        name="ogDescription"
                        value={data.ogDescription}
                        onChange={handleChange}
                        rows={3}
                        rightElement={<AIAssistantButton context="Contact Page" field="OpenGraph Description" onGenerate={(val) => setData({ ...data, ogDescription: val })} />}
                      />
                      <FloatingTextarea
                        label="Schema Markup (JSON Object)"
                        name="schemaMarkup"
                        value={data.schemaMarkup}
                        onChange={handleChange}
                        rows={5}
                        className="font-mono text-xs"
                        rightElement={<AIAssistantButton context="Contact Page" field="ContactPage Schema JSON" isSchema={true} onGenerate={(val) => setData({ ...data, schemaMarkup: val })} />}
                      />
                    </div>
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
                onMouseEnter={(e) => {
                  if (!saving) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.45)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!saving) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.35)';
                  }
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
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast
        toasts={toasts}
        onRemove={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
      />

      {locationModal && (
        <LocationModal
          location={locationModal.data}
          onSave={handleSaveLocation}
          onClose={() => setLocationModal(null)}
        />
      )}
      
      <ConfirmDeleteModal
        isOpen={confirmModal.isOpen}
        isDeleting={isRemoving}
        onClose={() => setConfirmModal({ isOpen: false, index: null })}
        onConfirm={handleConfirmRemove}
        title="Remove Location"
        message="Are you sure you want to remove this office location? This action cannot be undone."
      />
    </div>
  );
}
