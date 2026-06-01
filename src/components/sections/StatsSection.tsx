"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

interface StatItem {
    value: number;
    suffix: string;
    labelKey: string;
}

const stats: StatItem[] = [
    { value: 50, suffix: "+", labelKey: "projects" },
    { value: 15, suffix: "+", labelKey: "years" },
    { value: 30, suffix: "+", labelKey: "clients" },
    { value: 100, suffix: "%", labelKey: "code" },
];

export function StatsSection() {
    const t = useTranslations("stats");
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div
            ref={ref}
            style={{
                backgroundColor: "#2d2a24",
                padding: "80px 0",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

            <div className="container-edit relative z-10">
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-center"
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.labelKey}
                            variants={fadeUpVariant}
                            className="flex flex-col items-center gap-3"
                        >
                            <span style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "var(--font-serif, Georgia, serif)", color: "#f0ede6", lineHeight: 1, letterSpacing: "-0.02em" }}>
                                <span>{stat.value}</span>
                                <span style={{ color: "#8a7a5a" }}>{stat.suffix}</span>
                            </span>
                            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,230,0.65)", fontFamily: "var(--font-sans, sans-serif)", marginTop: "0.5rem" }}>
                                {t(stat.labelKey)}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
