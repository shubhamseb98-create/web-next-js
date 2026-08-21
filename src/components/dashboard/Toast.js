'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, AlertTriangle, Info } from 'lucide-react';
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
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={cn(
              "pointer-events-auto px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-bold flex items-center gap-3"
            )}
            style={{
              backgroundColor: 
                t.type === 'success' ? '#52a436' : 
                (t.type === 'error' || t.type === 'danger') ? '#dc2626' : 
                t.type === 'warning' ? '#eab308' : '#3b82f6'
            }}
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
               {t.type === 'success' && <Check className="w-3 h-3" />}
               {(t.type === 'error' || t.type === 'danger') && <Plus className="w-3 h-3 rotate-45" />}
               {t.type === 'warning' && <AlertTriangle className="w-3 h-3" />}
               {(!t.type || t.type === 'info') && <Info className="w-3 h-3" />}
            </div>
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
