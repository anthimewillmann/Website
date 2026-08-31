"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const designFiles = [
  {
    src: "/2.jpg",
    title: "Design 2",
    className: "left-[38%] top-[9%] rotate-[5deg] w-[22%]",
  },
  {
    src: "/4.jpg",
    title: "Design 4",
    className: "left-[20%] top-[40%] rotate-[-2deg] w-[22%]",
  },
  {
    src: "/1.jpg",
    title: "Design 1",
    className: "left-[5%] top-[5%] rotate-[-7deg] w-[24%]",
  },
  {
    src: "/5.jpg",
    title: "Design 5",
    className: "left-[52%] top-[45%] rotate-[2deg] w-[22%]",
  },
  {
    src: "/3.jpg",
    title: "Design 3",
    className: "left-[70%] top-[10%] rotate-[-4deg] w-[24%]",
  },
];

export function Designs() {
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  return (
      <section
          aria-labelledby="designs-title"
          className="relative overflow-hidden bg-[var(--background)] py-14 sm:py-20 lg:py-24"
      >
        {/* Rein dekorative Hintergrundform, unabhängig vom Bildergitter */}
        <svg
            viewBox="0 0 1440 600"
            preserveAspectRatio="xMidYMid slice"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.08]"
            aria-hidden="true"
        >
          <path
              d="M1550 420C1300 300 1200 150 950 130C700 110 600 350 350 300C200 270 100 150 -100 180"
              stroke="#FF302E"
              strokeWidth="120"
              strokeLinecap="round"
              fill="none"
          />
        </svg>

        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-10 md:px-14">
          <h2
              id="designs-title"
              className="text-center font-sans text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]"
          >
            Designs
          </h2>

          <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-16 aspect-[5/3] w-full overflow-hidden rounded-[28px] border-4 border-[var(--accent)] bg-[var(--background)] shadow-[0_20px_60px_rgba(10,10,10,0.1)] sm:rounded-[36px]"
          >
            {designFiles.map((design) => (
                <button
                    key={design.src}
                    type="button"
                    onClick={() => setSelectedDesign(design.src)}
                    className={`absolute aspect-square h-auto rounded-[12px] shadow-[0_10px_25px_rgba(10,10,10,0.18)] transition-transform duration-200 hover:z-20 hover:scale-105 ${design.className}`}
                    aria-label={`${design.title} größer öffnen`}
                >
                  <img
                      src={design.src}
                      alt={design.title}
                      className="block h-full w-full rounded-[12px] object-contain"
                  />
                </button>
            ))}
          </motion.div>
        </div>

        {selectedDesign && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                onClick={() => setSelectedDesign(null)}
            >
              <button
                  type="button"
                  onClick={() => setSelectedDesign(null)}
                  className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 font-sans text-sm font-medium text-black"
              >
                Schließen
              </button>

              <img
                  src={selectedDesign}
                  alt="Design groß"
                  className="max-h-[90vh] max-w-[90vw] rounded-[24px] shadow-2xl"
                  onClick={(event) => event.stopPropagation()}
              />
            </div>
        )}
      </section>
  );
}
