"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const whyKeys = ["experience", "compliance", "quality", "team"] as const;

export function WhySection() {
    const t = useTranslations("why");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            style={{
                position: "relative",
                background: "#F8F6F2",
                borderTop: "1px solid rgba(107,105,90,0.12)",
                borderBottom: "1px solid rgba(107,105,90,0.12)",
            }}
            className="section-padding"
        >
            <div className="container-custom" style={{ position: "relative" }}>
                {/* Header with more spacing */}
                <motion.div
                    style={{ textAlign: "center", marginBottom: "5rem" }}
                    variants={staggerContainer(0.1)}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.div
                        variants={fadeUpVariant}
                        className="section-label"
                        style={{ marginBottom: "1.25rem", justifyContent: "center" }}
                    >
                        WHY CHOOSE US?
                    </motion.div>

                    <motion.h2
                        variants={fadeUpVariant}
                        className="font-heading"
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3rem)",
                            fontWeight: 700,
                            color: "#474A4D",
                            maxWidth: "600px",
                            margin: "0 auto",
                            lineHeight: 1.2,
                        }}
                    >
                        {t("subtitle")}
                    </motion.h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    variants={staggerContainer(0.15)}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "2rem",
                    }}
                >
                    {whyKeys.map((key, i) => (
                        <motion.div
                            key={key}
                            variants={fadeUpVariant}
                            className="premium-card"
                            style={{
                                padding: "2.5rem 2rem",
                                textAlign: "center",
                            }}
                        >
                            <div
                                className="premium-icon"
                                style={{
                                    margin: "0 auto 1.5rem",
                                }}
                            >
                                <WhyIcon type={key} />
                            </div>

                            <h3
                                className="font-heading"
                                style={{
                                    fontSize: "1.25rem",
                                    fontWeight: 600,
                                    color: "#474A4D",
                                    marginBottom: "0.75rem",
                                }}
                            >
                                {t(`items.${key}.title`)}
                            </h3>

                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: "#666666",
                                    lineHeight: 1.7,
                                }}
                            >
                                {t(`items.${key}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function WhyIcon({ type }: { type: string }) {
    const className = "w-[26px] h-[26px]";
    switch (type) {
        case "experience":
            return (
                <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="14" cy="14" r="11" />
                    <path d="M14 8V14L18 17" />
                </svg>
            );
        case "compliance":
            return (
                <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M14 3L25 8V16C25 21 19.5 25.5 14 27C8.5 25.5 3 21 3 16V8L14 3Z" />
                    <path d="M9 14L12.5 17.5L19 11" strokeLinecap="round" />
                </svg>
            );
        case "quality":
            return (
                <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M14 3L17.2 10.5L25 11.4L19.5 16.6L21.1 24.4L14 20.4L6.9 24.4L8.5 16.6L3 11.4L10.8 10.5L14 3Z" />
                </svg>
            );
        case "team":
            return (
                <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="14" cy="9" r="4" />
                    <path d="M5 24C5 19.6 9 16 14 16C19 16 23 19.6 23 24" />
                    <circle cx="22" cy="8" r="3" />
                    <path d="M22 14C24.2 14.5 26 16.5 26 19" />
                </svg>
            );
        default:
            return null;
    }
}
