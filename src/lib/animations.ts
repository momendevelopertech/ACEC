// Centralized Framer Motion variants for unified, professional animations.

export const EASING = {
    smooth: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a very smooth, premium deceleration
    spring: { type: "spring", stiffness: 200, damping: 20 },
};

// Standard fade up for sections, paragraphs, buttons
export const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: EASING.smooth,
        },
    },
};

// Standard fade in for images, backgrounds
export const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: EASING.smooth,
        },
    },
};

// Container for staggering children (e.g. grids, lists)
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

// A sophisticated mask-reveal effect for main headlines
export const textRevealVariant = {
    hidden: { opacity: 0, y: "100%", rotate: 2 },
    visible: {
        opacity: 1,
        y: 0,
        rotate: 0,
        transition: {
            duration: 1,
            ease: EASING.smooth,
        },
    },
};

// Smooth slide in from left/right
export const slideInVariant = (direction: "left" | "right", delay: number = 0) => ({
    hidden: { opacity: 0, x: direction === "left" ? -40 : 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: EASING.smooth,
            delay,
        },
    },
});

// Image mask reveal (image scales down slightly while container reveals)
export const imageMaskVariant = {
    hidden: { scale: 1.05, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: EASING.smooth,
        },
    },
};
