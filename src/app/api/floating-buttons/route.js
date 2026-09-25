import { revalidatePath } from "next/cache";
export const dynamic = 'force-dynamic';
import { connectDB } from "../../lib/config";
import GlobalSetting from "../../models/GlobalSetting";

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

const DEFAULT_CONFIG = {
  isEnabled: true,
  position: 'right',
  bottomOffset: 24,
  sideOffset: 20,
  buttonSize: 44,
  showTooltips: true,
  buttons: DEFAULT_BUTTONS
};

export async function GET() {
  try {
    await connectDB();
    let settings = await GlobalSetting.findOne().lean();
    if (!settings) {
      settings = await GlobalSetting.create({});
    }

    let floatingConfig = settings.floatingButtons;

    // If never configured or buttons array is empty, initialize with defaults
    if (!floatingConfig || !floatingConfig.buttons || floatingConfig.buttons.length === 0) {
      // If primaryPhone or socialLinks exist, seed values
      const initialButtons = DEFAULT_BUTTONS.map(btn => {
        if (btn.type === 'call' && settings.primaryPhone) {
          return { ...btn, value: settings.primaryPhone };
        }
        if (btn.type === 'whatsapp' && settings.primaryPhone) {
          return { ...btn, value: settings.primaryPhone };
        }
        if (btn.type === 'linkedin' && settings.socialLinks?.length) {
          const li = settings.socialLinks.find(s => s.platform?.toLowerCase() === 'linkedin');
          if (li?.url) return { ...btn, value: li.url };
        }
        return btn;
      });

      floatingConfig = {
        ...DEFAULT_CONFIG,
        buttons: initialButtons
      };
    }

    return Response.json({ success: true, data: floatingConfig });
  } catch (error) {
    console.error("GET /api/floating-buttons error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    let settings = await GlobalSetting.findOne();
    if (!settings) {
      settings = new GlobalSetting();
    }

    settings.floatingButtons = {
      isEnabled: body.isEnabled !== undefined ? Boolean(body.isEnabled) : true,
      position: body.position === 'left' ? 'left' : 'right',
      bottomOffset: Number(body.bottomOffset) || 24,
      sideOffset: Number(body.sideOffset) || 20,
      buttonSize: Number(body.buttonSize) || 44,
      showTooltips: body.showTooltips !== undefined ? Boolean(body.showTooltips) : true,
      buttons: Array.isArray(body.buttons) ? body.buttons : DEFAULT_BUTTONS
    };

    await settings.save();

    // Revalidate public layouts
    try {
      revalidatePath('/', 'layout');
    } catch (e) {
      console.warn("Revalidation warning:", e);
    }

    return Response.json({
      success: true,
      message: "Floating contact buttons updated successfully",
      data: settings.floatingButtons
    });
  } catch (error) {
    console.error("PUT /api/floating-buttons error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
