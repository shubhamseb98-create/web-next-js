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
    }
  }, [lenis]);

  useEffect(() => {
    // Scroll to top
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Fire resize & scroll events at multiple intervals to catch all Swiper/GSAP recalculations.
    // This is necessary because Next.js App Router keeps components mounted across
    // navigations, so Swiper's cached dimensions can become stale.
    const timers = [50, 150, 350, 600].map(delay =>
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('scroll'));
      }, delay)
    );

    // Also refresh ScrollTrigger after a longer delay
    const stTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 700);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(stTimer);
    };
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroller({ children }) {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothTouch: false,
      }}
    >
      <RouteChangeListener />
      {children}
    </ReactLenis>
  );
}
