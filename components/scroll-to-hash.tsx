"use client";

import { useEffect } from "react";

/** Positioniert die Rückkehr ohne Animation und fängt Rest-Momentum ab. */
export function ScrollToHash() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const id = decodeURIComponent(hash.slice(1));
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";

        const preventScroll = (event: Event) => event.preventDefault();
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });

        let animationFrame: number;
        let holdStart: number | undefined;
        const holdDurationMs = 1200;

        const cleanup = () => {
            window.removeEventListener("wheel", preventScroll);
            window.removeEventListener("touchmove", preventScroll);
            document.documentElement.style.scrollBehavior = previousScrollBehavior;
        };

        const holdAtTarget = (timestamp: number) => {
            const target = document.getElementById(id);
            if (!target) {
                cleanup();
                return;
            }

            if (holdStart === undefined) holdStart = timestamp;
            const targetY = target.getBoundingClientRect().top + window.scrollY;
            if (Math.abs(window.scrollY - targetY) > 1) {
                window.scrollTo(0, targetY);
            }

            if (timestamp - holdStart < holdDurationMs) {
                animationFrame = requestAnimationFrame(holdAtTarget);
            } else {
                cleanup();
            }
        };

        animationFrame = requestAnimationFrame(holdAtTarget);

        return () => {
            cancelAnimationFrame(animationFrame);
            cleanup();
        };
    }, []);

    return null;
}
