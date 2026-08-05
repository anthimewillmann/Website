"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import portrait from "@/public/anthime-portrait.png";

export function Hero() {
    return (
        <section className="flex min-h-[100svh] w-full items-center bg-[var(--background)]">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex w-full max-w-[1200px] flex-col-reverse items-center gap-10 px-6 py-16 sm:px-10 md:flex-row md:justify-between md:gap-12 md:px-14"
            >
                <div className="flex flex-col items-center text-center md:max-w-[560px]">
                    <h1 className="text-balance font-sans text-[clamp(2.5rem,8vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.04em] text-[var(--foreground)]">
                        Anthime Willmann
                    </h1>

                    <a
                        href="https://www.uni-kiel.de/de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 py-3 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-105 sm:min-h-14 sm:text-base dark:text-[#0a0a0a]"
                    >
                        Computer Science Student at CAU Kiel
                    </a>
                </div>

                <div className="aspect-[4/5] w-[min(320px,60vw)] shrink-0 overflow-hidden rounded-[32px] sm:w-[320px] md:w-[360px] lg:w-[400px]">
                    <Image
                        src={portrait}
                        alt="Portrait of Anthime Willmann"
                        width={portrait.width}
                        height={portrait.height}
                        priority
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 360px, 320px"
                        className="block h-full w-full object-cover object-[50%_75%]"
                    />
                </div>
            </motion.div>
        </section>
    );
}