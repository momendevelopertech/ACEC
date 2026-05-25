"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeUpVariant, slideInVariant, textRevealVariant } from "@/lib/animations";

interface HeroData {
  id: number;
  lang: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  stat1_number: string | null;
  stat1_label: string | null;
  stat2_number: string | null;
  stat2_label: string | null;
  stat3_number: string | null;
  stat3_label: string | null;
  stat4_number: string | null;
  stat4_label: string | null;
  cta1_text: string | null;
  cta1_link: string | null;
  cta2_text: string | null;
  cta2_link: string | null;
  image: string | null;
}

export function HeroSection() {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [hero, setHero] = useState<HeroData | null>(null);
  const t = useTranslations("hero");

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/hero/${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setHero(data.data);
        }
      })
      .catch(() => {});
  }, [locale]);

  const stats = hero
    ? [
        { num: hero.stat1_number, label: hero.stat1_label },
        { num: hero.stat2_number, label: hero.stat2_label },
        { num: hero.stat3_number, label: hero.stat3_label },
      ].filter((s) => s.num || s.label)
    : [];

  const cta1Text = hero?.cta1_text || t("cta_primary");
  const cta1Link = hero?.cta1_link || `/${locale}/services`;
  const cta2Text = hero?.cta2_text || t("cta_secondary");
  const cta2Link = hero?.cta2_link || `/${locale}/contact`;

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
            {hero?.title || t("tagline")}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUpVariant}
          className="hero-subtitle"
        >
          {hero?.subtitle || hero?.description || t("sub")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariant}
          className="hero-cta"
        >
          <Link
            href={cta1Link}
            className="magnetic-btn magnetic-btn-primary"
          >
            {cta1Text}
            <ArrowIcon />
          </Link>
          <Link
            href={cta2Link}
            className="btn-contact"
          >
            {cta2Text}
          </Link>
        </motion.div>

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            variants={fadeUpVariant}
            className="hero-stats"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="number">{stat.num}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
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
