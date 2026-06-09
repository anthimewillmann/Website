const pillClassName =
  "inline-flex min-h-12 items-center justify-center rounded-full bg-[#C454E8] px-6 py-3 text-center font-sans text-[clamp(0.78rem,1.2vw,1rem)] font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:px-8";

export function ContactFooter() {
  return (
    <footer className="bg-white px-6 pb-24 pt-44 sm:px-10 sm:pb-32 sm:pt-56 md:px-14">
      <div className="relative mx-auto h-12 w-full max-w-[1360px] sm:h-14">
        <a
          href="mailto:anthime.willmann@gmail.com"
          title="anthime.willmann@gmail.com"
          aria-label="E-Mail an anthime.willmann@gmail.com schreiben"
          className={`${pillClassName} absolute left-1/4 top-0 -translate-x-1/2`}
        >
          Mail
        </a>
        <a
          href="https://www.linkedin.com/in/anthime-willmann-5901992b9"
          target="_blank"
          rel="noreferrer"
          className={`${pillClassName} absolute left-1/2 top-0 -translate-x-1/2`}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/anthimewillmann"
          target="_blank"
          rel="noreferrer"
          className={`${pillClassName} absolute left-3/4 top-0 -translate-x-1/2`}
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
