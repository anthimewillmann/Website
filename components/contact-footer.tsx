"use client";

const pillClassName =
    "inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:px-8 sm:text-base dark:text-[#0a0a0a]";

export function ContactFooter() {
  return (
      <footer className="bg-[var(--background)] px-6 py-14 sm:px-10 sm:py-20 md:px-14 lg:py-24">
        <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-4">
          <a
              href="mailto:anthime.willmann@gmail.com"
              title="anthime.willmann@gmail.com"
              aria-label="E-Mail an anthime.willmann@gmail.com schreiben"
              className={pillClassName}
          >
            Mail
          </a>
          <a
              href="https://www.linkedin.com/in/anthime-willmann-5901992b9"
              target="_blank"
              rel="noreferrer"
              className={pillClassName}
          >
            LinkedIn
          </a>
          <a
              href="https://github.com/anthimewillmann"
              target="_blank"
              rel="noreferrer"
              className={pillClassName}
          >
            GitHub
          </a>
        </div>
      </footer>
  );
}