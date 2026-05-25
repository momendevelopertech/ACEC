"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant, slideInVariant, textRevealVariant } from "@/lib/animations";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="hero-section">
      {/* Left: Content */}
      <motion.div
        variants={staggerContainer(0.15, 0.2)}
        initial="hidden"
        animate="visible"
        className="hero-content"
      >
        {/* Label */}
        <motion.div
          variants={slideInVariant("left")}
          className="section-label"
          style={{ marginBottom: "1.5rem" }}
        >
          Arabian Covenant Engineering Consultants — ACEC
        </motion.div>

        {/* Tagline */}
        <div style={{ overflow: "hidden", paddingBottom: "10px" }}>
          <motion.h1
            variants={textRevealVariant}
            className="font-heading hero-title"
          >
            {t("tagline")}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariant}
          className="hero-subtitle"
        >
          {t("sub")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="hero-cta"
        >
          <Link
            href={`/${locale}/services`}
            className="magnetic-btn magnetic-btn-primary"
          >
            {t("cta_primary")}
            <ArrowIcon />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="btn-contact"
          >
            {t("cta_secondary")}
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUpVariant}
          className="hero-stats"
        >
          {[
            { num: "+25", label: isRTL ? "سنة خبرة" : "Years Experience" },
            { num: "+2500", label: isRTL ? "مشروع" : "Projects" },
            { num: "2006", label: isRTL ? "تأسسنا" : "Established" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="number">{stat.num}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right: Collage */}
      <div className="hero-collage">
        <div className="img-wrapper img-1">
          <img
            className="collage-img"
            src="/images/hero/hero-tower.jpg"
            alt="Modern Tower"
            loading="eager"
          />
        </div>
        <div className="img-wrapper img-2">
          <img
            className="collage-img"
            src="/images/hero/hero-interior.jpg"
            alt="Interior Design"
            loading="lazy"
          />
        </div>
        <div className="img-wrapper img-3">
          <img
            className="collage-img"
            src="/images/hero/hero-construction.jpg"
            alt="Construction"
            loading="lazy"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hero-scroll"
      >
        <span>{t("scroll")}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="scroll-line"
        />
      </motion.div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
