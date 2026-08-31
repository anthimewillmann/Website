"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

function ProjectStack({
    project,
    failedImages,
    onImageError,
    className,
    sectionRef,
}: {
    project: Project;
    failedImages: Set<number>;
    onImageError: (index: number) => void;
    className?: string;
    sectionRef?: RefObject<HTMLElement | null>;
}) {
    return (
        <main className={`bg-[var(--background)] ${className ?? ""}`}>
            <section
                ref={sectionRef}
                className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-6 py-10 sm:px-10 sm:py-14"
            >
                <div className="flex w-full max-w-[560px] flex-col items-center text-center">
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
                        className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 text-center font-sans text-sm font-medium tracking-[-0.01em] text-white transition-transform duration-200 hover:scale-[1.05] sm:min-h-14 sm:text-base dark:text-[#0a0a0a]"
                    >
                        Projekt öffnen
                    </a>
                </div>

                <div className="flex w-full flex-col items-center gap-10">
                    {project.gallery.map((src, index) =>
                        failedImages.has(index) ? (
                            <div
                                key={src + index}
                                className={`flex aspect-[4/3] w-full items-center justify-center rounded-[24px] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] opacity-60 ${
                                    project.portrait ? "max-w-[280px]" : "max-w-[520px]"
                                }`}
                            >
                                Bild nicht verfügbar
                            </div>
                        ) : (
                            <div
                                key={src + index}
                                className={project.portrait ? "w-full max-w-[280px]" : "w-full max-w-[520px]"}
                            >
                                <Image
                                    src={src}
                                    alt={`${project.name} Screenshot ${index + 1}`}
                                    width={project.portrait ? 600 : 1600}
                                    height={project.portrait ? 1300 : 1000}
                                    className="h-auto w-full rounded-[24px] shadow-xl ring-1 ring-black/[0.05] dark:ring-white/[0.08]"
                                    priority={index === 0}
                                    onError={() => onImageError(index)}
                                />
                            </div>
                        )
                    )}
                </div>

            </section>
        </main>
    );
}

export function ProjectScene({ project }: { project: Project }) {
    const router = useRouter();
    const trackContainerRef = useRef<HTMLDivElement>(null);
    const horizontalTrackRef = useRef<HTMLDivElement>(null);
    const mobileStackRef = useRef<HTMLElement>(null);
    const endWallActiveRef = useRef(false);
    const prefersReducedMotion = useReducedMotion();
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());
    const [horizontalTravel, setHorizontalTravel] = useState(0);
    const [horizontalOffset, setHorizontalOffset] = useState(0);

    // Next.js behält beim Wechsel aus der Übersicht gelegentlich die bisherige
    // vertikale Position bei. Jede Projektseite beginnt daher oben beim Titel.
    useLayoutEffect(() => {
        const lockUntil = performance.now() + 500;
        let animationFrame: number | undefined;

        const keepAtStart = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            if (performance.now() < lockUntil) {
                animationFrame = requestAnimationFrame(keepAtStart);
            }
        };

        keepAtStart();

        return () => {
            if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
        };
    }, [project.slug]);

    const markImageFailed = (index: number) =>
        setFailedImages((previous) => {
            if (previous.has(index)) return previous;
            const next = new Set(previous);
            next.add(index);
            return next;
        });

    useLayoutEffect(() => {
        const track = horizontalTrackRef.current;
        if (!track) return;

        const updateTravel = () => {
            setHorizontalTravel(Math.max(track.scrollWidth - window.innerWidth, 0));
        };

        const resizeObserver = new ResizeObserver(updateTravel);
        resizeObserver.observe(track);
        window.addEventListener("resize", updateTravel);
        const animationFrame = requestAnimationFrame(updateTravel);

        return () => {
            cancelAnimationFrame(animationFrame);
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateTravel);
        };
    }, [project.slug]);

    useEffect(() => {
        const updateHorizontalOffset = () => {
            const track = trackContainerRef.current;
            if (!track) return;

            const trackStart = track.getBoundingClientRect().top + window.scrollY;
            const offset = Math.min(Math.max(window.scrollY - trackStart, 0), horizontalTravel);
            setHorizontalOffset(offset);
        };

        updateHorizontalOffset();
        window.addEventListener("scroll", updateHorizontalOffset, { passive: true });
        return () => window.removeEventListener("scroll", updateHorizontalOffset);
    }, [horizontalTravel]);

    useEffect(() => {
        let hasNavigated = false;
        let touchY: number | undefined;
        let wallReadyToLeave = false;
        let armWallTimer: number | undefined;
        let lastDownwardInputAt = 0;

        const armWallExit = () => {
            wallReadyToLeave = false;
            if (armWallTimer !== undefined) window.clearTimeout(armWallTimer);
            armWallTimer = window.setTimeout(() => {
                wallReadyToLeave = true;
            }, 150);
        };

        const setEndWallState = (isAtWall: boolean) => {
            if (isAtWall && !endWallActiveRef.current) armWallExit();
            if (!isAtWall) {
                wallReadyToLeave = false;
                if (armWallTimer !== undefined) window.clearTimeout(armWallTimer);
            }
            endWallActiveRef.current = isAtWall;
        };

        const getActiveScrollContainer = () => {
            const horizontalTrack = trackContainerRef.current;
            if (horizontalTrack?.offsetParent !== null) return horizontalTrack;

            const verticalStack = mobileStackRef.current;
            if (!prefersReducedMotion && verticalStack?.offsetParent !== null) return verticalStack;

            return null;
        };

        const updateEndWallState = () => {
            const container = getActiveScrollContainer();
            if (!container) {
                setEndWallState(false);
                return;
            }
            setEndWallState(container.getBoundingClientRect().bottom <= window.innerHeight + 1);
        };
        updateEndWallState();
        window.addEventListener("scroll", updateEndWallState, { passive: true });

        const returnToOverview = () => {
            if (hasNavigated) return;

            hasNavigated = true;
            window.sessionStorage.setItem("project-return-scroll-lock", "1");
            router.replace("/#projects-title");
        };

        const pushAgainstWall = (distance: number, event: Event) => {
            if (distance <= 0) return;

            const now = performance.now();
            const isNewGesture = now - lastDownwardInputAt > 150;
            lastDownwardInputAt = now;

            const container = getActiveScrollContainer();
            if (!container) return;
            const isAtWall = container.getBoundingClientRect().bottom <= window.innerHeight + 1;
            setEndWallState(isAtWall);
            if (!isAtWall) return;

            event.preventDefault();
            if (wallReadyToLeave || isNewGesture) {
                returnToOverview();
            } else {
                armWallExit();
            }
        };

        const handleWheel = (event: WheelEvent) => {
            pushAgainstWall(event.deltaY, event);
        };

        const handleTouchStart = (event: TouchEvent) => {
            touchY = event.touches[0]?.clientY;
        };

        const handleTouchMove = (event: TouchEvent) => {
            const nextTouchY = event.touches[0]?.clientY;
            if (touchY === undefined || nextTouchY === undefined) return;

            pushAgainstWall(touchY - nextTouchY, event);
            touchY = nextTouchY;
        };

        window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            if (armWallTimer !== undefined) window.clearTimeout(armWallTimer);
            window.removeEventListener("scroll", updateEndWallState);
            window.removeEventListener("wheel", handleWheel, true);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [prefersReducedMotion, router]);

    if (prefersReducedMotion) {
        return (
            <ProjectStack
                project={project}
                failedImages={failedImages}
                onImageError={markImageFailed}
            />
        );
    }

    return (
        <>
            <ProjectStack
                className="md:hidden"
                project={project}
                failedImages={failedImages}
                onImageError={markImageFailed}
                sectionRef={mobileStackRef}
            />
            <main className="hidden bg-[var(--background)] md:block">
            <div
                ref={trackContainerRef}
                style={{ height: `calc(100svh + ${horizontalTravel}px)` }}
                className="relative"
            >
                <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
                    <div
                        ref={horizontalTrackRef}
                        style={{ transform: `translateX(-${horizontalOffset}px)` }}
                        className="flex h-full w-max items-center gap-10 px-10 sm:gap-14 sm:px-14 md:gap-16 md:px-16"
                    >
                        <div className="flex h-full w-[min(440px,calc(100vw-5rem))] flex-none items-center justify-center sm:w-[min(440px,calc(100vw-7rem))] md:w-[min(440px,calc(100vw-8rem))]">
                            <div className="flex w-full flex-col items-center gap-10 text-center sm:gap-14 md:gap-16">
                                <h1 className="text-balance font-sans text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[var(--foreground)]">
                                    {project.name}
                                </h1>

                                <p className="max-w-[440px] font-sans text-base font-medium leading-relaxed tracking-[-0.01em] text-[var(--foreground)] opacity-80">
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
                            </div>
                        </div>

                        {project.gallery.map((src, index) => (
                            <div
                                key={src + index}
                                className="flex h-full flex-none items-center justify-center py-10 sm:py-14 md:py-16"
                            >
                                {failedImages.has(index) ? (
                                    <div className="flex h-full max-h-full w-[min(70vw,560px)] items-center justify-center rounded-[24px] bg-[var(--card)] text-sm font-medium text-[var(--foreground)] opacity-60">
                                        Bild nicht verfügbar
                                    </div>
                                ) : (
                                    <img
                                        src={src}
                                        alt={`${project.name} Screenshot ${index + 1}`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        onError={() => markImageFailed(index)}
                                        className="block h-auto max-h-full w-auto max-w-[calc(100vw-5rem)] rounded-[24px] object-contain shadow-xl ring-1 ring-black/[0.05] sm:max-w-[calc(100vw-7rem)] md:max-w-[calc(100vw-8rem)] dark:ring-white/[0.08]"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            </main>
        </>
    );
}
