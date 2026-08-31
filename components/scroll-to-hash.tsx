"use client";

import { useEffect } from "react";

/** Positioniert die Rückkehr einmalig und ohne Animation auf dem Anker. */
export function ScrollToHash() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const id = decodeURIComponent(hash.slice(1));
        let restoreBehaviorFrame: number | undefined;

        const scrollToTarget = () => {
            const target = document.getElementById(id);
            if (!target) return;

            const previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";
            window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY);

            restoreBehaviorFrame = requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior = previousScrollBehavior;
            });
        };

        const scrollFrame = requestAnimationFrame(scrollToTarget);

        return () => {
            cancelAnimationFrame(scrollFrame);
            if (restoreBehaviorFrame !== undefined) {
                cancelAnimationFrame(restoreBehaviorFrame);
            }
        };
    }, []);

    return null;
}
