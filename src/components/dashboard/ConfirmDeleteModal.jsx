'use client'
import { useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
} from '../ui/dialog'

/* ── tiny keyframe injection (runs once) ─────────────────────────── */
const STYLE_ID = 'cdm-keyframes'
function injectStyles() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    @keyframes cdm-backdrop-in  { from { opacity:0 } to { opacity:1 } }
    @keyframes cdm-card-in {
      0%   { opacity:0; transform:scale(0.72) translateY(32px) }
      60%  { opacity:1; transform:scale(1.03) translateY(-4px) }
      80%  { transform:scale(0.98) translateY(2px) }
      100% { transform:scale(1) translateY(0) }
    }
    @keyframes cdm-icon-pop {
      0%   { transform:scale(0) rotate(-30deg); opacity:0 }
      55%  { transform:scale(1.25) rotate(8deg); opacity:1 }
      75%  { transform:scale(0.9) rotate(-4deg) }
      100% { transform:scale(1) rotate(0deg) }
    }
    @keyframes cdm-ring-pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.55), 0 0 0 0 rgba(239,68,68,0.25) }
      50%      { box-shadow: 0 0 0 12px rgba(239,68,68,0.18), 0 0 0 24px rgba(239,68,68,0.06) }
    }
    @keyframes cdm-particle {
      0%   { opacity:1; transform:translate(0,0) scale(1) }
      100% { opacity:0; transform:translate(var(--tx),var(--ty)) scale(0) }
    }
    @keyframes cdm-shake {
      0%,100% { transform:translateX(0) }
      20%      { transform:translateX(-5px) }
      40%      { transform:translateX(5px) }
      60%      { transform:translateX(-3px) }
      80%      { transform:translateX(3px) }
    }
    @keyframes cdm-btn-shine {
      0%   { left:-100% }
      100% { left:200% }
    }
    @keyframes cdm-scanline {
      0%   { background-position:0 0 }
      100% { background-position:0 100px }
    }
    @keyframes cdm-glow-pulse {
      0%,100% { opacity:0.5 }
      50%      { opacity:1 }
    }
    @keyframes spin {
      from { transform: rotate(0deg) }
      to   { transform: rotate(360deg) }
    }
  `
  document.head.appendChild(s)
}

/* ── Particle component ──────────────────────────────────────────── */
function Particles({ active }) {
  const COUNT = 10
  const items = Array.from({ length: COUNT }, (_, i) => {
    const angle = (i / COUNT) * 360
    const dist  = 38 + Math.random() * 22
    const tx = `${Math.cos((angle * Math.PI) / 180) * dist}px`
    const ty = `${Math.sin((angle * Math.PI) / 180) * dist}px`
    const colors = ['#ef4444','#f87171','#fca5a5','#fbbf24','#fb923c']
    const color  = colors[i % colors.length]
    const size   = 4 + Math.random() * 4
    return { tx, ty, color, size, delay: Math.random() * 0.15 }
  })

  if (!active) return null
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:10 }}>
      {items.map((p, i) => (
        <div
          key={i}
          style={{
            position:'absolute',
            top:'50%', left:'50%',
            width: p.size,
            height: p.size,
            marginTop: -p.size/2,
            marginLeft: -p.size/2,
            borderRadius:'50%',
            backgroundColor: p.color,
            '--tx': p.tx,
            '--ty': p.ty,
            animation: `cdm-particle 0.65s ease-out ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Main Modal ──────────────────────────────────────────────────── */
export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title     = 'Confirm Deletion',
  message   = 'Are you sure you want to delete this record? This action cannot be undone.',
  isDeleting = false,
  confirmText = 'Delete',
  loadingText = 'Deleting…',
}) {
  const mounted = useRef(false)

  useEffect(() => { injectStyles() }, [])

  /* re-trigger icon animation each open */
  useEffect(() => {
    if (isOpen) mounted.current = true
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && !isDeleting && onClose()}>
      <DialogContent
        /* suppress default shadcn animation classes */
        className=""
        style={{
          background:'transparent',
          border:'none',
          boxShadow:'none',
          padding:0,
          maxWidth:420,
          width:'calc(100% - 32px)',
        }}
      >
        {/* ── Card ── */}
        <div
          style={{
            position:'relative',
            background:'linear-gradient(145deg,#141820 0%,#0e1117 60%,#161c26 100%)',
            border:'1px solid rgba(239,68,68,0.22)',
            borderRadius:24,
            padding:'36px 32px 28px',
            overflow:'hidden',
            animation: isOpen ? 'cdm-card-in 0.52s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
            boxShadow:`
              0 0 0 1px rgba(239,68,68,0.08),
              0 32px 72px -12px rgba(0,0,0,0.85),
              0 0 80px -20px rgba(239,68,68,0.18)
            `,
          }}
        >
          {/* scanline texture */}
          <div style={{
            position:'absolute', inset:0, pointerEvents:'none', borderRadius:24,
            backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.013) 2px,rgba(255,255,255,0.013) 4px)',
            animation:'cdm-scanline 8s linear infinite',
          }} />

          {/* top edge danger glow */}
          <div style={{
            position:'absolute', top:0, left:'20%', right:'20%', height:1,
            background:'linear-gradient(90deg,transparent,rgba(239,68,68,0.7),transparent)',
            animation:'cdm-glow-pulse 2s ease-in-out infinite',
          }} />

          {/* ── Icon ── */}
          <div style={{ position:'relative', display:'flex', justifyContent:'center', marginBottom:24 }}>
            <Particles active={isOpen} />

            {/* outer pulsing ring */}
            <div style={{
              position:'absolute',
              width:72, height:72,
              borderRadius:'50%',
              background:'rgba(239,68,68,0.06)',
              animation:'cdm-ring-pulse 2.4s ease-in-out infinite',
            }} />

            {/* icon circle */}
            <div style={{
              position:'relative', zIndex:2,
              width:60, height:60,
              borderRadius:'50%',
              background:'linear-gradient(135deg,rgba(239,68,68,0.22) 0%,rgba(220,38,38,0.1) 100%)',
              border:'1.5px solid rgba(239,68,68,0.45)',
              display:'flex', alignItems:'center', justifyContent:'center',
              animation: isOpen ? 'cdm-icon-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.1s both' : 'none',
              boxShadow:'0 0 24px rgba(239,68,68,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}>
              {/* trash icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#tdg)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="tdg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171"/>
                    <stop offset="100%" stopColor="#ef4444"/>
                  </linearGradient>
                </defs>
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </div>
          </div>

          {/* ── Text ── */}
          <div style={{ textAlign:'center', marginBottom:28 }}>
            <h2 style={{
              margin:'0 0 10px',
              fontSize:20,
              fontWeight:700,
              letterSpacing:'-0.3px',
              color:'#f1f5f9',
              lineHeight:1.3,
            }}>
              {title}
            </h2>
            <p style={{
              margin:0,
              fontSize:13.5,
              lineHeight:1.65,
              color:'rgba(148,163,184,0.85)',
              maxWidth:300,
              marginInline:'auto',
            }}>
              {message}
            </p>
          </div>

          {/* danger strip */}
          <div style={{
            display:'flex', alignItems:'center', gap:8,
            background:'rgba(239,68,68,0.08)',
            border:'1px solid rgba(239,68,68,0.18)',
            borderRadius:10, padding:'8px 14px',
            marginBottom:24,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span style={{ fontSize:11.5, color:'#f87171', fontWeight:600, letterSpacing:'0.2px' }}>
              This action is permanent and cannot be reversed.
            </span>
          </div>

          {/* ── Buttons ── */}
          <div style={{ display:'flex', gap:12 }}>
            {/* Cancel */}
            <button
              type="button"
              disabled={isDeleting}
              onClick={onClose}
              style={{
                flex:1,
                height:46,
                borderRadius:12,
                border:'1px solid rgba(255,255,255,0.1)',
                background:'rgba(255,255,255,0.04)',
                color:'#94a3b8',
                fontSize:14,
                fontWeight:600,
                cursor:isDeleting ? 'not-allowed' : 'pointer',
                transition:'all 0.2s',
                letterSpacing:'0.2px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#e2e8f0' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.color='#94a3b8' }}
            >
              Cancel
            </button>

            {/* Delete */}
            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              style={{
                flex:1,
                height:46,
                borderRadius:12,
                border:'1px solid rgba(239,68,68,0.4)',
                background:'linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)',
                color:'white',
                fontSize:14,
                fontWeight:700,
                cursor:isDeleting ? 'not-allowed' : 'pointer',
                position:'relative',
                overflow:'hidden',
                transition:'all 0.2s',
                letterSpacing:'0.2px',
                boxShadow:'0 4px 20px rgba(239,68,68,0.35)',
                opacity: isDeleting ? 0.7 : 1,
              }}
              onMouseEnter={e => {
                if (!isDeleting) {
                  e.currentTarget.style.background='linear-gradient(135deg,#ef4444 0%,#dc2626 100%)'
                  e.currentTarget.style.boxShadow='0 6px 28px rgba(239,68,68,0.55)'
                  e.currentTarget.style.transform='translateY(-1px)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background='linear-gradient(135deg,#dc2626 0%,#b91c1c 100%)'
                e.currentTarget.style.boxShadow='0 4px 20px rgba(239,68,68,0.35)'
                e.currentTarget.style.transform='translateY(0)'
              }}
            >
              {/* shine sweep */}
              {!isDeleting && (
                <span style={{
                  position:'absolute', top:0, left:'-100%', width:'60%', height:'100%',
                  background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)',
                  animation:'cdm-btn-shine 2.8s ease-in-out infinite',
                  pointerEvents:'none',
                }} />
              )}

              {isDeleting ? (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                  <svg style={{ animation:'spin 0.8s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  {loadingText}
                </span>
              ) : (
                <span style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/>
                  </svg>
                  {confirmText}
                </span>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
