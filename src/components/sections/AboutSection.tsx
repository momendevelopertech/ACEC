"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { fadeUpVariant, staggerContainer, imageMaskVariant } from "@/lib/animations";

export function AboutSection() {
    const t = useTranslations("about");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const isRTL = locale === "ar";
    
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    
    const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

    return (
        <section
            ref={ref}
            className="section-padding"
            id="about"
            style={{
                position: "relative",
                background:
                    "linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 100%)",
            }}
        >
            <div className="container-custom">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "5rem",
                        alignItems: "center",
                    }}
                    className="about-grid"
                >
                    {/* Text side */}
                    <motion.div 
                        style={{ order: isRTL ? 2 : 1 }}
                        variants={staggerContainer(0.1)}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <motion.div
                            variants={fadeUpVariant}
                            className="section-label"
                            style={{ marginBottom: "1rem" }}
                        >
                            {t("subtitle")}
                        </motion.div>

                        <motion.h2
                            variants={fadeUpVariant}
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                                fontWeight: 700,
                                color: "var(--color-text)",
                                lineHeight: 1.2,
                                marginBottom: "1.5rem",
                            }}
                        >
                            {t("title")}
                        </motion.h2>

                        <motion.p
                            variants={fadeUpVariant}
                            style={{
                                fontSize: "1rem",
                                color: "var(--color-text-muted)",
                                lineHeight: 1.8,
                                marginBottom: "2.5rem",
                            }}
                        >
                            {t("description")}
                        </motion.p>

                        {/* Feature points */}
                        {[
                            locale === "ar" ? "خبرة واسعة في المشاريع الحكومية والخاصة" : "Extensive experience in government and private projects",
                            locale === "ar" ? "فريق من المهندسين المعتمدين" : "Team of certified engineers",
                            locale === "ar" ? "امتثال كامل للكود السعودي" : "Full compliance with Saudi Building Code",
                        ].map((point, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUpVariant}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "var(--color-gold)",
                                        flexShrink: 0,
                                    }}
                                />
                                <span style={{ color: "rgba(var(--color-text-rgb), 0.75)", fontSize: "0.9375rem" }}>
                                    {point}
                                </span>
                            </motion.div>
                        ))}

                        <motion.div
                            variants={fadeUpVariant}
                            style={{ marginTop: "2rem" }}
                        >
                            <Link
                                href={`/${locale}/about`}
                                className="magnetic-btn magnetic-btn-primary"
                            >
                                {t("learnMore")}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image side */}
                    <motion.div
                        variants={imageMaskVariant}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        style={{
                            order: isRTL ? 1 : 2,
                            position: "relative",
                            height: "500px",
                            borderRadius: "var(--radius-xl)",
                            overflow: "hidden",
                        }}
                        className="about-image"
                    >
                        <motion.div style={{ width: "100%", height: "115%", y: imageY, position: "absolute", inset: 0 }}>
                            <Image
                                src="/images/about-architecture.svg"
                                alt="ACEC engineering illustration"
                                fill
                                style={{ objectFit: "cover" }}
                            />
                        </motion.div>
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                background:
                                    "linear-gradient(135deg, rgba(var(--color-bg-rgb),0.3) 0%, transparent 60%)",
                            }}
                        />

                        {/* Floating badge */}
                        <div
                            style={{
                                position: "absolute",
                                bottom: "2rem",
                                left: isRTL ? "auto" : "2rem",
                                right: isRTL ? "2rem" : "auto",
                                background: "rgba(var(--color-bg-rgb), 0.85)",
                                backdropFilter: "blur(20px)",
                                border: "1px solid rgba(var(--color-gold-rgb), 0.25)",
                                borderRadius: "var(--radius-md)",
                                padding: "1.25rem 1.5rem",
                            }}
                        >
                            <div
                                className="stat-font"
                                style={{
                                    fontSize: "2.5rem",
                                    color: "var(--color-gold)",
                                    lineHeight: 1,
                                }}
                            >
                                +15
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "var(--color-muted)",
                                    marginTop: "0.25rem",
                                }}
                            >
                                {locale === "ar" ? "سنة في الخدمة" : "Years in Service"}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-image {
            height: 300px !important;
            order: 1 !important;
          }
          .about-grid > div:first-child {
            order: 2 !important;
          }
        }
      `}</style>
        </section>
    );
}
