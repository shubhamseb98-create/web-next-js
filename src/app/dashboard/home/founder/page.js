'use client';
import { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../../../components/dashboard/Breadcrumb';
import Toast from '../../../../components/dashboard/Toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { FloatingInput, FloatingTextarea } from '../../../../components/ui/floating-input';
import { 
  Save, 
  RotateCcw, 
  Image as ImageIcon, 
  Sparkles, 
  UserCheck, 
  Quote, 
  Layers, 
  Upload, 
  CheckCircle2, 
  ExternalLink,
  Eye,
  Award,
  Check,
  Plus,
  Trash2
} from 'lucide-react';

const DEFAULT_POINTS = [
  { number: "01", title: "Direct Founder Advisory", desc: "Personal architectural oversight and strategic technical consultation on every enterprise delivery." },
  { number: "02", title: "Zero Software Bloat", desc: "Clean, bespoke codebases engineered for sub-second speeds and ultra-high Lighthouse scores." },
  { number: "03", title: "100% Code & IP Ownership", desc: "Complete transparency, full GitHub repository handover, and zero proprietary lock-in." },
  { number: "04", title: "Measurable Growth ROI", desc: "Sprint-driven execution focused strictly on driving real business pipeline and client revenue." },
];

const DEFAULT_FORM = {
  eyebrow: "FROM THE FOUNDER'S DESK",
  heading_start: "Architecting",
  heading_highlight: "Digital Dominance",
  heading_end: "& Engineering Real Value",
  founder_name: "Dheeraj Aggarwal",
  founder_role: "Founder & CEO",
  quote_tag: "OUR FOUNDATIONAL COMMITMENT",
  quote_text: "We didn't start WebTycoons to just build websites. We set out to give ambitious businesses complete code ownership, sub-second speed, and high-converting digital platforms engineered to dominate their industries.",
  bio_text: "MBA in Marketing from Symbiosis Pune with over 18 years of expertise in digital marketing, SEO, and enterprise growth operations. Regular keynote speaker across national business forums. Since establishing WebTycoons in 2011, he has personally steered over 350+ enterprise digital projects, pioneering bespoke tech solutions that eliminate software bloat and maximize measurable client ROI.",
  primary_btn_text: "Work With Our Team",
  primary_btn_url: "/contact",
  linkedin_url: "https://www.linkedin.com",
  signature_text: "Dheeraj Aggarwal",
  signature_subtext: "Founder & CEO, WebTycoons",
  image: "/assets/img/team/sitara-removebg-preview.png",
  imageFile: null,
  alt: "Dheeraj Aggarwal - Founder & CEO",
  badge_1_number: "18+",
  badge_1_label: "Years Industry Mastery",
  badge_2_tag: "PROVEN TRACK RECORD",
  badge_2_number: "350+",
  badge_2_label: "Delivered Worldwide",
  badge_3_text: "100% Code Ownership",
  points: DEFAULT_POINTS,
  point_1_title: "Direct Founder Advisory",
  point_1_desc: "Personal architectural oversight and strategic technical consultation on every enterprise delivery.",
  point_2_title: "Zero Software Bloat",
  point_2_desc: "Clean, bespoke codebases engineered for sub-second speeds and ultra-high Lighthouse scores.",
  point_3_title: "100% Code & IP Ownership",
  point_3_desc: "Complete transparency, full GitHub repository handover, and zero proprietary lock-in.",
  point_4_title: "Measurable Growth ROI",
  point_4_desc: "Sprint-driven execution focused strictly on driving real business pipeline and client revenue.",
  isActive: true,
};

export default function FounderCMSPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [previewImage, setPreviewImage] = useState('/assets/img/team/sitara-removebg-preview.png');
  const [toasts, setToasts] = useState([]);
  const fileInputRef = useRef(null);

  const addToast = (message, type = 'success') => {
    setToasts((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updatePoint = (index, field, value) => {
    setForm((prev) => {
      const currentPoints = [...(prev.points || DEFAULT_POINTS)];
      if (!currentPoints[index]) return prev;
      currentPoints[index] = { ...currentPoints[index], [field]: value };
      return {
        ...prev,
        points: currentPoints,
        point_1_title: currentPoints[0]?.title || '',
        point_1_desc: currentPoints[0]?.desc || '',
        point_2_title: currentPoints[1]?.title || '',
        point_2_desc: currentPoints[1]?.desc || '',
        point_3_title: currentPoints[2]?.title || '',
        point_3_desc: currentPoints[2]?.desc || '',
        point_4_title: currentPoints[3]?.title || '',
        point_4_desc: currentPoints[3]?.desc || '',
      };
    });
  };

  const addPoint = () => {
    setForm((prev) => {
      const current = prev.points || [];
      const newNum = current.length < 9 ? `0${current.length + 1}` : `${current.length + 1}`;
      const newPoint = {
        number: newNum,
        title: '',
        desc: '',
      };
      return { ...prev, points: [...current, newPoint] };
    });
    addToast('New point added! Fill in the title and description below.', 'info');
  };

  const removePoint = (index) => {
    setForm((prev) => {
      const current = prev.points || [];
      const filtered = current
        .filter((_, i) => i !== index)
        .map((pt, i) => ({
          ...pt,
          number: i < 9 ? `0${i + 1}` : `${i + 1}`,
        }));
      return {
        ...prev,
        points: filtered,
        point_1_title: filtered[0]?.title || '',
        point_1_desc: filtered[0]?.desc || '',
        point_2_title: filtered[1]?.title || '',
        point_2_desc: filtered[1]?.desc || '',
        point_3_title: filtered[2]?.title || '',
        point_3_desc: filtered[2]?.desc || '',
        point_4_title: filtered[3]?.title || '',
        point_4_desc: filtered[3]?.desc || '',
      };
    });
    addToast('Point removed.', 'info');
  };

  useEffect(() => {
    fetchFounderData();
  }, []);

  const fetchFounderData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/founder-section', { cache: 'no-store' });
      const data = await res.json();
      if (data && data._id) {
        let loadedPoints = Array.isArray(data.points) && data.points.length > 0 ? data.points : null;
        if (!loadedPoints) {
          loadedPoints = [
            { number: "01", title: data.point_1_title || DEFAULT_POINTS[0].title, desc: data.point_1_desc || DEFAULT_POINTS[0].desc },
            { number: "02", title: data.point_2_title || DEFAULT_POINTS[1].title, desc: data.point_2_desc || DEFAULT_POINTS[1].desc },
            { number: "03", title: data.point_3_title || DEFAULT_POINTS[2].title, desc: data.point_3_desc || DEFAULT_POINTS[2].desc },
            { number: "04", title: data.point_4_title || DEFAULT_POINTS[3].title, desc: data.point_4_desc || DEFAULT_POINTS[3].desc },
          ];
        }

        setForm({
          ...DEFAULT_FORM,
          ...data,
          badge_1_number: data.badge_1_number !== undefined ? data.badge_1_number : DEFAULT_FORM.badge_1_number,
          badge_1_label: data.badge_1_label !== undefined ? data.badge_1_label : DEFAULT_FORM.badge_1_label,
          badge_2_tag: data.badge_2_tag !== undefined ? data.badge_2_tag : DEFAULT_FORM.badge_2_tag,
          badge_2_number: data.badge_2_number !== undefined ? data.badge_2_number : DEFAULT_FORM.badge_2_number,
          badge_2_label: data.badge_2_label !== undefined ? data.badge_2_label : DEFAULT_FORM.badge_2_label,
          badge_3_text: data.badge_3_text !== undefined ? data.badge_3_text : DEFAULT_FORM.badge_3_text,
          points: loadedPoints,
          point_1_title: loadedPoints[0]?.title || '',
          point_1_desc: loadedPoints[0]?.desc || '',
          point_2_title: loadedPoints[1]?.title || '',
          point_2_desc: loadedPoints[1]?.desc || '',
          point_3_title: loadedPoints[2]?.title || '',
          point_3_desc: loadedPoints[2]?.desc || '',
          point_4_title: loadedPoints[3]?.title || '',
          point_4_desc: loadedPoints[3]?.desc || '',
          imageFile: null,
        });
        if (data.image) {
          setPreviewImage(data.image);
        }
      }
    } catch (err) {
      console.error(err);
      addToast('Failed to load founder section content', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      addToast(`Selected image: ${file.name}. Click "Save Changes" to upload and apply.`, 'info');
    }
  };

  const handleSave = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();

      // Explicitly separate text fields, file uploads, and points array
      Object.keys(form).forEach((key) => {
        if (key === 'imageFile') {
          if (form.imageFile) {
            formData.append('imageFile', form.imageFile);
          }
        } else if (key === 'image') {
          formData.append('existingImage', form.image || '');
        } else if (key === 'points') {
          formData.append('points', JSON.stringify(form.points || []));
        } else {
          formData.append(key, form[key] ?? '');
        }
      });

      const res = await fetch('/api/founder-section', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update founder section');
      }

      addToast('Founder section updated successfully!', 'success');

      if (result.data) {
        setForm((prev) => ({
          ...prev,
          ...result.data,
          badge_1_number: result.data.badge_1_number !== undefined ? result.data.badge_1_number : '',
          badge_1_label: result.data.badge_1_label !== undefined ? result.data.badge_1_label : '',
          badge_2_tag: result.data.badge_2_tag !== undefined ? result.data.badge_2_tag : '',
          badge_2_number: result.data.badge_2_number !== undefined ? result.data.badge_2_number : '',
          badge_2_label: result.data.badge_2_label !== undefined ? result.data.badge_2_label : '',
          badge_3_text: result.data.badge_3_text !== undefined ? result.data.badge_3_text : '',
          points: Array.isArray(result.data.points) && result.data.points.length > 0 ? result.data.points : prev.points,
          point_1_title: result.data.point_1_title !== undefined ? result.data.point_1_title : '',
          point_1_desc: result.data.point_1_desc !== undefined ? result.data.point_1_desc : '',
          point_2_title: result.data.point_2_title !== undefined ? result.data.point_2_title : '',
          point_2_desc: result.data.point_2_desc !== undefined ? result.data.point_2_desc : '',
          point_3_title: result.data.point_3_title !== undefined ? result.data.point_3_title : '',
          point_3_desc: result.data.point_3_desc !== undefined ? result.data.point_3_desc : '',
          point_4_title: result.data.point_4_title !== undefined ? result.data.point_4_title : '',
          point_4_desc: result.data.point_4_desc !== undefined ? result.data.point_4_desc : '',
          imageFile: null,
        }));
        if (result.data.image) {
          setPreviewImage(result.data.image);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error(err);
      addToast(err.message || 'Update failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading Founder Section CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 max-w-7xl mx-auto space-y-6">
      {/* Toast notifications */}
      <Toast
        toasts={toasts}
        onRemove={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />

      {/* Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '/dashboard' },
              { label: 'Home Management', href: '/dashboard/home' },
              { label: 'Founder Section' },
            ]}
          />
          <h1 className="text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            Founder Section CMS
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
              Live on Home &amp; About
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Customize the leadership manifesto, quote, bio story, CTAs, portrait image, and floating badges.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={fetchFounderData}
            disabled={saving}
            className="border-slate-700 hover:bg-slate-800 text-slate-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 px-5"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left Column (2 Cols): Form Fields ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card 1: Headline & Eyebrow */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  Section Eyebrow &amp; Heading
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  The primary title and eyebrow pill badge displayed at the top of the section.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <FloatingInput
                  label="Section Eyebrow Label"
                  value={form.eyebrow}
                  onChange={(e) => updateField('eyebrow', e.target.value)}
                  placeholder="FROM THE FOUNDER'S DESK"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FloatingInput
                    label="Heading Start"
                    value={form.heading_start}
                    onChange={(e) => updateField('heading_start', e.target.value)}
                    placeholder="Architecting"
                  />
                  <FloatingInput
                    label="Heading Middle"
                    value={form.heading_highlight}
                    onChange={(e) => updateField('heading_highlight', e.target.value)}
                    placeholder="Digital Dominance"
                  />
                  <FloatingInput
                    label="Heading End"
                    value={form.heading_end}
                    onChange={(e) => updateField('heading_end', e.target.value)}
                    placeholder="& Engineering Real Value"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Founder Identity & Designation */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Founder Identity
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Name and professional role or title.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Founder Full Name"
                    value={form.founder_name}
                    onChange={(e) => updateField('founder_name', e.target.value)}
                    placeholder="Dheeraj Aggarwal"
                  />
                  <FloatingInput
                    label="Role / Designation"
                    value={form.founder_role}
                    onChange={(e) => updateField('founder_role', e.target.value)}
                    placeholder="Founder & CEO"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Commitment Quote */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Quote className="w-4 h-4 text-emerald-400" />
                  Foundational Commitment &amp; Quote
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  The featured quote card highlighting your core philosophy.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <FloatingInput
                  label="Quote Tag / Subtitle"
                  value={form.quote_tag}
                  onChange={(e) => updateField('quote_tag', e.target.value)}
                  placeholder="OUR FOUNDATIONAL COMMITMENT"
                />

                <FloatingTextarea
                  label="Founder Quote Text"
                  rows={3}
                  value={form.quote_text}
                  onChange={(e) => updateField('quote_text', e.target.value)}
                  placeholder="Enter the founder's quote..."
                />
              </CardContent>
            </Card>

            {/* Card 4: Bio Narrative */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  Bio Narrative &amp; Track Record
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Summary narrative describing the founder&apos;s background, qualifications, and accomplishments.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <FloatingTextarea
                  label="Biography / Story Text"
                  rows={4}
                  value={form.bio_text}
                  onChange={(e) => updateField('bio_text', e.target.value)}
                  placeholder="Enter detailed bio narrative..."
                />
              </CardContent>
            </Card>

            {/* Card 5: Buttons & Signature */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-emerald-400" />
                  Action Buttons &amp; Digital Signature
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Call to action buttons and the decorative digital signature badge.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Primary Button Text"
                    value={form.primary_btn_text}
                    onChange={(e) => updateField('primary_btn_text', e.target.value)}
                    placeholder="Work With Our Team"
                  />
                  <FloatingInput
                    label="Primary Button URL / Link"
                    value={form.primary_btn_url}
                    onChange={(e) => updateField('primary_btn_url', e.target.value)}
                    placeholder="/contact"
                  />
                </div>

                <FloatingInput
                  label="LinkedIn Profile URL"
                  value={form.linkedin_url}
                  onChange={(e) => updateField('linkedin_url', e.target.value)}
                  placeholder="https://www.linkedin.com/in/..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label="Digital Signature Name"
                    value={form.signature_text}
                    onChange={(e) => updateField('signature_text', e.target.value)}
                    placeholder="Dheeraj Aggarwal"
                  />
                  <FloatingInput
                    label="Signature Subtitle"
                    value={form.signature_subtext}
                    onChange={(e) => updateField('signature_subtext', e.target.value)}
                    placeholder="Founder & CEO, WebTycoons"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Card 6: Dynamic Value Points (Bottom of Section) */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Dynamic Key Points / Value Pillars
                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                      {(form.points || []).length} Points Active
                    </span>
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs mt-1">
                    Manage the highlight cards displayed at the bottom of the Founder section. Add, edit, or delete points dynamically.
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  onClick={addPoint}
                  variant="outline"
                  size="sm"
                  className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add New Point
                </Button>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {(form.points || []).map((pt, idx) => (
                  <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-3 relative transition-colors hover:border-slate-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[11px] font-bold">
                          {idx < 9 ? `0${idx + 1}` : idx + 1}
                        </span>
                        Point {idx + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => removePoint(idx)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete point"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <FloatingInput
                      label={`Point ${idx + 1} Title`}
                      value={pt.title || ''}
                      onChange={(e) => updatePoint(idx, 'title', e.target.value)}
                      placeholder="e.g. Direct Founder Advisory"
                    />
                    <FloatingTextarea
                      label={`Point ${idx + 1} Description`}
                      rows={2}
                      value={pt.desc || ''}
                      onChange={(e) => updatePoint(idx, 'desc', e.target.value)}
                      placeholder="Enter description text..."
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  onClick={addPoint}
                  variant="outline"
                  className="w-full border-dashed border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 text-slate-400 hover:text-emerald-300 py-3.5 text-xs font-medium"
                >
                  <Plus className="w-4 h-4 mr-1.5 text-emerald-400" />
                  + Add Another Point
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* ── Right Column (1 Col): Portrait Image & Floating Badges ── */}
          <div className="flex flex-col gap-6">
            {/* Card: Portrait Image Upload */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  Founder Portrait Photo
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  Upload a photo or transparent PNG (approx 450x550px).
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {/* Image Preview Box */}
                <div className="relative w-full h-64 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-end justify-center group">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15),transparent_70%)] pointer-events-none" />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={form.alt || 'Founder Preview'}
                      className="h-full w-auto object-contain object-bottom transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-500">
                      No Image Selected
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] bg-slate-900/90 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                      Current Visual
                    </span>
                  </div>
                </div>

                {/* Upload Trigger */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-dashed border-slate-700 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-300 py-5"
                >
                  <Upload className="w-4 h-4 mr-2 text-emerald-400" />
                  Upload New Portrait Photo
                </Button>

                {form.imageFile && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className="truncate">Ready to save: {form.imageFile.name}</span>
                  </div>
                )}

                <FloatingInput
                  label="Image Alt Text (SEO)"
                  value={form.alt}
                  onChange={(e) => updateField('alt', e.target.value)}
                  placeholder="Dheeraj Aggarwal - Founder & CEO"
                />
              </CardContent>
            </Card>

            {/* Card: Floating Badges Customization */}
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
              <CardHeader className="pb-3 border-b border-slate-800/80">
                <CardTitle className="text-base font-semibold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  Floating Glass Badges
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">
                  The interactive stats and proof badges overlaid on the portrait frame.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                {/* Badge 1 */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Badge 1 (Top Left)</p>
                  <div className="grid grid-cols-3 gap-3">
                    <FloatingInput
                      label="Number"
                      value={form.badge_1_number}
                      onChange={(e) => updateField('badge_1_number', e.target.value)}
                      placeholder="18+"
                    />
                    <div className="col-span-2">
                      <FloatingInput
                        label="Label Text"
                        value={form.badge_1_label}
                        onChange={(e) => updateField('badge_1_label', e.target.value)}
                        placeholder="Years Industry Mastery"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge 2 (Fixed Gap & Distinct Separation) */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Badge 2 (Bottom Right)</p>
                  <div style={{ marginBottom: '8px' }}>
                    <FloatingInput
                      label="Tag"
                      value={form.badge_2_tag}
                      onChange={(e) => updateField('badge_2_tag', e.target.value)}
                      placeholder="PROVEN TRACK RECORD"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <FloatingInput
                      label="Number"
                      value={form.badge_2_number}
                      onChange={(e) => updateField('badge_2_number', e.target.value)}
                      placeholder="350+"
                    />
                    <div className="col-span-2">
                      <FloatingInput
                        label="Label Text"
                        value={form.badge_2_label}
                        onChange={(e) => updateField('badge_2_label', e.target.value)}
                        placeholder="Delivered Worldwide"
                      />
                    </div>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Badge 3 (Bottom Left Pill)</p>
                  <FloatingInput
                    label="Pill Text"
                    value={form.badge_3_text}
                    onChange={(e) => updateField('badge_3_text', e.target.value)}
                    placeholder="100% Code Ownership"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 py-3 text-sm font-semibold"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              <a
                href="/#founder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                View Live Section on Website &rarr;
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
