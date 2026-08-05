"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function About() {
  const bandRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
      <section
          aria-label="About Anthime Willmann"
          className="relative grid overflow-hidden bg-[var(--background)] py-4 sm:py-6 lg:py-8"
      >
        <div
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 aspect-[1440/800] w-full"
        />

        <div
            ref={bandRef}
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 h-full w-full overflow-hidden"
        >
          <svg
              viewBox="0 0 1440 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              className="h-full w-full"
              aria-hidden="true"
          >
            <motion.path
                d="M-40 92C150 82 390 110 520 235C625 335 620 515 495 635C390 735 235 745 135 665C50 595 60 455 160 355C275 250 430 280 600 410C660 455 700 475 728 484C820 508 880 430 980 438C1080 446 1115 535 1205 545C1320 558 1400 485 1540 500"
                stroke="currentColor"
                strokeWidth="28"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)]"
                style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
            />
          </svg>
        </div>

        <div className="relative z-10 col-start-1 row-start-1 mx-auto flex w-full max-w-[1200px] items-center justify-center px-6 sm:px-10 md:px-14">
          <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
          >
            <p className="mx-auto max-w-[720px] font-sans text-[clamp(1rem,1.3vw,1.15rem)] font-medium leading-[1.65] tracking-[-0.01em] text-[var(--foreground)]">
              Good design, to me, is invisible - it just makes sense. I studied computer science to understand how things are built, but what drives me is shaping how they feel to use: clear, intuitive, a little delightful. I'm especially interested in using AI not as a gimmick, but as a tool that makes products genuinely easier to live with.
            </p>
          </motion.div>
        </div>
      </section>
  );
}