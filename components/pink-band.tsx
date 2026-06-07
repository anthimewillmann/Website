"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function PinkBand() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [imageEndX, setImageEndX] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => {
      setIsDesktop(mediaQuery.matches);

      const image = imageRef.current;
      const offsetParent = image?.offsetParent;
      if (!image || !(offsetParent instanceof HTMLElement)) return;

      const scale = 1.75;
      const baseLeft = offsetParent.getBoundingClientRect().left + image.offsetLeft;
      const width = image.offsetWidth;
      const scaledCenter = baseLeft + width - (width * scale) / 2;

      setImageEndX(window.innerWidth / 2 - scaledCenter);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    window.addEventListener("resize", updateLayout);
    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 100%"],
  });
  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const imageScale = useTransform(
    imageScrollProgress,
    [0.16, 0.94],
    [1, isDesktop ? 1.75 : 1],
  );
  const imageX = useTransform(
    imageScrollProgress,
    [0.16, 0.94],
    [0, isDesktop ? imageEndX : 0],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Decorative pink band"
      className="relative mt-12 min-h-[115svh] overflow-x-clip bg-white sm:mt-16 lg:mt-20 lg:min-h-[220svh]"
    >
      <div className="absolute inset-x-0 top-0 z-10 mx-auto w-full max-w-[1360px] px-6 sm:px-10 md:px-14">
        <h2 className="w-full max-w-[610px] text-center font-sans text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#0A0A0A]">
          Designs
        </h2>
      </div>

      <svg
        viewBox="0 0 1440 760"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-16 right-0 h-[101.2svh] w-[88%] overflow-visible"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
  d="M1510 280C1400 285 1300 235 1190 180C1040 105 850 90 720 150C600 205 520 315 535 430C550 545 675 585 790 540C895 500 925 385 1035 385C1145 385 1125 535 1235 635C1315 710 1400 750 1510 765"
  stroke="currentColor"
  strokeWidth="32"
  strokeLinecap="round"
  strokeLinejoin="round"
          className="text-[#FF302E]"
  style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
/>
      </svg>

      <div className="relative z-10 mx-auto min-h-[205svh] w-full max-w-[1360px] px-6 pt-[28svh] sm:px-10 md:px-14 lg:pt-[34svh]">
        <motion.div
          ref={imageRef}
          className="relative aspect-video w-full max-w-[610px] origin-top-right overflow-hidden rounded-[28px] bg-[#EBDDC6] shadow-[0_20px_60px_rgba(10,10,10,0.1)] ring-1 ring-inset ring-black/[0.05] sm:rounded-[36px] lg:sticky lg:top-[8vh]"
          style={
            prefersReducedMotion
              ? undefined
              : { scale: imageScale, x: imageX }
          }
          aria-label="Design image placeholder"
        />
      </div>
    </section>
  );
}
