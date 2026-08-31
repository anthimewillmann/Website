"use client";

import { useEffect, useRef } from "react";

const projectReturnLockKey = "project-return-scroll-lock";

/** Positioniert die Rückkehr einmalig und ohne Animation auf dem Anker. */
export function ScrollToHash() {
    const shouldLockReturnRef = useRef<boolean | null>(null);

    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const id = decodeURIComponent(hash.slice(1));
        if (shouldLockReturnRef.current === null) {
            shouldLockReturnRef.current = window.sessionStorage.getItem(projectReturnLockKey) === "1";
            window.sessionStorage.removeItem(projectReturnLockKey);
        }
        const shouldLockReturn = shouldLockReturnRef.current;
        let restoreBehaviorFrame: number | undefined;
        let unlockTimer: number | undefined;
        let targetY: number | undefined;
        const previousDocumentOverflow = document.documentElement.style.overflow;
        const previousBodyOverflow = document.body.style.overflow;

        const scrollToTarget = () => {
            const target = document.getElementById(id);
            if (!target) return;

            const previousScrollBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = "auto";
            targetY = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo(0, targetY);

            restoreBehaviorFrame = requestAnimationFrame(() => {
                document.documentElement.style.scrollBehavior = previousScrollBehavior;
            });
        };

        const scrollFrame = requestAnimationFrame(scrollToTarget);

        const preventMomentum = (event: Event) => event.preventDefault();
        const holdAtProjectTitle = () => {
            if (targetY !== undefined && Math.abs(window.scrollY - targetY) > 1) {
                window.scrollTo(0, targetY);
            }
        };

        if (shouldLockReturn) {
            // Die Sperre auf dem Scroll-Root hält auch bereits laufendes
            // Trackpad-Momentum an, nicht nur neue Wheel-Ereignisse.
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            window.addEventListener("wheel", preventMomentum, { passive: false, capture: true });
            window.addEventListener("touchmove", preventMomentum, { passive: false, capture: true });
            window.addEventListener("scroll", holdAtProjectTitle, { passive: true });
            unlockTimer = window.setTimeout(() => {
                document.documentElement.style.overflow = previousDocumentOverflow;
                document.body.style.overflow = previousBodyOverflow;
                window.removeEventListener("wheel", preventMomentum, true);
                window.removeEventListener("touchmove", preventMomentum, true);
                window.removeEventListener("scroll", holdAtProjectTitle);
            }, 900);
        }

        return () => {
            cancelAnimationFrame(scrollFrame);
            if (restoreBehaviorFrame !== undefined) {
                cancelAnimationFrame(restoreBehaviorFrame);
            }
            if (unlockTimer !== undefined) window.clearTimeout(unlockTimer);
            if (shouldLockReturn) {
                document.documentElement.style.overflow = previousDocumentOverflow;
                document.body.style.overflow = previousBodyOverflow;
                window.removeEventListener("wheel", preventMomentum, true);
                window.removeEventListener("touchmove", preventMomentum, true);
                window.removeEventListener("scroll", holdAtProjectTitle);
            }
        };
    }, []);

    return null;
}
