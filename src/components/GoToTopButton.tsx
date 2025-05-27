"use client";
import clsx from "clsx";
import { ArrowUpFromLine } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

const GoToTopButton = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "150px 0px 0px 0px",
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Invisible marker at the top of the page */}
      <div
        ref={ref}
        role="presentation"
        aria-hidden
        style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1 }}
      />
      <button
        aria-label="Go to top"
        title="Go to top"
        onClick={handleClick}
        className={clsx(
          "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-secondary text-white shadow-lg transition-opacity duration-300 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/50",
          !inView && "opacity-100",
          inView && "opacity-0 pointer-events-none"
        )}
      >
        <ArrowUpFromLine size={24} />
      </button>
    </>
  );
};

export default GoToTopButton;
