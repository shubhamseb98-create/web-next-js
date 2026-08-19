import { useEffect, useState } from 'react'

/**
 * useScrolled — returns true when window has scrolled past `threshold` px.
 * Used by Header for the blur/sticky transition.
 */
export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

/**
 * useScrollProgress — returns 0..1 scroll progress for the whole page.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const h = document.documentElement
      const scrollTop = window.scrollY
      const scrollHeight = h.scrollHeight - h.clientHeight
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}
