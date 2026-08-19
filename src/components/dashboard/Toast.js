'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function Toast({ toasts = [], onRemove }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    
    // If a new toast is added while one exists, dismiss the older ones
    if (toasts.length > 1) {
      toasts.slice(0, -1).forEach(t => onRemove(t.id));
      return;
    }

    const t = setTimeout(() => onRemove(toasts[0].id), 3000);
    return () => clearTimeout(t);
  }, [toasts, onRemove]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className={cn(
              "pointer-events-auto flex items-start justify-between gap-3 w-[350px] p-4 rounded-xl shadow-2xl border backdrop-blur-xl",
              t.type === 'success' && "bg-emerald-500/10 border-emerald-500/20 text-emerald-500",
              t.type === 'error' && "bg-rose-500/10 border-rose-500/20 text-rose-500",
              t.type === 'warning' && "bg-amber-500/10 border-amber-500/20 text-amber-500",
              (!t.type || t.type === 'default') && "bg-white/5 border-white/10 text-slate-200"
            )}
          >
            <div className="flex items-start gap-3 flex-1">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />}
              {t.type === 'error' && <XCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />}
              <p className="text-sm font-medium leading-relaxed">{t.message}</p>
            </div>
            <button
              onClick={() => onRemove(t.id)}
              className="text-current opacity-60 hover:opacity-100 transition-opacity focus:outline-none shrink-0 mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
