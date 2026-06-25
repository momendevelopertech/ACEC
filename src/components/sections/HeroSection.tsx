"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export function HeroSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/hero/${locale}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data?.image) {
          setHeroImage(`${API_BASE}/storage/${data.data.image}`);
        }
      })
      .catch(() => {});
  }, [locale]);

  const eyebrow = isAr ? "استشارات هندسية — الرياض" : "Engineering Consultants — Riyadh, KSA";
  const companyName = isAr ? "الميثاق العربي للاستشارات الهندسية" : "Arabian Covenant Engineering Consultants";
  const subtitle = isAr
    ? "استشارات هندسية شاملة، حماية من الحرائق، وهندسة سلامة في جميع أنحاء المملكة العربية السعودية — نقدم التميز منذ 2006."
    : "Comprehensive engineering consultancy, fire protection, and safety engineering across Saudi Arabia — delivering excellence since 2006.";
  const enduringWord = isAr ? "مستدامة" : "Enduring";
  const outcomes = isAr ? "النتائج" : "Outcomes.";
  const tagline = isAr ? "من التخطيط إلى الحيازة" : "From Plan to Possession";

  return (
    <section className="hero-section relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24">
      <div className="hero-bg absolute inset-0 z-0">
        <img
          src={heroImage || "/images/hero-architecture.jpg"}
          alt=""
          loading="eager"
          className="w-full h-full object-cover opacity-45 scale-[1.05] transition-transform duration-10000 ease-out"
        />
      </div>
      <div className="hero-overlay absolute inset-0 z-0" />

      <div className="container-edit relative z-10 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          className="hero-content max-w-4xl text-left rtl:text-right"
        >
          <motion.div variants={fadeUpVariant} className="eyebrow mb-6" style={{ color: "#8a8278" }}>
            {eyebrow}
          </motion.div>

          <motion.h1 variants={fadeUpVariant} className="display-1 text-[#2e2b26] tracking-tight mb-8">
            {tagline}<br />
            <strong className="font-serif italic font-normal" style={{ color: "#8a7a5a" }}>{enduringWord}</strong> {outcomes}
          </motion.h1>

          <p className="text-lg md:text-xl text-[#4a4540] max-w-2xl leading-relaxed mb-4">
            {subtitle}
          </p>
          <p className="text-base md:text-lg text-[#8a7a5a] max-w-2xl leading-relaxed mb-10 font-semibold">
            {companyName}
          </p>

          <motion.div variants={fadeUpVariant} className="hero-cta flex flex-wrap gap-4 items-center">
            <Link
              href={`/${locale}/services`}
              className="bg-[#3d3a34] text-[#f0ede6] hover:bg-[#4a4540] border-none shadow-lg px-8 py-4 text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
            >
              {isAr ? "خدماتنا" : "Our Services"}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-[#4a4540] text-[#4a4540] hover:bg-[#4a4540] hover:text-[#f0ede6] px-8 py-4 text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
            >
              {isAr ? "تواصل معنا" : "Contact Us"}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer text-xs uppercase tracking-widest"
        style={{ color: "#8a8278" }}
      >
        <span>{isAr ? "اسفل" : "Scroll"}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 relative"
          style={{ background: "rgba(138,130,120,0.4)" }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
            style={{ background: "#8a8278" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
