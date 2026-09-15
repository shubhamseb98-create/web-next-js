"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function RouteChangeListener() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis && typeof window !== "undefined") {
      window.lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      return () => {
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis]);

  useEffect(() => {
    // Scroll to top immediately on navigation
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Single scheduled refresh after route settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    }, 250);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroller({ children }) {
  useEffect(() => {
    ScrollTrigger.refresh();
    gsap.ticker.lagSmoothing(0);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        wheelMultiplier: 1.15,
        touchMultiplier: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      <RouteChangeListener />
      {children}
    </ReactLenis>
  );
}
