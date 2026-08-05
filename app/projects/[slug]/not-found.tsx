import Link from "next/link";

export default function ProjectNotFound() {
    return (
        <main className="flex min-h-[70svh] w-full flex-col items-center justify-center gap-6 bg-[var(--background)] px-6 text-center">
            <h1 className="font-sans text-[clamp(2rem,5vw,3rem)] font-medium tracking-[-0.03em] text-[var(--foreground)]">
                Projekt nicht gefunden
            </h1>
            <p className="max-w-[420px] font-sans text-sm text-[var(--foreground)] opacity-70">
                Dieses Projekt existiert nicht (mehr). Vielleicht wurde es umbenannt oder entfernt.
            </p>
            <Link
                href="/#projects-title"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.05] dark:text-[#0a0a0a]"
            >
                Zurück zur Übersicht
            </Link>
        </main>
    );
}
