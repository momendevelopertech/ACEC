"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const desktopQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
        const updateEnabled = () => setEnabled(desktopQuery.matches);
        updateEnabled();
        desktopQuery.addEventListener("change", updateEnabled);
        return () => desktopQuery.removeEventListener("change", updateEnabled);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let animationFrame = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        };

        const animate = () => {
            ringX += (mouseX - ringX - 20) * 0.12;
            ringY += (mouseY - ringY - 20) * 0.12;
            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            animationFrame = requestAnimationFrame(animate);
        };

        const onMouseEnterInteractive = () => {
            ring.style.width = "60px";
            ring.style.height = "60px";
            ring.style.borderColor = "rgba(201, 168, 76, 0.9)";
        };

        const onMouseLeaveInteractive = () => {
            ring.style.width = "40px";
            ring.style.height = "40px";
            ring.style.borderColor = "rgba(201, 168, 76, 0.6)";
        };

        const handledElements = new Set<Element>();
        const addListeners = () => {
            document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
                if (!handledElements.has(el)) {
                    el.addEventListener("mouseenter", onMouseEnterInteractive);
                    el.addEventListener("mouseleave", onMouseLeaveInteractive);
                    handledElements.add(el);
                }
            });
        };

        const removeListeners = () => {
            handledElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnterInteractive);
                el.removeEventListener("mouseleave", onMouseLeaveInteractive);
            });
            handledElements.clear();
        };

        window.addEventListener("mousemove", onMouseMove);
        addListeners();
        animate();

        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            removeListeners();
            observer.disconnect();
            cancelAnimationFrame(animationFrame);
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <>
            <div ref={dotRef} className="cursor-dot" style={{ display: "block" }} />
            <div ref={ringRef} className="cursor-ring" style={{ display: "block" }} />
        </>
    );
}
