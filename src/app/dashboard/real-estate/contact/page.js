"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../../../../components/dashboard/Breadcrumb";
import Toast from "../../../../components/dashboard/Toast";
import { Card, CardHeader, CardTitle, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { FloatingInput } from "../../../../components/ui/floating-input";
import { Save } from "lucide-react";
import { DEFAULT_REAL_ESTATE_DATA, mergeRealEstateData } from "../../../../lib/realEstateDefaults";

export default function RealEstateContactPage() {
  const [data, setData] = useState({
    title: "Real Estate Business Growth & Scaling Advisory",
    slug: "real-estate-advisory",
    realEstateData: DEFAULT_REAL_ESTATE_DATA,
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
          setData(mergeRealEstateData(res.data));
        }
      })
      .catch((e) => {
        console.warn("Using default contact data", e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const contact = data.realEstateData?.contact || {};

  const updateContact = (field, value) => {
    setData((prev) => ({
      ...prev,
      realEstateData: {
        ...(prev.realEstateData || {}),
        contact: {
          ...(prev.realEstateData?.contact || {}),
          [field]: value,
        },
      },
    }));
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
      addToast("Contact & Audit Form Settings Saved!");
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Contact & Audit Form settings...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-background min-h-full">
      <Breadcrumb
        title="Contact & Growth Audit Form"
        subtitle="Manage advisory direct contacts, office locations, and discovery audit lead capture headings."
        crumbs={[{ label: 'Real Estate Management' }, { label: 'Contact & Audit' }]}
        rightElement={
          <Button onClick={handleSubmit} disabled={saving} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg font-semibold">
            <Save className="w-5 h-5 mr-2" /> {saving ? "Saving..." : "Save Contact Info"}
          </Button>
        }
      />

      <Toast toasts={toasts} onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Contact &amp; Growth Audit Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingInput
                label="Section Tag Label"
                placeholder="e.g. GROWTH AUDIT"
                value={contact.label || ""}
                onChange={(e) => updateContact("label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                placeholder="e.g. Ready to Scale Your Real Estate Business?"
                value={contact.title || ""}
                onChange={(e) => updateContact("title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                placeholder="Booking consultation overview..."
                value={contact.desc || ""}
                onChange={(e) => updateContact("desc", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Cards */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Direct Advisory Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Direct Advisory Phone"
                placeholder="e.g. +91 8527458950"
                value={contact.phone || ""}
                onChange={(e) => updateContact("phone", e.target.value)}
              />
              <FloatingInput
                label="Advisory Email Address"
                placeholder="e.g. info@thewebtycoons.com"
                value={contact.email || ""}
                onChange={(e) => updateContact("email", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Office Location Address"
                placeholder="e.g. 123, Digital Hub, Sector 18, Noida..."
                value={contact.location || ""}
                onChange={(e) => updateContact("location", e.target.value)}
              />
              <FloatingInput
                label="Territories Served"
                placeholder="e.g. Delhi NCR, Mumbai, Bangalore..."
                value={contact.territories || ""}
                onChange={(e) => updateContact("territories", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Lead Form Card Info */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Lead Capture Form Card Headings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Lead Form Card Title"
                placeholder="e.g. Request Real Estate Growth Audit"
                value={contact.formTitle || ""}
                onChange={(e) => updateContact("formTitle", e.target.value)}
              />
              <FloatingInput
                label="Lead Form Card Subtitle"
                placeholder="e.g. Fill out the form below..."
                value={contact.formSubtitle || ""}
                onChange={(e) => updateContact("formSubtitle", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
