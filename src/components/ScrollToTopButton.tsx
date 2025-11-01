import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-[140px] right-[150px] z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100 animate-fadeInUp" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative p-4 bg-sky-500 hover:bg-orange-500 text-white rounded-full shadow-xl transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 animate-bounce" />

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back to Top
        </span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;