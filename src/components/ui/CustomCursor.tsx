"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Only show custom cursor on desktop
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = 
                target.tagName.toLowerCase() === 'a' || 
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') || 
                target.closest('button') ||
                target.classList.contains('cursor-pointer');
                
            setIsHovering(!!isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    // Hide custom cursor on mobile or if position isn't set
    if (mousePosition.x === 0 && mousePosition.y === 0) return null;

    return (
        <>
            {/* The Custom Pointer */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[100]"
                animate={{
                    x: mousePosition.x - (isHovering ? 20 : 10),
                    y: mousePosition.y - (isHovering ? 20 : 10),
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            >
                <div 
                    className="relative flex items-center justify-center transition-colors duration-300"
                    style={{
                        width: isHovering ? '40px' : '20px',
                        height: isHovering ? '40px' : '20px',
                        borderRadius: isHovering ? '50%' : '0%',
                        background: isHovering ? 'rgba(var(--color-accent-rgb), 0.15)' : 'transparent',
                        border: isHovering ? '1px solid rgba(var(--color-accent-rgb), 0.5)' : 'none',
                    }}
                >
                    {/* Architectural Drafting Crosshair/Diamond */}
                    <svg 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke={isHovering ? "var(--color-accent)" : "var(--color-text-primary)"} 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="transition-transform duration-300"
                        style={{
                            transform: isHovering ? 'scale(0.7)' : 'scale(1)',
                            opacity: isHovering ? 0.9 : 0.6,
                        }}
                    >
                        <path d="M12 2L22 12L12 22L2 12L12 2Z" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                        <path d="M12 2V6M12 18V22M2 12H6M18 12H22" />
                    </svg>
                </div>
            </motion.div>
        </>
    );
}
