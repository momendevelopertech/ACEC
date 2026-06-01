"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

const whyKeys = ["experience", "compliance", "quality", "team"] as const;
const whyNums = ["01", "02", "03", "04"];

export function WhySection() {
    const t = useTranslations("why");
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="section-pad bg-[var(--color-secondary)] relative overflow-hidden"
        >
            <div className="container-edit">
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="max-w-xl mb-16"
                >
                    <motion.div
                        variants={fadeUpVariant}
                        className="eyebrow text-[var(--color-olive)] mb-4"
                    >
                        {t("eyebrow")}
                    </motion.div>

                    <motion.h2
                        variants={fadeUpVariant}
                        className="display-2 text-[var(--color-olive-deep)]"
                    >
                        {t("heading_line1")} <br />
                        <strong className="font-serif italic font-normal text-[var(--color-olive)]">{t("heading_line2")}</strong>
                    </motion.h2>
                </motion.div>

                {/* Two-column border-t cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {whyKeys.map((key, i) => (
                        <motion.div
                            key={key}
                            variants={fadeUpVariant}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            className="border-t border-[var(--color-olive-deep)]/10 pt-8 flex flex-col gap-3 group hover:border-[var(--color-olive)] transition-colors duration-500"
                        >
                            <div className="text-sm font-mono text-[var(--color-stone)] font-semibold tracking-wider">
                                {whyNums[i]}
                            </div>
                            <div>
                                <h3 className="text-xl font-serif text-[var(--color-olive-deep)] mb-3 font-normal group-hover:text-[var(--color-olive)] transition-colors">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="text-sm text-[var(--color-olive-deep)]/75 leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
