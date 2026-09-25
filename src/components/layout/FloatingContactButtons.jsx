"use client";

import { useEffect, useState, useMemo } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Helper to render icon by name
function RenderButtonIcon({ iconName, size = 18 }) {
  switch (iconName?.toLowerCase()) {
    case 'phone':
    case 'call':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={size + 2} height={size + 2} viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={size - 2} height={size - 2} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      );
    case 'arrow_up':
    case 'scroll_top':
    case 'top':
      return <FaArrowUp size={size - 2} />;
    case 'mail':
    case 'email':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case 'telegram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.83.942z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg width={size - 2} height={size - 2} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
  }
}

export default function FloatingContactButtons({ config, phoneNumber, socialLinks = [] }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Read config settings with graceful fallbacks
  const isEnabled = config?.isEnabled !== undefined ? config.isEnabled : true;
  const position = config?.position === 'left' ? 'left' : 'right';
  const bottomOffset = Number(config?.bottomOffset) || 24;
  const sideOffset = Number(config?.sideOffset) || 20;
  const buttonSize = Number(config?.buttonSize) || 44;
  const showTooltips = config?.showTooltips !== undefined ? config.showTooltips : true;

  // Build the list of active buttons
  const buttons = useMemo(() => {
    if (config?.buttons && Array.isArray(config.buttons) && config.buttons.length > 0) {
      return [...config.buttons]
        .filter(b => b.isEnabled !== false)
        .sort((a, b) => (Number(a.sort) || 0) - (Number(b.sort) || 0));
    }

    // Default fallback buttons if config is not configured yet
    const rawPhone = phoneNumber || '+91 8527458950';
    const liLink = socialLinks.find(s => s.platform?.toLowerCase() === 'linkedin' && s.isActive !== false);

    return [
      {
        id: 'call',
        type: 'call',
        label: 'Call Us',
        tooltip: 'Call Us',
        value: rawPhone,
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
        value: rawPhone,
        customMessage: '',
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
        value: liLink?.url || 'https://linkedin.com',
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
        color: '#52a436',
        hoverColor: '#3e8027',
        icon: 'arrow_up',
        isEnabled: true,
        openInNewTab: false,
        sort: 4
      }
    ];
  }, [config, phoneNumber, socialLinks]);

  // Find scroll threshold from the scroll_top button if present
  const scrollTopBtn = buttons.find(b => b.type === 'scroll_top');
  const scrollThreshold = Number(scrollTopBtn?.value) || 250;

  // Scroll detection for the scroll-to-top button
  useEffect(() => {
    if (!scrollTopBtn) return;
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTopBtn, scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // If globally disabled, render nothing
  if (!isEnabled || buttons.length === 0) return null;

  const springTransition = {
    type: "spring",
    stiffness: 350,
    damping: 28,
    mass: 0.8
  };

  return (
    <>
      <style>{`
        .floating-actions-stack {
          position: fixed;
          bottom: ${bottomOffset}px;
          ${position}: ${sideOffset}px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          pointer-events: auto;
        }
        @media (max-width: 600px) {
          .floating-actions-stack {
            bottom: ${Math.max(12, bottomOffset - 8)}px;
            ${position}: ${Math.max(10, sideOffset - 8)}px;
            gap: 8px;
          }
          .floating-action-btn {
            width: ${Math.max(36, buttonSize - 6)}px !important;
            height: ${Math.max(36, buttonSize - 6)}px !important;
          }
          .floating-tooltip {
            display: none !important;
          }
        }
        .floating-action-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: ${buttonSize}px;
          height: ${buttonSize}px;
          border-radius: 50%;
          color: #fff;
          border: none;
          outline: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          text-decoration: none;
          flex-shrink: 0;
          transition: background-color 0.2s ease, box-shadow 0.2s ease;
        }
        .floating-action-btn:hover {
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
        }
        .floating-tooltip {
          position: absolute;
          ${position === 'right' ? 'right: calc(100% + 12px);' : 'left: calc(100% + 12px);'}
          background-color: rgba(17, 24, 39, 0.95);
          backdrop-filter: blur(8px);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 6px;
          opacity: 0;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          transform: ${position === 'right' ? 'translateX(4px)' : 'translateX(-4px)'};
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .floating-action-btn:hover .floating-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>

      <div className="floating-actions-stack" data-testid="floating-actions-stack">
        {buttons.map((btn) => {
          // If this is the scroll-to-top button, wrap with AnimatePresence
          if (btn.type === 'scroll_top') {
            return (
              <AnimatePresence key={btn.id || 'scroll_top'}>
                {showScrollTop && (
                  <motion.button
                    layout
                    initial={{ opacity: 0, scale: 0.3, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.3, y: 20 }}
                    transition={{
                      layout: springTransition,
                      opacity: { duration: 0.25 },
                      scale: { duration: 0.25 },
                      y: { duration: 0.25, ease: "easeOut" }
                    }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={scrollToTop}
                    className="floating-action-btn"
                    style={{ backgroundColor: btn.color || '#52a436' }}
                    onMouseEnter={(e) => { if (btn.hoverColor) e.currentTarget.style.backgroundColor = btn.hoverColor; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = btn.color || '#52a436'; }}
                    aria-label={btn.tooltip || btn.label || "Scroll to top"}
                  >
                    {showTooltips && btn.tooltip && (
                      <span className="floating-tooltip">{btn.tooltip}</span>
                    )}
                    <RenderButtonIcon iconName={btn.icon || 'arrow_up'} size={Math.round(buttonSize * 0.42)} />
                  </motion.button>
                )}
              </AnimatePresence>
            );
          }

          // Compute target href for Call, WhatsApp, or general URL
          let href = btn.value || '#';
          if (btn.type === 'call') {
            const cleanPhone = (btn.value || phoneNumber || '').replace(/\s+/g, '');
            href = cleanPhone ? `tel:${cleanPhone}` : '#';
          } else if (btn.type === 'whatsapp') {
            const cleanDigits = (btn.value || phoneNumber || '').replace(/\D/g, '');
            if (cleanDigits) {
              const msg = btn.customMessage ? `?text=${encodeURIComponent(btn.customMessage)}` : '';
              href = `https://wa.me/${cleanDigits}${msg}`;
            } else {
              href = '#';
            }
          }

          const isExternal = btn.openInNewTab || btn.type === 'whatsapp' || btn.type === 'linkedin' || href.startsWith('http');

          return (
            <motion.a
              key={btn.id || btn.label}
              layout
              transition={springTransition}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="floating-action-btn"
              style={{ backgroundColor: btn.color || '#2563eb' }}
              onMouseEnter={(e) => { if (btn.hoverColor) e.currentTarget.style.backgroundColor = btn.hoverColor; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = btn.color || '#2563eb'; }}
              aria-label={btn.tooltip || btn.label || "Quick Action"}
            >
              {showTooltips && btn.tooltip && (
                <span className="floating-tooltip">{btn.tooltip}</span>
              )}
              <RenderButtonIcon iconName={btn.icon || btn.type} size={Math.round(buttonSize * 0.42)} />
            </motion.a>
          );
        })}
      </div>
    </>
  );
}
