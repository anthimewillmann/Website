"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import portrait from "@/public/anthime-portrait.png";

const reveal = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    delay: 0.4,
    duration: 1.5,
    ease: [0.22, 1, 0.36, 1] as const,
  },
};

export function Hero() {
  return (
    <section className="flex min-h-screen min-h-[100svh] w-full items-center bg-white">
      <motion.section
        aria-labelledby="hero-title"
        initial={reveal.initial}
        animate={reveal.animate}
        transition={reveal.transition}
        className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-14 sm:px-10 md:gap-16 md:px-14 min-[1360px]:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] min-[1360px]:gap-12 min-[1360px]:px-14"
      >
        <div className="flex min-w-0 flex-col items-center text-center min-[1360px]:pb-2">
          <h1
            id="hero-title"
            className="whitespace-nowrap font-sans text-[clamp(2.75rem,11vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#0A0A0A]"
          >
            Anthime Willmann
          </h1>

          <p
            className="mt-7 flex min-h-12 w-full max-w-[22rem] items-center justify-center rounded-full bg-accent px-5 py-3 text-center font-sans text-[clamp(0.78rem,1.2vw,1rem)] font-medium tracking-[-0.01em] text-white sm:mt-8 sm:min-h-14 sm:px-8"
          >
            Computer Science Student at CAU Kiel
          </p>
        </div>

        <div className="aspect-square w-full max-w-[440px] justify-self-center overflow-hidden rounded-[40px] min-[1360px]:w-[34vw] min-[1360px]:min-w-[360px] min-[1360px]:max-w-[480px] min-[1360px]:justify-self-end">
          <Image
            src={portrait}
            alt="Portrait of Anthime Willmann"
            width={portrait.width}
            height={portrait.height}
            priority
            sizes="(min-width: 1360px) min(34vw, 480px), (min-width: 640px) 440px, calc(100vw - 48px)"
            className="block h-full w-full object-cover object-[50%_41%]"
          />
        </div>
      </motion.section>
    </section>
  );
}
