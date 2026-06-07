"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AboutShowreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const bandProgressRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [videoEndX, setVideoEndX] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateLayout = () => {
      setIsDesktop(mediaQuery.matches);

      const video = videoRef.current;
      const offsetParent = video?.offsetParent;
      if (!video || !(offsetParent instanceof HTMLElement)) return;

      const scale = 1.75;
      const baseLeft = offsetParent.getBoundingClientRect().left + video.offsetLeft;
      const width = video.offsetWidth;
      const scaledCenter = baseLeft + width - (width * scale) / 2;

      setVideoEndX(window.innerWidth / 2 - scaledCenter);
    };

    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    window.addEventListener("resize", updateLayout);
    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const { scrollYProgress: bandScrollProgress } = useScroll({
    target: bandProgressRef,
    offset: ["start 100%", "end 100%"],
  });
  const { scrollYProgress: videoScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const pathLength = useTransform(bandScrollProgress, [0, 1], [0, 1]);
  const videoScale = useTransform(
    videoScrollProgress,
    [0.05, 0.96],
    [1, isDesktop ? 1.75 : 1],
  );
  const videoX = useTransform(
    videoScrollProgress,
    [0.05, 0.96],
    [0, isDesktop ? videoEndX : 0],
  );

  return (
    <section
      ref={sectionRef}
      aria-label="About Anthime Willmann"
      className="relative bg-white pb-20 pt-8 sm:pb-24 sm:pt-12 lg:min-h-[190svh]"
    >
      <div
        ref={bandProgressRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80svh]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-[-260px] z-0 hidden h-[calc(80svh+260px)] overflow-hidden lg:block">
        <svg
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
  d="M-40 92C150 82 390 110 520 235C625 335 620 515 495 635C390 735 235 745 135 665C50 595 60 455 160 355C275 250 430 280 600 410C660 455 700 475 728 484C820 508 880 430 980 438C1080 446 1115 535 1205 545C1320 558 1400 485 1540 500"
  stroke="currentColor"
  strokeWidth="28"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="text-[#49D98A]"
  style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
/>
        </svg>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1360px] grid-cols-1 items-start gap-10 px-6 sm:px-10 md:px-14 lg:min-h-[178svh] lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-14 min-[1360px]:gap-20">
        <motion.div
          ref={videoRef}
          className="relative z-10 aspect-video w-full max-w-[610px] origin-top-right justify-self-center overflow-hidden rounded-[28px] bg-[#E8E8E8] shadow-[0_20px_60px_rgba(10,10,10,0.1)] sm:rounded-[36px] lg:sticky lg:top-[8vh] lg:justify-self-end"
          style={
            prefersReducedMotion
              ? undefined
              : { scale: videoScale, x: videoX }
          }
        >
          {videoAvailable ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Project showreel"
              onError={() => setVideoAvailable(false)}
            >
              <source
                src="/showreel.mp4"
                type="video/mp4"
                onError={() => setVideoAvailable(false)}
              />
            </video>
          ) : null}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.05]" />
        </motion.div>

        <div className="relative z-10 max-w-[32rem] lg:-mt-[3.5rem] lg:translate-x-6 lg:justify-self-end min-[1360px]:-mt-[4.5rem] min-[1360px]:translate-x-8">
          <p
            className="font-sans text-[clamp(0.9rem,1.2vw,1rem)] font-medium leading-[1.65] tracking-[-0.01em] text-[#0A0A0A]"
          >
            I am passionate about building modern AI-powered products that
            combine technical excellence with thoughtful design. My goal is to
            create software that is not only functional, but also intuitive,
            useful, and enjoyable to use.
          </p>
        </div>
      </div>
    </section>
  );
}
