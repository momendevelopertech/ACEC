"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  year: number;
  location: string;
  client: string;
  is_featured: boolean;
}

export function FeaturedWorkSection() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/projects/${locale}`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const featured = data.data.find((p: Project) => p.is_featured)
            || data.data[0];
          setProject(featured || null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  return (
    <section
      ref={ref}
      id="featured-work"
      dir={isRtl ? "rtl" : "ltr"}
      style={{ backgroundColor: "#f0ede6", padding: "100px 0" }}
    >
      <div className="container-custom">
        {loading ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <div
              className="w-10 h-10 rounded-full border-2 border-r-transparent animate-spin"
              style={{ borderColor: "#C6A66B", borderRightColor: "transparent" }}
            />
            <p style={{ color: "#8a8278", fontSize: "0.9rem" }}>
              {isRtl ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        ) : project ? (
          <motion.div
            variants={fadeUpVariant}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="featured-work-layout"
          >
            {/* Image Column */}
            <div className="featured-image-col">
              <div className="featured-image-wrap">
                <img
                  src={
                    project.image
                      ? `${API_BASE}/storage/${project.image}`
                      : `/images/projects/${project.slug}.jpg`
                  }
                  alt={project.title}
                  loading="lazy"
                  className="featured-image"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className="featured-content-col">
              <div className="featured-eyebrow">
                {isRtl ? "مشروع مميز" : "Featured Work"}
              </div>
              <h2 className="featured-title">
                {project.title}
              </h2>
              <p className="featured-meta">
                {project.category.toUpperCase()}
                {" · "}
                {project.location}
                {project.year ? ` · ${project.year}` : ""}
              </p>
              <p className="featured-desc">
                {project.description}
              </p>
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="featured-link"
              >
                {isRtl ? "اقرأ التفاصيل" : "Read the case"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={isRtl ? { transform: "scaleX(-1)" } : {}}
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </div>

      <style>{`
        .featured-work-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        @media (min-width: 768px) {
          .featured-work-layout {
            grid-template-columns: 3fr 2fr;
            gap: 0;
          }
        }

        .featured-image-col {
          width: 100%;
        }

        .featured-image-wrap {
          overflow: hidden;
          width: 100%;
        }

        .featured-image {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .featured-image-wrap:hover .featured-image {
          transform: scale(1.02);
        }

        .featured-content-col {
          padding-left: ${isRtl ? "0" : "60px"};
          padding-right: ${isRtl ? "60px" : "0"};
        }

        @media (max-width: 767px) {
          .featured-content-col {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }

        .featured-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8a7a5a;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .featured-eyebrow::before {
          content: "";
          display: block;
          width: 32px;
          height: 1px;
          background-color: #8a7a5a;
          flex-shrink: 0;
        }

        [dir=rtl] .featured-eyebrow {
          letter-spacing: 0;
        }

        .featured-title {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-family: var(--font-serif, Georgia, serif);
          color: #2e2b26;
          line-height: 1.15;
          font-weight: 400;
          margin-top: 16px;
          margin-bottom: 0;
        }

        [dir=rtl] .featured-title {
          text-align: right;
        }

        .featured-meta {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a8278;
          margin-top: 20px;
          margin-bottom: 0;
        }

        [dir=rtl] .featured-meta {
          text-align: right;
        }

        .featured-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: #4a4540;
          max-width: 420px;
          margin-top: 16px;
          margin-bottom: 0;
        }

        [dir=rtl] .featured-desc {
          text-align: right;
        }

        .featured-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #2e2b26;
          text-decoration: none;
          border-bottom: 1px solid #2e2b26;
          padding-bottom: 2px;
          margin-top: 32px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .featured-link:hover {
          color: #8a7a5a;
          border-color: #8a7a5a;
        }

        [dir=rtl] .featured-link {
          letter-spacing: 0;
        }
      `}</style>
    </section>
  );
}
