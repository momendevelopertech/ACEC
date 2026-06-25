"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

interface HeroStats {
  stat1_number: string;
  stat1_label: string;
  stat2_number: string;
  stat2_label: string;
  stat3_number: string;
  stat3_label: string;
}

export function StatsSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [stats, setStats] = useState([
    { value: 500, suffix: "+", label: isAr ? "مشروع منجز" : "Projects Delivered" },
    { value: 25, suffix: "+", label: isAr ? "سنة خبرة" : "Years of Practice" },
    { value: 300, suffix: "+", label: isAr ? "عميل" : "Trusted Clients" },
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/hero/${locale}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data) {
          const h = data.data;
          setStats([
            { value: parseInt(h.stat1_number) || 500, suffix: "+", label: h.stat1_label || (isAr ? "مشروع منجز" : "Projects Delivered") },
            { value: parseInt(h.stat2_number) || 25, suffix: "+", label: h.stat2_label || (isAr ? "سنة خبرة" : "Years of Practice") },
            { value: parseInt(h.stat3_number) || 300, suffix: "+", label: h.stat3_label || (isAr ? "عميل" : "Trusted Clients") },
          ]);
        }
      })
      .catch(() => {});
  }, [locale, isAr]);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: "#2d2a24",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 grid-lines opacity-5 pointer-events-none" />

      <div className="container-edit relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-3 gap-x-8 gap-y-12 text-center max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariant}
              className="flex flex-col items-center gap-3"
            >
              <span style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontFamily: "var(--font-serif, Georgia, serif)", color: "#f0ede6", lineHeight: 1, letterSpacing: "-0.02em" }}>
                <span>{stat.value}</span>
                <span style={{ color: "#8a7a5a" }}>{stat.suffix}</span>
              </span>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,237,230,0.65)", fontFamily: "var(--font-sans, sans-serif)", marginTop: "0.5rem" }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
