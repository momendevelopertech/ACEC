"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

export function AboutSection() {
    const t = useTranslations("about");
    const locale = useLocale();
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const isRTL = locale === "ar";

    return (
        <section
            ref={ref}
            className="section-pad bg-[var(--color-paper)] relative overflow-hidden"
            id="about"
        >
            <div className="container-edit">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {/* Text side */}
                    <motion.div
                        className="lg:col-span-6 order-2 lg:order-1"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <motion.div variants={fadeUpVariant} className="eyebrow text-[var(--color-olive)] mb-4">
                            {t("eyebrow")}
                        </motion.div>

                        <motion.h2 variants={fadeUpVariant} className="display-2 text-[var(--color-olive-deep)] mb-6">
                            {t("heading_line1")} <strong className="font-serif italic font-normal text-[var(--color-olive)]">{t("heading_line2")}</strong>
                        </motion.h2>

                        <motion.p variants={fadeUpVariant} className="text-base text-[var(--color-olive-deep)]/80 leading-relaxed mb-8">
                            {t("description")}
                        </motion.p>

                        {/* Bullet feature list matching the corporate template */}
                        <motion.ul variants={fadeUpVariant} className="space-y-4 mb-10 text-[var(--color-olive-deep)]/85">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-[var(--color-olive)] rounded-full mt-2.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{t("bullet_safety")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-[var(--color-olive)] rounded-full mt-2.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{t("bullet_design")}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-[var(--color-olive)] rounded-full mt-2.5 flex-shrink-0" />
                                <span className="text-sm font-medium">{t("bullet_pm")}</span>
                            </li>
                        </motion.ul>

                        <motion.div variants={fadeUpVariant}>
                            <Link href={`/${locale}/about`} className="link-arrow">
                                {t("more_link")}
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180">
                                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-6 order-1 lg:order-2 card-frame relative h-[460px] md:h-[500px] w-full rounded overflow-hidden shadow-soft"
                    >
                        <Image
                            src="/images/about-team.jpg"
                            alt="ACEC Team"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-olive-deep)]/25 to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
