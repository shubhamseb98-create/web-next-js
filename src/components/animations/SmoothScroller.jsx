"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

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

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;

    // Handle hash navigation or scroll-to-top on route change
    if (typeof window !== "undefined") {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement, { offset: -90, duration: 1.2 });
        }
      } else {
        window.scrollTo(0, 0);
        lenis.scrollTo(0, { immediate: true });
      }
    }

    // Scheduled refresh after route settles
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (lenis?.resize) {
        lenis.resize();
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("resize"));
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname, lenis]);

  return null;
}

export default function SmoothScroller({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (lenisRef.current?.lenis && typeof window !== "undefined") {
      window.lenis = lenisRef.current.lenis;
    }
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={true}
      options={{
        lerp: 0.09,
        duration: 1.2,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        syncTouch: false,
        anchors: true,
        autoResize: true,
      }}
    >
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  );
}

