'use client';
import { Dialog, DialogContent } from '../ui/dialog';
import { Trash2, AlertTriangle, Loader2, X } from 'lucide-react';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  message = 'Are you sure you want to delete this item? This action is permanent and cannot be undone.',
  isDeleting = false,
  confirmText = 'Delete',
  loadingText = 'Deleting…',
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <DialogContent
        hideClose={true}
        className="!p-0 !border-0 !bg-transparent !shadow-none !max-w-[420px] !outline-none"
        style={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
          padding: 0,
          maxWidth: 420,
          width: 'calc(100% - 32px)',
        }}
      >
        <div
          style={{
            backgroundColor: '#0e1610',
            background: 'linear-gradient(180deg, #121c15 0%, #0b120c 100%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '28px 24px 24px',
            boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top subtle highlight line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '15%',
              right: '15%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.6), transparent)',
            }}
          />

          {/* Close button */}
          <button
            type="button"
            disabled={isDeleting}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = '#ffffff';
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                e.currentTarget.style.color = '#94a3b8';
              }
            }}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header & Icon */}
          <div className="flex flex-col items-center text-center">
            {/* Elegant Icon Badge */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(239, 68, 68, 0.06) 100%)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                boxShadow: '0 8px 20px -4px rgba(239, 68, 68, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ef4444',
                marginBottom: '16px',
              }}
            >
              <Trash2 className="w-6 h-6" />
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 8px 0',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </h3>

            {/* Message */}
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#94a3b8',
                margin: '0 0 16px 0',
                maxWidth: '320px',
              }}
            >
              {message}
            </p>

            {/* Subtle Warning Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#f87171',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>This action cannot be reversed</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              disabled={isDeleting}
              onClick={onClose}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#cbd5e1',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = '#cbd5e1';
                }
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isDeleting}
              onClick={onConfirm}
              style={{
                flex: 1,
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                border: 'none',
                cursor: isDeleting ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                opacity: isDeleting ? 0.7 : 1,
                boxShadow: '0 4px 16px rgba(220, 38, 38, 0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.55)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDeleting) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(220, 38, 38, 0.4)';
                }
              }}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{loadingText}</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>{confirmText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
