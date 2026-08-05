"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

export function ProjectScene({ project }: { project: Project }) {
    const router = useRouter();
    const trackContainerRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

    const markImageFailed = (index: number) =>
        setFailedImages((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
        });

    // Slide 0 = Titel/Text/Button, danach eine Slide pro Galerie-Bild.
    // WICHTIG: kein künstliches Minimum von 1 Bild mehr erzwingen - sonst
    // wird bei einer leeren Galerie eine Slide "erfunden", die es gar
    // nicht gibt, und man scrollt am Ende ins Leere.
    const slideCount = 1 + project.gallery.length;

    const { scrollYProgress } = useScroll({
        target: trackContainerRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${Math.max(slideCount - 1, 0) * 100}%`]
    );

    // Sobald der Sentinel nach der Bilderstrecke sichtbar wird: zurück zur Übersicht
    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        // IntersectionObserver ruft den Callback einmal synchron mit dem
        // aktuellen Zustand auf, sobald observe() aufgerufen wird - dieser
        // "synthetische" erste Aufruf soll nicht als echter Scroll-Trigger
        // zählen, sonst würde z.B. bei sehr kurzem Inhalt sofort navigiert.
        let hasReceivedInitialCallback = false;
        // Schutz gegen doppelte Navigation, falls der Observer während der
        // Navigation (Layout-Verschiebung, Unmount-Timing) noch einmal mit
        // isIntersecting=true feuert.
        let hasNavigated = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!hasReceivedInitialCallback) {
                    hasReceivedInitialCallback = true;
                    return;
                }

                if (entry.isIntersecting && !hasNavigated) {
                    hasNavigated = true;
                    // replace statt push: sonst landet man beim
                    // Zurück-Navigieren erst wieder am Ende der
                    // Bilderstrecke, bevor man wirklich zur Übersicht kommt.
                    router.replace("/#projects-title");
                }
            },
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [router]);

    if (prefersReducedMotion) {
        return (
            <main className="bg-[var(--background)]">
                <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 pb-16 pt-10 sm:px-10 sm:pt-14 md:flex-row md:gap-16 md:px-14 md:pt-20">
                    <div className="flex w-full flex-none flex-col justify-start md:w-[380px] lg:w-[440px]">
                        <h1 className="text-balance font-sans text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]">
                            {project.name}
                        </h1>

                        <p className="mt-6 max-w-[440px] font-sans text-base font-medium leading-relaxed tracking-[-0.01em] text-[var(--foreground)] opacity-80">
                            {project.description}
                        </p>

                        <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[var(--accent)] px-8 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:text-base dark:text-[#0a0a0a]"
                        >
                            Projekt öffnen
                        </a>
                    </div>

                    <div className="flex flex-1 flex-col gap-10 sm:gap-14">
                        {project.gallery.length === 0 ? (
                            <p className="font-sans text-sm text-[var(--foreground)] opacity-60">
                                Für dieses Projekt sind noch keine Screenshots hinterlegt.
                            </p>
                        ) : (
                            project.gallery.map((src, index) =>
                                failedImages.has(index) ? (
                                    <div
                                        key={src + index}
                                        className={`flex aspect-[4/3] items-center justify-center rounded-[24px] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] opacity-60 ${
                                            project.portrait ? "w-full max-w-[280px]" : "w-full max-w-[520px]"
                                        }`}
                                    >
                                        Bild nicht verfügbar
                                    </div>
                                ) : (
                                    <div
                                        key={src + index}
                                        className={
                                            project.portrait
                                                ? "w-full max-w-[280px]"
                                                : "w-full max-w-[520px]"
                                        }
                                    >
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
                                )
                            )
                        )}
                    </div>
                </div>

                <a
                    href="/#projects-title"
                    className="mx-auto mb-16 block w-fit font-sans text-sm font-medium tracking-[-0.01em] text-[var(--foreground)] opacity-70 underline-offset-4 hover:underline"
                >
                    Zurück zur Übersicht
                </a>
            </main>
        );
    }

    return (
        <main className="bg-[var(--background)]">
            <div
                ref={trackContainerRef}
                style={{ height: `${Math.max(slideCount, 1.5) * 100}vh` }}
                className="relative"
            >
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                    <motion.div style={{ x }} className="flex h-full">
                        {/* Slide 0: Titel, Beschreibung, Button */}
                        <div className="flex h-full w-full flex-none items-center justify-center px-6 sm:px-8 md:px-10">
                            <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center text-center md:max-w-[560px]">
                                <h1 className="text-balance font-sans text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]">
                                    {project.name}
                                </h1>

                                <p className="mt-6 max-w-[440px] font-sans text-base font-medium leading-relaxed tracking-[-0.01em] text-[var(--foreground)] opacity-80">
                                    {project.description}
                                </p>

                                <a
                                    href={project.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 inline-flex min-h-12 w-fit items-center justify-center rounded-full bg-[var(--accent)] px-8 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:text-base dark:text-[#0a0a0a]"
                                >
                                    Projekt öffnen
                                </a>
                            </div>
                        </div>

                        {/* Slide 1..n: Galerie-Bilder im jeweils eigenen, echten Seitenverhältnis */}
                        {project.gallery.map((src, index) => (
                            <div
                                key={src + index}
                                className="flex h-full w-full flex-none items-center justify-center p-3 sm:p-5 md:p-6"
                            >
                                {failedImages.has(index) ? (
                                    <div className="flex h-full max-h-[70vh] w-full max-w-[70vw] items-center justify-center rounded-[24px] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] opacity-60">
                                        Bild nicht verfügbar
                                    </div>
                                ) : (
                                    <img
                                        src={src}
                                        alt={`${project.name} Screenshot ${index + 1}`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        onError={() => markImageFailed(index)}
                                        className="h-auto max-h-full w-auto max-w-full rounded-[24px] object-contain shadow-xl ring-1 ring-black/[0.05] dark:ring-white/[0.08]"
                                    />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div ref={sentinelRef} className="h-[20vh] w-full" />
        </main>
    );
}