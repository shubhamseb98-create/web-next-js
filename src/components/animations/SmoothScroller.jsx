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
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Force layout recalculations after route change DOM updates
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.refresh();
      }
    }, 150);

    return () => clearTimeout(timer);
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
