"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function LenisGSAPSync() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    // 1. Connect Lenis scroll updates directly to GSAP ScrollTrigger
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    // 2. Drive Lenis's raf loop through GSAP's ticker (exact 60/120fps unified animation frame)
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);

    // 3. Disable lag smoothing to prevent desync and micro-stutters during scrolling
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(updateTicker);
    };
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
      window.dispatchEvent(new Event("resize"));
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroller({ children }) {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        duration: 1.1,
        // Exponential ease-out: immediate responsive start (no sluggish lag) + velvety smooth deceleration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        autoResize: true,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}
