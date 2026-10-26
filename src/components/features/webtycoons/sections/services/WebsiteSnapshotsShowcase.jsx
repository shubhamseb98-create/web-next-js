'use client';
import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Eye, X, Lock, ArrowUpRight, ArrowDown } from 'lucide-react';
import styles from './WebsiteSnapshotsShowcase.module.css';

export const DEFAULT_SNAPSHOTS = [
  {
    id: 'snap-1',
    name: 'Corporate Agency Showcase',
    category: 'Creative Agency',
    tech: 'React • GSAP • Next.js',
    desc: 'Award-winning interactive digital experience with smooth scroll and dark mode.',
    image: '/assets/img/project/snapweb.png',
    link: 'https://corporateportfolio.com',
  },
  {
    id: 'snap-2',
    name: 'BLS World School Campus',
    category: 'Educational Portal',
    tech: 'Next.js • Tailwind • Node.js',
    desc: 'Multi-branch school portal with online admissions and parent management.',
    image: '/images/clients/snapshots/blsworldschool.jpg',
    link: 'https://blsworldschool.com',
  },
  {
    id: 'snap-3',
    name: 'Jindal Metals Enterprise',
    category: 'Corporate Enterprise',
    tech: 'React • Vite • GSAP',
    desc: 'Industrial manufacturing enterprise portal with dynamic product catalog.',
    image: '/images/clients/snapshots/iupjindal.jpg',
    link: 'https://iupjindal.com',
  },
];

/**
 * Compact & Modern Snapshot Card with Auto-Scroll on Hover
 */
function SnapshotCard({ snap, index, onEnlarge }) {
  const imgRef = useRef(null);
  const viewportRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [duration, setDuration] = useState(6);

  // Measure scrollable distance between image and compact viewport
  const measureScroll = useCallback(() => {
    if (imgRef.current && viewportRef.current) {
      const imgH = imgRef.current.offsetHeight || imgRef.current.naturalHeight || 0;
      const vpH = viewportRef.current.offsetHeight || 340;
      if (imgH > vpH + 10) {
        const diff = imgH - vpH;
        setScrollOffset(diff);
        setCanScroll(true);
        // Duration: smooth scroll speed ~260px per second, clamped 4s - 9s
        const calculatedDuration = Math.min(Math.max(diff / 260, 4), 9);
        setDuration(calculatedDuration);
      } else {
        setCanScroll(false);
        setScrollOffset(0);
      }
    }
  }, []);

  useEffect(() => {
    measureScroll();
    window.addEventListener('resize', measureScroll);
    return () => window.removeEventListener('resize', measureScroll);
  }, [measureScroll]);

  // Clean domain name for browser address bar mockup
  const displayDomain = useMemo(() => {
    try {
      if (snap.link && snap.link.startsWith('http')) {
        return new URL(snap.link).hostname;
      }
      return (snap.name || 'clientproject').toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';
    } catch {
      return 'clientproject.com';
    }
  }, [snap.link, snap.name]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={styles.snapshotCard}
      onMouseEnter={() => {
        measureScroll();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Compact Browser Header ── */}
      <div className={styles.browserHeader}>
        <div className={styles.browserDots}>
          <span className={`${styles.browserDot} ${styles.dotRed}`} />
          <span className={`${styles.browserDot} ${styles.dotYellow}`} />
          <span className={`${styles.browserDot} ${styles.dotGreen}`} />
        </div>

        <div className={styles.browserAddressBar} title={`https://${displayDomain}`}>
          <Lock className={styles.lockIcon} />
          <span className={styles.addressText}>{displayDomain}</span>
        </div>

        <div className={styles.browserMeta}>
          <span className={styles.liveIndicator}>
            <span className={styles.pulseDotSm} />
            <span>LIVE</span>
          </span>
          {snap.link && snap.link !== '#' && (
            <a
              href={snap.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.browserExtBtn}
              title="Open Website"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* ── Auto-Scrolling Viewport Window (Height: 340px) ── */}
      <div
        ref={viewportRef}
        className={styles.imageViewport}
        onClick={() => onEnlarge(snap)}
        title="Click to view full preview"
      >
        <img
          ref={imgRef}
          src={snap.image}
          alt={snap.name}
          className={styles.snapshotImage}
          loading="lazy"
          onLoad={measureScroll}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/clients/snapshots/blsworldschool.jpg';
          }}
          style={{
            transform: isHovered && canScroll ? `translateY(-${scrollOffset}px)` : 'translateY(0)',
            transition: isHovered
              ? `transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1)`
              : 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        />
      </div>

      {/* ── Clean Card Content ── */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeaderRow}>
          <span className={styles.categoryBadge}>{snap.category}</span>
          <span className={styles.techTagMini}>{snap.tech}</span>
        </div>

        <h3 className={styles.projectName}>{snap.name}</h3>
      </div>
    </motion.div>
  );
}

export default function WebsiteSnapshotsShowcase({ snapshots, serviceTitle }) {
  // Take strictly the top 3 cards as requested
  const items = useMemo(() => {
    if (Array.isArray(snapshots) && snapshots.length > 0) {
      return snapshots.slice(0, 3).map((s, idx) => ({
        id: s._id || s.id || `snapshot-${idx}`,
        name: s.name || s.title || `Project #${idx + 1}`,
        category: s.category || 'Website',
        tech: s.tech || 'Fullstack Web',
        desc: s.desc || s.description || 'Custom crafted web solution.',
        image: s.image || DEFAULT_SNAPSHOTS[idx % DEFAULT_SNAPSHOTS.length].image,
        link: s.link || '#',
      }));
    }
    return DEFAULT_SNAPSHOTS.slice(0, 3);
  }, [snapshots]);

  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  return (
    <section id="website-snapshots" className={styles.snapshotsSection}>
      <div className={styles.container}>
        {/* Compact Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.eyebrowBadge}>
            <span className={styles.pulseDot} />
            <span>INTERACTIVE SHOWCASE</span>
          </div>

          <h2 className={styles.sectionTitle}>
            Live <span className={styles.sectionTitleGradient}>Website Snapshots</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Hover over any preview to automatically scroll through the full webpage design.
          </p>
        </div>

        {/* Exactly 3 Compact Snapshot Cards Grid */}
        <div className={styles.snapshotsGrid}>
          {items.map((snap, idx) => (
            <SnapshotCard
              key={snap.id || idx}
              snap={snap}
              index={idx}
              onEnlarge={setSelectedSnapshot}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.lightboxBackdrop}
            onClick={() => setSelectedSnapshot(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className={styles.lightboxCard}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedSnapshot(null)}
                className={styles.lightboxCloseBtn}
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className={styles.lightboxImageWrapper}>
                <img
                  src={selectedSnapshot.image}
                  alt={selectedSnapshot.name}
                  className={styles.lightboxImage}
                />
              </div>

              <div className={styles.lightboxInfo}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <span className={styles.categoryBadge}>{selectedSnapshot.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1">{selectedSnapshot.name}</h3>
                  </div>

                  {selectedSnapshot.link && selectedSnapshot.link !== '#' && (
                    <a
                      href={selectedSnapshot.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs inline-flex items-center gap-1.5 transition-colors shadow-lg shadow-emerald-950/40"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {selectedSnapshot.desc && (
                  <p className="text-xs text-slate-300 leading-relaxed">{selectedSnapshot.desc}</p>
                )}

                {selectedSnapshot.tech && (
                  <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-400 font-mono">
                    <span className="text-emerald-400 font-semibold">Tech:</span>
                    <span>{selectedSnapshot.tech}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
