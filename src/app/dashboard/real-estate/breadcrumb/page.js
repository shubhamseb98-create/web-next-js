"use client";
import { useState, useEffect } from "react";
import AIAssistantButton from "../../../../components/dashboard/AIAssistantButton";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput, FloatingTextarea } from "../../../../components/ui/floating-input";
import { Save } from "lucide-react";

export default function RealEstateBreadcrumbPage() {
  const [data, setData] = useState({
    title: "Real Estate Business Growth & Scaling Advisory",
    shortDesc: "",
    breadcrumbImage: "",
    realEstateData: {
      hero: {
        badge: "Real Estate Growth & Scaling Advisory",
        title: "Scale Your Real Estate Business with Strategic Growth & PropTech",
        subtitle: "",
        primaryBtnText: "Request Growth Blueprint",
        secondaryBtnText: "Explore Services",
        calcBtnText: "Growth Calculator",
        bgImage: "",
      },
    },
  });
  const [serviceId, setServiceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (msg, type = "success") => setToasts((t) => [...t, { id: Date.now(), message: msg, type }]);

  useEffect(() => {
    fetch("/api/services/real-estate-advisory")
      .then((r) => r.json())
      .then((res) => {
        if (res.success && res.data) {
          setServiceId(res.data._id);
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        addToast("Failed to load data", "error");
        setLoading(false);
      });
  }, []);

  const hero = data.realEstateData?.hero || {};

  const updateHero = (field, value) => {
    setData((prev) => ({
      ...prev,
      realEstateData: {
        ...(prev.realEstateData || {}),
        hero: {
          ...(prev.realEstateData?.hero || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("upload", file);
    addToast("Uploading hero banner image...", "info");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        updateHero("bgImage", responseData.url);
        setData((p) => ({ ...p, breadcrumbImage: responseData.url }));
        addToast("Image uploaded successfully", "success");
      } else {
        throw new Error(responseData.error?.message || "Upload failed");
      }
    } catch (err) {
      addToast(err.message, "error");
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSaving(true);
    try {
      const targetId = serviceId || "real-estate-advisory";
      const res = await fetch(`/api/services/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || result.message || "Failed to save");
      addToast("Real Estate Breadcrumb & Banner Saved!");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Real Estate Banner settings...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb
        title="Breadcrumb & Hero Banner"
        subtitle="Manage the hero header banner, badges, titles, and CTA action buttons."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'Breadcrumb & Banner' }]}
        rightElement={
          <Button onClick={handleSubmit} disabled={saving} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg font-semibold">
            <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Banner"}
          </Button>
        }
      />

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Hero &amp; Breadcrumb Banner Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Specialization Badge Text"
                placeholder="e.g. Real Estate Growth & Scaling Advisory"
                value={hero.badge || ""}
                onChange={(e) => updateHero("badge", e.target.value)}
              />
              <FloatingInput
                label="Page Service Title"
                placeholder="e.g. Real Estate Business Growth & Scaling Advisory"
                value={data.title || ""}
                onChange={(e) => setData((p) => ({ ...p, title: e.target.value }))}
              />
            </div>

            <FloatingInput
              label="Hero Headline Title"
              placeholder="e.g. Scale Your Real Estate Business with Strategic Growth & PropTech"
              value={hero.title || ""}
              onChange={(e) => updateHero("title", e.target.value)}
            />

            <FloatingTextarea
              label="Hero Subtitle / Description"
              placeholder="Write hero subtitle or description..."
              value={hero.subtitle || data.shortDesc || ""}
              onChange={(e) => {
                updateHero("subtitle", e.target.value);
                setData((p) => ({ ...p, shortDesc: e.target.value }));
              }}
              rows={3}
              rightElement={
                <AIAssistantButton
                  context="Real Estate Hero Subtitle"
                  field="shortDesc"
                  onGenerate={(val) => {
                    updateHero("subtitle", val);
                    setData((p) => ({ ...p, shortDesc: val }));
                  }}
                />
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingInput
                label="Primary Button Text"
                placeholder="e.g. Request Growth Blueprint"
                value={hero.primaryBtnText || ""}
                onChange={(e) => updateHero("primaryBtnText", e.target.value)}
              />
              <FloatingInput
                label="Secondary Button Text"
                placeholder="e.g. Explore Services"
                value={hero.secondaryBtnText || ""}
                onChange={(e) => updateHero("secondaryBtnText", e.target.value)}
              />
              <FloatingInput
                label="Calculator Button Text"
                placeholder="e.g. Growth Calculator"
                value={hero.calcBtnText || ""}
                onChange={(e) => updateHero("calcBtnText", e.target.value)}
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-sm font-medium text-foreground">Hero Background Banner Image</label>
              <div className="flex gap-4 items-center">
                {(hero.bgImage || data.breadcrumbImage) && (
                  <img
                    src={hero.bgImage || data.breadcrumbImage}
                    alt="Preview"
                    className="w-48 h-24 object-cover rounded-xl border border-white/10 shadow"
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
      </form>
    </div>
  );
}
