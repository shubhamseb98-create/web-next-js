import mongoose from "mongoose";

const GlobalSettingSchema = new mongoose.Schema({
    // Branding
    logoImage: { type: String, default: "/images/logo.png" },
    adminLogo: { type: String, default: "/logo.png" },
    favicon: { type: String, default: "/favicon.ico" },
    adminTitle: { type: String, default: "The WebTycoons" },
    footerDescription: { 
        type: String, 
        default: "Leading manufacturer and supplier of high-quality metal products delivering excellence and innovation." 
    },

    // Contact Info
    primaryEmail: { type: String, default: "info@webtycoonss.com" },
    primaryPhone: { type: String, default: "+91 93235 82341" },
    footerPhone: { type: String, default: "+91 98765 43210" },
    address: { type: String, default: "New Delhi, India" },

    // Brochures
    pdf1Text: { type: String, default: "Stainless steel BROCHURE" },
    pdf1Url: { type: String, default: "/pdf/company-profile.pdf" },
    
    pdf2Text: { type: String, default: "High Carbon & H & T BROCHURE" },
    pdf2Url: { type: String, default: "#" },

    // Dynamic Social Media Links
    socialLinks: {
        type: [{
            platform: String,
            url: String,
            icon: String,
            isActive: { type: Boolean, default: true }
        }],
        default: [
            { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'bi-linkedin' },
            { platform: 'Facebook', url: 'https://facebook.com', icon: 'bi-facebook' },
            { platform: 'Twitter', url: 'https://x.com', icon: 'bi-twitter-x' },
            { platform: 'Instagram', url: 'https://instagram.com', icon: 'bi-instagram' }
        ]
    },

    // Maintenance Mode
    isMaintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: { type: String, default: "We are currently undergoing scheduled maintenance. Please check back soon." },
    emergencyShutdown: { type: Boolean, default: false },

    // Integrations
    googleAnalyticsId: { type: String, default: "" },
    googleTagManagerId: { type: String, default: "" },
    googleSearchConsoleKey: { type: String, default: "" },

    // Custom Code Injection
    customHeadCode: { type: String, default: "" },
    customBodyCode: { type: String, default: "" },

    // SEO — Robots.txt
    robotsTxt: { type: String, default: "User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml" },

    // AI Settings - Multi-provider with fallback
    geminiApiKey: { type: String, default: "" },
    openRouterApiKey: { type: String, default: "" },
    groqApiKey: { type: String, default: "" },
    cerebrasApiKey: { type: String, default: "" },
    aiProviderSequence: { type: String, default: "groq,cerebras,openrouter,gemini" },
    preferredAiProvider: { type: String, default: "auto" }, // "auto" | "openrouter" | "groq" | "cerebras" | "gemini"

    // Floating Contact & Quick Action Buttons Management
    floatingButtons: {
        isEnabled: { type: Boolean, default: true },
        position: { type: String, enum: ['right', 'left'], default: 'right' },
        bottomOffset: { type: Number, default: 24 },
        sideOffset: { type: Number, default: 20 },
        buttonSize: { type: Number, default: 44 },
        showTooltips: { type: Boolean, default: true },
        buttons: {
            type: [{
                id: { type: String },
                type: { type: String, default: 'custom' }, // 'call', 'whatsapp', 'linkedin', 'scroll_top', 'custom'
                label: { type: String, default: '' },
                tooltip: { type: String, default: '' },
                value: { type: String, default: '' },
                customMessage: { type: String, default: '' },
                color: { type: String, default: '#2563eb' },
                hoverColor: { type: String, default: '#1d4ed8' },
                icon: { type: String, default: 'phone' },
                isEnabled: { type: Boolean, default: true },
                openInNewTab: { type: Boolean, default: false },
                sort: { type: Number, default: 0 }
            }],
            default: [
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
            ]
        }
    }
}, { timestamps: true });

// Force-delete any cached model to ensure schema changes are always picked up.
// This is safe in production (runs once on cold start) and fixes HMR caching in development.
if (mongoose.models['GlobalSetting']) {
    delete mongoose.models['GlobalSetting'];
}

export default mongoose.model("GlobalSetting", GlobalSettingSchema);

