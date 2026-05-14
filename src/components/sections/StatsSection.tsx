"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

interface StatItem {
    value: number;
    suffix: string;
    labelKey: string;
    prefix?: string;
}

const stats: StatItem[] = [
    { value: 50, suffix: "+", labelKey: "projects", prefix: "" },
    { value: 15, suffix: "+", labelKey: "years" },
    { value: 30, suffix: "+", labelKey: "clients" },
    { value: 100, suffix: "%", labelKey: "compliance" },
];

function CountUp({
    value,
    suffix,
    prefix = "",
    inView,
}: {
    value: number;
    suffix: string;
    prefix?: string;
    inView: boolean;
}) {
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 40,
        restDelta: 0.001
    });

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    const displayValue = useTransform(springValue, (current) => Math.floor(current));

    return (
        <motion.span className="stat-font" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--color-gold)", lineHeight: 1 }}>
            {prefix}<motion.span>{displayValue}</motion.span>{suffix}
        </motion.span>
    );
}

export function StatsSection() {
    const t = useTranslations("stats");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                padding: "5rem 1.5rem",
                overflow: "hidden",
            }}
        >
            {/* Background accent */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, transparent 0%, rgba(var(--color-gold-rgb), 0.04) 50%, transparent 100%)",
                    borderTop: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                    borderBottom: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                }}
            />

            <div className="container-custom" style={{ position: "relative" }}>
                <motion.div
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "2rem",
                        textAlign: "center",
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.labelKey}
                            variants={fadeUpVariant}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.75rem",
                                padding: "2rem",
                                borderRadius: "var(--radius-lg)",
                                background: "rgba(var(--color-gold-rgb), 0.04)",
                                border: "1px solid rgba(var(--color-gold-rgb), 0.08)",
                                transition: "background 0.3s",
                            }}
                            className="stat-card"
                        >
                            <CountUp
                                value={stat.value}
                                suffix={stat.suffix}
                                prefix={stat.prefix}
                                inView={inView}
                            />
                            <span
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--color-muted)",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    fontWeight: 500,
                                }}
                            >
                                {t(stat.labelKey as "projects" | "years" | "clients" | "compliance")}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
        .stat-card:hover {
          background: rgba(var(--color-gold-rgb), 0.08) !important;
        }
      `}</style>
        </section>
    );
}
