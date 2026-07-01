"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";
import { usePageReady } from "@/lib/page-ready";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
const SLIDE_INTERVAL = 6000;

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
  images: string[] | null;
  cta1_text: string | null;
  cta1_link: string | null;
  cta2_text: string | null;
  cta2_link: string | null;
  updated_at: string | null;
  stat1_number: string | null;
  stat1_label: string | null;
  stat2_number: string | null;
  stat2_label: string | null;
  stat3_number: string | null;
  stat3_label: string | null;
}

function buildImageUrl(path: string, v: string | null): string {
  return `${API_BASE}/storage/${path}?v=${v ?? Date.now()}`;
}

function preloadImages(urls: string[]): Promise<void> {
  return new Promise((resolve) => {
    if (urls.length === 0) { resolve(); return; }
    let loaded = 0;
    for (const url of urls) {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === urls.length) resolve();
      };
      img.src = url;
    }
  });
}

export function HeroSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const { signalReady } = usePageReady();
  const [hero, setHero] = useState<HeroData | null>(null);
  const [imagesReady, setImagesReady] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const preloadingRef = useRef(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/hero/${locale}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data) {
          const d = data.data;
          const images: string[] | null = Array.isArray(d.images) && d.images.length > 0 ? d.images : null;
          setHero({
            title: d.title ?? "",
            subtitle: d.subtitle ?? "",
            description: d.description ?? "",
            image: d.image ?? null,
            images,
            cta1_text: d.cta1_text ?? null,
            cta1_link: d.cta1_link ?? null,
            cta2_text: d.cta2_text ?? null,
            cta2_link: d.cta2_link ?? null,
            updated_at: d.updated_at ?? null,
            stat1_number: d.stat1_number ?? null,
            stat1_label: d.stat1_label ?? null,
            stat2_number: d.stat2_number ?? null,
            stat2_label: d.stat2_label ?? null,
            stat3_number: d.stat3_number ?? null,
            stat3_label: d.stat3_label ?? null,
          });
        }
      })
      .catch(() => {});
  }, [locale]);

  const allImages: string[] = [];
  if (hero?.images && hero.images.length > 0) {
    for (const img of hero.images) {
      allImages.push(buildImageUrl(img, hero.updated_at));
    }
  } else if (hero?.image) {
    allImages.push(buildImageUrl(hero.image, hero.updated_at));
  }

  useEffect(() => {
    if (allImages.length === 0 || preloadingRef.current) return;
    preloadingRef.current = true;
    preloadImages(allImages).then(() => {
      setImagesReady(true);
      signalReady();
    });
  }, [allImages.length, hero?.updated_at, signalReady]);

  useEffect(() => {
    if (allImages.length < 2 || !imagesReady) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % allImages.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [allImages.length, imagesReady, hero?.updated_at]);

  const eyebrow = isAr ? "استشارات هندسية — الرياض" : "Engineering Consultants — Riyadh, KSA";
  const enduringWord = isAr ? "مستدامة" : "Enduring";
  const outcomes = isAr ? "النتائج" : "Outcomes.";

  const defaultTitle = isAr ? "من التخطيط إلى الحيازة" : "From Plan to Possession";
  const defaultSubtitle = isAr ? "الميثاق العربي للاستشارات الهندسية" : "Arabian Covenant Engineering Consultants";
  const defaultDescription = isAr
    ? "استشارات هندسية شاملة، حماية من الحرائق، وهندسة سلامة في جميع أنحاء المملكة العربية السعودية — نقدم التميز منذ 2006."
    : "Comprehensive engineering consultancy, fire protection, and safety engineering across Saudi Arabia — delivering excellence since 2006.";
  const defaultCta1Text = isAr ? "خدماتنا" : "Our Services";
  const defaultCta2Text = isAr ? "تواصل معنا" : "Contact Us";

  const title = hero?.title || defaultTitle;
  const subtitle = hero?.subtitle || defaultSubtitle;
  const description = hero?.description || defaultDescription;
  const cta1Text = hero?.cta1_text || defaultCta1Text;
  const cta1Link = hero?.cta1_link || `/${locale}/services`;
  const cta2Text = hero?.cta2_text || defaultCta2Text;
  const cta2Link = hero?.cta2_link || `/${locale}/contact`;

  const hasImages = hero !== null && allImages.length > 0;

  const defaultStats = [
    { value: 500, label: isAr ? "مشروع منجز" : "Projects Delivered" },
    { value: 25, label: isAr ? "سنة خبرة" : "Years of Practice" },
    { value: 300, label: isAr ? "عميل" : "Trusted Clients" },
  ];
  const stats = [
    { value: parseInt(hero?.stat1_number || "") || defaultStats[0].value, label: hero?.stat1_label || defaultStats[0].label },
    { value: parseInt(hero?.stat2_number || "") || defaultStats[1].value, label: hero?.stat2_label || defaultStats[1].label },
    { value: parseInt(hero?.stat3_number || "") || defaultStats[2].value, label: hero?.stat3_label || defaultStats[2].label },
  ];

  return (
    <section className="hero-section relative overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[92vh]">

        <div className="order-2 lg:order-none flex items-center p-6 lg:p-8 xl:p-12" style={{ backgroundColor: "#f0ede6" }}>
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <motion.div
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUpVariant} className="eyebrow mb-6" style={{ color: "#8a8278" }}>
                {eyebrow}
              </motion.div>

              <motion.h1 variants={fadeUpVariant} className="text-[#2e2b26] tracking-tight mb-6 font-serif" style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.25rem)", lineHeight: 1 }}>
                {title}<br />
                <strong className="font-serif italic font-normal" style={{ color: "#8a7a5a" }}>{enduringWord}</strong> {outcomes}
              </motion.h1>

              <p className="text-base md:text-lg text-[#4a4540] max-w-2xl leading-relaxed mb-3">
                {description}
              </p>
              <p className="text-sm md:text-base text-[#8a7a5a] max-w-2xl leading-relaxed mb-8 font-semibold">
                {subtitle}
              </p>

              <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-3 items-center mb-8">
                <Link
                  href={cta1Link}
                  className="bg-[#3d3a34] text-[#f0ede6] hover:bg-[#4a4540] border-none shadow-lg px-6 py-3 md:px-8 md:py-4 text-[0.8rem] md:text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
                >
                  {cta1Text}
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180 md:w-[14px] md:h-[14px]">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href={cta2Link}
                  className="border border-[#4a4540] text-[#4a4540] hover:bg-[#4a4540] hover:text-[#f0ede6] px-6 py-3 md:px-8 md:py-4 text-[0.8rem] md:text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
                >
                  {cta2Text}
                </Link>
              </motion.div>

              <motion.div variants={fadeUpVariant} className="grid grid-cols-3 gap-4 border-t border-[#e0dcd4] pt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-start gap-0.5">
                    <span className="text-xl md:text-2xl font-serif" style={{ color: "#2e2b26", lineHeight: 1 }}>
                      {stat.value}<span style={{ color: "#8a7a5a" }}>+</span>
                    </span>
                    <span className="text-[0.6rem] md:text-[0.65rem] tracking-[0.15em] uppercase" style={{ color: "#8a8278" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="order-1 lg:order-none flex items-center justify-center p-6 lg:p-8 xl:p-12" style={{ backgroundColor: "#f0ede6" }}>
          <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] max-h-[75vh] rounded-sm overflow-hidden shadow-lg">
            {hasImages && imagesReady ? (
              allImages.map((src, i) => (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-out"
                  style={{
                    opacity: i === slideIndex ? 1 : 0,
                    willChange: "opacity",
                  }}
                />
              ))
            ) : (
              <div className="absolute inset-0" style={{ background: "#2e2b26" }}>
                <div className="loading-spinner" style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "32px",
                  height: "32px",
                }} />
              </div>
            )}

            {allImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className="transition-all duration-300 rounded-full"
                    style={{
                      width: i === slideIndex ? "28px" : "8px",
                      height: "8px",
                      backgroundColor: i === slideIndex ? "#8a7a5a" : "rgba(138,130,120,0.35)",
                      cursor: "pointer",
                      border: "none",
                      padding: 0,
                    }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
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
