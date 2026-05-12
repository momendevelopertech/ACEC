"use client";

import { useRef, useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  category: string;
  year: number;
  is_featured: boolean;
  location: string;
  client: string;
}

const categoryKeys = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "residential", label: { ar: "سكني", en: "Residential" } },
  { key: "commercial", label: { ar: "تجاري", en: "Commercial" } },
  { key: "industrial", label: { ar: "صناعي", en: "Industrial" } },
  { key: "education", label: { ar: "تعليمي", en: "Education" } },
  { key: "healthcare", label: { ar: "صحي", en: "Healthcare" } },
  { key: "interior", label: { ar: "داخلي", en: "Interior" } },
];

function ProjectCard({ project, locale }: { project: Project; locale: string }) {
  const isRTL = locale === "ar";
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      style={{
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: "var(--color-card-bg)",
        border: "1px solid var(--color-border)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: "pointer",
      }}
    >
      <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
        <img
          src={project.image ? `${API_BASE}/storage/${project.image}` : "/images/project-architecture-1.svg"}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, transparent 50%, rgba(var(--color-bg-rgb),0.9) 100%)",
          }}
        />
        {project.category && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: isRTL ? "auto" : "1rem",
              right: isRTL ? "1rem" : "auto",
              background: "var(--color-gold-dim)",
              backdropFilter: "blur(8px)",
              border: "1px solid var(--color-border-gold)",
              borderRadius: "9999px",
              padding: "0.3rem 0.85rem",
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-gold)",
              letterSpacing: "0.05em",
            }}
          >
            {project.category}
          </div>
        )}
      </div>

      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--color-text-on-dark)",
            lineHeight: 1.3,
            minHeight: "2.5rem",
          }}
        >
          {project.title || (isRTL ? "مشروع هندسي" : "Engineering Project")}
        </h3>

        {project.location && (
          <p style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted-on-dark)",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem"
          }}>
            📍 {project.location}
          </p>
        )}

        {project.year && (
          <p style={{
            fontSize: "0.85rem",
            color: "var(--color-text-muted-on-dark)",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem"
          }}>
            📅 {project.year}
          </p>
        )}

        <Link
          href={`/${locale}/projects/${project.slug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--color-gold)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
            transition: "gap 0.2s",
            marginTop: "1rem",
          }}
        >
          {isRTL ? "عرض التفاصيل" : "View Details"}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const isRTL = locale === "ar";

  useEffect(() => {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";
    fetch(`${API_BASE}/api/v1/projects/${locale}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setProjects(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale]);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getCategoryLabel = (key: string) => {
    const cat = categoryKeys.find(c => c.key === key);
    return cat ? (isRTL ? cat.label.ar : cat.label.en) : key;
  };

  return (
    <section
      ref={ref}
      className="section-padding"
      id="projects"
      style={{
        position: "relative",
        background: "linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.05) 0%, transparent 100%)",
      }}
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div className="section-label" style={{ justifyContent: "center", marginBottom: "1rem" }}>
            {t("title")}
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 700,
              color: "var(--color-text-on-dark)",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            {t("subtitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: "1rem",
              color: "var(--color-text-muted-on-dark)",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            {t("description")}
          </motion.p>
          <Link
            href={`/${locale}/projects`}
            className="magnetic-btn magnetic-btn-primary"
          >
            {t("viewAll")} ({projects.length})
          </Link>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "2.5rem",
          }}
        >
          {categoryKeys.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: "9999px",
                border: "1px solid",
                borderColor: activeCategory === cat.key ? "var(--color-gold)" : "var(--color-border)",
                background: activeCategory === cat.key ? "var(--color-gold)" : "transparent",
                color: activeCategory === cat.key ? "var(--color-accent-text)" : "var(--color-text-muted-on-dark)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: 500,
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              {getCategoryLabel(cat.key)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-text-muted-on-dark)" }}>
              {isRTL ? "جاري التحميل..." : "Loading..."}
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--color-text-muted-on-dark)" }}>
              {isRTL ? "لا توجد مشاريع في هذا التصنيف" : "No projects in this category"}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
            className="projects-grid"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} locale={locale} />
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
