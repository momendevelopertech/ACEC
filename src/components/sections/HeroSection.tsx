"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

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
    });
  }, [allImages.length, hero?.updated_at]);

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

  return (
    <section className="hero-section relative min-h-[92vh] flex items-center justify-center overflow-hidden py-24">
      <div className="hero-bg absolute inset-0 z-0">
        {hasImages && imagesReady ? (
          allImages.map((src, i) => (
            <img
              key={`${src}-${i}`}
              src={src}
              alt=""
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out"
              style={{
                opacity: i === slideIndex ? 0.45 : 0,
                transform: "scale(1.05)",
                willChange: "opacity",
              }}
            />
          ))
        ) : (
          <img
            src="/images/hero-architecture.jpg"
            alt=""
            loading="eager"
            className="w-full h-full object-cover opacity-45 scale-[1.05]"
          />
        )}
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
            {title}<br />
            <strong className="font-serif italic font-normal" style={{ color: "#8a7a5a" }}>{enduringWord}</strong> {outcomes}
          </motion.h1>

          <p className="text-lg md:text-xl text-[#4a4540] max-w-2xl leading-relaxed mb-4">
            {description}
          </p>
          <p className="text-base md:text-lg text-[#8a7a5a] max-w-2xl leading-relaxed mb-10 font-semibold">
            {subtitle}
          </p>

          <motion.div variants={fadeUpVariant} className="hero-cta flex flex-wrap gap-4 items-center">
            <Link
              href={cta1Link}
              className="bg-[#3d3a34] text-[#f0ede6] hover:bg-[#4a4540] border-none shadow-lg px-8 py-4 text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
            >
              {cta1Text}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={cta2Link}
              className="border border-[#4a4540] text-[#4a4540] hover:bg-[#4a4540] hover:text-[#f0ede6] px-8 py-4 text-[0.9rem] tracking-wider rounded font-medium no-underline inline-flex items-center gap-2 transition-colors duration-200"
            >
              {cta2Text}
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
