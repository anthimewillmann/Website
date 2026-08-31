"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export function ProjectScene({ project }: { project: Project }) {
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

    const markImageFailed = (index: number) =>
        setFailedImages((previous) => {
            if (previous.has(index)) return previous;
            const next = new Set(previous);
            next.add(index);
            return next;
        });

    return (
        <main className="bg-[var(--background)]">
            <section className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-8 py-8 sm:gap-10 sm:px-10 sm:py-10 md:gap-14 md:px-14 md:py-14">
                <h1 className="max-w-[760px] text-center font-sans text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]">
                    {project.name}
                </h1>

                <p className="max-w-[560px] text-center font-sans text-base font-medium leading-relaxed tracking-[-0.01em] text-[var(--foreground)] opacity-80">
                    {project.description}
                </p>

                <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:text-base dark:text-[#0a0a0a]"
                >
                    Projekt öffnen
                </a>

                <div className="flex w-full flex-col items-center gap-8 sm:gap-10 md:gap-14">
                    {project.gallery.length === 0 ? (
                        <p className="text-center font-sans text-sm text-[var(--foreground)] opacity-60">
                            Für dieses Projekt sind noch keine Screenshots hinterlegt.
                        </p>
                    ) : (
                        project.gallery.map((src, index) => {
                            const widthClass = project.portrait
                                ? "max-w-[320px]"
                                : "max-w-[960px]";

                            return failedImages.has(index) ? (
                                <div
                                    key={src + index}
                                    className={`flex aspect-[4/3] w-full ${widthClass} items-center justify-center rounded-[24px] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] opacity-60`}
                                >
                                    Bild nicht verfügbar
                                </div>
                            ) : (
                                <div key={src + index} className={`w-full ${widthClass}`}>
                                    <Image
                                        src={src}
                                        alt={`${project.name} Screenshot ${index + 1}`}
                                        width={project.portrait ? 600 : 1600}
                                        height={project.portrait ? 1300 : 1000}
                                        className="h-auto w-full rounded-[24px] shadow-xl ring-1 ring-black/[0.05] dark:ring-white/[0.08]"
                                        priority={index === 0}
                                        onError={() => markImageFailed(index)}
                                    />
                                </div>
                            );
                        })
                    )}
                </div>

                <a
                    href="/#projects-title"
                    className="font-sans text-sm font-medium tracking-[-0.01em] text-[var(--foreground)] opacity-70 underline-offset-4 hover:underline"
                >
                    Zurück zur Übersicht
                </a>
            </section>
        </main>
    );
}
