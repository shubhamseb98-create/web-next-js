"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FloatingInput, FloatingTextarea } from "../ui/floating-input";
import { Save, Plus, Trash2, Image as ImageIcon, Upload, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import AIAssistantButton from "./AIAssistantButton";

const defaultGrowthVerticals = [
  {
    id: "gtm",
    title: "Project Launch GTM Strategy",
    tag: "For Builders & Developers",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
    desc: "Complete digital launch playbooks to build intense pre-launch FOMO, drive initial bookings, and accelerate inventory absorption in under 60 days.",
    features: [
      "Pre-launch teaser & digital hype funnels",
      "3D architectural renders & virtual walkthroughs",
      "High-converting project landing page ecosystems",
      "Omnichannel buyer acquisition (Meta, Google, YouTube)",
    ],
    yield: "Result: 70%+ Inventory Absorption",
  },
  {
    id: "agency",
    title: "Real Estate Agency & Broker Scaling",
    tag: "For Agencies & Channel Partners",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    desc: "Turn your real estate agency into an automated inbound lead powerhouse. We build localized acquisition funnels that keep your agents closing high-ticket deals.",
    features: [
      "Inbound buyer & seller lead generation",
      "Instant 60-second automated WhatsApp connect",
      "Automated site-visit booking & calendar reminders",
      "Lead qualification playbooks for sales reps",
    ],
    yield: "Result: 3x Monthly Site Visits",
  },
  {
    id: "cp",
    title: "Channel Partner (CP) Network Systems",
    tag: "Broker Network Automation",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1000&auto=format&fit=crop",
    desc: "Build, manage, and scale a massive channel partner network with custom CP portals, automated commission trackers, and exclusive broker event marketing.",
    features: [
      "Custom Channel Partner login & asset portals",
      "Real-time lead mapping & transparent attribution",
      "Automated commission & slab milestone tracking",
      "CP engagement & broker meet event campaigns",
    ],
    yield: "Result: 500+ Active Brokers Onboarded",
  },
  {
    id: "nri",
    title: "High-Ticket NRI Investor Funnels",
    tag: "Global NRI Acquisition",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop",
    desc: "Target affluent overseas Indians in Dubai, US, UK, Singapore, and Canada with virtual 3D tour experiences and trust-building digital collateral.",
    features: [
      "High-intent international geo-targeting",
      "Virtual 3D immersive property tours & video walkthroughs",
      "NRI legal & repatriation objection-handling content",
      "High-converting WhatsApp Cloud API nurture",
    ],
    yield: "Result: 14.8x Average ROAS",
  },
  {
    id: "proptech",
    title: "PropTech Web Portals & 3D Tech",
    tag: "Custom Digital Infrastructure",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    desc: "Bespoke Next.js real estate web platforms with interactive master plans, unit availability selectors, and lightning-fast mobile performance.",
    features: [
      "Interactive 3D unit selector & floorplan viewer",
      "Integrated mortgage & EMI calculators",
      "Direct WhatsApp & CRM lead capture hooks",
      "Sub-second page load speeds for maximum ad conversions",
    ],
    yield: "Result: 68% Higher Conversion Rate",
  },
  {
    id: "seo",
    title: "Local Territory Dominance SEO",
    tag: "Organic Buyer Pipeline",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    desc: "Dominate Google search results for micro-market keywords, project comparisons, and builder reviews in your target geographical territory.",
    features: [
      "Rank #1 for high-intent property buyer searches",
      "Google Business Profile & local map pack domination",
      "Project review & comparison pillar content",
      "Zero ongoing ad spend for organic buyer leads",
    ],
    yield: "Result: Zero-CAC Organic Pipeline",
  },
];

const defaultScalingProcess = [
  {
    num: "01",
    title: "Business & Funnel Audit",
    desc: "We analyze your current lead costs, sales conversion bottlenecks, broker network, and digital assets to identify growth leakages.",
  },
  {
    num: "02",
    title: "PropTech & Web Infrastructure",
    desc: "We build high-speed project discovery portals, 3D interactive unit viewers, and frictionless lead capture pages.",
  },
  {
    num: "03",
    title: "High-Ticket Lead Generation",
    desc: "We launch precision-targeted Meta, Google, and YouTube ad campaigns targeting verified homebuyers and high-net-worth investors.",
  },
  {
    num: "04",
    title: "Sales Automation & WhatsApp CRM",
    desc: "We implement 60-second automated WhatsApp response bots, instant calling triggers, and automated site-visit reminder cadences.",
  },
  {
    num: "05",
    title: "Channel Partner & Revenue Scale",
    desc: "We scale your monthly booking volume, optimize marketing CPA, and expand your active channel partner reach.",
  },
];

const defaultComparisonData = [
  {
    feature: "Industry Specialization",
    advisor: "100% Real Estate Domain Specialists: We understand project launches, RERA, CPs, and buyer psychology.",
    broker: "Generic Marketing Agencies: Handle restaurants, dentists, and e-commerce with zero real estate domain insight.",
  },
  {
    feature: "Lead Quality & Verification",
    advisor: "Multi-step qualification funnels filtering out casual clickers, delivering verified site-visit ready buyers.",
    broker: "Sends cheap, unqualified leads with invalid phone numbers that waste your sales team’s time.",
  },
  {
    feature: "Sales Automation & Nurturing",
    advisor: "Instant WhatsApp Cloud API integration, 60-second response triggers, and automated calendar scheduling.",
    broker: "Dumps raw spreadsheet leads that get cold after 4 hours of delay.",
  },
  {
    feature: "Channel Partner (CP) Strategy",
    advisor: "Dedicated broker portals, automated commission trackers, and CP incentive program marketing.",
    broker: "No channel partner systems or broker network capabilities.",
  },
  {
    feature: "PropTech Engineering",
    advisor: "Custom 3D virtual tour integrations, interactive unit selectors, and sub-second Next.js web portals.",
    broker: "Slow, bloated generic WordPress templates that leak 50%+ of paid ad traffic.",
  },
];

const defaultFaqs = [
  {
    q: "Do you sell properties or act as real estate brokers?",
    a: "No, we are NOT property brokers and we do not sell properties directly. We are a specialized Real Estate Business Growth Advisory & PropTech firm. We advise builders, developers, real estate agencies, and channel partners on how to build digital systems, generate high-quality leads, automate their sales funnels, and scale their real estate business revenue.",
  },
  {
    q: "How do you help real estate developers sell project inventory faster?",
    a: "We design complete Go-To-Market (GTM) launch strategies, build high-converting 3D project web portals, run hyper-targeted digital ad campaigns (Meta, Google, YouTube), and implement automated WhatsApp/CRM follow-up systems that turn cold inquiries into verified on-site visits and bookings.",
  },
  {
    q: "Can you help real estate agencies and brokers scale their lead generation?",
    a: "Yes! We help property agencies and channel partners build automated inbound lead funnels, setup localized SEO to rank #1 in their target territory, and automate lead qualification so agents only spend time closing high-ticket buyers.",
  },
  {
    q: "How quickly can we see an increase in qualified real estate leads?",
    a: "Once your PropTech landing infrastructure and performance campaigns are launched (typically within 7 to 14 days), qualified inbound inquiries and site-visit requests begin generating immediately.",
  },
  {
    q: "How do you prevent lead leakage in our sales team?",
    a: "We integrate automated CRM and WhatsApp Cloud API pipelines that connect with your leads within 60 seconds of form submission. Our automated nurture cadences, reminder sequences, and call routing ensure no buyer falls through the cracks.",
  },
  {
    q: "How do we get started with a business growth audit?",
    a: "Simply request a growth consultation below. Our senior real estate growth strategists will analyze your current sales funnels, CPA, and inventory targets to deliver a customized scaling roadmap.",
  },
];

const defaultStats = [
  { value: "150+", label: "Real Estate Businesses Scaled" },
  { value: "10x", label: "Average Lead Volume Growth" },
  { value: "₹2,500Cr+", label: "Project Sales Marketed" },
  { value: "45%", label: "Lower Cost Per Acquisition" },
];

export default function RealEstateCMS({ data, setData, saving, handleSubmit, addToast }) {
  const [activeTab, setActiveTab] = useState("hero");

  const rData = data.realEstateData || {};

  // Update deep nested field in realEstateData
  const updateRData = (section, field, value) => {
    setData((prev) => {
      const prevRData = prev.realEstateData || {};
      const sectionData = prevRData[section] || {};
      return {
        ...prev,
        realEstateData: {
          ...prevRData,
          [section]: {
            ...sectionData,
            [field]: value,
          },
        },
      };
    });
  };

  // Direct top-level fields
  const handleTopLevelChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  // Array item updater in realEstateData (handles fallback list seamlessly)
  const updateRDataArrayItem = (section, arrayField, index, itemField, value, fallbackList = []) => {
    setData((prev) => {
      const prevRData = prev.realEstateData || {};
      const sectionData = prevRData[section] || {};
      const baseArray = sectionData[arrayField] && sectionData[arrayField].length > 0
        ? sectionData[arrayField]
        : fallbackList;
      const currentArray = [...baseArray];
      currentArray[index] = { ...currentArray[index], [itemField]: value };
      return {
        ...prev,
        realEstateData: {
          ...prevRData,
          [section]: {
            ...sectionData,
            [arrayField]: currentArray,
          },
        },
      };
    });
  };

  // Direct array updater
  const updateDirectArrayItem = (arrayName, index, field, value, fallbackList = []) => {
    setData((prev) => {
      const prevRData = prev.realEstateData || {};
      const baseArray = prevRData[arrayName] && prevRData[arrayName].length > 0
        ? prevRData[arrayName]
        : fallbackList;
      const currentArray = [...baseArray];
      currentArray[index] = { ...currentArray[index], [field]: value };
      return {
        ...prev,
        realEstateData: {
          ...prevRData,
          [arrayName]: currentArray,
        },
      };
    });
  };

  // Robust Add Item to Array with smooth scroll & redirect into card
  const addArrayItemToSection = (section, arrayField, defaultItem, fallbackList = []) => {
    const cardDomId = `new-card-${Date.now()}`;
    const itemWithId = { ...defaultItem, _cardDomId: cardDomId };

    setData((prev) => {
      const prevRData = prev.realEstateData || {};
      const sectionData = prevRData[section] || {};
      const baseArray = sectionData[arrayField] && sectionData[arrayField].length > 0
        ? sectionData[arrayField]
        : fallbackList;
      const currentArray = [...baseArray, itemWithId];
      return {
        ...prev,
        realEstateData: {
          ...prevRData,
          [section]: {
            ...sectionData,
            [arrayField]: currentArray,
          },
        },
      };
    });

    if (addToast) addToast("New item card created! Scrolling to card...", "success");

    // Smooth scroll and visual glow redirection to the newly created card
    setTimeout(() => {
      const targetCard = document.getElementById(cardDomId) || document.querySelector(`[data-card-id="${cardDomId}"]`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.classList.add("ring-2", "ring-emerald-500", "shadow-emerald-500/20", "shadow-2xl");
        setTimeout(() => {
          targetCard.classList.remove("ring-2", "ring-emerald-500", "shadow-emerald-500/20", "shadow-2xl");
        }, 2200);
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
    }, 120);
  };

  // Remove Item from Array
  const removeArrayItemFromSection = (section, arrayField, index, fallbackList = []) => {
    setData((prev) => {
      const prevRData = prev.realEstateData || {};
      const sectionData = prevRData[section] || {};
      const baseArray = sectionData[arrayField] && sectionData[arrayField].length > 0
        ? sectionData[arrayField]
        : fallbackList;
      const currentArray = [...baseArray];
      currentArray.splice(index, 1);
      return {
        ...prev,
        realEstateData: {
          ...prevRData,
          [section]: {
            ...sectionData,
            [arrayField]: currentArray,
          },
        },
      };
    });
    if (addToast) addToast("Item removed.", "info");
  };

  // Handle generic Image Upload
  const handleUploadImage = async (e, onComplete) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("upload", file);
    if (addToast) addToast("Uploading image...", "info");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const responseData = await res.json();
      if (res.ok && responseData.url) {
        onComplete(responseData.url);
        if (addToast) addToast("Image uploaded successfully", "success");
      } else {
        throw new Error(responseData.error?.message || "Upload failed");
      }
    } catch (err) {
      if (addToast) addToast(err.message, "error");
    }
  };

  const tabs = [
    { id: "hero", label: "🚀 Hero Banner" },
    { id: "overview", label: "🏛️ Overview & Pillars" },
    { id: "verticals", label: "🏢 Growth Verticals" },
    { id: "metrics", label: "📊 Track Record & Simulator" },
    { id: "process", label: "📈 5-Stage Blueprint" },
    { id: "comparison", label: "⚖️ Comparison Matrix" },
    { id: "contact", label: "📞 Contact & Audit Form" },
    { id: "faqs", label: "❓ FAQs" },
    { id: "seo", label: "🔍 SEO & Meta" },
  ];

  const hero = rData.hero || {};
  const overview = rData.overview || {};
  const verticals = rData.verticals || {};
  const verticalsItems = (verticals.items && verticals.items.length > 0) ? verticals.items : defaultGrowthVerticals;
  const statsList = (rData.stats && rData.stats.length > 0) ? rData.stats : defaultStats;
  const process = rData.process || {};
  const processItems = (process.items && process.items.length > 0) ? process.items : defaultScalingProcess;
  const comparison = rData.comparison || {};
  const comparisonItems = (comparison.items && comparison.items.length > 0) ? comparison.items : defaultComparisonData;
  const contact = rData.contact || {};
  const faqs = rData.faqs || {};
  const faqsItems = (faqs.items && faqs.items.length > 0) ? faqs.items : defaultFaqs;

  return (
    <div className="space-y-6">
      
      {/* Real Estate Page Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-green-950/20 to-transparent border border-emerald-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Real Estate Management CMS
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                Live &amp; Dynamic
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              Manage every section, growth vertical, calculation metric, and lead form for <code className="text-emerald-400">/services/real-estate-advisory</code>.
            </p>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={saving} size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-900/30 transition-all font-semibold">
          <Save className="w-5 h-5 mr-2" /> {saving ? "Saving Changes..." : "Save Real Estate CMS"}
        </Button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 font-medium text-sm transition-colors whitespace-nowrap border-b-2 rounded-t-lg ${
              activeTab === tab.id
                ? "border-emerald-500 text-emerald-400 bg-emerald-950/20 font-bold"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Hero & Banner */}
      {activeTab === "hero" && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Hero Banner Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Specialization Badge Text"
                value={hero.badge || "Real Estate Growth & Scaling Advisory"}
                onChange={(e) => updateRData("hero", "badge", e.target.value)}
              />
              <FloatingInput
                label="Page / Service Title (Slug: real-estate-advisory)"
                value={data.title || "Real Estate Business Growth & Scaling Advisory"}
                onChange={(e) => handleTopLevelChange("title", e.target.value)}
              />
            </div>

            <FloatingInput
              label="Hero Headline Title (HTML / Highlight support)"
              value={hero.title || "Scale Your Real Estate Business with Strategic Growth & PropTech"}
              onChange={(e) => updateRData("hero", "title", e.target.value)}
            />

            <FloatingTextarea
              label="Hero Subtitle / Description"
              value={hero.subtitle || data.shortDesc || ""}
              onChange={(e) => {
                updateRData("hero", "subtitle", e.target.value);
                handleTopLevelChange("shortDesc", e.target.value);
              }}
              rows={3}
              rightElement={
                <AIAssistantButton
                  context="Real Estate Hero Subtitle"
                  field="shortDesc"
                  onGenerate={(v) => {
                    updateRData("hero", "subtitle", v);
                    handleTopLevelChange("shortDesc", v);
                  }}
                />
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingInput
                label="Primary Button Text"
                value={hero.primaryBtnText || "Request Growth Blueprint"}
                onChange={(e) => updateRData("hero", "primaryBtnText", e.target.value)}
              />
              <FloatingInput
                label="Secondary Button Text"
                value={hero.secondaryBtnText || "Explore Services"}
                onChange={(e) => updateRData("hero", "secondaryBtnText", e.target.value)}
              />
              <FloatingInput
                label="Calculator Button Text"
                value={hero.calcBtnText || "Growth Calculator"}
                onChange={(e) => updateRData("hero", "calcBtnText", e.target.value)}
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-foreground">Hero Background Banner Image</label>
              <div className="flex gap-4 items-center">
                {(hero.bgImage || data.breadcrumbImage) && (
                  <img
                    src={hero.bgImage || data.breadcrumbImage}
                    alt="Hero Preview"
                    className="w-48 h-24 object-cover rounded-xl shadow border border-border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleUploadImage(e, (url) => {
                      updateRData("hero", "bgImage", url);
                      handleTopLevelChange("breadcrumbImage", url);
                    })
                  }
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: Overview & Pillars */}
      {activeTab === "overview" && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Executive Overview &amp; Strategic Pillars</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Section Tag Label"
                value={overview.label || "OUR SCALING STRATEGY"}
                onChange={(e) => updateRData("overview", "label", e.target.value)}
              />
              <FloatingInput
                label="Overview Section Title"
                value={overview.title || "How We Scale Real Estate Enterprises"}
                onChange={(e) => updateRData("overview", "title", e.target.value)}
              />
            </div>

            <FloatingTextarea
              label="Overview Section Description"
              value={overview.desc || data.description || ""}
              onChange={(e) => {
                updateRData("overview", "desc", e.target.value);
                handleTopLevelChange("description", e.target.value);
              }}
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Floating Badge Title"
                value={overview.floatingBadgeTitle || "We Scale Real Estate Companies"}
                onChange={(e) => updateRData("overview", "floatingBadgeTitle", e.target.value)}
              />
              <FloatingInput
                label="Floating Badge Subtitle"
                value={overview.floatingBadgeText || "From project launch campaigns and PropTech web portals..."}
                onChange={(e) => updateRData("overview", "floatingBadgeText", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Overview Section Image</label>
              <div className="flex gap-4 items-center">
                {(overview.image || data.overviewImage) && (
                  <img
                    src={overview.image || data.overviewImage}
                    alt="Overview Preview"
                    className="w-32 h-24 object-cover rounded-xl shadow border border-border"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleUploadImage(e, (url) => {
                      updateRData("overview", "image", url);
                      handleTopLevelChange("overviewImage", url);
                    })
                  }
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                />
              </div>
            </div>

            {/* 3 Strategic Pillars */}
            <div className="pt-6 border-t border-border space-y-4">
              <div>
                <h3 className="text-base font-semibold text-white">Strategic Pillar Cards (Right Column)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">The 3 core strategic pillars displayed alongside the overview.</p>
              </div>
              <div className="space-y-6">
                {(overview.pillars || [
                  { icon: 'FaChartLine', title: 'High-Ticket Buyer & Investor Lead Generation', desc: 'We design high-converting Meta, Google Search, and YouTube ad campaigns targeting affluent homebuyers, NRI investors, and commercial buyers with verified purchasing power.' },
                  { icon: 'FaDesktop', title: 'High-Converting PropTech Web Portals & 3D Tech', desc: 'We build lightning-fast project landing pages, 3D interactive unit selectors, and virtual tour platforms that convert cold visitors into booked site visits.' },
                  { icon: 'FaCogs', title: 'Automated WhatsApp & Sales CRM Funnels', desc: 'Eliminate lead leakage with automated 60-second WhatsApp responses, instant sales executive call connects, and automated site-visit reminder cadences.' }
                ]).map((pillar, idx) => (
                  <div key={idx} className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] space-y-5">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Strategic Pillar #{idx + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingInput
                        label={`Pillar Title`}
                        placeholder="e.g. High-Ticket Buyer Lead Gen"
                        value={pillar.title || ""}
                        onChange={(e) => updateRDataArrayItem("overview", "pillars", idx, "title", e.target.value, overview.pillars)}
                      />
                      <FloatingInput
                        label="Icon Class / Name"
                        placeholder="e.g. FaChartLine, FaDesktop, FaCogs"
                        value={pillar.icon || "FaChartLine"}
                        onChange={(e) => updateRDataArrayItem("overview", "pillars", idx, "icon", e.target.value, overview.pillars)}
                      />
                    </div>
                    <FloatingTextarea
                      label="Description"
                      placeholder="Pillar description..."
                      value={pillar.desc || ""}
                      onChange={(e) => updateRDataArrayItem("overview", "pillars", idx, "desc", e.target.value, overview.pillars)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Growth Verticals */}
      {activeTab === "verticals" && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Specialist Growth Verticals</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Manage the core advisory verticals (GTM Strategy, Agency Scaling, CP Networks, NRI Funnels, PropTech, SEO).
              </p>
            </div>
            <Button
              type="button"
              onClick={() =>
                addArrayItemToSection(
                  "verticals",
                  "items",
                  {
                    id: `vertical-${Date.now()}`,
                    title: "",
                    tag: "",
                    image: "",
                    desc: "",
                    features: [],
                    yield: "",
                  },
                  defaultGrowthVerticals
                )
              }
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Growth Vertical
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-border">
              <FloatingInput
                label="Section Tag Label"
                value={verticals.label || "GROWTH SERVICES"}
                onChange={(e) => updateRData("verticals", "label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                value={verticals.title || "Tailored Solutions to Grow Your Real Estate Business"}
                onChange={(e) => updateRData("verticals", "title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                value={verticals.desc || "Whether you are a developer launching a ₹200Cr+ township..."}
                onChange={(e) => updateRData("verticals", "desc", e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {verticalsItems.map((vert, idx) => {
                const cardDomId = vert._cardDomId || `vertical-card-${vert.id || idx}`;
                return (
                  <div
                    key={idx}
                    id={cardDomId}
                    data-card-id={cardDomId}
                    className="p-6 md:p-7 border border-white/10 rounded-2xl bg-white/[0.02] space-y-6 transition-all duration-300 hover:border-emerald-500/30"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Vertical #{idx + 1} {vert.title ? `— ${vert.title}` : ""}
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeArrayItemFromSection("verticals", "items", idx, defaultGrowthVerticals)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FloatingInput
                        label={`Vertical Title`}
                        placeholder="e.g. Project Launch GTM Strategy"
                        value={vert.title || ""}
                        onChange={(e) => updateRDataArrayItem("verticals", "items", idx, "title", e.target.value, defaultGrowthVerticals)}
                      />
                      <FloatingInput
                        label="Target Audience Tag"
                        placeholder="e.g. For Builders & Developers"
                        value={vert.tag || ""}
                        onChange={(e) => updateRDataArrayItem("verticals", "items", idx, "tag", e.target.value, defaultGrowthVerticals)}
                      />
                      <FloatingInput
                        label="Result / Yield Metric"
                        placeholder="e.g. Result: 70%+ Inventory Absorption"
                        value={vert.yield || ""}
                        onChange={(e) => updateRDataArrayItem("verticals", "items", idx, "yield", e.target.value, defaultGrowthVerticals)}
                      />
                    </div>

                    <FloatingTextarea
                      label="Description"
                      placeholder="Write vertical description here..."
                      value={vert.desc || ""}
                      onChange={(e) => updateRDataArrayItem("verticals", "items", idx, "desc", e.target.value, defaultGrowthVerticals)}
                      rows={2}
                    />

                    {/* Features / Bullet Points */}
                    <FloatingTextarea
                      label="Bullet Features (One per line)"
                      placeholder="Enter each feature point on a new line..."
                      value={Array.isArray(vert.features) ? vert.features.join("\n") : vert.features || ""}
                      onChange={(e) => {
                        const lines = e.target.value.split("\n").filter((l) => l.trim().length > 0);
                        updateRDataArrayItem("verticals", "items", idx, "features", lines, defaultGrowthVerticals);
                      }}
                      rows={3}
                    />

                    {/* Card Image */}
                    <div className="flex gap-4 items-center pt-2">
                      {vert.image && (
                        <img
                          src={vert.image}
                          alt="Card Preview"
                          className="w-24 h-16 object-cover rounded-lg border border-border"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUploadImage(e, (url) => {
                            updateRDataArrayItem("verticals", "items", idx, "image", url, defaultGrowthVerticals);
                          })
                        }
                        className="file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Button for convenience */}
            <div className="pt-2 flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  addArrayItemToSection(
                    "verticals",
                    "items",
                    {
                      id: `vertical-${Date.now()}`,
                      title: "",
                      tag: "",
                      image: "",
                      desc: "",
                      features: [],
                      yield: "",
                    },
                    defaultGrowthVerticals
                  )
                }
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another Growth Vertical
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Calculator & 4-Column Track Record Metrics */}
      {activeTab === "metrics" && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>4-Column Track Record Metrics (Bottom of Calculator)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-slate-400">
              Configure the 4 large track-record metrics displayed at the bottom of the Growth &amp; Revenue Simulator.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {statsList.map((st, idx) => (
                <div key={idx} className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] space-y-4">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Metric #{idx + 1}</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Value"
                      placeholder="e.g. 150+, ₹2,500Cr+"
                      value={st.value || ""}
                      onChange={(e) => updateDirectArrayItem("stats", idx, "value", e.target.value, defaultStats)}
                    />
                    <FloatingInput
                      label="Label Description"
                      placeholder="e.g. Businesses Scaled"
                      value={st.label || ""}
                      onChange={(e) => updateDirectArrayItem("stats", idx, "label", e.target.value, defaultStats)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 5: 5-Stage Blueprint */}
      {activeTab === "process" && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>5-Stage Scaling Methodology</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                The step-by-step roadmap for builders and real estate agencies.
              </p>
            </div>
            <Button
              type="button"
              onClick={() =>
                addArrayItemToSection(
                  "process",
                  "items",
                  {
                    num: `0${processItems.length + 1}`,
                    title: "",
                    desc: "",
                  },
                  defaultScalingProcess
                )
              }
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Step
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-border">
              <FloatingInput
                label="Section Tag Label"
                value={process.label || "OUR BLUEPRINT"}
                onChange={(e) => updateRData("process", "label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                value={process.title || "The 5-Stage Business Scaling Framework"}
                onChange={(e) => updateRData("process", "title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                value={process.desc || "Our battle-tested roadmap for real estate builders and agencies..."}
                onChange={(e) => updateRData("process", "desc", e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {processItems.map((step, idx) => {
                const cardDomId = step._cardDomId || `process-step-card-${idx}`;
                return (
                  <div
                    key={idx}
                    id={cardDomId}
                    data-card-id={cardDomId}
                    className="p-6 md:p-7 border border-white/10 rounded-2xl bg-white/[0.02] space-y-6 transition-all duration-300 hover:border-emerald-500/30"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Step #{idx + 1} {step.title ? `— ${step.title}` : ""}
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeArrayItemFromSection("process", "items", idx, defaultScalingProcess)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <FloatingInput
                          label="Step Number"
                          placeholder="e.g. 01"
                          value={step.num || `0${idx + 1}`}
                          onChange={(e) => updateRDataArrayItem("process", "items", idx, "num", e.target.value, defaultScalingProcess)}
                        />
                      </div>
                      <div className="md:col-span-3">
                        <FloatingInput
                          label="Step Title"
                          placeholder="Enter phase title..."
                          value={step.title || ""}
                          onChange={(e) => updateRDataArrayItem("process", "items", idx, "title", e.target.value, defaultScalingProcess)}
                        />
                      </div>
                    </div>

                    <FloatingTextarea
                      label="Description"
                      placeholder="Enter phase description..."
                      value={step.desc || ""}
                      onChange={(e) => updateRDataArrayItem("process", "items", idx, "desc", e.target.value, defaultScalingProcess)}
                      rows={2}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Step Button */}
            <div className="pt-2 flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  addArrayItemToSection(
                    "process",
                    "items",
                    {
                      num: `0${processItems.length + 1}`,
                      title: "",
                      desc: "",
                    },
                    defaultScalingProcess
                  )
                }
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 6: Comparison Matrix */}
      {activeTab === "comparison" && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Comparison Matrix (Specialists vs Generic Agencies)</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Showcase WebTycoons real estate domain expertise against generic digital agencies.
              </p>
            </div>
            <Button
              type="button"
              onClick={() =>
                addArrayItemToSection(
                  "comparison",
                  "items",
                  {
                    feature: "",
                    advisor: "",
                    broker: "",
                  },
                  defaultComparisonData
                )
              }
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Comparison Row
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-border">
              <FloatingInput
                label="Section Tag Label"
                value={comparison.label || "WHY BUILDERS & AGENCIES CHOOSE US"}
                onChange={(e) => updateRData("comparison", "label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                value={comparison.title || "Real Estate Specialists vs. Generic Agencies"}
                onChange={(e) => updateRData("comparison", "title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                value={comparison.desc || "Why standard digital marketing agencies fail in real estate..."}
                onChange={(e) => updateRData("comparison", "desc", e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {comparisonItems.map((row, idx) => {
                const cardDomId = row._cardDomId || `comparison-row-card-${idx}`;
                return (
                  <div
                    key={idx}
                    id={cardDomId}
                    data-card-id={cardDomId}
                    className="p-6 md:p-7 border border-white/10 rounded-2xl bg-white/[0.02] space-y-6 transition-all duration-300 hover:border-emerald-500/30"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Comparison Row #{idx + 1} {row.feature ? `— ${row.feature}` : ""}
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeArrayItemFromSection("comparison", "items", idx, defaultComparisonData)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <FloatingInput
                      label="Key Capability / Feature"
                      placeholder="e.g. Lead Quality & Verification"
                      value={row.feature || ""}
                      onChange={(e) => updateRDataArrayItem("comparison", "items", idx, "feature", e.target.value, defaultComparisonData)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FloatingTextarea
                        label="✨ WebTycoons Real Estate Advantage"
                        placeholder="Describe our advantage..."
                        value={row.advisor || ""}
                        onChange={(e) => updateRDataArrayItem("comparison", "items", idx, "advisor", e.target.value, defaultComparisonData)}
                        rows={2}
                      />
                      <FloatingTextarea
                        label="Generic Digital Agency Limitation"
                        placeholder="Describe generic agency drawback..."
                        value={row.broker || ""}
                        onChange={(e) => updateRDataArrayItem("comparison", "items", idx, "broker", e.target.value, defaultComparisonData)}
                        rows={2}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Row Button */}
            <div className="pt-2 flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  addArrayItemToSection(
                    "comparison",
                    "items",
                    {
                      feature: "",
                      advisor: "",
                      broker: "",
                    },
                    defaultComparisonData
                  )
                }
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another Comparison Row
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 7: Contact & Consultation */}
      {activeTab === "contact" && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Growth Consultation &amp; Lead Capture Cards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingInput
                label="Section Tag Label"
                value={contact.label || "GROWTH AUDIT"}
                onChange={(e) => updateRData("contact", "label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                value={contact.title || "Ready to Scale Your Real Estate Business?"}
                onChange={(e) => updateRData("contact", "title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                value={contact.desc || "Book a strategic discovery call with our senior real estate growth strategists..."}
                onChange={(e) => updateRData("contact", "desc", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Direct Advisory Phone"
                value={contact.phone || "+91 8527458950"}
                onChange={(e) => updateRData("contact", "phone", e.target.value)}
              />
              <FloatingInput
                label="Advisory Email Address"
                value={contact.email || "info@thewebtycoons.com"}
                onChange={(e) => updateRData("contact", "email", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                label="Office Location Address"
                value={contact.location || "123, Digital Hub, Sector 18, Noida, UP — 201301"}
                onChange={(e) => updateRData("contact", "location", e.target.value)}
              />
              <FloatingInput
                label="Territories Served"
                value={contact.territories || "Delhi NCR, Mumbai, Bangalore, Dubai & Global NRIs"}
                onChange={(e) => updateRData("contact", "territories", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
              <FloatingInput
                label="Lead Form Card Title"
                value={contact.formTitle || "Request Real Estate Growth Audit"}
                onChange={(e) => updateRData("contact", "formTitle", e.target.value)}
              />
              <FloatingInput
                label="Lead Form Card Subtitle"
                value={contact.formSubtitle || "Fill out the form below and we will prepare a tailored scaling blueprint for your firm."}
                onChange={(e) => updateRData("contact", "formSubtitle", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 8: FAQs */}
      {activeTab === "faqs" && (
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Frequently Asked Questions (Real Estate)</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Manage objection-handling and clear answers for builders, developers, and brokers.
              </p>
            </div>
            <Button
              type="button"
              onClick={() =>
                addArrayItemToSection(
                  "faqs",
                  "items",
                  {
                    q: "",
                    a: "",
                  },
                  defaultFaqs
                )
              }
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-sm"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" /> Add FAQ
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-border">
              <FloatingInput
                label="Section Tag Label"
                value={faqs.label || "CLEAR ANSWERS"}
                onChange={(e) => updateRData("faqs", "label", e.target.value)}
              />
              <FloatingInput
                label="Section Title"
                value={faqs.title || "Frequently Asked Questions"}
                onChange={(e) => updateRData("faqs", "title", e.target.value)}
              />
              <FloatingInput
                label="Section Description"
                value={faqs.desc || "Understand how our growth advisory, PropTech digital infrastructure..."}
                onChange={(e) => updateRData("faqs", "desc", e.target.value)}
              />
            </div>

            <div className="space-y-6">
              {faqsItems.map((faq, idx) => {
                const cardDomId = faq._cardDomId || `faq-card-${idx}`;
                return (
                  <div
                    key={idx}
                    id={cardDomId}
                    data-card-id={cardDomId}
                    className="p-6 md:p-7 border border-white/10 rounded-2xl bg-white/[0.02] space-y-6 transition-all duration-300 hover:border-emerald-500/30"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          FAQ #{idx + 1} {faq.q ? `— ${faq.q}` : ""}
                        </span>
                      </div>
                      <Button
                        type="button"
                        onClick={() => removeArrayItemFromSection("faqs", "items", idx, defaultFaqs)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-3 rounded-lg flex items-center gap-1.5 text-xs font-medium"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </Button>
                    </div>

                    <FloatingInput
                      label={`Question`}
                      placeholder="Enter question..."
                      value={faq.q || ""}
                      onChange={(e) => updateRDataArrayItem("faqs", "items", idx, "q", e.target.value, defaultFaqs)}
                    />
                    <FloatingTextarea
                      label="Answer"
                      placeholder="Enter answer..."
                      value={faq.a || ""}
                      onChange={(e) => updateRDataArrayItem("faqs", "items", idx, "a", e.target.value, defaultFaqs)}
                      rows={3}
                    />
                  </div>
                );
              })}
            </div>

            {/* Bottom Add FAQ Button */}
            <div className="pt-2 flex justify-center">
              <Button
                type="button"
                onClick={() =>
                  addArrayItemToSection(
                    "faqs",
                    "items",
                    {
                      q: "",
                      a: "",
                    },
                    defaultFaqs
                  )
                }
                className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-medium"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Another FAQ
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 9: SEO & Meta */}
      {activeTab === "seo" && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Search Engine Optimization (SEO)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FloatingInput
              label="Meta Title Tag"
              value={data.metaTitle || "Real Estate Business Growth & Scaling Advisory | WebTycoons"}
              onChange={(e) => handleTopLevelChange("metaTitle", e.target.value)}
            />
            <FloatingTextarea
              label="Meta Description"
              value={data.metaDescription || "Scale your real estate enterprise with B2B business growth advisory, high-ticket buyer funnels, PropTech 3D portals, and automated WhatsApp CRM."}
              onChange={(e) => handleTopLevelChange("metaDescription", e.target.value)}
              rows={3}
              rightElement={
                <AIAssistantButton
                  context="Real Estate Meta Description"
                  field="metaDescription"
                  onGenerate={(v) => handleTopLevelChange("metaDescription", v)}
                />
              }
            />
            <FloatingInput
              label="Canonical URL"
              value={data.canonicalUrl || "https://thewebtycoons.com/services/real-estate-advisory"}
              onChange={(e) => handleTopLevelChange("canonicalUrl", e.target.value)}
            />
          </CardContent>
        </Card>
      )}

    </div>
  );
}
