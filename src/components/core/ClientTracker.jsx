'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public routes (ignore dashboard / admin routes to avoid skewed analytics)
    if (pathname && !pathname.startsWith('/dashboard') && !pathname.startsWith('/login')) {
      let sessionId = sessionStorage.getItem('jindal_session_id');
      
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, sessionId })
      })
      .then(async res => {
        if (!res.ok) return null;
        const ct = res.headers.get('content-type');
        if (ct && ct.includes('application/json')) {
          return res.json();
        }
        return null;
      })
      .then(data => {
        if (data?.success && data?.sessionId) {
          sessionStorage.setItem('jindal_session_id', data.sessionId);
        }
      })
      .catch(() => {});
    }
  }, [pathname]);

  return null;
}
