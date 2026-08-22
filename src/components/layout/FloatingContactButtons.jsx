"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContactButtons({ phoneNumber, socialLinks = [] }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Format phone number for WhatsApp
  const formattedForWhatsApp = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  const waUrl = formattedForWhatsApp ? `https://wa.me/${formattedForWhatsApp}` : '#';
  const callUrl = phoneNumber ? `tel:${phoneNumber.replace(/\s+/g, '')}` : '#';

  // Find LinkedIn URL from global settings or fallback
  const linkedInLink = socialLinks.find(link => link.platform?.toLowerCase() === 'linkedin' && link.isActive !== false);
  const linkedInUrl = linkedInLink?.url || 'https://linkedin.com';

  // Scroll detection for the 4th button (Scroll to top)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!phoneNumber) return null;

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
          bottom: 24px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          pointer-events: auto;
        }
        @media (max-width: 600px) {
          .floating-actions-stack {
            bottom: 16px;
            right: 12px;
            gap: 8px;
          }
          .floating-action-btn {
            width: 38px !important;
            height: 38px !important;
          }
          .floating-action-btn svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
        .floating-action-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          color: #fff;
          border: none;
          outline: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          text-decoration: none;
          flex-shrink: 0;
        }
        .floating-action-btn.call-btn {
          background-color: #2563eb;
        }
        .floating-action-btn.call-btn:hover {
          background-color: #1d4ed8;
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.45);
        }
        .floating-action-btn.wa-btn {
          background-color: #22c55e;
        }
        .floating-action-btn.wa-btn:hover {
          background-color: #16a34a;
          box-shadow: 0 6px 18px rgba(34, 197, 94, 0.45);
        }
        .floating-action-btn.li-btn {
          background-color: #0a66c2;
        }
        .floating-action-btn.li-btn:hover {
          background-color: #004182;
          box-shadow: 0 6px 18px rgba(10, 102, 194, 0.45);
        }
        .floating-action-btn.top-btn {
          background-color: var(--clr-primary, #52a436);
        }
        .floating-action-btn.top-btn:hover {
          background-color: var(--clr-primary-dark, #3e8027);
          box-shadow: 0 6px 18px rgba(82, 164, 54, 0.45);
        }
        .floating-tooltip {
          position: absolute;
          right: 56px;
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
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .floating-action-btn:hover .floating-tooltip {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 600px) {
          .floating-tooltip {
            display: none !important;
          }
        }
      `}</style>
      <div className="floating-actions-stack">
        {/* 1. Call Button */}
        <motion.a 
          layout
          transition={springTransition}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={callUrl} 
          className="floating-action-btn call-btn" 
          aria-label="Call Us"
        >
          <span className="floating-tooltip">Call Us</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </motion.a>

        {/* 2. WhatsApp Button */}
        <motion.a 
          layout
          transition={springTransition}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={waUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-action-btn wa-btn" 
          aria-label="Chat on WhatsApp"
        >
          <span className="floating-tooltip">WhatsApp</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </motion.a>

        {/* 3. LinkedIn Button */}
        <motion.a 
          layout
          transition={springTransition}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={linkedInUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="floating-action-btn li-btn" 
          aria-label="Visit our LinkedIn"
        >
          <span className="floating-tooltip">LinkedIn</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </motion.a>

        {/* 4. Scroll To Top Button (Smooth slide & scale in/out) */}
        <AnimatePresence>
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
              className="floating-action-btn top-btn" 
              aria-label="Scroll to top"
            >
              <span className="floating-tooltip">Top</span>
              <FaArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
