"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        .scroll-to-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 48px;
          height: 48px;
          background-color: var(--clr-primary, #3ec012);
          color: white;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          transition: transform 0.3s, background-color 0.3s, opacity 0.3s;
        }
        .scroll-to-top-btn:hover {
          transform: translateY(-5px);
          background-color: var(--clr-primary-dark, #329a0e);
        }
      `}</style>
      <button 
        onClick={scrollToTop} 
        className="scroll-to-top-btn"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={20} />
      </button>
    </>
  );
}
