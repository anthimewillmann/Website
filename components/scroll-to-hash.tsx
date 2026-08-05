"use client";

import { useEffect } from "react";

/**
 * Next.js hat eine eigene, interne Scroll-Behandlung bei Navigationen, die
 * teilweise mit eigenen Scroll-Versuchen in Konflikt gerät (Race Condition) -
 * ein einmaliger Sprung zum Ziel reicht deshalb nicht zuverlässig aus.
 *
 * Statt einmal zu springen, wird die Zielposition für ein kurzes Zeitfenster
 * aktiv "gehalten": auf jedem Frame wird geprüft, ob die Scroll-Position noch
 * stimmt, und bei Abweichung sofort korrigiert. Das gleicht sowohl Next.js'
 * eigenes Scroll-Verhalten als auch Momentum/Trägheitsscrollen aus, egal
 * woher die Abweichung kommt.
 *
 * Zusätzlich wird "html { scroll-behavior: smooth }" (aus globals.css) für
 * die Dauer des Vorgangs deaktiviert, da diese CSS-Eigenschaft auch
 * scrollIntoView/scrollTo mit behavior:"auto" in eine Animation verwandelt -
 * was mit dem "Halten" der Position kollidieren würde.
 */
export function ScrollToHash() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const id = decodeURIComponent(hash.slice(1));

        const previousScrollBehavior =
            document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";

        const preventScroll = (e: Event) => e.preventDefault();
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        let rafId: number;
        let findAttempts = 0;
        const maxFindAttempts = 90; // ca. 1.5s bei 60fps
        const holdDurationMs = 500;
        let holdStart: number | null = null;

        const cleanup = () => {
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
        };

        const findAndHold = (timestamp: number) => {
            const el = document.getElementById(id);

            if (!el) {
                findAttempts += 1;
                if (findAttempts < maxFindAttempts) {
                    rafId = requestAnimationFrame(findAndHold);
                } else {
                    cleanup();
                }
                return;
            }

            if (holdStart === null) holdStart = timestamp;

            const targetY = el.getBoundingClientRect().top + window.scrollY;
            if (Math.abs(window.scrollY - targetY) > 1) {
                window.scrollTo(0, targetY);
            }

            if (timestamp - holdStart < holdDurationMs) {
                rafId = requestAnimationFrame(findAndHold);
            } else {
                cleanup();
            }
        };

        rafId = requestAnimationFrame(findAndHold);

        return () => {
            cancelAnimationFrame(rafId);
            cleanup();
        };
    }, []);

    return null;
}